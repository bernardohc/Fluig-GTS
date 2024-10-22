$(document).ready(function() {
	setTimeout(function() {
		funcoes.start();
	}, 100)	
});

const dataAtual = getDataAtual();

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
	}
})();

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	

			//Gatilhos
			
		}
	}
})();

function loadForm(){	
	
	if(CURRENT_STATE == INICIO_0){


	}else if(CURRENT_STATE == INICIO){

		if(FORM_MODE == "MOD"){
			if($('#campo').val() != ''){
				
			}
		}if(isMobile == 'true'){
			
		}

	}
};
