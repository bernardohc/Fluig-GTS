var beforeSendValidate = function(numState,nextState){
	removeClassError();
	validaCampos(parseInt(numState), nextState);
}

/*****************************************************************************************************************/
function validaCampos(numState, nextState){
	let message = "";
	let hasErros = false;
	
	if(isEmpty('geraisCarimboDataHora')){
		message += getMessage("Carimbo de Data/Hora", 1);
		hasErros = true;
		$('#geraisCarimboDataHora').closest(".form-group").addClass("has-error");
	}
	if(isEmpty('geraisNumFrota')){
		message += getMessage("Nº Frota", 1);
		hasErros = true;
		$('#geraisNumFrota').closest(".form-group").addClass("has-error");
	}
	if(isEmpty('geraisCondutor')){
		message += getMessage("Condutor", 1);
		hasErros = true;
		$('#geraisCondutor').closest(".form-group").addClass("has-error");
	}
	if(isEmpty('geraisDocumentacaoGeralOk', "radio")){
		message += getMessage("Documentação em Geral ok?", 1);
		hasErros = true;
		$("input:radio[name='geraisDocumentacaoGeralOk']").closest(".form-group").addClass("has-error-custom");
	}else if( $("input:radio[name='geraisDocumentacaoGeralOk']:checked").val() == 'Não' && isEmpty("geraisDocumentacaoGeralOkObs")  ){
		message += getMessage("Documentação em Geral ok?", 9);
		hasErros = true;
		$('#geraisDocumentacaoGeralOkObs').closest(".form-group").addClass("has-error");
	}
	
	
	
	if(nextState > 0){
		/*
		 * VEÍCULO
		 */
		if (isEmpty("veiKmAtual")) {
			message += getMessage("Km Atual", 1);
			hasErros = true;
			$('#veiKmAtual').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("veiOleoHidraulico", "radio")) {
			message += getMessage("Óleo Hidráulico ok?", 1);
			hasErros = true;
			$("input:radio[name='veiOleoHidraulico']").closest(".form-group").addClass("has-error-custom");
		}else if( $("input:radio[name='veiOleoHidraulico']:checked").val() == 'Não' && isEmpty("veiOleoHidraulicoObs")  ){
			message += getMessage("Óleo Hidráulico ok?", 9);
			hasErros = true;
			$('#veiOleoHidraulicoObs').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("veiRadiadorArrefNivel", "radio")) {
			message += getMessage("Água do Radiador ou Líquido de Arrefecimento no nível?", 1);
			hasErros = true;
			$("input:radio[name='veiRadiadorArrefNivel']").closest(".form-group").addClass("has-error-custom");
		}else if( $("input:radio[name='veiRadiadorArrefNivel']:checked").val() == 'Não' && isEmpty("veiRadiadorArrefNivelObs")  ){
			message += getMessage("Água do Radiador ou Líquido de Arrefecimento no nível?", 9);
			hasErros = true;
			$('#veiRadiadorArrefNivelObs').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("veiVistoriaExterna", "radio")) {
			message += getMessage("Vistoria Externa ok?", 1);
			hasErros = true;
			$("input:radio[name='veiVistoriaExterna']").closest(".form-group").addClass("has-error-custom");
		}else if( $("input:radio[name='veiVistoriaExterna']:checked").val() == 'Não' && isEmpty("veiVistoriaExternaObs")  ){
			message += getMessage("Vistoria Externa ok?", 9);
			hasErros = true;
			$('#veiVistoriaExternaObs').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("veiVistoriaInterna", "radio")) {
			message += getMessage("Vistoria Interna ok?", 1);
			hasErros = true;
			$("input:radio[name='veiVistoriaInterna']").closest(".form-group").addClass("has-error-custom");
		}else if( $("input:radio[name='veiVistoriaInterna']:checked").val() == 'Não' && isEmpty("veiVistoriaInternaObs")  ){
			message += getMessage("Vistoria Interna ok?", 9);
			hasErros = true;
			$('#veiVistoriaInternaObs').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("veiVistoriaEletrica", "radio")) {
			message += getMessage("Vistoria Elétrica ok?", 1);
			hasErros = true;
			$("input:radio[name='veiVistoriaEletrica']").closest(".form-group").addClass("has-error-custom");
		}else if( $("input:radio[name='veiVistoriaEletrica']:checked").val() == 'Não' && isEmpty("veiVistoriaEletricaObs")  ){
			message += getMessage("Vistoria Elétrica ok?", 9);
			hasErros = true;
			$('#veiVistoriaEletricaObs').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("veiFreios", "radio")) {
			message += getMessage("Freios ok?", 1);
			hasErros = true;
			$("input:radio[name='veiFreios']").closest(".form-group").addClass("has-error-custom");
		}else if( $("input:radio[name='veiFreios']:checked").val() == 'Não' && isEmpty("veiFreiosObs")  ){
			message += getMessage("Freios ok?", 9);
			hasErros = true;
			$('#veiFreiosObs').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("veiDirecao", "radio")) {
			message += getMessage("Direção em bom estado e sem folgas?", 1);
			hasErros = true;
			$("input:radio[name='veiDirecao']").closest(".form-group").addClass("has-error-custom");
		}else if( $("input:radio[name='veiDirecao']:checked").val() == 'Não' && isEmpty("veiDirecaoObs")  ){
			message += getMessage("Direção em bom estado e sem folgas?", 9);
			hasErros = true;
			$('#veiDirecaoObs').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("veiTanquesTampas", "radio")) {
			message += getMessage("Tanques e tampas ok?", 1);
			hasErros = true;
			$("input:radio[name='veiTanquesTampas']").closest(".form-group").addClass("has-error-custom");
		}else if( $("input:radio[name='veiTanquesTampas']:checked").val() == 'Não' && isEmpty("veiTanquesTampasObs")  ){
			message += getMessage("Tanques e tampas ok?", 9);
			hasErros = true;
			$('#veiTanquesTampasObs').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("veiNivelRuido", "radio")) {
			message += getMessage("Nível de Ruído ok?", 1);
			hasErros = true;
			$("input:radio[name='veiNivelRuido']").closest(".form-group").addClass("has-error-custom");
		}else if( $("input:radio[name='veiNivelRuido']:checked").val() == 'Não' && isEmpty("veiNivelRuidoObs")  ){
			message += getMessage("Nível de Ruído ok?", 9);
			hasErros = true;
			$('#veiNivelRuidoObs').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("veiEtqRevOleoFiltro", "radio")) {
			message += getMessage("O Veículo possui Manual e Etiqueta Indicando a Próxima Revisão de Troca de Óleo e Filtros?", 1);
			hasErros = true;
			$("input:radio[name='veiEtqRevOleoFiltro']").closest(".form-group").addClass("has-error-custom");
		}else if( $("input:radio[name='veiEtqRevOleoFiltro']:checked").val() == 'Não' && isEmpty("veiEtqRevOleoFiltroObs")  ){
			message += getMessage("O Veículo possui Manual e Etiqueta Indicando a Próxima Revisão de Troca de Óleo e Filtros?", 9);
			hasErros = true;
			$('#veiEtqRevOleoFiltroObs').closest(".form-group").addClass("has-error");
		}
		/*
		 * PNEUS
		 */
		if (isEmpty("pneuPneu", "radio")) {
			message += getMessage("Pneus ok?", 1);
			hasErros = true;
			$("input:radio[name='pneuPneu']").closest(".form-group").addClass("has-error-custom");
		}else if( $("input:radio[name='pneuPneu']:checked").val() == 'Não' && isEmpty("pneuPneuObs")  ){
			message += getMessage("Pneus ok?", 9);
			hasErros = true;
			$('#pneuPneuObs').closest(".form-group").addClass("has-error");
		}
		/*
		 * SEGURANÇA
		 */
		if (isEmpty("segTriMacacoChaveGeral", "radio")) {
			message += getMessage("Triângulo de Sinalização, Macaco e Chave Geral ok?", 1);
			hasErros = true;
			$("input:radio[name='segTriMacacoChaveGeral']").closest(".form-group").addClass("has-error-custom");
		}else if( $("input:radio[name='segTriMacacoChaveGeral']:checked").val() == 'Não' && isEmpty("segTriMacacoChaveGeralObs")  ){
			message += getMessage("Triângulo de Sinalização, Macaco e Chave Geral ok?", 9);
			hasErros = true;
			$('#segTriMacacoChaveGeralObs').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("segTravaSeg", "radio")) {
			message += getMessage("Trava de Segurança, Quinta Roda e Pino está funcionando corretamente?", 1);
			hasErros = true;
			$("input:radio[name='segTravaSeg']").closest(".form-group").addClass("has-error-custom");
		}else if( $("input:radio[name='segTravaSeg']:checked").val() == 'Não' && isEmpty("segTravaSegObs")  ){
			message += getMessage("Trava de Segurança, Quinta Roda e Pino está funcionando corretamente?", 9);
			hasErros = true;
			$('#segTravaSegObs').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("segExtintorDentroVal", "radio")) {
			message += getMessage("Possui Extintor dentro da Validade?", 1);
			hasErros = true;
			$("input:radio[name='segExtintorDentroVal']").closest(".form-group").addClass("has-error-custom");
		}else if( $("input:radio[name='segExtintorDentroVal']:checked").val() == 'Não' && isEmpty("segExtintorDentroValObs")  ){
			message += getMessage("Possui Extintor dentro da Validade?", 9);
			hasErros = true;
			$('#segExtintorDentroValObs').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("segSinalizandoExcesso", "radio")) {
			message += getMessage("O Veículo está com a Tampa Traseira Sinalizando Excesso corretamente e legível?", 1);
			hasErros = true;
			$("input:radio[name='segSinalizandoExcesso']").closest(".form-group").addClass("has-error-custom");
		}else if( $("input:radio[name='segSinalizandoExcesso']:checked").val() == 'Não' && isEmpty("segSinalizandoExcessoObs")  ){
			message += getMessage("O Veículo está com a Tampa Traseira Sinalizando Excesso corretamente e legível?", 9);
			hasErros = true;
			$('#segSinalizandoExcessoObs').closest(".form-group").addClass("has-error");
		}
	}
	
	if (hasErros) {
        if (isMobile == 'true') throw message;
        throw "<ul style='list-style-type: disc; padding-left:90px' class='alert alert-danger'>" + message + "</ul>";
    }
}

function getMessage(texto, tipoMensagem) {
    if ( isMobile == 'true' ) {
        switch (tipoMensagem) {
            case 1:
                return 'Campo "' + texto + '" não pode estar vazio.\n';
            case 2:
                return 'Campo "' + texto + '" está inválido.\n';    
            case 3:
                return 'Selecione uma opção em "' + texto + '".\n';
            case 4:
                return 'Campo "' + texto + '" não pode ser zero.\n'; 
            case 5:
//            	 return 'A tabela de  "' + tabpaifilho + '" possui um ou mais campos de "' + texto + '" inválido.\n'; 
            case 6:
           	 	return texto; 
            case 7:
           	 	return "Campo: "+texto+" precisa estar marcado.";
            case 8:
            	return "É preciso anexar um documento de "+texto+".";
            case 9:
            	return "Campo: 'Outro' da resposta '" + texto + "' não pode estar vazio.";  
        }
    } else {
        switch (tipoMensagem) {
            case 1:
                return "<li>Campo: <b>" + texto + "</b> não pode estar vazio.</li>";
            case 2:
                return '<li>Campo: <b>' + texto + '</b> está inválido.\n';    
            case 3:
                return "<li>Selecione uma opção em: <b>" + texto + "</b></li>";
            case 4:
                return "<li>Campo: <b>" + texto + "</b> não pode ser zero.</li>";
            case 5:
//                return "<li>A tabela de <b>" + tabpaifilho + "</b> possui um ou mais campos de <b>" + texto + "</b> inválido.</li>";  
            case 6:
           	 	return "<li>"+texto+"</li>";     
            case 7:
           	 	return "<li>Campo: <b>"+texto+"</b> precisa estar marcado.</li>";     
            case 8:
            	return "<li>É obrigatório anexar um <b>"+texto+"</b>.</li>";     
            case 9:
            	return "<li>Campo: <b>Observação</b> da resposta <b>" + texto + "</b> não pode estar vazio.</li>";     
        }
    }
}    



/*****************************************************************************************************************/

function removeClassError(){
	$(".has-error-custom").removeClass("has-error-custom");
	$(".has-error").removeClass("has-error");
	$(".has-free").removeClass("has-free");
	$(".has-free-table").removeClass("has-free-table");
	$(".has-free-array").removeClass("has-free-array");
	$(".has-free-msg").removeClass("has-free-msg");
  	$("form").find("label").css("color", "rgb(89,89,89)");
  	$("form").find("th").css("color", "rgb(89,89,89)");
}