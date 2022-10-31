function displayFields(form,customHTML){ 
	var atv_atual = getValue("WKNumState");
	form.setValue("WKNumState", getValue("WKNumState"));
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	injetarFuncoesUteisJS(form, customHTML);
	
	if(atv_atual == INICIO_0){
		form.setValue("WKUserSolicitante", getValue("WKUser"));
		
		var nomeUserSolicitante = "";
		var fields = ["colleagueName"];
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		var datasetColleague = DatasetFactory.getDataset("colleague", fields, [ c1, c2 ], null);
		if(dsTemValor(datasetColleague)){
			nomeUserSolicitante = datasetColleague.getValue(0, "colleagueName");
			
			if(temValor(nomeUserSolicitante)){
				form.setValue("solicitante", nomeUserSolicitante);
			}
		}
		
		var dataAberturaSolicitacao = dataAtual('dd/mm/yyyy');
		form.setValue("dataAberturaSolicitacao", dataAberturaSolicitacao);
		
		
		//Agora verifica qual o tipo de usuário é: Representante Nacional, Representante Internacional, Gestor Territorial, Gestor Comercial
		
		//Dataset Gestor Territorial
		var constEhPapelTer1 = DatasetFactory.createConstraint('gesTerWKUser', getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var constEhPapelTer = new Array(constEhPapelTer1);
		var dsColleagueRoleGestorTerritorial = DatasetFactory.getDataset('dsGestorTerritorial', null, constEhPapelTer, null);
		
		
		//Dataset Gestor Comercial
		var constEhPapelCom1 = DatasetFactory.createConstraint('gesComWKUser', getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var constEhPapelCom = new Array(constEhPapelCom1);
		var dsColleagueRoleGestorComercial = DatasetFactory.getDataset('dsGestorComercial', null, constEhPapelCom, null);
		
		
		if(dsTemValor(dsColleagueRoleGestorTerritorial)){
			//Se for Gestor Territorial
			defineCamposObrigatoriosGestorTerritorial(form,customHTML);
			//Se for mobile, vai aparecer para encaminhar para ele mesmo, como gestor territorial, já que nao tem a opção salvar para ficar com ele
			if(!isMobile(form)){
				removeEncaminharGestorTerritorial(form,customHTML);
			}
			
			form.setValue("tipoUsuarioAtual",  'GestorTerritoral');
			form.setValue("tipoSolicitante",  'GestorTerritoral');
			form.setValue("WKUserGestorTerritorial",  getValue("WKUser"));
			form.setValue("gestorTerritorial",  nomeUserSolicitante);
			form.setEnabled("gestorTerritorial", false);
			
		}else if(dsTemValor(dsColleagueRoleGestorComercial)){
			//Se for Gestor Comercial
			defineCamposObrigatoriosGestorComercial(form,customHTML);
			if(!isMobile(form)){
				removeEncaminharGestorComercial(form,customHTML);
			}
			form.setValue("tipoUsuarioAtual",  'GestorComercial');
			form.setValue("tipoSolicitante",  'GestorComercial');
			
			
		}else{
			//Se for Gestor Representante Nacional
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
						form.setValue("WKUserRepresentante", getValue("WKUser"));
						form.setValue("representante", nomeUserSolicitante);
						form.setValue("tipoUsuarioAtual",  'RepresentanteNacional');
						form.setValue("tipoSolicitante",  'RepresentanteNacional');
						
						
						//Dataset para busca do WKUser e nome do Gestor Territorial
						var constGrupoTer1 = DatasetFactory.createConstraint('gesTerGrupo', nomeGrupoTerritorial, nomeGrupoTerritorial, ConstraintType.MUST);
						var constGrupoTer = new Array(constGrupoTer1);
						var dsGestorTerritorialByGrupo = DatasetFactory.getDataset('dsGestorTerritorial', null, constGrupoTer, null);
						if(dsTemValor(dsGestorTerritorialByGrupo)){
							form.setValue("WKUserGestorTerritorial", dsGestorTerritorialByGrupo.getValue(0, "gesTerWKUser") )
							form.setValue("gestorTerritorial", dsGestorTerritorialByGrupo.getValue(0, "gesTerNome") )
							
						}
						
						defineCamposObrigatoriosRepresentante(form,customHTML);
						if(!isMobile(form)){
							removeEncaminharRepresentante(form,customHTML);
						}
						form.setEnabled("representante", false);
						form.setEnabled("gestorTerritorial", false);
					}
				}
			}
			
			if(!achouGrupoNacional){
				//Se for Gestor Representante Internacional
				var achouGrupoExportacao = false;
				for ( var i = 1; i <= 5; i++) {
					if(!achouGrupoExportacao){
						var nomeGrupoExportacao = "Exportacao" + i;
						var constrainsExp1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
						var constrainsExp2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", nomeGrupoExportacao, nomeGrupoExportacao, ConstraintType.MUST);
						var constrainsExp3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
						var constraintsExp = new Array(constrainsExp1, constrainsExp2, constrainsExp3);
						
						var dsGruposExp = DatasetFactory.getDataset("colleagueGroup", null, constraintsExp, null);
						if(dsTemValor(dsGruposExp)){
							//É um representante
							achouGrupoExportacao = true;
							form.setValue("WKUserRepresentante", getValue("WKUser"));
							form.setValue("representante", nomeUserSolicitante);
							form.setValue("tipoUsuarioAtual",  'RepresentanteExportacao');
							form.setValue("tipoSolicitante",  'RepresentanteExportacao');
							
							defineCamposObrigatoriosRepresentante(form,customHTML);
							if(!isMobile(form)){
								removeEncaminharRepresentante(form,customHTML);
							}
							removeEncaminharGestorTerritorial(form,customHTML);
							form.setEnabled("representante", false);
							form.setEnabled("gestorTerritorial", false);
						}
					}
				}
			}
			
		}
		
		
		removeDivStatus(form,customHTML);	
		defineGestorComercial(form,customHTML);
		removeEncaminharFinalizar(form,customHTML);		
		form.setVisibleById("divInteracoes", false);
				
	}else if( atv_atual == INICIO ){
		var tipoSolicitante = form.getValue("tipoSolicitante");
		
		if(form.getFormMode() == 'VIEW'){
			
			form.setVisibleById("divPanelEncaminha", false);
			
		}else{
			removeEncaminharFinalizar(form,customHTML);
			
			if(tipoSolicitante == 'GestorTerritoral'){
				
				removeEncaminharGestorTerritorial(form,customHTML);
				
				form.setEnabled("gestorTerritorial", false);
				
			}else if(tipoSolicitante == 'GestorComercial'){
				
				removeEncaminharGestorComercial(form,customHTML);
				//Tem evento no onload
				
			}else if(tipoSolicitante == 'RepresentanteNacional'){
				
				removeEncaminharRepresentante(form,customHTML);
				defineCamposObrigatoriosRepresentante(form,customHTML);
				form.setEnabled("representante", false);
				form.setEnabled("gestorTerritorial", false);
				form.setEnabled("statusSolicitacao", false);
				
			}else if(tipoSolicitante == 'RepresentanteExportacao'){
				
				removeEncaminharRepresentante(form,customHTML);
				removeEncaminharGestorTerritorial(form,customHTML);
				defineCamposObrigatoriosRepresentante(form,customHTML);
				form.setEnabled("representante", false);
				form.setEnabled("gestorTerritorial", false);
				form.setEnabled("statusSolicitacao", false);
			}
			
		}
		
	}else if( atv_atual == REPRESENTANTE ){
		
		removeCamposObrigatoriosCabecalho(form,customHTML);
		if(form.getFormMode() == 'VIEW'){
			
			form.setVisibleById("divPanelEncaminha", false);
			
		}else{
			
			//Tem situações que não estava puxando o WKUserGestorTerritorial, entao fiz um dataset para consultar o gestor territorial pelo nome
			var WKUserGestorTerritorial = form.getValue("WKUserGestorTerritorial");
			var gestorTerritorial = form.getValue("gestorTerritorial");
			if( gestorTerritorial != '' && WKUserGestorTerritorial == '' ){
				defineGestorTerritorialByNome(form,customHTML);
			}
			
			
			if(!isMobile(form)){
				removeEncaminharRepresentante(form,customHTML);
			}
			var solicitante = form.getValue("WKUserSolicitante");
			var WKUserAtual = getValue("WKUser");
			//Só aparece opção finalizar para o solicitante
			if(solicitante != WKUserAtual){
				 removeEncaminharFinalizar(form,customHTML);
			}
			
			//precisa ver se é naciona ou exp
			var tipoRepresentante = form.getValue("tipoRepresentante");
			form.setValue("tipoUsuarioAtual",  tipoRepresentante);
			//Se for Exportação, remove para enviar para Gestor Territorial
			if(tipoRepresentante == 'RepresentanteExportacao'){
				removeEncaminharGestorTerritorial(form,customHTML)
			}
			
			
		}
		
	}else if( atv_atual == GESTOR_TERRITORIAL ){
		
		removeCamposObrigatoriosCabecalho(form,customHTML);
		if(form.getFormMode() == 'VIEW'){
			
			form.setVisibleById("divPanelEncaminha", false);
			
		}else{
			//Tem situações que não estava puxando o WKUserGestorTerritorial, entao fiz um dataset para consultar o gestor territorial pelo nome
			var WKUserGestorTerritorial = form.getValue("WKUserGestorTerritorial");
			var gestorTerritorial = form.getValue("gestorTerritorial");
			if( gestorTerritorial != '' && WKUserGestorTerritorial == '' ){
				defineGestorTerritorialByNome(form,customHTML);
			}
			
			form.setValue("tipoUsuarioAtual",  'GestorTerritoral');
			if(!isMobile(form)){
				removeEncaminharGestorTerritorial(form,customHTML);
			}
			var solicitante = form.getValue("WKUserSolicitante");
			var WKUserAtual = getValue("WKUser");
			//Só aparece opção finalizar para o solicitante
			if(solicitante != WKUserAtual){
				 removeEncaminharFinalizar(form,customHTML);
			}
		}
		
		
	}else if( atv_atual == GESTOR_COMERCIAL ){
		
		removeCamposObrigatoriosCabecalho(form,customHTML);
		if(form.getFormMode() == 'VIEW'){
			
			form.setVisibleById("divPanelEncaminha", false);
			
		}else{
			//Tem situações que não estava puxando o WKUserGestorTerritorial, entao fiz um dataset para consultar o gestor territorial pelo nome
			var WKUserGestorTerritorial = form.getValue("WKUserGestorTerritorial");
			var gestorTerritorial = form.getValue("gestorTerritorial");
			if( gestorTerritorial != '' && WKUserGestorTerritorial == '' ){
				defineGestorTerritorialByNome(form,customHTML);
			}
			
			form.setValue("tipoUsuarioAtual",  'GestorComercial');
			if(!isMobile(form)){
				removeEncaminharGestorComercial(form,customHTML);
			}
			var solicitante = form.getValue("WKUserSolicitante");
			var WKUserAtual = getValue("WKUser");
			//Só aparece opção finalizar para o solicitante
			if(solicitante != WKUserAtual){
				 removeEncaminharFinalizar(form,customHTML);
			}
			
			//precisa ver se Representante é naciona ou exp
			var tipoRepresentante = form.getValue("tipoRepresentante");
			//Se for Exportação, remove para enviar para Gestor Territorial
			if(tipoRepresentante == 'RepresentanteExportacao'){
				removeEncaminharGestorTerritorial(form,customHTML)
			}
		}
		
	}else if( atv_atual == FIM ){
		
		removeCamposObrigatoriosCabecalho(form,customHTML);
		form.setVisibleById("divPanelEncaminha", false);
		
	}

}

function removeEncaminharRepresentante(form,customHTML){
	form.setVisibleById("optEncaminhaRepresentante", false);
	customHTML.append("<script>$('#optEncaminhaRepresentante').prop('disabled', true );</script>");
}

function removeEncaminharGestorTerritorial(form,customHTML){
	form.setVisibleById("optEncaminhaGestorTerritorial", false);
	customHTML.append("<script>$('#optEncaminhaGestorTerritorial').prop('disabled', true );</script>");
}

function removeEncaminharGestorComercial(form,customHTML){
	form.setVisibleById("optEncaminhaGestorComercial", false);
	customHTML.append("<script>$('#optEncaminhaGestorComercial').prop('disabled', true );</script>");
}

function removeEncaminharFinalizar(form,customHTML){
	form.setVisibleById("optEncaminhaFinalizar", false);
	customHTML.append("<script>$('#optEncaminhaFinalizar').prop('disabled', true );</script>");
}

function defineGestorComercial(form,customHTML){

	var dsColleagueRoleGestorComercial = DatasetFactory.getDataset('dsGestorComercial', null, null, null);
	if(dsTemValor(dsColleagueRoleGestorComercial)){
		form.setValue("WKUserGestorComercial", dsColleagueRoleGestorComercial.getValue(0, "gesComWKUser") );
		form.setValue("gestorComercial", dsColleagueRoleGestorComercial.getValue(0, "gesComNome") );
	}
	form.setEnabled("gestorComercial", false);
}

function defineCamposObrigatoriosRepresentante(form,customHTML){
	form.setVisibleById("asteriscoRepresentante", false);
	form.setVisibleById("asteriscoGestorTerritorial", false);
	form.setVisibleById("asteriscoGestorComercial", false);
}

function defineCamposObrigatoriosGestorTerritorial(form,customHTML){
	form.setVisibleById("asteriscoGestorTerritorial", false);
	form.setVisibleById("asteriscoGestorComercial", false);
}

function defineCamposObrigatoriosGestorComercial(form,customHTML){
	form.setVisibleById("asteriscoGestorComercial", false);
}

function removeCamposObrigatoriosCabecalho(form,customHTML){
	form.setVisibleById("asteriscoRepresentante", false);
	form.setVisibleById("asteriscoGestorTerritorial", false);
	form.setVisibleById("asteriscoGestorComercial", false);
	form.setVisibleById("asteriscoRevendaCliente", false);
	form.setVisibleById("asteriscoAcao", false);
	form.setVisibleById("asteriscoDescricao", false);
	
}

function removeDivStatus(form,customHTML){
	form.setVisibleById("divStatus", false);
}

function defineGestorTerritorialByNome(form,customHTML){
	var WKUserGestorComercial = "";
	var nomeGestorComercial = form.getValue("gestorTerritorial");
	var c1 = DatasetFactory.createConstraint("gesTerNome", nomeGestorComercial, nomeGestorComercial, ConstraintType.MUST);
	var dsColleagueGestorComercial = DatasetFactory.getDataset("dsGestorTerritorialByNome", null, [ c1 ], null);
	if(dsTemValor(dsColleagueGestorComercial)){
		WKUserGestorComercial = dsColleagueGestorComercial.getValue(0, "gesTerWKUser");
		form.setValue("WKUserGestorTerritorial",  WKUserGestorComercial);
	}
}
