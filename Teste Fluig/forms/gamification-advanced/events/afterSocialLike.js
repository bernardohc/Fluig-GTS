function afterSocialLike(companyId, like){

	/**
	 * ITEM IV (Pontuar autor do artigo depois de "x" numeros de like)
	 * @author: Caio Monteiro, Luis Paulo
	 */

	var obj = like.getSociable(), datasetDocument;

	//	SocialObject é artigo?
	if (obj.getObjectClass().indexOf("com.totvs.technology.social.article") != -1) {

		// Artigo atingiu "X" curtidas?
		/***********************************************************************
		 * FIND NO FORMULARIO DE CADASTRO DO MOTOR DO GAME [CONSIDERAR VALOR -1
		 * POIS O LIKE DO EVENTO EM EXECUÇÃO AINDA NAO ESTA PERSISTIDO]
		 **********************************************************************/
		var qtdeLikesToGameINT, 
		gameTag;
		var constraintActiveProperties = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
		var datasetPropertiesGame = DatasetFactory.getDataset('PropriedadesDeGamificacao', null, [constraintActiveProperties], null);
		if (datasetPropertiesGame != null && datasetPropertiesGame.rowsCount > 0) {
			qtdeLikesToGameINT = datasetPropertiesGame.getValue(0, "ArticleLikesNum");
			gameTag = datasetPropertiesGame.getValue(0, "fluigGameTag");
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

		// Tem a tag "XXXXX"?
		if (!tags.toLowerCase().contains(gameTag.toLowerCase())) {
			log.warn("[Gamificacao: artigo (" + documentId + ") nao possui a TAG para pontuar]");
			return;
		}

		var qtdeLikesINT = java.lang.Integer.parseInt(obj.getNumberLikes());

		// Pontua se atingiu "X" likes
		if (qtdeLikesINT + 1 <= (qtdeLikesToGameINT - 1)) {
			log.warn("[Gamificacao: artigo (" + documentId + ") nao atingiu a quantidade de like para pontuar]");
			return;
		}

		// Pontua a cada X likes
		if ((qtdeLikesINT + 1) % qtdeLikesToGameINT != 0) {
			log.warn("[Gamificacao: artigo (" + documentId + ") nao atingiu a quantidade de like para pontuar]");
			return;
		}
		
		var publisherId = datasetDocument.getValue(0, "publisherId");

		// Autor esta em um grupo gamificado?
		var groupGamificatedConstraintArray = new Array();
		groupGamificatedConstraintArray.push(DatasetFactory.createConstraint('userCode', publisherId, publisherId, ConstraintType.MUST));
		
		var datasetGroup = DatasetFactory.getDataset('isUserInGamifiedGroup', null, groupGamificatedConstraintArray, null);

		if(datasetGroup == null || datasetGroup.rowsCount == 0) {
			log.warn("[Gamificacao error: grupo não encontrado]");
			return;
		}
		
		if(datasetGroup.getValue(0, "Result").contains('error')) {
			log.warn("[Gamificacao: Autor do artigo ( " + documentId + ") nao pertence a um grupo que gera pontos]");
			return;
		}

		//Essa comunidade está gamificada?
		var parentContentId = datasetDocument.getValue(0, "parentDocumentId");

		var communityGamificatedConstraintArray = new Array();
		communityGamificatedConstraintArray.push(DatasetFactory.createConstraint('parentContentId', parentContentId, parentContentId, ConstraintType.MUST));
		communityGamificatedConstraintArray.push(DatasetFactory.createConstraint('contentType', obj.getObjectClass(), obj.getObjectClass(), ConstraintType.MUST));
		communityGamificatedConstraintArray.push(DatasetFactory.createConstraint('companyId', companyId, companyId, ConstraintType.MUST));
		var datasetCommunity = DatasetFactory.getDataset('isContentInGamifiedCommunity', null, communityGamificatedConstraintArray, null);
		if(datasetCommunity.getValue(0, "Result").contains('error')) {
			log.warn("[Gamificacao: artigo (" + documentId + ") nao foi publicado em uma comunidade que gera pontos]");
			log.warn(datasetCommunity.getValue(0, "Result"));
			return;
		}

		/** Send integration **/
		var constraintColleague1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', publisherId, publisherId, ConstraintType.MUST);
		var datasetColleague = DatasetFactory.getDataset('colleague', null, new Array(constraintColleague1), null);

		if (datasetColleague != null && datasetColleague.rowsCount > 0) {
			var publisherAlias = datasetColleague.getValue(0, "login");

			var launchConstrainstArray = new Array();

			launchConstrainstArray.push(DatasetFactory.createConstraint('targetAlias', publisherAlias, publisherAlias, ConstraintType.MUST));
			launchConstrainstArray.push(DatasetFactory.createConstraint('event', "A9995", "A9995", ConstraintType.MUST));
			launchConstrainstArray.push(DatasetFactory.createConstraint('documentId', documentId, documentId, ConstraintType.MUST));
			var datasetLaunch = DatasetFactory.getDataset('launchGamificationPoint', null, launchConstrainstArray, null);

			if (datasetLaunch == null || datasetLaunch.rowsCount == 0) {
				log.warn("Gamification: erro ao gerar pontos de gamificação");
				return;
			}
			
			if(datasetLaunch.getValue(0, "Result").contains('SUCCESS')) {
				log.warn("END Gamification: " + publisherAlias + " receive point by PublishArticle, " + datasetDocument.getValue(0, "documentDescription") + ")");
				return;
			} else {
				log.warn(datasetLaunch.getValue(0, "Result"));
				return
			}
		}
	}

	/**
	 * ITEM VII (Pontuar autor do post, em determinada comunidade.)
	 * @author: Caio Monteiro
	 */

	var obj = like.getSociable(), datasetDocument;

	if(obj.getSociableType() == "SocialPost") {

		var constraintActiveProp = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST),
		datasetPropGame = DatasetFactory.getDataset('PropriedadesDeGamificacao', null, [constraintActiveProp], null);
		if (datasetPropGame != null && datasetPropGame.rowsCount > 0) {
			gameTag = "#" + datasetPropGame.getValue(0, "fluigGameTag");
			qtdeLikesPostToGameINT = datasetPropGame.getValue(0, "PostLikesNum");
		} else {
			log.warn("Gamificacao: Gamification properties not defined.");
			return;
		}

		// Tem a tag "XXXXX"?
		if (!obj.getText().toLowerCase().contains(gameTag.toLowerCase())) {
			log.warn("[Gamificacao: post (" + obj.getId() + ") nao possui a TAG para pontuar]");
			return;
		} 

		//Essa comunidade está gamificada?
		var socialAlias = obj.getSocial().getAlias();

		var communityAliasConstraint = DatasetFactory.createConstraint("registerValue", socialAlias, socialAlias, ConstraintType.MUST);
		var datasetComunidadesGamificadas = DatasetFactory.getDataset('comunidadesGamificadas', ["registerValue"], [communityAliasConstraint], null);

		if(datasetComunidadesGamificadas == null || datasetComunidadesGamificadas.rowsCount == 0) {
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

		// Usuário que está curtindo esta em um grupo gamificado?
		var userGroupGamificatedConstraintArray = new Array();

		var userCode = getUserCodeByAlias(like.getUser());

		userGroupGamificatedConstraintArray.push(DatasetFactory.createConstraint('userCode', userCode, userCode, ConstraintType.MUST));
		var datasetUserGroup = DatasetFactory.getDataset('isUserInGamifiedGroup', null, userGroupGamificatedConstraintArray, null);

		if(datasetUserGroup == null || datasetUserGroup.rowsCount == 0) {
			log.warn("[Gamificacao: não foi possível recuperar os grupos gamificados");
			return;		
		}
		
		if(datasetUserGroup.getValue(0, "Result").contains('error')) {
			log.warn("[Gamificacao: O usuário que está curtindo o post ( " + obj.getPostAuthor() + ") nao pertence a um grupo que gera pontos]");
			return;
		}

		var launchConstrainstArray = new Array();

		launchConstrainstArray.push(DatasetFactory.createConstraint('targetAlias', obj.getPostAuthor(), obj.getPostAuthor(), ConstraintType.MUST));
		launchConstrainstArray.push(DatasetFactory.createConstraint('event', "A9998", "A9998", ConstraintType.MUST));
		launchConstrainstArray.push(DatasetFactory.createConstraint('documentId', obj.getId(), obj.getId(), ConstraintType.MUST));
		var datasetLaunch = DatasetFactory.getDataset('launchGamificationPoint', null, launchConstrainstArray, null);

		if (datasetLaunch != null && datasetLaunch.rowsCount > 0) {
			if(datasetLaunch.getValue(0, "Result").contains('SUCCESS')) {
				log.warn("END Gamification: " +  obj.getPostAuthor() + " receive point by PublisPost, " + obj.getId() + ")");
			} else {
				log.warn("Error Gamification: " + datasetLaunch.getValue(0, 'Result'));
				return;
			}
		}


		/**
		 * ITEM V (Pontuar autor do post, em determinada comunidade, depois de "x" numeros de like)
		 * @author: Caio Monteiro
		 */

		var qtdeLikesINT = java.lang.Integer.parseInt(obj.getNumberLikes());

		// Pontua se atingiu "X" likes
		if (qtdeLikesINT + 1 > (qtdeLikesPostToGameINT - 1)) {

			// Pontua a cada X likes
			if ((qtdeLikesINT + 1) % qtdeLikesPostToGameINT == 0) {

				var launchConstrainstArray = new Array();

				launchConstrainstArray.push(DatasetFactory.createConstraint('targetAlias', obj.getPostAuthor(), obj.getPostAuthor(), ConstraintType.MUST));
				launchConstrainstArray.push(DatasetFactory.createConstraint('event', "A9998", "A9998", ConstraintType.MUST));
				launchConstrainstArray.push(DatasetFactory.createConstraint('documentId', obj.getId(), obj.getId(), ConstraintType.MUST));
				var datasetLaunch = DatasetFactory.getDataset('launchGamificationPoint', null, launchConstrainstArray, null);

				if(datasetLaunch.getValue(0, "Result").contains('SUCCESS')) {
					log.warn("END Gamification: " +  obj.getPostAuthor() + " receive point by PublisPost liked multiple times, " + obj.getId() + ")");
				} else {
					log.warn("Error Gamification: " + datasetLaunch.getValue(0, 'Result'));
					return;
				}
			}
		}
	}
	
	/**
	 * ITEM V (Pontuar autor do post, em determinada comunidade, depois de "x" numeros de like em comentários)
	 * @author: Luis Paulo
	 */
	
	if(obj.getSociableType() == "SociableComment") {
		
		var constraintCommentDataset1 = DatasetFactory.createConstraint('commentId', obj.getId(), obj.getId(), ConstraintType.MUST);
		var datasetCommentDataset = DatasetFactory.getDataset('CommentDataset', null, new Array(constraintCommentDataset1), null);
		
		if(datasetCommentDataset == null || datasetCommentDataset.rowsCount == 0) {
			log.warn("Error Gamification: post not found");
			return;
		}
		
		var postId = datasetCommentDataset.getValue(0, "postId")
		
		var constraintPostDataset1 = DatasetFactory.createConstraint('postId', postId, postId, ConstraintType.MUST);
		var datasetPostDataset = DatasetFactory.getDataset('PostDataset', null, new Array(constraintPostDataset1), null);
		
		if(datasetPostDataset == null || datasetPostDataset.rowsCount == 0) {
			log.warn("Error Gamification: post not found");
			return;
		}

		var constraintActiveProp = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST),
		datasetPropGame = DatasetFactory.getDataset('PropriedadesDeGamificacao', null, [constraintActiveProp], null);
		if (datasetPropGame != null && datasetPropGame.rowsCount > 0) {
			gameTag = "#" + datasetPropGame.getValue(0, "fluigGameTag");
			qtdeLikesPostToGameINT = datasetPropGame.getValue(0, "PostLikesNum");
		} else {
			log.warn("Gamificacao: Gamification properties not defined.");
			return;
		}
		
		var postText = datasetPostDataset.getValue(0, "text");

		// Tem a tag "XXXXX"?
		if (!postText.toLowerCase().contains(gameTag.toLowerCase())) {
			log.warn("[Gamificacao: post (" + obj.getId() + ") nao possui a TAG para pontuar]");
			return;
		} 

		//Essa comunidade está gamificada?
		var socialAlias = obj.getSocial().getAlias();

		var communityAliasConstraint = DatasetFactory.createConstraint("registerValue", socialAlias, socialAlias, ConstraintType.MUST);
		var datasetComunidadesGamificadas = DatasetFactory.getDataset('comunidadesGamificadas', ["registerValue"], [communityAliasConstraint], null);

		if(datasetComunidadesGamificadas == null || datasetComunidadesGamificadas.rowsCount == 0) {
			log.warn("[Gamificacao: comunidade (" + socialAlias + ") não está gamificada");
			return;		
		}
		
		// Autor esta em um grupo gamificado?
		var groupGamificatedConstraintArray = new Array();

		var authorCode = getUserCodeByAlias(datasetPostDataset.getValue(0,"author"));

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

		// Usuário que está curtindo esta em um grupo gamificado?
		var userGroupGamificatedConstraintArray = new Array();

		var userCode = getUserCodeByAlias(like.getUser());

		userGroupGamificatedConstraintArray.push(DatasetFactory.createConstraint('userCode', userCode, userCode, ConstraintType.MUST));
		var datasetUserGroup = DatasetFactory.getDataset('isUserInGamifiedGroup', null, userGroupGamificatedConstraintArray, null);

		if(datasetUserGroup == null || datasetUserGroup.rowsCount == 0) {
			log.warn("[Gamificacao: não foi possível recuperar os grupos gamificados");
			return;		
		}
		
		if(datasetUserGroup.getValue(0, "Result").contains('error')) {
			log.warn("[Gamificacao: O usuário que está curtindo o post ( " + obj.getPostAuthor() + ") nao pertence a um grupo que gera pontos]");
			return;
		}

		var qtdeLikesINT = java.lang.Integer.parseInt(obj.getNumberLikes());

		// Pontua se atingiu "X" likes
		if (qtdeLikesINT + 1 > (qtdeLikesPostToGameINT - 1)) {

			// Pontua a cada X likes
			if ((qtdeLikesINT + 1) % qtdeLikesPostToGameINT == 0) {
				
				var launchConstrainstArray = new Array();

				launchConstrainstArray.push(DatasetFactory.createConstraint('targetAlias', datasetPostDataset.getValue(0,"author"), datasetPostDataset.getValue(0,"author"), ConstraintType.MUST));
				launchConstrainstArray.push(DatasetFactory.createConstraint('event', "A9998", "A9998", ConstraintType.MUST));
				launchConstrainstArray.push(DatasetFactory.createConstraint('documentId', postId, postId, ConstraintType.MUST));
				var datasetLaunch = DatasetFactory.getDataset('launchGamificationPoint', null, launchConstrainstArray, null);

				if (datasetLaunch != null && datasetLaunch.rowsCount > 0) {
					if(datasetLaunch.getValue(0, "Result").contains('SUCCESS')) {
						log.warn("END Gamification: " +  obj.getPostAuthor() + " receive point by PublisPost, " + obj.getId() + ")");
					} else {
						log.warn("Error Gamification: " + datasetLaunch.getValue(0, 'Result'));
						return;
					}
				}
			}
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
