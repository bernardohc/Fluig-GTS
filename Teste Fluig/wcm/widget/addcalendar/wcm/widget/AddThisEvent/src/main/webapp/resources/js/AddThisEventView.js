var AddThisEventView = SuperWidget.extend({
    //variáveis da widget
    instanceId: null,
    title : null,
	place : null,
	startDate : null,
	endDate : null,
	timezone : null,
	organizer : null,
	organizerEmail : null,
	eventDescription : null,
	startDateString: null,
	endDateString: null,

    //método iniciado quando a widget é carregada
    init: function() {
    	var that = this;
    	
    	if(that.startDate && that.endDate && that.title) {
    		var start = new Date(that.startDate);
    		var end = new Date(that.endDate);
    		that.startDateString = FLUIGC.calendar.formatDate(start, 'MM/DD/YYYY hh:mm A');
    		that.endDateString = FLUIGC.calendar.formatDate(end, 'MM/DD/YYYY hh:mm A');
    		
    		var data = {};
    		
    		data.eventPeriodText =   FLUIGC.calendar.formatDate(start, 'LL') + ' ${i18n.getTranslation("period.to")} '
    							   + FLUIGC.calendar.formatDate(end, 'LL');
    		
    		data.eventPeriodFullText =   FLUIGC.calendar.formatDate(start, 'L')
    									 + ' ${i18n.getTranslation("period.at")} '
    									 + FLUIGC.calendar.formatDate(start, 'hh:mm A')
    									 + ' ${i18n.getTranslation("period.to")} '
    									 + FLUIGC.calendar.formatDate(end, 'L')
    									 + ' ${i18n.getTranslation("period.at")} '
			 							 + FLUIGC.calendar.formatDate(end, 'hh:mm A');
    		
    		data.location = that.place;
    		data.eventTitle = that.title;
    		
    		var html = Mustache.render(that.templates['event-period'], data);
    		
    		$('#event_'+that.instanceId).html(html);
    		
    		FLUIGC.addToCalendar('#targetcalendar_' + that.instanceId, {
	    	   start: that.startDateString,
	    	   end: that.endDateString,
	    	   timezone: that.timezone,
	    	   title: that.title,
	    	   description: decodeURIComponent(that.eventDescription || '').replace(/&nbsp;/g, ''),
	    	   location: that.place,
	    	   organizer: that.organizer,
	    	   organizer_email: that.organizerEmail,
	    	   all_day_event: 'false',
	    	   advanced: {
	    	        license    : "00000000000000000000",
	    	        mouse      : true,
	    	        outlook    : true,
	    	        google     : true,
	    	        yahoo      : true,
	    	        outlookcom : true,
	    	        appleical  : true,
	    	        facebook   : false
	    	    }
    		}, function(err, data) {
    			if(err) {
    				FLUIGC.toast({
    					message: err,
    					type: "danger"
    				});
    				return;
    			}
    		});
		}
    	
    },
  
    //BIND de eventos
    bindings: {
        local: {
        	'save-event-context': ['click_updateEvent'],
        },
        global: {}
    },
 
});

