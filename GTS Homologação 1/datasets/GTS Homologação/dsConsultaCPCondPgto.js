function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	var seqCondPgto  = 0;
	var qtdDias = 0;
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'seqCondPgto' ) {
			seqCondPgto = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'qtdDias' ) {
			qtdDias = constraints[i].initialValue;
		}
	}
	
	newDataset.addColumn("seqCondPgto");
	newDataset.addColumn("qtdDias");
	newDataset.addColumn("descPgto");
	
	//Usar somente essa qtdDias após 20 de implementar
	if(qtdDias != 0){
		if(qtdDias < 45){
			newDataset.addRow(new Array('1', '45', '45 dias'));
		}
		if(qtdDias < 60){
			newDataset.addRow(new Array('2', '60', '60 dias'));
		}
		if(qtdDias < 75){
			newDataset.addRow(new Array('3', '75' ,'75 dias'));
		}
		if(qtdDias < 90){
			newDataset.addRow(new Array('4', '90', '90 dias'));
		}	
	}else{
		if(seqCondPgto <= 0 ){
			newDataset.addRow(new Array('1', '45', '45 dias'));
		}
		if(seqCondPgto <= 1 ){
			newDataset.addRow(new Array('2', '60', '60 dias'));
		}
		if(seqCondPgto <= 2 ){
			newDataset.addRow(new Array('3', '75' ,'75 dias'));
		}
		if(seqCondPgto <= 3 ){
			newDataset.addRow(new Array('4', '90', '90 dias'));
		}
	}
	
	
	return newDataset;
}