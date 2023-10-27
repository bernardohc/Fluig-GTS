function beforeUpdateUser(user) {
	
	var alteraNome = false;
	
	//Verifica se usuário é admin
	var fields = ["adminUser"];
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var datasetColleagueLogado = DatasetFactory.getDataset("colleague", fields, [ c1, c2 ], null);
	
	var adminUser = datasetColleagueLogado.getValue(0, "adminUser");
	if(adminUser == 'true'){
		alteraNome = true;
	}
	
	//Verifica se usuário está no papel configuracaoDeUsuario
	var u1 = DatasetFactory.createConstraint("workflowColleagueRolePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var u2 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	//000006 - Painel de Controle - Permissão Configuração de Usuário
	var u3 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "000006", "000006", ConstraintType.MUST);
	var dsPapelConfUsuario = DatasetFactory.getDataset("workflowColleagueRole", null, [ u1, u2, u3 ], null);
	if(dsTemValor(dsPapelConfUsuario)){
		alteraNome = true;
	}
	
	//Busca nome do usuário que está sendo alterado para verificar se está diferente
	var fields = ["colleagueName", "mail"];
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user.getUserCode(), user.getUserCode(), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", user.getTenantId(), user.getTenantId(), ConstraintType.MUST);
	var datasetColleague = DatasetFactory.getDataset("colleague", fields, [ c1, c2 ], null);
	
	var nomeUser = datasetColleague.getValue(0, "colleagueName");
	var emailUser = datasetColleague.getValue(0, "mail");
	
	var userLogado = getValue("WKUser");
	
	if( !alteraNome ){
		if(nomeUser != user.getFullName()){
			throw "Não é possível alterar o nome de exibição!";
			
			user.setFullName(nomeUser);
		}
		
	}
	
}


function dsTemValor(dataset){
	if(dataset != null && dataset != undefined && dataset.rowsCount > 0){
		return true;
	}else{
		return false;
	}
}
