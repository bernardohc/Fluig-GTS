function displayFields(form, customHTML) {

	var atv_atual = getValue("WKNumState");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);

	var usuarioCorrente = fluigAPI.getUserService().getCurrent();
	console.log(usuarioCorrente);

	var nome_completo = fluigAPI.getUserService().getCurrent().getFullName();
	console.log(nome_completo);
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
			form.setValue("pesNomePesquisador",  usuarioCorrente.getFullName() );
			if(form.getValue("pesqOcorrencia") == "sim"){
				form.setVisibleById("divPesqOcorrencia", true);
				form.setVisibleById("divFimOcorrencia", true);
			}else{
			form.setVisibleById("divPesqOcorrencia", false);
			form.setVisibleById("divFimOcorrencia", false);
			form.setVisibleById("divPsPesqOcorrencia", false);
			form.setVisibleById("divPsFimOcorrencia", false);
			}
		}if (form.getFormMode() == 'VIEW') {
			customHTML.append("<script>$('#pesqPrevColheita').attr('readonly', true);</script>");	
			customHTML.append("<script>$('#pesqPrevColheita').prop('style', 'pointer-events:none');</script>");

			disableCampo(form, customHTML);
		}

	}else if (atv_atual == Registro_Ocorrências) {
		if (form.getFormMode() == 'MOD') {
			form.setValue("pesNomePesquisador",  usuarioCorrente.getFullName() );
			controleAbas(form, customHTML, 'indisponivel');

		}if (form.getFormMode() == 'VIEW') {
			customHTML.append("<script>$('#pesqPrevColheita').attr('readonly', true);</script>");	
			customHTML.append("<script>$('#pesqPrevColheita').prop('style', 'pointer-events:none');</script>");

			disableCampo(form, customHTML);
			controleAbas(form, customHTML, 'indisponivel');
		}
	}else if (atv_atual == Aguardando_Colheita) {
		if (form.getFormMode() == 'MOD') {
			form.setValue("pesNomePesquisador",  usuarioCorrente.getFullName() );
			controleAbas(form, customHTML, 'indisponivel');

			if(form.getValue("pesqOcorrencia") == "sim"){
				form.setVisibleById("divPesqOcorrencia", true);
				form.setVisibleById("divFimOcorrencia", true);
			}else{
			form.setVisibleById("divPesqOcorrencia", false);
			form.setVisibleById("divFimOcorrencia", false);
			form.setVisibleById("divPsPesqOcorrencia", false);
			form.setVisibleById("divPsFimOcorrencia", false);
			}

		}if (form.getFormMode() == 'VIEW') {
			customHTML.append("<script>$('#pesqPrevColheita').attr('readonly', true);</script>");	
			customHTML.append("<script>$('#pesqPrevColheita').prop('style', 'pointer-events:none');</script>");

			disableCampo(form, customHTML);
		}
	}else if (atv_atual == Pesquisa_Pos_Safra) {
		if (form.getFormMode() == 'MOD') {
			form.setValue("pesNomePesquisador",  usuarioCorrente.getFullName() );
			controleAbas(form, customHTML, 'disponivel');

			if(form.getValue("pesqOcorrencia") == "sim"){
				form.setVisibleById("divPesqOcorrencia", true);
				form.setVisibleById("divFimOcorrencia", true);
			}else{
			form.setVisibleById("divPesqOcorrencia", false);
			form.setVisibleById("divFimOcorrencia", false);
			form.setVisibleById("divPsPesqOcorrencia", false);
			form.setVisibleById("divPsFimOcorrencia", false);
			}

			// form.setVisibleById("divFimOcorrencia", false);
			form.setVisibleById("divPsPesqOcorrencia", false);
			form.setVisibleById("divPsFimOcorrencia", false);
			form.setVisibleById("divAddOcorrencia", false);

		}if (form.getFormMode() == 'VIEW') {
			customHTML.append("<script>$('#pesqPrevColheita').attr('readonly', true);</script>");	
			customHTML.append("<script>$('#pesqPrevColheita').prop('style', 'pointer-events:none');</script>");

			controleAbas(form, customHTML, 'disponivel');
			disableCampo(form, customHTML);
			disableCampoPs(form, customHTML);
		}

		disableCampo(form, customHTML);
		

	}else if (atv_atual == Ocorrência_Pos_Safra) {
		if (form.getFormMode() == 'MOD') {
			form.setValue("pesNomePesquisador",  usuarioCorrente.getFullName() );
			controleAbas(form, customHTML, 'disponivel');

			form.setVisibleById("divFimOcorrencia", false);
			form.setVisibleById("divAddOcorrencia", false);
		}if (form.getFormMode() == 'VIEW') {
			customHTML.append("<script>$('#pesqPrevColheita').attr('readonly', true);</script>");	
			customHTML.append("<script>$('#pesqPrevColheita').prop('style', 'pointer-events:none');</script>");

			controleAbas(form, customHTML, 'disponivel');
			disableCampo(form, customHTML);
			disableCampoPs(form, customHTML);
		}

	}else if (atv_atual == FIM_1 || FIM_2 || FIM_3) {
		form.setValue("pesNomePesquisador",  usuarioCorrente.getFullName() );
		controleAbas(form, customHTML, 'disponivel');
	
		form.setVisibleById("divAddOcorrencia", false);
		form.setVisibleById("divAddOcorrenciaPs", false);	

		disableCampo(form, customHTML);
		disableCampoPs(form, customHTML);

		customHTML.append("<script>$('#pesqPrevColheita').attr('readonly', true);</script>");	
		customHTML.append("<script>$('#pesqPrevColheita').prop('style', 'pointer-events:none');</script>");
		
	}
};

function controleAbas(form, customHTML, tabNavegacao){
	if(tabNavegacao == 'disponivel'){
		customHTML.append("<script>$('#tabPesquisaPosSfra').removeClass('disabled');</script>");
		customHTML.append("<script>$('#tabPesquisaPosSfra a').prop('href', '#divPesquisaPosSafra');</script>");
	}
};

function disableCampo(form, customHTML){
	//customHTML.append("<script>$('#pesqAcompanhouEntrega').prop('readonly', true);</script>");
	//customHTML.append("<script>$('#pesqTelefone').prop('readonly', true);</script>");
	customHTML.append("<script>$('#pesqNotaAtendimento').attr('readonly', true);</script>");
	customHTML.append("<script>$('#pesqNotaAtendimento').prop('style', 'pointer-events:none');</script>");
	customHTML.append("<script>$('#pesqNotaDesempenho').attr('readonly', true);</script>");
	customHTML.append("<script>$('#pesqNotaDesempenho').prop('style', 'pointer-events:none');</script>");
	customHTML.append("<script>$('#pesqTermColheita').attr('readonly', true);</script>");
	customHTML.append("<script>$('#pesqTermColheita').prop('style', 'pointer-events:none');</script>");
	//customHTML.append("<script>$('#pesqPrevColheita').attr('readonly', true);</script>");	
	//customHTML.append("<script>$('#pesqPrevColheita').prop('style', 'pointer-events:none');</script>");
	customHTML.append("<script>$('#pesqOcorrencia').attr('readonly', true);</script>");	
	customHTML.append("<script>$('#pesqOcorrencia').prop('style', 'pointer-events:none');</script>");	
};

function disableCampoPs(form, customHTML){
	customHTML.append("<script>$('#psPesqAcompanhouEntrega').prop('readonly', true);</script>");
	customHTML.append("<script>$('#psPesqTelefone').prop('readonly', true);</script>");
	customHTML.append("<script>$('#psPesqDispRevenda').prop('readonly', true);</script>");	
	customHTML.append("<script>$('#psPesqNotaAtendimento').attr('readonly', true);</script>");
	customHTML.append("<script>$('#psPesqNotaAtendimento').prop('style', 'pointer-events:none');</script>");
	customHTML.append("<script>$('#psPesqNotaDesempenho').attr('readonly', true);</script>");
	customHTML.append("<script>$('#psPesqNotaDesempenho').prop('style', 'pointer-events:none');</script>");
	customHTML.append("<script>$('#psPesqDispRevenda').attr('readonly', true);</script>");
	customHTML.append("<script>$('#psPesqDispRevenda').prop('style', 'pointer-events:none');</script>");
	customHTML.append("<script>$('#psPesqOcorrencia').attr('readonly', true);</script>");	
	customHTML.append("<script>$('#psPesqOcorrencia').prop('style', 'pointer-events:none');</script>");	
};


