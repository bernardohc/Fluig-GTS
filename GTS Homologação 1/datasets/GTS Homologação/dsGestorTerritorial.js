function createDataset(fields, constraints, sortFields) {

	var returnDataset = DatasetBuilder.newDataset();
	
	var gesTerWKUserParam  = "";
	var gesTerGrupoParam  = "";
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'gesTerWKUser' ) {
			gesTerWKUserParam = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'gesTerGrupo' ) {
			gesTerGrupoParam = constraints[i].initialValue;
		}
	}
	
	returnDataset.addColumn("gesTerWKUser");
	returnDataset.addColumn("gesTerNome");
	returnDataset.addColumn("gesTerEmail");
	returnDataset.addColumn("gesTerGrupo");
	returnDataset.addColumn("gesTerPapel");
	
	
	var qtdGrupo = (gesTerGrupoParam == '' ? 3 : 1);
	
	for ( var i = 1; i <= qtdGrupo; i++) {
		
		var PapelGestorTerritorial = "GestorTerritorial"+i;
		var GrupoGestorTerritorial = "Territorial"+i;
		
		//Se o grupoPapelTerritorial tiver preenchido, quem está executando este Dataset é um Gestor Territorial e só puxa os Representantes vinculados a ele
		if(gesTerGrupoParam != ''){
			PapelGestorTerritorial = "Gestor" + gesTerGrupoParam; 
//			nomeGrupoTerritorial = "Territorial" + i;
		}else{
//			nomeGrupoTerritorial = grupoPapelTerritorial;
		}
		
		//Consulta usuario  no papel GestorTerritorial + numero(1, 2)
		var constPapelTer1 = DatasetFactory.createConstraint('workflowColleagueRolePK.companyId', getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		var constPapelTer2 = DatasetFactory.createConstraint('workflowColleagueRolePK.roleId', PapelGestorTerritorial, PapelGestorTerritorial, ConstraintType.MUST);
		var constPapelTer = new Array();
		if(gesTerWKUserParam == ''){
			constPapelTer = new Array(constPapelTer1, constPapelTer2);
		}else{
			var constPapelTer3 = DatasetFactory.createConstraint('workflowColleagueRolePK.colleagueId', gesTerWKUserParam, gesTerWKUserParam, ConstraintType.MUST);
			constPapelTer = new Array(constPapelTer1, constPapelTer2, constPapelTer3);
		}
		
		
		var datasetWorkflowColleagueRole = DatasetFactory.getDataset('workflowColleagueRole', null, constPapelTer, null);
		if(dsTemValor(datasetWorkflowColleagueRole)){
			var colleagueId = datasetWorkflowColleagueRole.getValue(0, "workflowColleagueRolePK.colleagueId");
			//Consulta nome do Gestor Territorial
			var fieldsCol = ["colleagueName", "mail"];
			var constCol1 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
			var constCol2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST);
			var constCol = new Array(constCol1, constCol2);
			var datasetColleague = DatasetFactory.getDataset("colleague", fieldsCol, constCol, null);
			
			var nomeGestorTerritorial = '';
			var emailGestorTerritorial = '';
			if(dsTemValor(datasetColleague)){
				nomeGestorTerritorial = datasetColleague.getValue(0, "colleagueName");
				emailGestorTerritorial = datasetColleague.getValue(0, "mail");
				
				if(temValor(nomeGestorTerritorial)){
					returnDataset.addRow(new Array(
							colleagueId,
		                    nomeGestorTerritorial,
		                    emailGestorTerritorial,
		                    GrupoGestorTerritorial,
							PapelGestorTerritorial));
				}
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