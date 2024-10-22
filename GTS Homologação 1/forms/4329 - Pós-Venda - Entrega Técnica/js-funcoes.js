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
			$('#equipFilialNotaFiscal').val('');
			$('#equipNumNotaFiscal').val('');
			$('#equipCodProduto').val('');
			$('#equipDescricao').val('');
			$('#equipModelo').val('');
			$('#equipAcoplamento').val('');
			$('#equipDataVenda').val('');
			$('#equipDataEntrega').val('');
			$('#equipDataTerminoGarantia').val('');

		},

		limpaCamposRevendaEquipamento : function(){
			$('#revEquipCpfCnpj').val('');
			$('#revEquipRazaoSocialRevenda').val('');
			$('#revEquipNomeFantasiaRevenda').val('');
			$('#revEquipCodigo').val('');
			$('#revEquipLoja').val('');
			$('#revEquipCidade').val('');
			$('#revEquipEstadoHidden').val('');
			$('#revEquipEstado').val('');
			$('#revEquipClassPeca').val('');
			$('#revEquipEmail').val('');
			$('#revEquipTelefone').val('');
			$('#divCienteTransfEquipRev').hide();
		},

		classificaServicoRevenda : function() {
			//Pega os dados adicionais
		$.ajax({
			url: '/api/public/2.0/users/getCurrent', 
			type: "GET",
		}).done(function(data) {
			var user_fluig     = data;
			var codCli        = user_fluig.content.extData.A1_COD;
			var lojaCli       = user_fluig.content.extData.A1_LOJA;
			$('#codRev').val(codCli);
			$('#lojaRev').val(lojaCli);
			
			//Dataset de consulta da classificação da revenda
			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsMenuConsultaClassRevenda&filterFields=codCli,"+codCli+",lojaCli,"+lojaCli,
				
				success: function (data, status, xhr) {
					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						if( records[0].CODRET == "1"){
							var record = records[0];
							var calassificacaoRev = record.CLASSREV;

							$('#revClassServico').val(calassificacaoRev);
							if(calassificacaoRev == 'O'){								
								$('#revClassServico').val('Ouro');
							}if(calassificacaoRev == 'P'){								
								$('#revClassServico').val('Prata');
							}if(calassificacaoRev == 'B'){								
								$('#revClassServico').val('Bronze');
							}if(calassificacaoRev == 'D'){								
								$('#revClassServico').val('Premium Dealer');
								console.log("Premium Dealer");
							}if(calassificacaoRev == ''){								
								$('#revClassServico').val('Não Classificada');
							}
							
						}
						else if (records[0].CODRET == "2"){
							console.log(records[0].CMSG);
						}
						
					}
					else{
							FLUIGC.toast({ title: '', message: 'Erro ao consultar revenda, comunicar o Administrador do Sistema!', type: 'danger' });
						}
					setTimeout(function(){
					}, 1000);
					
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					FLUIGC.toast({
						title: '',
						message: 'Erro na consulta do revenda, comunicar Administrador do Sistema' ,
						type: 'danger'
					});
				}
			});
			
		})
	},
		
		/**
		 * Busca dados do Equipamento e da Revenda.
		 */
		consultaEquipamento : function(tipoUsuario){
			
			let A1_COD = $('#A1_COD').val().trim();
			let equipNumSerie = $('#equipNumSerie').val().trim();
			let equipTipoNota = $('#equipTipoNota').val().trim();
			let equipNumNotaFiscal = $('#equipNumNotaFiscal').val().trim();

			console.log(record.CLASSREV)
			
			if(equipTipoNota == 'ND' && equipNumNotaFiscal == '' ){
				FLUIGC.toast({ title: '', message: 'É obrigatório preencher o número da Nota Fiscal quando o Tipo da Nota for Nota de Demonstração.!', type: 'warning' });
				return;
			}
			
			//Se tiver preenchido a inscrição estadual, manda ela também para filtra
			let filterNumNotaFiscal= (equipNumNotaFiscal != "") ? ",equipNumNotaFiscal,"+equipNumNotaFiscal : "";
			
			if(tipoUsuario == 'Revenda'){
				filterFields = "TIPOUSUARIO,Revenda,A1_COD,"+A1_COD+",equipNumSerie,"+equipNumSerie + ",equipTipoNota," + equipTipoNota + "" + filterNumNotaFiscal;
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
	    					let equipFilialNotaFiscal = record.EQPFILIALNOTA;
	    					let equipNumNotaFiscal = record.EQPNOTA;
	    					let equipCodProduto = record.EQPCODPRD;
	    					let equipDescricao = record.EQPDESC;
	    					let equipDataVenda = record.EQPDTVENDA;
	    					let equipStatusGTS = record.EQPSTATUSGTS;
	    					
	    					if(equipStatusGTS == '03'){
	    						
	    						FLUIGC.toast({ title: '', message: 'Este Equipamento já encontra-se com status de Entrega Real.', type: 'warning' });
	    						
	    						$('#equipFilialNotaFiscal').val('');
			    				$('#equipNumNotaFiscal').val('');
			    				$('#equipCodProduto').val('');
			    				$('#equipDescricao').val('');
			    				$('#equipModelo').val('');
			    				$('#equipAcoplamento').val('');
			    	    		
			    	    		funcoes.limpaCamposRevendaEquipamento();
	    						
	    					}else{
		    					$("#equipFilialNotaFiscal").val(equipFilialNotaFiscal);
		    					$("#equipNumNotaFiscal").val(equipNumNotaFiscal);
		    					$("#equipCodProduto").val(equipCodProduto);
		    					$("#equipDescricao").val(equipDescricao);
		    					$("#equipDataVenda").val(equipDataVenda);
		    					
		    					if($('#tipoSolicitante').val() != 'Administrativo GTS'){
		    					
			    					let revEquipCpfCnpj = record.REVCGC;
			    					let revEquipRazaoSocialRevenda = record.RECRAZAOSOCIAL;
			    					let revEquipNomeFantasiaRevenda = record.REVNOMEFANTASIA;
			    					let revEquipCodigo = record.REVCOD;
			    					let revEquipLoja = record.REVLOJA;
			    					let revEquipCidade = record.REVCIDADE;
			    					let revEquipEstado = record.REVESTADO;
			    					let revEquipClassPeca = record.REVCLPECA;
			    					//let revEquipClassServico = record.REVCLSER;
									let revEquipClassServico = record.REVCLSER
			    					let revEquipEmail =  record.REVEMAIL;
			    					let revEquipTelefone =  record.REVTELEFONE;
			    					
			    					$("#revEquipCpfCnpj").val(revEquipCpfCnpj);
			    					$("#revEquipRazaoSocialRevenda").val(revEquipRazaoSocialRevenda);
			    					$("#revEquipNomeFantasiaRevenda").val(revEquipNomeFantasiaRevenda);
			    					$("#revEquipCodigo").val(revEquipCodigo);
			    					$("#revEquipLoja").val(revEquipLoja);
			    					$("#revEquipCidade").val(revEquipCidade);
			    					$("#revEquipEstadoHidden").val(revEquipEstado);
			    					$("#revEquipEstado").val(revEquipEstado);
			    					$("#revEquipClassPeca").val(revEquipClassPeca);
			    					//$("#revClassServico").val(revClassServico);
									$("#revEquipClassServico").val(revEquipClassServico);
			    					$("#revEquipEmail").val(revEquipEmail);
			    					$("#revEquipTelefone").val(revEquipTelefone);
			    					
			    					funcoes.mascaraTelefone('revEquipTelefone');
			    					
			    					if($("#revEquipCodigo").val() ==  $("#revCodigo").val() &&
		    							$("#revEquipLoja").val() !=  $("#revLoja").val()){
			    						$('#divCienteTransfEquipRev').show();
			    					}else{
			    						$('#divCienteTransfEquipRev').hide();
			    					}
			    					
		    					}
	    					}
	    				}else if (records[0].CODRET == "2"){
		    	    		FLUIGC.toast({ title: '', message: records[0].MSGRET, type: 'warning' });
		    	    		
		    				$('#equipFilialNotaFiscal').val('');
		    				$('#equipNumNotaFiscal').val('');
		    				$('#equipCodProduto').val('');
		    				$('#equipDescricao').val('');
		    				$('#equipModelo').val('');
		    				$('#equipAcoplamento').val('');
		    	    		
		    	    		funcoes.limpaCamposRevendaEquipamento();
		    	    	}
	    	    	}else{
	    	    		FLUIGC.toast({ title: '', message: 'Erro ao consultar o equipamento, comunicar o Administrador do Sistema!', type: 'danger' });
	    	    		
	    	    		funcoes.limpaCamposRevendaEquipamento();
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
			let cliCpfCnpj = $('#cliCpfCnpj').val().replace(/[^0-9]/g, "").trim();
			let cliInscricaoEstadual = $('#cliInscricaoEstadual').val().replace(/[^0-9]/g, "");
			let cliCodigo = $('#cliCodigo').val().trim();
			let cliLoja = $('#cliLoja').val().trim();
			let filterFields = '';
			
			//Se tiver preenchido a inscrição estadual, manda ela também para filtra
			let filterInscricaoEstadual= (cliInscricaoEstadual != "") ? ",CLIINSCR,"+cliInscricaoEstadual : "";
				
			if(tipoUsuario == 'Revenda'){
				
				filterFields = "TIPOUSUARIO,Revenda,TIPOBUSCA,cpfCnpj,CLICGC,"+cliCpfCnpj+",A1_COD,"+A1_COD+ filterInscricaoEstadual;
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
	    	    			
	    	    			if(tipoBusca == 'cpfCnpj' && $('#cliInscricaoEstadual').val().trim() == '' ){
	    	    				FLUIGC.message.alert({
	    			    		    message: 'Registro de Cliente não localizado!<br>Preencha a <u>Inscrição Estadual do Cliente</u>, caso não possua, preencha como <u>ISENTO</u>.',
	    			    		    title: 'Atenção',
	    			    		    label: 'ok'
	    			    		}, function(el, ev) {
	    			    		});
	    	    			}else{
	    	    				FLUIGC.toast({ title: '', message: records[0].MSGRET, type: 'warning' });
	    	    			}
	    	    			
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
		 * CONSULTA REVENDA PARA PAGAMENTO
		 */
		consultaRevendaPagamento : function(){
			
			let OCCpfCnpj = $('#OCCpfCnpj').val().replace(/[^0-9]/g, "").trim();
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
	    		type: "GET",
	    		dataType: "json",
	    		async: true,
	    		url: "/api/public/ecm/dataset/search?datasetId=dsEntTecConsultaFornecedor&filterFields=CNPJFornecedor,"+OCCpfCnpj,
	    		data: "",
	    	    success: function (data, status, xhr) {
	    	    	
	    	    	if (data != null && data.content != null && data.content.length > 0) {
	    	    		const records = data.content;
	    	    		console.log(records)
	    	    		if( records[0].CODRET == "1"){
	    		            let record = records[0];
	    					let FORNRAZAOSOCIAL = record.FORNRAZAOSOCIAL;
	    					let FORNNFANTASIA = record.FORNNFANTASIA;
	    					
	    					$("#OCRazaoSocialRevenda").val(FORNRAZAOSOCIAL);
	    					$("#OCNomeFantasiaRevenda").val(FORNNFANTASIA);
    			    		
	    	    		}else if (records[0].CODRET == "2"){
	    	    			
    	    				FLUIGC.toast({ title: '', message: records[0].MSGRET, type: 'warning' });
    	    				$("#OCRazaoSocialRevenda").val('');
	    					$("#OCNomeFantasiaRevenda").val('');
		    	    	}
	    	    		
	    	    		
	    	    	}else{
	    	    		
    	    			FLUIGC.toast({ title: '', message: 'CNPJ do Fornecedor não localizado.', type: 'warning' });
    	    			$("#OCRazaoSocialRevenda").val('');
    					$("#OCNomeFantasiaRevenda").val('');
    					
	    	    	}
	    	    	setTimeout(function(){ 
	    	    		loading.hide();
	    	    	}, 1000);
	    	    },
				error: function(XMLHttpRequest, textStatus, errorThrown) {
	    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
	    	    	FLUIGC.toast({
			    		title: '',
			    		message: 'Erro na consulta do fornecedor, comunicar o Administrador do Sistema!' ,
			    		type: 'danger'
			    	});
	    	    	loading.hide();
				}
			});
			
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
		
		mascaraTelefone : function(idCampo, event){
			$('#'+idCampo).unmask();
			if($('#A1_PAIS').val() == 'PAR'){
				let incluiCodArea = true;
				if(event){
					if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9){
						//46 backspace 8 delete 9 tab
						incluiCodArea = false;
					}
				}
				if($('#'+idCampo).val().trim() == '' && incluiCodArea ){
					$('#'+idCampo).val( '(595) ' +  $('#'+idCampo).val());
				}
			}else{
				//11 dígitos de somente número ddd + numero
				if($('#'+idCampo).val().replace(/[^0-9]/g, "").trim().length == 11){ // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
					$('#'+idCampo).mask('(00) 00000-0009');
				} else {
					$('#'+idCampo).mask('(00) 0000-00009');
				}
			}
		},
		
		mascaraCep : function(idCampo){
			$('#'+idCampo).unmask();
			$('#'+idCampo).mask('99999-999');
		},

		//Consulta nota da pesquisa de satisfação
		consultaNotaPesq : function(indexItem){
			console.log("Acionou a consulta")
			let numSerie = $("#equipNumSerie").val();
			
			if( numSerie.trim() == "" ){
				return;
			}
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsNotaPesquisaDeSatisfacao&filterFields=numSerie,"+numSerie,
				
				success: function (data, status, xhr) {
					//console.log(data)
					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						if( records[0].CODRET == "1"){
							var record = records[0];
							//var entrepaPor = ''

							$("#NFfNotaEntrega").val(record.pesqNotaAtendimento);
							
						}else if (records[0].CODRET == "2"){		
							FLUIGC.toast({ title: '', message: records[0].CMSG, type: 'warning' });
							funcoes.limpaCamposItem(indexItem);
						}
					}	
					// }else{
					// 		FLUIGC.toast({ title: '', message: 'Erro ao consultar a nota, comunicar o Administrador do Sistema!', type: 'danger' });
					// 		//funcoes.limpaCamposItem(indexItem);
					// 	}
					setTimeout(function(){ 
						loading.hide();
					}, 1000);
					
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					FLUIGC.toast({
						title: '',
						message: 'Erro ao consultar a nota01, comunicar Administrador do Sistema' ,
						type: 'danger'
					});
					funcoes.limpaCamposItem(indexItem)
					loading.hide();
				}
			});
			
		},

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
			$(document).on("click", "#divEmissaoNF", function() {
				funcoes.consultaNotaPesq();
			});
			/**
			 * Busca os dados do Equipamento pelo numero de serie
			 */
			$(document).on("change", "#equipNumSerie", function() {
				
				if($("#equipNumSerie").val().trim() == ''){
					funcoes.limpaCamposEquipamento();
					$('#equipNumNotaFiscal').prop('readonly', true);
					funcoes.limpaCamposRevendaEquipamento();
					
				}else{
					console.log("EventFuncoes")
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
				
				$('#equipFilialNotaFiscal').val('');
				$('#equipNumNotaFiscal').val('');
				$('#equipCodProduto').val('');
				$('#equipDescricao').val('');
				$('#equipModelo').val('');
				$('#equipAcoplamento').val('');
				$('#equipDataVenda').val('');
				$('#equipDataEntrega').val('');
				$('#equipDataTerminoGarantia').val('');
				
				funcoes.limpaCamposRevendaEquipamento();

			});
			
			/**
			 * Busca os dados do Equipamento pelo numero de serie e num nota
			 */
			$(document).on("change", "#equipNumNotaFiscal", function() {
				
				if($("#equipNumSerie").val().trim() == ''){
					funcoes.limpaCamposEquipamento();
					funcoes.limpaCamposRevendaEquipamento();
					
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
			$(document).on("keydown", "#revContVendasTelefone", function(event) {	
				funcoes.mascaraTelefone('revContVendasTelefone', event);
			});
			$(document).on("keydown", "#revContPecasTelefone", function(event) {	
				funcoes.mascaraTelefone('revContPecasTelefone', event);
			});
			$(document).on("keydown", "#revContServicoTelefone", function(event) {	
				funcoes.mascaraTelefone('revContServicoTelefone', event);
			});
			$(document).on("keydown", "#revEntTecTelefone", function(event) {	
				funcoes.mascaraTelefone('revEntTecTelefone', event);
			});
			
			/*
			 * Protocolo de Recebimento do Cliente Final
			 */
			$(document).on("keydown", "#protoRecTelefone", function(event) {	
				funcoes.mascaraTelefone('protoRecTelefone', event);
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
						$('#protoRecAvariasIndiceItem___'+indexTbAvarias).val( indexTbAvarias );
						$('#protoRecAvariasImagemDescItem___'+indexTbAvarias).val('Imagem Avaria - índice ' + indexTbAvarias );
					}
					$('#divTabelaAvarias').show();
					$('#divMsgAnexoAvaria').show();
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
					$('#protoRecAvariasIndiceItem___'+indexTbAvarias).val( indexTbAvarias );
					$('#protoRecAvariasImagemDescItem___'+indexTbAvarias).val('Imagem Avaria - índice ' + indexTbAvarias );
				}else{
					FLUIGC.toast({ title: '', message: "É preciso preecher o campo 'Descrição' para adicionar uma nova avaria.", type: 'warning' });
				}
				
				
			});
			
			
			/*
			 * CLIENTE
			 */
			/**
			 * E-mail de solicitação para cadastro de cliente na base do Protheus
			 */
			 $(document).on("click", "#btnSolicCadCliente", function() {
				
				let html =  "<div class='fluig-style-guide'>" +
								"<div class='row'>"+
									"<div class='col-md-9' align='left'>"+
										"<label for='emailDestinatariosCadCliente'>E-mails destinatários (separados por ;)</label>" +
										"<input type='text' class='form-control' id='emailDestinatariosCadCliente' value='cadastros@gtsdobrasil.com.br;adm.posvendas@gtsdobrasil.com.br' />" +
									"</div>" +
									"<div class='col-md-3' align='left'>"+
										"<label >&nbsp;</label>" +
										"<button type='button' class='btn btn-primary btn-block' id='btnEnvEmailSolicCadCliente'>Solicitar Cadastro</button>"+
									"</div>" +
								"</div>"+
							"</div>";

				const modalEmailSolicitacaoCadCliente = FLUIGC.modal({
						title: 'Solicitação de Cadastro de Cliente',
						content: html,
						formModal: false,
						size: 'large',
						id: 'modal-EmailSolicitacaoCadCliente',
						actions: [{
									'label': 'Fechar',
									'autoClose': true
									}]
						}, function(err, data) {
							if(err) {
								FLUIGC.toast({ title: 'Erro:', message: err, type: 'danger' });
								loading.hide();
							} else {

								$('#btnEnvEmailSolicCadCliente').click(function() {

									let loading = FLUIGC.loading(window);
									loading.show();
									
									let emailDestinatarios = $('#emailDestinatariosCadCliente').val();
									let numFluig = $('#numFluig').val();
									let cliPais = '';
									if( $('#cliPais').val() == 'BRA' ){
										cliPais = 'Brasil';
									}else if( $('#cliPais').val() == 'PAR' ){
										cliPais = 'Paraguai';
									}
									let cliCpfCnpj = $('#cliCpfCnpj').val();
									let cliInscricaoEstadual = $('#cliInscricaoEstadual').val();
									let cliRUC = $('#cliRUC').val();
									let cliNomeCliente = $('#cliNomeCliente').val();
									let cliCEP = $('#cliCEP').val();
									let cliEndereco = $('#cliEndereco').val();
									let cliBairro = $('#cliBairro').val();
									let cliComplemento = $('#cliComplemento').val();
									let cliCidade = $('#cliCidade').val();
									let cliEstado = $('#cliEstadoHidden').val();
									let cliTelefone = $('#cliTelefone').val();
									let cliEmail = $('#cliEmail').val();

									const cstEmailSolicCadCliente = [
											{
												"_field": "emailDestinatarios",
												"_initialValue": emailDestinatarios,
												"_finalValue": "",
												"_type": 1,
												"_likeSearch": false
											},{
												"_field": "numFluig",
												"_initialValue": numFluig,
												"_finalValue": "",
												"_type": 1,
												"_likeSearch": false
											},{
												"_field": "cliPais",
												"_initialValue": cliPais,
												"_finalValue": "",
												"_type": 1,
												"_likeSearch": false
											},{
												"_field": "cliCpfCnpj",
												"_initialValue": cliCpfCnpj,
												"_finalValue": "",
												"_type": 1,
												"_likeSearch": false
											},{
												"_field": "cliInscricaoEstadual",
												"_initialValue": cliInscricaoEstadual,
												"_finalValue": "",
												"_type": 1,
												"_likeSearch": false
											},{
												"_field": "cliRUC",
												"_initialValue": cliRUC,
												"_finalValue": "",
												"_type": 1,
												"_likeSearch": false
											},{
												"_field": "cliNomeCliente",
												"_initialValue": cliNomeCliente,
												"_finalValue": "",
												"_type": 1,
												"_likeSearch": false
											},{
												"_field": "cliCEP",
												"_initialValue": cliCEP,
												"_finalValue": "",
												"_type": 1,
												"_likeSearch": false
											},{
												"_field": "cliEndereco",
												"_initialValue": cliEndereco,
												"_finalValue": "",
												"_type": 1,
												"_likeSearch": false
											},{
												"_field": "cliBairro",
												"_initialValue": cliBairro,
												"_finalValue": "",
												"_type": 1,
												"_likeSearch": false
											},{
												"_field": "cliComplemento",
												"_initialValue": cliComplemento,
												"_finalValue": "",
												"_type": 1,
												"_likeSearch": false
											},{
												"_field": "cliCidade",
												"_initialValue": cliCidade,
												"_finalValue": "",
												"_type": 1,
												"_likeSearch": false
											},{
												"_field": "cliEstado",
												"_initialValue": cliEstado,
												"_finalValue": "",
												"_type": 1,
												"_likeSearch": false
											},{
												"_field": "cliTelefone",
												"_initialValue": cliTelefone,
												"_finalValue": "",
												"_type": 1,
												"_likeSearch": false
											},{
												"_field": "cliEmail",
												"_initialValue": cliEmail,
												"_finalValue": "",
												"_type": 1,
												"_likeSearch": false
											}
										];

									const dataRequest = {
											"name": "dsEntTecEmailSolicCadCliente",
											"fields": [] ,
											"constraints": cstEmailSolicCadCliente,
											"order": []
									}	

									$.ajax({
										async: true,
										type: "POST",
										url: "/api/public/ecm/dataset/datasets",
										data: JSON.stringify(dataRequest),
										contentType: 'application/json',
										success: function (data, status, xhr) {
											if (data != null && data.content != null && data.content.values.length > 0) {
												const record = data.content.values[0];
												if(record.CODRET.trim() == '1'){
													FLUIGC.toast({message: record.MSGRET.trim() , type: 'success'});

													setTimeout(function(){ 
														modalEmailSolicitacaoCadCliente.remove();
													}, 900);
													
												}else{
													FLUIGC.toast({message: record.MSGRET.trim() , type: 'danger'});
												}

												setTimeout(function(){ 
													loading.hide();
												}, 1000);
											}
										},
										error: function(XMLHttpRequest, textStatus, errorThrown) {
											console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
											FLUIGC.toast({message: 'Erro ao disparar e-mail, comunique o Administrador do Sistema!', type: 'danger'});
											setTimeout(function(){ 
												loading.hide();
											}, 1000);
										}
									});
								});
							}
					});
			});
			
			/**
			 * Tira a mascara de CPF/CNPJ quando coloca o focos e estiver vazio
			 */
			$(document).on("focusin", "#cliCpfCnpj", function(e) {
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
				if( !$('#cliCpfCnpj').is('[readonly]') ) { 
					funcoes.mascaraCpfCnpj('cliCpfCnpj');
					
					//Se limpar tudo, tira mascara
					if (e.keyCode == 46 || e.keyCode == 8){
						if($('#cliCpfCnpj').val().trim() == ''){
							$("#cliCpfCnpj").unmask();
						}
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
				
				if ( !$('#cliCEP').is('[readonly]') ) { 
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
				}
				
			});
			/**
			 * Gatilho para mascara de Telefone
			 */
			$(document).on("keydown", "#cliTelefone", function(event) {	
				funcoes.mascaraTelefone('cliTelefone', event);
			});
			$(document).on("keydown", "#cliTelefonePesqSatisfacao", function(event) {	
				funcoes.mascaraTelefone('cliTelefonePesqSatisfacao', event);
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
				}else if(propRuralEstado.trim() == '' && $('#A1_PAIS').val() == "BRA" ){
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
			
			/**
			 * Gatilho para quando aprova a Entrega Técnica, e define se vai gerar o pagamento.
			 */
			$(document).on("change", "input:radio[name='entTecAprov']", function() {
				var entTecAprov = $("input:radio[name='entTecAprov']:checked").val();
				
				if(entTecAprov == 'aprovado'){
					//Só pode ter a opção de pagamento se o Solicitante foi Revenda e não for equipamento GreenSystem
					if( $('#tipoSolicitante').val() == 'Revenda' && $('#equipNumSerie').val().substring(0, 3) != 'FGS'){
						$('#divConfirmaGeracaoPagto').show();
					}
				}else if(entTecAprov == 'reprovado'){
					$('#divConfirmaGeracaoPagto').hide();
					$("input:radio[name='entTecGeracaoPagto']").prop( "checked", false );
				}
				
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
			
			
			/*
			 * CLIENTE
			 */
			/**
			 * Tira a mascara de CPF/CNPJ quando coloca o focos e estiver vazio
			 */
			$(document).on("focusin", "#OCCpfCnpj", function(e) {
				if( !$('#OCCpfCnpj').is('[readonly]') ) { 
					$("#OCCpfCnpj").unmask();
				}
			});
			$(document).on("focusout", "#OCCpfCnpj", function(e) {
				if( !$('#OCCpfCnpj').is('[readonly]') ) {
					funcoes.mascaraCpfCnpj('OCCpfCnpj');
				}
			});
			/**
			 * Transforma a mascara a Revenda para Pagamento em CPF ou CNPJ
			 */
			$(document).on("keyup", "#OCCpfCnpj", function(e) {
				if( !$('#OCCpfCnpj').is('[readonly]') ) { 
					funcoes.mascaraCpfCnpj('OCCpfCnpj');
					
					//Se limpar tudo, tira mascara
					if (e.keyCode == 46 || e.keyCode == 8){
						if($('#OCCpfCnpj').val().trim() == ''){
							$("#OCCpfCnpj").unmask();
						}
					}
				}
			});
			/**
			 * Gatilho de CPF/CNPJ da Revenda para Pagamento
			 * 
			 */
			$(document).on("change", "#OCCpfCnpj", function() {
				if($("#OCCpfCnpj").val().trim().length == 14 || $("#OCCpfCnpj").val().trim().length == 18){
					funcoes.consultaRevendaPagamento('cpfCnpj');
					
				}else{
					FLUIGC.toast({ title: '', message: 'O CPF/CNPJ não está preenchido corretamente!', type: 'warning' });
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
			
		funcoes.classificaServicoRevenda();		

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
		if($('#cliCpfCnpj').val().trim() != '' && $('#cliInscricaoEstadual').val().trim() != ''
			&& $('#cliCodigo').val().trim() == ''){
			funcoes.somenteLeituraCamposCliente(false);
		}
		
	}else if(CURRENT_STATE == FORMALIZA){
		
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
		if($('#cliCpfCnpj').val().trim() != '' && $('#cliInscricaoEstadual').val().trim() != ''
			&& $('#cliCodigo').val().trim() == ''){
			funcoes.somenteLeituraCamposCliente(false);
		}
		
	}else if(CURRENT_STATE == ANALISA_RETORNO_GTS){
		
		
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
		if($('#cliCpfCnpj').val().trim() != '' && $('#cliInscricaoEstadual').val().trim() != ''
			&& $('#cliCodigo').val().trim() == ''){
			funcoes.somenteLeituraCamposCliente(false);
		}
	}else if(CURRENT_STATE == REVENDA_NF_PGTO){
		funcoes.consultaNotaPesq();
	}else if(CURRENT_STATE == GTS_ANALISA_NF_PGTO){
		
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

