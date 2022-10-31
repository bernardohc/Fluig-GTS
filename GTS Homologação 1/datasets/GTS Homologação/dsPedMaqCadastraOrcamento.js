function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	
	try{

		var FILIAL  = '';
		var CODCLI  = '';
		var LOJACLI  = '';
		var TABELA  = '';
		var IDFLUIG  = 0;
		var CONDPGTO  = '';
		var PORCDESC  = 0;
		var TPFRETE  = '';
		var FRETE  = 0;
		var REPTIPO  = '';
		var VEND1  = '';
		var VEND2  = '';
		var VEND3  = '';
		var VEND5  = '';
		
		var CAB  = new Array();
		var ITENS  = new Array();
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'CAB' ) {
				CAB = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'ITENS' ) {
				ITENS = constraints[i].initialValue;
			}
			
		}
		
		
		var properties = {};
//		properties["basic.authorization"] = "true";
//		properties["basic.authorization.username"] = "username";
//		properties["basic.authorization.password"] = "password";
		properties["disable.chunking"] = "true";
		properties["log.soap.messages"] = "true";
		properties["receive.timeout"] = "300000"; //milissegundos 300000 igual a 5 minutos
		
		var supplierService = ServiceManager.getService('WSORCMAQ');
		var serviceHelper = supplierService.getBean();
		var serviceLocatorWSORCMAQ = serviceHelper.instantiate('br.com.protheus.WSORCMAQ');
		var service = serviceLocatorWSORCMAQ.getWSORCMAQSOAP();
		var metodosWSORCMAQ = supplierService.getCustomClient(service, "br.com.protheus.WSORCMAQSOAP", properties);
		var serviceLocatorObjectFactory= serviceHelper.instantiate('br.com.protheus.ObjectFactory');
		
		//Cabeçalho
		var WSCABORC = serviceLocatorObjectFactory.createWSCABORC();
		
		//Parse o dados do Cabeçalho via JSON
		var jsonCab = JSON.parse(CAB);
		
		//Aqui vai vincular o campo em cada variável, porque pode ser que futuramente seja inserido um novo campo
		//e as solicitações antigas precisam continuar funcionando utilizando este dataset.
		FILIAL = jsonCab[0].FILIAL;
		CODCLI = jsonCab[0].CODCLI;
		LOJACLI = jsonCab[0].LOJACLI;
		TABELA = jsonCab[0].TABELA;
		IDFLUIG = jsonCab[0].IDFLUIG;
		CONDPGTO = jsonCab[0].CONDPGTO;
		PORCDESC = parseFloat(jsonCab[0].PORCDESC);
		if(jsonCab[0].TPFRETE.trim() == "CIF"){
			TPFRETE = "C";
		}else if(jsonCab[0].TPFRETE.trim() == "FOB"){
			TPFRETE = "F";
		}else{
			TPFRETE = "";
		}
		FRETE = ( jsonCab[0].FRETE.trim() == "" ) ?  parseFloat(0) : formatValor(jsonCab[0].FRETE) ;
		REPTIPO = jsonCab[0].REPTIPO;
		VEND1 = jsonCab[0].VEND1;
		VEND2 = jsonCab[0].VEND2;
		VEND5 = jsonCab[0].VEND5;
		
		//Se for selecionado um representante NACIONAL ou um gestor territorial 
		if( REPTIPO == 'RepresentanteNacional' || VEND5 != "" ){
			VEND3 = '000008';
		}
		
		//Se for um pedido de Representante Exportação, alimenta o campo VEND5 com o código 000559
		if( REPTIPO == 'RepresentanteExportacao' ){
			VEND5 = '000559';
		}
		
//		Quando tiver um novo campo, incluir assim
//		if(jsonItens[j].NovoCampo != null){
//		}
		//Seta todos os campos no WSCABORC
		WSCABORC.setFILIAL(FILIAL);
		WSCABORC.setCODCLI(CODCLI);
		WSCABORC.setLOJACLI(LOJACLI);
		WSCABORC.setTABELA(TABELA);
		WSCABORC.setIDFLUIG(IDFLUIG);
		WSCABORC.setCONDPGTO(CONDPGTO);
		WSCABORC.setDESC(PORCDESC);
		WSCABORC.setTPFRETE(TPFRETE);
		WSCABORC.setFRETE(FRETE);
		WSCABORC.setVEND1(VEND1); //representante
		WSCABORC.setVEND2(VEND2); //revenda
		WSCABORC.setVEND3(VEND3); //(Se for selecionado um representante NACIONAL ou um gestor territorial vai preencher como 000008)
		WSCABORC.setVEND5(VEND5); //gestor territorial
		
		
		//Itens
		//Div de itens
		var ARRAYOFWSITENSORC = serviceLocatorObjectFactory.createARRAYOFWSITENSORC(); 
		//Div para alimentar os itens
		var setWSITENSORC = ARRAYOFWSITENSORC.getWSITENSORC(); 
		
		//Parse o dados dos itens via JSON
		var jsonItens = JSON.parse(ITENS);
		
		for (j = 0; j < jsonItens.length; j++) {
	        if (jsonItens[j] != null) {
	        	var WSITENSORC = serviceLocatorObjectFactory.createWSITENSORC();
        		WSITENSORC.setQTDPRD(1);
        		WSITENSORC.setCODPRD(jsonItens[j].CODPRD);
        		WSITENSORC.setVLRTAB( formatValor(jsonItens[j].VLRTAB)  );
        		WSITENSORC.setDSCNT( formatValor(jsonItens[j].DSCNT) );

        		var DTPREVEMBARQUE = "";
        		if(jsonItens[j].DTPREVEMBARQUE != undefined){
        			DTPREVEMBARQUE = jsonItens[j].DTPREVEMBARQUE;
        		}
        		WSITENSORC.setDTENTR( DTPREVEMBARQUE );
        		
        		var VLRPRD = "0";
        		if(jsonItens[j].VLRPRD != undefined){
        			VLRPRD = formatValor(jsonItens[j].VLRPRD);
        		}
        		WSITENSORC.setVLRPRD( VLRPRD );
	    		
	    		setWSITENSORC.add(WSITENSORC);
	    		WSITENSORC = null;
	        }
	    }
		
		
		//Seta cabeçalho e itens
		var WSDADOSORC = serviceLocatorObjectFactory.createWSORC();
		WSDADOSORC.setCAB(WSCABORC);
		WSDADOSORC.setITENS(ARRAYOFWSITENSORC);
		log.info('Requisição Cabeçalho e Itens');
		log.dir(WSDADOSORC);
		
		var result = metodosWSORCMAQ.setorcamento(WSDADOSORC);
		var codRetorno = result.getWSRETCAD().get(0).getCODRET();
		var msgRetorno = result.getWSRETCAD().get(0).getMSGRET();
		newDataset.addRow(new Array(codRetorno, msgRetorno ));
		
    }catch(erro){    
    	log.info("Pedido de Máquina: erro na Integração do Orçamento no ERP: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}

function formatValor(valor) {
    //Entrada do valor 12.345,678
	//Saída do valor 12345.678

	//Vai trocar o . e % por nada
	var pattern = new RegExp('[\d.%]', 'g')
	valor = valor.replace(pattern, '');
    
	//Vai trocar a , e . para as casas decimais
	valor = valor.replace(',', '.');
    return valor;
}

function formatMoney(valor) {
    //Entrada do valor 00000,00
	//Saída do valor 00.000,00
	valor = new String(valor);

    var re = '\\d(?=(\\d{3})(\\D|$))';
    valor = valor.replace(new RegExp(re, 'g'), '$&' + ('.' || ',') );
    
    return valor;
}
