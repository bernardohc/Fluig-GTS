function createDataset(fields, constraints, sortFields) {
    try
	{
        var newDataset = DatasetBuilder.newDataset();

        newDataset.addColumn("CODRET");
	    newDataset.addColumn("MSG");
        newDataset.addColumn("EMISSAO");
        newDataset.addColumn("NUMOS");
        newDataset.addColumn("NOME");
        newDataset.addColumn("MUNICIPIO");
        newDataset.addColumn("ESTADO");
        newDataset.addColumn("CODCLI");
        newDataset.addColumn("LOJACLI");
        newDataset.addColumn("DDD");
        newDataset.addColumn("TELEFONE");
        newDataset.addColumn("NUMSERIE");
        newDataset.addColumn("DESCR");
        newDataset.addColumn("CODTEC");
        newDataset.addColumn("NOMTEC");
        newDataset.addColumn("DESCRI");
        

        var contextWD = new javax.naming.InitialContext();
        var dataSourceWD = contextWD.lookup("java:/jdbc/PROTHEUSGTS");
        var connectionWD = dataSourceWD.getConnection();

        var SQL =   "SELECT AB7_NUMOS NUMOS, AB7_NUMSER NUMSERIE FROM AB7010 NOLOCK WHERE AB7_NUMOS= '031614'";
        //             "SELECT AB6.AB6_EMISSA EMISSAO, AB7.AB7_NUMOS NUMOS, AB6.AB6_ZNOME NOME, AB6.AB6_ZMUN MUNICIPIO, AB6.AB6_ZEST ESTADO,"+
        //             "AB6.AB6_CODCLI CODCLI, AB6.AB6_LOJA LOJACLI, A1.A1_DDD DDD, A1.A1_TEL TELEFONE, AB7.AB7_NUMSER NUMSERIE, AB7_ZDESCR DESCR,"+
        //             "AB9.AB9_CODTEC CODTEC, AA1.AA1_NOMTEC NOMTEC, AAG_DESCRI DESCRI"+
        //             "FROM AB7010 AS AB7"+
        //             "JOIN AB6010 AS AB6 ON AB6.AB6_NUMOS = AB7.AB7_NUMOS"+
        //             "JOIN AB9010 AS AB9 ON AB9.AB9_NUMOS = AB7.AB7_NUMOS + AB7.AB7_ITEM "+
        //             "JOIN AA1010 AS AA1 ON AA1.AA1_CODTEC = AB9.AB9_CODTEC"+
        //             "JOIN AAG010 AS AAG ON AAG.AAG_CODPRB = AB9.AB9_CODPRB"+
        //             "JOIN SA1010 AS A1 ON A1.A1_COD = AB7_CODCLI AND A1.A1_LOJA = AB7_LOJA"+
        //             "WHERE AB7.D_E_L_E_T_ = '' AND AB6.D_E_L_E_T_ = '' AND AB9.D_E_L_E_T_ = '' AND AA1.D_E_L_E_T_ = '' AND"+
        //             "AAG.D_E_L_E_T_ = '' AND A1.D_E_L_E_T_ = '' AND AB7.AB7_NUMOS= '031614'";
	
        log.info(" dsConsultaNotaOsTec :"+ SQL);

        var statementWD = connectionWD.prepareStatement(SQL);
        var rsWD = statementWD.executeQuery();
        while(rsWD.next()){
            newDataset.addRow(
                    new Array(
                        '1',
                        'Sucesso',
                        rsWD.getString("EMISSAO").trim(),
                        rsWD.getString("NUMOS").trim(),
                        rsWD.getString("NOME").trim(),
                        rsWD.getString("MUNICIPIO").trim(),
                        rsWD.getString("ESTADO").trim(),
                        rsWD.getString("CODCLI").trim(),
                        rsWD.getString("LOJACLI").trim(),
                        rsWD.getString("DDD").trim(),
                        rsWD.getString("TELEFONE").trim(),
                        rsWD.getString("NUMSERIE").trim(),
                        rsWD.getString("DESCR").trim(),
                        rsWD.getString("CODTEC").trim(),
                        rsWD.getString("NOMTEC").trim(),
                        rsWD.getString("DESCRI").trim()
                        
                    )
            );
        }
        rsWD.close();
        statementWD.close();
        connectionWD.close();

    } catch (e){
		log.info("Erro no dataset dsConsultaNotaOsTec: " + e);
		newDataset.addRow(new Array("2", "Erro ao consultar Nota."));
	}
	
	return newDataset;
}