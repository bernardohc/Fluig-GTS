function afterStateLeave(sequenceId){
	var WKNumProces = getValue('WKNumProces')+"";

	if(sequenceId == INICIO){
		
		//Se clicou direto em enviar, o campo dataAbertura e gerNumProtocolo que vão pro e-mail de abertura não estarem definidos ainda
		if(hAPI.getCardValue("dataAbertura") == ""){
			hAPI.setCardValue("dataAbertura", dataAtual('dd/mm/yyyy hh:mm'));
		}
		if(hAPI.getCardValue("gerNumProtocolo") == ""){
			hAPI.setCardValue("gerNumProtocolo", dataAtual("yyyymmdd") +''+ completeToLeft( WKNumProces, "0", 7 ));
		}

	}
	
}