function inputFields(form){
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	  
	if (form.getValue('equipDataTerminoGarantia').match(regEx)) {
        var split = form.getValue('equipDataTerminoGarantia').split('-');
        form.setValue('equipDataTerminoGarantia', split[2] + '/' + split[1] + '/' + split[0]);
	}
	
}