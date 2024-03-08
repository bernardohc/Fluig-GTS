
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
		 * DADOS DO EQUIPAMENTO
		 */
		limpaCamposEquipamento : function(){
			$('#equipNumSerie').val('');
			$('#equipDescricao').val('');
			$('#equipDataTerminoGarantia').val('');
		},

		limpaCamposRevendaEquipamento : function(){
			$('#revEquipCod').val('');
			$('#revEquipLoja').val('');
			$('#revEquipNomeFantasiaRevenda').val('');
			$('#revEquipTelefone').val('');
			$('#revEquipCidade').val('');
			$('#revEquipEstadoHidden').val('');
			$('#revEquipEstado').val('');
			
		},

		/**
		 * Busca dados do Equipamento e da Revenda.
		 */
		consultaEquipamento : function(){
			
			let equipNumSerie = $('#equipNumSerie').val().trim();
			
			//Tipo de filtro passado pelo usuário Administrativo GTS, necessáiro somente número de serie e se preciso o número da nota fiscal.
			filterFields = "equipNumSerie,"+ equipNumSerie;
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
	    		type: "GET",
	    		dataType: "json",
	    		async: true,
	    		url: "/api/public/ecm/dataset/search?datasetId=dsChamAtendConsultaEquipamento&filterFields="+filterFields,
	    	    success: function (data, status, xhr) {
	    	    	
	    	    	if (data != null && data.content != null && data.content.length > 0) {
	    	    		const records = data.content;
	    	    		
	    	    		if( records[0].CODRET == "1"){
	    		            var record = records[0];
	    					let equipCodProduto = record.EQPCODPRD.trim();
	    					let equipDescricao = record.EQPDESC.trim();
	    					let equipDataGarantia = record.EQPDTGARANTIA.trim();
	    					let revEquipCod = record.REVRAZAOSOCIAL.trim();
	    					let revEquipLoja = record.REVRAZAOSOCIAL.trim();
	    					let revEquipNomeFantasiaRevenda = record.REVRAZAOSOCIAL.trim();
	    					let revEquipTelefone = record.REVTELEFONE.trim();
	    					let revEquipCidade = record.REVCIDADE.trim();
	    					let revEquipEstado = record.REVESTADO.trim();
	    					
	    					
							$("#equipDescricao").val(equipDescricao);
							$("#equipDataTerminoGarantia").val(equipDataGarantia);

							$("#revEquipCod").val(revEquipCod);
							$("#revEquipLoja").val(revEquipLoja);
							$("#revEquipNomeFantasiaRevenda").val(revEquipNomeFantasiaRevenda);
							$("#revEquipTelefone").val(revEquipTelefone);
							$("#revEquipCidade").val(revEquipCidade);
							$("#revEquipEstadoHidden").val(revEquipEstado);
							$("#revEquipEstado").val(revEquipEstado);
							
	    				}else if (records[0].CODRET == "2"){
		    	    		messageToast({message: records[0].MSGRET}, 'warning');
		    	    		
		    				$('#equipDescricao').val('');
		    				$('#equipDataTerminoGarantia').val('');
		    	    		
		    	    		funcoes.limpaCamposRevendaEquipamento();
		    	    	}
	    	    	}else{
	    	    		messageToast({message: 'Erro ao consultar o equipamento, comunicar o Administrador do Sistema!'}, 'danger' );
	    	    		
						$('#equipDescricao').val('');
		    				$('#equipDataTerminoGarantia').val('');
	    	    		funcoes.limpaCamposRevendaEquipamento();
	    	    	}
	    	    	setTimeout(function(){ 
	    	    		loading.hide();
	    	    	}, 1000);
	    	    },
				error: function(XMLHttpRequest, textStatus, errorThrown) {
	    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					messageToast({message: 'Erro na consulta da equipamento, comunicar o Administrador do Sistema!'}, 'danger' );
	    	    	loading.hide();
				}
			});
			
		},

		//Falha
		addFalha : function(){
			
			const indexTbFalha = wdkAddChild('falTbFalha');

		},
		/*
		 * COMUNICAÇÃO
		 */
		addLinhaComunicacao : function(param){
			//ADICIONA LINHA PARA ATENDIMENTO
			var addLinhaComunicacao = true;
			$("input[name*=comIdItem___]").each(function(index){
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
	
				var comId = $('#comIdItem___' + index).val();
				var comData = $('#comDataItem___' + index).val();
				
				if(comId != "" && comData == ""){
					addLinhaComunicacao = false;
					
					if(param['tipoUsuario'] == "Suporte GTS"){
						$('textarea[name*=comComInternaItem___'+index+']').show();
					}else if(param['tipoUsuario'] == "Revenda"){
						$('textarea[name*=comComInternaItem___'+index+']').hide();
						$('textarea[name*=comComExternaItem___'+index+']').prev().hide();
						$('textarea[name*=comComExternaItem___'+index+']').hide();
						$('textarea[name*=comComExternaItem___'+index+']').prop('readonly', true);
					}else if(param['tipoUsuario'] == "Setor GTS"){
						$('textarea[name*=comComInternaItem___'+index+']').show();
						$('textarea[name*=comComExternaItem___'+index+']').prev().hide();
						$('textarea[name*=comComExternaItem___'+index+']').hide();
						$('textarea[name*=comComExternaItem___'+index+']').prop('readonly', true);
						$('textarea[name*=comComRevendaItem___'+index+']').prev().hide();
						$('textarea[name*=comComRevendaItem___'+index+']').hide();
						$('textarea[name*=comComRevendaItem___'+index+']').prop('readonly', true);
					}
				}
			});
			
			if(addLinhaComunicacao){
		    	let indexTbComunicacao = wdkAddChild('comTbComunicacao');
		    	
		    	let solStatus = $('#solStatus').val();
		    	let wkUser = getWKUser();
		    	let nomeUsuarioComunicacao = getNome(wkUser);
		    	
		    	$("#comIdItem___" + indexTbComunicacao ).val(indexTbComunicacao)
		    	$("#comUsuarioWKUserItem___" + indexTbComunicacao ).val(wkUser)
		    	$("#comUsuarioItem___" + indexTbComunicacao ).val(nomeUsuarioComunicacao)
		    	$("#comTipoUsuarioItem___" + indexTbComunicacao ).val(param['tipoUsuario'])
		    	$("#comStatusItem___" + indexTbComunicacao ).val(solStatus);
		    	
				if(param['tipoUsuario'] == "Suporte GTS"){
					$('textarea[name*=comComInternaItem___'+indexTbComunicacao+']').show();
				}else if(param['tipoUsuario'] == "Revenda"){
					$('textarea[name*=comComInternaItem___'+indexTbComunicacao+']').hide();
					$('textarea[name*=comComExternaItem___'+indexTbComunicacao+']').prev().hide();
		    		$('textarea[name*=comComExternaItem___'+indexTbComunicacao+']').hide();
		    		$('textarea[name*=comComExternaItem___'+indexTbComunicacao+']').prop('readonly', true);
		    	}else if(param['tipoUsuario'] == "Setor GTS"){
					$('textarea[name*=comComInternaItem___'+indexTbComunicacao+']').show();
					$('textarea[name*=comComExternaItem___'+indexTbComunicacao+']').prev().hide();
					$('textarea[name*=comComExternaItem___'+indexTbComunicacao+']').hide();
		    		$('textarea[name*=comComExternaItem___'+indexTbComunicacao+']').prop('readonly', true);
					$('textarea[name*=comComRevendaItem___'+indexTbComunicacao+']').prev().hide();
					$('textarea[name*=comComRevendaItem___'+indexTbComunicacao+']').hide();
		    		$('textarea[name*=comComRevendaItem___'+indexTbComunicacao+']').prop('readonly', true);
				}
			}
			
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
			* DADOS DO EQUIPAMENTO
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
					funcoes.limpaCamposRevendaEquipamento();
					
				}else{
					funcoes.consultaEquipamento();
				}
				
			});
			$(document).on("blur", "#equipNumSerie", function() {
				//Se for mobile, executa a função com o blur também
				if(isMobile == 'true'){		
					if($("#equipNumSerie").val().trim() == ''){
						funcoes.limpaCamposEquipamento();
						funcoes.limpaCamposRevendaEquipamento();
						
					}else{
						funcoes.consultaEquipamento();
					}
				}
			});
			
			/*
			* REVENDA
			*/
			/**
			 * Quando seleciona a opção de Revenda Vinculada
			 */
			$(document).on("change", "input:radio[name='revSolicicaoVinculada']", function() {
				let revSolicicaoVinculada = $("input:radio[name='revSolicicaoVinculada']:checked").val();

				if(revSolicicaoVinculada == 'sim'){
					$('#divRevendaVinculada').hide();
					
					$('#revEstado').val('')
					$('#revEstadoHidden').val('')
					window["revRevenda"].clear();
					reloadZoomFilterValues('revRevenda', 'tipoFiltro,limpar');
					$('#revCod').val('')
					$('#revLoja').val('')
					$('#revNomeFantasiaRevenda').val('')
					$('#revCidade').val('')
					$('#revTelefone').val('')
					
				}else if(revSolicicaoVinculada == 'nao'){
					$('#divRevendaVinculada').show();
				}
			});
			/**
			 * Gatilho para alimentar o estado no campo hidden e pesquisar o usuário de Suporte do Estado
			 */
			$(document).on("change", "#revEstado", function() {
				let revEstado = $('#revEstado').val();
				$('#revEstadoHidden').val( revEstado );
				
				if(revEstado != ''){
					//Limpa campos da Revenda
					$("#revCod").val('');
					$("#revLoja").val('');
					$("#revNomeFantasiaRevenda").val('');
					$("#revCidade").val('');
					$("#revTelefone").val('');
					window["revRevenda"].clear();

					//Busca as Revendas daquele estado
					/*
					A Regra é a seguinte:
					-Precisar ser usuário no Fluig, participante do grupo 000009 - Pós-Vendas - Entrega Técnica - Revenda 
					-Precisa terminar com a letra A o login
					-Pega o estado, pelos 2 primeiros caracteres do login
					-Cidade, E-mail e Telefone, busca do Protheus, após realizar o filtro acima
					*/
					reloadZoomFilterValues('revRevenda', 'getDadosProtheus,SIM,estado,' + $('#revEstado').val());


				}else{
					//Limpa campos da Revenda
					$("#revCod").val('');
					$("#revLoja").val('');
					$("#revNomeFantasiaRevenda").val('');
					$("#revCidade").val('');
					$("#revTelefone").val('');
					window["revRevenda"].clear();

					//Limpa o zoom de revenda
					reloadZoomFilterValues('revRevenda', 'tipoFiltro,limpar');
				}

				
			});
			/*
			* SOLICITAÇÃO
			*/
			$(document).on("change", "#solTipoSolicitacao", function() {
				let solTipoSolicitacao = $('#solTipoSolicitacao').val();
				
				if(solTipoSolicitacao == 'MP' || solTipoSolicitacao == 'PS'){
					//Se for Máquina Parada ou Pós-Safra
					$('#divFalha').show()
					$('#divTipoInformacao').hide()

					let qtdFalhas = 0;
					$("input[name*=falCodFamiliaItem___]").each(function(){
						let indexTbFalha = validafunctions.getPosicaoFilho($(this).attr("id"));
						qtdFalhas++;
					});

					//Se não tiver nenhuma linha, adiciona a primeira linha.
					if(qtdFalhas == 0){
						funcoes.addFalha();
					}

					$('#solTipoSolicitacaoHidden').val($('#solTipoSolicitacao').val())

				}else{
										
					let temFalhas = false;
					$("input[name*=falCodFamiliaItem___]").each(function(){
						temFalhas = true;
					});

					if(temFalhas){
						//Opção para quando troca de 'não' para 'sim' na falha, faz uma confirmação, antes de limpar toda a tabela.
						FLUIGC.message.confirm({
							message: `A tabela de descrição da falha está preenchida e será removida se o 'Tipo de Solicitação' for alterado.<br><br>Tem certeza que deseja alterar o 'Tipo de Solicitação'?`,
							title: 'Confirmação',
							labelYes: 'Sim',
							labelNo: 'Não',
						}, function (result) {
							console.log(result)
							if (result) {
								$('#divFalha').hide();
					
								$("input[name*=falCodFamiliaItem___]").each(function(){
									//Remove linhas  de Falha
									fnWdkRemoveChild(this);
								});

								if( solTipoSolicitacao == 'IN'){
									//Se for Informação
									$('#divTipoInformacao').show()
								}else{
									$('#divTipoInformacao').hide()
									$('#divFalha').hide()
								}

								$('#solTipoSolicitacaoHidden').val($('#solTipoSolicitacao').val())
							}else{
								//Para voltar a solicitação que estava antes, já que a resposta do modal foi negativa
								$('#solTipoSolicitacao').val($('#solTipoSolicitacaoHidden').val())
							}
						});
					}else{

						if( solTipoSolicitacao == 'IN'){
							//Se for Informação
							$('#divTipoInformacao').show()
						}else{
							$('#divTipoInformacao').hide()
							$('#divFalha').hide()
						}

						$('#solTipoSolicitacaoHidden').val($('#solTipoSolicitacao').val())
					}
				}
			});

			//Descrição da Falha
			$(document).on("click", "#divBtnAddFalha", function() {
				funcoes.addFalha();
			});

			/*
			* SOLICITANTE
			*/
			$(document).on("keyup blur", "#solTelefone", function() {	
				funcoes.mascaraTelefone('solTelefone');
			});
			/**
			 * Gatilho para alimentar o estado no campo hidden
			 */
			$(document).on("change", "#solEstado", function() {
				let solEstado = $('#solEstado').val();
				$('#solEstadoHidden').val( solEstado );

				if(solEstado != ''){
					var loading = FLUIGC.loading(window);
					loading.show();

					$("#solCidadeSelect").empty();
					$.ajax({
						async: true,
						dataType: "json",
						type: "GET",
						url: "/api/public/ecm/dataset/search?datasetId=dsCidade&filterFields=UF,"+solEstado,
						success : function(data) {
							if (data != null && data.content != null && data.content.length > 0) {
								const records = data.content;
								$("#solCidadeSelect").append("<option value=''></option>");
								for ( var index in records) {
									var record = records[index];
									$("#solCidadeSelect").append("<option value='" +  record.CODCIDADE + "'>" +  record.CIDADE + "</option>");
								}
							}
							loading.hide();
						},
						error: function (msg){
							// código omitido
							console.log(msg)
							loading.hide();
						}
					});
				}else{

					$('#solCidadeHidden').val('');
					$('#solCidade').val('');
					$("#solCidadeSelect").empty();
					$("#solCidadeSelect").append("<option value=''></option>");
				}
			});

			$(document).on("change", "#solCidadeSelect", function() {
				$('#solCidadeHidden').val( $('#solCidadeSelect').val() );
				$('#solCidade').val(  $('#solCidadeSelect option:selected').text() );
			});
			/*
			 * Comunicação
			 */
			/**
			 * Quando seleciona a opção 'Status'
			 */
			$(document).on("change", "#solStatus", function() {
				let solStatus = $('#solStatus').val().trim();
				
				$('#getStatus').text(solStatus);
				if(solStatus == 'Finalizado'){
					$('#divSolEncaminharSolicitacao').hide();
					$('#solEncaminharSolicitacao').val('');
					$('#divSolFinalizarSolicitacao').show();
					$('#divSolEncEmailRevendaFinalizado').show();
					
				}else{
					$('#divSolEncaminharSolicitacao').show();
					$('#divSolFinalizarSolicitacao').hide();
					$('#divSolEncEmailRevendaFinalizado').hide();
					$('#solFinalizarSolicitacao').prop('checked', false);
					
				}
				
				//Ajusta na tabela de comunicação o status da última linha
				$("input[name*=comIdItem___]").each(function(){
					let indexTbComunicacao = validafunctions.getPosicaoFilho($(this).attr("id"));

					let comIdItem = $('#comIdItem___' + indexTbComunicacao).val();
					let comDataItem = $('#comDataItem___' + indexTbComunicacao).val();
					
					if(comIdItem != "" &&  comDataItem == ""){
						$('#comStatusItem___' + indexTbComunicacao).val(solStatus);
					}
				});
				
			});

			
		}
	}
})();

function loadForm(){
	
	const today = new Date();
	
	if(CURRENT_STATE == INICIO_0)
	{	
		funcoes.mascaraTelefone('solTelefone');

	}else if(CURRENT_STATE == INICIO ){
		if( FORM_MODE == 'MOD'){
			funcoes.mascaraTelefone('solTelefone');


			var revSolicicaoVinculada = $("input:radio[name='revSolicicaoVinculada']:checked").val();
			if(revSolicicaoVinculada == 'nao'){
				//Recarrega Campo Zoom de Revenda
				reloadZoomFilterValues('revRevenda', 'getDadosProtheus,SIM,estado,' + $('#revEstado').val());
			}

			let solTipoSolicitacao = $('#solTipoSolicitacao').val();
			if(solTipoSolicitacao == 'MP' || solTipoSolicitacao == 'PS'){
				
				$("input[name*=falCodFamiliaItem___]").each(function(){
					let indexTbFalha = validafunctions.getPosicaoFilho($(this).attr("id"));
					
					let falCodFamiliaItem = $(`#falCodFamiliaItem___${indexTbFalha}`).val();
					let falCodFalhaGrupoMaquinaItem = $(`#falCodFalhaGrupoMaquinaItem___${indexTbFalha}`).val();
					if(falCodFamiliaItem != ''){
						//Modelo Máquina
						reloadZoomFilterValues(`falModeloMaquinaItem___${indexTbFalha}`, 'tipoFiltro,modelos,codFamilia,'+falCodFamiliaItem );
						
						//Grupo
						reloadZoomFilterValues(`falGrupoMaquinaItem___${indexTbFalha}`, 'tipoFiltro,grupo,codFamilia,'+falCodFamiliaItem );
						
						if(falCodFalhaGrupoMaquinaItem != ''){
							//Falha
							reloadZoomFilterValues(`falDescFalhaFalhaItem___${indexTbFalha}`, 'tipoFiltro,falha,codFamilia,' + falCodFamiliaItem +',codFalhaGrupo,'+falCodFalhaGrupoMaquinaItem );
						}
					}

				});
				
			}

			const solEstado = $('#solEstado').val()
			if($('#solEstado').val() != '') {

				var loading = FLUIGC.loading(window);
				loading.show();
				const solCidadeHidden = $('#solCidadeHidden').val()
				$("#solCidadeSelect").empty();
				$.ajax({
					async: true,
					dataType: "json",
					type: "GET",
					url: "/api/public/ecm/dataset/search?datasetId=dsCidade&filterFields=UF,"+solEstado,
					success : function(data) {
						if (data != null && data.content != null && data.content.length > 0) {
							const records = data.content;
							$("#solCidadeSelect").append("<option value=''></option>");
							for ( var index in records) {
								var record = records[index];
							
								let selected = ( solCidadeHidden == record.CODCIDADE ) ? true : false;
								$(`#solCidadeSelect`).append($('<option>', { 
									value: record.CODCIDADE,
									text : record.CIDADE,
									selected : selected 
								}));
							}
						}
						loading.hide();
					},
					error: function (msg){
						console.log(msg)
						loading.hide();
					}
				});
			}


		}
	}else if(CURRENT_STATE == SUPORTE_GTS){
		if( FORM_MODE != 'VIEW'){
			let parametro = [];
			parametro['tipoUsuario'] = 'Suporte GTS';
			funcoes.addLinhaComunicacao(parametro);
		}
		
	}else if(CURRENT_STATE == REVENDA){
		
		if( FORM_MODE != 'VIEW'){
			let param = [];
			param['tipoUsuario'] = 'Revenda';
			funcoes.addLinhaComunicacao(param);
		}
		
	}else if(CURRENT_STATE == SETOR_GTS){
		
		if( FORM_MODE != 'VIEW'){
			let param = [];
			param['tipoUsuario'] = 'Setor GTS';
			funcoes.addLinhaComunicacao(param);
		}
		
	}
	
	
}

function removeFalha(oElement){
	
	try {
		const indice = validafunctions.getPosicaoFilho($(oElement).closest('tr').find("input")[0].id);
        const falCodigoFalhaItem = $(`#falCodigoFalhaItem___${indice}`).val() || "";
        FLUIGC.message.confirm({
            message: `Deseja remover o registro de falha <b>${falCodigoFalhaItem}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não, quero cancelar',
        }, function (result) {
            if (result) {
            	fnWdkRemoveChild(oElement);
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função removeAtendimento")
        console.error(e)
    }
    
	
}

function showCamera() {
	let idByTimestamp = (new Date().getTime()).toString(32);
	JSInterface.showCamera(idByTimestamp + ' Anexo');
}