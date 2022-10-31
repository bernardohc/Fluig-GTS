function afterProcessing(form){
	
	if(form.getFormMode() == "ADD") {
		var constraintActiveProperties = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST),
		datasetPropriedadesDeGamificacao = DatasetFactory.getDataset('PropriedadesDeGamificacao', null, [constraintActiveProperties], null);
		
		if (datasetPropriedadesDeGamificacao == null || datasetPropriedadesDeGamificacao.rowsCount == 0) {
			throw "Gamification properties not defined.";
		}
		
		FLUIG_HOST = datasetPropriedadesDeGamificacao.getValue(0, "fluigpath");
		OAUTH_APP_PUBLIC = datasetPropriedadesDeGamificacao.getValue(0, "OAUTH_APP_PUBLIC");
		OAUTH_APP_PRIVATE = datasetPropriedadesDeGamificacao.getValue(0, "OAUTH_APP_PRIVATE");
		OAUTH_USER_APP_PUBLIC = datasetPropriedadesDeGamificacao.getValue(0, "OAUTH_USER_APP_PUBLIC");
		OAUTH_USER_APP_SECRET = datasetPropriedadesDeGamificacao.getValue(0, "OAUTH_USER_APP_SECRET");
		
		var consumer = oauthUtil.getGenericConsumer(OAUTH_APP_PUBLIC, OAUTH_APP_PRIVATE,
				OAUTH_USER_APP_PUBLIC, OAUTH_USER_APP_SECRET),
				eventGroup = JSON.parse(consumer.get(FLUIG_HOST	+ "/gamificationapi/public/event/performSearchPlatRegistry?offset=0&limit=31&orderby=&pattern=GrupoEventoCampanha") + "");
		
		if(eventGroup.content == "" || eventGroup.content == null) {
			jsonEventGroup = "{\"platRegName\":\"GrupoEventoCampanha\"}";
			consumer.post(FLUIG_HOST	+ "/gamificationapi/public/event/insertOrUpdatePlatformRegistry", jsonEventGroup) + "";
			eventGroup = JSON.parse(consumer.get(FLUIG_HOST	+ "/gamificationapi/public/event/performSearchPlatRegistry?offset=0&limit=31&orderby=&pattern=GrupoEventoCampanha") + "");
		}
		
		var eventCode = "CAMP_" + form.getValue("eventidentifier");
		var jsonString = 
			"{\"description\":\"" + "Evento do jogo - " + form.getValue("gamename")
		+ "\",\"eventCode\":\""	+ eventCode
		+ "\",\"amountEXP\":\"" + "0"
		+ "\",\"eventRegistryID\":\"" + eventGroup.content[0].id + "\"}";
		
		var data = consumer.post(FLUIG_HOST	+ "/gamificationapi/public/event/insertOrUpdateEvent", jsonString) + "";
		var team = JSON.parse(consumer.get(FLUIG_HOST	+ "/gamificationapi/public/team/performSearch/?offset=0&limit=31&orderby=&pattern=TimeCampanha") + "");
		
		if(team.content == "" || team.content == null) {
			jsonTeam = "{\"teamName\":\"Time de campanha\",\"teamCode\":\"TimeCampanha\"}";
			consumer.post(FLUIG_HOST	+ "/gamificationapi/public/team/insertOrUpdateTeam", jsonTeam) + "";
			team = JSON.parse(consumer.get(FLUIG_HOST	+ "/gamificationapi/public/team/performSearch/?offset=0&limit=31&orderby=&pattern=TimeCampanha") + "");
		}
		
		var event = JSON.parse(consumer.get(FLUIG_HOST	+ "/gamificationapi/public/event/performSearch?offset=0&limit=31&orderby=&pattern=" + this.replaceSpace(eventCode)) + "");
		
		if(event.content == "" || event.content == null) {
			throw 'Não foi possível recuperar o evento da campanha';			
		}
		
		if(team.content == "" || team.content == null) {
			throw 'Não foi possível recuperar o time da campanha';
		}
		
		var eventId = event.content[0].id;
		var teamId = team.content[0].id;
		
		var rangkingName = "Campanha" + form.getValue("gamename");
		
		var jsonRaking = "{\"presetTag\":\"" + rangkingName + "\",\"isCount\":true,\"tagEventId\":" + eventId + ",\"platRegId\":null,\"teamId\":" + teamId + ",\"hierarchyId\":null}";
		
		var rakingResult = consumer.post(FLUIG_HOST	+ "/gamificationapi/public/ranking/insertOrUpdateRankingPreset", jsonRaking) + "";
		
		var groupRangkingName = "Campanha " + form.getValue("gamename");
		
		var groupRakingResult = consumer.post(FLUIG_HOST + "/gamificationapi/public/ranking/insertOrUpdateRankingScreen", "{\"tag\": \"" + groupRangkingName + "\"}") + "";
		
		var raking = JSON.parse(consumer.get(FLUIG_HOST	+ "/gamificationapi/public/ranking/performSearchPreset/?offset=0&limit=31&orderby=&pattern=" + this.replaceSpace(rangkingName)) + "");
		
		if(raking.content == "" || raking.content == null) {
			throw 'Não foi possível recuperar o Ranking da campanha';
		}
		
		var rakingId = raking.content[0].id;
		
		var groupRanking = JSON.parse(consumer.get(FLUIG_HOST	+ "/gamificationapi/public/ranking/performSearchScreen/?offset=0&limit=31&orderby=&pattern=" + this.replaceSpace(groupRangkingName)) + "");
		
		if(groupRanking.content == "" || groupRanking.content == null) {
			throw 'Não foi possível recuperar o grupo do Ranking da campanha';
		}
		
		var groupRankingId = groupRanking.content[0].id;
		
		jsonAssociateRaking = "{\"rankingScreenId\": " + groupRankingId + ", \"rankingPresetId\": " + rakingId + "}";
		
		consumer.post(FLUIG_HOST + "/gamificationapi/public/ranking/insertOrUpdateRankingScreenPreset", jsonAssociateRaking);
		
	}
	
}

function replaceSpace(text) {
	return text.replace(/ /g,"%20");
}