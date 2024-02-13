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
		//Consulta Veiculo
		consultaVeiculo : function(index) {
			
			let geraisPlaca = '';
			if(index){
				geraisPlaca = $(`#rvDespPlaca___${index}`).val();
			}else{
				geraisPlaca = $('#geraisPlaca').val();
			}
			
			if(geraisPlaca.length != 7 ){
				$('#geraisVeiculo').val('');
				FLUIGC.toast({ title: '', message: 'A Placa está inválida!', type: 'warning' });
				return;
			}
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsAbastConsultaVeiculo&filterFields=PLACA,"+geraisPlaca,
				data: "",
				success: function (data, status, xhr) {
				
					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						
						if(index){
							//Para quando é na tabela de Despesa de Viagem
							if( records[0].CODRET == "1"){
								let record = records[0];
								let NOMEVEICULO = record.NOMEVEICULO;
							
								$(`#rvDespVeiculo___${index}`).val(NOMEVEICULO);
							
							}else if (records[0].CODRET == "2"){
								//Se retornar como não encontrado, insere o nome do posto manualmente
								FLUIGC.toast({ title: '', message: records[0].MSGRET, type: 'warning' });
								$(`#geraisVeiculo___${index}`).val('');
							}
						}else{
							if( records[0].CODRET == "1"){
								let record = records[0];
								let NOMEVEICULO = record.NOMEVEICULO;
							
								$("#geraisVeiculo").val(NOMEVEICULO);
								 //Adiciona Tipo de Combustível referente a aquele veículo
								$("#abastTpCombustivel").empty();
								$('#abastTpCombustivel').append($('<option>', { 
									value: '',
									text : ''
								}));
								let combustivel = JSON.parse(record.COMBUSTIVEL);
								$.each(combustivel, function(indexComb, value){
									$('#abastTpCombustivel').append($('<option>', { 
										value: value['Combustivel'],
										text : value['Descricao']
									}));
								});
							
							}else if (records[0].CODRET == "2"){
								//Se retornar como não encontrado, insere o nome do posto manualmente
								FLUIGC.toast({ title: '', message: records[0].MSGRET, type: 'warning' });
								$("#geraisVeiculo").val('');
							}

						}
					}else{
					//Se retornar como não encontrado, insere o nome do posto manualmente
						FLUIGC.toast({ title: '', message: 'O Veículo não foi localizado na base de dados.', type: 'warning' });
						$("#geraisVeiculo").val('');
					}
					
					setTimeout(function(){ 
						loading.hide();
					}, 1000);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					FLUIGC.toast({
						title: '',
						message: 'Erro na consulta do veículo, comunicar o Administrador do Sistema!' ,
						type: 'danger'
					});
					loading.hide();
				}
			});
			
		},

		//Consulta posto
		consultaPostoCombustivel : function() {
			
			let abastCNPJPosto = $('#abastCNPJPosto').val().replace(/[^0-9]/g, "").trim();
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsAbastConsultaPosto&filterFields=CNPJPOSTO,"+abastCNPJPosto,
				data: "",
				success: function (data, status, xhr) {
					
					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						if( records[0].CODRET == "1"){
							let record = records[0];
							let CNPJPOSTO = record.CNPJPOSTO;
							let NOMEPOSTO = record.NOMEPOSTO;
							
							$("#abastNomePosto").val(NOMEPOSTO);
							
						}else if (records[0].CODRET == "2"){
							
							//Se retornar como não encontrado, insere o nome do posto manualmente
							FLUIGC.toast({ title: '', message: records[0].MSGRET, type: 'warning' });
								
						}
						
						
					}else{
						//Se retornar como não encontrado, insere o nome do posto manualmente
						FLUIGC.toast({ title: '', message: 'O Posto de combustível não foi localizado na base de dados.', type: 'warning' });
					}
					setTimeout(function(){ 
						loading.hide();
					}, 1000);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					FLUIGC.toast({
						title: '',
						message: 'Erro na consulta do posto de combustível, comunicar o Administrador do Sistema!' ,
						type: 'danger'
					});
					loading.hide();
				}
			});
			
		},

		/*
		 * Despesas da Viagem
		 */
		validaClassificacao : function(){
			let addRvDespClassi = document.getElementById("addRvDespClassi").value;
			let solSetor = document.getElementById("solSetor").value;
			
			if(addRvDespClassi === "Combustível"){
				if(solSetor === "outro" || solSetor === "motorista"){
					$("[liberaComb]").show();
					$("[liberaCnpj]").show();
					//$("[divAbastecimento]").show();
					$('#abastCNPJPosto').mask("00.000.000/0000-00");
				}else if(solSetor === "tecnico"){						
					$("[liberaComb]").show();
					$("[liberaCnpj]").hide();
					//$("[divAbastecimento]").show();
					//$('#abastCNPJPosto').mask("00.000.000/0000-00");
				}else{
					$("[liberaComb]").hide();
					$("[liberaCnpj]").hide();
					//$("[divAbastecimento]").hide();
					$(`#abastCNPJPosto`).val("");
					$(`#abastNomePosto`).val("");
					$(`#abastTpCombustivel`).val("");
					$(`#abastKmAbastecimento`).val("");
					$(`#abastQtdLitros`).val("");
					$(`#abastValorLitro`).val("");
					$(`#abastFormaPagamento`).val("");
					$(`#addRvDespTpPag`).val("");
				}
			}else{
				$("[liberaComb]").hide();
				$("[liberaCnpj]").hide();
			}
		},
		
		//Alterar os tipo de pagamentos quando for selecionado combustível
		liberaPagamentos : function(){
			const addRvDespClassi = document.getElementById('addRvDespClassi');
			const addRvDespTpPag = document.getElementById('addRvDespTpPag');

			// Armazena as opções ocultas
			const opcoesOcultas = ['Assinado NF (Boleto)', 'Rede Frota (Caminhões)', 'Não se aplica'];

			if (addRvDespClassi.value === "Combustível") {
				// Mostra as opções
				opcoesOcultas.forEach(function (opcao) {
					showOption(addRvDespTpPag, opcao);
				});
			} else {
				// Oculta as opções
				opcoesOcultas.forEach(function (opcao) {
					hideOption(addRvDespTpPag, opcao);
				});
			}
		},

		//Valida os dados da despesa antes de enviar pro pai x filho
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
			let solDataSaida = $('#solDataSaida').val().trim();
			let solDataRet = $('#solDataRet').val().trim();
			let abastCNPJPosto = $('#abastCNPJPosto').val().trim();
			let abastNomePosto = $('#abastNomePosto').val().trim();
			let abastTpCombustivel = $('#abastTpCombustivel').val().trim();
			let abastKmAbastecimento = $('#abastKmAbastecimento').val().trim();
			let abastQtdLitros = $('#abastQtdLitros').val().trim();
			let abastValorLitro = $('#abastValorLitro').val().trim();
			let solSetor = $('#solSetor').val().trim();	
			let geraisPlaca = $('#geraisPlaca').val().trim();	
			
			// Função para remover a máscara "00/00/0000" e converter para o formato "YYYY-MM-DD".
			function formatarData(data) {
			const partes = data.split("/");
			if (partes.length === 3) {
				const dia = partes[0].padStart(2, "0");
				const mes = partes[1].padStart(2, "0");
				const ano = partes[2];
				return `${ano}-${mes}-${dia}`;
				}
				return null; // Formato inválido.
			}
	
			// Formate as datas e converta para objetos Date.
			const dataInicialFormatada = formatarData(solDataSaida);
			const dataFinalFormatada = formatarData(solDataRet);
			const dataDespesaFormatada = formatarData(addRvDespData);
	
			const dataInicialObj = new Date(dataInicialFormatada);
			const dataFinalObj = new Date(dataFinalFormatada);
			const dataDespesaObj = new Date(dataDespesaFormatada);

			//Validação data despesa
			let dataMenor = false;
			$("input[name*=rvDespValor___]").each(function(index){
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
			
				let rvDespData = $("#rvDespData___"+index).val();
				const rvDespDataFormatada = formatarData(rvDespData);
				const rvDespDataObj = new Date(rvDespDataFormatada);

				if(dataDespesaObj < rvDespDataObj){
					dataMenor = true;
					return false;
				}
			});

			if(dataMenor){
				message += getMessage("A Nova despesa não pode ser mais antiga que a ultima despesa lançada.", 12, form);
				hasErros = true
			}
			
			if( solSetor == '' ){
				message += getMessage("Setor", 1, form);
				hasErros = true
			}
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
			if( solDataSaida == '' ){
				message += getMessage("Data de Saída", 1, form);
				hasErros = true
			}
			if( solDataRet == '' ){
				message += getMessage("Data de Retorno", 1, form);
				hasErros = true
			}			
			if(!(dataDespesaObj >= dataInicialObj && dataDespesaObj <= dataFinalObj)){
				message += getMessage("Data", 10, form);
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
			if(solSetor === "outro" || solSetor === "motorista"){
				if( addRvDespClassi == "Combustível" ){
					abastCNPJPosto = abastCNPJPosto.replace(/\D/g, '');					
					if(abastCNPJPosto.length !== 14){
						message += getMessage("Cnpj do Posto.", 13, form);
						hasErros = true
					}					
					if( abastCNPJPosto == '' ){
						message += getMessage("Cnpj do Posto.", 1, form);
						hasErros = true
					}
					if( abastNomePosto == '' ){
						message += getMessage("Nome do Posto", 1, form);
						hasErros = true
					}
					if( geraisPlaca == '' ){
						message += getMessage("Placa", 1, form);
						hasErros = true
					}
					if( abastTpCombustivel == '' ){
						message += getMessage("Tipo de Combustível", 1, form);
						hasErros = true
					}
					if( abastKmAbastecimento == '' ){
						message += getMessage("Km Abastecimento", 1, form);
						hasErros = true
					}
					if( abastKmAbastecimento == '0' ){
						message += getMessage("Km Abastecimento ", 11, form);
						hasErros = true
					}
					if( abastQtdLitros == '' ){
						message += getMessage("Quantidade de Litros", 1, form);
						hasErros = true
					}
					if( abastValorLitro == '' ){
						message += getMessage("Valor por Litro", 1, form);
						hasErros = true
					}
				}
			}
			if(solSetor === "tecnico"){
				if( addRvDespClassi == "Combustível" ){
					if( geraisPlaca == '' ){
						message += getMessage("Placa", 1, form);
						hasErros = true
					}
					if( abastTpCombustivel == '' ){
						message += getMessage("Tipo de Combustível", 1, form);
						hasErros = true
					}
					if( abastKmAbastecimento == '' ){
						message += getMessage("Km Abastecimento", 1, form);
						hasErros = true
					}
					if( abastKmAbastecimento == '0' ){
						message += getMessage("Km Abastecimento ", 11, form);
						hasErros = true
					}
					if( abastQtdLitros == '' ){
						message += getMessage("Quantidade de Litros", 1, form);
						hasErros = true
					}
					if( abastValorLitro == '' ){
						message += getMessage("Valor por Litro", 1, form);
						hasErros = true
					}
				}
			}
			if( hasErros ){
				messageToast({message: message}, 'warning')
				return;
			}	
			return true;
		},

		//Adiciona a despesa
		addDespesa : function(){
			const indice = wdkAddChild("tbRelDespesas");

			let addRvDespEstabelecimento = $("#addRvDespEstabelecimento").val();
			let addRvDespDocumento = $("#addRvDespDocumento").val();
			let addRvDespData = $("#addRvDespData").val();
			let addRvDespTpPag = $("#addRvDespTpPag").val();
			let addRvDespClassi = $("#addRvDespClassi").val();
			let addRvDespValor = $("#addRvDespValor").val();
			let addRvDespCCusto = $("#addRvDespCCusto").val();
			let addRvDespAnexo = $("#addRvDespAnexo").val();
			let addRvDespCodiID = $("#addRvDespCodiID").val();
			let abastCNPJPosto = $("#abastCNPJPosto").val();
			let abastNomePosto = $("#abastNomePosto").val();
			let abastTpCombustivel = $("#abastTpCombustivel").val();
			let rvDespTpCombText = $(`#abastTpCombustivel option:selected`).text()
			let abastKmAbastecimento = $("#abastKmAbastecimento").val();
			let abastQtdLitros = $("#abastQtdLitros").val();
			let abastValorLitro = $("#abastValorLitro").val();
			let solSetor = $("#solSetor").val();
			let geraisPlaca = $("#geraisPlaca").val();
			let geraisVeiculo = $("#geraisVeiculo").val();


			$(`#rvDespEstabelecimento___${indice}`).val(addRvDespEstabelecimento)
			$(`#rvDespDocumento___${indice}`).val(addRvDespDocumento)
			$(`#rvDespData___${indice}`).val(addRvDespData)
			$(`#rvDespTpPag___${indice}`).val(addRvDespTpPag)
			$(`#rvDespClassi___${indice}`).val(addRvDespClassi)
			$(`#rvDespValor___${indice}`).val(addRvDespValor)
			$(`#rvDespCCusto___${indice}`).val(addRvDespCCusto)
			$(`#rvDespAnexo___${indice}`).val(addRvDespAnexo)
			$(`#rvDespCodiID___${indice}`).val(addRvDespCodiID)
	
			if( solSetor == "outro" && addRvDespClassi == "Combustível" || solSetor == "motorista" && addRvDespClassi == "Combustível"){
				$(`#rvDespCnpj___${indice}`).val(abastCNPJPosto)
				$(`#rvDespNomePosto___${indice}`).val(abastNomePosto)
				$(`#rvDespTpComb___${indice}`).val(abastTpCombustivel)
				$(`#rvDespTpCombText___${indice}`).val(rvDespTpCombText)
				$(`#rvDespKmAbast___${indice}`).val(abastKmAbastecimento)
				$(`#rvDespQtdL___${indice}`).val(abastQtdLitros)
				$(`#rvDespValorL___${indice}`).val(abastValorLitro)
				$(`#rvDespPlaca___${indice}`).val(geraisPlaca)
				$(`#rvDespVeiculo___${indice}`).val(geraisVeiculo)


				$('input[name*=rvDespCnpj___'+indice+']').closest('.abast').show();
				$('input[name*=rvDespNomePosto___'+indice+']').closest('.abast').show();
				$('input[name*=rvDespTpCombText___'+indice+']').closest('.abast').show();
				$('input[name*=rvDespKmAbast___'+indice+']').closest('.abast').show();
				$('input[name*=rvDespQtdL___'+indice+']').closest('.abast').show();
				$('input[name*=rvDespValorL___'+indice+']').closest('.abast').show();
				$('input[name*=rvDespPlaca___'+indice+']').closest('.abast').show();
				$('input[name*=rvDespVeiculo___'+indice+']').closest('.abast').show();
		
			}
			if( solSetor == "tecnico" && addRvDespClassi == "Combustível"){
				//$(`#rvDespCnpj___${indice}`).val(abastCNPJPosto)
				//$(`#rvDespNomePosto___${indice}`).val(abastNomePosto)
				$(`#rvDespTpComb___${indice}`).val(abastTpCombustivel)
				$(`#rvDespTpCombText___${indice}`).val(rvDespTpCombText)
				$(`#rvDespKmAbast___${indice}`).val(abastKmAbastecimento)
				$(`#rvDespQtdL___${indice}`).val(abastQtdLitros)
				$(`#rvDespValorL___${indice}`).val(abastValorLitro)
				$(`#rvDespPlaca___${indice}`).val(geraisPlaca)
				$(`#rvDespVeiculo___${indice}`).val(geraisVeiculo)


				//$('input[name*=rvDespCnpj___'+indice+']').closest('.abast').show();
				//$('input[name*=rvDespNomePosto___'+indice+']').closest('.abast').show();
				$('input[name*=rvDespTpCombText___'+indice+']').closest('.abast').show();
				$('input[name*=rvDespKmAbast___'+indice+']').closest('.abast').show();
				$('input[name*=rvDespQtdL___'+indice+']').closest('.abast').show();
				$('input[name*=rvDespValorL___'+indice+']').closest('.abast').show();
				$('input[name*=rvDespPlaca___'+indice+']').closest('.abast').show();
				$('input[name*=rvDespVeiculo___'+indice+']').closest('.abast').show();
		
			}
			
			funcoes.limpaAddDespesa();
			funcoes.gerarCarimboDataHora();
			funcoes.validaClassificacao();

			$("[liberaComb]").hide();

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
			
			$('#solDataSaida').prop('readonly', true);
			$('#solDataSaida').prop('style', 'pointer-events:none');

			$('#solSetor').attr('readonly', true);
			$('#solSetor').prop('style', 'pointer-events:none');

			document.getElementById('addRvDespEstabelecimento').focus();
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
			$(`#abastCNPJPosto`).val("");
			$(`#abastNomePosto`).val("");
			$(`#abastTpCombustivel`).val("");
			$(`#abastKmAbastecimento`).val("");
			$(`#abastQtdLitros`).val("");
			$(`#abastValorLitro`).val("");
			$(`#abastFormaPagamento`).val("");
			$(`#geraisPlaca`).val("");
			$(`#geraisVeiculo`).val("");
		
		},

		limpaAbast(){
			$('#addRvDespTpPag').val('');
			$('#geraisPlaca').val('');
			$('#abastTpCombustivel').val('');
			$('#abastKmAbastecimento').val('');
			$('#abastQtdLitros').val('');
			$('#geraisVeiculo').val('');
			$('#abastValorLitro').val('');
		},

		gerarCarimboDataHora : function() {
			const dataAtual = new Date();
			const dia = dataAtual.getDate().toString().padStart(2, '0');
			const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Lembre-se que os meses em JavaScript são base 0.
			const ano = dataAtual.getFullYear();
			const hora = "08";
			const minutos = "00";
			// const hora = dataAtual.getHours().toString().padStart(2, '0');
			// const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
		
			const carimboDataHora = `${dia}/${mes}/${ano} ${hora}:${minutos}`;
			
			$('#geraisCarimboDataHora').val(carimboDataHora);			
		},	

		dataRelatorio : function() {
			const dataAtual = new Date();
			const dia = dataAtual.getDate().toString().padStart(2, '0');
			const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Lembre-se que os meses em JavaScript são base 0.
			const ano = dataAtual.getFullYear();
			//const hora = "08";
			//const minutos = "00";
			// const hora = dataAtual.getHours().toString().padStart(2, '0');
			// const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
		
			const carimboDataHora = `${dia}/${mes}/${ano}`;
			
			$('#solDataSol').val(carimboDataHora);			
		},

		calculaTotal : function(){
			let totalSoma = 0;
			//Soma todas as despesas
			$("input[name*=rvDespValor___]").each(function(index){
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				let rvDespTpPag = $("#rvDespTpPag___"+index).val();
				let rvDespValor = validafunctions.getFloatValue("rvDespValor___"+index);

				if (!isNaN(rvDespValor) ) {
					if(rvDespTpPag === "Dinheiro" || rvDespTpPag === "Cartão"){
						totalSoma = totalSoma + rvDespValor;
					}
				}
			});
			$("#rvTotal").val(totalSoma.toFixed(2));
			validafunctions.setMoeda("rvTotal", 2, false , '');
		},	

		calculaValorLitro : function(){
			let qdtLitros = validafunctions.getFloatValue("abastQtdLitros");
			let valorPg = validafunctions.getFloatValue("addRvDespValor");
			let valorLitro = 0;

			valorLitro = valorPg / qdtLitros;

			$("#abastValorLitro").val(valorLitro.toFixed(2));
			validafunctions.setMoeda("abastValorLitro", 2, false , '');
		},
		
		calculaSaldo : function(){
			//Subtrai do valor do adiantemento somente se for pago em dinheiro.
			let rvSaldo = 0;
			let saldoTotal = 0;
			let solAdianta = validafunctions.getFloatValue("solAdianta");

			$("input[name*=rvDespValor___]").each(function(index){
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				let rvDespTpPag = $("#rvDespTpPag___"+index).val();
				let rvDespValor = validafunctions.getFloatValue("rvDespValor___"+index);

				if(solAdianta > 0 && rvDespTpPag == "Dinheiro"){

					saldoTotal += rvDespValor;

					rvSaldo = solAdianta - saldoTotal
				}
			
			});

			$("#rvSaldo").val(rvSaldo.toFixed(2));
			validafunctions.setMoeda("rvSaldo", 2, true , '');
		},

		calculaCombustivel : function(){
			//soma somente combustivel
			let totalComb = 0;

			$("input[name*=rvDespValor___]").each(function(index){
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				let rvDespClassi = $("#rvDespClassi___"+index).val();
				let rvDespValor = validafunctions.getFloatValue("rvDespValor___"+index);
				let rvDespTpPag = $("#rvDespTpPag___"+index).val();

				if(rvDespClassi === "Combustível") {
					if(rvDespTpPag === "Dinheiro" || rvDespTpPag === "Cartão"){
						totalComb = totalComb + rvDespValor;
					}
				}
			});
			$("#rvTotalComb").val(totalComb.toFixed(2));
			validafunctions.setMoeda("rvTotalComb", 2, false , '');
		},

		calculaCombustivelFat : function(){
			//soma somente combustivel que for faturado
			let totalCombFat = 0;

			$("input[name*=rvDespValor___]").each(function(index){
				
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				let rvDespTpPag = $("#rvDespTpPag___"+index).val();
				let rvDespClassi = $("#rvDespClassi___"+index).val();
				let rvDespValor = parseFloat($("#rvDespValor___"+index).val());

				if(rvDespClassi == "Combustível" ) {
					if(rvDespTpPag == "Assinado NF (Boleto)" || rvDespTpPag == "Rede Frota (Caminhões)" || rvDespTpPag == "Não se aplica"){
						totalCombFat = totalCombFat + rvDespValor;
					}
				}
			});
			$("#rvTotalCombFat").val(totalCombFat.toFixed(2));
			validafunctions.setMoeda("rvTotalCombFat", 2, false , '');
		},

		calculaDiaria : function(){
			//Diaria, considera acomodação e alimentação, divide pela quantidade de dias da viagem
			//se houver mais de um colaborador, dividide pela quantidade de colaboradores
			let somaDiaria = 0;
			let totalSaldo = 0;
			var dataInicial = document.getElementById("solDataSaida").value;
			var dataFinal = document.getElementById("solDataRet").value;
			var solNumColab = document.getElementById("solNumColab").value;
			
			// Função para converter a data no formato "00/00/0000" em um objeto Date.
			function converterParaData(textoData) {
				const partes = textoData.split("/");
				if (partes.length === 3) {
				const dia = parseInt(partes[0], 10);
				const mes = parseInt(partes[1], 10) - 1; // Os meses em objetos Date são base 0.
				const ano = parseInt(partes[2], 10);
				return new Date(ano, mes, dia);
				}
				return null; // Formato inválido.
			}
			
			// Converter as datas em objetos Date.
			const dataInicialObj = converterParaData(dataInicial);
			const dataFinalObj = converterParaData(dataFinal);
			
			// Calcular a diferença em milissegundos.
			const diferencaEmMilissegundos = dataFinalObj - dataInicialObj;
			
			// Converter a diferença em milissegundos para dias.
			const difData = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
			
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

function showOption(selectElement, value) {
	const option = selectElement.querySelector(`option[value="${value}"]`);
	if (option) {
		option.style.display = ''; // Exibir a opção
	}
}

function hideOption(selectElement, value) {
	const option = selectElement.querySelector(`option[value="${value}"]`);
	if (option) {
		option.style.display = 'none'; // Esconder a opção
	}
}

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	

			$(document).on("keyup", "#geraisPlaca", function() {
				$("#geraisPlaca").val( $("#geraisPlaca").val().toUpperCase()   );
			});

			$(document).on("change", "#geraisPlaca", function() {
				const geraisPlaca = $("#geraisPlaca").val().trim();
				
				if( geraisPlaca.length == 7 ){
					funcoes.consultaVeiculo();

				}else{					
					$('#geraisVeiculo').val('');
					FLUIGC.toast({ title: '', message: 'A Placa não está preenchida corretamente!', type: 'warning' });
				}
				
			});

			$(document).on("click", "#imprimirRelatorio", function() {
				imprimeRelatorio();
			});

			$(document).on("change", "#addRvDespClassi", function() {
				funcoes.validaClassificacao();
				funcoes.liberaPagamentos();
				funcoes.limpaAbast();
			});
			
			$(document).on("change", "#solSetor", function() {
				funcoes.validaClassificacao();
				funcoes.liberaPagamentos();
				funcoes.dataRelatorio();
			});	

			// $(document).on("change", "#addRvDespValor", function() {
			// 	if($('#addRvDespClassi').val() == 'Combustível'){
			// 		funcoes.calculaValorLitro();
			// 	}
			// });

			$(document).on("input", "#addRvDespValor", function() {
				if($('#addRvDespClassi').val() == 'Combustível'){
					funcoes.calculaValorLitro();
				}
			});

			// $(document).on("change", "#abastQtdLitros", function() {
			// 	funcoes.calculaValorLitro();
			// });	

			$(document).on("input", "#abastQtdLitros", function() {
				funcoes.calculaValorLitro();
			});	
			
			$(document).on("change", "#abastCNPJPosto", function() {

				if($("#abastCNPJPosto").val().trim().length == 0){
					$('#abastNomePosto').val('');
				}else{
					let abastCNPJPosto = $('#abastCNPJPosto').val().replace(/[^0-9]/g, "").trim();
				
					if(abastCNPJPosto.length != 14 ){
						$('#abastNomePosto').val('');
						FLUIGC.toast({ title: '', message: 'O número de CNPJ está inválido!', type: 'warning' });
						return;
					}
	
					funcoes.consultaPostoCombustivel();
				}
			});

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
					funcoes.calculaCombustivelFat();
					funcoes.calculaValorLitro();
				}
			});

			/**
			 * Gatilho para buscar posto de combustivel pelo CNPJ na tabela de despesas 
			 */
			$(document).on("change", ".rvDespCnpj", function() {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				//Consulta posto Filho		
				let abastCNPJPosto = $("#rvDespCnpj___"+index).val().replace(/[^0-9]/g, "").trim();
				
				var loading = FLUIGC.loading(window);
				loading.show();
				
				$.ajax({
					type: "GET",
					dataType: "json",
					async: true,
					url: "/api/public/ecm/dataset/search?datasetId=dsAbastConsultaPosto&filterFields=CNPJPOSTO,"+abastCNPJPosto,
					data: "",
					success: function (data, status, xhr) {
						
						if (data != null && data.content != null && data.content.length > 0) {
							const records = data.content;
							if( records[0].CODRET == "1"){
								let record = records[0];
								let NOMEPOSTO = record.NOMEPOSTO;
								
								$("#rvDespNomePosto___"+index).val(NOMEPOSTO);
								
							}else if (records[0].CODRET == "2"){
								
								//Se retornar como não encontrado, insere o nome do posto manualmente
								FLUIGC.toast({ title: '', message: records[0].MSGRET, type: 'warning' });
								$("#rvDespNomePosto___"+index).val('');
							}
						}else{
							//Se retornar como não encontrado, insere o nome do posto manualmente
							FLUIGC.toast({ title: '', message: 'O Posto de combustível não foi localizado na base de dados.', type: 'warning' });
							$("#rvDespNomePosto___"+index).val('');
						}
						setTimeout(function(){ 
							loading.hide();
						}, 1000);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
						FLUIGC.toast({
							title: '',
							message: 'Erro na consulta do posto de combustível, comunicar o Administrador do Sistema!' ,
							type: 'danger'
						});
						loading.hide();
					}
				});
			});

			/**
			 * Gatilho para quando insere a placa na tabela de relatório de viagens
			 */
			$(document).on("change", ".rvDespPlaca", function() {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				
				const geraisPlaca = $("#rvDespPlaca___"+index).val().trim();
				
				if( geraisPlaca.length == 7 ){
					funcoes.consultaVeiculo(index);
				}else{					
					$('#rvDespVeiculo___'+index).val('');
					FLUIGC.toast({ title: '', message: 'A Placa não está preenchida corretamente!', type: 'warning' });
				}
			});

			/**
			 * Gatilho para quando altera o tipo do combustível
			 */
			$(document).on("change", ".rvDespTpComb", function() {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));

				let rvDespTpCombText = $(`#rvDespTpComb___${index} option:selected`).text()
				$(`#rvDespTpCombText___${index}`).val(rvDespTpCombText);					
			});	

			/**
			 * Gatilho para quando altera a Qtd de Litros, para calcular o valor do litro
			 */
			$(document).on("change", ".rvDespQtdL", function() {
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				var rvDespValor = validafunctions.getFloatValue("rvDespValor___"+index);
				var rvDespQtdL = validafunctions.getFloatValue("rvDespQtdL___"+index);
				let valorLitroFilho = 0;
				
				valorLitroFilho = rvDespValor / rvDespQtdL;
				
				$("#rvDespValorL___"+index).val(valorLitroFilho.toFixed(2));		
				validafunctions.setMoeda("rvDespValorL___"+index, 2, false , '');							
			});	
		}
	}
})();

function loadForm(){	
	
	$(`#salvarEnviar`).val('');
	funcoes.validaClassificacao();
	funcoes.liberaPagamentos();
	funcoes.limpaAddDespesa();

	var psSolDataPesq = FLUIGC.calendar('#addRvDespData', {
		language: 'pt-br',
		pickDate: true,
		pickTime: false,
	});

	if(CURRENT_STATE == INICIO_0){

		var solDataSaidaCal = FLUIGC.calendar('#solDataSaida', {
			language: 'pt-br',
			pickDate: true,
			pickTime: false,
		});

		var solDataRetCal = FLUIGC.calendar('#solDataRet', {
			language: 'pt-br',
			pickDate: true,
			pickTime: false,
		});
		if(isMobile == 'true'){
			$(`#imprimirRelatorio`).next().find('.btnViewerFile').prop('disabled', true);
			$('#imprimirRelatorio').hide();
		}

	}else if(CURRENT_STATE == INICIO){

		if(FORM_MODE == "MOD"){
			if($('#geraisPlaca').val() != ''){
				funcoes.consultaVeiculo()
			}
		}if(isMobile == 'true'){
			$(`#imprimirRelatorio`).next().find('.btnViewerFile').prop('disabled', true);
			$('#imprimirRelatorio').hide();
		}

	}else if(CURRENT_STATE == SALVAR_RELATORIO){
		
		if(FORM_MODE == "MOD"){
			if($('#geraisPlaca').val() != ''){
				funcoes.consultaVeiculo()
			}
			if(isMobile == 'true'){
				$(`#imprimirRelatorio`).next().find('.btnViewerFile').prop('disabled', true);
				$('#imprimirRelatorio').hide();
			}
		}

	}else if(CURRENT_STATE == ANALISA_RELATORIO){
		if(FORM_MODE == "MOD"){

			//Liberar campos abastecimento
			var setAbast = false;
			if($("#solSetor").val() == "tecnico"){
				setAbast = true;
			}  
			$("input[name*=rvDespValor___]").each(function(index){
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				let rvDespClassi = $("#rvDespClassi___"+index).val();
				
				//Liberar data e valor analisa relatorio
				$("#rvDespData___"+index).prop("readonly", false);
				$("#rvDespValor___"+index).prop("readonly", false);

				var psSolDataPesq = FLUIGC.calendar('#rvDespData___'+index, {
					language: 'pt-br',
					pickDate: true,
					pickTime: false,
				});

				$(document).on("change", "#rvDespValor___"+index, function() {
					funcoes.calculaTotal();
					funcoes.calculaSaldo();
					funcoes.calculaCombustivel();
					funcoes.calculaDiaria();
					funcoes.calculaCombustivelFat();
					funcoes.calculaValorLitro();
				});

				//Bloqueia campos de abastecimento
				if(rvDespClassi == "Combustível" &&  setAbast) {
					$("#rvDespCnpj___"+index).prop("readonly", false);
					$("#rvDespNomePosto___"+index).prop("readonly", false);
					$("#rvDespPlaca___"+index).prop("readonly", true);
					$("#rvDespVeiculo___"+index).prop("readonly", true);
					//$("#rvDespTpComb___"+index).prop("readonly", true);
					$("#rvDespKmAbast___"+index).prop("readonly", true);
					$("#rvDespQtdL___"+index).prop("readonly", true);
					//Mascara cnpj
					$("#rvDespCnpj___"+index).mask("00.000.000/0000-00");
				}
			});

			$(document).on("click", "#rvDespValorL", function() {
				if(funcoes.validaAddDespesa()){
					funcoes.addDespesa();
					funcoes.calculaTotal();
					funcoes.calculaSaldo();
					funcoes.calculaCombustivel();
					funcoes.calculaDiaria();
					funcoes.calculaCombustivelFat();
					funcoes.calculaValorLitro();
				}
			});
		}
	}else if(CURRENT_STATE == AJUSTA_RELATORIO){
		if(FORM_MODE == "MOD"){
			if($('#geraisPlaca').val() != ''){
				funcoes.consultaVeiculo()
			}

			$(document).on("click", "#addRvDespesa", function() {
				if(funcoes.validaAddDespesa()){
					funcoes.addDespesa();
					funcoes.calculaTotal();
					funcoes.calculaSaldo();
					funcoes.calculaCombustivel();
					funcoes.calculaDiaria();
					funcoes.calculaCombustivelFat();
					funcoes.calculaValorLitro();
				}
			});
		}
		if(isMobile == 'true'){
			$(`#imprimirRelatorio`).next().find('.btnViewerFile').prop('disabled', true);
			$('#imprimirRelatorio').hide();
		}
	}else if(CURRENT_STATE == REVISA_RELATORIO){
		if(FORM_MODE == "MOD"){
			//Liberar campos abastecimento  
			$("input[name*=rvDespValor___]").each(function(index){
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));

				$("#rvDespTpComb___"+index).attr('readonly', true);
				$("#rvDespTpComb___"+index).prop('style', 'pointer-events:none');

				//Liberar data, valor e tipo de pagamento revisa relatorio
				$("#rvDespData___"+index).prop("readonly", false);
				$("#rvDespValor___"+index).prop("readonly", false);
				$("#rvDespTpPag___"+index).prop("readonly", false);

				// Gatilho das somas
				$(document).on("change", "#rvDespValor___"+index, function() {
					funcoes.calculaTotal();
					funcoes.calculaSaldo();
					funcoes.calculaCombustivel();
					funcoes.calculaDiaria();
					funcoes.calculaCombustivelFat();
					funcoes.calculaValorLitro();
				});
			});
		}
		
		if(isMobile == 'true'){
			$(`#imprimirRelatorio`).next().find('.btnViewerFile').prop('disabled', true);
			$('#imprimirRelatorio').hide();
		}
	}else if(CURRENT_STATE == ANALISA_ERRO_INTEGRACAO_ABASTECIMENTO){
		if(FORM_MODE == "MOD"){
			$('#geraisCPFMotorista').mask("000.000.000-00");
		}
	}
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
				//funcoes.removeAnexo(indice);
				fnWdkRemoveChild(oElement);
				funcoes.calculaTotal();
					funcoes.calculaSaldo();
					funcoes.calculaCombustivel();
					funcoes.calculaDiaria();
					funcoes.calculaCombustivelFat();
					funcoes.calculaValorLitro();
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