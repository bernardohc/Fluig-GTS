$(document).ready(function() {wdkAddChild
	setTimeout(function() {
		funcoes.start();
	}, 100)	
});
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
		 * Formulário
		 */
		
		addLinhaDespesa: function(){
			const tablename = "solTbDespesas"
			const indice = wdkAddChild(tablename);
			//Insere calendario no formulario filho a ao criar nova linha
			FLUIGC.calendar('.data')	
			//Inicia as mascaras  
			MaskEvent.init();						

			$('[name^="codigoID___"'); //trará todos os campos filhos deste formulário. 

			for(var i = 0; i < $('[name^="codigoID___"').length; i++){

			//Aqui percorrerá todos os itens.

			//Busca o nome do campo pra facilitar a identificação
			var nomeCampo = $('[name^="codigoID___"')[i].name;

			//Busca o separador do indice, após encontrar, como posiciona no início, pulamos 3 posições e buscamos o restante.

			var indiceFilho = nomeCampo.substr(nomeCampo.indexOf("___")+3);
			
			index = parseInt(contador) + parseInt(indiceFilho);

			$(`#codigoID___${indice}`).val(index).prop("readonly", true);
			$(`#indiceFilho${indice}`).val(indiceFilho);
			console.log(indiceFilho + " indice")
			}
			
		},

		//Calcula total de despesas
		calculaTotalDespesas : function(){
			let itSolValorDespesa = 0;
			let total = 0;
			
			$("input[name*=itSolValorDespesa___]").each(function(index){
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				
				var itSolValorDespesa = validafunctions.getFloatValue("itSolValorDespesa___"+index);
				if (!isNaN(itSolValorDespesa) ) {
					total +=  itSolValorDespesa;
				}
			});
			
			$("#solTotalDespesas").val(total.toFixed(2));
			validafunctions.setMoeda("solTotalDespesas", 2, false , '');
		},
		
			//Calcula saldo
			calculaSaldo : function(){

				let itSolValorDespesa = 0;
				let itSolTipoPagamento = "";
				let somaValoresDinheiro = 0;

				$("input[name*=itSolValorDespesa___]").each(function(index){
					var index = validafunctions.getPosicaoFilho($(this).attr("id"));
					
					itSolValorDespesa = validafunctions.getFloatValue("itSolValorDespesa___"+index);
					//Traz valor do itSolTipoPagamento filho 
					itSolTipoPagamento = $("#itSolTipoPagamento___"+index).val();
					
					console.log(itSolTipoPagamento);
					
					//compara itSolTipoPagamento, se for dinheiro soma as depesas em dinheiro
					if (itSolTipoPagamento == "Dinheiro" ) {
						somaValoresDinheiro +=  itSolValorDespesa;
					}
				});

				console.log('via console');
				
				var solValorAdiantamento = validafunctions.getFloatValue("solValorAdiantamento");
				var solTotalDespesas =Number($("#solTotalDespesas").val());	
				var solSaldoTotal = 0;

				if (solValorAdiantamento > 0) {
					solSaldoTotal = (solValorAdiantamento -somaValoresDinheiro);
				}
				
				$("#solSaldo").val(solSaldoTotal.toFixed(2));
				validafunctions.setMoeda("solSaldo", 2, true , '')
			},

		//Calcula Diaria			
		calculaDiaria : function(){
		let itSolValorDespesa = 0;
		let itSolTipoDespesaItem = "";
		let somaValores = 0;

		//Soma tipo de despesa quando acomodação e refeição, traz valor da despesa do filho e index
		$("input[name*=itSolValorDespesa___]").each(function(index){
			var index = validafunctions.getPosicaoFilho($(this).attr("id"));
			
			itSolValorDespesa = validafunctions.getFloatValue("itSolValorDespesa___"+index);
			//Traz valor do somaValores filho 
			itSolTipoDespesaItem = $("#itSolTipoDespesaItem___"+index).val();
			
			console.log(itSolTipoDespesaItem);
			
			//compara itSolTipoDespesaItem
			if (itSolTipoDespesaItem =="Acomodação" || itSolTipoDespesaItem =="Refeição" ) {
				somaValores +=  itSolValorDespesa;
			}
		});

		//Calcula diferença das datas
		var dataInicial = document.getElementById("solDataSaida").value;
		var dataFinal = document.getElementById("solDataRetorno").value;
		var difData = ""; 

		var dataInicialInt = parseInt(dataInicial);
		var dataFinalInt = parseInt(dataFinal);

		difData = dataFinalInt - dataInicialInt ;

		var solNumColaboradores = document.getElementById("solNumColaboradores").value;

		//Calula valor da diaria
		if (solNumColaboradores > 1) {
			if(difData >=2 ){
				var valorDiaria = (somaValores / difData) /solNumColaboradores;
			}
			else{
				var valorDiaria = (somaValores / solNumColaboradores);
			}
		}else if(difData >=2) {
			var valorDiaria = (somaValores / difData)

		}else{
			var valorDiaria = somaValores;
		}
		
		$("#solValorDiaria").val(valorDiaria.toFixed(2));
		validafunctions.setMoeda("solValorDiaria", 2, false , '');
		},
	}
})();

//Função que habilita o upload no formulário pai e filho e seta a a descrição conforme as funções
function showCamera(oElement) {
	
	const indice = validafunctions.getPosicaoFilho($(oElement).closest('tr').find("input")[0].id);
	
	let valorID = "";
	let solEstabelecimento = "";
	let solDocumento = "";
	let nomeAnexo = "";

	valorID = $('#codigoID___'+indice).val();
	
	solEstabelecimento = $('#solEstabelecimento___'+indice).val();

	solDocumento = $('#solDocumento___'+indice).val();
	
	//Validação só anexa se os campos estiverem preenchidos para gerar o nome
	if(valorID == ''){
		FLUIGC.toast({ title: '', message: "É preciso preencher o código Id.", type: 'warning' });
		return;
	}else if(solEstabelecimento == ''){
		FLUIGC.toast({ title: '', message: "É preciso preencher o Estabelecimento.", type: 'warning' });
		return;
	}else if(solDocumento == ''){
		FLUIGC.toast({ title: '', message: "É preciso preencher o Documento.", type: 'warning' });
		return;
	}
	
	nomeAnexo = (valorID+ "_" + solEstabelecimento + "_" + solDocumento);

	JSInterface.showCamera(nomeAnexo); 	
	
	$("#nomeAnexo___"+indice).val(nomeAnexo);
	$("#nomeAnexo___"+indice).prev().prop('disabled', true);
}

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	
			
			/*
			 * Adiantamento
			 */

			$(document).on("click", "#imprimirRelatorio", function() {
	
				imprimeRelatorio();
				
			});
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
			
			$(document).on("change", "#solValorAdiantamento", function() {
				//executa
				funcoes.calculaSaldo();
			});
			
			//Validação para adiconar nova despesa, o itSolTipoDespesaItem não pode estar vazio
			$(document).on("click", "#addDespesa", function() {
				let addNovoItem = true;
				$("input[name*=itSolValorDespesa___]").each(function(index){
					var index = validafunctions.getPosicaoFilho($(this).attr("id"));
					var itSolTipoDespesaItem = $("#itSolTipoDespesaItem___"+index).val();
					
					if(itSolTipoDespesaItem.trim() == ""){
						addNovoItem = false;
					}
				});
					if(!addNovoItem){
						FLUIGC.toast({ title: '', message: "É preciso preencher o Classificação anterior para adicionar um novo item.", type: 'warning' });
					}else{
						funcoes.addLinhaDespesa();
					}
			});
			
			//Ao alterar itSolValorDespesa chama as funções
			$(document).on("change", ".itSolValorDespesa", function() {
				funcoes.calculaTotalDespesas();
				funcoes.calculaSaldo();
				funcoes.calculaDiaria();
			});

			$(document).on("change", ".solNumColaboradores", function() {
				funcoes.calculaDiaria();
			});

			$(document).on("change", ".solDataSaida", function() {
				funcoes.calculaDiaria();
			});

			$(document).on("change", ".solDataRetorno", function() {
				funcoes.calculaDiaria();
			});

			$(document).on("change", ".itSolTipoDespesaItem", function() {
				funcoes.calculaDiaria();
			});

			$(document).on("change", ".itSolCentroCusto", function() {
				funcoes.calculaDiaria();
			});

		}
	}
})();

//Remover despessas do pai e filho
function removeDespesa(oElement){
	fnWdkRemoveChild(oElement);
	
};

function loadForm(){
	
	window.parent.$("#breadcrumb").remove();
	//Aba Anexo
	window.parent.$("#processTabs").find("li").first().hide();
	//window.parent.$("#processTabs").find("li").last().hide();
	//window.parent.$("#textActivity").remove();
	//Botões
	window.parent.$('#wcm_widget').find("[data-back]").css("display","none");
	window.parent.$('#wcm_widget').find("[data-back]").removeAttr("data-back");
	window.parent.$('#wcm_widget').find("[data-cancel]").css("display","none");
	window.parent.$('#wcm_widget').find("[data-cancel]").removeAttr("data-cancel");
	window.parent.$('#wcm_widget').find("[data-transfer]").css("display","none");
	window.parent.$('#wcm_widget').find("[data-transfer]").removeAttr("data-transfer");

	document.getElementById('salvarEnviar').value = "";
	
	var today = new Date();	
	
	if(CURRENT_STATE == INICIO_0)
	{	
		FLUIGC.calendar('#solDataRelatorio',{
			  language: 'pt-br',
			  maxDate: today,
			  pickDate: true,
			  pickTime: false,
			  defaultDate: today

		});

		FLUIGC.calendar('#solDataSaida',{
			language: 'pt-br',
			pickDate: true,
			pickTime: false,
		});

		FLUIGC.calendar('#solHoraSaida',{
			language: 'pt-br',
			pickDate: false,
			pickTime: true,
		});
		
		FLUIGC.calendar('#solDataRetorno',{
			language: 'pt-br',
			pickDate: true,
			pickTime: false,
		});
		
		FLUIGC.calendar('#solHoraRetorno',{
			language: 'pt-br',
			pickDate: false,
			pickTime: true,
		});

		funcoes.addLinhaDespesa()
		
	}else if(CURRENT_STATE == INICIO){;
				
		FLUIGC.calendar('#solDataRelatorio',{
			language: 'pt-br',
			maxDate: today,
			pickDate: true,
			pickTime: false,
			defaultDate: today
	 	 });

	 	FLUIGC.calendar('#solDataSaida',{
		  language: 'pt-br',
		  pickDate: true,
		  pickTime: false,
	 	});

	  	FLUIGC.calendar('#solHoraSaida',{
		  language: 'pt-br',
		  pickDate: false,
		  pickTime: true,
	  	});
	  
	  	FLUIGC.calendar('#solDataRetorno',{
		  language: 'pt-br',
		  pickDate: true,
		  pickTime: false,
	 	});
	  
	 	FLUIGC.calendar('#solHoraRetorno',{
		  language: 'pt-br',
		  pickDate: false,
		  pickTime: true,
		});
	
	}else if(CURRENT_STATE == ANALISA_RELATORIO){
		
		FLUIGC.calendar('#solDataRelatorio',{
			language: 'pt-br',
			maxDate: today,
			pickDate: true,
			pickTime: false,
			defaultDate: today
	  	});

	  	FLUIGC.calendar('#solDataSaida',{
		  language: 'pt-br',
		  pickDate: true,
		  pickTime: false,
	  	});

	  	FLUIGC.calendar('#solHoraSaida',{
		  language: 'pt-br',
		  pickDate: false,
		  pickTime: true,
	  	});
	  
	  	FLUIGC.calendar('#solDataRetorno',{
		  language: 'pt-br',
		  pickDate: true,
		  pickTime: false,
	 	});
	  
	  	FLUIGC.calendar('#solHoraRetorno',{
		  language: 'pt-br',
		  pickDate: false,
		  pickTime: true,
	  	});
		
	}else if(CURRENT_STATE == AJUSTA_RELATORIO){
		FLUIGC.calendar('#solDataRelatorio',{
			language: 'pt-br',
			maxDate: today,
			pickDate: true,
			pickTime: false,
			defaultDate: today
	  	});

	  	FLUIGC.calendar('#solDataSaida',{
		  language: 'pt-br',
		  pickDate: true,
		  pickTime: false,
	  	});

	  	FLUIGC.calendar('#solHoraSaida',{
		  language: 'pt-br',
		  pickDate: false,
		  pickTime: true,
	  	});
	  
	  	FLUIGC.calendar('#solDataRetorno',{
		  language: 'pt-br',
		  pickDate: true,
		  pickTime: false,
	  	});
	  
	  	FLUIGC.calendar('#solHoraRetorno',{
		  language: 'pt-br',
		  pickDate: false,
		  pickTime: true,
	  	});
	}

}
	


