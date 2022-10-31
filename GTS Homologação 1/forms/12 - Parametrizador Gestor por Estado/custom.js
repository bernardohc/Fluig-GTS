var modalError = null;

function init(){
	if(FORM_MODE == "VIEW"){
		controleDeTelaModoView();
	}
}

function addLinha(){
	var index = wdkAddChild("table_gestor_estado");
	$("#idRegistro___" + index).val(index);
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