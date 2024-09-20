function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("EQPNUMSERIE");
	newDataset.addColumn("EQPFILIALNOTA");
	newDataset.addColumn("EQPNOTA");
	newDataset.addColumn("EQPCODPRD");
	newDataset.addColumn("EQPDESC");
	newDataset.addColumn("EQPDTVENDA");
	newDataset.addColumn("EQPSTATUSGTS");
	
	newDataset.addColumn("REVCGC");
	newDataset.addColumn("RECRAZAOSOCIAL");
	newDataset.addColumn("REVNOMEFANTASIA");
	newDataset.addColumn("REVCOD");
	newDataset.addColumn("REVLOJA");
	newDataset.addColumn("REVCIDADE");
	newDataset.addColumn("REVESTADO");
	newDataset.addColumn("REVCLPECA");
	newDataset.addColumn("REVCLSER");
	newDataset.addColumn("REVEMAIL");
	newDataset.addColumn("REVTELEFONE");
	
	
	try{
		
		var TIPOUSUARIO  = '';
		var A1_COD  = '';
		var equipNumSerie  = '';
		var equipTipoNota  = '';
		var equipNumNotaFiscal  = '';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'TIPOUSUARIO' ) {
				TIPOUSUARIO = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'A1_COD' ) {
				A1_COD = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'equipNumSerie' ) {
				equipNumSerie = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'equipTipoNota' ) {
				equipTipoNota = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'equipNumNotaFiscal' ) {
				equipNumNotaFiscal = constraints[i].initialValue;
			}
			
		}
		
		
		var camposValidos = true;
		if(TIPOUSUARIO == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Tipo de usuário não definido.'));
		}else if(TIPOUSUARIO == 'Revenda' && A1_COD == '' ){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Código da Revenda não preenchido.'));
		}else if(equipNumSerie == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Número de Série não preenchido.'));
		}else if(equipTipoNota == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Tipo da Nota não preenchido.'));
		}else if(equipTipoNota == 'ND' && equipNumNotaFiscal == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'É obrigatório preencher o número da Nota Fiscal quando o Tipo da Nota for Nota de Demonstração.'));
		}
		
			
		if(TIPOUSUARIO == 'Administrativo GTS'){
			var ehAdministrativoGTS = false;
			var usuarioCorrente = fluigAPI.getUserService().getCurrent();
			
			//Papel Entrega Técnica - Cadastra Processo Entrega Técnica - Administrativo GTS
			var constrainsCadEntTecAdmGTS1 = DatasetFactory.createConstraint("workflowColleagueRolePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
			//Entrega Técnica - Cadastra Processo Entrega Técnica - Administrativo GTS
			var constrainsCadEntTecAdmGTS2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "000031", "000031", ConstraintType.MUST);
			var constrainsCadEntTecAdmGTS3 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", usuarioCorrente.getCode(),  usuarioCorrente.getCode(), ConstraintType.MUST);
			var constrainsCadEntTecAdmGTS = new Array(constrainsCadEntTecAdmGTS1, constrainsCadEntTecAdmGTS2, constrainsCadEntTecAdmGTS3);
			
			var dsPapelCadEntTecAdmGTS = DatasetFactory.getDataset("workflowColleagueRole", null, constrainsCadEntTecAdmGTS, null);
			if(dsTemValor(dsPapelCadEntTecAdmGTS)){
				//É um Administrativo GTS
				ehAdministrativoGTS = true;
			}
			
			//Se ainda não localizou, vai procurar se está no grupo Entrega Técnica - Administrativo GTS
			//Grupo Entrega Técnica - Administrativo GTS
			if(!ehAdministrativoGTS){
				var constrainsEntTecAdmGTS1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
				//Entrega Técnica - Administrativo GTS
				var constrainsEntTecAdmGTS2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "000008", "000008", ConstraintType.MUST);
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
				newDataset.addRow(new Array('2', 'Tipo de Usuário "Administrativo GTS" não é válido.'));
			}
		}
		
		/*
		 * Se tiver campos inválidos para busca, vai retornar o dataset, informando qual a inconsistência
		 */
		if(!camposValidos){
			return newDataset;
		}
		
		
		/*
		 * Regra para envio de parâmetros para o WS.
		 * ctipo = 1 -> é a consulta pela Revenda
		 * 			a máquina precisa ter vinculo de nota de venda para a revenda pelo número de série.
		 
		 * ctipo = 2 -> é a consulta pela GTS pelo CPF/CNPJ, que  passa os seguintes parâmetros obrigatoriamente 
		 * 			ccgc (CpfCnpj de busca); 
		 
		 */
		
		var parametrosGetEquipamento = '';
		if(TIPOUSUARIO == 'Revenda' ){
			var filterNumNotaFiscal = (equipNumNotaFiscal != "") ? "&cNota="+equipNumNotaFiscal : "";
			
			parametrosGetEquipamento = 'ctipo=1&cCodRev='+A1_COD+'&cNSerie='+equipNumSerie + '&cTpNota=' + equipTipoNota + '' + filterNumNotaFiscal;
		
		}else if(TIPOUSUARIO == 'Administrativo GTS' ){
			var filterNumNotaFiscal = (equipNumNotaFiscal != "") ? "&cNota="+equipNumNotaFiscal : "";
			
			parametrosGetEquipamento = 'ctipo=2&cNSerie='+equipNumSerie + '&cTpNota=' + equipTipoNota + "" + filterNumNotaFiscal;
			
			
		}
		
		
		if(parametrosGetEquipamento == ''){
			newDataset.addRow(new Array('2', 'Não foram definidos os parâmetros para busca de equipamento.'));
			return newDataset;
		}
		
		log.info('--parametrosGetEquipamento');
		log.info(parametrosGetEquipamento);
		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'PROTHEUSGTS_REST',
	            endpoint : '/rest/wsentretec/getEquipamento?'+ parametrosGetEquipamento,
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
							equipNumSerie, 
							result[0].CFILIALNT, 
							result[0].CNOTA, 
							result[0].CPRD, 
							result[0].CDESC, 
							result[0].CDTVEND, 
							result[0].STATUS, 
							
							result[0].CCGC, 
							result[0].CNOME, 
							result[0].CNREDUZ, 
							result[0].CCOD, 
							result[0].CLOJA, 
							result[0].CMUN, 
							result[0].CEST, 
							result[0].CCLPECA,
							result[0].CCLSER,
							result[0].CEMAIL,
							result[0].CTEL
							
							));
            }else{
				var MSGRET = result[0].MSGRET;
				newDataset.addRow(new Array('2', MSGRET));
            }
           
        }
	        

		

		
    }catch(erro){    
    	log.info("Entrega Técnica: erro na busca de equipamento: " + erro);
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