$(function() {
	var $mdpTempCombo = $(".mdp-temp-combo");
	
	menuUtils.init();

	var rootItems = menuUtils.filterMenuItems(menuUtils.datasetItems, 'mdp_origin', '');
	menuUtils.populateSelectCombo(rootItems, $mdpTempCombo);

	
	$('#mdp_name').blur(function() {
		menuUtils.updatePath();
	});
	
	$('form').on('change', 'select', function() {
		$(this).nextAll().remove();
		
		menuUtils.updatePath();
		
		var selectedOption = $(this).val();
		var filteredItems = menuUtils.filterMenuItems(menuUtils.datasetItems, 'mdp_origin', selectedOption);
		if (filteredItems.length > 0) {
			var createdCombo = menuUtils.createSelectCombo($(this).parent());
			menuUtils.populateSelectCombo(filteredItems, createdCombo);
		}

		$('#mdp_origin').val(selectedOption);
	});
});


var menuUtils = {
	datasetItems: null,
	
	init: function() {
		var constraints = [ DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST) ];
		var datasetMenu = DatasetFactory.getDataset('menu_of_links', null, constraints, null);
		this.datasetItems = datasetMenu.values;
	},
	
	filterMenuItems: function(items, columnName, filterValue) {
		var filteredItems = [];
		$.each(items, function(key, value) {

			if (value[columnName] == filterValue) {
				filteredItems.push(value);
			}
	    });
		filteredItems.sort();
		return filteredItems;
	},

	updatePath : function() {
		$('#mdp_path').val("");

		var pathValue = null;

		$('#mdp_origin').parent().children('select').each(function() {
			var selectedOption = $(this).children(':selected').text();
			if ($(this).children(':selected').val() != '') {
				pathValue = (pathValue == null) ? "" : pathValue + ' \\ ';
				pathValue = pathValue + selectedOption;
			}
		});
		if (pathValue == null || pathValue == '') {
			$('#mdp_path').val($('#mdp_name').val());	
		} else {
			$('#mdp_path').val(pathValue + ' \\ ' + $('#mdp_name').val());
		}
	},
	
	populateSelectCombo: function(items, id) {
	    $.each(items, function(key, value) {
	    	var $option = $("<option>", {
	    		'value': value.documentid,
	    		'text': value.mdp_name
	    	});
	    	
	    	$(id).append($option);
	    });
	},

	createSelectCombo : function(parentElement) {
		var newCombo = $('<select></select>').attr({
			class: "form-control mdp-temp-combo",
		}).append('<option class="hidden" value="">Selecione...</option>');
		
		$(parentElement).append(newCombo);
		return newCombo;
	}

}