function displayFields(form, customHTML) {

	var atv_atual = getValue("WKNumState");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);

	var usuarioCorrente = fluigAPI.getUserService().getCurrent();

	/*
	 * Globais
	 */
	

	if(atv_atual == INICIO_0) {
		form.setValue("solNomeSol", usuarioCorrente.getFullName());
		form.setValue("solMatSol", usuarioCorrente.getCode());

		customHTML.append("<script>$('.divVisualizaAnexo').show()</script>");
		if (!isMobile(form)) {
			//Somente mostra botão de download se for Web
			customHTML.append("<script>$('.btnDownloadFile').prop('disabled', false);</script>");
			customHTML.append("<script>$('.btnDownloadFile').show()</script>");
		}

		form.setVisibleById("imprimirRelatorio", false);

	}else if (atv_atual == INICIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divAddDespesa", true);
			form.setVisibleById("divImprimirSol", false);
			
		} 
		form.setVisibleById("divAprovacao", false);
		form.setVisibleById("divRevisao", false);
		form.setVisibleById("imprimirRelatorio", false);
	}else if (atv_atual == FIM) {
		form.setVisibleById("divImprimirSol", false);
		form.setVisibleById("divImprimirAprov", false);
		//form.setVisibleById("divImprimirRev", false);
		form.setVisibleById("divSalvarEnviar", false);
	}
}

