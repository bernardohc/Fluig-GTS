
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
		}
		
	}
})();


var eventsFuncoes = (function() {
	return {
		setup : function() {	
			
			/*
			 * Tabela de Itens
			 */
//			$(document).on("click", "#addItem", function() {
//				
//				var addLinha = true;
//				$("input[name*=divergPecaCodProdItem___]").each(function(index){
//					var index = validafunctions.getPosicaoFilho($(this).attr("id"));
//					var divergPecaCodProdItemIndex = $('#divergPecaCodProdItem___' + index).val();
//
//					if(divergPecaCodProdItemIndex == ""){
//						addLinha = false;
//					}
//				});
//				
//				if(addLinha){
//					funcoes.addLinhaItem();
//				}
//				
//			});
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

function loadForm(){


	
}