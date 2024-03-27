function beforeTaskComplete(colleagueId,nextSequenceId,userList){
	
	if(nextSequenceId == SUPORTE_GTS){
		if(hAPI.getCardValue("solStatus") == 'Em Preenchimento'){
			hAPI.setCardValue("solStatus", 'Recebido');
		}
	}
	
}