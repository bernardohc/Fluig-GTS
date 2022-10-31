var modalError = null;

function init(){
	if(FORM_MODE == "VIEW"){
		controleDeTelaModoView();
	}
}

function addLinha(){
	
	if( $('#nomeSetor').val() == ''){
		
		FLUIGC.toast({title: '',message: 'Nome do Setor é obrigatório!' ,type: 'alert'});
		
	}else if( $('#codigoGrupo').val() == ''){
		
		FLUIGC.toast({title: '',message: 'Código do Grupo é obrigatório!' ,type: 'alert'});
		
	}else{
		var setor = $('#nomeSetor').val();
		var codGrupo = $('#codigoGrupo').val();
		
		
		var index = wdkAddChild("table_sac_setor");
		
		$("#ativo___" + index).val('selecionado');
		$("#ativo___" + index).prop('checked', true);
		$("#codSetor___" + index).val(index);
		$("#setor___" + index).val(setor);
		$("#codGrupo___" + index).val(codGrupo);
		
		
		limpaCampos();
	}
}

function limpaCampos(){
	$('#nomeSetor').val('');
	$('#codigoGrupo').val('');
}
//function removeRegistro(elem){
//	fnWdkRemoveChild(elem);
//}

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
	
//	$('#btnAddLinha').hide();
	
	
//	$("input[name*=siglaEstado___]").each(function(index){
//		var index = validafunctions.getPosicaoFilho($(this).attr("id"));
//		
//		FLUIGC.calendar('#periodoInicialDesconto___'+index,{
//			  language: 'pt-br',
//			  pickDate: true,
//			  pickTime: false
//	
//		});
//		
//		FLUIGC.calendar('#periodoFinalDesconto___'+index,{
//			language: 'pt-br',
//			pickDate: true,
//			pickTime: false
//			
//		});
//	});
}