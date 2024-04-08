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
	addColumn("A1_EMAIL");
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
	var empresa = "01"
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
	newDataset.addColumn("A1_EMAIL");

	//Coloco aqui no DataSet para pesquisar se o usuário logado é um gerente, sem pegar o valor de um campo de formulário, que seria possível inserir o valor via fomrulário.
	//Assim temos mais segurança no código
	var A1COD = '';
	var A1LOJA = '';
	var A1TIPO = '';
    var dsClienteViaDadosAdicionais = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
    if(dsTemValor(dsClienteViaDadosAdicionais)){
    	A1COD = dsClienteViaDadosAdicionais.getValue(0, "A1_COD");
    	A1LOJA = dsClienteViaDadosAdicionais.getValue(0, "A1_LOJA");
    	A1TIPO = dsClienteViaDadosAdicionais.getValue(0, "A1_TIPO");
    }
    
    
    if(A1TIPO.toUpperCase() == 'GERENTE' ){
    	
		//	var A1COD  = "";
		//	for (var i in constraints){
		//		if ( constraints[i].getFieldName().toString() == 'A1COD' ) {
		//			A1COD = constraints[i].initialValue;
		//		}
		//	}
		
			var SQL = " select A1_COD , A1_LOJA , A1_NOME  , A1_MUN , A1_EST , A1_TABELA ,  A1_END , A1_BAIRRO, " +
			 		"  A1_CEP,  A1_COMPLEM, A1_DDD, A1_TEL, A1_EMAIL  " +
			 		" ,case" +
			 		"		when A1_PESSOA = 'F' "+
			 		"		then (left (A1_CGC,3)+'.'+ right(left (A1_CGC,6),3)+'.'+right(left (A1_CGC,9),3)+'-'+right(left (A1_CGC,11),2))"+
			 		"		else (left (A1_CGC,2)+'.'+ right(left (A1_CGC,5),3)+'.'+ right(left (A1_CGC,8),3)+'/'+ right(left (A1_CGC,12),4)+'-'+ right(left (A1_CGC,14),2)) "+
			 		"	end A1_CGC"	+
			 		" from SA1" + empresa + "0 " +
			 		" where D_E_L_E_T_ <> '*'" +
			 		" and A1_COD = '" + A1COD +"' " +
			 		" order by A1_NOME ";
		
			 log.info(" sql Revendas :"+ SQL);
		
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
						    rsWD.getString("A1_EMAIL")
						   )
				 );
			 }
			 rsWD.close();
			 statementWD.close();
			 connectionWD.close();
			
    }
    
    return newDataset;
}



function dsTemValor(dataset){
	if(dataset != null && dataset != undefined && dataset.rowsCount > 0){
		return true;
	}else{
		return false;
	}
}