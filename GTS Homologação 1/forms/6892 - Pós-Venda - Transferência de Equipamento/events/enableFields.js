function enableFields(form){
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO || atv_atual == INICIO_0){
	
	}else if( atv_atual == GTS_ANALISA_DEMANDA ){
		
		//Revenda
		form.setEnabled("revRazaoSocialRevenda", false);
		form.setEnabled("revNomeFantasiaRevenda", false);
		form.setEnabled("revCodigo", false);
		form.setEnabled("revLoja", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revEmail", false);
		form.setEnabled("revTelefone", false);
		
		//Equipamento
		form.setEnabled("equipNumSerie", false);
		form.setEnabled("equipCodProduto", false);
		form.setEnabled("equipDescricao", false);
		form.setEnabled("obsObservacaoGeral", false);
		
	}else if( atv_atual == REVENDA_VERIFICA_RETORNO ){
		
		//Revenda
		form.setEnabled("revRazaoSocialRevenda", false);
		form.setEnabled("revNomeFantasiaRevenda", false);
		form.setEnabled("revCodigo", false);
		form.setEnabled("revLoja", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revEmail", false);
		form.setEnabled("revTelefone", false);
		
		//Equipamento
		form.setEnabled("equipNumSerie", false);
		form.setEnabled("equipCodProduto", false);
		form.setEnabled("equipDescricao", false);
		form.setEnabled("obsObservacaoGeral", false);
		
		//Análise e Aprovação da Transferência
		form.setEnabled("transEqptAprovacao", false);
		form.setEnabled("transEqptAprovacaoObservacao", false);
	}
}
