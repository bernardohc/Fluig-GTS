function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("idFluig");
	newDataset.addColumn("numOrcamento");
	newDataset.addColumn("numPedido");
	newDataset.addColumn("filialPedido");
	newDataset.addColumn("status");
	newDataset.addColumn("quantidade");
	newDataset.addColumn("codProduto");
	newDataset.addColumn("descProduto");
	newDataset.addColumn("condPagto");
	newDataset.addColumn("libFinanceira");
	newDataset.addColumn("numSerie");
	newDataset.addColumn("dataEmissao");
	newDataset.addColumn("tpFrete");
	newDataset.addColumn("valFrete");
	newDataset.addColumn("prevEntrega");
	newDataset.addColumn("prevIniProducao");
	newDataset.addColumn("valVenda");
	newDataset.addColumn("valTotal");

	newDataset.addColumn("revendedor");
	newDataset.addColumn("representante");
	newDataset.addColumn("gestorTerritorial");
	
	newDataset.addColumn("clienteNome");
	newDataset.addColumn("clienteCpfCnpj");
	newDataset.addColumn("clienteIE");
	newDataset.addColumn("numNota");
	newDataset.addColumn("chaveNF");
	newDataset.addColumn("dataEmissaoNF");
	newDataset.addColumn("observacao");

	try{
		
		var tipoUsuario  = '';
		var tipoUsuarioCod  = '';
//		tipoUsuario 1 -> Representante vend1
//		tipoUsuario 2 -> Revenda vend2
//		tipoUsuario 3 -> Gestor Territorial vend5
//		tipoUsuario 4 -> Gestor Comercial (todos os pedidos)
		var matricula  = '';
		var A1_COD  = '';
		var A1_LOJA  = '';
		var conNumPedidoFluig  = '';
		var conNumPedidoInterno  = '';
		var conDataEmissaoDe  = '';
		var conDataEmissaoAte  = '';
		var conSituacao  = '';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'tipoUsuario' ) {
				tipoUsuario = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'matricula' ) {
				matricula = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'conNumPedidoFluig' ) {
				conNumPedidoFluig = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'conNumPedidoInterno' ) {
				conNumPedidoInterno = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'conDataEmissaoDe' ) {
				conDataEmissaoDe = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'conDataEmissaoAte' ) {
				conDataEmissaoAte = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'conSituacao' ) {
				conSituacao = constraints[i].initialValue;
			}
		}
		
		var camposValidos = true;
		if(matricula == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Matrícula não preenchido.'));
		}else if(tipoUsuario == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Tipo de Usuário não preenchido.'));
		}else if(tipoUsuario != 'GestorTerritorial' &&
				 tipoUsuario != 'RepresentanteNacional' && 
				 tipoUsuario != 'RepresentanteExportacao' && 
				 tipoUsuario != 'Revenda' &&
				 tipoUsuario != 'GestorComercial' &&
				 tipoUsuario != 'AdministrativoGTS' ){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Tipo de Usuário está inválido.'));
		}
		
		
		/*
		 * Valida se o tipo de usuário passado por parâmetro está valido no backend
		 */
		if(tipoUsuario == 'GestorTerritorial'){
			tipoUsuarioCod = '3';
			
			//GestorTerritorial
			var constEhPapelTer1 = DatasetFactory.createConstraint('gesTerWKUser', getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
			var constEhPapelTer = new Array(constEhPapelTer1);
			var dsColleagueRoleGestorTerritorial = DatasetFactory.getDataset('dsGestorTerritorial', null, constEhPapelTer, null);
			
			if(!dsTemValor(dsColleagueRoleGestorTerritorial)){
				//Não é um Gestor Territorial
				camposValidos = false;
				newDataset.addRow(new Array('2', 'Tipo de usuário Gestor Territorial está inválido.'));
			}
			
		}else if(tipoUsuario == 'RepresentanteNacional'){
			tipoUsuarioCod = '1';
			
			var achouGrupoNacional = false;
			for ( var i = 1; i <= 5; i++) {
				if(!achouGrupoNacional){
					//Dataset para verificar em qual grupo Territorial está o usuário Representante Nacional
					var nomeGrupoTerritorial = "Territorial" + i;
					var constrainsTer1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
					var constrainsTer2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", nomeGrupoTerritorial, nomeGrupoTerritorial, ConstraintType.MUST);
					var constrainsTer3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
					var constraintsTer = new Array(constrainsTer1, constrainsTer2, constrainsTer3);
					
					var dsGruposTer = DatasetFactory.getDataset("colleagueGroup", null, constraintsTer, null);
					if(dsTemValor(dsGruposTer)){
						
						//É um representante Nacional
						achouGrupoNacional = true;
						
					}
				}
			}
			if(!achouGrupoNacional){
				//Não é um Representante Nacional
				camposValidos = false;
				newDataset.addRow(new Array('2', 'Tipo de usuário Representante Nacional está inválido.'));
			}
			
		}else if(tipoUsuario == 'RepresentanteExportacao'){
			tipoUsuarioCod = '1';
			
			var nomeGrupoExportacao = "Exportacao1";
			var constrainsExp1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
			var constrainsExp2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", nomeGrupoExportacao, nomeGrupoExportacao, ConstraintType.MUST);
			var constrainsExp3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
			var constraintsExp = new Array(constrainsExp1, constrainsExp2, constrainsExp3);
			
			var dsGruposExp = DatasetFactory.getDataset("colleagueGroup", null, constraintsExp, null);
			if(!dsTemValor(dsGruposExp)){
				//Não é um Representante Exportação
				camposValidos = false;
				newDataset.addRow(new Array('2', 'Tipo de usuário Representante Exportação está inválido.'));
			}
			
		}else if(tipoUsuario == 'Revenda'){
			tipoUsuarioCod = '2';
			
			//Primeiro busca se o usuário solicitante está no grupo revendaMaquina
			var constrainsRev1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
			var constrainsRev2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "revendaMaquina", "revendaMaquina", ConstraintType.MUST);
			var constrainsRev3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
			var constraintsRev = new Array(constrainsRev1, constrainsRev2, constrainsRev3);
			
			var dsGruposRevMaq = DatasetFactory.getDataset("colleagueGroup", null, constraintsRev, null);
			if(dsTemValor(dsGruposRevMaq)){
				//É uma RevendaMaquina
				achouRevendaMaquina = true;
				
				//Estando no grupo revendaMaquina, busca o A1_COD e A1_LOJA nos dados adicionais
				var dsDadosAdicionais = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
				if(dsTemValor(dsDadosAdicionais)){
					
					if( dsDadosAdicionais.getValue(0, "A1_COD") != '' && dsDadosAdicionais.getValue(0, "A1_COD") !== undefined && dsDadosAdicionais.getValue(0, "A1_COD") != 'undefined' &&
						dsDadosAdicionais.getValue(0, "A1_LOJA") != '' && dsDadosAdicionais.getValue(0, "A1_LOJA") !== undefined && dsDadosAdicionais.getValue(0, "A1_LOJA") != 'undefined' ){
						
						A1_COD = dsDadosAdicionais.getValue(0, "A1_COD");
						A1_LOJA = dsDadosAdicionais.getValue(0, "A1_LOJA");
						
					} else{
						//Se não encontrou o código e loja nos dados adicionais
						camposValidos = false;
						newDataset.addRow(new Array('2', 'Tipo de usuário Revenda está com dados adicionais inválidos.'));
					}
					
				}
				
			}else{
				
				//Não é um Revenda
				camposValidos = false;
				newDataset.addRow(new Array('2', 'Tipo de usuário Revenda está inválido.'));
				
			}
		}else if(tipoUsuario == 'GestorComercial'){
			tipoUsuarioCod = '4';
			
			var constrainsGesCom1 = DatasetFactory.createConstraint("workflowColleagueRolePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
			var constrainsGesCom2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "GestorComercial1", "GestorComercial1", ConstraintType.MUST);
			var constrainsGesCom3 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
			var constrainsGesCom = new Array(constrainsGesCom1, constrainsGesCom2, constrainsGesCom3);
			
			var dsPapelGestorComercial = DatasetFactory.getDataset("workflowColleagueRole", null, constrainsGesCom, null);
			if(!dsTemValor(dsPapelGestorComercial)){
				//Não é um Gestor Comercial
				camposValidos = false;
				newDataset.addRow(new Array('2', 'Tipo de usuário Gestor Comercial está inválido.'));
			}
			
		}else if(tipoUsuario == 'AdministrativoGTS'){
			tipoUsuarioCod = '4';
			
			var constrainsPedMaqAdmGTS1 = DatasetFactory.createConstraint("workflowColleagueRolePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
			var constrainsPedMaqAdmGTS2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "cadastraPedidoDeMaquinaAdmGTS", "cadastraPedidoDeMaquinaAdmGTS", ConstraintType.MUST);
			var constrainsPedMaqAdmGTS3 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
			var constrainsPedMaqAdmGTS = new Array(constrainsPedMaqAdmGTS1, constrainsPedMaqAdmGTS2, constrainsPedMaqAdmGTS3);
			
			var dsPapelPedMaqAdmGTS = DatasetFactory.getDataset("workflowColleagueRole", null, constrainsPedMaqAdmGTS, null);
			if(!dsTemValor(dsPapelPedMaqAdmGTS)){
				//Não é um Administrativo GTS
				camposValidos = false;
				newDataset.addRow(new Array('2', 'Tipo de usuário Administrativo GTS está inválido.'));
			}
			
		}
		
		if(tipoUsuarioCod == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Cod. Tipo de usuário não definido.'));
		}
		
		if(!camposValidos){
			return newDataset;
		}
		
		
		var properties = {};
		properties["disable.chunking"] = "true";
		properties["log.soap.messages"] = "true";
		properties["receive.timeout"] = "300000"; //milissegundos 300000 igual a 5 minutos
		
		var supplierService = ServiceManager.getService('WSORCMAQ');
		var serviceHelper = supplierService.getBean();
		var serviceLocatorWSORCMAQ = serviceHelper.instantiate('br.com.protheus.WSORCMAQ');
		var service = serviceLocatorWSORCMAQ.getWSORCMAQSOAP();
		var metodosWSORCMAQ = supplierService.getCustomClient(service, "br.com.protheus.WSORCMAQSOAP", properties);


		var result = new Array();
		result = metodosWSORCMAQ.getpedido(tipoUsuarioCod, getValue("WKUser"),conNumPedidoFluig, conNumPedidoInterno, conDataEmissaoDe, conDataEmissaoAte, conSituacao );
		
		var INICOP = '';
		for(var i=0; i < result.getWSRETPED().size(); i++){
			var CODRET = result.getWSRETPED().get(i).getCODRET();
			if(CODRET == '1'){
					
				INICOP = ''
				if(result.getWSRETPED().get(i).getINICOP().trim() != ''){
					var DIA = result.getWSRETPED().get(i).getINICOP().trim().substring(6, 8);
					var MES = result.getWSRETPED().get(i).getINICOP().trim().substring(4, 6);
					var ANO = result.getWSRETPED().get(i).getINICOP().trim().substring(0, 4);
					INICOP = DIA + '/' + MES + '/' + ANO;
				}
				
				
				newDataset.addRow(new Array('1',
										'Sucesso',
										result.getWSRETPED().get(i).getIDFLUI(),
										result.getWSRETPED().get(i).getNUMORC(),
										result.getWSRETPED().get(i).getNUMPED(),
										result.getWSRETPED().get(i).getFILIAL(),
										result.getWSRETPED().get(i).getSTATUS(),
										result.getWSRETPED().get(i).getQUANT(),
										result.getWSRETPED().get(i).getCODPRD(),
										result.getWSRETPED().get(i).getDSCPRD(),
										result.getWSRETPED().get(i).getCONDPAG(),
										result.getWSRETPED().get(i).getLIBFIN(),
										result.getWSRETPED().get(i).getNUMSER(),
										result.getWSRETPED().get(i).getEMISSAO(),
										result.getWSRETPED().get(i).getTPFRETE(),
										result.getWSRETPED().get(i).getVLFRETE(),
										result.getWSRETPED().get(i).getENTREG(),
										INICOP,
										result.getWSRETPED().get(i).getVLITEM(),
										result.getWSRETPED().get(i).getVLNOTA(),
										
										result.getWSRETPED().get(i).getREVEND(),
										result.getWSRETPED().get(i).getREPRES(),
										result.getWSRETPED().get(i).getGESTOR(),

										result.getWSRETPED().get(i).getCLIENTE(),
										result.getWSRETPED().get(i).getCLICGC(),
										result.getWSRETPED().get(i).getCLIINSC(),
										result.getWSRETPED().get(i).getNUMNOTA(),
										result.getWSRETPED().get(i).getCHAVE(),
										result.getWSRETPED().get(i).getDTNOTA(),
										result.getWSRETPED().get(i).getCOBS()
										));
				     
				
			}else{
				var MSGRET = result.getWSRETPED().get(i).getMSGRET();
				newDataset.addRow(new Array('2', MSGRET));
			}
		}
	
    }catch(erro){    
    	log.info("Pedido Máqina: erro na busca de pedido: " + erro);
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

function temValor(valor){
	if(valor != null && valor != undefined && valor.trim() != ""){
		return true;
	}else{
		return false;
	}
}