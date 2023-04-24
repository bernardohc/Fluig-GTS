function displayFields(form,customHTML){ 
	var atv_atual = getValue("WKNumState");
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);
	
	var usuarioCorrente = fluigAPI.getUserService().getCurrent();
	
	/*
	 * INICIO PARA TODAS AS ATIVIDADES
	 */
	//ABA-CADASTRAMENTO
	form.setValue("equipTipoNota", form.getValue("equipTipoNotaHidden"));
	form.setValue("revEquipEstado", form.getValue("revEquipEstadoHidden"));
	form.setValue("revEstado", form.getValue("revEstadoHidden"));
	
	//Se a loja que abriu a solicitação for diferente a que a máquina está associada.
	if( form.getValue("revEquipCodigo") == form.getValue("revCodigo")
		&& form.getValue("revEquipLoja") != form.getValue("revLoja")){
		form.setVisibleById("divCienteTransfEquipRev", true);
	}
	
	//Protocolo de Recebimento do Cliente Final
	if(form.getValue("protoRecPossuiAvarias") == "sim"){
		form.setVisibleById("divTabelaAvarias", true);
	}else if(form.getValue("protoRecPossuiAvarias") == "nao"){
		form.setVisibleById("divCienteSemAvarias", true);
	}
	//Cliente
	form.setValue("cliEstado", form.getValue("cliEstadoHidden"));
	if(form.getValue("cliPossuiEquipamentoGTS") == "sim"){
		form.setVisibleById("divTabelaEquipamentos", true);
	}
	
	//ABA-EMISSAO NF/PAGAMENTO
	//Valores
	//Verifica o tipo de usuário para mostrar a simulação de valor
	var tipoUsuario = getTipoUsuario();
	if(tipoUsuario == 'Administrativo GTS'){
		form.setVisibleById("divValoresSimulacao", true);
	}
	//Aprovação
	if(form.getValue("NFAprovAprovacao") == "aprovado"){
		form.setVisibleById("divNFAprovDataPrevPagto", true);
	}
	
	//Anexos de todas as abas
	customHTML.append("<script>displayBtnFiles();</script>");
	
	/*
	 * FIM PARA TODAS AS ATIVIDADES
	 */
	
	
	if(atv_atual == INICIO_0){
		
		customHTML.append("<script>$('#progressBar').css({'width':'0%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('0%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Início')</script>");
		
		
		
		form.setValue("solicitante",  usuarioCorrente.getCode() );
		
		//Verifica qual o tipo de usuário é: Revenda, Administrativo GTS
		var tipoUsuario = getTipoUsuario();
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
					form.setValue("gerenteSolicitante",  dsDadosAdicionais.getValue(0, "A1_GERENTE"));
					
					var c1 = DatasetFactory.createConstraint("A1_COD", dsDadosAdicionais.getValue(0, "A1_COD"), "", ConstraintType.MUST);
					var c2 = DatasetFactory.createConstraint("A1_LOJA", dsDadosAdicionais.getValue(0, "A1_LOJA"), "", ConstraintType.MUST);
					var datasetConsultaRevenda = DatasetFactory.getDataset("dsEntTecConsultaRevenda", null, [ c1, c2 ], null);
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
							form.setValue("revClassPeca", datasetConsultaRevenda.getValue(0, "REVCLPECA"));
							form.setValue("revClassServico", datasetConsultaRevenda.getValue(0, "REVCLSER"));
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
		}else if(tipoUsuario == 'Administrativo GTS'){
			
			form.setValue("gerenteSolicitante",  usuarioCorrente.getCode());
			
			
		}else {
			//Se não encontrou o código e loja nos dados adicionais
			customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
			ocultaCabecalhosForm(form, customHTML);
		}
		
		//Somente o usuário do tipo Técnico pode abrir solicitação via mobile
		if ( form.getValue("A1_TIPO").toUpperCase() == 'TECNICO') {
			if( isMobile(form) ){
				form.setVisibleById("divCadastramentoAnexo", false);
			}
		}else{
			if( isMobile(form) ){
				customHTML.append("<script>FLUIGC.toast({message: 'Não é possível abrir uma solicitação de Entrega Técnica via smartphone!', type: 'danger'});</script>");
				customHTML.append("<script>$('form').hide()</script>");
			}
		}
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'Cadastramento', 'disponivel', 'indisponivel', 'indisponivel');
		
		if(form.getFormMode() == 'ADD'){
			
			customHTML.append("<script>$('.tdDeleteRow').show();</script>");
			form.setVisibleById("divAddPropRural", true);
			form.setVisibleById("divTabelaPropRural", false);
			form.setVisibleById("divBtnAddAvaria", true);
			form.setVisibleById("divBtnAddEquipamento", true);
			form.setVisibleById("divMsgAnexoCadastro", true);
		}
		
		//ABA-EMISSAO NF/PAGAMENTO
		//Forçando para não exibir a opção de anexo para Nota Fiscal e Boleto
		customHTML.append("<script>invisibleBtnUpload('anexoNotaFiscal');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoBoleto');</script>");
		
	}else if( atv_atual == INICIO ){
		
		customHTML.append("<script>$('#progressBar').css({'width':'0%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('0%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Início')</script>");
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'Cadastramento', 'disponivel', 'indisponivel', 'indisponivel');
		
		if(form.getFormMode() == 'MOD'){
			
			if(form.getValue("protoRecPossuiAvarias") == "sim"){
				form.setVisibleById("divMsgAnexoAvaria", true);
			}
			//Mostra campos de deletar de tabela
			customHTML.append("<script>$('.tdDeleteRow').show();</script>");
			//Mostra botões para adicionar
			form.setVisibleById("divAddPropRural", true);
			//Se não tiver nada inserido na tabela de propriedades rurais, vai esconder a tabela
			var indexesPropRuralTbPropriedadesRurais = form.getChildrenIndexes("propRuralTbPropriedadesRurais");
			if(indexesPropRuralTbPropriedadesRurais.length == 0){
				form.setVisibleById("divTabelaPropRural", false);
			}
			form.setVisibleById("divBtnAddAvaria", true);
			form.setVisibleById("divBtnAddEquipamento", true);
			form.setVisibleById("divMsgAnexoCadastro", true);
		}
		
		//ABA-EMISSAO NF/PAGAMENTO
		//Forçando para não exibir a opção de anexo para Nota Fiscal e Boleto
		customHTML.append("<script>invisibleBtnUpload('anexoNotaFiscal');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoBoleto');</script>");
		
	}else if( atv_atual == FORMALIZA ){
		
		customHTML.append("<script>$('#progressBar').css({'width':'10%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('10%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Gerente da Revenda Formaliza Entrega Técnica')</script>");
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'Cadastramento', 'disponivel', 'indisponivel', 'indisponivel');
		
		if(form.getFormMode() == 'MOD'){
			if(form.getValue("protoRecPossuiAvarias") == "sim"){
				form.setVisibleById("divMsgAnexoAvaria", true);
			}
			//Mostra campos de deletar de tabela
			customHTML.append("<script>$('.tdDeleteRow').show();</script>");
			//Mostra botões para adicionar
			form.setVisibleById("divAddPropRural", true);
			//Se não tiver nada inserido na tabela de propriedades rurais, vai esconder a tabela
			var indexesPropRuralTbPropriedadesRurais = form.getChildrenIndexes("propRuralTbPropriedadesRurais");
			if(indexesPropRuralTbPropriedadesRurais.length == 0){
				form.setVisibleById("divTabelaPropRural", false);
			}
			form.setVisibleById("divBtnAddAvaria", true);
			form.setVisibleById("divBtnAddEquipamento", true);
			form.setVisibleById("divMsgAnexoCadastro", true);
		}
		
		//ABA-EMISSAO NF/PAGAMENTO
		//Forçando para não exibir a opção de anexo para Nota Fiscal e Boleto
		customHTML.append("<script>invisibleBtnUpload('anexoNotaFiscal');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoBoleto');</script>");
		
	}else if ( atv_atual == GTS_ANALISA_CLIENTE){
		
		customHTML.append("<script>$('#progressBar').css({'width':'15%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('15%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: GTS Analisa Cliente')</script>");
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'Cadastramento', 'disponivel', 'indisponivel', 'indisponivel');
		
		if(form.getFormMode() == 'MOD'){
			//Deixa como readonly o campo de cliCpfCnpj e cliInscricaoEstadual
			customHTML.append("<script>$('#cliCpfCnpj').prop('readonly', true);</script>");
			customHTML.append("<script>$('#cliInscricaoEstadual').prop('readonly', true);</script>");
			//Abre o campo código e loja do cliente
			customHTML.append("<script>$('#cliCodigo').prop('readonly', false);</script>");
			customHTML.append("<script>$('#cliLoja').prop('readonly', false);</script>");
		}
		
		//ABA-CADASTRAMENTO 
		//Forçando para não exibir a opção de anexo para Avarias e Relatório Atendimento e Checklist
		var protoRecTbAvariasIndexes = form.getChildrenIndexes("protoRecTbAvarias");
		for (var i = 0; i < protoRecTbAvariasIndexes.length; i++) {
			var protoRecAvariasImagemItem = "protoRecAvariasImagemItem___" + protoRecTbAvariasIndexes[i];
			customHTML.append("<script>invisibleBtnUpload('" + protoRecAvariasImagemItem +"');</script>");
		}
		customHTML.append("<script>invisibleBtnUpload('anexoRelAtendimento');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoChecklist');</script>");
		
		//ABA-EMISSAO NF/PAGAMENTO
		//Forçando para não exibir a opção de anexo para Nota Fiscal e Boleto
		customHTML.append("<script>invisibleBtnUpload('anexoNotaFiscal');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoBoleto');</script>");
		
	}else if ( atv_atual == INTEGRACAO_BASE_ATENDIMENTO){
		
		customHTML.append("<script>$('#progressBar').css({'width':'20%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('20%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Integração de Base de Atendimento')</script>");
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'Cadastramento', 'disponivel', 'indisponivel', 'indisponivel');
		
	}else if ( atv_atual == ANALISA_ERRO_INTEGRACAO_BASE_ATENDIMENTO){
		
		customHTML.append("<script>$('#progressBar').css({'width':'20%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('20%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Analisa Erro de Integração de Base de Atendimento')</script>");
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'Cadastramento', 'disponivel', 'indisponivel', 'indisponivel');
		
		//ABA-CADASTRAMENTO 
		//Forçando para não exibir a opção de anexo para Avarias e Relatório Atendimento e Checklist
		var protoRecTbAvariasIndexes = form.getChildrenIndexes("protoRecTbAvarias");
		for (var i = 0; i < protoRecTbAvariasIndexes.length; i++) {
			var protoRecAvariasImagemItem = "protoRecAvariasImagemItem___" + protoRecTbAvariasIndexes[i];
			customHTML.append("<script>invisibleBtnUpload('" + protoRecAvariasImagemItem +"');</script>");
		}
		customHTML.append("<script>invisibleBtnUpload('anexoRelAtendimento');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoChecklist');</script>");
		
		//ABA-EMISSAO NF/PAGAMENTO
		//Forçando para não exibir a opção de anexo para Nota Fiscal e Boleto
		customHTML.append("<script>invisibleBtnUpload('anexoNotaFiscal');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoBoleto');</script>");
		
	}else if ( atv_atual == GTS_ANALISA_DEMANDA){
		
		if(form.getValue("tipoSolicitante") == 'Administrativo GTS'){
			customHTML.append("<script>$('#progressBar').css({'width':'80%'})</script>");
			customHTML.append("<script>$('#porcentProgressBar').text('80%')</script>");
			customHTML.append("<script>$('#descricaoEtapa').text('Etapa: GTS Analisa Demanda')</script>");
		}else{
			customHTML.append("<script>$('#progressBar').css({'width':'40%'})</script>");
			customHTML.append("<script>$('#porcentProgressBar').text('40%')</script>");
			customHTML.append("<script>$('#descricaoEtapa').text('Etapa: GTS Analisa Demanda')</script>");
		}
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'Cadastramento', 'disponivel', 'disponivel', 'indisponivel');
		
		//ABA-CADASTRAMENTO 
		//Forçando para não exibir a opção de anexo para Avarias e Relatório Atendimento e Checklist
		var protoRecTbAvariasIndexes = form.getChildrenIndexes("protoRecTbAvarias");
		for (var i = 0; i < protoRecTbAvariasIndexes.length; i++) {
			var protoRecAvariasImagemItem = "protoRecAvariasImagemItem___" + protoRecTbAvariasIndexes[i];
			customHTML.append("<script>invisibleBtnUpload('" + protoRecAvariasImagemItem +"');</script>");
		}
		customHTML.append("<script>invisibleBtnUpload('anexoRelAtendimento');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoChecklist');</script>");
		
		//Mostra o campo de Aprovação da Entrega Técnica
		form.setVisibleById("divAprovEntregaTecnica", true);
		
		//ABA-EMISSAO NF/PAGAMENTO
		//Se o solicitante for a Revenda, alimenta os campos da aba EMISSAO NF/PAGAMENTO com dados do CADASTRAMENTO
		if(form.getValue('tipoSolicitante') == 'Revenda'){
			//Seção - Valores
			//Alimenta o Km Total Utilizado
			form.setValue("NFvalKmTotalUtilizado", form.getValue("atendKMTotalUtilizado"));
			
			//Verifica o tipo de usuário para mostrar a simulação de valor
			var tipoUsuario = getTipoUsuario();
			if(tipoUsuario == 'Administrativo GTS'){
				form.setVisibleById("divValoresSimulacao", true);
				
				calculaValorTotalSimulacao(form,customHTML, tipoUsuario);
			}
		}
		
		//Alimenta o campo de Entrega de Equipamento na aba 'Emissao NF/Pagamento'
		var indexesPropRuralTbPropriedadesRurais = form.getChildrenIndexes("propRuralTbPropriedadesRurais");
		if(indexesPropRuralTbPropriedadesRurais.length > 0){
		    for (var i = 0; i < indexesPropRuralTbPropriedadesRurais.length; i++) { 
		    	if( form.getValue("propRuralEntrega___"+indexesPropRuralTbPropriedadesRurais[i]) == "selecionado"){
		    		form.setValue("NFvalEntregaCidade", form.getValue("propRuralCidadeItem___"+indexesPropRuralTbPropriedadesRurais[i]));
					form.setValue("NFvalEntregaEstado", form.getValue("propRuralEstadoItem___"+indexesPropRuralTbPropriedadesRurais[i]));
					form.setValue("NFvalEntregaNomePropriedade", form.getValue("propRuralNomePropriedadeItem___"+indexesPropRuralTbPropriedadesRurais[i]));
					form.setValue("NFvalEntregaKmAtePropriedade", form.getValue("propRuralKmAtePropriedadeItem___"+indexesPropRuralTbPropriedadesRurais[i]));
		    	}
		    }
		}
		
		//ABA-EMISSAO NF/PAGAMENTO
		//Seção - Emissão NF/Forma de Pagamento 
		//Oculta section Emissão NF/Forma Pagamento ->'Nota Fiscal/Forma de Pagamento'
		form.setVisibleById("divEmissaoNFNotaFiscalPagto", false);
		
		//Forçando para não exibir a opção de anexo para Nota Fiscal e Boleto
		customHTML.append("<script>invisibleBtnUpload('anexoNotaFiscal');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoBoleto');</script>");
		

	}else if ( atv_atual == ANALISA_RETORNO_GTS){
		
		customHTML.append("<script>$('#progressBar').css({'width':'35%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('35%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Analisa Retorno GTS')</script>");
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'Cadastramento', 'disponivel', 'indisponivel', 'indisponivel');
		
		//ABA-CADASTRAMENTO 
		//Mostra o campo de Aprovação da Entrega Técnica
		form.setVisibleById("divAprovEntregaTecnica", true);
		
		//ABA-EMISSAO NF/PAGAMENTO
		
		//ABA-EMISSAO NF/PAGAMENTO
		
		//Forçando para não exibir a opção de anexo para Nota Fiscal e Boleto
		customHTML.append("<script>invisibleBtnUpload('anexoNotaFiscal');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoBoleto');</script>");
		
		
		
	}else if ( atv_atual == REVENDA_NF_PGTO){
		
		customHTML.append("<script>$('#progressBar').css({'width':'60%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('60%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Revenda emite Nota Fiscal e define Forma de Pagamento')</script>");
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'EmissaoNF', 'disponivel', 'disponivel', 'indisponivel');
		
		//ABA-CADASTRAMENTO 
		//Forçando para não exibir a opção de anexo para Avarias e Relatório Atendimento e Checklist
		var protoRecTbAvariasIndexes = form.getChildrenIndexes("protoRecTbAvarias");
		for (var i = 0; i < protoRecTbAvariasIndexes.length; i++) {
			var protoRecAvariasImagemItem = "protoRecAvariasImagemItem___" + protoRecTbAvariasIndexes[i];
			customHTML.append("<script>invisibleBtnUpload('" + protoRecAvariasImagemItem +"');</script>");
		}
		customHTML.append("<script>invisibleBtnUpload('anexoRelAtendimento');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoChecklist');</script>");
		
		
		//ABA-EMISSAO NF/PAGAMENTO
		form.setValue("NFPagtoFormaPagamento", "boleto");
		if(form.getFormMode() == 'MOD'){
			form.setVisibleById("divMsgAnexoNFBoleto", true);
		}
		
		if(form.getValue("NFAprovAprovacao") == "reprovado"){
			//Oculta -Emissão NF/Forma Paramento - Aprovação
			form.setVisibleById("divEmissaoNFAprovNotaFiscalPagto", true);
		}
		
	}else if ( atv_atual == GTS_ANALISA_NF_PGTO){
		
		customHTML.append("<script>$('#progressBar').css({'width':'80%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('80%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: GTS Analisa Nota Fiscal e Forma de Pagamento')</script>");
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'EmissaoNF', 'disponivel', 'disponivel', 'disponivel');
		
		//ABA-CADASTRAMENTO 
		//Forçando para não exibir a opção de anexo para Avarias e Relatório Atendimento e Checklist
		var protoRecTbAvariasIndexes = form.getChildrenIndexes("protoRecTbAvarias");
		for (var i = 0; i < protoRecTbAvariasIndexes.length; i++) {
			var protoRecAvariasImagemItem = "protoRecAvariasImagemItem___" + protoRecTbAvariasIndexes[i];
			customHTML.append("<script>invisibleBtnUpload('" + protoRecAvariasImagemItem +"');</script>");
		}
		customHTML.append("<script>invisibleBtnUpload('anexoRelAtendimento');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoChecklist');</script>");
		
		//ABA-EMISSAO NF/PAGAMENTO
		//Forçando para não exibir a opção de anexo para Nota Fiscal e Boleto
		customHTML.append("<script>invisibleBtnUpload('anexoNotaFiscal');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoBoleto');</script>");
		
		//Seção - Aprovação
		form.setVisibleById("divEmissaoNFAprovNotaFiscalPagto", true);
		if(form.getFormMode() == 'MOD'){
			//E-mail do aprovador (irá receber cópia do e-mail de confirmação de pagamento)
			var emailUsuarioCorrente = fluigAPI.getUserService().getCurrent().getEmail();
			form.setValue("NFAprovEmailAprovador", emailUsuarioCorrente);
		}
		
		//ABA-PROGRAMAÇÃO PARA PAGAMENTO
		form.setValue("OCRazaoSocialRevenda", form.getValue("revRazaoSocialRevenda") );
		form.setValue("OCNomeFantasiaRevenda", form.getValue("revNomeFantasiaRevenda") );
		form.setValue("OCCpfCnpj", form.getValue("revCpfCnpj"));
		form.setValue("OCValorNota", form.getValue("NFvalValorTotal"));
		
		customHTML.append("<script>$('#OCCpfCnpj').prop('readonly', false);</script>");
		
	}else if ( atv_atual == EMAIL_CONFIRM_PGTO){
		
		customHTML.append("<script>$('#progressBar').css({'width':'85%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('85%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Disparo de E-mail de Confirmação de Pagamento')</script>");
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'EmissaoNF', 'disponivel', 'disponivel', 'disponivel');
		
	}else if ( atv_atual == ANALISA_ERRO_EMAIL_CONFIRM_PGTO){
		
		customHTML.append("<script>$('#progressBar').css({'width':'85%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('85%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: GTS Analisa Erro de Disparo de E-mail de Confirmação de Pagamento')</script>");
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'EmissaoNF', 'disponivel', 'disponivel', 'disponivel');
		
		//ABA-CADASTRAMENTO 
		//Forçando para não exibir a opção de anexo para Avarias e Relatório Atendimento e Checklist
		var protoRecTbAvariasIndexes = form.getChildrenIndexes("protoRecTbAvarias");
		for (var i = 0; i < protoRecTbAvariasIndexes.length; i++) {
			var protoRecAvariasImagemItem = "protoRecAvariasImagemItem___" + protoRecTbAvariasIndexes[i];
			customHTML.append("<script>invisibleBtnUpload('" + protoRecAvariasImagemItem +"');</script>");
		}
		customHTML.append("<script>invisibleBtnUpload('anexoRelAtendimento');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoChecklist');</script>");
		
		//Seção - Aprovação
		form.setVisibleById("divEmissaoNFAprovNotaFiscalPagto", true);
		
		//ABA-EMISSAO NF/PAGAMENTO
		//Forçando para não exibir a opção de anexo para Nota Fiscal e Boleto
		customHTML.append("<script>invisibleBtnUpload('anexoNotaFiscal');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoBoleto');</script>");
		
	}else if ( atv_atual == INTEGRACAO_OC){
			
		customHTML.append("<script>$('#progressBar').css({'width':'90%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('90%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Integração de Ordem de Compra')</script>");
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'ProgPagamento', 'disponivel', 'disponivel', 'disponivel');
		
	}else if ( atv_atual == ANALISA_ERRO_INTEGRACAO_OC){
		
		customHTML.append("<script>$('#progressBar').css({'width':'90%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('90%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: GTS Analisa Erro de Integração de Ordem de Compra')</script>");
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'ProgPagamento', 'disponivel', 'disponivel', 'disponivel');
		
		//ABA-CADASTRAMENTO 
		//Forçando para não exibir a opção de anexo para Avarias e Relatório Atendimento e Checklist
		var protoRecTbAvariasIndexes = form.getChildrenIndexes("protoRecTbAvarias");
		for (var i = 0; i < protoRecTbAvariasIndexes.length; i++) {
			var protoRecAvariasImagemItem = "protoRecAvariasImagemItem___" + protoRecTbAvariasIndexes[i];
			customHTML.append("<script>invisibleBtnUpload('" + protoRecAvariasImagemItem +"');</script>");
		}
		customHTML.append("<script>invisibleBtnUpload('anexoRelAtendimento');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoChecklist');</script>");
		
		//Seção - Aprovação
		form.setVisibleById("divEmissaoNFAprovNotaFiscalPagto", true);
		
		//ABA-EMISSAO NF/PAGAMENTO
		//Forçando para não exibir a opção de anexo para Nota Fiscal e Boleto
		customHTML.append("<script>invisibleBtnUpload('anexoNotaFiscal');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoBoleto');</script>");
		
		//ABA-PROGRAMAÇÃO PARA PAGAMENTO
		getStatusOC(form,customHTML);
		
	}else if ( atv_atual == INTEGRACAO_OC){
		
		customHTML.append("<script>$('#progressBar').css({'width':'95%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('95%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Disparo de E-mail para Setor Financeiro e Fiscal')</script>");
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'ProgPagamento', 'disponivel', 'disponivel', 'disponivel');
		
	}else if ( atv_atual == ANALISA_ERRO_EMAIL_FINANC_FISCAL){
		
		customHTML.append("<script>$('#progressBar').css({'width':'95%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('95%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: GTS Analisa Erro de Disparo de E-mail para Setor Financeiro e Fiscal')</script>");
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'ProgPagamento', 'disponivel', 'disponivel', 'disponivel');
		
		//ABA-CADASTRAMENTO 
		//Forçando para não exibir a opção de anexo para Avarias e Relatório Atendimento e Checklist
		var protoRecTbAvariasIndexes = form.getChildrenIndexes("protoRecTbAvarias");
		for (var i = 0; i < protoRecTbAvariasIndexes.length; i++) {
			var protoRecAvariasImagemItem = "protoRecAvariasImagemItem___" + protoRecTbAvariasIndexes[i];
			customHTML.append("<script>invisibleBtnUpload('" + protoRecAvariasImagemItem +"');</script>");
		}
		customHTML.append("<script>invisibleBtnUpload('anexoRelAtendimento');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoChecklist');</script>");
		
		//Seção - Aprovação
		form.setVisibleById("divEmissaoNFAprovNotaFiscalPagto", true);
		
		//ABA-EMISSAO NF/PAGAMENTO
		//Forçando para não exibir a opção de anexo para Nota Fiscal e Boleto
		customHTML.append("<script>invisibleBtnUpload('anexoNotaFiscal');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoBoleto');</script>");
		
		//ABA-PROGRAMAÇÃO PARA PAGAMENTO
		getStatusOC(form,customHTML);
	
	}else if ( atv_atual == FIM){
		
		customHTML.append("<script>$('#progressBar').css({'width':'100%'})</script>");
		customHTML.append("<script>$('#porcentProgressBar').text('100%')</script>");
		customHTML.append("<script>$('#descricaoEtapa').text('Etapa: Finalizado')</script>");
		
		ocultaDadosTipoSolicitante(form,customHTML);
		controleAbas(form, customHTML, 'Cadastramento', 'disponivel', 'disponivel', 'disponivel');
		
		//ABA-CADASTRAMENTO 
		//Forçando para não exibir a opção de anexo para Avarias e Relatório Atendimento e Checklist
		var protoRecTbAvariasIndexes = form.getChildrenIndexes("protoRecTbAvarias");
		for (var i = 0; i < protoRecTbAvariasIndexes.length; i++) {
			var protoRecAvariasImagemItem = "protoRecAvariasImagemItem___" + protoRecTbAvariasIndexes[i];
			customHTML.append("<script>invisibleBtnUpload('" + protoRecAvariasImagemItem +"');</script>");
		}
		customHTML.append("<script>invisibleBtnUpload('anexoRelAtendimento');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoChecklist');</script>");
		
		//Seção - Aprovação
		form.setVisibleById("divEmissaoNFAprovNotaFiscalPagto", true);
		
		//ABA-EMISSAO NF/PAGAMENTO
		//Forçando para não exibir a opção de anexo para Nota Fiscal e Boleto
		customHTML.append("<script>invisibleBtnUpload('anexoNotaFiscal');</script>");
		customHTML.append("<script>invisibleBtnUpload('anexoBoleto');</script>");
		
		//ABA-PROGRAMAÇÃO PARA PAGAMENTO
		getStatusOC(form,customHTML);
		
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

function ocultaDadosTipoSolicitante(form,customHTML){
	
	//Se for no Adminstrativo da GTS abrindo a solicitação, não é obrigatório apresenta as informações abaixo
	if(form.getValue("tipoSolicitante") == "Administrativo GTS"){
		
		//Quando é um Administrativo GTS que abriu, vai ocultar toda a parte de Revenda, e mostrar somente o entregador técnico
		customHTML.append("<script>$('#spanSubTituloRevendaEntTec').text('Entregador Técnico');</script>");
		form.setVisibleById("divCadastramentoCadastroRevendaEquip", false);
		form.setVisibleById("divRevendaEntTec", false);
		
	}
	
	
}

function controleAbas(form, customHTML, ativa, AbaCadastramento, AbaEmissaoNF, AbaProgPagamento){
	
	//Seta a Aba que é ativa (fica destacada como clicada)
	if(ativa == 'Cadastramento'){
		customHTML.append("<script>$('#tabCadastramento').addClass( 'active' );</script>");
		customHTML.append("<script>$('#divCadastramento').addClass( 'active' );</script>");
		customHTML.append("<script>$('#divCadastramento').addClass( 'in' );</script>");
	}else if(ativa == 'EmissaoNF'){
		customHTML.append("<script>$('#tabEmissaoNF').addClass( 'active' );</script>");
		customHTML.append("<script>$('#divEmissaoNF').addClass( 'active' );</script>");
		customHTML.append("<script>$('#divEmissaoNF').addClass( 'in' );</script>");
	}else if(ativa == 'ProgPagamento'){
		customHTML.append("<script>$('#tabProgPagto').addClass( 'active' );</script>");
		customHTML.append("<script>$('#divProgPagto').addClass( 'active' );</script>");
		customHTML.append("<script>$('#divProgPagto').addClass( 'in' );</script>");

	}
	
	if(AbaCadastramento == 'disponivel'){
		customHTML.append("<script>$('#tabCadastramento').removeClass('disabled');</script>");
		customHTML.append("<script>$('#tabCadastramento a').prop('href', '#divCadastramento');</script>");
	}
	
	if(AbaEmissaoNF == 'disponivel'){
		customHTML.append("<script>$('#tabEmissaoNF').removeClass('disabled');</script>");
		customHTML.append("<script>$('#tabEmissaoNF a').prop('href', '#divEmissaoNF');</script>");
	}
	
	if(AbaProgPagamento == 'disponivel'){
		customHTML.append("<script>$('#tabProgPagto').removeClass('disabled');</script>");
		customHTML.append("<script>$('#tabProgPagto a').prop('href', '#divProgPagto');</script>");
	}
	
}

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
		
		//Papel Entrega Técnica - Cadastra Processo Entrega Técnica - Administrativo GTS
		var constrainsCadEntTecAdmGTS1 = DatasetFactory.createConstraint("workflowColleagueRolePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		//Entrega Técnica - Cadastra Processo Entrega Técnica - Administrativo GTS
		var constrainsCadEntTecAdmGTS2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "000031", "000031", ConstraintType.MUST);
		var constrainsCadEntTecAdmGTS3 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", usuarioCorrente.getCode(),  usuarioCorrente.getCode(), ConstraintType.MUST);
		var constrainsCadEntTecAdmGTS = new Array(constrainsCadEntTecAdmGTS1, constrainsCadEntTecAdmGTS2, constrainsCadEntTecAdmGTS3);
		
		var dsPapelCadEntTecAdmGTS = DatasetFactory.getDataset("workflowColleagueRole", null, constrainsCadEntTecAdmGTS, null);
		if(dsTemValor(dsPapelCadEntTecAdmGTS)){
			//É um Administrativo GTS
			tipoUsuario = 'Administrativo GTS';
		}
		
		//Grupo Entrega Técnica - Administrativo GTS
		var constrainsEntTecAdmGTS1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		//Entrega Técnica - Administrativo GTS
		var constrainsEntTecAdmGTS2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "000008", "000008", ConstraintType.MUST);
		var constrainsEntTecAdmGTS3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", usuarioCorrente.getCode(),  usuarioCorrente.getCode(), ConstraintType.MUST);
		var constrainsEntTecAdmGTS = new Array(constrainsEntTecAdmGTS1, constrainsEntTecAdmGTS2, constrainsEntTecAdmGTS3);
		
		var dsPapelEntTecAdmGTS = DatasetFactory.getDataset("colleagueGroup", null, constrainsEntTecAdmGTS, null);
		if(dsTemValor(dsPapelEntTecAdmGTS)){
			//É um Administrativo GTS
			tipoUsuario = 'Administrativo GTS';
		}
	}
	
	
	return tipoUsuario;
	
	
}

function calculaValorTotalSimulacao(form,customHTML, tipoUsuario){
	
	if(form.getValue("tipoSolicitante") == 'Revenda' && tipoUsuario == 'Administrativo GTS'){
		//Busca o Valor de KM da revenda
		var revendaValorKM = '';
		var c1 = DatasetFactory.createConstraint("A1_COD", form.getValue("A1_COD"), "", ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("A1_LOJA", form.getValue("A1_LOJA"), "", ConstraintType.MUST);
		var datasetValorKMRevenda = DatasetFactory.getDataset("dsEntTecConsultaValorKMRevenda", null, [ c1, c2 ], null);
		if(dsTemValor(datasetValorKMRevenda)){
			if(datasetValorKMRevenda.getValue(0, "CODRET") == '1'){
				revendaValorKM = parseFloat(datasetValorKMRevenda.getValue(0, "REVVALORKM"));
			}else{
				customHTML.append("<script>FLUIGC.toast({message: 'Erro ao simular valor por KM da Revenda:<br> "+datasetValorKMRevenda.getValue(0, "MSGRET")+"', type: 'danger'});</script>");
			}
		}
		
		//Calcula Total Simulação
		if( form.getValue("NFvalKmTotalUtilizado") != '' && revendaValorKM != ''){
			var NFvalTotalSimulacao = form.getValue("NFvalKmTotalUtilizado") * revendaValorKM;
			
			form.setValue("NFvalValorKMRevenda", formatMoney(revendaValorKM) );
			form.setValue("NFvalTotalSimulacao", formatMoney(NFvalTotalSimulacao) );
		}
	}
}

function getStatusOC(form,customHTML){
	
	if(form.getValue("tipoSolicitante") == 'Revenda'){
		form.setVisibleById("divNumOC", true);
	}
	var OCNumOC = form.getValue("OCNumOC").trim();
	
	if( OCNumOC != '' ){
		
		var c1 = DatasetFactory.createConstraint("NUMOC", OCNumOC, '', ConstraintType.MUST);
		var datasetValorKMRevenda = DatasetFactory.getDataset("dsEntTecConsultaStatusOC", null, [ c1 ], null);
		if(dsTemValor(datasetValorKMRevenda)){
			
			if( datasetValorKMRevenda.getValue(0, "CODRET") == '1'){
				form.setValue("OCStatusOC", datasetValorKMRevenda.getValue(0, "OCSTATUSOC"));
			}
				
		}
	
		
	}
	
}

