function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("QTD");
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
	newDataset.addColumn("ITEMDOKIT");
	
	var A1COD  = "";
	var A1LOJA  = "";
	var B1COD  = "";
	var QTD  = "";
	var TPPEDIDO  = 'PK';
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'A1COD' ) {
			A1COD = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'A1LOJA' ) {
			A1LOJA = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'B1COD' ) {
			B1COD = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'QTD' ) {
			QTD = constraints[i].initialValue;
		}
	}
	
	
	try{
		// Conexao com webservice
		log.info(" ********* CONSULTA PRODUTOS ITENS DO KIT VIA WS INICIO ************ " )
		var periodicService = ServiceManager.getService('WSORCFLUIG');
		var serviceHelper = periodicService.getBean();
        var serviceLocator = serviceHelper.instantiate('br.com.protheus.WSORCFLUIG');
		var service = serviceLocator.getWSORCFLUIGSOAP();
		log.info(" ********* CONSULTA PRODUTOS ITENS DO KIT VIA WS INICIO - passsouuu1 ************ " )

		var arrConsultaKitProduto = new Array();
		arrConsultaKitProduto = service.consultakitproduto(A1COD, A1LOJA, B1COD, QTD, TPPEDIDO);
		var arrRetConsultaKitProduto = new Array();
		arrRetConsultaKitProduto = arrConsultaKitProduto.getWSRETCONSULTAKITPRODUTO();	
		
		for(var i=0; i < arrRetConsultaKitProduto.size(); i++){
			
			//PARA GARANTIR QUE SOMENTE O USUÁRIO TIPO GERENTE TERÁ OS VALORES DE CUSTO
			var PRCTABELA = '0,00';
			var PRCCUSTO = '0,00';
			var PRCMIN = '0,00';
			var PRCCUSTOT = '0,00';
			
			PRCTABELA = arrRetConsultaKitProduto.get(i).getPRCTABELA();
			PRCMIN = arrRetConsultaKitProduto.get(i).getPRCMIN();
			PRCCUSTOT = arrRetConsultaKitProduto.get(i).getPRCCUSTOT();
			PRCCUSTO = arrRetConsultaKitProduto.get(i).getPRCCUSTO();
			
			newDataset.addRow(new Array(
					'1',
					arrRetConsultaKitProduto.get(i).getMSGRET().trim(),
					arrRetConsultaKitProduto.get(i).getQUANTIDADE(),
					arrRetConsultaKitProduto.get(i).getCOD(),
					arrRetConsultaKitProduto.get(i).getZCODANT(),
					arrRetConsultaKitProduto.get(i).getZDESCP(),
					arrRetConsultaKitProduto.get(i).getTIPO(),
					arrRetConsultaKitProduto.get(i).getPESO(),
					arrRetConsultaKitProduto.get(i).getUNMED(),
					arrRetConsultaKitProduto.get(i).getESTOQUE(),
					arrRetConsultaKitProduto.get(i).getEMBALAGEM(),
					arrRetConsultaKitProduto.get(i).getTES(),
					arrRetConsultaKitProduto.get(i).getDESC(),
					PRCTABELA,
					PRCCUSTO,
					PRCMIN,
					arrRetConsultaKitProduto.get(i).getPRCSUGE(),
					PRCCUSTOT,
					arrRetConsultaKitProduto.get(i).getPOSIPINCM(),
					arrRetConsultaKitProduto.get(i).getIPI(),
					arrRetConsultaKitProduto.get(i).getALIQIPI(),
					arrRetConsultaKitProduto.get(i).getICMS(),
					arrRetConsultaKitProduto.get(i).getALIQICMS(),
					arrRetConsultaKitProduto.get(i).getPIS(),
					arrRetConsultaKitProduto.get(i).getCOFINS(),
					arrRetConsultaKitProduto.get(i).getICMSRET(),
					arrRetConsultaKitProduto.get(i).getCURVAABC(),
					arrRetConsultaKitProduto.get(i).getCODCRITICO(),
					arrRetConsultaKitProduto.get(i).getRECOMPRA(),
					'SIM'
					));

		}
		
		log.info(" ********* CONSULTA PRODUTOS ITENS DO KIT VIA WS INICIO - passsouuu1 ************ " )
	} catch(erro) {		
		var error = "ERROR Consulta PRODUTO de Kit :  " + erro.message;
		log.info("ERROR Consulta PRODUTO de Kit : " + error);
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