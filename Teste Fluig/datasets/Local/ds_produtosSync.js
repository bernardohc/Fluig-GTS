function defineStructure() {
	
	addColumn("B1_COD");
	addColumn("B1_DESC");
	addColumn("B1_UM");
	setKey(["B1_COD"]);
	addIndex(["B1_COD"]);

}
function onSync(lastSyncDate) {

	var dataset = DatasetBuilder.newDataset();
	
	var fields = new Array();
	var where = "";
	var branch = "";
		
	fields.push("SB1");
	fields.push(where);
	fields.push(branch);
	
	fields.push('B1_COD');
	fields.push('B1_DESC');
	fields.push('B1_UM');
	
	var resultadoProtheus = DatasetFactory.getDataset("ds_consultaCFGTABLE", fields, null, null);
	
	for (var i = 0; i < resultadoProtheus.rowsCount; i++) {
		var B1_COD = resultadoProtheus.getValue(i, "B1_COD");
		var B1_DESC = resultadoProtheus.getValue(i, "B1_DESC");
		var B1_UM = resultadoProtheus.getValue(i, "B1_UM");
		
		dataset.addOrUpdateRow([B1_COD, B1_DESC, B1_UM]);
	}
	
	return dataset;
}
function createDataset(fields, constraints, sortFields) {

}
function onMobileSync(user) {

}