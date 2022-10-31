function servicetask13(attempt, message) {
	try{
		//Cadastra Base de Atendimento no Protheus
		
		var IDFLUIG = DatasetFactory.createConstraint("IDFLUIG", getValue('WKNumProces')+"", "", ConstraintType.MUST); 
		var cliCodigo = DatasetFactory.createConstraint("cliCodigo", hAPI.getCardValue("cliCodigo"), "", ConstraintType.MUST); 
		var cliLoja = DatasetFactory.createConstraint("cliLoja", hAPI.getCardValue("cliLoja"), "", ConstraintType.MUST); 
		var equipCodProduto = DatasetFactory.createConstraint("equipCodProduto", hAPI.getCardValue("equipCodProduto"), "", ConstraintType.MUST); 
		var equipNumSerie = DatasetFactory.createConstraint("equipNumSerie", hAPI.getCardValue("equipNumSerie"), "", ConstraintType.MUST); 
		var equipNumNotaFiscal = DatasetFactory.createConstraint("equipNumNotaFiscal", hAPI.getCardValue("equipNumNotaFiscal"), "", ConstraintType.MUST); 
		var equipDataVenda = DatasetFactory.createConstraint("equipDataVenda", hAPI.getCardValue("equipDataVenda"), "", ConstraintType.MUST); 
		var equipDataTerminoGarantia = DatasetFactory.createConstraint("equipDataTerminoGarantia", hAPI.getCardValue("equipDataTerminoGarantia"), "", ConstraintType.MUST); 
			
		var constraints = new Array(IDFLUIG, cliCodigo, cliLoja, equipCodProduto, equipNumSerie, equipNumNotaFiscal, equipDataVenda, equipDataTerminoGarantia);
		 
		var dataset = DatasetFactory.getDataset("dsEntTecCadastraBaseDeAtendimento", null, constraints, null);
		
		if(dsTemValor(dataset)){
			var codRetorno = dataset.getValue(0, "CODRET");
			var msgRetorno = dataset.getValue(0, "MSGRET");
			
			if(codRetorno == '1'){
				hAPI.setCardValue("equipCodBaseDeAtendimento", dataset.getValue(0, "CIDFLUIG"));
			}else {
				throw(msgRetorno);
			}
		}else{
			throw("Erro ao criar base de atendimento: sem retorno do dataset.");
		}
		
		
	}catch(erro){ 
		throw("Erro ao criar base de atendimento: " + erro);
	}
}