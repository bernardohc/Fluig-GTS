function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSG");
	newDataset.addColumn("COD");
	newDataset.addColumn("ZCODANT");
	newDataset.addColumn("ZDESCP");
	newDataset.addColumn("TIPO");
	newDataset.addColumn("PESO");
	newDataset.addColumn("UNMED");
	newDataset.addColumn("ESTOQUE");
	newDataset.addColumn("EMBALAGEM");
	newDataset.addColumn("TES");
	newDataset.addColumn("DESC");
	newDataset.addColumn("PRCTABELA");
	newDataset.addColumn("PRCCUSTO");
	newDataset.addColumn("PRCMIN");
	newDataset.addColumn("PRCSUGE");
	newDataset.addColumn("PRCCUSTOT");
	newDataset.addColumn("POSIPINCM");
	newDataset.addColumn("IPI");
	newDataset.addColumn("ALIQIPI");
	newDataset.addColumn("ICMS");
	newDataset.addColumn("ALIQICMS");
	newDataset.addColumn("PIS");
	newDataset.addColumn("COFINS");
	newDataset.addColumn("ICMSRET");
	newDataset.addColumn("CURVAABC");
	newDataset.addColumn("CODCRITICO");
	newDataset.addColumn("RECOMPRA");
	newDataset.addColumn("KIT");
	
	var B1COD  = "";
	var A1COD  = "";
	var A1LOJA  = "";
	var QTD  = '1';
	var DESC  = '0';
	var FLDESC  = 'N';
	var TPPEDIDO  = '';
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'B1COD' ) {
			B1COD = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'A1COD' ) {
			A1COD = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'A1LOJA' ) {
			A1LOJA = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'QTD' ) {
			QTD = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'DESC' ) {
			DESC = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'FLDESC' ) {
			FLDESC = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'TPPEDIDO' ) {
			TPPEDIDO = constraints[i].initialValue;
		}
	}
	
	
	//Coloco aqui no DataSet para pesquisar se o usuário logado é um gerente, sem pegar o valor de um campo de formulário, que seria possível inserir o valor via fomrulário.
	//Assim temos mais segurança no código
	var A1_COD = '';
	var A1LOJADadosAdicionais = '';
	var A1_TIPO = '';
    var dsClienteViaDadosAdicionais = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
    if(dsTemValor(dsClienteViaDadosAdicionais)){
    	A1_COD = dsClienteViaDadosAdicionais.getValue(0, "A1_COD");
    	A1LOJADadosAdicionais = dsClienteViaDadosAdicionais.getValue(0, "A1_LOJA").toUpperCase();
    	A1_TIPO = dsClienteViaDadosAdicionais.getValue(0, "A1_TIPO").toUpperCase();
    }
    
    
	
	try{
		// Conexao com webservice
		log.info(" ********* CONSULTA PRODUTOS VIA WS INICIO ************ " )
		var periodicService = ServiceManager.getService('WSORCFLUIG');
		var serviceHelper = periodicService.getBean();
        var serviceLocator = serviceHelper.instantiate('br.com.protheus.WSORCFLUIG');
		var service = serviceLocator.getWSORCFLUIGSOAP();
		log.info(" ********* CONSULTA PRODUTOS VIA WS INICIO - passsouuu1 ************ " )

		var arrConsultaProduto = new Array();
		arrConsultaProduto = service.consultaproduto(A1COD, A1LOJA, B1COD, QTD, DESC, FLDESC, TPPEDIDO);
		var arrRetConsultaProduto = new Array();
		arrRetConsultaProduto = arrConsultaProduto.getWSRETCONSULTAPRODUTO();	
		
		
		for(var i=0; i < arrRetConsultaProduto.size(); i++){
			
			//PARA GARANTIR QUE SOMENTE O USUÁRIO TIPO GERENTE TERÁ OS VALORES DE CUSTO
			var PRCTABELA = '0,00';
			var PRCCUSTO = '0,00';
			var PRCMIN = '0,00';
			var PRCCUSTOT = '0,00';
			
			PRCTABELA = arrRetConsultaProduto.get(i).getPRCTABELA();
			PRCMIN = arrRetConsultaProduto.get(i).getPRCMIN();
			PRCCUSTOT = arrRetConsultaProduto.get(i).getPRCCUSTOT();
			PRCCUSTO = arrRetConsultaProduto.get(i).getPRCCUSTO();
			
			newDataset.addRow(new Array(
							'1',
							'Sucesso',
							arrRetConsultaProduto.get(i).getCOD(),
							arrRetConsultaProduto.get(i).getZCODANT(),
							arrRetConsultaProduto.get(i).getZDESCP(),
							arrRetConsultaProduto.get(i).getTIPO(),
							arrRetConsultaProduto.get(i).getPESO(),
							arrRetConsultaProduto.get(i).getUNMED(),
							arrRetConsultaProduto.get(i).getESTOQUE(),
							arrRetConsultaProduto.get(i).getEMBALAGEM(),
							arrRetConsultaProduto.get(i).getTES(),
							arrRetConsultaProduto.get(i).getDESC(),
							PRCTABELA,
							PRCCUSTO,
							PRCMIN,
							arrRetConsultaProduto.get(i).getPRCSUGE(),
							PRCCUSTOT,
							arrRetConsultaProduto.get(i).getPOSIPINCM(),
							arrRetConsultaProduto.get(i).getIPI(),
							arrRetConsultaProduto.get(i).getALIQIPI(),
							arrRetConsultaProduto.get(i).getICMS(),
							arrRetConsultaProduto.get(i).getALIQICMS(),
							arrRetConsultaProduto.get(i).getPIS(),
							arrRetConsultaProduto.get(i).getCOFINS(),
							arrRetConsultaProduto.get(i).getICMSRET(),
							arrRetConsultaProduto.get(i).getCURVAABC(),
							arrRetConsultaProduto.get(i).getCODCRITICO(),
							arrRetConsultaProduto.get(i).getRECOMPRA(),
							arrRetConsultaProduto.get(i).getKIT()
							));
		}
		
		log.info(" ********* CONSULTA PRODUTOS VIA WS INICIO - passsouuu1 ************ " )
	} catch(erro) {		
		var error = "ERROR Consulta PRODUTO :  " + erro.message;
		log.info("ERROR Consulta PRODUTO : " + error);
		newDataset.addRow(new Array("2", error));
		
	}
	
	return newDataset;
}

function dsTemValor(dataset){
	if(dataset != null && dataset != undefined && dataset.rowsCount > 0){
		return true;
	}else{
		return false;
	}
}