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
		form.setValue("solNomeSol",  usuarioCorrente.getFullName() );
		form.setValue('solIdSol', getValue('WKNumProces'));
		form.setValue("solMatSol",  usuarioCorrente.getCode() );

		form.setVisibleById("tbRelDespesas", true);

		form.setVisibleById("divAprovacao", false);
		form.setVisibleById("divRevisao", false);
	}else if (atv_atual == INICIO) {
		if (form.getFormMode() == 'MOD') {
			
		}

	}/*else if (atv_atual == Registro_Ocorrências) {
		if (form.getFormMode() == 'MOD') {
			

		}

	}else if (atv_atual == Pesquisa_Pos_Safra) {
		if (form.getFormMode() == 'MOD') {

		}

	}else if (atv_atual == Ocorrência_Pos_Safra) {
		if (form.getFormMode() == 'MOD') {
			
		}

	}else if (atv_atual == FIM) {

	}*/
}




