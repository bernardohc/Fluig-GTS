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
		 * Alteração de Maquinas
		 */

		addLinhaDespesa : function() {
			var row = wdkAddChild('solTbMaquinas');
			FLUIGC.calendar('.data')
		},

		/*
		 * *Utils
		 */

	}
})();

// Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {

			/*
			 * Solicitação Reembolso
			 */

			$(document)
			.on(
					"click",
					"#addDespesa",
					function() {
						let
						addNovoItem = true;
						$("input[name*=itSolValorReembolsoItem___]")
								.each(
										function(index) {
											var index = validafunctions
													.getPosicaoFilho($(
															this).attr(
															"id"));
											var itSolTipoDespesaItem = $(
													"#itSolTipoDespesaItem___"
															+ index)
													.val();

											if (itSolTipoDespesaItem
													.trim() == "") {
												addNovoItem = false;
											}
										});
						if (!addNovoItem) {
							FLUIGC
									.toast({
										title : '',
										message : "É preciso preencher o Tipo de Despesa anterior para adicionar um novo item.",
										type : 'warning'
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

		FLUIGC.calendar('#solPrazo', {
			language : 'pt-br',
			maxDate : today,
			pickDate : true,
			pickTime : false,
			defaultDate : today

		});

		funcoes.addLinhaDespesa()

	} else if (CURRENT_STATE == INICIO) {
		;

		FLUIGC.calendar('#solPrazo', {
			language : 'pt-br',
			maxDate : today,
			pickDate : true,
			pickTime : false,
			defaultDate : today
		});

	} else if (CURRENT_STATE == AJUSTA_REEMBOLSO) {

		FLUIGC.calendar('#solPrazo', {
			language : 'pt-br',
			maxDate : today,
			pickDate : true,
			pickTime : false,
			defaultDate : today

		});
	}

}
