function afterSocialShare(companyId, share){
	
	/**
	 * ITEM VI (Pontuar o autor do post quando compartilhado o conteúdo)
	 * @author: Caio Monteiro, Luis Paulo
	 */

	var obj = share.getSociable(),
		gameTag;
	
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
		if (!obj.getText().toLowerCase().contains(gameTag.toLowerCase())) {
			log.warn("[Gamificacao: post (" + obj.getId() + ") nao possui a TAG para pontuar]");
			return;
		} 
		
		//Local onde será compartilhado é uma comunidade?
		var placeAlias = share.getSocialPlace().getAlias();
		
		var communityConstraint = DatasetFactory.createConstraint("alias", placeAlias, placeAlias, ConstraintType.MUST);
		
		var communityDataset = DatasetFactory.getDataset('CommunityDataset', null, [communityConstraint], null);
		
		if(communityDataset == null || communityDataset.rowsCount == 0) {
			log.warn("[Gamificacao: local de compartilhamento não é uma comunidade]");
			return;
		}
		
		//Essa comunidade está gamificada?
		var socialAlias = obj.getSocial().getAlias();
		
		var communityAliasConstraint = DatasetFactory.createConstraint("registerValue", socialAlias, socialAlias, ConstraintType.MUST);
		var datasetComunidadesGamificadas = DatasetFactory.getDataset('comunidadesGamificadas', ["registerValue"], [communityAliasConstraint], null);
		
		if(datasetComunidadesGamificadas.rowsCount == 0) {
			log.warn("[Gamificacao: comunidade (" + socialAlias + ") não está gamificada");
			return;		
		}
		
		// Autor esta em um grupo gamificado?
		var groupGamificatedConstraintArray = new Array();
		
		var authorCode = getUserCodeByAlias(obj.getPostAuthor());
		
		groupGamificatedConstraintArray.push(DatasetFactory.createConstraint('userCode', authorCode, authorCode, ConstraintType.MUST));
		var datasetGroup = DatasetFactory.getDataset('isUserInGamifiedGroup', null, groupGamificatedConstraintArray, null);
		
		if(datasetGroup == null || datasetGroup.rowsCount == 0) {
			log.warn("[Gamificacao: não foi possível recuperar os grupos gamificados");
			return;		
		}
		
		if(datasetGroup.getValue(0, "Result").contains('error')) {
			log.warn("[Gamificacao: Autor do post ( " + obj.getId() + ") nao pertence a um grupo que gera pontos]");
			return;
		}
		
		// Usuário que está compartilhando esta em um grupo gamificado?
		var userGroupGamificatedConstraintArray = new Array();
		
		var userCode = getUserCodeByAlias(share.getUser());
		
		userGroupGamificatedConstraintArray.push(DatasetFactory.createConstraint('userCode', userCode, userCode, ConstraintType.MUST));
		var datasetUserGroup = DatasetFactory.getDataset('isUserInGamifiedGroup', null, userGroupGamificatedConstraintArray, null);
		
		if(datasetUserGroup == null || datasetUserGroup.rowsCount == 0) {
			log.warn("[Gamificacao: não foi possível recuperar os grupos gamificados");
			return;		
		}
		
		if(datasetUserGroup.getValue(0, "Result").contains('error')) {
			log.warn("[Gamificacao: O usuário que está compartilhando o post ( " + obj.getPostAuthor() + ") nao pertence a um grupo que gera pontos]");
			return;
		}
		
		var launchConstrainstArray = new Array();

		launchConstrainstArray.push(DatasetFactory.createConstraint('targetAlias', obj.getPostAuthor(), obj.getPostAuthor(), ConstraintType.MUST));
		launchConstrainstArray.push(DatasetFactory.createConstraint('event', "A9997", "A9997", ConstraintType.MUST));
		launchConstrainstArray.push(DatasetFactory.createConstraint('documentId', obj.getId(), obj.getId(), ConstraintType.MUST));
		var datasetLaunch = DatasetFactory.getDataset('launchGamificationPoint', null, launchConstrainstArray, null);
		
		if(datasetLaunch.getValue(0, "Result").contains('SUCCESS')) {
			log.warn("END Gamification: " +  obj.getPostAuthor() + " receive point by PublisPost, " + obj.getId() + ")");
			return;
		} else {
			log.warn(datasetLaunch.getValue(0, "Result"));
			return;
		}
	}
}

function getUserCodeByAlias(userAlias) {
	var constraintColleague1 = DatasetFactory.createConstraint('login', userAlias, userAlias, ConstraintType.MUST);
	var datasetColleague = DatasetFactory.getDataset('colleague', null, new Array(constraintColleague1), null);
	
	if (datasetColleague.rowsCount > 0) {
		return datasetColleague.getValue(0, "colleaguePK.colleagueId");
	} else {
		throw("## Error Gamification: [No such Publisher Id]");
	}
	
}