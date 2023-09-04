function enableFields(form){
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO || atv_atual == INICIO_0){
		
		//Cabeçalho
		form.setEnabled("statusAtendimento", false);
		form.setEnabled("numProtocoloFluig", false);
		form.setEnabled("numProtocoloTelefonico", false);
		form.setEnabled("dataAbertura", false);
		form.setEnabled("dataEncerramento", false);
		
		//Requisitante
		form.setEnabled("nomeRequisitante", false);
		form.setEnabled("tipoPessoaRequisitante", false);
		form.setEnabled("cpfCnpjRequisitante", false);
		form.setEnabled("telRequisitante", false);
		form.setEnabled("emailRequisitante", false);
		form.setEnabled("estadoRequisitante", false);
		form.setEnabled("cidadeRequisitante", false);
		//Solicitação
		form.setEnabled("tipoSolicitacao", false);
		form.setEnabled("estadoRevenda", false);
		form.setEnabled("cidadeRevenda", false);
		form.setEnabled("revenda", false);
		form.setEnabled("tipoPessoaRevenda", false);
		form.setEnabled("cpfCnpjRevenda", false);
		form.setEnabled("codGrupoSetor", false);
		form.setEnabled("numSerie", false);
		form.setEnabled("modeloEquipamento", false);
		form.setEnabled("assuntoSolicitacao", false);
		form.setEnabled("descricaoSolicitacao", false);
	
	}else if( atv_atual == CADASTRA_SAC){
		
		//Cabeçalho
		form.setEnabled("statusAtendimento", false);
		form.setEnabled("dataAbertura", false);
		form.setEnabled("dataEncerramento", false);
		
//		form.setEnabled("tipoPessoaRevenda", false);
//		form.setEnabled("cpfCnpjRevenda", false);
		
	}else if( atv_atual == ATENDIMENTO_SETOR){
		
		//Cabeçalho
		form.setEnabled("numProtocoloFluig", false);
		form.setEnabled("numProtocoloTelefonico", false);
		form.setEnabled("dataAbertura", false);
		form.setEnabled("dataEncerramento", false);
		
		//Requisitante
		form.setEnabled("nomeRequisitante", false);
		form.setEnabled("tipoPessoaRequisitante", false);
		form.setEnabled("cpfCnpjRequisitante", false);
		form.setEnabled("telRequisitante", false);
		form.setEnabled("emailRequisitante", false);
		form.setEnabled("estadoRequisitante", false);
		form.setEnabled("cidadeRequisitante", false);
		//Solicitação
		form.setEnabled("tipoSolicitacao", false);
		form.setEnabled("estadoRevenda", false);
		form.setEnabled("cidadeRevenda", false);
		form.setEnabled("revenda", false);
		form.setEnabled("tipoPessoaRevenda", false);
		form.setEnabled("cpfCnpjRevenda", false);
		form.setEnabled("codGrupoSetor", false);
		form.setEnabled("numSerie", false);
		form.setEnabled("modeloEquipamento", false);
		form.setEnabled("assuntoSolicitacao", false);
		form.setEnabled("descricaoSolicitacao", false);
		
//		var indexes = form.getChildrenIndexes("tbItensOrcamento");
//		if(indexes.length > 0){
//		    for (var i = 0; i < indexes.length; i++) { 
//		    	form.setEnabled("orcQtdItem___" + indexes[i], false);
//		    	form.setEnabled("orcQtdCP1RetItem___" + indexes[i], false);
//		    	form.setEnabled("orcQtdCP2RetItem___" + indexes[i], false);
//		    	form.setEnabled("orcQtdCP3RetItem___" + indexes[i], false);
//		    	form.setEnabled("orcPrecoUnitItem___" + indexes[i], false);
//		    }
//		}
	
	}

}
