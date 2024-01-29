function displayFields(form, customHTML) {

	var atv_atual = getValue("WKNumState");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);

	var usuarioCorrente = fluigAPI.getUserService().getCurrent();
	console.log(usuarioCorrente);

	var nome_completo = fluigAPI.getUserService().getCurrent().getFullName();
	console.log(nome_completo);
	/*
	 * Globais
	 */

	if(atv_atual == INICIO_0) {
		
	}
};

