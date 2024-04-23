function setSelectedZoomItem(selectedItem) {
	
	let indexSelectedZoom = selectedItem.inputId.split('___')[1];
	//É paiXfilho
	if (indexSelectedZoom !== undefined && indexSelectedZoom != '') {

		if (selectedItem.inputId == 'falGrupoMaquinaItem___'+ indexSelectedZoom) {
			//Grupo
			$("#falCodFalhaGrupoMaquinaItem___"+ indexSelectedZoom).val(selectedItem.GRUPOCODFALHA);
			
			//Falha
			reloadZoomFilterValues('falDescFalhaFalhaItem___'+ indexSelectedZoom, 'tipoFiltro,falha,codFamilia,' + selectedItem.FAMILIACOD +',codFalhaGrupo,'+selectedItem.GRUPOCODFALHA );
			
		}else if(selectedItem.inputId == 'falDescFalhaFalhaItem___'+ indexSelectedZoom) {
			
			// let falCodigoFalha = $("#falCodFalhaFamiliaItem___"+ indexSelectedZoom).val() +'.'+ $("#falCodFalhaModeloMaquinaItem___"+ indexSelectedZoom).val() +'.'+ $("#falCodFalhaGrupoMaquinaItem___"+ indexSelectedZoom).val() +'.'+ $("#falCodFalhaFalhaItem___"+ indexSelectedZoom).val();
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
				$("#falCodFalhaFalhaItem___"+ indexSelectedZoom).val(selectedItem.FALHACODFALHA);
				
				if( $("#falCodFalhaFamiliaItem___"+ indexSelectedZoom).val().trim() != '' && $("#falCodFalhaModeloMaquinaItem___"+ indexSelectedZoom).val().trim() != '' && $("#falCodFalhaGrupoMaquinaItem___"+ indexSelectedZoom).val().trim() != '' && $("#falCodFalhaFalhaItem___"+ indexSelectedZoom).val().trim() != ''){
					//Se todos os campos de falha estão preenchidos, define o código de falha
					$('#falCodigoFalhaItem___'+ indexSelectedZoom).val(falCodigoFalha);
				}
			}
			
			
		}

	}else{
		if(selectedItem.inputId == 'maqDescFamilia') {
			//Família
			$("#maqCodFamilia").val(selectedItem.FAMILIACOD);
			$("#maqCodFalhaFamilia").val(selectedItem.FAMILIACODFALHA);
			
			//Modelo Máquina
			reloadZoomFilterValues('maqDescModeloMaquina', 'tipoFiltro,modelos,codFamilia,'+selectedItem.FAMILIACOD );
			
			displayCustomizacaoMaquina(selectedItem.FAMILIACOD);
			
			var atdAtendimentoFinalizado = $("input:radio[name='atdAtendimentoFinalizado']:checked").val();
			if(atdAtendimentoFinalizado == 'nao'){
				
				//Falha
				$("input[name*=falCodFamiliaItem___]").each(function(){
					let indexTbFalha = validafunctions.getPosicaoFilho($(this).attr("id"));
					//Família
					$("#falCodFamiliaItem___"+ indexTbFalha).val( selectedItem.FAMILIACOD );
					$("#falCodFalhaFamiliaItem___"+ indexTbFalha).val( selectedItem.FAMILIACODFALHA );
					$("#falFamiliaItem___"+ indexTbFalha).val( selectedItem.FAMILIACODFALHADESC );

					//Grupo
					reloadZoomFilterValues('falGrupoMaquinaItem___'+ indexTbFalha, 'tipoFiltro,grupo,codFamilia,'+selectedItem.FAMILIACOD );
				});
				
				
			}
			
		}else if(selectedItem.inputId == 'maqDescModeloMaquina') {
			//Modelo Máquina
			$("#maqCodFalhaModeloMaquina").val(selectedItem.MODELOCODFALHA);
			
			var atdAtendimentoFinalizado = $("input:radio[name='atdAtendimentoFinalizado']:checked").val();
			if(atdAtendimentoFinalizado == 'nao'){
				//Falha
				$("input[name*=falCodFamiliaItem___]").each(function(){
					let indexTbFalha = validafunctions.getPosicaoFilho($(this).attr("id"));
					//Família
					$("#falCodFalhaModeloMaquinaItem___"+ indexTbFalha).val( selectedItem.MODELOCODFALHA );
					$("#falModeloMaquinaItem___"+ indexTbFalha).val( selectedItem.MODELOCODFALHADESC );
					
					if( $("#falCodFalhaFamiliaItem___"+ indexTbFalha).val().trim() != '' && $("#falCodFalhaModeloMaquinaItem___"+ indexTbFalha).val().trim() != '' && $("#falCodFalhaGrupoMaquinaItem___"+ indexTbFalha).val().trim() != '' && $("#falCodFalhaFalhaItem___"+ indexTbFalha).val().trim() != ''){
						let falCodigoFalha = $("#falCodFalhaFamiliaItem___"+ indexTbFalha).val() +'.'+ $("#falCodFalhaModeloMaquinaItem___"+ indexTbFalha).val() +'.'+ $("#falCodFalhaGrupoMaquinaItem___"+ indexTbFalha).val() +'.'+ $("#falCodFalhaFalhaItem___"+ indexTbFalha).val();
						$('#falCodigoFalhaItem___'+ indexTbFalha).val(falCodigoFalha);
					}
				});
			}
			
		}else if(selectedItem.inputId == 'revNomeRevendaZoom') {
			
			$("#revCpfCnpj").val(selectedItem.REVCGC);
			$("#revInscricaoEstadual").val(selectedItem.REVINSCEST);
			$("#revNomeRevenda").val(selectedItem.REVNOME);
			$("#revCodigo").val(selectedItem.REVCODIGO);
			$("#revLoja").val(selectedItem.REVLOJA);
			$("#revCEP").val(selectedItem.REVCEP);
			$("#revEndereco").val(selectedItem.REVEND);
			$("#revBairro").val(selectedItem.REVBAIRRO);
			$("#revComplemento").val(selectedItem.REVCOMPLEMENTO);
			$("#revCidade").val(selectedItem.REVCIDADE);
			$("#revEstado").val(selectedItem.REVESTADO);
			$("#revEstadoHidden").val(selectedItem.REVESTADO);
			$("#revTelefone").val(selectedItem.REVTELEFONE);
			$("#revEmail").val(selectedItem.REVEMAIL);
			
		}else if(selectedItem.inputId == 'solDescSetor') {
			
			$("#solCodSetor").val(selectedItem.CODSETOR);
			$("#solCodGrupoSetor").val('Pool:Group:'+ selectedItem.CODGRUPOSETOR);
			
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
		
		if(removedItem.inputId == 'falGrupoMaquinaItem___'+ indexRemovedZoom) {
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

		if(removedItem.inputId == 'maqDescFamilia') {
			//Família
			$("#maqCodFamilia").val('');
			$("#maqCodFalhaFamilia").val('');
			//Modelo Máquina
			window["maqDescModeloMaquina"].clear();
			reloadZoomFilterValues('maqDescModeloMaquina', 'tipoFiltro,limpar');
			$("#maqCodModeloMaquina").val('');
			
			$("input[name*=falCodFamiliaItem___]").each(function(){
				let indexTbFalha = validafunctions.getPosicaoFilho($(this).attr("id"));
				//Família
				$("#falCodFamiliaItem___"+ indexTbFalha).val('');
				$("#falCodFalhaFamiliaItem___"+ indexTbFalha).val('');
				$("#falFamiliaItem___"+ indexTbFalha).val('');
				//Modelo Máquina
				$('#falCodFalhaModeloMaquinaItem___'+ indexTbFalha).val('');
				$('#falModeloMaquinaItem___'+ indexTbFalha).val('');
				//Grupo
				$("#falCodFalhaGrupoMaquinaItem___"+ indexTbFalha).val('');
				window["falGrupoMaquinaItem___"+ indexTbFalha].clear();
				reloadZoomFilterValues("falGrupoMaquinaItem___"+ indexTbFalha, "tipoFiltro,limpar");
				//Falha
				$("#falCodigoFalhaItem___"+ indexTbFalha).val('');
				$("#falCodFalhaFalhaItem___"+ indexTbFalha).val('');
				window["falDescFalhaFalhaItem___"+ indexTbFalha].clear();
				reloadZoomFilterValues("falDescFalhaFalhaItem___"+ indexTbFalha, "tipoFiltro,limpar");

			});


			$('#divMaqNumLinha').hide();
			$('#maqNumLinha').val('');
			$('#divMaqEspacamento').hide();
			$('#maqEspacamento').val('');
			$('#divMaqHastes').hide();
			$('#maqHastes').val('');
			$('#divMaqPes').hide();
			$('#maqPes').val('');
		}else if(removedItem.inputId == 'maqDescModeloMaquina') {
			//Modelo Máquina
			$("#maqCodFalhaModeloMaquina").val('');
			
			//Falha
			$("input[name*=falCodFamiliaItem___]").each(function(){
				let indexTbFalha = validafunctions.getPosicaoFilho($(this).attr("id"));
				//Modelo da Máquina
				$('#falCodFalhaModeloMaquinaItem___'+ indexTbFalha).val('');
				$('#falModeloMaquinaItem___'+ indexTbFalha).val('');
				

				$("#falCodigoFalhaItem___"+ indexTbFalha).val('');
				
			});
			
		}else if(removedItem.inputId == 'revNomeRevendaZoom') {
			
			$("#revCpfCnpj").val('');
			$("#revInscricaoEstadual").val('');
			$("#revNomeRevenda").val('');
			$("#revCodigo").val('');
			$("#revLoja").val('');
			$("#revCEP").val('');
			$("#revEndereco").val('');
			$("#revBairro").val('');
			$("#revComplemento").val('');
			$("#revCidade").val('');
			$("#revEstado").val('');
			$("#revEstadoHidden").val('');
			$("#revTelefone").val('');
			$("#revEmail").val('');
			
		}else if(removedItem.inputId == 'solDescSetor') {
			
			$("#solCodSetor").val('');
			$("#solCodGrupoSetor").val('');
			
		}
	}

}

function displayCustomizacaoMaquina(familiaCod){
	if(familiaCod == 'FPM' || familiaCod == 'FSM'){
		//FPM- Plataforma de Milho
		//FSM - Semeadora Exattus 
		$('#divMaqNumLinha').show();
		$('#divMaqEspacamento').show();
		
		$('#divMaqHastes').hide();
		$('#maqHastes').val('');
		$('#divMaqPes').hide();
		$('#maqPes').val('');
	}else if(familiaCod == 'FPC'){
		//FPC - Plataformas de Cereais Flexer 
		$('#divMaqPes').show();
		
		$('#divMaqNumLinha').hide();
		$('#maqNumLinha').val('');
		$('#divMaqEspacamento').hide();
		$('#maqEspacamento').val('');
		$('#divMaqHastes').hide();
		$('#maqHastes').val('');
		
	}else if(familiaCod == 'FDC' || familiaCod == 'FCS' ){
		//FDC - TERRUS
		//FCS - TERRUS FERTTI
		$('#divMaqHastes').show();
		
		$('#divMaqNumLinha').hide();
		$('#maqNumLinha').val('');
		$('#divMaqEspacamento').hide();
		$('#maqEspacamento').val('');
		$('#divMaqPes').hide();
		$('#maqPes').val('');
	}
}