function beforeCancelProcess(colleagueId,processId){
	
	var message = "";
	var hasErros = false;
	var ehGestorSAC = false;
	
	//Se o usuário logado for gestor do processo, no papel gestorOrcamento, vai conseguir cancelar a solicitação
	var c1 = DatasetFactory.createConstraint('workflowColleagueRolePK.colleagueId', getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('workflowColleagueRolePK.companyId', getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('workflowColleagueRolePK.roleId', "gestorSAC", "gestorSAC", ConstraintType.MUST);
	
	var constraints = new Array(c1, c2, c3);
	var datasetWorkflowColleagueRole = DatasetFactory.getDataset('workflowColleagueRole', null, constraints, null);
	if(dsTemValor(datasetWorkflowColleagueRole)){
		ehGestorSAC = true;
	}
	
	
	if(!ehGestorSAC){
		hasErros = true;
		message = "ATENÇÃO! Não é possível cancelar a solicitação! Somente o gestor possui este privilégio!";
	}
	
	if (hasErros) {
	    throw  message;
	}
}