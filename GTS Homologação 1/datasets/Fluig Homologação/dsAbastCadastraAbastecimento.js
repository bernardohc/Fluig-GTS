function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");

	try{
		var IDFLUIG  = '';
		var geraisCodMotorista  = '';
		var geraisCPFMotorista  = '';
		var geraisNomeMotorista  = '';
		var geraisCarimboDataHora = '';
		var geraisCarimboData = '';
		var geraisCarimboHora = '';
		var geraisPlaca = '';
		var abastCNPJPosto  = '';
		var abastNomePosto  = '';
		var abastKmAbastecimento  = '';
		var abastTpCombustivel  = '';
		var abastQtdLitros  = '';
		var abastValorLitro  = '';
		var abastValorTotal  = '';
		var abastFormaPagamento  = '';
		var abastSetor  = '';
		
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'IDFLUIG' ) {
				IDFLUIG = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'geraisCodMotorista' ) {
				geraisCodMotorista = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'geraisCPFMotorista' ) {
				geraisCPFMotorista = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'geraisNomeMotorista' ) {
				geraisNomeMotorista = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'geraisCarimboDataHora' ) {
				geraisCarimboDataHora = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'geraisPlaca' ) {
				geraisPlaca = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'abastCNPJPosto' ) {
				abastCNPJPosto = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'abastNomePosto' ) {
				abastNomePosto = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'abastKmAbastecimento' ) {
				abastKmAbastecimento = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'abastTpCombustivel' ) {
				abastTpCombustivel = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'abastQtdLitros' ) {
				abastQtdLitros = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'abastValorLitro' ) {
				abastValorLitro = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'abastValorTotal' ) {
				abastValorTotal = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'abastFormaPagamento' ) {
				abastFormaPagamento = constraints[i].initialValue.trim();
			}
			if ( constraints[i].getFieldName().toString() == 'abastSetor' ) {
				abastSetor = constraints[i].initialValue.trim();
			}
		}
		
		var camposValidos = true;
		if(IDFLUIG == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Id Fluig não preenchido.'));
		}else if( geraisCodMotorista == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Código do Motorista não preenchido.'));
		}else if( geraisCPFMotorista == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'CPF do Motorista não preenchido.'));
		}else if( geraisNomeMotorista == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Nome do Motorista não preenchido.'));
		}else if( geraisPlaca == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Placa não preenchido.'));
		}else if( abastCNPJPosto == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'CNPJ do Posto não preenchido.'));
		}else if( abastCNPJPosto == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'CNPJ do Posto não preenchido.'));
		}else if( abastNomePosto == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Nome do Posto não preenchido.'));
		}else if( abastKmAbastecimento == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Km Abastecimento não preenchido.'));
		}else if( abastTpCombustivel == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Tipo de Combustível não preenchido.'));
		}else if( abastQtdLitros == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Qtd. Listros não preenchido.'));
		}else if( abastValorLitro == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Valor Litro não preenchido.'));
		}else if( abastValorTotal == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Valor Total não preenchido.'));
		}else if( abastFormaPagamento == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Forma de Pagamento não preenchido.'));
		}else if( abastSetor == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Setor não preenchido.'));
		}
		
		if(!camposValidos){
			return newDataset;
		}
		
		//Trata campos
		geraisCPFMotorista = somenteNumeros(geraisCPFMotorista);
		
		geraisCarimboData = geraisCarimboDataHora.split(' ')[0];
		geraisCarimboHora = geraisCarimboDataHora.split(' ')[1];
		
		abastCNPJPosto = somenteNumeros(abastCNPJPosto);
		
		abastKmAbastecimento = somenteNumeros(abastKmAbastecimento);
		abastQtdLitros = formatValor(abastQtdLitros);
		abastValorLitro = formatValor(abastValorLitro);
		abastValorTotal = formatValor(abastValorTotal);
		
		
		var requestParams =  {
		    "CnpjPosto": abastCNPJPosto,
		    "NomPosto": abastNomePosto.toUpperCase(),
		    "CodMotorista": geraisCodMotorista,
		    "CpfMotorista": geraisCPFMotorista,
		    "NomMotorista": geraisNomeMotorista.toUpperCase(),
		    "Data": geraisCarimboData,
		    "Hora": geraisCarimboHora,
		    "TipoComb": abastTpCombustivel,
		    "KmAbastecimento": parseInt(abastKmAbastecimento),
		    "Placa": geraisPlaca,
		    "QtdLitros": abastQtdLitros,
		    "ValLitros": abastValorLitro,
		    "ValTotal": abastValorTotal,
		    "FormPgt": abastFormaPagamento.toUpperCase(),
		    "Setor": abastSetor.toUpperCase(),
		    "IdFluig": parseInt(IDFLUIG)
		}
		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'PROTHEUSGTS_REST',
	            endpoint : '/rest/WSFROTA/Abastecimento',
	            method : 'post',
	            params:  requestParams,
	            timeoutService: '100', // segundos
            	headers: {
            		"Content-Type": "application/json"
                }
	        }
		
		log.info('--dsCadastraAbastecimento=Parâmetros');
		log.dir(data);
		
		var vo = clientService.invoke(JSONUtil.toJSON(data));
		
        if(vo.getResult()== null || vo.getResult().isEmpty()){
        	newDataset.addRow(new Array('2', "Retorno está vazio"));
        }else{
            
            var result = JSON.parse(vo.getResult());
            log.info('--Result');
            log.dir(result);
            
            if(result.code != undefined){
            	//Só consegui assim, se colocar  result.CODRET != undefined, da erro, e não retorna a msg.
            	var message = result.code + " - " +result.message;
				newDataset.addRow(new Array('2', message));
            }else{
            	var CODRET = result.CODRET.toString();
            	if( CODRET == '1'){
                	newDataset.addRow( new Array( 
                				CODRET, 
    							'Sucesso'
    							));
                }else{
            		var MSGRET = result[0].MSGRET;
            		newDataset.addRow(new Array('2', MSGRET));
                }
            }
            
        }
	    
    }catch(erro){    
    	log.info("Abastecimento: erro no cadastro de abastecimento: " + erro);
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