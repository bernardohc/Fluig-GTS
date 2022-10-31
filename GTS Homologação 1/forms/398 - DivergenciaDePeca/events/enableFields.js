function enableFields(form){
	
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO || atv_atual == INICIO_0){
		form.setEnhancedSecurityHiddenInputs(true);
		form.setEnabled("divergPecaObservacaoAdm", false);
		
	}else if(atv_atual == ADM_ANALISA){
		
		desabilitaCabTabela(form);
		
	}else if(atv_atual == REP_VERIFICA_RET){
		desabilitaCabTabela(form);
		
		/*var indexes = form.getChildrenIndexes("tbItensDivergPecas");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) {
//		    	form.setEnabled("divergPecaAvaliacaoItem___" + indexes[i], false);
		    }
		}*/
		form.setEnabled("divergPecaObservacaoAdm", false);
	}

}

function desabilitaCabTabela(form){
	form.setEnhancedSecurityHiddenInputs(true);
	
	form.setEnabled("repTel", false);
	form.setEnabled("divergPecaCondRec", false);
	
	form.setEnabled("divergPecaNumNota", false);
	form.setEnabled("divergPecaDataEmissao", false);
	form.setEnabled("divergPecaObservacao", false);
	
	
	var indexes = form.getChildrenIndexes("tbItensDivergPecas");
	if(indexes.length > 0){
	    for (var i = 0; i < indexes.length; i++) {
	    	form.setEnabled("divergPecaCodProdItem___" + indexes[i], false);
	    	form.setEnabled("divergPecaDescProdItem___" + indexes[i], false);
	    	form.setEnabled("divergPecaQtdItem___" + indexes[i], false);
	    	form.setEnabled("divergPecaQtdDivergenteItem___" + indexes[i], false);
	    	form.setEnabled("divergPecaMotivoItem___" + indexes[i], false);
	    	form.setEnabled("divergPecaValUnitItem___" + indexes[i], false);
	    	form.setEnabled("divergPecaValTotalItem___" + indexes[i], false);
	    }
	}
}