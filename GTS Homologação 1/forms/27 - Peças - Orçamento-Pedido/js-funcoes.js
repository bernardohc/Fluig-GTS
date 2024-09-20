
$(document).ready(function () {
	setTimeout(function () {
		funcoes.start();
	}, 100)
});

var funcoes = (function () {
	var loading = FLUIGC.loading(window);
	var index = 0;
	return {
		start: function () {
			eventsFuncoes.setup();
		},


		/*
		 * Cabeçalho do produto
		 */

		limpaCampos: function () {
			$("#orcProdCod").val('');
			$("#orcProdQtd").val('1');
			$("#orcProdDesc").val('');
			$("#orcProdDescUSA").val('');
			$("#orcProdCodAntigo").val('');
			$("#orcProdPrecoSugerido").val('');
			$("#orcProdPrecoVenda").val('');
			$("#orcProdPrecoCusto").val('');
			$("#orcPrecoTabelaDolar").val('');
			$("#orcProdPrecoCustoDolar").val('');
			$("#orcProdPrecoCustoCab").val('');
			$("#orcProdPrecoCustoCabDolar").val('');
			$("#orcProdEstoque").val('');
			$("#orcProdEmbalagem").val('');
			$("#orcProdPesoUnit").val('');
			$("#orcProdUnMedida").val('');
			$("#orcProdPrecoSugeridoMP").val('');
			$("#orcProdCurvaABC").val('');
			$("#orcProdCodCritico").val('');
			$("#orcProdRecompra").val('');
			$("#orcProdPercentAcresc").val('');
			$("#orcProdPrecoMin").val('');
			$("#orcProdNCM").val('');
			$("#orcProdIPI").val('');
			$("#orcProdAlqIPI").val('');
			$("#orcProdICMS").val('');
			$("#orcProdAlqICMS").val('');
			$("#orcProdICMSRet").val('');


		},

		limpaCamposCP: function () {

			$("#CPqtdOpcaoRecebimento").val('1');

			$('#CPLinhaOpcao2').hide();

			$('#CPLinhaOpcao3').hide();



			//Deixa habilitado o campo Qtd. da tabela de produtos
			$('.qtd-total-item').prop('readonly', false);

			//Oculta coluna de 1ª retirada
			$('.itCP1Ret').hide();
			//Oculta coluna de 2ª retirada
			$('.itCP2Ret').hide();
			//Oculta coluna de 3ª retirada
			$('.itCP3Ret').hide();

			$("input[name*=orcCodProdutoItem___]").each(function (index) {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));

				$("#orcQtdCP1RetItem___" + index).val('');
				$("#orcCP1RetTotalCustoItem___" + index).val('');

				$("#orcQtdCP2RetItem___" + index).val('');
				$("#orcCP2RetTotalCustoItem___" + index).val('');

				$("#orcQtdCP3RetItem___" + index).val('');
				$("#orcCP3RetTotalCustoItem___" + index).val('');

			});
		},

		condicoesPagamento: function () {

			window["zoomCondPagto"].disable(false);

			let tipoPedido = $('#tipoPedido').val();
			let totalCustoPedido = ($('#totalCustoPedido').val() == '') ? '0' : validafunctions.getFloatValue("totalCustoPedido");

			if (tipoPedido == 'PE') {
				//Pedido de Estoque
				reloadZoomFilterValues('zoomCondPagto', 'tipoPedido,' + tipoPedido + ',valorPedido,' + totalCustoPedido);

			}

			if (tipoPedido == 'CF' || tipoPedido == 'CP' || tipoPedido == 'PP' || tipoPedido == 'PG' || tipoPedido == 'MP') {
				//Pedido Promocional ou Pedido Garantia ou Máquina Parada
				//Vai travar pq só tem 1 tipo de condição de pagamento

				//Chama essa função, pq conforme o valor total do pedido, libera novas condições de pagamento
				let tipoPedido = $('#tipoPedido').val();
				var c1 = DatasetFactory.createConstraint("tipoPedido", tipoPedido, tipoPedido, ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("valorPedido", totalCustoPedido, totalCustoPedido, ConstraintType.MUST);

				var constraints = new Array(c1, c2);
				var datasetReturned = DatasetFactory.getDataset('dsOrcPedConsultaCondPgto', null, constraints, null)

				if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
					var records = datasetReturned.values;

					var record = records[0];
					let codCondPagto = record.codCondPagto;
					let descCondPagto = record.descCondPagto;

					$('#codCondPagto').val(codCondPagto);
					$('#condPagto').val(descCondPagto);
					window["zoomCondPagto"].setValue(descCondPagto);
				}
				//Trava o zoom com disable
				window["zoomCondPagto"].disable(true);
			}



		},

		addLinhaItem: function () {

			row = wdkAddChild('tbItensOrcamento');

			$("#orcCodProdutoItem___" + row).val($("#orcProdCod").val());

			$("#orcQtdItem___" + row).val($("#orcProdQtd").val());
			$("#orcEmbalagemItem___" + row).val($("#orcProdEmbalagem").val());

			$("#orcDescProdutoItem___" + row).val($("#orcProdDesc").val());
			$("#orcDescProdutoUSAItem___" + row).val($("#orcProdDescUSA").val());


			var qtdItem = Number($("#orcProdQtd").val());
			var orcProdPrecoVenda = validafunctions.getFloatValue("orcProdPrecoVenda");

			var orcPrecoUnitItem = orcProdPrecoVenda / qtdItem;
			$("#orcPrecoUnitItem___" + row).val(orcPrecoUnitItem.toFixed(2));
			validafunctions.setMoeda("orcPrecoUnitItem___" + row, 2, false, '')

			$("#orcPrecoTabelaItem___" + row).val($("#orcPrecoTabela").val())
			validafunctions.setMoeda("orcPrecoTabelaItem___" + row, 6, false, '')

			$("#orcPrecoTabelaDolarItem___" + row).val($("#orcPrecoTabelaDolar").val())
			validafunctions.setMoeda("orcPrecoTabelaDolarItem___" + row, 6, false, '')

			$("#orcPrecoSugeItem___" + row).val($("#orcProdPrecoSugerido").val())
			validafunctions.setMoeda("orcPrecoSugeItem___" + row, 2, false, '')

			$("#orcIPIItem___" + row).val($("#orcProdIPI").val())
			validafunctions.setMoeda("orcIPIItem___" + row, 2, false, '')

			$("#orcICMSItem___" + row).val($("#orcProdICMS").val())
			validafunctions.setMoeda("orcICMSItem___" + row, 2, false, '')

			$("#orcICMSRetItem___" + row).val($("#orcProdICMSRet").val())
			validafunctions.setMoeda("orcICMSRetItem___" + row, 2, false, '')

			$("#orcAlqIPIItem___" + row).val($("#orcProdAlqIPI").val())
			validafunctions.setPercentual("orcAlqIPIItem___" + row, 2, false)

			$("#orcAlqICMSItem___" + row).val($("#orcProdAlqICMS").val())
			validafunctions.setPercentual("orcAlqICMSItem___" + row, 2, false)

			$("#orcTotalItem___" + row).val('0')
			validafunctions.setMoeda("orcTotalItem___" + row, 2, false, '')

			$("#orcTotalCustoItem___" + row).val('0')
			validafunctions.setMoeda("orcTotalCustoItem___" + row, 2, false, '')

			$("#orcTotalCustoDolarItem___" + row).val('0')
			validafunctions.setMoeda("orcTotalCustoDolarItem___" + row, 2, false, '')

			$("#orcTotalCustoComImpItem___" + row).val('0')
			validafunctions.setMoeda("orcTotalCustoComImpItem___" + row, 2, false, '')

			$("#orcNCMItem___" + row).val($("#orcProdNCM").val())

			$("#orcPrecoMinItem___" + row).val($("#orcProdPrecoMin").val())
			validafunctions.setMoeda("orcPrecoMinItem___" + row, 2, false, '')

			$("#orcPrecoCustoItem___" + row).val($("#orcProdPrecoCusto").val())
			validafunctions.setMoeda("orcPrecoCustoItem___" + row, 6, false, '')

			$("#orcPrecoCustoDolarItem___" + row).val($("#orcProdPrecoCustoDolar").val())
			validafunctions.setMoeda("orcPrecoCustoDolarItem___" + row, 6, false, '')

			$("#orcPrecoCustoOrigItem___" + row).val($("#orcProdPrecoCusto").val())
			validafunctions.setMoeda("orcPrecoCustoOrigItem___" + row, 6, false, '')

			funcoes.calculaTotalItem(row);
			funcoes.calculaTotalCustoItem(row);

			funcoes.calculaTotalCustoItemDolar(row);

			if ($('#tipoPedido').val() == 'CP') {
				var orcTotalCustoItem = $("#orcTotalCustoItem___" + row).val();

				$("#orcQtdCP1RetItem___" + row).val($("#orcProdQtd").val());
				$("#orcCP1RetTotalCustoItem___" + row).val(orcTotalCustoItem);


				funcoes.calculaTotalPorRetiradaCP();

			}
		},

		consultaProdutoQtdUSAAssync: function (codProduto, Qtde, limparCampos, desc, flDesc) {


			$('#addItem').prop("disabled", true);

			var loading = FLUIGC.loading(window);
			loading.show();

			Qtde = (Qtde == "" ? 1 : Qtde);

			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProdutoUSAWS&filterFields=B1COD," + codProduto + ",QTD," + Qtde + ",A1COD," + $('#A1_COD').val() + ",A1LOJA," + $('#A1_LOJA').val(),
				data: "",
				success: function (data, status, xhr) {

					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						if (records[0].CODRET == "1") {
							var record = records[0];
							var COD = record.COD;
							var ZCODANT = record.ZCODANT;
							var ZDESCP = record.ZDESCP;
							var ZDESCPUSA = record.ZDESCPING;
							var TIPO = record.TIPO;
							var IPI = record.IPI;
							var PESO = record.PESO;
							var ESTOQUE = record.ESTOQUE;
							var EMBALAGEM = record.EMBALAGEM;
							var UM = record.UNMED;
							var CURVAABC = record.CURVAABC;
							var CODCRITICO = record.CODCRITICO;
							var RECOMPRA = record.RECOMPRA;
							var ICMS = record.ICMS;
							var ICMSRET = record.ICMSRET;
							var TABELA = record.PRCTABELA;
							var TABELADOLAR = record.PRCTABELADOL;
							var SUGERIDO = record.PRCSUGE;
							var PRECOVENDA = record.PRCSUGE;
							var NCM = record.POSIPINCM;
							var PRECOMIN = record.PRCMIN;
							var PRECOCUSTO = record.PRCCUSTO;
							var PRECOCUSTODOLAR = record.PRCCUSTODOL;
							var ALIQIPI = record.ALIQIPI
							var ALIQICMS = record.ALIQICMS

							if (COD != "") {
								$("#orcProdCod").val(COD);
							}
							if (ZCODANT != "") {
								$("#orcProdCodAntigo").val(ZCODANT);
							}
							if (ZDESCP != "") {
								$("#orcProdDesc").val(ZDESCP);
							}
							if (ZDESCPUSA != "") {
								$("#orcProdDescUSA").val(ZDESCPUSA);
							}
							if (IPI != "") {
								$("#orcProdIPI").val(IPI);
							}
							if (PESO != "") {
								$("#orcProdPesoUnit").val(PESO);
							}
							if (ESTOQUE != "") {
								$("#orcProdEstoque").val(ESTOQUE);
							}
							if (EMBALAGEM != "") {
								$("#orcProdEmbalagem").val(EMBALAGEM);
							}
							if (UM != "") {
								$("#orcProdUnMedida").val(UM);
							}
							if (CURVAABC != "") {
								$("#orcProdCurvaABC").val(CURVAABC);
							}
							if (CODCRITICO != "") {
								$("#orcProdCodCritico").val(CODCRITICO);
							}
							if (RECOMPRA != "") {
								$("#orcProdRecompra").val(RECOMPRA);
							}
							if (ICMS != "") {
								$("#orcProdICMS").val(ICMS);
							}
							if (ICMSRET != "") {
								$("#orcProdICMSRet").val(ICMSRET);
							}
							if (TABELA != "") {
								/**
								 * formatNumber(number, n, x, s, c)
								 * 
								 * @param number: numero que se deseja formatar
								 * @param integer n: quantidade de casas decimais
								 * @param integer x: quantidade de casas milhar
								 * @param mixed   s: separador de milhar
								 * @param mixed   c: separador decimal
								 */
								TABELA = formatNumber(TABELA, 6, 3, '.', ',')
								$("#orcPrecoTabela").val(TABELA);

							}
							if (TABELADOLAR != "") {
								/**
								 * formatNumber(number, n, x, s, c)
								 * 
								 * @param number: numero que se deseja formatar
								 * @param integer n: quantidade de casas decimais
								 * @param integer x: quantidade de casas milhar
								 * @param mixed   s: separador de milhar
								 * @param mixed   c: separador decimal
								 */
								TABELADOLAR = formatNumber(TABELADOLAR, 6, 3, '.', ',')
								$("#orcPrecoTabelaDolar").val(TABELADOLAR);

							}
							if (SUGERIDO != "") {
								$("#orcProdPrecoSugerido").val(SUGERIDO);
							}
							if (PRECOVENDA != "") {
								$("#orcProdPrecoVenda").val(PRECOVENDA);
							}
							if (NCM != "") {
								$("#orcProdNCM").val(NCM);
							}
							if (PRECOMIN != "") {
								$("#orcProdPrecoMin").val(PRECOMIN);
							}
							if (PRECOCUSTO != "") {
								PRECOCUSTO = formatNumber(PRECOCUSTO, 6, 3, '.', ',')
								$("#orcProdPrecoCusto").val(PRECOCUSTO);
								$("#orcProdPrecoCustoCab").val(PRECOCUSTO);
							}
							if (PRECOCUSTODOLAR != "") {
								PRECOCUSTODOLAR = formatNumber(PRECOCUSTODOLAR, 6, 3, '.', ',')
								$("#orcProdPrecoCustoDolar").val(PRECOCUSTODOLAR);
								$("#orcProdPrecoCustoCabDolar").val(PRECOCUSTODOLAR);
							}
							if (ALIQIPI != "") {
								$("#orcProdAlqIPI").val(ALIQIPI);
							}
							if (ALIQICMS != "") {
								$("#orcProdAlqICMS").val(ALIQICMS);
							}

							if ($("#orcProdQtd").val().trim() != '' && $("#orcProdQtd").val().trim() != '0') {
								$('#addItem').prop("disabled", false);
							}

						} else if (records[0].CODRET == "2") {
							var msg_erro_consulta_produto = $('#msg_erro_consulta_produto').text();
							FLUIGC.toast({ title: '', message: msg_erro_consulta_produto, type: 'danger' });
							console.log(records[0].MSG);
							funcoes.limpaCampos()

						}
					} else {
						var msg_produto_nao_existe = $('#msg_produto_nao_existe').text();
						FLUIGC.toast({ title: '', message: msg_produto_nao_existe, type: 'warning' });
						funcoes.limpaCampos()
					}
					if (limparCampos) {
						funcoes.limpaCampos();
					}
					setTimeout(function () {
						loading.hide();
					}, 1000);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					FLUIGC.toast({
						title: '',
						message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!',
						type: 'danger'
					});
					loading.hide();
				}
			});


		},

		consultaProdutoQtdAssync: function (codProduto, Qtde, limparCampos, desc, flDesc) {

			$('#addItem').prop("disabled", true);

			var loading = FLUIGC.loading(window);
			loading.show();

			//Função que consulta o Preço de Máquina Parada e PG com 50% de desconto
			funcoes.consultaProdutoQtdMPAssync($("#orcProdCod").val(), '1');


			var tipoPedido = "";
			tipoPedido = ($('#tipoPedido').val() != '' ? $('#tipoPedido').val() : '-');

			Qtde = (Qtde == "" ? 1 : Qtde);

			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProdutoWS&filterFields=B1COD," + codProduto + ",QTD," + Qtde + ",A1COD," + $('#A1_COD').val() + ",A1LOJA," + $('#A1_LOJA').val() + ",DESC," + desc + ",FLDESC," + flDesc + ",TPPEDIDO," + tipoPedido,
				data: "",
				success: function (data, status, xhr) {

					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						if (records[0].CODRET == "1") {
							var record = records[0];
							var COD = record.COD;
							var ZCODANT = record.ZCODANT;
							var ZDESCP = record.ZDESCP;
							var TIPO = record.TIPO;
							var IPI = record.IPI;
							var PESO = record.PESO;
							var ESTOQUE = record.ESTOQUE;
							var EMBALAGEM = record.EMBALAGEM;
							var UM = record.UNMED;
							var CURVAABC = record.CURVAABC;
							var CODCRITICO = record.CODCRITICO;
							var RECOMPRA = record.RECOMPRA;
							var ICMS = record.ICMS;
							var ICMSRET = record.ICMSRET;
							var TABELA = record.PRCTABELA;
							var SUGERIDO = record.PRCSUGE;
							var PRECOVENDA = record.PRCSUGE;
							var NCM = record.POSIPINCM;
							var PRECOMIN = record.PRCMIN;
							var PRECOCUSTO = record.PRCCUSTO;
							var ALIQIPI = record.ALIQIPI
							var ALIQICMS = record.ALIQICMS

							if (COD != "") {
								$("#orcProdCod").val(COD);
							}
							if (ZCODANT != "") {
								$("#orcProdCodAntigo").val(ZCODANT);
							}
							if (ZDESCP != "") {
								$("#orcProdDesc").val(ZDESCP);
							}
							if (IPI != "") {
								$("#orcProdIPI").val(IPI);
							}
							if (PESO != "") {
								$("#orcProdPesoUnit").val(PESO);
							}
							if (ESTOQUE != "") {
								$("#orcProdEstoque").val(ESTOQUE);
							}
							if (EMBALAGEM != "") {
								$("#orcProdEmbalagem").val(EMBALAGEM);
							}
							if (UM != "") {
								$("#orcProdUnMedida").val(UM);
							}
							if (CURVAABC != "") {
								$("#orcProdCurvaABC").val(CURVAABC);
							}
							if (CODCRITICO != "") {
								$("#orcProdCodCritico").val(CODCRITICO);
							}
							if (RECOMPRA != "") {
								$("#orcProdRecompra").val(RECOMPRA);
							}
							if (ICMS != "") {
								$("#orcProdICMS").val(ICMS);
							}
							if (ICMSRET != "") {
								$("#orcProdICMSRet").val(ICMSRET);
							}
							if (TABELA != "") {
								/**
								 * formatNumber(number, n, x, s, c)
								 * 
								 * @param number: numero que se deseja formatar
								 * @param integer n: quantidade de casas decimais
								 * @param integer x: quantidade de casas milhar
								 * @param mixed   s: separador de milhar
								 * @param mixed   c: separador decimal
								 */
								TABELA = formatNumber(TABELA, 6, 3, '.', ',')
								$("#orcPrecoTabela").val(TABELA);

							}
							if (SUGERIDO != "") {
								$("#orcProdPrecoSugerido").val(SUGERIDO);
							}
							if (PRECOVENDA != "") {
								$("#orcProdPrecoVenda").val(PRECOVENDA);
							}
							if (NCM != "") {
								$("#orcProdNCM").val(NCM);
							}
							if (PRECOMIN != "") {
								$("#orcProdPrecoMin").val(PRECOMIN);
							}
							if (PRECOCUSTO != "") {
								PRECOCUSTO = formatNumber(PRECOCUSTO, 6, 3, '.', ',')
								$("#orcProdPrecoCusto").val(PRECOCUSTO);
								$("#orcProdPrecoCustoCab").val(PRECOCUSTO);
							}

							$("#orcPrecoTabelaDolar").val('0,00');
							$("#orcProdPrecoCustoDolar").val('0,00');
							$("#orcProdPrecoCustoCabDolar").val('0,00');

							if (ALIQIPI != "") {
								$("#orcProdAlqIPI").val(ALIQIPI);
							}
							if (ALIQICMS != "") {
								$("#orcProdAlqICMS").val(ALIQICMS);
							}

							//Soma o valor de acréscimo
							var Percent = validafunctions.getFloatValue("orcProdPercentAcresc");
							if (!isNaN(Percent)) {
								funcoes.calculaPrecoVenda();
							}

							if ($("#orcProdQtd").val().trim() != '' && $("#orcProdQtd").val().trim() != '0') {
								$('#addItem').prop("disabled", false);
							}
						} else if (records[0].CODRET == "2") {

							FLUIGC.toast({ title: '', message: "Erro ao consultar o produto, comunicar o Administrador do Sistema!", type: 'danger' });
							console.log(records[0].MSG);
							funcoes.limpaCampos()

						}
					} else {
						FLUIGC.toast({ title: '', message: 'O código do produto informado não existe na base de dados!', type: 'warning' });
						funcoes.limpaCampos()
					}
					if (limparCampos) {
						funcoes.limpaCampos();
					}
					setTimeout(function () {
						loading.hide();
					}, 1000);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					FLUIGC.toast({
						title: '',
						message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!',
						type: 'danger'
					});
					loading.hide();
				}
			});


		},

		consultaProdutoQtdMPAssync: function (codProduto, Qtde) {
			var loading = FLUIGC.loading(window);
			loading.show();

			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProdutoWS&filterFields=B1COD," + codProduto + ",QTD,1,A1COD," + $('#A1_COD').val() + ",A1LOJA," + $('#A1_LOJA').val() + ",TPPEDIDO,MP",
				data: "",
				success: function (data, status, xhr) {
					if (data != null && data.content != null && data.content.length > 0) {


						const records = data.content;
						if (records[0].CODRET == "1") {
							var record = records[0];

							var SUGERIDOMP = record.PRCSUGE;
							var PRCCUSTOTMP = record.PRCCUSTOT;

							if (SUGERIDOMP != "") {
								$("#orcProdPrecoSugeridoMP").val(SUGERIDOMP);
							}

							if (PRCCUSTOTMP != "") {
								$("#orcProdCustoTotalItemMP").val(PRCCUSTOTMP);
							}

						}
					} else {
						//	    	    		FLUIGC.toast({ title: '', message: 'O codigo do produto informado não existe na base de dados!', type: 'warning' });
						funcoes.limpaCampos()
					}
					loading.hide();;
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					FLUIGC.toast({
						title: '',
						message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!',
						type: 'danger'
					});
					loading.hide();
				}
			});

		},

		consultaProdutoDesconto: function (row, codProduto, Qtde, desc, flDesc) {

			var loading = FLUIGC.loading(window);
			loading.show();
			var tipoPedido = "";
			tipoPedido = ($('#tipoPedido').val() != '' ? $('#tipoPedido').val() : '-');

			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProdutoWS&filterFields=B1COD," + codProduto + ",QTD," + Qtde + ",A1COD," + $('#A1_COD').val() + ",A1LOJA," + $('#A1_LOJA').val() + ",DESC," + desc + ",FLDESC," + flDesc + ",TPPEDIDO," + tipoPedido,
				data: "",
				success: function (data, status, xhr) {

					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						var icon = '';
						if (records[0].CODRET == "1") {
							var record = records[0];
							var IPI = record.IPI;
							var ICMS = record.ICMS;
							var ICMSRET = record.ICMSRET;
							var PRECOCUSTO = record.PRCCUSTO;
							var ALIQIPI = record.ALIQIPI
							var ALIQICMS = record.ALIQICMS


							$("#orcIPIItem___" + row).val(IPI)
							validafunctions.setMoeda("orcIPIItem___" + row, 2, false, '')

							$("#orcICMSItem___" + row).val(ICMS)
							validafunctions.setMoeda("orcICMSItem___" + row, 2, false, '')

							$("#orcICMSRetItem___" + row).val(ICMSRET)
							validafunctions.setMoeda("orcICMSRetItem___" + row, 2, false, '')

							$("#orcAlqIPIItem___" + row).val(ALIQIPI)
							validafunctions.setPercentual("orcAlqIPIItem___" + row, 2, false)

							$("#orcAlqICMSItem___" + row).val(ALIQICMS)
							validafunctions.setPercentual("orcAlqICMSItem___" + row, 2, false)

							$("#orcPrecoCustoItem___" + row).val(PRECOCUSTO)
							validafunctions.setMoeda("orcPrecoCustoItem___" + row, 6, false, '')

						}

					}

					/*APÓS FINALIZAR A REQUISICAO QUE RODA OS CALCULOS*/
					funcoes.calculaTotalCustoItem(row);
					if ($('#tipoPedido').val() == 'CP') {
						//Passa o parâmetro como 1, pq roda esse método quando trocou o tipo de pedido
						//e quando troca o tipo de pedido para CP, é somente a 1ª retirada que precisa recalcular
						funcoes.calculaTotalCustoCPItem(row, '1');
						funcoes.calculaTotalPorRetiradaCP();
					}
					setTimeout(function () {
						loading.hide();
					}, 700);

				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					FLUIGC.toast({
						title: '',
						message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!',
						type: 'danger'
					});
					loading.hide();
				}
			});


		},

		consultaProdutoPorItem: function (row, desc, flDesc) {

			var loading = FLUIGC.loading(window, {
				textMessage: 'Aguarde! Processando Itens...'
			});
			loading.show();

			var codProduto = $("#orcCodProdutoItem___" + row).val();
			if ($("#orcQtdItem___" + row).val().trim() == '') {
				$("#orcQtdItem___" + row).val('1');
			}
			var Qtde = Number($("#orcQtdItem___" + row).val());


			var tipoPedido = "";
			tipoPedido = ($('#tipoPedido').val() != '' ? $('#tipoPedido').val() : '-');

			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProdutoWS&filterFields=B1COD," + codProduto + ",QTD," + Qtde + ",A1COD," + $('#A1_COD').val() + ",A1LOJA," + $('#A1_LOJA').val() + ",DESC," + desc + ",FLDESC," + flDesc + ",TPPEDIDO," + tipoPedido,
				data: "",
				success: function (data, status, xhr) {

					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						if (records[0].CODRET == "1") {
							var record = records[0];

							var EMBALAGEM = record.EMBALAGEM;
							$("#orcEmbalagemItem___" + row).val(EMBALAGEM);

							var ZDESCP = record.ZDESCP;
							$("#orcDescProdutoItem___" + row).val(ZDESCP);

							var qtdItem = Number($("#orcQtdItem___" + row).val());
							var orcProdPrecoVenda = validafunctions.getFloatValueByValor(record.PRCSUGE);

							var orcPrecoUnitItem = orcProdPrecoVenda / qtdItem;
							$("#orcPrecoUnitItem___" + row).val(orcPrecoUnitItem.toFixed(2));
							validafunctions.setMoeda("orcPrecoUnitItem___" + row, 2, false, '')

							var TABELA = formatNumber(record.PRCTABELA, 6, 3, '.', ',')
							$("#orcPrecoTabelaItem___" + row).val(TABELA)
							validafunctions.setMoeda("orcPrecoTabelaItem___" + row, 6, false, '')

							var SUGERIDO = record.PRCSUGE;
							$("#orcPrecoSugeItem___" + row).val(SUGERIDO)
							validafunctions.setMoeda("orcPrecoSugeItem___" + row, 2, false, '')

							var IPI = record.IPI;
							$("#orcIPIItem___" + row).val(IPI)
							validafunctions.setMoeda("orcIPIItem___" + row, 2, false, '')

							var ICMS = record.ICMS;
							$("#orcICMSItem___" + row).val(ICMS)
							validafunctions.setMoeda("orcICMSItem___" + row, 2, false, '')

							var ICMSRET = record.ICMSRET;
							$("#orcICMSRetItem___" + row).val(ICMSRET)
							validafunctions.setMoeda("orcICMSRetItem___" + row, 2, false, '')

							var ALIQIPI = record.ALIQIPI
							$("#orcAlqIPIItem___" + row).val(ALIQIPI)
							validafunctions.setPercentual("orcAlqIPIItem___" + row, 2, false)

							var ALIQICMS = record.ALIQICMS
							$("#orcAlqICMSItem___" + row).val(ALIQICMS)
							validafunctions.setPercentual("orcAlqICMSItem___" + row, 2, false)

							$("#orcTotalItem___" + row).val('0')
							validafunctions.setMoeda("orcTotalItem___" + row, 2, false, '')

							$("#orcTotalCustoItem___" + row).val('0')
							validafunctions.setMoeda("orcTotalCustoItem___" + row, 2, false, '')

							$("#orcTotalCustoDolarItem___" + row).val('0')
							validafunctions.setMoeda("orcTotalCustoDolarItem___" + row, 2, false, '')

							$("#orcTotalCustoComImpItem___" + row).val('0')
							validafunctions.setMoeda("orcTotalCustoComImpItem___" + row, 2, false, '')

							var NCM = record.POSIPINCM;
							$("#orcNCMItem___" + row).val(NCM)

							var PRECOMIN = record.PRCMIN;
							$("#orcPrecoMinItem___" + row).val(PRECOMIN)
							validafunctions.setMoeda("orcPrecoMinItem___" + row, 2, false, '')

							var PRECOCUSTO = formatNumber(record.PRCCUSTO, 6, 3, '.', ',')
							$("#orcPrecoCustoItem___" + row).val(PRECOCUSTO)
							validafunctions.setMoeda("orcPrecoCustoItem___" + row, 6, false, '')

							$("#orcPrecoCustoDolarItem___" + row).val('0,00')
							validafunctions.setMoeda("orcPrecoCustoDolarItem___" + row, 6, false, '')

							$("#orcPrecoCustoOrigItem___" + row).val(PRECOCUSTO)
							validafunctions.setMoeda("orcPrecoCustoOrigItem___" + row, 6, false, '')


							//Realiza cálculo de totais
							funcoes.calculaTotalItem(row);
							funcoes.calculaTotalCustoItem(row);
							funcoes.calculaTotalCustoItemDolar(row);


							if ($('#tipoPedido').val() == 'CP') {
								//Passa o parâmetro como 1, pq roda esse método quando trocou o tipo de pedido
								//e quando troca o tipo de pedido para CP, é somente a 1ª retirada que precisa recalcular
								funcoes.calculaTotalCustoCPItem(row, '1');
								funcoes.calculaTotalPorRetiradaCP();
							}
						}
					} else {
						FLUIGC.toast({ title: '', message: 'O código de produto <b>' + codProduto + '</b> não existe na base de dados!<br>Favor entrar em contato com a GTS.', type: 'danger' });
					}

					//Mesmo não retornando como CODRET 1 é dados como processado, pois pode ser que esse código de produto não localizou.
					//Para cada consulta de item, é marcada que foi processada (buscado informações do produto e alimentado na tabela)
					//Após todas serem precessadas, irá inserir no campo itensProcessados como true e a data e hora
					//Finalizado isso, é parado o loading
					$("#orcItemProcessadoItem___" + row).val('true');
					var tudoProcessado = true;
					$("input[name*=orcCodProdutoItem___]").each(function (index) {
						index = validafunctions.getPosicaoFilho($(this).attr("id"));
						let orcItemProcessadoItem = $("#orcItemProcessadoItem___" + index).val().trim();

						if (orcItemProcessadoItem == '') {
							tudoProcessado = false;
						}

					});

					if (tudoProcessado) {
						$('#itensProcessados').val('true');
						$('#dataItensProcessados').val(dataHoraAtual());

						setTimeout(function () {
							loading.hide();
						}, 1000);
					}

				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					FLUIGC.toast({
						title: '',
						message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!',
						type: 'danger'
					});
					loading.hide();
				}
			});


		},

		consultaProdutoUSAPorItem: function (row) {

			var loading = FLUIGC.loading(window, {
				textMessage: 'Wait! Processing Items...'
			});
			loading.show();

			var codProduto = $("#orcCodProdutoItem___" + row).val();
			if ($("#orcQtdItem___" + row).val().trim() == '') {
				$("#orcQtdItem___" + row).val('1');
			}
			var Qtde = Number($("#orcQtdItem___" + row).val());


			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProdutoUSAWS&filterFields=B1COD," + codProduto + ",QTD," + Qtde + ",A1COD," + $('#A1_COD').val() + ",A1LOJA," + $('#A1_LOJA').val(),
				data: "",
				success: function (data, status, xhr) {

					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						if (records[0].CODRET == "1") {
							var record = records[0];

							var EMBALAGEM = record.EMBALAGEM;
							$("#orcEmbalagemItem___" + row).val(EMBALAGEM);

							var ZDESCP = record.ZDESCP;
							$("#orcDescProdutoItem___" + row).val(ZDESCP);
							var ZDESCPUSA = record.ZDESCPING;
							$("#orcDescProdutoUSAItem___" + row).val(ZDESCPUSA);

							var qtdItem = Number($("#orcQtdItem___" + row).val());
							var orcProdPrecoVenda = validafunctions.getFloatValueByValor(record.PRCSUGE);

							var orcPrecoUnitItem = orcProdPrecoVenda / qtdItem;
							$("#orcPrecoUnitItem___" + row).val(orcPrecoUnitItem.toFixed(2));
							validafunctions.setMoeda("orcPrecoUnitItem___" + row, 2, false, '')

							var TABELA = formatNumber(record.PRCTABELA, 6, 3, '.', ',')
							$("#orcPrecoTabelaItem___" + row).val(TABELA)
							validafunctions.setMoeda("orcPrecoTabelaItem___" + row, 6, false, '')

							var TABELADOLAR = formatNumber(record.PRCTABELADOL, 6, 3, '.', ',')
							$("#orcPrecoTabelaDolarItem___" + row).val(TABELADOLAR)
							validafunctions.setMoeda("orcPrecoTabelaDolarItem___" + row, 6, false, '')

							var SUGERIDO = record.PRCSUGE;
							$("#orcPrecoSugeItem___" + row).val(SUGERIDO)
							validafunctions.setMoeda("orcPrecoSugeItem___" + row, 2, false, '')

							var IPI = record.IPI;
							$("#orcIPIItem___" + row).val(IPI)
							validafunctions.setMoeda("orcIPIItem___" + row, 2, false, '')

							var ICMS = record.ICMS;
							$("#orcICMSItem___" + row).val(ICMS)
							validafunctions.setMoeda("orcICMSItem___" + row, 2, false, '')

							var ICMSRET = record.ICMSRET;
							$("#orcICMSRetItem___" + row).val(ICMSRET)
							validafunctions.setMoeda("orcICMSRetItem___" + row, 2, false, '')

							var ALIQIPI = record.ALIQIPI
							$("#orcAlqIPIItem___" + row).val(ALIQIPI)
							validafunctions.setPercentual("orcAlqIPIItem___" + row, 2, false)

							var ALIQICMS = record.ALIQICMS
							$("#orcAlqICMSItem___" + row).val(ALIQICMS)
							validafunctions.setPercentual("orcAlqICMSItem___" + row, 2, false)

							$("#orcTotalItem___" + row).val('0')
							validafunctions.setMoeda("orcTotalItem___" + row, 2, false, '')

							$("#orcTotalCustoItem___" + row).val('0')
							validafunctions.setMoeda("orcTotalCustoItem___" + row, 2, false, '')

							$("#orcTotalCustoDolarItem___" + row).val('0')
							validafunctions.setMoeda("orcTotalCustoDolarItem___" + row, 2, false, '')

							$("#orcTotalCustoComImpItem___" + row).val('0')
							validafunctions.setMoeda("orcTotalCustoComImpItem___" + row, 2, false, '')

							var NCM = record.POSIPINCM;
							$("#orcNCMItem___" + row).val(NCM)

							var PRECOMIN = record.PRCMIN;
							$("#orcPrecoMinItem___" + row).val(PRECOMIN)
							validafunctions.setMoeda("orcPrecoMinItem___" + row, 2, false, '')

							var PRECOCUSTO = formatNumber(record.PRCCUSTO, 6, 3, '.', ',')
							$("#orcPrecoCustoItem___" + row).val(PRECOCUSTO)
							validafunctions.setMoeda("orcPrecoCustoItem___" + row, 6, false, '')

							var PRECOCUSTODOLAR = formatNumber(record.PRCCUSTODOL, 6, 3, '.', ',')
							$("#orcPrecoCustoDolarItem___" + row).val(PRECOCUSTODOLAR)
							validafunctions.setMoeda("orcPrecoCustoDolarItem___" + row, 6, false, '')

							$("#orcPrecoCustoOrigItem___" + row).val(PRECOCUSTO)
							validafunctions.setMoeda("orcPrecoCustoOrigItem___" + row, 6, false, '')


							//Realiza cálculo de totais
							funcoes.calculaTotalItem(row);
							funcoes.calculaTotalCustoItem(row);
							funcoes.calculaTotalCustoItemDolar(row);
						}

					} else {
						FLUIGC.toast({ title: '', message: 'The product code <b>' + codProduto + '</b> does not exist in the database!', type: 'danger' });
					}

					//Mesmo não retornando como CODRET 1 é dados como processado, pois pode ser que esse código de produto não localizou.
					//Para cada consulta de item, é marcada que foi processada (buscado informações do produto e alimentado na tabela)
					//Após todas serem precessadas, irá inserir no campo itensProcessados como true e a data e hora
					//Finalizado isso, é parado o loading
					$("#orcItemProcessadoItem___" + row).val('true');
					var tudoProcessado = true;
					$("input[name*=orcCodProdutoItem___]").each(function (index) {
						index = validafunctions.getPosicaoFilho($(this).attr("id"));
						let orcItemProcessadoItem = $("#orcItemProcessadoItem___" + index).val().trim();

						if (orcItemProcessadoItem == '') {
							tudoProcessado = false;
						}

					});

					if (tudoProcessado) {
						$('#itensProcessados').val('true');
						$('#dataItensProcessados').val(dataHoraAtual());

						setTimeout(function () {
							loading.hide();
						}, 1000);
					}


				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					FLUIGC.toast({
						title: '',
						message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!',
						type: 'danger'
					});
					loading.hide();
				}
			});


		},

		calculaTotalItem: function (index) {

			var qtdItem = Number($("#orcQtdItem___" + index).val());
			var valUnItem = validafunctions.getFloatValue("orcPrecoUnitItem___" + index);
			validafunctions.setMoeda("orcPrecoUnitItem___" + index, 2, false, '');

			if (qtdItem > 0) {

				var totalItem = (valUnItem * qtdItem);

				$("#orcTotalItem___" + index).val(totalItem.toFixed(2));
				validafunctions.setMoeda("orcTotalItem___" + index, 2, false, '')

			}


			funcoes.calculaTotal();

		},

		calculaTotal: function () {

			var totalItensUn = 0;
			var totalIPIItens = 0;
			var totalICMSItens = 0;
			var totalICMSRetItens = 0;
			var totalItensComDesc = 0;
			$("input[name*=orcCodProdutoItem___]").each(function (index) {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));

				var qtdItem = Number($("#orcQtdItem___" + index).val());
				var valIPI = validafunctions.getFloatValue("orcIPIItem___" + index);
				var valICMS = validafunctions.getFloatValue("orcICMSItem___" + index);
				var valICMSRet = validafunctions.getFloatValue("orcICMSRetItem___" + index);
				var valUnItem = validafunctions.getFloatValue("orcPrecoUnitItem___" + index);
				var valTotalItem = validafunctions.getFloatValue("orcTotalItem___" + index);

				//Soma Valor Original
				if (!isNaN(valTotalItem)) {
					totalItensUn += valTotalItem;
				}

				if (!isNaN(valIPI)) {
					totalIPIItens += (valIPI)
				}

				if (!isNaN(valICMS)) {
					totalICMSItens += (valICMS)
				}

				if (!isNaN(valICMSRet)) {
					totalICMSRetItens += (valICMSRet)
				}


			});

			$("#totalPedido").val(totalItensUn.toFixed(2));
			validafunctions.setMoeda("totalPedido", 2, false, '')
			$("#totalIPI").val(totalIPIItens.toFixed(2));
			validafunctions.setMoeda("totalIPI", 2, false, '')
			$("#totalICMS").val(totalICMSItens.toFixed(2));
			validafunctions.setMoeda("totalICMS", 2, false, '')
			$("#totalICMSRet").val(totalICMSRetItens.toFixed(2));
			validafunctions.setMoeda("totalICMSRet", 2, false, '')

		},



		calculaTotalCustoItem: function (index) {
			var qtdItem = Number($("#orcQtdItem___" + index).val());
			var valCustoItem = validafunctions.getFloatValue("orcPrecoCustoItem___" + index);
			var totalCustoComImpostoItem = 0;

			if (qtdItem > 0) {

				//Mantém o calculo de custo do item sem imposto, pq é o que será levado para o Protheus
				var totalCustoItem = (valCustoItem * qtdItem);
				//Colocado o Math.round para o caso do arredondamento da 3 casa decimal com final 5 que está arredondando para baixa
				//Por exemplo: Produto com valor final de 957,195, está sendo enviado como 957,19 e deveria ser 957,20
				//https://pt.stackoverflow.com/questions/324385/problema-utilizando-tofixed-para-arredondar-valor
				//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/round
				totalCustoItem = Math.round(totalCustoItem * 100) / 100;

				//https://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding
				//				$("#orcTotalCustoItem___"+index).val(toFixed(totalCustoItem, 2));


				$("#orcTotalCustoItem___" + index).val(totalCustoItem.toFixed(2));
				validafunctions.setMoeda("orcTotalCustoItem___" + index, 2, false, '')

				var valIPI = validafunctions.getFloatValue("orcIPIItem___" + index);
				var valICMSRet = validafunctions.getFloatValue("orcICMSRetItem___" + index);


				if (!isNaN(totalCustoItem) && !isNaN(valIPI) && !isNaN(valICMSRet)) {
					totalCustoComImpostoItem = (totalCustoItem + valIPI + valICMSRet);
				}

				$("#orcTotalCustoComImpItem___" + index).val(totalCustoComImpostoItem.toFixed(2));
				validafunctions.setMoeda("orcTotalCustoComImpItem___" + index, 2, false, '')

			} else {
				//Se a quantidade for 0 ou vazia, seta o custo total do item daquela como 0
				$("#orcTotalCustoItem___" + index).val('0');
				validafunctions.setMoeda("orcTotalCustoItem___" + index, 2, false, '');

				$("#orcTotalCustoComImpItem___" + index).val('0');
				validafunctions.setMoeda("orcTotalCustoComImpItem___" + index, 2, false, '')
			}


			funcoes.calculaTotalCusto();
		},

		calculaTotalCustoItemDolar: function (index) {
			var qtdItem = Number($("#orcQtdItem___" + index).val());
			var valCustoDolarItem = validafunctions.getFloatValue("orcPrecoCustoDolarItem___" + index);
			var totalCustoComImpostoItem = 0;

			if (qtdItem > 0) {

				//Mantém o calculo de custo do item sem imposto, pq é o que será levado para o Protheus
				var totalCustoDolarItem = (valCustoDolarItem * qtdItem);
				//Colocado o Math.round para o caso do arredondamento da 3 casa decimal com final 5 que está arredondando para baixa
				//Por exemplo: Produto com valor final de 957,195, está sendo enviado como 957,19 e deveria ser 957,20
				//https://pt.stackoverflow.com/questions/324385/problema-utilizando-tofixed-para-arredondar-valor
				//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/round
				totalCustoDolarItem = Math.round(totalCustoDolarItem * 100) / 100;

				//https://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding
				//				$("#orcTotalCustoItem___"+index).val(toFixed(totalCustoItem, 2));

				$("#orcTotalCustoDolarItem___" + index).val(totalCustoDolarItem.toFixed(2));
				validafunctions.setMoeda("orcTotalCustoDolarItem___" + index, 2, false, '')

			} else {
				//Se a quantidade for 0 ou vazia, seta o custo total do item daquela como 0
				$("#orcTotalCustoDolarItem___" + index).val('0');
				validafunctions.setMoeda("orcTotalCustoDolarItem___" + index, 2, false, '');

			}


			funcoes.calculaTotalCustoDolar();
		},

		calculaTotalCustoCPItem: function (index, campoQtdCP) {

			var qtdItem = 0;
			if (campoQtdCP == '1') {
				qtdItem = Number($("#orcQtdCP1RetItem___" + index).val());
			} else if (campoQtdCP == '2') {
				qtdItem = Number($("#orcQtdCP2RetItem___" + index).val());
			} else if (campoQtdCP == '3') {
				qtdItem = Number($("#orcQtdCP3RetItem___" + index).val());
			}

			var valCustoItem = validafunctions.getFloatValue("orcPrecoCustoItem___" + index);

			if (qtdItem > 0) {

				//Cálculo de custo do item sem imposto, pq é o que será levado para o Protheus
				var totalCustoItem = (valCustoItem * qtdItem);
				//Colocado o Math.round para o caso do arredondamento da 3 casa decimal com final 5 que está arredondando para baixa
				//Por exemplo: Produto com valor final de 957,195, está sendo enviado como 957,19 e deveria ser 957,20
				//https://pt.stackoverflow.com/questions/324385/problema-utilizando-tofixed-para-arredondar-valor
				//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/round
				totalCustoItem = Math.round(totalCustoItem * 100) / 100;

				if (campoQtdCP == '1') {
					$("#orcCP1RetTotalCustoItem___" + index).val(totalCustoItem.toFixed(2));
					validafunctions.setMoeda("orcCP1RetTotalCustoItem___" + index, 2, false, '');
				} else if (campoQtdCP == '2') {
					$("#orcCP2RetTotalCustoItem___" + index).val(totalCustoItem.toFixed(2));
					validafunctions.setMoeda("orcCP2RetTotalCustoItem___" + index, 2, false, '');
				} else if (campoQtdCP == '3') {
					$("#orcCP3RetTotalCustoItem___" + index).val(totalCustoItem.toFixed(2));
					validafunctions.setMoeda("orcCP3RetTotalCustoItem___" + index, 2, false, '');
				}
			} else {
				//Se a quantidade for 0 ou vazia, seta o custo total do item daquela retirada como 0
				if (campoQtdCP == '1') {
					$("#orcCP1RetTotalCustoItem___" + index).val('0');
					validafunctions.setMoeda("orcCP1RetTotalCustoItem___" + index, 2, false, '');
				} else if (campoQtdCP == '2') {
					$("#orcCP2RetTotalCustoItem___" + index).val('0');
					validafunctions.setMoeda("orcCP2RetTotalCustoItem___" + index, 2, false, '');
				} else if (campoQtdCP == '3') {
					$("#orcCP3RetTotalCustoItem___" + index).val('0');
					validafunctions.setMoeda("orcCP3RetTotalCustoItem___" + index, 2, false, '');
				}
			}

		},

		calculaTotalPorRetiradaCP: function () {

			var totalCP1Retirada = 0;
			var totalCP2Retirada = 0;
			var totalCP3Retirada = 0;

			$("input[name*=orcCodProdutoItem___]").each(function (index) {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));

				var orcCP1RetTotalCustoItem = validafunctions.getFloatValue("orcCP1RetTotalCustoItem___" + index);
				var orcCP2RetTotalCustoItem = validafunctions.getFloatValue("orcCP2RetTotalCustoItem___" + index);
				var orcCP3RetTotalCustoItem = validafunctions.getFloatValue("orcCP3RetTotalCustoItem___" + index);

				var orcQtdItem = Number($("#orcQtdItem___" + index).val());
				var orcQtdCP1RetItem = Number($("#orcQtdCP1RetItem___" + index).val());
				var orcQtdCP2RetItem = Number($("#orcQtdCP2RetItem___" + index).val());
				var orcQtdCP3RetItem = Number($("#orcQtdCP3RetItem___" + index).val());
				var orcIPIItem = validafunctions.getFloatValue("orcIPIItem___" + index);
				var orcICMSRetItem = validafunctions.getFloatValue("orcICMSRetItem___" + index);
				var orcIPIRet1Item = 0;
				var orcIPIRet2Item = 0;
				var orcIPIRet3Item = 0;

				//Soma Valor Original
				if (!isNaN(orcCP1RetTotalCustoItem)) {
					totalCP1Retirada += orcCP1RetTotalCustoItem;
				}
				if (orcQtdCP1RetItem > 0) {
					orcIPIRet1Item = (orcIPIItem * orcQtdCP1RetItem) / orcQtdItem;
					totalCP1Retirada += orcIPIRet1Item;
				}

				if (!isNaN(orcCP2RetTotalCustoItem)) {
					totalCP2Retirada += orcCP2RetTotalCustoItem;
				}
				if (orcQtdCP2RetItem > 0) {
					orcIPIRet2Item = (orcIPIItem * orcQtdCP2RetItem) / orcQtdItem;
					totalCP2Retirada += orcIPIRet2Item;
				}

				if (!isNaN(orcCP3RetTotalCustoItem)) {
					totalCP3Retirada += orcCP3RetTotalCustoItem;
				}
				if (orcQtdCP3RetItem > 0) {
					orcIPIRet3Item = (orcIPIItem * orcQtdCP3RetItem) / orcQtdItem;
					totalCP3Retirada += orcIPIRet3Item;
				}

			});

			$("#CPValor_1").val(totalCP1Retirada.toFixed(2));
			validafunctions.setMoeda("CPValor_1", 2, false, '');

			$("#CPValor_2").val(totalCP2Retirada.toFixed(2));
			validafunctions.setMoeda("CPValor_2", 2, false, '');

			$("#CPValor_3").val(totalCP3Retirada.toFixed(2));
			validafunctions.setMoeda("CPValor_3", 2, false, '');

		},

		calculaTotalCusto: function () {

			var totalCustoItensUn = 0;
			var totalIPIItens = 0;
			var totalICMSItens = 0;
			var totalICMSRetItens = 0;
			var totalItensComDesc = 0;
			$("input[name*=orcCodProdutoItem___]").each(function (index) {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));

				var qtdItem = Number($("#orcQtdItem___" + index).val());
				var valIPI = validafunctions.getFloatValue("orcIPIItem___" + index);
				var valICMS = validafunctions.getFloatValue("orcICMSItem___" + index);
				var valICMSRet = validafunctions.getFloatValue("orcICMSRetItem___" + index);
				var valCustoItem = validafunctions.getFloatValue("orcPrecoCustoItem___" + index);
				var valTotalCustoItem = validafunctions.getFloatValue("orcTotalCustoItem___" + index);
				var valTotalCustoComImpItem = validafunctions.getFloatValue("orcTotalCustoComImpItem___" + index);

				//Soma Valor Original
				if (!isNaN(valTotalCustoComImpItem)) {
					totalCustoItensUn += valTotalCustoComImpItem;
				}

				if (!isNaN(valIPI)) {
					totalIPIItens += (valIPI)
				}

				if (!isNaN(valICMS)) {
					totalICMSItens += (valICMS)
				}

				if (!isNaN(valICMSRet)) {
					totalICMSRetItens += (valICMSRet)
				}


			});

			$("#totalCustoPedido").val(totalCustoItensUn.toFixed(2));
			validafunctions.setMoeda("totalCustoPedido", 2, false, '')
			$("#totalIPI").val(totalIPIItens.toFixed(2));
			validafunctions.setMoeda("totalIPI", 2, false, '')
			$("#totalICMS").val(totalICMSItens.toFixed(2));
			validafunctions.setMoeda("totalICMS", 2, false, '')
			$("#totalICMSRet").val(totalICMSRetItens.toFixed(2));
			validafunctions.setMoeda("totalICMSRet", 2, false, '')

			funcoes.validaValorMinimo();
			if ($("#tipoPedido").val() == "PG") {
				var totalPedido = validafunctions.getFloatValue("totalCustoPedido");
				if (totalPedido >= 10000) {
					funcoes.alertaGarantia();
				}

			}

			//Somente consulta as novas condições de pagamento se tiver um tipoPedido definido.
			if ($('#tipoPedido').val() != '') {

				//Só entra no if abaixo para refazer o zoom de condição de pagamento,
				//Se o tipo do pedido não for CP, PP, PG, MP, PEUSA
				//				if( $('#tipoPedido').val() != 'CP' && $('#tipoPedido').val() != 'PP' && $('#tipoPedido').val() != 'PG' && $('#tipoPedido').val() != 'MP' && $('#tipoPedido').val() != 'PEUSA' ){
				//Só entra no if abaixo para refazer o zoom de condição de pagamento,
				//Se o tipo do pedido for PE ou CF
				if ($('#tipoPedido').val() == 'PE' || $('#tipoPedido').val() == 'CF') {
					console.log('entrou no if tipoPedido');

					//Chama essa função, pq conforme o valor total do pedido, libera novas condições de pagamento
					let tipoPedido = $('#tipoPedido').val();
					let totalCustoPedido = ($('#totalCustoPedido').val() == '') ? '0' : validafunctions.getFloatValue("totalCustoPedido");
					var c1 = DatasetFactory.createConstraint("tipoPedido", tipoPedido, tipoPedido, ConstraintType.MUST);
					var c2 = DatasetFactory.createConstraint("valorPedido", totalCustoPedido, totalCustoPedido, ConstraintType.MUST);

					var constraints = new Array(c1, c2);
					var datasetReturned = DatasetFactory.getDataset('dsOrcPedConsultaCondPgto', null, constraints, null)

					var condPagto = $('#condPagto').val();

					var estaNaLista = false;
					if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
						var records = datasetReturned.values;

						for (var index in records) {
							var record = records[index];
							let descCondPagto = record.descCondPagto;

							if (condPagto == descCondPagto) {
								estaNaLista = true;
							}

						}
					}
					//Se não estiver na lista, vai remover para colocar um novo, assim, não vai deletar toda vez
					if (!estaNaLista) {
						$('#codCondPagto').val('');
						$('#condPagto').val('');
						window["zoomCondPagto"].clear();

					}
					funcoes.condicoesPagamento();
				}

			}


		},

		calculaTotalCustoDolar: function () {

			var totalCustoItensUn = 0;

			$("input[name*=orcCodProdutoItem___]").each(function (index) {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));

				var qtdItem = Number($("#orcQtdItem___" + index).val());
				var valTotalCustoItem = validafunctions.getFloatValue("orcTotalCustoDolarItem___" + index);

				if (!isNaN(valTotalCustoItem)) {
					totalCustoItensUn += valTotalCustoItem;
				}
			});

			$("#totalCustoPedidoDolar").val(totalCustoItensUn.toFixed(2));
			validafunctions.setMoeda("totalCustoPedidoDolar", 2, false, '')

			funcoes.validaValorMinimo();
		},

		calculaImpostosItem: function (index, desc, flDesc, CPRetirada) {

			//Se for Compra Programada, precisa atualizar antes a Quantidade Total dos itens, para calcula o imposto total
			if ($('#tipoPedido').val() == 'CP') {
				funcoes.calculaQtdTotalItemCP(index);
			}
			var loading = FLUIGC.loading(window);
			loading.show();

			var codProduto = $("#orcCodProdutoItem___" + index).val();
			var qtdItem = Number($("#orcQtdItem___" + index).val());

			var tipoPedido = "";
			tipoPedido = ($('#tipoPedido').val() != '' ? $('#tipoPedido').val() : '-');

			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProdutoWS&filterFields=B1COD," + codProduto + ",QTD," + qtdItem + ",A1COD," + $('#A1_COD').val() + ",A1LOJA," + $('#A1_LOJA').val() + ",DESC," + desc + ",FLDESC," + flDesc + ",TPPEDIDO," + tipoPedido,
				data: "",
				success: function (data, status, xhr) {
					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						if (records[0].CODRET == "1") {
							var record = records[0];
							var IPI = record.IPI;
							var ICMS = record.ICMS;
							var ICMSRET = record.ICMSRET;
							var ALIQIPI = record.ALIQIPI
							var ALIQICMS = record.ALIQICMS

							$("#orcIPIItem___" + index).val(IPI)
							validafunctions.setMoeda("orcIPIItem___" + index, 2, false, '')

							$("#orcICMSItem___" + index).val(ICMS)
							validafunctions.setMoeda("orcICMSItem___" + index, 2, false, '')

							$("#orcICMSRetItem___" + index).val(ICMSRET)
							validafunctions.setMoeda("orcICMSRetItem___" + index, 2, false, '')

							$("#orcAlqIPIItem___" + index).val(ALIQIPI)
							validafunctions.setPercentual("orcAlqIPIItem___" + index, 2, false)

							$("#orcAlqICMSItem___" + index).val(ALIQICMS)
							validafunctions.setPercentual("orcAlqICMSItem___" + index, 2, false)

						}

					} else {
						FLUIGC.toast({ title: '', message: 'O código do produto informado não existe na base de dados!', type: 'warning' });
					}

					/*APÓS FINALIZAR A REQUISICAO QUE RODA OS CALCULOS*/
					funcoes.calculaTotalItem(index);
					funcoes.calculaTotalCustoItem(index);
					if ($('#tipoPedido').val() == 'CP') {
						funcoes.calculaTotalCustoCPItem(index, CPRetirada);
						funcoes.calculaTotalPorRetiradaCP();
					}
					setTimeout(function () {
						loading.hide();
					}, 700);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					FLUIGC.toast({
						title: '',
						message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!',
						type: 'danger'
					});
					loading.hide();
				}
			});


		},

		calculaQtdEmbalagem: function (index, campoQtdCP) {

			var A1_TIPO = $('#A1_TIPO').val().toUpperCase();
			var A1_PAIS = $('#A1_PAIS').val().toUpperCase();
			var tipoPedido = $('#tipoPedido').val();

			if (A1_TIPO == 'GERENTE' || A1_PAIS == 'USA') {

				if (tipoPedido == 'CP') {

					if (campoQtdCP == '1') {
						var qtdItem = Number($("#orcQtdCP1RetItem___" + index).val());
						var embalagemItem = Number($("#orcEmbalagemItem___" + index).val());

						if (embalagemItem > 1 || embalagemItem != "") {
							var calculo = qtdItem % embalagemItem;

							if (calculo > 0) {
								FLUIGC.toast({ title: '', message: '"A Quantidade da 1ª retirada do item está inválida pelo múltiplo de sua embalagem.', type: 'warning' });
							}
						}
					} else if (campoQtdCP == '2') {
						var qtdItem = Number($("#orcQtdCP2RetItem___" + index).val());
						var embalagemItem = Number($("#orcEmbalagemItem___" + index).val());

						if (embalagemItem > 1 || embalagemItem != "") {
							var calculo = qtdItem % embalagemItem;

							if (calculo > 0) {
								FLUIGC.toast({ title: '', message: '"A Quantidade da 2ª retirada do item está inválida pelo múltiplo de sua embalagem.', type: 'warning' });
							}
						}
					} else if (campoQtdCP == '3') {
						var qtdItem = Number($("#orcQtdCP3RetItem___" + index).val());
						var embalagemItem = Number($("#orcEmbalagemItem___" + index).val());

						if (embalagemItem > 1 || embalagemItem != "") {
							var calculo = qtdItem % embalagemItem;

							if (calculo > 0) {
								FLUIGC.toast({ title: '', message: '"A Quantidade da 3ª retirada do item está inválida pelo múltiplo de sua embalagem.', type: 'warning' });
							}
						}
					}

				} else {
					var qtdItem = Number($("#orcQtdItem___" + index).val());
					var embalagemItem = Number($("#orcEmbalagemItem___" + index).val());

					if (embalagemItem > 1 || embalagemItem != "") {
						var calculo = qtdItem % embalagemItem;

						if (calculo > 0) {
							//							 FLUIGC.toast({ title: '', message: '"A Quantidade do item está inválida pelo múltiplo de sua embalagem.', type: 'warning' });
							var msg_multiplo_embalagem = $('#msg_multiplo_embalagem').text();
							FLUIGC.toast({ title: '', message: msg_multiplo_embalagem, type: 'warning' });
						}
					}
				}


			}

		},

		calculaQtdTotalItemCP: function (index) {


			var CPqtdOpcaoRecebimento = $('#CPqtdOpcaoRecebimento').val();

			if (CPqtdOpcaoRecebimento == '1') {

				var orcQtdItem = Number($("#orcQtdCP1RetItem___" + index).val());
				$("#orcQtdItem___" + index).val(orcQtdItem);

			} else if (CPqtdOpcaoRecebimento == '2') {

				var orcQtdCP1RetItem = Number($("#orcQtdCP1RetItem___" + index).val());
				var orcQtdCP2RetItem = Number($("#orcQtdCP2RetItem___" + index).val());
				var orcQtdItem = orcQtdCP1RetItem + orcQtdCP2RetItem;
				$("#orcQtdItem___" + index).val(orcQtdItem);

			} else if (CPqtdOpcaoRecebimento == '3') {

				var orcQtdCP1RetItem = Number($("#orcQtdCP1RetItem___" + index).val());
				var orcQtdCP2RetItem = Number($("#orcQtdCP2RetItem___" + index).val());
				var orcQtdCP3RetItem = Number($("#orcQtdCP3RetItem___" + index).val());
				var orcQtdItem = orcQtdCP1RetItem + orcQtdCP2RetItem + orcQtdCP3RetItem;
				$("#orcQtdItem___" + index).val(orcQtdItem);

			}

		},



		imprimir: function () {


			$.ajax({
				type: "GET",
				dataType: "json",
				async: false,
				url: "/api/public/ecm/dataset/search?datasetId=dsClienteViaDadosAdicionais",
				data: "",
				success: function (data, status, xhr) {
					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						var record = records[0];
						var A1_COD = record.A1_COD;
						var A1_LOJA = record.A1_LOJA;
						var A1_TIPO = record.A1_TIPO;

						if ($("#A1_PAIS").val() == 'USA') {
							var IDCOMPANY = getWKCompany();
							var IDSOLICITACAO = $("#solicitacao").val();
							var link = "/webdesk/streamcontrol/?WDCompanyId=" + IDCOMPANY + "&WDParentDocumentId=" + IDIMPRESSAOPREPEDIDO + "&IDsolicitacao=" + IDSOLICITACAO;
							window.open(link, "Pre-Order", "height=700,width=700");
						} else {
							//Só faz o procedimento de troca se for gerente
							if (A1_TIPO.toUpperCase() == 'GERENTE') {

								var defineOrcamentoPedido = $("input:radio[name='defineOrcamentoPedido']:checked").val();
								if (CURRENT_STATE == FORMALIZAPEDIDO || CURRENT_STATE == GTSVERIFICAORCAMENTO || CURRENT_STATE == GTSVERIFICAPEDIDO || defineOrcamentoPedido == 'pedido') {
									var IDCOMPANY = getWKCompany();
									var IDSOLICITACAO = $("#solicitacao").val();
									var link = "/webdesk/streamcontrol/?WDCompanyId=" + IDCOMPANY + "&WDParentDocumentId=" + IDIMPRESSAOPREPEDIDO + "&IDsolicitacao=" + IDSOLICITACAO;
									window.open(link, "Pré-Pedido", "height=700,width=700");
								} else if (defineOrcamentoPedido == 'orcamento') {

									var IDCOMPANY = getWKCompany();
									var IDSOLICITACAO = $("#solicitacao").val();
									var link = "/webdesk/streamcontrol/?WDCompanyId=" + IDCOMPANY + "&WDParentDocumentId=" + IDIMPRESSAOORCAMENTO + "&IDsolicitacao=" + IDSOLICITACAO;
									window.open(link, "Orçamento", "height=700,width=700");

								}

							} else if (A1_TIPO.toUpperCase() == 'BALCONISTA') {
								var IDCOMPANY = getWKCompany();
								var IDSOLICITACAO = $("#solicitacao").val();
								var link = "/webdesk/streamcontrol/?WDCompanyId=" + IDCOMPANY + "&WDParentDocumentId=" + IDIMPRESSAOORCAMENTO + "&IDsolicitacao=" + IDSOLICITACAO;
								window.open(link, "Orçamento", "height=700,width=700");

							}
						}
					}

				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					FLUIGC.toast({
						title: '',
						message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!',
						type: 'danger'
					});
					loading.hide();
				}
			});

		},

		calculaPrecoVenda: function () {
			var PrecoSugerido = validafunctions.getFloatValue("orcProdPrecoSugerido");
			var Percent = validafunctions.getFloatValue("orcProdPercentAcresc");
			var PrecoVenda = 0;

			if (!isNaN(PrecoSugerido) && !isNaN(Percent)) {
				PrecoVenda = PrecoSugerido + ((PrecoSugerido * Percent) / 100);
			}

			if (!isNaN(PrecoVenda)) {
				$("#orcProdPrecoVenda").val(PrecoVenda.toFixed(2));
				validafunctions.setMoeda("orcProdPrecoVenda", 2, false, '')
			}
		},


		verificaPrecoVenda: function (index) {


			var valPrecoVenda = validafunctions.getFloatValue("orcPrecoUnitItem___" + index);
			var valPrecoMin = validafunctions.getFloatValue("orcPrecoMinItem___" + index);

			if (valPrecoVenda < valPrecoMin) {
				FLUIGC.toast({ title: '', message: 'O valor do produto não pode ser menor que o valor minimo.', type: 'warning' });

				$("#orcPrecoUnitItem___" + index).val(valPrecoMin.toFixed(2));
				validafunctions.setMoeda("orcPrecoUnitItem___" + index, 2, false, '');

				funcoes.calculaTotalItem(index);
				funcoes.calculaTotalCustoItem(index);
			} else {
				funcoes.calculaTotalItem(index);
				funcoes.calculaTotalCustoItem(index);
			}
		},

		mostraCamposTipoPedido: function () {

			if ($('#tipoPedido').val() == 'PG') {
				$("#tipoPGAlerta").show();
				$("#divGarantiaBalcao").show();

				if ($("input[type='radio'][name='garantiaBalcao']").is(':checked')) {
					funcoes.mostraCamposBalcao();
				}

				$('#divRedespacho').removeClass('col-md-offset-7');
				$('#divRedespacho').addClass('col-md-offset-4');

				$("#tipoCP").hide();

			} else if ($('#tipoPedido').val() == 'CP') {

				$("#tipoPG").hide();
				$("#tipoPGAlerta").hide();
				$("#divGarantiaBalcao").hide();

				$('#divRedespacho').removeClass('col-md-offset-4');
				$('#divRedespacho').addClass('col-md-offset-7');

				$("#tipoCP").show();

			} else {
				$("#tipoPG").hide();
				$("#tipoPGAlerta").hide();
				$("#divGarantiaBalcao").hide();

				$('#divRedespacho').removeClass('col-md-offset-4');
				$('#divRedespacho').addClass('col-md-offset-7');

				$("#tipoCP").hide();
			}

		},


		iniciaTPCompraProgramada: function () {

			$("#CPLinhaOpcao1").show();

			//Mostra 1ª Retirada
			$('.itCP1Ret').show();

			$('.qtd-total-item').prop('readonly', true);

			$("input[name*=orcCodProdutoItem___]").each(function (index) {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));

				var orcQtdItem = $("#orcQtdItem___" + index).val();
				var orcTotalCustoItem = $("#orcTotalCustoItem___" + index).val();

				$("#orcQtdCP1RetItem___" + index).val(orcQtdItem);
				$("#orcCP1RetTotalCustoItem___" + index).val(orcTotalCustoItem);

			});

		},

		mudaQtdCPRecebimento: function () {

			var qtdOpcaoRecebimentoCP = Number($("#CPqtdOpcaoRecebimento").val());

			if (qtdOpcaoRecebimentoCP == 1) {

				$('#CPLinhaOpcao1').show();
				$('#CPLinhaOpcao2').hide();
				$('#CPLinhaOpcao3').hide();

				//Mostra coluna de 1ª retirada
				$('.itCP1Ret').show();
				//Oculta coluna de 2ª retirada
				$('.itCP2Ret').hide();
				//Oculta coluna de 3ª retirada
				$('.itCP3Ret').hide();

				$("input[name*=orcCodProdutoItem___]").each(function (index) {
					var index = validafunctions.getPosicaoFilho($(this).attr("id"));

					$("#orcQtdCP2RetItem___" + index).val('');
					$("#orcCP2RetTotalCustoItem___" + index).val('');

					$("#orcQtdCP3RetItem___" + index).val('');
					$("#orcCP3RetTotalCustoItem___" + index).val('');

				});

			} else if (qtdOpcaoRecebimentoCP == 2) {

				$('#CPLinhaOpcao2').show();
				$('#CPLinhaOpcao3').hide();

				//Mostra coluna de 1ª retirada
				$('.itCP1Ret').show();
				//Mostra coluna de 2ª retirada
				$('.itCP2Ret').show();
				//Oculta coluna de 3ª retirada
				$('.itCP3Ret').hide();

				$("input[name*=orcCodProdutoItem___]").each(function (index) {
					var index = validafunctions.getPosicaoFilho($(this).attr("id"));

					$("#orcQtdCP3RetItem___" + index).val('');
					$("#orcCP3RetTotalCustoItem___" + index).val('');

				});
			} else if (qtdOpcaoRecebimentoCP == 3) {

				$('#CPLinhaOpcao2').show();
				$('#CPLinhaOpcao3').show();

				//Mostra coluna de 1ª retirada
				$('.itCP1Ret').show();
				//Mostra coluna de 2ª retirada
				$('.itCP2Ret').show();
				//Mostra coluna de 3ª retirada
				$('.itCP3Ret').show();

			}



			$("input[name*=orcCodProdutoItem___]").each(function (index) {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));

				for (i = 1; i <= qtdOpcaoRecebimentoCP; i++) {
					var desc = 0;
					var flDesc = "N";
					desc = validafunctions.getFloatValue("porcDescontoParamTipoPedido");

					funcoes.calculaImpostosItem(index, desc, flDesc, i);
				}

			});

		},

		camposGarantiaBalcao: function () {

			var tipoPedido = $('#tipoPedido').val();
			var garantiaBalcao = $('#garantiaBalcao').val();

			if (tipoPedido == 'PG') {
				$("#divGarantiaBalcao").show();

			} else {
				$("#divGarantiaBalcao").hide();
			}
		},

		mostraCamposBalcao: function () {
			var garantiaBalcao = $("input:radio[name='garantiaBalcao']:checked").val();

			if (garantiaBalcao == 'Sim') {
				$("#tipoPG").show();

				$(".tipoPGBalcaoSim").show();
				$(".tipoPGBalcaoNao").hide();
				$("#tipoPGBalcaoNaoSerie").hide();

			} else {
				$("#tipoPG").show();

				$(".tipoPGBalcaoSim").hide();
				$(".tipoPGBalcaoNao").show();
				$("#tipoPGBalcaoNaoSerie").show();
			}

		},

		alertaGarantia: function () {
			if ($('#chkAceito').val() == "") {
				var myModal = FLUIGC.modal({
					title: 'Atenção',
					content: 'O envio como simples remessa não dispensa por parte da GTS a análise padrão de avaliação de concessão ou não de garantia ao cliente.',
					id: 'fluig-modal',
					size: 'large',
					actions: [{
						'label': 'Ok',
						'autoClose': true
					}]
				}, function (err, data) {
					if (err) {
						// do error handling
					} else {
						$('#chkAceito').val("true");
					}
				});
			}
		},

		mostraObservacaoPedido: function () {
			$('#divObsPed').show();
			var inputClass = $('#divICMS').attr("class");
			$('#divIPI').removeAttr("class");
			$('#divIPI').attr("class", inputClass);
		},

		validaValorMinimo: function () {
			if ($('#ValorMinimo').val() != "") {
				var A1_PAIS = $('#A1_PAIS').val();
				if (A1_PAIS == 'USA') {
					var ValorMinimo = validafunctions.getFloatValue("ValorMinimo");
					var ValorTotalCustoDolar = validafunctions.getFloatValue("totalCustoPedidoDolar")

					if (ValorMinimo > ValorTotalCustoDolar) {
						$('#ValorValido').val("false");
					} else {
						$('#ValorValido').val("true");
					}
				} else {
					var ValorMinimo = validafunctions.getFloatValue("ValorMinimo");
					var ValorTotalCusto = validafunctions.getFloatValue("totalCustoPedido")

					if (ValorMinimo > ValorTotalCusto) {
						$('#ValorValido').val("false")
					} else {
						$('#ValorValido').val("true")
					}
				}


			} else {
				$('#ValorValido').val("true")
			}


		},

		recalculaPrecoComDesconto: function () {

			var datasetReturned = DatasetFactory.getDataset('ds_parametro_tipopedido', null, null, null)

			var tpTemDesconto = false;
			var tipoGS = $('#tipoGS').val();
			if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
				var records = datasetReturned.values;
				//		        console.log(records)
				for (var index in records) {
					var record = records[index];

					if (record.tipoPedido == $('#tipoPedido').val()) {
						var CodFormaPagto = record.CodFormaPagto;
						var DescricaoFormaPagto = record.DescricaoFormaPagto;
						var Desconto = record.Desconto;
						//		            	var DescontoGS = record.DescontoGS;
						var ValorMinimo = record.ValorMinimo;
						var TpFrete = record.TpFrete;

						//			    		$("#codCondPagto").val(CodFormaPagto);
						//			    		$("#condPagto").val(DescricaoFormaPagto);
						$("#porcDescontoParamTipoPedido").val(Desconto);

						if ($('#chkRedespacho').prop("checked")) {
							$("#tpFrete").val('CIF');
						} else {
							$("#tpFrete").val(TpFrete);
						}

						$("#ValorMinimo").val(ValorMinimo);
						validafunctions.setMoeda("ValorMinimo", 2, false, '');

					}

				}
			} else {
				FLUIGC.toast({ title: '', message: 'Tipo de pedido inexistente!', type: 'warning' });
				funcoes.limpaCampos()
			};

			//Utiliza N
			var flDesc = (tpTemDesconto ? "S" : "N")

			var PercentDesconto = 0;
			//			 PercentDesconto = validafunctions.getFloatValue("PercentDesconto");
			if ($('#tipoPedido').val() == "PP") {
				PercentDesconto = validafunctions.getFloatValue("porcDescontoPP");
			}

			//CP e CF são diferente os calculos de desconto.
			//CP é o seguite:
			//Se o usuário tem 30% de desconto, é aplicado os 30% no produto e mais 2% sobre o valor restante
			//CF é o seguinte:
			//Se o usuário tem 30% de desconto, é somado mais 3%, tendo ele 33% de desconto a ser aplicado.
			if ($('#tipoPedido').val() == 'CP' || $('#tipoPedido').val() == 'CF') {
				PercentDesconto = validafunctions.getFloatValue("porcDescontoParamTipoPedido");
			}
			//Se o tipo de pedido for PE e a condição de pagamento for à vista, vai aplicar mais 3% sobre todo o pedido.
			if ($('#tipoPedido').val() == 'PE' && $('#codCondPagto').val() == '008') {
				PercentDesconto = $('#porcDescontoParamCondPgtoAV').val();
			}

			$("input[name*=orcCodProdutoItem___]").each(function (index) {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));

				var codProdutoItem = $("#orcCodProdutoItem___" + index).val();
				var qtdItem = Number($("#orcQtdItem___" + index).val());


				funcoes.consultaProdutoDesconto(index, codProdutoItem, qtdItem, PercentDesconto, flDesc)

			});


		},

		validaPreenchimentoItem: function (codItem) {
			var naoExisteItem = true
			$("input[name*=orcCodProdutoItem___]").each(function (index) {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));

				var codItemTabela = $("#orcCodProdutoItem___" + index).val();

				if (codItemTabela.trim() == codItem.trim()) {
					naoExisteItem = false;
				}

			});

			return naoExisteItem;
		},

		defineOrcamentoPedido: function (defineOrcamentoPedido) {

			funcoes.limpaCampos();

			//			var loading = FLUIGC.loading(window);
			//			loading.show();

			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsClienteViaDadosAdicionais",
				data: "",
				success: function (data, status, xhr) {

					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						var record = records[0];
						var A1_COD = record.A1_COD;
						var A1_LOJA = record.A1_LOJA;
						var A1_TIPO = record.A1_TIPO;

						//Só faz o procedimento de troca se for gerente
						if (A1_TIPO.toUpperCase() == 'GERENTE') {

							if (defineOrcamentoPedido == 'orcamento') {

								$('#cabecalho').text('Orçamento');

								$('#divOrcamentoCliente').show();
								$('#divGerenteAdm').hide();
								$('#divGarantiaBalcao').hide();
								//Div Cabeçalho Produto
								$('#divOrcamentoProduto').show();
								$('#divPorcAcres').show();
								$('#divPrcSugerido').show();
								$('#divPrcVenda').show();
								$('#divPrcCustoCab').hide();
								$('#divPrcCustoCab').removeClass('col-md-offset-1');
								$('#divPrcSugeMP').show();
								$('#divCurvaAbc').removeClass('col-md-offset-1');

								//Div Compra Programada
								$('#tipoCP').hide();

								//Tabela de Produtos
								$('#divOrcamentoTabItens').show();

								//Deixa habilitado o campo Qtd. da tabela de produtos
								$('.qtd-total-item').prop('readonly', false);

								//Oculta coluna de 1ª retirada
								$('.itCP1Ret').hide();
								//Oculta coluna de 2ª retirada
								$('.itCP2Ret').hide();
								//Oculta coluna de 3ª retirada
								$('.itCP3Ret').hide();

								//Oculta Qtd/ Embalagem
								$('.itQtdEmb').hide();

								//Aumenta tamano Desc Produto
								$(".descProdTabela").css({
									minWidth: "520px",
									width: "520px",
									maxWidth: "520px"
								});

								//Oculta Preço de Custo
								$('.itPrcCustoReal').hide();

								//Mostra Preço Unit.
								$('.itPrcUnitReal').show();

								//IPI
								$('.itIPI').hide();
								//ICMS
								$('.itICMS').hide();
								//Oculta Total do Pedido
								$('.itTotReal').show();
								//Mostra Preço Total de Custo
								$('.itTotCustoReal').hide();

								//Totais
								if (CURRENT_STATE == INICIO_0) {
									$('#divTotalVenda').addClass('col-md-offset-10');
									$('#divIPI').removeClass('col-md-offset-2');
								} else if (CURRENT_STATE == INICIO) {
									$('#divBtnImprimirExcel').addClass('col-md-offset-8');
								} else {
									$('#divTotalVenda').addClass('col-md-offset-10');
								}

								$('#divTotaisLinha').removeClass('col-md-6');
								$('#divTotaisLinha').addClass('col-md-3');
								$('#divTotaisLinha').removeClass('col-md-offset-6');
								$('#divTotaisLinha').addClass('col-md-offset-9');

								$('#divObsPed').hide();

								$('#divIPI').hide();
								$('#divICMSRet').hide();
								$('#divTotalCusto').hide();
								$('#divTotalVenda').show();
								$('#totalPedido').show();





							} else if (defineOrcamentoPedido == 'pedido') {

								if (getLanguage() == 'en_US') {
									$('#cabecalho').text('Order');
								} else {
									$('#cabecalho').text('Pedido');
								}

								$('#divOrcamentoCliente').hide();
								//Div Tipo Pedido
								$('#divGerenteAdm').show();
								//Transportadora
								if ($('#chkTransporteProprio').prop('checked')) {
									$('#divTransp').show();
									$('#divTxtTransp').show();
									$('#divDSTransp').hide();
								}

								var tipoPedido = $('#tipoPedido').val();
								if (tipoPedido == 'PG') {
									$("#divGarantiaBalcao").show();

									var garantiaBalcao = $("input:radio[name='garantiaBalcao']:checked").val();

									if (garantiaBalcao == 'Sim') {
										$("#tipoPG").show();

										$(".tipoPGBalcaoSim").show();
										$(".tipoPGBalcaoNao").hide();
										$("#tipoPGBalcaoNaoSerie").hide();

									} else if (garantiaBalcao == 'Nao') {
										$("#tipoPG").show();

										$(".tipoPGBalcaoSim").hide();
										$(".tipoPGBalcaoNao").show();
										$("#tipoPGBalcaoNaoSerie").show();
									}

									$('#divRedespacho').removeClass('col-md-offset-7');
									$('#divRedespacho').addClass('col-md-offset-4');

								} else if (tipoPedido == 'CP') {

									$('#tipoCP').show();

									//Deixa desabilitado o campo Qtd. da tabela de produtos
									$('.qtd-total-item').prop('readonly', true);
									var CPqtdOpcaoRecebimento = $("#CPqtdOpcaoRecebimento").val();

									if (CPqtdOpcaoRecebimento == "1") {
										$('#CPLinhaOpcao1').show();

										//Mostra coluna de 1ª retirada
										$('.itCP1Ret').show();
										//Oculta coluna de 2ª retirada
										$('.itCP2Ret').hide();
										//Oculta coluna de 3ª retirada
										$('.itCP3Ret').hide();

									} else if (CPqtdOpcaoRecebimento == "2") {
										$('#CPLinhaOpcao1').show();
										$('#CPLinhaOpcao2').show();

										//Mostra coluna de 1ª retirada
										$('.itCP1Ret').show();
										//Mostra coluna de 2ª retirada
										$('.itCP2Ret').show();
										//Oculta coluna de 3ª retirada
										$('.itCP3Ret').hide();

									} else if (CPqtdOpcaoRecebimento == "3") {
										$('#CPLinhaOpcao1').show();
										$('#CPLinhaOpcao2').show();
										$('#CPLinhaOpcao3').show();

										//Mostra coluna de 1ª retirada
										$('.itCP1Ret').show();
										//Mostra coluna de 2ª retirada
										$('.itCP2Ret').show();
										//Mostra coluna de 3ª retirada
										$('.itCP3Ret').show();
									}


								} else {
									$("#divGarantiaBalcao").hide();
								}
								//Div Cabeçalho Produto
								$('#divOrcamentoProduto').show();
								$('#divPorcAcres').hide();
								$('#divPrcSugerido').hide();
								$('#divPrcVenda').hide();
								$('#divPrcCustoCab').show();
								$('#divPrcCustoCab').addClass('col-md-offset-1');
								$('#divPrcSugeMP').hide();
								$('#divCurvaAbc').addClass('col-md-offset-1');

								//Tabela de Produtos
								$('#divOrcamentoTabItens').show();
								$('.divDescProdutoItem').removeClass('col-md-4');
								$('.divDescProdutoItem').addClass('col-md-2');

								//Mostra Qtd/ Embalagem
								$('.itQtdEmb').show();

								//Diminui tamanho Desc Produto
								$(".descProdTabela").css({
									minWidth: "230px",
									width: "230px",
									maxWidth: "230px"
								});

								//Mostra Preço de Custo
								$('.itPrcCustoReal').show();
								//Oculta Preço Unit.
								$('.itPrcUnitReal').hide();
								//IPI
								$('.itIPI').show();
								//ICMS
								$('.itICMS').show();
								//Oculta Total do Pedido
								$('.itTotReal').hide();
								//Mostra Preço Total de Custo
								$('.itTotCustoReal').show();

								//Totais
								if (CURRENT_STATE == INICIO_0) {
									$('#divTotalVenda').removeClass('col-md-offset-10');
									$('#divIPI').addClass('col-md-offset-2');

								} else if (CURRENT_STATE == INICIO) {
									$('#divBtnImprimirExcel').removeClass('col-md-offset-8');
								} else {
									$('#divTotalVenda').removeClass('col-md-offset-10');
								}
								$('#divTotaisLinha').removeClass('col-md-3');
								$('#divTotaisLinha').addClass('col-md-6');
								$('#divTotaisLinha').removeClass('col-md-offset-9');
								$('#divTotaisLinha').addClass('col-md-offset-6');

								$('#divObsPed').show();

								$('#divIPI').show();
								$('#divICMSRet').show();
								$('#divTotalCusto').show();
								$('#divTotalVenda').hide();
								$('#totalPedido').hide();

								$('#divIPI').removeClass('col-md-offset-6');


							}

						}

					}
					//	    	    	setTimeout(function(){ 
					//	    	    		loading.hide();
					//	    	    	}, 700);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					FLUIGC.toast({
						title: '',
						message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!',
						type: 'danger'
					});
					//	    	    	loading.hide();
				}
			});



		}
	}
})();


var eventsFuncoes = (function () {
	return {
		setup: function () {

			//**********CABEÇALHO PEDIDO********************//
			$(document).on("change", "input:radio[name='defineOrcamentoPedido']", function () {
				var defineOrcamentoPedido = $("input:radio[name='defineOrcamentoPedido']:checked").val();

				funcoes.defineOrcamentoPedido(defineOrcamentoPedido);

			});

			$(document).on("change", "#tipoPedido", function () {
				funcoes.limpaCampos();
				funcoes.limpaCamposCP();
				$("#codCondPagto").val('');
				$("#condPagto").val('');
				window["zoomCondPagto"].clear();

				funcoes.mostraCamposTipoPedido();
				funcoes.recalculaPrecoComDesconto();
				if ($('#tipoPedido').val() == "CP") {
					$("#CPqtdOpcaoRecebimento").val('1');
					funcoes.iniciaTPCompraProgramada();
				}
				if ($('#tipoPedido').val() == "") {
					$("#tpFrete").val('');
				}

				funcoes.condicoesPagamento();
			});

			$(document).on("click", "input:radio[name='garantiaBalcao']", function () {
				funcoes.mostraCamposBalcao();
			});

			$(document).on("change", "#chkTransporteProprio", function () {
				if ($('#chkTransporteProprio').prop("checked")) {
					$('#divDSTransp').hide();
					window["tpTransportadora"].clear();
					$('#divTransp').show();
					$('#divTxtTransp').show();
					$('#codTransportadora').val('');
					$('#nomeTransportadora').prop('readonly', false);
				} else {
					$('#divDSTransp').show();
					$('#divTransp').hide();
					$('#divTxtTransp').hide();
					$('#nomeTransportadora').val('');
				}
			});

			$(document).on("change", "#chkRedespacho", function () {
				if ($('#chkRedespacho').prop("checked")) {
					//Define Frete como CIF
					$('#tpFrete').val('CIF');

					//Oculta Transportadora Zoom
					$('#divDSTransp').hide();
					//Mostra Transportadora Text
					$('#divTransp').show();
					$('#divTxtTransp').hide();


					window["tpTransportadora"].clear();

					//Por conta do 'Transporte próprio' é limpo os campos de cod e desc Tranportadora, e bloqueado o checkbox
					$('#codTransportadora').val('');
					$('#nomeTransportadora').val('');
					$('#nomeTransportadora').prop('readonly', true);
					$('#chkTransporteProprio').prop('checked', false);
					$('#chkTransporteProprio').prop('disabled', true);

					window["zoomRedespacho"].disable(false);
				} else {

					if ($('#tipoPedido').val() != '') {
						//Busca o Frete do Parâmetro
						var datasetReturned = DatasetFactory.getDataset('ds_parametro_tipopedido', null, null, null)
						if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
							var records = datasetReturned.values;
							for (var index in records) {
								var record = records[index];
								if (record.tipoPedido == $('#tipoPedido').val()) {
									var TpFrete = record.TpFrete;
									$("#tpFrete").val(TpFrete);
								}
							}
						}
					} else {
						$("#tpFrete").val('');
					}


					window["zoomRedespacho"].clear();
					window["zoomRedespacho"].disable(true);

					//Mostra Transportadora Zoom
					$('#divDSTransp').show();
					//Oculta Transportadora Text
					$('#divTransp').hide();
					$('#codTransportadora').val('');
					$('#nomeTransportadora').val('');
					$('#nomeRedespacho').val('');
					$('#redespachoMsgNotaFiscal').val('');

					$('#chkTransporteProprio').prop('disabled', false);
				}
			});


			//**********DADOS PRODUTO********************//
			$(document).on("keyup", "#orcProdCod", function () {
				$("#orcProdCod").val($("#orcProdCod").val().toUpperCase());
			});

			$(document).on("change", "#orcProdCod", function () {
				if ($('#orcProdCod').val() != '') {

					var A1_PAIS = $('#A1_PAIS').val();

					if (A1_PAIS == 'USA') {

						var desc = 0;
						var flDesc = "N";

						funcoes.consultaProdutoQtdUSAAssync($("#orcProdCod").val(), $("#orcProdQtd").val(), false, desc, flDesc);

					} else {
						var desc = 0;
						var flDesc = "N";
						var PercentDesconto = validafunctions.getFloatValue("PercentDesconto");
						var descontoUsuario = validafunctions.getFloatValue("descontoUsuario");
						var tipoPedido = $('#tipoPedido').val();

						if ($('#tipoPedido').val() != "") {
							if ($('#tipoPedido').val() == 'PP') {
								desc = validafunctions.getFloatValue("porcDescontoPP");
							}
							if ($('#tipoPedido').val() == 'CP' || $('#tipoPedido').val() == 'CF') {
								desc = validafunctions.getFloatValue("porcDescontoParamTipoPedido");
							}
							//Se o tipo de pedido for PE e a condição de pagamento for à vista, vai aplicar mais 3% sobre todo o pedido.
							if ($('#codCondPagto').val() == '008') {
								desc = $('#porcDescontoParamCondPgtoAV').val();
							}
						}

						funcoes.consultaProdutoQtdAssync($("#orcProdCod").val(), $("#orcProdQtd").val(), false, desc, flDesc);

					}

				} else {
					funcoes.limpaCampos();
				}
			});

			$(document).on("change", "#orcProdQtd", function () {

				if ($("#orcProdCod").val() == '') {
					FLUIGC.toast({ title: '', message: 'O campo "Cod. Produto" não foi preenchido!', type: 'warning' });
					$("#orcProdQtd").val('1');
				} else {
					var A1_PAIS = $('#A1_PAIS').val();

					if (A1_PAIS == 'USA') {

						var desc = 0;
						var flDesc = "N";

						funcoes.consultaProdutoQtdUSAAssync($("#orcProdCod").val(), $("#orcProdQtd").val(), false, desc, flDesc);

					} else {
						var desc = 0;
						var flDesc = "N";
						var PercentDesconto = validafunctions.getFloatValue("PercentDesconto");
						var descontoUsuario = validafunctions.getFloatValue("descontoUsuario");
						var tipoPedido = $('#tipoPedido').val();

						if ($('#tipoPedido').val() != "") {
							if ($('#tipoPedido').val() == 'PP') {
								desc = validafunctions.getFloatValue("porcDescontoPP");
							}
							if ($('#tipoPedido').val() == 'CP' || $('#tipoPedido').val() == 'CF') {
								desc = validafunctions.getFloatValue("porcDescontoParamTipoPedido");
							}
							//Se o tipo de pedido for PE e a condição de pagamento for à vista, vai aplicar mais 3% sobre todo o pedido.
							if ($('#codCondPagto').val() == '008') {
								desc = $('#porcDescontoParamCondPgtoAV').val();
							}
						}
						funcoes.consultaProdutoQtdAssync($("#orcProdCod").val(), $("#orcProdQtd").val(), false, desc, flDesc);
					}
				}

			});

			$(document).on("change", "#orcProdPercentAcresc", function () {
				funcoes.calculaPrecoVenda();
			});

			$(document).on("click", "#addItem", function () {

				if (funcoes.validaPreenchimentoItem($("#orcProdCod").val()) == true) {
					if ($("#orcProdCod").val() == '') {
						var msg_cod_prod_nao_preenchido = $('#msg_cod_prod_nao_preenchido').text();
						FLUIGC.toast({ title: '', message: msg_cod_prod_nao_preenchido, type: 'warning' });
					} else {
						if ($("#orcProdQtd").val() == '') {
							var msg_qt_nao_preenchido = $('#msg_qt_nao_preenchido').text();
							FLUIGC.toast({ title: '', message: msg_qt_nao_preenchido, type: 'warning' });
						} else {
							funcoes.addLinhaItem();
							funcoes.limpaCampos();
						}

					}
				} else {
					var msg_item_ja_existe_na_tabela = $('#msg_item_ja_existe_na_tabela').text();
					FLUIGC.toast({ title: '', message: msg_item_ja_existe_na_tabela, type: 'warning' });
				}

				$("#orcProdCod").focus();
			});



			//**********COMPRA PROGRAMADA********************//
			$(document).on("change", "#CPqtdOpcaoRecebimento", function () {

				var qtdOpcaoRecebimentoCP = Number($("#CPqtdOpcaoRecebimento").val());

				if (qtdOpcaoRecebimentoCP == 0) {
					FLUIGC.toast({ title: '', message: 'O campo "Quantidade de Opção de Recebimento" não pode ser 0!', type: 'warning' });
					$("#CPqtdOpcaoRecebimento").val('1');
				}
				if (qtdOpcaoRecebimentoCP > 3) {
					FLUIGC.toast({ title: '', message: 'O campo "Quantidade de Opção de Recebimento" não pode ser maior que 3!', type: 'warning' });
					$("#CPqtdOpcaoRecebimento").val('3');
				}

				funcoes.mudaQtdCPRecebimento();

				//zoom
				if ($('#CPDiasRetirada_2').val() != "") {
					reloadZoomFilterValues('CPProgramacaoRetirada_3', "qtdDias," + $('#CPDiasRetirada_2').val());
				}
			});

			$(document).on("change", ".change-quantidade-CP1", function () {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));

				funcoes.calculaQtdEmbalagem(index, '1');

				var desc = 0;
				var flDesc = "N";
				desc = validafunctions.getFloatValue("porcDescontoParamTipoPedido");

				funcoes.calculaImpostosItem(index, desc, flDesc, '1');
			});

			$(document).on("change", ".change-quantidade-CP2", function () {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));

				funcoes.calculaQtdEmbalagem(index, '2');

				var desc = 0;
				var flDesc = "N";
				desc = validafunctions.getFloatValue("porcDescontoParamTipoPedido");

				funcoes.calculaImpostosItem(index, desc, flDesc, '2');
			});

			$(document).on("change", ".change-quantidade-CP3", function () {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));

				funcoes.calculaQtdEmbalagem(index, '3');

				var desc = 0;
				var flDesc = "N";
				desc = validafunctions.getFloatValue("porcDescontoParamTipoPedido");

				funcoes.calculaImpostosItem(index, desc, flDesc, '3');
			});

			//***************ITENS******************//

			$(document).on("change", ".change-quantidade", function () {

				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				if ($("#orcQtdItem___" + index).val().trim() == '') {
					$("#orcQtdItem___" + index).val('1');
				}
				funcoes.calculaQtdEmbalagem(index);

				var A1_PAIS = $('#A1_PAIS').val();

				if (A1_PAIS == 'USA') {
					funcoes.calculaTotalCustoItem(index);

					funcoes.calculaTotalCustoItemDolar(index);

				} else {

					var desc = 0;
					var flDesc = "N";
					var PercentDesconto = validafunctions.getFloatValue("PercentDesconto");
					var descontoUsuario = validafunctions.getFloatValue("descontoUsuario");

					if ($('#tipoPedido').val() == 'PP') {
						desc = validafunctions.getFloatValue("porcDescontoPP");
					}

					if ($('#tipoPedido').val() == 'CP' || $('#tipoPedido').val() == 'CF') {
						desc = validafunctions.getFloatValue("porcDescontoParamTipoPedido");
					}
					//Se o tipo de pedido for PE e a condição de pagamento for à vista, vai aplicar mais 3% sobre todo o pedido.
					if ($('#codCondPagto').val() == '008') {
						desc = $('#porcDescontoParamCondPgtoAV').val();
					}
					funcoes.calculaImpostosItem(index, desc, flDesc);

				}
			});

			$(document).on("change", ".change-val-venda", function () {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				funcoes.verificaPrecoVenda(index);

			});

			//***************GERA RELATÓRIO******************//
			$(document).on("click", "#btnImprimir", function () {
				funcoes.imprimir();
			});

			$(document).on("click", "#btnImprimir2", function () {
				funcoes.imprimir();
			});

			$(document).on("click", "#btnExcelPartes", function () {

				//Ver mais em: https://redstapler.co/sheetjs-tutorial-create-xlsx/
				var wb = XLSX.utils.book_new();

				wb.Props = {
					Title: "Orçamento-Pedido",
					Subject: "Orçamento-Pedido",
					Author: "Marco Comassetto",
					CreatedDate: new Date(2021,07, 23)
				};
				wb.SheetNames.push("Orçamento-Pedido");

				//Conteúdo
				var data = [['Num. Orçamento', $('#numOrcamento').val()]];
				if ($('#numPedido').val() != "") {
					var pedido = ['Num. Pedido', $('#numPedido').val()];
					data.push(pedido);
				}
				const linha = [];
				data.push(linha);
				var cab = ['Qtd', 'Cod. Produto', 'Desc. Produto', 'Desc. Produto (Inglês)', 'NCM',
					'Preço Custo Real', 'Preço Custo Dolar',
					'Total Custo Real', 'Total Custo Dolar'];
				data.push(cab);

				$("input[name*=orcCodProdutoItem___]").each(function (index) {
					var index = validafunctions.getPosicaoFilho($(this).attr("id"));

					var orcQtdItem = $('#orcQtdItem___' + index).val();
					var orcCodProdutoItem = $('#orcCodProdutoItem___' + index).val();
					var orcDescProdutoItem = $('#orcDescProdutoItem___' + index).val();
					var orcDescProdutoUSAItem = $('#orcDescProdutoUSAItem___' + index).val();
					var orcProdNCMItem = $('#orcNCMItem___' + index).val();
					var orcPrecoCustoItem = $('#orcPrecoCustoItem___' + index).val();
					var orcPrecoCustoDolarItem = $('#orcPrecoCustoDolarItem___' + index).val();
					var orcTotalCustoComImpItem = $('#orcTotalCustoComImpItem___' + index).val();
					var orcTotalCustoDolarItem = $('#orcTotalCustoDolarItem___' + index).val();

					const newDatas = [
						orcQtdItem,
						orcCodProdutoItem,
						orcDescProdutoItem,
						orcDescProdutoUSAItem,
						orcProdNCMItem,
						orcPrecoCustoItem,
						orcPrecoCustoDolarItem,
						orcTotalCustoComImpItem,
						orcTotalCustoDolarItem
					];

					data.push(newDatas)
				});


				var ws = XLSX.utils.aoa_to_sheet(data);
				wb.Sheets["Orçamento-Pedido"] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

				var WKNumProces = getWKNumProces();
				//Este método saveAs está contino no FileSaver.min.js
				//Função s2ab está neste fonte
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'Pedido Id Fluig - ' + WKNumProces + '.xlsx');

			});


			//***************GERENTE REVENDA GERA PEDIDO******************//
			$(document).on("click", "input:radio[name='gerarPedidoGTS']", function () {
				var gerarPedidoGTS = $("input:radio[name='gerarPedidoGTS']:checked").val();

				if (gerarPedidoGTS == 'Sim') {
					$("#divMotCancelGerarPed").hide();
					$("#gerarPedidoMotCancel").val('');
				} else if (gerarPedidoGTS == 'Cancelar') {
					$("#divMotCancelGerarPed").show();

				} else if (gerarPedidoGTS == 'Salvar') {
					$("#divMotCancelGerarPed").hide();
					$("#gerarPedidoMotCancel").val('');
				}

			});

			//***************GERENTE REVENDA FORMALIZA******************//
			$(document).on("click", "input:radio[name='formalizarPedido']", function () {
				var formalizarPedido = $("input:radio[name='formalizarPedido']:checked").val();

				if (formalizarPedido == 'Cancelar') {
					$("#divMotivoCancelamento").show();

				} else {
					$("#divMotivoCancelamento").hide();
					$("#formalizarPedidoMotCancel").val('');

				}

			});

		}
	}
})();

//Função necessário para exportação de excel
function s2ab(s) {
	var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
	var view = new Uint8Array(buf);  //create uint8array as viewer
	for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
	return buf;
}

function modal(title, html) {
	var myModal = FLUIGC.modal({
		title: title,
		content: html,
		id: 'fluig-modal',
		actions: [{
			'label': 'Fechar',
			'autoClose': true
		}]
	}, function (err, data) {
		if (err) {
			// do error handling
		} else {
			// do something with data
		}
	});
}

function removeItem(oElement) {
	fnWdkRemoveChild(oElement);
	funcoes.calculaTotal();
	funcoes.calculaTotalCusto();
	funcoes.calculaTotalCustoDolar();
	if ($('#tipoPedido').val() == 'CP') {
		funcoes.calculaTotalPorRetiradaCP();
	}
}


function loadForm() {



	// Ocultar Aba de anexos do workflow
	window.parent.$("#processTabs").find("li").first().hide();
	window.parent.$("#processTabs").find("li").last().hide();
	window.parent.$("#breadcrumb").remove();

	FLUIGC.popover('#popoverPort', { trigger: 'hover', placement: 'top', html: true, template: '<div class="popover" role="tooltip" style="max-width: 450px !important; width: 450px !important;" ><div class="arrow" ></div><div class="popover-content" style="max-width: 450px !important; width: 450px !important;"></div></div>' });
	FLUIGC.popover('#popoverEnUs', { trigger: 'hover', placement: 'top', html: true, template: '<div class="popover" role="tooltip" style="max-width: 450px !important; width: 450px !important;" ><div class="arrow" ></div><div class="popover-content" style="max-width: 450px !important; width: 450px !important;"></div></div>' });
	FLUIGC.popover('#popoverTipoPedido', { trigger: 'hover', placement: 'bottom', html: true, template: '<div class="popover" role="tooltip" style="max-width: 400px !important; width: 400px !important; background-color: #F2F2F2;" ><div class="arrow" ></div><div class="popover-content" style="max-width: 400px !important; width: 400px !important; "></div></div>' });
	FLUIGC.popover('#popoverCondPgto', { trigger: 'hover', placement: 'bottom', html: true, template: '<div class="popover" role="tooltip" style="max-width: 550px !important; width: 550px !important; background-color: #F2F2F2;" ><div class="arrow" ></div><div class="popover-content" style="max-width: 550px !important; width: 550px !important; "></div></div>' });

	var WKNumState = $("#WKNumState").val();

	//sempre que carrega a tela, limpa os campos, pois podem vir salvos de outra atividade
	funcoes.limpaCampos();

	$('#orcTelClienteFinal').mask('(00) 0000-00009');

	if ($('#origemSolicitacao').val() == 'catalogo') {
		$('#divOrigemCatalogo').show();
		$('#spanNumCatalogo').text($('#numCatalogo').val());
		$('#linkCatalogo').attr('href', 'https://siscatec.com/BudgetOrders/Details/' + $('#numCatalogo').val());
	}


	//Função que fica chamando ela até desabilitar
	//Realizado dessa forma, pq ao carregar a página, o zoom não está completamente pronto para ser desabilitado.
	function setZoomRedespachoDisable() {
		if (window['zoomRedespacho'].disable == undefined) {
			setTimeout(setZoomRedespachoDisable, 500);
		} else {
			window["zoomRedespacho"].disable(true);
		}
	}

	var cpfCnpjRevenda = ""
	if ($("#endCNPJ").val() != "") {
		if ($("#endCNPJ").val().length == 11) {
			cpfCnpjRevenda = $("#endCNPJ").val().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
		} else if ($("#endCNPJ").val().length == 14) {
			cpfCnpjRevenda = $("#endCNPJ").val().replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
		}
	}
	var cidadeRevenda = $('#endCidade').val();
	var UFRevenda = $('#endUF').val();
	$('#spanNomeSolicitante').text($('#nomeSolicitante').val());
	$('#spanCNPJSolicitante').text(cpfCnpjRevenda);
	$('#spanEndSolicitante').text(cidadeRevenda + '/' + UFRevenda);

	if (CURRENT_STATE == INICIO_0) {
		$('#divDefineCancelar').hide();

		var today = new Date();

		FLUIGC.calendar('#dataAberturaPed', {
			language: 'pt-br',
			minDate: today,
			pickDate: true,
			pickTime: false,
			defaultDate: today

		});

		FLUIGC.calendar('#dataVenda', {
			language: 'pt-br',
			pickDate: true,
			pickTime: false

		});

		FLUIGC.calendar('#dataEmissaoBalcao', {
			language: 'pt-br',
			pickDate: true,
			pickTime: false

		});

		//Redespacho
		if (!$('#chkRedespacho').prop('checked')) {
			setZoomRedespachoDisable();
		}

	} else if (CURRENT_STATE == INICIO) {

		var A1_PAIS = $('#A1_PAIS').val().toUpperCase();
		var A1_TIPO = $('#A1_TIPO').val().toUpperCase();

		if (A1_TIPO == 'GERENTE' && FORM_MODE != 'VIEW' && A1_PAIS != 'USA') {
			$('#divOrcamentoPedido').show();
			var defineOrcamentoPedido = $("input:radio[name='defineOrcamentoPedido']:checked").val();

			funcoes.defineOrcamentoPedido(defineOrcamentoPedido);

		}

		var today = new Date();

		FLUIGC.calendar('#dataAberturaPed', {
			language: 'pt-br',
			minDate: today,
			pickDate: true,
			pickTime: false,
			defaultDate: today
		});

		FLUIGC.calendar('#dataVenda', {
			language: 'pt-br',
			pickDate: true,
			pickTime: false

		});

		FLUIGC.calendar('#dataEmissaoBalcao', {
			language: 'pt-br',
			pickDate: true,
			pickTime: false

		});

		//Redespacho
		if ($('#chkRedespacho').prop('checked')) {
			//Oculta Transportadora Zoom
			$('#divDSTransp').hide();
			//Mostra Transportadora Text
			$('#divTransp').show();
			$('#divTxtTransp').hide();

			$('#nomeTransportadora').prop('readonly', true);
			$('#chkTransporteProprio').prop('checked', false);
			$('#chkTransporteProprio').prop('disabled', true);
		} else {
			setZoomRedespachoDisable();
		}

		if ($('#origemSolicitacao').val() == 'catalogo' && $('#itensProcessados').val() != 'true') {
			//Carrega campo iniciais que são fixos no html (Quando vem de integração, deveria passar esses campos, porém aqui vamos forçar eles quando carrega a pag.)
			$('#porcDescontoParamCondPgtoAV').val('3');
			$('#CPOpcaoRecebimento_1').val('1');
			$('#CPDiasRetirada_1').val('30');
			$('#CPProgramacaoRetirada_1').val('30 dias');
			$('#CPOpcaoRecebimento_2').val('2');
			$('#CPOpcaoRecebimento_3').val('3');
			$('#ValorValido').val('true');

			if ($('#A1_PAIS').val() == 'USA') {

				$("input[name*=orcCodProdutoItem___]").each(function (index) {
					index = validafunctions.getPosicaoFilho($(this).attr("id"));
					let orcItemProcessadoItem = $("#orcItemProcessadoItem___" + index).val().trim();

					//Se o orcPrecoCustoItem ainda estiver vazio, significa que precisa realizar a busca dessas informações.
					if (orcItemProcessadoItem == '') {
						funcoes.consultaProdutoUSAPorItem(index);
					}

				});

			} else {
				//chama a funcao consultaProdutoPorItem que irá buscar os dados dos produtos e calcular o preço
				var PercentDesconto = 0;
				var flDesc = 'N';
				$("input[name*=orcCodProdutoItem___]").each(function (index) {
					index = validafunctions.getPosicaoFilho($(this).attr("id"));
					let orcItemProcessadoItem = $("#orcItemProcessadoItem___" + index).val().trim();

					//Se o orcPrecoCustoItem ainda estiver vazio, significa que precisa realizar a busca dessas informações.
					if (orcItemProcessadoItem == '') {
						funcoes.consultaProdutoPorItem(index, PercentDesconto, flDesc);
					}

				});
			}

		}



	} else if (CURRENT_STATE == FORMALIZAPEDIDO) {
		$('#condPagto').attr('readonly', true);
		$('#tpFrete').attr('readonly', true);

		if (getLanguage() == 'en_US') {
			$('#cabecalho').text('Order');
		} else {
			$('#cabecalho').text('Pedido');
		}
		funcoes.camposGarantiaBalcao();

		var today = new Date();

		FLUIGC.calendar('#dataAberturaPed', {
			language: 'pt-br',
			minDate: today,
			pickDate: true,
			pickTime: false,
			defaultDate: today

		});

		FLUIGC.calendar('#dataVenda', {
			language: 'pt-br',
			pickDate: true,
			pickTime: false

		});

		FLUIGC.calendar('#dataEmissaoBalcao', {
			language: 'pt-br',
			pickDate: true,
			pickTime: false

		});

		//Redespacho
		if ($('#chkRedespacho').prop('checked')) {
			//Oculta Transportadora Zoom
			$('#divDSTransp').hide();
			//Mostra Transportadora Text
			$('#divTransp').show();
			$('#divTxtTransp').hide();

			$('#nomeTransportadora').prop('readonly', true);
			$('#chkTransporteProprio').prop('checked', false);
			$('#chkTransporteProprio').prop('disabled', true);
		} else {
			setZoomRedespachoDisable();
		}

	} else if (CURRENT_STATE == ANALISAERROINTEGRAORCAMENTO) {
		$('#divGerenteAdm :input').attr('readonly', true);
		$('#numOrcamento').attr('readonly', false);
		$('#numPedido').attr('readonly', false);
		$('#CPNumOrcProtheus_1').attr('readonly', false);
		$('#CPNumOrcProtheus_2').attr('readonly', false);
		$('#CPNumOrcProtheus_3').attr('readonly', false);
		$('#CPNumPedProtheus_1').attr('readonly', false);
		$('#CPNumPedProtheus_2').attr('readonly', false);
		$('#CPNumPedProtheus_3').attr('readonly', false);
		funcoes.mostraCamposTipoPedido();

		if (getLanguage() == 'en_US') {
			$('#cabecalho').text('Order');
		} else {
			$('#cabecalho').text('Pedido');
		}

		var tipoPedido = $('#tipoPedido').val();

		if (tipoPedido == 'PG') {
			$("#divGarantiaBalcao").show();

			var serieEquipamento = $("#serieEquipamento").val();

			//Se a série for vazio a Garantia balcão é sim, se estiver preenchido é não
			if (serieEquipamento == '') {
				$("#tipoPG").show();

				$(".tipoPGBalcaoSim").show();
				$(".tipoPGBalcaoNao").hide();
				$("#tipoPGBalcaoNaoSerie").hide();

			} else if (serieEquipamento != '') {
				$("#tipoPG").show();

				$(".tipoPGBalcaoSim").hide();
				$(".tipoPGBalcaoNao").show();
				$("#tipoPGBalcaoNaoSerie").show();
			}

			$('#divRedespacho').removeClass('col-md-offset-7');
			$('#divRedespacho').addClass('col-md-offset-4');
		} else {
			$("#divGarantiaBalcao").hide();
		}

		//Diminui tamanho Desc Produto
		$(".descProdTabela").css({
			//		     minWidth: "230px"
			width: "230px",
			maxWidth: "230px"
		});

	} else if (CURRENT_STATE == GTSVERIFICAORCAMENTO) {
		$('#divGerenteAdm :input').attr('readonly', true);
		$('#numPedido').attr('readonly', false);
		funcoes.mostraCamposTipoPedido();

		$('#divOrcamentoProduto').hide();

		if (getLanguage() == 'en_US') {
			$('#cabecalho').text('Order');
		} else {
			$('#cabecalho').text('Pedido');
		}

		var tipoPedido = $('#tipoPedido').val();

		if (tipoPedido == 'PG') {
			$("#divGarantiaBalcao").show();

			var serieEquipamento = $("#serieEquipamento").val();

			//Se a série for vazio a Garantia balcão é sim, se estiver preenchido é não
			if (serieEquipamento == '') {
				$("#tipoPG").show();

				$(".tipoPGBalcaoSim").show();
				$(".tipoPGBalcaoNao").hide();
				$("#tipoPGBalcaoNaoSerie").hide();

			} else if (serieEquipamento != '') {
				$("#tipoPG").show();

				$(".tipoPGBalcaoSim").hide();
				$(".tipoPGBalcaoNao").show();
				$("#tipoPGBalcaoNaoSerie").show();
			}

			$('#divRedespacho').removeClass('col-md-offset-7');
			$('#divRedespacho').addClass('col-md-offset-4');
		} else {
			$("#divGarantiaBalcao").hide();
		}

	} else if (CURRENT_STATE == ANALISAERROINTEGRAPEDIDO) {

		$('#divGerenteAdm :input').attr('readonly', true);
		$('#numPedido').attr('readonly', false);
		$('#CPNumPedProtheus_1').attr('readonly', false);
		$('#CPNumPedProtheus_2').attr('readonly', false);
		$('#CPNumPedProtheus_3').attr('readonly', false);
		funcoes.mostraCamposTipoPedido();

		if (getLanguage() == 'en_US') {
			$('#cabecalho').text('Order');
		} else {
			$('#cabecalho').text('Pedido');
		}



		var tipoPedido = $('#tipoPedido').val();

		if (tipoPedido == 'PG') {
			$("#divGarantiaBalcao").show();

			var serieEquipamento = $("#serieEquipamento").val();

			//Se a série for vazio a Garantia balcão é sim, se estiver preenchido é não
			if (serieEquipamento == '') {
				$("#tipoPG").show();

				$(".tipoPGBalcaoSim").show();
				$(".tipoPGBalcaoNao").hide();
				$("#tipoPGBalcaoNaoSerie").hide();

			} else if (serieEquipamento != '') {
				$("#tipoPG").show();

				$(".tipoPGBalcaoSim").hide();
				$(".tipoPGBalcaoNao").show();
				$("#tipoPGBalcaoNaoSerie").show();
			}

			$('#divRedespacho').removeClass('col-md-offset-7');
			$('#divRedespacho').addClass('col-md-offset-4');
		} else {
			$("#divGarantiaBalcao").hide();
		}

		//Diminui tamanho Desc Produto
		$(".descProdTabela").css({
			minWidth: "230px",
			width: "230px",
			maxWidth: "230px"
		});


	} else if (CURRENT_STATE == GTSVERIFICAPEDIDO) {
		$('#divGerenteAdm :input').attr('readonly', true);
		$('#numPedido').attr('readonly', false);
		funcoes.mostraCamposTipoPedido();

		$('#divOrcamentoProduto').hide();

		if (getLanguage() == 'en_US') {
			$('#cabecalho').text('Order');
		} else {
			$('#cabecalho').text('Pedido');
		}

		var tipoPedido = $('#tipoPedido').val();

		if (tipoPedido == 'PG') {
			$("#divGarantiaBalcao").show();

			var serieEquipamento = $("#serieEquipamento").val();

			//Se a série for vazio a Garantia balcão é sim, se estiver preenchido é não
			if (serieEquipamento == '') {
				$("#tipoPG").show();

				$(".tipoPGBalcaoSim").show();
				$(".tipoPGBalcaoNao").hide();
				$("#tipoPGBalcaoNaoSerie").hide();

			} else if (serieEquipamento != '') {
				$("#tipoPG").show();

				$(".tipoPGBalcaoSim").hide();
				$(".tipoPGBalcaoNao").show();
				$("#tipoPGBalcaoNaoSerie").show();
			}

			$('#divRedespacho').removeClass('col-md-offset-7');
			$('#divRedespacho').addClass('col-md-offset-4');
		} else {
			$("#divGarantiaBalcao").hide();
		}


	} else if (CURRENT_STATE == CANCELAMENTOFORMALIZA || CURRENT_STATE == CANCELAMENTOPEDIDO || CURRENT_STATE == FIM) {

		$('#divOrcamentoProduto').hide();


		var tipoPedido = $('#tipoPedido').val();

		if (tipoPedido == 'PG') {
			$("#divGarantiaBalcao").show();

			var serieEquipamento = $("#serieEquipamento").val();

			//Se a série for vazio a Garantia balcão é sim, se estiver preenchido é não
			if (serieEquipamento == '') {
				$("#tipoPG").show();

				$(".tipoPGBalcaoSim").show();
				$(".tipoPGBalcaoNao").hide();
				$("#tipoPGBalcaoNaoSerie").hide();

			} else if (serieEquipamento != '') {
				$("#tipoPG").show();

				$(".tipoPGBalcaoSim").hide();
				$(".tipoPGBalcaoNao").show();
				$("#tipoPGBalcaoNaoSerie").show();
			}

			$('#divRedespacho').removeClass('col-md-offset-7');
			$('#divRedespacho').addClass('col-md-offset-4');
		} else {
			$("#divGarantiaBalcao").hide();
		}

	}

}

function setSelectedZoomItem(selectedItem) {

	if (selectedItem.inputId == "zoomCondPagto") {

		$('#codCondPagto').val(selectedItem.codCondPagto);
		$('#condPagto').val(selectedItem.descCondPagto);

		//Precisa recalcular o preço, porque se for à vista, precisa aplicar o desconto
		funcoes.recalculaPrecoComDesconto();

	} else if (selectedItem.inputId == "CPProgramacaoRetirada_2") {

		$('#CPDiasRetirada_2').val(selectedItem["qtdDias"]);
		//Sempre que seleciona o 2, limpa o dia e recarrega o 3
		$('#CPDiasRetirada_3').val('');
		window["CPProgramacaoRetirada_3"].clear();
		reloadZoomFilterValues('CPProgramacaoRetirada_3', "qtdDias," + selectedItem["qtdDias"]);

	} else if (selectedItem.inputId == "CPProgramacaoRetirada_3") {

		$('#CPDiasRetirada_3').val(selectedItem["qtdDias"]);

	} else if (selectedItem.inputId == "tpTransportadora") {
		$('#codTransportadora').val(selectedItem["A4_COD"]);

	} else if (selectedItem.inputId == "zoomRedespacho") {

		$('#codTransportadora').val(selectedItem["codTransportadora"]);
		$('#nomeRedespacho').val(selectedItem["descRedespacho"]);
		$('#nomeTransportadora').val(selectedItem["descTransportadora"]);
		$('#redespachoMsgNotaFiscal').val(selectedItem["msgNotaFiscal"]);

	}
}


function setZoomData(instance, value) {
	window[instance].setValue(value);
}

function removedZoomItem(removedItem) {

	if (removedItem.inputId == "zoomCondPagto") {

		$('#codCondPagto').val('');
		$('#condPagto').val('');
		window["zoomCondPagto"].clear();
		//Precisa recalcular o preço, porque se estava setado à vista, precisa tirar o desconto aplicado
		funcoes.recalculaPrecoComDesconto();

	} else if (removedItem.inputId == "CPProgramacaoRetirada_2") {

		$('#CPDiasRetirada_2').val('');
		window["CPProgramacaoRetirada_2"].clear();
		$('#CPDiasRetirada_3').val('');
		window["CPProgramacaoRetirada_3"].clear();

		reloadZoomFilterValues('CPProgramacaoRetirada_3', "qtdDias,100");
	} else if (removedItem.inputId == "CPProgramacaoRetirada_3") {

		$('#CPDiasRetirada_3').val('');
		window["CPProgramacaoRetirada_3"].clear();
	} else if (removedItem.inputId == "tpTransportadora") {
		window["tpTransportadora"].clear();
		$('#codTransportadora').val('');
	} else if (removedItem.inputId == "zoomRedespacho") {

		window["zoomRedespacho"].clear();
		$('#codTransportadora').val('');
		$('#nomeTransportadora').val('');
		$('#nomeRedespacho').val('');
		$('#redespachoMsgNotaFiscal').val('');

	}

}
