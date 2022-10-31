function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("NUMOC");

	
	try{
		var OCCpfCnpj  = '';
		var OCCodCondPagto  = '';
		var OCCodProduto  = '';
		var OCCentroCusto  = '';
		var OCValorNota = ''
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'OCCpfCnpj' ) {
				OCCpfCnpj = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'OCCodCondPagto' ) {
				OCCodCondPagto = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'OCCodProduto' ) {
				OCCodProduto = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'OCCentroCusto' ) {
				OCCentroCusto = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'OCValorNota' ) {
				OCValorNota = constraints[i].initialValue.trim();
			}
		}
		
		var camposValidos = true;
		if(OCCpfCnpj == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'CPF/CNPJ não preenchido.'));
		}else if(OCCodCondPagto == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Código da Condição de Pagamento não preenchido.'));
		}else if(OCCodProduto == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Código do Produto não preenchido.'));
		}else if(OCCentroCusto == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Centro de Custo não preenchido.'));
		}else if(OCValorNota == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Valor da Nota não preenchido.'));
		}
		
		if(!camposValidos){
			return newDataset;
		}
		
		
		var requestParams =  {
		    "CCGCFORN":somenteNumeros(OCCpfCnpj),
		    "CCODEMP": "01",
		    "CCODFILIAL": "010001", 
		    "CCONDPAG": OCCodCondPagto,
		    "NMOEDA": 1, 
		    "ITENS": [
		        {
		            "CCODPRD": OCCodProduto,
		            "NQUANT": 1,
		            "NPRECO": formatValor(OCValorNota),
		            "NTOTAL": formatValor(OCValorNota),
		            "CCUSTO": OCCentroCusto,
		            "ALTERA": "N",
		            "EXCLUI": "N"
		        } 
		    ],
		    "ALTERA": "N",
		    "EXCLUI": "N"
		}
		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'WSENTRETEC',
	            endpoint : '/rest/wsentretec/postOrdCompra',
	            method : 'post',
//	            params:  JSON.parse(requestParams),
	            params:  requestParams,
	            timeoutService: '100', // segundos
            	headers: {
            		"Content-Type": "application/json"
                }
	        }
		
		
//		var vo = clientService.invoke(JSON.stringify(data));
		var vo = clientService.invoke(JSONUtil.toJSON(data));
		
		
        if(vo.getResult()== null || vo.getResult().isEmpty()){
        	newDataset.addRow(new Array('2', "Retorno está vazio"));
        }else{
            
            var result = JSON.parse(vo.getResult());
            
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
								result[0].CNUMPED
								));
	            }else{
					var MSGRET = result[0].MSGRET;
					newDataset.addRow(new Array('2', MSGRET));
	            }
            }
           
        }
	        
    }catch(erro){    
    	log.info("Entrega Técnica: erro no cadastro de OC: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}

function somenteNumeros(valor){
//	valor = valor.replace('/[^0-9]/g', '');
	valor = valor.replace('.', '');
	valor = valor.replace('.', '');
	valor = valor.replace('.', '');
	valor = valor.replace('.', '');
	valor = valor.replace('.', '');
	valor = valor.replace('/', '');
	valor = valor.replace('/', '');
	valor = valor.replace('/', '');
	valor = valor.replace('/', '');
	valor = valor.replace('/', '');
	valor = valor.replace('-', '');
	valor = valor.replace('-', '');
	valor = valor.replace('-', '');
	valor = valor.replace('-', '');
	valor = valor.replace('-', '');
	return valor;
}

function formatValor(valor) {
    //Entrada do valor 12.345,678
	//Saída do valor 12345.678

	//Vai trocar o . e % por nada
//	var pattern = new RegExp('[\d.%]', 'g');
//	valor = valor.replace(pattern, '');
    
	//Esse replace acima não funcionava, então coloquei vários replaces de . por nada
	valor = valor.replace('.', '');
	valor = valor.replace('.', '');
	valor = valor.replace('.', '');
	valor = valor.replace('.', '');
	valor = valor.replace('.', '');
	
	//Vai trocar a , e . para as casas decimais
	valor = valor.replace(',', '.');
	
	//Converte para Float
	valor = parseFloat(valor);
    
	return valor;
}