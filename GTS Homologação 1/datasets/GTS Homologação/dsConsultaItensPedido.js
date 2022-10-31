function createDataset(fields, constraints, sortFields) {
	try
	{
		var newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("CODRET");
		newDataset.addColumn("MSGRET");
		newDataset.addColumn("C6_FILIAL");
		newDataset.addColumn("C6_ITEM");
		newDataset.addColumn("C6_PRODUTO");
		newDataset.addColumn("C6_DESCRI");
		newDataset.addColumn("B1_ZDESCP");
		newDataset.addColumn("C6_QTDVEN");
	
		var numPedido  = "";
		var filialPedido  = "";
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'numPedido' ) {
				numPedido = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'filialPedido' ) {
				filialPedido = constraints[i].initialValue;
			}
		}
		
		var contextWD = new javax.naming.InitialContext();
		var dataSourceWD = contextWD.lookup("java:/jdbc/PROTHEUSGTS");
		var connectionWD = dataSourceWD.getConnection();
	
		
		var SQL = " SELECT 	 C6_FILIAL, C6_ITEM, C6_PRODUTO, C6_DESCRI, B1_ZDESCP, CAST(C6_QTDVEN AS VarChar(10)) as C6_QTDVEN  " +
				"	 FROM SC6010 SC6 (NOLOCK) " +
				" 	 JOIN SC5010  SC5 (NOLOCK) " +
				"		ON SC5.C5_FILIAL = SC6.C6_FILIAL "+
				"			AND SC5.C5_NUM = SC6.C6_NUM "+
				"			AND SC5.D_E_L_E_T_ <> '*' "+
				" 	 JOIN SB1010 SB1 (NOLOCK) "+
				"		ON SB1.B1_COD = SC6.C6_PRODUTO "+
				"	WHERE SC6.D_E_L_E_T_ <> '*' 	" +
				"		AND SC6.C6_FILIAL = '"+ filialPedido +"'"+
				"		AND SC6.C6_NUM  = '"+ numPedido +"'"+
				"	ORDER BY C6_ITEM ";
	
		log.info(" dsConsultaItemPedido:"+ SQL);
	
		var statementWD = connectionWD.prepareStatement(SQL);
		var rsWD = statementWD.executeQuery();

	 	while(rsWD.next()){
	 		newDataset.addRow(
				 new Array(
				    '1',
				    'Sucesso',
				    rsWD.getString("C6_FILIAL"),
					rsWD.getString("C6_ITEM"),
					rsWD.getString("C6_PRODUTO"),
					rsWD.getString("C6_DESCRI"),
					rsWD.getString("B1_ZDESCP"),
					rsWD.getString("C6_QTDVEN")
				    
					
				   	)
		 	);
	 	}
	 	rsWD.close();
	 	statementWD.close();
	 	connectionWD.close();
	 
	} catch (e){
		log.info("ERROR Consulta ITENS PEDIDO : " + e);
		newDataset.addRow(new Array("2", "Erro ao consultar itens do pedido."));
	}
	
	return newDataset;
}

