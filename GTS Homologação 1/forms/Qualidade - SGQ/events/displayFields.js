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
		form.setVisibleById("divSecao2", false);
		form.setVisibleById("divSecao3", false);
		form.setVisibleById("divSecao4", false);
		form.setVisibleById("divSecao5", false);

	}else if (atv_atual == INICIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSecao2", false);
			form.setVisibleById("divSecao3", false);
			form.setVisibleById("divSecao4", false);
			form.setVisibleById("divSecao5", false);
		} 

	}else if (atv_atual == SECAO2) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSecao2", true);
			form.setVisibleById("divSecao3", false);
			form.setVisibleById("divSecao4", false);
			form.setVisibleById("divSecao5", false);
		}if (form.getFormMode() == 'VIEW') {
			form.setVisibleById("divSecao2", true);
			form.setVisibleById("divSecao3", false);
			form.setVisibleById("divSecao4", false);
			form.setVisibleById("divSecao5", false);
		}

	}else if (atv_atual == SECAO3) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSecao2", false);
			form.setVisibleById("divSecao3", true);
			form.setVisibleById("divSecao4", false);
			form.setVisibleById("divSecao5", false);
		}if (form.getFormMode() == 'VIEW') {
			form.setVisibleById("divSecao2", false);
			form.setVisibleById("divSecao3", true);
			form.setVisibleById("divSecao4", false);
			form.setVisibleById("divSecao5", false);
		}
	
	}else if (atv_atual == SECAO4) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSecao2", false);
			form.setVisibleById("divSecao3", false);
			form.setVisibleById("divSecao4", true);
			form.setVisibleById("divSecao5", false);
		}if (form.getFormMode() == 'VIEW') {
			form.setVisibleById("divSecao2", false);
			form.setVisibleById("divSecao3", false);
			form.setVisibleById("divSecao4", true);
			form.setVisibleById("divSecao5", false);
		}
	
	}else if (atv_atual == SECAO5) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSecao2", false);
			form.setVisibleById("divSecao3", false);
			form.setVisibleById("divSecao4", false);
			form.setVisibleById("divSecao5", true);
		} if (form.getFormMode() == 'VIEW') {
			form.setVisibleById("divSecao2", false);
			form.setVisibleById("divSecao3", false);
			form.setVisibleById("divSecao4", false);
			form.setVisibleById("divSecao5", true);
		}
	
	}	else if (atv_atual == FIM) {
			if(form.getValue("sgqTpSolicitacao") == 'Cadastrar'){
				form.setVisibleById("divSecao2", true);
				form.setVisibleById("divSecao3", false);
				form.setVisibleById("divSecao4", false);
				form.setVisibleById("divSecao5", false);

			}if(form.getValue("sgqTpSolicitacao") == 'Validar'){
				form.setVisibleById("divSecao2", false);
				form.setVisibleById("divSecao3", true);
				form.setVisibleById("divSecao4", false);
				form.setVisibleById("divSecao5", false);

			}if(form.getValue("sgqTpSolicitacao") == 'Abrir'){
				form.setVisibleById("divSecao2", false);
				form.setVisibleById("divSecao3", false);
				form.setVisibleById("divSecao4", true);
				form.setVisibleById("divSecao5", false);

			}if(form.getValue("sgqTpSolicitacao") == 'Descontinuar'){
				form.setVisibleById("divSecao2", false);
				form.setVisibleById("divSecao3", false);
				form.setVisibleById("divSecao4", false);
				form.setVisibleById("divSecao5", true);
			}
	}

}

