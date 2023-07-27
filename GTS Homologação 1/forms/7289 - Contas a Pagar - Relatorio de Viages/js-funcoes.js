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

	return {
		start : function() {
			eventsFuncoes.setup();
		},		
		/*
		 * Despesas da Viagem
		 */

		validaAddDespesa : function(){

			let hasErros = false;
			let message = '';
			let addRvDespEstabelecimento = $('#addRvDespEstabelecimento').val().trim();
			let addRvDespDocumento = $('#addRvDespDocumento').val().trim();

			if( addRvDespEstabelecimento == '' ){
				message += getMessage("Estabelecimento", 1, form);
				hasErros = true
			}
			if( addRvDespDocumento == '' ){
				message += getMessage("Documento", 1, form);
				hasErros = true
			}

			if( hasErros ){
				messageToast({message: message}, 'warning')
				return;
			}	
			return true;
		},
		addDespesa : function(){
			const tablename = "tbRelDespesas"
			const indice = wdkAddChild(tablename);

			let addRvDespEstabelecimento = document.getElementById("addRvDespEstabelecimento").value;
			let addRvDespDocumento = document.getElementById("addRvDespDocumento").value;
			let addRvDespData = document.getElementById("addRvDespData").value;
			let addRvDespTpPag = document.getElementById("addRvDespTpPag").value;
			let addRvDespClassi = document.getElementById("addRvDespClassi").value;
			let addRvDespValor = document.getElementById("addRvDespValor").value;
			let addRvDespCCusto = document.getElementById("addRvDespCCusto").value;
			let addRvDespAnexo = document.getElementById("addRvDespAnexo").value;
			let addRvDespCodiID = document.getElementById("addRvDespCodiID").value;

			$('[name^="rvDespEstabelecimento___"]'); //trará todos os campos filhos deste formulário. 
			//Aqui percorrerá todos os itens.
			for(var i = 0; i < $('[name^="rvDespEstabelecimento___"]').length; i++){
				// $(`#rvDespEstabelecimento___${indice}`).val(addRvDespEstabelecimento).prop("readonly", true);
				// $(`#rvDespDocumento___${indice}`).val(addRvDespDocumento).prop("readonly", true);
				// $(`#rvDespData___${indice}`).val(addRvDespData).prop("readonly", true);
				// $(`#rvDespTpPag___${indice}`).val(addRvDespTpPag).prop("readonly", true);
				// $(`#rvDespClassi___${indice}`).val(addRvDespClassi).prop("readonly", true);
				// $(`#rvDespValor___${indice}`).val(addRvDespValor).prop("readonly", true);
				// $(`#rvDespCCusto___${indice}`).val(addRvDespCCusto).prop("readonly", true);
				// $(`#rvDespAnexo___${indice}`).val(addRvDespAnexo).prop("readonly", true);
				// $(`#rvDespCodiID___${indice}`).val(addRvDespCodiID).prop("readonly", true);
				$(`#rvDespEstabelecimento___${indice}`).val(addRvDespEstabelecimento)
				$(`#rvDespDocumento___${indice}`).val(addRvDespDocumento)
				$(`#rvDespData___${indice}`).val(addRvDespData)
				$(`#rvDespTpPag___${indice}`).val(addRvDespTpPag)
				$(`#rvDespClassi___${indice}`).val(addRvDespClassi)
				$(`#rvDespValor___${indice}`).val(addRvDespValor)
				$(`#rvDespCCusto___${indice}`).val(addRvDespCCusto)
				$(`#rvDespAnexo___${indice}`).val(addRvDespAnexo)
				$(`#rvDespCodiID___${indice}`).val(addRvDespCodiID)
			}	

			// //limpa campos ao enviar ocorrencia
			const limpaaddRvDespEstabelecimento = document.querySelector('#addRvDespEstabelecimento');
			limpaaddRvDespEstabelecimento.value = '';	
			const limpaaddRvDespDocumento = document.querySelector('#addRvDespDocumento');
			limpaaddRvDespDocumento.value = '';
			const limpaaddRvDespData = document.querySelector('#addRvDespData');
			limpaaddRvDespData.value = '';
			const limpaaddRvDespTpPag = document.querySelector('#addRvDespTpPag');
			limpaaddRvDespTpPag.value = '';
			const limpaaddRvDespClassi = document.querySelector('#addRvDespClassi');
			limpaaddRvDespClassi.value = '';
			const limpaaddRvDespValor = document.querySelector('#addRvDespValor');
			limpaaddRvDespValor.value = '';
			const limpaaddRvDespCCusto = document.querySelector('#addRvDespCCusto');
			limpaaddRvDespCCusto.value = '';
			const limpaaddRvDespAnexo = document.querySelector('#addRvDespAnexo');
			limpaaddRvDespAnexo.value = '';

			$('#tbRelDespesas').show();
		},
		
				
	}
})();





//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	

			//Itens para atribuição da tarefa por campo.
			$(document).on("change", "#setor", function() {
				let setor = $("#setor").val();
				
				if(setor == 'Motorista'){
					//Grupo Relatório de Viagens - Analisa Motorista
					$('#grupoAnalisaRelatorio').val('Pool:Group:000003');
				}else if(setor == 'Técnico'){
					//Grupo Relatório de Viagens - Analisa Técnico
					$('#grupoAnalisaRelatorio').val('Pool:Group:000004');
				}else if(setor == 'Outro'){
					//Grupo Relatório de Viagens - Analisa Outro
					$('#grupoAnalisaRelatorio').val('Pool:Group:000005');
				}else{
					$('#grupoAnalisaRelatorio').val('');
				}
				
			});
			
			$(document).on("click", "#addRvDespesa", function() {
				if(funcoes.validaAddDespesa()){
					funcoes.addDespesa();
				}
			});
		
		}
	}
})();

function loadForm(){	
	//Carrega a data atual 
	$(`#solDataSol`).val(dataAtual);

	var psSolDataPesq = FLUIGC.calendar('#addRvDespData', {
		language: 'pt-br',
		pickDate: true,
		pickTime: false,
	});
	
};

function getDataAtual() {
	const today = new Date();
	const dia = String(today.getDate()).padStart(2, '0');
	const mes = String(today.getMonth() + 1).padStart(2, '0'); // Os meses começam do zero (janeiro é 0)
	const ano = today.getFullYear();
	return dia + '/' + mes + '/' + ano;
}
  
function soNumero(event) {
	const input = event.target;
	const valorDigitado = input.value;
  
	// Remove todos os caracteres não numéricos, exceto o ponto (casas decimais)
	const valorNumerico = valorDigitado.replace(/[^0-9.]/g, '');
  
	// Verifica se o valor digitado é diferente do valor numérico
	// Isso evita que letras e outros caracteres indesejados sejam inseridos no input
	if (valorDigitado !== valorNumerico) {
	  // Atualiza o valor do input com o valor numérico válido
	  input.value = valorNumerico;
	}
};	
function getMessage(texto, tipoMensagem, tabpaifilho) {
	if(isMobile == 'true'){
        switch (tipoMensagem) {
            case 1:
                return 'Campo "' + texto + '" não pode estar vazio.\n';
            case 2:
                return 'Campo "' + texto + '" está inválido.\n';    
            case 3:
                return 'Selecione uma opção em "' + texto + '".\n';
            case 4:
                return 'Campo "' + texto + '" não pode ser zero.\n'; 
            case 5:
                    return 'A tabela de  "' + tabpaifilho + '" possui um ou mais campos de "' + texto + '" inválido.\n'; 
            case 6:
                    return texto; 
            case 7:
                    return "Campo: "+texto+" precisa estar marcado."; 
            case 8:
                return "Campo: "+texto+" não pode ser menor que a data de saída";  	 	
            case 9:
                return "Atenção! Selecione a opção: " +texto;    
        }
    } else {
        switch (tipoMensagem) {
            case 1:
                return "<li>Campo: <b>" + texto + "</b> não pode estar vazio.</li>";
            case 2:
                return '<li>Campo: <b>"' + texto + '"</b> está inválido.\n';    
            case 3:
                return "<li>Selecione uma opção em: <b>" + texto + "</b></li>";
            case 4:
                return "<li>Campo: <b>" + texto + "</b> não pode ser zero.</li>";
            case 5:
                return "<li>A tabela de <b>" + tabpaifilho + "</b> possui um ou mais campos de <b>" + texto + "</b> inválido.</li>";  
            case 6:
                    return "<li>"+texto+"</li>";     
            case 7:
                    return "<li>Campo: <b>"+texto+"</b> precisa estar marcado.</li>";
            case 8:
                return "<li>Campo: <b>"+texto+"</b> não pode ser menor que a data de saída </li>";   
            case 9:
                return "<li>Atenção! Selecione a opção: <b>"+texto+"</b></li>";  
        }
    }
} 

  // //Remove ocorrencias do pai e filho
function removeDespesa(oElement){

	try {
		const indice = validafunctions.getPosicaoFilho($(oElement).closest('tr').find("input")[0].id);
        const rvDespData = $(`#rvDespData___${indice}`).val() || "";
        FLUIGC.message.confirm({
            message: `Deseja remover o registro de despesa do dia <b>${rvDespData}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não, quero cancelar',
        }, function (result) {
            if (result) {
            	fnWdkRemoveChild(oElement);
				
				let temRegistro = false;
				$("input[name*=rvDespCodiID___]").each(function(){
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

//Função que habilita o upload no formulário pai e filho e seta a a descrição conforme as funções
function showCamera(oElement) {
	
	// const indice = validafunctions.getPosicaoFilho($(oElement).closest('tr').find("input")[0].id);
	
	let valorID = "";
	let solEstabelecimento = "";
	let solDocumento = "";
	let nomeAnexo = "";

	valorID = $('#addRvDespCodiID').val();
	
	solEstabelecimento = $('#addRvDespEstabelecimento').val();

	solDocumento = $('#addRvDespDocumento').val();
	
	let hasErros = false;
	let message = '';

	//Validação só anexa se os campos estiverem preenchidos para gerar o nome
	/*if(valorID == ''){
		message += getMessage("Código", 1, form);
		hasErros = true;
	}*/ 
	if(solEstabelecimento == ''){
		message += getMessage("Estabelecimento", 1, form);
		hasErros = true;
	}
	if(solDocumento == ''){
		message += getMessage("Documento", 1, form);
		hasErros = true;
	}
	
	
	if( hasErros ){
		messageToast({message: message}, 'warning')
		return;
	}

	nomeAnexo = (valorID+ "_" + solEstabelecimento + "_" + solDocumento);

	JSInterface.showCamera(nomeAnexo); 	
	
	$("#addRvDespAnexo").val(nomeAnexo);
	// $("#nomeAnexo___"+indice).prev().prop('disabled', true);
	// $("#nomeAnexo___"+indice).val(nomeAnexo);
	// $("#nomeAnexo___"+indice).prev().prop('disabled', true);
}