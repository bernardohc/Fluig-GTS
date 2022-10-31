function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	if(nextSequenceId == REPRESENTANTE
			|| nextSequenceId == GESTOR_TERRITORIAL
			|| nextSequenceId == GESTOR_COMERCIAL){
		
		 hAPI.setCardValue("encaminharAtividade", "");
	
	}
	
	
}