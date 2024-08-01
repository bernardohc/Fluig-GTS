function displayFields(form, customHTML) {

	var atv_atual = getValue("WKNumState");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);

	/*
	 * Globais
	 */
	

	if(atv_atual == INICIO_0) {
		form.setValue("sgSolUsuario", fluigAPI.getUserService().getCurrent().getFullName());
		
		form.setVisibleById("divBaseDados", false);
		
	}else if (atv_atual == INICIO) {
		form.setVisibleById("divBaseDados", false);
		// if (form.getFormMode() == 'MOD') {
			
		// } 

	}else if(atv_atual == PRE_ANALISE){
		//customHTML.append('<script>$(function () { $(".bpm-mobile-trash-column").hide(); });</script>');
		form.setValue("bdComInternaColab", fluigAPI.getUserService().getCurrent().getFullName());

		form.setVisibleById("divBaseDados", true);
	
		
	}else if (atv_atual == FIM) {
		
	}
}

