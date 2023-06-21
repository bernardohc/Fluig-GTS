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

		form.setVisibleById("divPesqOcorrencia", false);
        form.setVisibleById("divPesqTecOcorrencia", false);
	}else if (atv_atual == INICIO) {
		if (form.getFormMode() == 'MOD') {

		}

	}else if (atv_atual == Inicio_da_Pesquisa) {
		if (form.getFormMode() == 'MOD') {

		}

	}	else if (atv_atual == Registro_Ocorrências) {
		if (form.getFormMode() == 'MOD') {

		}

	}else if (atv_atual == Pesquisa_Pos_Safra) {
		if (form.getFormMode() == 'MOD') {

		}

	}	else if (atv_atual == Ocorrência_Pos_Safra) {
		if (form.getFormMode() == 'MOD') {

		}

	}


}

