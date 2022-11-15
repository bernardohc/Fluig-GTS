function afterProcessCreate(processId){
	
	var WKNumProces = processId+"";
	hAPI.setCardValue("numFluig", WKNumProces);
	hAPI.setCardValue("dataAbertura", dataHoraAtual('dd/mm/yyyy hh:mm'));
	
}