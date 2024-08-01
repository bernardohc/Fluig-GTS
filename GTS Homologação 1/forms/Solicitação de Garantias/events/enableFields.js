function enableFields(form){

    var atv_atual = getValue("WKNumState");
    
	if(atv_atual == INICIO_0){	
        form.setEnabled("sgItensResultado", false); 
        form.setEnabled("sgItensMotivo", false); 
        form.setEnabled("sgItensObs", false); 
        
	
    }if(atv_atual == PRE_ANALISE){  
        //Dados Solicitante
        form.setEnabled("sgSolNome", false);
        form.setEnabled("sgSolEmail", false);
        //Dados Equipamento
        form.setEnabled("tpAtendimentoMaq", false);
        form.setEnabled("sgSolNumeroSerie", false);
        form.setEnabled("sgSolModelo", false);
        form.setEnabled("sgSolDtFat", false);
        form.setEnabled("sgSolEntTec", false);
        form.setEnabled("sgSolDtFabrica", false);
        form.setEnabled("sgSolMarca", false);
        form.setEnabled("sgSolAno", false);
        form.setEnabled("sgSolModeloTrator", false);
        //Dados Cliente
        form.setEnabled("sgSolNomeCli", false);
        form.setEnabled("sgSolFazenda", false);
        form.setEnabled("sgSolMunicipio", false);
        form.setEnabled("sgSolEstado", false);
        form.setEnabled("sgSolCelCli", false);
        form.setEnabled("sgSolTelCli", false);
        form.setEnabled("sgSolEmailCli", false);
        //Dados Revenda
        form.setEnabled("tpAtendMp", false);
        form.setEnabled("tpAtendimento", false);
        form.setEnabled("sgSolNomeRev", false);
        form.setEnabled("sgSolCnpjRev", false);
        form.setEnabled("sgSolTelRev", false);
        form.setEnabled("sgSolEmailRev", false);
        form.setEnabled("sgSolMuncipioRev", false);
        form.setEnabled("sgSolEstRev", false);
        //Descircao Problema
        form.setEnabled("tpAtendimentoMp", false);
        form.setEnabled("sgSolDescProble", false);
        form.setEnabled("btnAddFtFalha1", false);
        form.setEnabled("sgSolDtAtend", false);
        form.setEnabled("sgSolTpServico", false);
        form.setEnabled("sgSolDeslocamento", false);
        form.setEnabled("sgSolObs", false);
        //Parecer Técnico
        form.setEnabled("sgSolParecerTec", false);
        form.setEnabled("sgSolNomeTecnico", false);
        form.setEnabled("tecnicoGTS", false);
        form.setEnabled("sgAddItemCodigo", false);
        form.setEnabled("sgAddItemQtde", false);
        form.setEnabled("sgAddItemDesc", false);
        form.setEnabled("sgAddItemModFalha", false);
        form.setEnabled("sgItensResultado", true); 
        form.setEnabled("sgItensMotivo", true); 
        form.setEnabled("sgItensObs", true); 
        
        

	}else if(atv_atual == FIM){
        
    }
};

