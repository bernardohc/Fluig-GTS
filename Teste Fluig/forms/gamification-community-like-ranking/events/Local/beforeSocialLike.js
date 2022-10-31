function beforeSocialLike(companyId, like){

	var obj = like.getSociable(), result;
	
	if (obj.getObjectClass().indexOf("com.totvs.technology.social.article") != -1) {
	
		log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + like.getSociable().getSocial().getAlias());
		var documentId = obj.getObjectClass().split("com.totvs.technology.social.article.")[1];

		var constraint1 = DatasetFactory.createConstraint('documentPK.documentId', documentId, documentId, ConstraintType.MUST);
		var constraint2 = DatasetFactory.createConstraint('documentPK.companyId', companyId, companyId, ConstraintType.MUST);
		var constraint3 = DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST);
		datasetDocument = DatasetFactory.getDataset('document', null, new Array(constraint1, constraint2, constraint3), null);

		if (datasetDocument == null || datasetDocument.rowsCount == 0) {
			throw "## Error Gamification: [Article document not found]";
		}

		var tags =  datasetDocument.getValue(0, "keyWord"),		
				    gamificationConstrainstArray = new Array();
		
		gamificationConstrainstArray.push(DatasetFactory.createConstraint('text', tags, tags, ConstraintType.MUST));
		gamificationConstrainstArray.push(DatasetFactory.createConstraint('socialAlias', like.getSociable().getSocial().getAlias(), like.getSociable().getSocial().getAlias(), ConstraintType.MUST));
		gamificationConstrainstArray.push(DatasetFactory.createConstraint('eventType', "articleLike", "articleLike", ConstraintType.MUST));
		var datasetGamification = DatasetFactory.getDataset('isPostGamified', null, gamificationConstrainstArray, null);
		
		if (datasetGamification != null && datasetGamification.rowsCount > 0) {
			result = datasetGamification.getValue(0, "Result");
		} else {
			log.warn("Gamificacao: Gamification properties not defined.");
			return;
		}
		if (result == "true") {
			
			var publisherId = datasetDocument.getValue(0, "publisherId");
			
			var constraintColleague1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', publisherId, publisherId, ConstraintType.MUST);
			var datasetColleague = DatasetFactory.getDataset('colleague', null, new Array(constraintColleague1), null);

			if (datasetColleague != null && datasetColleague.rowsCount > 0) {
				var publisherAlias = datasetColleague.getValue(0, "login");
				if(like.getUser() == publisherAlias) {
					log.warn("[Gamificacao: Article (" + obj.getId() + "). Artigos gamificados não podem ser curtidos pelo próprio autor]");
					throw "Gamificacao: Artigos de campanhas não podem ser apoiados pelo próprio autor.";
				}
			}
			
		} 
		
	} else if(obj.getSociableType() == "SocialPost") {

		var gamificationConstrainstArray = new Array();
		
		gamificationConstrainstArray.push(DatasetFactory.createConstraint('text', like.getSociable().getText(), like.getSociable().getText(), ConstraintType.MUST));
		gamificationConstrainstArray.push(DatasetFactory.createConstraint('socialAlias', like.getSociable().getSocial().getAlias(), like.getSociable().getSocial().getAlias(), ConstraintType.MUST));
		gamificationConstrainstArray.push(DatasetFactory.createConstraint('eventType', "like", "like", ConstraintType.MUST));
		var datasetGamification = DatasetFactory.getDataset('isPostGamified', null, gamificationConstrainstArray, null);
		if (datasetGamification != null && datasetGamification.rowsCount > 0) {
			result = datasetGamification.getValue(0, "Result");
		} else {
			log.warn("Gamificacao: Gamification properties not defined.");
			return;
		}
		if (result == "true") {
			if(like.getUser() == obj.getPostAuthor()) {
				log.warn("[Gamificacao: Publicação (" + obj.getId() + "). Publicações gamificadas não podem ser curtidos pelo próprio autor]");
				throw "Gamificacao: Publicações de campanhas não podem ser apoiados pelo próprio autor.";
			}
		} 
	}
}
