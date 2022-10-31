function afterSocialLike(companyId, like){
	try{

		log.info("New Gamification: afterSocialLike");

		var FLUIG_HOST ="http://172.16.70.48:8080";
		
		// OAuth variables 
		var OAUTH_APP_PUBLIC = "consumerkey";
		var OAUTH_APP_PRIVATE = "consumersecret";
		var OAUTH_USER_APP_PUBLIC = "8b17ef5e-79e3-4527-aa12-6146b0850f5b";
		var OAUTH_USER_APP_SECRET = "1fdb777a-59cc-4d85-b2df-1b4fe5971326a916fee3-e0ad-426a-9cfc-64aef515fdab";
		
		//Definition Of Gamification Event
		var jsonContent = {};
		jsonContent.collaboratorAlias = like.getUser();
		jsonContent.collaboratorTeam = 'comunicacao';
		jsonContent.eventCode = 'new-like';
		jsonContent.points = 1;
		jsonContent.universalId = Date.now();	

		var jsonString = "{\"collaboratorAlias\":\"" + jsonContent.collaboratorAlias + "\",\"teamCode\":\""+jsonContent.collaboratorTeam +"\",\"eventCode\":\"" + jsonContent.eventCode + "\",\"points\":\"" + jsonContent.points + "\",\"universalId\":\"" + jsonContent.universalId + "\"}";

		var consumer = oauthUtil.getGenericConsumer(OAUTH_APP_PUBLIC,
				OAUTH_APP_PRIVATE,
				OAUTH_USER_APP_PUBLIC,
				OAUTH_USER_APP_SECRET);
		var data = consumer.post(FLUIG_HOST+"/gamificationapi/public/event/completeEvent",jsonString);
		

		log.info(data);
		log.info("END Gamification: afterSocialLike");

	}catch (e) {
		log.error("## ERROR Gamification: afterSocialLike");
		log.error(e);
	}
}