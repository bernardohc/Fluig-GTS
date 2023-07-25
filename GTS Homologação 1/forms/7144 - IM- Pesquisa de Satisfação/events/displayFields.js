function displayFields(form, customHTML) {

	var atv_atual = getValue("WKNumState");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);

	var usuarioCorrente = fluigAPI.getUserService().getCurrent();

	/*
	 * Globais
	 */

	if(atv_atual == INICIO_0) {
		controleAbas(form, customHTML, 'indisponivel');

		form.setValue("pesNomePesquisador",  usuarioCorrente.getFullName() );
		form.setValue('processoId', getValue('WKNumProces'));
		form.setValue("solUsuarioFluig",  usuarioCorrente.getCode() );
		//Oculta divs ocorrencias
		form.setVisibleById("divPesqOcorrencia", false);
		form.setVisibleById("divFimOcorrencia", false);
        form.setVisibleById("divPsPesqOcorrencia", false);
        form.setVisibleById("divPsFimOcorrencia", false);
	}else if (atv_atual == INICIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divPesqOcorrencia", false);
			form.setVisibleById("divFimOcorrencia", false);
        	form.setVisibleById("divPsPesqOcorrencia", false);
        	form.setVisibleById("divPsFimOcorrencia", false);
		}

	}else if (atv_atual == Registro_Ocorrências) {
		if (form.getFormMode() == 'MOD') {
			controleAbas(form, customHTML, 'indisponivel');

		}

	}else if (atv_atual == Pesquisa_Pos_Safra) {
		if (form.getFormMode() == 'MOD') {

			controleAbas(form, customHTML, 'disponivel');

			form.setVisibleById("divFimOcorrencia", false);
        	form.setVisibleById("divPsPesqOcorrencia", false);
        	form.setVisibleById("divPsFimOcorrencia", false);
        	form.setVisibleById("divAddOcorrencia", false);
		}

	}else if (atv_atual == Ocorrência_Pos_Safra) {
		if (form.getFormMode() == 'MOD') {
			controleAbas(form, customHTML, 'disponivel');

			form.setVisibleById("divFimOcorrencia", false);
			form.setVisibleById("divAddOcorrencia", false);
		}

	}else if (atv_atual == FIM) {
		controleAbas(form, customHTML, 'disponivel');
		
		form.setVisibleById("divAddOcorrencia", false);
		form.setVisibleById("divAddOcorrenciaPs", false);		
	}
}

function controleAbas(form, customHTML, tabNavegacao){
	
	
	if(tabNavegacao == 'disponivel'){
		customHTML.append("<script>$('#tabPesquisaPosSfra').removeClass('disabled');</script>");
		customHTML.append("<script>$('#tabPesquisaPosSfra a').prop('href', '#divPesquisaPosSafra');</script>");
	}

}

