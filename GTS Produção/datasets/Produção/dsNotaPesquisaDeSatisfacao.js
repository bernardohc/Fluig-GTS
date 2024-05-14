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
	dataset.addColumn("pesqNotaAtendimento");
	dataset.addColumn("MSGRET");
	
	//Cabeçalho
	var numSerie  = "FPC0821410108";

	var constraintsForm = new Array(); 
	for (var i in constraints){
		//Cabeçalho
		if ( constraints[i].getFieldName().toString() == 'numSerie' ) {
			numSerie = constraints[i].initialValue;
		}		
	}
	if( numSerie != ""  ){
		var SQL =	" SELECT pesqNotaAtendimento ,pesquisa.pesqNumSerie " +
					" FROM ML001046 pesquisa (NOLOCK)" +
					" JOIN PROCES_WORKFLOW" +
					" 	ON pesquisa.companyid = PROCES_WORKFLOW.COD_EMPRESA" +
					" 	AND pesquisa.cardid = PROCES_WORKFLOW.NR_DOCUMENTO_CARD_INDEX" +
					" 	AND pesquisa.documentid = PROCES_WORKFLOW.NR_DOCUMENTO_CARD" +
					" 	AND pesquisa.version = (SELECT max(version) FROM ML001046 entrega_SUB WHERE entrega_SUB.documentid = pesquisa.documentid )" +
					" INNER JOIN (" +
					" 	SELECT max(START_DATE) as START_DATE,pesqNumSerie" +
					" 	FROM ML001046 pesquisa (NOLOCK)" +
					" 	JOIN PROCES_WORKFLOW" +
					" 	ON pesquisa.companyid = PROCES_WORKFLOW.COD_EMPRESA" +
					" 	AND pesquisa.cardid = PROCES_WORKFLOW.NR_DOCUMENTO_CARD_INDEX" +
					" 	WHERE pesqNumSerie = '" + numSerie + "' and" +
					" 	PROCES_WORKFLOW.COD_DEF_PROCES = 'IM - Pesquisa de Satisfação'" +
					" 	AND STATUS <> 1" +
					" 	AND pesquisa.version =" +
					" 	(SELECT max(version) FROM ML001046 MLTB WHERE MLTB.documentid = pesquisa.documentid)" +
					" 	group by pesqNumSerie" +
					" 	)  as sub on sub.pesqNumSerie = pesquisa.pesqNumSerie and PROCES_WORKFLOW.START_DATE = sub.START_DATE" +
					" 	where pesquisa.pesqNumSerie = '" + numSerie + "'" ;
	}
	//Tabela Produção ML001046
	//Tabela Homologação ML001097
		
	log.info(" dsConsultaNota"+ SQL);	
	
	var statementWD = connectionWD.prepareStatement(SQL);
	var rsWD = statementWD.executeQuery();
	
	while(rsWD.next()){
		dataset.addRow([	
                
		            //Cabeçalho
					"1"
					,rsWD.getString("pesqNotaAtendimento")
					
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