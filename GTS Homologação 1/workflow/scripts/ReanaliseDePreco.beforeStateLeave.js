function beforeStateLeave(sequenceId){
	
	
	//APROVAÇÃO OPCIONAIS
	if(sequenceId == ADM_ANALISA){
		var dataHora = dataHoraAtual();			
		hAPI.setCardValue("reaPrecoDataRespAdm", dataHora);
		
	}
	
}