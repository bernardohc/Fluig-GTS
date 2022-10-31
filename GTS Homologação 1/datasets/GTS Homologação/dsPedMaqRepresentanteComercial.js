function createDataset(fields, constraints, sortFields) {
	
	var returnDataset = DatasetBuilder.newDataset();
	
	returnDataset.addColumn("RepComWKUser");
	returnDataset.addColumn("RepComNome");
	returnDataset.addColumn("RepComEmail");
	returnDataset.addColumn("RepComGrupo");
	returnDataset.addColumn("RepComTipo");
	returnDataset.addColumn("RepComGesTerWKUser");
	returnDataset.addColumn("RepComGesTerNome");
	returnDataset.addColumn("RepComGesTerEmail");
	returnDataset.addColumn("RepComGesTerPapel");
	
	var RepComWKUser  = '';
	
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'RepComWKUser' ) {
			RepComWKUser = constraints[i].initialValue;
		}
	}
	
	var constPedMaqRepCom1 = DatasetFactory.createConstraint("RepComWKUser", RepComWKUser, RepComWKUser, ConstraintType.MUST);
	var constPedMaqRepCom = new Array(constPedMaqRepCom1);
	
	var dsPedMaqRepCom = DatasetFactory.getDataset("dsPedMaqRepresentantesComerciais", null, constPedMaqRepCom, null);
	if(dsTemValor(dsPedMaqRepCom)){
		for ( var i = 0; i < dsPedMaqRepCom.rowsCount; i++) {
			if(RepComWKUser == dsPedMaqRepCom.getValue(i, "RepComWKUser")){
				returnDataset.addRow(new Array(
						dsPedMaqRepCom.getValue(i, "RepComWKUser"),
						dsPedMaqRepCom.getValue(i, "RepComNome"),
						dsPedMaqRepCom.getValue(i, "RepComEmail"),
						dsPedMaqRepCom.getValue(i, "RepComGrupo"),
						dsPedMaqRepCom.getValue(i, "RepComTipo"),
						dsPedMaqRepCom.getValue(i, "RepComGesTerWKUser"),
						dsPedMaqRepCom.getValue(i, "RepComGesTerNome"),
						dsPedMaqRepCom.getValue(i, "RepComGesTerEmail"),
						dsPedMaqRepCom.getValue(i, "RepComGesTerPapel")
						
				));
			}
		}
	}
	return returnDataset;
}

function dsTemValor(dataset){
	if(dataset != null && dataset != undefined && dataset.rowsCount > 0){
		return true;
	}else{
		return false;
	}
}

function temValor(valor){
	if(valor != null && valor != undefined && valor.trim() != ""){
		return true;
	}else{
		return false;
	}
}