function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("CIDFLUIG");

	try{
		var IDFLUIG  = '';
		var cliCodigo  = '';
		var cliLoja  = '';
		var equipCodProduto  = '';
		var equipNumSerie  = '';
		var equipNumNotaFiscal  = '';
		var equipDataVenda  = '';
		var equipDataTerminoGarantia  = '';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'IDFLUIG' ) {
				IDFLUIG = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'cliCodigo' ) {
				cliCodigo = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'cliLoja' ) {
				cliLoja = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'equipCodProduto' ) {
				equipCodProduto = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'equipNumSerie' ) {
				equipNumSerie = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'equipNumNotaFiscal' ) {
				equipNumNotaFiscal = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'equipDataVenda' ) {
				equipDataVenda = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'equipDataTerminoGarantia' ) {
				equipDataTerminoGarantia = constraints[i].initialValue.trim();
			}
		}
		
		var camposValidos = true;
		if(IDFLUIG == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Id Fluig não preenchido.'));
		}else if( cliCodigo == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Código do Cliente não preenchido.'));
		}else if( cliLoja == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Loja do Cliente não preenchido.'));
		}else if( equipCodProduto == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Código do Produto não preenchido.'));
		}else if( equipNumSerie == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Número de Série não preenchido.'));
		}else if( equipDataVenda == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Data da Venda não preenchido.'));
		}else if( equipDataTerminoGarantia == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Término de Garantia não preenchido.'));
		}
		
		if(!camposValidos){
			return newDataset;
		}
		
		
		var requestParams =  {
	        "CCODEMP": "01",
	        "CCODFILIAL": "010001", 
	        "CCODCLI": cliCodigo,
	        "CLOJACLI": cliLoja,
	        "CPRD": equipCodProduto,
	        "CNSERIE": equipNumSerie,
	        "CNOTA": equipNumNotaFiscal,
	        "CDTVEND": equipDataVenda,
	        "CDTGR": equipDataTerminoGarantia,
	        "CIDFLUIG": IDFLUIG 
		}
		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'WSENTRETEC',
	            endpoint : '/rest/wsentretec/postBaseAtend',
	            method : 'post',
//	            params:  JSON.parse(requestParams),
	            params:  requestParams,
	            timeoutService: '100', // segundos
            	headers: {
            		"Content-Type": "application/json"
                }
	        }
		
		log.info('--dsEntTecCadastraBaseDeAtendimento=Parâmetros');
		log.dir(data);
		
//		var vo = clientService.invoke(JSON.stringify(data));
		var vo = clientService.invoke(JSONUtil.toJSON(data));
		
        if(vo.getResult()== null || vo.getResult().isEmpty()){
        	newDataset.addRow(new Array('2', "Retorno está vazio"));
        }else{
            
            var result = JSON.parse(vo.getResult());
            log.info('--Result');
            log.dir(result);
            
            if(result.code != undefined){
            	//Só consegui assim, se colocar  result[0].CODRET != undefined, da erro, e não retorna a msg.
            	var message = result.code + " - " +result.message;
				newDataset.addRow(new Array('2', message));
            }else{
            	var CODRET = result[0].CODRET.toString();
            	if( CODRET == '1'){
                	newDataset.addRow( new Array( 
                				CODRET, 
    							'Sucesso', 
    							result[0].CIDFLUIG
    							));
                }else{
            		var MSGRET = result[0].MSGRET;
            		newDataset.addRow(new Array('2', MSGRET));
                }
            }
            
        }
	        
    }catch(erro){    
    	log.info("Entrega Técnica: erro no cadastro de base de atendimento: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}
