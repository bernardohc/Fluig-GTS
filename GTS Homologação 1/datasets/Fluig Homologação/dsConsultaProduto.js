function defineStructure() {
	addColumn("COD");
	addColumn("ZCODANT");
	addColumn("ZDESCP");
	addColumn("TIPO");
	addColumn("PESO");
	addColumn("UNMED");
	addColumn("ESTOQUE");
	addColumn("EMBALAGEM");
	addColumn("TES");
	addColumn("DESC");
	addColumn("PRCTABELA");
	addColumn("PRCCUSTO");
	addColumn("PRCMIN");
	addColumn("PRCSUGE");
	addColumn("POSIPINCM");
	addColumn("IPI");
	addColumn("ICMS");
	addColumn("ICMSRET");
	addColumn("CURVAABC"); /*inserido*/
	addColumn("CODCRITICO"); /*inserido*/
	addColumn("RECOMPRA"); /*inserido*/
}
function createDataset(fields, constraints, sortFields) {
	try
	{
		var contextWD = new javax.naming.InitialContext();
		var dataSourceWD = contextWD.lookup("java:/jdbc/PROTHEUSGTS");
		var connectionWD = dataSourceWD.getConnection();
	} catch (e){
		log.info("ERROOOOOO"+e);
	}
	
	var newDataset = DatasetBuilder.newDataset();
	
	var B1COD  = "";
	var A1COD  = "";
	var A1LOJA  = "";
	var QTD  = '1';
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'B1COD' ) {
			B1COD = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'A1COD' ) {
			A1COD = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'A1LOJA' ) {
			A1LOJA = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'QTD' ) {
			QTD = constraints[i].initialValue;
		}
	}
	newDataset.addColumn("COD");
	newDataset.addColumn("ZCODANT");
	newDataset.addColumn("ZDESCP");
	newDataset.addColumn("TIPO");
	newDataset.addColumn("PESO");
	newDataset.addColumn("UNMED");
	newDataset.addColumn("ESTOQUE");
	newDataset.addColumn("EMBALAGEM");
	newDataset.addColumn("TES");
	newDataset.addColumn("DESC");
	newDataset.addColumn("PRCTABELA");
	newDataset.addColumn("PRCCUSTO");
	newDataset.addColumn("PRCMIN");
	newDataset.addColumn("PRCSUGE");
	newDataset.addColumn("POSIPINCM");
	newDataset.addColumn("IPI");
	newDataset.addColumn("ICMS");
	newDataset.addColumn("ICMSRET");
	newDataset.addColumn("CURVAABC"); /*inserido*/
	newDataset.addColumn("CODCRITICO"); /*inserido*/
	newDataset.addColumn("RECOMPRA"); /*inserido*/
	
	var SQL = " SELECT B1_COD, B1_ZCODANT, B1_ZDESCP,  B1_TIPO, FORMAT( B1_PESO , 'N', 'pt-br') B1_PESO, B1_UM  " +
  			  " ,FORMAT( SA1.A1_DESC,'N', 'pt-br') A1_DESC "  +
  			  " ,FORMAT( DA1.DA1_PRCVEN,'N', 'pt-br') PRCTABELA "  +
//	  	PRCCUSTO = PREÇO DE TABELA - % DESCONTO CLIENTE (A1_DESC)
		  	  " ,FORMAT( DA1.DA1_PRCVEN - ((DA1.DA1_PRCVEN * SA1.A1_DESC) / 100) , 'N', 'pt-br')  PRCCUSTO" +
//	  	 PRCSUGE = PRCCUSTO + %DE ACRESCIMO POR CLIENTE (60%)
//		  	  ",FORMAT( (DA1.DA1_PRCVEN - ((DA1.DA1_PRCVEN * SA1.A1_DESC) / 100)) +   (  (DA1.DA1_PRCVEN - ((DA1.DA1_PRCVEN * SA1.A1_DESC) / 100))  *  60 )  , 'N', 'pt-br') PRCSUGE " +
		  	  ",FORMAT( (DA1.DA1_PRCVEN - ((DA1.DA1_PRCVEN * SA1.A1_DESC) / 100)) +  ( (  (DA1.DA1_PRCVEN - ((DA1.DA1_PRCVEN * SA1.A1_DESC) / 100))  *  60 ) / 100)  , 'N', 'pt-br') PRCSUGE " +
//	  	PRECO MINIMO É O PRCCUSTO + 10%
		  	  " ,FORMAT( (DA1.DA1_PRCVEN - ((DA1.DA1_PRCVEN * SA1.A1_DESC) / 100) ) * 1.1 , 'N', 'pt-br') PRCMIN "  	+
		  	  " ,FORMAT( 0, 'N', 'pt-br') ICMS " +
		  	  " ,FORMAT( 0, 'N', 'pt-br') ICMSRET " +
			  " ,FORMAT( 0, 'N', 'pt-br') IPI " +
			  " ,FORMAT( 0, 'N', 'pt-br') TES " +
			  " ,( " +
			  "			 SELECT CONVERT(VARCHAR, CONVERT(INTEGER, 	B2_SALDO.SALDO01 + B2_SALDO.SALDO08 ) ) " +
			  "			 FROM " +
			  "			 ( " +
			  "				SELECT TOP 1 " +
			  "					case when (( ISNULL(B2_01.B2_QATU,0) - ISNULL(B2_01.B2_RESERVA,0) - ISNULL(B2_01.B2_QEMP, 0) ) * 0.2 ) <= 0 " +
			  "					then 0  " +
			  "					else  (( ISNULL(B2_01.B2_QATU,0) - ISNULL(B2_01.B2_RESERVA,0) - ISNULL(B2_01.B2_QEMP, 0) ) * 0.2) " +
			  "					END SALDO01" +

	 		  "					,case when (( ISNULL(B2_08.B2_QATU,0) - ISNULL(B2_08.B2_RESERVA,0) - ISNULL(B2_08.B2_QEMP, 0) ) * 0.7 ) <= 0 " +
	 		  "					then 0 " +
	 		  "					else  (( ISNULL(B2_08.B2_QATU,0) - ISNULL(B2_08.B2_RESERVA,0) - ISNULL(B2_08.B2_QEMP, 0) ) * 0.7) " +
	 		  "					END SALDO08 " +
	 		  "				FROM SB1010 B1ESTOQUE (NOLOCK) " +
	 		  "					LEFT JOIN SB2010 B2_01 (NOLOCK) " +
	 		  "		  				ON B2_01.B2_COD = B1ESTOQUE.B1_COD " +
	 		  "		  					AND B2_01.B2_FILIAL = '010001' " +
	 		  "		  					AND B2_01.B2_LOCAL = '01' " +
	 		  "		  					AND B2_01.D_E_L_E_T_ <> '*' " +
	 		  "		   			LEFT JOIN SB2010 B2_08 (NOLOCK) " +
	 		  "		  				ON B2_08.B2_COD = B1ESTOQUE.B1_COD " +
	 		  "		  					AND B2_08.B2_FILIAL = '010001' " +
	 		  "		  					AND B2_08.B2_LOCAL = '08' " +
	 		  "		  					AND B2_08.D_E_L_E_T_ <> '*' " +
	 		  "				WHERE B1.D_E_L_E_T_ <> '*' " +
	 		  "					AND B1ESTOQUE.B1_COD = B1.B1_COD " +
	 		  "			) B2_SALDO	" +	
	 		  "		   ) ESTOQUE " +
			  
			  " ,CONVERT(VARCHAR, case when B1_ZQEMB = 0 then 1 else B1_ZQEMB end ) EMBALAGEM  "+
			  " ,B1_POSIPI "+
			  " ,B1_ZCLABC CURVAABC, B1_ZCRITIC CODCRITICO"+
			  " ,CASE WHEN B1_ZRECOMP = '1' THEN 'SIM' WHEN B1_ZRECOMP = '2' THEN 'NÃO' ELSE '' END RECOMPRA "+
			  " from SB1010 B1 (NOLOCK) " +
			  " 	JOIN DA1010 DA1 (NOLOCK) "+
			  "		ON DA1.DA1_CODPRO = B1.B1_COD "+
			  "			AND DA1.DA1_ATIVO = '1' "+
			  "			AND DA1.DA1_CODTAB = '011' "+
			  "			AND DA1.D_E_L_E_T_ <> '*' "+
			  "	LEFT JOIN SA1010 SA1 (NOLOCK) "+
			  "		ON SA1.A1_COD = '"+A1COD+"'"+
			  "			AND SA1.A1_LOJA = '"+A1LOJA+"'"+
			  "			AND SA1.D_E_L_E_T_  <> '*'"+
			  "	WHERE B1.D_E_L_E_T_ <> '*'" +
			  "		AND ( B1.B1_COD = '"+ B1COD +"' OR  B1_ZCODANT = '"+ B1COD +"')";
			 //Caso passao o B1COD vazio
			  if(B1COD == ''){
				  SQL +="	AND 1 = 2";
			  }
			  
	log.info(" dsConsultaProdutoSQL :"+ SQL);
	
	var statementWD = connectionWD.prepareStatement(SQL);
	var rsWD = statementWD.executeQuery();
	
	while(rsWD.next()){
		newDataset.addRow(
				 new Array(
				    rsWD.getString("B1_COD"),
					rsWD.getString("B1_ZCODANT"),
					rsWD.getString("B1_ZDESCP"),
					rsWD.getString("B1_TIPO"),
					rsWD.getString("B1_PESO"),
					rsWD.getString("B1_UM"),
					rsWD.getString("ESTOQUE"),
					rsWD.getString("EMBALAGEM"),
					rsWD.getString("TES"),
					rsWD.getString("A1_DESC"),
					rsWD.getString("PRCTABELA"),
					rsWD.getString("PRCCUSTO"),
					rsWD.getString("PRCMIN"),
					rsWD.getString("PRCSUGE"),
				    rsWD.getString("B1_POSIPI"),
				    rsWD.getString("IPI"),
				    rsWD.getString("ICMS"),
				    rsWD.getString("ICMSRET"),
				    rsWD.getString("CURVAABC"),
				    rsWD.getString("CODCRITICO"),
				    rsWD.getString("RECOMPRA")
				   )
		);
	}
	rsWD.close();
	statementWD.close();
	connectionWD.close();
	
	
	return newDataset;
}