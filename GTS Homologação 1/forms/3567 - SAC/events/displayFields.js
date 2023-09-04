function displayFields(form,customHTML){ 
	var atv_atual = getValue("WKNumState");
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	injetarFuncoesUteisJS(form, customHTML);
	
	
	var ehGestorSAC = false;
	//Se o usuário logado for gestor do processo, no papel gestorOrcamento, vai conseguir cancelar a solicitação
	var c1 = DatasetFactory.createConstraint('workflowColleagueRolePK.colleagueId', getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('workflowColleagueRolePK.companyId', getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('workflowColleagueRolePK.roleId', "000029", "000029", ConstraintType.MUST);
	
	var constraints = new Array(c1, c2, c3);
	var datasetWorkflowColleagueRole = DatasetFactory.getDataset('workflowColleagueRole', null, constraints, null);
	if(dsTemValor(datasetWorkflowColleagueRole)){
		ehGestorSAC = true;
	}
	
	//Se não for um usuário GestorSAC oculta o botão Cancelar
	if(!ehGestorSAC){
		//botao cancelar
		customHTML.append("<script>window.parent.$('#wcm_widget').find('[data-cancel-workflow-request]').css('display','none');</script>");
		customHTML.append("<script>window.parent.$('#wcm_widget').find('[data-cancel-workflow-request]').removeAttr('data-cancel-workflow-request');</script>");
	}

	
	if(atv_atual == INICIO_0){
		
		form.setVisibleById("divInicia", true);
		
	}else if( atv_atual == INICIO ){
		
		form.setVisibleById("divInicia", true);
		
	}else if( atv_atual == CADASTRA_SAC ){
		
		form.setVisibleById("divCabecalho", true);
		form.setVisibleById("divRequisitante", true);
		form.setVisibleById("divSolicitacao", true);
		
		// desabilita botões padrões do Fluig, salvar e descartar (botao fica visivel mas sem acao)
		//botao salvar
		customHTML.append("<script>window.parent.$('#wcm_widget').find('[data-save]').css('display','none');</script>");
		customHTML.append("<script>window.parent.$('#wcm_widget').find('[data-save]').removeAttr('data-save');</script>");
		//botao descartar
		customHTML.append("<script>window.parent.$('#wcm_widget').find('[data-back]').css('display','none');</script>");
		customHTML.append("<script>window.parent.$('#wcm_widget').find('[data-back]').removeAttr('data-back');</script>");
		//botao transferir
		customHTML.append("<script>window.parent.$('#wcm_widget').find('[data-transfer]').css('display','none');</script>");
		customHTML.append("<script>window.parent.$('#wcm_widget').find('[data-transfer]').removeAttr('data-transfer');</script>");
		
		
	}else if( atv_atual == ATENDIMENTO_SETOR){
		
		form.setVisibleById("divCabecalho", true);
		form.setVisibleById("divRequisitante", true);
		form.setVisibleById("divSolicitacao", true);
		form.setVisibleById("divAtendimento", true);
		
	}else if( atv_atual == FIM ){
		
		form.setVisibleById("divCabecalho", true);
		form.setVisibleById("divDataEncerramento", true);
		form.setVisibleById("divRequisitante", true);
		form.setVisibleById("divSolicitacao", true);
		form.setVisibleById("divAtendimento", true);
		
	}

}


