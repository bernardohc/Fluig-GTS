function defineStructure() {
}

function onSync(lastSyncDate) {
}

function createDataset(fields, constraints, sortFields) {
	log.info("fluig_update_card_data - inicio");

	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("companyId");
	dataset.addColumn("documentDescription");
	dataset.addColumn("documentId");
	dataset.addColumn("version");
	dataset.addColumn("webServiceMessage");
	
	var params = {};
	try{
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
		
		//Processar integração
		var serviceHelper = ServiceManager.getService(config().service);
		var serviceLocator = serviceHelper.instantiate(config().locatorClass);
		var service = serviceLocator.getCardServicePort();
		
		var cardFieldDtoArray = fillCardFieldDtoArray(serviceHelper, params);
		var response = service.updateCardData(parseInt(params.companyId, 10), new String(params.login), new String(params.pass), parseInt(params.cardId, 10), cardFieldDtoArray);
		
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
	} catch(e){
		return error( { "message": e }, params );
	}
	return dataset;
}

//Carrega objeto de parametros com dados para autenticação no webservice do fluig
function adicionaDadosDeConexao(params){
	var connector = DatasetFactory.getDataset("connector", null, null, null);
	if(connector == null || connector.rowsCount <= 0){
		throw "Não foi possível obter parametros de autenticação do webservice fluig";
	}
	
	params.companyId = getValue("WKCompany");
	params.login = "adm"; //login do usuário
	params.pass = "adm"; //senha do usuário
	
	return params;
}

function error(error, params){
	log.info("fluig_update_card_data - error");
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
 * @param valor
 * @returns boolean
 */
function isEmpty(valor){
	if(valor == null) return true;
	
	var teste = "" + valor;
	return teste.trim() == "";
}

//Converte as Contraints em um objeto simples 
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
	return (value == null || (typeof value === 'string') || value.substring !== undefined) || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined';
}

function fillCardFieldDto(serviceHelper, field) {
	if (field == null) {
		return null;
	}

	var dto = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
	dto.setField(field.field);
	dto.setValue(field.value);
	
	return dto;
}

function fillCardFieldDtoArray(serviceHelper, cardData) {
	if (cardData == null) {
		return null;
	}

	var dtoArr = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDtoArray");
	for (var i = 0; i < cardData.length; i++) {
		dtoArr.getItem().add(fillCardFieldDto(serviceHelper, cardData[i]));
	}
	log.dir(dtoArr);
	return dtoArr;
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