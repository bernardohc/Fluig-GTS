function beforeStateEntry(sequenceId){
	
	if(sequenceId == REV_CIENTE_PED){
		hAPI.setCardValue("revChkCientePedido", "ciente");
	}
	
	if(sequenceId == REP_CIENTE_PED){
		hAPI.setCardValue("repChkCientePedido", "ciente");
	}
	
	if(sequenceId == GESTER_CIENTE_PED){
		hAPI.setCardValue("repGesTerChkCientePedido", "ciente");
	}
	
	if(sequenceId == REVISA_ORC){
		hAPI.setCardValue("cancelamentoAutomatico", "cancelar");
	}
}