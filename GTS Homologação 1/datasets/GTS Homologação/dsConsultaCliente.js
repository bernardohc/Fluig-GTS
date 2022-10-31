function defineStructure() {
	addColumn("A1_COD");
	addColumn("A1_LOJA");
	addColumn("A1_NOME");
	addColumn("A1_MUN");
	addColumn("A1_EST");
	addColumn("A1_TABELA");
	addColumn("A1_BAIRRO");
	addColumn("A1_CEP");
	addColumn("A1_COMPLEM");
	addColumn("A1_DDD");
	addColumn("A1_TEL");
	addColumn("A1_CGC");
	addColumn("A1_ULTCOM");
	addColumn("A1_NROCOM");
	addColumn("A1_EMAIL");
	addColumn("A1_DESC");
	setKey([ "A1_COD" ]);
	addIndex([ "A1_COD" ]);
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
	//!!!VARIAVEL "empresa" - empresa na qual ira fazer a a consulta SQL
	//***********************************************************
	//***********************************************************
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("A1_COD");
	newDataset.addColumn("A1_LOJA");
	newDataset.addColumn("A1_NOME");
	newDataset.addColumn("A1_CGC");
	newDataset.addColumn("A1_MUN");
	newDataset.addColumn("A1_EST");
	newDataset.addColumn("A1_TABELA");
	newDataset.addColumn("A1_END");
	newDataset.addColumn("A1_BAIRRO");
	newDataset.addColumn("A1_CEP");
	newDataset.addColumn("A1_COMPLEM");
	newDataset.addColumn("A1_DDD");
	newDataset.addColumn("A1_TEL");
	newDataset.addColumn("A1_CGC");
	newDataset.addColumn("A1_ULTCOM");
	newDataset.addColumn("A1_NROCOM");
	newDataset.addColumn("A1_EMAIL");
	newDataset.addColumn("A1_DESC");
	
	
	var a1Cod = '';
	var a1Loja = '';
    var dsClienteViaDadosAdicionais = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
    if(dsTemValor(dsClienteViaDadosAdicionais)){
    	a1Cod = dsClienteViaDadosAdicionais.getValue(0, "A1_COD");
    	a1Loja = dsClienteViaDadosAdicionais.getValue(0, "A1_LOJA");
    }
    
//	var a1Cod  = "";
//	var a1Loja  = "";
//	for (var i in constraints){
//		if ( constraints[i].getFieldName().toString() == 'a1Cod' ) {
//			a1Cod = constraints[i].initialValue;
//		}
//		if ( constraints[i].getFieldName().toString() == 'a1Loja' ) {
//			a1Loja = constraints[i].initialValue;
//		}
//	}

	var SQL = " select A1_COD , A1_LOJA , A1_NOME, A1_MUN , A1_EST , A1_TABELA ,  A1_END , A1_BAIRRO, " +
	 		"  A1_CEP ,  A1_COMPLEM , A1_DDD , A1_TEL , CONVERT(char,CONVERT(date, A1_ULTCOM) , 103)  as A1_ULTCOM ,  A1_NROCOM , A1_EMAIL, CONVERT(VARCHAR, A1_DESC) A1_DESC  " +
	 		" ,case"+
	 		"		when A1_PESSOA = 'F' "+
	 		"		then (left (A1_CGC,3)+'.'+ right(left (A1_CGC,6),3)+'.'+right(left (A1_CGC,9),3)+'-'+right(left (A1_CGC,11),2))" +
	 		"		else (left (A1_CGC,2)+'.'+ right(left (A1_CGC,5),3)+'.'+ right(left (A1_CGC,8),3)+'/'+ right(left (A1_CGC,12),4)+'-'+ right(left (A1_CGC,14),2)) "+
	 		" end A1_CGC "+
	 		
	 		" from SA1010 (NOLOCK) " +
	 		" where D_E_L_E_T_ <> '*'" +
	 		" and A1_COD = '" + a1Cod +"' " +
	 		" and A1_LOJA =  '" + a1Loja + "' " +
	 		" order by A1_NOME ";

	 log.info(" sql1 :"+ SQL);

	 var statementWD = connectionWD.prepareStatement(SQL);
	 var rsWD = statementWD.executeQuery();

	 while(rsWD.next()){
		 newDataset.addRow(
				 new Array(
				    rsWD.getString("A1_COD"),
					rsWD.getString("A1_LOJA"),
					rsWD.getString("A1_NOME"),
					rsWD.getString("A1_CGC"),
					rsWD.getString("A1_MUN"),
				    rsWD.getString("A1_EST"),
				    rsWD.getString("A1_TABELA"),
				    rsWD.getString("A1_END"),
				    rsWD.getString("A1_BAIRRO"),
				    rsWD.getString("A1_CEP"),
				    rsWD.getString("A1_COMPLEM"),
				    rsWD.getString("A1_DDD"),
				    rsWD.getString("A1_TEL"),
				    rsWD.getString("A1_CGC"),
				    rsWD.getString("A1_ULTCOM"),
				    rsWD.getString("A1_NROCOM"),
				    rsWD.getString("A1_EMAIL"),
				    rsWD.getString("A1_DESC")
				    
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