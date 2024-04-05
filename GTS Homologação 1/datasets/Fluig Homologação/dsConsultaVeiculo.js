function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("CMSG");
	newDataset.addColumn("CDESC");

	try{
			
		var CBEM  = '';

		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'CBEM' ) {
				CBEM = constraints[i].initialValue;
			}
		}
		
		var camposValidos = true;
		if(CBEM == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Código do Veículo não preenchido'));
		}
		
		if(!camposValidos){
			return newDataset;
		}
		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'PROTHEUSGTS_REST',
	            endpoint : '/rest/WSFROTASOLVEICULO/getPlaca?CBEM='+ CBEM,
	            method : 'get',
	            timeoutService: '100', // segundos
            	headers: {
            		"Content-Type": "application/json",
                }
	        }
		
		var vo = clientService.invoke(JSON.stringify(data));
		
        if(vo.getResult()== null || vo.getResult().isEmpty()){
        	newDataset.addRow(new Array('2', "Retorno está vazio"));
        }else{
            
            var result = JSON.parse(vo.getResult());
            
            var CODRET = result.CODRET.toString();
            if( CODRET == '1'){
            	newDataset.addRow( new Array( 
            				CODRET, 
							'Sucesso', 
							result.CDESC
							));
            }else{
				var CMSG    = result.CMSG;
				newDataset.addRow(new Array('2', CMSG));
            }
           
        }
        
		
    }catch(erro){    
    	log.info("Erro na consulta do produto: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}