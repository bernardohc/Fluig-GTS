function setSelectedZoomItem(selectedItem) {
	
	let indexSelectedZoom = selectedItem.inputId.split('___')[1];
	//É paiXfilho
	if (indexSelectedZoom !== undefined && indexSelectedZoom != '') {
		if (selectedItem.inputId == 'falFamiliaItem___'+ indexSelectedZoom) {
			//Família
			$(`#falCodFamiliaItem___${indexSelectedZoom}`).val(selectedItem.FAMILIACOD);
			$(`#falCodFalhaFamiliaItem___${indexSelectedZoom}`).val(selectedItem.FAMILIACODFALHA);
			
			//Modelo Máquina
			reloadZoomFilterValues(`falModeloMaquinaItem___${indexSelectedZoom}`, 'tipoFiltro,modelos,codFamilia,'+selectedItem.FAMILIACOD );
			
			//Grupo
			reloadZoomFilterValues(`falGrupoMaquinaItem___${indexSelectedZoom}`, 'tipoFiltro,grupo,codFamilia,'+selectedItem.FAMILIACOD );

		}else if (selectedItem.inputId == 'falModeloMaquinaItem___'+ indexSelectedZoom) {
			
			//Modelo Máquina
			$(`#falCodFalhaModeloMaquinaItem___${indexSelectedZoom}`).val(selectedItem.MODELOCODFALHA);


		}else if (selectedItem.inputId == 'falGrupoMaquinaItem___'+ indexSelectedZoom) {
			//Grupo
			$(`#falCodFalhaGrupoMaquinaItem___${indexSelectedZoom}`).val(selectedItem.GRUPOCODFALHA);
			
			//Falha
			reloadZoomFilterValues(`falDescFalhaFalhaItem___${indexSelectedZoom}`, 'tipoFiltro,falha,codFamilia,' + selectedItem.FAMILIACOD +',codFalhaGrupo,'+selectedItem.GRUPOCODFALHA );
			
		}else if(selectedItem.inputId == 'falDescFalhaFalhaItem___'+ indexSelectedZoom) {
			
			let falCodigoFalha = $("#falCodFalhaFamiliaItem___"+ indexSelectedZoom).val() +'.'+ $("#falCodFalhaModeloMaquinaItem___"+ indexSelectedZoom).val() +'.'+ $("#falCodFalhaGrupoMaquinaItem___"+ indexSelectedZoom).val() +'.'+ selectedItem.FALHACODFALHA;
				
			let registroDuplicado = false;
			$("input[name*=falCodFamiliaItem___]").each(function(){
				let indexTbFalha = validafunctions.getPosicaoFilho($(this).attr("id"));
				
				if(falCodigoFalha == $('#falCodigoFalhaItem___'+ indexTbFalha).val()){
					registroDuplicado = true;
				}
			});
				
			if(registroDuplicado){
				messageToast( {message: 'Esta falha já foi definida na tabela.'} , 'warning')
				window["falDescFalhaFalhaItem___"+ indexSelectedZoom].clear();

			}else{
				//Falha
				$(`#falCodFalhaFalhaItem___${indexSelectedZoom}`).val(selectedItem.FALHACODFALHA);
				
				if( $(`#falCodFalhaFamiliaItem___${indexSelectedZoom}`).val().trim() != '' && $(`#falCodFalhaModeloMaquinaItem___${indexSelectedZoom}`).val().trim() != '' && $(`#falCodFalhaGrupoMaquinaItem___${indexSelectedZoom}`).val().trim() != '' && $(`#falCodFalhaFalhaItem___${indexSelectedZoom}`).val().trim() != ''){
					//Se todos os campos de falha estão preenchidos, define o código de falha
					$(`#falCodigoFalhaItem___${indexSelectedZoom}`).val(falCodigoFalha);
				}
			}
			
			
		}

	}else{
		if(selectedItem.inputId == 'revRevenda') {
			$("#revCod").val(selectedItem.A1_COD);
			$("#revLoja").val(selectedItem.A1_LOJA);
			$("#revNomeFantasiaRevenda").val(selectedItem.A1_NOME);
			$("#revCidade").val(selectedItem.A1_MUN);
			$("#revTelefone").val(selectedItem.A1_TEL);
		}else if(selectedItem.inputId == 'solDescSetor') {
			$("#solCodSetor").val(selectedItem.CODSETOR);
			$("#solCodGrupoSetor").val('Pool:Group:'+ selectedItem.CODGRUPOSETOR);
		}else if(selectedItem.inputId == 'solRevendaAtendimento'){
			$("#solMatFluigRevendaAtendimento").val(selectedItem.REVMATFLUIG);
		}
	}	
}


function setZoomData(instance, value){
	window[instance].setValue(value);
}

function removedZoomItem(removedItem) {

	let indexRemovedZoom = removedItem.inputId.split('___')[1];
	//É paiXfilho
	if (indexRemovedZoom !== undefined && indexRemovedZoom != '') {
		
		if (removedItem.inputId == 'falFamiliaItem___'+ indexRemovedZoom) {
			//Família
			$(`#falCodFamiliaItem___${indexRemovedZoom}`).val('');
			$(`#falCodFalhaFamiliaItem___${indexRemovedZoom}`).val('');
			//Modelo Máquina
			window["falModeloMaquinaItem___"+ indexRemovedZoom].clear();
			reloadZoomFilterValues('falModeloMaquinaItem___'+ indexRemovedZoom, 'tipoFiltro,limpar');
			$(`#falCodFalhaModeloMaquinaItem___${indexRemovedZoom}`).val('');
			//Grupo
			$(`#falCodFalhaGrupoMaquinaItem___${indexRemovedZoom}`).val('');
			window["falGrupoMaquinaItem___"+ indexRemovedZoom].clear();
			reloadZoomFilterValues("falGrupoMaquinaItem___"+ indexRemovedZoom, "tipoFiltro,limpar");
			//Falha
			$(`#falCodigoFalhaItem___${indexRemovedZoom}`).val('');
			$(`#falCodFalhaFalhaItem___${indexRemovedZoom}`).val('');
			window["falDescFalhaFalhaItem___"+ indexRemovedZoom].clear();
			reloadZoomFilterValues("falDescFalhaFalhaItem___"+ indexRemovedZoom, "tipoFiltro,limpar");

		}else if (removedItem.inputId == 'falModeloMaquinaItem___'+ indexRemovedZoom) {

			//Modelo da Máquina
			$("#falCodFalhaModeloMaquinaItem___"+ indexRemovedZoom).val('');
			
			//Falha
			$("#falCodigoFalhaItem___"+ indexRemovedZoom).val('');

		}else if(removedItem.inputId == 'falGrupoMaquinaItem___'+ indexRemovedZoom) {
			//Grupo
			$("#falCodFalhaGrupoMaquinaItem___"+ indexRemovedZoom).val('');
			
			//Falha
			$("#falCodigoFalhaItem___"+ indexRemovedZoom).val('');
			$("#falCodFalhaFalhaItem___"+ indexRemovedZoom).val('');
			window["falDescFalhaFalhaItem___"+ indexRemovedZoom].clear();

			reloadZoomFilterValues("falDescFalhaFalhaItem___"+ indexRemovedZoom, "tipoFiltro,limpar");

		}else if(removedItem.inputId == 'falDescFalhaFalhaItem___'+ indexRemovedZoom) {
			//Falha
			$("#falCodigoFalhaItem___"+ indexRemovedZoom).val('');
			$("#falCodFalhaFalhaItem___"+ indexRemovedZoom).val('');
		}

	}else{
		if(removedItem.inputId == 'revRevenda') {
			$("#revCod").val('');
			$("#revLoja").val('');
			$("#revNomeFantasiaRevenda").val('');
			$("#revCidade").val('');
			$("#revTelefone").val('');
		}else if(removedItem.inputId == 'solDescSetor') {
			$("#solCodSetor").val('');
			$("#solCodGrupoSetor").val('');
		}else if(removedItem.inputId ==  'solRevendaAtendimento'){
			$("#solMatFluigRevendaAtendimento").val('');
		}
	}

}