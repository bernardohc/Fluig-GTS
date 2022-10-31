function afterSocialLike(companyId, like){
	try{

		var obj = like.getSociable();
		
		if (obj.getObjectClass().indexOf("com.totvs.technology.social.article") != -1) {
			
			log.info("New Gamification: afterSocialLike Article: " + like.getSociable().getId());
			
			var documentId = obj.getObjectClass().split("com.totvs.technology.social.article.")[1];

			var constraint1 = DatasetFactory.createConstraint('documentPK.documentId', documentId, documentId, ConstraintType.MUST);
			var constraint2 = DatasetFactory.createConstraint('documentPK.companyId', companyId, companyId, ConstraintType.MUST);
			var constraint3 = DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST);
			datasetDocument = DatasetFactory.getDataset('document', null, new Array(constraint1, constraint2, constraint3), null);

			if (datasetDocument == null || datasetDocument.rowsCount == 0) {
				throw "## Error Gamification: [Article document not found]";
			}

			var tags =  datasetDocument.getValue(0, "keyWord");

			var launchConstrainstArray = new Array();
			
			var publisherId = datasetDocument.getValue(0, "publisherId");
			
			var constraintColleague1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', publisherId, publisherId, ConstraintType.MUST);
			var datasetColleague = DatasetFactory.getDataset('colleague', null, new Array(constraintColleague1), null);

			if (datasetColleague != null && datasetColleague.rowsCount > 0) {
				var publisherAlias = datasetColleague.getValue(0, "login");
				
				launchConstrainstArray.push(DatasetFactory.createConstraint('text', tags, tags, ConstraintType.MUST));
				launchConstrainstArray.push(DatasetFactory.createConstraint('userAlias', publisherAlias, publisherAlias, ConstraintType.MUST));
				launchConstrainstArray.push(DatasetFactory.createConstraint('socialAlias', like.getSociable().getSocial().getAlias(), like.getSociable().getSocial().getAlias(), ConstraintType.MUST));
				launchConstrainstArray.push(DatasetFactory.createConstraint('eventType', "articleLike", "articleLike", ConstraintType.MUST));
				var datasetLaunch = DatasetFactory.getDataset('executeSocialGamification', null, launchConstrainstArray, null);
				
				log.info("END Gamification: afterSocialLike Article");
			}
			
			
		} else if(obj.getSociableType() == "SocialPost") {
			
			log.info("New Gamification: afterSocialLike: " + like.getSociable().getId());
	
			var launchConstrainstArray = new Array();
	
			launchConstrainstArray.push(DatasetFactory.createConstraint('text', like.getSociable().getText(), like.getSociable().getText(), ConstraintType.MUST));
			launchConstrainstArray.push(DatasetFactory.createConstraint('socialAlias', like.getSociable().getSocial().getAlias(), like.getSociable().getSocial().getAlias(), ConstraintType.MUST));
			launchConstrainstArray.push(DatasetFactory.createConstraint('userAlias', like.getSociable().getPostAuthor(), like.getSociable().getPostAuthor(), ConstraintType.MUST));
			launchConstrainstArray.push(DatasetFactory.createConstraint('eventType', "like", "like", ConstraintType.MUST));
			var datasetLaunch = DatasetFactory.getDataset('executeSocialGamification', null, launchConstrainstArray, null);
			
			log.info("END Gamification: afterSocialLike");
			
		}

	}catch (e) {
		log.error("## ERROR Gamification: afterSocialLike");
		log.error(e);
	}
}