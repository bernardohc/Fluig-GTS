
$(document).ready(function() {
	setTimeout(function() {
		funcoes.start();
	}, 100)
});

var funcoes = (function() {
	var loading = FLUIGC.loading(window);
	var index = 0;
	return {
		start : function() {
			eventsFuncoes.setup();
		},
		/*
		 * Cabeçalho
		 */
		descStatusAtendimento : function(statusAtendimento){
			var retorno = "";
			
			switch (statusAtendimento) {
				case 'Abertura' :
					retorno = 'Abertura';
					break;
				case 'AguardandoAnalise' :
					retorno = 'Aguardando Análise';
					break;
				case 'EmAnalise' :
					retorno = 'Em Análise';
					break;
				case 'Finalizado' :
					retorno = 'Finalizado';
					break;
			}
			 
			return retorno;
		},
		
		/*
		 * Revenda
		 */
		revendaObg : function(tipoSolicitacao){
			if(tipoSolicitacao == "Outros"){
				$(".revenda-obg").hide();
			}else{
				$(".revenda-obg").show();
			}
		},
		
		/*
		 * Atendimento
		 */
		addLinhaAtendimento : function(){
	    	row = wdkAddChild('tbAtendimento');
	    	
//	    	var descStatusAtendimento = funcoes.descStatusAtendimento($('#statusAtendimento').val());
	    	var descStatusAtendimento = $('#statusAtendimentoDesc').val();
	    	var wkUser = getWKUser();
	    	var nomeAtendimento = getNome(wkUser);
	    	
	    	$("#atendId___" + row ).val(row)
	    	$("#atendUsuario___" + row ).val(nomeAtendimento)
	    	$("#atendStatus___" + row ).val(descStatusAtendimento);

		},
		
		
	}
})();


var eventsFuncoes = (function() {
	return {
		setup : function() {	
			
			/*
			 * Cabeçalho
			 */
			$(document).on("click", "#btnIniciarSAC", function() {
				window.parent.$('button[data-send]').first().click();
			});
			
			
			$(document).on("change", "#statusAtendimento", function() {

				var statusAtendimento = $('#statusAtendimento').val();
				switch (statusAtendimento) {
					case 'Abertura' :
						$('#statusAtendimentoDesc').val('Abertura');
						break;
					case 'AguardandoAnalise' :
						$('#statusAtendimentoDesc').val('Aguardando Análise');
						break;
					case 'EmAnalise' :
						$('#statusAtendimentoDesc').val('Em Análise');
						break;
					case 'Finalizado' :
						$('#statusAtendimentoDesc').val('Finalizado');
						break;
				}
				
				var descStatusAtendimento = $('#statusAtendimentoDesc').val();
				
				$("input[name*=atendId___]").each(function(index){
					var index = validafunctions.getPosicaoFilho($(this).attr("id"));

					var atendId = $('#atendId___' + index).val();
					var atendData = $('#atendData___' + index).val();
					
					if(atendId != "" &&  atendData == ""){
						$('#atendStatus___' + index).val(descStatusAtendimento);
					}
				});
				
				if(statusAtendimento == 'Finalizado'){
					$('#divStatusFinalizadoCiente').show();
				}else{
					$('#divStatusFinalizadoCiente').hide();
					$('#chkStatusFinalizadoCiente').prop('chechek', false);
				}
				
			});
			
			/*
			 * Requisitante
			 */
			$(document).on("change", "#tipoPessoaRequisitante", function() {
				if($('#tipoPessoaRequisitante').val() == 'PF'){
					validafunctions.setCpf("cpfCnpjRequisitante");	
				}else if($('#tipoPessoaRequisitante').val() == 'PJ'){
					validafunctions.setCnpj("cpfCnpjRequisitante");	
				}
			});
			
			$(document).on("keyup", "#telRequisitante", function() {	
				if($(this).val().length == 15){ // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
					$('#telRequisitante').mask('(00) 00000-0009');
				} else {
					$('#telRequisitante').mask('(00) 0000-00009');
				}
			});
			
			$(document).on("blur", "#telRequisitante", function() {	
				if($(this).val().length == 15){ // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
					$('#telRequisitante').mask('(00) 00000-0009');
				} else {
					$('#telRequisitante').mask('(00) 0000-00009');
				}
			});
			
			$(document).on("change", "#estadoRequisitante", function() {
				window["cidadeRequisitante"].clear();
				var UF = $('#estadoRequisitante').val();
		        reloadZoomFilterValues("cidadeRequisitante", "UF,"+UF);
		        $('#codCidadeRequisitante').val('');
			});
			
			/*
			 * Revenda
			 */
			$(document).on("change", "#estadoRevenda", function() {
				window["cidadeRevenda"].clear();
				var UF = $('#estadoRevenda').val();
		        reloadZoomFilterValues("cidadeRevenda", "UF,"+UF);
		        $('#codCidadeRevenda').val('');
		        
		        
		        window["revenda"].clear();
				$('#A1CODRevenda').val('');
				$('#A1LOJARevenda').val('');
				$('#A1CODLOJARevenda').val('');
				$('#tipoPessoaRevenda').val('');
				$('#cpfCnpjRevenda').val('');
				reloadZoomFilterValues("revenda");
		        
			});
			
			$(document).on("change", "#tipoPessoaRevenda", function() {
				
//				if($('#tipoPessoaRevenda').val() == 'PF'){
//					validafunctions.setCpf("cpfCnpjRevenda");	
//				}else if($('#tipoPessoaRevenda').val() == 'PJ'){
//					validafunctions.setCnpj("cpfCnpjRevenda");	
//				}
			});
			
			/*
			 * Solicitação
			 */
			$(document).on("change", "#tipoSolicitacao", function() {
				var tipoSolicitacao = $('#tipoSolicitacao').val();
				
				switch (tipoSolicitacao) {
					case 'Duvida' :
						$('#tipoSolicitacaoDesc').val('Dúvida');
						break;
					case 'Elogio' :
						$('#tipoSolicitacaoDesc').val('Elogio');
						break;
					case 'Reclamacao' :
						$('#tipoSolicitacaoDesc').val('Reclamação');
						break;
					case 'Sugestao' :
						$('#tipoSolicitacaoDesc').val('Sugestão');
						break;
					case 'Outros' :
						$('#tipoSolicitacaoDesc').val('Outros');
						break;	
				}
				funcoes.revendaObg(tipoSolicitacao);
				
				
			});
			

		}
	}
})();


function removeItem(oElement){
	fnWdkRemoveChild(oElement);
}


function loadForm(){
	
	// Ocultar Aba de anexos do workflow
	window.parent.$("#processTabs").find("li").first().hide();
	window.parent.$("#processTabs").find("li").last().hide();
	
	
	window.parent.$("#textActivity").remove();
	window.parent.$("#breadcrumb").remove();
	
	
	
	if(CURRENT_STATE == INICIO_0)
	{	
		window.parent.$("#collapse-tabs").remove();
		window.parent.$("#page-header").remove();
		
		$('body').addClass('class-body-inicio');
		
	}else if(CURRENT_STATE == INICIO){
		
	
	}else if(CURRENT_STATE == CADASTRA_SAC){
		
		$('body').addClass('class-body');
		$('#telRequisitante').mask('(00) 0000-00009');
		
	}else if(CURRENT_STATE == ATENDIMENTO_SETOR){
		
		var tipoSolicitacao = $('#tipoSolicitacao').val();
		funcoes.revendaObg(tipoSolicitacao);
		
		if( FORM_MODE != 'VIEW'){
		
			//ADICIONA LINHA PARA ATENDIMENTO
			var addLinhaAtendimento = true;
			$("input[name*=atendId___]").each(function(index){
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
	
				var atendId = $('#atendId___' + index).val();
				var atendData = $('#atendData___' + index).val();
				
				if(atendId != "" && atendData == ""){
					addLinhaAtendimento = false;
				}
			});
			
			if(addLinhaAtendimento){
				funcoes.addLinhaAtendimento();
			}
			
			//CAMPO DE ATENDIMENTO COMO READONLY
			$("input[name*=atendId___]").each(function(index){
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
	
				var atendId = $('#atendId___' + index).val();
				var atendData = $('#atendData___' + index).val();
				
				if(atendId != "" &&  atendData != ""){
					$('#atendComInterna___' + index).prop('readonly',true);
					$('#atendComExterna___' + index).prop('readonly',true);
				}
			});
		}
		
	}else if(CURRENT_STATE == FIM){
	
		var tipoSolicitacao = $('#tipoSolicitacao').val();
		funcoes.revendaObg(tipoSolicitacao);
		
	}
}