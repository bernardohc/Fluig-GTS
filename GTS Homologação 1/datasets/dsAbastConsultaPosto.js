function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("CNPJPOSTO");
	newDataset.addColumn("NOMEPOSTO");
	
	try{
		
		var CNPJPOSTO  = '';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'CNPJPOSTO' ) {
				CNPJPOSTO = constraints[i].initialValue;
			}
		}
		
		var camposValidos = true;
		if(CNPJPOSTO == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'CNPJ do Posto não preenchido.'));
		}
		
		// Se tiver campos inválidos para busca, vai retornar o dataset, informando qual a inconsistência
		if(!camposValidos){
			return newDataset;
		}
		
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
			if(CNPJPOSTO == '11222333444455'){
				newDataset.addRow( new Array( 
        				'1', 
						'Sucesso', 
						CNPJPOSTO, 
						'NOME DO POSTO'
						));
			}else{
				
				newDataset.addRow( new Array( 
        				'2', 
						'Posto não localizado', 
						CNPJPOSTO, 
						'NOME DO POSTO'
						));
				
			}
            	
//            }else{
//				var MSGRET = result[0].MSGRET;
//				newDataset.addRow(new Array('2', MSGRET));
//            }
//           
//        }
        
    }catch(erro){    
    	log.info("Abastecimento: erro na busca do Posto: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}