function enableFields(form){
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO_0){
		
	}else if(atv_atual == ANALISA_REEMBOLSO){
		// Solicitação
		form.setEnabled("solMatSolicitante", false);
		form.setEnabled("solNomeSolicitante", false);
		form.setEnabled("solTelefone", false);
		form.setEnabled("solPedido", false);
		form.setEnabled("solDataNotaFiscal", false);
		form.setEnabled("solTipoDespesa", false);
		form.setEnabled("solTipoDespesaOutro", false);
		form.setEnabled("solValorReembolso", false);
		form.setEnabled("solFilial", false);
		//Itens Despesa form pai e filho
		var indexes = form.getChildrenIndexes("solTbMaquinas");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("itSolTipoDespesaItem___" + indexes[i], false);
		    	form.setEnabled("itSolValorReembolsoItem___" + indexes[i], false);
		    	form.setEnabled("solDescDestino___" + indexes[i], false);
		    }
		}
		
	}else if(atv_atual == AJUSTA_REEMBOLSO){
		// Solicitação
		form.setEnabled("solMatSolicitante", false);
		form.setEnabled("solNomeSolicitante", false);
		form.setEnabled("solTelefone", false);
		//Aprovação
		form.setEnabled("asprovReembolso", false);
		form.setEnabled("aprovReembolsoObs", false);
	}else if(atv_atual == PAGAMENTO_REEMBOLSO){
		// Solicitação
		form.setEnabled("solMatSolicitante", false);
		form.setEnabled("solNomeSolicitante", false);
		form.setEnabled("solTelefone", false);
		form.setEnabled("solPedido", false);
		form.setEnabled("solDataNotaFiscal", false);
		form.setEnabled("solTipoDespesa", false);
		form.setEnabled("solTipoDespesaOutro", false);
		form.setEnabled("solValorReembolso", false);
		form.setEnabled("solFilial", false);
		//Itens Despesa form pai e filho
		var indexes = form.getChildrenIndexes("solTbMaquinas");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("itSolTipoDespesaItem___" + indexes[i], false);
		    	form.setEnabled("itSolValorReembolsoItem___" + indexes[i], false);
		    	form.setEnabled("solDescDestino___" + indexes[i], false);
		    }
		}
		//Aprovação
		form.setEnabled("aprovReembolso", false);
		form.setEnabled("aprovReembolsoObs", false);
		
		
	}else if(atv_atual == CONFIRMA_REEMBOLSO){
		// Solicitação
		form.setEnabled("solMatSolicitante", false);
		form.setEnabled("solNomeSolicitante", false);
		form.setEnabled("solTelefone", false);
		form.setEnabled("solPedido", false);
		form.setEnabled("solDataNotaFiscal", false);
		form.setEnabled("solTipoDespesa", false);
		form.setEnabled("solTipoDespesaOutro", false);
		form.setEnabled("solValorReembolso", false);
		form.setEnabled("solFilial", false);
		//Itens Despesa form pai e filho
		var indexes = form.getChildrenIndexes("solTbMaquinas");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("itSolTipoDespesaItem___" + indexes[i], false);
		    	form.setEnabled("itSolValorReembolsoItem___" + indexes[i], false);
		    	form.setEnabled("solDescDestino___" + indexes[i], false);
		    }
		}
		//Aprovação
		form.setEnabled("aprovReembolso", false);
		form.setEnabled("aprovReembolsoObs", false);
		//Pagamento
		form.setEnabled("pagtoObs", false);
		form.setEnabled("dataPgtoReembolso", false);
		form.setEnabled("pagtoReembolso", false);
	}else if(atv_atual == AN_PGTO_REEMBOLSO){
		// Solicitação
		form.setEnabled("solMatSolicitante", false);
		form.setEnabled("solNomeSolicitante", false);
		form.setEnabled("solTelefone", false);
		form.setEnabled("solPedido", false);
		form.setEnabled("solDataNotaFiscal", false);
		form.setEnabled("solTipoDespesa", false);
		form.setEnabled("solTipoDespesaOutro", false);
		form.setEnabled("solValorReembolso", false);
		form.setEnabled("solFilial", false);
		//Itens Despesa form pai e filho
		var indexes = form.getChildrenIndexes("solTbMaquinas");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("itSolTipoDespesaItem___" + indexes[i], false);
		    	form.setEnabled("itSolValorReembolsoItem___" + indexes[i], false);
		    	form.setEnabled("solDescDestino___" + indexes[i], false);
		    }
		}
		//Aprovação
		form.setEnabled("aprovReembolso", false);
		form.setEnabled("aprovReembolsoObs", false);
		//Pagamento
		//form.setEnabled("pagtoObs", false);
		//form.setEnabled("dataPgtoReembolso", false);
		//form.setEnabled("pagtoReembolso", false);
		//Confirma Pagamento
		form.setEnabled("confRecebimento", false);
		form.setEnabled("confObs", false);
	}
}