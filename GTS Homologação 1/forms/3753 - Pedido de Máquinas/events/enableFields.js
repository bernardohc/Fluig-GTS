function enableFields(form){
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO_0){
		
		
	}else if(atv_atual == INICIO ){
		//Dados Representante
		if(form.getValue("solTipoSolicitante") == "RepresentanteNacional" || 
		   form.getValue("solTipoSolicitante") == "RepresentanteExportacao" || 
		   form.getValue("solTipoSolicitante") == "RevendaMaquina" ){
			form.setEnabled("repNome", false);
		}
		
		
	}else if( atv_atual == REV_CIENTE_PED || atv_atual == REP_CIENTE_PED || atv_atual == GESTER_CIENTE_PED){	
		//Somente para as atividades de notificações
		
		//Dados Solicitante
		form.setEnabled("pedClienteRevenda", false);
		
		//Dados Representante
		form.setEnabled("repNome", false);
		form.setEnabled("repEmail", false);
		form.setEnabled("repDescMax", false);
		form.setEnabled("repGestorTerritorial", false);
		form.setEnabled("repEmailGestorTerritorial", false);
		//Dados Revenda
		form.setEnabled("revCpfCnpj", false);
		form.setEnabled("revNome", false);
		form.setEnabled("revFator", false);
		form.setEnabled("revMatFluig", false);
		form.setEnabled("revNomeFluig", false);
		//Dados Cliente
		form.setEnabled("cliCpfCnpj", false);
		form.setEnabled("cliInscricaoEstadual", false);
		form.setEnabled("cliNome", false);
		form.setEnabled("cliCodigo", false);
		form.setEnabled("cliLoja", false);
		form.setEnabled("cliCEP", false);
		form.setEnabled("cliUF", false);
		form.setEnabled("cliCidade", false);
		form.setEnabled("cliEndereco", false);
		form.setEnabled("cliBairro", false);
		form.setEnabled("cliComplemento", false);
		form.setEnabled("cliEmail", false);
		form.setEnabled("cliDDDTelefone", false);
		form.setEnabled("cliTelefone", false);
		//Dados Pedido
		form.setEnabled("pedCondPagto", false);
		form.setEnabled("pedOutraCodPagto", false);
		form.setEnabled("pedFrete", false);
		form.setEnabled("pedDataPrevEmbarque", false);
		form.setEnabled("pedObservacao", false);
		form.setEnabled("pedTipoPreco", false);
		//Itens Pedido
		var indexes = form.getChildrenIndexes("tbItensPedido");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("itPedFilialItem___" + indexes[i], false);
		    	form.setEnabled("itPedQtdItem___" + indexes[i], false);
		    	form.setEnabled("itPedCodItemItem___" + indexes[i], false);
		    	form.setEnabled("itPedImageBuscaMaqItem___" + indexes[i], false);
		    	form.setEnabled("itPedDescricaoItemItem___" + indexes[i], false);
		    	form.setEnabled("itPedPrecoUnitItem___" + indexes[i], false);
		    	form.setEnabled("itPedPorcDescontoItem___" + indexes[i], false);
		    	form.setEnabled("itPedValorFreteItem___" + indexes[i], false);
		    	form.setEnabled("itPedNCMItem___" + indexes[i], false);
		    	form.setEnabled("itPedFinameItem___" + indexes[i], false);
		    	form.setEnabled("itPedIPIAliqItem___" + indexes[i], false);
		    	form.setEnabled("itPedICMSAliqItem___" + indexes[i], false);
		    	form.setEnabled("itPedTotalCustoComImpItem___" + indexes[i], false);
		    }
		}
		form.setEnabled("pedObservacaoProduto", false);
		//Totais
		
		//Solicitante Revisa Pedido
		form.setEnabled("revPedSolicitanteAcao", false);
		form.setEnabled("revPedSolicitanteObs", false);
		
		
	}else if( atv_atual == REP_VERIFICA_PED){	
		
		//Dados Revenda
		form.setEnabled("revCpfCnpj", false);
		form.setEnabled("revMatFluig", false);
		form.setEnabled("revNomeFluig", false);
		
		//Dados Representante
		form.setEnabled("repNome", false);
		form.setEnabled("repEmail", false);
		form.setEnabled("repDescMax", false);
		form.setEnabled("repGestorTerritorial", false);
		form.setEnabled("repEmailGestorTerritorial", false);
		
		//Solicitante Revisa Pedido
		form.setEnabled("revPedSolicitanteAcao", false);
		form.setEnabled("revPedSolicitanteObs", false);
	
	}else if( atv_atual == REV_VERIFICA_PED){	
		
		//Dados Revenda
		form.setEnabled("revCpfCnpj", false);
		form.setEnabled("revMatFluig", false);
		form.setEnabled("revNomeFluig", false);
		
		//Dados Representante
		form.setEnabled("repNome", false);
		form.setEnabled("repEmail", false);
		form.setEnabled("repDescMax", false);
		form.setEnabled("repGestorTerritorial", false);
		form.setEnabled("repEmailGestorTerritorial", false);
		
	}else if( atv_atual == REV_RET_ADM_GTS){
		
		//Dados Revenda
		form.setEnabled("revCpfCnpj", false);
		form.setEnabled("revMatFluig", false);
		form.setEnabled("revNomeFluig", false);
		
		//Dados Representante
		form.setEnabled("repNome", false);
		form.setEnabled("repEmail", false);
		form.setEnabled("repDescMax", false);
		form.setEnabled("repGestorTerritorial", false);
		form.setEnabled("repEmailGestorTerritorial", false);
		
		//Administrativo GTS
		form.setEnabled("aprovAdmGTS", false);
		form.setEnabled("aprovAdmGTSMotivo", false);
		
	}else if( atv_atual == GER_TER_APROVA){
		
		//Dados Solicitante
		form.setEnabled("pedClienteRevenda", false);
		
		//Dados Representante
		form.setEnabled("repNome", false);
		form.setEnabled("repEmail", false);
		form.setEnabled("repDescMax", false);
		form.setEnabled("repGestorTerritorial", false);
		form.setEnabled("repEmailGestorTerritorial", false);
		//Dados Revenda
		form.setEnabled("revCpfCnpj", false);
		form.setEnabled("revNome", false);
		form.setEnabled("revMatFluig", false);
		form.setEnabled("revNomeFluig", false);
		//Dados Cliente
		form.setEnabled("cliCpfCnpj", false);
		form.setEnabled("cliInscricaoEstadual", false);
		form.setEnabled("cliNome", false);
		form.setEnabled("cliCodigo", false);
		form.setEnabled("cliLoja", false);
		form.setEnabled("cliCEP", false);
		form.setEnabled("cliUF", false);
		form.setEnabled("cliCidade", false);
		form.setEnabled("cliEndereco", false);
		form.setEnabled("cliBairro", false);
		form.setEnabled("cliComplemento", false);
		form.setEnabled("cliEmail", false);
		form.setEnabled("cliDDDTelefone", false);
		form.setEnabled("cliTelefone", false);
		//Dados Pedido
		form.setEnabled("pedCondPagto", false);
		form.setEnabled("pedOutraCodPagto", false);
		form.setEnabled("pedFrete", false);
		form.setEnabled("pedDataPrevEmbarque", false);
		form.setEnabled("pedObservacao", false);
		form.setEnabled("pedTipoPreco", false);
		//Itens Pedido
		var indexes = form.getChildrenIndexes("tbItensPedido");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("itPedFilialItem___" + indexes[i], false);
		    	form.setEnabled("itPedQtdItem___" + indexes[i], false);
		    	form.setEnabled("itPedCodItemItem___" + indexes[i], false);
		    	form.setEnabled("itPedImageBuscaMaqItem___" + indexes[i], false);
		    	form.setEnabled("itPedDescricaoItemItem___" + indexes[i], false);
		    	form.setEnabled("itPedPrecoUnitItem___" + indexes[i], false);
		    	form.setEnabled("itPedPorcDescontoItem___" + indexes[i], false);
		    	form.setEnabled("itPedValorFreteItem___" + indexes[i], false);
		    	form.setEnabled("itPedNCMItem___" + indexes[i], false);
		    	form.setEnabled("itPedFinameItem___" + indexes[i], false);
		    	form.setEnabled("itPedIPIAliqItem___" + indexes[i], false);
		    	form.setEnabled("itPedICMSAliqItem___" + indexes[i], false);
		    	form.setEnabled("itPedTotalCustoComImpItem___" + indexes[i], false);
		    }
		}
		//Totais
		
		//Solicitante Revisa Pedido
		form.setEnabled("revPedSolicitanteAcao", false);
		form.setEnabled("revPedSolicitanteObs", false);
		
	}else if( atv_atual == REVISA_ORC){
		
		//Dados Solicitante
//		form.setEnabled("pedClienteRevenda", false);
		
		//Dados Representante
		if(form.getValue("solTipoSolicitante") == "RepresentanteNacional" || 
		   form.getValue("solTipoSolicitante") == "RepresentanteExportacao" || 
		   form.getValue("solTipoSolicitante") == "RevendaMaquina" ){
			form.setEnabled("repNome", false);
			form.setEnabled("repEmail", false);
			form.setEnabled("repDescMax", false);
			form.setEnabled("repGestorTerritorial", false);
			form.setEnabled("repEmailGestorTerritorial", false);
		}
		
		//Dados Revenda
		form.setEnabled("revCpfCnpj", false);
		form.setEnabled("revNome", false);
		form.setEnabled("revMatFluig", false);
		form.setEnabled("revNomeFluig", false);
		
		//Aprovação Gerente Comercial
		form.setEnabled("aprovGerTerritorial", false);
		form.setEnabled("aprovGerTerritorialMotivoRep", false);
		
	}else if( atv_atual == GTS_VALIDA_ORC){
		
		//Dados Solicitante
		form.setEnabled("pedClienteRevenda", false);
		
		//Dados Representante
		form.setEnabled("repNome", false);
		form.setEnabled("repEmail", false);
		form.setEnabled("repDescMax", false);
		form.setEnabled("repGestorTerritorial", false);
		form.setEnabled("repEmailGestorTerritorial", false);
		//Dados Revenda
		form.setEnabled("revCpfCnpj", false);
		form.setEnabled("revNome", false);
		form.setEnabled("revFator", false);
		form.setEnabled("revMatFluig", false);
		form.setEnabled("revNomeFluig", false);
		//Dados Cliente
		form.setEnabled("cliCpfCnpj", false);
		form.setEnabled("cliInscricaoEstadual", false);
		form.setEnabled("cliNome", false);
//		form.setEnabled("cliCodigo", false);
//		form.setEnabled("cliLoja", false);
		form.setEnabled("cliCEP", false);
		form.setEnabled("cliUF", false);
		form.setEnabled("cliCidade", false);
		form.setEnabled("cliEndereco", false);
		form.setEnabled("cliBairro", false);
		form.setEnabled("cliComplemento", false);
		form.setEnabled("cliEmail", false);
		form.setEnabled("cliDDDTelefone", false);
		form.setEnabled("cliTelefone", false);
		//Dados Pedido
		form.setEnabled("pedCondPagto", false);
		form.setEnabled("pedOutraCodPagto", false);
		form.setEnabled("pedFrete", false);
		form.setEnabled("pedDataPrevEmbarque", false);
		form.setEnabled("pedObservacao", false);
		form.setEnabled("pedTipoPreco", false);
		//Itens Pedido
		var indexes = form.getChildrenIndexes("tbItensPedido");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) {
		    	form.setEnabled("itPedFilialItem___" + indexes[i], true);
		    	form.setEnabled("itPedQtdItem___" + indexes[i], false);
		    	form.setEnabled("itPedCodItemItem___" + indexes[i], false);
		    	form.setEnabled("itPedImageBuscaMaqItem___" + indexes[i], false);
		    	form.setEnabled("itPedDescricaoItemItem___" + indexes[i], false);
		    	form.setEnabled("itPedPrecoUnitItem___" + indexes[i], false);
		    	form.setEnabled("itPedPorcDescontoItem___" + indexes[i], false);
		    	form.setEnabled("itPedValorFreteItem___" + indexes[i], false);
		    	form.setEnabled("itPedNCMItem___" + indexes[i], false);
		    	form.setEnabled("itPedFinameItem___" + indexes[i], false);
		    	form.setEnabled("itPedIPIAliqItem___" + indexes[i], false);
		    	form.setEnabled("itPedICMSAliqItem___" + indexes[i], false);
		    	form.setEnabled("itPedTotalCustoComImpItem___" + indexes[i], false);
		    }
		}
		
		//Totais
		
		//Aprovação Gerente Territorial
		form.setEnabled("aprovGerTerritorial", false);
		form.setEnabled("aprovGerTerritorialMotivoRep", false);
		//Solicitante Revisa Pedido
		form.setEnabled("revPedSolicitanteAcao", false);
		form.setEnabled("revPedSolicitanteObs", false);
		
	}else if( atv_atual == INTEGRA_ORCAMENTO){
		
		//Dados Solicitante
		form.setEnabled("pedClienteRevenda", false);
		
		//Dados Representante
		form.setEnabled("repNome", false);
		form.setEnabled("repEmail", false);
		form.setEnabled("repDescMax", false);
		form.setEnabled("repGestorTerritorial", false);
		form.setEnabled("repEmailGestorTerritorial", false);
		//Dados Revenda
		form.setEnabled("revCpfCnpj", false);
		form.setEnabled("revNome", false);
		form.setEnabled("revFator", false);
		form.setEnabled("revMatFluig", false);
		form.setEnabled("revNomeFluig", false);
		//Dados Cliente
//		form.setEnabled("cliCpfCnpj", false);
//		form.setEnabled("cliNome", false);
//		form.setEnabled("cliCodigo", false);
//		form.setEnabled("cliLoja", false);
//		form.setEnabled("cliCEP", false);
//		form.setEnabled("cliUF", false);
//		form.setEnabled("cliCidade", false);
//		form.setEnabled("cliEndereco", false);
//		form.setEnabled("cliBairro", false);
//		form.setEnabled("cliComplemento", false);
//		form.setEnabled("cliEmail", false);
//		form.setEnabled("cliDDDTelefone", false);
//		form.setEnabled("cliTelefone", false);
		//Dados Pedido
		form.setEnabled("pedCondPagto", false);
		form.setEnabled("pedOutraCodPagto", false);
		form.setEnabled("pedFrete", false);
		form.setEnabled("pedDataPrevEmbarque", false);
		form.setEnabled("pedObservacao", false);
		form.setEnabled("pedTipoPreco", false);
		form.setEnabled("pedObservacaoProduto", false);
		//Itens Pedido
		var indexes = form.getChildrenIndexes("tbItensPedido");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("itPedFilialItem___" + indexes[i], false);
		    	form.setEnabled("itPedQtdItem___" + indexes[i], false);
		    	form.setEnabled("itPedCodItemItem___" + indexes[i], false);
		    	form.setEnabled("itPedDescricaoItemItem___" + indexes[i], false);
		    	form.setEnabled("itPedPrecoUnitItem___" + indexes[i], false);
		    	form.setEnabled("itPedDescontoItem___" + indexes[i], false);
		    	form.setEnabled("itPedValorFreteItem___" + indexes[i], false);
		    	form.setEnabled("itPedNCMItem___" + indexes[i], false);
		    	form.setEnabled("itPedFinameItem___" + indexes[i], false);
		    	form.setEnabled("itPedIPIAliqItem___" + indexes[i], false);
		    	form.setEnabled("itPedICMSAliqItem___" + indexes[i], false);
		    	form.setEnabled("itPedTotalCustoComImpItem___" + indexes[i], false);
		    }
		}
		
	}else if( atv_atual == ERRO_INTEGRA_ORCAMENTO){
		
		//Dados Solicitante
		form.setEnabled("pedClienteRevenda", false);
		
		//Dados Representante
		form.setEnabled("repNome", false);
		form.setEnabled("repEmail", false);
		form.setEnabled("repDescMax", false);
		form.setEnabled("repGestorTerritorial", false);
		form.setEnabled("repEmailGestorTerritorial", false);
		//Dados Revenda
		form.setEnabled("revCpfCnpj", false);
		form.setEnabled("revNome", false);
		form.setEnabled("revFator", false);
		form.setEnabled("revMatFluig", false);
		form.setEnabled("revNomeFluig", false);
		//Dados Cliente
		form.setEnabled("cliCpfCnpj", false);
		form.setEnabled("cliInscricaoEstadual", false);
		form.setEnabled("cliNome", false);
//		form.setEnabled("cliCodigo", false);
		form.setEnabled("cliLoja", false);
		form.setEnabled("cliCEP", false);
		form.setEnabled("cliUF", false);
		form.setEnabled("cliCidade", false);
		form.setEnabled("cliEndereco", false);
		form.setEnabled("cliBairro", false);
		form.setEnabled("cliComplemento", false);
		form.setEnabled("cliEmail", false);
		form.setEnabled("cliDDDTelefone", false);
		form.setEnabled("cliTelefone", false);
		//Dados Pedido
		form.setEnabled("pedCondPagto", false);
		form.setEnabled("pedOutraCodPagto", false);
		form.setEnabled("pedFrete", false);
		form.setEnabled("pedDataPrevEmbarque", false);
		form.setEnabled("pedObservacao", false);
		form.setEnabled("pedTipoPreco", false);
		form.setEnabled("pedObservacaoProduto", false);
		//Itens Pedido
		var indexes = form.getChildrenIndexes("tbItensPedido");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("itPedQtdItem___" + indexes[i], false);
		    	form.setEnabled("itPedCodItemItem___" + indexes[i], false);
		    	form.setEnabled("itPedDescricaoItemItem___" + indexes[i], false);
		    	form.setEnabled("itPedPrecoUnitItem___" + indexes[i], false);
		    	form.setEnabled("itPedDescontoItem___" + indexes[i], false);
		    	form.setEnabled("itPedPorcDescontoItem___" + indexes[i], false);
		    	form.setEnabled("itPedValorFreteItem___" + indexes[i], false);
		    	form.setEnabled("itPedNCMItem___" + indexes[i], false);
		    	form.setEnabled("itPedFinameItem___" + indexes[i], false);
		    	form.setEnabled("itPedIPIAliqItem___" + indexes[i], false);
		    	form.setEnabled("itPedICMSAliqItem___" + indexes[i], false);
		    	form.setEnabled("itPedTotalCustoComImpItem___" + indexes[i], false);
		    }
		}
		
	}else if( atv_atual == GTS_ACOMP_PED){
		
		//Dados Solicitante
		form.setEnabled("pedClienteRevenda", false);
		
		//Dados Representante
		form.setEnabled("repNome", false);
		form.setEnabled("repEmail", false);
		form.setEnabled("repDescMax", false);
		form.setEnabled("repGestorTerritorial", false);
		form.setEnabled("repEmailGestorTerritorial", false);
		//Dados Revenda
		form.setEnabled("revCpfCnpj", false);
		form.setEnabled("revNome", false);
		form.setEnabled("revFator", false);
		form.setEnabled("revMatFluig", false);
		form.setEnabled("revNomeFluig", false);
		//Dados Cliente
		form.setEnabled("cliCpfCnpj", false);
		form.setEnabled("cliInscricaoEstadual", false);
		form.setEnabled("cliNome", false);
		form.setEnabled("cliCodigo", false);
		form.setEnabled("cliLoja", false);
		form.setEnabled("cliCEP", false);
		form.setEnabled("cliUF", false);
		form.setEnabled("cliCidade", false);
		form.setEnabled("cliEndereco", false);
		form.setEnabled("cliBairro", false);
		form.setEnabled("cliComplemento", false);
		form.setEnabled("cliEmail", false);
		form.setEnabled("cliDDDTelefone", false);
		form.setEnabled("cliTelefone", false);
		//Dados Pedido
		form.setEnabled("pedCondPagto", false);
		form.setEnabled("pedOutraCodPagto", false);
		form.setEnabled("pedFrete", false);
		form.setEnabled("pedDataPrevEmbarque", false);
		form.setEnabled("pedObservacao", false);
		form.setEnabled("pedTipoPreco", false);
		form.setEnabled("pedObservacaoProduto", false);
		//Itens Pedido
		var indexes = form.getChildrenIndexes("tbItensPedido");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("itPedQtdItem___" + indexes[i], false);
		    	form.setEnabled("itPedFilialItem___" + indexes[i], false);
		    	form.setEnabled("itPedCodItemItem___" + indexes[i], false);
		    	form.setEnabled("itPedDescricaoItemItem___" + indexes[i], false);
		    	form.setEnabled("itPedPrecoUnitItem___" + indexes[i], false);
		    	form.setEnabled("itPedDescontoItem___" + indexes[i], false);
		    	form.setEnabled("itPedPorcDescontoItem___" + indexes[i], false);
		    	form.setEnabled("itPedValorFreteItem___" + indexes[i], false);
		    	form.setEnabled("itPedNCMItem___" + indexes[i], false);
		    	form.setEnabled("itPedFinameItem___" + indexes[i], false);
		    	form.setEnabled("itPedIPIAliqItem___" + indexes[i], false);
		    	form.setEnabled("itPedICMSAliqItem___" + indexes[i], false);
		    	form.setEnabled("itPedTotalCustoComImpItem___" + indexes[i], false);
		    }
		}
		
	}else if( atv_atual == SOL_REV_PED){
		
		//Dados Representante
		form.setEnabled("repNome", false);
		form.setEnabled("repEmail", false);
		form.setEnabled("repDescMax", false);
		form.setEnabled("repGestorTerritorial", false);
		form.setEnabled("repEmailGestorTerritorial", false);
		
		//Aprovações
		form.setEnabled("acompanhaAdmGTS", false);
		form.setEnabled("acompanhaAdmGTSObs", false);
		
		
	}

}
