function afterProcessFinish(processId){
	
	hAPI.setCardValue("dataEncerramento", dataAtual('dd/mm/yyyy hh:mm'));
	
	
	//Envia e-mail para o solicitante
	var gerNumProtocolo = DatasetFactory.createConstraint("gerNumProtocolo", hAPI.getCardValue("gerNumProtocolo"), hAPI.getCardValue("numProtocoloFluig"), ConstraintType.MUST); 
	var dataAbertura = DatasetFactory.createConstraint("dataAbertura", hAPI.getCardValue("dataAbertura"), hAPI.getCardValue("dataAbertura"), ConstraintType.MUST); 
	var dataEncerramento = DatasetFactory.createConstraint("dataEncerramento", hAPI.getCardValue("dataEncerramento"), hAPI.getCardValue("dataEncerramento"), ConstraintType.MUST); 

	var solEmail = DatasetFactory.createConstraint("solEmail", hAPI.getCardValue("solEmail"), hAPI.getCardValue("emailRequisitante"), ConstraintType.MUST); 

	var cstMailFinalizadoSolicitante = new Array(gerNumProtocolo, dataAbertura, dataEncerramento, solEmail);
	 
	var dataset = DatasetFactory.getDataset("dsChamAtendEmailSolicitanteFinalizado", null, cstMailFinalizadoSolicitante, null);
	var codRetorno = dataset.getValue(0, "CODRET");
	var msgRetorno = dataset.getValue(0, "MSG");
	
	hAPI.setCardValue("solEmailEncerramento", codRetorno + " - " + msgRetorno);
	log.info('solEmailEncerramento: '+ codRetorno + " - " + msgRetorno);
	
	if(hAPI.getCardValue("solEncEmailRevendaFinalizado") == "sim"){
		log.info('---Vai enviar e-mail para a Revenda');
		//Envia e-mail para a Revenda que participou do processo
		var solEmailRevendaAtendimento = DatasetFactory.createConstraint("solEmailRevendaAtendimento", hAPI.getCardValue("solEmailRevendaAtendimento"), hAPI.getCardValue("emailRequisitante"), ConstraintType.MUST); 
		var gerNumProtocolo = DatasetFactory.createConstraint("gerNumProtocolo", hAPI.getCardValue("gerNumProtocolo"), hAPI.getCardValue("numProtocoloFluig"), ConstraintType.MUST); 
		var dataAbertura = DatasetFactory.createConstraint("dataAbertura", hAPI.getCardValue("dataAbertura"), hAPI.getCardValue("dataAbertura"), ConstraintType.MUST); 
		var dataEncerramento = DatasetFactory.createConstraint("dataEncerramento", hAPI.getCardValue("dataEncerramento"), hAPI.getCardValue("dataEncerramento"), ConstraintType.MUST); 
		var idFluig = DatasetFactory.createConstraint("idFluig", hAPI.getCardValue("numFluig"), hAPI.getCardValue("dataEncerramento"), ConstraintType.MUST); 


		var cstMailFinalizadoRevenda = new Array(gerNumProtocolo, dataAbertura, dataEncerramento, solEmailRevendaAtendimento, idFluig);
		
		var dataset = DatasetFactory.getDataset("dsChamAtendEmailRevendaFinalizado", null, cstMailFinalizadoRevenda, null);
		var codRetorno = dataset.getValue(0, "CODRET");
		var msgRetorno = dataset.getValue(0, "MSG");
		
		hAPI.setCardValue("solEmailEncerramentoRevAtend", codRetorno + " - " + msgRetorno);
		log.info('solEmailEncerramentoRevAtend: '+ codRetorno + " - " + msgRetorno);
	}


}