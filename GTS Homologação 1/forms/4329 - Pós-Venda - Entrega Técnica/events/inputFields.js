function inputFields(form){
	
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	  
	if (form.getValue('equipDataEntrega').match(regEx)) {
        var split = form.getValue('equipDataEntrega').split('-');
        form.setValue('equipDataEntrega', split[2] + '/' + split[1] + '/' + split[0]);
	}
	if (form.getValue('equipDataTerminoGarantia').match(regEx)) {
		var split = form.getValue('equipDataTerminoGarantia').split('-');
		form.setValue('equipDataTerminoGarantia', split[2] + '/' + split[1] + '/' + split[0]);
	}
	if (form.getValue('protoRecDataRecebimento').match(regEx)) {
		var split = form.getValue('protoRecDataRecebimento').split('-');
		form.setValue('protoRecDataRecebimento', split[2] + '/' + split[1] + '/' + split[0]);
	}
	if (form.getValue('NFAprovDataPrevPagto').match(regEx)) {
		var split = form.getValue('NFAprovDataPrevPagto').split('-');
		form.setValue('NFAprovDataPrevPagto', split[2] + '/' + split[1] + '/' + split[0]);
	}
	
	
}