function enableFields(form){

    var atv_atual = getValue("WKNumState"); 
	
	if(atv_atual == INICIO_0){	 

    }else if(atv_atual == INICIO){	 
        form.setEnabled("ckConfirma", true);

    }else if(atv_atual == Leitura){	 
        form.setEnabled("ckConfirma", false);

    }else if(atv_atual == FIM){
        form.setEnabled("btnInicia", false);
        form.setEnabled("ckConfirma", false);
        form.setEnabled("btnPolitica", false);
        
    }
};

