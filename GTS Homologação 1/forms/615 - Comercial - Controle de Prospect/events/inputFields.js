function inputFields(form){
	
	
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	 
	if (form.getValue("dataAberturaSolicitacao").match(regEx)) {
		var split = form.getValue("dataAberturaSolicitacao").split('-');
		form.setValue("dataAberturaSolicitacao", split[2] + '/' + split[1] + '/' + split[0]);
	}
	
}