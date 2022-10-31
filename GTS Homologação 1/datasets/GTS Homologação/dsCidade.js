function createDataset(fields, constraints, sortFields) {
	try
	{
		var dataset  = DatasetBuilder.newDataset();
		dataset.addColumn("STATUS");
		dataset.addColumn("MSG");
		dataset.addColumn("UF");
		dataset.addColumn("CODCIDADE");
		dataset.addColumn("CIDADE");
		
		var UF = '';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'UF' ) {
				UF = constraints[i].initialValue;
			}
		}
	
		var contextWD = new javax.naming.InitialContext();
		var dataSourceWD = contextWD.lookup("java:/jdbc/PROTHEUSGTS");
		var connectionWD = dataSourceWD.getConnection();
	
		var SQL = " SELECT CC2_CODMUN, CC2_MUN, CC2_EST " +
				  "	FROM CC2010 (NOLOCK) " +
				  "	WHERE D_E_L_E_T_<>'*'  " +
				  " 	AND CC2_EST = '"+ UF +"'"+
				  "	ORDER BY CC2_EST, CC2_MUN ";
					
	
//		log.info(" dsConsultaCidadeSQL :"+ SQL);
	
		var statementWD = connectionWD.prepareStatement(SQL);
		var rsWD = statementWD.executeQuery();
	
		while(rsWD.next()){
			dataset.addRow(
					 new Array(
						'1',
						'Sucesso',
					    rsWD.getString("CC2_EST"),
						rsWD.getString("CC2_CODMUN"),
						rsWD.getString("CC2_MUN")
					   )
			);
		}
		rsWD.close();
		statementWD.close();
		connectionWD.close();
		
	} catch(erro) {		
		var error = "ERROR Consulta Cidade Tabela:  " + erro.message;
		log.info("ERROR Consulta Cidade Tabela : " + error);
		dataset.addRow(new Array("2", error));
		
	}
	return dataset;
}