function createDataset(fields, constraints, sortFields) {
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch(e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {
	var serviceData = data();
	var params = serviceData.inputValues;
	var assigns = serviceData.inputAssignments;

	verifyConstraints(serviceData.inputValues, constraints);

	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getWSORCMAQSOAP();
	var response = service.getproduto(getParamValue(params.prdcod, assigns.prdcod), getParamValue(params.prdqtd, assigns.prdqtd), 
		getParamValue(params.prddsc, assigns.prddsc), getParamValue(params.tblprc, assigns.tblprc), 
		getParamValue(params.vlrprd, assigns.vlrprd));

	return response;
}

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
	var objectFactory = serviceHelper.instantiate("br.com.cloudtotvs.protheus.gtsdo142364._8300.ws.ObjectFactory");

	return objectFactory;
}



function data() {
	return {
  "fluigService" : "WSORCMAQ",
  "operation" : "getproduto",
  "soapService" : "WSORCMAQ",
  "portType" : "WSORCMAQSOAP",
  "locatorClass" : "br.com.cloudtotvs.protheus.gtsdo142364._8300.ws.WSORCMAQ",
  "portTypeMethod" : "getWSORCMAQSOAP",
  "parameters" : [ ],
  "inputValues" : {
    "prdcod" : "IPCX03002003",
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