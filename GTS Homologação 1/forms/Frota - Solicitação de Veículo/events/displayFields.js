function displayFields(form, customHTML) {

	var atv_atual = getValue("WKNumState");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);

	var usuarioCorrente = fluigAPI.getUserService().getCurrent();

	/*
	 * Globais
	 */

	if(atv_atual == INICIO_0) {

		form.setValue("solUsuarioFluig",  usuarioCorrente.getCode() );

		form.setVisibleById("divSolicitacao", true);
		form.setVisibleById("divAprovacao", false);
		form.setVisibleById("divEntregaGuarita", false);
		form.setVisibleById("divDevolucaoGuarita", false);
		form.setVisibleById("divOutrosMotoristas", false);

	}else if (atv_atual == INICIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSolicitacao", true);
			form.setVisibleById("divAprovacao", false);
			form.setVisibleById("divEntregaGuarita", false);
			form.setVisibleById("divDevolucaoGuarita", false);
			form.setVisibleById("divOutrosMotoristas", false);
		}

	}else if (atv_atual == APROVA_SOLICITACAO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSolicitacao", true);
			form.setVisibleById("divAprovacao", true);
			form.setVisibleById("divEntregaGuarita", false);
			form.setVisibleById("divDevolucaoGuarita", false);
		}

	}	else if (atv_atual == ENTREGA) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSolicitacao", true);
			form.setVisibleById("divAprovacao", true);
			form.setVisibleById("divEntregaGuarita", true);
			form.setVisibleById("divDevolucaoGuarita", false);
		}

	}else if (atv_atual == RECEBE) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSolicitacao", true);
			form.setVisibleById("divAprovacao", true);
			form.setVisibleById("divEntregaGuarita", true);
			form.setVisibleById("divDevolucaoGuarita", true);
		}

	}	else if (atv_atual == FIM) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSolicitacao", true);
			form.setVisibleById("divAprovacao", true);
			form.setVisibleById("divEntregaGuarita", true);
			form.setVisibleById("divDevolucaoGuarita", true);
		}

	}


}

