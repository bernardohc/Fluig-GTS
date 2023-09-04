$(document).ready(function() {wdkAddChild
	setTimeout(function() {
		funcoes.start();
	}, 100)	
});

const dataAtual = getDataAtual();

//Aqui cria as funcioes
var funcoes = (function() {
	var loading = FLUIGC.loading(window);
	var index = 0;

	return {
		start : function() {
			//eventsFuncoes.setup();
		},
		limpaCamposItem: function(indexItem){
			$("#pesqNumSerie").val('');
			$("#pesqModelo").val('');
			$("#pesqRevenda").val('');
			$("#pesqCidadeRevenda").val('');
			$("#pesqCliente").val('');
			$("#pesqCidadeCliente").val('');
			$("#pesqAcompanhouEntrega").val('');
			$("#pesqTelefone").val('');
		},
		
		consultaProduto : function(indexItem){
			
			let numSerie = $("#pesqNumSerie").val();
			
			if( numSerie.trim() == "" ){
				return;
			}
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsImConsultaInfMaqDb&filterFields=numSerie,"+numSerie,
				
				success: function (data, status, xhr) {
					//console.log(data)
					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						if( records[0].CODRET == "1"){
							var record = records[0];
							
							$("#pesqModelo").val(record.equipModelo);
							$("#pesqRevenda").val(record.revRazaoSocialRevenda);
							$("#pesqCidadeRevenda").val(record.revCidade);
							$("#pesqCliente").val(record.cliNomeCliente);
							$("#pesqCidadeCliente").val(record.cliCidade);
							$("#pesqAcompanhouEntrega").val(record.protoRecResponsavel);
							$("#pesqTelefone").val(record.protoRecTelefone);
							//pose safra
							$("#psPesqModelo").val(record.equipModelo);
							$("#psPesqRevenda").val(record.revRazaoSocialRevenda);
							$("#psPesqCidadeRevenda").val(record.revCidade);
							$("#psPesqCliente").val(record.cliNomeCliente);
							$("#psPesqCidadeCliente").val(record.cliCidade);
							$("#psPesqAcompanhouEntrega").val(record.protoRecResponsavel);
							$("#psPesqTelefone").val(record.protoRecTelefone);
							
						}else if (records[0].CODRET == "2"){		
							FLUIGC.toast({ title: '', message: records[0].CMSG, type: 'warning' });
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

		efetivouContato : function(){
			let pesqEfetivoCont = document.getElementById("pesqEfetivoCont").value;
			//let pesqAcompanhouEntrega = document.getElementById("pesqAcompanhouEntrega");
			//let pesqTelefone = document.getElementById("pesqTelefone");
			let pesqNotaAtendimento = document.getElementById("pesqNotaAtendimento");
			let pesqFeedbackAtendimento = document.getElementById("pesqFeedbackAtendimento");
			let pesqNotaDesempenho = document.getElementById("pesqNotaDesempenho");
			let pesqFeedbackEquipamento = document.getElementById("pesqFeedbackEquipamento");
			let pesqTermColheita = document.getElementById("pesqTermColheita");
			let pesqPrevColheita = document.getElementById("pesqPrevColheita");
			let pesqOcorrencia = document.getElementById("pesqOcorrencia");

			if (pesqEfetivoCont === "nao" || pesqEfetivoCont === "") {
				// pesqAcompanhouEntrega.disabled = true;
				// pesqTelefone.disabled = true;
				pesqNotaAtendimento.disabled = true;
				pesqFeedbackAtendimento.disabled = true;
				pesqNotaDesempenho.disabled = true;
				pesqFeedbackEquipamento.disabled = true;
				pesqTermColheita.disabled = true;
				pesqPrevColheita.disabled = true;
				pesqOcorrencia.disabled = true;
			}else{
				// pesqAcompanhouEntrega.disabled = false;
				// pesqTelefone.disabled = false;
				pesqNotaAtendimento.disabled = false;
				pesqFeedbackAtendimento.disabled = false;
				pesqNotaDesempenho.disabled = false;
				pesqFeedbackEquipamento.disabled = false;
				pesqTermColheita.disabled = false;
				pesqPrevColheita.disabled = false;
				pesqOcorrencia.disabled = false;

				var today = new Date();
				var calpesqPrevColheita = FLUIGC.calendar('#pesqPrevColheita', {
					language: 'pt-br',
					minDate: today,
					pickDate: true,
					pickTime: false,
				});
			}
		},

		efetivouContatoFs : function(){
			let psPesqEfetivoCont = document.getElementById("psPesqEfetivoCont").value;
			//let psPesqAcompanhouEntrega = document.getElementById("psPesqAcompanhouEntrega");
			//let psPesqTelefone = document.getElementById("psPesqTelefone");
			let psPesqNotaAtendimento = document.getElementById("psPesqNotaAtendimento");
			let psPesqFeedbackAtendimento = document.getElementById("psPesqFeedbackAtendimento");
			let psPesqNotaDesempenho = document.getElementById("psPesqNotaDesempenho");
			let psPesqFeedbackEquipamento = document.getElementById("psPesqFeedbackEquipamento");
			let psPesqDispRevenda = document.getElementById("psPesqDispRevenda");
			let psPesqFeedbackPecas = document.getElementById("psPesqFeedbackPecas");
			let psPesqOcorrencia = document.getElementById("psPesqOcorrencia");

			if (psPesqEfetivoCont === "nao" || psPesqEfetivoCont === "") {
				//psPesqAcompanhouEntrega.disabled = true;
				//psPesqTelefone.disabled = true;
				psPesqNotaAtendimento.disabled = true;
				psPesqFeedbackAtendimento.disabled = true;
				psPesqNotaDesempenho.disabled = true;
				psPesqFeedbackEquipamento.disabled = true;
				psPesqDispRevenda.disabled = true;
				psPesqFeedbackPecas.disabled = true;
				psPesqOcorrencia.disabled = true;
			}else{
				//psPesqAcompanhouEntrega.disabled = false;
				//psPesqTelefone.disabled = false;
				psPesqNotaAtendimento.disabled = false;
				psPesqFeedbackAtendimento.disabled = false;
				psPesqNotaDesempenho.disabled = false;
				psPesqFeedbackEquipamento.disabled = false;
				psPesqDispRevenda.disabled = false;
				psPesqFeedbackPecas.disabled = false;
				psPesqOcorrencia.disabled = false;
			}
		},

		//Função para preencher campos do pós safra
		preencheCampos : function(){
			let pesqEntregaPor = document.getElementById("pesqEntregaPor").value;
			let pesqNumSerie = document.getElementById("pesqNumSerie").value;
			// let pesqModelo = document.getElementById("pesqModelo").value;
			// let pesqRevenda = document.getElementById("pesqRevenda").value;
			// let pesqCidadeRevenda = document.getElementById("pesqCidadeRevenda").value;
			// let pesqRepresentante = document.getElementById("pesqRepresentante").value;
			// let pesqCliente = document.getElementById("pesqCliente").value;
			// let pesqCidadeCliente = document.getElementById("pesqCidadeCliente").value;
			// let pesqNotaAtendimento = document.getElementById("pesqNotaAtendimento").value;
			// let pesqFeedbackAtendimento = document.getElementById("pesqFeedbackAtendimento").value;
			// let pesqAcompanhouEntrega = document.getElementById("pesqAcompanhouEntrega").value;
			// let pesqTelefone = document.getElementById("pesqTelefone").value;

			$(`#psPesqEntregaPor`).val(pesqEntregaPor).prop("readonly", true);
			$(`#psPesqNumSerie`).val(pesqNumSerie).prop("readonly", true);
			// $(`#psPesqModelo`).val(pesqModelo).prop("readonly", true);
			// $(`#psPesqRevenda`).val(pesqRevenda).prop("readonly", true);
			// $(`#psPesqCidadeRevenda`).val(pesqCidadeRevenda).prop("readonly", true);
			// $(`#psPesqRepresentante`).val(pesqRepresentante).prop("readonly", true);
			// $(`#psPesqCliente`).val(pesqCliente).prop("readonly", true);
			// $(`#psPesqCidadeCliente`).val(pesqCidadeCliente).prop("readonly", true);
			// $(`#psPesqNotaAtendimento`).val(pesqNotaAtendimento).prop("readonly", true);
			// $(`#psPesqFeedbackAtendimento`).val(pesqFeedbackAtendimento).prop("readonly", true);
			// $(`#psPesqAcompanhouEntrega`).val(pesqAcompanhouEntrega);//.prop("readonly", true)
			// $(`#psPesqTelefone`).val(pesqTelefone);//.prop("readonly", true)

		},

		limpaRet : function(){
			const limpaPesqpesqEfetivoCont = document.querySelector('#pesqEfetivoCont');
			limpaPesqpesqEfetivoCont.value = '';

			const limpaPesqFimOcorrencia = document.querySelector('#pesqFimOcorrencia');
			limpaPesqFimOcorrencia.value = '';

			const limpaPesqPsFimOcorrencia = document.querySelector('#pesqPsFimOcorrencia');
			limpaPesqPsFimOcorrencia.value = '';

			const limpaPesqpesqFimSemRet = document.querySelector('#pesqFimSemRet');
			limpaPesqpesqFimSemRet.value = '';
			
		},

		//Condição para ocultar Observações
		liberaObs : function(){
			let pesqEfetivoCont = "";
			pesqEfetivoCont = document.getElementById("pesqEfetivoCont").value;
			if(pesqEfetivoCont == "nao"){
				$("[temObs]").show();
				$("[fimSemRet]").show();
			}else if(pesqEfetivoCont == ""){
				$("[temObs]").hide();
				$("[fimSemRet]").hide();
			}else{
				$("[temObs]").hide();
				$("[fimSemRet]").hide();
			}
		},

		//Condição para ocultar Observações PS
		liberaObsPs : function(){
			let psPesqEfetivoCont = "";
			psPesqEfetivoCont = document.getElementById("psPesqEfetivoCont").value;
			if(psPesqEfetivoCont == "nao"){
				$("[temObsPs]").show();
				$("[psFimSemRet]").show();
				$("[sugestMelhoria]").hide();
			}else if(psPesqEfetivoCont == ""){
				$("[temObsPs]").hide();
				$("[psFimSemRet]").hide();
				$("[sugestMelhoria]").hide();
			}else{
				$("[temObsPs]").hide();
				$("[psFimSemRet]").hide();
				$("[sugestMelhoria]").show();
			}
		},

		//Condição para ocultar div ocorrencias Pesquisa e campo fim ocorrencia
		liberaOcorrencias : function(){
			let pesqOcorrencia = "";
			pesqOcorrencia = document.getElementById("pesqOcorrencia").value;
			const limpPesqOcorrenciaFeedback = document.querySelector('#pesqOcorrenciaFeedback');
			const limpaPesqOcorrenciaApontamento = document.querySelector('#pesqOcorrenciaApontamento');

			if(pesqOcorrencia == "nao"){
				$("[teveOcorrencia]").hide();
				$("[fimOcorrencia]").hide();
				limpPesqOcorrenciaFeedback.value = '';
				limpaPesqOcorrenciaApontamento.value = '';
			}else if(pesqOcorrencia == ""){
				$("[teveOcorrencia]").hide();
				$("[fimOcorrencia]").hide();
				limpPesqOcorrenciaFeedback.value = '';
				limpaPesqOcorrenciaApontamento.value = '';
			}else{
				$("[teveOcorrencia]").show();
				$("[fimOcorrencia]").show();
			}
		},

		//Condição para ocultar div ocorrencias Pesquisa Pos Safra e campo fim ocorrencia
		liberaOcorrenciasPs : function(){
			let pesqOcorrenciaPs = "";
			pesqOcorrenciaPs = document.getElementById("psPesqOcorrencia").value;
			const limpaPsPesqOcorrenciaFeedback = document.querySelector('#psPesqOcorrenciaFeedback');
			const limpaPsPesqOcorrenciaApontamento = document.querySelector('#psPesqOcorrenciaApontamento');
			
			if(pesqOcorrenciaPs == "nao"){
				$("[teveOcorrenciaPs]").hide();
				$("[psFimOcorrencia]").hide();
				limpaPsPesqOcorrenciaFeedback.value = '';
				limpaPsPesqOcorrenciaApontamento.value = '';
			}else if(pesqOcorrenciaPs == ""){
				$("[teveOcorrenciaPs]").hide();
				$("[psFimOcorrencia]").hide();
				limpaPsPesqOcorrenciaFeedback.value = '';
				limpaPsPesqOcorrenciaApontamento.value = '';
			}else{
				$("[teveOcorrenciaPs]").show();
				$("[psFimOcorrencia]").show();
			}
		},

		//Condição para desabilitar calendario
		blocCalendar : function(){
			let pesqTermColheita = "";
			pesqTermColheita = document.getElementById("pesqTermColheita").value;
			if(pesqTermColheita == "nao"){
				$(`#pesqPrevColheita`).prop("readonly", false);
				$(`#pesqPrevColheita`).prop('style', 'pointer-events:all');
			}else if(pesqTermColheita == ""){
				$(`#pesqPrevColheita`).prop("readonly", true);
				$(`#pesqPrevColheita`).prop('style', 'pointer-events:none');
			}else{
				$(`#pesqPrevColheita`).prop("readonly", true);
				$(`#pesqPrevColheita`).prop('style', 'pointer-events:none');
			}
		},

		/*
		 * Formulário
		 */
		
		addLinhaOcorrencias: function(){
			const tablename = "tbPesqOcorrencias"
			const indice = wdkAddChild(tablename);

			// Obter a data atual
            var dataAtual = new Date();
            var dia = String(dataAtual.getDate()).padStart(2, '0');
            var mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
            var ano = dataAtual.getFullYear();
            var dataFormatada = dia + '/' + mes + '/' + ano;	
			
			//Usuário logado
			let pesNomePesquisador = document.getElementById("pesNomePesquisador").value;
			let pesqOcorrenciaFeedback = document.getElementById("pesqOcorrenciaFeedback").value;
			let pesqOcorrenciaApontamento = document.getElementById("pesqOcorrenciaApontamento").value;

			$('[name^="pesqOcorreData___"]'); //trará todos os campos filhos deste formulário. 
			//Aqui percorrerá todos os itens.
			for(var i = 0; i < $('[name^="pesqOcorreData___"]').length; i++){
				$(`#pesqOcorreData___${indice}`).val(dataFormatada).prop("readonly", true);
				$(`#pesqOcorreAtendente___${indice}`).val(pesNomePesquisador).prop("readonly", true);
				$(`#pesqOcorreFeedback___${indice}`).val(pesqOcorrenciaFeedback).prop("readonly", true);
				$(`#pesqOcorreAponta___${indice}`).val(pesqOcorrenciaApontamento).prop("readonly", true);
			}	

			//limpa campos ao enviar ocorrencia
			const limpPesqOcorrenciaFeedback = document.querySelector('#pesqOcorrenciaFeedback');
			limpPesqOcorrenciaFeedback.value = '';
			
			const limpaPesqOcorrenciaApontamento = document.querySelector('#pesqOcorrenciaApontamento');
			limpaPesqOcorrenciaApontamento.value = '';
		},

		addLinhaOcorrenciasPs: function(){
			const tablename = "tbPSPesqOcorrencias"
			const indice = wdkAddChild(tablename);

			// Obter a data atual
            var dataAtual = new Date();
            var dia = String(dataAtual.getDate()).padStart(2, '0');
            var mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
            var ano = dataAtual.getFullYear();
            var dataFormatada = dia + '/' + mes + '/' + ano;	
			
			//Usuário logado
			let pesNomePesquisador = document.getElementById("pesNomePesquisador").value;
			let psPesqOcorrenciaFeedback = document.getElementById("psPesqOcorrenciaFeedback").value;
			let psPesqOcorrenciaApontamento = document.getElementById("psPesqOcorrenciaApontamento").value;

			$('[name^="psPesqOcorreData___"]'); //trará todos os campos filhos deste formulário. 
			//Aqui percorrerá todos os itens.
			for(var i = 0; i < $('[name^="psPesqOcorreData___"]').length; i++){
				$(`#psPesqOcorreData___${indice}`).val(dataFormatada).prop("readonly", true);
				$(`#psPesqOcorreAtendente___${indice}`).val(pesNomePesquisador).prop("readonly", true);
				$(`#psPesqOcorreFeedback___${indice}`).val(psPesqOcorrenciaFeedback).prop("readonly", true);
				$(`#psPesqOcorreAponta___${indice}`).val(psPesqOcorrenciaApontamento).prop("readonly", true);
			}	

			//limpa campos ao enviar ocorrencia
			const limpaPsPesqOcorrenciaFeedback = document.querySelector('#psPesqOcorrenciaFeedback');
			limpaPsPesqOcorrenciaFeedback.value = '';
			
			const limpaPsPesqOcorrenciaApontamento = document.querySelector('#psPesqOcorrenciaApontamento');
			limpaPsPesqOcorrenciaApontamento.value = '';
		},		
	}
})();

function getDataAtual() {
	const today = new Date();
	const dia = String(today.getDate()).padStart(2, '0');
	const mes = String(today.getMonth() + 1).padStart(2, '0'); // Os meses começam do zero (janeiro é 0)
	const ano = today.getFullYear();
	return dia + '/' + mes + '/' + ano;
}

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	

			

		}
	}
});

//data set consulta de produtos
$(document).on("change", ".infPesqNumSerie", function() {			
	if( $(this).val().trim() == ""){
		funcoes.limpaCamposItem();
	}else{
		funcoes.consultaProduto();	
	}
	
});

function formatarData(input) {
	const inputValue = input.value;
	const cleanedInput = inputValue.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
	const formattedInput = cleanedInput.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'); // Adiciona Barra
	input.value = formattedInput;
};

//Validação para adiconar nova ocorrencia, não pode estar vazio
$(document).on("click", "#addOcorrencia", function() {
	//funcoes.addLinhaOcorrencias();
	let addNovoItem = true;

	let pesqOcorrenciaFeedback = $("#pesqOcorrenciaFeedback").val();
	let pesqOcorrenciaApontamento = $("#pesqOcorrenciaApontamento").val();

	if (pesqOcorrenciaFeedback.trim() !=='' && pesqOcorrenciaApontamento.trim() !=='') {
		funcoes.addLinhaOcorrencias();
	} else if (pesqOcorrenciaFeedback.trim() === '' && pesqOcorrenciaApontamento.trim() ===''){
		FLUIGC.toast({ title: '', message: "É preciso preencher os campos para adicionar um novo item. Pesquisa", type: 'warning' });
	}else{
		if (pesqOcorrenciaFeedback.trim() === ''){
			FLUIGC.toast({ title: '', message: "É preciso preencher o feddback adicionar um novo item.", type: 'warning' });
		}else{
			FLUIGC.toast({ title: '', message: "É preciso preencher o apontamento adicionar um novo item.", type: 'warning' });
		}
	}
});

//Validação para adiconar nova ocorrencia pos safra, não pode estar vazio
$(document).on("click", "#addOcorrenciaPS", function() {
	//funcoes.addLinhaOcorrencias();
	let addNovoItem = true;

	let psPesqOcorrenciaFeedback = $("#psPesqOcorrenciaFeedback").val();
	let psPesqOcorrenciaApontamento = $("#psPesqOcorrenciaApontamento").val();

	if (psPesqOcorrenciaFeedback.trim() !=='' && psPesqOcorrenciaApontamento.trim() !=='') {
		funcoes.addLinhaOcorrenciasPs();
	} else if (psPesqOcorrenciaFeedback.trim() === '' && psPesqOcorrenciaApontamento.trim() ===''){
		FLUIGC.toast({ title: '', message: "É preciso preencher os campos para adicionar um novo item. Ps", type: 'warning' });
	}else{
		if (psPesqOcorrenciaFeedback.trim() === ''){
			FLUIGC.toast({ title: '', message: "É preciso preencher o feddback adicionar um novo item.", type: 'warning' });
		}else{
			FLUIGC.toast({ title: '', message: "É preciso preencher o apontamento adicionar um novo item.", type: 'warning' });
		}
	}
});

//Bloqueia campos não efetivou contato 
$(document).on("change", "#pesqEfetivoCont", function() {
	funcoes.efetivouContato();
	funcoes.liberaObs();
});

//Bloqueia campos não fetivou contato pos safra
$(document).on("change", "#psPesqEfetivoCont", function() {
	funcoes.efetivouContatoFs();
	funcoes.liberaObsPs();
});

// $(document).on("change", "#pesqFeedbackEquipamento", function() {
// 	funcoes.bloqueiaNota();
// });

//Gatilhos preenche campos do pos safra
// $(document).on("change", "#pesqTelefone", function() {
// 	funcoes.preencheCampos();
// });
$(document).on("change", "#pesqNumSerie", function() {
	funcoes.preencheCampos();
});
// $(document).on("change", "#pesqModelo", function() {
// 	funcoes.preencheCampos();
// });
// $(document).on("change", "#pesqRevenda", function() {
// 	funcoes.preencheCampos();
// });
// $(document).on("change", "#pesqCidadeRevenda", function() {
// 	funcoes.preencheCampos();
// });
// $(document).on("change", "#pesqCliente", function() {
// 	funcoes.preencheCampos();
// });
// $(document).on("change", "#pesqCidadeCliente", function() {
// 	funcoes.preencheCampos();
// });
// $(document).on("change", "#pesqRepresentante", function() {
// 	funcoes.preencheCampos();
// });
// $(document).on("change", "#pesqAcompanhouEntrega", function() {
// 	funcoes.preencheCampos();
// });
// $(document).on("change", "#pesqTelefone", function() {
// 	funcoes.preencheCampos();
// });
$(document).on("change", "#pesqTermColheita", function() {
	funcoes.blocCalendar();
});


//Aplica máscara no telefone.
const mascaraTelefone = (value) => {
	if (!value) return ''
	
	return value
		.replace(/[\D]/g, '')
		.replace(/(\d{2})(\d)/, '($1) $2')
		.replace(value[5] != 9 ? /(\d{4})(\d)/ : /(\d{5})(\d)/, '$1-$2')
		.replace(/(-\d{4})(\d+?)/, '$1')
}	
const aplicaMascaraTelefone = (input) => {
input.value = mascaraTelefone(input.value)
}

//Chama função para liberar div ocorrencias
$(document).on("change", "#pesqOcorrencia", function() {
	funcoes.liberaOcorrencias();
});

//Chama função para liberar div ocorrencias pos safra
$(document).on("change", "#psPesqOcorrencia", function() {
	funcoes.liberaOcorrenciasPs();
});
// //Remove ocorrencias do pai e filho
function removeOcorrencia(oElement){
	fnWdkRemoveChild(oElement);
};

function loadForm(){	

	//funcoes.limpaRet();
	funcoes.efetivouContato();
	funcoes.efetivouContatoFs();
	funcoes.liberaObs();
	funcoes.liberaObsPs();
	//Carrega data atual
	$(`#solDataPesq`).val(dataAtual);
	$(`#psSolDataPesq`).val(dataAtual);
	
	//var today = new Date();
	
	// var psSolDataPesq = FLUIGC.calendar('#psSolDataPesq', {
	// 	language: 'pt-br',
	// 	minDate: today,
	// 	pickDate: true,
	// 	pickTime: false,
	// });
	
}
	


