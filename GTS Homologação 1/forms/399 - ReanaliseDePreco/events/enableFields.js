function enableFields(form){
	
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO || atv_atual == INICIO_0){
		form.setEnhancedSecurityHiddenInputs(true);
		form.setEnabled("reaPrecoUsuarioAdm", false);
		form.setEnabled("reaPrecoDataRespAdm", false);
		form.setEnabled("reaPrecoPedAtacado", false);
		form.setEnabled("reaPrecoObservacaoAdm", false);
		
	}else if(atv_atual == ADM_ANALISA){
		
		desabilitaCabTabela(form);
		
	}else if(atv_atual == REP_VERIFICA_RET){
		desabilitaCabTabela(form);
		

		form.setEnabled("reaPrecoUsuarioAdm", false);
		form.setEnabled("reaPrecoDataRespAdm", false);
//		form.setEnabled("reaPrecoPedAtacado", false);
		form.setEnabled("reaPrecoObservacaoAdm", false);
	}

}

function desabilitaCabTabela(form){
	form.setEnhancedSecurityHiddenInputs(true);
	
	form.setEnabled("repTel", false);
	form.setEnabled("divergPecaCondRec", false);
	
	form.setEnabled("reaPrecoCodProduto", false);
	form.setEnabled("reaPrecoDescProduto", false);
	form.setEnabled("reaPrecoMarca", false);
	form.setEnabled("reaPrecoRazSocFornec", false);
	form.setEnabled("reaPrecoPrecoBalcao", false);
	form.setEnabled("reaPrecoPrecoConcorrente", false);
	form.setEnabled("reaPrecoObservacao", false);

}