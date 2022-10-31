function afterProcessCreate(processId){

	hAPI.setCardValue("numFluig", processId);
	hAPI.setCardValue("dataAbertura", dataAtual("dd/mm/yyyy hh:mm"));
	
}