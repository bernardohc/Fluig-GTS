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

	if(atv_atual == INICIO_0 || atv_atual == INICIO) {
		form.setVisibleById("divLeitura", true);

		form.setValue("usrVisu",  usuarioCorrente.getFullName() );
		form.setValue('processoId', getValue('WKNumProces'));

		form.setVisibleById("btnInicia", true);
		form.setVisibleById("btnPolitica", false);
		form.setVisibleById("btCheckbox", false);
		form.setVisibleById("btnConfirma", false);

	}else if(atv_atual == Leitura) {
		form.setVisibleById("divLeitura", true);

		form.setVisibleById("btnInicia", false);
		form.setVisibleById("btnPolitica", true);

	}
};

