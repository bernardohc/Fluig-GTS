function displayFields(form, customHTML) {

	var atv_atual = getValue("WKNumState");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);

	var usuarioCorrente = fluigAPI.getUserService().getCurrent();

	/*
	 * Globais
	 */
	showAbast(form, customHTML);

	if (!isMobile(form)) {
		form.setVisibleById("labelInserirImagem", true);
	}

	if (form.getFormMode() != 'ADD') {
		//Botão de visualizar imagem, só não exibe na atividade 0
		//Se for na 0 e Web, exibe botão de download
		customHTML.append("<script>$('.divVisualizaAnexo').show()</script>");
		customHTML.append("<script>$('.btnViewerFile').prop('disabled', false);</script>");
		customHTML.append("<script>$('.btnViewerFile').show()</script>");
	}

	if (atv_atual == INICIO_0) {
		form.setValue("solNomeSol", usuarioCorrente.getFullName());
		form.setValue("solMatSol", usuarioCorrente.getCode());

		form.setVisibleById("divAddDespesa", true);
		form.setValue("addRvDespCodiID", "1001");

		form.setVisibleById("tbRelDespesas", false);

		customHTML.append("<script>$('.divVisualizaAnexo').show()</script>");
		if (!isMobile(form)) {
			//Somente mostra botão de download se for Web
			customHTML.append("<script>$('.btnDownloadFile').prop('disabled', false);</script>");
			customHTML.append("<script>$('.btnDownloadFile').show()</script>");
		}

		form.setVisibleById("divAprovacao", false);
		form.setVisibleById("divRevisao", false);
		form.setVisibleById("divImprimirSol", false);

	} else if (atv_atual == INICIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divAddDespesa", true);
			form.setVisibleById("divImprimirSol", false);
			
		} else {

		}

		form.setVisibleById("divAprovacao", false);
		form.setVisibleById("divRevisao", false);
	} else if (atv_atual == SALVAR_RELATORIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divImprimirSol", true);
			form.setVisibleById("divAprovacao", false);
			form.setVisibleById("divRevisao", false);

			form.setVisibleById("divAddDespesa", true);
			
			// if(form.getValue("solSetor") == "tecnico"){
			// 	customHTML.append("<script>");
			// 	customHTML.append("$(document).ready(function(){ "); 
			// 	customHTML.append(" $('.divAbastecimento').hide();");
			// 	customHTML.append(" });");
			// 	customHTML.append("</script>");
			// }else if(form.getValue("solSetor") == "motorista"){
			// 	customHTML.append("<script>");
			// 	customHTML.append("$(document).ready(function(){ "); 
			// 	customHTML.append(" $('.divAbastecimento').hide();");
			// 	customHTML.append(" });");
			// 	customHTML.append("</script>");
			// }
	
		} 
	} else if (atv_atual == ANALISA_RELATORIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divRevisao", false);
			form.setVisibleById("divSalvarEnviar", false);
		}
		form.setVisibleById("divAddDespesa", false);
	} else if (atv_atual == AJUSTA_RELATORIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divAddDespesa", false);
			form.setVisibleById("divImprimirAprov", false);
			form.setVisibleById("divImprimirRev", false);
			form.setVisibleById("divAddDespesa", true);
		}
		if(form.getValue("revisaoRelatorio") == '' ){
			form.setVisibleById("divRevisao", false);
		}
	} else if (atv_atual == REVISA_RELATORIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divImprimirSol", false);
			form.setVisibleById("divImprimirAprov", false);
			form.setVisibleById("divSalvarEnviar", false);
		}
	} else if (atv_atual == FIM) {
		form.setVisibleById("divImprimirSol", false);
		form.setVisibleById("divImprimirAprov", false);
		form.setVisibleById("divImprimirRev", false);
		form.setVisibleById("divSalvarEnviar", false);
	}
}

function showAbast(form, customHTML){
	var atv_atual = getValue("WKNumState");
	var showAbast = false;
	if(atv_atual == INICIO_0 || atv_atual == INICIO || atv_atual == SALVAR_RELATORIO){
		if(form.getValue("solSetor") == "outro"){
			showAbast = true;
		}
	}else if(atv_atual == ANALISA_RELATORIO || atv_atual == FIM || atv_atual == REVISA_RELATORIO){
		showAbast = true;
	}
	var index = form.getChildrenIndexes("tbRelDespesas");
		if(index.length > 0){
		    for (var i = 0; i < index.length; i++) { 
				if(form.getValue("rvDespClassi___"+index[i]) == "Combustível" && showAbast){
					customHTML.append("<script>$('input[name*=rvDespCnpj___"+index[i]+"]').closest('.abast').show();</script>");
					customHTML.append("<script>$('input[name*=rvDespNomePosto___"+index[i]+"]').closest('.abast').show();</script>");
					customHTML.append("<script>$('input[name*=rvDespTpComb___"+index[i]+"]').closest('.abast').show();</script>");
					customHTML.append("<script>$('input[name*=rvDespKmAbast___"+index[i]+"]').closest('.abast').show();</script>");
					customHTML.append("<script>$('input[name*=rvDespQtdL___"+index[i]+"]').closest('.abast').show();</script>");
					customHTML.append("<script>$('input[name*=rvDespValorL___"+index[i]+"]').closest('.abast').show();</script>");
				}
		    }
		}
}



