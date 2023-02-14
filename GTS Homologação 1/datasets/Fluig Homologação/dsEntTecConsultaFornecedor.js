function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("FORNRAZAOSOCIAL");
	newDataset.addColumn("FORNNFANTASIA");
	newDataset.addColumn("FORNCIDADE");
	newDataset.addColumn("FORNESTADO");
	
	try{
		
		var CNPJFornecedor  = '';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'CNPJFornecedor' ) {
				CNPJFornecedor = constraints[i].initialValue;
			}
		}
		
		var camposValidos = true;
		if(CNPJFornecedor == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'CNPJ do Fornecedor não preenchido.'));
		}
		
		if(!camposValidos){
			return newDataset;
		}
		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'PROTHEUSGTS_REST',
	            endpoint : '/rest/wsentretec/getFornecedor?cCnpj='+ CNPJFornecedor,
	            method : 'get',
	            timeoutService: '100', // segundos
            	headers: {
            		"Content-Type": "application/json"
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
							result.CRSOCIAL,
							result.CNFANTASIA,
							result.CCIDADE,
							result.CESTADO
							));
            }else{
				var MSGRET = result.MSGRET;
				newDataset.addRow(new Array('2', MSGRET));
            }
           
        }
        
		
    }catch(erro){    
    	log.info("Entrega Técnica: erro na consulta de Fornecedor: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}