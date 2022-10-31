function beforeUpdateUser(user) {
	
	var fields = ["adminUser"];
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var datasetColleagueLogado = DatasetFactory.getDataset("colleague", fields, [ c1, c2 ], null);
	
	var adminUser = datasetColleagueLogado.getValue(0, "adminUser");
	
	var fields = ["colleagueName", "mail"];
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user.getUserCode(), user.getUserCode(), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", user.getTenantId(), user.getTenantId(), ConstraintType.MUST);
	var datasetColleague = DatasetFactory.getDataset("colleague", fields, [ c1, c2 ], null);
	
	var nomeUser = datasetColleague.getValue(0, "colleagueName");
	var emailUser = datasetColleague.getValue(0, "mail");
	
	var userLogado = getValue("WKUser");
	
	if( adminUser == 'false'){
		if(nomeUser != user.getFullName()){
			throw "Não é possível alterar o nome de exibição!";
			
			user.setFullName(nomeUser);
		}
		
//		if(emailUser != user.getEmail()){
//			throw "Não é possível alterar o e-mail!";
//			
//			user.setEmail(emailUser);
//		}
	}
	
	

}