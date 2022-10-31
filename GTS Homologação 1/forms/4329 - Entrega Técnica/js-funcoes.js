
$(document).ready(function() {
	setTimeout(function() {
		funcoes.start();
	}, 100)
	
	
});
//Aqui cria as funcioes
var funcoes = (function() {
	return {
		start : function() {
			eventsFuncoes.setup();
		},
		
		/*
		 * CADASTRO DO EQUIPAMENTO
		 */
		limpaCamposEquipamento : function(){
			$('#equipNumSerie').val('');
			$('#equipTipoNotaHidden').val('NV');
			$('#equipTipoNota').val('NV');
			$('#equipNumNotaFiscal').val('');
			$('#equipCodProduto').val('');
			$('#equipDescricao').val('');
			$('#equipModelo').val('');
			$('#equipAcoplamento').val('');
			$('#equipDataVenda').val('');
			$('#equipDataEntrega').val('');
			$('#equipDataTerminoGarantia').val('');

		},

		limpaCamposRevenda : function(){
			$('#revCpfCnpj').val('');
			$('#revRazaoSocialRevenda').val('');
			$('#revNomeFantasiaRevenda').val('');
			$('#revCodigo').val('');
			$('#revLoja').val('');
			$('#revCidade').val('');
			$('#revEstadoHidden').val('');
			$('#revEstado').val('');
			$('#revClassPeca').val('');
			$('#revClassServico').val('');
			$('#revEmail').val('');
			$('#revTelefone').val('');
			
		},
		
		/**
		 * Busca dados do Equipamento e da Revenda.
		 */
		consultaEquipamento : function(tipoUsuario){
			
			let A1_COD = $('#A1_COD').val().trim();
			let A1_LOJA = $('#A1_LOJA').val().trim();
			let equipNumSerie = $('#equipNumSerie').val().trim();
			let equipTipoNota = $('#equipTipoNota').val().trim();
			let equipNumNotaFiscal = $('#equipNumNotaFiscal').val().trim();
			
			if(equipTipoNota == 'ND' && equipNumNotaFiscal == '' ){
				FLUIGC.toast({ title: '', message: 'É obrigatório preencher o número da Nota Fiscal quando o Tipo da Nota for Nota de Demonstração.!', type: 'warning' });
				return;
			}
			
			//Se tiver preenchido a inscrição estadual, manda ela também para filtra
			let filterNumNotaFiscal= (equipNumNotaFiscal != "") ? ",equipNumNotaFiscal,"+equipNumNotaFiscal : "";
			
			if(tipoUsuario == 'Revenda'){
				filterFields = "TIPOUSUARIO,Revenda,A1_COD,"+A1_COD+",A1_LOJA,"+A1_LOJA +",equipNumSerie,"+equipNumSerie + ",equipTipoNota," + equipTipoNota + "" + filterNumNotaFiscal;
			}else if(tipoUsuario == 'Administrativo GTS'){
				//Tipo de filtro passado pelo usuário Administrativo GTS, necessáiro somente número de serie e se preciso o número da nota fiscal.
				filterFields = "TIPOUSUARIO,Administrativo GTS,equipNumSerie,"+ equipNumSerie + ",equipTipoNota," + equipTipoNota + "" + filterNumNotaFiscal;
			}
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
	    		type: "GET",
	    		dataType: "json",
	    		async: true,
	    		url: "/api/public/ecm/dataset/search?datasetId=dsEntTecConsultaEquipamento&filterFields="+filterFields,
	    	    success: function (data, status, xhr) {
	    	    	
	    	    	if (data != null && data.content != null && data.content.length > 0) {
	    	    		const records = data.content;
	    	    		
	    	    		if( records[0].CODRET == "1"){
	    		            var record = records[0];
	    					let equipNumNotaFiscal = record.EQPNOTA;
	    					let equipCodProduto = record.EQPCODPRD;
	    					let equipDescricao = record.EQPDESC;
	    					let equipDataVenda = record.EQPDTVENDA;
	    					
	    					$("#equipNumNotaFiscal").val(equipNumNotaFiscal);
	    					$("#equipCodProduto").val(equipCodProduto);
	    					$("#equipDescricao").val(equipDescricao);
	    					$("#equipDataVenda").val(equipDataVenda);
	    					
	    					if($('#tipoSolicitante').val() != 'Administrativo GTS'){
	    					
		    					let revCpfCnpj = record.REVCGC;
		    					let revRazaoSocialRevenda = record.RECRAZAOSOCIAL;
		    					let revNomeFantasiaRevenda = record.REVNOMEFANTASIA;
		    					let revCodigo = record.REVCOD;
		    					let revLoja = record.REVLOJA;
		    					let revCidade = record.REVCIDADE;
		    					let revEstado = record.REVESTADO;
		    					let revClassPeca = record.REVCLPECA;
		    					let revClassServico = record.REVCLSER;
		    					let revEmail =  record.REVEMAIL;
		    					let revTelefone =  record.REVTELEFONE;
		    					
		    					$("#revCpfCnpj").val(revCpfCnpj);
		    					$("#revRazaoSocialRevenda").val(revRazaoSocialRevenda);
		    					$("#revNomeFantasiaRevenda").val(revNomeFantasiaRevenda);
		    					$("#revCodigo").val(revCodigo);
		    					$("#revLoja").val(revLoja);
		    					$("#revCidade").val(revCidade);
		    					$("#revEstadoHidden").val(revEstado);
		    					$("#revEstado").val(revEstado);
		    					$("#revClassPeca").val(revClassPeca);
		    					$("#revClassServico").val(revClassServico);
		    					$("#revEmail").val(revEmail);
		    					$("#revTelefone").val(revTelefone);
		    					
		    					funcoes.mascaraTelefone('revTelefone');
	    					
	    					}
	    				}else if (records[0].CODRET == "2"){
		    	    		FLUIGC.toast({ title: '', message: records[0].MSGRET, type: 'warning' });
		    	    		
//		    	    		$('#equipTipoNotaHidden').val("ND");
//		    	    		$('#equipTipoNota').val("ND");
//		    	    		$('#equipNumNotaFiscal').prop('readonly', false);
		    				$('#equipNumNotaFiscal').val('');
		    				$('#equipCodProduto').val('');
		    				$('#equipDescricao').val('');
		    				$('#equipModelo').val('');
		    				$('#equipAcoplamento').val('');
		    	    		
		    	    		funcoes.limpaCamposRevenda();
		    	    	}
	    	    	}else{
	    	    		FLUIGC.toast({ title: '', message: 'Erro ao consultar o equipamento, comunicar o Administrador do Sistema!', type: 'danger' });
	    	    		
	    	    		funcoes.limpaCamposRevenda();
	    	    	}
	    	    	setTimeout(function(){ 
	    	    		loading.hide();
	    	    	}, 1000);
	    	    },
				error: function(XMLHttpRequest, textStatus, errorThrown) {
	    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
	    	    	FLUIGC.toast({
			    		title: '',
			    		message: 'Erro na consulta da equipamento, comunicar o Administrador do Sistema!' ,
			    		type: 'danger'
			    	});
	    	    	loading.hide();
				}
			});
			
		},
		
		/*
		 * CLIENTE
		 */		
		/**
		 * Função para resetar os dados do cliente
		 *
		 */
		limpaCamposCliente : function(){
			$('#cliCpfCnpj').val('');
			$('#cliNomeCliente').val('');
			$('#cliInscricaoEstadual').val('');
			$('#cliCodigo').val('');
			$('#cliLoja').val('');
			$('#cliCEP').val('');
			$('#cliEndereco').val('');
			$('#cliBairro').val('');
			$('#cliComplemento').val('');
			$('#cliCidade').val('');
			$('#cliEstadoHidden').val('');
			$('#cliEstado').val('');
			$('#cliTelefone').val('');
			$('#cliEmail').val('');
			
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
			$('#cliNomeCliente').prop('readonly', readonly);
//			$('#cliInscricaoEstadual').prop('readonly', readonly);
			$('#cliCEP').prop('readonly', readonly);
			$('#cliEndereco').prop('readonly', readonly);
			$('#cliBairro').prop('readonly', readonly);
			$('#cliComplemento').prop('readonly', readonly);
			$('#cliCidade').prop('readonly', readonly);
			$('#cliEstado').prop('disabled', readonly);
			$('#cliTelefone').prop('readonly', readonly);
			$('#cliEmail').prop('readonly', readonly);
		},
		
		/**
		 * Função que busca via dataset os dados do cliente para alimentar em tela
		 * É passado por parametro a busca via web service o CPF/CNPJ
		 * Se não encontrar os dados do cliente, libera os campos através da função somenteLeituraCamposCliente
		 * 
		 * 
		 */
		consultaCliente : function(tipoUsuario, tipoBusca){
			
			let A1_COD = $('#A1_COD').val().trim();
			let A1_LOJA = $('#A1_LOJA').val().trim();
			let cliCpfCnpj = $('#cliCpfCnpj').val().replace(/[^0-9]/g, "").trim();
			let cliInscricaoEstadual = $('#cliInscricaoEstadual').val().replace(/[^0-9]/g, "");
			let cliCodigo = $('#cliCodigo').val().trim();
			let cliLoja = $('#cliLoja').val().trim();
			let filterFields = '';
			
			//Se tiver preenchido a inscrição estadual, manda ela também para filtra
			let filterInscricaoEstadual= (cliInscricaoEstadual != "") ? ",CLIINSCR,"+cliInscricaoEstadual : "";
				
			if(tipoUsuario == 'Revenda'){
				
				filterFields = "TIPOUSUARIO,Revenda,TIPOBUSCA,cpfCnpj,CLICGC,"+cliCpfCnpj+",A1_COD,"+A1_COD+",A1_LOJA,"+A1_LOJA + filterInscricaoEstadual;
			}else if(tipoUsuario == 'Administrativo GTS'){
				//Tipo de filtro passado pelo usuário Administrativo GTS, campo de CPF/CNPJ ou Código e Loja
				if(tipoBusca == 'cpfCnpj'){
					filterFields = "TIPOUSUARIO,Administrativo GTS,TIPOBUSCA,cpfCnpj,CLICGC,"+cliCpfCnpj + filterInscricaoEstadual;
				}else if(tipoBusca == 'codLoja'){
					filterFields = "TIPOUSUARIO,Administrativo GTS,TIPOBUSCA,codLoja,CLICOD,"+cliCodigo+",CLILOJA,"+cliLoja;
				}
			}
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
	    		type: "GET",
	    		dataType: "json",
	    		async: true,
	    		url: "/api/public/ecm/dataset/search?datasetId=dsEntTecConsultaCliente&filterFields="+filterFields,
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
	    					
	    					$("#cliCpfCnpj").val(CLICGC);
	    					$("#cliInscricaoEstadual").val(CLIINSCR);
    			    		$("#cliNomeCliente").val(CLINOME);
    			    		$("#cliCodigo").val(CLICOD);
    			    		$("#cliLoja").val(CLILOJA);
    			    		$("#cliCEP").val(CLICEP);
    			    		validafunctions.setCep("cliCEP");
    			    		$('#cliEstadoHidden').val(CLIEST);
    			    		$('#cliEstado').val(CLIEST);
    			    		$("#cliCidade").val(CLIMUN);
    			    		$("#cliEndereco").val(CLIENDE);
    			    		$("#cliBairro").val(CLIBAIRRO);
    			    		$("#cliComplemento").val(CLICOMPL);
    			    		$("#cliEmail").val(CLIEMAIL);
    			    		$("#cliTelefone").val(CLITELEFONE);
    			    		
    			    		funcoes.mascaraCep('cliCEP');
    			    		funcoes.mascaraTelefone('cliTelefone');
    			    		funcoes.somenteLeituraCamposCliente(true);
    			    		
    			    		if(tipoBusca == 'cpfCnpj'){
    			    			setTimeout(function(){ 
    	    			    		FLUIGC.message.alert({
    	    			    		    message: 'Confira a Inscrição Estadual do Cliente.',
    	    			    		    title: 'Atenção',
    	    			    		    label: 'ok'
    	    			    		}, function(el, ev) {
    	    			    		});
        			    		}, 500);
    			    		}
    			    		
	    	    		}else if (records[0].CODRET == "2"){
		    	    		FLUIGC.toast({ title: '', message: records[0].MSGRET, type: 'warning' });
		    	    		
		    	    		if(tipoUsuario == "Revenda" || (tipoUsuario == "Administrativo GTS" && tipoBusca == 'cpfCnpj') ){
			    	    		$('#cliCodigo').val('');
			    				$('#cliLoja').val('');
			    				//Libera os campos para preencher manualmente os dados do cliente, somente se o CPF e a IE tiver preenchidos
			    				if($('#cliCpfCnpj').val().trim() != '' && $('#cliInscricaoEstadual').val().trim()){
			    					funcoes.somenteLeituraCamposCliente(false);
			    				}
			    	    		
		    	    		}
//		    	    		funcoes.limpaCamposCliente();
		    	    	}
	    	    		
	    	    		
	    	    	}else{
	    	    		if(tipoUsuario == "Revenda" || (tipoUsuario == "Administrativo GTS" && tipoBusca == 'cpfCnpj') ){
	    	    			FLUIGC.toast({ title: '', message: 'O CPF/CNPJ do cliente informado não existe na base de dados!', type: 'warning' });
		    	    		$('#cliCodigo').val('');
		    				$('#cliLoja').val('');
		    	    		//Libera os campos para preencher manualmente os dados do cliente, somente se o CPF e a IE tiver preenchidos
		    				if($('#cliCpfCnpj').val().trim() != '' && $('#cliInscricaoEstadual').val().trim()){
		    					funcoes.somenteLeituraCamposCliente(false);
		    				}
	    	    		}else if( tipoUsuario == "Administrativo GTS" && tipoBusca == 'codLoja'){
	    	    			FLUIGC.toast({ title: '', message: 'O código do cliente loja informado não existe na base de dados!', type: 'warning' });
	    	    		}
	    	    		
	    	    		
	    	    	}
	    	    	setTimeout(function(){ 
	    	    		loading.hide();
	    	    	}, 1000);
	    	    },
				error: function(XMLHttpRequest, textStatus, errorThrown) {
	    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
	    	    	FLUIGC.toast({
			    		title: '',
			    		message: 'Erro na consulta do cliente, comunicar o Administrador do Sistema!' ,
			    		type: 'danger'
			    	});
	    	    	loading.hide();
				}
			});
			
			
		},
		
		/*
		 * EMISSÃO NOTA FISCAL
		 */
		calculaValorTotal : function(){
			let NFvalValorEntrega = ( $("#NFvalValorEntrega").val().trim() != '' ) ? validafunctions.getFloatValue("NFvalValorEntrega") : 0;
			let NFvalValorDeslocamento = ( $("#NFvalValorDeslocamento").val().trim() != '' ) ? validafunctions.getFloatValue("NFvalValorDeslocamento") : 0;
			let NFvalValorAddEntrega = ( $("#NFvalValorAddEntrega").val().trim() != '' ) ? validafunctions.getFloatValue("NFvalValorAddEntrega") : 0;
			let NFvalValorAddDeslocamento = ( $("#NFvalValorAddDeslocamento").val().trim() != '' ) ? validafunctions.getFloatValue("NFvalValorAddDeslocamento") : 0;
			let NFvalValorTotal = 0;
			NFvalValorTotal = NFvalValorEntrega + NFvalValorDeslocamento + NFvalValorAddEntrega + NFvalValorAddDeslocamento;
			
			$('#NFvalValorTotal').val(NFvalValorTotal.toFixed(2));
			validafunctions.setMoeda("NFvalValorTotal", 2, false , '');

		},
		/*
		 * Utils
		 */
		mascaraCpfCnpj : function(idCampo){
			$('#'+idCampo).unmask();
			if($('#'+idCampo).val().replace(/[^0-9]/g, "").trim().length <= 11){ // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
				$('#'+idCampo).mask("000.000.000-009");
			}else{
				$('#'+idCampo).mask("00.000.000/0000-00");
			}
		},
		
		mascaraTelefone : function(idCampo){
			$('#'+idCampo).unmask();
			//11 dígitos de somente número ddd + numero
			if($('#'+idCampo).val().replace(/[^0-9]/g, "").trim().length == 11){ // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
				$('#'+idCampo).mask('(00) 00000-0009');
			} else {
				$('#'+idCampo).mask('(00) 0000-00009');
			}
		},
		
		mascaraCep : function(idCampo){
			$('#'+idCampo).unmask();
			$('#'+idCampo).mask('99999-999');
		}
	}
})();

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	
			
			
			/*
			 * CADASTRAMENTO
			 */
			/*
			 * Cadastro de Equipamento
			 */
			/**
			 * Sempre em maiusculo o numero de série
			 */
			$(document).on("keyup", "#equipNumSerie", function() {
				$("#equipNumSerie").val( $("#equipNumSerie").val().toUpperCase()   );
			});
			/**
			 * Busca os dados do Equipamento pelo numero de serie
			 */
			$(document).on("change", "#equipNumSerie", function() {
				
				if($("#equipNumSerie").val().trim() == ''){
					funcoes.limpaCamposEquipamento();
					$('#equipNumNotaFiscal').prop('readonly', true);
					funcoes.limpaCamposRevenda();
					
				}else{
					//conforme o tipoSolicitante ter regra diferente para localizar cliente
					let tipoSolicitante = $('#tipoSolicitante').val();
					funcoes.consultaEquipamento(tipoSolicitante);
					//Sempre que consulta zera esse campo, porque pode ser que tenha inserido um  num. serie de GS, que o calculo de Termino de Garantia é somente 180 dias e nao 365
					$('#equipDataVenda').val('');
					$('#equipDataEntrega').val('');
					$('#equipDataTerminoGarantia').val('');
				}
				
			});
			/**
			 * Quando altera a opção Tipo de Nota, alimenta o campo hidden
			 */
			$(document).on("change", "#equipTipoNota", function() {
				let equipTipoNota = $('#equipTipoNota').val();
				$("#equipTipoNotaHidden").val(equipTipoNota);
				
				if(equipTipoNota == 'NV'){
					//Se for nota de venda, NÃO habilita o campo Num Nota Fiscal
					$('#equipNumNotaFiscal').prop('readonly', true);
				}else if(equipTipoNota == 'ND'){
					//Se for nota de demonstração, habilita o campo Num Nota Fiscal
					$('#equipNumNotaFiscal').prop('readonly', false);
					
				}
				
				$('#equipNumNotaFiscal').val('');
				$('#equipCodProduto').val('');
				$('#equipDescricao').val('');
				$('#equipModelo').val('');
				$('#equipAcoplamento').val('');
				$('#equipDataVenda').val('');
				$('#equipDataEntrega').val('');
				$('#equipDataTerminoGarantia').val('');
				
				funcoes.limpaCamposRevenda();

			});
			
			/**
			 * Busca os dados do Equipamento pelo numero de serie e num nota
			 */
			$(document).on("change", "#equipNumNotaFiscal", function() {
				
				if($("#equipNumSerie").val().trim() == ''){
					funcoes.limpaCamposEquipamento();
					funcoes.limpaCamposRevenda();
					
				}else{
					//conforme o tipoSolicitante ter regra diferente para localizar cliente
					let tipoSolicitante = $('#tipoSolicitante').val();
					funcoes.consultaEquipamento(tipoSolicitante);
				}
				
			});	
			
			$(document).on("change", "#equipDataEntrega", function() {
				
				let equipDataEntrega = $('#equipDataEntrega').val();
				let equipNumSerie = $('#equipNumSerie').val().trim();
				let equipDataTerminoGarantia = '';
				
				if(equipNumSerie != ''){
					//Se for GreenSystem é somente 180 dias, se não 365 
					let diasAdicionar = (equipNumSerie.substring(0, 3) == 'FGS') ? 180 : 365;
					
					if (equipDataEntrega.trim() == ''){
						equipDataTerminoGarantia = '';
					}else if( equipDataEntrega.indexOf("/") ){
						equipDataTerminoGarantia = moment( equipDataEntrega, "DD-MM-YYYY").add(diasAdicionar, 'days').format('DD/MM/YYYY');
					}else if(  equipDataEntrega.indexOf("-") ){
						equipDataTerminoGarantia = moment( equipDataEntrega, "YYYY-MM-DD").add(diasAdicionar, 'days').format('DD/MM/YYYY');
					}
					$('#equipDataTerminoGarantia').val(equipDataTerminoGarantia);
				}else{
					
					FLUIGC.toast({ title: '', message: "É preciso preecher o campo 'Número de Série' primeiro.", type: 'warning' });
					$('#equipDataVenda').val('');
					$('#equipDataEntrega').val('');
					$('#equipDataTerminoGarantia').val('');
					
				}
				
				
			});
			/*
			 * Cadastro da Loja (Revenda)
			 */
			$(document).on("keyup blur", "#revTelefone", function() {	
				funcoes.mascaraTelefone('revTelefone');
			});
			$(document).on("keyup blur", "#revContVendasTelefone", function() {	
				funcoes.mascaraTelefone('revContVendasTelefone');
			});
			$(document).on("keyup blur", "#revContPecasTelefone", function() {	
				funcoes.mascaraTelefone('revContPecasTelefone');
			});
			$(document).on("keyup blur", "#revContServicoTelefone", function() {	
				funcoes.mascaraTelefone('revContServicoTelefone');
			});
			$(document).on("keyup blur", "#revEntTecTelefone", function() {	
				funcoes.mascaraTelefone('revEntTecTelefone');
			});
			
			/*
			 * Protocolo de Recebimento do Cliente Final
			 */
			$(document).on("keyup blur", "#protoRecTelefone", function() {	
				funcoes.mascaraTelefone('protoRecTelefone');
			});
			
			$(document).on("change", "input:radio[name='protoRecPossuiAvarias']", function() {
				var protoRecPossuiAvarias = $("input:radio[name='protoRecPossuiAvarias']:checked").val();
				
				if(protoRecPossuiAvarias == 'sim'){
					
					let existeLinhaAvaria = false;
					$("input[name*=protoRecAvariasDescricaoItem___]").each(function(index){
						var index = validafunctions.getPosicaoFilho($(this).attr("id"));
						existeLinhaAvaria = true;
						
					});
					if(!existeLinhaAvaria){
						let indexTbAvarias = wdkAddChild('protoRecTbAvarias');
						$('#protoRecAvariasImagemDescItem___'+indexTbAvarias).val('Imagem Avaria - índice ' + indexTbAvarias );
					}
					$('#divTabelaAvarias').show();
					$('#divCienteSemAvarias').hide();
					
				}else{
					$('#divCienteSemAvarias').show();
					$('#divTabelaAvarias').hide();
					
				}
				
			});
			
			/**
			 * Gatilho para adicionar Avarias
			 */
			$(document).on("click", "#btnAddAvarias", function() {	
				
				let protoRecAvariasDescricaoPreenchido = true;
				$("input[name*=protoRecAvariasDescricaoItem___]").each(function(index){
					var index = validafunctions.getPosicaoFilho($(this).attr("id"));
					
					var protoRecAvariasDescricaoItem = $("#protoRecAvariasDescricaoItem___"+index).val();
					
					if(protoRecAvariasDescricaoItem.trim() == ''){
						protoRecAvariasDescricaoPreenchido = false;
					}
					
				});
				if(protoRecAvariasDescricaoPreenchido){
					let indexTbAvarias = wdkAddChild('protoRecTbAvarias');
					$('#protoRecAvariasImagemDescItem___'+indexTbAvarias).val('Imagem Avaria - índice ' + indexTbAvarias );
				}else{
					FLUIGC.toast({ title: '', message: "É preciso preecher o campo 'Descrição' para adicionar uma nova avaria.", type: 'warning' });
				}
				
				
			});
			
			
			/*
			 * CLIENTE
			 */
			/**
			 * Tira a mascara de CPF/CNPJ quando coloca o focos e estiver vazio
			 */
			$(document).on("focusin", "#cliCpfCnpj", function(e) {
				console.log('é readonly?', $('#cliCpfCnpj').is('[readonly]') )
				if( !$('#cliCpfCnpj').is('[readonly]') ) { 
					$("#cliCpfCnpj").unmask();
				}
			});
			$(document).on("focusout", "#cliCpfCnpj", function(e) {
				if( !$('#cliCpfCnpj').is('[readonly]') ) {
					funcoes.mascaraCpfCnpj('cliCpfCnpj');
				}
			});
			/**
			 * Transforma a mascara do cliente em CPF ou CNPJ
			 */
			$(document).on("keyup", "#cliCpfCnpj", function(e) {
				funcoes.mascaraCpfCnpj('cliCpfCnpj');
				
				//Se limpar tudo, tira mascara
				if (event.keyCode == 46 || event.keyCode == 8){
					if($('#cliCpfCnpj').val().trim() == ''){
						$("#cliCpfCnpj").unmask();
					}
				}
					
			});
			/**
			 * Gatilho de CPF/CNPJ do cliente
			 * 
			 */
			$(document).on("change", "#cliCpfCnpj", function() {
				if($("#cliCpfCnpj").val().trim().length == 0){
					
					funcoes.limpaCamposCliente();
					funcoes.somenteLeituraCamposCliente(true);
					
				}else if($("#cliCpfCnpj").val().trim().length == 14 || $("#cliCpfCnpj").val().trim().length == 18){
					//conforme o tipoSolicitante ter regra diferente para localizar cliente
					let tipoSolicitante = $('#tipoSolicitante').val();
					funcoes.consultaCliente(tipoSolicitante, 'cpfCnpj');
					
				}else{
					FLUIGC.toast({ title: '', message: 'O CPF/CNPJ não está preenchido corretamente!', type: 'warning' });
				}
				
			});
			/**
			 * Ao alterar a Inscrição Estadual, é realizada a busca do cliente, 
			 *	já que pode ter um mesmo cliente com o mesmo CPF/CNPJ, e o que diferencia é a Inscrição Estadual
			 * 
			 * Feito a alteração da inscrição estadual, é chamado o método consultaCliente
			 */
			$(document).on("change", "#cliInscricaoEstadual", function() {
				
				let cliCpfCnpj = $('#cliCpfCnpj').val();
				
				if($("#cliInscricaoEstadual").val().trim() == ''){
					
					funcoes.limpaCamposCliente();
					funcoes.somenteLeituraCamposCliente(true);
				
				}else if(cliCpfCnpj != ''){
					//conforme o tipoSolicitante ter regra diferente para localizar cliente
					let tipoSolicitante = $('#tipoSolicitante').val();
					funcoes.consultaCliente(tipoSolicitante, 'cpfCnpj');
				}
			});
			/**
			 * Gatilho para quando insere um código de cliente
			 */
			$(document).on("change", "#cliCodigo", function() {
				if($("#cliCodigo").val().trim().length == 0 && $("#cliLoja").val().trim().length == 0){
					funcoes.limpaCamposCliente();
				}else if($("#cliCodigo").val().trim().length == 9 && $("#cliLoja").val().trim().length == 4){
					funcoes.consultaCliente('Administrativo GTS', 'codLoja');
				}
			});
			
			$(document).on("change", "#cliLoja", function() {
				if($("#cliCodigo").val().trim().length == 0 && $("#cliLoja").val().trim().length == 0){
					funcoes.limpaCamposCliente();
				}else if($("#cliCodigo").val().trim().length == 9 && $("#cliLoja").val().trim().length == 4){
					funcoes.consultaCliente('Administrativo GTS', 'codLoja');
				}
			});
			
			/**
			 * Gatilho para quando alterado o estado(UF) do cliente, armazena no campo hidden de estado o valor da UF
			 * É feito isso, porque em alguns momentos é preciso colocar como disable o campo de estado, e o Fluig não salva os valores no banco quando o campo é disable.
			 * Quando roda o displayFiels é alimentado o campo cliEstado puxando do hidden cliEstadoHidden
			 */
			$(document).on("change", "#cliEstado", function() {
				let cliEstado = $('#cliEstado').val();
				$("#cliEstadoHidden").val(cliEstado);
				
			});
			
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
		    					let ufCliente = data.uf;
		    					let cidadeCliente = data.localidade;
		    					let enderecoCliente = data.logradouro;
		    					let bairroCliente = data.bairro;
		    					
		    					$('#cliEstado').val(ufCliente);
		    					$('#cliEstadoHidden').val(ufCliente);
		    					$('#cliCidade').val(cidadeCliente);
		    					$('#cliEndereco').val(enderecoCliente);
		    					$('#cliBairro').val(bairroCliente);
			    					
			    	    	}else{
			    	    		FLUIGC.toast({ title: '', message: 'O CEP não existe na base de dados!', type: 'warning' });
			    	    		$('#cliEstado').val('');
			    	    		$('#cliEstadoHidden').val('');
		    					$('#cliCidade').val('');
		    					$('#cliEndereco').val('');
		    					$('#cliBairro').val('');
			    	    	}
			    	    	
			    	    	loading.hide();
			    	    },
						error: function(XMLHttpRequest, textStatus, errorThrown) {
			    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
			    	    	FLUIGC.toast({
					    		title: '',
					    		message: 'Erro ao consultar CEP, servidor indisponível!' ,
					    		type: 'danger'
					    	});
			    	    	
			    	    	$('#cliEstado').val('');
			    	    	$('#cliEstadoHidden').val('');
	    					$('#cliCidade').val('');
	    					$('#cliEndereco').val('');
	    					$('#cliBairro').val('');
			    	    	loading.hide();
						}
					});
					
				}else{
					$('#cliEstado').val('');
	    	    	$('#cliEstadoHidden').val('');
					$('#cliCidade').val('');
					$('#cliEndereco').val('');
					$('#cliBairro').val('');
				}
				
			});
			/**
			 * Gatilho para mascara de Telefone
			 */
			$(document).on("keyup blur", "#cliTelefone", function() {	
				funcoes.mascaraTelefone('cliTelefone');
			});
			$(document).on("keyup blur", "#cliTelefonePesqSatisfacao", function() {	
				funcoes.mascaraTelefone('cliTelefonePesqSatisfacao');
			});
			
			/**
			 * Gatilho para Informação se cliente possui Equipamento GTS
			 * Conforme a seleção, libera diferentes tipos de campos
			 */
			$(document).on("change", "input:radio[name='cliPossuiEquipamentoGTS']", function() {
				var cliPossuiEquipamentoGTS = $("input:radio[name='cliPossuiEquipamentoGTS']:checked").val();
				
				if(cliPossuiEquipamentoGTS == 'sim'){
					
					let existeLinhaEquipamento = false;
					$("input[name*=cliEquipEquipamentoItem___]").each(function(index){
						var index = validafunctions.getPosicaoFilho($(this).attr("id"));
						existeLinhaEquipamento = true;
						
					});
					if(!existeLinhaEquipamento){
						wdkAddChild('cliTbEquipamentos');
					}
					$('#divTabelaEquipamentos').show();
					
				}else{
					$('#divTabelaEquipamentos').hide();
				}
				
			});
			/**
			 * Gatilho para adicionar Equipamento na tabela de Equipamento
			 */
			$(document).on("click", "#btnAddEquipamento", function() {	
				
				let cliEquipEquipamentoPreenchido = true;
				$("input[name*=cliEquipEquipamentoItem___]").each(function(index){
					var index = validafunctions.getPosicaoFilho($(this).attr("id"));
					
					var cliEquipEquipamentoItem = $("#cliEquipEquipamentoItem___"+index).val();
					
					if(cliEquipEquipamentoItem.trim() == ''){
						cliEquipEquipamentoPreenchido = false;
					}
					
				});
				if(cliEquipEquipamentoPreenchido){
					wdkAddChild('cliTbEquipamentos');
				}else{
					FLUIGC.toast({ title: '', message: "É preciso preecher o campo 'Equipamento' para adicionar um novo equipamento.", type: 'warning' });
				}
				
				
			});
			
			/*
			 * Propriedade Rural do Cliente
			 */
			/**
			 * Gatilho para adicionar a Propriedade Rural na tabela de Propriedade Rural
			 */
			$(document).on("click", "#btnAddPropRural", function() {	
				
				let propRuralCidade = $('#propRuralCidade').val();
				let propRuralEstado = $('#propRuralEstado').val();
				let propRuralNomePropriedade = $('#propRuralNomePropriedade').val();
				let propRuralKmAtePropriedade = $('#propRuralKmAtePropriedade').val();
				
				if(propRuralCidade.trim() == ''){
					FLUIGC.toast({ title: '', message: "É preciso preecher o campo 'Cidade' para adicionar uma 'Propriedade Rural'.", type: 'warning' });
				}else if(propRuralEstado.trim() == ''){
					FLUIGC.toast({ title: '', message: "É preciso preecher o campo 'Estado' para adicionar uma 'Propriedade Rural'.", type: 'warning' });
				}else if(propRuralNomePropriedade.trim() == ''){
					FLUIGC.toast({ title: '', message: "É preciso preecher o campo 'Nome da Propriedade' para adicionar uma 'Propriedade Rural'.", type: 'warning' });
				}else if(propRuralKmAtePropriedade.trim() == '' || propRuralKmAtePropriedade.trim() == '0'){
					FLUIGC.toast({ title: '', message: "É preciso preecher o campo 'Km até a propriedade' para adicionar uma 'Propriedade Rural'.", type: 'warning' });
				}else{
					let linhaPropRural = wdkAddChild('propRuralTbPropriedadesRurais');
					$('#propRuralCidadeItem___' + linhaPropRural).val( propRuralCidade );
					$('#propRuralEstadoItem___' + linhaPropRural).val( propRuralEstado );
					$('#propRuralNomePropriedadeItem___' + linhaPropRural).val( propRuralNomePropriedade );
					$('#propRuralKmAtePropriedadeItem___' + linhaPropRural).val( propRuralKmAtePropriedade );
					
					$('#propRuralCidade').val('');
					$('#propRuralEstado').val('');
					$('#propRuralNomePropriedade').val('');
					$('#propRuralKmAtePropriedade').val('');
					
					$('#divTabelaPropRural').show();
				}				
				
			});
			
			/**
			 * Gatilho para deixar somente uma opção marcada na 'Entrega de Equipamento'
			 */
			$(document).on("change", ".change-propRuralEntrega", function() { 
				var indexChange = validafunctions.getPosicaoFilho($(this).attr("id"));

				$("input[name*=propRuralEntrega___]").each(function(index){
					var index = validafunctions.getPosicaoFilho($(this).attr("id"));
					
					//Desmarca tudo da tabela de propriedade rural
					$("#propRuralEntrega___"+index).prop('checked', false);
						
				});
				//Somente fica marcado a que foi selecionada
				$("#propRuralEntrega___"+indexChange).prop('checked', true);
			});
			
			/*
			 * EMISSÃO NOTA FISCAL
			 */
			/**
			 * Gatilho para calcular o valor total da NF
			 */
			/*
			 * Valores
			 */
			$(document).on("change", "#NFvalValorEntrega", function() {
				funcoes.calculaValorTotal();
			});
			$(document).on("change", "#NFvalValorDeslocamento", function() {
				funcoes.calculaValorTotal();
			});
			$(document).on("change", "#NFvalValorAddEntrega", function() {
				funcoes.calculaValorTotal();
			});
			$(document).on("change", "#NFvalValorAddDeslocamento", function() {
				funcoes.calculaValorTotal();
			});
			
			/*
			 * Nota Fiscal/Forma de Pagamento
			 */
			/**
			 * Quando seleciona a forma de pagamento (Boleto ou Transferência)
			 */
			$(document).on("change", "input:radio[name='NFPagtoFormaPagamento']", function() {
				var NFPagtoFormaPagamento = $("input:radio[name='NFPagtoFormaPagamento']:checked").val();
				
				if(NFPagtoFormaPagamento == 'boleto'){
					
					$('#divPagtoBoleto').show();
					$('#divPagtoTranferencia').hide();
					
				}else if(NFPagtoFormaPagamento == 'transferencia'){
					
					$('#divPagtoBoleto').hide();
					$('#divPagtoTranferencia').show();
					
				}
				
			});
			/**
			 * Transforma a mascara da forma de pagamento de Transferencia
			 */
			$(document).on("keypress change", "#NFPagtoCpfCnpj", function() {
				
				if($(this).val().length <= 14){
					$("#NFPagtoCpfCnpj").mask("000.000.000-000");
				}else{
					$("#NFPagtoCpfCnpj").mask("00.000.000/0000-00");
				}
				
			});
			/**
			 * Quando seleciona se foi aprovado/reprovado (Nota Fiscal e Forma de Pagamento)
			 */
			$(document).on("change", "input:radio[name='NFAprovAprovacao']", function() {
				var NFAprovAprovacao = $("input:radio[name='NFAprovAprovacao']:checked").val();
				
				if(NFAprovAprovacao == 'aprovado'){
					
					$('#divNFAprovDataPrevPagto').show();
					
				}else if(NFAprovAprovacao == 'reprovado'){
					
					$('#divNFAprovDataPrevPagto').hide();
					
				}
				
			});
			
		}
	}
})();

function removeAvarias(oElement){
	try {
		const indice = validafunctions.getPosicaoFilho($(oElement).closest('tr').find("input")[0].id);
        const protoRecAvariasDescricaoItem = $(`#protoRecAvariasDescricaoItem___${indice}`).val() || "";
        const inputFileName = $(oElement).closest('tr').find(".inputAnexo").val();
        const inputFileDesc = $(oElement).closest('tr').find(".descAnexo").val();
        FLUIGC.message.confirm({
            message: `Deseja remover o registro da tabela de avaria <b>${protoRecAvariasDescricaoItem}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não, quero cancelar',
        }, function (result) {
            if (result) {
                fnWdkRemoveChild(oElement)
                if (inputFileName && inputFileDesc) {
                    removeFile(inputFileDesc)
                }
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função removeAvarias")
        console.error(e)
    }
}

function removeCliEquipamentos(oElement){
	
	try {
		const indice = validafunctions.getPosicaoFilho($(oElement).closest('tr').find("input")[0].id);
        const cliEquipEquipamentoItem = $(`#cliEquipEquipamentoItem___${indice}`).val() || "";
        FLUIGC.message.confirm({
            message: `Deseja remover o registro da tabela de equipamento <b>${cliEquipEquipamentoItem}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não, quero cancelar',
        }, function (result) {
            if (result) {
            	fnWdkRemoveChild(oElement);
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função removeCliEquipamentos")
        console.error(e)
    }
    
	
}

function removePropRural(oElement){
	
	try {
		const indice = validafunctions.getPosicaoFilho($(oElement).closest('tr').find("input")[0].id);
        const propRuralNomePropriedadeItem = $(`#propRuralNomePropriedadeItem___${indice}`).val() || "";
        FLUIGC.message.confirm({
            message: `Deseja remover o registro da tabela de propriedade rural <b>${propRuralNomePropriedadeItem}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não, quero cancelar',
        }, function (result) {
            if (result) {
            	fnWdkRemoveChild(oElement);
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função removePropRural")
        console.error(e)
    }
    
}

function loadForm(){
	
	const today = new Date();
	
	if(CURRENT_STATE == INICIO_0)
	{	
		/*
		 * Cadastro do Equipamento
		 */
		FLUIGC.calendar('#equipDataEntrega',{
			  language: 'pt-br',
			  maxDate: today,
			  pickDate: true,
			  pickTime: false,
			  showToday: true

		});
		/*
		 * Cadastro da Loja (Revenda)
		 */
		$("#revEntTecCpf").mask("000.000.000-00");
		
		/*
		 * Protocolo de Recebimento do Cliente Final
		 */
		FLUIGC.calendar('#protoRecDataRecebimento',{
			  language: 'pt-br',
			  maxDate: today,
			  pickDate: true,
			  pickTime: false,
			  showToday: true

		});
		
		/*
		 * CLIENTE
		 */
		funcoes.mascaraCpfCnpj('cliCpfCnpj');
		funcoes.mascaraCep('cliCEP');
		
	}else if(CURRENT_STATE == INICIO){
		
		/*
		 * Cadastro do Equipamento
		 */
		FLUIGC.calendar('#equipDataEntrega',{
			  language: 'pt-br',
			  maxDate: today,
			  pickDate: true,
			  pickTime: false,
			  showToday: true

		});
		
		/*
		 * Cadastro da Loja (Revenda)
		 */
		$("#revEntTecCpf").mask("000.000.000-00");
		
		/*
		 * Protocolo de Recebimento do Cliente Final
		 */
		FLUIGC.calendar('#protoRecDataRecebimento',{
			  language: 'pt-br',
			  maxDate: today,
			  pickDate: true,
			  pickTime: false,
			  showToday: true

		});
		
		/*
		 * CLIENTE
		 */
		funcoes.mascaraCpfCnpj('cliCpfCnpj');
		funcoes.mascaraCep('cliCEP');
		
	}else if(CURRENT_STATE == GTS_ANALISA_RETORNO){
		
		/*
		 * Aprovação Forma de Pagamento
		 */
		FLUIGC.calendar('#NFAprovDataPrevPagto',{
			  language: 'pt-br',
			  minDate: today,
			  pickDate: true,
			  pickTime: false,
			  showToday: true

		});
		
	}
	
}

