$(document).ready(function() {
	setTimeout(function() {
		funcoes.start();
	}, 100)	
});

//Aqui cria as funcioes
var funcoes = (function() {
	var loading = FLUIGC.loading(window);
	
	return {
		start : function() {
			eventsFuncoes.setup();
		},	

		padraoNome: function() {
			var texto = $("#sgqSolNome").val();

			// Remove caracteres especiais, exceto espaços, letras, acentos e apóstrofes
			texto = texto.replace(/[^A-ZÀ-ÖÜá-öüçêéíóôú' ]/gi, "");

			// Converte todas as letras para minúsculas e em seguida capitaliza a primeira letra de cada palavra
			texto = texto.toLowerCase().replace(/\b\w/g, function(char) {
				return char.toUpperCase();
			});

			// Atualiza o valor do campo com o texto formatado
			$("#sgqSolNome").val(texto);
		},

		printData: function(){
			var campo = document.getElementById('dataSolicitacao');
			var dataAtual = new Date();
			
			// Formatar a data para o formato dd/mm/aaaa
			var dia = String(dataAtual.getDate()).padStart(2, '0');
			var mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // +1 porque os meses são indexados a partir de 0
			var ano = dataAtual.getFullYear();
			
			var dataFormatada = dia + '/' + mes + '/' + ano;
			
			campo.value = dataFormatada;
		},

	}
})();

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	

			$(document).on("input", "#sgqSolNome", function() {
				funcoes.padraoNome();
				funcoes.printData();
			});	 

			$(document).on("change", "input:radio[name='sgqTpSolicitacao']", function() {
				var sgqTpSolicitacao = $("input:radio[name='sgqTpSolicitacao']:checked").val();
				const limpaSgqCaDLinkDoc = document.querySelector('#sgqCaDLinkDoc');
				const limpaSgqCadObjDoc = document.querySelector('#sgqCadObjDoc');
				const limpaSgqCadPalChave = document.querySelector('#sgqCadPalChave');
				const limpaSgqValLinkDoc = document.querySelector('#sgqValLinkDoc');
				const limpaSgqValObjDoc = document.querySelector('#sgqValObjDoc');
				const limpaSgqRevCodDoc = document.querySelector('#sgqRevCodDoc');
				const limpaSgqRevMotivoDoc = document.querySelector('#sgqRevMotivoDoc');
				const limpaSgqDescCodDoc = document.querySelector('#sgqDescCodDoc');
				const limpaSgqDescMotivoDoc = document.querySelector('#sgqDescMotivoDoc');
				console.log("Acionou gatilho");
				
				if(sgqTpSolicitacao == "Cadastrar"){
					$("[cadastrar]").show();
					$("[validar]").hide();
					$("[abrir]").hide();
					$("[descontinuar]").hide();
				}else if(sgqTpSolicitacao == "Validar"){
					$("[cadastrar]").hide();
					$("[validar]").show();
					$("[abrir]").hide();
					$("[descontinuar]").hide();
					//limpPesqOcorrenciaFeedback.value = '';
				}else if(sgqTpSolicitacao == "Abrir"){
					$("[cadastrar]").hide();
					$("[validar]").hide();
					$("[abrir]").show();
					$("[descontinuar]").hide();
					//limpPesqOcorrenciaFeedback.value = '';
				}else if(sgqTpSolicitacao == "Descontinuar"){
					$("[cadastrar]").hide();
					$("[validar]").hide();
					$("[abrir]").hide();
					$("[descontinuar]").show();
					//limpPesqOcorrenciaFeedback.value = '';
				}else{
					$("[cadastrar]").hide();
					$("[validar]").hide();
					$("[abrir]").hide();
					$("[descontinuar]").hide();
				}
				
				limpaSgqCaDLinkDoc.value = '';
				limpaSgqCadObjDoc.value = '';
				limpaSgqCadPalChave.value = '';
				limpaSgqValLinkDoc.value = '';
				limpaSgqValObjDoc.value = '';
				limpaSgqRevCodDoc.value = '';
				limpaSgqRevMotivoDoc.value = '';
				limpaSgqDescCodDoc.value = '';
				limpaSgqDescMotivoDoc.value = '';
				
			});
			
		}
	}
})();
	

function loadForm(){	

	$("[cadastrar]").hide();
	$("[validar]").hide();
	$("[abrir]").hide();
	$("[descontinuar]").hide();

	if(CURRENT_STATE == INICIO_0){
		
	}else if(CURRENT_STATE == INICIO){

	}else if(CURRENT_STATE == SECAO2){

		if(FORM_MODE == "MOD"){

			var myModal = FLUIGC.modal({
				title: 'Cadastrar e validar novo documento',
				content: 'Seção destinada ao cadastro e validação de novos documentos, se o seu documento já possuir númeração do SGQ,'+ 
				'volte e selecione a opção validação de documentos já cadastrados. Se aplica a revisões de documentos,'+ 
				'já que estes são cadastrados no momento que é aberta a revisão.',
				id: 'fluig-modal',
				actions: [{
					'label': 'Close',
					'autoClose': true
				}]
			}, function(err, data) {
				if(err) {
					// do error handling
				} else {
					// do something with data
				}
			});	

		}
	}else if(CURRENT_STATE == SECAO3){
		if(FORM_MODE == "MOD"){

			var myModal = FLUIGC.modal({
				title: 'Validar documento já cadastrado',
				content: 'Seção destinada à validação de documentos já cadastrados, que possuem numeração do SGQ.',
				id: 'fluig-modal',
				actions: [{
					'label': 'Close',
					'autoClose': true
				}]
			}, function(err, data) {
				if(err) {
					// do error handling
				} else {
					// do something with data
				}
			});	

		}
	
	}else if(CURRENT_STATE == SECAO4){
		if(FORM_MODE == "MOD"){

			var myModal = FLUIGC.modal({
				title: 'Abrir revisão para documento validado',
				content: 'Seção destinada para abrir novas revisões de documentos já validados e concluídos. Ao abrir uma nova revisão,'+
				'será enviada por e-mail uma cópia do documento para edição, a revisão já estará cadastra no TOTVS.',
				id: 'fluig-modal',
				actions: [{
					'label': 'Close',
					'autoClose': true
				}]
			}, function(err, data) {
				if(err) {
					// do error handling
				} else {
					// do something with data
				}
			});	

		}
	}else if(CURRENT_STATE == SECAO5){
		if(FORM_MODE == "MOD"){

			var myModal = FLUIGC.modal({
				title: 'Descontinuar documento validado',
				content: 'Seção destinada para descontinuar documentos já aprovados. Ao descontinuar um documento este será apagado PERMANEMENTE.',
				id: 'fluig-modal',
				actions: [{
					'label': 'Close',
					'autoClose': true
				}]
			}, function(err, data) {
				if(err) {
					// do error handling
				} else {
					// do something with data
				}
			});	

		}
	}

};
