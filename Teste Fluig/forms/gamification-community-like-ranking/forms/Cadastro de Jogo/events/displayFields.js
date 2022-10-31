function displayFields(form,customHTML){
	
	if(form.getFormMode() == "ADD") {
		form.setValue("eventidentifier",new Date().getTime());
		form.setValue("isactive","Ativo");
	}
	
}