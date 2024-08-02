$(document).ready(function() {wdkAddChild
	setTimeout(function() {
		funcoes.start();
	}, 100)	
});

//const dataAtual = getDataAtual();

//Aqui cria as funcioes
var funcoes = (function() {
	var loading = FLUIGC.loading(window);
	var index = 0;

	return {
		start : function() {
			//eventsFuncoes.setup();
		},

		gerarDataHora : function() {
			const dataAtual = new Date();
			const dia = dataAtual.getDate().toString().padStart(2, '0');
			const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Lembre-se que os meses em JavaScript são base 0.
			const ano = dataAtual.getFullYear();
			//const hora = "08";
			//const minutos = "00";
			// const hora = dataAtual.getHours().toString().padStart(2, '0');
			// const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
		
			const carimboDataHora = `${dia}/${mes}/${ano} `;//${hora}:${minutos}
			
			$('#solDataPesq').val(carimboDataHora);			
		},

		gerarDataHoraPs : function() {
			const dataAtual = new Date();
			const dia = dataAtual.getDate().toString().padStart(2, '0');
			const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Lembre-se que os meses em JavaScript são base 0.
			const ano = dataAtual.getFullYear();
			//const hora = "08";
			//const minutos = "00";
			// const hora = dataAtual.getHours().toString().padStart(2, '0');
			// const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
		
			const carimboDataHora = `${dia}/${mes}/${ano} `;//${hora}:${minutos}
			
			$('#psSolDataPesq').val(carimboDataHora);			
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
							var entrepaPor = ''

							//Campos Hidden
							$("#idEntregaTec").val(record.numFluig);
							$("#nfEquipamento").val(record.equipNumNotaFiscal);
							$("#codRevenda").val(record.revCodigo);
							$("#lojaRevenda").val(record.revLoja);
							$("#revEstado").val(record.revEstado);
							$("#codCliente").val(record.cliCodigo);
							$("#lojaCliente").val(record.cliLoja);
							$("#revEquipRazaoSocialRevenda").val(record.revEquipRazaoSocialRevenda);
							$("#revEquipCodigo").val(record.revEquipCodigo);
							$("#revEquipLoJa").val(record.revEquipLoJa);
							$("#revEquipEstado").val(record.revEquipEstado);
							
							let entregaPor = record.tipoSolicitante;
							console.log("1 " + entregaPor)
							if(entregaPor === 'Administrativo GTS'){
								$("#pesqEntregaPor").val("Técnico GTS");
								$("#pesqRevenda").val(record.rpRevenda);
								$("#pesqCidadeRevenda").val(record.rpCidadeRev);
								$("#pesqEstadoRevenda").val(record.rpEstadoRev);
								//Pos safra
								$("#psPesqRevenda").val(record.rpRevenda);
								$("#psPesqCidadeRevenda").val(record.rpCidadeRev);
								$("#psPesqEstadoRevenda").val(record.rpEstadoRev);
								console.log("2 " + entregaPor)
							}else if(entregaPor === 'Revenda'){
								$("#pesqEntregaPor").val("Revenda");
								$("#pesqRevenda").val(record.revRazaoSocialRevenda);
								$("#pesqCidadeRevenda").val(record.revCidade);
								$("#pesqEstadoRevenda").val(record.revEstado);
								//Pos Safra
								$("#psPesqRevenda").val(record.revRazaoSocialRevenda);
								$("#psPesqCidadeRevenda").val(record.revCidade);
								$("#psPesqEstadoRevenda").val(record.revEstado);
								console.log("3 " + entregaPor)
							};																					

							$("#pesqModelo").val(record.equipDescricao);
							// $("#pesqRevenda").val(record.revRazaoSocialRevenda);
							// $("#pesqCidadeRevenda").val(record.revCidade);
							// $("#pesqEstadoRevenda").val(record.revEstado);
							$("#pesqCliente").val(record.cliNomeCliente);
							$("#pesqCidadeCliente").val(record.cliCidade);
							$("#pesqEstadoCliente").val(record.cliEstado);
							$("#pesqEntregadorTec").val(record.revEntTecNome);
							$("#pesqAcompanhouEntrega").val(record.protoRecResponsavel);
							$("#pesqTelefone").val(record.protoRecTelefone);
							//pos safra
							$("#psPesqEntregaPor").val(record.tipoSolicitante);
							$("#psPesqModelo").val(record.equipDescricao);
							// $("#psPesqRevenda").val(record.revRazaoSocialRevenda);
							// $("#psPesqCidadeRevenda").val(record.revCidade);
							// $("#psPesqEstadoRevenda").val(record.revEstado);
							$("#psPesqCliente").val(record.cliNomeCliente);
							$("#psPesqCidadeCliente").val(record.cliCidade);
							$("#psPesqEstadoCliente").val(record.cliEstado);							
							$("#psPesqEntregadorTec").val(record.revEntTecNome);							
							
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

		limpaOcorrencia : function(){

			const limpaPesqFimOcorrencia = document.querySelector('#pesqFimOcorrencia');
			limpaPesqFimOcorrencia.value = '';
			
		},
		limpaOcorrenciaPs : function(){

			const limpaPesqPsFimOcorrencia = document.querySelector('#pesqPsFimOcorrencia');
			limpaPesqPsFimOcorrencia.value = '';
			
		},

		limpaCalendario : function(){

			const limpapesqPrevColheita = document.querySelector('#pesqPrevColheita');
			limpapesqPrevColheita.value = '';
			
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

		//Condição para ocultar Melhoria PS
		liberaMelhoria : function(){
			let pesqPsMelhoria = "";
			pesqPsMelhoria = document.getElementById("pesqPsMelhoria").value;
		
			if(pesqPsMelhoria == "sim"){
				$("[temMelhoria]").show();
				console.log("mostrou");
			}else if(pesqPsMelhoria == "" || pesqPsMelhoria == "nao"){
				$("[temMelhoria]").hide();
				console.log("Escondeu");
			}else{
				$("[temMelhoria]").hide();
				console.log("Escondeu");
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
			if(pesqTermColheita == "sim" ){
				$(`#pesqPrevColheita`).prop("readonly", true);
				$(`#pesqPrevColheita`).prop('style', 'pointer-events:none');
				$("#pesqPrevColheita").prop("disabled", true);
			}else if(pesqTermColheita == ""){
				$(`#pesqPrevColheita`).prop("readonly", true);
				$(`#pesqPrevColheita`).prop('style', 'pointer-events:none');
				$("#pesqPrevColheita").prop("disabled", true);
			}
			else{
				$(`#pesqPrevColheita`).prop("readonly", false);
				$(`#pesqPrevColheita`).prop('style', 'pointer-events:all');
				$("#pesqPrevColheita").prop("disabled", false);
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

		preencheCampos: function(){
			let pesqTelefone = document.getElementById("pesqTelefone").value;
			let pesqAcompanhouEntrega = document.getElementById("pesqAcompanhouEntrega").value;
			let pesqRepresentante = document.getElementById("pesqRepresentante").value;
			let pesqNumSerie = document.getElementById("pesqNumSerie").value;

			$(`#psPesqTelefone`).val(pesqTelefone);
			$(`#psPesqAcompanhouEntrega`).val(pesqAcompanhouEntrega);		
			$(`#psPesqRepresentante`).val(pesqRepresentante).prop("readonly", true);			
			$(`#psPesqNumSerie`).val(pesqNumSerie).prop("readonly", true);
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

//Itens para atribuição da tarefa por campo.
$(document).on("change", "#pesqOcorrencia", function() {
	let estado = $("#pesqEstadoCliente").val();
	console.log("pesqEstadoCliente" + pesqEstadoCliente);
	
	if(estado == "RS" || estado == "SC" || estado == "PR" || estado == "SP" || estado == "MS"){
		//Inteligência de Mercado - Pesquisa de Satisfação - Registro de Ocorrências - Região 01
		$('#grupoResponsavelRegiao').val('Pool:Group:000048');
		console.log('Pool:Group:000048');
	}else if(estado == "MT" || estado == "RO" || estado == "PA" || estado == "AC" || estado == "AM" || estado == "RR" || estado == "AP" || estado == "EX"){
		//Inteligência de Mercado - Pesquisa de Satisfação - Registro de Ocorrências - Região 02
		$('#grupoResponsavelRegiao').val('Pool:Group:000049');
		console.log('Pool:Group:000049');
	}else if(estado == "MG" || estado == "GO" || estado == "BA" || estado == "TO" || estado == "MA" || estado == "PI" || estado == "CE" || estado == "DF" || estado == "SE"){
		//Inteligência de Mercado - Pesquisa de Satisfação - Registro de Ocorrências - Região 03
		$('#grupoResponsavelRegiao').val('Pool:Group:000050');
		console.log('Pool:Group:000049');
	}else{
		$('#grupoResponsavelRegiao').val('');
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

// $(document).on("input", "#pesqNumSerie", function() {
// 	let pesqNumSerie = document.getElementById("pesqNumSerie").value;
// 	$(`#psPesqNumSerie`).val(pesqNumSerie).prop("readonly", true);
// 	console.log(pesqNumSerie);
// });

// $(document).on("input", "#pesqRepresentante", function() {
// 	let pesqRepresentante = document.getElementById("pesqRepresentante").value;
// 	$(`#psPesqRepresentante`).val(pesqRepresentante).prop("readonly", true);
// 	console.log(pesqRepresentante);
// });

// $(document).on("change", "#pesqAcompanhouEntrega", function() {
// 	let pesqAcompanhouEntrega = document.getElementById("pesqAcompanhouEntrega").value;
// 	$(`#psPesqAcompanhouEntrega`).val(pesqAcompanhouEntrega);
// 	console.log(pesqAcompanhouEntrega);
// });

// $(document).on("input", "#pesqTelefone", function() {
// 	let pesqTelefone = document.getElementById("pesqTelefone").value;
// 	$(`#psPesqTelefone`).val(pesqTelefone);
// 	console.log(pesqTelefone);
// });
$(document).on("change", "#pesqNotaAtendimento", function() {
	funcoes.preencheCampos();
});

$(document).on("change", "#pesqRepresentante", function() {
	funcoes.preencheCampos();
});

$(document).on("change", "#pesqTermColheita", function() {
	funcoes.blocCalendar();
	//funcoes.limpaCalendario();
});
//Libera campo para preencher melhoria
$(document).on("change", "#pesqPsMelhoria", function() {
	funcoes.liberaMelhoria();
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
//Data atual
$(document).on("change", "#pesqEfetivoCont", function() {
	funcoes.gerarDataHora();
});
//Data atual PS
$(document).on("change", "#psPesqEfetivoCont", function() {
	funcoes.gerarDataHoraPs();
});
// //Remove ocorrencias do pai e filho
function removeOcorrencia(oElement){
	fnWdkRemoveChild(oElement);
};

//Limpar pesqFimOcorrencia
$(document).on("change", "#pesqOcorrencia", function() {
	funcoes.limpaOcorrencia();
});

//Limpar pesqPsFimOcorrencia
$(document).on("change", "#psPesqOcorrencia", function() {
	funcoes.limpaOcorrenciaPs();
});


function loadForm(){	

	//funcoes.limpaRet();
	funcoes.efetivouContato();
	funcoes.efetivouContatoFs();
	funcoes.liberaObs();
	funcoes.liberaObsPs();
	//Carrega data atual
	//$(`#solDataPesq`).val(dataAtual);
	//$(`#psSolDataPesq`).val(dataAtual);

	
	if(CURRENT_STATE == INICIO_0 || CURRENT_STATE == INICIO){
		$(document).on("change", "#pesqTermColheita", function() {
			funcoes.blocCalendar();
			funcoes.limpaCalendario();
		});
	}
	if(CURRENT_STATE == Aguardando_Colheita){

		$(document).on("change", "#pesqTermColheita", function() {
			//funcoes.blocCalendar();
			//funcoes.limpaCalendario();
			$(`#pesqPrevColheita`).prop("readonly", true);
			$(`#pesqPrevColheita`).prop('style', 'pointer-events:none');
			
		});
	}

	
};

