function beforeCancelProcess(colleagueId,processId){
	
	var message = "";
	var hasErros = false;
	
	var ehGestorEntregaTecnica = false;
	//Se o usuário logado for gestor do processo, no papel gestorOrcamento, vai conseguir cancelar a solicitação
	var c1 = DatasetFactory.createConstraint('workflowColleagueRolePK.colleagueId', getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('workflowColleagueRolePK.companyId', getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('workflowColleagueRolePK.roleId', "gestorEntregaTecnica", "gestorEntregaTecnica", ConstraintType.MUST);
	
	var constraints = new Array(c1, c2, c3);
	var datasetWorkflowColleagueRole = DatasetFactory.getDataset('workflowColleagueRole', null, constraints, null);
	if(dsTemValor(datasetWorkflowColleagueRole)){
		ehGestorEntregaTecnica = true;
	}
	
	/*
	 * Se for marcado alguma das opções ou for Gestor do Processo, vai poder cancelar
	 */
	if( ehGestorEntregaTecnica ){
		
	}else{
		
		hasErros = true;
		message = "ATENÇÃO! Somente o gestor do processo possui permissão para cancelar solicitações!";
		
	}
	
	if (hasErros) {
        throw  message;
    }
	
}