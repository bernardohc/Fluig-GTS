function beforeSocialUnlike(companyId, unlike){
	
	var obj = unlike.getSociable(), result;
	
if (obj.getObjectClass().indexOf("com.totvs.technology.social.article") != -1) {
		
		var documentId = obj.getObjectClass().split("com.totvs.technology.social.article.")[1];

		var constraint1 = DatasetFactory.createConstraint('documentPK.documentId', documentId, documentId, ConstraintType.MUST);
		var constraint2 = DatasetFactory.createConstraint('documentPK.companyId', companyId, companyId, ConstraintType.MUST);
		var constraint3 = DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST);
		datasetDocument = DatasetFactory.getDataset('document', null, new Array(constraint1, constraint2, constraint3), null);

		if (datasetDocument == null || datasetDocument.rowsCount == 0) {
			throw "## Error Gamification: [Article document not found]";
		}

		var tags =  datasetDocument.getValue(0, "keyWord");
		
		var gamificationConstrainstArray = new Array();
		
		gamificationConstrainstArray.push(DatasetFactory.createConstraint('text', tags, tags, ConstraintType.MUST));
		gamificationConstrainstArray.push(DatasetFactory.createConstraint('socialAlias', unlike.getSociable().getSocial().getAlias(), unlike.getSociable().getSocial().getAlias(), ConstraintType.MUST));
		gamificationConstrainstArray.push(DatasetFactory.createConstraint('eventType', "articleLike", "articleLike", ConstraintType.MUST));
		var datasetGamification = DatasetFactory.getDataset('isPostGamified', null, gamificationConstrainstArray, null);
		
		if (datasetGamification != null && datasetGamification.rowsCount > 0) {
			result = datasetGamification.getValue(0, "Result");
		} else {
			log.warn("Gamificacao: Gamification properties not defined.");
			return;
		}
		if (result == "true") {
			log.warn("[Gamificacao: O artigo (" + obj.getId() + ") nao pode ser 'descurtido'. Artigo gamificado]");
			throw "Gamificacao: Não é possível cancelar apoios em Artigos de campanhas.";
		} 
		
	} else if(obj.getSociableType() == "SocialPost") {

		var gamificationConstrainstArray = new Array();
		
		gamificationConstrainstArray.push(DatasetFactory.createConstraint('text', unlike.getSociable().getText(), unlike.getSociable().getText(), ConstraintType.MUST));
		gamificationConstrainstArray.push(DatasetFactory.createConstraint('socialAlias', unlike.getSociable().getSocial().getAlias(), unlike.getSociable().getSocial().getAlias(), ConstraintType.MUST));
		gamificationConstrainstArray.push(DatasetFactory.createConstraint('eventType', "unlike", "unlike", ConstraintType.MUST));
		var datasetGamification = DatasetFactory.getDataset('isPostGamified', null, gamificationConstrainstArray, null);
		if (datasetGamification != null && datasetGamification.rowsCount > 0) {
			result = datasetGamification.getValue(0, "Result");
		} else {
			log.warn("Gamificacao: Gamification properties not defined.");
			return;
		}
		if (result == "true") {
			log.warn("[Gamificacao: Publicação (" + obj.getId() + ") nao pode ser 'descurtido'. Publicação gamificado]");
			throw "Gamificacao: Não é possível cancelar apoios em publicações de campanhas.";
		} 
	}
}