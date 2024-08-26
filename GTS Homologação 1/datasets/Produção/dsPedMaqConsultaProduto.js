function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("PRDFIL");
	newDataset.addColumn("PROCOD");
	newDataset.addColumn("PRODESC");
	newDataset.addColumn("PROPRCTAB2");
	newDataset.addColumn("PROPRCTAB6");
	newDataset.addColumn("PROPRCUNIT");
	newDataset.addColumn("PROPERCDESC");
	newDataset.addColumn("PROVLDSC");
	newDataset.addColumn("PRONCM");
	newDataset.addColumn("PROFINAME");
	newDataset.addColumn("PROIPIVAL");
	newDataset.addColumn("PROIPIALIQ");
	newDataset.addColumn("PROICMSVAL");
	newDataset.addColumn("PROICMSALIQ");
	newDataset.addColumn("PROICMSSTVAL");
	newDataset.addColumn("PROVALTOT");
	newDataset.addColumn("PROVLTOTLIQ");
	
	try{
		
		var PROCOD  = '';
		var PROQTD  = 1;
		var PROPORCDESC  = 0;
		var PROPRCUNIT  = '';
		var TABPRECO = '';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'PROCOD' ) {
				PROCOD = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'PROPORCDESC' ) {
				PROPORCDESC = parseFloat(constraints[i].initialValue);
			}
			if ( constraints[i].getFieldName().toString() == 'PROPRCUNIT' ) {
				PROPRCUNIT = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'TABPRECO' ) {
				TABPRECO = constraints[i].initialValue;
			}
		}
		
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

		if(TABPRECO == 'PADRAO'){
			TABPRECO = '';
		}
		
		var result = new Array();
		result = metodosWSORCMAQ.getproduto(PROCOD, PROQTD, PROPORCDESC, TABPRECO, PROPRCUNIT);
		

		for(var i=0; i < result.getWSRETPRD().size(); i++){
			var CODRET = result.getWSRETPRD().get(i).getCODRET();
			if(CODRET == '1'){
				newDataset.addRow(new Array('1',
										'Sucesso',
										result.getWSRETPRD().get(i).getPRDFIL().trim(),
										result.getWSRETPRD().get(i).getPRDCOD().trim(),
										result.getWSRETPRD().get(i).getPRDDESC(),
										result.getWSRETPRD().get(i).getPRCTAB2(),
										result.getWSRETPRD().get(i).getPRCTAB6(),
										result.getWSRETPRD().get(i).getPRCUNIT(),
										result.getWSRETPRD().get(i).getPERCDESC(),
										result.getWSRETPRD().get(i).getPRDVLDSC(),
										result.getWSRETPRD().get(i).getPRDNCM(),
										result.getWSRETPRD().get(i).getFINAME(),
										result.getWSRETPRD().get(i).getVLIPI(),
										result.getWSRETPRD().get(i).getALIQIPI(),
										result.getWSRETPRD().get(i).getVLICMS(),
										result.getWSRETPRD().get(i).getALIQICMS(),
										result.getWSRETPRD().get(i).getICMSSOL(),
										result.getWSRETPRD().get(i).getVLTOT(),
										result.getWSRETPRD().get(i).getVLTOTLIQ()
										
										));
				
			}else{
				var MSGRET = result.getWSRETPRD().get(0).getMSGRET();
				newDataset.addRow(new Array('2', MSGRET));
			}
		}
			
		
		
    }catch(erro){    
    	log.info("Pedido Máqina: erro na busca de produto: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}