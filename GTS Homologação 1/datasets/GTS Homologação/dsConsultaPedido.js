function defineStructure() {
	addColumn("STATUS");
	addColumn("C5_FILIAL");
	addColumn("C5_NUM");
	addColumn("CJ_ZIDFLUIG");
	addColumn("C5_NOTA");
	addColumn("F2_CHVNFE");
	addColumn("C5_EMISSAO");
	addColumn("C5_CONDPAG");
	addColumn("E4_DESCRI");
	addColumn("C5_CLIENTE");
	addColumn("C5_LOJACLI");
	addColumn("A1_NOME");
	addColumn("A1_MUN");
	addColumn("CJ_ZTPPED");
	addColumn("C5_TPFRETE");
	addColumn("C5_FRETE");
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
//	var empresa = "01"
	//***********************************************************
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("STATUS");
	newDataset.addColumn("C5_FILIAL");
	newDataset.addColumn("C5_NUM");
	newDataset.addColumn("CJ_ZIDFLUIG");
	newDataset.addColumn("C5_NOTA");
	newDataset.addColumn("F2_CHVNFE");
	newDataset.addColumn("C5_EMISSAO");
	newDataset.addColumn("C5_CONDPAG");
	newDataset.addColumn("E4_DESCRI");
	newDataset.addColumn("C5_CLIENTE");
	newDataset.addColumn("C5_LOJACLI");
	newDataset.addColumn("A1_NOME");
	newDataset.addColumn("A1_MUN");
	newDataset.addColumn("CJ_ZTPPED");
	newDataset.addColumn("C5_TPFRETE");
	newDataset.addColumn("C5_FRETE");
	
	//Coloco aqui no DataSet para pesquisar se o usuário logado é um gerente, sem pegar o valor de um campo de formulário, que seria possível inserir o valor via fomrulário.
	//Assim temos mais segurança no código
	var a1Cod = '';
	var A1LOJADadosAdicionais = '';
	var A1_TIPO = '';
    var dsClienteViaDadosAdicionais = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
    if(dsTemValor(dsClienteViaDadosAdicionais)){
    	a1Cod = dsClienteViaDadosAdicionais.getValue(0, "A1_COD");
    	A1LOJADadosAdicionais = dsClienteViaDadosAdicionais.getValue(0, "A1_LOJA").toUpperCase();
    	A1_TIPO = dsClienteViaDadosAdicionais.getValue(0, "A1_TIPO").toUpperCase();
    }
    
    if(a1Cod != ""){
	//	var a1Cod  = "";
		var a1LojaConstraint = "";
		var c5Num  = "";
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'a1Loja' ) {
				a1LojaConstraint = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'c5Num' ) {
				c5Num = constraints[i].initialValue;
			}
		}
		
		var SQL = " SELECT " +
				  "	 CASE " +
				  "		WHEN SC5.C5_LIBEROK = '' and SC5.C5_NOTA = '' and  SC5.C5_BLQ=''   then 'RECEBIDO' " + 
				  "		WHEN (SC5.C5_NOTA <> '' or SC5.C5_LIBEROK = 'E') and SC5.C5_BLQ = '' then 'FATURADO' " +
				  "		WHEN SC5.C5_LIBEROK <> '' and SC5.C5_NOTA = '' and SC5.C5_BLQ = '' then 'EM SEPARAÇÃO'  " +
				  "		WHEN  SC5.C5_LIBEROK = '' and SC5.C5_NOTA = '' and SC5.C5_BLQ = '1' then 'BLOQUEADO'   " +
				  "	 ELSE 'INDEFINIDO'  " +
				  "	 end as STATUS " +
				  "	 ,C5_FILIAL , SC5.C5_NUM, C5_NOTA, CONVERT(char,CONVERT(date, SC5.C5_EMISSAO) , 103) as C5_EMISSAO" +
				  "  ,CONVERT(INTEGER, CJ_ZIDFLUI) AS CJ_ZIDFLUIG"+
				  "  ,ISNULL(SF2.F2_CHVNFE, '') AS F2_CHVNFE  "+
				  "	 ,C5_CONDPAG, E4_DESCRI " +
				  "	 ,C5_CLIENTE , C5_LOJACLI , SA1.A1_NOME A1_NOME, SA1.A1_MUN A1_MUN" +
				  "  ,CASE " +
				  "		WHEN CJ_ZTPPED = 'CP'  THEN 'COMPRA PROGRAMADA'" +
				  "		WHEN CJ_ZTPPED = 'PC'  THEN 'PEDIDO DE CONTRATO'" +
				  "		WHEN CJ_ZTPPED = 'PCI' THEN 'PEDIDO CONTRATO ESTOQUE INICIAL DE NOVOS EQUIPAMENTOS'" +
				  "		WHEN CJ_ZTPPED = 'PE'  THEN 'PEDIDO ESTOQUE' " +
				  "		WHEN CJ_ZTPPED = 'PP'  THEN 'PEDIDO PROMOCIONAL' " +
				  "		WHEN CJ_ZTPPED = 'PG'  THEN 'PEDIDO GARANTIA' " +
				  "		WHEN CJ_ZTPPED = 'MP'  THEN 'MÁQUINA PARADA' " +
				  "		ELSE ''" +
				  "  END  CJ_ZTPPED " +
				  
				  
				  "	 ,C5_TPFRETE, FORMAT(C5_FRETE,'N','pt-br') C5_FRETE" +
				  
				  " FROM SC5010 AS SC5 (NOLOCK)" +
				  "	 LEFT JOIN SA1010  AS SA1 (NOLOCK)" +
				  "		ON  C5_LOJACLI = A1_LOJA " +
				  "			AND C5_CLIENTE = A1_COD" +
				  "	LEFT JOIN SCJ010 SCJ (NOLOCK)" +
				  "		ON CJ_FILIAL = C5_FILIAL" +
				  "			AND CJ_NUM = C5_ZNUMORC" +
				  "			AND CJ_CLIENTE = C5_CLIENTE" +
				  "			AND CJ_LOJA = C5_LOJACLI" +
				  "	LEFT JOIN SE4010 SE4 (NOLOCK)" +
				  "		ON SE4.E4_CODIGO = SC5.C5_CONDPAG" +
				  "			AND SE4.D_E_L_E_T_ <> '*'" +
				  "	LEFT JOIN SF2010 SF2 (NOLOCK)" +
				  "		ON SF2.F2_DOC = SC5.C5_NOTA" +
				  "			AND SF2.D_E_L_E_T_ <> '*'" +
				   
				  " WHERE SC5.D_E_L_E_T_ <> '*' " +
				  " 	AND YEAR(SC5.C5_EMISSAO) >= 2020  " +
				  " 	AND C5_NATUREZ = '110070'  " +
				  " 	AND SC5.C5_NUM = '"+c5Num+ "'" +
				  "		AND SC5.C5_CLIENTE = '"+a1Cod+ "'";

				  //Se o usuário não for do tipo 'GERENTE', é preciso passar a a1Loja, para trazer somente os dados da loja dele
				  if( A1_TIPO != 'GERENTE' ){
					  //Pega a loja via Dados Adicionais
					  SQL += " AND SC5.C5_LOJACLI = '"+A1LOJADadosAdicionais+ "'";
				  }else{
					  //se o cara for gerente, e ter selecionado um cliente, vai vir a loja do cliente
					  //Pega a Loja, via constraint passado por parametro
//					  if( a1LojaConstraint != ""  ){
//						  SQL += " AND SC5.C5_LOJACLI = '"+a1LojaConstraint+ "'";
//					  }
					  
				  }
				  
	
		 log.info(" dsConsultaPedido:"+ SQL);
	
		 var statementWD = connectionWD.prepareStatement(SQL);
		 var rsWD = statementWD.executeQuery();
	
		 while(rsWD.next()){
			 newDataset.addRow(
					 new Array(
					    rsWD.getString("STATUS"),
						rsWD.getString("C5_FILIAL"),
						rsWD.getString("C5_NUM"),
						rsWD.getString("CJ_ZIDFLUIG"),
						rsWD.getString("C5_NOTA"),
						rsWD.getString("F2_CHVNFE"),
						rsWD.getString("C5_EMISSAO"),
						rsWD.getString("C5_CONDPAG"),
						rsWD.getString("E4_DESCRI"),
						rsWD.getString("C5_CLIENTE"),
						rsWD.getString("C5_LOJACLI"),
						rsWD.getString("A1_NOME"),
						rsWD.getString("A1_MUN"),
					    rsWD.getString("CJ_ZTPPED"),
					    rsWD.getString("C5_TPFRETE"),
					    rsWD.getString("C5_FRETE")	
	
					   )
			 );
		 }
		 rsWD.close();
		 statementWD.close();
		 connectionWD.close();
    }else{
    	
    	var error = "ERROR Consulta PEDIDO :  Usuário não encontrado";
		newDataset.addRow(new Array("","","","","","", error ));
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