function beforeSocialLike(companyId, like){

	var obj = like.getSociable(), datasetDocument;

	//	SocialObject é artigo?
	if (obj.getObjectClass().indexOf("com.totvs.technology.social.article") != -1) {

		var gameTag,
			constraintActiveProp = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST),
			datasetPropGame = DatasetFactory.getDataset('PropriedadesDeGamificacao', null, [constraintActiveProp], null);
		
		if (datasetPropGame != null && datasetPropGame.rowsCount > 0) {
			gameTag = datasetPropGame.getValue(0, "fluigGameTag");
		} else {
			log.warn("Gamificacao: Gamification properties not defined.");
			return;
		}

		var documentId = obj.getObjectClass().split("com.totvs.technology.social.article.")[1];

		var constraint1 = DatasetFactory.createConstraint('documentPK.documentId', documentId, documentId, ConstraintType.MUST);
		var constraint2 = DatasetFactory.createConstraint('documentPK.companyId', companyId, companyId, ConstraintType.MUST);
		var constraint3 = DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST);
		datasetDocument = DatasetFactory.getDataset('document', null, new Array(constraint1, constraint2, constraint3), null);

		if (datasetDocument == null || datasetDocument.rowsCount == 0) {
			throw "## Error Gamification: [Article document not found]";
		}
		
		var tags =  datasetDocument.getValue(0, "keyWord");

		// Tem a tag "XXXXX"? //
		if (tags.toLowerCase().contains(gameTag.toLowerCase())) {
			
			var publisherId = datasetDocument.getValue(0, "publisherId");
			var publisherAlias = getAliasByUserCode(publisherId);
			
			if(publisherAlias == like.getUser()) {
				log.warn("[Gamificacao: artigo (" + documentId + "). Artigos gamificados não podem ser curtidos pelo próprio autor]");
				throw "Gamificacao: Artigos com a tag (" + gameTag + ") não podem ser curtidos pelo próprio autor.";
			}
			
		}
	}

	if(obj.getSociableType() == "SocialPost") {
		var constraintActiveProp = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST),
		datasetPropGame = DatasetFactory.getDataset('PropriedadesDeGamificacao', null, [constraintActiveProp], null);
		if (datasetPropGame != null && datasetPropGame.rowsCount > 0) {
			qtdeLikesToGameINT = datasetPropGame.getValue(0, "ArticleLikesNum");
			gameTag = "#" + datasetPropGame.getValue(0, "fluigGameTag");
		} else {
			log.warn("Gamificacao: Gamification properties not defined.");
			return;
		}

		// Tem a tag "XXXXX"?
		if (obj.getText().toLowerCase().contains(gameTag.toLowerCase())) {
			if(like.getUser() == obj.getPostAuthor()) {
				log.warn("[Gamificacao: post (" + obj.getId() + "). Posts gamificados não podem ser curtidos pelo próprio autor]");
				throw "Gamificacao: Posts com a tag (" + gameTag + ") não podem ser curtidos pelo próprio autor.";
			}
		} 
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