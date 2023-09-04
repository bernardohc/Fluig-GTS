function setSelectedZoomItem(selectedItem) {
	
	if(selectedItem.inputId == 'cidadeRequisitante') {
		$('#codCidadeRequisitante').val(selectedItem.CODCIDADE);
	}else if (selectedItem.inputId == 'setor') {
		$('#codSetor').val(selectedItem.codSetor);
		$('#codGrupoSetor').val('Pool:Group:'+selectedItem.codGrupo);
	}else if(selectedItem.inputId == 'cidadeRevenda'){
		$('#codCidadeRevenda').val(selectedItem.CODCIDADE);
		
		var UF = $('#estadoRevenda').val();
        reloadZoomFilterValues("revenda", "UF,"+UF+",CODCIDADE,"+selectedItem.CODCIDADE);
        
	}else if(selectedItem.inputId == 'revenda'){
		$('#A1CODRevenda').val(selectedItem.A1_COD);
		$('#A1LOJARevenda').val(selectedItem.A1_LOJA);
		$('#A1CODLOJARevenda').val(selectedItem.A1_CODLOJA);
		$('#tipoPessoaRevenda').val(selectedItem.A1_PESSOA);
		$('#cpfCnpjRevenda').val(selectedItem.A1_CGC);
	}

}


function setZoomData(instance, value){
	window[instance].setValue(value);
}

function removedZoomItem(removedItem) {
	
	if (removedItem.inputId == 'cidadeRequisitante') {
		window["cidadeRequisitante"].clear();
		$('#codCidadeRequisitante').val('');
	}else if (removedItem.inputId == 'setor') {
		window["setor"].clear();
		$('#codSetor').val('');
		$('#codGrupoSetor').val('');
	}else if(removedItem.inputId == 'cidadeRevenda'){
		window["cidadeRevenda"].clear();
		$('#codCidadeRevenda').val('');
		
		window["revenda"].clear();
		$('#A1CODRevenda').val('');
		$('#A1LOJARevenda').val('');
		$('#A1CODLOJARevenda').val('');
		$('#tipoPessoaRevenda').val('');
		$('#cpfCnpjRevenda').val('');
		reloadZoomFilterValues("revenda");
		
	}else if (removedItem.inputId == 'revenda') {
		window["revenda"].clear();
		$('#A1CODRevenda').val('');
		$('#A1LOJARevenda').val('');
		$('#A1CODLOJARevenda').val('');
		$('#tipoPessoaRevenda').val('');
		$('#cpfCnpjRevenda').val('');
	}
}


