function createDataset(fields, constraints, sortFields) {
	try
	{
		var newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("CODRET");
		newDataset.addColumn("MSGRET");
		newDataset.addColumn("STATUS");
		newDataset.addColumn("C5_FILIAL");
		newDataset.addColumn("C5_NUM");
		newDataset.addColumn("CJ_ZIDFLUIG");
		newDataset.addColumn("C5_NOTA");
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
			var a1LojaConstraint = "";
			var c5Num  = "";
			var cjZIdFlui  = "";
			var c5EmissaoDe  = "";
			var c5EmissaoAte = "";
			for (var i in constraints){
				if ( constraints[i].getFieldName().toString() == 'a1Loja' ) {
					a1LojaConstraint = constraints[i].initialValue;
				}
				if ( constraints[i].getFieldName().toString() == 'c5Num' ) {
					c5Num = constraints[i].initialValue;
				}
				if ( constraints[i].getFieldName().toString() == 'cjZIdFlui' ) {
					cjZIdFlui = constraints[i].initialValue;
				}
				if ( constraints[i].getFieldName().toString() == 'c5EmissaoDe' ) {
					c5EmissaoDe = constraints[i].initialValue;
				}
				if ( constraints[i].getFieldName().toString() == 'c5EmissaoAte' ) {
					c5EmissaoAte = constraints[i].initialValue;
				}
			}
			
			var contextWD = new javax.naming.InitialContext();
			var dataSourceWD = contextWD.lookup("java:/jdbc/PROTHEUSGTS");
			var connectionWD = dataSourceWD.getConnection();
			
			var SQL = " SELECT " +
				  "	 CASE " +
				  "		WHEN SC5.C5_LIBEROK = '' and SC5.C5_NOTA = '' and  SC5.C5_BLQ=''   then 'RECEBIDO' " + 
				  "		WHEN (SC5.C5_NOTA <> '' or SC5.C5_LIBEROK = 'E') and SC5.C5_BLQ = '' then 'FATURADO' " +
				  "		WHEN SC5.C5_LIBEROK <> '' and SC5.C5_NOTA = '' and SC5.C5_BLQ = '' then 'EM SEPARAÇÃO'  " +
				  "		WHEN  SC5.C5_LIBEROK = '' and SC5.C5_NOTA = '' and SC5.C5_BLQ = '1' then 'BLOQUEADO'   " +
				  "		WHEN  SC5.C5_BLQ = 'Z' then 'TRANSFERIDO' " +
				  "	 ELSE 'INDEFINIDO'  " +
				  "	 end as STATUS " +
				  "	 ,C5_FILIAL , SC5.C5_NUM, C5_NOTA, CONVERT(char,CONVERT(date, SC5.C5_EMISSAO) , 103) as C5_EMISSAO" +
				  "  ,CONVERT(INTEGER, C5_ZIDFLUI) AS C5_ZIDFLUIG"+
				  "	 ,C5_CONDPAG, E4_DESCRI " +
				  "	 ,C5_CLIENTE , C5_LOJACLI , SA1.A1_NOME A1_NOME, SA1.A1_MUN A1_MUN" +
				  "  ,CASE " +
				  "		WHEN C5_ZTPPED = 'CF'  THEN 'COMPRA FUTURA'" +
				  "		WHEN C5_ZTPPED = 'CP'  THEN 'COMPRA PROGRAMADA'" +
				  "		WHEN C5_ZTPPED = 'PC'  THEN 'PEDIDO DE CONTRATO'" +
				  "		WHEN C5_ZTPPED = 'PCI' THEN 'PEDIDO CONTRATO ESTOQUE INICIAL DE NOVOS EQUIPAMENTOS'" +
				  "		WHEN C5_ZTPPED = 'PE'  THEN 'PEDIDO ESTOQUE' " +
				  "		WHEN C5_ZTPPED = 'PK'  THEN 'PEDIDO DE KIT' " +
				  "		WHEN C5_ZTPPED = 'PP'  THEN 'PEDIDO PROMOCIONAL' " +
				  "		WHEN C5_ZTPPED = 'PG'  THEN 'PEDIDO GARANTIA' " +
				  "		WHEN C5_ZTPPED = 'MP'  THEN 'MÁQUINA PARADA' " +
				  "		ELSE ''" +
				  "  END  C5_ZTPPED " +
				  
				  
				  "	 ,C5_TPFRETE, FORMAT(C5_FRETE,'N','pt-br') C5_FRETE" +
				  
				  " FROM SC5010 AS SC5 (NOLOCK) " +
				  "	 LEFT JOIN SA1010  AS SA1 (NOLOCK) " +
				  "		ON  C5_LOJACLI = A1_LOJA " +
				  "			AND C5_CLIENTE = A1_COD" +
				  "			AND SA1.D_E_L_E_T_  <> '*'" +
				  "	LEFT JOIN SE4010 SE4 (NOLOCK)" +
				  "		ON SE4.E4_CODIGO = SC5.C5_CONDPAG" +
				  "			AND SE4.D_E_L_E_T_ <> '*'" +
				   
				  " WHERE SC5.D_E_L_E_T_ <> '*' " +
				  " 	AND YEAR(SC5.C5_EMISSAO) >= 2020  " +
				  " 	AND C5_NATUREZ = '110070'  " +
				  "		AND SC5.C5_CLIENTE = '"+a1Cod+ "'";
			
				  //Se o usuário não for do tipo 'GERENTE', é preciso passar a a1Loja, para trazer somente os dados da loja dele
				  if( A1_TIPO != 'GERENTE' ){
					  //Pega a loja via Dados Adicionais
					  SQL += " AND SC5.C5_LOJACLI = '"+A1LOJADadosAdicionais+ "'";
				  }else{
					  //se o cara for gerente, e ter selecionado um cliente, vai vir a loja do cliente
					  //Pega a Loja, via constraint passado por parametro
					  if( a1LojaConstraint != ""  ){
						  SQL += " AND SC5.C5_LOJACLI = '"+a1LojaConstraint+ "'";
					  }
				  }
				  
				  if(c5Num != ""){
					  SQL +=" AND SC5.C5_NUM = '"+c5Num+ "'";
				  }
				  if(cjZIdFlui != ""){
					  SQL +=" AND SC5.C5_ZIDFLUI = '"+cjZIdFlui+ "'";
				  }
				  if( c5EmissaoDe != ""){
					  SQL +=" AND C5_EMISSAO >= CONVERT( char ,CONVERT(DATETIME, '"+ c5EmissaoDe +"' , 103),112) ";
				  }
				  if(c5EmissaoAte != ""){
					  SQL +=" AND C5_EMISSAO <= CONVERT( char ,CONVERT(DATETIME, '"+ c5EmissaoAte +"' , 103),112) ";
				  }
				  SQL +=" ORDER BY C5_FILIAL DESC, C5_NUM DESC ";
	
			log.info(" dsConsultaPedido:"+ SQL);
	
		 	var statementWD = connectionWD.prepareStatement(SQL);
		 	var rsWD = statementWD.executeQuery();
	
			while(rsWD.next()){
				 newDataset.addRow(
						 new Array(
						    "1",
						    "Sucesso",
						    rsWD.getString("STATUS"),
							rsWD.getString("C5_FILIAL"),
							rsWD.getString("C5_NUM"),
							rsWD.getString("C5_ZIDFLUIG"),
							rsWD.getString("C5_NOTA"),
							rsWD.getString("C5_EMISSAO"),
							rsWD.getString("C5_CONDPAG"),
							rsWD.getString("E4_DESCRI"),
							rsWD.getString("C5_CLIENTE"),
							rsWD.getString("C5_LOJACLI"),
							rsWD.getString("A1_NOME"),
							rsWD.getString("A1_MUN"),
						    rsWD.getString("C5_ZTPPED"),
						    rsWD.getString("C5_TPFRETE"),
						    rsWD.getString("C5_FRETE")	
		
						   )
				 );
		 	}
		 	rsWD.close();
		 	statementWD.close();
		 	connectionWD.close();
	    }else{
	    	
			newDataset.addRow(new Array("2","Erro na Consulta de Pedido:  Usuário não encontrado"));
	    }
		
	
	} catch (e){
		log.info("ERROR Consulta PEDIDO : " + e);
		newDataset.addRow(new Array("2", "Erro ao consultar pedidos."));
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