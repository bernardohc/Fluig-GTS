function beforeStateLeave(sequenceId){
	
	if(sequenceId == INICIO_0 || sequenceId == INICIO){
		
		hAPI.setCardValue("statusAtendimento", "Abertura");
		hAPI.setCardValue("statusAtendimentoDesc", "Abertura");
		
	}else if(sequenceId == CADASTRA_SAC){
		//Quando finalizar o CADASTRA_SAC, já marca que o status está em AguardandoAnalise
		hAPI.setCardValue("statusAtendimento", "AguardandoAnalise");
		hAPI.setCardValue("statusAtendimentoDesc", "Aguardando Análise");
		
		//Envia e-mail para requisitante
		var numProtocoloFluig = DatasetFactory.createConstraint("numProtocoloFluig", hAPI.getCardValue("numProtocoloFluig"), hAPI.getCardValue("numProtocoloFluig"), ConstraintType.MUST); 
		var dataAbertura = DatasetFactory.createConstraint("dataAbertura", hAPI.getCardValue("dataAbertura"), hAPI.getCardValue("dataAbertura"), ConstraintType.MUST); 
		//Requisitante
		var nomeRequisitante = DatasetFactory.createConstraint("nomeRequisitante", hAPI.getCardValue("nomeRequisitante"), hAPI.getCardValue("nomeRequisitante"), ConstraintType.MUST); 
		var cpfCnpjRequisitante = DatasetFactory.createConstraint("cpfCnpjRequisitante", hAPI.getCardValue("cpfCnpjRequisitante"), hAPI.getCardValue("cpfCnpjRequisitante"), ConstraintType.MUST); 
		var emailRequisitante = DatasetFactory.createConstraint("emailRequisitante", hAPI.getCardValue("emailRequisitante"), hAPI.getCardValue("emailRequisitante"), ConstraintType.MUST); 
		var telRequisitante = DatasetFactory.createConstraint("telRequisitante", hAPI.getCardValue("telRequisitante"), hAPI.getCardValue("telRequisitante"), ConstraintType.MUST); 
		var estadoRequisitante = DatasetFactory.createConstraint("estadoRequisitante", hAPI.getCardValue("estadoRequisitante"), hAPI.getCardValue("estadoRequisitante"), ConstraintType.MUST); 
		var cidadeRequisitante = DatasetFactory.createConstraint("cidadeRequisitante", hAPI.getCardValue("cidadeRequisitante"), hAPI.getCardValue("cidadeRequisitante"), ConstraintType.MUST); 
		//Solicitação
		var tipoSolicitacao = DatasetFactory.createConstraint("tipoSolicitacao", hAPI.getCardValue("tipoSolicitacaoDesc"), hAPI.getCardValue("tipoSolicitacaoDesc"), ConstraintType.MUST); 
		var estadoRevenda = DatasetFactory.createConstraint("estadoRevenda", hAPI.getCardValue("estadoRevenda"), hAPI.getCardValue("estadoRevenda"), ConstraintType.MUST); 
		var cidadeRevenda = DatasetFactory.createConstraint("cidadeRevenda", hAPI.getCardValue("cidadeRevenda"), hAPI.getCardValue("cidadeRevenda"), ConstraintType.MUST); 
		var revenda = DatasetFactory.createConstraint("revenda", hAPI.getCardValue("revenda"), hAPI.getCardValue("revenda"), ConstraintType.MUST); 
		var cpfCnpjRevenda = DatasetFactory.createConstraint("cpfCnpjRevenda", hAPI.getCardValue("cpfCnpjRevenda"), hAPI.getCardValue("cpfCnpjRevenda"), ConstraintType.MUST); 
		var setor = DatasetFactory.createConstraint("setor", hAPI.getCardValue("setor"), hAPI.getCardValue("setor"), ConstraintType.MUST); 
		var numSerie = DatasetFactory.createConstraint("numSerie", hAPI.getCardValue("numSerie"), hAPI.getCardValue("numSerie"), ConstraintType.MUST); 
		var modeloEquipamento = DatasetFactory.createConstraint("modeloEquipamento", hAPI.getCardValue("modeloEquipamento"), hAPI.getCardValue("modeloEquipamento"), ConstraintType.MUST); 
		var assuntoSolicitacao = DatasetFactory.createConstraint("assuntoSolicitacao", hAPI.getCardValue("assuntoSolicitacao"), hAPI.getCardValue("assuntoSolicitacao"), ConstraintType.MUST); 
		var descricaoSolicitacao = DatasetFactory.createConstraint("descricaoSolicitacao", hAPI.getCardValue("descricaoSolicitacao"), hAPI.getCardValue("descricaoSolicitacao"), ConstraintType.MUST); 
		
		var constraints = new Array(numProtocoloFluig, dataAbertura, 
				nomeRequisitante, cpfCnpjRequisitante, emailRequisitante, telRequisitante, estadoRequisitante, cidadeRequisitante, 
				tipoSolicitacao, estadoRevenda, cidadeRevenda, revenda, cpfCnpjRevenda, setor, numSerie, modeloEquipamento, assuntoSolicitacao, descricaoSolicitacao);
		 
		var dataset = DatasetFactory.getDataset("dsSACEmailRequisitanteAbert", null, constraints, null);
		var codRetorno = dataset.getValue(0, "CODRET");
		var msgRetorno = dataset.getValue(0, "MSG");
		
		hAPI.setCardValue("emailRequisitanteCodRetorno", codRetorno);
		hAPI.setCardValue("emailRequisitanteMsgRetorno", msgRetorno);
		
		
	}else if(sequenceId == ATENDIMENTO_SETOR || sequenceId == FIM){
		
		var indexes = hAPI.getChildrenIndexes("tbAtendimento");
		var cont = 1;
		for (var i = 0; i < indexes.length; i++) {
			if(cont == indexes.length){
				hAPI.setCardValue("atendData___"+indexes[i], dataHoraAtual('dd/mm/yyyy hh:mm'));
			}
			cont++;
		}
		
	}
	
}