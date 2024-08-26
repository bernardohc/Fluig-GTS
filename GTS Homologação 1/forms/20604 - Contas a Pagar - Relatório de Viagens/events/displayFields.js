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

		//Preenche nome do motorista com o nome de quem está abrindo a solicitação
		var dsAbastConsultaMotorista = DatasetFactory.getDataset("dsAbastConsultaMotorista", null, null, null);
		if(dsTemValor(dsAbastConsultaMotorista)){
			//COD_MOTORISTA
			if( dsAbastConsultaMotorista.getValue(0, "COD_MOTORISTA") != '' && dsAbastConsultaMotorista.getValue(0, "COD_MOTORISTA") !== undefined && dsAbastConsultaMotorista.getValue(0, "COD_MOTORISTA") != 'undefined' ){ 
				form.setValue("geraisCodMotorista",  dsAbastConsultaMotorista.getValue(0, "COD_MOTORISTA") );
			}
			//CPF_MOTORISTA
			if( dsAbastConsultaMotorista.getValue(0, "CPF_MOTORISTA") != '' && dsAbastConsultaMotorista.getValue(0, "CPF_MOTORISTA") !== undefined && dsAbastConsultaMotorista.getValue(0, "CPF_MOTORISTA") != 'undefined' ){ 
				form.setValue("geraisCPFMotorista",  dsAbastConsultaMotorista.getValue(0, "CPF_MOTORISTA") );
			}
		}

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
		form.setVisibleById("imprimirRelatorio", false);

	} else if (atv_atual == INICIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divAddDespesa", true);
			form.setVisibleById("divImprimirSol", false);
			
		} 
		form.setVisibleById("divAprovacao", false);
		form.setVisibleById("divRevisao", false);
		form.setVisibleById("imprimirRelatorio", false);
	} else if (atv_atual == SALVAR_RELATORIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divImprimirSol", true);
			form.setVisibleById("divAprovacao", false);
			form.setVisibleById("divRevisao", false);
			form.setVisibleById("divAddDespesa", true);
		} 
		form.setVisibleById("divAprovacao", false);
		form.setVisibleById("divRevisao", false);
		//form.setVisibleById("imprimirRelatorio", false);
	} else if (atv_atual == ANALISA_RELATORIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divRevisao", false);
			form.setVisibleById("divSalvarEnviar", false);
		}
		form.setVisibleById("divAddDespesa", false);
		form.setVisibleById("divRevisao", false);	
		form.setVisibleById("divImprimirSol", false);	
		//form.setVisibleById("divImprimirAprov", false);	
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
		form.setVisibleById("imprimirRelatorio", false);	
		form.setVisibleById("divImprimirAprov", false);	
	} else if (atv_atual == REVISA_RELATORIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divImprimirSol", false);
			form.setVisibleById("divImprimirAprov", false);
			form.setVisibleById("divSalvarEnviar", false);
		}
		form.setVisibleById("imprimirRelatorio", false);	
		form.setVisibleById("divImprimirAprov", false);	
	} else if (atv_atual == INTEGRACAO_ABASTECIMENTO) {
	
		
	} else if (atv_atual == ANALISA_ERRO_INTEGRACAO_ABASTECIMENTO) {

		form.setVisibleById("divCodMotorista", true);
		form.setVisibleById("divCpfMotorista", true);
		form.setVisibleById("divSalvarEnviar", false);
	
	} else if (atv_atual == FIM) {
		form.setVisibleById("divImprimirSol", false);
		form.setVisibleById("divImprimirAprov", false);
		//form.setVisibleById("divImprimirRev", false);
		form.setVisibleById("divSalvarEnviar", false);
	}
}

function showAbast(form, customHTML){
	
	var atv_atual = getValue("WKNumState");
	var showAbast = false;
	if(atv_atual == INICIO_0 || atv_atual == INICIO || atv_atual == SALVAR_RELATORIO || atv_atual == AJUSTA_RELATORIO ){
		if(form.getValue("solSetor") == "outro" || form.getValue("solSetor") == "tecnico" || form.getValue("solSetor") == "motorista"){
			showAbast = true;
		}
	}else if(atv_atual == ANALISA_RELATORIO || atv_atual == REVISA_RELATORIO || atv_atual == INTEGRACAO_ABASTECIMENTO || atv_atual == ANALISA_ERRO_INTEGRACAO_ABASTECIMENTO || atv_atual == FIM){
		//Nas próximas etapas, sempre vai mostrar os campos, qdo for do tipo 'Combustível'
		showAbast = true;
	}

	if(atv_atual == ANALISA_ERRO_INTEGRACAO_ABASTECIMENTO){
			
		customHTML.append('<script>$(function () { $(".bpm-mobile-trash-column").hide(); }');	
		
	}
	
	var index = form.getChildrenIndexes("tbRelDespesas");
	if(index.length > 0){
		for (var i = 0; i < index.length; i++) { 
			if(form.getValue("rvDespClassi___"+index[i]) == "Combustível" && showAbast){
				customHTML.append("<script>$('input[name*=rvDespCnpj___"+index[i]+"]').closest('.abast').show();</script>");
				customHTML.append("<script>$('input[name*=rvDespNomePosto___"+index[i]+"]').closest('.abast').show();</script>");
				customHTML.append("<script>$('input[name*=rvDespPlaca___"+index[i]+"]').closest('.abast').show();</script>");
				customHTML.append("<script>$('input[name*=rvDespVeiculo___"+index[i]+"]').closest('.abast').show();</script>");
				customHTML.append("<script>$('input[name*=rvDespKmAbast___"+index[i]+"]').closest('.abast').show();</script>");
				customHTML.append("<script>$('input[name*=rvDespQtdL___"+index[i]+"]').closest('.abast').show();</script>");
				customHTML.append("<script>$('input[name*=rvDespValorL___"+index[i]+"]').closest('.abast').show();</script>");
				customHTML.append("<script>$('input[name*=rvDespTpCombText___"+index[i]+"]').closest('.abast').show();</script>");

				// if(atv_atual == ANALISA_RELATORIO){
				// 	//Qdo for na atividade ANALISA_RELATORIO e o setor não for outro, pode editar o combustivel
				// 	if(form.getValue("solSetor") != "outro"){
				// 		//customHTML.append("<script>$('select[name*=rvDespTpComb___"+index[i]+"]').closest('.abast').show();</script>");
				// 		customHTML.append("<script>$('input[name*=rvDespTpCombText___"+index[i]+"]').closest('.abast').show();</script>");
				// 	}else{
				// 		customHTML.append("<script>$('input[name*=rvDespTpCombText___"+index[i]+"]').closest('.abast').show();</script>");
				// 	}
				// }else{
				// 	customHTML.append("<script>$('input[name*=rvDespTpCombText___"+index[i]+"]').closest('.abast').show();</script>");
				// }
			}
		}
	}

}
