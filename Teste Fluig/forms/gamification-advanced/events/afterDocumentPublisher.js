function afterDocumentPublisher(){

	/**
	 * ITEM II (Pontuar o autor do vídeo)
	 * @author: Luis Paulo
	 */
	
	if(getValue("WKState") != 'PUBLISH') {
		return;
	}

	var gameTag,
		datasetPropGame,
		constraintActiveProperties,
		doc = getValue("WKDocument"),
		title = doc.getDocumentDescription();
		
	constraintActiveProperties = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
	datasetPropGame = DatasetFactory.getDataset('PropriedadesDeGamificacao', null, [constraintActiveProperties], null);

	if (datasetPropGame != null && datasetPropGame.rowsCount > 0) {
		gameTag = "#" + datasetPropGame.getValue(0, "fluigGameTag");
	} else {
		log.warn("[Gamificacao: Formulário de propriedades de gamificação não foi criado");
		return
	}

	if(!title.toLowerCase().contains(gameTag.toLowerCase())) {
		log.warn("[Gamificacao: O documento (" + title + ") nao possui o Titulo para pontuar]");
		return 
	}

	var	publisherId = doc.getPublisherId(),
		companyId = getValue("WKCompany");
	
	var constraint1 = DatasetFactory.createConstraint('documentPK.documentId', doc.getDocumentId(), doc.getDocumentId(), ConstraintType.MUST);
	var constraint2 = DatasetFactory.createConstraint('documentPK.companyId', companyId, companyId, ConstraintType.MUST);
	var constraint3 = DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST);
	datasetDocument = DatasetFactory.getDataset('document', null, new Array(constraint1, constraint2, constraint3), null);
	
	if (datasetDocument == null || datasetDocument.rowsCount == 0) {
		log.warn("[Gamificacao: documento não encontrado]");
		return
	}
	
	if(!datasetDocument.getValue(0, "mimetype").toLowerCase().contains("video")) {
		log.warn("[Gamificacao: Apenas publicação de videos são pontuadas]");
		return 
	}
	
	//O autor do post está em grupo gamificado?
	
	var groupGamificatedConstraintArray = new Array();
	groupGamificatedConstraintArray.push(DatasetFactory.createConstraint('userCode', publisherId, publisherId, ConstraintType.MUST));
	var datasetGroup = DatasetFactory.getDataset('isUserInGamifiedGroup', null, groupGamificatedConstraintArray, null);
	
	if(datasetGroup.getValue(0, "Result").contains('error')) {
		log.warn("[Gamificacao: Autor do video ( " + title + ") nao pertence a um grupo que gera pontos]");
		return;
	}
	
	//Essa comunidade está gamificada? 
	var communityGamificatedConstraintArray = new Array();
	communityGamificatedConstraintArray.push(DatasetFactory.createConstraint('parentContentId', doc.getParentDocumentId(), doc.getParentDocumentId(), ConstraintType.MUST));
	communityGamificatedConstraintArray.push(DatasetFactory.createConstraint('contentType', "video", "video", ConstraintType.MUST));
	communityGamificatedConstraintArray.push(DatasetFactory.createConstraint('companyId', companyId, companyId, ConstraintType.MUST));
	var datasetCommunity = DatasetFactory.getDataset('isContentInGamifiedCommunity', null, communityGamificatedConstraintArray, null);
	if(datasetCommunity.getValue(0, "Result").contains('error')) {
		log.warn("[Gamificacao: O video (" + title + ") nao foi publicado em uma comunidade que gera pontos]");
		return;
	}
	
	var launchConstrainstArray = new Array();

	var publisherAlias = getAliasByUserCode(publisherId);
	
	launchConstrainstArray.push(DatasetFactory.createConstraint('targetAlias', publisherAlias, publisherAlias, ConstraintType.MUST));
	launchConstrainstArray.push(DatasetFactory.createConstraint('event', "A9990", "A9990", ConstraintType.MUST));
	launchConstrainstArray.push(DatasetFactory.createConstraint('documentId', doc.getDocumentId(), doc.getDocumentId(), ConstraintType.MUST));
	var datasetLaunch = DatasetFactory.getDataset('launchGamificationPoint', null, launchConstrainstArray, null);
	
	if(datasetLaunch.getValue(0, "Result").contains('SUCCESS')) {
		log.warn("END Gamification: " + publisherAlias + " receive point by publishVideo, " + title + ")");
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