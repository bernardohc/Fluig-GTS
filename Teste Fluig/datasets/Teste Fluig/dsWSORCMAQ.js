function createDataset(fields, constraints, sortFields) {
	//ultimas funções a rodar
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch(e) {
		return processErrorResult(e, constraints);
	}
}
//Função responsavel por estanciar o ws
function callService(fields, constraints, sortFields) {
	//objetos que recebe os dados da função data no final do fonte
	var serviceData = data();
	//Recebe o parametro para consulta ex: prdcod
	var params = serviceData.inputValues;
	var assigns = serviceData.inputAssignments;

	//Verifica se possui constraints (Filtros) para passar durante a requisição
	verifyConstraints(serviceData.inputValues, constraints);

	//Captura o codigo do serviço
	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	//Estanciar o serviço, endereço so ws
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	//Pega o metodo enviado na requisição
	var service = serviceLocator.getWSORCMAQSOAP();
	//service junto com a operação e parametros
	var response = service.getproduto(getParamValue(params.prdcod, assigns.prdcod), getParamValue(params.prdqtd, assigns.prdqtd), 
		getParamValue(params.prddsc, assigns.prddsc), getParamValue(params.tblprc, assigns.tblprc), 
		getParamValue(params.vlrprd, assigns.vlrprd));

	return response;
}

//Define a estrutura do retorno
function defineStructure() {
		addColumn("aLIQICMS");
	addColumn("aLIQIPI");
	addColumn("cODRET");
	addColumn("fINAME");
	addColumn("iCMSSOL");
	addColumn("mSGRET");
	addColumn("pERCDESC");
	addColumn("pRCTAB2");
	addColumn("pRCTAB6");
	addColumn("pRCUNIT");
	addColumn("pRDCOD");
	addColumn("pRDDESC");
	addColumn("pRDFIL");
	addColumn("pRDNCM");
	addColumn("pRDVLDSC");
	addColumn("vLICMS");
	addColumn("vLIPI");
	addColumn("vLTOT");
	addColumn("vLTOTLIQ");
}

//Função para dataset jornalizado com sincronização.
function onSync(lastSyncDate) {
	var serviceData = data();
	var synchronizedDataset = DatasetBuilder.newDataset();

	try {
		var resultDataset = processResult(callService());
		if (resultDataset != null) {
			var values = resultDataset.getValues();
			for (var i = 0; i < values.length; i++) {
				synchronizedDataset.addRow(values[i]);
			}
		}

	} catch(e) {
		log.info('Dataset synchronization error : ' + e.message);

	}
	return synchronizedDataset;
}

//Verificação das constraints
function verifyConstraints(params, constraints) {
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			try {
				params[constraints[i].fieldName] = JSON.parse(constraints[i].initialValue);
			} catch(e) {
				params[constraints[i].fieldName] = constraints[i].initialValue;
			}
		}
	}
}

//Função com o resultado do dataset
function processResult(result) {
	var dataset = DatasetBuilder.newDataset();

	result = result.getWSRETPRD();

		dataset.addColumn("aLIQICMS");
	dataset.addColumn("aLIQIPI");
	dataset.addColumn("cODRET");
	dataset.addColumn("fINAME");
	dataset.addColumn("iCMSSOL");
	dataset.addColumn("mSGRET");
	dataset.addColumn("pERCDESC");
	dataset.addColumn("pRCTAB2");
	dataset.addColumn("pRCTAB6");
	dataset.addColumn("pRCUNIT");
	dataset.addColumn("pRDCOD");
	dataset.addColumn("pRDDESC");
	dataset.addColumn("pRDFIL");
	dataset.addColumn("pRDNCM");
	dataset.addColumn("pRDVLDSC");
	dataset.addColumn("vLICMS");
	dataset.addColumn("vLIPI");
	dataset.addColumn("vLTOT");
	dataset.addColumn("vLTOTLIQ");

	for (var i = 0; i < result.size(); i++) {
		dataset.addRow([result.get(i).getALIQICMS(), result.get(i).getALIQIPI(), result.get(i).getCODRET(), result.get(i).getFINAME(), result.get(i).getICMSSOL(), result.get(i).getMSGRET(), result.get(i).getPERCDESC(), result.get(i).getPRCTAB2(), result.get(i).getPRCTAB6(), result.get(i).getPRCUNIT(), result.get(i).getPRDCOD(), result.get(i).getPRDDESC(), result.get(i).getPRDFIL(), result.get(i).getPRDNCM(), result.get(i).getPRDVLDSC(), result.get(i).getVLICMS(), result.get(i).getVLIPI(), result.get(i).getVLTOT(), result.get(i).getVLTOTLIQ()]);
	}

	return dataset;
}

//função caso de erro na consulta do dataset
function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();

	var params = data().inputValues;
verifyConstraints(params, constraints);

dataset.addColumn('error');
	dataset.addColumn('prdcod');
	dataset.addColumn('vlrprd');
	dataset.addColumn('prddsc');
	dataset.addColumn('tblprc');
	dataset.addColumn('prdqtd');

	var prdcod = isPrimitive(params.prdcod) ? params.prdcod : JSONUtil.toJSON(params.prdcod);
	var vlrprd = isPrimitive(params.vlrprd) ? params.vlrprd : JSONUtil.toJSON(params.vlrprd);
	var prddsc = isPrimitive(params.prddsc) ? params.prddsc : JSONUtil.toJSON(params.prddsc);
	var tblprc = isPrimitive(params.tblprc) ? params.tblprc : JSONUtil.toJSON(params.tblprc);
	var prdqtd = isPrimitive(params.prdqtd) ? params.prdqtd : JSONUtil.toJSON(params.prdqtd);

	dataset.addRow([error.message, prdcod, vlrprd, prddsc, tblprc, prdqtd]);

	return dataset;
}

function getParamValue(param, assignment) {
	if (assignment == 'VARIABLE') {
		return getValue(param);
	} else if (assignment == 'NULL') {
		return null;
	}
	return param;
}

function hasValue(value) {
	return value !== null && value !== undefined;
}

function isPrimitive(value) {
	return ((typeof value === 'string') || value.substring !== undefined) || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined';
}


function getObjectFactory(serviceHelper) {
	var objectFactory = serviceHelper.instantiate("br.com.protheus.ObjectFactory");

	return objectFactory;
}


//Função com todas informaçõe essenciais do servico
function data() {
	return {
  "fluigService" : "WSORCMAQ",
  "operation" : "getproduto",
  "soapService" : "WSORCMAQ",
  "portType" : "WSORCMAQSOAP",
  "locatorClass" : "br.com.protheus.WSORCMAQ",
  "portTypeMethod" : "getWSORCMAQSOAP",
  "parameters" : [ ],
  "inputValues" : {
    "prdcod" : "",
    "vlrprd" : "",
    "prddsc" : 0,
    "tblprc" : "011",
    "prdqtd" : 0
  },
  "inputAssignments" : {
    "prdcod" : "VALUE",
    "vlrprd" : "VALUE",
    "prddsc" : "VALUE",
    "tblprc" : "VALUE",
    "prdqtd" : "VALUE"
  },
  "outputValues" : { },
  "outputAssignments" : { },
  "extraParams" : {
    "enabled" : false
  }
}
}

 function stringToBoolean(param) { if(typeof(param) === 'boolean') {  return param;  }  if (param == null || param === 'null') {  return false;  }  switch(param.toLowerCase().trim()) {  case 'true': case 'yes': case '1': return true;  case 'false': case 'no': case '0': case null: return false;  default: return Boolean(param);  }  } 