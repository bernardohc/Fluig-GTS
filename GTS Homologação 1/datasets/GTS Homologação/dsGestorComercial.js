function createDataset(fields, constraints, sortFields) {

	var returnDataset = DatasetBuilder.newDataset();
	
	var gesComWKUserParam  = "";
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'gesComWKUser' ) {
			gesComWKUserParam = constraints[i].initialValue;
		}
	}
	
	returnDataset.addColumn("gesComWKUser");
	returnDataset.addColumn("gesComNome");
	returnDataset.addColumn("gesComEmail");
	returnDataset.addColumn("gesComGrupo");
	returnDataset.addColumn("gesComPapel");

	var PapelGestorComercial = "GestorComercial1";
	var GrupoGestorComercial = "Exportacao1";
	//Consulta usuario  no papel GestorComercial1
	var constPapelCom1 = DatasetFactory.createConstraint('workflowColleagueRolePK.companyId', getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var constPapelCom2 = DatasetFactory.createConstraint('workflowColleagueRolePK.roleId', PapelGestorComercial, PapelGestorComercial, ConstraintType.MUST);
	var constPapelCom = new Array();
	if(gesComWKUserParam == ''){
		constPapelCom = new Array(constPapelCom1, constPapelCom2);
	}else{
		var constPapelCom3 = DatasetFactory.createConstraint('workflowColleagueRolePK.colleagueId', gesComWKUserParam, gesComWKUserParam, ConstraintType.MUST);
		constPapelCom = new Array(constPapelCom1, constPapelCom2, constPapelCom3);
	}
	
	
	var datasetWorkflowColleagueRole = DatasetFactory.getDataset('workflowColleagueRole', null, constPapelCom, null);
	if(dsTemValor(datasetWorkflowColleagueRole)){
		var colleagueId = datasetWorkflowColleagueRole.getValue(0, "workflowColleagueRolePK.colleagueId");
		//Consulta nome do Gestor Comercial
		var fieldsCol = ["colleagueName", "mail"];
		var constCol1 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		var constCol2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST);
		var constCol = new Array(constCol1, constCol2);
		var datasetColleague = DatasetFactory.getDataset("colleague", fieldsCol, constCol, null);
		
		var nomeGestorComercial = '';
		var emailGestorComercial = '';
		if(dsTemValor(datasetColleague)){
			nomeGestorComercial = datasetColleague.getValue(0, "colleagueName");
			emailGestorComercial = datasetColleague.getValue(0, "mail");
			
			if(temValor(nomeGestorComercial)){
				returnDataset.addRow(new Array(
						colleagueId,
						nomeGestorComercial,
						emailGestorComercial,
						GrupoGestorComercial,
						PapelGestorComercial));
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