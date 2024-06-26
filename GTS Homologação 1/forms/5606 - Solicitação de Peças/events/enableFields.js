function enableFields(form){
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO_0){
		form.setEnabled("solLiberacao", false);		
		form.setEnabled("solQtdeLiberada", false);		
		form.setEnabled("solQtdeAlmox", false);			

		var indexes = form.getChildrenIndexes("solTbMaquinas");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
				form.setEnabled("solLiberacao___" + indexes[i], false);
				form.setEnabled("solQtdeLiberada___" + indexes[i], false);
				form.setEnabled("solQtdeAlmox___" + indexes[i], false);
		    }
		};
	

	}else if(atv_atual == SALVAR){

		form.setEnabled("solLiberacao", false);		
		form.setEnabled("solQtdeLiberada", false);		
		form.setEnabled("solQtdeAlmox", false);	

		var indexes = form.getChildrenIndexes("solTbMaquinas");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
				form.setEnabled("solLiberacao___" + indexes[i], false);
				form.setEnabled("solQtdeLiberada___" + indexes[i], false);
				form.setEnabled("solQtdeAlmox___" + indexes[i], false);
		    }
		}
		
	}else if(atv_atual == ANALISA_SOLICITACAO){

		form.setEnabled("Solicitapara", false);	

		form.setEnabled("solAprovacao", true);		
		//Itens Despesa form pai e filho, solicitação
		var indexes = form.getChildrenIndexes("solTbMaquinas");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("solProduto___" + indexes[i], false);
		    	form.setEnabled("solQuantidade___" + indexes[i], false);
		    	form.setEnabled("solTipo___" + indexes[i], false);
				form.setEnabled("solQtdeAlmox___" + indexes[i], false);
				form.setEnabled("solObs___" + indexes[i], false);
				form.setEnabled("solVendedor___" + indexes[i], false);
				form.setEnabled("Unidade", false);	
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
				form.setEnabled("solLiberacao___" + indexes[i], false);
		    	form.setEnabled("solQtdeLiberada___" + indexes[i], false);
				form.setEnabled("solObs___" + indexes[i], false);
				form.setEnabled("solVendedor___" + indexes[i], false);
				form.setEnabled("Unidade", false);	
		    }
		}
		//Aprovação PCP
		form.setEnabled("solAprovacao", false);
		form.setEnabled("solQtdeLiberada", false);
		form.setEnabled("obsAlteracao", false);
		form.setEnabled("Solicitapara", false);	

	}
	
}