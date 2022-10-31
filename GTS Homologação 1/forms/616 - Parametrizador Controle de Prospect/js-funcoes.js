var modalError = null;

function init(){
	if(FORM_MODE == "VIEW"){
		controleDeTelaModoView();
	}
}

function addLinha(){
	var index = wdkAddChild("table_familia_tipo_produto");
	$("#idRegistro___" + index).val(index);
	
}

function removeRegistro(elem){
	fnWdkRemoveChild(elem);
}

function controleDeTelaModoView(){
	$("#div_rowBtnAddTipo").hide();
	
	var deletes = $("input[id^='idDelete___']");
	if(deletes != null && deletes != undefined && deletes.length != null && deletes.length != undefined){
		for(var i = 0; i < deletes.length; i++){
			var delAtual = deletes[i];
			$(delAtual).parent().remove();
		}
	}
}

function loadForm(){
	if(FORM_MODE == "VIEW"){
		$('#btnAddLinha').hide();
	}
}

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
		alimentaCampoFamiliaTipoProduto : function(index){
			
			var familia = $('#familia___'+index).val();
			var tipoProduto = $('#tipoProduto___'+index).val();
			
			var familiaTipoProduto = '';
    		if(familia != '' && tipoProduto != ''){
    			familiaTipoProduto = familia + ' - ' + tipoProduto;
    		}else if(familia != '' && tipoProduto == ''){
    			familiaTipoProduto = familia;
    		}else if(familia == '' && tipoProduto != ''){
    			familiaTipoProduto = tipoProduto;
    		}
    		
    		
			$('#familiaTipoProduto___'+index).val(familiaTipoProduto);
		},
	}
})();

var eventsFuncoes = (function() {
	return {
		setup : function() {	
			

			$(document).on("blur", ".familia", function() {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				
				funcoes.alimentaCampoFamiliaTipoProduto(index);
			});
			
			$(document).on("blur", ".tipoProduto", function() {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				
				funcoes.alimentaCampoFamiliaTipoProduto(index);
			});
			
			
		}
	}
})();

