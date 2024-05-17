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
        //Atendente
        form.setEnabled("sgqObservacao", false);        
    }else if(atv_atual == ANALISE_DOCUMENTO){
        form.setEnabled("sgqSolNome", true);        
        form.setEnabled("sgqEmail", true);        
        form.setEnabled("sgqTpDocumento", true);        
        form.setEnabled("sgqSetor", true);        
        form.setEnabled("sgqTpSolicitacao", true);        
        form.setEnabled("sgqCaDLinkDoc", true);        
        form.setEnabled("sgqCadObjDoc", true);        
        form.setEnabled("sgqCadPalChave", true);        
        form.setEnabled("sgqValLinkDoc", true);        
        form.setEnabled("sgqValObjDoc", true);        
        form.setEnabled("sgqRevCodDoc", true);        
        form.setEnabled("sgqRevMotivoDoc", true);        
        form.setEnabled("sgqDescCodDoc", true);        
        form.setEnabled("sgqDescMotivoDoc", true);    
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
    }else if(atv_atual == FIM){
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
        form.setEnabled("sgqObservacao", false);  
    }else if(atv_atual == CANCELAMENTO){
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
        form.setEnabled("sgqObservacao", false);  
    }
};

