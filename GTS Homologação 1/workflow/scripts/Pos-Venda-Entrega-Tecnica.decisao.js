function decisaoPagamentoFinaliza(){
	var retorno = '';

    if( hAPI.getCardValue("tipoSolicitante")  == "Administrativo GTS" || 
        hAPI.getCardValue("equipNumSerie").substring(0, 3)  == "FGS" ||
        (hAPI.getCardValue("tipoSolicitante")  == "Revenda" && hAPI.getCardValue("entTecGeracaoPagto")  == "nao") ||
        hAPI.getCardValue("A1_PAIS")  == "PAR" ){

        retorno = 'finaliza'; 
    }else if(hAPI.getCardValue("tipoSolicitante")  == "Revenda" && hAPI.getCardValue("entTecGeracaoPagto")  == "sim"){
        retorno = 'pagamento'; 
    
    }
    
	return retorno;
}
