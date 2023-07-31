function afterProcessCreate(processId){
	var WKNumProces = processId+"";
	hAPI.setCardValue("processoId", WKNumProces);
	hAPI.setCardValue("solIdSol", WKNumProces);
	hAPI.setCardValue("dataAbertura", dataAtual('dd/mm/yyyy hh:mm'));
}