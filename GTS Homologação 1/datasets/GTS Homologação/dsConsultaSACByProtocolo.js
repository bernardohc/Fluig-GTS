function createDataset(fields, constraints, sortFields) {
	
	try{
		 var contextWD = new javax.naming.InitialContext();
		 var dataSourceWD = contextWD.lookup("java:/jdbc/FluigDS");
		 var connectionWD = dataSourceWD.getConnection();
	 } catch (e){
		 log.info("Erro conexao Fluig - " + e);
	 } 
	 
	 
	 var dataset = DatasetBuilder.newDataset();
	 //Fluig
	 dataset.addColumn("metadataID");
	 dataset.addColumn("version");
	 //Cabeçalho
	 dataset.addColumn("numProtocoloFluig");
	 dataset.addColumn("numProtocoloTelefonico");
	 dataset.addColumn("statusAtendimento");
	 dataset.addColumn("statusAtendimentoDesc");
	 dataset.addColumn("dataAberturaSoData");
	 dataset.addColumn("dataAbertura");
	 dataset.addColumn("dataEncerramento");
	 //Requisitante
	 dataset.addColumn("nomeRequisitante");
	 dataset.addColumn("tipoPessoaRequisitante");
	 dataset.addColumn("cpfCnpjRequisitante");
	 dataset.addColumn("telRequisitante");
	 dataset.addColumn("emailRequisitante");
	 dataset.addColumn("estadoRequisitante");
	 dataset.addColumn("codCidadeRequisitante");
	 dataset.addColumn("cidadeRequisitante");
	 //Solicitação
	 dataset.addColumn("tipoSolicitacao");
	 dataset.addColumn("tipoSolicitacaoDesc");
	 dataset.addColumn("estadoRevenda");
	 dataset.addColumn("codCidadeRevenda");
	 dataset.addColumn("cidadeRevenda");
	 dataset.addColumn("revenda");
	 dataset.addColumn("tipoPessoaRevenda");
	 dataset.addColumn("cpfCnpjRevenda");
	 dataset.addColumn("setor");
	 dataset.addColumn("numSerie");
	 dataset.addColumn("modeloEquipamento");
	 dataset.addColumn("assuntoSolicitacao");
	 dataset.addColumn("descricaoSolicitacao");
	
	 //Cabeçalho
	 var numProtocoloFluigParam  = "";
	 //Requisitante
	 var cpfCnpjRequisitanteParam = "";
	
	 var constraintsForm = new Array(); 
	 for (var i in constraints){
		//Cabeçalho
		if ( constraints[i].getFieldName().toString() == 'numProtocoloFluig' ) {
			numProtocoloFluigParam = constraints[i].initialValue;
		}
		//Requisitante
		if ( constraints[i].getFieldName().toString() == 'cpfCnpjRequisitante' ) {
			cpfCnpjRequisitanteParam = constraints[i].initialValue;
		}

		
	}
	
	var SQL = "SELECT SAC.ID metadataID, SAC.version, numProtocoloFluig, numProtocoloTelefonico, statusAtendimento, CONVERT(varchar(10), dataAbertura, 103) dataAberturaSoData, dataAbertura,  dataEncerramento " +
    	" ,statusAtendimento, statusAtendimentoDesc " +
		" ,nomeRequisitante, tipoPessoaRequisitante, cpfCnpjRequisitante, telRequisitante, emailRequisitante, estadoRequisitante, codCidadeRequisitante, cidadeRequisitante " +
    	" ,tipoSolicitacao, tipoSolicitacaoDesc "+
    	" ,estadoRevenda, codCidadeRevenda, cidadeRevenda, revenda, tipoPessoaRevenda, cpfCnpjRevenda, setor, numSerie, modeloEquipamento, assuntoSolicitacao, descricaoSolicitacao " +
		" FROM ML001024 SAC " +
		" JOIN PROCES_WORKFLOW " +
		"	ON SAC.companyid = PROCES_WORKFLOW.COD_EMPRESA " +
		"		AND SAC.cardid = PROCES_WORKFLOW.NR_DOCUMENTO_CARD_INDEX " +
		"		AND SAC.documentid = PROCES_WORKFLOW.NR_DOCUMENTO_CARD " +
		
		" WHERE 1=1 " +
		//Cabeçalho
		" AND numProtocoloFluig = '" + numProtocoloFluigParam + "'" +
		" AND cpfCnpjRequisitante = '" + cpfCnpjRequisitanteParam + "'";


    
	log.info(" dsConsultaSAC:"+ SQL);	
	
	var statementWD = connectionWD.prepareStatement(SQL);
	var rsWD = statementWD.executeQuery();
	
	while(rsWD.next()){
		dataset.addRow([	
                	 rsWD.getString("metadataID")
					,rsWD.getString("version")
		              //Cabeçalho
					,rsWD.getString("numProtocoloFluig")
	                ,rsWD.getString("numProtocoloTelefonico")
	                ,rsWD.getString("statusAtendimento")
	                ,rsWD.getString("statusAtendimentoDesc")
	                ,rsWD.getString("dataAberturaSoData")
	                ,rsWD.getString("dataAbertura")
	                ,rsWD.getString("dataEncerramento")
	                //Requisitante
	                ,rsWD.getString("nomeRequisitante")
	                ,rsWD.getString("tipoPessoaRequisitante")
	                ,rsWD.getString("cpfCnpjRequisitante")
	                ,rsWD.getString("telRequisitante")
	                ,rsWD.getString("emailRequisitante")
	                ,rsWD.getString("estadoRequisitante")
	                ,rsWD.getString("codCidadeRequisitante")
	                ,rsWD.getString("cidadeRequisitante")
	                //Solicitação
	                ,rsWD.getString("tipoSolicitacao")
	                ,rsWD.getString("tipoSolicitacaoDesc")
	                ,rsWD.getString("estadoRevenda")
	                ,rsWD.getString("codCidadeRevenda")
	                ,rsWD.getString("cidadeRevenda")
	                ,rsWD.getString("revenda")
	                ,rsWD.getString("tipoPessoaRevenda")
	                ,rsWD.getString("cpfCnpjRevenda")
	                ,rsWD.getString("setor")
	                ,rsWD.getString("numSerie")
	                ,rsWD.getString("modeloEquipamento")
	                ,rsWD.getString("assuntoSolicitacao")
	                ,rsWD.getString("descricaoSolicitacao")
					]);
	}
	
	rsWD.close();
	statementWD.close();
	connectionWD.close();

    
	return dataset;
}

function temValor(valor){
	if(valor != null && valor != undefined && valor.trim() != ""){
		return true;
	}else{
		return false;
	}
}

function dsTemValor(dataset){
	if(dataset != null && dataset != undefined && dataset.rowsCount > 0){
		return true;
	}else{
		return false;
	}
}