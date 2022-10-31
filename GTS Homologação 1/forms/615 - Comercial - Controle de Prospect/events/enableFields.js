function enableFields(form){
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO || atv_atual == INICIO_0){
		
	}else if(atv_atual == REPRESENTANTE){
		
		form.setEnabled("representante", false);
		form.setEnabled("gestorTerritorial", false);
		form.setEnabled("gestorComercial", false);
		
		form.setEnabled("nomeRevendaCliente", false);
		form.setEnabled("municipioRevendaCliente", false);
		form.setEnabled("estadoRevendaCliente", false);
		form.setEnabled("familiaTipoProduto", false);
		form.setEnabled("acao", false);
		form.setEnabled("descricaoInicial", false);
		form.setEnabled("statusSolicitacao", false);
		
		
	}else if( atv_atual == GESTOR_TERRITORIAL ){
		
		if(form.getValue("WKUserRepresentante") != ''){
			form.setEnabled("representante", false);
		}
		form.setEnabled("gestorTerritorial", false);
		form.setEnabled("gestorComercial", false);
		
		form.setEnabled("nomeRevendaCliente", false);
		form.setEnabled("municipioRevendaCliente", false);
		form.setEnabled("estadoRevendaCliente", false);
		form.setEnabled("familiaTipoProduto", false);
		form.setEnabled("acao", false);
		form.setEnabled("descricaoInicial", false);
		
	}else if( atv_atual == GESTOR_COMERCIAL ){
		
		if(form.getValue("WKUserRepresentante") != ''){
			form.setEnabled("representante", false);
		}
		form.setEnabled("gestorTerritorial", false);
		form.setEnabled("gestorComercial", false);
		
		form.setEnabled("nomeRevendaCliente", false);
		form.setEnabled("municipioRevendaCliente", false);
		form.setEnabled("estadoRevendaCliente", false);
		form.setEnabled("familiaTipoProduto", false);
		form.setEnabled("acao", false);
		form.setEnabled("descricaoInicial", false);
		
	}

}
