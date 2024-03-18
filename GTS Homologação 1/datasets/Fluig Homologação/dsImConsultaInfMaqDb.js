function createDataset(fields, constraints, sortFields) {
	
	try{
		var contextWD = new javax.naming.InitialContext();
		var dataSourceWD = contextWD.lookup("java:/jdbc/FluigDS");
		var connectionWD = dataSourceWD.getConnection();
	} catch (e){
		log.info("Erro conexao Fluig - " + e);
	} 
	
	var dataset = DatasetBuilder.newDataset();
	
	//Cabeçalho
	dataset.addColumn("CODRET");
	dataset.addColumn("tipoSolicitante");
	dataset.addColumn("equipDescricao");
	dataset.addColumn("revRazaoSocialRevenda");
	dataset.addColumn("revCodigo");
	dataset.addColumn("revLoja");
	dataset.addColumn("revCidade");
	dataset.addColumn("revEstado");
	dataset.addColumn("cliNomeCliente");
	dataset.addColumn("cliCodigo");
	dataset.addColumn("cliLoja");
	dataset.addColumn("cliCidade");
	dataset.addColumn("cliEstado");
	dataset.addColumn("revEntTecNome");
	dataset.addColumn("protoRecResponsavel");
	dataset.addColumn("protoRecTelefone");
	dataset.addColumn("revEquipRazaoSocialRevenda");
	dataset.addColumn("revEquipCodigo");
	dataset.addColumn("revEquipLoJa");
	dataset.addColumn("revEquipEstado");
	dataset.addColumn("numFluig");
	dataset.addColumn("equipNumNotaFiscal");
	dataset.addColumn("MSGRET");
	
	//Cabeçalho
	var numSerieParam  = "";

	var constraintsForm = new Array(); 
	for (var i in constraints){
		//Cabeçalho
		if ( constraints[i].getFieldName().toString() == 'numSerie' ) {
			numSerieParam = constraints[i].initialValue;
		}		
	}
	
	var SQL =	" SELECT STATUS,tipoSolicitante, equipDescricao, revRazaoSocialRevenda, revCodigo, revLoja, revCidade, revEstado, cliNomeCliente, cliCodigo, cliLoja, cliCidade, cliEstado, revEntTecNome, protoRecResponsavel, protoRecTelefone, numFluig, equipNumNotaFiscal, revEquipRazaoSocialRevenda, revEquipCodigo, revEquipLoja, revEquipEstado " +
				" FROM ML001031 entrega (NOLOCK) " + 
				" JOIN PROCES_WORKFLOW " + 
				" ON entrega.companyid = PROCES_WORKFLOW.COD_EMPRESA " + 
				" AND entrega.cardid = PROCES_WORKFLOW.NR_DOCUMENTO_CARD_INDEX " + 
				" AND entrega.documentid = PROCES_WORKFLOW.NR_DOCUMENTO_CARD " + 
				" AND entrega.version = (SELECT max(version) FROM ML001031 entrega_SUB WHERE entrega_SUB.documentid = entrega.documentid ) " + 
				" WHERE PROCES_WORKFLOW.COD_DEF_PROCES = 'Pos-Venda-Entrega-Tecnica' " + 
				" and entrega.version = (SELECT max(version) FROM ML001031 MLTB WHERE MLTB.documentid = entrega.documentid) and STATUS <> 1 "; 
	
	
	
				//"SELECT tipoSolicitante, equipDescricao, revRazaoSocialRevenda, revCidade, cliNomeCliente, cliCidade, cliEstado, revEntTecNome, protoRecResponsavel, protoRecTelefone" +
				//" FROM ML001031 ML (NOLOCK) " +
				//" WHERE AND ML.version = (SELECT max(version) FROM ML001031 MLTB WHERE MLTB.documentid = ML.documentid )";
				//Tabela PRD ML001027
				//Tabela HML ML001031
				//Cabeçalho
		if( numSerieParam != ""  ){
			SQL += " AND equipNumSerie = '" + numSerieParam + "'";
		}
		
	log.info(" dsConsultaSAC:"+ SQL);	
	
	var statementWD = connectionWD.prepareStatement(SQL);
	var rsWD = statementWD.executeQuery();
	
	while(rsWD.next()){
		dataset.addRow([	
                
		            //Cabeçalho
					"1"
					,rsWD.getString("tipoSolicitante")
					,rsWD.getString("equipDescricao")
					,rsWD.getString("revRazaoSocialRevenda")
					,rsWD.getString("revCodigo")
					,rsWD.getString("revLoja")
					,rsWD.getString("revCidade")
					,rsWD.getString("revEstado")
					,rsWD.getString("cliNomeCliente")
					,rsWD.getString("cliCodigo")
					,rsWD.getString("cliLoja")
					,rsWD.getString("cliCidade")
					,rsWD.getString("cliEstado")
					,rsWD.getString("revEntTecNome")
					,rsWD.getString("protoRecResponsavel")
					,rsWD.getString("protoRecTelefone")
					,rsWD.getString("revEquipRazaoSocialRevenda")
					,rsWD.getString("revEquipCodigo")
					,rsWD.getString("revEquipLoJa")
					,rsWD.getString("revEquipEstado")
					,rsWD.getString("numFluig")
					,rsWD.getString("equipNumNotaFiscal")
					
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