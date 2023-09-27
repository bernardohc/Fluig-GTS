function beforeCancelProcess(colleagueId,processId){
	
	var message = "";
	var hasErros = false;
	
	var ehGestorProcesso= false;

	var c1 = DatasetFactory.createConstraint('colleagueGroupPK.companyId', getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('colleagueGroupPK.colleagueId', getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	//000016 - Pós-Vendas - Complemento de OS - Gestor de Processo
	var c3 = DatasetFactory.createConstraint('colleagueGroupPK.groupId', "000016", "000016", ConstraintType.MUST);
	
	var constraints = new Array(c1, c2, c3);
	var datasetColleagueGroup = DatasetFactory.getDataset('colleagueGroup', null, constraints, null);
	if(dsTemValor(datasetColleagueGroup)){
		ehGestorProcesso = true;
	}
	
 	//Se for Gestor do Processo vai poder cancelar
	if(ehGestorProcesso){
		
	}else{
		
		hasErros = true;
		message = "ATENÇÃO! Somente o gestor do processo possui a permissão de cancelar solicitação!";
		
	}
	
	if (hasErros) {
        throw  message;
    }
	
}