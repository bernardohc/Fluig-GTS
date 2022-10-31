function defineStructure() {
	addColumn("A4_NOME");
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

	newDataset.addColumn("A4_NOME");

	var SQL = " select A4_NOME " +
	 		" from SA4010 SA4 (NOLOCK) " +
	 		" where SA4.D_E_L_E_T_ <> '*'" +
	 		" and A4_ZFLUIG = '1' " +
	 		" group by A4_NOME " +
	 		" order by A4_NOME ";

//	 log.info(" sql Transportadora :"+ SQL);

	 var statementWD = connectionWD.prepareStatement(SQL);
	 var rsWD = statementWD.executeQuery();

	 while(rsWD.next()){
		 newDataset.addRow(
				 new Array(
				    rsWD.getString("A4_NOME")
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