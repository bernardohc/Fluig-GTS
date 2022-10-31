function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("CODPAGTO");
	newDataset.addColumn("DESCPAGTO");
	
	try{
		
		var properties = {};
//		properties["basic.authorization"] = "true";
//		properties["basic.authorization.username"] = "admin";
//		properties["basic.authorization.password"] = "pass123root!@#";
		properties["disable.chunking"] = "true";
		properties["log.soap.messages"] = "true";
		properties["receive.timeout"] = "300000"; //milissegundos 300000 igual a 5 minutos
		
//		log.info('properties');
//		log.dir(properties);
		
		var supplierService = ServiceManager.getService('WSORCMAQ');
		var serviceHelper = supplierService.getBean();
		var serviceLocatorWSORCMAQ = serviceHelper.instantiate('br.com.protheus.WSORCMAQ');
		var service = serviceLocatorWSORCMAQ.getWSORCMAQSOAP();
		var metodosWSORCMAQ = supplierService.getCustomClient(service, "br.com.protheus.WSORCMAQSOAP", properties);

		
		var result = new Array();
		result = metodosWSORCMAQ.getcondpgto('');
		
		var CODRET = result.getWSRETCOND().get(0).getCODRET();
		if(CODRET == '1'){
			for(var i=0; i < result.getWSRETCOND().size(); i++){
				var CODPAGTO = result.getWSRETCOND().get(i).getCOD();
				var DESCPAGTO = result.getWSRETCOND().get(i).getDESC();
				
				newDataset.addRow(new Array('1',
										'Sucesso',
										CODPAGTO,
										DESCPAGTO
										));
			}
			
			//045 - Negociavel valor
			newDataset.addRow(new Array(
					'1',
					'Sucesso',
					'045',
					'OUTRO'
					));
		}else{
			var MSGRET = result.getWSRETCOND().get(0).getMSGRET();
			newDataset.addRow(new Array('2', MSGRET));
		}
		
		
		
    }catch(erro){    
    	log.info("Pedido Máqina: erro na busca de condição de pagamento: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}