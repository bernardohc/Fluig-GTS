function createDataset(fields, constraints, sortFields) {
	try
	{
		var newDataset = DatasetBuilder.newDataset();
		
		
	var B1COD  = "";
	var QTD  = '1';
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'B1COD' ) {
			B1COD = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'QTD' ) {
			QTD = constraints[i].initialValue;
		}
	}
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSG");
	newDataset.addColumn("COD");
	newDataset.addColumn("ZCODANT");
	newDataset.addColumn("ZDESCP");
	newDataset.addColumn("TIPO");
	newDataset.addColumn("PESO");
	newDataset.addColumn("UNMED");
	newDataset.addColumn("ESTOQUE");
	newDataset.addColumn("EMBALAGEM");
	newDataset.addColumn("PRCTABELA");
	newDataset.addColumn("POSIPINCM");
	newDataset.addColumn("CURVAABC");
	newDataset.addColumn("CODCRITICO");
	newDataset.addColumn("RECOMPRA");
	
	var contextWD = new javax.naming.InitialContext();
	var dataSourceWD = contextWD.lookup("java:/jdbc/PROTHEUSGTS");
	var connectionWD = dataSourceWD.getConnection();
	
	var SQL = " SELECT B1_COD, B1_ZCODANT, B1_ZDESCP,  B1_TIPO, FORMAT( B1_PESO , 'N', 'pt-br') B1_PESO, B1_UM  " +
  			  " ,FORMAT( DA1.DA1_PRCVEN,'N', 'pt-br') PRCTABELA "  +
			  " ,( " +
			  "			 SELECT CONVERT(VARCHAR, CONVERT(INTEGER,   B2_SALDO.SALDO08 ) ) " +
			  "			 FROM " +
			  "			 ( " +
			  "				SELECT TOP 1 " +
	 		  "					case when (( ISNULL(B2_08.B2_QATU,0) - ISNULL(B2_08.B2_RESERVA,0) - ISNULL(B2_08.B2_QEMP, 0) ) * 0.7 ) <= 0 " +
	 		  "					then 0 " +
	 		  "					else  (( ISNULL(B2_08.B2_QATU,0) - ISNULL(B2_08.B2_RESERVA,0) - ISNULL(B2_08.B2_QEMP, 0) ) * 0.7) " +
	 		  "					END SALDO08 " +
	 		  "				FROM SB1010 B1ESTOQUE (NOLOCK) " +
	 		  "		   			LEFT JOIN SB2010 B2_08 (NOLOCK) " +
	 		  "		  				ON B2_08.B2_COD = B1ESTOQUE.B1_COD " +
	 		  "		  					AND B2_08.B2_FILIAL = '010007' " +
	 		  "		  					AND B2_08.B2_LOCAL = '08' " +
	 		  "		  					AND B2_08.D_E_L_E_T_ <> '*' " +
	 		  "				WHERE B1.D_E_L_E_T_ <> '*' " +
	 		  "					AND B1ESTOQUE.B1_COD = B1.B1_COD " +
	 		  "			) B2_SALDO	" +	
	 		  "	) ESTOQUE " +
			  
			  " ,CONVERT(VARCHAR, case when B1_ZQEMB = 0 then 1 else B1_ZQEMB end ) EMBALAGEM  "+
			  " ,B1_POSIPI "+
			  " ,B1_ZCLABC CURVAABC, B1_ZCRITIC CODCRITICO  "+
			  " ,CASE WHEN B1_ZRECOMP = '1' THEN 'SIM' WHEN B1_ZRECOMP = '2' THEN 'NAO' ELSE '' END RECOMPRA "+
			  " from SB1010 B1 (NOLOCK) " +
			  " 	JOIN DA1010 DA1 (NOLOCK) "+
			  "		ON DA1.DA1_CODPRO = B1.B1_COD "+
			  "			AND DA1.DA1_ATIVO = '1' "+
			  "			AND DA1.DA1_CODTAB = '011' "+
			  "			AND DA1.D_E_L_E_T_ <> '*' "+
			  "	WHERE B1.D_E_L_E_T_ <> '*'" +
			  "		AND ( B1.B1_COD = '"+ B1COD +"' OR  B1_ZCODANT = '"+ B1COD +"')";
			 //Caso passao o B1COD vazio
			  if(B1COD == ''){
				  SQL +="	AND 1 = 2";
			  }
			  
	log.info(" dsConsultaProdutoTabelaSQL :"+ SQL);
	
	var statementWD = connectionWD.prepareStatement(SQL);
	var rsWD = statementWD.executeQuery();
	
	while(rsWD.next()){
		newDataset.addRow(
				 new Array(
					'1',
					'Sucesso',
				    rsWD.getString("B1_COD"),
					rsWD.getString("B1_ZCODANT"),
					rsWD.getString("B1_ZDESCP"),
					rsWD.getString("B1_TIPO"),
					rsWD.getString("B1_PESO"),
					rsWD.getString("B1_UM"),
					rsWD.getString("ESTOQUE"),
					rsWD.getString("EMBALAGEM"),
					rsWD.getString("PRCTABELA"),
				    rsWD.getString("B1_POSIPI"),
				    rsWD.getString("CURVAABC"),
				    rsWD.getString("CODCRITICO"),
				    rsWD.getString("RECOMPRA")
				   )
		);
	}
	rsWD.close();
	statementWD.close();
	connectionWD.close();
	
	} catch(erro) {		
		var error = "ERROR Consulta PRODUTO Tabela:  " + erro.message;
		log.info("ERROR Consulta PRODUTO Tabela : " + error);
		newDataset.addRow(new Array("2", error));
		
	}
	return newDataset;
}