
$(document).ready(function() {
	setTimeout(function() {
		funcoes.start();
	}, 100)
});

var funcoes = (function() {
	var loading = FLUIGC.loading(window);
	var index = 0;
	return {
		start : function() {
			eventsFuncoes.setup();
		},
		
		/**
		 * Função somente para a atividade inicial setar os valores default iniciais
		 */
		iniciaCampos : function(){
			
			//Dados Clientes
			$('#cliCEP').mask('99.999-999');
			
			//Dados pedidos
			let today = new Date();
			let minDate = new Date();
			minDate.setDate(minDate.getDate() + 15);
			    
			FLUIGC.calendar('#pedDataPrevEmbarque', {
				language : 'pt-br',
				pickDate : true,
				pickTime : false,
//				defaultDate: minDate,
				minDate : minDate
			});
			
			//Cabeçalho Pedido
			
			//Itens Pedido
			funcoes.addLinhaItemPedido();
			
			//Totais
			$("#pedTotalMaquina").text('0,00');
			$("#pedTotalFrete").text('0,00');
			$("#pedTotalPeca").text('0,00');
			$("#pedTotalIPI").val('0');
			validafunctions.setMoeda("pedTotalIPI", 2, false , '');
			$("#pedTotalPedido").val('0');
			validafunctions.setMoeda("pedTotalPedido", 2, false , '');
			
		},
		
		/*
		 * Dados Revenda
		 */
		limpaCamposRevenda : function(){
			$('#revA3COD').val('');
			$('#revNome').val('');
			$('#revNome').prop('readonly', true);
			$('#revFator').val('');
			$('#revMatFluig').val('');
			$('#revNomeFluig').val('');
		},
			
		trataCampoConsumidorFinalOURevendedor : function(){
			
			if($('#pedClienteRevenda').val() == "Cliente"){
//				$('#revCpfCnpj').prop('readonly', false);
				$('#revFator').prop('readonly', false);
				
				//Se for definido como Cliente, libera para buscar o cliente
				$('#cliCpfCnpj').prop('readonly', false);
				$('#cliInscricaoEstadual').prop('readonly', false);
			}else if( $('#pedClienteRevenda').val() == "Revenda" ){
//				$('#revCpfCnpj').prop('readonly', true);
				$('#revFator').val('');
				$('#revFator').prop('readonly', true);
				
				//Se for definido como Cliente, libera para buscar o cliente
				$('#cliCpfCnpj').prop('readonly', false);
				$('#cliInscricaoEstadual').prop('readonly', false);
			}else{
//				$('#revCpfCnpj').prop('readonly', true);
				$('#revFator').val('');
				$('#revFator').prop('readonly', true);
				
				//Se for definido como Cliente, libera para buscar o cliente
				$('#cliCpfCnpj').prop('readonly', true);
				$('#cliInscricaoEstadual').prop('readonly', true);
			}
			
		},
		
		/**
		 * Função que consulta o dataset da revenda
		 * Tem como objetivo alimentar os campos de nome da revenda
		 *
		 * @param {*} revCpfCnpj (Cpf/Cnpj  da revenda)
		 */
		consultaRevenda : function(revCpfCnpj){
			
			revCpfCnpj = revCpfCnpj.replace(/[^0-9]/g, "");
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
	    		type: "GET",
	    		dataType: "json",
	    		async: true,
	    		url: "/api/public/ecm/dataset/search?datasetId=dsPedMaqConsultaRevenda&filterFields=VENDCGC,"+revCpfCnpj,
	    		data: "",
	    	    success: function (data, status, xhr) {
	    	    	
	    	    	if (data != null && data.content != null && data.content.length > 0) {
	    	    		const records = data.content;
	    	    		if( records[0].CODRET == "1"){
	    		            var record = records[0];
	    					let CODVEND = record.CODVEND;
	    					let NOME = record.NOME;
	    					let VENDMAT = record.VENDMAT;

    			    		$("#revA3COD").val(CODVEND);
    			    		$("#revNome").val(NOME);
    			    		$('#revNome').prop('readonly', true);
    			    		$("#revMatFluig").val(VENDMAT);
    			    		if( VENDMAT != "" ){
    			    			let nomeRevendaFluig = getNome(VENDMAT);
    			    			$("#revNomeFluig").val(nomeRevendaFluig);
    			    		}else{
    			    			if(isMobile == 'true'){
    								alert("A matrícula da revenda não foi localizada, comunicar o Administrador do Sistema!");
    							}else{
    								FLUIGC.toast({ message: "A matrícula da revenda não foi localizada, comunicar o Administrador do Sistema!", type: 'danger' });
    							}
    			    		}
    			    		
//    			    		if( $("#vendedor2").val().trim() != CODVEND.trim() ){
//    			    			FLUIGC.toast({ title: 'Atenção!', message: 'A Revenda definida no formulário não está vinculada como "Revenda do Cliente"!', type: 'danger' });
//    			    		}
	    	    		}else if (records[0].CODRET == "2"){
	    	    			if(isMobile == 'true'){
								alert(records[0].MSGRET);
							}else{
								FLUIGC.toast({ message: records[0].MSGRET, type: 'warning' });
							}
		    	    		funcoes.limpaCamposRevenda();
		    	    		$('#revNome').prop('readonly', false);
		    	    	}
	    	    	}else{
	    	    		FLUIGC.toast({ title: '', message: 'Erro ao consultar a revenda, comunicar o Administrador do Sistema!', type: 'danger' });
	    	    		
	    	    		funcoes.limpaCamposRevenda();
	    	    	}
	    	    	setTimeout(function(){ 
	    	    		loading.hide();
	    	    	}, 1000);
	    	    },
				error: function(XMLHttpRequest, textStatus, errorThrown) {
	    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
	    	    	FLUIGC.toast({message: 'Erro na consulta da revenda, comunica Administrador do Sistema!', type: 'danger'});
	    	    	loading.hide();
				}
			});
			
			
		},
		/*
		 * Dados Cliente
		 */
		
		/**
		 * Função para resetar os dados do cliente
		 *
		 */
		limpaCamposCliente : function(){
			$('#cliNome').val('');
			$('#cliCodigo').val('');
			$('#cliLoja').val('');
			$('#cliCEP').val('');
			$('#cliUF').val('');
			$('#cliUFHidden').val('');
			$('#cliCidade').val('');
			$('#cliEndereco').val('');
			$('#cliBairro').val('');
			$('#cliComplemento').val('');
			$('#cliEmail').val('');
			$('#cliDDDTelefone').val('');
			$('#cliTelefone').val('');
			$('#vendedor1').val('');
			$('#vendedor2').val('');
			$('#vendedor3').val('');
			$('#vendedor4').val('');
			$('#vendedor5').val('');
			$('#vendedor6').val('');
			$('#vendedor7').val('');
			$('#vendedor8').val('');
			$('#vendedor9').val('');
			$('#vendedor10').val('');
			
		},
		
		/**
		 * Função que define como readonly os campos de cliente
		 * Ter por objeto de que se não encontrar o cliente na base de dados, liberar os campos 
		 * para preencher manualmente os campos.
		 * Porém, em primeiro momento os campos devem estar bloqueados para forçar a busca do cliente via dataset.
		 * 
		 */
		somenteLeituraCamposCliente : function(readonly){
			
			//variavel readonly é true/false
			//true se for para deixar como somente leitura,
			//false para deixar aberto
			$('#cliNome').prop('readonly', readonly);
//			$('#cliInscricaoEstadual').prop('readonly', readonly);
			$('#cliCEP').prop('readonly', readonly);
			$('#cliUF').prop('disabled', readonly);
			$('#cliCidade').prop('readonly', readonly);
			$('#cliEndereco').prop('readonly', readonly);
			$('#cliBairro').prop('readonly', readonly);
			$('#cliComplemento').prop('readonly', readonly);
			$('#cliEmail').prop('readonly', readonly);
			$('#cliDDDTelefone').prop('readonly', readonly);
			$('#cliTelefone').prop('readonly', readonly);
		},
		
		/**
		 * Aplica mascara de telefone
		 */
		mascaraTelefone : function(){
			let cliTelefone = $('#cliTelefone').val();
			if(cliTelefone.length == 9 || cliTelefone.length == 10){ // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
				$('#cliTelefone').mask('00000-0009');
			} else {
				$('#cliTelefone').mask('0000-00009');
			}
		},
		
		/**
		 * Função que busca via dataset os dados do cliente para alimentar em tela
		 * É passado por parametro a busca via web service o CPF/CNPJ/Código Exterior mais a inscrição estadual
		 * Se não encontrar os dados do cliente, libera os campos através da função somenteLeituraCamposCliente
		 * 
		 */
		consultaCliente : function(tipoBusca){
			
			let cliCpfCnpj = $('#cliCpfCnpj').val().replace(/[^0-9]/g, "").trim();
			let cliInscricaoEstadual = $('#cliInscricaoEstadual').val().replace(/[^0-9]/g, "");
			let cliCod = $('#cliCodigo').val();
			let cliLoja = $('#cliLoja').val();
			
			let filterFields = '';
			//Tipo de filtro passado pelo usuário Administrativo GTS, campo de CPF/CNPJ ou Código e Loja
			if(tipoBusca == 'cpfCnpj'){
				//Se estiver preenchido o campos Inscrição Estadual, manda CPF/CNPJ e inscrição estadual
				filterFields = (cliInscricaoEstadual != "") ? "CLICGC,"+cliCpfCnpj+',CLIINSCR,'+cliInscricaoEstadual : "CLICGC,"+cliCpfCnpj;
				
			}else if(tipoBusca == 'codLoja'){
				filterFields = "CLICOD,"+cliCod+',CLILOJA,'+cliLoja;
			}
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
	    		type: "GET",
	    		dataType: "json",
	    		async: true,
	    		url: "/api/public/ecm/dataset/search?datasetId=dsPedMaqConsultaCliente&filterFields="+filterFields,
	    		data: "",
	    	    success: function (data, status, xhr) {
	    	    	
	    	    	if (data != null && data.content != null && data.content.length > 0) {
	    	    		const records = data.content;
	    	    		if( records[0].CODRET == "1"){
	    		            let record = records[0];
	    					let CLICOD = record.CLICOD;
	    					let CLILOJA = record.CLILOJA;
	    					let CLINOME = record.CLINOME;
	    					let CLICGC = record.CLICGC;
	    					let CLIINSCR = record.CLIINSCR;
	    					let CLIDESCONTO = record.CLIDESCONTO;
	    					let CLICEP = record.CLICEP;
	    					let CLIENDE = record.CLIENDE;
	    					let CLIBAIRRO = record.CLIBAIRRO;
	    					let CLICOMPL = record.CLICOMPL;
	    					let CLIEST = record.CLIEST;
	    					let CLIMUN = record.CLIMUN;
	    					let CLIEMAIL = record.CLIEMAIL;
	    					let CLIDDDTELEFONE = record.CLIDDDTELEFONE;
	    					let CLITELEFONE = record.CLITELEFONE;
	    					let CLIVEND1 = record.CLIVEND1;
	    					let CLIVEND2 = record.CLIVEND2;
	    					let CLIVEND2CGC = record.CLIVEND2CGC; //CNPJ da Revenda
	    					let CLIVEND2NOM = record.CLIVEND2NOM; //Nome da Revenda
	    					let CLIVEND2MAT = record.CLIVEND2MAT; //Mat. Fluig da Revenda
	    					let CLIVEND3 = record.CLIVEND3;
	    					let CLIVEND4 = record.CLIVEND4;
	    					let CLIVEND5 = record.CLIVEND5;
	    					let CLIVEND6 = record.CLIVEND6;
	    					let CLIVEND7 = record.CLIVEND7;
	    					let CLIVEND8 = record.CLIVEND8;
	    					let CLIVEND9 = record.CLIVEND9;
	    					let CLIVEND10 = record.CLIVEND10;
	    					
	    					if(tipoBusca == 'cpfCnpj'){
	    						$("#cliCodigo").val(CLICOD);
	    			    		$("#cliLoja").val(CLILOJA);
	    					}else if(tipoBusca == 'codLoja'){
	    						$("#cliCpfCnpj").val(formataCPFCNPJ(CLICGC));
	    					}
	    					$("#cliNome").val(CLINOME);
    			    		$("#cliInscricaoEstadual").val(CLIINSCR);
    			    		$("#cliCEP").val(CLICEP);
    			    		validafunctions.setCep("cliCEP");
    			    		$('#cliUFHidden').val(CLIEST);
    			    		$('#cliUF').val(CLIEST);
    			    		$("#cliCidade").val(CLIMUN);
    			    		$("#cliEndereco").val(CLIENDE);
    			    		$("#cliBairro").val(CLIBAIRRO);
    			    		$("#cliComplemento").val(CLICOMPL);
    			    		$("#cliEmail").val(CLIEMAIL);
    			    		$("#cliDDDTelefone").val(CLIDDDTELEFONE);
    			    		$("#cliTelefone").val(CLITELEFONE);
    			    		
    			    		$('#vendedor1').val(CLIVEND1);
    						$('#vendedor2').val(CLIVEND2);
    						$('#vendedor3').val(CLIVEND3);
    						$('#vendedor4').val(CLIVEND4);
    						$('#vendedor5').val(CLIVEND5);
    						$('#vendedor6').val(CLIVEND6);
    						$('#vendedor7').val(CLIVEND7);
    						$('#vendedor8').val(CLIVEND8);
    						$('#vendedor9').val(CLIVEND9);
    						$('#vendedor10').val(CLIVEND10);
    			    		
//    						if($('#pedClienteRevenda').val() == 'Revenda' ){
//    							//Se estiver definido como 'Revenda', é preenchido os campos de 'Dados da Revenda', conforme retorno
//    							$("#revCpfCnpj").val(formataCPFCNPJ(CLIVEND2CGC));
//    			    			$("#revA3COD").val(CLIVEND2);
//    			    			$("#revNome").val(CLIVEND2NOM);
//    			    			$('#revNome').prop('readonly', true);
//    			    			$("#revMatFluig").val(CLIVEND2MAT);
//    			    			
//        			    		if( CLIVEND2MAT.trim() != "" ){
//        			    			let nomeRevendaFluig = getNome(CLIVEND2MAT);
//        			    			$("#revNomeFluig").val(nomeRevendaFluig);
//        			    		}else if( CLIVEND2MAT != "" && CLIVEND2CGC.trim() != ""){
//				
//    			    				FLUIGC.toast({ title: '', message: 'A matrícula da revenda não foi localizada, comunicar o Administrador do Sistema!', type: 'danger' });
//			    				}
//    			    		}
    			    		
    			    		funcoes.mascaraTelefone();
    			    		funcoes.somenteLeituraCamposCliente(true);
    			    		
    			    		if(tipoBusca == 'cpfCnpj'){
    			    			setTimeout(function(){ 
    	    			    		FLUIGC.message.alert({
    	    			    		    message: 'Confira a Inscrição Estadual do Cliente.',
    	    			    		    title: 'Atenção',
    	    			    		    label: 'ok'
    	    			    		}, function(el, ev) {
    	    			    		});
        			    		}, 750);
    			    		}
    			    		
    			    		if( CLIVEND1.trim() != $('#repA3COD').val().trim() ){
    			    			if(isMobile == 'true'){
    								alert("O Representante definido no formulário não está vinculado como 'Representante do Cliente'!");
    							}else{
    								FLUIGC.toast({title: 'Atenção!', message: "O Representante definido no formulário não está vinculado como 'Representante do Cliente'!", type: 'danger' });
    							}
    			    		}
    			    		if( $('#solTipoSolicitante').val() != 'RepresentanteExportacao'){
	    			    		if( CLIVEND5.trim() != $('#repGesTerA3COD').val().trim() ){
	    			    			if(isMobile == 'true'){
	    								alert("O Gestor Territorial definido no formulário não está vinculado como 'Gestor Territorial do Cliente'!");
	    							}else{
	    								FLUIGC.toast({title: 'Atenção!', message: "O Gestor Territorial definido no formulário não está vinculado como 'Gestor Territorial do Cliente'!", type: 'danger' });
	    							}
	    			    		}
    			    		}
//    			    		if( CLIVEND2.trim() != $('#revA3COD').val().trim() ){
//    			    			FLUIGC.toast({ title: 'Atenção!', message: 'A Revenda definida no formulário não está vinculada como "Revenda do Cliente"!', type: 'danger' });
//    			    		}
    			    		
	    	    		}else if (records[0].CODRET == "2"){
	    	    			if(isMobile == 'true'){
	    	    				alert(records[0].MSGRET);
	    	    			}else{
	    	    				FLUIGC.toast({ message: records[0].MSGRET, type: 'warning' });
	    	    			}
	    	    			
		    	    		
		    	    		$('#vendedor1').val('');
    						$('#vendedor2').val('');
    						$('#vendedor3').val('');
    						$('#vendedor4').val('');
    						$('#vendedor5').val('');
    						$('#vendedor6').val('');
    						$('#vendedor7').val('');
    						$('#vendedor8').val('');
    						$('#vendedor9').val('');
    						$('#vendedor10').val('');
//    						if($('#pedClienteRevenda').val() == 'Revenda' ){
//    							$("#revCpfCnpj").val('');
//    			    			$("#revA3COD").val('');
//    			    			$("#revNome").val('');
//    			    			$("#revMatFluig").val('');
//    			    			$("#revNomeFluig").val('');
//    			    		}
		    	    		$('#cliCodigo').val('');
		    				$('#cliLoja').val('');
		    	    		funcoes.somenteLeituraCamposCliente(false);
		    	    	}
	    	    		
	    	    		
	    	    	}else{
	    	    		if(isMobile == 'true'){
    	    				alert('O código do cliente informado não existe na base de dados!');
    	    			}else{
    	    				FLUIGC.toast({ message: 'O código do cliente informado não existe na base de dados!', type: 'warning' });
    	    			}
	    	    		//Libera os campos para preencher manualmente os dados do cliente
	    	    		funcoes.somenteLeituraCamposCliente(false);
	    	    		
	    	    	}
	    	    	setTimeout(function(){ 
	    	    		loading.hide();
	    	    	}, 1000);
	    	    },
				error: function(XMLHttpRequest, textStatus, errorThrown) {
	    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
	    	    	FLUIGC.toast({
			    		title: '',
			    		message: 'Erro na consulta do cliente, comunicar Administrador do Sistema!' ,
			    		type: 'danger'
			    	});
	    	    	loading.hide();
				}
			});
			
			
		},
		
		/*
		 * Dados Pedido
		 */
		limpaCamposMaquinaReservada : function(){
			
			$('#pedMaqResWKUserReserva').val('');
			$('#pedMaqResDataReserva').val('');
			$('#pedMaqResWKUserCancelReserva').val('');
			$('#pedMaqResDataCancelReserva').val('');
			$('#pedMaqResDesc').val('');
			$('#pedMaqResModelo').val('');
			$('#pedMaqResEstoque').val('');
			$('#pedMaqResPrazoEnt').val('');
			$('#pedMaqResNumPedidoTotvs').val('');
			
		},
		
		/*
		 * Itens Pedido
		 */
		/**
		 * Função que reseta as linhas dos campos dos itens
		 *
		 * @param {*} indexItem (linha que está sendo limpo os campos)
		 */
		limpaCamposItem : function(indexItem){
	    	
			$("#itPedFilialItem___"+indexItem).val('');
			$("#itPedDescricaoItemItem___"+indexItem).val('');
    		$("#itPedPrecoTabelaItem___"+indexItem).val('');
    		$("#itPedPrecoListaItem___"+indexItem).val('');
    		$("#itPedPrecoUnitItem___"+indexItem).val('');
    		$("#itPedNCMItem___"+indexItem).val('');
    		$("#itPedFinameItem___"+indexItem).val('');
    		$("#itPedPorcDescontoCompletaItem___" + indexItem ).val('0');
    		$("#itPedPorcDescontoItem___" + indexItem ).val('0');
	    	validafunctions.setPercentual("itPedPorcDescontoItem___"+indexItem, 2, false);
    		$("#itPedIPIValorItem___"+indexItem).val('0,00');
    		$("#itPedIPIAliqItem___"+indexItem).val('0');
    		validafunctions.setPercentual("itPedIPIAliqItem___"+indexItem, 2, false);
    		$("#itPedTotalCustoSemImpItem___"+indexItem).val('0,00');
    		$("#itPedTotalCustoComImpItem___"+indexItem).val('0,00');
			
    		
		},
		
		/**
		 * Função que consulta o dataset de Produto e alimenta na lista de itens os dados do produto
		 *
		 * Se ao chamado este método, não existir na linha o código do produto é retornado o método e nao realizado nenhum cálculo.
		 * 
		 * É enviado o valor de preço unitário para o WS que retorna a % de desconto, para ser aplicada na tela.
		 * 
		 * @param {*} indexItem (linha que está consultando os campos)
		 */
		consultaProduto : function(indexItem, gatilho){
			
			
			let tabPreco = ( $("#tabPreco").val() == '' ? 'PADRAO' : $("#tabPreco").val());
			let codProduto = $("#itPedCodItemItem___"+indexItem).val();
//			let precoUnitItem = ( $("#itPedPrecoUnitItem___"+indexItem).val() != '' ) ? validafunctions.getFloatValue("itPedPrecoUnitItem___"+indexItem) : '0';
			let precoUnitItem = '0';
			if(gatilho == 'PrecoUnit'){
				precoUnitItem = ( $("#itPedPrecoUnitItem___"+indexItem).val() != '' ) ? validafunctions.getFloatValue("itPedPrecoUnitItem___"+indexItem) : '0';
			}
			
			if( codProduto.trim() == "" ){
				return;
			}
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
	    		type: "GET",
	    		dataType: "json",
	    		async: true,
	    		url: "/api/public/ecm/dataset/search?datasetId=dsPedMaqConsultaProduto&filterFields=PROCOD,"+codProduto+",PROPRCUNIT,"+precoUnitItem+",TABPRECO,"+tabPreco,
	    		data: "",
	    	    success: function (data, status, xhr) {
	    	    	
	    	    	if (data != null && data.content != null && data.content.length > 0) {
	    	    		const records = data.content;
	    	    		if( records[0].CODRET == "1"){
	    		            var record = records[0];
	    					var FilialItem = record.PRDFIL;
	    					var CodigoItem = record.PROCOD;
	    					var DescricaoItem = record.PRODESC;
	    					
	    					var PrecoTabela2 = record.PROPRCTAB2;
	    					var PrecoTabela6 = record.PROPRCTAB6;
	    					var PrecoUnit = record.PROPRCUNIT;
	    					var PercDescCompleta = record.PROPERCDESC;
	    					var PercDesc2 = record.PROPERCDESC;
	    					PercDesc2 = round(PercDesc2, 2);
	    					
	    					var NCM = record.PRONCM;
	    					var Finame = record.PROFINAME;
	    					var IPIValor = record.PROIPIVAL;
	    					var IPIAliq = record.PROIPIALIQ;
	    					var TotalCusto = record.PROVLTOTLIQ;
	    					var TotalCustoComImp = record.PROVALTOT;
	    					
	    					
    			    		$("#itPedFilialItem___"+indexItem).val(FilialItem);
    			    		$("#itPedCodItemItem___"+indexItem).val(CodigoItem);
    			    		$("#itPedDescricaoItemItem___"+indexItem).val(DescricaoItem);
    			    		
    			    		$("#itPedPrecoListaItem___"+indexItem).val(PrecoTabela2);
    			    		$("#itPedPrecoTabelaItem___"+indexItem).val(PrecoTabela6);
        			    	$("#itPedPorcDescontoCompletaItem___"+indexItem).val(PercDescCompleta);
    			    		$("#itPedPorcDescontoItem___"+indexItem).val(PercDesc2.toFixed(2));
    			    		validafunctions.setPercentual("itPedPorcDescontoItem___"+indexItem, 2, false);
	    					
    			    		$("#itPedPrecoUnitItem___"+indexItem).val(PrecoUnit);
    			    		
    			    		$("#itPedNCMItem___"+indexItem).val(NCM);
    			    		$("#itPedFinameItem___"+indexItem).val(Finame);
    			    		$("#itPedIPIValorItem___"+indexItem).val(IPIValor);
    			    		$("#itPedIPIAliqItem___"+indexItem).val(IPIAliq);
    			    		validafunctions.setPercentual("itPedIPIAliqItem___"+indexItem, 2, false);
    			    		$("#itPedTotalCustoComImpItem___"+indexItem).val(TotalCustoComImp);
    			    		
    			    		
    			    		funcoes.somaFrete(indexItem);
    			    		funcoes.calculaTotalCusto();
	    	    		}else if (records[0].CODRET == "2"){
	    	    			if(isMobile == 'true'){
	    						alert(records[0].MSGRET);
	    	    			}else{
	    	    				FLUIGC.toast({ message: records[0].MSGRET, type: 'warning' });
	    	    			}
		    	    		funcoes.limpaCamposItem(indexItem);
		    	    		
		    	    	}
	    	    	}else{
	    	    		FLUIGC.toast({ title: '', message: 'Erro ao consultar o item, comunicar o Administrador do Sistema!', type: 'danger' });
	    	    		funcoes.limpaCamposItem(indexItem);
	    	    	}
	    	    	setTimeout(function(){ 
	    	    		loading.hide();
	    	    	}, 1000);
	    	    },
				error: function(XMLHttpRequest, textStatus, errorThrown) {
	    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
	    	    	FLUIGC.toast({
			    		title: '',
			    		message: 'Erro na consulta do Item, comunicar Administrador do Sistema' ,
			    		type: 'danger'
			    	});
	    	    	funcoes.limpaCamposItem(indexItem)
	    	    	loading.hide();
				}
			});
			
		},
		
		somaFrete : function(indexItem){
			
			let itPedPrecoUnitItem = validafunctions.getFloatValue("itPedPrecoUnitItem___"+indexItem);
			let itPedValorFreteItem = validafunctions.getFloatValue("itPedValorFreteItem___"+indexItem);
			let itPedTotalCustoSemImpItem = 0;
			
			itPedTotalCustoSemImpItem = itPedPrecoUnitItem + itPedValorFreteItem;
			
			$('#itPedTotalCustoSemImpItem___'+indexItem).val(itPedTotalCustoSemImpItem.toFixed(2));
			validafunctions.setMoeda("itPedTotalCustoSemImpItem___"+indexItem, 2, false , '');

		},
		
		/**
		 * Função que cria uma linha nova na tabela de itens 
		 */
		addLinhaItemPedido : function(){
			
	    	var row = wdkAddChild('tbItensPedido');
	    	
	    	$("#itPedQtdItem___" + row ).val('1');
	    	
	    	$("#itPedValorFreteItem___" + row).val('0');
			validafunctions.setMoeda("itPedValorFreteItem___"+row, 2, false , '');
	    	$("#itPedPorcDescontoCompletaItem___" + row ).val('0');
	    	$("#itPedPorcDescontoItem___" + row ).val('0');
	    	validafunctions.setPercentual("itPedPorcDescontoItem___"+row, 2, false);
    		$("#itPedIPIValorItem___"+row).val('0,00');
    		$("#itPedIPIAliqItem___"+row).val('0');
    		validafunctions.setPercentual("itPedIPIAliqItem___"+row, 2, false);
    		$("#itPedTotalCustoSemImpItem___"+row).val('0,00');
    		$("#itPedTotalCustoComImpItem___"+row).val('0,00');
		},
		

		/**
		 * Função que soma os totais de IPI, Total
		 * 
		 * Se a flag flSomaTotaisImpostos, vier como true, quer dizer que quer somar todo o pedido, não somente o total sem imposto
		 * 
		 * No fim, chama a função calculaTotalDolar 
		 */
		calculaTotalCusto : function(){
			
			let totalCustoItensSemImposto = 0;
			let totalCustoItensComImposto = 0;
			let totalIPIItens = 0;
			let itPedValorFreteItem = 0;
			let pecaPossuiPeca = $("input:radio[name='pecaPossuiPeca']:checked").val();
			
			const index = "1";
			
			let valTotalCustoSemImpItem = validafunctions.getFloatValue("itPedTotalCustoSemImpItem___"+index);
			if (!isNaN(valTotalCustoSemImpItem) ) {
				totalCustoItensSemImposto +=  valTotalCustoSemImpItem;
			}
			
			
			let valIPI = validafunctions.getFloatValue("itPedIPIValorItem___"+index);
			let valTotalCustoComImpItem = validafunctions.getFloatValue("itPedTotalCustoComImpItem___"+index);
			itPedValorFreteItem = validafunctions.getFloatValue("itPedValorFreteItem___"+index);
			
			if (!isNaN(valTotalCustoComImpItem) ) {
				totalCustoItensComImposto +=  valTotalCustoComImpItem + itPedValorFreteItem;
			}
			
			if(!isNaN(valIPI)){
				totalIPIItens += (valIPI)
			}
			
			//Se for marcado como Possui Peça SIM, soma o valor da peça para ter o valor total
			if(pecaPossuiPeca == "pecaPossuiPecaSim"){
				let pecaValor = validafunctions.getFloatValue("pecaValor");
				
				if(!isNaN(pecaValor)){
					totalCustoItensSemImposto +=  pecaValor;
					totalCustoItensComImposto +=  pecaValor;
				}
				
				$("#pedTotalPeca").text( $('#pecaValor').val() );
			}else{
				$("#pedTotalPeca").text('0,00');
			}
			
			//Vai ter sempre somente 1 item
			$("#pedTotalMaquina").text( $('#itPedPrecoUnitItem___'+index).val()  );
			$("#pedTotalFrete").text( $('#itPedValorFreteItem___'+index).val()  );
			
			
			$("#pedTotalPedidoSemImposto").val(totalCustoItensSemImposto.toFixed(2));
			validafunctions.setMoeda("pedTotalPedidoSemImposto", 2, false , '');
			
			$("#pedTotalPedido").val(totalCustoItensComImposto.toFixed(2));
			validafunctions.setMoeda("pedTotalPedido", 2, false , '');
			
			$("#pedTotalIPI").val(totalIPIItens.toFixed(2));
			validafunctions.setMoeda("pedTotalIPI", 2, false , '');
			
			
		},
		
		
	}
})();


var eventsFuncoes = (function() {
	return {
		setup : function() {	
			
			/*
			 * Define pedido
			 */
			$(document).on("change", "input:radio[name='defineGeracaoPedidoInicio']", function() {
				let defineGeracaoPedidoInicio = $("input:radio[name='defineGeracaoPedidoInicio']:checked").val();
				if(defineGeracaoPedidoInicio == "Cancelar"){
					$('#divMotivoCancelamentoGeracaoPedido').show();
				}else{
					$('#motCancelamentoGeracaoPedido').val('');
					$('#divMotivoCancelamentoGeracaoPedido').hide();
				}
			});
			
			
			/*
			 * Dados Solicitante
			 */
			/**
			 * Gatilho para quando for tipo final Revenda, mostrar a section de Revenda para preencher
			 */
			$(document).on("change", "#pedClienteRevenda", function() {
				
				//Sempre limpa o campo de 'Dados Revenda' quando troca Consumidor Final/Revendedor
//				$('#revCpfCnpj').val('');
//				$('#revA3COD').val('');
//				$('#revA1COD').val('');
//				$('#revA1LOJA').val('');
//				$('#revNome').val('');
//				$('#revFator').val('');
//				$('#revMatFluig').val('');
//				$('#revNomeFluig').val('');
				
				funcoes.trataCampoConsumidorFinalOURevendedor();
				
//				if( $('#cliCodigo').val() != "" ){
					//Se definiu como Revendedor e tiver o cliCodigo preenchido, limpa os campos do cliente
					//É limpo, porque ao pesquisar o cliente novamente, é preenchido os 'Dados da Revenda' quando for definido como Revendedor
//					funcoes.limpaCamposCliente();
					
//				}
			});
			
			/*
			 * Dados Revenda
			 */
			/**
			 * Transforma a mascara da revenda em CPF ou CNPJ
			 */
			$(document).on("keypress", "#revCpfCnpj", function() {
				if($(this).val().length <= 14){
					$("#revCpfCnpj").mask("000.000.000-000");
				}else{
					$("#revCpfCnpj").mask("00.000.000/0000-00");
				}
			});
			
			/**
			 * Gatilho que busca os dados da revenda
			 */
			$(document).on("change", "#revCpfCnpj", function() {
				
				if($(this).val().length == 0){
					funcoes.limpaCamposRevenda();
				}else if($(this).val().length == 14 || $(this).val().length == 18){
					funcoes.consultaRevenda( $(this).val() );
				}else{
					if(isMobile == 'true'){
						alert('O CPF/CNPJ está preenchido incorretamente!');
					}else{
						FLUIGC.toast({ title: '', message: 'O CPF/CNPJ está preenchido incorretamente!', type: 'warning' });
					}
				}
				
			});
			
			
			/*
			 * Dados Cliente
			 */
			/**
			 * Gatilho de Cod Cliente e Loja Cliente
			 * 
			 * Quando for colocar um cod. cliente ou loja cliente, vai consultar e sobreescrever os dados
			 */
			$(document).on("change", "#cliCodigo", function() {
							
				if($("#cliCodigo").val().trim().length == 9 && $("#cliLoja").val().trim().length == 4){
					funcoes.consultaCliente('codLoja');
				}else if( $("#cliCodigo").val().trim().length <= 9 && $("#cliLoja").val().trim().length != 0 ){
					if(isMobile == 'true'){
						alert('O código está preenchido incorretamente!');
					}else{
						FLUIGC.toast({ message: 'O código está preenchido incorretamente!', type: 'warning' });
					}
				}
			});
			
			$(document).on("change", "#cliLoja", function() {
				if($("#cliCodigo").val().trim().length == 9 && $("#cliLoja").val().trim().length == 4){
					funcoes.consultaCliente('codLoja');
				}else if( $("#cliCodigo").val().trim().length != 0 && $("#cliLoja").val().trim().length < 4 ){
					if(isMobile == 'true'){
						alert('A loja está preenchido incorretamente!');
					}else{
						FLUIGC.toast({ message: 'A loja está preenchido incorretamente!', type: 'warning' });
					}
				}
			});
			
			/**
			 * Transforma a mascara do cliente em CPF ou CNPJ
			 */
			$(document).on("keypress change", "#cliCpfCnpj", function() {
				
				if($(this).val().length <= 6){
					$("#cliCpfCnpj").unmask();
				}else if($(this).val().length > 6 && $(this).val().length <= 14){
					$("#cliCpfCnpj").mask("000.000.000-000");
				}else{
					$("#cliCpfCnpj").mask("00.000.000/0000-00");
				}
				
			});
			
			/**
			 * Gatilho de CPF/CNPJ do cliente
			 * 
			 * Se for alterado um cliente é preciso recalcular os valores dos produtos
			 * Então, se for limpo o campo, vai fazer a busca pelo cliente padrão, sem passar o código e loja
			 * Se encontrar o cliente, dentro método de consultaCliente, ao final da requisição é realizada o calculo de produto.
			 */
			$(document).on("change", "#cliCpfCnpj", function() {
				if($("#cliCpfCnpj").val().trim().length == 0){
					
					funcoes.limpaCamposCliente();
					funcoes.somenteLeituraCamposCliente(true);
					
				}else if($("#cliCpfCnpj").val().trim().length == 6 || $("#cliCpfCnpj").val().trim().length == 14 || $("#cliCpfCnpj").val().trim().length == 18){
					funcoes.consultaCliente('cpfCnpj');
					
				}else{
					if(isMobile == 'true'){
						alert('O CPF/CNPJ/Código Exterior está preenchido incorretamente!');
					}else{
						FLUIGC.toast({ message: 'O CPF/CNPJ/Código Exterior está preenchido incorretamente!', type: 'warning' });
					}
				}
				
			});
			
			if(isMobile == 'true'){
				$(document).on("blur", "#cliCpfCnpj", function() {
					
					if($("#cliCpfCnpj").val().trim().length == 0){
						
						funcoes.limpaCamposCliente();
						funcoes.somenteLeituraCamposCliente(true);
						
					
					}else if($("#cliCpfCnpj").val().trim().length == 6 || $("#cliCpfCnpj").val().trim().length == 14 || $("#cliCpfCnpj").val().trim().length == 18){
						
						funcoes.consultaCliente('cpfCnpj');
						
					}else{
						if(isMobile == 'true'){
							alert('O CPF/CNPJ/Código Exterior está preenchido incorretamente!');
						}else{
							FLUIGC.toast({ message: 'O CPF/CNPJ/Código Exterior está preenchido incorretamente!', type: 'warning' });
						}
					}
					
				});
			}
			
			
			/**
			 * Ao alterar a Inscrição Estadual, é realizada a busca do cliente, 
			 *	já que pode ter um mesmo cliente com o mesmo CPF/CNPJ, e o que diferencia é a Inscrição Estadual
			 * 
			 * Feito a alteração da inscrição estadual, é chamado o método consultaCliente
			 */
			$(document).on("change", "#cliInscricaoEstadual", function() {
				
				let cliCpfCnpj = $('#cliCpfCnpj').val();
				
				if(cliCpfCnpj != ''){
					funcoes.consultaCliente('cpfCnpj');
				}
			});
			
			if(isMobile == 'true'){
				$(document).on("blur", "#cliInscricaoEstadual", function() {
					
					let cliCpfCnpj = $('#cliCpfCnpj').val();
					
					if(cliCpfCnpj != ''){
						funcoes.consultaCliente('cpfCnpj');
					}
				});
			}
			
			
			/**
			 * Quando não existe o cliente na base de dados, habilita os campos para preencher.
			 * Se preenche o campo de CEP faz uma busca no site viaCEP
			 */
			$(document).on("change", "#cliCEP", function() {
				
				var cep = $('#cliCEP').val().replace('.','').replace('-','');
				
				if(cep != "" && cep.length == 8){
					var loading = FLUIGC.loading(window);
					loading.show();
					$.ajax({
			    		type: "GET",
			    		dataType: "json",
			    		async: true,
			    		url: "//viacep.com.br/ws/"+cep+"/json",
			    	    success: function (data, status, xhr) {
			    	    	
			    	    	if (!data.erro) {
		    					var ufCliente = data.uf;
		    					var cidadeCliente = data.localidade;
		    					var enderecoCliente = data.logradouro;
		    					var bairroCliente = data.bairro;
		    					
		    					$('#cliUF').val(ufCliente);
		    					$('#cliUFHidden').val(ufCliente);
		    					$('#cliCidade').val(cidadeCliente);
		    					$('#cliEndereco').val(enderecoCliente);
		    					$('#cliBairro').val(bairroCliente);
			    					
			    	    	}else{
			    	    		if(isMobile == 'true'){
									alert('O CEP não existe na base de dados');
								}else{
									FLUIGC.toast({ message: 'O CEP não existe na base de dados', type: 'warning' });
								}
			    	    		$('#cliUF').val('');
			    	    		$('#cliUFHidden').val('');
		    					$('#cliCidade').val('');
		    					$('#cliEndereco').val('');
		    					$('#cliBairro').val('');
			    	    	}
			    	    	
			    	    	loading.hide();
			    	    },
						error: function(XMLHttpRequest, textStatus, errorThrown) {
			    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
			    	    	FLUIGC.toast({
					    		message: 'Erro ao consultar CEP, servidor indisponível!' ,
					    		type: 'danger'
					    	});
			    	    	
			    	    	$('#cliUF').val('');
			    	    	$('#cliUFHidden').val('');
	    					$('#cliCidade').val('');
	    					$('#cliEndereco').val('');
	    					$('#cliBairro').val('');
			    	    	loading.hide();
						}
					});
					
				}else{
					$('#cliUF').val('');
	    	    	$('#cliUFHidden').val('');
					$('#cliCidade').val('');
					$('#cliEndereco').val('');
					$('#cliBairro').val('');
				}
				
			});
			
			
			/**
			 * Gatilho para quando alterado o estado(UF) do cliente, armazena no campo hidden de estado o valor da UF
			 * É feito isso, porque em alguns momentos é preciso colocar como disable o campo de estado, e o Fluig não salva os valores no banco quando o campo é disable.
			 * Quando roda o displayFiels é alimentado o campo cliUF puxando do hidden cliUFHidden
			 */
			$(document).on("change", "#cliUF", function() {
				var cliUF = $('#cliUF').val();
				$("#cliUFHidden").val($('#cliUF').val());
				
			});
			
			
			$(document).on("keypress", "#cliTelefone", function() {
				funcoes.mascaraTelefone();
			});
			$(document).on("blur", "#cliTelefone", function() {
				funcoes.mascaraTelefone();
			});
			/*
			 * Dados Pedido
			 */
			/**
			 * Gatilho para quando alterado o tipo do frete
			 * Vai liberar o campo para preencher o valor do frete se for CIF
			 * No fim, faz o recalculo do Total de Custo
			 * Precisa recalcular todos os produtos, porque o valor do frete faz parte da base de calculo dos impostos.
			 */
			$(document).on("change", "#pedFrete", function() {
				var pedFrete = $('#pedFrete').val();
				
				if(pedFrete == "CIF"){
//					$("#pedValorFrete").prop('readonly', false);
//					$("#pedValorFrete").val('0,00');
					$(".inputItPedValorFreteItem").prop('readonly', false);
					$(".inputItPedValorFreteItem").val('0,00');
				}else{
//					$("#pedValorFrete").prop('readonly', true);
//					$("#pedValorFrete").val('0,00');
					$(".inputItPedValorFreteItem").prop('readonly', true);
					$(".inputItPedValorFreteItem").val('0,00');
				}
				
				
				$("input[name*=itPedQtdItem___]").each(function(index){
					var index = validafunctions.getPosicaoFilho($(this).attr("id"));
					
					funcoes.somaFrete(index);
				});
				funcoes.calculaTotalCusto();
			});
			
			/*
			 * Itens Pedido
			 */
			/**
			 * Gatilho para quando realiza um keyUP o código do item
			 * Função para deixar em maíusculo o código do produto
			 */
			$(document).on("keyup", ".inputItPedCodItem", function() {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				
				$("#itPedCodItemItem___"+index).val( $("#itPedCodItemItem___"+index).val().toUpperCase()   );
				
			});
			
			/**
			 * Gatilho para quando altera o código do item
			 * Três possibilidades:
			 * 		-Quando fica em branco (limpa o campo), é preciso recalculado o valor final
			 * 		-Tem validação para verificar se o item já está inserido na tabela de itens
			 * 		-Por fim, consulta o produto via WS
			 * 
			 *  Na consulta do produto
			 *  É feito uma verificação se ao alterar existe mais de 1 item, for CIF e ter valor de frente
			 * 	 é feito a consultaProduto normal
			 */
			$(document).on("change", ".inputItPedCodItem", function() {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				
				
				if( $(this).val().trim() == ""){
					funcoes.limpaCamposItem(index);
					
					funcoes.calculaTotalCusto();
				}else{
					if( $(this).val().length >= 3 ){
						funcoes.consultaProduto(index, 'CodProduto');
					}else{
						if(isMobile == 'true'){
							alert("É preciso digitar no mínimo 3 caracteres do 'Código da Máquina'!");
						}else{
							FLUIGC.toast({ message: "É preciso digitar no mínimo 3 caracteres do 'Código da Máquina'!", type: 'warning' });
						}
					}
					
					
				}
				
			});
			
			/**
			 * Gatilho para quando altera o valor unitário do produto
			 * 		-Se foi inserido um valor acima do valor de tabela, vai enviar como 0 (e o WS vai entender como sem enviado com valor)
			 * 		-Por fim, é realizado o cálculo do produto
			 * 
			 */
			$(document).on("change", ".inputItPedPrecoUnitItem", function() {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				
				funcoes.consultaProduto(index, 'PrecoUnit');
				
			});
			
			$(document).on("blur", ".inputItPedPrecoUnitItem", function() {
				
				if(retornaSO() == 'mac/ios'){
					
					var index = validafunctions.getPosicaoFilho($(this).attr("id"));
					
					funcoes.consultaProduto(index, 'PrecoUnit');
					
				}
				
			});
			
			
			/**
			 * Gatilho para quando altera o valor do Frete
			 * Primeiro soma para ter o valor do frete no total do item do pedido
			 * Depois soma para ter o valor no total do pedido
			 */
			$(document).on("change", ".inputItPedValorFreteItem", function() {
				let index = validafunctions.getPosicaoFilho($(this).attr("id"));
				
				if( $("#itPedValorFreteItem___" + index).val().trim() == '' ){
					$("#itPedValorFreteItem___" + index).val('0,00');
				}
				funcoes.somaFrete(index);
				funcoes.calculaTotalCusto();
				
			});
			if(isMobile == 'true'){
				$(document).on("blur", ".inputItPedValorFreteItem", function() {
					var index = validafunctions.getPosicaoFilho($(this).attr("id"));
					
					if( $("#itPedValorFreteItem___" + index).val().trim() == '' ){
						$("#itPedValorFreteItem___" + index).val('0,00');
					}
					funcoes.somaFrete(index);
					funcoes.calculaTotalCusto();
					
				});
			}
			
			
			/*
			 * Peça
			 */
			/**
			 * Gatilho para quando altera o campo de Possui Peça
			 * Ao fim, é recalculado o valor total do pedido
			 */
			$(document).on("change", "input:radio[name='pecaPossuiPeca']", function() {
				
				let pecaPossuiPeca = $("input:radio[name='pecaPossuiPeca']:checked").val();
				if(pecaPossuiPeca == "pecaPossuiPecaSim"){
					$('#divPossuiPecaSim').show();
					$('#pecaValor').val('0,00');
				}else{
					$('#divPossuiPecaSim').hide();
					$('#pecaDescricao').val('');
					$('#pecaCodPagto').val('');
					$('#pecaValor').val('0,00');
				}
				
				funcoes.calculaTotalCusto();
				
			});
			
			/**
			 * Gatilho para quando altera o valor da Peça, para quando o pedido for selecionado como possui peça Sim
			 */
			$(document).on("change", "#pecaValor", function() {
				
				funcoes.calculaTotalCusto();
				
			});
			if(isMobile == 'true'){
				$(document).on("blur", "#pecaValor", function() {
					
					funcoes.calculaTotalCusto();
					
				});
			}
			
			
			/*
			 * Comunicação Interna
			 */
			$(document).on("click", "#addComunicacaoInterna", function() {
				
				let comIntComunicacaoInterna = $('#comIntComunicacaoInterna').val();
				
				if(comIntComunicacaoInterna != ""){
					let row = wdkAddChild('tbComunicacaoInterna');
					let wkUser = getWKUser();
					let nomeUser = getNome(wkUser);
					let dataHora = dataHoraAtual('dd/mm/yyyy hh:mm');
					
			    	$("#comIntOrdem___" + row ).val(row);
			    	$("#comIntWKUserUsuario___" + row ).val( wkUser );
		    		$("#comIntNomeUsuario___"+row).val( nomeUser );
		    		$("#comIntDataHoraInteracao___"+row).val(dataHora);
		    		$("#comIntObservacao___"+row).val(comIntComunicacaoInterna);
					
		    		$('#comIntComunicacaoInterna').val('');
		    		
		    		$('#divTbComInterna').show();
				}else{
					if(isMobile == 'true'){
						alert("Preencha o campo 'Descrição' para adicionar a comunicação!");
					}else{
						FLUIGC.toast({ message: "Preencha o campo 'Descrição' para adicionar a comunicação!", type: 'warning' });
					}
				}
				
				
			});
			
			
			/*
			 * Aprovação Gerente Territorial
			 */
			
			
			/*
			 * Imprimir
			 */
			$(document).on("click", "#imprimirOrcamento", function() {
				//função que está no arquivo js-imprimir
				/*
				 * Nesta função além do orçamento, está junto o contrato. 
				 */
				if( $('#solTipoSolicitante').val() == 'RepresentanteExportacao'){
					imprimeRelatorio('ImprimeOrcamentoExportacao');
				}else{
					imprimeRelatorio('ImprimeOrcamento');
				}
				
			});

			$(document).on("click", "#imprimirOrcamentoStrassTech", function() {
				//função que está no arquivo js-imprimir
				/*
				 * Nesta função além do orçamento, está junto o contrato. 
				 */
				if( $('#solTipoSolicitante').val() == 'RepresentanteExportacao'){
					imprimeRelatorioStrassTech('ImprimeOrcamentoExportacao');
				}else{
					imprimeRelatorioStrassTech('ImprimeOrcamento');
				}
				
			});
			

		}
	}
})();

function removeComunicacaoInterna(oElement){
	//Somente se estiver na Atividade 0 que pode deletar
	if(CURRENT_STATE == INICIO_0)
	{	
		try {
	        FLUIGC.message.confirm({
	            message: `Deseja remover o registro da tabela de Comunicação Interna?`,
	            title: 'Confirmação',
	            labelYes: 'Sim, quero remover',
	            labelNo: 'Não, quero cancelar',
	        }, function (result) {
	            if (result) {
	                fnWdkRemoveChild(oElement)
	            }
	        });
	    } catch (e) {
	        console.error("Houve um erro inesperado na função removeComunicacaoInterna")
	        console.error(e)
	    }
	}
}

function removeMaquinaReservada(oElement){
	//Somente se estiver na Atividade 0 que pode remover
	if(CURRENT_STATE == INICIO_0)
	{	
		try {
			let pedMaqResDesc = $('#pedMaqResDesc').val();
	        FLUIGC.message.confirm({
	            message: `Deseja remover a Máquina Reservada <b>${pedMaqResDesc}</b> do pedido?`,
	            title: 'Confirmação',
	            labelYes: 'Sim, quero remover',
	            labelNo: 'Não, quero cancelar',
	        }, function (result) {
	            if (result) {
	            	funcoes.limpaCamposMaquinaReservada();
	            	$('#divMaquinaReservadaRemove').hide();
	        		$('#divMaquinaReservadaDesc').addClass('col-md-offset-1');
	            }
	        });
	    } catch (e) {
	        console.error("Houve um erro inesperado na função removeMaquinaReservada")
	        console.error(e)
	    }
	}
}

function loadForm(){
	
	$('#cliDDDTelefone').mask('000');
	funcoes.mascaraTelefone();
	
	FLUIGC.popover('.bs-docs-popover-hover',{trigger: 'hover', placement: 'right', html: true, template: '<div class="popover" role="tooltip" style="max-width: 430px !important; width: 430px !important;" ><div class="arrow" ></div><div class="popover-content" style="max-width: 430px !important; width: 430px !important;"></div></div>'});
	
	window.parent.$("#breadcrumb").remove();
	window.parent.$('#wcm_widget').find("[data-back]").css("display","none");
	window.parent.$('#wcm_widget').find("[data-back]").removeAttr("data-back");
	window.parent.$('#wcm_widget').find("[data-cancel]").css("display","none");
	window.parent.$('#wcm_widget').find("[data-cancel]").removeAttr("data-cancel");
	window.parent.$('#wcm_widget').find("[data-cancel-workflow-request]").css("display","none");
	window.parent.$('#wcm_widget').find("[data-cancel-workflow-request]").removeAttr("data-cancel");
	
	funcoes.trataCampoConsumidorFinalOURevendedor();
	
	//Para alimentar totais que são do tipo <p>
	//o possuiPeca com _ na frente, significa um campo que esta no enableFields
	let pecaPossuiPeca = $("input:radio[name='pecaPossuiPeca']:checked").val();
	let _pecaPossuiPeca = $("input:radio[name='_pecaPossuiPeca']:checked").val();
	//Se for marcado como Possui Peça SIM, coloca o valor da peça, se não é 0
	if(pecaPossuiPeca == "pecaPossuiPecaSim" || _pecaPossuiPeca == "pecaPossuiPecaSim"){
		$("#pedTotalPeca").text( $('#pecaValor').val() );
	}else{
		$("#pedTotalPeca").text('0,00');
	}
	$("input[name*=itPedCodItemItem___]").each(function(index){
		var index = validafunctions.getPosicaoFilho($(this).attr("id"));
		//Vai ter sempre somente 1 item, não tem mais a opção de adicionar e remover.
		$("#pedTotalMaquina").text( $('#itPedPrecoUnitItem___'+index).val() );
		$("#pedTotalFrete").text( $('#itPedValorFreteItem___'+index).val() );
	});
	
	
	if(CURRENT_STATE == INICIO_0)
	{	
		funcoes.iniciaCampos();
		funcoes.somenteLeituraCamposCliente(true);
		
	}else if(CURRENT_STATE == INICIO){
		
		//Dados Clientes
		$('#cliCEP').mask('99.999-999');
		
		if($("#cliCodigo").val().trim() != "" || ($("#cliCodigo").val().trim() == "" && $("#cliCpfCnpj").val().trim() == "") ){
			funcoes.somenteLeituraCamposCliente(true);
		}
		
		if($("#pedFrete").val() == "CIF"){
			$('.inputItPedValorFreteItem').prop('readonly', false);
		}
		
		//Dados pedidos
		let dateAteDataPrevEmbarque = new Date();
		dateAteDataPrevEmbarque.setDate(dateAteDataPrevEmbarque.getDate() + 15);
		FLUIGC.calendar('#pedDataPrevEmbarque', {
			language : 'pt-br',
			minDate : dateAteDataPrevEmbarque,
			pickDate : true,
			pickTime : false
		});
		
		
	}else if(CURRENT_STATE == REP_VERIFICA_PED){
		
		//Dados Clientes
		$('#cliCEP').mask('99.999-999');
		
		if($("#cliCodigo").val().trim() != ""){
			funcoes.somenteLeituraCamposCliente(true);
		}
		
		if($("#pedFrete").val() == "CIF"){
			$('.inputItPedValorFreteItem').prop('readonly', false);
		}
		
		let solDataAbertura = $('#solDataAbertura').val();
		let solDataAberturaConv = "";
		if (solDataAbertura.indexOf('-') > -1) {
			let ano = solDataAbertura.substring(0, 4);
			let mes = solDataAbertura.substring(5, 7);
			let dia = solDataAbertura.substring(8, 10);
			solDataAberturaConv = mes + '/' + dia + '/' + ano;
		}

		if (solDataAbertura.indexOf('/') > -1) {
			let dia = solDataAbertura.substring(0, 2);
			let mes = solDataAbertura.substring(3, 5);
			let ano = solDataAbertura.substring(6, 10);
			solDataAberturaConv = mes + '/' + dia + '/' + ano;
		}
		
		let dateAteDataPrevEmbarque = new Date(solDataAberturaConv);
		dateAteDataPrevEmbarque.setDate(dateAteDataPrevEmbarque.getDate() + 15);
		
		FLUIGC.calendar('#pedDataPrevEmbarque', {
			language : 'pt-br',
			minDate : dateAteDataPrevEmbarque,
			pickDate : true,
			pickTime : false
		});
	
		
	}else if(CURRENT_STATE == REVISA_ORC){
		
		//Dados Clientes
		$('#cliCEP').mask('99.999-999');
		
		if($("#cliCodigo").val().trim() != ""){
			funcoes.somenteLeituraCamposCliente(true);
		}
		
		if($("#pedFrete").val() == "CIF"){
			$('.inputItPedValorFreteItem').prop('readonly', false);
		}
		
		let solDataAbertura = $('#solDataAbertura').val();
		let solDataAberturaConv = "";
		if (solDataAbertura.indexOf('-') > -1) {
			let ano = solDataAbertura.substring(0, 4);
			let mes = solDataAbertura.substring(5, 7);
			let dia = solDataAbertura.substring(8, 10);
			solDataAberturaConv = mes + '/' + dia + '/' + ano;
		}

		if (solDataAbertura.indexOf('/') > -1) {
			let dia = solDataAbertura.substring(0, 2);
			let mes = solDataAbertura.substring(3, 5);
			let ano = solDataAbertura.substring(6, 10);
			solDataAberturaConv = mes + '/' + dia + '/' + ano;
		}
		
		let dateAteDataPrevEmbarque = new Date(solDataAberturaConv);
		dateAteDataPrevEmbarque.setDate(dateAteDataPrevEmbarque.getDate() + 15);
		
		FLUIGC.calendar('#pedDataPrevEmbarque', {
			language : 'pt-br',
			minDate : dateAteDataPrevEmbarque,
			pickDate : true,
			pickTime : false
		});
		
	}else if(CURRENT_STATE == GTS_VALIDA_ORC){
		
		
		//Dados Revenda
		$('#revCpfCnpj').prop('readonly', true);
		$('#revFator').prop('readonly', true);
		
		//Dados Clientes
		$('#cliCpfCnpj').prop('readonly', true);
		$('#cliInscricaoEstadual').prop('readonly', true);
		funcoes.somenteLeituraCamposCliente(true);
		
		
	}else if(CURRENT_STATE == REV_VERIFICA_PED){
		
		//Dados Clientes
		$('#cliCEP').mask('99.999-999');
		
		if($("#cliCodigo").val().trim() != ""){
			funcoes.somenteLeituraCamposCliente(true);
		}
		
		if($("#pedFrete").val() == "CIF"){
			$('.inputItPedValorFreteItem').prop('readonly', false);
		}
		
		let solDataAbertura = $('#solDataAbertura').val();
		let solDataAberturaConv = "";
		if (solDataAbertura.indexOf('-') > -1) {
			let ano = solDataAbertura.substring(0, 4);
			let mes = solDataAbertura.substring(5, 7);
			let dia = solDataAbertura.substring(8, 10);
			solDataAberturaConv = mes + '/' + dia + '/' + ano;
		}

		if (solDataAbertura.indexOf('/') > -1) {
			let dia = solDataAbertura.substring(0, 2);
			let mes = solDataAbertura.substring(3, 5);
			let ano = solDataAbertura.substring(6, 10);
			solDataAberturaConv = mes + '/' + dia + '/' + ano;
		}
		
		let dateAteDataPrevEmbarque = new Date(solDataAberturaConv);
		dateAteDataPrevEmbarque.setDate(dateAteDataPrevEmbarque.getDate() + 15);
		
		FLUIGC.calendar('#pedDataPrevEmbarque', {
			language : 'pt-br',
			minDate : dateAteDataPrevEmbarque,
			pickDate : true,
			pickTime : false
		});
		
	}else if(CURRENT_STATE == REV_RET_ADM_GTS){
		
		//Dados Clientes
		$('#cliCEP').mask('99.999-999');
		
		if($("#cliCodigo").val().trim() != ""){
			funcoes.somenteLeituraCamposCliente(true);
		}
		
		if($("#pedFrete").val() == "CIF"){
			$('.inputItPedValorFreteItem').prop('readonly', false);
		}
		
		//Dados pedidos
		let dateAteDataPrevEmbarque = new Date();
		dateAteDataPrevEmbarque.setDate(dateAteDataPrevEmbarque.getDate());
		FLUIGC.calendar('#pedDataPrevEmbarque', {
			language : 'pt-br',
			minDate : dateAteDataPrevEmbarque,
			pickDate : true,
			pickTime : false
		});
		
		
	}else if(CURRENT_STATE == SOL_REV_PED){
		
		//Dados Clientes
		$('#cliCEP').mask('99.999-999');
		
		if($("#cliCodigo").val().trim() != ""){
			funcoes.somenteLeituraCamposCliente(true);
		}
		
		if($("#pedFrete").val() == "CIF"){
			$('.inputItPedValorFreteItem').prop('readonly', false);
		}
		
		//Dados pedidos
		let dateAteDataPrevEmbarque = new Date();
		dateAteDataPrevEmbarque.setDate(dateAteDataPrevEmbarque.getDate());
		FLUIGC.calendar('#pedDataPrevEmbarque', {
			language : 'pt-br',
			minDate : dateAteDataPrevEmbarque,
			pickDate : true,
			pickTime : false
		});
		
	}
		

}