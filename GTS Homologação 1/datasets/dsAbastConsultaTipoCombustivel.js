function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("CODCOMBUSTIVEL");
	newDataset.addColumn("DESCCOMBUSTIVEL");
	
	try{
		
//		var clientService = fluigAPI.getAuthorizeClientService();
//		var data = {
//	            companyId : getValue("WKCompany") + '',
//	            serviceCode : 'WSABAST',
//	            endpoint : '/rest/wsentretec/getPosto?ccod='+A1_COD,
//	            method : 'get',
//	            timeoutService: '100', // segundos
//            	headers: {
//            		"Content-Type": "application/json"
//                }
//	        }
//		
//		var vo = clientService.invoke(JSON.stringify(data));
//		
//        if(vo.getResult()== null || vo.getResult().isEmpty()){
//            newDataset.addRow(new Array('2', "Retorno está vazio"));
//        }else{
//            
//            var result = JSON.parse(vo.getResult());
//            
//            var CODRET = result[0].CODRET.toString();
//            if( CODRET == '1'){
            	newDataset.addRow( new Array( 
            				'1', 
							'Sucesso', 
							'001', 
							'S 10'
							));
            	newDataset.addRow( new Array( 
            			'1', 
            			'Sucesso', 
            			'002', 
            			'ARLA'
            	));
            	newDataset.addRow( new Array( 
            			'1', 
            			'Sucesso', 
            			'003', 
            			'GASOLINA'
            	));
            	newDataset.addRow( new Array( 
            			'1', 
            			'Sucesso', 
            			'004', 
            			'ETANOL'
            	));
//            }else{
//				var MSGRET = result[0].MSGRET;
//				newDataset.addRow(new Array('2', MSGRET));
//            }
//           
//        }
        
    }catch(erro){    
    	log.info("Abastecimento: erro na busca do tipo de combustível: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}