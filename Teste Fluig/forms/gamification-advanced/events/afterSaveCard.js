function afterSaveCard(companyId, formId, cardId, cardVersion, cardData) {
	
	/**
	 * ITEM III (Pontuar autor da resposta de formulário gamificado)
	 * @author: Luis Paulo
	 */
	
	var gameTag,
		constraintActiveProperties = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST),
		datasetPropGame = DatasetFactory.getDataset('PropriedadesDeGamificacao', null, [constraintActiveProperties], null);
	
	if (datasetPropGame != null && datasetPropGame.rowsCount > 0) {
		gameTag = datasetPropGame.getValue(0, "fluigGameTag");
	} else {
		log.warn("[Gamificacao: Formulário de propriedades de gamificação não foi criado");
		return
	}
	
	var constraint1 = DatasetFactory.createConstraint('documentPK.documentId', formId, formId, ConstraintType.MUST);
	var constraint2 = DatasetFactory.createConstraint('documentPK.companyId', companyId, companyId, ConstraintType.MUST);
	var constraint3 = DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST);
	datasetForm = DatasetFactory.getDataset('document', null, new Array(constraint1, constraint2, constraint3), null);
	
	if (datasetForm == null || datasetForm.rowsCount == 0) {
		throw "## Error Gamification: [Form not found]";
	}
	
	var tags =  datasetForm.getValue(0, "keyWord");

	// Tem a tag "XXXXX"?
	if (!tags.toLowerCase().contains(gameTag.toLowerCase())) {
		log.warn("[Gamificacao: Formulário (" + formId + ") nao possui a TAG para pontuar]");
		return;
	}
	
	//O autor do post está em grupo gamificado?
	
	var ct1 = DatasetFactory.createConstraint('documentPK.documentId', cardId, cardId, ConstraintType.MUST);
	var ct2 = DatasetFactory.createConstraint('documentPK.companyId', companyId, companyId, ConstraintType.MUST);
	var ct3 = DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST);
	datasetDocument = DatasetFactory.getDataset('document', null, new Array(ct1, ct2, ct3), null);
	
	if (datasetDocument == null || datasetDocument.rowsCount == 0) {
		throw "## Error Gamification: [Card not found]";
	}
	
	var publisherId = datasetDocument.getValue(0, "publisherId");
	
	var groupGamificatedConstraintArray = new Array();
	groupGamificatedConstraintArray.push(DatasetFactory.createConstraint('userCode', publisherId, publisherId, ConstraintType.MUST));
	var datasetGroup = DatasetFactory.getDataset('isUserInGamifiedGroup', null, groupGamificatedConstraintArray, null);
	
	if(datasetGroup.getValue(0, "Result").contains('error')) {
		log.warn("[Gamificacao: Autor do registro de formulário ( " + cardId + ") nao pertence a um grupo que gera pontos]");
		return;
	}
	
	//Essa comunidade está gamificada? 
	var communityGamificatedConstraintArray = new Array();
	communityGamificatedConstraintArray.push(DatasetFactory.createConstraint('parentContentId', formId, formId, ConstraintType.MUST));
	communityGamificatedConstraintArray.push(DatasetFactory.createConstraint('contentType', "form", "form", ConstraintType.MUST));
	communityGamificatedConstraintArray.push(DatasetFactory.createConstraint('companyId', companyId, companyId, ConstraintType.MUST));
	var datasetCommunity = DatasetFactory.getDataset('isContentInGamifiedCommunity', null, communityGamificatedConstraintArray, null);
	if(datasetCommunity.getValue(0, "Result").contains('error')) {
		log.warn("[Gamificacao: Registro de formulário (" + cardId + ") nao foi publicado em uma comunidade que gera pontos]");
		return;
	}
	
	var launchConstrainstArray = new Array();

	var publisherAlias = getAliasByUserCode(publisherId);
	
	launchConstrainstArray.push(DatasetFactory.createConstraint('targetAlias', publisherAlias, publisherAlias, ConstraintType.MUST));
	launchConstrainstArray.push(DatasetFactory.createConstraint('event', "A9991", "A9991", ConstraintType.MUST));
	launchConstrainstArray.push(DatasetFactory.createConstraint('documentId', cardId, cardId, ConstraintType.MUST));
	var datasetLaunch = DatasetFactory.getDataset('launchGamificationPoint', null, launchConstrainstArray, null);
	
	if(datasetLaunch.getValue(0, "Result").contains('SUCCESS')) {
		log.warn("END Gamification: " + publisherAlias + " receive point by AnswerForm, " + datasetDocument.getValue(0, "documentDescription") + ")");
		return;
	} else {
		throw datasetLaunch.getValue(0, "Result");
	}
}

function getAliasByUserCode(userCode) {
	var constraintColleague1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', userCode, userCode, ConstraintType.MUST);
	var datasetColleague = DatasetFactory.getDataset('colleague', null, new Array(constraintColleague1), null);
	
	if (datasetColleague.rowsCount > 0) {
		return datasetColleague.getValue(0, "login");
	} else {
		throw("## Error Gamification: [No such Publisher Id]");
	}
	
}