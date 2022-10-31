function defineStructure() {
	addColumn("D2_PEDIDO");
	addColumn("D2_DOC");
	addColumn("D2_FILIAL");
	addColumn("F2_CHVNFE");
	addColumn("F2_EMISSAO");
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
	//***********************************************************
	//***********************************************************
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("D2_PEDIDO");
	newDataset.addColumn("D2_DOC");
	newDataset.addColumn("D2_FILIAL");
	newDataset.addColumn("F2_CHVNFE");
	newDataset.addColumn("F2_EMISSAO");
	
   
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
	
	var SQL = "	SELECT  " +
			"	D2_PEDIDO, D2_DOC, D2_FILIAL , SF2.F2_CHVNFE, CONVERT(varchar,CONVERT(date, F2_EMISSAO) , 103) F2_EMISSAO " +
			" FROM SD2010 SD2 (NOLOCK) " +
			" LEFT JOIN SF2010 SF2 (NOLOCK)" +
			"		ON  SF2.F2_FILIAL = SD2.D2_FILIAL " +
			"		AND SF2.F2_DOC = SD2.D2_DOC " +
			"		AND SF2.D_E_L_E_T_ <> '*' " +
			" WHERE SD2.D2_FILIAL = '"+filialPedido+ "'"+
			"	AND SD2.D_E_L_E_T_ <> '*' " +
			"	AND SD2.D2_PEDIDO =  '"+numPedido+ "'"+
			" GROUP BY D2_PEDIDO, D2_DOC, D2_FILIAL , SF2.F2_CHVNFE, SD2.D2_EMISSAO, SF2.F2_EMISSAO " +
			" ORDER BY F2_EMISSAO  " ;
//	 log.info(" dsConsultaChaveNF:"+ SQL);

	 var statementWD = connectionWD.prepareStatement(SQL);
	 var rsWD = statementWD.executeQuery();

	 while(rsWD.next()){
		 newDataset.addRow(
				 new Array(
				    rsWD.getString("D2_PEDIDO"),
					rsWD.getString("D2_DOC"),
					rsWD.getString("D2_FILIAL"),
					rsWD.getString("F2_CHVNFE"),
					rsWD.getString("F2_EMISSAO")
				   )
		 );
	 }
	 rsWD.close();
	 statementWD.close();
	 connectionWD.close();

	 return newDataset;
}

function dsTemValor(dataset){
	if(dataset != null && dataset != undefined && dataset.rowsCount > 0){
		return true;
	}else{
		return false;
	}
}