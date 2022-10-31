
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
			 * Sempre em maiusculo o numero de série
			 */
			$(document).on("keyup", "#geraisCategoriaCNH", function() {
				$("#geraisCategoriaCNH").val( $("#geraisCategoriaCNH").val().toUpperCase()   );
			});
			
			/**
			 * Gatilho para quando alterado para opção 'Outro' mostrar o campo de descrição 'Outro'
			 */
			//Pneus Dianteira Cavalo em Bom Estado?
			$(document).on("change", "#pneuPneuDiantCavBomEstado", function() {
				if($('#pneuPneuDiantCavBomEstado').val() == 'Outro'){
					$('#pneuPneuDiantCavBomEstadoOut').show();
				}else{
					$('#pneuPneuDiantCavBomEstadoOut').val('');
					$('#pneuPneuDiantCavBomEstadoOut').hide();
				}
			});
			//Pneus Tração Cavalo em Bom Estado?
			$(document).on("change", "#pneuPneuTracaoCavBomEstado", function() {
				if($('#pneuPneuTracaoCavBomEstado').val() == 'Outro'){
					$('#pneuPneuTracaoCavBomEstadoOut').show();
				}else{
					$('#pneuPneuTracaoCavBomEstadoOut').val('');
					$('#pneuPneuTracaoCavBomEstadoOut').hide();
				}
			});
			//Pneus Truck Cavalo em Bom Estado?
			$(document).on("change", "#pneuPneuTruckCavBomEstado", function() {
				if($('#pneuPneuTruckCavBomEstado').val() == 'Outro'){
					$('#pneuPneuTruckCavBomEstadoOut').show();
				}else{
					$('#pneuPneuTruckCavBomEstadoOut').val('');
					$('#pneuPneuTruckCavBomEstadoOut').hide();
				}
			});
			//Pneus Semi Reboque - 1º Eixo?
			$(document).on("change", "#pneuPneuSemiReb1Eixo", function() {
				if($('#pneuPneuSemiReb1Eixo').val() == 'Outro'){
					$('#pneuPneuSemiReb1EixoOut').show();
				}else{
					$('#pneuPneuSemiReb1EixoOut').val('');
					$('#pneuPneuSemiReb1EixoOut').hide();
				}
			});
			//Pneus Semi Reboque - 2º Eixo?
			$(document).on("change", "#pneuPneuSemiReb2Eixo", function() {
				if($('#pneuPneuSemiReb2Eixo').val() == 'Outro'){
					$('#pneuPneuSemiReb2EixoOut').show();
				}else{
					$('#pneuPneuSemiReb2EixoOut').val('');
					$('#pneuPneuSemiReb2EixoOut').hide();
				}
			});
			//Pneus Semi Reboque - 3º Eixo?
			$(document).on("change", "#pneuPneuSemiReb3Eixo", function() {
				if($('#pneuPneuSemiReb3Eixo').val() == 'Outro'){
					$('#pneuPneuSemiReb3EixoOut').show();
				}else{
					$('#pneuPneuSemiReb3EixoOut').val('');
					$('#pneuPneuSemiReb3EixoOut').hide();
				}
			});
			//Pneus Sterp em Bom Estado?
			$(document).on("change", "#pneuPneuSterpBomEstado", function() {
				if($('#pneuPneuSterpBomEstado').val() == 'Outro'){
					$('#pneuPneuSterpBomEstadoOut').show();
				}else{
					$('#pneuPneuSterpBomEstadoOut').val('');
					$('#pneuPneuSterpBomEstadoOut').hide();
				}
			});
			//Rodas do Cavalo e Semi Reboque em Bom Estado?
			$(document).on("change", "#pneuRodaCavSemiRebBomEstado", function() {
				if($('#pneuRodaCavSemiRebBomEstado').val() == 'Outro'){
					$('#pneuRodaCavSemiRebBomEstadoOut').show();
				}else{
					$('#pneuRodaCavSemiRebBomEstadoOut').val('');
					$('#pneuRodaCavSemiRebBomEstadoOut').hide();
				}
			});
			
		}
	}
})();


function loadForm(){
	
	// Ocultar Aba de anexos do workflow
	window.parent.$("#processTabs").find("li").hide();
	window.parent.$("#breadcrumb").remove();
	window.parent.$("#textActivity").remove();
	
	window.parent.$('#wcm_widget').find("[data-back]").css("display","none");
	window.parent.$('#wcm_widget').find("[data-back]").removeAttr("data-back");
	window.parent.$('#wcm_widget').find("[data-cancel]").css("display","none");
	window.parent.$('#wcm_widget').find("[data-cancel]").removeAttr("data-cancel");
	window.parent.$('#wcm_widget').find("[data-transfer]").css("display","none");
	window.parent.$('#wcm_widget').find("[data-transfer]").removeAttr("data-transfer");
	
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
			  
			  
//			  pickDate: true, 
//			    pickTime: false, 
//			    useMinutes: true, 
//			    useSeconds: true, 
//			    useCurrent: true,
//			    minuteStepping: 1,
//			    minDate: '1/1/2014',
//			    maxDate: '1/1/2015',
//			    showToday: true,
//			    language: 'pt-br',
//			    defaultDate: "",
//			    disabledDates: [],
//			    enabledDates: [],
//			    useStrict: false,
//			    sideBySide: false,
//			    daysOfWeekDisabled: []
		});
	}else if(CURRENT_STATE == INICIO){
		
		if(FORM_MODE == 'VIEW'){
			window.parent.$("#processTabs").find("li").show();
			window.parent.$("#processTabs").find("li").first().hide();
			window.parent.$("#processTabs").find("li").last().hide();
		}
		
	}else if(CURRENT_STATE == FIM){
		
		window.parent.$("#processTabs").find("li").show();
		window.parent.$("#processTabs").find("li").first().hide();
		window.parent.$("#processTabs").find("li").last().hide();
		
	}
	
}

