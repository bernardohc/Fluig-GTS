function afterProcessCreate(processId){
	
	var WKNumProces = processId+"";
	hAPI.setCardValue("numFluig", WKNumProces);
	hAPI.setCardValue("solicitante", getValue("WKUser"));
	hAPI.setCardValue("dataAbertura", dataAtual('dd/mm/yyyy hh:mm'));
	hAPI.setCardValue("solStatus", 'Em Preenchimento');
	
}