function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("CLICOD");
	newDataset.addColumn("CLILOJA");
	newDataset.addColumn("CLINOME");
	newDataset.addColumn("CLICGC");
	newDataset.addColumn("CLIINSCR");
	newDataset.addColumn("CLICEP");
	newDataset.addColumn("CLIENDE");
	newDataset.addColumn("CLIBAIRRO");
	newDataset.addColumn("CLICOMPL");
	newDataset.addColumn("CLIEST");
	newDataset.addColumn("CLIMUN");
	newDataset.addColumn("CLIEMAIL");
	newDataset.addColumn("CLITELEFONE");
	
	try{
		
		var TIPOUSUARIO  = '';
		var TIPOBUSCA  = '';
		var A1_COD  = '';
		var A1_LOJA  = '';
		
		var CLICGC  = '';
		var CLIINSCR  = '';
		var CLICOD  = '';
		var CLILOJA  = '';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'TIPOUSUARIO' ) {
				TIPOUSUARIO = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'TIPOBUSCA' ) {
				TIPOBUSCA = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'A1_COD' ) {
				A1_COD = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'A1_LOJA' ) {
				A1_LOJA = constraints[i].initialValue;
			}
			
			if ( constraints[i].getFieldName().toString() == 'CLICGC' ) {
				CLICGC = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'CLIINSCR' ) {
				CLIINSCR = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'CLICOD' ) {
				CLICOD = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'CLILOJA' ) {
				CLILOJA = constraints[i].initialValue;
			}
		}
		
		
		var camposValidos = true;
		if(TIPOUSUARIO == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Tipo de usuário não definido.'));
		}else if(TIPOBUSCA == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Tipo de busca não definido.'));
		}else if(TIPOUSUARIO == 'Revenda' && (A1_COD == '' || A1_LOJA == '')){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Revenda sem código e loja definido.'));
		}else if(TIPOBUSCA == 'cpfCnpj' && CLICGC == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'CPF/CNPJ não preenchido.'));
		}else if(TIPOBUSCA == 'codLoja' && (CLICOD == '' || CLILOJA == '')){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Código e Loja não preenchido.'));
		}
		
			
		if(TIPOUSUARIO == 'Administrativo GTS'){
			var ehAdministrativoGTS = false;
			var usuarioCorrente = fluigAPI.getUserService().getCurrent();
			
			//Papel cadastraEntregaTecnicaAdmGTS
			var constrainsCadEntTecAdmGTS1 = DatasetFactory.createConstraint("workflowColleagueRolePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
			var constrainsCadEntTecAdmGTS2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "cadastraEntregaTecnicaAdmGTS", "cadastraEntregaTecnicaAdmGTS", ConstraintType.MUST);
			var constrainsCadEntTecAdmGTS3 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", usuarioCorrente.getCode(),  usuarioCorrente.getCode(), ConstraintType.MUST);
			var constrainsCadEntTecAdmGTS = new Array(constrainsCadEntTecAdmGTS1, constrainsCadEntTecAdmGTS2, constrainsCadEntTecAdmGTS3);
			
			var dsPapelCadEntTecAdmGTS = DatasetFactory.getDataset("workflowColleagueRole", null, constrainsCadEntTecAdmGTS, null);
			if(dsTemValor(dsPapelCadEntTecAdmGTS)){
				//É um Administrativo GTS
				ehAdministrativoGTS = true;
			}
			
			//Se ainda não localizou, vai procurar se está no grupo AdmGTSEntregaTecnica
			//Grupo AdmGTSEntregaTecnica
			if(!ehAdministrativoGTS){
				var constrainsEntTecAdmGTS1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
				var constrainsEntTecAdmGTS2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "AdmGTSEntregaTecnica", "AdmGTSEntregaTecnica", ConstraintType.MUST);
				var constrainsEntTecAdmGTS3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", usuarioCorrente.getCode(),  usuarioCorrente.getCode(), ConstraintType.MUST);
				var constrainsEntTecAdmGTS = new Array(constrainsEntTecAdmGTS1, constrainsEntTecAdmGTS2, constrainsEntTecAdmGTS3);
				
				var dsPapelEntTecAdmGTS = DatasetFactory.getDataset("colleagueGroup", null, constrainsEntTecAdmGTS, null);
				if(dsTemValor(dsPapelEntTecAdmGTS)){
					//É um Administrativo GTS
					ehAdministrativoGTS = true;
				}
				
			}
			
			//Se não localizou como Administrativo GTS, retorna informando que o cadastro não é valido
			if(!ehAdministrativoGTS){
				camposValidos = false;
				newDataset.addRow(new Array('2', 'Tipo de Usuário "Administrativo GTS" não é valido.'));
			}
		}else if(TIPOUSUARIO == 'Revenda'){
			
			//Revenda não busca cliente por código e loja, somente cpfCnpj
			if(TIPOBUSCA == 'codLoja' || CLICOD != '' || CLILOJA != ''){
				camposValidos = false;
				newDataset.addRow(new Array('2', 'Tipo de Usuário "Revenda" não pode buscar cliente por Código e Loja.'));
			}
			
		}
		
		/*
		 * Se tiver campos inválidos para busca, vai retornar o dataset, informando qual a inconsistência
		 */
		if(!camposValidos){
			return newDataset;
		}
		
		//AQUI PRECISA FAZER A REGRA DE ENVIO DE TIPOBUSCA SE É CODLOJA OU CPFCNPJ
		var ctipo = '';
		var parametrosGetCliente = '';
		/*
		 * Regra para envio de parâmetros para o WS.
		 * ctipo = 1 -> é a consulta pela Revenda pelo CPF/CNPJ, que  passa os seguintes parâmetros obrigatoriamente 
		 * 			ccgc (CpfCnpj de busca); ccodrev (código da revenda que está abrindo a solicitacao); clojarev (loja da revenda que está abrindo a solicitacao)
		 
		 * ctipo = 2 -> é a consulta pela GTS pelo CPF/CNPJ, que  passa os seguintes parâmetros obrigatoriamente 
		 * 			ccgc (CpfCnpj de busca); 
		 
		 * ctipo = 3 -> é a consulta pela GTS pelo Código e Loja, que  passa os seguintes parâmetros obrigatoriamente 
		 * 			ccodcli (código do cliente); clojacli (loja do cliente)
		 
		 */
		
		if(TIPOUSUARIO == 'Revenda' && TIPOBUSCA == 'cpfCnpj'){
			var filterInscricaoEstadual= (CLIINSCR != "") ? "&cinscr="+CLIINSCR : "";
			
			parametrosGetCliente = 'ctipo=1&ccodrev='+A1_COD+'&clojarev='+A1_LOJA+'&ccgc='+CLICGC +''+ filterInscricaoEstadual;
		}else if(TIPOUSUARIO == 'Administrativo GTS' && TIPOBUSCA == 'cpfCnpj'){
			var filterInscricaoEstadual= (CLIINSCR != "") ? "&cinscr="+CLIINSCR : "";
			
			parametrosGetCliente = 'ctipo=2&ccgc='+CLICGC +''+ filterInscricaoEstadual;
		}else if(TIPOUSUARIO == 'Administrativo GTS' && TIPOBUSCA == 'codLoja'){
			parametrosGetCliente = 'ctipo=3&ccodcli='+CLICOD+'&clojacli='+CLILOJA;
		}
		
		if(parametrosGetCliente == ''){
			newDataset.addRow(new Array('2', 'Não foram definidos os parâmetros para busca de cliente.'));
			return newDataset;
		}
		
		log.info('--parametrosGetCliente');
		log.info(parametrosGetCliente);
		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'WSENTRETEC',
	            endpoint : '/rest/wsentretec/getCliente?'+ parametrosGetCliente,
	            method : 'get',
	            timeoutService: '100', // segundos
            	headers: {
            		"Content-Type": "application/json"
                }
	        }
		
		var vo = clientService.invoke(JSON.stringify(data));
		
        if(vo.getResult()== null || vo.getResult().isEmpty()){
        	newDataset.addRow(new Array('2', "Retorno está vazio"));
        }else{
            
            var result = JSON.parse(vo.getResult());
            
            var CODRET = result[0].CODRET.toString();
            if( CODRET == '1'){
            	newDataset.addRow( new Array( 
            				CODRET, 
							'Sucesso', 
							result[0].CCOD, 
							result[0].CLOJA, 
							result[0].CNOME, 
							result[0].CCGC, 
							result[0].CINSCR, 
							result[0].CCEP, 
							result[0].CEND, 
							result[0].CBAIRRO, 
							result[0].CCOMP, 
							result[0].CEST, 
							result[0].CMUN, 
							result[0].CEMAIL, 
							result[0].CTEL
							));
            }else{
				var MSGRET = result[0].MSGRET;
				newDataset.addRow(new Array('2', MSGRET));
            }
           
        }
	        

    }catch(erro){    
    	log.info("Entrega Técnica: erro na busca de cliente: " + erro);
    	newDataset.addRow(new Array('2', erro));
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