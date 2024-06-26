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
		
			// Remove caracteres especiais, exceto letras e espaços
			texto = texto.replace(/[^a-zA-Z ]/g, "");
		
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

		validarLinkCad: function() {
			// Obtém o valor do campo "sgqCaDLinkDoc"
			var link = $("#sgqCaDLinkDoc").val();

			// Verifica se o link começa com "G:\\SGQ"
			var padrao = /^g:\\sgq/i;
			if (padrao.test(link)) {
				//console.log("O link é válido.");
				// Realize ações adicionais aqui, se necessário
			} else {					
				FLUIGC.toast({
				title: 'Link inválido: ',
				message: ' Digite um link válido, que inicie com G:&#8726;SGQ',
				type: 'danger'
				});
				
			}
		},

		validarLinkVal: function() {
			// Obtém o valor do campo "sgqCaDLinkDoc"
			var link = $("#sgqValLinkDoc").val();

			// Verifica se o link começa com "G:\\SGQ"
			var padrao = /^g:\\sgq/i;
			if (padrao.test(link)) {
				//console.log("O link é válido.");
				// Realize ações adicionais aqui, se necessário
			} else {
				FLUIGC.toast({
				title: 'Link inválido: ',
				message: ' Digite um link válido, que inicie com G:&#8726;SGQ',
				type: 'danger'
				});
				
			}
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

			$(document).on("change", "#sgqCaDLinkDoc", function() {
				funcoes.validarLinkCad();
			});	 
			
			$(document).on("change", "#sgqValLinkDoc", function() {
				funcoes.validarLinkVal();
			});	 

			$(document).on("change", "#sgqTpSolicitacao", function() {
				let sgqTpSolicitacao = document.getElementById("sgqTpSolicitacao").value;
				
				const limpaSgqCaDLinkDoc = document.querySelector('#sgqCaDLinkDoc');
				const limpaSgqCadObjDoc = document.querySelector('#sgqCadObjDoc');
				const limpaSgqCadPalChave = document.querySelector('#sgqCadPalChave');
				const limpaSgqValLinkDoc = document.querySelector('#sgqValLinkDoc');
				const limpaSgqValObjDoc = document.querySelector('#sgqValObjDoc');
				const limpaSgqRevCodDoc = document.querySelector('#sgqRevCodDoc');
				const limpaSgqRevMotivoDoc = document.querySelector('#sgqRevMotivoDoc');
				const limpaSgqDescCodDoc = document.querySelector('#sgqDescCodDoc');
				const limpaSgqDescMotivoDoc = document.querySelector('#sgqDescMotivoDoc');
				
				if(sgqTpSolicitacao == "Cadastrar"){
					$("[cadastrar]").show();
					$("[validar]").hide();
					$("[abrir]").hide();
					$("[descontinuar]").hide();
					
					var myModal = FLUIGC.modal({
						title: 'Cadastrar e validar novo documento',
						content: 'Seção destinada ao cadastro e validação de novos documentos, se o seu documento já possuir númeração do SGQ,'+ 
						'volte e selecione a opção validação de documentos já cadastrados. Se aplica a revisões de documentos,'+ 
						'já que estes são cadastrados no momento que é aberta a revisão.',
						id: 'fluig-modal',
						actions: [{
							'label': 'Fechar',
							'autoClose': true
						}]
					}, function(err, data) {
						if(err) {
							// do error handling
						} else {
							// do something with data
						}
					});	

				}else if(sgqTpSolicitacao == "Validar"){
					$("[cadastrar]").hide();
					$("[validar]").show();
					$("[abrir]").hide();
					$("[descontinuar]").hide();
					var myModal = FLUIGC.modal({
						title: 'Validar documento já cadastrado',
						content: 'Seção destinada à validação de documentos já cadastrados, que possuem numeração do SGQ.',
						id: 'fluig-modal',
						actions: [{
							'label': 'Fechar',
							'autoClose': true
						}]
					}, function(err, data) {
						if(err) {
							// do error handling
						} else {
							// do something with data
						}
					});

				}else if(sgqTpSolicitacao == "Abrir"){
					$("[cadastrar]").hide();
					$("[validar]").hide();
					$("[abrir]").show();
					$("[descontinuar]").hide();
					
					var myModal = FLUIGC.modal({
						title: 'Abrir revisão para documento validado',
						content: 'Seção destinada para abrir novas revisões de documentos já validados e concluídos. Ao abrir uma nova revisão,'+
						'será enviada por e-mail uma cópia do documento para edição, a revisão já estará cadastra no TOTVS.',
						id: 'fluig-modal',
						actions: [{
							'label': 'Fechar',
							'autoClose': true
						}]
					}, function(err, data) {
						if(err) {
							// do error handling
						} else {
							// do something with data
						}
					});
					
				}else if(sgqTpSolicitacao == "Descontinuar"){
					$("[cadastrar]").hide();
					$("[validar]").hide();
					$("[abrir]").hide();
					$("[descontinuar]").show();
					
					var myModal = FLUIGC.modal({
						title: 'Descontinuar documento validado',
						content: 'Seção destinada para descontinuar documentos já aprovados. Ao descontinuar um documento este será apagado PERMANEMENTE.',
						id: 'fluig-modal',
						actions: [{
							'label': 'Fechar',
							'autoClose': true
						}]
					}, function(err, data) {
						if(err) {
							// do error handling
						} else {
							// do something with data
						}
					});
			
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

			//Atirbuição para atendente.
			$(document).on("change", "#sgqAtendente", function() {
				let sgqAtendente = $("#sgqAtendente").val();
				
				if(sgqAtendente == "Bruno"){
					//Atendente Bruno
					$('#grupoResponsavelAtend').val('Pool:Group:000058');
				}else if(sgqAtendente == "Fabio"){
					//Atendente Fabio
					$('#grupoResponsavelAtend').val('Pool:Group:000056');
				}else if(sgqAtendente == "Maira"){
					//Atendente Maira
					$('#grupoResponsavelAtend').val('Pool:Group:000057');
				}else{
					$('#grupoResponsavelAtend').val('');
				}
			});
			
		}
	}
})();

function loadForm(){	
	let sgqTpSolicitacao = document.getElementById("sgqTpSolicitacao").value;

	$("[cadastrar]").hide();
	$("[validar]").hide();
	$("[abrir]").hide();
	$("[descontinuar]").hide();

	$('#sgqAcao').val('');

	if(CURRENT_STATE == INICIO_0){
		$(document).on("change", "#sgqTpDocumento", function() {
			var dataAtual = new Date();

			// Formatar a data para o formato dd/mm/aaaa
			var dia = String(dataAtual.getDate()).padStart(2, '0');
			var mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // +1 porque os meses são indexados a partir de 0
			var ano = dataAtual.getFullYear();

			// Formatar a hora para o formato hh:mm:ss
			var horas = String(dataAtual.getHours()).padStart(2, '0');
			var minutos = String(dataAtual.getMinutes()).padStart(2, '0');
			var segundos = String(dataAtual.getSeconds()).padStart(2, '0');

			// Combinar data e hora no formato desejado
			var dataFormatada = `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;
			
			$('#sgqDtHoraIni').val(dataFormatada);
	
		});
	}else if(CURRENT_STATE == INICIO){

	}else if(CURRENT_STATE == AGUARDANDO_ATENDIMENTO){
				
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
		}else if(sgqTpSolicitacao == "Abrir"){
			$("[cadastrar]").hide();
			$("[validar]").hide();
			$("[abrir]").show();
			$("[descontinuar]").hide();
		}else if(sgqTpSolicitacao == "Descontinuar"){
			$("[cadastrar]").hide();
			$("[validar]").hide();
			$("[abrir]").hide();
			$("[descontinuar]").show();
		}

		$(document).on("change", "#sgqAtendente", function() {
			var dataAtual = new Date();

			// Formatar a data para o formato dd/mm/aaaa
			var dia = String(dataAtual.getDate()).padStart(2, '0');
			var mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // +1 porque os meses são indexados a partir de 0
			var ano = dataAtual.getFullYear();

			// Formatar a hora para o formato hh:mm:ss
			var horas = String(dataAtual.getHours()).padStart(2, '0');
			var minutos = String(dataAtual.getMinutes()).padStart(2, '0');
			var segundos = String(dataAtual.getSeconds()).padStart(2, '0');

			// Combinar data e hora no formato desejado
			var dataFormatada = `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;
			
			$('#sgqDtHoraAloca').val(dataFormatada);
	
		});	 
		
	}else if(CURRENT_STATE == ANALISE_DOCUMENTO){

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
		}else if(sgqTpSolicitacao == "Abrir"){
			$("[cadastrar]").hide();
			$("[validar]").hide();
			$("[abrir]").show();
			$("[descontinuar]").hide();
		}else if(sgqTpSolicitacao == "Descontinuar"){
			$("[cadastrar]").hide();
			$("[validar]").hide();
			$("[abrir]").hide();
			$("[descontinuar]").show();
		}

		$(document).on("change", "#sgqAcao", function() {
			var sgqAcao = document.getElementById('sgqAcao').value;
			var dataAtual = new Date();

			// Formatar a data para o formato dd/mm/aaaa
			var dia = String(dataAtual.getDate()).padStart(2, '0');
			var mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // +1 porque os meses são indexados a partir de 0
			var ano = dataAtual.getFullYear();

			// Formatar a hora para o formato hh:mm:ss
			var horas = String(dataAtual.getHours()).padStart(2, '0');
			var minutos = String(dataAtual.getMinutes()).padStart(2, '0');
			var segundos = String(dataAtual.getSeconds()).padStart(2, '0');

			// Combinar data e hora no formato desejado
			var dataFormatada = `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;
			
			if(sgqAcao == 'Finalizar'){
				$('#dataFinalizacao').val(dataFormatada);
				$('#sgqDtHoraFim').val(dataFormatada);
				$('#sgqDtHoraCance').val('');
				$('#sgqDtHoraAguarda').val('');
			}else if(sgqAcao == 'Cancelar'){
				$('#dataCancelamento').val(dataFormatada);
				$('#sgqDtHoraCance').val(dataFormatada);
				$('#sgqDtHoraFim').val('');
				$('#sgqDtHoraAguarda').val('');
			}else if(sgqAcao == 'Aguardar'){
				$('#dataPendendcia').val(dataFormatada);
				$('#sgqDtHoraAguarda').val(dataFormatada);
				$('#sgqDtHoraFim').val('');
				$('#sgqDtHoraCance').val('');
			}				
		});

		$(document).on("change", "#sgqTpSolicitacao", function() {
			let sgqTpSolicitacao = document.getElementById("sgqTpSolicitacao").value;
			
			const limpaSgqCaDLinkDoc = document.querySelector('#sgqCaDLinkDoc');
			const limpaSgqCadObjDoc = document.querySelector('#sgqCadObjDoc');
			const limpaSgqCadPalChave = document.querySelector('#sgqCadPalChave');
			const limpaSgqValLinkDoc = document.querySelector('#sgqValLinkDoc');
			const limpaSgqValObjDoc = document.querySelector('#sgqValObjDoc');
			const limpaSgqRevCodDoc = document.querySelector('#sgqRevCodDoc');
			const limpaSgqRevMotivoDoc = document.querySelector('#sgqRevMotivoDoc');
			const limpaSgqDescCodDoc = document.querySelector('#sgqDescCodDoc');
			const limpaSgqDescMotivoDoc = document.querySelector('#sgqDescMotivoDoc');
			
			if(sgqTpSolicitacao == "Cadastrar"){
				$("[cadastrar]").show();
				$("[validar]").hide();
				$("[abrir]").hide();
				$("[descontinuar]").hide();
				
				var myModal = FLUIGC.modal({
					title: 'Cadastrar e validar novo documento',
					content: 'Seção destinada ao cadastro e validação de novos documentos, se o seu documento já possuir númeração do SGQ,'+ 
					'volte e selecione a opção validação de documentos já cadastrados. Se aplica a revisões de documentos,'+ 
					'já que estes são cadastrados no momento que é aberta a revisão.',
					id: 'fluig-modal',
					actions: [{
						'label': 'Fechar',
						'autoClose': true
					}]
				}, function(err, data) {
					if(err) {
						// do error handling
					} else {
						// do something with data
					}
				});	

			}else if(sgqTpSolicitacao == "Validar"){
				$("[cadastrar]").hide();
				$("[validar]").show();
				$("[abrir]").hide();
				$("[descontinuar]").hide();
				var myModal = FLUIGC.modal({
					title: 'Validar documento já cadastrado',
					content: 'Seção destinada à validação de documentos já cadastrados, que possuem numeração do SGQ.',
					id: 'fluig-modal',
					actions: [{
						'label': 'Fechar',
						'autoClose': true
					}]
				}, function(err, data) {
					if(err) {
						// do error handling
					} else {
						// do something with data
					}
				});

			}else if(sgqTpSolicitacao == "Abrir"){
				$("[cadastrar]").hide();
				$("[validar]").hide();
				$("[abrir]").show();
				$("[descontinuar]").hide();
				
				var myModal = FLUIGC.modal({
					title: 'Abrir revisão para documento validado',
					content: 'Seção destinada para abrir novas revisões de documentos já validados e concluídos. Ao abrir uma nova revisão,'+
					'será enviada por e-mail uma cópia do documento para edição, a revisão já estará cadastra no TOTVS.',
					id: 'fluig-modal',
					actions: [{
						'label': 'Fechar',
						'autoClose': true
					}]
				}, function(err, data) {
					if(err) {
						// do error handling
					} else {
						// do something with data
					}
				});
				
			}else if(sgqTpSolicitacao == "Descontinuar"){
				$("[cadastrar]").hide();
				$("[validar]").hide();
				$("[abrir]").hide();
				$("[descontinuar]").show();
				
				var myModal = FLUIGC.modal({
					title: 'Descontinuar documento validado',
					content: 'Seção destinada para descontinuar documentos já aprovados. Ao descontinuar um documento este será apagado PERMANEMENTE.',
					id: 'fluig-modal',
					actions: [{
						'label': 'Fechar',
						'autoClose': true
					}]
				}, function(err, data) {
					if(err) {
						// do error handling
					} else {
						// do something with data
					}
				});
		
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


	}else if(CURRENT_STATE == AGUARDANDO){
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
		}else if(sgqTpSolicitacao == "Abrir"){
			$("[cadastrar]").hide();
			$("[validar]").hide();
			$("[abrir]").show();
			$("[descontinuar]").hide();
		}else if(sgqTpSolicitacao == "Descontinuar"){
			$("[cadastrar]").hide();
			$("[validar]").hide();
			$("[abrir]").hide();
			$("[descontinuar]").show();
		}

		$(document).on("change", "#sgqAcao", function() {
			var sgqAcao = document.getElementById('sgqAcao').value;
			var dataAtual = new Date();

			// Formatar a data para o formato dd/mm/aaaa
			var dia = String(dataAtual.getDate()).padStart(2, '0');
			var mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // +1 porque os meses são indexados a partir de 0
			var ano = dataAtual.getFullYear();

			// Formatar a hora para o formato hh:mm:ss
			var horas = String(dataAtual.getHours()).padStart(2, '0');
			var minutos = String(dataAtual.getMinutes()).padStart(2, '0');
			var segundos = String(dataAtual.getSeconds()).padStart(2, '0');

			// Combinar data e hora no formato desejado
			var dataFormatada = `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;
			
			if(sgqAcao == 'Finalizar'){
				$('#dataFinalizacao').val(dataFormatada);
				$('#sgqDtHoraFim').val(dataFormatada);
				$('#sgqDtHoraCance').val('');
			}else if(sgqAcao == 'Cancelar'){
				$('#dataCancelamento').val(dataFormatada);
				$('#sgqDtHoraCance').val(dataFormatada);
				$('#sgqDtHoraFim').val('');
			}else if(sgqAcao == 'Aguardar'){
				$('#dataPendendcia').val(dataFormatada);
				//$('#sgqDtHoraAguarda').val(dataFormatada);
				$('#sgqDtHoraFim').val('');
				$('#sgqDtHoraCance').val('');
			}				
		});

	}else if(CURRENT_STATE == FIM){
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
		}else if(sgqTpSolicitacao == "Abrir"){
			$("[cadastrar]").hide();
			$("[validar]").hide();
			$("[abrir]").show();
			$("[descontinuar]").hide();
		}else if(sgqTpSolicitacao == "Descontinuar"){
			$("[cadastrar]").hide();
			$("[validar]").hide();
			$("[abrir]").hide();
			$("[descontinuar]").show();
		}
		
	}else if(CURRENT_STATE == CANCELAMENTO){
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
		}else if(sgqTpSolicitacao == "Abrir"){
			$("[cadastrar]").hide();
			$("[validar]").hide();
			$("[abrir]").show();
			$("[descontinuar]").hide();
		}else if(sgqTpSolicitacao == "Descontinuar"){
			$("[cadastrar]").hide();
			$("[validar]").hide();
			$("[abrir]").hide();
			$("[descontinuar]").show();
		}
	}

};
