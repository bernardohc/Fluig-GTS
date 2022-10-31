$(document).ready(function() {
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
			eventsFuncoes.setup();
		},
				
		/*
		 * Formulário
		 */
		
		addLinhaDespesa: function(){
			var row = wdkAddChild('solTbDespesas');
			//Insere calendario no formulario filho a ao criar nova linha
			FLUIGC.calendar('.data')	    	
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
			validafunctions.setMoeda("ssolTotalDespesas", 2, false , '');
		},
		
		//Calcula saldo
		calculaSaldo : function(){
			console.log('via console');
			
			var solValorAdiantamento = validafunctions.getFloatValue("solValorAdiantamento");
			var solTotalDespesas =Number($("#solTotalDespesas").val());	
			var solSaldoTotal = 0; 

			if (solValorAdiantamento > 0) {
				solSaldoTotal = (solValorAdiantamento -solTotalDespesas);
			}
			
			$("#solSaldo").val(solSaldoTotal.toFixed(2));
			validafunctions.setMoeda("solSaldo", 2, true , '')
		},

		//Calcula saldo			
		calculaDiaria : function(){
			let itSolValorDespesa = 0;
			let total = 0;
			
			$("input[name*=itSolValorDespesa___]").each(function(index){
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				
				var itSolValorDespesa = validafunctions.getFloatValue("itSolValorDespesa___"+index);
				if(itSolTipoDespesaItem() == ""){
					total +=  itSolValorDespesa;
				}
			});
			
			$("#solValorDiaria").val(total.toFixed(2));
			validafunctions.setMoeda("solValorDiaria", 2, false , '');
		},
	}
})();

//Função que habilita o uploado no formulário pai e filho
var indice = 0; // contador para gerar um valor para cada anexo
function showCamera() {
	indice++;
	JSInterface.showCamera("Comprovante_" + indice); 
			// alterei o css para gerar uma confirmação visual após o click
	$("#inputAnexo___" + indice).removeClass().addClass("btn btn-success"); 
}

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	
			
			/*
			 * Adiantamento
			 */
			
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
			});

			$(document).on("change", ".itSolTipoDespesaItem", function() {
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
	


