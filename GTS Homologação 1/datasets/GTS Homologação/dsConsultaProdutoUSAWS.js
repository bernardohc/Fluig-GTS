function defineStructure() {
	addColumn("CODRET");
	addColumn("MSG");
	addColumn("COD");
	addColumn("ZCODANT");
	addColumn("ZDESCP");
	addColumn("ZDESCPING");
	addColumn("TIPO");
	addColumn("PESO");
	addColumn("UNMED");
	addColumn("ESTOQUE");
	addColumn("EMBALAGEM");
	addColumn("TES");
	addColumn("DESC");
	addColumn("PRCTABELA");
	addColumn("PRCCUSTO");
	addColumn("PRCCUSTODOL");
	addColumn("PRCMIN");
	addColumn("PRCSUGE");
	addColumn("PRCCUSTOT");
	addColumn("PRCCUSTOTDOL");
	addColumn("POSIPINCM");
	addColumn("IPI");
	addColumn("ALIQIPI");
	addColumn("ICMS");
	addColumn("ALIQICMS");
	addColumn("PIS");
	addColumn("COFINS");
	addColumn("ICMSRET");
	addColumn("CURVAABC"); /*inserido*/
	addColumn("CODCRITICO"); /*inserido*/
	addColumn("RECOMPRA"); /*inserido*/
	
}
function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	
	var B1COD  = "";
	var A1COD  = "";
	var A1LOJA  = "";
	var QTD  = '1';
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
	}
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSG");
	newDataset.addColumn("COD");
	newDataset.addColumn("ZCODANT");
	newDataset.addColumn("ZDESCP");
	newDataset.addColumn("ZDESCPING");
	newDataset.addColumn("TIPO");
	newDataset.addColumn("PESO");
	newDataset.addColumn("UNMED");
	newDataset.addColumn("ESTOQUE");
	newDataset.addColumn("EMBALAGEM");
	newDataset.addColumn("TES");
	newDataset.addColumn("DESC");
	newDataset.addColumn("PRCTABELA");
	newDataset.addColumn("PRCCUSTO");
	newDataset.addColumn("PRCCUSTODOL");
	newDataset.addColumn("PRCMIN");
	newDataset.addColumn("PRCSUGE");
	newDataset.addColumn("PRCCUSTOT");
	newDataset.addColumn("PRCCUSTOTDOL");
	newDataset.addColumn("POSIPINCM");
	newDataset.addColumn("IPI");
	newDataset.addColumn("ALIQIPI");
	newDataset.addColumn("ICMS");
	newDataset.addColumn("ALIQICMS");
	newDataset.addColumn("PIS");
	newDataset.addColumn("COFINS");
	newDataset.addColumn("ICMSRET");
	newDataset.addColumn("CURVAABC"); /*inserido*/
	newDataset.addColumn("CODCRITICO"); /*inserido*/
	newDataset.addColumn("RECOMPRA"); /*inserido*/
	
	
	//Coloco aqui no DataSet para pesquisar se o usuário logado é um gerente, sem pegar o valor de um campo de formulário, que seria possível inserir o valor via fomrulário.
	//Assim temos mais segurança no código
	/*var A1_COD = '';
	var A1LOJADadosAdicionais = '';
	var A1_TIPO = '';
    var dsClienteViaDadosAdicionais = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
    if(dsTemValor(dsClienteViaDadosAdicionais)){
    	A1_COD = dsClienteViaDadosAdicionais.getValue(0, "A1_COD");
    	A1LOJADadosAdicionais = dsClienteViaDadosAdicionais.getValue(0, "A1_LOJA").toUpperCase();
    	A1_TIPO = dsClienteViaDadosAdicionais.getValue(0, "A1_TIPO").toUpperCase();
    }
    */
    
	
	try{
		// Conexao com webservice
		log.info(" ********* CONSULTA PRODUTOS USA VIA WS INICIO ************ " )
		var periodicService = ServiceManager.getService('WSORCFLUIG');
		var serviceHelper = periodicService.getBean();
        var serviceLocator = serviceHelper.instantiate('br.com.protheus.WSORCFLUIG');
		var service = serviceLocator.getWSORCFLUIGSOAP();
		log.info(" ********* CONSULTA PRODUTOS USA VIA WS INICIO - passsouuu1 ************ " )

		var result = new Array();
		result = service.consultaprodutodolar(A1COD, A1LOJA, B1COD, QTD);
		var result2 = new Array();
		result2 = result.getWSRETDOLAR();	
		
		
		for(var i=0; i < result2.size(); i++){
			
			//PARA GARANTIR QUE SOMENTE O USUÁRIO TIPO GERENTE TERÁ OS VALORES DE CUSTO
//			var PRCTABELA = '0,00';
//			var PRCCUSTO = '0,00';
//			var PRCMIN = '0,00';
//			var PRCCUSTOT = '0,00';
//			if( A1_TIPO.toUpperCase() == 'GERENTE'){
//				PRCTABELA = result2.get(i).getPRCTABELA();
//				PRCCUSTO = result2.get(i).getPRCCUSTO();
//				PRCMIN = result2.get(i).getPRCMIN();
//				PRCCUSTOT = result2.get(i).getPRCCUSTOT();
//			}
//			PRCCUSTO = result2.get(i).getPRCCUSTO();
			
			newDataset.addRow(new Array(
							'1',
							'Sucesso',
							result2.get(i).getCOD(),
							result2.get(i).getZCODANT(),
							result2.get(i).getZDESCP(),
							result2.get(i).getZDSCING(),
							result2.get(i).getTIPO(),
							result2.get(i).getPESO(),
							result2.get(i).getUNMED(),
							result2.get(i).getESTOQUE(),
							result2.get(i).getEMBALAGEM(),
							result2.get(i).getTES(),
							result2.get(i).getDESC(),
							result2.get(i).getPRCTABELA(),
							result2.get(i).getPRCCUSTO(),
							result2.get(i).getPRCCUSTODOL(),
							result2.get(i).getPRCMIN(),
							result2.get(i).getPRCSUGE(),
							result2.get(i).getPRCCUSTOT(),
							result2.get(i).getPRCTOTDOL(),
							result2.get(i).getPOSIPINCM(),
							result2.get(i).getIPI(),
							result2.get(i).getALIQIPI(),
							result2.get(i).getICMS(),
							result2.get(i).getALIQICMS(),
							result2.get(i).getPIS(),
							result2.get(i).getCOFINS(),
							result2.get(i).getICMSRET(),
							result2.get(i).getCURVAABC(), /*CURVAABC*/
							result2.get(i).getCODCRITICO(), /*CODCRITICO*/
							result2.get(i).getRECOMPRA(), /*RECOMPRA*/
							"SUCCESS"
							));
		}
		
		log.info(" ********* CONSULTA PRODUTOS USA VIA WS INICIO - passsouuu1 ************ " )
	} catch(erro) {		
		var error = "ERROR Consulta PRODUTO USA:  " + erro.message;
		log.info("ERROR Consulta PRODUTO USA: " + error);
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