function beforeLogin(login) {
    //Se usuario não está na regra de controle de validade de senha, ignorar
	if(!usuarioComControleSenha(login)) {
		return;
	}
	
	log.info("beforeLogin - login: " + login);
	var constraints = [
		DatasetFactory.createConstraint('login', login, login, ConstraintType.MUST), 
		DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST)
	];
	
	var controleDs = DatasetFactory.getDataset('fluig_controle_senha', ["validaAte"], constraints, null);
	
	//Verifica se há controle de validade de senha registrado para o usuário
	if (controleDs != null && controleDs.rowsCount > 0) {
		var validaAte = controleDs.getValue(0, 'validaAte');

		//Verifica se há data de validade e então compara se já expirou
		if (validaAte != null && validaAte != "") {
			var dt = validaAte.split("/");
			var dia = dt[0];
			var mes = parseInt(dt[1], 10) - 1; //mês no javascript começa em 0
			var ano = dt[2];
			var validade = new Date(ano, mes, dia, 23, 59, 59);
			var dataAtual = new Date();
			
			if (dataAtual > validade) {
				var msg = "Sua senha expirou! Utilize a função 'Esqueci minha senha' para redefíni-la";
				log.error(msg);
				throw msg;
			} else {
				log.info("Senha válida");
			}
		}
//    } else {
//    	// Esse else pode ser implementado caso queira fazer o controle de todos os usuários, não somente para os quais foram criados os registros de formulário
//    	var msg = "Sua senha expirou! Utilize a função 'Esqueci minha senha' para redefíni-la";
//		log.error(msg);
//		throw msg;
    }
}

// Regra para controle de exceção, poderia ser uma lista definida num dataset ou consulta num formulário, para o exemplo, consta fixo
function usuarioComControleSenha(login){
	// validar todos os usuários
	return true;
	
	// validar apenas alguns usuários
	// return ['usuario1','usuario2'].indexOf(login) >= 0;
	
	// NÃO validar apenas alguns usuários
	// return ['adm','admin'].indexOf(login) == -1;
}