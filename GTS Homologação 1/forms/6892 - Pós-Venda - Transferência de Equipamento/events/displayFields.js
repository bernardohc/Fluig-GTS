function displayFields(form,customHTML){ 
	var atv_atual = getValue("WKNumState");
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);
	
	var usuarioCorrente = fluigAPI.getUserService().getCurrent();
	
	/*
	 * INICIO PARA TODAS AS ATIVIDADES
	 */
	var tipoUsuario = getTipoUsuario();
	if(tipoUsuario == 'Administrativo GTS'){
		form.setVisibleById("divEquipNumNotaFiscal", true);
		form.setVisibleById("divRevendaVinculadaEquipamento", true);
	}
	form.setValue("revEstado", form.getValue("revEstadoHidden"));
	form.setValue("revEquipEstado", form.getValue("revEquipEstadoHidden"));
	/*
	 * FIM PARA TODAS AS ATIVIDADES
	 */
	
	
	if(atv_atual == INICIO_0){
		
		customHTML.append("<script>$('#progressBar').css({'width':'0%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('0%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Início')</script>");
		
		
		//Verifica qual o tipo de usuário é: Revenda, Administrativo GTS
		
		form.setValue("tipoSolicitante",  tipoUsuario);
		
		if(tipoUsuario == 'Revenda'){
			//Estando no grupo revenda, busca o A1_COD e A1_LOJA nos dados adicionais
			var dsDadosAdicionais = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
			if(dsTemValor(dsDadosAdicionais)){
				
				if( dsDadosAdicionais.getValue(0, "A1_COD") != '' && dsDadosAdicionais.getValue(0, "A1_COD") !== undefined && dsDadosAdicionais.getValue(0, "A1_COD") != 'undefined' &&
					dsDadosAdicionais.getValue(0, "A1_LOJA") != '' && dsDadosAdicionais.getValue(0, "A1_LOJA") !== undefined && dsDadosAdicionais.getValue(0, "A1_LOJA") != 'undefined' &&
					dsDadosAdicionais.getValue(0, "A1_GERENTE") != '' && dsDadosAdicionais.getValue(0, "A1_GERENTE") !== undefined && dsDadosAdicionais.getValue(0, "A1_GERENTE") != 'undefined' &&
					dsDadosAdicionais.getValue(0, "A1_TIPO") != '' && dsDadosAdicionais.getValue(0, "A1_TIPO") !== undefined && dsDadosAdicionais.getValue(0, "A1_TIPO") != 'undefined' ){ 
						
					form.setValue("A1_COD", dsDadosAdicionais.getValue(0, "A1_COD"));
					form.setValue("A1_LOJA", dsDadosAdicionais.getValue(0, "A1_LOJA"));
					form.setValue("A1_TIPO", dsDadosAdicionais.getValue(0, "A1_TIPO"));
					form.setValue("gerenteRevenda",  dsDadosAdicionais.getValue(0, "A1_GERENTE"));
					
					var c1 = DatasetFactory.createConstraint("A1_COD", dsDadosAdicionais.getValue(0, "A1_COD"), "", ConstraintType.MUST);
					var c2 = DatasetFactory.createConstraint("A1_LOJA", dsDadosAdicionais.getValue(0, "A1_LOJA"), "", ConstraintType.MUST);
					var datasetConsultaRevenda = DatasetFactory.getDataset("dsTransEqptConsultaRevenda", null, [ c1, c2 ], null);
					if(dsTemValor(datasetConsultaRevenda)){
						if(datasetConsultaRevenda.getValue(0, "CODRET") == '1'){
							form.setValue("revCpfCnpj", datasetConsultaRevenda.getValue(0, "REVCGC"));
							form.setValue("revRazaoSocialRevenda", datasetConsultaRevenda.getValue(0, "RECRAZAOSOCIAL"));
							form.setValue("revNomeFantasiaRevenda", datasetConsultaRevenda.getValue(0, "REVNOMEFANTASIA"));
							form.setValue("revCodigo", dsDadosAdicionais.getValue(0, "A1_COD") );
							form.setValue("revLoja", dsDadosAdicionais.getValue(0, "A1_LOJA"));
							form.setValue("revCidade", datasetConsultaRevenda.getValue(0, "REVCIDADE"));
							form.setValue("revEstadoHidden", datasetConsultaRevenda.getValue(0, "REVESTADO"));
							form.setValue("revEstado", datasetConsultaRevenda.getValue(0, "REVESTADO"));
							form.setValue("revEmail", datasetConsultaRevenda.getValue(0, "REVEMAIL"));
							form.setValue("revTelefone", datasetConsultaRevenda.getValue(0, "REVTELEFONE"));
							
						}else{
							customHTML.append("<script>FLUIGC.toast({message: 'Erro ao consultar os dados da sua Revenda:<br> "+datasetConsultaRevenda.getValue(0, "MSGRET")+"', type: 'danger'});</script>");
							ocultaCabecalhosForm(form, customHTML);
						}
					}
					
					
				} else{
					//Se não encontrou o código e loja nos dados adicionais
					customHTML.append("<script>FLUIGC.toast({message: 'Os dados adicionais do seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
					ocultaCabecalhosForm(form, customHTML);
				}
				
			}
			
		}else {
			//Se não encontrou o código e loja nos dados adicionais
			customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
			ocultaCabecalhosForm(form, customHTML);
		}
		
	}else if( atv_atual == INICIO ){
		
		customHTML.append("<script>$('#progressBar').css({'width':'0%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('0%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Início')</script>");
		
	}else if( atv_atual == GTS_ANALISA_DEMANDA ){
		
		customHTML.append("<script>$('#progressBar').css({'width':'50%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('50%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Análise e Aprovação da Transferência pela GTS')</script>");
		
		if(form.getFormMode() == 'MOD'){
			form.setVisibleById("divAnaliseGTS", true);
		}
		
	}else if( atv_atual == REVENDA_VERIFICA_RETORNO ){
		
		customHTML.append("<script>$('#progressBar').css({'width':'90%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('90%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Revenda Ciente do Retorno da GTS')</script>");
		
		//Análise e Aprovação da Transferência
		form.setVisibleById("divAnaliseGTS", true);
		
		if(form.getFormMode() == 'MOD'){
			//Revenda Ciente do Retorno da GTS
			form.setVisibleById("divRevendaCienteRetorno", true);
		}
	}else if ( atv_atual == FIM){
		
		customHTML.append("<script>$('#progressBar').css({'width':'100%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('100%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Finalizado')</script>");
		
		//Análise e Aprovação da Transferência
		form.setVisibleById("divAnaliseGTS", true);
		//Revenda Ciente do Retorno da GTS
		form.setVisibleById("divRevendaCienteRetorno", true);
		
	}
	

}


/**
 * Função para verificar se o usuário logado é uma Revenda, pertencente ao grupo 000009
 * @returns {String}
 */
function getTipoUsuario(){
	
	var tipoUsuario = '';
	var usuarioCorrente = fluigAPI.getUserService().getCurrent();
	
	//Primeiro busca se o usuário solicitante está no grupo revenda
	var constrainsRev1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	//Entrega Técnica - Revenda
	var constrainsRev2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "000009", "000009", ConstraintType.MUST);
	var constrainsRev3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", usuarioCorrente.getCode(),  usuarioCorrente.getCode(), ConstraintType.MUST);
	var constraintsRev = new Array(constrainsRev1, constrainsRev2, constrainsRev3);
	
	var dsGruposRev = DatasetFactory.getDataset("colleagueGroup", null, constraintsRev, null);
	if(dsTemValor(dsGruposRev)){
		//É uma Revenda
		tipoUsuario = 'Revenda';
	}else{
		
		//Pós-Vendas - Transferência de Equipamento - Administrativo GTS
		var constrainsTransEquipAdmGTS1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		//Entrega Técnica - Administrativo GTS
		var constrainsTransEquipAdmGTS2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "000037", "000037", ConstraintType.MUST);
		var constrainsTransEquipAdmGTS3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", usuarioCorrente.getCode(),  usuarioCorrente.getCode(), ConstraintType.MUST);
		var constrainsTransEquipAdmGTS = new Array(constrainsTransEquipAdmGTS1, constrainsTransEquipAdmGTS2, constrainsTransEquipAdmGTS3);
		
		var dsGrupoTransEquipAdmGTS = DatasetFactory.getDataset("colleagueGroup", null, constrainsTransEquipAdmGTS, null);
		if(dsTemValor(dsGrupoTransEquipAdmGTS)){
			//É um Administrativo GTS
			tipoUsuario = 'Administrativo GTS';
		}
	}
	
	
	return tipoUsuario;
	
	
}