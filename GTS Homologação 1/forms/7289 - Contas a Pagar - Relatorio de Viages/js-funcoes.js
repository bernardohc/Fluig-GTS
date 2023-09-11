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
		/*
		 * Despesas da Viagem
		 */

		validaAddDespesa : function(){

			let hasErros = false;
			let message = '';
			let addRvDespCodiID = $('#addRvDespCodiID').val().trim();
			let addRvDespEstabelecimento = $('#addRvDespEstabelecimento').val().trim();
			let addRvDespDocumento = $('#addRvDespDocumento').val().trim();
			let addRvDespData = $('#addRvDespData').val().trim();
			let addRvDespTpPag = $('#addRvDespTpPag').val().trim();
			let addRvDespClassi = $('#addRvDespClassi').val().trim();
			let addRvDespValor = $('#addRvDespValor').val().trim();
			let addRvDespCCusto = $('#addRvDespCCusto').val().trim();
			let addRvDespAnexo = $('#addRvDespAnexo').val().trim();

			if( addRvDespCodiID == '' ){
				message += getMessage("Código", 1, form);
				hasErros = true
			}
			if( addRvDespEstabelecimento == '' ){
				message += getMessage("Estabelecimento", 1, form);
				hasErros = true
			}
			if( addRvDespDocumento == '' ){
				message += getMessage("Documento", 1, form);
				hasErros = true
			}
			if( addRvDespData == '' ){
				message += getMessage("Data", 1, form);
				hasErros = true
			}
			if( addRvDespTpPag == '' ){
				message += getMessage("Tipo Pagamento", 1, form);
				hasErros = true
			}
			if( addRvDespClassi == '' ){
				message += getMessage("Classificação", 1, form);
				hasErros = true
			}
			if( addRvDespValor == '' ){
				message += getMessage("Valor", 1, form);
				hasErros = true
			}
			if( addRvDespCCusto == '' ){
				message += getMessage("Centro de Custo", 1, form);
				hasErros = true
			}
			if( addRvDespAnexo == '' ){
				message += getMessage("É obrigatório inserir a imagem.", 6, form);
				hasErros = true
			}
			if( hasErros ){
				messageToast({message: message}, 'warning')
				return;
			}	
			return true;
		},

		addDespesa : function(){
			const indice = wdkAddChild("tbRelDespesas");

			let addRvDespEstabelecimento = document.getElementById("addRvDespEstabelecimento").value;
			let addRvDespDocumento = document.getElementById("addRvDespDocumento").value;
			let addRvDespData = document.getElementById("addRvDespData").value;
			let addRvDespTpPag = document.getElementById("addRvDespTpPag").value;
			let addRvDespClassi = document.getElementById("addRvDespClassi").value;
			let addRvDespValor = document.getElementById("addRvDespValor").value;
			let addRvDespCCusto = document.getElementById("addRvDespCCusto").value;
			let addRvDespAnexo = document.getElementById("addRvDespAnexo").value;
			let addRvDespCodiID = document.getElementById("addRvDespCodiID").value;

			$(`#rvDespEstabelecimento___${indice}`).val(addRvDespEstabelecimento)
			$(`#rvDespDocumento___${indice}`).val(addRvDespDocumento)
			$(`#rvDespData___${indice}`).val(addRvDespData)
			$(`#rvDespTpPag___${indice}`).val(addRvDespTpPag)
			$(`#rvDespClassi___${indice}`).val(addRvDespClassi)
			$(`#rvDespValor___${indice}`).val(addRvDespValor)
			$(`#rvDespCCusto___${indice}`).val(addRvDespCCusto)
			$(`#rvDespAnexo___${indice}`).val(addRvDespAnexo)
			$(`#rvDespCodiID___${indice}`).val(addRvDespCodiID)

			funcoes.limpaAddDespesa();

			//Adiciona o Id de código de despesa
			let AddRvDespCodiIDNext = parseInt($("#addRvDespCodiID").val()) + 1;
			$("#addRvDespCodiID").val(AddRvDespCodiIDNext);
			
			//Mostra a tabela de despesa
			$('#tbRelDespesas').show();
			
			if(isMobile == 'true'){
				//Oculta o botão de visualizar no mobile, pelo arquivo ainda não estar publicado no Fluig
				// $(`#rvDespAnexo___${indice}`).prev().hide();
				// $(`#rvDespAnexo___${indice}`).next().hide()

				$(`#rvDespAnexo___${indice}`).next().find('.btnViewerFile').prop('disabled', true);
				$('.btnViewerFile').show()
			}
		},
		
		limpaAddDespesa(){

			$('#addRvDespEstabelecimento').val('');
			$('#addRvDespDocumento').val('');
			$('#addRvDespData').val('');
			$('#addRvDespTpPag').val('');
			$('#addRvDespClassi').val('');
			$('#addRvDespValor').val('');
			$('#addRvDespCCusto').val('');
			$('#addRvDespAnexo').val('');
			// const limpaaddRvDespEstabelecimento = document.querySelector('#addRvDespEstabelecimento');
			// limpaaddRvDespEstabelecimento.value = '';	
			// const limpaaddRvDespDocumento = document.querySelector('#addRvDespDocumento');
			// limpaaddRvDespDocumento.value = '';
			// const limpaaddRvDespData = document.querySelector('#addRvDespData');
			// limpaaddRvDespData.value = '';
			// const limpaaddRvDespTpPag = document.querySelector('#addRvDespTpPag');
			// limpaaddRvDespTpPag.value = '';
			// const limpaaddRvDespClassi = document.querySelector('#addRvDespClassi');
			// limpaaddRvDespClassi.value = '';
			// const limpaaddRvDespValor = document.querySelector('#addRvDespValor');
			// limpaaddRvDespValor.value = '';
			// const limpaaddRvDespCCusto = document.querySelector('#addRvDespCCusto');
			// limpaaddRvDespCCusto.value = '';
			// const limpaaddRvDespAnexo = document.querySelector('#addRvDespAnexo');
			// limpaaddRvDespAnexo.value = '';
		},

		calculaTotal : function(){
			let totalSoma = 0;
			//Soma todas as despesas
			$("input[name*=rvDespValor___]").each(function(index){
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				
				let rvDespValor = validafunctions.getFloatValue("rvDespValor___"+index);

				if (!isNaN(rvDespValor) ) {
					totalSoma = totalSoma + rvDespValor;
				}
			});
			$("#rvTotal").val(totalSoma.toFixed(2));
			validafunctions.setMoeda("rvTotal", 2, false , '');
		},	
		
		calculaSaldo : function(){
			//Subtrai do valo do adiantemento somente se for pago em dinheiro.
			let rvSaldo = 0;
			let solAdianta = validafunctions.getFloatValue("solAdianta");
			let rvTotal = validafunctions.getFloatValue("rvTotal");
			let addRvDespTpPag = validafunctions.getFloatValue("addRvDespTpPag");
			
			
			if(solAdianta > 0 && addRvDespTpPag == "Dinheiro"){
				rvSaldo = solAdianta - rvTotal;
				console.log(rvSaldo + " Saldo IF");
			}else{
				rvSaldo = 0;
			}
			$("#rvSaldo").val(rvSaldo.toFixed(2));
			validafunctions.setMoeda("rvSaldo", 2, true , '');
		},

		calculaCombustivel : function(){
			//soma somente combustivel
			let totalComb = 0;

			$("input[name*=rvDespValor___]").each(function(index){
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				let rvDespClassi = $("#rvDespClassi___"+index).val();
				let rvDespValor = parseFloat($("#rvDespValor___"+index).val());

				if(rvDespClassi === "Combustível") {
					totalComb = totalComb + rvDespValor;
				}
			});
			$("#rvTotalComb").val(totalComb.toFixed(2));
			validafunctions.setMoeda("rvTotalComb", 2, false , '');
		},

		calculaDiaria : function(){
			//Diaria, considera acomodação e alimentação, divide pela quantidade de dias da viagem
			//se houver mais de colaborador, dividide pela quantidade de colaboradores
			let somaDiaria = 0;
			let totalSaldo = 0;
			var dataInicial = document.getElementById("solDataSaida").value;
			var dataFinal = document.getElementById("solDataRet").value;
			var solNumColab = document.getElementById("solNumColab").value;
			var difData = ""; 

			var dataInicialInt = parseInt(dataInicial);
			var dataFinalInt = parseInt(dataFinal);

			difData = dataFinalInt - dataInicialInt + 1 ;
			console.log(difData + "Dif data");
			
			$("input[name*=rvDespValor___]").each(function(index){
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				let rvDespClassi = $("#rvDespClassi___"+index).val();
				let rvDespValor = parseFloat($("#rvDespValor___"+index).val());

				if(rvDespClassi === "Acomodação" || rvDespClassi === "Refeição" ) {
					somaDiaria += rvDespValor;
				}
			});

			if(solNumColab > 1){
				totalSaldo = (somaDiaria / difData)/solNumColab;
			}else{
				totalSaldo = somaDiaria / difData;
			}
						
			$("#rvDiaria").val(totalSaldo.toFixed(2));
			validafunctions.setMoeda("rvDiaria", 2, false , '');
		},

		removeAnexo : function(index){
			
			const idFluig = getWKNumProces();
			const fileDescription = $(`#rvDespAnexo___${index}`).val();
			const wkUser = getWKUser();
			
			if(isMobile == 'true'){
				if(CURRENT_STATE == INICIO_0){
					//Na atividade 0 os anexos ainda não estão salvos no servidor.
					messageToast({message: `Não foi possível deletar o anexo, por favor delete manualmente o arquivo <b>${fileDescription}</b>!`}, 'danger')
				}else{
					var loading = FLUIGC.loading(window);
					loading.show();

					$.ajax({
						type: "GET",
						dataType: "json",
						async: true,
						url: `/api/public/ecm/dataset/search?datasetId=dsRelViagDeletaAnexo&filterFields=idFluig,${idFluig},fileDescription,${fileDescription},wkUser,${wkUser}`,
						data: "",
						success: function (data, status, xhr) {
							if (data != null && data.content != null && data.content.length > 0) {
								const record = data.content[0];
								if( record.CODRET == "1"){
									messageToast({message: "Anexo removido com sucesso!"}, 'success')
								}else {
									messageToast({message: `${record.MSGRET} Por favor delete manualmente o arquivo <b>${fileDescription}</b>!`}, 'danger')
								}	
							}else{
								messageToast({message: `Erro ao deletar anexo, por favor delete manualmente o arquivo <b>${fileDescription}</b>!`}, 'danger')
							}
							setTimeout(function(){ 
								loading.hide();
							}, 1000);
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
							messageToast({message: `Erro ao deletar anexo, por favor delete manualmente o arquivo <b>${fileDescription}</b>!`}, 'danger')
							loading.hide();
						}
					});
				}
			}else{

				try {
					$.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {
						let attachmentDescription = attachment.description;
						if(attachmentDescription.includes(".")){
							attachmentDescription = attachmentDescription.substring(0, attachmentDescription.lastIndexOf('.'));
						}
						if (attachmentDescription == fileDescription) {
							parent.WKFViewAttachment.removeAttach([i]);
						}
					});
				} catch (e) {
					console.error("Houve um erro inesperado na função removeFile")
					console.error(e)
					messageToast({message: `Erro ao deletar anexo, por favor delete manualmente o arquivo <b>${fileDescription}</b>!`}, 'danger')
				}

			}
		},
	}
})();

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	

			//Itens para atribuição da tarefa por campo.
			$(document).on("change", "#solSetor", function() {
				let setor = $("#solSetor").val();
				
				if(setor == 'motorista'){
					//Grupo Relatório de Viagens - Analisa Motorista
					$('#grupoAnalisaRelatorio').val('Pool:Group:000003');
				}else if(setor == 'tecnico'){
					//Grupo Relatório de Viagens - Analisa Técnico
					$('#grupoAnalisaRelatorio').val('Pool:Group:000004');
				}else if(setor == 'outro'){
					//Grupo Relatório de Viagens - Analisa Outro
					$('#grupoAnalisaRelatorio').val('Pool:Group:000005');
				}else{
					$('#grupoAnalisaRelatorio').val('');
				}
				
			});
			
			$(document).on("click", "#addRvDespesa", function() {
				if(funcoes.validaAddDespesa()){
					funcoes.addDespesa();
					funcoes.calculaTotal();
					funcoes.calculaSaldo();
					funcoes.calculaCombustivel();
					funcoes.calculaDiaria();
					
				}
			});	
		}
	}
})();


function loadForm(){	
	//Carrega a data atual 
	$(`#solDataSol`).val(dataAtual);
	$(`#salvarEnviar`).val('');

	var psSolDataPesq = FLUIGC.calendar('#solDataSaida', {
		language: 'pt-br',
		pickDate: true,
		pickTime: false,
	});

	var psSolDataPesq = FLUIGC.calendar('#solDataRet', {
		language: 'pt-br',
		pickDate: true,
		pickTime: false,
	});

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

// //Remove ocorrencias do pai e filho
function removeDespesa(oElement){

	try {
		const indice = validafunctions.getPosicaoFilho($(oElement).closest('tr').find("input")[0].id);
        const rvDespCodiID = $(`#rvDespCodiID___${indice}`).val() || "";
        FLUIGC.message.confirm({
            message: `Deseja remover o registro de despesa código <b>${rvDespCodiID}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não   ',
        }, function (result) {
            if (result) {
				funcoes.removeAnexo(indice);
        		fnWdkRemoveChild(oElement);
				funcoes.calculaTotal();
				funcoes.calculaSaldo();
				funcoes.calculaCombustivel();
				funcoes.calculaDiaria();
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
	
	let addRvDespCodiID = "";
	let addRvDespEstabelecimento = "";
	let addRvDespDocumento = "";
	let nomeAnexo = "";
	// let addRvDespData = "";
	// let addRvDespTpPag = "";
	// let addRvDespClassi = "";
	// let addRvDespValor = "";
	// let addRvDespCCusto = "";

	addRvDespCodiID = $('#addRvDespCodiID').val();
	addRvDespEstabelecimento = $('#addRvDespEstabelecimento').val();
	addRvDespDocumento = $('#addRvDespDocumento').val();
	// addRvDespData = $('#addRvDespData').val();
	// addRvDespTpPag = $('#addRvDespTpPag').val();
	// addRvDespClassi = $('#addRvDespClassi').val();
	// addRvDespValor = $('#addRvDespValor').val();
	// addRvDespCCusto = $('#addRvDespCCusto').val();
	addRvDespData = $('#addRvDespData').val();
	addRvDespData = $('#addRvDespData').val();
	addRvDespData = $('#addRvDespData').val();

	let hasErros = false;
	let message = '';

	//Validação só anexa se os campos estiverem preenchidos para gerar o nome
	if(addRvDespCodiID == ''){
		message += getMessage("Código", 1, form);
		hasErros = true;
	}
	if(addRvDespEstabelecimento == ''){
		message += getMessage("Estabelecimento", 1, form);
		hasErros = true;
	}
	if(addRvDespDocumento == '' || addRvDespDocumento == '0' ){
		message += getMessage("Documento", 1, form);
		hasErros = true;
	}
	// if(addRvDespData == ''){
	// 	message += getMessage("Data", 1, form);
	// 	hasErros = true;
	// }
	// if(addRvDespTpPag == ''){
	// 	message += getMessage("Tipo Pagamento", 1, form);
	// 	hasErros = true;
	// }
	// if(addRvDespClassi == ''){
	// 	message += getMessage("Classificação", 1, form);
	// 	hasErros = true;
	// }
	// if(addRvDespValor == ''){
	// 	message += getMessage("Valor", 1, form);
	// 	hasErros = true;
	// }
	// if(addRvDespCCusto == ''){
	// 	message += getMessage("Centro de Custo", 1, form);
	// 	hasErros = true;
	// }
	if( hasErros ){
		messageToast({message: message}, 'warning')
		return;
	}

	nomeAnexo = (addRvDespCodiID+ "_" + addRvDespEstabelecimento + "_" + addRvDespDocumento);

	JSInterface.showCamera(nomeAnexo); 	
	
	$("#addRvDespAnexo").val(nomeAnexo);
	// $("#nomeAnexo___"+indice).prev().prop('disabled', true);
	// $("#nomeAnexo___"+indice).val(nomeAnexo);
	// $("#nomeAnexo___"+indice).prev().prop('disabled', true);
}