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
		validaAddItem : function(){

			let hasErros = false;
			let message = '';
			let sgAddItemCodigo = $('#sgAddItemCodigo').val().trim();
			let sgAddItemQtde = $('#sgAddItemQtde').val().trim();
			let sgAddItemDesc = $('#sgAddItemDesc').val().trim();
			let sgAddItemModFalha = $('#sgAddItemModFalha').val().trim();

			if( sgAddItemCodigo === '' ){
				message += getMessage("Código do item", 1, form);
				hasErros = true
			}
			if( sgAddItemQtde === '' ){
				message += getMessage("Quantidade", 1, form);
				hasErros = true
			}
			if( sgAddItemDesc ==='' ){
				message += getMessage("Descrição", 1, form);
				hasErros = true
			}
			if( sgAddItemModFalha === '' ){
				message += getMessage("Modo de Falha", 1, form);
				hasErros = true
			}
			if( hasErros ){
				messageToast({message: message}, 'warning')
				return;
			}	
			return true;

		},

		//Valida os dados da despesa antes de enviar pro pai x filho
		validaAddAtend : function(){

			let hasErros = false;
			let message = '';
			let sgSolDtAtend = $('#sgSolDtAtend').val().trim();
			let sgSolTpServico = $('#sgSolTpServico').val().trim();
			let sgSolDeslocamento = $('#sgSolDeslocamento').val().trim();
			let sgSolObs = $('#sgSolObs').val().trim();

			if( sgSolDtAtend === '' ){
				message += getMessage("Data do Atendimento", 1, form);
				hasErros = true
			}
			if( sgSolTpServico === '' ){
				message += getMessage("Tempo de Serviço", 1, form);
				hasErros = true
			}
			if( sgSolDeslocamento ==='' ){
				message += getMessage("Deslocamento", 1, form);
				hasErros = true
			}
			// if( sgSolObs === '' ){
			// 	message += getMessage("Observação", 1, form);
			// 	hasErros = true
			// }
			if( hasErros ){
				messageToast({message: message}, 'warning')
				return;
			}	
			return true;

			//funcoes.addItensSg();
		},
		

		addItensSg : function(){
			const indice = wdkAddChild("tbItens");

			let sgAddItemOrdem = $("#sgAddItemOrdem").val();
			let sgAddItemCodigo = $("#sgAddItemCodigo").val();
			let sgAddItemQtde = $("#sgAddItemQtde").val();
			let sgAddItemDesc = $("#sgAddItemDesc").val();
			let sgAddItemModFalha = $("#sgAddItemModFalha").val();

			$(`#sgItensOrdem___${indice}`).val(sgAddItemOrdem)
			$(`#sgItensCod___${indice}`).val(sgAddItemCodigo)
			$(`#sgItensQtd___${indice}`).val(sgAddItemQtde)
			$(`#sgItensDesc___${indice}`).val(sgAddItemDesc)
			$(`#sgItensModFalha___${indice}`).val(sgAddItemModFalha)

			//Adiciona a ordem do item
			let sgItensOrdemNext = parseInt($("#sgAddItemOrdem").val()) + 1;
			$("#sgAddItemOrdem").val(sgItensOrdemNext);


			funcoes.LimpaItensSg();
		},

		addDetalhesAtend : function(){
			const indice = wdkAddChild("tbServico");

			let sgSolAtend = $("#sgSolAtend").val();
			let sgSolDtAtend = $("#sgSolDtAtend").val();
			let sgSolTpServico = $("#sgSolTpServico").val();
			let sgSolDeslocamento = $("#sgSolDeslocamento").val();
			let sgSolObs = $("#sgSolObs").val();			

			$(`#sgServAtendimento___${indice}`).val(sgSolAtend);
			$(`#sgServData___${indice}`).val(sgSolDtAtend);
			$(`#sgServTempo___${indice}`).val(sgSolTpServico);
			$(`#sgServDeslocamento___${indice}`).val(sgSolDeslocamento);
			$(`#sgServObs___${indice}`).val(sgSolObs);			
			
			//Adiciona a ordem do item
			let sgSolAtendNext = parseInt($("#sgSolAtend").val()) + 1;
			$("#sgSolAtend").val(sgSolAtendNext);
			//funcoes.LimpaItensSg();
		},

		LimpaItensSg : function(){
			$("#sgAddItemCodigo").val("");
			$("#sgAddItemQtde").val("");
			$("#sgAddItemDesc").val("");
			$("#sgAddItemModFalha").val("");
		},

		LimpaAtendSg : function(){
			$("#sgSolDtAtend").val("");
			$("#sgSolTpServico").val("");
			$("#sgSolDeslocamento").val("");
			$("#sgSolObs").val("");
		},

		LimpaTpMaq : function(){
			$("#sgSolNumLinhas").val("");
			$("#sgSolEspacamento").val("");
			$("#sgSolModPlataforma").val("");
			$("#sgSolTamanho").val("");
			$("#sgSolNumHastes").val("");
		},

		gerarDataHora : function() {
			const dataAtual = new Date();
			const dia = dataAtual.getDate().toString().padStart(2, '0');
			const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Lembre-se que os meses em JavaScript são base 0.
			const ano = dataAtual.getFullYear();
		
			const carimboData = `${dia}/${mes}/${ano} `;
			
			$('#sgSolDataPre').val(carimboData);			
		},

		formatarCNPJ: function(elementId) {
			var $input = $('#' + elementId);
			var texto = $input.val();

			// Remove todos os caracteres que não são dígitos
			texto = texto.replace(/\D/g, "");
			// Aplica a máscara de CNPJ usando expressão regular
			texto = texto.replace(/^(\d{2})(\d)/, "$1.$2");
			texto = texto.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
			texto = texto.replace(/\.(\d{3})(\d)/, ".$1/$2");
			texto = texto.replace(/(\d{4})(\d)/, "$1-$2");
			// Limita o comprimento a 18 caracteres (formato XX.XXX.XXX/XXXX-XX)
			if (texto.length > 18) {
				texto = texto.slice(0, 18);
			}
			// Atualiza o valor do campo com o texto formatado
			$input.val(texto);
		},

		formatarTempo: function(elementId) {
			var $input = $('#' + elementId);
			var texto = $input.val();

			// Remove todos os caracteres que não são dígitos
			texto = texto.replace(/\D/g, "");
			// Aplica a máscara de tempo
			if (texto.length > 3) {
				texto = texto.slice(0, 3) + ':' + texto.slice(3, 5);
			}
			// Limita o comprimento a 6 caracteres (formato 000:00)
			if (texto.length > 6) {
				texto = texto.slice(0, 6);
			}
			// Atualiza o valor do campo com o texto formatado
			$input.val(texto);
		},

		formatarNumero4Dig: function(elementId) {
			var $input = $('#' + elementId);
			var texto = $input.val();

			// Remove todos os caracteres que não são dígitos
			texto = texto.replace(/\D/g, "");

			// Adiciona zeros à esquerda se necessário
			while (texto.length < 3) {
				texto = '0' + texto;
			}

			// Aplica a máscara de número
			texto = texto.slice(0, -2) + ',' + texto.slice(-2);

			// Limita o comprimento a 7 caracteres (formato 0000,00)
			if (texto.length > 7) {
				texto = texto.slice(0, 7);
			}

			// Remove zeros à esquerda desnecessários
			texto = texto.replace(/^0+(?![,])/g, "");

			// Atualiza o valor do campo com o texto formatado
			$input.val(texto);
		},


	}
})();

function removeItem(oElement){
	//fnWdkRemoveChild(oElement);

	try {
		const indice = validafunctions.getPosicaoFilho($(oElement).closest('tr').find("input")[0].id);
		console.log(indice + ' Indice')
        const sgItensOrdemID = $(`#sgItensOrdem___${indice}`).val() || "";
		console.log(sgItensOrdemID + ' Ordem')
        FLUIGC.message.confirm({
            message: `Deseja remover o item código <b>${sgItensOrdemID}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não   ',
        }, function (result) {
            if (result) {
				//funcoes.removeAnexo(indice);
				fnWdkRemoveChild(oElement);
				
				let temRegistro = false;
				$("input[name*=sgItensOrdemID___]").each(function(){
					temRegistro = true;
				});
				if(!temRegistro){
					$('#tbRelDespesas').hide();
				}
			}
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função removeDespesa")
        console.error(e)
    }

};

function removeAtend(oElement){
	//fnWdkRemoveChild(oElement);

	try {
		const indice = validafunctions.getPosicaoFilho($(oElement).closest('tr').find("input")[0].id);
        const sgServAtendimentoID = $(`#sgServAtendimento___${indice}`).val() || "";
        FLUIGC.message.confirm({
            message: `Deseja remover o atendimento <b>${sgServAtendimentoID}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não   ',
        }, function (result) {
            if (result) {
				//funcoes.removeAnexo(indice);
				fnWdkRemoveChild(oElement);
				
				let temRegistro = false;
				$("input[name*=sgServAtendimentoID___]").each(function(){
					temRegistro = true;
				});
				if(!temRegistro){
					$('#tbRelDespesas').hide();
				}
			}
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função removeDespesa")
        console.error(e)
    }

};

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	

			//Gatilhos Ano
			$(document).on("input", "#sgSolAno", function() {
				funcoes.addAno();
			});

			$(document).on("input", "#sgSolDeslocamento", function() {
				funcoes.formatarNumero4Dig(this.id);
			});

			$(document).on("input", "#sgSolCelCli", function() {
				funcoes.aplicarMascaraTelefone('sgSolCelCli');
			});
			$(document).on("input", "#sgSolTelCli", function() {
				funcoes.aplicarMascaraTelefone('sgSolTelCli');
			});
			//Gatilhos Formatar CNPJ
			$(document).on("input", "#sgSolTelRev", function() {
				funcoes.aplicarMascaraTelefone('sgSolTelRev');
			});
			$(document).on("input", "#sgSolCnpjRev", function() {
				funcoes.formatarCNPJ(this.id);
			});
			//Gatilhos Formatar tempo
			$(document).on("input", "#sgSolTpServico", function() {
				funcoes.formatarTempo(this.id);
			});
			$(document).on("input", "#sgAddItemQtde", function() {
				$(this).val($(this).val().replace(/\D/g, ''));
			});
			//Btn add Servico
			$(document).on("click", "#btnAddAtend", function() {
				if(funcoes.validaAddAtend()){
					funcoes.addDetalhesAtend();			
				}
			});
			//Btn add item
			$(document).on("click", "#btnAddItem", function() {
				if(funcoes.validaAddItem()){
					funcoes.addItensSg();
				}						
			});

		}
	}
})();

function loadForm(){
	
	$("[milho]").hide();
	$("[flexer]").hide();
	$("[terrus]").hide();
	
	if(CURRENT_STATE == INICIO_0){
		funcoes.gerarDataHora();
		$('#sgAddItemOrdem').val("1");	
		$('#sgSolAtend').val("1");	

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

		var solDataSaidaCal = FLUIGC.calendar('#sgSolDtAtend', {
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
			}else if(tpMaquina == "outros"){
				$("[milho]").hide();
				$("[flexer]").hide();
				$("[terrus]").hide();
			}

			funcoes.LimpaTpMaq();
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
