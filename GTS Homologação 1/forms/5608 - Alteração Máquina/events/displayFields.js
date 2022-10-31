function displayFields(form, customHTML) {

	var atv_atual = getValue("WKNumState");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);

	var usuarioCorrente = fluigAPI.getUserService().getCurrent();

	/*
	 * Globais
	 */

	if (atv_atual == INICIO_0) {

		form.setValue("solNomeSolicitante", usuarioCorrente.getFullName());

		form.setVisibleById("divSolicitacao", true);

	} else if (atv_atual == INICIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSolicitacao", true);
		}

	} else if (atv_atual == ANALISA_ALTERACAO) {
		if (form.getFormMode() == 'MOD') {
			// Oculta botão excluir de tabela paiXfilho
			form.setHideDeleteButton(true);
			form.setVisibleById("divAprovacao", true);

		}

	} else if (atv_atual == FIM) {
		form.setVisibleById("divAprovacao", true);
	} 
	
}
