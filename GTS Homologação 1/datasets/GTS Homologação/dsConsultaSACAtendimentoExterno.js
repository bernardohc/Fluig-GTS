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
	 dataset.addColumn("atendId");
	 dataset.addColumn("atendData");
	 dataset.addColumn("atendStatus");
	 dataset.addColumn("atendComExterna");
	 
	//Fluig
	 var metadataID  = "";
	 var metadataVersion  = "";
	 //Cabeçalho
	 var numProtocoloFluigParam  = "";
	 //Requisitante
	 var cpfCnpjRequisitanteParam = "";
	 
	 var constraintsForm = new Array(); 
	 for (var i in constraints){
		//Cabeçalho
		if ( constraints[i].getFieldName().toString() == 'metadataID' ) {
			metadataID = constraints[i].initialValue;
		}
		//Cabeçalho
		if ( constraints[i].getFieldName().toString() == 'numProtocoloFluig' ) {
			numProtocoloFluigParam = constraints[i].initialValue;
		}
		//Requisitante
		if ( constraints[i].getFieldName().toString() == 'cpfCnpjRequisitante' ) {
			cpfCnpjRequisitanteParam = constraints[i].initialValue;
		}
	 }
	 
	 var SQL = " SELECT atendId,  atendData, atendStatus, atendComExterna " +
		 	   " FROM ML001024 SAC " +
		 	   " JOIN ML001025 SAC_ATEND " +
		 	   "	ON SAC.documentid=SAC_ATEND.documentid " +
		 	   "		AND SAC_ATEND.version = (SELECT max(version) FROM ML001025 SAC_ATENDTB WHERE SAC_ATENDTB.documentid = SAC_ATEND.documentid ) " +
		 	   " WHERE SAC.id = " + metadataID +
		 	   "	and SAC.version = (SELECT max(version) FROM ML001024 SACTB WHERE SACTB.documentid = SAC.documentid ) " +
		 	   " 	and SAC.numProtocoloFluig = '" + numProtocoloFluigParam + "'" +
	 		   " 	AND SAC.cpfCnpjRequisitante = '" + cpfCnpjRequisitanteParam + "'" +
		 	   " 	and SAC_ATEND.atendComExterna != '' ";
		
	 log.info('SQL-->' + SQL);
	 
	 var statementWD = connectionWD.prepareStatement(SQL);
	 var rsWD = statementWD.executeQuery();
		
	 while(rsWD.next()){
		dataset.addRow([	
			              //Cabeçalho
						 rsWD.getString("atendId")
		                ,rsWD.getString("atendData")
		                ,rsWD.getString("atendStatus")
		                ,rsWD.getString("atendComExterna")
						]);
		}
		
		rsWD.close();
		statementWD.close();
		connectionWD.close();
		
		
		return dataset;
}