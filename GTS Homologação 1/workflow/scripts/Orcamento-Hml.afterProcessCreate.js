function afterProcessCreate(processId){
	hAPI.setCardValue("solicitacao", getValue("WKNumProces"));
	hAPI.setCardValue("DataAbertura", dataAtual());
	
}