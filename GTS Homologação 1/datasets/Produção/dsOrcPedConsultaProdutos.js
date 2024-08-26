function createDataset(fields, constraints, sortFields) {
    try
	{
        var newDataset = DatasetBuilder.newDataset();

        newDataset.addColumn("CODRET");
	    newDataset.addColumn("MSG");
        newDataset.addColumn("CODPRODUTO");
        newDataset.addColumn("ZDESCP");
        newDataset.addColumn("NCM");
        newDataset.addColumn("PRCTABELA");
        newDataset.addColumn("UNEMBALAGEM");
        newDataset.addColumn("CODCRITICO");
        newDataset.addColumn("ORIGEM_CODIGO");
        newDataset.addColumn("ORIGEM_NACIONAL_IMPORTADO");
        newDataset.addColumn("ORIGEM_PERC_CONTEUDO_IMPORTACAO");
        newDataset.addColumn("ORIGEM_ALIQ_ICMS");
        newDataset.addColumn("RECOMPRA");
        newDataset.addColumn("CURVAABC");
        newDataset.addColumn("GRUPO");
        newDataset.addColumn("FAMILIA");
        newDataset.addColumn("IPI")
        

        var contextWD = new javax.naming.InitialContext();
        var dataSourceWD = contextWD.lookup("java:/jdbc/PROTHEUSGTS");
        var connectionWD = dataSourceWD.getConnection();

        var SQL = " SELECT B1_COD CODPRODUTO, B1_ZDESCP ZDESCP, B1_POSIPI NCM, FORMAT( DA1.DA1_PRCVEN,'N', 'pt-br') PRCTABELA "  +
                " ,CONVERT(VARCHAR, case when B1_ZQEMB = 0 then 1 else B1_ZQEMB end ) UNEMBALAGEM, B1_ZCRITIC CODCRITICO    "+
                " ,B1_ORIGEM ORIGEM_CODIGO, B1_ZRECOMP RECOMPRA, B1_ZCLABC CURVAABC, B1_GRUPOP GRUPO, B1_ZFAMILP FAMILIA, BZ_IPI IPI   "+
                " ,case " +
                "	when B1_ORIGEM = 0 then 'NACIONAL' " +
                "	when B1_ORIGEM = 1 then 'IMPORTADO' " +
                "	when B1_ORIGEM = 2 then 'IMPORTADO' " +
                "	when B1_ORIGEM = 3 then 'IMPORTADO' " +
                "	when B1_ORIGEM = 4 then 'NACIONAL' " +
                "	when B1_ORIGEM = 5 then 'NACIONAL' " +
                "	when B1_ORIGEM = 6 then 'NACIONAL' " +
                "	when B1_ORIGEM = 7 then 'NACIONAL' " +
                "	when B1_ORIGEM = 8 then 'IMPORTADO' " +
                " else '' end ORIGEM_NACIONAL_IMPORTADO  "+
                " ,case " +
                "	when B1_ORIGEM = 0 then '0%' " +
                "	when B1_ORIGEM = 1 then '100%' " +
                "	when B1_ORIGEM = 2 then '100%' " +
                "	when B1_ORIGEM = 3 then '40%-70%' " +
                "	when B1_ORIGEM = 4 then '0%' " +
                "	when B1_ORIGEM = 5 then 'ATÉ 40%' " +
                "	when B1_ORIGEM = 6 then '0%' " +
                "	when B1_ORIGEM = 7 then '0%' " +
                "	when B1_ORIGEM = 8 then 'ACIMA DE 70%' " +
                " else '' end ORIGEM_PERC_CONTEUDO_IMPORTACAO  "+
                " ,case " +
                "	when B1_ORIGEM = 0 then 'NORMAL' " +
                "	when B1_ORIGEM = 1 then '4%' " +
                "	when B1_ORIGEM = 2 then '4%' " +
                "	when B1_ORIGEM = 3 then '4%' " +
                "	when B1_ORIGEM = 4 then 'NORMAL' " +
                "	when B1_ORIGEM = 5 then 'NORMAL' " +
                "	when B1_ORIGEM = 6 then 'NORMAL' " +
                "	when B1_ORIGEM = 7 then 'NORMAL' " +
                "	when B1_ORIGEM = 8 then '4%' " +
                " else '' end ORIGEM_ALIQ_ICMS  "+
                
               
                " FROM SB1010 B1 (NOLOCK) " +
                "   JOIN SBZ010 SBZ(NOLOCK)"+
				"   ON B1_COD = BZ_COD"+
                "       JOIN DA1010 DA1 (NOLOCK) "+
                "	    ON DA1.DA1_CODPRO = B1.B1_COD "+
                "		    AND DA1.DA1_ATIVO = '1' "+
                "			AND DA1.DA1_CODTAB = '011' "+
                "			AND DA1.D_E_L_E_T_ <> '*' "+
                "WHERE B1.D_E_L_E_T_ <> '*' "+
				"GROUP BY B1_ZDESCP, B1_COD, B1_ZDESCP, B1_POSIPI, FORMAT( DA1.DA1_PRCVEN,'N', 'pt-br')   "+
                 ",CONVERT(VARCHAR, case when B1_ZQEMB = 0 then 1 else B1_ZQEMB end ), B1_ZCRITIC     "+
                 ",B1_ORIGEM, B1_ZRECOMP, B1_ZCLABC, B1_GRUPOP, B1_ZFAMILP, BZ_IPI "+
                "	ORDER BY B1_COD ";
			  
	    log.info(" dsOrcPedConsultaProdutos :"+ SQL);

        var statementWD = connectionWD.prepareStatement(SQL);
	    var rsWD = statementWD.executeQuery();
        while(rsWD.next()){
            newDataset.addRow(
                     new Array(
                        '1',
                        'Sucesso',
                        rsWD.getString("CODPRODUTO").trim(),
                        rsWD.getString("ZDESCP").trim(),
                        rsWD.getString("NCM").trim(),
                        rsWD.getString("PRCTABELA").trim(),
                        rsWD.getString("UNEMBALAGEM").trim(),
                        rsWD.getString("CODCRITICO").trim(),
                        rsWD.getString("ORIGEM_CODIGO").trim(),
                        rsWD.getString("ORIGEM_NACIONAL_IMPORTADO").trim(),
                        rsWD.getString("ORIGEM_PERC_CONTEUDO_IMPORTACAO").trim(),
                        rsWD.getString("ORIGEM_ALIQ_ICMS").trim(),
                        rsWD.getString("RECOMPRA").trim(),
                        rsWD.getString("CURVAABC").trim(),
                        rsWD.getString("GRUPO").trim(),
                        rsWD.getString("FAMILIA").trim(),
                        rsWD.getString("IPI").trim()
                        
                       )
            );
        }
        rsWD.close();
        statementWD.close();
        connectionWD.close();

    } catch (e){
		log.info("Erro no dataset dsOrcPedConsultaProdutos: " + e);
		newDataset.addRow(new Array("2", "Erro ao consultar produtos."));
	}
	
	return newDataset;
}