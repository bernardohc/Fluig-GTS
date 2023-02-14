function defineStructure() {

}
function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {
	
	try{
		
		var fields = new Array();
		var where = "";
		var branch = "";
			
		fields.push("SB1");
		fields.push(where);
		fields.push(branch);
		
		fields.push('B1_COD');
		fields.push('B1_DESC');
		fields.push('B1_UM');
		
		dataset = DatasetFactory.getDataset("ds_consultaCFGTABLE", fields, null, null);
		
	} catch (erro) {
		dataset.addColumn("Erro");
        dataset.addRow(new Array(erro));
    
	} finally{
		return dataset;
	};
	
}

function onMobileSync(user) {

}