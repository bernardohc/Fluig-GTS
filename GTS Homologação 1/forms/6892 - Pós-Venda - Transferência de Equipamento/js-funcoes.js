
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
		 * EQUIPAMENTO
		 */
		limpaCamposEquipamento : function(){
			$('#equipNumSerie').val('');
			$('#equipFilialNotaFiscal').val('');
			$('#equipNumNotaFiscal').val('');
			$('#equipCodProduto').val('');
			$('#equipDescricao').val('');
			
			$('#revEquipCpfCnpj').val('');
			$('#revEquipRazaoSocialRevenda').val('');
			$('#revEquipNomeFantasiaRevenda').val('');
			$('#revEquipCodigo').val('');
			$('#revEquipLoja').val('');
			$('#revEquipCidade').val('');
			$('#revEquipEstadoHidden').val('');
			$('#revEquipEstado').val('');
			$('#revEquipEmail').val('');
			$('#revEquipTelefone').val('');
		},

		/**
		 * Busca dados do Equipamento
		 */
		consultaEquipamento : function(){
			
			let equipNumSerie = $('#equipNumSerie').val().trim();
			
			filterFields = "equipNumSerie,"+ equipNumSerie;
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
	    		type: "GET",
	    		dataType: "json",
	    		async: true,
	    		url: "/api/public/ecm/dataset/search?datasetId=dsTransEqptConsultaEquipamento&filterFields="+filterFields,
	    	    success: function (data, status, xhr) {
	    	    	
	    	    	if (data != null && data.content != null && data.content.length > 0) {
	    	    		const records = data.content;
	    	    		
	    	    		if( records[0].CODRET == "1"){
	    		            var record = records[0];
	    		            let equipFilialNotaFiscal = record.EQPFILIALNOTA;
	    					let equipNumNotaFiscal = record.EQPNOTA;
	    					let equipCodProduto = record.EQPCODPRD;
	    					let equipDescricao = record.EQPDESC;
	    					let equipStatusGTS = record.EQPSTATUSGTS;
	    					
	    					let revEquipCpfCnpj = record.REVCGC;
	    					let revEquipRazaoSocialRevenda = record.RECRAZAOSOCIAL;
	    					let revEquipNomeFantasiaRevenda = record.REVNOMEFANTASIA;
	    					let revEquipCodigo = record.REVCOD;
	    					let revEquipLoja = record.REVLOJA;
	    					let revEquipCidade = record.REVCIDADE;
	    					let revEquipEstado = record.REVESTADO;
	    					let revEquipEmail =  record.REVEMAIL;
	    					let revEquipTelefone =  record.REVTELEFONE;
	    					
	    					if(equipStatusGTS == '03'){
	    						
	    						FLUIGC.toast({ title: '', message: 'Este Equipamento já encontra-se com status de Entrega Real.', type: 'warning' });
	    						
			    				$('#equipCodProduto').val('');
			    				$('#equipDescricao').val('');
	    						
	    					}else{
		    					$("#equipFilialNotaFiscal").val(equipFilialNotaFiscal);
		    					$("#equipNumNotaFiscal").val(equipNumNotaFiscal);
		    					$("#equipCodProduto").val(equipCodProduto);
		    					$("#equipDescricao").val(equipDescricao);
		    					
		    					$("#revEquipCpfCnpj").val(revEquipCpfCnpj);
		    					$("#revEquipRazaoSocialRevenda").val(revEquipRazaoSocialRevenda);
		    					$("#revEquipNomeFantasiaRevenda").val(revEquipNomeFantasiaRevenda);
		    					$("#revEquipCodigo").val(revEquipCodigo);
		    					$("#revEquipLoja").val(revEquipLoja);
		    					$("#revEquipCidade").val(revEquipCidade);
		    					$("#revEquipEstadoHidden").val(revEquipEstado);
		    					$("#revEquipEstado").val(revEquipEstado);
		    					$("#revEquipEmail").val(revEquipEmail);
		    					$("#revEquipTelefone").val(revEquipTelefone);
	    					}
	    				}else if (records[0].CODRET == "2"){
		    	    		FLUIGC.toast({ title: '', message: records[0].MSGRET, type: 'warning' });
		    	    		
		    				$('#equipCodProduto').val('');
		    				$('#equipDescricao').val('');
		    	    	}
	    	    	}else{
	    	    		FLUIGC.toast({ title: '', message: 'Erro ao consultar o equipamento, comunicar o Administrador do Sistema!', type: 'danger' });
	    	    		
	    	    	}
	    	    	setTimeout(function(){ 
	    	    		loading.hide();
	    	    	}, 1000);
	    	    },
				error: function(XMLHttpRequest, textStatus, errorThrown) {
	    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
	    	    	FLUIGC.toast({
			    		title: '',
			    		message: 'Erro na consulta da equipamento, comunicar o Administrador do Sistema!' ,
			    		type: 'danger'
			    	});
	    	    	loading.hide();
				}
			});
			
		},
		
		/*
		 * Utils
		 */
		mascaraCpfCnpj : function(idCampo){
			$('#'+idCampo).unmask();
			if($('#'+idCampo).val().replace(/[^0-9]/g, "").trim().length <= 11){ // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
				$('#'+idCampo).mask("000.000.000-009");
			}else{
				$('#'+idCampo).mask("00.000.000/0000-00");
			}
		},
		
		mascaraTelefone : function(idCampo){
			$('#'+idCampo).unmask();
			//11 dígitos de somente número ddd + numero
			if($('#'+idCampo).val().replace(/[^0-9]/g, "").trim().length == 11){ // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
				$('#'+idCampo).mask('(00) 00000-0009');
			} else {
				$('#'+idCampo).mask('(00) 0000-00009');
			}
		},
		
		mascaraCep : function(idCampo){
			$('#'+idCampo).unmask();
			$('#'+idCampo).mask('99999-999');
		}
	}
})();

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	
			

			/*
			 * Equipamento
			 */
			/**
			 * Sempre em maiusculo o numero de série
			 */
			$(document).on("keyup", "#equipNumSerie", function() {
				$("#equipNumSerie").val( $("#equipNumSerie").val().toUpperCase()   );
			});
			/**
			 * Busca os dados do Equipamento pelo numero de serie
			 */
			$(document).on("change", "#equipNumSerie", function() {
				
				if($("#equipNumSerie").val().trim() == ''){
					funcoes.limpaCamposEquipamento();
					
				}else{
					funcoes.consultaEquipamento();
				}
				
			});
			/**
			 * Quando altera a opção Tipo de Nota, alimenta o campo hidden
			 */
			$(document).on("change", "#equipTipoNota", function() {
				let equipTipoNota = $('#equipTipoNota').val();
				$("#equipTipoNotaHidden").val(equipTipoNota);
				
				if(equipTipoNota == 'NV'){
					//Se for nota de venda, NÃO habilita o campo Num Nota Fiscal
					$('#equipNumNotaFiscal').prop('readonly', true);
				}else if(equipTipoNota == 'ND'){
					//Se for nota de demonstração, habilita o campo Num Nota Fiscal
					$('#equipNumNotaFiscal').prop('readonly', false);
					
				}
				
				$('#equipFilialNotaFiscal').val('');
				$('#equipNumNotaFiscal').val('');
				$('#equipCodProduto').val('');
				$('#equipDescricao').val('');
				$('#equipModelo').val('');
				$('#equipAcoplamento').val('');
				$('#equipDataVenda').val('');
				$('#equipDataEntrega').val('');
				$('#equipDataTerminoGarantia').val('');
				
				funcoes.limpaCamposRevendaEquipamento();

			});
			
			/**
			 * Busca os dados do Equipamento pelo numero de serie e num nota
			 */
//			$(document).on("change", "#equipNumNotaFiscal", function() {
//				
//				if($("#equipNumSerie").val().trim() == ''){
//					funcoes.limpaCamposEquipamento();
//					funcoes.limpaCamposRevendaEquipamento();
//					
//				}else{
//					//conforme o tipoSolicitante ter regra diferente para localizar cliente
//					let tipoSolicitante = $('#tipoSolicitante').val();
//					funcoes.consultaEquipamento(tipoSolicitante);
//				}
//				
//			});	

		
			
		}
	}
})();


function loadForm(){
	
	const today = new Date();
	
	if(CURRENT_STATE == INICIO_0)
	{	
		
	}else if(CURRENT_STATE == INICIO){
		
	}

}