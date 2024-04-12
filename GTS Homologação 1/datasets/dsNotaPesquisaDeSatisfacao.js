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
	var numSerieParam  = "FPM0587250101";

	var constraintsForm = new Array(); 
	for (var i in constraints){
		//Cabeçalho
		if ( constraints[i].getFieldName().toString() == 'numSerie' ) {
			numSerieParam = constraints[i].initialValue;
		}		
	}
	
	var SQL =	" SELECT pesqNotaAtendimento ,pesqNumSerie " +
				" FROM ML001097 entrega (NOLOCK) " ;
				
		if( numSerieParam != ""  ){
			SQL += " WHERE pesqNumSerie = '" + numSerieParam + "'";
		}
		
	log.info(" dsConsultaSAC:"+ SQL);	
	
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