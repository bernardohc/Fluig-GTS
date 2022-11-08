var menu_of_links = SuperWidget.extend({
	instanceId: null,
	
	productsList: [],
	
	menuIcon: null,
	
	editMode: false,
	viewMode: false,
	
	init: function() {
		var $this = this;
		
		if (this.editMode) {
			// build element
			var $i = $("#menu-icon", $this.getContainer());
			var selected = $this.menuIcon || "fluigicon-plus";
			var icons = FLUIGC.icons().iconsMap;
			
			$.each(icons, function(key, item) { 
				var $option = $("<option>", {
					"data-icon": key,
					"text": key
				});
				
				if (key == selected) {
					$option.attr("selected", true);
				}
				
				$i.append($option);
			});
			
			// combobox customized
			$('.selectpicker').selectpicker();
		}
		
		if (this.viewMode) {
			this.getContainer().parent().siblings(".wcm_title_widget").hide();
			this.createMenu();
			this.menuColors();
		}
    },
    
	bindings: {
		local: {
			'save': ['click_save']
		}
	}, 
	
	createMenu: function() {
		var $this = this;
		
		this.listData();
		
		// list elements that doesn't have father
		var elements = this.lookingFor(null);
		
		var $level1 = $("<div>", {"id": "level1"});
		$this.getAccordionContainer().append($level1);
		
		// level 1
		$.each(elements, function(key, item) {
			var itemName = item.name;
			var $panel = $this.createPanel(item, false);
			$level1.append($panel);
			
			// level 2
			var $target = $("#" + item.id + " .list-group");
			var elementsLevel2 = $this.lookingFor(item.id);
			$.each(elementsLevel2, function(key, value) {
				var $a = $("<a>", {
					"href": "#" + value.id,
					"class": "list-group-item",
					"text": value.name,
					'data-link': value.link,
					'data-parentname': itemName
				});
				
				$target.append($a);
			});
		});
		
		// level n
		$(document).on("click", ".list-group-item", function(e) {
			e.preventDefault();
			
			if ($(this).attr('data-link').trim() !== '') {
				var idProduct = $(this).attr("href").replace("#", "");
				var url = $(this).attr("data-link");
				window.open(url, $this.targetLink);
				return;
			}
			
			var itemId = $(this).attr("href").split("#").reverse()[0];
			var itemName = $(this).text().trim();
			
			var $levelContainer = $("#level" + itemId);
			
			if ($levelContainer.length == 0) {
				$levelContainer = $("<div>", {'id': 'level' + itemId});
				
				var $panel = $this.createPanel({
					'id': itemId,
					'name': itemName
				}, false);
				
				$levelContainer.append($panel);
				$this.getAccordionContainer().append($levelContainer);
				
				var elements = $this.lookingFor(itemId);
				
				$.each(elements, function(key, value) {
					var $a = $("<a>", {
						"href": "#" + value.id,
						"class": "list-group-item",
						"text": value.name,
						'data-link': value.link,
					});
					
					$panel.append($a);
				});
			}
			
			var $firstLink = $this.createListItem(itemName, true);
        	
        	var $breadcrumb = $(".breadcrumb", $this.getContainer());
        	
        	$breadcrumb
        	.append( $firstLink )
        	.show('slow'); 
        	
        	$firstLink.click(function() {
        		$("[id^=level]:not(#level" + itemId + ")", $this.getContainer()).hide('slow');
            	$("#level" + itemId, $this.getContainer()).show('slow');
            	
        	});

			$("[id^=level]:not(#level" + itemId + ")", $this.getContainer()).hide('slow');
        	$("#level" + itemId, $this.getContainer()).show('slow');
        	
        	$this.menuColors();
		});
		
		// breadcrumbs
		$(document).on("click", ".breadcrumb li", function(e) {
			e.preventDefault();
			
			$(this).addClass('breadcrumb-selected');
			
			console.log($(this));
			console.log($(".breadcrumb li.breadcrumb-selected"));
			
			$(".breadcrumb li.breadcrumb-selected").nextAll().remove();
			
			$(this).removeClass('breadcrumb-selected');
			
			if ($(".breadcrumb li").length <= 1) {
				$(".breadcrumb").hide("slow");
				$("[id^=level]:not(#level1)", $this.getContainer()).hide('slow');
	        	$("#level1").show('slow');
			}
		});
	},
	
	createPanel: function(element, isClose) {
		var $this = this;
		var $panel = $("<div>", { 'class': 'panel panel-default' });
		
		var $panelHeading = $("<div>", {'class': 'panel-heading'});
		var $h4 = $("<h4>", {'class': 'panel-title'});
		var $span = $("<span>", {'class': "fluigicon " + $this.menuIcon});
		
		if ($.trim(element.link) !== "") {
			var $aTitle = $("<a>", {
				"href": element.link,
				"html": $span[0].outerHTML + " " + element.name,
				"target": $this.targetLink,
				"data-parent": ""
			});
		}
		else {
			var $aTitle = $("<a>", {
				"data-toggle": "collapse",
				"data-parent": "#accordion",
				"href": "#" + element.id,
				"html": $span[0].outerHTML + " " + element.name,
			});
		}
		
		var $panelCollapse = $("<div>", {
			'id': element.id,
			'class': 'panel-collapse collapse',
		});
		var $panelBody = $("<div>", {'class': 'panel-body'});
		var $listGroup = $("<div>", {'class': 'list-group'});
		
		$h4.append($aTitle);
		$panelHeading.append($h4);
		
		$panelBody.append($listGroup);
		$panelCollapse.append($panelBody);
		
		$panel.append($panelHeading).append($panelCollapse);
		
		return $panel;
	},
	
	createListItem: function(textContent, hasLink) {
		var $li = $("<li>", {'html': textContent});
		
		if (hasLink) {
			$li.addClass("active");
		}
		
		return $li;
	},
	
	getAccordionContainer: function() {
		if (!this.accordionContainer) {
			this.accordionContainer = $("#menu_accordion", this.getContainer());
		}
		return this.accordionContainer;
	},
	
	getContainer: function() {
		if (!this.container) {
			this.container = $("[id^=menu_of_links_" + this.instanceId + "]");
		}
		return this.container;
	},
	
	listData: function() {
		var $this = this;
		var constraints = [
            DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST),
        ];
        var ds = DatasetFactory.getDataset('menu_of_links', null, constraints, ["mdp_path"]);
        
        $.each(ds.values, function(key, value) {
        	$this.productsList.push({
        		'id': value.documentid,
        		'name': value.mdp_name,
        		'link': value.mdp_link,
        		'origin': value.mdp_origin
        	});
        });
	},
	
	lookingFor: function(isSonOf) {
		var sons = [];
		
		$.each(this.productsList, function(key, item) {
			if (item.origin == "") {
				item.origin = null;
			}
			
			if (isSonOf == item.origin) {
				sons.push(item);
			}
		});
		
		return sons;
	},
	
	menuColors: function() {
		$(".panel-heading", this.getContainer())
		.css({'background-color': this.menuColor});

		$(".panel-heading h4 *", this.getContainer())
		.css({'color': this.fontColor});
	},
	
	save: function() {
		var menuColor = $("#menu-color", this.getContainer()).val();
		var fontColor = $("#font-color", this.getContainer()).val();
		var targetLink = $("#targetLink", this.getContainer()).is(":checked") ? '_blank' : '_self';
		var menuIcon = $("#menu-icon", this.getContainer()).val();
		
		var result = WCMSpaceAPI.PageService.UPDATEPREFERENCES({async: false}, this.instanceId, {
    		'menuColor': menuColor,
    		'fontColor': fontColor,
    		'targetLink': targetLink,
    		'menuIcon': menuIcon
    	});
		
		if (result) {
			this.showToast('', "${i18n.getTranslation('js.toast.save.message')}", 'success');
		}
		else {
			this.showToast("${i18n.getTranslation('js.toast.error.title')}", "${i18n.getTranslation('js.toast.error.message')}", 'danger');
		}
	},
	
	showToast: function(title, message, type) {
		FLUIGC.toast({
			title: title,
			message: message,
			type: type
		});
	}
});
