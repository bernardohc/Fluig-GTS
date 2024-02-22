function decisaoTipoPedidoRiscoRevenda(){
	
	var retorno = '';
	var matFluigPartesGTS = hAPI.getCardValue("gestorEstado");
	var matFluigSuportePosVendasGTS = hAPI.getCardValue("matFluigSuporteGTS");
	
    if(hAPI.getCardValue("tipoPedido") == "PG" 
    	&& parseFloat(hAPI.getCardValue("totalCustoPedido").replace('.','').replace(',','.')) > 15000 ){
    	
    	hAPI.setCardValue("matAnalisaPedidoGTS", matFluigSuportePosVendasGTS);
    	hAPI.setCardValue("tipoPedidoPosVenda", "sim");
    	retorno = "PG";
    }else if(hAPI.getCardValue("riscoRevenda") == "A"){
    	hAPI.setCardValue("matAnalisaPedidoGTS", matFluigPartesGTS);
		hAPI.setCardValue("tipoPedidoPosVenda", "");
    	retorno = "A";
    }else if(hAPI.getCardValue("riscoRevenda") == "E" || hAPI.getCardValue("riscoRevenda") == "" ){
    	hAPI.setCardValue("matAnalisaPedidoGTS", matFluigPartesGTS);
		hAPI.setCardValue("tipoPedidoPosVenda", "");
    	retorno = "E";
    }
    
	return retorno;
}
