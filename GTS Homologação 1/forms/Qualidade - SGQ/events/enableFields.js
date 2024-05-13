function enableFields(form){

    var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO_0){	 
		
	// }else if(atv_atual == SECAO2){
    //     //Inicio
    //     form.setEnabled("sgqSolNome", false);
    //     form.setEnabled("sgqEmail", false);
    //     form.setEnabled("sgqTpDocumento", false);
    //     form.setEnabled("sgqSetor", false);
    //     form.setEnabled("sgqTpSolicitacao", false);
    
    }else if(atv_atual == AGUARDANDO_ATENDIMENTO){
        form.setEnabled("sgqSolNome", false);        
        form.setEnabled("sgqEmail", false);        
        form.setEnabled("sgqTpDocumento", false);        
        form.setEnabled("sgqSetor", false);        
        form.setEnabled("sgqTpSolicitacao", false);        
        form.setEnabled("sgqCaDLinkDoc", false);        
        form.setEnabled("sgqCadObjDoc", false);        
        form.setEnabled("sgqCadPalChave", false);        
        form.setEnabled("sgqValLinkDoc", false);        
        form.setEnabled("sgqValObjDoc", false);        
        form.setEnabled("sgqRevCodDoc", false);        
        form.setEnabled("sgqRevMotivoDoc", false);        
        form.setEnabled("sgqDescCodDoc", false);        
        form.setEnabled("sgqDescMotivoDoc", false);        
    }else if(atv_atual == ANALISE_DOCUMENTO){
        form.setEnabled("sgqSolNome", false);        
        form.setEnabled("sgqEmail", false);        
        form.setEnabled("sgqTpDocumento", false);        
        form.setEnabled("sgqSetor", false);        
        form.setEnabled("sgqTpSolicitacao", false);        
        form.setEnabled("sgqCaDLinkDoc", false);        
        form.setEnabled("sgqCadObjDoc", false);        
        form.setEnabled("sgqCadPalChave", false);        
        form.setEnabled("sgqValLinkDoc", false);        
        form.setEnabled("sgqValObjDoc", false);        
        form.setEnabled("sgqRevCodDoc", false);        
        form.setEnabled("sgqRevMotivoDoc", false);        
        form.setEnabled("sgqDescCodDoc", false);        
        form.setEnabled("sgqDescMotivoDoc", false);    
        //Atendente
        form.setEnabled("sgqAtendente", false);      
    }else if(atv_atual == AGUARDANDO){
        form.setEnabled("sgqSolNome", false);        
        form.setEnabled("sgqEmail", false);        
        form.setEnabled("sgqTpDocumento", false);        
        form.setEnabled("sgqSetor", false);        
        form.setEnabled("sgqTpSolicitacao", false);        
        form.setEnabled("sgqCaDLinkDoc", false);        
        form.setEnabled("sgqCadObjDoc", false);        
        form.setEnabled("sgqCadPalChave", false);        
        form.setEnabled("sgqValLinkDoc", false);        
        form.setEnabled("sgqValObjDoc", false);        
        form.setEnabled("sgqRevCodDoc", false);        
        form.setEnabled("sgqRevMotivoDoc", false);        
        form.setEnabled("sgqDescCodDoc", false);        
        form.setEnabled("sgqDescMotivoDoc", false);    
        //Atendente
        form.setEnabled("sgqAtendente", false);      
    }    else if(atv_atual == FIM){
        
    }
};

