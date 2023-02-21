function displayFields(form,customHTML){ 
	var atv_atual = getValue("WKNumState");
	form.setValue("WKNumState", getValue("WKNumState"));
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	injetarFuncoesUteisJS(form, customHTML);
	
	if(atv_atual == INICIO_0){
		form.setValue("solicitante", getValue("WKUser"));
		
		var nomeUser = "";
		var fields = ["colleagueName"];
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		var datasetColleague = DatasetFactory.getDataset("colleague", fields, [ c1, c2 ], null);
		if(dsTemValor(datasetColleague)){
			nomeUser = datasetColleague.getValue(0, "colleagueName");
			
			if(temValor(nomeUser)){
				form.setValue("nomeSolicitante", nomeUser);
			}
		}
		
		dadosAdicionaisUsuario(form, customHTML);
		carregaDadosSolicitante(form, customHTML);
		
		if(form.getValue("A1_PAIS") == "USA"){
			dadosIniciaisUSA(form, customHTML);
			mostraPedidoUSA(form, customHTML, 'ADD');
			customHTML.append("<script>$('#divDefineExportacaoPedido').show();</script>");
			customHTML.append("<script>$('#divDefineExpCancelar').hide();</script>");
		}else{
			dadosIniciaisBalconistaGerente(form, customHTML);
		}
		ocultaBotaoImprimir(form, customHTML);	
		carregaGestorEstado(form, customHTML);
		carregaDescontoPP(form, customHTML);
		
	}else if( atv_atual == INICIO ){
		
		if(form.getFormMode() == 'VIEW'){
			
			//Quando é inicio de catalogo, precisa passar pela etapa que fosse igual a abertura
			if(form.getValue("origemSolicitacao") == "catalogo" 
				&& form.getValue("A1_COD") == ""
				&& form.getValue("itensProcessados") != "true"	){
				
				form.setValue("solicitante", getValue("WKUser"));
				
				var nomeUser = "";
				var fields = ["colleagueName"];
				var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
				var datasetColleague = DatasetFactory.getDataset("colleague", fields, [ c1, c2 ], null);
				if(dsTemValor(datasetColleague)){
					nomeUser = datasetColleague.getValue(0, "colleagueName");
					
					if(temValor(nomeUser)){
						form.setValue("nomeSolicitante", nomeUser);
					}
				}
				
				dadosAdicionaisUsuario(form, customHTML);
				
				if(form.getValue("A1_PAIS") == "USA"){
					dadosIniciaisUSA(form, customHTML);
					mostraPedidoUSA(form, customHTML, 'ADD');
					customHTML.append("<script>$('#divDefineExportacaoPedido').show();</script>");
					customHTML.append("<script>$('#divDefineExpCancelar').hide();</script>");
				}else{
					dadosIniciaisBalconistaGerente(form, customHTML);
				}
				ocultaBotaoImprimir(form, customHTML);	
				carregaGestorEstado(form, customHTML);
				carregaDescontoPP(form, customHTML);
			}
			
			
			if(form.getValue("A1_PAIS") == "USA"){
				mostraPedidoUSA(form, customHTML, 'VIEW');
			}else{
				var A1_TIPO = form.getValue("A1_TIPO");
				
				if(A1_TIPO.toUpperCase() == "BALCONISTA"){
					viewOrcamento(form, customHTML);
				} else if(A1_TIPO.toUpperCase() == "GERENTE"){
					var defineOrcamentoPedido = form.getValue("defineOrcamentoPedido");
					
					if(defineOrcamentoPedido == 'orcamento'){
						viewOrcamentoGerente(form, customHTML);
					}else if(defineOrcamentoPedido == 'pedido'){
						viewPedidoGerente(form, customHTML);
					}
					
				}
			}
			
		}else{
			
			//Quando é inicio de catalogo, precisa passar pela etapa que fosse igual a abertura
			if(form.getValue("origemSolicitacao") == "catalogo" 
				&& form.getValue("A1_COD") == ""
				&& form.getValue("itensProcessados") != "true"	){
				
				form.setValue("solicitante", getValue("WKUser"));
				
				var nomeUser = "";
				var fields = ["colleagueName"];
				var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
				var datasetColleague = DatasetFactory.getDataset("colleague", fields, [ c1, c2 ], null);
				if(dsTemValor(datasetColleague)){
					nomeUser = datasetColleague.getValue(0, "colleagueName");
					
					if(temValor(nomeUser)){
						form.setValue("nomeSolicitante", nomeUser);
					}
				}
				
				dadosAdicionaisUsuario(form, customHTML);
				
				if(form.getValue("A1_PAIS") == "USA"){
					dadosIniciaisUSA(form, customHTML);
					mostraPedidoUSA(form, customHTML, 'ADD');
					customHTML.append("<script>$('#divDefineExportacaoPedido').show();</script>");
					customHTML.append("<script>$('#divDefineExpCancelar').hide();</script>");
				}else{
					dadosIniciaisBalconistaGerente(form, customHTML);
				}
				ocultaBotaoImprimir(form, customHTML);	
				carregaGestorEstado(form, customHTML);
				carregaDescontoPP(form, customHTML);
			}
			
			//Processa novamente os Dados Solicitante para caso tenha alterado algum código de vendedor
			carregaDadosSolicitante(form, customHTML);
			
			if(form.getValue("A1_PAIS") == "USA"){
				mostraPedidoUSA(form, customHTML, 'MOD');
				customHTML.append("<script>$('#divDefineExportacaoPedido').show();</script>");
			}else{
				dadosIniciaisBalconistaGerenteINICIO(form, customHTML);
				customHTML.append("<script>$('#divBtnImprimirExcel').show();</script>");
				customHTML.append("<script>$('#divBtnImprimir').show();</script>");
				carregaDescontoPP(form, customHTML);
			}
			
		}
		
	}else if ( atv_atual == REVISARORCAMENTO){
		if(form.getFormMode() == 'VIEW'){
			viewOrcamento(form, customHTML);
		}else{
			ocultaImpostos(form, customHTML);	
			
			customHTML.append("<script>$('#divAcaoFormalizaPedido').show()</script>");
		}

	}else if ( atv_atual == FORMALIZAPEDIDO){
		
		customHTML.append("<script>$('#divSolicitante').show();</script>");
//		customHTML.append("<script>$('#spanNomeSolicitante').text($('#nomeSolicitante').val());</script>");
		if(form.getFormMode() == 'VIEW'){
			
			var dataset = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
			if(dsTemValor(dataset)){
				
			var A1_TIPO = dataset.getValue(0, "A1_TIPO");
			
				if( dataset.getValue(0, "A1_TIPO") != '' && dataset.getValue(0, "A1_TIPO") !== undefined && dataset.getValue(0, "A1_TIPO") != 'undefined' ){ 
							
					//Seta o código do usuário, loja e gerente da revenda
					if(A1_TIPO.toUpperCase() == 'BALCONISTA' ){
						viewOrcamento(form, customHTML);
					}else if(A1_TIPO.toUpperCase() == 'GERENTE' || A1_TIPO.toUpperCase() == 'ADMGTS'){
						viewPedidoGerente(form, customHTML);
					}
		
				}
			}
			
		}else{
			customHTML.append("<script>$('#divObsPed').show();</script>");
			customHTML.append("<script>$('#divBtnImprimirExcel').show();</script>");
			customHTML.append("<script>$('#divBtnImprimir').show();</script>");
			customHTML.append("<script>$('#divIPI').removeClass('col-md-offset-6');</script>");
			
			carregaDadosSolicitante(form, customHTML, 'DadosSolicitanteAbertura');
			mostraPrecoCusto(form, customHTML);	
			escondePrecoSugeridoMP(form, customHTML);	
			carregaGestorEstado(form,customHTML)
			carregaDescontoPP(form, customHTML);
			
			customHTML.append("<script>$('.descProdTabela').css({minWidth: '230px'});</script>");
			customHTML.append("<script>$('#divGerenteAdm').show();</script>");
			customHTML.append("<script>$('#divAcaoGerarPedido').show();</script>");
			
		}
		
	}else if ( atv_atual == FORMALIZAPEDIDOUSA){
		
		customHTML.append("<script>$('#divSolicitante').show();</script>");
		if(form.getFormMode() == 'VIEW'){
			if(form.getValue("A1_PAIS") == "USA"){
				mostraPedidoUSA(form, customHTML, 'VIEW');
			}
		}else{
			if(form.getValue("A1_PAIS") == "USA"){
				carregaDadosSolicitante(form, customHTML, 'DadosSolicitanteAbertura');
				mostraPedidoUSA(form, customHTML, 'MOD');
				customHTML.append("<script>$('#divAcaoGerarPedido').show();</script>");
			}
		}
		
	}else if ( atv_atual == INTEGRAORCAMENTOPROTHEUS){
		if(form.getFormMode() == 'VIEW'){
			if(form.getValue("A1_PAIS") == "USA"){
				mostraPedidoUSA(form, customHTML, 'VIEW');
			}else{
				finalizado(form, customHTML, INTEGRAORCAMENTOPROTHEUS)
			}
		}else{
			mostraPrecoCusto(form, customHTML);	
			ocultaBotaoImprimir(form, customHTML);
		}
	}else if ( atv_atual == ANALISAERROINTEGRAORCAMENTO){
		ocultaBotaoImprimir(form, customHTML);
		if(form.getFormMode() == 'VIEW'){
			if(form.getValue("A1_PAIS") == "USA"){
				mostraPedidoUSA(form, customHTML, 'VIEW');
			}else{
				finalizado(form, customHTML, ANALISAERROINTEGRAORCAMENTO);
			}
			
		}else{
			if(form.getValue("A1_PAIS") == "USA"){
				mostraPedidoUSA(form, customHTML, 'MOD');
			}else{
				mostraPrecoCusto(form, customHTML);	
				mostraNumCatalogoPeca(form,customHTML);
				mostraNumOrcamentoProtheus(form, customHTML);
				customHTML.append("<script>$('#divGerenteAdm').show();</script>");
			}
		}
		
		
	}else if ( atv_atual == INTEGRAPEDIDOPROTHEUS){
		if(form.getFormMode() == 'VIEW'){
			if(form.getValue("A1_PAIS") == "USA"){
				mostraPedidoUSA(form, customHTML, 'VIEW');
			}else{
				finalizado(form, customHTML, INTEGRAPEDIDOPROTHEUS)
			}
			
		}else{
			if(form.getValue("A1_PAIS") == "USA"){
				mostraPedidoUSA(form, customHTML, 'MOD');
			}else{
				mostraPrecoCusto(form, customHTML);	
				ocultaBotaoImprimir(form, customHTML);
			}
		}
	}else if ( atv_atual == ANALISAERROINTEGRAPEDIDO){
		
		ocultaBotaoImprimir(form, customHTML);
		if(form.getFormMode() == 'VIEW'){
			if(form.getValue("A1_PAIS") == "USA"){
				mostraPedidoUSA(form, customHTML, 'VIEW');
			}else{
				finalizado(form, customHTML, ANALISAERROINTEGRAPEDIDO);
				mostraNumCatalogoPeca(form, customHTML);
				mostraNumOrcamentoProtheus(form, customHTML);
				mostraNumPedidoProtheus(form, customHTML);
			}
		}else{
			if(form.getValue("A1_PAIS") == "USA"){
				mostraPedidoUSA(form, customHTML, 'MOD');
			}else{
				mostraPrecoCusto(form, customHTML);	
				mostraNumCatalogoPeca(form, customHTML);
				mostraNumOrcamentoProtheus(form, customHTML);
				mostraNumPedidoProtheus(form, customHTML);
				customHTML.append("<script>$('#divGerenteAdm').show();</script>");
			}
		}
		
		
	}else if ( atv_atual == GTSVERIFICAORCAMENTO){
		
		
		customHTML.append("<script>$('#divSolicitante').show();</script>");
		if(form.getFormMode() == 'VIEW'){
			
			if(form.getValue("A1_PAIS") == "USA"){
				mostraPedidoUSA(form, customHTML, 'VIEW');
			}else{
				var dataset = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
				if(dsTemValor(dataset)){
					
				var A1_TIPO = dataset.getValue(0, "A1_TIPO");
				
					if( dataset.getValue(0, "A1_TIPO") != '' && dataset.getValue(0, "A1_TIPO") !== undefined && dataset.getValue(0, "A1_TIPO") != 'undefined' ){ 
								
						//Seta o código do usuário, loja e gerente da revenda
						if(A1_TIPO.toUpperCase() == 'BALCONISTA' ){
							viewOrcamento(form, customHTML);
						}else if(A1_TIPO.toUpperCase() == 'GERENTE' || A1_TIPO.toUpperCase() == 'ADMGTS'){
							viewPedidoGerente(form, customHTML);
							mostraNumOrcamentoProtheus(form, customHTML);
						}
			
					}
				}
			}
			
			
		}else{
			if(form.getValue("A1_PAIS") == "USA"){
				mostraPedidoUSA(form, customHTML, 'MOD');
				mostraNumCatalogoPeca(form, customHTML);
				mostraNumOrcamentoProtheus(form, customHTML);
				desabilitaCamposItemAnalisaGTS(form, customHTML);
				customHTML.append("<script>$('#divAcaoPartes').show();</script>");
			}else{
				customHTML.append("<script>$('#divGerenteAdm').show();</script>");
				customHTML.append("<script>$('#divObsPed').show();</script>");
				customHTML.append("<script>$('#divIPI').removeClass('col-md-offset-6');</script>");
				customHTML.append("<script>$('#divIPI').addClass('col-md-offset-2');</script>");
				customHTML.append("<script>$('#divAcaoPartes').show();</script>");
				customHTML.append("<script>$('.descProdTabela').css({minWidth: '230px'});</script>");
				
				mostraNumCatalogoPeca(form, customHTML);
				mostraNumOrcamentoProtheus(form, customHTML);
				mostraPrecoCusto(form, customHTML);	
				desabilitaCamposItemAnalisaGTS(form, customHTML);
				mostraTransportadora(form, customHTML);
				mostraRedespacho(form, customHTML);
			}
			
		}
		
		
	}else if( atv_atual == GTSVERIFICAPEDIDO){
		
		customHTML.append("<script>$('#divSolicitante').show();</script>");
		if(form.getFormMode() == 'VIEW'){
			
			if(form.getValue("A1_PAIS") == "USA"){
				mostraPedidoUSA(form, customHTML, 'VIEW');
				mostraNumCatalogoPeca(form, customHTML);
				mostraNumOrcamentoProtheus(form, customHTML);
				mostraNumPedidoProtheus(form, customHTML);
			}else{
				var dataset = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
				if(dsTemValor(dataset)){
					
				var A1_TIPO = dataset.getValue(0, "A1_TIPO");
				
					if( dataset.getValue(0, "A1_TIPO") != '' && dataset.getValue(0, "A1_TIPO") !== undefined && dataset.getValue(0, "A1_TIPO") != 'undefined' ){ 
								
						//Seta o código do usuário, loja e gerente da revenda
						if(A1_TIPO.toUpperCase() == 'BALCONISTA' ){
							viewOrcamento(form, customHTML);
						}else if(A1_TIPO.toUpperCase() == 'GERENTE' || A1_TIPO.toUpperCase() == 'ADMGTS'){
							viewPedidoGerente(form, customHTML);
							mostraNumCatalogoPeca(form, customHTML);
							mostraNumOrcamentoProtheus(form, customHTML);
							mostraNumPedidoProtheus(form, customHTML);
						}
			
					}
				}
			}
			
			
		}else{
			if(form.getValue("A1_PAIS") == "USA"){
				mostraPedidoUSA(form, customHTML, 'MOD');
				mostraNumCatalogoPeca(form, customHTML);
				mostraNumOrcamentoProtheus(form, customHTML);
				mostraNumPedidoProtheus(form, customHTML);
				desabilitaCamposItemAnalisaGTS(form, customHTML);
				customHTML.append("<script>$('#divPartesCientePedido').show();</script>");
				
			}else{
				customHTML.append("<script>$('#divGerenteAdm').show();</script>");
				customHTML.append("<script>$('#divObsPed').show();</script>");
				customHTML.append("<script>$('#divIPI').removeClass('col-md-offset-6');</script>");
				customHTML.append("<script>$('#divIPI').addClass('col-md-offset-2');</script>");
				customHTML.append("<script>$('#divPartesCientePedido').show();</script>");
				customHTML.append("<script>$('.descProdTabela').css({minWidth: '230px'});</script>");
				
				mostraNumCatalogoPeca(form, customHTML);
				mostraNumOrcamentoProtheus(form, customHTML);
				mostraNumPedidoProtheus(form, customHTML);
				mostraPrecoCusto(form, customHTML);	
				desabilitaCamposItemAnalisaGTS(form, customHTML);
				mostraTransportadora(form, customHTML);
				mostraRedespacho(form, customHTML);
			}
		}
		
	}else if ( atv_atual == FIM){
		
		if(form.getValue("A1_PAIS") == "USA"){
			mostraPedidoUSA(form, customHTML, 'VIEW');
			mostraNumCatalogoPeca(form, customHTML);
			mostraNumOrcamentoProtheus(form, customHTML);
			mostraNumPedidoProtheus(form, customHTML);
		}else{
			customHTML.append("<script>$('#cabecalho').text('Pedido');</script>");
			customHTML.append("<script>$('#divSolicitante').show();</script>");
			
			ocultaBotaoImprimir(form, customHTML);
			finalizado(form, customHTML, FIM);
			mostraNumCatalogoPeca(form, customHTML);
			mostraNumOrcamentoProtheus(form, customHTML);
			mostraNumPedidoProtheus(form, customHTML);
		}

	}else if ( atv_atual == CANCELAMENTOABERTURA){
		finalizado(form, customHTML, CANCELAMENTOABERTURA);
		customHTML.append("<script>$('#divOrcamentoPedido').show()</script>");
	
	}else if ( atv_atual == CANCELAMENTOABERTURAEXP){
		mostraPedidoUSA(form, customHTML, 'VIEW');
		customHTML.append("<script>$('#divDefineExportacaoPedido').show();</script>");
		customHTML.append("<script>$('#divOrcamentoProduto').hide();</script>");
		
	}else if ( atv_atual == CANCELAMENTOFORMALIZA){
		ocultaImpostos(form, customHTML);	
		ocultaBotaoImprimir(form, customHTML);
		finalizado(form, customHTML, CANCELAMENTOFORMALIZA);
		customHTML.append("<script>$('#divAcaoFormalizaPedido').show()</script>");
		customHTML.append("<script>$('#divMotivoCancelamento').show()</script>");
	}else if ( atv_atual == CANCELAMENTOPEDIDO){
		if(form.getValue("A1_PAIS") == "USA"){
			mostraPedidoUSA(form, customHTML, 'VIEW');
			customHTML.append("<script>$('#divAcaoGerarPedido').show()</script>");
			customHTML.append("<script>$('#divMotCancelGerarPed').show()</script>");
		}else{
			customHTML.append("<script>$('#cabecalho').text('Pedido');</script>");
			ocultaBotaoImprimir(form, customHTML);
			finalizado(form, customHTML, CANCELAMENTOPEDIDO);
			
			customHTML.append("<script>$('#divAcaoGerarPedido').show()</script>");
			customHTML.append("<script>$('#divMotCancelGerarPed').show()</script>");
		}
	}else if( atv_atual == CANCELAMENTOPARTES){
		if(form.getValue("A1_PAIS") == "USA"){
			mostraPedidoUSA(form, customHTML, 'VIEW');
		}else{
			customHTML.append("<script>$('#cabecalho').text('Pedido');</script>");
			ocultaBotaoImprimir(form, customHTML);
			mostraNumCatalogoPeca(form, customHTML);
			mostraNumOrcamentoProtheus(form, customHTML);
			finalizado(form, customHTML, CANCELAMENTOPEDIDO);
		}
		
		
	}
	
	if(getValue("WKUser") == 'admin'){
		customHTML.append("<script>$('#divBtnImprimirExcel').show();</script>");
		customHTML.append("<script>$('#divBtnExcelPartes').show()</script>");
		customHTML.append("<script>$('#divIPI').removeClass('col-md-offset-2');</script>");
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

function ocultaBotaoImprimir(form,customHTML){
	
	customHTML.append("<script>$('#btnImprimir').hide();</script>");
	
}

function carregaGestorEstado(form,customHTML){
	
	var solicitante = form.getValue("solicitante");
	var WKUser = getValue("WKUser");
	var usuario = "";
	
	/*Para pegar o usuário solicitante do orçamento*/
	if(solicitante == ""){
		usuario = WKUser;
		
	}else{
		if(WKUser != solicitante){
			usuario = solicitante;
		}else{
			usuario = WKUser;
		}
	}
	var siglaUFUser = usuario.substring(0, 2);
	
	var siglaEstados = new Array('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'EX', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');  
	
	var flLoginEstado = false;
	
	for (var i = 0; i < siglaEstados.length; i++) {
		if(siglaUFUser == siglaEstados[i]){
			flLoginEstado = true;
		}
	}
	
	if(flLoginEstado){
		var dataset = DatasetFactory.getDataset("ds_parametro_gestorestado", null, null, null);
		
		
		for ( var i = 0; i < dataset.rowsCount; i++) {
			if (dataset.getValue(i, "siglaEstado") == siglaUFUser) {
				if(dataset.getValue(i, "matriculaEstado") != ""){
					form.setValue("gestorEstado", dataset.getValue(i, "matriculaEstado"));
					form.setValue("codVendedorProtheus", dataset.getValue(i, "codVendedorProtheus"));
					form.setValue("matriculaValidaPedRiscoA", dataset.getValue(i, "matriculaValidaPedRiscoA"));
				}
			}
		}
		
	}else{
		customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
		customHTML.append("<script>$('form').hide()</script>");
	}
	
	/*Verifica se o usuário logado é GreenSystem*/
	//Se for GS não mostrar os tipo de pedido PG – Pedido de Garantia,	PC - PEDIDO CONTRATO 
	var siglaGSUser = WKUser.substring(2, 4);
	if(siglaGSUser == "GS"){
		customHTML.append("<script>$('.tpGreenSystem').hide()</script>");
		form.setValue("tipoGS", "sim");
	}
	
}

function carregaDescontoPP(form,customHTML){
	var solicitante = form.getValue("solicitante");
	var WKUser = getValue("WKUser");
	var usuario = "";
	var dataHoje = '';
	var periodoInicialDescontoPP = '';
	var periodoFinalDescontoPP = '';
	
	/*Para pegar o usuário solicitante do orçamento*/
	if(solicitante == ""){
		usuario = WKUser;
		
	}else{
		if(WKUser != solicitante){
			usuario = solicitante;
		}else{
			usuario = WKUser;
		}
	}
	var siglaUFUser = usuario.substring(0, 2);
	
	var siglaEstados = new Array('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'EX', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');  
	
	var flLoginEstado = false;
	
	for (var i = 0; i < siglaEstados.length; i++) {
		if(siglaUFUser == siglaEstados[i]){
			flLoginEstado = true;
		}
	}
	
	if(flLoginEstado){
		
		var dataset = DatasetFactory.getDataset("ds_parametro_pedidopromocional", null, null, null);
		
		for ( var i = 0; i < dataset.rowsCount; i++) {
			if (dataset.getValue(i, "siglaEstado") == siglaUFUser) {
				dataHoje = dataAtual("yyyymmdd");
				periodoInicialDesconto = formataData(dataset.getValue(i, "periodoInicialDesconto"), "yyyymmdd");
				periodoFinalDesconto = formataData(dataset.getValue(i, "periodoFinalDesconto"), "yyyymmdd");
				
				if(dataset.getValue(i, "periodoInicialDesconto") != '' && dataset.getValue(i, "periodoFinalDesconto") != ''){
					if( dataHoje >= periodoInicialDesconto && dataHoje <= periodoFinalDesconto ){
						form.setValue("periodoInicialDescontoPP", dataset.getValue(i, "periodoInicialDesconto"));
						form.setValue("periodoFinalDescontoPP", dataset.getValue(i, "periodoFinalDesconto"));
						form.setValue("porcDescontoPP", dataset.getValue(i, "porcDescontoPP"));
						
					}else{
						form.setValue("periodoInicialDescontoPP", "");
						form.setValue("periodoFinalDescontoPP", "");
						form.setValue("porcDescontoPP", "0%");
						
					}
				}else{
					form.setValue("periodoInicialDescontoPP", "");
					form.setValue("periodoFinalDescontoPP", "");
					form.setValue("porcDescontoPP", "0%");
				}
				
				
			}
		}
		
	}else{
		customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
		customHTML.append("<script>$('form').hide()</script>");
	}
}

function ocultaImpostos(form,customHTML){
	
	var atv_atual = getValue("WKNumState");
	
	//Oculta IPI
	customHTML.append("<script>$('.itIPI').hide();</script>");
	
	//Oculta ICMS
	customHTML.append("<script>$('.itICMS').hide();</script>");
	
	//Ajusta linha do totais
	customHTML.append("<script>$('#divTotaisLinha').removeClass('col-md-6');</script>");
	customHTML.append("<script>$('#divTotaisLinha').addClass('col-md-3');</script>");	
	customHTML.append("<script>$('#divTotaisLinha').removeClass('col-md-offset-6');</script>");
	customHTML.append("<script>$('#divTotaisLinha').addClass('col-md-offset-9');</script>");	
	
	
	customHTML.append("<script>$('#divIPI').hide()</script>");
	customHTML.append("<script>$('#divICMS').hide()</script>");
	customHTML.append("<script>$('#divICMSRet').hide()</script>");
	
	if(atv_atual == INICIO || atv_atual == REVISARORCAMENTO){
		customHTML.append("<script>$('#divBtnImprimirExcel').show();</script>");
		customHTML.append("<script>$('#divBtnImprimir').show();</script>");
		customHTML.append("<script>$('#divBtnImprimirExcel').addClass('col-md-offset-8');</script>");
		
	}else{
		customHTML.append("<script>$('#divTotalVenda').addClass('col-md-offset-10');</script>");
	}
	
}
/**
 * Vai buscar no dataset dsConsultaClienteWS dados da Revenda que está abrindo a solicitação
 * Definindo o Risco da Revenda, % Desconto, e Vends (para comissão)
 * 
 * No campo tipo, é passado para 'DadosSolicitanteAbertura', para quando está em Formalizar Pedido, e procura o código de vendedor.
 * @param form
 * @param customHTML
 */
function carregaDadosSolicitante(form, customHTML, tipo){
	
	var constraint = null;
	if(tipo == 'DadosSolicitanteAbertura'){
		var c1 = DatasetFactory.createConstraint("TIPO_BUSCA", "constraint", "constraint" ,ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("A1_COD", form.getValue("A1_COD"), form.getValue("A1_COD") ,ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("A1_LOJA", form.getValue("A1_LOJA"), form.getValue("A1_LOJA") ,ConstraintType.MUST);
		constraint = new Array(c1, c2, c3);
	}
	
	var dataset = DatasetFactory.getDataset("dsConsultaClienteWS", null, constraint, null);
	if(dsTemValor(dataset)){
		
		var CODRET = dataset.getValue(0, "CODRET");
		if( CODRET == '1'){
			
			var endNomeCliente = dataset.getValue(0, "A1_NOME");
			var endCNPJ = dataset.getValue(0, "A1_CGC");
			var endCidade = dataset.getValue(0, "A1_MUN");
			var endUF = dataset.getValue(0, "A1_EST");
			var endEndereco = dataset.getValue(0, "A1_END");
			var endBairro = dataset.getValue(0, "A1_BAIRRO");
			var endCEP = dataset.getValue(0, "A1_CEP");
			var descontoUsuario = dataset.getValue(0, "A1_DESC");
			var riscoRevenda = dataset.getValue(0, "A1_RISCO").trim();

			var vendedor1 = dataset.getValue(0, "A1_VEND1").trim();
			var vendedor2 = dataset.getValue(0, "A1_VEND2").trim();
			var vendedor3 = dataset.getValue(0, "A1_VEND3").trim();
			var vendedor4 = dataset.getValue(0, "A1_VEND4").trim();
			var vendedor5 = dataset.getValue(0, "A1_VEND5").trim();
			var vendedor6 = dataset.getValue(0, "A1_VEND6").trim();
			var vendedor7 = dataset.getValue(0, "A1_VEND7").trim();
			var vendedor8 = dataset.getValue(0, "A1_VEND8").trim();
			var vendedor9 = dataset.getValue(0, "A1_VEND9").trim();
			var vendedor10 = dataset.getValue(0, "A1_VEND10").trim();
			
			//Valida campos de retorno
			if(riscoRevenda == ''){
				customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente.<br>Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
				log.info('O seu usuário não está configurado corretamente. Risco da Revenda não preenchido. Cod: ' + form.getValue("A1_COD") + ' - Loja:' + form.getValue("A1_LOJA"));
				ocultaCabecalhosForm(form, customHTML);
			}else if(vendedor1 == ''){
				customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente #1.<br>Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
				log.info('O seu usuário não está configurado corretamente. Vendedor 1 não preenchido. Cod: ' + form.getValue("A1_COD") + ' - Loja:' + form.getValue("A1_LOJA"));
				ocultaCabecalhosForm(form, customHTML);
			}else if(vendedor4 == ''){
				customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente #4.<br>Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
				log.info('O seu usuário não está configurado corretamente. Vendedor 4 não preenchido. Cod: ' + form.getValue("A1_COD") + ' - Loja:' + form.getValue("A1_LOJA"));
				ocultaCabecalhosForm(form, customHTML);
			}else if(vendedor5 == ''){
				customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente #5.<br>Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
				log.info('O seu usuário não está configurado corretamente. Vendedor 5 não preenchido. Cod: ' + form.getValue("A1_COD") + ' - Loja:' + form.getValue("A1_LOJA"));
				ocultaCabecalhosForm(form, customHTML);
			}else if(vendedor7 == ''){
				customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente #7.<br>Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
				log.info('O seu usuário não está configurado corretamente. Vendedor 7 não preenchido. Cod: ' + form.getValue("A1_COD") + ' - Loja:' + form.getValue("A1_LOJA"));
				ocultaCabecalhosForm(form, customHTML);
			}else if(vendedor8 == ''){
				customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente #8.<br>Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
				log.info('O seu usuário não está configurado corretamente. Vendedor 8 não preenchido. Cod: ' + form.getValue("A1_COD") + ' - Loja:' + form.getValue("A1_LOJA"));
				ocultaCabecalhosForm(form, customHTML);
			}
			
			form.setValue("endNomeCliente", endNomeCliente);
			form.setValue("endCNPJ", endCNPJ);
			form.setValue("endCidade", endCidade);
			form.setValue("endUF", endUF);
			form.setValue("endEndereco", endEndereco);
			form.setValue("endBairro", endBairro);
			form.setValue("endCEP", endCEP);
			form.setValue("descontoUsuario", descontoUsuario);
			form.setValue("riscoRevenda", riscoRevenda);
				
			form.setValue("vendedor1", vendedor1);
			form.setValue("vendedor2", vendedor2);
			form.setValue("vendedor3", vendedor3);
			form.setValue("vendedor4", vendedor4);
			form.setValue("vendedor5", vendedor5);
			form.setValue("vendedor6", vendedor6);
			form.setValue("vendedor7", vendedor7);
			form.setValue("vendedor8", vendedor8);
			form.setValue("vendedor9", vendedor9);
			form.setValue("vendedor10", vendedor10);
			
			
			
		}else{
			
			customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente.<br>Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
			ocultaCabecalhosForm(form, customHTML);
			
		}
		
		
	}else{
		
		customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
		ocultaCabecalhosForm(form, customHTML);
		
	}
	
}

function dadosAdicionaisUsuario(form,customHTML){
	
	var A1_COD = "";
	var A1_LOJA = "";
	var A1_GERENTE = "";
	var A1_TIPO = "";
	var A1_PAIS = "";
	var cadCorreto = true;	
	var textoCadErrado = "";
	
	var dataset = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
	if(dsTemValor(dataset)){
		
		A1_COD = dataset.getValue(0, "A1_COD");
		A1_LOJA = dataset.getValue(0, "A1_LOJA");
		A1_GERENTE = dataset.getValue(0, "A1_GERENTE");
		A1_TIPO = dataset.getValue(0, "A1_TIPO");
		
		if( dataset.getValue(0, "A1_COD") != '' && dataset.getValue(0, "A1_COD") !== undefined && dataset.getValue(0, "A1_COD") != 'undefined' &&
			dataset.getValue(0, "A1_LOJA") != '' && dataset.getValue(0, "A1_LOJA") !== undefined && dataset.getValue(0, "A1_LOJA") != 'undefined' &&
			dataset.getValue(0, "A1_GERENTE") != '' && dataset.getValue(0, "A1_GERENTE") !== undefined && dataset.getValue(0, "A1_GERENTE") != 'undefined' &&
			dataset.getValue(0, "A1_TIPO") != '' && dataset.getValue(0, "A1_TIPO") !== undefined && dataset.getValue(0, "A1_TIPO") != 'undefined' ){ 
			
			A1_PAIS = retornaPais();
			//Seta o código do usuário, loja e gerente da revenda
			form.setValue("A1_COD", A1_COD);
			form.setValue("A1_LOJA", A1_LOJA);
			form.setValue("A1_TIPO", A1_TIPO);
			form.setValue("A1_PAIS", A1_PAIS);
			form.setValue("gerenteRevenda", A1_GERENTE);
			
			
		}else{
			customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
			customHTML.append("<script>$('form').hide()</script>");
			
		}

	
	}else{
		
		customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
		customHTML.append("<script>$('form').hide()</script>");
	
	}
	
}

function dadosIniciaisBalconistaGerente(form, customHTML){
	
	var A1_COD = form.getValue("A1_COD");
	var A1_LOJA = form.getValue("A1_LOJA");
	var A1_TIPO = form.getValue("A1_TIPO");
	
	if(A1_TIPO.toUpperCase() == "GERENTE"){
		
		customHTML.append("<script>$('#cabecalho').text('');</script>");
		customHTML.append("<script>$('#divOrcamentoPedido').show();</script>");
		customHTML.append("<script>$('#divOrcamentoCliente').hide();</script>");
		customHTML.append("<script>$('#divOrcamentoProduto').hide();</script>");
		customHTML.append("<script>$('#divOrcamentoTabItens').hide();</script>");
		
		
	}else if(A1_TIPO.toUpperCase() == "BALCONISTA"){
		ocultaImpostos(form, customHTML);
		
	}
}

function dadosIniciaisUSA(form, customHTML){
	
	
	//Seta o tipo de pedido como Pedido de Estoque USA e mostra ela
	customHTML.append("<script>$('#tipoPedido option').each (function (name, val) { if(val.value =='PEUSA'){ $(this).show(); } });</script>");
	form.setValue("tipoPedido", "PEUSA");
	form.setEnabled("tipoPedido", false);
	var dataset = DatasetFactory.getDataset("ds_parametro_tipopedido", null, null, null);
	if(dsTemValor(dataset)){
		
		for ( var i = 0; i < dataset.rowsCount; i++) {
			if (dataset.getValue(i, "tipoPedido") == "PEUSA" ) {
				form.setValue("porcDescontoParamTipoPedido", dataset.getValue(i, "Desconto"));
				form.setValue("tpFrete", dataset.getValue(i, "TpFrete"));
				form.setValue("ValorMinimo", dataset.getValue(i, "ValorMinimo"));
			}
		}
	}
	
	//Faz uma consulta no novo dataset de condição de pagamento, para pegar a condição de pagamento definida dentro deste dataset.
	var c1 = DatasetFactory.createConstraint("tipoPedido", "PEUSA", "PEUSA" ,ConstraintType.MUST);
	var datasetCondPgto = DatasetFactory.getDataset("dsOrcPedConsultaCondPgto", null, [ c1 ], null);
	if(dsTemValor(datasetCondPgto)){
		if (datasetCondPgto.getValue(0, "tipoPedido") == "PEUSA" ) {
			form.setValue("codCondPagto", datasetCondPgto.getValue(0, "codCondPagto") );
			form.setValue("condPagto", datasetCondPgto.getValue(0, "descCondPagto"));
		}
	}
}

function mostraPedidoUSA(form, customHTML, modo){
	
	var atv_atual = getValue("WKNumState");
	var A1_TIPO_USUARIO_LOGADO = "";
	
	var datasetDadosAdicionaisUsuario = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
	if(dsTemValor(datasetDadosAdicionaisUsuario)){
		
		A1_TIPO_USUARIO_LOGADO = datasetDadosAdicionaisUsuario.getValue(0, "A1_TIPO");
	}
	
	if(getValue('WKUserLocale') == 'en_US'){
		customHTML.append("<script>$('#cabecalho').text('Order');</script>");
		customHTML.append("<script>$('#condPagto').val( $('#condPagto').val().replace('dias após o envio', 'days after shipment') );</script>");
	}else{
		customHTML.append("<script>$('#cabecalho').text('Pedido');</script>");
		customHTML.append("<script>$('#condPagto').val( $('#condPagto').val().replace('days after shipment', 'dias após o envio') );</script>");
	}
	form.setEnabled("tipoPedido", false);
	
	customHTML.append("<script>$('#divOrcamentoCliente').hide();</script>");
	customHTML.append("<script>$('#divGerenteAdm').show();</script>");
	
	//Oculta o zoomCondPagto e mostra o campo de condPagto
	customHTML.append("<script>$('#divZoomCondPagto').hide();</script>");
	customHTML.append("<script>$('#condPagto').show();</script>");
	customHTML.append("<script>$('#divFrete').hide();</script>");
	customHTML.append("<script>$('#divTransporteProprio').hide();</script>");
	customHTML.append("<script>$('#divDSTransp').hide();</script>");
	customHTML.append("<script>$('#divTransp').hide();</script>");
	customHTML.append("<script>$('#divTxtTransp').hide();</script>");
	customHTML.append("<script>$('#divRedespacho').hide();</script>");
	customHTML.append("<script>$('#divTxtRedespacho').hide();</script>");
	
	//Produto
	customHTML.append("<script>$('#divPorcAcres').hide();</script>");
	customHTML.append("<script>$('#divPrcSugerido').hide();</script>");
	customHTML.append("<script>$('#divPrcVenda').hide();</script>");
	customHTML.append("<script>$('#divPrcCustoCab').hide()</script>");
	customHTML.append("<script>$('#divPrcCustoDolarCab').show()</script>");
	customHTML.append("<script>$('#divPrcCustoDolarCab').addClass('col-md-offset-1');</script>");
	
	if(A1_TIPO_USUARIO_LOGADO == 'GERENTE'){
		customHTML.append("<script>$('#divEstoque').hide();</script>");
	}
	customHTML.append("<script>$('#divUnMed').removeClass('col-md-1');</script>");
	customHTML.append("<script>$('#divUnMed').addClass('col-md-2');</script>");
	customHTML.append("<script>$('#divPesoUnit').removeClass('col-md-1');</script>");
	customHTML.append("<script>$('#divPesoUnit').addClass('col-md-2');</script>");
	customHTML.append("<script>$('#divPrcSugeMP').hide();</script>");
	customHTML.append("<script>$('#divCurvaAbc').hide();</script>");
	customHTML.append("<script>$('#divRecompra').hide();</script>");
	customHTML.append("<script>$('#divCodCritico').addClass('col-md-offset-1');</script>");
	customHTML.append("<script>$('#popoverCondPgto').hide();</script>");
	customHTML.append("<script>$('#popoverPort').hide();</script>");
	customHTML.append("<script>$('#popoverEnUs').show();</script>");
	
	if(modo == "VIEW"){
		customHTML.append("<script>$('#divOrcamentoProduto').hide();</script>");
	}
	//ITENS
	//Mostra Qtd/ Embalagem
	customHTML.append("<script>$('.itQtdEmb').show();</script>");
	
	//Mostra Preço de Custo Dolar
	customHTML.append("<script>$('.itPrcCustoDolar').show();</script>");
	//Oculta Preço Unit.
	customHTML.append("<script>$('.itPrcUnitReal').hide();</script>");
	//Oculta IPI
	customHTML.append("<script>$('.itIPI').hide();</script>");
	//Oculta ICMS
	customHTML.append("<script>$('.itICMS').hide();</script>");
	//Oculta Total do Pedido Balconista
	customHTML.append("<script>$('.itTotReal').hide();</script>");
	//Mostra Total Dolar
	customHTML.append("<script>$('.itTotCustoDolar').show();</script>");
	if(A1_TIPO_USUARIO_LOGADO == 'ADMGTS'){
		//Reduz tamanho campo de produto
		customHTML.append("<script>$('.itDescProduto').removeClass('descProdTabela');</script>");
		customHTML.append("<script>$('.itDescProduto').addClass('descProdTabelaUSAPartes');</script>");
		
		//Oculta NCM
		customHTML.append("<script>$('.itNCM').hide();</script>");
		//Se for ADMGTS mostra em reais e dolar
		//Mostra Preço de Custo Real
		customHTML.append("<script>$('.itPrcCustoReal').show();</script>");
		//Mostra Preço Total de Custo Real
		customHTML.append("<script>$('.itTotCustoReal').show();</script>");
	}else{
		//Reduz tamanho campo de produto
		customHTML.append("<script>$('.itDescProduto').removeClass('descProdTabela');</script>");
		customHTML.append("<script>$('.itDescProduto').addClass('descProdTabelaUSA');</script>");
		
	}
	
	

	//Totais
	customHTML.append("<script>$('#divObsPed').show();</script>");
	customHTML.append("<script>$('#divIPI').hide()</script>");
	customHTML.append("<script>$('#divICMS').hide()</script>");
	customHTML.append("<script>$('#divICMSRet').hide()</script>");
	customHTML.append("<script>$('#divTotalVenda').hide()</script>");
	
	if(A1_TIPO_USUARIO_LOGADO == 'ADMGTS'){
		customHTML.append("<script>$('#orcProdDesc').show();</script>");	
		customHTML.append("<script>$('#orcProdDescUSA').hide();</script>");	
		
		customHTML.append("<script>$('#divTotalCusto').addClass('col-md-offset-2');</script>");	
		customHTML.append("<script>$('#divTotalCusto').show()</script>");
		customHTML.append("<script>$('#totalCustoPedido').show()</script>");
		
		customHTML.append("<script>$('#divTotalCustoDolar').show()</script>");
		customHTML.append("<script>$('#totalCustoPedidoDolar').show()</script>");
		
		customHTML.append("<script>$('#divBtnExcelPartes').show()</script>");
		
		
		//Ajusta Campo Linha Totais
		customHTML.append("<script>$('#divTotaisLinha').removeClass('col-md-6');</script>");
		customHTML.append("<script>$('#divTotaisLinha').addClass('col-md-4');</script>");	
		customHTML.append("<script>$('#divTotaisLinha').removeClass('col-md-offset-6');</script>");
		customHTML.append("<script>$('#divTotaisLinha').addClass('col-md-offset-8');</script>");
	}else{
		//Busca de produto
		customHTML.append("<script>$('#orcProdDesc').hide();</script>");	
		customHTML.append("<script>$('#orcProdDescUSA').show();</script>");	
		
		//Tabela de itens
		customHTML.append("<script>$('.inputOrcDescProdutoItem').hide();</script>");
		customHTML.append("<script>$('.inputOrcDescProdutoUSAItem').show();</script>");
		customHTML.append("<script>$('.inputOrcPrecoCustoItem').hide();</script>");
		customHTML.append("<script>$('.inputOrcPrecoCustoDolarItem').show();</script>");
		
		if(atv_atual == INICIO || atv_atual == FORMALIZAPEDIDOUSA || atv_atual == GTSVERIFICAORCAMENTO || atv_atual == GTSVERIFICAPEDIDO ){
			customHTML.append("<script>$('#divBtnImprimirExcel').show();</script>");
			customHTML.append("<script>$('#divBtnImprimir').show();</script>");
			customHTML.append("<script>$('#divTotalCustoDolar').addClass('col-md-offset-4');</script>");
		}else{
			customHTML.append("<script>$('#divTotalCustoDolar').addClass('col-md-offset-6');</script>");
		}
		
		customHTML.append("<script>$('#divTotalCustoDolar').show()</script>");
		customHTML.append("<script>$('#totalCustoPedidoDolar').show()</script>");
		
		
		//Ajusta Campo Linha Totais
		customHTML.append("<script>$('#divTotaisLinha').removeClass('col-md-6');</script>");
		customHTML.append("<script>$('#divTotaisLinha').addClass('col-md-2');</script>");	
		customHTML.append("<script>$('#divTotaisLinha').removeClass('col-md-offset-6');</script>");
		customHTML.append("<script>$('#divTotaisLinha').addClass('col-md-offset-10');</script>");
	}
	
}


function dadosIniciaisBalconistaGerenteINICIO(form, customHTML){
	
	var A1_TIPO = form.getValue("A1_TIPO");
	
	if(A1_TIPO.toUpperCase() == "BALCONISTA"){
		ocultaImpostos(form, customHTML);
		
	}
}
function mostraPrecoCusto(form, customHTML){
	
	
	var A1_COD = "";
	var A1_LOJA = "";
	var A1_GERENTE = "";
	var A1_TIPO = "";
	
	var dataset = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
	if(dsTemValor(dataset)){
		
		A1_TIPO = dataset.getValue(0, "A1_TIPO");
		
		if( dataset.getValue(0, "A1_TIPO") != '' && dataset.getValue(0, "A1_TIPO") !== undefined && dataset.getValue(0, "A1_TIPO") != 'undefined' ){ 
					
			
			//Seta o código do usuário, loja e gerente da revenda
			form.setValue("A1_TIPO", A1_TIPO);
			
			if(A1_TIPO.toUpperCase() == 'GERENTE' || A1_TIPO.toUpperCase() == 'ADMGTS'){
				
				customHTML.append("<script>$('#divOrcamentoCliente').hide();</script>");
				
				var tipoPedido = form.getValue("tipoPedido");
				
				customHTML.append("<script>$('#divPorcAcres').hide()</script>");
				customHTML.append("<script>$('#divPrcSugerido').hide()</script>");
				customHTML.append("<script>$('#divPrcVenda').hide()</script>");
				customHTML.append("<script>$('#divPrcCustoCab').show()</script>");
				customHTML.append("<script>$('#divPrcCustoCab').addClass('col-md-offset-1');</script>");
				
				
				if(tipoPedido == "CP"){
					
					customHTML.append("<script>$('#tipoCP').show();</script>");
					var CPqtdOpcaoRecebimento = form.getValue("CPqtdOpcaoRecebimento");
					
					if(CPqtdOpcaoRecebimento == "1"){
						customHTML.append("<script>$('#CPLinhaOpcao1').show();</script>");
						
						//Mostra coluna de 1ª retirada
						customHTML.append("<script>$('.itCP1Ret').show();</script>");
						//Oculta coluna de 2ª retirada
						customHTML.append("<script>$('.itCP2Ret').hide();</script>");
						//Oculta coluna de 3ª retirada
						customHTML.append("<script>$('.itCP3Ret').hide();</script>");
						
					}else if(CPqtdOpcaoRecebimento == "2"){
						customHTML.append("<script>$('#CPLinhaOpcao1').show();</script>");
						customHTML.append("<script>$('#CPLinhaOpcao2').show();</script>");
						
						//Mostra coluna de 1ª retirada
						customHTML.append("<script>$('.itCP1Ret').show();</script>");
						//Mostra coluna de 2ª retirada
						customHTML.append("<script>$('.itCP2Ret').show();</script>");
						//Oculta coluna de 3ª retirada
						customHTML.append("<script>$('.itCP3Ret').hide();</script>");
						
					}else if(CPqtdOpcaoRecebimento == "3"){
						customHTML.append("<script>$('#CPLinhaOpcao1').show();</script>");
						customHTML.append("<script>$('#CPLinhaOpcao2').show();</script>");
						customHTML.append("<script>$('#CPLinhaOpcao3').show();</script>");
						
						//Mostra coluna de 1ª retirada
						customHTML.append("<script>$('.itCP1Ret').show();</script>");
						//Mostra coluna de 2ª retirada
						customHTML.append("<script>$('.itCP2Ret').show();</script>");
						//Mostra coluna de 3ª retirada
						customHTML.append("<script>$('.itCP3Ret').show();</script>");
					}
				}
				
				//Mostra Qtd/ Embalagem
				customHTML.append("<script>$('.itQtdEmb').show();</script>");
				
				
				//Mostra Preço de Custo
				customHTML.append("<script>$('.itPrcCustoReal').show();</script>");
				
				//Mostra Preço Total de Custo
				customHTML.append("<script>$('.itTotCustoReal').show();</script>");
				
				customHTML.append("<script>$('#divTotalCusto').show();</script>");
				customHTML.append("<script>$('#totalCustoPedido').show();</script>");
				
				
				//Oculta Preço Unit.
				customHTML.append("<script>$('.itPrcUnitReal').hide();</script>");
				
				//Oculta Total do Pedido Balconista
				customHTML.append("<script>$('.itTotReal').hide();</script>");
				
				customHTML.append("<script>$('#divTotalVenda').hide();</script>");
				customHTML.append("<script>$('#totalPedido').hide();</script>");
				
			}else if(A1_TIPO.toUpperCase() == 'BALCONISTA' ){
				
			}
			
			
		}else{
			customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
			customHTML.append("<script>$('form').hide()</script>");
			
		}
		
	}
	
	
	
}

function escondePrecoSugeridoMP(form,customHTML){
	customHTML.append("<script>$('#divPrcSugeMP').hide();</script>");
	customHTML.append("<script>$('#divCurvaAbc').addClass('col-md-offset-1');</script>");
}

function mostraNumCatalogoPeca(form,customHTML){
	
	customHTML.append("<script>$('#divSolicitante').show();</script>");
	
	if(form.getValue("origemSolicitacao") == 'catalogo' ){
		customHTML.append("<script>$('#divNumCatalogo').show()</script>");
		if(form.getValue("tipoPedido") != 'CP'   ){
			customHTML.append("<script>$('#divDadosSolicitante').removeClass('col-md-8');</script>");
			customHTML.append("<script>$('#divDadosSolicitante').addClass('col-md-6');</script>");
		}
	}
	
}
function mostraNumOrcamentoProtheus(form,customHTML){
	
	customHTML.append("<script>$('#divSolicitante').show();</script>");
	
	if(form.getValue("tipoPedido") == 'CP'   ){
		customHTML.append("<script>$('.thNumOrcProtheus').show()</script>");
		customHTML.append("<script>$('.tdNumOrcProtheus').show();</script>");
		
	}else{
		customHTML.append("<script>$('#divNumOrcamento').show()</script>");
		customHTML.append("<script>$('#numOrcamento').show()</script>");
	}
	
	
}
function mostraNumPedidoProtheus(form,customHTML){
	
	customHTML.append("<script>$('#divSolicitante').show();</script>");
	if(form.getValue("tipoPedido") == 'CP'   ){
		customHTML.append("<script>$('.thNumPedProtheus').show()</script>");
		customHTML.append("<script>$('.tdNumPedProtheus').show();</script>");
		
	}else{
		customHTML.append("<script>$('#divNumPedido').show()</script>");
		customHTML.append("<script>$('#numPedido').show()</script>");
		
		if(form.getValue("tipoPedido") == 'PG'   ){
			customHTML.append("<script>$('#divRedespacho').removeClass('col-md-offset-7');</script>");
			customHTML.append("<script>$('#divRedespacho').addClass('col-md-offset-4');</script>");
		}
	}
}
function mostraTransportadora(form, customHTML){
	//Transporte Próprio
	if(form.getValue("chkTransporteProprio") == 'sim'   ){
		customHTML.append("<script>$('#divTransp').show()</script>");
		customHTML.append("<script>$('#divTxtTransp').show()</script>");
		customHTML.append("<script>$('#divDSTransp').hide()</script>");
	}
}
function mostraRedespacho(form, customHTML){

	if(form.getValue("chkRedespacho") == 'sim' ){
		//Oculta Transportadora Zoom
		customHTML.append("<script>$('#divDSTransp').hide()</script>");
		//Mostra Transportadora Text
		customHTML.append("<script>$('#divTransp').show()</script>");
		customHTML.append("<script>$('#divTxtTransp').hide()</script>");
	}
}

function desabilitaCamposItemAnalisaGTS(form, customHTML){
	var indexes = form.getChildrenIndexes("tbItensOrcamento");
	//Esconde Lixeira
	customHTML.append("<script>$('#tbItensOrcamento > thead> tr > th:nth-child(1)').hide()</script>");
	customHTML.append("<script>$('#tbItensOrcamento > tbody> tr > td:nth-child(1)').hide()</script>");
	
	//Esconde NCM
	customHTML.append("<script>$('.itNCM').hide();</script>");
	
	
	for (var i = 0; i < indexes.length; i++) {   	    	    	    	
		customHTML.append("<script>$('#orcPrecoUnitItem___"+ indexes[i] +"').prop('readonly', true);</script>");
    }
}

function viewOrcamento(form, customHTML){
	
	customHTML.append("<script>$('#divOrcamentoCliente').show();</script>");
	customHTML.append("<script>$('#divGerenteAdm').hide();</script>");
	
	customHTML.append("<script>$('#divOrcamentoProduto').hide();</script>");

	
	//IPI
	customHTML.append("<script>$('.itIPI').hide();</script>");		
	
	//ICMS
	customHTML.append("<script>$('.itICMS').hide();</script>");
	
	//esconde campo observacao
	customHTML.append("<script>$('#divObsPed').hide();</script>");
	
	customHTML.append("<script>$('#divIPI').hide()</script>");
	customHTML.append("<script>$('#divICMS').hide()</script>");
	customHTML.append("<script>$('#divICMSRet').hide()</script>");
	
	//Ajusta Campo Linha Totais
	customHTML.append("<script>$('#divTotaisLinha').removeClass('col-md-6');</script>");
	customHTML.append("<script>$('#divTotaisLinha').addClass('col-md-3');</script>");	
	customHTML.append("<script>$('#divTotaisLinha').removeClass('col-md-offset-6');</script>");
	customHTML.append("<script>$('#divTotaisLinha').addClass('col-md-offset-9');</script>");	
	
	
	customHTML.append("<script>$('#divBtnImprimirExcel').show();</script>");
	customHTML.append("<script>$('#divBtnImprimir').show();</script>");
	customHTML.append("<script>$('#divBtnImprimirExcel').addClass('col-md-offset-8');</script>");
	
	
}

function viewOrcamentoGerente(form, customHTML){
	
	customHTML.append("<script>$('#cabecalho').text('Orçamento');</script>");
	
	customHTML.append("<script>$('#divOrcamentoCliente').show();</script>");
	customHTML.append("<script>$('#divGerenteAdm').hide();</script>");
	customHTML.append("<script>$('#divGarantiaBalcao').hide();</script>");
	//Div Cabeçalho Produto
	customHTML.append("<script>$('#divOrcamentoProduto').hide();</script>");
	customHTML.append("<script>$('#divPorcAcres').show();</script>");
	customHTML.append("<script>	$('#divPrcSugerido').show();</script>");
	customHTML.append("<script>$('#divPrcVenda').show();</script>");
	customHTML.append("<script>$('#divPrcCustoCab').hide();</script>");
	customHTML.append("<script>$('#divPrcCustoCab').removeClass('col-md-offset-1');</script>");
	
	//Tabela de Produtos
	customHTML.append("<script>$('#divOrcamentoTabItens').show();</script>");
	//Oculta Qtd/ Embalagem
	customHTML.append("<script>$('.itQtdEmb').hide();</script>");
	//Oculta Preço de Custo
	customHTML.append("<script>$('.itPrcCustoReal').hide();</script>");
	//Mostra Preço Unit.
	customHTML.append("<script>$('.itPrcUnitReal').show();</script>");
	//IPI
	customHTML.append("<script>$('.itIPI').hide();</script>");
	//ICMS
	customHTML.append("<script>	$('.itICMS').hide();</script>");
	//Oculta Total do Pedido
	customHTML.append("<script>$('.itTotReal').show();</script>");
//	Mostra Preço Total de Custo
	customHTML.append("<script>$('.itTotCustoReal').hide();</script>");
	
	//esconde campo observacao
	customHTML.append("<script>$('#divObsPed').hide();</script>");
	
	customHTML.append("<script>$('#divIPI').hide()</script>");
	customHTML.append("<script>$('#divICMS').hide()</script>");
	customHTML.append("<script>$('#divICMSRet').hide()</script>");
	
	//Ajusta Campo Linha Totais
	customHTML.append("<script>$('#divTotaisLinha').removeClass('col-md-6');</script>");
	customHTML.append("<script>$('#divTotaisLinha').addClass('col-md-3');</script>");	
	customHTML.append("<script>$('#divTotaisLinha').removeClass('col-md-offset-6');</script>");
	customHTML.append("<script>$('#divTotaisLinha').addClass('col-md-offset-9');</script>");	
	
	
	customHTML.append("<script>$('#divBtnImprimirExcel').show();</script>");
	customHTML.append("<script>$('#divBtnImprimir').show();</script>");
	customHTML.append("<script>$('#divBtnImprimirExcel').addClass('col-md-offset-8');</script>");

}

function viewPedidoGerente(form, customHTML){
	
	customHTML.append("<script>$('#cabecalho').text('Pedido');</script>");
	
	customHTML.append("<script>$('#divOrcamentoCliente').hide();</script>");
	//Div Tipo Pedido
	customHTML.append("<script>$('#divGerenteAdm').show();</script>");
	
	//Transporte Próprio
	var chkTransporteProprio = form.getValue("chkTransporteProprio");
	if(chkTransporteProprio == 'sim'){
		customHTML.append("<script>$('#divTransp').show();</script>");
		customHTML.append("<script>$('#divTxtTransp').show();</script>");
		customHTML.append("<script>$('#divDSTransp').hide();</script>");
	}
	//Redespacho
	var chkRedespacho = form.getValue("chkRedespacho");
	if(form.getValue("chkRedespacho") == 'sim' ){
		//Oculta Transportadora Zoom
		customHTML.append("<script>$('#divDSTransp').hide()</script>");
		//Mostra Transportadora Text
		customHTML.append("<script>$('#divTransp').show()</script>");
		customHTML.append("<script>$('#divTxtTransp').hide()</script>");
	}
	
	var tipoPedido = form.getValue("tipoPedido");
	if(tipoPedido == 'PG'){
		customHTML.append("<script>$('#divGarantiaBalcao').show();</script>");
		var garantiaBalcao = form.getValue("garantiaBalcao");
		
		if(garantiaBalcao == 'Sim'){
			customHTML.append("<script>$('#tipoPG').show();</script>");
			
			customHTML.append("<script>$('.tipoPGBalcaoSim').show();</script>");
			customHTML.append("<script>$('.tipoPGBalcaoNao').hide();</script>");
			customHTML.append("<script>$('#tipoPGBalcaoNaoSerie').hide();</script>");
		}else if (garantiaBalcao == 'Nao'){
			customHTML.append("<script>$('#tipoPG').show();</script>");
			
			customHTML.append("<script>$('.tipoPGBalcaoSim').hide();</script>");
			customHTML.append("<script>$('.tipoPGBalcaoNao').show();</script>");
			customHTML.append("<script>$('#tipoPGBalcaoNaoSerie').show();</script>");
		}
		
		customHTML.append("<script>$('#divRedespacho').removeClass('col-md-offset-7');</script>");
		customHTML.append("<script>$('#divRedespacho').addClass('col-md-offset-4');</script>");
	}else if(tipoPedido == 'CP'){
		
		customHTML.append("<script>$('#tipoCP').show();</script>");
		var CPqtdOpcaoRecebimento = form.getValue("CPqtdOpcaoRecebimento");
		
		if(CPqtdOpcaoRecebimento == "1"){
			customHTML.append("<script>$('#CPLinhaOpcao1').show();</script>");
			
			//Mostra coluna de 1ª retirada
			customHTML.append("<script>$('.itCP1Ret').show();</script>");
			//Oculta coluna de 2ª retirada
			customHTML.append("<script>$('.itCP2Ret').hide();</script>");
			//Oculta coluna de 3ª retirada
			customHTML.append("<script>$('.itCP3Ret').hide();</script>");
			
		}else if(CPqtdOpcaoRecebimento == "2"){
			customHTML.append("<script>$('#CPLinhaOpcao1').show();</script>");
			customHTML.append("<script>$('#CPLinhaOpcao2').show();</script>");
			
			//Mostra coluna de 1ª retirada
			customHTML.append("<script>$('.itCP1Ret').show();</script>");
			//Mostra coluna de 2ª retirada
			customHTML.append("<script>$('.itCP2Ret').show();</script>");
			//Oculta coluna de 3ª retirada
			customHTML.append("<script>$('.itCP3Ret').hide();</script>");
			
		}else if(CPqtdOpcaoRecebimento == "3"){
			customHTML.append("<script>$('#CPLinhaOpcao1').show();</script>");
			customHTML.append("<script>$('#CPLinhaOpcao2').show();</script>");
			customHTML.append("<script>$('#CPLinhaOpcao3').show();</script>");
			
			//Mostra coluna de 1ª retirada
			customHTML.append("<script>$('.itCP1Ret').show();</script>");
			//Mostra coluna de 2ª retirada
			customHTML.append("<script>$('.itCP2Ret').show();</script>");
			//Mostra coluna de 3ª retirada
			customHTML.append("<script>$('.itCP3Ret').show();</script>");
		}
		
	}else{
		customHTML.append("<script>$('#divGarantiaBalcao').hide();</script>");
	}

	//Div Cabeçalho Produto
	customHTML.append("<script>$('#divOrcamentoProduto').hide();</script>");
	customHTML.append("<script>$('#divPorcAcres').hide();</script>");
	customHTML.append("<script>$('#divPrcSugerido').hide();</script>");
	customHTML.append("<script>$('#divPrcVenda').hide();</script>");
	customHTML.append("<script>$('#divPrcCustoCab').show();</script>");
	customHTML.append("<script>$('#divPrcCustoCab').addClass('col-md-offset-1');</script>");
	
	//Tabela de Produtos
	customHTML.append("<script>$('#divOrcamentoTabItens').show();</script>");
	
	//Mostra Qtd/ Embalagem
	customHTML.append("<script>$('.itQtdEmb').show();</script>");
	
	//Diminui tamanho campo de Descrição do Produto
	customHTML.append("<script>$('.descProdTabela').css({minWidth: '230px'});</script>");
	
	//Mostra Preço de Custo
	customHTML.append("<script>$('.itPrcCustoReal').show();</script>");
	
	//Oculta Preço Unit.
	customHTML.append("<script>$('.itPrcUnitReal').hide();</script>");
	
	//IPI
	customHTML.append("<script>$('.itIPI').show();</script>");
	//ICMS
	customHTML.append("<script>$('.itICMS').show();</script>");
	
	//Oculta Total do Pedido
	customHTML.append("<script>$('.itTotReal').hide();</script>");
	
	//Mostra Preço Total de Custo
	customHTML.append("<script>$('.itTotCustoReal').show();</script>");
	
	//Totais
	customHTML.append("<script>$('#divTotaisLinha').removeClass('col-md-3');</script>");
	customHTML.append("<script>$('#divTotaisLinha').addClass('col-md-6');</script>");
	customHTML.append("<script>$('#divTotaisLinha').removeClass('col-md-offset-9');</script>");
	customHTML.append("<script>$('#divTotaisLinha').addClass('col-md-offset-6');</script>");
	
	customHTML.append("<script>$('#divObsPed').show();</script>");
	customHTML.append("<script>$('#divBtnImprimirExcel').show();</script>");
	customHTML.append("<script>$('#divBtnImprimir').show();</script>");

	customHTML.append("<script>$('#divIPI').show();</script>");
	customHTML.append("<script>$('#divICMSRet').show();</script>");
	customHTML.append("<script>$('#divTotalCusto').show();</script>");
	customHTML.append("<script>$('#divTotalVenda').hide();</script>");
	customHTML.append("<script>$('#totalPedido').hide();</script>");

	customHTML.append("<script>$('#divIPI').removeClass('col-md-offset-6');</script>");

	
}


function finalizado(form, customHTML, etapaFinalizado){
	
	var A1_TIPO = "";
	
	var dataset = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
	if(dsTemValor(dataset)){
		
		A1_TIPO = dataset.getValue(0, "A1_TIPO");
		
		if( dataset.getValue(0, "A1_TIPO") != '' && dataset.getValue(0, "A1_TIPO") !== undefined && dataset.getValue(0, "A1_TIPO") != 'undefined' ){ 
					
			
			if( A1_TIPO.toUpperCase() == 'BALCONISTA' || etapaFinalizado == CANCELAMENTOFORMALIZA ){
				customHTML.append("<script>$('#divOrcamentoCliente').show();</script>");
				customHTML.append("<script>$('#divGerenteAdm').hide();</script>");
				
				customHTML.append("<script>$('#divOrcamentoProduto').hide();</script>");
				
				
				//IPI
				customHTML.append("<script>$('.itIPI').hide();</script>");		
				
				//ICMS
				customHTML.append("<script>$('.itICMS').hide();</script>");
				
				//Ajusta Campo Linha Totais
				customHTML.append("<script>$('#divTotaisLinha').removeClass('col-md-6');</script>");
				customHTML.append("<script>$('#divTotaisLinha').addClass('col-md-3');</script>");	
				customHTML.append("<script>$('#divTotaisLinha').removeClass('col-md-offset-6');</script>");
				customHTML.append("<script>$('#divTotaisLinha').addClass('col-md-offset-9');</script>");	
				
				
				//esconde campo observacao
				customHTML.append("<script>$('#divObsPed').hide();</script>");
				
				customHTML.append("<script>$('#divIPI').hide()</script>");
				customHTML.append("<script>$('#divICMS').hide()</script>");
				customHTML.append("<script>$('#divICMSRet').hide()</script>");
				
				customHTML.append("<script>$('#divTotalVenda').removeClass('col-md-2');</script>");
				customHTML.append("<script>$('#divTotalVenda').addClass('col-md-offset-10');</script>");
				
			}else if( A1_TIPO.toUpperCase() == 'GERENTE' || A1_TIPO.toUpperCase() == 'ADMGTS' ){
				customHTML.append("<script>$('#divOrcamentoCliente').hide();</script>");
				customHTML.append("<script>$('#divGerenteAdm').show();</script>");
				customHTML.append("<script>$('#divOrcamentoProduto').hide();</script>");
				customHTML.append("<script>$('#divObsPed').show();</script>");
				customHTML.append("<script>$('#divIPI').removeClass('col-md-offset-6');</script>");
				customHTML.append("<script>$('.descProdTabela').css({minWidth: '230px'});</script>");
				
				//Transporte Próprio
				var chkTransporteProprio = form.getValue("chkTransporteProprio");
				if(chkTransporteProprio == 'sim'){
					customHTML.append("<script>$('#divTransp').show();</script>");
					customHTML.append("<script>$('#divTxtTransp').show();</script>");
					customHTML.append("<script>$('#divDSTransp').hide();</script>");
				}
				//Redespacho
				var chkRedespacho = form.getValue("chkRedespacho");
				if(form.getValue("chkRedespacho") == 'sim' ){
					//Oculta Transportadora Zoom
					customHTML.append("<script>$('#divDSTransp').hide()</script>");
					//Mostra Transportadora Text
					customHTML.append("<script>$('#divTransp').show()</script>");
					customHTML.append("<script>$('#divTxtTransp').hide()</script>");
				}
				
				if(form.getValue("tipoPedido") == 'PG'   ){
					customHTML.append("<script>$('#divGarantiaBalcao').show();</script>");
					customHTML.append("<script>$('#tipoPG').show();</script>");
					
				}else if(form.getValue("tipoPedido") == 'CP'){
					
					customHTML.append("<script>$('#tipoCP').show();</script>");
					var CPqtdOpcaoRecebimento = form.getValue("CPqtdOpcaoRecebimento");
					
					if(CPqtdOpcaoRecebimento == "1"){
						customHTML.append("<script>$('#CPLinhaOpcao1').show();</script>");
						
						//Mostra coluna de 1ª retirada
						customHTML.append("<script>$('.itCP1Ret').show();</script>");
						
						//Oculta coluna de 2ª retirada
						customHTML.append("<script>$('.itCP2Ret').hide();</script>");
						
						//Oculta coluna de 3ª retirada
						customHTML.append("<script>$('.itCP3Ret').hide();</script>");
						
					}else if(CPqtdOpcaoRecebimento == "2"){
						customHTML.append("<script>$('#CPLinhaOpcao1').show();</script>");
						customHTML.append("<script>$('#CPLinhaOpcao2').show();</script>");
						
						//Mostra coluna de 1ª retirada
						customHTML.append("<script>$('.itCP1Ret').show();</script>");
						//Mostra coluna de 2ª retirada
						customHTML.append("<script>$('.itCP2Ret').show();</script>");
						//Oculta coluna de 3ª retirada
						customHTML.append("<script>$('.itCP3Ret').hide();</script>");
						
					}else if(CPqtdOpcaoRecebimento == "3"){
						customHTML.append("<script>$('#CPLinhaOpcao1').show();</script>");
						customHTML.append("<script>$('#CPLinhaOpcao2').show();</script>");
						customHTML.append("<script>$('#CPLinhaOpcao3').show();</script>");
						
						//Mostra coluna de 1ª retirada
						customHTML.append("<script>$('.itCP1Ret').show();</script>");
						//Mostra coluna de 2ª retirada
						customHTML.append("<script>$('.itCP2Ret').show();</script>");
						//Mostra coluna de 3ª retirada
						customHTML.append("<script>$('.itCP3Ret').show();</script>");
					}
					
					
				}else{
					customHTML.append("<script>$('#divGarantiaBalcao').hide();</script>");
					customHTML.append("<script>$('#tipoPG').hide();</script>");
				}
				
				
				//Mostra Qtd/ Embalagem
				customHTML.append("<script>$('.itQtdEmb').show();</script>");
				
				//Esconde NCM
				customHTML.append("<script>$('.itNCM').hide();</script>");
				
				//Mostra Preço de Custo
				customHTML.append("<script>$('.itPrcCustoReal').show();</script>");
				
				//Mostra Preço Total de Custo
				customHTML.append("<script>$('.itTotCustoReal').show();</script>");
				
				customHTML.append("<script>$('#divTotalCusto').show();</script>");
				customHTML.append("<script>$('#totalCustoPedido').show();</script>");
				
				//Oculta Preço Unit.
				customHTML.append("<script>$('.itPrcUnitReal').hide();</script>");
				
				//Oculta Total do Pedido
				customHTML.append("<script>$('.itTotReal').hide();</script>");
				
				customHTML.append("<script>$('#divIPI').addClass('col-md-offset-2');</script>");
				customHTML.append("<script>$('#divTotalVenda').hide();</script>");
				customHTML.append("<script>$('#totalPedido').hide();</script>");
			}
				
		}
		
	}
	
}

function retornaPais(){
	var WKUser = getValue("WKUser");
	
	var siglaUFUser = WKUser.substring(0, 2);
	var paisUser = "";
	
	if(siglaUFUser == "EX"){
		paisUser = WKUser.substring(2, 5);
	}else{
		paisUser = "BRA";
	}
	return paisUser;
}
