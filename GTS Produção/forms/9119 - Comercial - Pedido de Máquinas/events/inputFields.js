function inputFields(form){
	
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	  
	if (form.getValue('solDataAbertura').match(regEx)) {
        var split = form.getValue('solDataAbertura').split('-');
        form.setValue('solDataAbertura', split[2] + '/' + split[1] + '/' + split[0]);
	}
	
	if (form.getValue('solDataValidadePedido').match(regEx)) {
        var split = form.getValue('solDataValidadePedido').split('-');
        form.setValue('solDataValidadePedido', split[2] + '/' + split[1] + '/' + split[0]);
	}
	
	if (form.getValue('pedDataPrevEmbarque').match(regEx)) {
        var split = form.getValue('pedDataPrevEmbarque').split('-');
        form.setValue('pedDataPrevEmbarque', split[2] + '/' + split[1] + '/' + split[0]);
	}
}