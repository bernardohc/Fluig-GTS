function enableFields(form){

    var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO_0){	 
		
	}else if(atv_atual == SALVAR_RELATORIO){
        // form.setEnabled("solDataSaida", false);
        // //form.setEnabled("solDataRet", false);
        // form.setEnabled("solSetor", false);
    }else if(atv_atual == FIM){
        
    }
};

