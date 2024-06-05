$(document).ready(function() {
	setTimeout(function() {
		funcoes.start();
	}, 100)	
});

//const dataAtual = getDataAtual();

//Aqui cria as funcioes
var funcoes = (function() {
	var loading = FLUIGC.loading(window);
	var index = 0;
	let contador = 1000;
	let totalSoma = 0;

	return {
		start : function() {
			eventsFuncoes.setup();
		},	
		//Funções aqui

		aplicarMascaraTelefone : function(elementId){

			var input = document.getElementById(elementId);
            var texto = input.value;

            // Remove todos os caracteres que não são dígitos
            texto = texto.replace(/\D/g, "");

            // Aplica a máscara de telefone celular
            if (texto.length > 0) {
                texto = '(' + texto;
            }
            if (texto.length > 3) {
                texto = texto.slice(0, 3) + ') ' + texto.slice(3);
            }
            if (texto.length > 10) {
                texto = texto.slice(0, 10) + '-' + texto.slice(10, 14);
            }
            // Limita o comprimento a 15 caracteres (formato (XX) XXXXX-XXXX)
            if (texto.length > 15) {
                texto = texto.slice(0, 15);
            }
            // Atualiza o valor do campo com o texto formatado
            input.value = texto;
		},
	}
})();

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	

			//Gatilhos
			$(document).on("input", "#psoTelefone", function() {
				funcoes.aplicarMascaraTelefone('psoTelefone');
			});
			
		}
	}
})();

function loadForm(){	
	
	// if(CURRENT_STATE == INICIO_0){


	// }else if(CURRENT_STATE == INICIO){

	// 	if(FORM_MODE == "MOD"){
	// 		if($('#campo').val() != ''){
				
	// 		}
	// 	}if(isMobile == 'true'){
			
	// 	}

	// }
};
