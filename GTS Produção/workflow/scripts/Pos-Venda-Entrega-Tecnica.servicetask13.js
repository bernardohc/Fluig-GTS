function servicetask13(attempt, message) {
	try{
		
		//Integração de Base de Atendimento no Protheus
		/*É chamado 2x o método do dsEntTecIntegraBaseDeAtendimento, 
		 1) para caso houve transferência entre as revendas e registar essa transferência no Protheus
		 2) para realizar a transferência para o cliente que adquiriu a maquina.
		*/
		
		//Constraints para ambas as chamadas
		var IDFLUIG = DatasetFactory.createConstraint("IDFLUIG", getValue('WKNumProces')+"", "", ConstraintType.MUST); 
		var equipCodProduto = DatasetFactory.createConstraint("equipCodProduto", hAPI.getCardValue("equipCodProduto"), "", ConstraintType.MUST); 
		var equipNumSerie = DatasetFactory.createConstraint("equipNumSerie", hAPI.getCardValue("equipNumSerie"), "", ConstraintType.MUST); 
		var equipFilialNotaFiscal = DatasetFactory.createConstraint("equipFilialNotaFiscal", hAPI.getCardValue("equipFilialNotaFiscal"), "", ConstraintType.MUST); 
		var equipNumNotaFiscal = DatasetFactory.createConstraint("equipNumNotaFiscal", hAPI.getCardValue("equipNumNotaFiscal"), "", ConstraintType.MUST); 
		var equipDataVenda = DatasetFactory.createConstraint("equipDataVenda", hAPI.getCardValue("equipDataVenda"), "", ConstraintType.MUST); 
		var equipDataTerminoGarantia = DatasetFactory.createConstraint("equipDataTerminoGarantia", hAPI.getCardValue("equipDataTerminoGarantia"), "", ConstraintType.MUST); 
		
		if (hAPI.getCardValue("tipoSolicitante") != 'Administrativo GTS') {
			//Integra Base de Atendimento no Protheus (Registro da Revenda)
			//Pega dado dos campo revCodigo e revLoja, mas manda para a constraint cliCodigo e cliLoja
			//Somente realiza se quem abriu a solicitação não foi um usuário Administrativo GTS
			var sequencia = DatasetFactory.createConstraint("sequencia", "1", "", ConstraintType.MUST); 
			var revCodigo = DatasetFactory.createConstraint("cliCodigo", hAPI.getCardValue("revCodigo"), "", ConstraintType.MUST); 
			var revLoja = DatasetFactory.createConstraint("cliLoja", hAPI.getCardValue("revLoja"), "", ConstraintType.MUST); 
		
			var constraints = new Array(IDFLUIG, sequencia, revCodigo, revLoja, equipCodProduto, equipNumSerie, equipFilialNotaFiscal, equipNumNotaFiscal, equipDataVenda, equipDataTerminoGarantia);
			 
			var dataset = DatasetFactory.getDataset("dsEntTecIntegraBaseDeAtendimento", null, constraints, null);
			
			if(dsTemValor(dataset)){
				var codRetorno = dataset.getValue(0, "CODRET");
				var msgRetorno = dataset.getValue(0, "MSGRET");
				
				if(codRetorno == '1'){
					hAPI.setCardValue("revCodBaseDeAtendimento", dataset.getValue(0, "CIDFLUIG"));
				}else {
					throw('Erro na integração #1 da base de atendimento: ' + msgRetorno);
				}
			}else{
				throw("Erro na integração #1 da base de atendimento: sem retorno do dataset.");
			}
		}
		
		//Integra Base de Atendimento no Protheus (Registro do Cliente Final)
		var sequencia = DatasetFactory.createConstraint("sequencia", "2", "", ConstraintType.MUST);
		var cliCodigo = DatasetFactory.createConstraint("cliCodigo", hAPI.getCardValue("cliCodigo"), "", ConstraintType.MUST); 
		var cliLoja = DatasetFactory.createConstraint("cliLoja", hAPI.getCardValue("cliLoja"), "", ConstraintType.MUST); 
			
		var constraints = new Array(IDFLUIG, sequencia, cliCodigo, cliLoja, equipCodProduto, equipNumSerie, equipFilialNotaFiscal, equipNumNotaFiscal, equipDataVenda, equipDataTerminoGarantia);
		 
		var dataset = DatasetFactory.getDataset("dsEntTecIntegraBaseDeAtendimento", null, constraints, null);
		
		if(dsTemValor(dataset)){
			var codRetorno = dataset.getValue(0, "CODRET");
			var msgRetorno = dataset.getValue(0, "MSGRET");
			
			if(codRetorno == '1'){
				hAPI.setCardValue("equipCodBaseDeAtendimento", dataset.getValue(0, "CIDFLUIG"));
			}else {
				throw('Erro na integração #2 da base de atendimento: ' + msgRetorno);
			}
		}else{
			throw("Erro na integração #2 integração da base de atendimento: sem retorno do dataset.");
		}
		
		
	}catch(erro){ 
		throw("Erro na integração da base de atendimento: " + erro);
	}
}