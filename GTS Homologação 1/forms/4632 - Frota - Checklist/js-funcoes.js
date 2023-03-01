
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
			$(document).on("change", "input:radio[name='geraisDocumentacaoGeralOk']", function() {
				let geraisDocumentacaoGeralOk = $("input:radio[name='geraisDocumentacaoGeralOk']:checked").val();
				if( geraisDocumentacaoGeralOk == 'Não'){
					$('#geraisDocumentacaoGeralOkObs').show();
				}else{
					$('#geraisDocumentacaoGeralOkObs').val('');
					$('#geraisDocumentacaoGeralOkObs').hide();
				}
			});
			
			/**
			 * Gatilho para quando alterado para opção 'Não' mostrar o campo de descrição 'Observação'
			 */
			//Óleo Hidráulico?
			$(document).on("change", "input:radio[name='veiOleoHidraulico']", function() {	
				let veiOleoHidraulico = $("input:radio[name='veiOleoHidraulico']:checked").val();
				if( veiOleoHidraulico == 'Não'){
					$('#veiOleoHidraulicoObs').show();
				}else{
					$('#veiOleoHidraulicoObs').val('');
					$('#veiOleoHidraulicoObs').hide();
				}
			});
			//Água do Radiador ou Líquido de Arrefecimento no nível?
			$(document).on("change", "input:radio[name='veiRadiadorArrefNivel']", function() {
				let veiRadiadorArrefNivel = $("input:radio[name='veiRadiadorArrefNivel']:checked").val();
				if( veiRadiadorArrefNivel == 'Não'){
					$('#veiRadiadorArrefNivelObs').show();
				}else{
					$('#veiRadiadorArrefNivelObs').val('');
					$('#veiRadiadorArrefNivelObs').hide();
				}
			});
			//Vistoria Externa ok?
			$(document).on("change", "input:radio[name='veiVistoriaExterna']", function() {
				let veiVistoriaExterna = $("input:radio[name='veiVistoriaExterna']:checked").val();
				if( veiVistoriaExterna == 'Não'){
					$('#veiVistoriaExternaObs').show();
				}else{
					$('#veiVistoriaExternaObs').val('');
					$('#veiVistoriaExternaObs').hide();
				}
			});
			//Vistoria Interna ok?
			$(document).on("change", "input:radio[name='veiVistoriaInterna']", function() {
				let veiVistoriaInterna = $("input:radio[name='veiVistoriaInterna']:checked").val();
				if( veiVistoriaInterna == 'Não'){
					$('#veiVistoriaInternaObs').show();
				}else{
					$('#veiVistoriaInternaObs').val('');
					$('#veiVistoriaInternaObs').hide();
				}
			});
			//Vistoria Elétrica ok?
			$(document).on("change", "input:radio[name='veiVistoriaEletrica']", function() {
				let veiVistoriaEletrica = $("input:radio[name='veiVistoriaEletrica']:checked").val();
				if( veiVistoriaEletrica == 'Não'){
					$('#veiVistoriaEletricaObs').show();
				}else{
					$('#veiVistoriaEletricaObs').val('');
					$('#veiVistoriaEletricaObs').hide();
				}
			});
			//Freios ok?
			$(document).on("change", "input:radio[name='veiFreios']", function() {
				let veiFreios = $("input:radio[name='veiFreios']:checked").val();
				if( veiFreios == 'Não'){
					$('#veiFreiosObs').show();
				}else{
					$('#veiFreiosObs').val('');
					$('#veiFreiosObs').hide();
				}
			});
			//Direção em bom estado e sem folgas?
			$(document).on("change", "input:radio[name='veiDirecao']", function() {
				let veiDirecao = $("input:radio[name='veiDirecao']:checked").val();
				if( veiDirecao == 'Não'){
					$('#veiDirecaoObs').show();
				}else{
					$('#veiDirecaoObs').val('');
					$('#veiDirecaoObs').hide();
				}
			});
			//Tanques e tampas ok?
			$(document).on("change", "input:radio[name='veiTanquesTampas']", function() {
				let veiTanquesTampas = $("input:radio[name='veiTanquesTampas']:checked").val();
				if( veiTanquesTampas == 'Não'){
					$('#veiTanquesTampasObs').show();
				}else{
					$('#veiTanquesTampasObs').val('');
					$('#veiTanquesTampasObs').hide();
				}
			});
			//Nível de ruído ok? (Barulho anormal)
			$(document).on("change", "input:radio[name='veiNivelRuido']", function() {
				let veiNivelRuido = $("input:radio[name='veiNivelRuido']:checked").val();
				if( veiNivelRuido == 'Não'){
					$('#veiNivelRuidoObs').show();
				}else{
					$('#veiNivelRuidoObs').val('');
					$('#veiNivelRuidoObs').hide();
				}
			});
			//O Veículo possui Manual e Etiqueta Indicando a Próxima Revisão de Troca de Óleo e Filtros?
			$(document).on("change", "input:radio[name='veiEtqRevOleoFiltro']", function() {
				let veiEtqRevOleoFiltro = $("input:radio[name='veiEtqRevOleoFiltro']:checked").val();
				if( veiEtqRevOleoFiltro == 'Não'){
					$('#veiEtqRevOleoFiltroObs').show();
				}else{
					$('#veiEtqRevOleoFiltroObs').val('');
					$('#veiEtqRevOleoFiltroObs').hide();
				}
			});
			
			/*
			 * PNEUS
			 */
			//Pneus ok?
			$(document).on("change", "input:radio[name='pneuPneu']", function() {
				let pneuPneu = $("input:radio[name='pneuPneu']:checked").val();
				if( pneuPneu == 'Não'){
					$('#pneuPneuObs').show();
				}else{
					$('#pneuPneuObs').val('');
					$('#pneuPneuObs').hide();
				}
			});
			/*
			 * SEGURANÇA
			 */
			//Triangulo de Sinalização, Macaco e Chave Geral ok?
			$(document).on("change", "input:radio[name='segTriMacacoChaveGeral']", function() {
				let segTriMacacoChaveGeral = $("input:radio[name='segTriMacacoChaveGeral']:checked").val();
				if( segTriMacacoChaveGeral == 'Não'){
					$('#segTriMacacoChaveGeralObs').show();
				}else{
					$('#segTriMacacoChaveGeralObs').val('');
					$('#segTriMacacoChaveGeralObs').hide();
				}
			});
			//Trava de Segurança, Quinta Roda e Pino está funcionando corretamente?
			$(document).on("change", "input:radio[name='segTravaSeg']", function() {
				let segTravaSeg = $("input:radio[name='segTravaSeg']:checked").val();
				if( segTravaSeg == 'Não'){
					$('#segTravaSegObs').show();
				}else{
					$('#segTravaSegObs').val('');
					$('#segTravaSegObs').hide();
				}
			});
			//Possui Extintor dentro da Validade?
			$(document).on("change", "input:radio[name='segExtintorDentroVal']", function() {
				let segExtintorDentroVal = $("input:radio[name='segExtintorDentroVal']:checked").val();
				if( segExtintorDentroVal == 'Não'){
					$('#segExtintorDentroValObs').show();
				}else{
					$('#segExtintorDentroValObs').val('');
					$('#segExtintorDentroValObs').hide();
				}
			});
			//O Veículo está com a Tampa Traseira Sinalizando Excesso corretamente e legível?
			$(document).on("change", "input:radio[name='segSinalizandoExcesso']", function() {
				let segSinalizandoExcesso = $("input:radio[name='segSinalizandoExcesso']:checked").val();
				if( segSinalizandoExcesso == 'Não'){
					$('#segSinalizandoExcessoObs').show();
				}else{
					$('#segSinalizandoExcessoObs').val('');
					$('#segSinalizandoExcessoObs').hide();
				}
			});
			
			
		
			
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
		
		
	}else if(CURRENT_STATE == FIM){
		
		
	}
	
}

