$(document).ready(function() {
	setTimeout(function() {
		funcoes.start();
	}, 100)	
});


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

		addAno : function(){
			var input = document.getElementById("sgSolAno");
            var texto = input.value;
            // Remove qualquer caractere que não seja número
            input = texto.replace(/[^0-9]/g, "");

            // Limita o comprimento a 4 caracteres
            if (texto.length > 4) {
                texto = texto.slice(0, 4);
            }
            // Verifica se o ano está dentro do intervalo permitido
            if (texto.length === 4) {
                var ano = parseInt(texto, 10);
                if (ano < 1900 || ano > 2050) {
                    texto = "";
                }
            }
			
			$('#sgSolAno').val(input);
		},

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

		//Valida os dados da despesa antes de enviar pro pai x filho
		validaAddDespesa : function(){

			let hasErros = false;
			let message = '';
			let sgAddItemCodigo = $('#sgAddItemCodigo').val().trim();
			let sgAddItemQtde = $('#sgAddItemQtde').val().trim();
			let sgAddItemModFalha = $('#sgAddItemModFalha').val().trim();

			if( sgAddItemCodigo == '' ){
				message += getMessage("Código", 1, form);
				hasErros = true
			}
			if( sgAddItemQtde == '' ){
				message += getMessage("Quantidade", 1, form);
				hasErros = true
			}
			if( sgAddItemDesc == '' ){
				message += getMessage("Quantidade", 1, form);
				hasErros = true
			}
			if( sgAddItemModFalha == '' ){
				message += getMessage("Quantidade", 1, form);
				hasErros = true
			}
			if( hasErros ){
				messageToast({message: message}, 'warning')
				return;
			}	
			return true;

			funcoes.addItensSg();
		},
		

		addItensSg : function(){
			const indice = wdkAddChild("tbItens");

			let sgAddItemCodigo = $("#sgAddItemCodigo").val();
			let sgAddItemQtde = $("#sgAddItemQtde").val();
			let sgAddItemDesc = $("#sgAddItemDesc").val();
			let sgAddItemModFalha = $("#sgAddItemModFalha").val();

			$(`#sgItensCod___${indice}`).val(sgAddItemCodigo)
			$(`#sgItensQtd___${indice}`).val(sgAddItemQtde)
			$(`#sgItensDesc___${indice}`).val(sgAddItemDesc)
			$(`#sgItensModFalha___${indice}`).val(sgAddItemModFalha)


			funcoes.LimpaItensSg();
		},

		LimpaItensSg : function(){
			$("#sgAddItemCodigo").val("");
			$("#sgAddItemQtde").val("");
			$("#sgAddItemDesc").val("");
			$("#sgAddItemModFalha").val("");
		},


	}
})();

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	

			//Gatilhos
			$(document).on("input", "#sgSolAno", function() {
				funcoes.addAno();
			});

			$(document).on("input", "#sgSolCelCli", function() {
				funcoes.aplicarMascaraTelefone('sgSolCelCli');
			});
			$(document).on("input", "#sgSolTelCli", function() {
				funcoes.aplicarMascaraTelefone('sgSolTelCli');
			});
			$(document).on("input", "#sgSolTelRev", function() {
				funcoes.aplicarMascaraTelefone('sgSolTelRev');
			});

		}
	}
})();

function loadForm(){
	//let tpMaquina = document.getElementById("tpMaquina").value;
	
	
	$("[milho]").hide();
	$("[flexer]").hide();
	$("[terrus]").hide();
	
	if(CURRENT_STATE == INICIO_0){

		var solDataSaidaCal = FLUIGC.calendar('#sgSolDtFat', {
			language: 'pt-br',
			pickDate: true,
			pickTime: false,
		});

		var solDataSaidaCal = FLUIGC.calendar('#sgSolDtFabrica', {
			language: 'pt-br',
			pickDate: true,
			pickTime: false,
		});

		$(document).on("input", "#divRadio", function() {
			var tpMaquina = $("input:radio[name='tpMaquina']:checked").val();
			if(tpMaquina == "milho"){
				$("[milho]").show();
				$("[flexer]").hide();
				$("[terrus]").hide();
			}else if(tpMaquina == "flexer"){
				$("[milho]").hide();
				$("[flexer]").show();
				$("[terrus]").hide();
			}else if(tpMaquina == "terrus"){
				$("[milho]").hide();
				$("[flexer]").hide();
				$("[terrus]").show();
			}

			$('#tipoMaqHidden').val(tpMaquina);
		});

	}else if(CURRENT_STATE == INICIO){

		if(FORM_MODE == "MOD"){
			if($('#campo').val() != ''){
				
			}
		}if(isMobile == 'true'){
			
		}

	}
};
