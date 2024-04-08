function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("CLICOD");
	newDataset.addColumn("CLILOJA");
	newDataset.addColumn("CLINOME");
	newDataset.addColumn("CLICIDADE");
	newDataset.addColumn("CLIESTADO");
	
	newDataset.addRow(new Array('1',
			'Sucesso',
			'COD1',
			'LOJA1',
			'NOME1',
			'CIDADE1',
			'ESTADO1'
	));
	newDataset.addRow(new Array('1',
			'Sucesso',
			'COD2',
			'LOJA2',
			'NOME2',
			'CIDADE2',
			'ESTADO2'
	));
	newDataset.addRow(new Array('1',
			'Sucesso',
			'COD3',
			'LOJA3',
			'NOME3',
			'CIDADE3',
			'ESTADO3'
	));
			
  	return newDataset;
}