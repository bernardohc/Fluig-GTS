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
	dataset.addColumn("revCidade");
	dataset.addColumn("cliNomeCliente");
	dataset.addColumn("cliCidade");
	dataset.addColumn("cliEstado");
	dataset.addColumn("revEntTecNome");
	dataset.addColumn("protoRecResponsavel");
	dataset.addColumn("protoRecTelefone");
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
	
	var SQL =	"SELECT tipoSolicitante, equipDescricao, revRazaoSocialRevenda, revCidade, cliNomeCliente, cliCidade, cliEstado, revEntTecNome, protoRecResponsavel, protoRecTelefone" +
				" FROM ML001027 ML (NOLOCK) " +
				" WHERE ML.version = (SELECT max(version) FROM ML001027 MLTB WHERE MLTB.documentid = ML.documentid )";
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
					,rsWD.getString("revCidade")
					,rsWD.getString("cliNomeCliente")
					,rsWD.getString("cliCidade")
					,rsWD.getString("cliEstado")
					,rsWD.getString("revEntTecNome")
					,rsWD.getString("protoRecResponsavel")
					,rsWD.getString("protoRecTelefone")
					
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