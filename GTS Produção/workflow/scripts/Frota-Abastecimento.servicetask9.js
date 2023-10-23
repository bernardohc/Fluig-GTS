function servicetask9(attempt, message) {
	try{
		//Cadastra Abastecimento no Protheus
		var IDFLUIG = DatasetFactory.createConstraint("IDFLUIG", getValue('WKNumProces')+"", "", ConstraintType.MUST); 
		var geraisCodMotorista = DatasetFactory.createConstraint("geraisCodMotorista", hAPI.getCardValue("geraisCodMotorista"), "", ConstraintType.MUST); 
		var geraisCPFMotorista = DatasetFactory.createConstraint("geraisCPFMotorista", hAPI.getCardValue("geraisCPFMotorista"), "", ConstraintType.MUST); 
		var geraisNomeMotorista = DatasetFactory.createConstraint("geraisNomeMotorista", hAPI.getCardValue("geraisNomeMotorista"), "", ConstraintType.MUST); 
		var geraisCarimboDataHora = DatasetFactory.createConstraint("geraisCarimboDataHora", hAPI.getCardValue("geraisCarimboDataHora"), "", ConstraintType.MUST); 
		var geraisPlaca = DatasetFactory.createConstraint("geraisPlaca", hAPI.getCardValue("geraisPlaca"), "", ConstraintType.MUST); 
		var abastCNPJPosto = DatasetFactory.createConstraint("abastCNPJPosto", hAPI.getCardValue("abastCNPJPosto"), "", ConstraintType.MUST); 
		var abastNomePosto = DatasetFactory.createConstraint("abastNomePosto", hAPI.getCardValue("abastCNPJPosto"), "", ConstraintType.MUST); 
		var abastKmAbastecimento = DatasetFactory.createConstraint("abastKmAbastecimento", hAPI.getCardValue("abastKmAbastecimento"), "", ConstraintType.MUST); 
		var abastTpCombustivel = DatasetFactory.createConstraint("abastTpCombustivel", hAPI.getCardValue("abastTpCombustivel"), "", ConstraintType.MUST); 
		var abastQtdLitros = DatasetFactory.createConstraint("abastQtdLitros", hAPI.getCardValue("abastQtdLitros"), "", ConstraintType.MUST); 
		var abastValorLitro = DatasetFactory.createConstraint("abastValorLitro", hAPI.getCardValue("abastValorLitro"), "", ConstraintType.MUST); 
		var abastValorTotal = DatasetFactory.createConstraint("abastValorTotal", hAPI.getCardValue("abastValorTotal"), "", ConstraintType.MUST); 
		var abastFormaPagamento = DatasetFactory.createConstraint("abastFormaPagamento", hAPI.getCardValue("abastFormaPagamento"), "", ConstraintType.MUST); 
		var abastSetor = DatasetFactory.createConstraint("abastSetor", hAPI.getCardValue("abastSetor"), "", ConstraintType.MUST); 
			
		var constraints = new Array(IDFLUIG, geraisCodMotorista, geraisCPFMotorista, geraisNomeMotorista, geraisCarimboDataHora, geraisPlaca, abastCNPJPosto, abastNomePosto, abastKmAbastecimento, abastTpCombustivel, abastQtdLitros, abastValorLitro, abastValorTotal, abastFormaPagamento, abastSetor);
		 
		var dataset = DatasetFactory.getDataset("dsAbastCadastraAbastecimento", null, constraints, null);
		
		if(dsTemValor(dataset)){
			var codRetorno = dataset.getValue(0, "CODRET");
			var msgRetorno = dataset.getValue(0, "MSGRET");
			
			if(codRetorno == '1'){
				hAPI.setCardValue("abastRetornoIntegracao", msgRetorno);
			}else {
				throw(msgRetorno);
			}
		}else{
			throw("Erro ao cadastrar abastecimento: sem retorno do dataset.");
		}
		
		
	}catch(erro){ 
		throw("Erro ao cadastrar abastecimento: " + erro);
	}
}