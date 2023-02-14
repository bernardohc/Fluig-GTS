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

	verifyConstraints(serviceData.inputValues, constraints);

	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getColleagueServicePort();
	
	for (var i in constraints) {
		if(constraints[i]['fieldName'] == "colleagueId") {
			params.colleagues[0].colleagueId = constraints[i]['finalValue'];
		}
		else if(constraints[i]['fieldName'] == "colleagueName") {
			params.colleagues[0].colleagueName = constraints[i]['finalValue'];
		}
		else if(constraints[i]['fieldName'] == "login") {
			params.colleagues[0].login = constraints[i]['finalValue'];
		}
		else if(constraints[i]['fieldName'] == "mail") {
			params.colleagues[0].mail = constraints[i]['finalValue'];
		}
		else if(constraints[i]['fieldName'] == "passwd") {
			params.colleagues[0].passwd = constraints[i]['finalValue'];
		}
	}
	
	var response = service.createColleague(params.username, params.password, 
		params.companyId, fillColleagueDtoArray(serviceHelper, params.colleagues)
		);

	return response;
}

function defineStructure() {
		addColumn('response');
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

	dataset.addColumn("response");
	dataset.addRow([result]);

	return dataset;
}

function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();

	var params = data().inputValues;
verifyConstraints(params, constraints);

dataset.addColumn('error');
	dataset.addColumn('password');
	dataset.addColumn('companyId');
	dataset.addColumn('colleagues');
	dataset.addColumn('username');

	var password = isPrimitive(params.password) ? params.password : JSONUtil.toJSON(params.password);
	var companyId = isPrimitive(params.companyId) ? params.companyId : JSONUtil.toJSON(params.companyId);
	var colleagues = isPrimitive(params.colleagues) ? params.colleagues : JSONUtil.toJSON(params.colleagues);
	var username = isPrimitive(params.username) ? params.username : JSONUtil.toJSON(params.username);

	dataset.addRow([error.message, password, companyId, colleagues, username]);

	return dataset;
}

function isPrimitive(value) {
	return ((typeof value === 'string') || value.substring !== undefined) || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined';
}


function fillColleagueDto(serviceHelper, params) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.foundation.ws.ColleagueDto");

	if (params.active) { result.setActive(params.active); }
	if (params.adminUser) { result.setAdminUser(params.adminUser); }
	if (params.area1Id) { result.setArea1Id(params.area1Id); }
	if (params.area2Id) { result.setArea2Id(params.area2Id); }
	if (params.area3Id) { result.setArea3Id(params.area3Id); }
	if (params.area4Id) { result.setArea4Id(params.area4Id); }
	if (params.area5Id) { result.setArea5Id(params.area5Id); }
	if (params.colleagueId) { result.setColleagueId(params.colleagueId); }
	if (params.colleagueName) { result.setColleagueName(params.colleagueName); }
	if (params.colleaguebackground) { result.setColleaguebackground(params.colleaguebackground); }
	if (params.companyId) { result.setCompanyId(params.companyId); }
	if (params.currentProject) { result.setCurrentProject(params.currentProject); }
	if (params.defaultLanguage) { result.setDefaultLanguage(params.defaultLanguage); }
	if (params.dialectId) { result.setDialectId(params.dialectId); }
	if (params.ecmVersion) { result.setEcmVersion(params.ecmVersion); }
	if (params.emailHtml) { result.setEmailHtml(params.emailHtml); }
	if (params.especializationArea) { result.setEspecializationArea(params.especializationArea); }
	if (params.extensionNr) { result.setExtensionNr(params.extensionNr); }
	if (params.gedUser) { result.setGedUser(params.gedUser); }
	if (params.groupId) { result.setGroupId(params.groupId); }
	if (params.guestUser) { result.setGuestUser(params.guestUser); }
	if (params.homePage) { result.setHomePage(params.homePage); }
	if (params.login) { result.setLogin(params.login); }
	if (params.mail) { result.setMail(params.mail); }
	if (params.maxPrivateSize) { result.setMaxPrivateSize(params.maxPrivateSize); }
	if (params.menuConfig) { result.setMenuConfig(params.menuConfig); }
	if (params.nominalUser) { result.setNominalUser(params.nominalUser); }
	if (params.passwd) { result.setPasswd(params.passwd); }
	if (params.photoPath) { result.setPhotoPath(params.photoPath); }
	if (params.rowId) { result.setRowId(params.rowId); }
	if (params.sessionId) { result.setSessionId(params.sessionId); }
	if (params.usedSpace) { result.setUsedSpace(params.usedSpace); }
	if (params.volumeId) { result.setVolumeId(params.volumeId); }
	
	return result;
}

function fillColleagueDtoArray(serviceHelper, params) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.foundation.ws.ColleagueDtoArray");

	for (var i = 0; i < params.length; i++) {
		result.getItem().add(fillColleagueDto(serviceHelper, params[i]));
	}

	return result;
}

function getObjectFactory(serviceHelper) {
	var objectFactory = serviceHelper.instantiate("com.totvs.technology.ecm.foundation.ws.ObjectFactory");

	return objectFactory;
}



function data() {
	return {
  "fluigService" : "ECMColleagueService",
  "operation" : "createColleague",
  "soapService" : "ECMColleagueServiceService",
  "portType" : "ColleagueService",
  "locatorClass" : "com.totvs.technology.ecm.foundation.ws.ECMColleagueServiceService",
  "portTypeMethod" : "getColleagueServicePort",
  "parameters" : [ ],
  "inputValues" : {
    "password" : "caio.rodrigues",
    "companyId" : 1,
    "colleagues" : [ {
      "active" : true,
      "adminUser" : false,
      "colleagueId" : "maria.silva",
      "colleagueName" : "Maria Silva",
      "login" : "maria.silva",
      "mail" : "maria.silva@fluigacademy.com",
      "passwd" : "maria.silva"
    } ],
    "username" : "caio.rodrigues"
  },
  "inputAssignments" : {
    "password" : "VALUE",
    "companyId" : "VALUE",
    "colleagues" : [ {
      "active" : "VALUE",
      "adminUser" : "VALUE",
      "colleagueId" : "VALUE",
      "colleagueName" : "VALUE",
      "login" : "VALUE",
      "mail" : "VALUE",
      "passwd" : "VALUE"
    } ],
    "username" : "VALUE"
  },
  "outputValues" : { },
  "outputAssignments" : { },
  "extraParams" : {
    "enabled" : false
  }
}
}