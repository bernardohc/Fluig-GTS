function enableFields(form){
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO || atv_atual == INICIO_0){
		
	}else if(atv_atual == ATIVIDADE_CENTRAL){
		
		form.setEnabled("campoTextoLGPD", false);
		form.setEnabled("campoNumInteiro", false);
		
		var indexes = form.getChildrenIndexes("tbItensOrcamento");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("orcQtdItem___" + indexes[i], false);
		    	form.setEnabled("orcQtdCP1RetItem___" + indexes[i], false);
		    	form.setEnabled("orcQtdCP2RetItem___" + indexes[i], false);
		    	form.setEnabled("orcQtdCP3RetItem___" + indexes[i], false);
		    	form.setEnabled("orcPrecoUnitItem___" + indexes[i], false);
		    }
		}
	
	}
}
