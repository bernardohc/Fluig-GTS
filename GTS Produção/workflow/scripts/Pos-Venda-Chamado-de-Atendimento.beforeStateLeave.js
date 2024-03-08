function beforeStateLeave(sequenceId){
	
	if(sequenceId == SUPORTE_GTS || sequenceId == REVENDA || sequenceId == SETOR_GTS ){
		var indexTbComunicacao = hAPI.getChildrenIndexes("comTbComunicacao");
		for (var i = 0; i < indexTbComunicacao.length; i++) {
			//Última linha
			if(indexTbComunicacao[i] == indexTbComunicacao.length){
				hAPI.setCardValue("comDataItem___"+indexTbComunicacao[i], dataAtual('dd/mm/yyyy hh:mm'));
			}
		}
	}
	
}