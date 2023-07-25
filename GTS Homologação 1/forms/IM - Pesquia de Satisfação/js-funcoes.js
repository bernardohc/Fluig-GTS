$(document).ready(function() {wdkAddChild
	setTimeout(function() {
		funcoes.start();
	}, 100)	
});

//Aqui cria as funcioes
var funcoes = (function() {
	var loading = FLUIGC.loading(window);
	var index = 0;

	return {
		start : function() {
			//eventsFuncoes.setup();
		},
		//Add Calendarios

		efetivouContato : function(){
			let pesqEfetivoCont = document.getElementById("pesqEfetivoCont").value;
			let pesqAcompanhouEntrega = document.getElementById("pesqAcompanhouEntrega");
			let pesqTelefone = document.getElementById("pesqTelefone");
			let pesqNotaAtendimento = document.getElementById("pesqNotaAtendimento");
			let pesqFeedbackAtendimento = document.getElementById("pesqFeedbackAtendimento");
			let pesqNotaDesempenho = document.getElementById("pesqNotaDesempenho");
			let pesqFeedbackEquipamento = document.getElementById("pesqFeedbackEquipamento");
			let pesqPrevColheita = document.getElementById("pesqPrevColheita");

			if (pesqEfetivoCont === "nao" || pesqEfetivoCont === "") {
				pesqAcompanhouEntrega.disabled = true;
				pesqTelefone.disabled = true;
				pesqNotaAtendimento.disabled = true;
				pesqFeedbackAtendimento.disabled = true;
				pesqNotaDesempenho.disabled = true;
				pesqFeedbackEquipamento.disabled = true;
				pesqPrevColheita.disabled = true;
			}else{
				pesqAcompanhouEntrega.disabled = false;
				pesqTelefone.disabled = false;
				pesqNotaAtendimento.disabled = false;
				pesqFeedbackAtendimento.disabled = false;
				pesqNotaDesempenho.disabled = false;
				pesqFeedbackEquipamento.disabled = false;
				pesqPrevColheita.disabled = false;

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
			let psPesqAcompanhouEntrega = document.getElementById("psPesqAcompanhouEntrega");
			let psPesqTelefone = document.getElementById("psPesqTelefone");
			let psPesqNotaAtendimento = document.getElementById("psPesqNotaAtendimento");
			let psPesqFeedbackAtendimento = document.getElementById("psPesqFeedbackAtendimento");
			let psPesqNotaDesempenho = document.getElementById("psPesqNotaDesempenho");
			let psPesqFeedbackEquipamento = document.getElementById("psPesqFeedbackEquipamento");
			let psPesqDispRevenda = document.getElementById("psPesqDispRevenda");
			let psPesqFeedbackPecas = document.getElementById("psPesqFeedbackPecas");

			if (psPesqEfetivoCont === "nao" || psPesqEfetivoCont === "") {
				psPesqAcompanhouEntrega.disabled = true;
				psPesqTelefone.disabled = true;
				psPesqNotaAtendimento.disabled = true;
				psPesqFeedbackAtendimento.disabled = true;
				psPesqNotaDesempenho.disabled = true;
				psPesqFeedbackEquipamento.disabled = true;
				psPesqDispRevenda.disabled = true;
				psPesqFeedbackPecas.disabled = true;
			}else{
				psPesqAcompanhouEntrega.disabled = false;
				psPesqTelefone.disabled = false;
				psPesqNotaAtendimento.disabled = false;
				psPesqFeedbackAtendimento.disabled = false;
				psPesqNotaDesempenho.disabled = false;
				psPesqFeedbackEquipamento.disabled = false;
				psPesqDispRevenda.disabled = false;
				psPesqFeedbackPecas.disabled = false;
			}
		},

		//Função para preencher campos do pós safra
		preencheCampos : function(){
			let pesqEntregaPor = document.getElementById("pesqEntregaPor").value;
			let pesqNumSerie = document.getElementById("pesqNumSerie").value;
			let pesqModelo = document.getElementById("pesqModelo").value;
			let pesqRevenda = document.getElementById("pesqRevenda").value;
			let pesqCidadeRevenda = document.getElementById("pesqCidadeRevenda").value;
			let pesqCliente = document.getElementById("pesqCliente").value;
			let pesqCidadeCliente = document.getElementById("pesqCidadeCliente").value;

			$(`#psPesqEntregaPor`).val(pesqEntregaPor).prop("readonly", true);
			$(`#psPesqNumSerie`).val(pesqNumSerie).prop("readonly", true);
			$(`#psPesqModelo`).val(pesqModelo).prop("readonly", true);
			$(`#psPesqRevenda`).val(pesqRevenda).prop("readonly", true);
			$(`#psPesqCidadeRevenda`).val(pesqCidadeRevenda).prop("readonly", true);
			$(`#psPesqCliente`).val(pesqCliente).prop("readonly", true);
			$(`#psPesqCidadeCliente`).val(pesqCidadeCliente).prop("readonly", true);
		},

		limpaRet : function(){
			const limpaPesqFimOcorrencia = document.querySelector('#pesqFimOcorrencia');
			limpaPesqFimOcorrencia.value = '';

			const limpaPesqPsFimOcorrencia = document.querySelector('#pesqPsFimOcorrencia');
			limpaPesqPsFimOcorrencia.value = '';
		},

		//Condição para ocultar div ocorrencias Pesquisa e campo fim ocorrencia
		liberaOcorrencias : function(){
			let pesqOcorrencia = "";
			pesqOcorrencia = document.getElementById("pesqOcorrencia").value;
			if(pesqOcorrencia == "nao"){
				$("[teveOcorrencia]").hide();
				$("[fimOcorrencia]").hide();
			}else if(pesqOcorrencia == ""){
				$("[teveOcorrencia]").hide();
				$("[fimOcorrencia]").hide();
			}else{
				$("[teveOcorrencia]").show();
				$("[fimOcorrencia]").show();
			}
		},

		//Condição para ocultar div ocorrencias Pesquisa Pos Safra e campo fim ocorrencia
		liberaOcorrenciasPs : function(){
			let pesqOcorrenciaPs = "";
			pesqOcorrenciaPs = document.getElementById("psPesqOcorrencia").value;
			if(pesqOcorrenciaPs == "nao"){
				$("[teveOcorrenciaPs]").hide();
				$("[psFimOcorrencia]").hide();
			}else if(pesqOcorrenciaPs == ""){
				$("[teveOcorrenciaPs]").hide();
				$("[psFimOcorrencia]").hide();
			}else{
				$("[teveOcorrenciaPs]").show();
				$("[psFimOcorrencia]").show();
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

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	

		}
	}
});

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
});

//Bloqueia campos não fetivou contato pos safra
$(document).on("change", "#psPesqEfetivoCont", function() {
	funcoes.efetivouContatoFs();
});

//Gatilhos preenche campos do pos safra
$(document).on("change", "#pesqEntregaPor", function() {
	funcoes.preencheCampos();
});
$(document).on("change", "#pesqNumSerie", function() {
	funcoes.preencheCampos();
});
$(document).on("change", "#pesqModelo", function() {
	funcoes.preencheCampos();
});
$(document).on("change", "#pesqRevenda", function() {
	funcoes.preencheCampos();
});
$(document).on("change", "#pesqCidadeRevenda", function() {
	funcoes.preencheCampos();
});
$(document).on("change", "#pesqCliente", function() {
	funcoes.preencheCampos();
});
$(document).on("change", "#pesqCidadeCliente", function() {
	funcoes.preencheCampos();
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

	funcoes.limpaRet();
	funcoes.efetivouContato();
	funcoes.efetivouContatoFs();
	
	var today = new Date();
	var solDataPesq = FLUIGC.calendar('#solDataPesq', {
		language: 'pt-br',
		minDate: today,
		pickDate: true,
		pickTime: false,
	});

	var psSolDataPesq = FLUIGC.calendar('#psSolDataPesq', {
		language: 'pt-br',
		minDate: today,
		pickDate: true,
		pickTime: false,
	});
	
}
	


