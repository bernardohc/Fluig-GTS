function servicetask34(attempt, message) {
	
	try{
		//Envia e-mail para Solicitante
		var solicitante = DatasetFactory.createConstraint("emailRevenda", hAPI.getCardValue("revContServicoEmail"), "", ConstraintType.MUST); 
		var emailAprovadorGTS = DatasetFactory.createConstraint("emailAprovadorGTS", hAPI.getCardValue("NFAprovEmailAprovador"), "", ConstraintType.MUST); 
		var numFluig = DatasetFactory.createConstraint("numFluig", hAPI.getCardValue("numFluig"), "", ConstraintType.MUST); 
		var numSerie = DatasetFactory.createConstraint("numSerie", hAPI.getCardValue("equipNumSerie"), "", ConstraintType.MUST); 
		var numNotaFiscal = DatasetFactory.createConstraint("numNotaFiscal", hAPI.getCardValue("equipNumNotaFiscal"), "", ConstraintType.MUST); 
		var nomeCliente = DatasetFactory.createConstraint("nomeCliente", hAPI.getCardValue("cliNomeCliente"), "", ConstraintType.MUST); 
		var dataPrevPagto = DatasetFactory.createConstraint("dataPrevPagto", hAPI.getCardValue("NFAprovDataPrevPagto"), "", ConstraintType.MUST); 


		var constraints = new Array(emailRevenda, emailAprovadorGTS, numFluig, numSerie, numNotaFiscal, nomeCliente, dataPrevPagto);
		 
		var dataset = DatasetFactory.getDataset("dsEntTecEmailRevProgPagto", null, constraints, null);
		if(dsTemValor(dataset)){
			var codRetorno = dataset.getValue(0, "CODRET");
			var msgRetorno = dataset.getValue(0, "MSGRET");
			
			hAPI.setCardValue("emailProgPagtoCodRet", codRetorno);
			hAPI.setCardValue("emailProgPagtoMsg", msgRetorno);
			if(codRetorno == '2'){
				throw("Erro ao disparar e-mail: " + msgRetorno);
			}
		}else{
			throw("Erro ao disparar e-mail: sem retorno do dataset.");
		}
		
	}catch(erro){ 
		hAPI.setCardValue("emailProgPagtoCodRet", "2");
		hAPI.setCardValue("emailProgPagtoMsg", erro);
		throw("Erro ao disparar e-mail: " + erro);
	}
	
}