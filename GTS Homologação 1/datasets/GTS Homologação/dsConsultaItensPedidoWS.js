function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("C6_FILIAL");
	newDataset.addColumn("C6_ITEM");
	newDataset.addColumn("STATUS_ITM");
	newDataset.addColumn("C6_PRODUTO");
	newDataset.addColumn("C6_DESCRI");
	newDataset.addColumn("B1_ZDESCP");
	newDataset.addColumn("C6_QTDVEN");
	newDataset.addColumn("C6_QTAFAT");
	newDataset.addColumn("C6_TES");
	newDataset.addColumn("PRCCUSTO");
	newDataset.addColumn("PRCVENDA");
	newDataset.addColumn("PRCTOTALIT");
	newDataset.addColumn("POSIPINCM");
	newDataset.addColumn("IPI");
	newDataset.addColumn("ALIQIPI");
	newDataset.addColumn("ICMS");
	newDataset.addColumn("ALIQICMS");
	newDataset.addColumn("ICMSRET");
	newDataset.addColumn("TOTIPI");
	newDataset.addColumn("TOTICMS");
	newDataset.addColumn("TOTICMSRE");
	newDataset.addColumn("TOTNOTA");
	
	var numPedido  = "";
	var filialPedido  = "";
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'numPedido' ) {
			numPedido = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'filialPedido' ) {
			filialPedido = constraints[i].initialValue;
		}
	}
	
	try{
		// Conexao com webservice
		log.info(" ********* CONSULTA ITENS PEDIDO VIA WS INICIO ************ " )
		var periodicService = ServiceManager.getService('WSORCFLUIG');
		var serviceHelper = periodicService.getBean();
        var serviceLocator = serviceHelper.instantiate('br.com.protheus.WSORCFLUIG');
		var service = serviceLocator.getWSORCFLUIGSOAP();
		log.info(" ********* CONSULTA ITENS PEDIDO VIA WS INICIO - passsouuu1 ************ " )
		
		var result = new Array();
		result = service.consultaitenspedido(filialPedido, numPedido);
		var result2 = new Array();
		result2 = result.getWSRETCONSULTAITENSPEDIDO();	

		for(var i=0; i < result2.size(); i++){
			newDataset.addRow(new Array(
							'1',
							'SUCESSO',
							result2.get(i).getC6FILIAL(),
							result2.get(i).getC6ITEM(),
							result2.get(i).getSTATUSITM(),
							result2.get(i).getC6PRODUTO(),
							result2.get(i).getC6DESCRI(),
							result2.get(i).getB1ZDESCP(),
							result2.get(i).getC6QTDVEN(),
							result2.get(i).getC6QTAFAT(),
							result2.get(i).getC6TES(),
							result2.get(i).getPRCCUSTO(),
							result2.get(i).getPRCVENDA(),
							result2.get(i).getPRCTOTALIT(),
							result2.get(i).getPOSIPINCM(),
							result2.get(i).getIPI(),
							result2.get(i).getALIQIPI(),
							result2.get(i).getICMS(),
							result2.get(i).getALIQICMS(),
							result2.get(i).getICMSRET(),
							result2.get(i).getTOTIPI(),
							result2.get(i).getTOTICMS(),
							result2.get(i).getTOTICMSRE(),
							result2.get(i).getTOTNOTA(),
							"SUCCESS"
							));
			
		}
		
		log.info(" ********* CONSULTA ITENS PEDIDO VIA WS INICIO - passsouuu1 ************ " )
	} catch(erro) {		
		var error = "ERROR Consulta ITENS PEDIDO :  " + erro.message;
		log.info("ERROR Consulta ITENS PEDIDO : " + error);
		newDataset.addRow(new Array("2", "Erro ao consultar itens do pedido."));
		
	}
	
	return newDataset;
}
