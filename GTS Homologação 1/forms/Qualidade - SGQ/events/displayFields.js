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
		form.setVisibleById("divAtendimento", false);

	}else if (atv_atual == INICIO) {
		form.setVisibleById("divAtendimento", false);

	}else if (atv_atual == AGUARDANDO_ATENDIMENTO) {
		form.setVisibleById("divAtendimento", true);
		form.setVisibleById("divSgqAcao", false);
		if(form.getValue("sgqTpSolicitacao") == 'Cadastrar'){
			form.setVisibleById("divSecao2", true);
			form.setVisibleById("divSecao3", false);
			form.setVisibleById("divSecao4", false);
			form.setVisibleById("divSecao5", false);
		}
		if(form.getValue("sgqTpSolicitacao") == 'Validar'){
			form.setVisibleById("divSecao2", false);
			form.setVisibleById("divSecao3", true);
			form.setVisibleById("divSecao4", false);
			form.setVisibleById("divSecao5", false);
		}
		if(form.getValue("sgqTpSolicitacao") == 'Abrir'){
			form.setVisibleById("divSecao2", false);
			form.setVisibleById("divSecao3", false);
			form.setVisibleById("divSecao4", true);
			form.setVisibleById("divSecao5", false);
		}
		if(form.getValue("sgqTpSolicitacao") == 'Descontinuar'){
			form.setVisibleById("divSecao2", false);
			form.setVisibleById("divSecao3", false);
			form.setVisibleById("divSecao4", false);
			form.setVisibleById("divSecao5", true);
		}

	}else if (atv_atual == ANALISE_DOCUMENTO) {
		form.setVisibleById("divAtendimento", true);
		if(form.getValue("sgqTpSolicitacao") == 'Cadastrar'){
			form.setVisibleById("divSecao2", true);
			form.setVisibleById("divSecao3", false);
			form.setVisibleById("divSecao4", false);
			form.setVisibleById("divSecao5", false);
		}
		if(form.getValue("sgqTpSolicitacao") == 'Validar'){
			form.setVisibleById("divSecao2", false);
			form.setVisibleById("divSecao3", true);
			form.setVisibleById("divSecao4", false);
			form.setVisibleById("divSecao5", false);
		}
		if(form.getValue("sgqTpSolicitacao") == 'Abrir'){
			form.setVisibleById("divSecao2", false);
			form.setVisibleById("divSecao3", false);
			form.setVisibleById("divSecao4", true);
			form.setVisibleById("divSecao5", false);
		}
		if(form.getValue("sgqTpSolicitacao") == 'Descontinuar'){
			form.setVisibleById("divSecao2", false);
			form.setVisibleById("divSecao3", false);
			form.setVisibleById("divSecao4", false);
			form.setVisibleById("divSecao5", true);
		}

	}else if (atv_atual == FIM) {
			
	}

}

