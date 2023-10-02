function enableFields(form){

    var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO_0){	 
		
	}else if(atv_atual == SALVAR_RELATORIO){
        form.setEnabled("solDataSaida", false);
        form.setEnabled("solDataRet", false);
        form.setEnabled("solSetor", false);
    }else if(atv_atual == ANALISA_RELATORIO){
        //Cabeçalho
        form.setEnabled("solSetor", false);
        form.setEnabled("solAdianta", false);
        form.setEnabled("solMoeda", false);
        form.setEnabled("solDataSaida", false);
        form.setEnabled("solDataRet", false);
        form.setEnabled("solNumColab", false);
        form.setEnabled("geraisPlaca", false);
        //Despesas
        form.setEnabled("rvDespObs", false);
        form.setEnabled("salvarEnviar", false);
        
    }else if(atv_atual == AJUSTA_RELATORIO){
        form.setEnabled("aprovRelatorio", false);
        form.setEnabled("rvAproObs", false);
        form.setEnabled("revisaoRelatorio", false);
        form.setEnabled("rvRevisaoObs", false);
        
    }else if(atv_atual == REVISA_RELATORIO){
        //Cabeçalho
        form.setEnabled("solSetor", false);
        form.setEnabled("solAdianta", false);
        form.setEnabled("solMoeda", false);
        form.setEnabled("solDataSaida", false);
        form.setEnabled("solDataRet", false);
        form.setEnabled("solNumColab", false);
        form.setEnabled("geraisPlaca", false);
        //Despesas
        form.setEnabled("rvDespObs", false);
        form.setEnabled("salvarEnviar", false);
        //
        form.setEnabled("aprovRelatorio", false);
        form.setEnabled("rvAproObs", false);
        
    }else if(atv_atual == ANALISA_ERRO_INTEGRACAO_ABASTECIMENTO){
        //Cabeçalho
        form.setEnabled("solSetor", false);
        form.setEnabled("solAdianta", false);
        form.setEnabled("solMoeda", false);
        form.setEnabled("solDataSaida", false);
        form.setEnabled("solDataRet", false);
        form.setEnabled("solNumColab", false);
        // form.setEnabled("geraisPlaca", false);
        //Despesas
        form.setEnabled("rvDespObs", false);
        form.setEnabled("salvarEnviar", false);
        //
        form.setEnabled("aprovRelatorio", false);
        form.setEnabled("rvAproObs", false);

        form.setEnabled("revisaoRelatorio", false);
        form.setEnabled("rvRevisaoObs", false);
        
    }else if(atv_atual == FIM){
        
    }
};

