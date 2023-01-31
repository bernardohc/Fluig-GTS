function servicetask48(attempt, message) {
	
	try{
		//Envia e-mail interno informando a Ordem de Compra criada para pagamento
		
		var attachments = hAPI.listAttachments();
		var idAnexoNotaFiscal = "";
		var idAnexoBoleto = "";
		for (var i = 0; i < attachments.size(); i++) {
			var attachment = attachments.get(i);
			if( attachment.getDocumentDescription() == "Nota Fiscal" ){
				idAnexoNotaFiscal = attachment.getDocumentId().toString();
			}
			if( hAPI.getCardValue("NFPagtoFormaPagamento") == "boleto" && attachment.getDocumentDescription() == "Boleto" ){
				idAnexoBoleto = attachment.getDocumentId().toString();
			}
		}
		
		var destinatarios = DatasetFactory.createConstraint("destinatarios", hAPI.getCardValue("OCEmailRecebimentoOC"), "", ConstraintType.MUST); 
		var cstIdAnexoNotaFiscal = DatasetFactory.createConstraint("idAnexoNotaFiscal", idAnexoNotaFiscal, "", ConstraintType.MUST); 
		var cstIdAnexoBoleto = DatasetFactory.createConstraint("idAnexoBoleto", idAnexoBoleto, "", ConstraintType.MUST); 
		var numOC = DatasetFactory.createConstraint("numOC", hAPI.getCardValue("OCNumOC"), "", ConstraintType.MUST); 
		var numFluig = DatasetFactory.createConstraint("numFluig", hAPI.getCardValue("numFluig"), "", ConstraintType.MUST); 
		var formaPagto = DatasetFactory.createConstraint("formaPagto",hAPI.getCardValue("NFPagtoFormaPagamento"), "", ConstraintType.MUST); 
		var formaPagtoTransfBanco = DatasetFactory.createConstraint("formaPagtoTransfBanco",hAPI.getCardValue("NFPagtoBanco"), "", ConstraintType.MUST); 
		var formaPagtoTransfAgencia = DatasetFactory.createConstraint("formaPagtoTransfAgencia",hAPI.getCardValue("NFPagtoAgencia"), "", ConstraintType.MUST); 
		var formaPagtoTransfConta = DatasetFactory.createConstraint("formaPagtoTransfConta",hAPI.getCardValue("NFPagtoConta"), "", ConstraintType.MUST); 
		var formaPagtoTransfCodIdentificador = DatasetFactory.createConstraint("formaPagtoTransfCodIdentificador",hAPI.getCardValue("NFPagtoCodIdentificador"), "", ConstraintType.MUST); 
		var formaPagtoTransfNome = DatasetFactory.createConstraint("formaPagtoTransfNome",hAPI.getCardValue("NFPagtoNome"), "", ConstraintType.MUST); 
		var formaPagtoTransfCpfCnpj = DatasetFactory.createConstraint("formaPagtoTransfCpfCnpj",hAPI.getCardValue("NFPagtoCpfCnpj"), "", ConstraintType.MUST); 
			

		var constraints = new Array(destinatarios, cstIdAnexoNotaFiscal, cstIdAnexoBoleto, numOC, numFluig, formaPagto, formaPagtoTransfBanco, formaPagtoTransfAgencia, formaPagtoTransfConta, formaPagtoTransfCodIdentificador, formaPagtoTransfNome, formaPagtoTransfCpfCnpj);
		 
		var dataset = DatasetFactory.getDataset("dsEntTecEmailInternoOC", null, constraints, null);
		if(dsTemValor(dataset)){
			var codRetorno = dataset.getValue(0, "CODRET");
			var msgRetorno = dataset.getValue(0, "MSGRET");
			
			hAPI.setCardValue("emailInternoOCCodRet", codRetorno);
			hAPI.setCardValue("emailInternoOCMsg", msgRetorno);
			if(codRetorno == '2'){
				throw("Erro ao disparar e-mail: " + msgRetorno);
			}
		}else{
			throw("Erro ao disparar e-mail: sem retorno do dataset.");
		}
		
	
	}catch(erro){ 
		hAPI.setCardValue("emailInternoOCCodRet", "2");
		hAPI.setCardValue("emailInternoOCMsg", erro);
		throw("Erro ao disparar e-mail: " + erro);
	}
	
}