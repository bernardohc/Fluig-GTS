$(document).ready(function() {
	setTimeout(function() {
		funcoes.start();
	}, 100)	
});

//const dataAtual = getDataAtual();

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
		//Funções aqui

		consultaProduto : function(indexItem){
			
			let numSerie = $("#psoNumSerie").val();
			
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
							$("#codCliente").val(record.cliCodigo);
							$("#lojaCliente").val(record.cliLoja);																												

							$("#psoDescEquip").val(record.equipDescricao);							
							$("#psoCliente").val(record.cliNomeCliente);
							$("#psoCidade").val(record.cliCidade);
							$("#psoEstado").val(record.cliEstado);
							$("#psoTecnico").val(record.revEntTecNome);
							$("#psoTelefone").val(record.protoRecTelefone);							
							
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

		gerarDataHora : function() {
			const dataAtual = new Date();
			const dia = dataAtual.getDate().toString().padStart(2, '0');
			const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Lembre-se que os meses em JavaScript são base 0.
			const ano = dataAtual.getFullYear();
		
			const carimboData = `${dia}/${mes}/${ano} `;
			
			$('#dataAbertura').val(carimboData);			
		},

		limpaCamposItem : function(){
			$('#psoCliente').val('');	
			$('#psoCidade').val('');	
			$('#psoEstado').val('');	
			$('#psoTelefone').val('');	
			$('#psoNumSerie').val('');	
			$('#psoDescEquip').val('');	
			$('#psoTecnico').val('');	
			$('#psoNotaTec').val('');	
			$('#psoFeedBackTec').val('');	
		},

		aplicarMascaraTelefone : function(elementId){

			var input = document.getElementById(elementId);
            var texto = input.value;

            // Remove todos os caracteres que não são dígitos
            texto = texto.replace(/\D/g, "");

            // Aplica a máscara de telefone celular
            if (texto.length > 0) {
                texto = '(' + texto;
            }
            if (texto.length > 3) {
                texto = texto.slice(0, 3) + ') ' + texto.slice(3);
            }
            if (texto.length > 10) {
                texto = texto.slice(0, 10) + '-' + texto.slice(10, 14);
            }
            // Limita o comprimento a 15 caracteres (formato (XX) XXXXX-XXXX)
            if (texto.length > 15) {
                texto = texto.slice(0, 15);
            }
            // Atualiza o valor do campo com o texto formatado
            input.value = texto;
		},
	}
})();

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	

			//Gatilhos

			//data set consulta de produtos
			$(document).on("change", "#psoNumSerie", function() {			
				if( $(this).val().trim() == ""){
					funcoes.limpaCamposItem();
				}else{
					funcoes.consultaProduto();	
					funcoes.gerarDataHora();	
				}
				
			});

			$(document).on("input", "#psoTelefone", function() {
				funcoes.aplicarMascaraTelefone('psoTelefone');
			});
			
		}
	}
})();

function loadForm(){	
	
	// if(CURRENT_STATE == INICIO_0){


	// }else if(CURRENT_STATE == INICIO){

	// 	if(FORM_MODE == "MOD"){
	// 		if($('#campo').val() != ''){
				
	// 		}
	// 	}if(isMobile == 'true'){
			
	// 	}

	// }
};
