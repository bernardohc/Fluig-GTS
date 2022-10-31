function enableFields(form){
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO_0){
		
	}else if(atv_atual == ANALISA_CANCELAMENTO){
		// Solicitação
		form.setEnabled("solPedido", false);
		//Itens Despesa form pai e filho
		var indexes = form.getChildrenIndexes("solTbMaquinas");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("solPedido___" + indexes[i], false);
		    	form.setEnabled("solProdutoAtual___" + indexes[i], false);
		    	form.setEnabled("solMotivoCancelamento___" + indexes[i], false);
		    }
		}
		
	}
		
}