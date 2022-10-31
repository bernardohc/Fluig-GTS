
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
		
				
		/*
		 * CLIENTE
		 */
		addLinhaItem : function(){
	    	row = wdkAddChild('tbItensDivergPecas');

	    	$("#divergPecaQtdItem___" + row ).val('1')
	    	$("#divergPecaQtdDivergenteItem___" + row ).val('1')
	    	
	    	$("#divergPecaValUnitItem___" + row ).val('0')
	    	validafunctions.setMoeda("divergPecaValUnitItem___" + row,2, false , '')
	    	$("#divergPecaValTotalItem___" + row ).val('0')
	    	validafunctions.setMoeda("divergPecaValTotalItem___" + row,2, false , '')
	    	
	    	$("#divergPecaAvaliacaoItem___" + row ).hide();
	    	
		}
		
	}
})();


var eventsFuncoes = (function() {
	return {
		setup : function() {	
			
			/*
			 * Tabela de Itens
			 */
			$(document).on("click", "#addItem", function() {
				
				var addLinha = true;
				$("input[name*=divergPecaCodProdItem___]").each(function(index){
					var index = validafunctions.getPosicaoFilho($(this).attr("id"));
					var divergPecaCodProdItemIndex = $('#divergPecaCodProdItem___' + index).val();

					if(divergPecaCodProdItemIndex == ""){
						addLinha = false;
					}
				});
				
				if(addLinha){
					funcoes.addLinhaItem();
				}
				
			});
			
			///quantidad e divergente;
			
		}
	}
})();




function modal( title , html) {
    var myModal = FLUIGC.modal({
        title: title ,
        content: html,
        id: 'fluig-modal',
        actions: [{
            'label': 'Fechar',
            'autoClose': true
        }]
    }, function(err, data) {
        if (err) {
            // do error handling
        } else {
            // do something with data
        }
    });
}


function removeItem(oElement){
	fnWdkRemoveChild(oElement);
}

function loadForm(){

	var WKNumState = $("#WKNumState").val();
	
	
	if(CURRENT_STATE == INICIO_0)
	{
		FLUIGC.calendar('#divergPecaDataEmissao',{
			  language: 'pt-br',
			  maxDate: new Date(),
			  pickDate: true,
			  pickTime: false 
		});
		
		funcoes.addLinhaItem();
		
	}
	
}