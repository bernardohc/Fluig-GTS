var AddThisEvent = SuperWidget.extend({
    //variáveis da widget
    instanceId: null,
    editor: null,
    startDateCalendar: null,
    endDateCalendar: null,
    title: null,
	place: null,
	startDate: null,
	endDate: null,
	timezone: null,
	organizer: null,
	organizerEmail: null,
	eventDescription: null,
	data: null,
	descriptionModal: null,

    //método iniciado quando a widget é carregada
    init: function() {
    	var that = this;
    	that.getTimezones();
    	that.formatDates();
    	that.enableRichEditor();
    	that.setupEventForDragging();
    	that.getSavedPreferences();
    },
  
    //BIND de eventos
    bindings: {
        local: {
        	'save-event-context': ['click_updateEvent'],
        },
        global: {
        }
    },
    
    setupEventForDragging : function() {
    	var that = this;
    	$('body').on('dragStop', function(event) {
    		var targetElementId = $(event.target).attr("id");
    		var isThisInstanceSourceEvent = targetElementId.indexOf(that.instanceId) > -1;
    		if (isThisInstanceSourceEvent) {
    			var data = that.editor.getData();
    			var title = $("#title_" + that.instanceId).val();
    			that.removeCKEditorBindings();
    			that.enableRichEditor();
    			that.editor.setData(data);
    		}
    	});
    },
    
    removeCKEditorBindings : function() {
    	var that = this;
    	var currentElement = $("#" + 'event-description_' + that.instanceId);
    	var elementWithoutBindings = currentElement.clone();
    	var originalElementParent = currentElement.parent();
    	currentElement.remove();
    	$("#cke_" + 'event-description_' + that.instanceId).remove();
    	originalElementParent.append(elementWithoutBindings);
    },
    
    saveDescription: function(el) {
    	var that = this;
    	if($(el).data('save-description') == that.instanceId) {
    		that.data = that.editor.getData() || "";
    		$("#description-view_" + that.instanceId).html(that.getEditorPlainText());
    		that.descriptionModal.remove();
    	}
    },
    
    cancelDescription: function(el) {
    	var that = this;
    	if($(el).data('cancel-description') == that.instanceId) {
    		that.descriptionModal.remove();
    	}
    },
    
    getSavedPreferences: function() {
    	var that = this;
    	$('#title_'+that.instanceId)[0].value = that.title || "";
		$('#place_'+that.instanceId)[0].value = that.place || "";
		if(that.startDate) {
			that.startDateCalendar.setDate(FLUIGC.calendar.formatDate(new Date(that.startDate), 'DD/MM/YYYY hh:mm A'));
		}
		if(that.endDate) {
			that.endDateCalendar.setDate(FLUIGC.calendar.formatDate(new Date(that.endDate), 'DD/MM/YYYY hh:mm A'));
		}
		if(that.timezone) {
			$('#timezone_'+that.instanceId)[0].value = that.timezone;	
		}
		
		var options = {
				url: '/api/public/2.0/users/getCurrent',
				contentType: 'application/json',
				dataType: 'json',
				type: 'GET'
			};

		if(!that.organizer && !that.organizerEmail) {
			FLUIGC.ajax(options, function(err, data) {
				if(!err) {
						$('#organizer_'+that.instanceId)[0].value = data.content.fullName;
						$('#organizeremail_'+that.instanceId)[0].value = data.content.email;
					}
			});
		} else {
			$('#organizer_'+that.instanceId)[0].value = that.organizer;
			$('#organizeremail_'+that.instanceId)[0].value = that.organizerEmail;
		}
		
		that.data = decodeURIComponent(that.eventDescription || "");
		
		that.editor.setData(that.data);
		
    },
 
    getTimezones: function() {
    	var that = this;
		WCMAPI.Read({
			async: false,
			url: WCMSpaceAPI.SessionService.GETTIMEZONES__PATH(),
			success: function(data) {
				if (data.content) {
					for ( var i in data.content.available) {
						$('#timezone_'+that.instanceId).append(
							'<option value="' + data.content.available[i] + '">' + data.content.available[i]
								+ '</option>');
					}
					$('#timezone_'+that.instanceId).val(data.content["default"]);
				}
			}
		});
	}, 
	
	formatDates: function() {
		var that = this;
		that.startDateCalendar = FLUIGC.calendar('#startdate_'+that.instanceId, {
			pickDate: true,
			pickTime: true,
			sideBySide: true
		});
		that.endDateCalendar = FLUIGC.calendar('#enddate_'+that.instanceId, {
			pickDate: true,
			pickTime: true,
			sideBySide: true
		});
    },

    enableRichEditor: function() {
    	var that = this;
    	that.editor = FLUIGC.richeditor('event-description_' + that.instanceId, {
			// deducts the height of the header and component actions.
			height: 150
    	});
    	
    	that.editor.editor.config.toolbar = [{
			name: 'editing',
			items: ['Bold','Italic', 'Underline', 'Strike', 'Subscript', 'Superscript']
		}, {
			name: 'removeFormat',
			items: ['RemoveFormat']
		}];

    	that.editor.editor.config.toolbarGroups = [{
			name: 'editing',
			groups: ['editing', 'removeFormat']
		}, {
			name: 'basicstyles',
			groups: ['basicstyles', 'cleanup']
		}

		];
    },
    
	updateEvent: function(el) {
		var that = this, args = {};

		var btn = $(el);
		
		if(!$('#title_'+that.instanceId)[0].value) {
			FLUIGC.toast({
				message: '${i18n.getTranslation("error.inform.a.title")}',
				type: "danger"
			});
			return;
		}
		
		if(!that.startDateCalendar.getTimestampDate()) {
			FLUIGC.toast({
				message: '${i18n.getTranslation("error.inform.a.startdate")}',
				type: "danger"
			});
			return;
		}

		if(that.editor) {
			that.data = that.editor.getData() || "";
		}
		
		if(that.data.length > 500) {
			FLUIGC.toast({
				message: '${i18n.getTranslation("error.description.max")}',
				type: "danger"
			});
			return;
		}
		
		if(!that.endDateCalendar.getTimestampDate()) {
			FLUIGC.toast({
				message: '${i18n.getTranslation("error.inform.an.enddate")}',
				type: "danger"
			});
			return;
		}
		
		if(that.startDateCalendar.getTimestampDate() > that.endDateCalendar.getTimestampDate()) {
			FLUIGC.toast({
				message: '${i18n.getTranslation("error.inform.a.enddate.greater.than.the.startdate")}',
				type: "danger"
			});
			return;
		}
		
		if(that.editor.editor.document.getBody().getText().length > 500) {
			FLUIGC.toast({
				message: '${i18n.getTranslation("error.description.max.chars")}',
				type: "danger"
			});
			return;
		}
		
		btn.prop('disabled', true);

		args['context'] = this.context;
		args['title'] = $('#title_'+that.instanceId)[0].value || "";
		args['place'] = $('#place_'+that.instanceId)[0].value || ''; 
		args['startDate'] = that.startDateCalendar.getTimestampDate() || ''; 
		args['endDate'] = that.endDateCalendar.getTimestampDate() || ''; 
		args['timezone'] = $('#timezone_'+that.instanceId)[0].value || ''; 
		args['organizer'] = $('#organizer_'+that.instanceId)[0].value || ''; 
		args['organizerEmail'] = $('#organizeremail_'+that.instanceId)[0].value || '';
		args['eventDescription'] = encodeURIComponent(that.data); 

		this.rest(WCMSpaceAPI.PageService.UPDATEPREFERENCES, [that.instanceId, args], function(res) {
			if (res) {
				FLUIGC.toast({
					message: "${i18n.getTranslation('success.update')}",
					type: "success"
				});
			}
			btn.prop('disabled', false);
		}, function(xhr, text, errData) {
			FLUIGC.toast({
				message: errData.message,
				type: "danger"
			});
			btn.prop('disabled', false);
		});
	},
	
	getEditorPlainText: function() {
		var that = this,
			descriptionPlainText = $(that.data).text().replace(/\s\s+/g, ' ').replace(/(\r\n|\n|\r)/gm,"");
		
		if(descriptionPlainText.length > 140) {
			descriptionPlainText = descriptionPlainText.substring(0,140) + '...';
    	}
    	return descriptionPlainText;
    },

});

