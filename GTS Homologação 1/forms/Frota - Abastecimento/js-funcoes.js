
$(document).ready(function() {
	setTimeout(function() {
		funcoes.start();
	}, 100)
	
	
});
//Aqui cria as funcioes
var funcoes = (function() {
	return {
		start : function() {
			eventsFuncoes.setup();
		},
		
		/*
		 * ABASTECIMENTO
		 */
		consultaPostoCombustivel : function() {
			
			let abastCNPJPosto = $('#abastCNPJPosto').val().replace(/[^0-9]/g, "").trim();
			
			if(abastCNPJPosto.length != 14 ){
				$('#abastNomePosto').val('');
				FLUIGC.toast({ title: '', message: 'O número de CNPJ está inválido!', type: 'warning' });
				return;
			}
			
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
	    					
	    					$('#abastNomePosto').prop('readonly', true);
	    					$("#abastNomePosto").val(NOMEPOSTO);
	    					
    			    		
	    	    		}else if (records[0].CODRET == "2"){
	    	    			
	    	    			//Se retornar como não encontrado, insere o nome do posto manualmente
		    	    		FLUIGC.toast({ title: '', message: records[0].MSGRET, type: 'warning' });
		    	    		$('#abastNomePosto').prop('readonly', false);
			    	    		
		    	    	}
	    	    		
	    	    		
	    	    	}else{
    	    			//Se retornar como não encontrado, insere o nome do posto manualmente
	    	    		FLUIGC.toast({ title: '', message: 'O Posto de combustível não foi localizado na base de dados.', type: 'warning' });
	    	    		$('#abastNomePosto').prop('readonly', false);
	    	    		
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
		
		valorTotalAbastecimento : function(){
			
			let abastQtdLitros = validafunctions.getFloatValue("abastQtdLitros");
			let abastValorLitro = validafunctions.getFloatValue("abastValorLitro");
			let abastValorTotal = 0;
			
			
			if (!isNaN(abastQtdLitros) && !isNaN(abastValorLitro) ) {
				abastValorTotal =  abastQtdLitros * abastValorLitro;
			}

			$("#abastValorTotal").val(abastValorTotal.toFixed(2));
			validafunctions.setMoeda("abastValorTotal", 2, false , '');
		}
	}
})();

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	
			
			
			/*
			 * DADOS GERAIS
			 */
			/**
			 * Sempre em maiusculo a placa
			 */
			$(document).on("keyup", "#geraisPlaca", function() {
				$("#geraisPlaca").val( $("#geraisPlaca").val().toUpperCase()   );
			});
			
			/*
			 * ABASTECIMENTO
			 */
			/**
			 * Gatilho de CNPJ do Posto
			 * 
			 */
			$(document).on("change", "#abastCNPJPosto", function() {
				if($("#abastCNPJPosto").val().trim().length == 0){
					
					$('#abastNomePosto').val('');
					$('#abastNomePosto').prop('readonly', true);
					
				}else if( $("#abastCNPJPosto").val().trim().length == 18 ){
					
					funcoes.consultaPostoCombustivel();
					
				}else{
					
					$('#abastNomePosto').val('');
					FLUIGC.toast({ title: '', message: 'O CNPJ não está preenchido corretamente!', type: 'warning' });
				}
				
			});
			
			/**
			 * Sempre em maiusculo o nome do posto
			 */
			$(document).on("keyup", "#abastNomePosto", function() {
				$("#abastNomePosto").val( $("#abastNomePosto").val().toUpperCase()   );
			});
			
			
			/**
			 * Gatilho para quando altera a Qtd de Litros, calcula o valor total
			 */
			$(document).on("change", "#abastQtdLitros", function() {
				funcoes.valorTotalAbastecimento();
			});
			if(isMobile == 'true'){
				$(document).on("blur", "#abastQtdLitros", function() {
					funcoes.valorTotalAbastecimento();
				});
			}
			
			/**
			 * Gatilho para quando altera o Valor do Litro, calcula o valor total
			 */
			$(document).on("change", "#abastValorLitro", function() {
				funcoes.valorTotalAbastecimento();
			});
			if(isMobile == 'true'){
				$(document).on("blur", "#abastValorLitro", function() {
					funcoes.valorTotalAbastecimento();
				});
			}
		}
	}
})();


function loadForm(){
	
	// Ocultar Aba de anexos do workflow
	window.parent.$("#breadcrumb").remove();
	window.parent.$("#textActivity").remove();
	
	window.parent.$('#wcm_widget').find("[data-back]").css("display","none");
	window.parent.$('#wcm_widget').find("[data-back]").removeAttr("data-back");
	window.parent.$('#wcm_widget').find("[data-cancel]").css("display","none");
	window.parent.$('#wcm_widget').find("[data-cancel]").removeAttr("data-cancel");
	window.parent.$('#wcm_widget').find("[data-transfer]").css("display","none");
	window.parent.$('#wcm_widget').find("[data-transfer]").removeAttr("data-transfer");
	
	//Mascaras
	$('#geraisCPFMotorista').mask("000.000.000-00");
	$('#abastCNPJPosto').mask("00.000.000/0000-00");
	
	const today = new Date();
	
	if(CURRENT_STATE == INICIO_0)
	{	
		/*
		 * Dados Gerais
		 */
		FLUIGC.calendar('#geraisCarimboDataHora',{
			  language: 'pt-br',
			  maxDate: today,
			  pickDate: true,
			  pickTime: true,
			  showToday: true
		});
	}else if(CURRENT_STATE == INICIO){
		
		/*
		 * Dados Gerais
		 */
		FLUIGC.calendar('#geraisCarimboDataHora',{
			  language: 'pt-br',
			  maxDate: today,
			  pickDate: true,
			  pickTime: true,
			  showToday: true
		});
	}else if(CURRENT_STATE == ANALISA_ERRO_INTEGRACAO_ABASTECIMENTO){
		
		/*
		 * Dados Gerais
		 */
		FLUIGC.calendar('#geraisCarimboDataHora',{
			  language: 'pt-br',
			  maxDate: today,
			  pickDate: true,
			  pickTime: true,
			  showToday: true
		});
	}
	
}

