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

		// limpa campos ao sair
		limpaCamposProdInicial: function(indexItem){
			$("#solProdutoAtual___"+indexItem).val('');
			$("#solDescAtual___"+indexItem).val('');
		},

		limpaCamposProdFinal: function(indexItem){
			$("#solProdutoDestino___"+indexItem).val('');
			$("#solDescDestino___"+indexItem).val('');
		},
		
		consultaProduto : function(indexItem){
			
			let codProduto = $("#solProdutoAtual___"+indexItem).val();

			if( codProduto.trim() == "" ){
				return;
			}
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProd&filterFields=PROCOD,"+codProduto,
				data: "",
				
				success: function (data, status, xhr) {
					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						if( records[0].CODRET == "1"){
							var record = records[0];
							var CodigoItem = record.PROCOD;
							var DescricaoItem = record.PRODESC;
							
							$("#solDescAtual___"+indexItem).val(DescricaoItem);
							
						}else if (records[0].CODRET == "2"){
							FLUIGC.toast({ title: '', message: records[0].MSGRET, type: 'warning' });
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

		consultaProdutoDestino : function(indexItem){
			
			let codProduto = $("#solProdutoDestino___"+indexItem).val();

			if( codProduto.trim() == "" ){
				return;
			}
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProd&filterFields=PROCOD,"+codProduto,
				data: "",
				
				success: function (data, status, xhr) {
					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						if( records[0].CODRET == "1"){
							var record = records[0];
							var CodigoItem = record.PROCOD;
							var DescricaoItem = record.PRODESC;
							
							$("#solDescDestino___"+indexItem).val(DescricaoItem);
							
						}else if (records[0].CODRET == "2"){
							FLUIGC.toast({ title: '', message: records[0].MSGRET, type: 'warning' });
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

			//data set consulta de produtos
			$(document).on("change", ".inputItSolProduto", function() {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				
				if( $(this).val().trim() == ""){
					funcoes.limpaCamposProdInicial(index);
					
				}else{
					funcoes.consultaProduto(index);	
				}
				
			});

			//data set consulta de produtos
			$(document).on("change", ".inputItSolProdutoDestino", function() {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				
				if( $(this).val().trim() == ""){
					funcoes.limpaCamposProdFinal(index);
					
				}else{
					funcoes.consultaProdutoDestino(index);	
				}
				
			});

			$(document).on("click", "#addMaquina",function() {
				let addNovoItem = true;
				$("input[name*=solProdutoAtual___]").each(function(index) {
					var index = validafunctions.getPosicaoFilho($(this).attr("id"));
					//var itSolTipoDespesaItem = $("#isolProdutoAtual___"+ index).val();

				//	if (itSolTipoDespesaItem.trim() == "") {
					//	addNovoItem = false;
				//	}
												});
					if (!addNovoItem) {
						FLUIGC.toast({title : '',message : "É preciso preencher o Tipo de Despesa anterior para adicionar um novo item.",type : 'warning'});
					}else{
						funcoes.addLinhaDespesa();
					}
				});
		}
	}
})();

function removeDespesa(oElement) {
	fnWdkRemoveChild(oElement);
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

	} else if (CURRENT_STATE == ANALISA_ALTERACAO) {

		FLUIGC.calendar('#solPrazo', {
			language : 'pt-br',
			maxDate : today,
			pickDate : true,
			pickTime : false,
			defaultDate : today

		});

		FLUIGC.calendar('#solDataPrevista', {
			language : 'pt-br',
			maxDate : '',
			pickDate : true,
			pickTime : false,

		});
	}

}
