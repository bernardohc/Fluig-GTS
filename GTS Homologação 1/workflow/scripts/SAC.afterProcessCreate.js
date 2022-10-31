function afterProcessCreate(processId){
	
	hAPI.setCardValue("dataAbertura", dataHoraAtual('dd/mm/yyyy hh:mm'));
	
	var dataAbertura = dataAtual("yyyymmdd");
	var WKNumProces = processId+"";
	
	hAPI.setCardValue("numProtocoloFluig", dataAbertura +''+ completeToLeft( WKNumProces, "0", 7 ));
	
	
}