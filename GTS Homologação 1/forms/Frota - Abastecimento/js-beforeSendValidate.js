var beforeSendValidate = function(numState,nextState){
	removeClassError();
	validaCampos(parseInt(numState), nextState);
}

/*****************************************************************************************************************/
function validaCampos(numState, nextState){
	let message = "";
	let hasErros = false;
	
	
	/*
     * Valida obrigatoriamente os Dados Gerais
     */
	if (isEmpty("geraisNomeMotorista", form)) {
    	message += getMessage("Nome Motorista", 1, form);
    	hasErros = true;
    	$('#geraisNomeMotorista').closest(".form-group").addClass("has-error");
    }
    if (isEmpty("geraisCarimboDataHora", form)) {
		message += getMessage("Carimbo de Data/Hora", 1, form);
		hasErros = true;
		$('#geraisCarimboDataHora').closest(".form-group").addClass("has-error");
	}
    if (isEmpty("geraisPlaca", form)) {
    	message += getMessage("Placa", 1, form);
    	hasErros = true;
    	$('#geraisPlaca').closest(".form-group").addClass("has-error");
    }else if( $("#geraisPlaca").val().length != 7 ){
		message += getMessage("Placa", 2);
		hasErros = true;
		$('#geraisPlaca').closest(".form-group").addClass("has-error");
    }

   
    /*
     * Abastecimento
     */
    if (isEmpty("abastCNPJPosto", form)) {
    	message += getMessage("CNPJ do Posto", 1, form);
    	hasErros = true;
    	$('#abastCNPJPosto').closest(".form-group").addClass("has-error");
    }else if( $("#abastCNPJPosto").val().length != 18 ){
		message += getMessage("CNPJ do Posto", 2);
		hasErros = true;
		$('#abastCNPJPosto').closest(".form-group").addClass("has-error");
    }
    if (isEmpty("abastNomePosto", form)) {
    	message += getMessage("Nome do Posto", 1, form);
    	hasErros = true;
    	$('#abastNomePosto').closest(".form-group").addClass("has-error");
    }
    if (isEmpty("abastKmAbastecimento", form)) {
    	message += getMessage("Km Abastecimento", 1, form);
    	hasErros = true;
    	$('#abastKmAbastecimento').closest(".form-group").addClass("has-error");
    }
    if (isEmpty("abastCodTipoCombustivel", form)) {
    	message += getMessage("Tipo de Combustível", 1, form);
    	hasErros = true;
    	$('#abastTipoCombustivel').closest(".form-group").addClass("has-error");
    	$('#abastTipoCombustivel').next().find('.select2-selection--multiple').css({"border-color": "f64445"});
    }
    if (isEmpty("abastQtdLitros", form)) {
    	message += getMessage("Qtd. Litros", 1, form);
    	hasErros = true;
    	$('#abastQtdLitros').closest(".form-group").addClass("has-error");
    }
    if (isEmpty("abastValorLitro", form)) {
    	message += getMessage("Valor Litro", 1, form);
    	hasErros = true;
    	$('#abastValorLitro').closest(".form-group").addClass("has-error");
    }
    if (isEmpty("abastValorTotal", form)) {
    	message += getMessage("Valor Total", 1, form);
    	hasErros = true;
    	$('#abastValorTotal').closest(".form-group").addClass("has-error");
    }
    if (isEmpty("abastFormaPagamento", form)) {
    	message += getMessage("Forma de Pagamento", 1, form);
    	hasErros = true;
    	$('#abastFormaPagamento').closest(".form-group").addClass("has-error");
    }
    if (isEmpty("abastSetor", form)) {
    	message += getMessage("Setor", 1, form);
    	hasErros = true;
    	$('#abastSetor').closest(".form-group").addClass("has-error");
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
            	return "Descrição 'Outro' da resposta '" + texto + "' não pode estar vazio.";  
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
            	return "<li>Descrição <b>Outro</b> da resposta <b>" + texto + "</b> não pode estar vazio.</li>";     
        }
    }
}    



/*****************************************************************************************************************/

function removeClassError(){
	$(".has-error").removeClass("has-error");
	$(".has-free").removeClass("has-free");
	$(".has-free-table").removeClass("has-free-table");
	$(".has-free-array").removeClass("has-free-array");
	$(".has-free-msg").removeClass("has-free-msg");
  	$("form").find("label").css("color", "rgb(89,89,89)");
  	$("form").find("th").css("color", "rgb(89,89,89)");
  	
  	//Para campo zoom
    $('.select2-selection--multiple').css({"border-color": "ccc"});
	
}