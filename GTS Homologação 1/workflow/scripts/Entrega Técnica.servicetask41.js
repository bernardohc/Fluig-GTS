function servicetask41(attempt, message) {
	
	try{
		//Cadastra Ordem de Compra no Protheus para pagamento da Revenda
		
		var OCCpfCnpj = DatasetFactory.createConstraint("OCCpfCnpj", hAPI.getCardValue("OCCpfCnpj"), "", ConstraintType.MUST); 
		var OCCodCondPagto = DatasetFactory.createConstraint("OCCodCondPagto", hAPI.getCardValue("OCCodCondPagto"), "", ConstraintType.MUST); 
		var OCCodProduto = DatasetFactory.createConstraint("OCCodProduto", hAPI.getCardValue("OCCodProduto"), "", ConstraintType.MUST); 
		var OCCentroCusto = DatasetFactory.createConstraint("OCCentroCusto",hAPI.getCardValue("OCCentroCusto"), "", ConstraintType.MUST); 
		var OCValorNota = DatasetFactory.createConstraint("OCValorNota",hAPI.getCardValue("OCValorNota"), "", ConstraintType.MUST); 
			
		var constraints = new Array(OCCpfCnpj, OCCodCondPagto, OCCodProduto, OCCentroCusto, OCValorNota);
		 
		var dataset = DatasetFactory.getDataset("dsEntTecCadastraOC", null, constraints, null);
		
		if(dsTemValor(dataset)){
			var codRetorno = dataset.getValue(0, "CODRET");
			var msgRetorno = dataset.getValue(0, "MSGRET");
			
			if(codRetorno == '1'){
				hAPI.setCardValue("OCNumOC", dataset.getValue(0, "NUMOC"));
			}else {
				throw(msgRetorno);
			}
		}else{
			throw("Erro ao criar ordem de compra: sem retorno do dataset.");
		}
		
		
	}catch(erro){ 
		throw("Erro ao criar ordem de compra: " + erro);
	}
	
}