function enableFields(form){

    var atv_atual = getValue("WKNumState");
    var visu = form.getFormMode();
	
	if(atv_atual == INICIO_0){	 
		//form.setEnabled("divPesquisaDeSatisfacaoPosSafra", false);
        
    }else if(atv_atual == INICIO){	 
        //form.setEnabled("divPesquisaDeSatisfacaoPosSafra", false);  
        form.setEnabled("pesqNumSerie", false);      
    }else if(atv_atual == Registro_Ocorrências){
        //Inicio pesquisa 
        form.setEnabled("pesqEfetivoCont", false);
        form.setEnabled("pesqEntregaPor", false);
        form.setEnabled("solDataPesq", false);
        form.setEnabled("pesqNumSerie", false);
        form.setEnabled("pesqModelo", false);
        form.setEnabled("pesqRevenda", false);
        form.setEnabled("pesqCidadeRevenda", false);
        form.setEnabled("pesqRepresentante", false);
        form.setEnabled("pesqCliente", false);
        form.setEnabled("pesqCidadeCliente", false);
        form.setEnabled("pesqAcompanhouEntrega", false);
        form.setEnabled("pesqTelefone", false);
        form.setEnabled("pesqNotaAtendimento", false);
        form.setEnabled("pesqFeedbackAtendimento", false);
        form.setEnabled("pesqNotaDesempenho", false);
        form.setEnabled("pesqFeedbackEquipamento", false);
        form.setEnabled("pesqTermColheita", false);
        form.setEnabled("pesqPrevColheita", false);
        form.setEnabled("pesqOcorrencia", false);
        //Pos Safra
        //form.setEnabled("psPesqEntregaPor", false);

    }else if(atv_atual == Aguardando_Colheita){
        //Inicio pesquisa 
        form.setEnabled("pesqEfetivoCont", false);
        form.setEnabled("pesqEntregaPor", false);
        form.setEnabled("solDataPesq", false);
        form.setEnabled("pesqNumSerie", false);
        form.setEnabled("pesqModelo", false);
        form.setEnabled("pesqRevenda", false);
        form.setEnabled("pesqCidadeRevenda", false);
        form.setEnabled("pesqRepresentante", false);
        form.setEnabled("pesqCliente", false);
        form.setEnabled("pesqCidadeCliente", false);
        form.setEnabled("pesqAcompanhouEntrega", false);
        form.setEnabled("pesqTelefone", false);
        form.setEnabled("pesqNotaAtendimento", false);
        form.setEnabled("pesqFeedbackAtendimento", false);
        form.setEnabled("pesqNotaDesempenho", false);
        form.setEnabled("pesqFeedbackEquipamento", false);
        form.setEnabled("pesqFimOcorrencia", false);
        //form.setEnabled("pesqTermColheita", false);
        //form.setEnabled("pesqPrevColheita", false);
        form.setEnabled("pesqOcorrencia", false);
        //Pos Safra
        //form.setEnabled("psPesqEntregaPor", false);

    }else if(atv_atual == Pesquisa_Pos_Safra){

        //form.setEnabled("divPesquisaDeSatisfacaoPosSafra", false);
        form.setEnabled("divPesquisaDeSatisfacaoPosSafra", true);
        //Pesquisa de satisfação
        form.setEnabled("pesqEfetivoCont", false);
        form.setEnabled("pesqEntregaPor", false);
        form.setEnabled("solDataPesq", false);
        form.setEnabled("pesqNumSerie", false);
        form.setEnabled("pesqModelo", false);
        form.setEnabled("pesqRevenda", false);
        form.setEnabled("pesqCidadeRevenda", false);
        form.setEnabled("pesqRepresentante", false);
        form.setEnabled("pesqCliente", false);
        form.setEnabled("pesqCidadeCliente", false);
        form.setEnabled("pesqAcompanhouEntrega", false);
        form.setEnabled("pesqTelefone", false);
        form.setEnabled("pesqNotaAtendimento", false);
        form.setEnabled("pesqFeedbackAtendimento", false);
        form.setEnabled("pesqNotaDesempenho", false);
        form.setEnabled("pesqFeedbackEquipamento", false);
        form.setEnabled("pesqTermColheita", false);
        form.setEnabled("pesqPrevColheita", false);
        form.setEnabled("pesqOcorrencia", false);

        //Pesquisa pos safra
        form.setEnabled("psPesqEntregaPor", false);
        form.setEnabled("psPesqNumSerie", false);
        form.setEnabled("psPesqModelo", false);
        form.setEnabled("psPesqRevenda", false);
        //form.setEnabled("psPesqCidadeRevenda", false);
        form.setEnabled("psPesqRepresentante", false);
        form.setEnabled("psPesqCliente", false);
        form.setEnabled("psPesqCidadeCliente", false);
        
        form.setEnabled("pesqPrecisouRev", false);
        form.setEnabled("pesqRevendaZoom", false);


    }else if(atv_atual == Ocorrência_Pos_Safra){
        //Pesquisa pos safra
        form.setEnabled("pesqEfetivoCont", false);
        form.setEnabled("pesqEntregaPor", false);
        form.setEnabled("solDataPesq", false);
        form.setEnabled("pesqNumSerie", false);
        form.setEnabled("pesqModelo", false);
        form.setEnabled("pesqRevenda", false);
        form.setEnabled("pesqCidadeRevenda", false);
        form.setEnabled("pesqRepresentante", false);
        form.setEnabled("pesqCliente", false);
        form.setEnabled("pesqCidadeCliente", false);
        form.setEnabled("pesqAcompanhouEntrega", false);
        form.setEnabled("pesqTelefone", false);
        form.setEnabled("pesqNotaAtendimento", false);
        form.setEnabled("pesqFeedbackAtendimento", false);
        form.setEnabled("pesqNotaDesempenho", false);
        form.setEnabled("pesqFeedbackEquipamento", false);
        form.setEnabled("pesqTermColheita", false);
        form.setEnabled("pesqPrevColheita", false);
        form.setEnabled("pesqOcorrencia", false);

        //Pesquisa pós safra
        form.setEnabled("psPesqEfetivoCont", false);
        form.setEnabled("psPesqEntregaPor", false);
        form.setEnabled("psSolDataPesq", false);
        form.setEnabled("psPesqNumSerie", false);
        form.setEnabled("psPesqModelo", false);
        form.setEnabled("psPesqRevenda", false);
        form.setEnabled("psPesqCidadeRevenda", false);
        form.setEnabled("psPesqRepresentante", false);
        form.setEnabled("psPesqCliente", false);
        form.setEnabled("psPesqCidadeCliente", false);
        form.setEnabled("psPesqAcompanhouEntrega", false);
        form.setEnabled("psPesqTelefone", false);
        //form.setEnabled("psPesqNotaAtendimento", false);
        //form.setEnabled("psPesqFeedbackAtendimento", false);
        //form.setEnabled("psPesqNotaDesempenho", false);
        //form.setEnabled("psPesqFeedbackEquipamento", false);
        //form.setEnabled("psPesqDispRevenda", false);
        //form.setEnabled("psPesqFeedbackPecas", false);
        //form.setEnabled("psPesqOcorrencia", false);
    }else if(atv_atual == FIM){
        form.setEnabled("psPesqFeedbackPecas", false);
    }
};

