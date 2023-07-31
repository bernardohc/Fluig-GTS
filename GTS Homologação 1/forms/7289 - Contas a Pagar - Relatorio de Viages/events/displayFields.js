function displayFields(form, customHTML) {

	var atv_atual = getValue("WKNumState");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);
	
	var usuarioCorrente = fluigAPI.getUserService().getCurrent();

	/*
	 * Globais
	 */
	if(!isMobile(form)){
		form.setVisibleById("labelInserirImagem", true);
	}
	
	if(form.getFormMode() != 'ADD'){
		//Botão de visualizar imagem, só não exibe na atividade 0
		//Se for na 0 e Web, exibe botão de download
		customHTML.append("<script>$('.btnViewerFile').prop('disabled', false);</script>");
		customHTML.append("<script>$('.btnViewerFile').show()</script>");
	}


	if(atv_atual == INICIO_0) {
		form.setValue("solNomeSol",  usuarioCorrente.getFullName() );
		form.setValue("solMatSol",  usuarioCorrente.getCode() );

		form.setVisibleById("divAddDespesa", true);
		form.setValue("addRvDespCodiID",  "1000" );

		form.setVisibleById("tbRelDespesas", false);
		if(!isMobile(form)){
			//Somente mostra botão de download se for Web
			customHTML.append("<script>$('.btnDownloadFile').prop('disabled', false);</script>");
			customHTML.append("<script>$('.btnDownloadFile').show()</script>");
		}
		

		form.setVisibleById("divAprovacao", false);
		form.setVisibleById("divRevisao", false);
	}else if (atv_atual == INICIO) {

		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divAddDespesa", true);
		}else{
			
		}

		form.setVisibleById("divAprovacao", false);
		form.setVisibleById("divRevisao", false);
		
	}else if (atv_atual == SALVAR_RELATORIO) {

		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divAddDespesa", true);

		}else{
		}

		form.setVisibleById("divAprovacao", false);
		form.setVisibleById("divRevisao", false);

	}else if (atv_atual == ANALISA_RELATORIO) {


		if (form.getFormMode() == 'MOD') {

		}

	}else if (atv_atual == AJUSTA_RELATORIO) {


		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divAddDespesa", false);
		}

	}else if (atv_atual == REVISA_RELATORIO) {


		if (form.getFormMode() == 'MOD') {
			
		}

	}else if (atv_atual == FIM) {

	}
}




