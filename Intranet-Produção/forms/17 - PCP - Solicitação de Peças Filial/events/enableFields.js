function enableFields(form){
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO_0){
		form.setEnabled("solAprovacao", false);		
		form.setEnabled("solQtdeLiberada", false);		

	}else if(atv_atual == ANALISA_SOLICITACAO){

		form.setEnabled("solAprovacao", true);		
		//Itens Despesa form pai e filho, solicitação
		var indexes = form.getChildrenIndexes("solTbMaquinas");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("solProduto___" + indexes[i], false);
		    	form.setEnabled("solQuantidade___" + indexes[i], false);
		    	form.setEnabled("solTipo___" + indexes[i], false);
		    }
		}
		
		
	}else if(atv_atual == SEPARACAO_ALMOX){
		//Itens Despesa form pai e filho, solicitação
		var indexes = form.getChildrenIndexes("solTbMaquinas");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("solProduto___" + indexes[i], false);
		    	form.setEnabled("solQuantidade___" + indexes[i], false);
		    	form.setEnabled("solTipo___" + indexes[i], false);
		    }
		}
		//Aprovação PCP
		form.setEnabled("solAprovacao", false);
		form.setEnabled("solQtdeLiberada", false);
		form.setEnabled("obsAlteracao", false);
		form.setEnabled("solQtdeLiberada", false);	

	}
	
}