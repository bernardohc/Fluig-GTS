function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("CODVEND");
	newDataset.addColumn("CGC");
	newDataset.addColumn("NOME");
	newDataset.addColumn("EMAIL");
	newDataset.addColumn("DESCMAX");
	newDataset.addColumn("VENDMAT");
	
	try{
		
		var VENDMATFLUIG  = '';
		var VENDCGC  = '';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'VENDMATFLUIG' ) {
				VENDMATFLUIG = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'VENDCGC' ) {
				VENDCGC = constraints[i].initialValue;
			}
		}
		
		var properties = {};
//		properties["basic.authorization"] = "true";
//		properties["basic.authorization.username"] = "admin";
//		properties["basic.authorization.password"] = "pass123root!@#";
		properties["disable.chunking"] = "true";
		properties["log.soap.messages"] = "true";
		properties["receive.timeout"] = "300000"; //milissegundos 300000 igual a 5 minutos
		
		var supplierService = ServiceManager.getService('WSORCMAQ');
		var serviceHelper = supplierService.getBean();
		var serviceLocatorWSORCMAQ = serviceHelper.instantiate('br.com.protheus.WSORCMAQ');
		var service = serviceLocatorWSORCMAQ.getWSORCMAQSOAP();
		var metodosWSORCMAQ = supplierService.getCustomClient(service, "br.com.protheus.WSORCMAQSOAP", properties);

		
		var result = new Array();
		result = metodosWSORCMAQ.getvendedor(VENDMATFLUIG, VENDCGC);
		
		var CODRET = result.getWSRETVEND().get(0).getCODRET();
		if(CODRET == '1'){
			var CODVEND = result.getWSRETVEND().get(0).getCOD();
			var CGC = result.getWSRETVEND().get(0).getCGC();
			var NOME = result.getWSRETVEND().get(0).getNOME();
			var EMAIL = result.getWSRETVEND().get(0).getEMAIL();
			var DESCMAX = result.getWSRETVEND().get(0).getDESCMAX();
			var VENDMAT = result.getWSRETVEND().get(0).getVENDMAT();
			
			newDataset.addRow(new Array('1',
									'Sucesso',
									CODVEND,
									CGC,
									NOME,
									EMAIL,
									DESCMAX,
									VENDMAT
									));
		}else{
			var MSGRET = result.getWSRETVEND().get(0).getMSGRET();
			newDataset.addRow(new Array('2', MSGRET));
		}
		
		
		
    }catch(erro){    
    	log.info("Pedido Máqina: erro na busca de revenda: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}