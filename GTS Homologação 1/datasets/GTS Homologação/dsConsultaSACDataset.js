function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	//Cabeçalho
	dataset.addColumn("numProtocoloFluig");
	dataset.addColumn("numProtocoloTelefonico");
	dataset.addColumn("descStatusAtendimento");
	dataset.addColumn("dataAbertura");
	dataset.addColumn("dataEncerramento");
	//Requisitante
	dataset.addColumn("nomeRequisitante");
	dataset.addColumn("tipoPessoaRequisitante");
	dataset.addColumn("cpfCnpjRequisitante");
	dataset.addColumn("telRequisitante");
	dataset.addColumn("emailRequisitante");
	dataset.addColumn("estadoRequisitante");
	dataset.addColumn("cidadeRequisitante");
	//Solicitação
	dataset.addColumn("tipoSolicitacao");
	dataset.addColumn("revenda");
	dataset.addColumn("tipoPessoaRevenda");
	dataset.addColumn("cpfCnpjRevenda");
	dataset.addColumn("setor");
	dataset.addColumn("numSerie");
	dataset.addColumn("modeloEquipamento");
	dataset.addColumn("assuntoSolicitacao");
	dataset.addColumn("descricaoSolicitacao");
	
	//Cabeçalho
	var numProtocoloFluigParam  = "";
	var numProtocoloTelefonicoParam  = "";
	var statusAtendimentoParam  = "";
	var dataAberturaDeParam  = "";
	var dataAberturaAteParam  = "";
	//Requisitante
	var nomeRequisitanteParam = "";
	var tipoPessoaRequisitanteParam = "";
	var cpfCnpjRequisitanteParam = "";
	var estadoRequisitanteParam = "";
	var cidadeRequisitanteParam = "";
	//Solicitação
	var tipoSolicitacaoParam  = "";
	var setorParam  = "";
	
	var constraintsForm = new Array(); 
	for (var i in constraints){
		//Cabeçalho
		if ( constraints[i].getFieldName().toString() == 'numProtocoloFluig' ) {
			numProtocoloFluigParam = constraints[i].initialValue;
			constraintsForm.push(DatasetFactory.createConstraint("numProtocoloFluig", numProtocoloFluigParam, numProtocoloFluigParam, ConstraintType.MUST));
		}
		if ( constraints[i].getFieldName().toString() == 'numProtocoloTelefonico' ) {
			numProtocoloTelefonicoParam = constraints[i].initialValue;
			constraintsForm.push(DatasetFactory.createConstraint("numProtocoloTelefonico", numProtocoloTelefonicoParam, numProtocoloTelefonicoParam, ConstraintType.MUST) );
		}
		if ( constraints[i].getFieldName().toString() == 'statusAtendimento' ) {
			statusAtendimentoParam = constraints[i].initialValue;
			constraintsForm.push(DatasetFactory.createConstraint("statusAtendimento", statusAtendimentoParam, statusAtendimentoParam, ConstraintType.MUST) );
		}
		if ( constraints[i].getFieldName().toString() == 'dataAbertura' ) {
			dataAberturaDeParam = constraints[i].initialValue;
			dataAberturaAteParam = constraints[i].finalValue;
			constraintsForm.push(DatasetFactory.createConstraint("dataAbertura", dataAberturaDeParam, dataAberturaAteParam, ConstraintType.MUST) );
		}
		
		//Requisitante
		if ( constraints[i].getFieldName().toString() == 'nomeRequisitante' ) {
			nomeRequisitanteParam = constraints[i].initialValue;
			var consNomeRequisitante = DatasetFactory.createConstraint("nomeRequisitante", "%"+nomeRequisitanteParam+"%", "%"+nomeRequisitanteParam+"%", ConstraintType.SHOULD);
			consNomeRequisitante.setLikeSearch(true);
			constraintsForm.push(consNomeRequisitante);
		}
		if ( constraints[i].getFieldName().toString() == 'tipoPessoaRequisitante' ) {
			tipoPessoaRequisitanteParam = constraints[i].initialValue;
			constraintsForm.push(DatasetFactory.createConstraint("tipoPessoaRequisitante", tipoPessoaRequisitanteParam, tipoPessoaRequisitanteParam, ConstraintType.MUST));
		}
		if ( constraints[i].getFieldName().toString() == 'cpfCnpjRequisitante' ) {
			cpfCnpjRequisitanteParam = constraints[i].initialValue;
			constraintsForm.push(DatasetFactory.createConstraint("cpfCnpjRequisitante", cpfCnpjRequisitanteParam, cpfCnpjRequisitanteParam, ConstraintType.MUST));
		}
		if ( constraints[i].getFieldName().toString() == 'estadoRequisitante' ) {
			estadoRequisitanteParam = constraints[i].initialValue;
			constraintsForm.push(DatasetFactory.createConstraint("estadoRequisitante", estadoRequisitanteParam, estadoRequisitanteParam, ConstraintType.MUST));
		}
		if ( constraints[i].getFieldName().toString() == 'cidadeRequisitante' ) {
			cidadeRequisitanteParam = constraints[i].initialValue;
			constraintsForm.push(DatasetFactory.createConstraint("cidadeRequisitante", cidadeRequisitanteParam, cidadeRequisitanteParam, ConstraintType.MUST));
		}
		
		//Solicitação
		if ( constraints[i].getFieldName().toString() == 'tipoSolicitacao' ) {
			tipoSolicitacaoParam = constraints[i].initialValue;
			constraintsForm.push(DatasetFactory.createConstraint("tipoSolicitacao", tipoSolicitacaoParam, tipoSolicitacaoParam, ConstraintType.MUST));
		}
		if ( constraints[i].getFieldName().toString() == 'setor' ) {
			setorParam = constraints[i].initialValue;
			constraintsForm.push(DatasetFactory.createConstraint("setor", setorParam, setorParam, ConstraintType.MUST));
		}
		
	}
	
//	var fields = ["numProtocoloFluig", "numProtocoloTelefonico"];
    var datasetGenerico = DatasetFactory.getDataset("dsFormSAC", null, constraintsForm, null);
    
    if(dsTemValor(datasetGenerico)){
    	for(var i = 0; i < datasetGenerico.rowsCount; i++){
    		var numProtocoloFluig = datasetGenerico.getValue(i, "numProtocoloFluig");
    		var numProtocoloTelefonico = datasetGenerico.getValue(i, "numProtocoloTelefonico");
    		var statusAtendimento = datasetGenerico.getValue(i, "statusAtendimento");
    		
    		var descStatusAtendimento = "";
    		
    		if (statusAtendimento == 'Abertura'){
    			descStatusAtendimento = 'Abertura';
    		}else if(statusAtendimento == 'AguardandoAnalise'){
    			descStatusAtendimento = 'Aguardando Análise';
    		}else if(statusAtendimento == 'EmAnalise'){
    			descStatusAtendimento = 'Em Análise';
    		}else if(statusAtendimento == 'Finalizado'){
    			descStatusAtendimento = 'Finalizado';
    		}
    		var dataAbertura = datasetGenerico.getValue(i, "dataAbertura");
    		var dataEncerramento = datasetGenerico.getValue(i, "dataEncerramento");
    		
    		//Requisitante
    		var nomeRequisitante = datasetGenerico.getValue(i, "nomeRequisitante");
    		var tipoPessoaRequisitante = datasetGenerico.getValue(i, "tipoPessoaRequisitante");
    		var cpfCnpjRequisitante = datasetGenerico.getValue(i, "cpfCnpjRequisitante");
    		var telRequisitante = datasetGenerico.getValue(i, "telRequisitante");
    		var emailRequisitante = datasetGenerico.getValue(i, "emailRequisitante");
    		var estadoRequisitante = datasetGenerico.getValue(i, "estadoRequisitante");
    		var cidadeRequisitante = datasetGenerico.getValue(i, "cidadeRequisitante");
    		//Solicitação
    		var tipoSolicitacao = datasetGenerico.getValue(i, "tipoSolicitacao");
    		var revenda = datasetGenerico.getValue(i, "revenda");
    		var tipoPessoaRevenda = datasetGenerico.getValue(i, "tipoPessoaRevenda");
    		var cpfCnpjRevenda = datasetGenerico.getValue(i, "cpfCnpjRevenda");
    		var setor = datasetGenerico.getValue(i, "setor");
    		var numSerie = datasetGenerico.getValue(i, "numSerie");
    		var modeloEquipamento = datasetGenerico.getValue(i, "modeloEquipamento");
    		var assuntoSolicitacao = datasetGenerico.getValue(i, "assuntoSolicitacao");
    		var descricaoSolicitacao = datasetGenerico.getValue(i, "descricaoSolicitacao");
    		
    		dataset.addRow([ numProtocoloFluig 
    		                ,numProtocoloTelefonico
    		                ,descStatusAtendimento
    		                ,dataAbertura
    		                ,dataEncerramento
    		                //Requisitante
    		                ,nomeRequisitante
    		                ,tipoPessoaRequisitante
    		                ,cpfCnpjRequisitante
    		                ,telRequisitante
    		                ,emailRequisitante
    		                ,estadoRequisitante
    		                ,cidadeRequisitante
    		                //Solicitação
    		                ,tipoSolicitacao
    		                ,revenda
    		                ,tipoPessoaRevenda
    		                ,cpfCnpjRevenda
    		                ,setor
    		                ,numSerie
    		                ,modeloEquipamento
    		                ,assuntoSolicitacao
    		                ,descricaoSolicitacao
    		                ]);
    	}
    }else{
    	dataset.addRow(["Não foi encontrado nenhum tipo de pedido cadastrado", "-1"]);
    }
    log.info('10');
	return dataset;
}

function temValor(valor){
	if(valor != null && valor != undefined && valor.trim() != ""){
		return true;
	}else{
		return false;
	}
}

function dsTemValor(dataset){
	if(dataset != null && dataset != undefined && dataset.rowsCount > 0){
		return true;
	}else{
		return false;
	}
}