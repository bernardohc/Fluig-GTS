function defineStructure() {
}

function onSync(lastSyncDate) {
}

function createDataset(fields, constraints, sortFields) {
	log.info("fluig_create_card - inicio");

	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("companyId");
	dataset.addColumn("documentDescription");
	dataset.addColumn("documentId");
	dataset.addColumn("version");
	dataset.addColumn("webServiceMessage");

	var params = {};
	try {
		// Validar parametros recebidos
		if (constraints == null || constraints.length == 0) {
			throw "Nenhuma constraint recebida";
		}

		params = constraintsToObject(constraints);
		if (isEmpty(params.cardIndex) || isEmpty(params.cardData)) {
			throw "Constraints 'cardId' e 'cardData' são obrigatórias";
		}

		params = adicionaDadosDeConexao(params);
		
		// Complementar parametros de configuração
		params.cardData = JSON.parse(params.cardData);

		// Processar integração
		var serviceHelper = ServiceManager.getService(config().service).getBean();
		var serviceLocator = serviceHelper.instantiate(config().locatorClass);
		var service = serviceLocator.getCardServicePort();

		var cardDto = fillCardDto(serviceHelper, params);
		
		log.dir(params);
		
		var response = service.create(parseInt(params.companyId, 10), new String(params.login), new String(params.pass), cardDto);

		var result = response.getItem();
		for (var i = 0; i < result.size(); i++) {
			dataset.addRow([
				result.get(i).getCompanyId(),
				result.get(i).getDocumentDescription(),
				result.get(i).getDocumentId(), 
				result.get(i).getVersion(),
				result.get(i).getWebServiceMessage()
			]);
		}
	} catch (e) {
		return error(e, params);
	}
	
	return dataset;
}

// Carrega objeto de parametros com dados para autenticação no webservice do fluig
function adicionaDadosDeConexao(params) {
	var connector = DatasetFactory.getDataset("connector", null, null, null);
	if (connector == null || connector.rowsCount <= 0) {
		throw "Não foi possível obter parametros de autenticação do webservice fluig";
	}

	params.companyId = getValue("WKCompany");
	params.colleagueId = "admin"; //matrícula do usuário
	params.login = "admin"; //login do usuário
	params.pass = "GTS@hml2023"; //senha do usuário
	
	return params;
}

// Transforma o erro em um conteúdo retornável
function error(error, params) {
	log.info("fluig_create_card - error");
	log.dir(error);

	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn('error');
	dataset.addColumn('cardData');
	dataset.addColumn('companyId');
	dataset.addColumn('password');
	dataset.addColumn('cardId');
	dataset.addColumn('username');

	var cardData = isPrimitive(params.cardData) ? params.cardData : JSONUtil.toJSON(params.cardData);
	var companyId = isPrimitive(params.companyId) ? params.companyId : JSONUtil.toJSON(params.companyId);
	var password = isPrimitive(params.password) ? params.password : JSONUtil.toJSON(params.password);
	var cardId = isPrimitive(params.cardId) ? params.cardId : JSONUtil.toJSON(params.cardId);
	var username = isPrimitive(params.username) ? params.username : JSONUtil.toJSON(params.username);

	dataset.addRow([error.message, cardData, companyId, password, cardId, username]);
	log.dir(dataset);
	
	return dataset;
}

/**
 * Verificar se o valor é nulo ou vazio
 * 
 * @param valor
 * @returns boolean
 */
function isEmpty(valor) {
	if (valor == null) {
		return true;
	}

	var teste = "" + valor;
	return teste.trim() == "";
}

// Converte as Contraints em um objeto simples 
function constraintsToObject(constraints) {
	var result = {};

	if (constraints != null)
		for (var i = 0; i < constraints.length; i++) {
			log.info("fluig_create_card - constraint: " + constraints[i].fieldName);
			result['' + constraints[i].fieldName] = constraints[i].initialValue;
		}

	return result;
}

function isPrimitive(value) {
	return (value == null || (typeof value === 'string') || value.substring !== undefined)
			|| typeof value === 'number'
			|| typeof value === 'boolean'
			|| typeof value === 'undefined';
}

function fillCardFieldDto(serviceHelper, field) {
	if (field == null) {
		return null;
	}

	log.info("fluig_create_card - fillCardFieldDto - instantiate");
	var dto = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
	log.info("fluig_create_card - field: " + field.field + " - " + field.value);
	dto.setField(field.field);
	dto.setValue(field.value);

	return dto;
}

function fillCardDto(serviceHelper, params) {
	if (params.cardData == null) {
		return null;
	}

	var cardDtoArray = serviceHelper.instantiate('com.totvs.technology.ecm.dm.ws.CardDtoArray');

	var cardDto = serviceHelper.instantiate('com.totvs.technology.ecm.dm.ws.CardDto');
	cardDto.setParentDocumentId(parseInt(params.cardIndex, 10));
	cardDto.setColleagueId(params.colleagueId);
	cardDto.setDocumentDescription(params.description);
	cardDto.setExpires(false);
	cardDto.setUserNotify(false);
	cardDto.setInheritSecurity(true);

	for ( var i in params.cardData) {
		cardDto.getCardData().add(fillCardFieldDto(serviceHelper, params.cardData[i]));
	}
	cardDtoArray.getItem().add(cardDto);

	return cardDtoArray;
}

function config() {
	return {
		"service" : "ECMCardService",
		"operation" : "updateCardData",
		"soapService" : "ECMCardServiceService",
		"portType" : "CardService",
		"locatorClass" : "com.totvs.technology.ecm.dm.ws.ECMCardServiceService",
		"portTypeMethod" : "getCardServicePort"
	}
}