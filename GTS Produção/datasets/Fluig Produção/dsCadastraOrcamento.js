function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSG");
	
	var A1COD  = '';
	var A1LOJA  = '';
	var CONDPG  = '';
	var TABPRECO  = '';
	var OBSORC  = '';
	var PERCDESC  = '';
	var TIPOPEDIDO  = '';
	var IDFLUIG  = '';
	var ITENS  = new Array();
	var CODORC  = '';
	var MATADMREV  = '';
	var CPRETIRADA  = '';
	var CPDTRETIRADA  = '';
	var CODVENDPROTHEUS  = '';
	var VEND1 = '';
	var VEND4 = '';
	var VEND5 = '';
	var VEND7 = '';
	var VEND8 = '';
	var VEND9 = '';
	var FRETE = '';
	var CODTRANSPORTADORA = '';
	var MSGNOTAREDESPACHO = '';
	var MSGNOTAKIT = '';
	var MOEDA = '';
	
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'A1COD' ) {
			A1COD = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'A1LOJA' ) {
			A1LOJA = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'CONDPG' ) {
			CONDPG = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'TABPRECO' ) {
			TABPRECO = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'OBSORC' ) {
			OBSORC = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'PERCDESC' ) {
			PERCDESC = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'TIPOPEDIDO' ) {
			TIPOPEDIDO = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'IDFLUIG' ) {
			IDFLUIG = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'ITENS' ) {
			ITENS = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'MATADMREV' ) {
			MATADMREV = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'CODVENDPROTHEUS' ) {
			CODVENDPROTHEUS = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'CPRETIRADA' ) {
			CPRETIRADA = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'CPDTRETIRADA' ) {
			CPDTRETIRADA = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'VEND1' ) {
			VEND1 = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'VEND4' ) {
			VEND4 = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'VEND5' ) {
			VEND5 = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'VEND7' ) {
			VEND7 = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'VEND8' ) {
			VEND8 = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'VEND9' ) {
			VEND9 = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'FRETE' ) {
			FRETE = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'CODTRANSPORTADORA' ) {
			CODTRANSPORTADORA = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'MSGNOTAREDESPACHO' ) {
			MSGNOTAREDESPACHO = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'MSGNOTAKIT' ) {
			MSGNOTAKIT = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'MOEDA' ) {
			MOEDA = constraints[i].initialValue;
		}
	}
	
	try{
		var properties = {};
//		properties["basic.authorization"] = "true";
//		properties["basic.authorization.username"] = "username";
//		properties["basic.authorization.password"] = "password";
		properties["disable.chunking"] = "true";
		properties["log.soap.messages"] = "true";
		properties["receive.timeout"] = "1800000"; //milissegundos 1800000 igual a 30 minutos
		
		var supplierService = ServiceManager.getService('WSORCFLUIG');
		var serviceHelper = supplierService.getBean();
		var serviceLocatorWSORCFLUIG = serviceHelper.instantiate('br.com.protheus.WSORCFLUIG');
		var service = serviceLocatorWSORCFLUIG.getWSORCFLUIGSOAP();
		var metodosWSORCFLUIG = supplierService.getCustomClient(service, "br.com.protheus.WSORCFLUIGSOAP", properties);
		
		var serviceLocatorObjectFactory= serviceHelper.instantiate('br.com.protheus.ObjectFactory');
		var itemListaRegistros = serviceLocatorObjectFactory.createITENSLIST(); //itemList é um VETORREGINCOS antigo _a
		var arrItemLista = serviceLocatorObjectFactory.createARRAYOFLISTA(); //arrItemLista é um ARRAYOFSTREG antigo _c
		var getLista = arrItemLista.getLISTA(); //getLista  eh um java.util.List<STREG> antigo _b
		
		
		var jsonItens = JSON.parse(ITENS);
		for (j = 0; j < jsonItens.length; j++) {
	        if (jsonItens[j] != null) {
	        	var criaLista = serviceLocatorObjectFactory.createLISTA();
	        	criaLista.setDADOS(jsonItens[j]);
	        	getLista.add(criaLista);
	        	criaLista = null;	
	        }
	    }
		itemListaRegistros.setREGISTROS(arrItemLista);
		
		if(MSGNOTAKIT.lenght >= 248){
			MSGNOTAKIT = MSGNOTAKIT.substring(0, 248);
		}
		//Vendedor 4 000219, é o Juliam, que saiu do setor de peças 
		if(VEND4 == '000219'){
			VEND4 = '';
		}

		//Se moeda não estiver preenchido, insere como 1 (que é Real)
		if(MOEDA == ''){
			MOEDA = '1';
		}
		
		var result = new Array();
		result = metodosWSORCFLUIG.cadastraorcped(  A1COD 
													,A1LOJA
													,CONDPG
													,TABPRECO
													,OBSORC
													,PERCDESC
													,TIPOPEDIDO
													,IDFLUIG
													,itemListaRegistros
													,CODORC
													,MATADMREV
													,CODVENDPROTHEUS
													,CPRETIRADA
													,CPDTRETIRADA
													,VEND1
													,VEND4
													,VEND5
													,VEND7
													,VEND8
													,VEND9
													,FRETE
													,CODTRANSPORTADORA
													,MSGNOTAREDESPACHO
													,MSGNOTAKIT.toUpperCase()
													,MOEDA
													); 
		
		var codRetorno = result.getWSRETORC().get(0).getCODRET();
		var msgRetorno = result.getWSRETORC().get(0).getMSG();
		
		newDataset.addRow(new Array(codRetorno, msgRetorno ));
		
    }catch(erro){    
    	log.info("Orçamento: deu erro na integração do Orçamento no ERP: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}