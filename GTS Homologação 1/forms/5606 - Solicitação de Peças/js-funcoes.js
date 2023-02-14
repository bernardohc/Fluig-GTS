$(document).ready(function() {
	setTimeout(function() {
		funcoes.start();
	}, 100)	
});
//Aqui cria as funcioes
var funcoes = (function() {
	var loading = FLUIGC.loading(window);
	var index = 0;

	return {
		start : function() {
			eventsFuncoes.setup();
		},
		// limpa campos ao sair
		limpaCamposItem: function(indexItem){
			$("#solProduto___"+indexItem).val('');
			$("#solDescAtual___"+indexItem).val('');
		},
		
		consultaProduto : function(indexItem){
			
			let codProduto = $("#solProduto___"+indexItem).val();

			if( codProduto.trim() == "" ){
				return;
			}
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProdutoPCP&filterFields=cPROD,"+codProduto,
				
				success: function (data, status, xhr) {
					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						if( records[0].CODRET == "1"){
							var record = records[0];
							var DescricaoItem = record.CDESC;
							
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
			
		/*
		 * Formulário
		 */
		
		addLinhaDespesa: function(){
			var row = wdkAddChild('solTbMaquinas');
			//Insere calendario no formulario filho a ao criar nova linha
			FLUIGC.calendar('.data')	    
		},
		
	}
})();

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	
			
			/*
			 * Adiantamento
			 */
			
			//data set consulta de produtos
			$(document).on("change", ".inputItSolProduto", function() {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				
				if( $(this).val().trim() == ""){
					funcoes.limpaCamposItem(index);
					
				}else{
					funcoes.consultaProduto(index);	
				}
				
			});
			
			$(document).on("change", "#Unidade", function() {
				let unidade = $("#Unidade").val();
				
				if(setor == 'Matriz'){
					//Grupo Relatório de Viagens - Analisa Motorista
					$('#grupoAnalisaSolicitacao').val('Pool:Group:000011');
				}/*else if(unidade == 'Técnico'){
					//Grupo Relatório de Viagens - Analisa Técnico
					$('#grupoAnalisaSolicitacao').val('Pool:Group:000004');
				}*/else{
					$('#grupoAnalisaSolicitacao').val('');
				}
				
			});
			
			//Validação para adiconar nova despesa, o itSolTipoDespesaItem não pode estar vazio
			$(document).on("click", "#addMaquina", function() {
				let addNovoItem = true;
				$("input[name*=solProduto___]").each(function(index){
					var index = validafunctions.getPosicaoFilho($(this).attr("id"));
					var solProduto = $("#solProduto___"+index).val();
					var solQuantidade = $("#solQuantidade___"+index).val();
					var solTipo = $("#solTipo___"+index).val();
					
					if(solProduto.trim() == ""){
						addNovoItem = false;
					}
					if(solQuantidade.trim() == ""){
						addNovoItem = false;
					}
					if(solTipo.trim() == ""){
						addNovoItem = false;
					}
				});
					if(!addNovoItem){
						FLUIGC.toast({ title: '', message: "É preciso preencher a Solicitação anterior para adicionar uma nova.", type: 'warning' });
					}else{
						funcoes.addLinhaDespesa();
					}
			});

		}
	}
})();


//Remover despessas do pai e filho
function removeDespesa(oElement){
	fnWdkRemoveChild(oElement);
	
};

function loadForm(){
	
	window.parent.$("#breadcrumb").remove();
	//Aba Anexo
	window.parent.$("#processTabs").find("li").first().hide();
	window.parent.$("#processTabs").find("li").last().hide();
	window.parent.$("#textActivity").remove();
	//Botões
	window.parent.$('#wcm_widget').find("[data-back]").css("display","none");
	window.parent.$('#wcm_widget').find("[data-back]").removeAttr("data-back");
	window.parent.$('#wcm_widget').find("[data-cancel]").css("display","none");
	window.parent.$('#wcm_widget').find("[data-cancel]").removeAttr("data-cancel");
	window.parent.$('#wcm_widget').find("[data-transfer]").css("display","none");
	window.parent.$('#wcm_widget').find("[data-transfer]").removeAttr("data-transfer");
	
	var today = new Date();	
	
	if(CURRENT_STATE == INICIO_0)
	{	
		funcoes.addLinhaDespesa()
		
	}else if(CURRENT_STATE == INICIO){
				
		funcoes.addLinhaDespesa()
	
	}else if(CURRENT_STATE == ANALISA_RELATORIO){
		
		
	}else if(CURRENT_STATE == AJUSTA_RELATORIO){
		
	}

}
	


