function afterProcessFinish(processId){
	
	hAPI.setCardValue("dataEncerramento", dataHoraAtual('dd/mm/yyyy hh:mm'));
	
	
	//Envia e-mail para requisitante
	var numProtocoloFluig = DatasetFactory.createConstraint("numProtocoloFluig", hAPI.getCardValue("numProtocoloFluig"), hAPI.getCardValue("numProtocoloFluig"), ConstraintType.MUST); 
	var dataAbertura = DatasetFactory.createConstraint("dataAbertura", hAPI.getCardValue("dataAbertura"), hAPI.getCardValue("dataAbertura"), ConstraintType.MUST); 
	var dataEncerramento = DatasetFactory.createConstraint("dataEncerramento", hAPI.getCardValue("dataEncerramento"), hAPI.getCardValue("dataEncerramento"), ConstraintType.MUST); 

	var emailRequisitante = DatasetFactory.createConstraint("emailRequisitante", hAPI.getCardValue("emailRequisitante"), hAPI.getCardValue("emailRequisitante"), ConstraintType.MUST); 

	var constraints = new Array(numProtocoloFluig, dataAbertura, dataEncerramento, emailRequisitante);
	 
	var dataset = DatasetFactory.getDataset("dsSACEmailRequisitanteFinaliz", null, constraints, null);
	var codRetorno = dataset.getValue(0, "CODRET");
	var msgRetorno = dataset.getValue(0, "MSG");
	
	hAPI.setCardValue("emailRequisitanteFimCodRetorno", codRetorno);
	hAPI.setCardValue("emailRequisitanteFimMsgRetorno", msgRetorno);
	
	
}