function createDataset(fields, constraints, sortFields) {

	var returnDataset = DatasetBuilder.newDataset();
	
	var constGrupoTerritorial  = "";
	
	var grupoPapelTerritorial = '';
	
	//Dataset para buscar o grupo do Gestor Territorial que está executando (Quando for um Gestor Territorial utilizando este Dataset)
	var constEhPapelTer1 = DatasetFactory.createConstraint('gesTerWKUser', getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var constEhPapelTer = new Array(constEhPapelTer1);
	var dsColleagueRoleGestorTerritorial = DatasetFactory.getDataset('dsGestorTerritorial', null, constEhPapelTer, null);
	if(dsTemValor(dsColleagueRoleGestorTerritorial)){
		grupoPapelTerritorial = dsColleagueRoleGestorTerritorial.getValue(0, "gesTerGrupo");
	}
	
	returnDataset.addColumn("RepComWKUser");
	returnDataset.addColumn("RepComNome");
	returnDataset.addColumn("RepComEmail");
	returnDataset.addColumn("RepComGrupo");
	returnDataset.addColumn("RepComTipo");
	returnDataset.addColumn("RepComGesTerWKUser");
	returnDataset.addColumn("RepComGesTerNome");
	returnDataset.addColumn("RepComGesTerEmail");
	returnDataset.addColumn("RepComGesTerPapel");

	var qtdGrupo = (grupoPapelTerritorial == '' ? 3 : 1);
	
	for ( var i = 1; i <= qtdGrupo; i++) {
		
		//Se o grupoPapelTerritorial tiver preenchido, quem está executando este Dataset é um Gestor Territorial e só puxa os Representantes vinculados a ele
		if(grupoPapelTerritorial == ''){
			nomeGrupoTerritorial = "Territorial" + i;
		}else{
			nomeGrupoTerritorial = grupoPapelTerritorial;
		}
		
		var constrainsTer1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		var constrainsTer2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", nomeGrupoTerritorial, nomeGrupoTerritorial, ConstraintType.MUST);
		var constraintsTer = new Array(constrainsTer1, constrainsTer2);
		
		var dsGruposTer = DatasetFactory.getDataset("colleagueGroup", null, constraintsTer, ["colleagueGroupPK.colleagueId"]);
		
		if(dsTemValor(dsGruposTer)){
			for ( var j = 0; j < dsGruposTer.rowsCount; j++) {
				
				var colleagueIdGesTer = '';
				var nomeGestorTerritorial = '';
				var emailGestorTerritorial = '';
				
				//Consulta para busca do nome do Representante
				var colleagueIdRep = '';
				colleagueIdRep = dsGruposTer.getValue(j, "colleagueGroupPK.colleagueId");
				
				var nomeRepresentante = '';
				var emailRepresentante = '';
				var fieldsColRep = ["colleagueName", "mail"];
				var constColRep1 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
				var constColRep2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueIdRep, colleagueIdRep, ConstraintType.MUST);
				var constColRep = new Array(constColRep1, constColRep2);
				var dsColleagueRepresentante = DatasetFactory.getDataset("colleague", fieldsColRep, constColRep, null);
				
				if(dsTemValor(dsColleagueRepresentante)){
					nomeRepresentante = dsColleagueRepresentante.getValue(0, "colleagueName");
					emailRepresentante = dsColleagueRepresentante.getValue(0, "mail");
				}
				
				//Consulta para busca do código do Gestor Territorial
				var PapelGestorTerritorial = "Gestor"+nomeGrupoTerritorial;
				
				var constPapGesTer1 = DatasetFactory.createConstraint("workflowColleagueRolePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
				var constPapGesTer2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", PapelGestorTerritorial, PapelGestorTerritorial, ConstraintType.MUST);
				var constPapGesTer = new Array(constPapGesTer1, constPapGesTer2);
				var dsPapelGestorTerritorial = DatasetFactory.getDataset("workflowColleagueRole", null, constPapGesTer, null);
				
				if(dsTemValor(dsPapelGestorTerritorial)){
					colleagueIdGesTer = dsPapelGestorTerritorial.getValue(0, "workflowColleagueRolePK.colleagueId");
					
					//Consulta para buscar o nome do Gestor Territorial
					var fieldsColGesTer = ["colleagueName", "mail"];
					var constColGesTer1 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
					var constColGesTer2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueIdGesTer, colleagueIdGesTer, ConstraintType.MUST);
					var constColGesTer = new Array(constColGesTer1, constColGesTer2);
					var dsColleagueGestorTerritorial = DatasetFactory.getDataset("colleague", fieldsColGesTer, constColGesTer, null);
					
					if(dsTemValor(dsColleagueGestorTerritorial)){
						nomeGestorTerritorial = dsColleagueGestorTerritorial.getValue(0, "colleagueName");
						emailGestorTerritorial = dsColleagueGestorTerritorial.getValue(0, "mail");
					}
				}
				
				
				//Adiciona dados no dataset
				returnDataset.addRow(new Array(
						colleagueIdRep,
						nomeRepresentante,
						emailRepresentante,
						nomeGrupoTerritorial,
						'RepresentanteNacional',
						colleagueIdGesTer,
						nomeGestorTerritorial,
						emailGestorTerritorial,
						PapelGestorTerritorial
						
				));
				
			}
		}
	}
	
	//Se o usuário que está consultando este Dataset não é um usuário Gestor Territorial
	//Ele deve ser um usuário AdministrativoGTS
	//Este usuário adminstraivoGTS não alimentou a variável grupoPapelTerritorial
	//Aqui a baixo, vai buscar também os usuários de Exportação, para poder selecionar.
	//Busca do grupo fixo Exportacao1
	if(grupoPapelTerritorial == ''){
		
		//
		var colleagueIdGestorComercial = "";
		var nomeGestorComercial = "";
		var emailGestorComercial = "";
		var constEhPapelCom1 = DatasetFactory.createConstraint('gesComWKUser', '', '', ConstraintType.MUST);
		var constEhPapelCom = new Array(constEhPapelCom1);
		var dsColleagueRoleGestorComercial = DatasetFactory.getDataset('dsGestorComercial', null, constEhPapelCom, null);
		if(dsTemValor(dsColleagueRoleGestorComercial)){
			colleagueIdGestorComercial = dsColleagueRoleGestorComercial.getValue(0, "gesComWKUser");
			nomeGestorComercial = dsColleagueRoleGestorComercial.getValue(0, "gesComNome");
			emailGestorComercial = dsColleagueRoleGestorComercial.getValue(0, "gesComEmail");
		}
		
		
		var constrainsExp1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		var constrainsExp2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", 'Exportacao1', 'Exportacao1', ConstraintType.MUST);
		var constraintsExp = new Array(constrainsExp1, constrainsExp2);
		
		var dsGruposExp = DatasetFactory.getDataset("colleagueGroup", null, constraintsExp, null);
		
		if(dsTemValor(dsGruposExp)){
			for ( var j = 0; j < dsGruposExp.rowsCount; j++) {
				var colleagueIdExp = dsGruposExp.getValue(j, "colleagueGroupPK.colleagueId");
				
				var fieldsColRepExp = ["colleagueName", "mail"];
				var constColRepExp1 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
				var constColRepExp2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueIdExp, colleagueIdExp, ConstraintType.MUST);
				var constColRepExp = new Array(constColRepExp1, constColRepExp2);
				var dsColleagueRepresentanteExp = DatasetFactory.getDataset("colleague", fieldsColRepExp, constColRepExp, null);
				
				var nomeRepresentanteExp = '';
				if(dsTemValor(dsColleagueRepresentanteExp)){
					nomeRepresentanteExp = dsColleagueRepresentanteExp.getValue(0, "colleagueName");
					emailRepresentanteExp = dsColleagueRepresentanteExp.getValue(0, "mail");
					
					if(temValor(nomeRepresentanteExp)){
						returnDataset.addRow(new Array(
								colleagueIdExp,
								nomeRepresentanteExp,
								emailRepresentanteExp,
								'Exportacao1',
								'RepresentanteExportacao',
								colleagueIdGestorComercial,
								nomeGestorComercial,
								emailGestorComercial,
								'GestorComercial1'
								
						));
					}
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