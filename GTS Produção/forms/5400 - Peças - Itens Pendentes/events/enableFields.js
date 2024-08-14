function enableFields(form){
	
	var atv_atual = getValue("WKNumState");
	
	form.setEnabled("tipoPedido", false);
	
	if(atv_atual == GER_REVENDA_DEFINE){
		
		form.setEnabled("condPagamento", false);
		form.setEnabled("tipoFrete", false);
		
		var indexes = form.getChildrenIndexes("tbItensPendente");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("itmDataPrevistaChegadaItem___" + indexes[i], false);
		    }
		}
		
	}else if(atv_atual == ADM_GTS_RETORNO){
		
		form.setEnabled("condPagamento", false);
		form.setEnabled("tipoFrete", false);
		
		var indexes = form.getChildrenIndexes("tbItensPendente");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("itmDataPrevistaChegadaItem___" + indexes[i], false);
		    }
		}
		
	}


}
