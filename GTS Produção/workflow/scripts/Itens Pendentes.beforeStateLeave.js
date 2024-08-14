function beforeStateLeave(sequenceId){
	
	if(sequenceId == GER_REVENDA_DEFINE){
		hAPI.setCardValue("dataHoraRespostaRevenda", dataHoraAtual("dd/mm/yyyy hh:mm"));
	}
}