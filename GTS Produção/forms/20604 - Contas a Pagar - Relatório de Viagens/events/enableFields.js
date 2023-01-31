function enableFields(form){
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO_0){	 
		
	}else if(atv_atual == ANALISA_RELATORIO){
		// Solicitação
		form.setEnabled("solMatSolicitante", false);
		form.setEnabled("solNomeSolicitante", false);
		form.setEnabled("itSolObsDespesaItem", false);
		form.setEnabled("solSaldo", false);

    
	}else if(atv_atual == REVISA_RELATORIO){
		// Solicitação
		form.setEnabled("solMatSolicitante", false);
		form.setEnabled("solNomeSolicitante", false);
		form.setEnabled("itSolObsDespesaItem", false);
		form.setEnabled("solSaldo", false);
		form.setEnabled("aprovRelatorioAprovado", false);
		form.setEnabled("aprovRelatorioReprovado", false);
		form.setEnabled("aprovRelatorio", false);
		form.setEnabled("aprovReembolsoObs", false);
		
	}else if(atv_atual == AJUSTA_RELATORIO){
		// Solicitação
		form.setEnabled("solMatSolicitante", false);
		form.setEnabled("solNomeSolicitante", false);
		form.setEnabled("itSolObsDespesaItem", false);
		form.setEnabled("solSaldo", false);
		form.setEnabled("aprovRelatorio", false);
		form.setEnabled("aprovReembolsoObs", false);
		form.setEnabled("itSolObsDespesaItem", true);
		form.setEnabled("revisaoRelatorio", false);
		form.setEnabled("aprovRevisaoObs", false);
		
	}
}



