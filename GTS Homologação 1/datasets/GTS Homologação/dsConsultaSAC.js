function createDataset(fields, constraints, sortFields) {
	
	try{
		 var contextWD = new javax.naming.InitialContext();
		 var dataSourceWD = contextWD.lookup("java:/jdbc/FluigDS");
		 var connectionWD = dataSourceWD.getConnection();
	 } catch (e){
		 log.info("Erro conexao Fluig - " + e);
	 } 
	 
	 
	 var dataset = DatasetBuilder.newDataset();
	 //Fluig
	 dataset.addColumn("metadataID");
	 dataset.addColumn("version");
	 //Cabeçalho
	 dataset.addColumn("numProtocoloFluig");
	 dataset.addColumn("numProtocoloTelefonico");
	 dataset.addColumn("statusAtendimento");
	 dataset.addColumn("statusAtendimentoDesc");
	 dataset.addColumn("dataAberturaSoData");
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
	 dataset.addColumn("tipoSolicitacaoDesc");
	 dataset.addColumn("estadoRevenda");
	 dataset.addColumn("codCidadeRevenda");
	 dataset.addColumn("cidadeRevenda");
	 dataset.addColumn("A1CODRevenda");
	 dataset.addColumn("A1LOJARevenda");
	 dataset.addColumn("A1CODLOJARevenda");
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
	 //Revenda
	 var estadoRevendaParam = "";
	 var cidadeRevendaParam = "";
	 var codLojaRevendaParam = "";
	 
	 //Solicitação
	 var tipoSolicitacaoParam  = "";
	 var codSetorParam  = "";
	
	 var constraintsForm = new Array(); 
	 for (var i in constraints){
		//Cabeçalho
		if ( constraints[i].getFieldName().toString() == 'numProtocoloFluig' ) {
			numProtocoloFluigParam = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'numProtocoloTelefonico' ) {
			numProtocoloTelefonicoParam = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'statusAtendimento' ) {
			statusAtendimentoParam = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'dataAberturaDe' ) {
			dataAberturaDeParam = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'dataAberturaAte' ) {
			dataAberturaAteParam = constraints[i].initialValue;
		}
		
		//Requisitante
		if ( constraints[i].getFieldName().toString() == 'nomeRequisitante' ) {
			nomeRequisitanteParam = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'tipoPessoaRequisitante' ) {
			tipoPessoaRequisitanteParam = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'cpfCnpjRequisitante' ) {
			cpfCnpjRequisitanteParam = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'estadoRequisitante' ) {
			estadoRequisitanteParam = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'cidadeRequisitante' ) {
			cidadeRequisitanteParam = constraints[i].initialValue;
		}
		
		//Revenda
		if ( constraints[i].getFieldName().toString() == 'estadoRevenda' ) {
			estadoRevendaParam = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'cidadeRevenda' ) {
			cidadeRevendaParam = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'codLojaRevenda' ) {
			codLojaRevendaParam = constraints[i].initialValue;
		}
		
		//Solicitação
		if ( constraints[i].getFieldName().toString() == 'tipoSolicitacao' ) {
			tipoSolicitacaoParam = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'codSetor' ) {
			codSetorParam = constraints[i].initialValue;
		}
		
	}
	
	var SQL = "SELECT SAC.ID metadataID, SAC.version, numProtocoloFluig, numProtocoloTelefonico, statusAtendimento, CONVERT(varchar(10), dataAbertura, 103) dataAberturaSoData, dataAbertura,  dataEncerramento " +
    	" ,statusAtendimento, statusAtendimentoDesc " +
		" ,nomeRequisitante, tipoPessoaRequisitante, cpfCnpjRequisitante, telRequisitante, emailRequisitante, estadoRequisitante, cidadeRequisitante " +
    	" ,tipoSolicitacao, tipoSolicitacaoDesc, estadoRevenda, codCidadeRevenda, cidadeRevenda, A1CODRevenda, A1LOJARevenda, A1CODLOJARevenda, revenda, tipoPessoaRevenda, cpfCnpjRevenda, setor, numSerie, modeloEquipamento, assuntoSolicitacao, descricaoSolicitacao " +
		" FROM ML001024 SAC (NOLOCK) " +
		" JOIN PROCES_WORKFLOW (NOLOCK) " +
		"	ON SAC.companyid = PROCES_WORKFLOW.COD_EMPRESA " +
		"		AND SAC.cardid = PROCES_WORKFLOW.NR_DOCUMENTO_CARD_INDEX " +
		"		AND SAC.documentid = PROCES_WORKFLOW.NR_DOCUMENTO_CARD " +
		
        
		" WHERE 1=1 ";
		//Cabeçalho
		if( numProtocoloFluigParam != ""  ){
			SQL += " AND numProtocoloFluig = '" + numProtocoloFluigParam + "'";
		}
		if( numProtocoloTelefonicoParam != ""  ){
			SQL += " AND numProtocoloTelefonico = '" + numProtocoloTelefonicoParam + "'";
		}
		if( statusAtendimentoParam != ""  ){
			SQL += " AND statusAtendimento = '" + statusAtendimentoParam + "'";
		}
		if( dataAberturaDeParam != ""){
			SQL +=" AND CONVERT( char ,CONVERT(DATETIME, dataAbertura  , 103),112) >= CONVERT( char ,CONVERT(DATETIME, '"+ dataAberturaDeParam +"' , 103),112) ";
//			  SQL +=" AND C5_EMISSAO >= CONVERT( char ,CONVERT(DATETIME, '"+ c5EmissaoDe +"' , 103),112) ";
		}
		if( dataAberturaAteParam != ""){
			SQL +=" AND CONVERT( char ,CONVERT(DATETIME, dataAbertura  , 103),112) <= CONVERT( char ,CONVERT(DATETIME, '"+ dataAberturaAteParam +"' , 103),112) ";
		}
		//Requisitante
		if( nomeRequisitanteParam != ""  ){
			SQL += " AND nomeRequisitante LIKE '%" + nomeRequisitanteParam + "%'";
		}
		if( tipoPessoaRequisitanteParam != ""  ){
			SQL += " AND tipoPessoaRequisitante = '" + tipoPessoaRequisitanteParam + "'";
		}
		if( cpfCnpjRequisitanteParam != ""  ){
			SQL += " AND cpfCnpjRequisitante = '" + cpfCnpjRequisitanteParam + "'";
		}
		if( estadoRequisitanteParam != ""  ){
			SQL += " AND estadoRequisitante = '" + estadoRequisitanteParam + "'";
		}
		if( cidadeRequisitanteParam != ""  ){
			SQL += " AND codCidadeRequisitante = '" + cidadeRequisitanteParam + "'";
		}
		//Revenda
		if( estadoRevendaParam != ""  ){
			SQL += " AND estadoRevenda = '" + estadoRevendaParam + "'";
		}
		if( cidadeRevendaParam != ""  ){
			SQL += " AND codCidadeRevenda = '" + cidadeRevendaParam + "'";
		}
		if( codLojaRevendaParam != ""  ){
			SQL += " AND A1CODLOJARevenda = '" + codLojaRevendaParam + "'";
		}
		//Solicitação
		if( tipoSolicitacaoParam != ""  ){
			SQL += " AND tipoSolicitacao = '" + tipoSolicitacaoParam + "'";
		}
		if( codSetorParam != ""  ){
			SQL += " AND codSetor = '" + codSetorParam + "'";
		}
		
		SQL += " ORDER BY ID DESC ";
    
	log.info(" dsConsultaSAC:"+ SQL);	
	
	var statementWD = connectionWD.prepareStatement(SQL);
	var rsWD = statementWD.executeQuery();
	
	while(rsWD.next()){
		dataset.addRow([	
                	 rsWD.getString("metadataID")
					,rsWD.getString("version")
		              //Cabeçalho
					,rsWD.getString("numProtocoloFluig")
	                ,rsWD.getString("numProtocoloTelefonico")
	                ,rsWD.getString("statusAtendimento")
	                ,rsWD.getString("statusAtendimentoDesc")
	                ,rsWD.getString("dataAberturaSoData")
	                ,rsWD.getString("dataAbertura")
	                ,rsWD.getString("dataEncerramento")
	                //Requisitante
	                ,rsWD.getString("nomeRequisitante")
	                ,rsWD.getString("tipoPessoaRequisitante")
	                ,rsWD.getString("cpfCnpjRequisitante")
	                ,rsWD.getString("telRequisitante")
	                ,rsWD.getString("emailRequisitante")
	                ,rsWD.getString("estadoRequisitante")
	                ,rsWD.getString("cidadeRequisitante")
	                //Solicitação
	                ,rsWD.getString("tipoSolicitacao")
	                ,rsWD.getString("tipoSolicitacaoDesc")
	                ,rsWD.getString("estadoRevenda")
	                ,rsWD.getString("codCidadeRevenda")
	                ,rsWD.getString("cidadeRevenda")
	                ,rsWD.getString("A1CODRevenda")
	                ,rsWD.getString("A1LOJARevenda")
	                ,rsWD.getString("A1CODLOJARevenda")
	                ,rsWD.getString("revenda")
	                ,rsWD.getString("tipoPessoaRevenda")
	                ,rsWD.getString("cpfCnpjRevenda")
	                ,rsWD.getString("setor")
	                ,rsWD.getString("numSerie")
	                ,rsWD.getString("modeloEquipamento")
	                ,rsWD.getString("assuntoSolicitacao")
	                ,rsWD.getString("descricaoSolicitacao")
					]);
	}
	
	rsWD.close();
	statementWD.close();
	connectionWD.close();

    
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