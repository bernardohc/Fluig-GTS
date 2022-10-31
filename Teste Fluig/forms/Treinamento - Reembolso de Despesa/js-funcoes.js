$(document).ready(function() {
	setTimeout(function() {
		funcoes.start();
	}, 100)

});
// Aqui cria as funcioes
var funcoes = (function() {
	var loading = FLUIGC.loading(window);
	var index = 0;
	return {
		start : function() {
			eventsFuncoes.setup();
		},

		/*
		 * Solicitação Reembolso
		 */

		consultaVendedor : function(matVendedor) {

			let
			filterFields = 'MATFLUIG,' + matVendedor;

			var loading = FLUIGC.loading(window);
			loading.show();

			$
					.ajax({
						type : "GET",
						dataType : "json",
						async : true,
						url : "/api/public/ecm/dataset/search?datasetId=dsReDespConsultaVendedor&filterFields="
								+ filterFields,
						success : function(data, status, xhr) {

							if (data != null && data.content != null
									&& data.content.length > 0) {
								const
								records = data.content;

								if (records[0].CODRET == "1") {
									var record = records[0];
									let
									nomeVendedor = record.NOME;
									let
									emailVendedor = record.EMAIL;

									$("#solNomeVendedor2").val(nomeVendedor);
									$("#solEmailVendedor2").val(emailVendedor);

								} else if (records[0].CODRET == "2") {
									FLUIGC.toast({
										title : '',
										message : records[0].MSGRET,
										type : 'warning'
									});

									$('#solNomeVendedor2').val('');
									$('#solEmailVendedor2').val('');
								}
							} else {
								FLUIGC
										.toast({
											title : '',
											message : 'Erro ao consultar vendedor, comunicar o Administrador do Sistema!',
											type : 'danger'
										});

								$('#solNomeVendedor2').val('');
								$('#solEmailVendedor2').val('');
							}

							setTimeout(function() {
								loading.hide();
							}, 1000);
						},
						error : function(XMLHttpRequest, textStatus,
								errorThrown) {
							console.log("dataset error", XMLHttpRequest,
									textStatus, errorThrown)
							FLUIGC
									.toast({
										title : '',
										message : 'Erro na consulta do vendedor, comunicar o Administrador do Sistema!',
										type : 'danger'
									});
							loading.hide();
						}
					});

		},

		outraDespesa : function() {
			let
			solTipoDespesa = $('#solTipoDespesa').val();
			console.log(solTipoDespesa)
			if (solTipoDespesa == 'Outro') {
				$('#divOutraDespesa').show();
			} else {
				$('#divOutraDespesa').hide();
				$('#solTipoDespesaOutro').val('');
			}
		},

		addLinhaDespesa : function() {
			var row = wdkAddChild('solTbDespesas');

			// $("#itSolValorReembolsoItem___" + row ).val('100,00');
		},

		calculaTotalReembolso : function() {
			// alert('vai calcular o reembolso');
			console.log('via console');

			var solValorReembolso = validafunctions
					.getFloatValue("solValorReembolso");
			var solQuantidade2 = Number($("#solQuantidade2").val());
			var solTotal = 0;

			if (solValorReembolso > 0 && solQuantidade2 > 0) {
				solTotal = (solValorReembolso * solQuantidade2);
			}

			$("#solTotal").val(solTotal.toFixed(2));
			validafunctions.setMoeda("solTotal", 2, false, '')
		},

		calculaTotalReembolsoPelaTabela : function() {
			let
			itSolValorReembolsoItem = 0;
			let
			total = 0;

			$("input[name*=itSolValorReembolsoItem___]").each(function(index) {
						var index = validafunctions.getPosicaoFilho($(this).attr("id"));

						var itSolValorReembolsoItem = validafunctions.getFloatValue("itSolValorReembolsoItem___"+ index);
						if (!isNaN(itSolValorReembolsoItem)) {
							total += itSolValorReembolsoItem;
						}
					});

			$("#solTotalReembolso").val(total.toFixed(2));
			validafunctions.setMoeda("solTotalReembolso", 2, false, '');
		},

		/*
		 * *Utils
		 */

		mascaraTelefone : function(idCampo) {
			$('#' + idCampo).unmask();
			if ($('#' + idCampo).val().replace(/[^0-9]/g, "").trim().length == 11) {// Celular
				// com
				// 9
				// dígitos
				// + 2
				// dígitos
				// DDD
				// e 4
				// da
				// máscara
				$('#' + idCampo).mask('(00) 00000-0009');
			} else {
				$('#' + idCampo).mask('(00) 0000-00009');
			}
		}

	}
})();

// Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {

			/*
			 * Solicitação Reembolso
			 */

			$(document).on("keyup blur", "#solTelefone", function() {

				funcoes.mascaraTelefone('solTelefone');
			});

			$(document).on(
					"keyup",
					"#solMatVendedor2",
					function() {

						$('#solMatVendedor2').val(
								$('#solMatVendedor2').val().toUpperCase());
					});

			$(document).on("change", "#solMatVendedor2", function() {
				let
				solMatVendedor2 = $('#solMatVendedor2').val();
				if (solMatVendedor2.trim() != "") {
					funcoes.consultaVendedor(solMatVendedor2);
				} else {
					$('#solNomeVendedor2').val('');
					$('#solEmailVendedor2').val('');
				}

			});

			$(document).on("change", "#solTipoDespesa", function() {
				funcoes.outraDespesa();
			});

			$(document).on("change", "#solValorReembolso", function() {
				// executa
				// alert('Alterado Valor reembolso!')
				funcoes.calculaTotalReembolso();
			});
			$(document).on("change", "#solQuantidade2", function() {
				// executa
				// alert('Alterado quantidade de reembolso!')
				funcoes.calculaTotalReembolso();
			});

			$(document).on("click","#addDespesa",function() {
								let	addNovoItem = true;
								$("input[name*=itSolValorReembolsoItem___]").each(function(index) {
									var index = validafunctions.getPosicaoFilho($(this).attr("id"));
									var itSolTipoDespesaItem = $("#itSolTipoDespesaItem___"+ index).val();

										if (itSolTipoDespesaItem.trim() == "") {
											addNovoItem = false;
										}
										});
								if (!addNovoItem) {
										FLUIGC.toast({title : '',message : "É preciso preencher o Tipo de Despesa anterior para adicionar um novo item.",type : 'warning'
								});
								} else {
									funcoes.addLinhaDespesa();
								}

							});

			$(document).on("change", ".itSolValorReembolsoItem", function() {
				funcoes.calculaTotalReembolsoPelaTabela();
			});
		}
	}
})();

function removeDespesa(oElement) {
	fnWdkRemoveChild(oElement);
	funcoes.calculaTotalReembolsoPelaTabela();
};

function loadForm() {

	window.parent.$("#breadcrumb").remove();
	// Aba Anexo
	window.parent.$("#processTabs").find("li").first().hide();
	window.parent.$("#processTabs").find("li").last().hide();
	window.parent.$("#textActivity").remove();
	// Botões
	window.parent.$('#wcm_widget').find("[data-back]").css("display", "none");
	window.parent.$('#wcm_widget').find("[data-back]").removeAttr("data-back");
	window.parent.$('#wcm_widget').find("[data-cancel]").css("display", "none");
	window.parent.$('#wcm_widget').find("[data-cancel]").removeAttr(
			"data-cancel");
	window.parent.$('#wcm_widget').find("[data-transfer]").css("display",
			"none");
	window.parent.$('#wcm_widget').find("[data-transfer]").removeAttr(
			"data-transfer");

	var today = new Date();

	if (CURRENT_STATE == INICIO_0) {

		FLUIGC.calendar('#solDataNotaFiscal', {
			language : 'pt-br',
			maxDate : today,
			pickDate : true,
			pickTime : false,
			defaultDate : today

		});

		funcoes.addLinhaDespesa()

	} else if (CURRENT_STATE == INICIO) {
		;

		FLUIGC.calendar('#solDataNotaFiscal', {
			language : 'pt-br',
			maxDate : today,
			pickDate : true,
			pickTime : false,
			defaultDate : today
		});

	} else if (CURRENT_STATE == AJUSTA_REEMBOLSO) {

		FLUIGC.calendar('#solDataNotaFiscal', {
			language : 'pt-br',
			maxDate : today,
			pickDate : true,
			pickTime : false
		});

	} else if (CURRENT_STATE == PAGAMENTO_REEMBOLSO) {
		FLUIGC.calendar('#dataPgtoReembolso', {
			language : 'pt-br',
			maxDate : today,
			pickDate : true,
			pickTime : false,
			defaultDate : today
		});
	} else if (CURRENT_STATE == AN_PGTO_REEMBOLSO) {
		FLUIGC.calendar('#dataPgtoReembolso', {
			language : 'pt-br',
			maxDate : today,
			pickDate : true,
			pickTime : false,
			defaultDate : today
		});
	}

}
