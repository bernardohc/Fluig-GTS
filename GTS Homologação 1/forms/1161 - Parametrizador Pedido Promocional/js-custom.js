var modalError = null;

function init(){
	if(FORM_MODE == "VIEW"){
		controleDeTelaModoView();
	}
}

function addLinha(){
	var index = wdkAddChild("table_pedido_promocional");
	$("#idRegistro___" + index).val(index);
	
	
	FLUIGC.calendar('#periodoInicialDesconto___'+index,{
		  language: 'pt-br',
		  pickDate: true,
		  pickTime: false

	});
	
	FLUIGC.calendar('#periodoFinalDesconto___'+index,{
		language: 'pt-br',
		pickDate: true,
		pickTime: false
		
	});
	
	
	$("#porcDescontoPP___"+index).val('0');
	validafunctions.setPercentual("porcDescontoPP___"+index, 2, false);
}

function removeRegistro(elem){
	fnWdkRemoveChild(elem);
}

function controleDeTelaModoView(){
	$("#div_rowBtnAddTipo").hide();
	
	var deletes = $("input[id^='idDelete___']");
	if(deletes != null && deletes != undefined && deletes.length != null && deletes.length != undefined){
		for(var i = 0; i < deletes.length; i++){
			var delAtual = deletes[i];
			$(delAtual).parent().remove();
		}
	}
}

function loadForm(){
	
	$('#btnAddLinha').hide();
	
	
	$("input[name*=siglaEstado___]").each(function(index){
		var index = validafunctions.getPosicaoFilho($(this).attr("id"));
		
		FLUIGC.calendar('#periodoInicialDesconto___'+index,{
			  language: 'pt-br',
			  pickDate: true,
			  pickTime: false
	
		});
		
		FLUIGC.calendar('#periodoFinalDesconto___'+index,{
			language: 'pt-br',
			pickDate: true,
			pickTime: false
			
		});
	});
}