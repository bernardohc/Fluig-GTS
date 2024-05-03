function servicetask24(attempt, message) {
    
    /*
    *   Define campos de descrição
    */
	var solTipoSolicitacaoDesc = "";
    var solTipoSolicitacao = hAPI.getCardValue('solTipoSolicitacao');
    if(solTipoSolicitacao == "IN"){
        solTipoSolicitacaoDesc = "Informação";
    }else if(solTipoSolicitacao == "MP"){
        solTipoSolicitacaoDesc = "Máquina Parada";
    }else if(solTipoSolicitacao == "PS"){
        solTipoSolicitacaoDesc = "Pós-Safra";
    }
    hAPI.setCardValue('solTipoSolicitacaoHidden', solTipoSolicitacao);
    hAPI.setCardValue('solTipoSolicitacaoDesc', solTipoSolicitacaoDesc);
    

    var solTipoInformacaoDesc = "";
    var solTipoInformacao = hAPI.getCardValue('solTipoInformacao');
    if(solTipoInformacao == "LR"){
        solTipoInformacaoDesc = "Localização de Revenda";
    }else if(solTipoInformacao == "OM"){
        solTipoInformacaoDesc = "Operação e Manutenção";
    }else if(solTipoInformacao == "PG"){
        solTipoInformacaoDesc = "Processo de Garantia";
    }else if(solTipoInformacao == "ET"){
        solTipoInformacaoDesc = "Solicitação de Entrega Técnica";
    }else if(solTipoInformacao == "Outros"){
        solTipoInformacaoDesc = "Outros";
    }
    hAPI.setCardValue('solTipoInformacaoDesc', solTipoInformacaoDesc);
    
    /*
    * Define a matricula do usuário de Suporte da GTS pelo parametrizador.
    * A regra é a seguinte:
    * Se foi definido no formulário que a solicitação é para a Revenda vinculada, 
    * pega o estado do campo revEquipEstadoHidden, 
    * que é o estado que está vinculado no número de série.
    * Se foi definido no formulário que a solicitação NÃO é para a Revenda vinculada,
    * pega o estado do campo revEstadoHidden, que é o estado que o usuário definiu para localizar a Revenda correta.
    */
    var estado = '';
    var revSolicicaoVinculada = hAPI.getCardValue('revSolicicaoVinculada');
    if(revSolicicaoVinculada == 'nao'){
        estado = hAPI.getCardValue('revEstadoHidden');
    }else{
        estado = hAPI.getCardValue('revEquipEstadoHidden');
    }

	var dsParametroSuporteEstado = DatasetFactory.getDataset("ds_parametro_compOS_suporte_estado", null, null, null);
    if(dsTemValor(dsParametroSuporteEstado)){
        var setouSuporteEstado = false;
        for(var i = 0; i < dsParametroSuporteEstado.rowsCount; i++){
            if (dsParametroSuporteEstado.getValue(i, "siglaEstado") == estado ) {
                setouSuporteEstado = true;
                hAPI.setCardValue("matFluigSuporteGTS", dsParametroSuporteEstado.getValue(i, "WKUserSuporteGTS"));
            }
        }
        if(!setouSuporteEstado){
            hAPI.setCardValue('matFluigSuporteGTS', 'admin');
        }
    }else{
        hAPI.setCardValue('matFluigSuporteGTS', 'admin');
    }

    /*
    *   Envia e-mail de Abertura para requisitante
    */
    var gerNumProtocolo = DatasetFactory.createConstraint("gerNumProtocolo", hAPI.getCardValue("gerNumProtocolo"), "", ConstraintType.MUST); 
    var dataAbertura = DatasetFactory.createConstraint("dataAbertura", hAPI.getCardValue("dataAbertura"), "", ConstraintType.MUST); 
    //Solicitante
    var solNome = DatasetFactory.createConstraint("solNome", hAPI.getCardValue("solNome"), "", ConstraintType.MUST); 
    var solEmail = DatasetFactory.createConstraint("solEmail", hAPI.getCardValue("solEmail"), "", ConstraintType.MUST); 
    var solTelefone = DatasetFactory.createConstraint("solTelefone", hAPI.getCardValue("solTelefone"), "", ConstraintType.MUST); 
    var solCidade = DatasetFactory.createConstraint("solCidade", hAPI.getCardValue("solCidade"), "", ConstraintType.MUST); 
    var solEstado = DatasetFactory.createConstraint("solEstado", hAPI.getCardValue("solEstadoHidden"), "", ConstraintType.MUST); 
    //Equipamento
    var equipNumSerie = DatasetFactory.createConstraint("equipNumSerie", hAPI.getCardValue("equipNumSerie"), "", ConstraintType.MUST); 
    var equipDescricao = DatasetFactory.createConstraint("equipDescricao", hAPI.getCardValue("equipDescricao"), "", ConstraintType.MUST); 
    var equipDataTerminoGarantia = DatasetFactory.createConstraint("equipDataTerminoGarantia", hAPI.getCardValue("equipDataTerminoGarantia"), "", ConstraintType.MUST); 
    
    var solTipoSolicitacao = DatasetFactory.createConstraint("solTipoSolicitacao", hAPI.getCardValue("solTipoSolicitacaoDesc"), "", ConstraintType.MUST); 
    var solTipoInformacao = DatasetFactory.createConstraint("solTipoInformacao", hAPI.getCardValue("solTipoInformacaoDesc"), "", ConstraintType.MUST); 
    var solDescricaoGeral = DatasetFactory.createConstraint("solDescricaoGeral", hAPI.getCardValue("solDescricaoGeral"), "", ConstraintType.MUST); 
    
    var indexFalTbFalha = hAPI.getChildrenIndexes("falTbFalha");
    var tbFalhaList = new java.util.ArrayList();
    var tbFalhaJson = {};
    for (var i = 0; i < indexFalTbFalha.length; i++) {
        var tbFalhaHashMap = new java.util.HashMap();
        tbFalhaHashMap.put("codFalha",  hAPI.getCardValue("falCodigoFalhaItem___"+indexFalTbFalha[i]));
		tbFalhaHashMap.put("familia", hAPI.getCardValue("falFamiliaItem___"+indexFalTbFalha[i]));
		tbFalhaHashMap.put("modeloMaquina", hAPI.getCardValue("falModeloMaquinaItem___"+indexFalTbFalha[i]));
		tbFalhaHashMap.put("grupo", hAPI.getCardValue("falGrupoMaquinaItem___"+indexFalTbFalha[i]));
		tbFalhaHashMap.put("falha", hAPI.getCardValue("falDescFalhaFalhaItem___"+indexFalTbFalha[i]));
        var recorrente = "";
        if( hAPI.getCardValue("falRecorrenteItem___"+indexFalTbFalha[i]) == "sim"){
            recorrente = "Sim";
        }else if( hAPI.getCardValue("falRecorrenteItem___"+indexFalTbFalha[i]) == "nao"){
            recorrente = "Não";
        }
		tbFalhaHashMap.put("recorrente", recorrente);
        
        tbFalhaList.add(tbFalhaHashMap);
    }
    tbFalhaJson = JSONUtil.toJSON(tbFalhaList);

    var falTbFalha  = DatasetFactory.createConstraint("falTbFalha", tbFalhaJson, "", ConstraintType.MUST);

    var constraints = new Array(gerNumProtocolo, dataAbertura, 
                                solNome, solEmail, solTelefone, solCidade, solEstado,
                                equipNumSerie, equipDescricao, equipDataTerminoGarantia,
                                solTipoSolicitacao, solTipoInformacao, solDescricaoGeral, falTbFalha);
        
    var dataset = DatasetFactory.getDataset("dsChamAtendEmailSolicitanteAbertura", null, constraints, null);
    var codRetorno = dataset.getValue(0, "CODRET");
    var msgRetorno = dataset.getValue(0, "MSG");
    
    hAPI.setCardValue("solEmailAbertura", codRetorno + " - " + msgRetorno);
    log.info('solEmailAbertura: '+ codRetorno + " - " + msgRetorno);

}