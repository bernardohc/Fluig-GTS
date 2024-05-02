function enableFields(form){

    var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO_0){	 
		
	}else if(atv_atual == SECAO2){
        //Inicio
        form.setEnabled("sgqSolNome", false);
        form.setEnabled("sgqEmail", false);
        form.setEnabled("sgqTpDocumento", false);
        form.setEnabled("sgqSetor", false);
        form.setEnabled("sgqTpSolicitacao", false);
    
    }else if(atv_atual == SECAO3){
        //Inicio
        form.setEnabled("sgqSolNome", false);
        form.setEnabled("sgqEmail", false);
        form.setEnabled("sgqTpDocumento", false);
        form.setEnabled("sgqSetor", false);
        form.setEnabled("sgqTpSolicitacao", false);
    
    }else if(atv_atual == SECAO4){
        //Inicio
        form.setEnabled("sgqSolNome", false);
        form.setEnabled("sgqEmail", false);
        form.setEnabled("sgqTpDocumento", false);
        form.setEnabled("sgqSetor", false);
        form.setEnabled("sgqTpSolicitacao", false);
    
    }else if(atv_atual == SECAO5){
        //Inicio
        form.setEnabled("sgqSolNome", false);
        form.setEnabled("sgqEmail", false);
        form.setEnabled("sgqTpDocumento", false);
        form.setEnabled("sgqSetor", false);
        form.setEnabled("sgqTpSolicitacao", false);
    
    }
    else if(atv_atual == FIM){
        
    }
};

