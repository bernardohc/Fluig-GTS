function afterUpdateUser(user) {
	log.info("afterUpdateUser - Usuário " + user.getFullName() + " foi alterado");
	
	// Se usuario não está na regra de controle de validade de senha, ignorar. Função disponível no beforeLogin
	if (!usuarioComControleSenha(user.getLogin())) {
		return;
	}
	
	var politica = getPolitica();
	//Se formulário de controle de validade não estiver disponível, encerra
	if(politica.idFormControle == null || politica.idFormControle == 0){
		log.error("afterUpdateUser - Usuário " + user.getFullName() + " - não foi obtido ID do formulário, " + 
			"verifique o campo idFormControle no cadastro de política de senha");
		return false;
	}
	
	var novaValidade = calculaValidade(politica.qtDiasValidade);
	var idFicha = getIdFichaControleSenha(user.getLogin());
	log.info("afterUpdateUser - novaValidade " + novaValidade + " - idFicha: " + idFicha);
	
	var ds = null;
	if(idFicha == 0) {
		ds = criarFicha(politica.idFormControle, user.getLogin(), novaValidade);
	} else {
		ds = atualizarFicha(idFicha, user.getLogin(), novaValidade);
	}
	
	if(ds == null || ds.rowsCount <= 0){
		log.error("afterUpdateUser - Usuário " + user.getFullName() + " falha ao atualizar ficha de controle de validade de senha");
	}
}

/**
* Busca definições na política: Qt dias validade e id do formulário de controle
* caso não encontre ou não seja válido a quantidade de dias, retorna padrão 45 dias.
* caso não encontre ou não seja válido o id formulário, retorna null.
* @returns object
*/
function getPolitica(){
	log.info("afterUpdateUser - getDiasValidade");
	var politica = {"qtDiasValidade": 45, "idFormControle": null};
	
	var constraints = [
		DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST)
	];
	var fields = ["qtDias", "idFormControle"];
	var politicaDs = DatasetFactory.getDataset('fluig_politica_senha', fields, constraints, null);
	
	//Recupera quantidade de dias de validade da senha
	if (politicaDs != null && politicaDs.rowsCount > 0) {
		var qtDias = politicaDs.getValue(0, 'qtDias');
		if (!isEmpty(qtDias)) {
			qtDias = parseInt(qtDias, 10);
			if(!isNaN(qtDias)) {
				politica.qtDiasValidade = qtDias;
			}
		}
		
		var idForm = politicaDs.getValue(0, 'idFormControle');
		if (!isEmpty(idForm)) {
			idForm = parseInt(idForm, 10);
			if(!isNaN(idForm)) {
				politica.idFormControle = idForm;
			}
		}
	}
	return politica;
}

/**
 * Calcular nova data de validade com base na quantidade de dias do parâmetro.
 * @param qtDiasValidade: int
 * @returns novaValidade: String (dd/MM/yyyy)
 */
function calculaValidade(qtDiasValidade){
	var unidadeTempoDias = java.time.temporal.ChronoUnit.valueOf("DAYS");
	var LOCALE_PT_BR = new java.util.Locale("pt", "br");
	
	var dataFormaBrasileira = java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy").withLocale(LOCALE_PT_BR);
	var agora = java.time.LocalDate.now();
	var novaValidade = agora.plus(qtDiasValidade, unidadeTempoDias);
	
	return novaValidade.format(dataFormaBrasileira);
}

/**
* Busca ficha de controle de validade da senha do usuário
* informado no parametro de login.
* @param login String
* @returns int
*/
function getIdFichaControleSenha(login){
	log.info("afterUpdateUser - getIdFichaControleSenha - login: " + login);
	
	var constraints = [
		DatasetFactory.createConstraint('login', login, login, ConstraintType.MUST), 
		DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST)
	];
	
	var controleDs = DatasetFactory.getDataset('fluig_controle_senha', ["documentid"], constraints, null);
	
	//Verifica se há controle de validade de senha registrado para o usuário
	if (controleDs != null && controleDs.rowsCount > 0) {
		return parseInt(controleDs.getValue(0, 'documentid'), 10);
	}
	
	return 0;
}

function criarFicha(cardIndex, login, data){
	log.info("afterUpdateUser - criarFicha - " + cardIndex);
	
	var cardData = [ { "field": "login", "value": login }, { "field": "validaAte", "value": data } ];
	
	var constraints = [
	    DatasetFactory.createConstraint("cardIndex", cardIndex, null, ConstraintType.MUST), 
	    DatasetFactory.createConstraint("cardData", JSONUtil.toJSON(cardData), null, ConstraintType.MUST)
	];
	return DatasetFactory.getDataset("fluig_create_card", null, constraints, null);
}

function atualizarFicha(ficha, login, data){
	log.info("afterUpdateUser - atualizarFicha");
	
	var cardData = [ { "field": "login", "value": login }, { "field": "validaAte", "value": data } ];
	
	var constraints = [
	    DatasetFactory.createConstraint("cardId", ficha, null, ConstraintType.MUST), 
	    DatasetFactory.createConstraint("cardData", JSONUtil.toJSON(cardData), null, ConstraintType.MUST)
	];
	return DatasetFactory.getDataset("fluig_update_card", null, constraints, null);
}

function isEmpty(valor){
	if(valor == null) return true;
	
	var teste = "" + valor;
	return teste.trim() == "";
}
