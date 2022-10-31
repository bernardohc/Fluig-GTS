function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	
	newDataset.addColumn("codFilial");
	newDataset.addColumn("descFilial");
	
	newDataset.addRow(new Array('01', 'Filial 1'));
	newDataset.addRow(new Array('02', 'Filial 2'));
	newDataset.addRow(new Array('03', 'Filial 3'));
	newDataset.addRow(new Array('04', 'Filial 4'));
	newDataset.addRow(new Array('05', 'Filial 5'));


	return newDataset;
	
}