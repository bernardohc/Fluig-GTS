function defineStructure() {
	addColumn("gesTerWKUser");
	addColumn("gesTerNome");
	addColumn("gesTerGrupo");
}

function createDataset(fields, constraints, sortFields) {

	var returnDataset = DatasetBuilder.newDataset();
	
	var gesTerNomeParam  = "";
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'gesTerNome' ) {
			gesTerNomeParam = constraints[i].initialValue;
		}
	}
	returnDataset.addColumn("gesTerWKUser");
	returnDataset.addColumn("gesTerNome");
	returnDataset.addColumn("gesTerGrupo");
	
	
	//Consulta WKUser do Gestor Territorial
	var fieldsCol = ["colleaguePK.colleagueId"];
	var constCol1 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var constCol2 = DatasetFactory.createConstraint("colleagueName", gesTerNomeParam, gesTerNomeParam, ConstraintType.MUST);
	var constCol = new Array(constCol1, constCol2);
	var datasetColleague = DatasetFactory.getDataset("colleague", fieldsCol, constCol, null);
	
	var WKUserGestorTerritorial = '';
	if(dsTemValor(datasetColleague)){
		WKUserGestorTerritorial = datasetColleague.getValue(0, "colleaguePK.colleagueId");
		log.info('entrou'+WKUserGestorTerritorial)
		returnDataset.addRow(new Array(
				WKUserGestorTerritorial,
				gesTerNomeParam,
                ''));
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