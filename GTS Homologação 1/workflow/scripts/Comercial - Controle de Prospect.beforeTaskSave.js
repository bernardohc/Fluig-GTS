function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	if(nextSequenceId == INICIO
		|| nextSequenceId == REPRESENTANTE
		|| nextSequenceId == GESTOR_TERRITORIAL
		|| nextSequenceId == GESTOR_COMERCIAL
		|| nextSequenceId == FIM
		 ){
		var fields = ["colleagueName"];
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		var datasetColleague = DatasetFactory.getDataset("colleague", fields, [ c1, c2 ], null);
		var nomeUserInteracao = '';
		if(dsTemValor(datasetColleague)){
			nomeUserInteracao = datasetColleague.getValue(0, "colleagueName");
		}
		
		var childData = new java.util.HashMap();
		childData.put("intWKUserUsuario", getValue("WKUser") );
		childData.put("intNomeUsuario", nomeUserInteracao );
		childData.put("intDataHoraInteracao", dataAtual("dd/mm/yyyy hh:mm") );
		childData.put("intObservacao", hAPI.getCardValue("obsInteracao"));
		
		hAPI.addCardChild("tbInteracoes", childData);
		
		
		hAPI.setCardValue("obsInteracao", "");
	}
	
	
}