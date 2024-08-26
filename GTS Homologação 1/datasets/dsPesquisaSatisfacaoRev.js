function createDataset(fields, constraints, sortFields) {
    try
	{
        var newDataset = DatasetBuilder.newDataset();

        newDataset.addColumn("CODRET");
	    newDataset.addColumn("MSG");
        newDataset.addColumn("A1NOME");
        newDataset.addColumn("A1NREDUZ");
        newDataset.addColumn("A1COD");
        newDataset.addColumn("A1LOJA");
        newDataset.addColumn("A1EST");
        newDataset.addColumn("A1MUN");             

        var contextWD = new javax.naming.InitialContext();
        var dataSourceWD = contextWD.lookup("java:/jdbc/PROTHEUSGTS");
        var connectionWD = dataSourceWD.getConnection();

        var SQL =   "SELECT A1_NOME A1NOME, A1_NREDUZ A1NREDUZ, A1_COD A1COD, A1_LOJA A1LOJA, A1_EST A1EST, A1_MUN A1MUN "+
                    "FROM SA1010 WITH(NOLOCK) WHERE A1_TIPO ='R' AND A1_MSBLQL = '2' AND D_E_L_E_T_ = '' ";
	
        log.info(" dsPesquisaSatisfacaoRev :"+ SQL);

        var statementWD = connectionWD.prepareStatement(SQL);
        var rsWD = statementWD.executeQuery();
        while(rsWD.next()){
            newDataset.addRow(
                    new Array(
                        '1',
                        'Sucesso',
                        rsWD.getString("A1NOME").trim(),
                        rsWD.getString("A1NREDUZ").trim(),
                        rsWD.getString("A1COD").trim(),
                        rsWD.getString("A1LOJA").trim(),
                        rsWD.getString("A1EST").trim(),
                        rsWD.getString("A1MUN").trim()                        
                    )
            );
        }
        rsWD.close();
        statementWD.close();
        connectionWD.close();

    } catch (e){
		log.info("Erro no dataset dsPesquisaSatisfacaoRev: " + e);
		newDataset.addRow(new Array("2", "Erro ao consultar Revenda."));
	}
	
	return newDataset;
}