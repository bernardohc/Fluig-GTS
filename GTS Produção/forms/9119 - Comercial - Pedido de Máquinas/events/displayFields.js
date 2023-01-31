function displayFields(form,customHTML){ 
	var atv_atual = getValue("WKNumState");
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);
	
	/*
	* form.getFormMode();
	* ADD - Momento inicial do formulário antes de iniciar e/ou salvar o processo
	* MOD - Momento a qual os campos estão editavéis para o usuário modificar após iniciar e/ou salvar o processo
	* VIEW - Modo de visualização do formulário
	*/
	var modoDeVisualizacaoDoFormulario = form.getFormMode();
	
	/*
	 * Início Eventos Globais (para todas as atividades)
	 */

	//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
	removeBotaoImprimir(form, customHTML);
	
	//Se for marcado como Possui Peça SIM, mostra a div dos dados da peça
	if(form.getValue("pecaPossuiPeca") == "pecaPossuiPecaSim"){
		form.setVisibleById("divPossuiPecaSim", true);
	}
	
	//Se não tiver preenchido nada na tabela de comunicação interna, esconde a tabela
	var indexesComunicacaoInterna = form.getChildrenIndexes("tbComunicacaoInterna");
	if(indexesComunicacaoInterna.length == 0){
		form.setVisibleById("divTbComInterna", false);
	}
	//Somente se estiver abrindo a solicitação aparece o botão de deletar
	if(form.getFormMode() == 'ADD'){
		customHTML.append("<script>$('.tdDeleteRowComunicacaoInterna').show();</script>");
	}
	
	/*
	 * Este campo serve para quando cancelar automaticamente, marcar que pode cancelar
	 * Deixa sempre vazio, porque se estiver como 'cancelar', vai poder cancelar
	 */
	form.setValue("cancelamentoAutomatico", "");
	
	/*
	 * Fim Eventos Globais (para todas as atividades)
	 */
	
	if(atv_atual == INICIO_0){
		
		form.setValue("pedVersao", "Original");
		
		//Oculta botão imprimir no início_O, pq ainda náo tem o Id Fluig
		form.setVisibleById("divImprimir", false);
		
		
		form.setValue("defineGeracaoPedidoInicio", "GerarPedido");
		
		// Obtém objeto com dados do usuário atual via uso da SDK, representada pelo objeto fluigAPI
		//Seta os campos de Solicitante
		var solicitante = fluigAPI.getUserService().getCurrent();
		form.setValue("solWKUser", solicitante.getCode());
		form.setValue("solNome", solicitante.getFullName());
		form.setValue("solEmail", solicitante.getEmail());
		
		//Seta campo de Data de Abertura e Validade de Pedido
		var dataAberturaSolicitacao = dataAtual('dd/mm/yyyy');
		form.setValue("solDataAbertura", dataAberturaSolicitacao);

		var dataValidadePedido = addDias("dd/MM/yyyy", dataAtual('dd/mm/yyyy'), 90);
		form.setValue("solDataValidadePedido", dataValidadePedido);
		
		/**
		 * 
		 * Agora verifica qual o tipo de usuário é: 
		 * Representante Nacional, 
		 * Representante Exportação, 
		 * Gestor Territorial, 
		 * Gestor Comercial, 
		 * Revenda,
		 * Administrativo GTS
		 *
		 */
		
		/**
		 * Primeira Verificação: Gestor Territorial
		 * 
		 * Se o usuário estiver aqui, ele é um Gestor Territorial
		 * Verifica se o usuário que está abrindo a solicitação está no papel de GestorTerritorial1 , GestorTerritorial2, ou GestorTerritorial3
		 * Se o usuário estiver nesses grupos, é entendido que ele é um Gestor Territorial
		 */
		var constEhPapelTer1 = DatasetFactory.createConstraint('gesTerWKUser', getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var constEhPapelTer = new Array(constEhPapelTer1);
		var dsColleagueRoleGestorTerritorial = DatasetFactory.getDataset('dsGestorTerritorial', null, constEhPapelTer, null);
		
		if(dsTemValor(dsColleagueRoleGestorTerritorial)){
			
			setSolicitanteGestorTerritorial(form, customHTML);
			
		}else{
			
			/**
			 * Segunda verificação: Representante Nacional
			 * 
			 * Se o usuário estiver em algum grupo do tipo Territorial1, Territorial2, Territorial3, Territorial4 ou Territorial5
			 * É entendido que quem está abrindo a solcitação é um Representante Nacional
			 * 
			 * 
			 * Achando o Representante Nacional, já é realizada a busca do Gestor Territorial dele,
			 * já que é retornado em qual grupo Territorial está o representante
			 * buscando o papel de Gestor Territorial daquele grupo
			 */
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
						setSolicitanteRepresentanteNacional(form, customHTML, nomeGrupoTerritorial);
						
						
					}
				}
			}
			
			//Se não achou no Nacianal , dentro dos grupos de Territorial, vai procurar no grupo Exportacao1
			/**
			 * Terceira Verificação: Representante Exportação
			 * 
			 * Se não achou como um Representante Nacional, vai buscar como um Representante Exportação
			 * 
			 * Vai verificar se o usuário que está abrindo a solicitação, está em algum grupo do tipo Exportacao1
			 * É entendido que quem está abrindo a solcitação é um Representante Exportação
			 * 
			 * Achando o Representante Exportação, já é realizada a busca do Gestor Comercial dele,
			 * É buscado quem é o GertorComercial do grupo Exportacao1
			 */
			if(!achouGrupoNacional){
				//Se for Gestor Representante Internacional
				var achouGrupoExportacao = false;
				
				var nomeGrupoExportacao = "Exportacao1";
				var constrainsExp1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
				var constrainsExp2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", nomeGrupoExportacao, nomeGrupoExportacao, ConstraintType.MUST);
				var constrainsExp3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
				var constraintsExp = new Array(constrainsExp1, constrainsExp2, constrainsExp3);
				
				var dsGruposExp = DatasetFactory.getDataset("colleagueGroup", null, constraintsExp, null);
				if(dsTemValor(dsGruposExp)){
					//É um representante Exportação
					achouGrupoExportacao = true;
					setSolicitanteRepresentanteExportacao(form, customHTML, nomeGrupoExportacao);
					
					

				}
			}
			
			/**
			 * Quarta Verificação: Revenda
			 * 
			 * Se ainda não achou como Gestor Territorial, Representante Nacional ou Representante Exportação
			 * Vai verificar se é uma Revenda
			 * 
			 * Primeiro, precisa estar no grupo revendaMaquina
			 * Depois puxa o código e loja que estão nos dados adicionais da revenda.
			 * Com o código e loja, é buscado lá no Protheus, quem é o Representante desta revenda.
			 * Encontrato o Representante, é buscado o Gestor Territorial deste Representante
			 */
			var achouRevendaMaquina = false;
			if(!achouGrupoNacional && !achouGrupoExportacao){
				
				//Primeiro busca se o usuário solicitante está no grupo revendaMaquina
				var constrainsRev1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
				var constrainsRev2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "revendaMaquina", "revendaMaquina", ConstraintType.MUST);
				var constrainsRev3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
				var constraintsRev = new Array(constrainsRev1, constrainsRev2, constrainsRev3);
				
				var dsGruposRevMaq = DatasetFactory.getDataset("colleagueGroup", null, constraintsRev, null);
				if(dsTemValor(dsGruposRevMaq)){
					//É uma RevendaMaquina
					achouRevendaMaquina = true;
					
					form.setValue("solTipoSolicitante",  'RevendaMaquina');
					form.setValue("solTipoSolicitanteDesc",  'Revenda');
					
					//Estando no grupo revendaMaquina, busca o A1_COD e A1_LOJA nos dados adicionais
					var dsDadosAdicionais = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
					if(dsTemValor(dsDadosAdicionais)){
						
						if( dsDadosAdicionais.getValue(0, "A1_COD") != '' && dsDadosAdicionais.getValue(0, "A1_COD") !== undefined && dsDadosAdicionais.getValue(0, "A1_COD") != 'undefined' &&
							dsDadosAdicionais.getValue(0, "A1_LOJA") != '' && dsDadosAdicionais.getValue(0, "A1_LOJA") !== undefined && dsDadosAdicionais.getValue(0, "A1_LOJA") != 'undefined' ){
							
							
							setSolicitanteRevenda(form, customHTML, dsDadosAdicionais.getValue(0, "A1_COD"),  dsDadosAdicionais.getValue(0, "A1_LOJA"));
							
							
						} else{
							//Se não encontrou o código e loja nos dados adicionais
							customHTML.append("<script>FLUIGC.toast({message: 'Os dados adicionais do seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
							ocultaCabecalhosForm(form, customHTML);
							
							
						}
						
					}
					
				}
				
			}
			
			/**
			 * Quinta Verificação: AdministrativoGTS
			 * 
			 * Se não encontrou em nenhuma etapa acima, é definido como um AdministrativoGTS
			 * 
			 */ 
			var achouPapelPedMaqAdmGTS = false;
			if(!achouGrupoNacional && !achouGrupoExportacao && !achouRevendaMaquina){
				
				var constrainsPedMaqAdmGTS1 = DatasetFactory.createConstraint("workflowColleagueRolePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
				var constrainsPedMaqAdmGTS2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "cadastraPedidoDeMaquinaAdmGTS", "cadastraPedidoDeMaquinaAdmGTS", ConstraintType.MUST);
				var constrainsPedMaqAdmGTS3 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
				var constrainsPedMaqAdmGTS = new Array(constrainsPedMaqAdmGTS1, constrainsPedMaqAdmGTS2, constrainsPedMaqAdmGTS3);
				
				var dsPapelPedMaqAdmGTS = DatasetFactory.getDataset("workflowColleagueRole", null, constrainsPedMaqAdmGTS, null);
				if(dsTemValor(dsPapelPedMaqAdmGTS)){
					//Se não achou como GestorTerritorial ou RepresentanteNacional ou RepresentanteExportacao, Revenda Máquina é um AdministrativoGTS
					achouPapelPedMaqAdmGTS = true;
					setSolicitanteAdministrativoGTS(form, customHTML);
					
				}
			}
			
			
			if(!achouGrupoNacional && !achouGrupoExportacao && !achouRevendaMaquina && !achouPapelPedMaqAdmGTS){
				//Se não encontrou o código e loja nos dados adicionais
				customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
				ocultaCabecalhosForm(form, customHTML);
				
			}
			
		}
		
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
	}else if( atv_atual == INICIO ){
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão imprimir se for mobile
		if(isMobile(form)){
			form.setVisibleById("divImprimir", false);
		}
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		form.setValue("cliUF", form.getValue("cliUFHidden"));
		
		if(form.getValue("solTipoSolicitanteDesc") == "Revenda"){
			customHTML.append("<script>$('#lbDefineGerarPedido').text('Enviar pedido para o Representante')</script>");
		}
		
		if(modoDeVisualizacaoDoFormulario == "VIEW"){
			customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
			form.setVisibleById("divPreencheComInterna", false);
		}else{
			
			form.setValue("defineGeracaoPedidoInicio", "");
			
			form.setVisibleById("divPedidoInicial", true);
			
			var solTipoSolicitante = form.getValue("solTipoSolicitante");
			
			if(solTipoSolicitante == "GestorTerritorial"){
				
				//Se a abertura for de um GestorTerritorial, vai buscar novamente os dados de GestorTerritorial
				setSolicitanteGestorTerritorial(form, customHTML);
				
			}else if(solTipoSolicitante == "RepresentanteNacional"){
				
				//Se a abertura for um RepresentanteNacional
				//Busca o Grupo atual deste RepresentanteNacional e busca os dados atuais do GestorTerritorial dele.
				var repWKUser = form.getValue("repWKUser");
				var constRepComWKUser = DatasetFactory.createConstraint('RepComWKUser', repWKUser, repWKUser, ConstraintType.MUST);
				var constRepCom = new Array(constRepComWKUser);
				var dsRepresentanteComercial= DatasetFactory.getDataset('dsPedMaqRepresentanteComercial', null, constRepCom, null);
				
				if(dsTemValor(dsRepresentanteComercial)){
					var nomeGrupoTerritorial = dsRepresentanteComercial.getValue(0, "RepComGrupo")
					setSolicitanteRepresentanteNacional(form, customHTML, nomeGrupoTerritorial);
				}else{
					customHTML.append("<script>FLUIGC.toast({ title: '', message: 'Erro ao consultar dados do Representante, comunicar o Administrador do Sistema!', type: 'danger' });</script>");
					form.setValue("repA3COD", "" );
					form.setValue("repGesTerA3COD", "" );
					form.setValue("repGesComA3COD", "" );
				}
			
				
			}else if(solTipoSolicitante == "RepresentanteExportacao"){
				
				//Se a abertura for um RepresentanteExportacao
				//Busca o Grupo atual deste RepresentanteExportacao e busca os dados atuais do GestorComercial dele.
				var repWKUser = form.getValue("repWKUser");
				var constRepComWKUser = DatasetFactory.createConstraint('RepComWKUser', repWKUser, repWKUser, ConstraintType.MUST);
				var constRepCom = new Array(constRepComWKUser);
				var dsRepresentanteComercial= DatasetFactory.getDataset('dsPedMaqRepresentanteComercial', null, constRepCom, null);
				
				if(dsTemValor(dsRepresentanteComercial)){
					var nomeGrupoExportacao = dsRepresentanteComercial.getValue(0, "RepComGrupo")
					setSolicitanteRepresentanteExportacao(form, customHTML, nomeGrupoExportacao);
				}else{
					customHTML.append("<script>FLUIGC.toast({ title: '', message: 'Erro ao consultar dados do Representante, comunicar o Administrador do Sistema!', type: 'danger' });</script>");
					form.setValue("repA3COD", "" );
					form.setValue("repGesTerA3COD", "" );
					form.setValue("repGesComA3COD", "" );
				}
			
				
			}else if(solTipoSolicitante == "RevendaMaquina"){
				//Se a abertura for um RevendaMaquina
				//Estando no grupo revendaMaquina, busca o A1_COD e A1_LOJA nos dados adicionais
				var dsDadosAdicionais = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
				if(dsTemValor(dsDadosAdicionais)){
					
					if( dsDadosAdicionais.getValue(0, "A1_COD") != '' && dsDadosAdicionais.getValue(0, "A1_COD") !== undefined && dsDadosAdicionais.getValue(0, "A1_COD") != 'undefined' &&
						dsDadosAdicionais.getValue(0, "A1_LOJA") != '' && dsDadosAdicionais.getValue(0, "A1_LOJA") !== undefined && dsDadosAdicionais.getValue(0, "A1_LOJA") != 'undefined' ){
						
						setSolicitanteRevenda(form, customHTML, dsDadosAdicionais.getValue(0, "A1_COD"),  dsDadosAdicionais.getValue(0, "A1_LOJA"));
						
					} else{
						//Se não encontrou o código e loja nos dados adicionais
						customHTML.append("<script>FLUIGC.toast({message: 'Os dados adicionais do seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
						ocultaCabecalhosForm(form, customHTML);
						
					}
					
				}
				
				//Caso for uma solicitação de RevendaMaquina e não tiver preenchido o campo solAcompanhaPedidoWKUser
				//Mostra essa mensagem para ter a ciencia que não tem um representante definitivo para acompanhamento
				if(form.getValue("solAcompanhaPedidoWKUser") == ""){
					customHTML.append("<script>FLUIGC.toast({message: 'Não está definido o Representante que acompanhará o pedido. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
				}
				
			}else if(solTipoSolicitante == "AdministrativoGTS"){
				
				//Quando for AdministrativoGTS não faz nada, pois fica aberto para ele alterar e buscar os novos códigos 
				
			}
			
		}
		
	}else if( atv_atual == REV_CIENTE_PED || atv_atual == REP_CIENTE_PED || atv_atual == GESTER_CIENTE_PED ){
		//Somente para as atividades de notificações
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		//Oculta busca de máquina
		customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
		customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
		
		form.setValue("cliUF", form.getValue("cliUFHidden"));
		
		if(modoDeVisualizacaoDoFormulario == "MOD"){
			if( atv_atual == REV_CIENTE_PED ){
				form.setVisibleById("divRevChkCientePedido", true);
			}else if( atv_atual == REP_CIENTE_PED ){
				form.setVisibleById("divRepChkCientePedido", true);
			}else if(atv_atual == GESTER_CIENTE_PED){
				form.setVisibleById("divRepGesTerChkCientePedido", true);
			}
		}else if(modoDeVisualizacaoDoFormulario == "VIEW"){
			form.setVisibleById("divPreencheComInterna", false);
		}
	
		
	}else if( atv_atual == CANCEL_INICIO ){
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		//Oculta busca de máquina
		customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
		customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
		
		form.setValue("cliUF", form.getValue("cliUFHidden"));
		form.setVisibleById("divMotivoCancelamentoGeracaoPedido", true);
		form.setVisibleById("divPedidoInicial", true);
		form.setVisibleById("divPreencheComInterna", false);
		
	}else if( atv_atual == REP_VERIFICA_PED ){	
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão imprimir se for mobile
		if(isMobile(form)){
			form.setVisibleById("divImprimir", false);
		}
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		form.setValue("cliUF", form.getValue("cliUFHidden"));
		
		form.setValue("defineGeracaoPedidoInicio", "");
		
		if(modoDeVisualizacaoDoFormulario == "MOD"){
			customHTML.append("<script>$('#divDefineRetornarRevenda').show();</script>");
			form.setVisibleById("divPedidoInicial", true);
		}else if(modoDeVisualizacaoDoFormulario == "VIEW"){
			//Oculta busca de máquina
			customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
			customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
			form.setVisibleById("divPreencheComInterna", false);
		}
		
	}else if( atv_atual == REV_VERIFICA_PED ){	
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão imprimir se for mobile
		if(isMobile(form)){
			form.setVisibleById("divImprimir", false);
		}
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		form.setValue("cliUF", form.getValue("cliUFHidden"));
		
		if(modoDeVisualizacaoDoFormulario == "MOD"){
			customHTML.append("<script>$('#lbDefineGerarPedido').text('Enviar pedido para o Representante')</script>");
			form.setValue("defineGeracaoPedidoInicio", "");
			
			form.setVisibleById("divPedidoInicial", true);
		}else if(modoDeVisualizacaoDoFormulario == "VIEW"){
			//Oculta busca de máquina
			customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
			customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
			form.setVisibleById("divPreencheComInterna", false);
		}
	
	}else if( atv_atual == REV_RET_ADM_GTS ){
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão imprimir se for mobile
		if(isMobile(form)){
			form.setVisibleById("divImprimir", false);
		}
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		form.setValue("cliUF", form.getValue("cliUFHidden"));
		
		
	   if(modoDeVisualizacaoDoFormulario == "VIEW"){
			//Oculta busca de máquina
			customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
			customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
			form.setVisibleById("divPreencheComInterna", false);
		}
		
	    form.setVisibleById("divAprovacaoAdministrativoGTS", true);
		
	}else if( atv_atual == REP_CANCEL_REV ){	
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		form.setValue("cliUF", form.getValue("cliUFHidden"));
		form.setVisibleById("divMotivoCancelamentoGeracaoPedido", true);
		form.setVisibleById("divPedidoInicial", true);
		
		if(modoDeVisualizacaoDoFormulario == "VIEW"){
			//Oculta busca de máquina
			customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
			customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
			form.setVisibleById("divPreencheComInterna", false);
		}
	}else if( atv_atual == GER_TER_APROVA ){
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão imprimir se for mobile
		if(isMobile(form)){
			form.setVisibleById("divImprimir", false);
		}
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		form.setValue("cliUF", form.getValue("cliUFHidden"));
		
		//Oculta busca de máquina
		customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
		customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
		
		form.setVisibleById("divAprovacaoGerTerritorial", true);
		
		if( form.getValue("revPedSolicitanteAcao") != "" ){
			form.setVisibleById("divSolRevisaPedido", true);
		}
		
		if(modoDeVisualizacaoDoFormulario == "VIEW"){
			form.setVisibleById("divPreencheComInterna", false);
		}else{
			//Seta vazio o campo de aprovação do Gerente Territorial
			form.setValue("aprovGerTerritorial", "");
			
		}
		
	}else if( atv_atual == REVISA_ORC){
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão imprimir se for mobile
		if(isMobile(form)){
			form.setVisibleById("divImprimir", false);
		}
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		form.setValue("cliUF", form.getValue("cliUFHidden"));
		form.setVisibleById("divAprovacaoGerTerritorial", true);
		form.setVisibleById("divMotivoReprovadoGerTerritorial", true);
		
		if(modoDeVisualizacaoDoFormulario == "VIEW"){
			//Oculta busca de máquina
			customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
			customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
			form.setVisibleById("divPreencheComInterna", false);
		}else{
			form.setVisibleById("divSolRevisaPedido", true);
			
			/*
			 * Quando estiver nesta atividade, vai liberar para 'cancelar' automaticamente
			 */
			form.setValue("cancelamentoAutomatico", "cancelar");
		}

	}else if( atv_atual == CANCEL_REV ){	
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão imprimir se for mobile
		if(isMobile(form)){
			form.setVisibleById("divImprimir", false);
		}
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		form.setValue("cliUF", form.getValue("cliUFHidden"));
		//Oculta busca de máquina
		customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
		customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
		form.setVisibleById("divPreencheComInterna", false);
		form.setVisibleById("divSolRevisaPedido", true);
		
	}else if( atv_atual == GTS_VALIDA_ORC ){
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão imprimir se for mobile
		if(isMobile(form)){
			form.setVisibleById("divImprimir", false);
		}
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		form.setValue("cliUF", form.getValue("cliUFHidden"));
		//Oculta busca de máquina
		customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
		customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
		form.setVisibleById("divAprovacaoGerTerritorial", true);
		
		//Itens Pedido
		customHTML.append("<script>$('.itPedFilial').show()</script>");
		var indexes = form.getChildrenIndexes("tbItensPedido");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	customHTML.append("<script>$('#itPedFilialItem___"+indexes[i]+"').removeAttr('readonly')</script>");
		    }
		}
		
		if(modoDeVisualizacaoDoFormulario == "VIEW"){
			form.setVisibleById("divPreencheComInterna", false);
		}else{
			form.setVisibleById("divAprovacaoAdministrativoGTS", true);
			form.setValue("aprovAdmGTS", "");
			
			//Se tiver CPF/CNPJ na revenda e não tiver código, libera para preencher o campo de código
			if (!isEmpty("revCpfCnpj", form) && isEmpty("revA3COD", form)) {	
				customHTML.append("<script>$('#revA3COD').prop('readonly', false);</script>");
			}
			
			form.setVisibleById("divVend1", true);
			form.setVisibleById("divVend2", true);
			form.setVisibleById("divVend3", true);
			form.setVisibleById("divVend5", true);
			form.setVisibleById("divVend6", true);
			
			if ( isEmpty("cliCodigo", form)) {	
				customHTML.append("<script>$('#cliCodigo').prop('readonly', false);</script>");
			}
			if ( isEmpty("cliLoja", form)) {	
				customHTML.append("<script>$('#cliLoja').prop('readonly', false);</script>");
			}
		}
		
	}else if( atv_atual == INTEGRA_ORCAMENTO ){
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão imprimir se for mobile
		if(isMobile(form)){
			form.setVisibleById("divImprimir", false);
		}
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		//Oculta busca de máquina
		customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
		customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
		
		if(modoDeVisualizacaoDoFormulario == "VIEW"){
			form.setVisibleById("divPreencheComInterna", false);
		}
		
	}else if( atv_atual == ERRO_INTEGRA_ORCAMENTO ){
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão imprimir se for mobile
		if(isMobile(form)){
			form.setVisibleById("divImprimir", false);
		}
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		form.setValue("cliUF", form.getValue("cliUFHidden"));
		//Oculta busca de máquina
		customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
		customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
		
		//Itens Pedido
		customHTML.append("<script>$('.itPedFilial').show()</script>");
		var indexes = form.getChildrenIndexes("tbItensPedido");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	customHTML.append("<script>$('#itPedFilialItem___"+indexes[i]+"').removeAttr('readonly')</script>");
		    }
		}
		customHTML.append("<script>$('.itPedNumOrcTotvs').show()</script>");
		
		if(modoDeVisualizacaoDoFormulario == "VIEW"){
			form.setVisibleById("divPreencheComInterna", false);
		}
	}else if( atv_atual == REP_CANCEL_ADM_GTS ){
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão imprimir se for mobile
		if(isMobile(form)){
			form.setVisibleById("divImprimir", false);
		}
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		form.setValue("cliUF", form.getValue("cliUFHidden"));
		//Oculta busca de máquina
		customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
		customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
		form.setVisibleById("divAprovacaoAdministrativoGTS", true);
		
		if(modoDeVisualizacaoDoFormulario == "VIEW"){
			form.setVisibleById("divPreencheComInterna", false);
		}
	
	}else if( atv_atual == GTS_ACOMP_PED ){
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão imprimir se for mobile
		if(isMobile(form)){
			form.setVisibleById("divImprimir", false);
		}
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		form.setValue("cliUF", form.getValue("cliUFHidden"));
		//Oculta busca de máquina
		customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
		customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
		
		//Itens Pedido
		customHTML.append("<script>$('.itPedFilial').show()</script>");
		customHTML.append("<script>$('.itPedNumOrcTotvs').show()</script>");
		
		if(modoDeVisualizacaoDoFormulario == "VIEW"){
			form.setVisibleById("divPreencheComInterna", false);
		}else{
			
			form.setVisibleById("divAcompanhaAdministrativoGTS", true);
			form.setValue("acompanhaAdmGTS", "");
			
		}
		
	}else if( atv_atual == SOL_REV_PED ){
		
		form.setValue("pedVersao", "Reajuste");
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão imprimir se for mobile
		if(isMobile(form)){
			form.setVisibleById("divImprimir", false);
		}
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		if(modoDeVisualizacaoDoFormulario == "VIEW"){
			//Oculta busca de máquina
			customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
			customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
			form.setVisibleById("divPreencheComInterna", false);
		}
		form.setVisibleById("divAcompanhaAdministrativoGTS", true);
		
	}else if( atv_atual == FIM ){
		
		//Define se o valor é dolar ou real (somente a descrição do campo)
		defineMoeda(form, customHTML);
		
		//Oculta botão imprimir se for mobile
		if(isMobile(form)){
			form.setVisibleById("divImprimir", false);
		}
		//Oculta botão de Gerar/Imprimir Relatório para usuário que está no grupo revendaMaquina
		removeBotaoImprimir(form, customHTML);
		
		form.setValue("cliUF", form.getValue("cliUFHidden"));
		//Oculta busca de máquina
		customHTML.append("<script>$('.btn-search-maquina').hide()</script>");
		customHTML.append("<script>$('.inputItPedCodItem').css('border-radius', '4px');</script>");
		form.setVisibleById("divNumOrcProtheus", true);
		form.setVisibleById("divPreencheComInterna", false);
		form.setVisibleById("divAcompanhaAdministrativoGTS", false);
		
		customHTML.append("<script>$('.itPedFilial').show()</script>");
		customHTML.append("<script>$('.itPedNumOrcTotvs').show()</script>");
		
	}

}

/**
 * Função para quando da erro de carregamento das informações e é necessário não apresentar nada do formulário
 * @param form
 * @param customHTML
 */
function ocultaCabecalhosForm(form, customHTML){
	
	customHTML.append("<script>$('form').hide();</script>");
	customHTML.append("<script>window.parent.$('#breadcrumb').remove();</script>");
	customHTML.append("<script>window.parent.$('#textActivity').remove();</script>");
	customHTML.append("<script>window.parent.$('#processTabs').remove();</script>");
	customHTML.append("<script>window.parent.$('#workflowActions').remove();</script>");
	
}

/**
 * Função que define o solicitante como GestorTerritorial, 
 * setando dados de nome, e-mail, do Gestor Territorial 
 * @param form
 * @param customHTML
 */
function setSolicitanteGestorTerritorial(form, customHTML){
	
	var solicitante = fluigAPI.getUserService().getCurrent();
	
	//Se for Gestor Territorial
	form.setValue("solTipoSolicitante",  "GestorTerritorial" );
	form.setValue("solTipoSolicitanteDesc",  "Gestor Territorial" );
	//Este campo solAcompanhaPedidoWKUser é para a sequencia do Fluxo, do usuário que recebe a atividade para a sequencia de revisao do pedido
	//Quando for uma revenda abrindo, quem recebe esta atividade é o Representante
	form.setValue("solAcompanhaPedidoWKUser",  solicitante.getCode() );
	form.setValue("repGestorTerritorialWKUser", solicitante.getCode());
	form.setValue("repGestorTerritorial",  solicitante.getFullName());
	form.setValue("repEmailGestorTerritorial",  solicitante.getEmail());
	
	setCodVendedor(form, customHTML, "GestorTerritorial", solicitante.getCode()); 
	
	
}

/**
 * Função que define o solicitante como  RepresentanteNacional
 * Setando o Gestor Territorial do Grupo deste Representante.
 * 
 * 
 * @param form
 * @param customHTML
 * @param nomeGrupoTerritorial
 */
function setSolicitanteRepresentanteNacional(form, customHTML, nomeGrupoTerritorial){
	
	var solicitante = fluigAPI.getUserService().getCurrent();
	
	form.setValue("repWKUser", solicitante.getCode());
	form.setValue("repTipo", "RepresentanteNacional");
	form.setValue("repNome", solicitante.getFullName());
	form.setEnabled("repNome", false);
	form.setValue("repEmail", solicitante.getEmail());
	form.setValue("solTipoSolicitante",  'RepresentanteNacional');
	form.setValue("solTipoSolicitanteDesc",  "Representante Nacional" );
	form.setValue("solAcompanhaPedidoWKUser",  solicitante.getCode() );
	
	//Busca o código de vendedor que está no Protheus.
	setCodVendedor(form, customHTML, "Representante", solicitante.getCode());

	
	//Dataset para busca do WKUser e nome do Gestor Territorial
	var constGrupoTer1 = DatasetFactory.createConstraint('gesTerGrupo', nomeGrupoTerritorial, nomeGrupoTerritorial, ConstraintType.MUST);
	var constGrupoTer = new Array(constGrupoTer1);
	var dsGestorTerritorialByGrupo = DatasetFactory.getDataset('dsGestorTerritorial', null, constGrupoTer, null);
	if(dsTemValor(dsGestorTerritorialByGrupo)){
		form.setValue("solGerenteAprovaWKUser", dsGestorTerritorialByGrupo.getValue(0, "gesTerWKUser") );
		form.setValue("solGerenteAprovaPapel", 'Pool:Role:' + dsGestorTerritorialByGrupo.getValue(0, "gesTerPapel"));
		
		form.setValue("repGestorTerritorialWKUser", dsGestorTerritorialByGrupo.getValue(0, "gesTerWKUser") );
		form.setValue("repGestorTerritorial", dsGestorTerritorialByGrupo.getValue(0, "gesTerNome") );
		form.setValue("repEmailGestorTerritorial", dsGestorTerritorialByGrupo.getValue(0, "gesTerEmail") );
		
		//Busca o código de vendedor do Gestor Territorial que está no Protheus.
		setCodVendedor(form, customHTML, "GestorTerritorial", dsGestorTerritorialByGrupo.getValue(0, "gesTerWKUser"));

	}
	
}

/**
 * Seta o solicitante como um RepresentanteExportacao
 * Seta o Gestor Comercial do Representante Exportacao
 * 
 * @param form
 * @param customHTML
 * @param nomeGrupoExportacao
 * @returns
 */
function setSolicitanteRepresentanteExportacao(form, customHTML, nomeGrupoExportacao){
	
	var solicitante = fluigAPI.getUserService().getCurrent();
	
	form.setValue("repWKUser", solicitante.getCode());
	form.setValue("repTipo", "RepresentanteExportacao");
	form.setValue("repNome", solicitante.getFullName());
	form.setEnabled("repNome", false);
	form.setValue("repEmail", solicitante.getEmail());
	form.setValue("solTipoSolicitante",  'RepresentanteExportacao');
	form.setValue("solTipoSolicitanteDesc",  'Representante Exportação');
	form.setValue("solAcompanhaPedidoWKUser",  solicitante.getCode() );
	
	//Busca o código de vendedor que está no Protheus.
	setCodVendedor(form, customHTML, "Representante", solicitante.getCode());
	
	setTabPreco(form, customHTML, solicitante.getCode());
	
	//Usuário Exportação não tem Gestor Territorial e sim somente Gestor Comercial
	
	//Dataset para busca do WKUser e nome do Gestor Comercial
	var constGrupoTer1 = DatasetFactory.createConstraint('gesTerGrupo', nomeGrupoExportacao, nomeGrupoExportacao, ConstraintType.MUST);
	var constGrupoTer = new Array(constGrupoTer1);
	var dsGestorComercialByGrupo = DatasetFactory.getDataset('dsGestorComercial', null, constGrupoTer, null);
	if(dsTemValor(dsGestorComercialByGrupo)){
		form.setValue("solGerenteAprovaWKUser", dsGestorComercialByGrupo.getValue(0, "gesComWKUser") );
		form.setValue("solGerenteAprovaPapel", 'Pool:Role:' + dsGestorComercialByGrupo.getValue(0, "gesComPapel"));
		
		form.setValue("repGestorComercialWKUser", dsGestorComercialByGrupo.getValue(0, "gesComWKUser") );
		form.setValue("repGestorComercial", dsGestorComercialByGrupo.getValue(0, "gesComNome") );
		form.setValue("repEmailGestorComercial", dsGestorComercialByGrupo.getValue(0, "gesComEmail") );
		
		//Busca o código de vendedor do Gestor Comercial que está no Protheus.
		setCodVendedor(form, customHTML, "GestorComercial", dsGestorComercialByGrupo.getValue(0, "gesComWKUser"));

	}
	
}

/**
 * Seta solicitante como Revenda
 * 
 * Primeiro faz uma busca via WS no Protheus para retornar a matricula do Representante desta Revenda.
 * Com o Representante, busca se é um RepresentanteNacional ou RepresentanteExportacao
 * Com o Representante setado, é buscado o GestorTerritorial deste Representante.
 */
function setSolicitanteRevenda(form, customHTML, revA1COD, revA1LOJA){
	
	
	form.setValue("revA1COD", revA1COD);
	form.setValue("revA1LOJA", revA1LOJA);
	
	//Aqui vai fazer a busca do representante e gestor territorial desta revenda
	//Com o código e loja, é buscado via WS quem é o Representante desta Revenda 
	var representanteRevAcompanhaPedido = "";
	
	//RepRevenda é o Representante da Revenda
	var constrainsRepRev1 = DatasetFactory.createConstraint("REVCOD", revA1COD, revA1COD, ConstraintType.MUST);
	var constrainsRepRev2 = DatasetFactory.createConstraint("REVLOJA", revA1LOJA, revA1LOJA, ConstraintType.MUST);
	var constrainsRepRev = new Array(constrainsRepRev1, constrainsRepRev2);
	
	var dsRepRevenda = DatasetFactory.getDataset("dsPedMaqConsultaRepRevenda", null, constrainsRepRev, null);
	if(dsTemValor(dsRepRevenda)){
		if(dsRepRevenda.getValue(0, "CODRET") == "1"){
			representanteRevAcompanhaPedido = dsRepRevenda.getValue(0, "REPMATRICULA");
		}else if(dsRepRevenda.getValue(0, "CODRET") == "2"){
			var msgRet = dsRepRevenda.getValue(0, "MSGRET");
			log.info( 'Retorno WS: ' + msgRet);
		}
		
	}
	
	if(representanteRevAcompanhaPedido != ""){
		form.setValue("solAcompanhaPedidoWKUser", representanteRevAcompanhaPedido);
		
		//Com o Representante Localizado, é buscado em qual grupo territorial está este Represenante, 
		
		var achouRepRevGrupoNacional = false;
		//Agora busca se este Representante da Revenda é Nacional
		for ( var i = 1; i <= 5; i++) {
			if(!achouRepRevGrupoNacional){
				//Dataset para verificar em qual grupo Territorial está o usuário Representante Nacional
				var nomeGrupoTerritorial = "Territorial" + i;
				var constrainsTer1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
				var constrainsTer2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", nomeGrupoTerritorial, nomeGrupoTerritorial, ConstraintType.MUST);
				var constrainsTer3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", representanteRevAcompanhaPedido, representanteRevAcompanhaPedido, ConstraintType.MUST);
				var constraintsTer = new Array(constrainsTer1, constrainsTer2, constrainsTer3);
				
				var dsGruposTer = DatasetFactory.getDataset("colleagueGroup", null, constraintsTer, null);
				if(dsTemValor(dsGruposTer)){
					
					//Dataset para buscar o nome do usuário 
				    var c1 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
				    var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", representanteRevAcompanhaPedido, representanteRevAcompanhaPedido, ConstraintType.MUST);
				    var fieldsColleague = ["colleagueName", "mail"];
				    var dsColleagueRepresentante = DatasetFactory.getDataset("colleague", fieldsColleague, [ c1, c2 ], null);
					var NomeUsuario = '';
					if(dsTemValor(dsColleagueRepresentante)){
						form.setValue("repNome", dsColleagueRepresentante.getValue(0, "colleagueName"));
						form.setValue("repEmail", dsColleagueRepresentante.getValue(0, "mail"));
					}
					
					//É um representante Nacional da Revenda
					achouRepRevGrupoNacional = true;
					form.setValue("repWKUser", representanteRevAcompanhaPedido);
					form.setValue("repTipo", "RepresentanteNacional");
					form.setEnabled("repNome", false);
					
					//Busca o código de vendedor do Representante que está no Protheus.
					setCodVendedor(form, customHTML, "Representante", representanteRevAcompanhaPedido);

					
					//Dataset para busca do WKUser e nome do Gestor Territorial
					var constGrupoTer1 = DatasetFactory.createConstraint('gesTerGrupo', nomeGrupoTerritorial, nomeGrupoTerritorial, ConstraintType.MUST);
					var constGrupoTer = new Array(constGrupoTer1);
					var dsGestorTerritorialByGrupo = DatasetFactory.getDataset('dsGestorTerritorial', null, constGrupoTer, null);
					if(dsTemValor(dsGestorTerritorialByGrupo)){
						form.setValue("solGerenteAprovaWKUser", dsGestorTerritorialByGrupo.getValue(0, "gesTerWKUser") );
						form.setValue("solGerenteAprovaPapel", 'Pool:Role:' + dsGestorTerritorialByGrupo.getValue(0, "gesTerPapel"));
						
						form.setValue("repGestorTerritorialWKUser", dsGestorTerritorialByGrupo.getValue(0, "gesTerWKUser") );
						form.setValue("repGestorTerritorial", dsGestorTerritorialByGrupo.getValue(0, "gesTerNome") );
						form.setValue("repEmailGestorTerritorial", dsGestorTerritorialByGrupo.getValue(0, "gesTerEmail") );
						
						//Busca o código de vendedor do Gestor Territorial que está no Protheus.
						setCodVendedor(form, customHTML, "GestorTerritorial", dsGestorTerritorialByGrupo.getValue(0, "gesTerWKUser"));

					}
					
					
				}
			}
		}
		
		
		
		/*
		 * Se não encontrou este Representante como Nacional, irá buscar o Representante via grupo Exportacao1
		 */
		
		if(!achouRepRevGrupoNacional){
			//Se for Gestor Representante Internacional
			var achouRepRevGrupoExportacao = false;
			
			var nomeGrupoExportacao = "Exportacao1";
			var constrainsExp1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
			var constrainsExp2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", nomeGrupoExportacao, nomeGrupoExportacao, ConstraintType.MUST);
			var constrainsExp3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", representanteRevAcompanhaPedido, representanteRevAcompanhaPedido, ConstraintType.MUST);
			var constraintsExp = new Array(constrainsExp1, constrainsExp2, constrainsExp3);
			
			var dsGruposExp = DatasetFactory.getDataset("colleagueGroup", null, constraintsExp, null);
			if(dsTemValor(dsGruposExp)){
				//É um representante exportação
				
				//Dataset para buscar o nome do usuário 
			    var c1 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
			    var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", representanteRevAcompanhaPedido, representanteRevAcompanhaPedido, ConstraintType.MUST);
			    var fieldsColleague = ["colleagueName", "mail"];
			    var dsColleagueRepresentante = DatasetFactory.getDataset("colleague", fieldsColleague, [ c1, c2 ], null);
				var NomeUsuario = '';
				if(dsTemValor(dsColleagueRepresentante)){
					form.setValue("repNome", dsColleagueRepresentante.getValue(0, "colleagueName"));
					form.setValue("repEmail", dsColleagueRepresentante.getValue(0, "mail"));
				}
				
				//É um representante Exportacao da Revenda
				achouRepRevGrupoExportacao = true;
				form.setValue("repWKUser", representanteRevAcompanhaPedido);
				form.setValue("repTipo", "RepresentanteExportacao");
				form.setEnabled("repNome", false);
				
				//Busca o código de vendedor que está no Protheus.
				setCodVendedor(form, customHTML, "Representante", representanteRevAcompanhaPedido);
				
				
				//Usuário Exportação não tem Gestor Territorial e sim somente Gestor Comercial
				
				//Dataset para busca do WKUser e nome do Gestor Comercial
				var constGrupoTer1 = DatasetFactory.createConstraint('gesTerGrupo', nomeGrupoTerritorial, nomeGrupoTerritorial, ConstraintType.MUST);
				var constGrupoTer = new Array(constGrupoTer1);
				var dsGestorComercialByGrupo = DatasetFactory.getDataset('dsGestorComercial', null, constGrupoTer, null);
				if(dsTemValor(dsGestorComercialByGrupo)){
					form.setValue("solGerenteAprovaWKUser", dsGestorComercialByGrupo.getValue(0, "gesComWKUser") );
					form.setValue("solGerenteAprovaPapel", 'Pool:Role:' + dsGestorComercialByGrupo.getValue(0, "gesTerPapel"));
					
					form.setValue("repGestorComercialWKUser", dsGestorComercialByGrupo.getValue(0, "gesComWKUser") );
					form.setValue("repGestorComercial", dsGestorComercialByGrupo.getValue(0, "gesComNome") );
					form.setValue("repEmailGestorComercial", dsGestorComercialByGrupo.getValue(0, "gesComEmail") );
					
					//Busca o código de vendedor do Gestor Comercial que está no Protheus.
					setCodVendedor(form, customHTML, "GestorComercial", dsGestorComercialByGrupo.getValue(0, "gesComWKUser"));

				}

			}
		}
		
	}else{
		//Se não encontrou a matricula do Representante vinculado a Revenda
		customHTML.append("<script>FLUIGC.toast({message: 'Não foi encontrado o seu Representante. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
		ocultaCabecalhosForm(form, customHTML);
		
	}
}

/**
 * 
 * @param form
 * @param customHTML
 */
function setSolicitanteAdministrativoGTS(form, customHTML){
	
	var solicitante = fluigAPI.getUserService().getCurrent();
	
	//Como somente quem estiver no papel cadastraPedidoDeMaquina  vai poder iniciar este Fluxo, não será necessário reanalizar se está noste papel
	form.setValue("solTipoSolicitante",  'AdministrativoGTS');
	form.setValue("solTipoSolicitanteDesc",  "Administrativo GTS" );
	
	//Este campo solAcompanhaPedidoWKUser é para a sequencia do Fluxo, do usuário que recebe a atividade para a sequencia de revisao do pedido
	//Quando for uma revenda abrindo, quem recebe esta atividade é o Representante
	form.setValue("solAcompanhaPedidoWKUser",  solicitante.getCode() );
	
	
}

/**
 * Função para setar no campo repGesTerA3COD ou repA3COD, o código do vendedor no Protheus.
 * É necessário desse código para cadastrar no orçamento as comissões de cada vendedor
 * @param form
 * @param customHTML
 * @param tipo
 * @param email
 */

function setCodVendedor(form, customHTML, tipo, matFluig){
	
	var constMatricula = DatasetFactory.createConstraint('VENDMATFLUIG', matFluig, matFluig, ConstraintType.MUST);
	var constConsultaRev = new Array(constMatricula);
	var dsPedMaqConsultaRevenda = DatasetFactory.getDataset('dsPedMaqConsultaRevenda', null, constConsultaRev, null);
	if(dsTemValor(dsPedMaqConsultaRevenda)){
		if(dsPedMaqConsultaRevenda.getValue(0, "CODRET") == "1"){
			if(tipo == "GestorTerritorial"){
				form.setValue("repGesTerA3COD", dsPedMaqConsultaRevenda.getValue(0, "CODVEND") );
			}else if(tipo == "Representante"){
				form.setValue("repA3COD", dsPedMaqConsultaRevenda.getValue(0, "CODVEND") );
			}else if(tipo == "GestorComercial"){
				form.setValue("repGesComA3COD", dsPedMaqConsultaRevenda.getValue(0, "CODVEND") );
			}
		}else if(dsPedMaqConsultaRevenda.getValue(0, "CODRET") == "2"){
			if(tipo == "GestorTerritorial"){
				customHTML.append("<script>FLUIGC.toast({ title: '', message: 'Erro ao consultar o Gestor Territorial no ERP, comunicar o Administrador do Sistema!', type: 'danger' });</script>");
				form.setValue("repGesTerA3COD", "" );
			}else if(tipo == "Representante"){
				customHTML.append("<script>FLUIGC.toast({ title: '', message: 'Erro ao consultar o Representante no ERP, comunicar o Administrador do Sistema!', type: 'danger' });</script>");
				form.setValue("repA3COD", "");
			}else if(tipo == "GestorComercial"){
				customHTML.append("<script>FLUIGC.toast({ title: '', message: 'Erro ao consultar o Gestor Comercial no ERP, comunicar o Administrador do Sistema!', type: 'danger' });</script>");
				form.setValue("repGesComA3COD", "" );
			}	
		}
	}
}

/**
 * Função para ocultar o botão de imprimir para usuário revenda
 * @param form
 * @param customHTML
 */
function removeBotaoImprimir(form, customHTML){
	
	//Primeiro busca se o usuário está no grupo revendaMaquina
	var constrainsRev1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var constrainsRev2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "revendaMaquina", "revendaMaquina", ConstraintType.MUST);
	var constrainsRev3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var constraintsRev = new Array(constrainsRev1, constrainsRev2, constrainsRev3);
	
	var dsGruposRevMaq = DatasetFactory.getDataset("colleagueGroup", null, constraintsRev, null);
	if(dsTemValor(dsGruposRevMaq)){
		//É uma RevendaMaquina, oculta divImprimir
		form.setVisibleById("divImprimir", false);
		
	}
	
}

/**
 * Busca a tabela de preço do usário exportação que esta vinculada no dados adicionais
 * 
 */
function setTabPreco(form, customHTML, WKUser){
	
	try{
		var tabPreco = '';
		var clientService = fluigAPI.getAuthorizeClientService();
		
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'ServidorFluigGTS',
            endpoint : '/api/public/2.0/users/getUser/'+WKUser,
            method : 'get',
            timeoutService: '100' // segundos
        }
                                                      
        var vo = clientService.invoke(JSON.stringify(data));
	 
        if(vo.getResult()== null || vo.getResult().isEmpty()){
        	customHTML.append("<script>FLUIGC.toast({ title: '', message: 'Não foi localizado a tabela de preço do seu usuário (retorno vazio), comunicar o Administrador do Sistema !', type: 'danger' });</script>");
        	ocultaCabecalhosForm(form, customHTML);
        	
        	
        }else{
            log.info(vo.getResult());
            
            var json = JSON.parse(vo.getResult());
            tabPreco = json.content.extData.TABPRECO_MAQ;

            if(tabPreco != '' && tabPreco !== undefined && tabPreco != 'undefined'){
					
            	form.setValue("tabPreco", tabPreco);
            }else{
            	customHTML.append("<script>FLUIGC.toast({ title: '', message: 'Não foi localizado a tabela de preço do seu usuário, comunicar o Administrador do Sistema !', type: 'danger' });</script>");
            	ocultaCabecalhosForm(form, customHTML);
            }
        }
    } catch(err) {
    	log.info(err);
    	
    }
    
}

/*
 * Verifica quem abriu a solicitação
 * Se foi usuário exportação, define o campo como dolar, se não como reais.
 */
function defineMoeda(form, customHTML){
	
	var solTipoSolicitante = form.getValue("solTipoSolicitante")
	if(solTipoSolicitante == "RepresentanteExportacao"){
		customHTML.append("<script>$('.tipoMoeda').text('(USD)')</script>");
	}else{
		customHTML.append("<script>$('.tipoMoeda').text('(R$)')</script>");
	}
	
	
	
}