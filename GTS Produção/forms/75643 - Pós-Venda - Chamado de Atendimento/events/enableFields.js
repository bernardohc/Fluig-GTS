function enableFields(form){
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO || atv_atual == INICIO_0 ){
		if(atv_atual == INICIO ){
			form.setEnabled("gerTecnicoGTS", false);
		}
		if( !isEmpty("gerNumeroOS", form) ){
			form.setEnabled("gerNumeroOS", false);
		}
		//Comunicação - Solicitação
		form.setEnabled("solDescSetor", false);
		form.setEnabled("solEncaminharSolicitacao", false);
		form.setEnabled("solFinalizarSolicitacao", false);
		
	}else if( atv_atual == SUPORTE_GTS){
		
		//Dados do Equipamento
		form.setEnabled("equipNumSerie", false);
		form.setEnabled("equipDescricao", false);
		form.setEnabled("equipDataTerminoGarantia", false);
		//Revenda
		form.setEnabled("revEquipNomeFantasiaRevenda", false);
		form.setEnabled("revEquipTelefone", false);
		form.setEnabled("revEquipCidade", false);
		form.setEnabled("revEquipEstado", false);
		form.setEnabled("revSolicicaoVinculada", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revRevenda", false);
		form.setEnabled("revNomeFantasiaRevenda", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revTelefone", false);
		//Solicitação
		form.setEnabled("solTipoSolicitacao", false);
		form.setEnabled("solTipoInformacao", false);
		form.setEnabled("solDescricaoGeral", false);
		//Falha
		var indexTbFalha = form.getChildrenIndexes("falTbFalha");
		if(indexTbFalha.length > 0){
		    for (var i = 0; i < indexTbFalha.length; i++) { 
				form.setEnabled("falCodFalhaFamiliaItem___" + indexTbFalha[i], false);
				form.setEnabled("falFamiliaItem___" + indexTbFalha[i], false);
				form.setEnabled("falModeloMaquinaItem___" + indexTbFalha[i], false);
				form.setEnabled("falGrupoMaquinaItem___" + indexTbFalha[i], false);
				form.setEnabled("falDescFalhaFalhaItem___" + indexTbFalha[i], false);
				form.setEnabled("falCodigoFalhaItem___" + indexTbFalha[i], false);
				form.setEnabled("falRecorrenteItem___" + indexTbFalha[i], false);
			}
		}
		//Solicitante
		form.setEnabled("solNome", false);
		form.setEnabled("solEmail", false);
		form.setEnabled("solTelefone", false);
		form.setEnabled("solEstado", false);
		form.setEnabled("solCidade", false);
		form.setEnabled("solCidadeSelect", false);
		form.setEnabled("solDeAcordoLGPD", false);
		
		//Tabela de Comunicação
		var indexTbComunicacao = form.getChildrenIndexes("comTbComunicacao");
		if(indexTbComunicacao.length > 0){
		    for (var i = 0; i < indexTbComunicacao.length; i++) { 
		    	if( form.getValue("comDataItem___"+indexTbComunicacao[i]).trim() != ""){
			    	form.setEnabled("comUsuarioItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comTipoUsuarioItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comDataItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comStatusItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comComInternaItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comComExternaItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comComRevendaItem___" + indexTbComunicacao[i], false);
		    	}
		    }
		}

	}else if( atv_atual == REVENDA){
		//Dados do Equipamento
		form.setEnabled("equipNumSerie", false);
		form.setEnabled("equipDescricao", false);
		form.setEnabled("equipDataTerminoGarantia", false);
		//Revenda
		form.setEnabled("revEquipNomeFantasiaRevenda", false);
		form.setEnabled("revEquipTelefone", false);
		form.setEnabled("revEquipCidade", false);
		form.setEnabled("revEquipEstado", false);
		form.setEnabled("revSolicicaoVinculada", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revRevenda", false);
		form.setEnabled("revNomeFantasiaRevenda", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revTelefone", false);
		//Solicitação
		form.setEnabled("solTipoSolicitacao", false);
		form.setEnabled("solTipoInformacao", false);
		form.setEnabled("solDescricaoGeral", false);
		//Falha
		var indexTbFalha = form.getChildrenIndexes("falTbFalha");
		if(indexTbFalha.length > 0){
		    for (var i = 0; i < indexTbFalha.length; i++) { 
				form.setEnabled("falCodFalhaFamiliaItem___" + indexTbFalha[i], false);
				form.setEnabled("falFamiliaItem___" + indexTbFalha[i], false);
				form.setEnabled("falModeloMaquinaItem___" + indexTbFalha[i], false);
				form.setEnabled("falGrupoMaquinaItem___" + indexTbFalha[i], false);
				form.setEnabled("falDescFalhaFalhaItem___" + indexTbFalha[i], false);
				form.setEnabled("falCodigoFalhaItem___" + indexTbFalha[i], false);
				form.setEnabled("falRecorrenteItem___" + indexTbFalha[i], false);
			}
		}
		//Solicitante
		form.setEnabled("solNome", false);
		form.setEnabled("solEmail", false);
		form.setEnabled("solTelefone", false);
		form.setEnabled("solEstado", false);
		form.setEnabled("solCidade", false);
		form.setEnabled("solCidadeSelect", false);

		//Comunicação
		form.setEnabled("solStatus", false);
		form.setEnabled("solCodSetor", false);
		form.setEnabled("solCodGrupoSetor", false);
		form.setEnabled("solDescSetor", false);
		form.setEnabled("solRevendaAtendimento", false);
		form.setEnabled("solEncEmailRevendaFinalizado", false);
		form.setEnabled("solEmailRevendaAtendimento", false);
		form.setEnabled("solEncaminharSolicitacao", false);
		form.setEnabled("solDeAcordoLGPD", false);

		//Tabela de Comunicação
		var indexTbComunicacao = form.getChildrenIndexes("comTbComunicacao");
		if(indexTbComunicacao.length > 0){
		    for (var i = 0; i < indexTbComunicacao.length; i++) { 
		    	if( form.getValue("comDataItem___"+indexTbComunicacao[i]).trim() != ""){
			    	form.setEnabled("comUsuarioItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comTipoUsuarioItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comDataItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comStatusItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comComInternaItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comComExternaItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comComRevendaItem___" + indexTbComunicacao[i], false);
		    	}
		    }
		}	
		
	}else if( atv_atual == SETOR_GTS){
		//Dados do Equipamento
		form.setEnabled("equipNumSerie", false);
		form.setEnabled("equipDescricao", false);
		form.setEnabled("equipDataTerminoGarantia", false);
		//Revenda
		form.setEnabled("revEquipNomeFantasiaRevenda", false);
		form.setEnabled("revEquipTelefone", false);
		form.setEnabled("revEquipCidade", false);
		form.setEnabled("revEquipEstado", false);
		form.setEnabled("revSolicicaoVinculada", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revRevenda", false);
		form.setEnabled("revNomeFantasiaRevenda", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revTelefone", false);
		//Solicitação
		form.setEnabled("solTipoSolicitacao", false);
		form.setEnabled("solTipoInformacao", false);
		form.setEnabled("solDescricaoGeral", false);
		//Falha
		var indexTbFalha = form.getChildrenIndexes("falTbFalha");
		if(indexTbFalha.length > 0){
		    for (var i = 0; i < indexTbFalha.length; i++) { 
				form.setEnabled("falCodFalhaFamiliaItem___" + indexTbFalha[i], false);
				form.setEnabled("falFamiliaItem___" + indexTbFalha[i], false);
				form.setEnabled("falModeloMaquinaItem___" + indexTbFalha[i], false);
				form.setEnabled("falGrupoMaquinaItem___" + indexTbFalha[i], false);
				form.setEnabled("falDescFalhaFalhaItem___" + indexTbFalha[i], false);
				form.setEnabled("falCodigoFalhaItem___" + indexTbFalha[i], false);
				form.setEnabled("falRecorrenteItem___" + indexTbFalha[i], false);
			}
		}
		//Solicitante
		form.setEnabled("solNome", false);
		form.setEnabled("solEmail", false);
		form.setEnabled("solTelefone", false);
		form.setEnabled("solEstado", false);
		form.setEnabled("solCidade", false);
		form.setEnabled("solCidadeSelect", false);
		form.setEnabled("solDeAcordoLGPD", false);
		
		//Comunicação
		form.setEnabled("solStatus", false);
		form.setEnabled("solCodSetor", false);
		form.setEnabled("solCodGrupoSetor", false);
		form.setEnabled("solDescSetor", false);
		form.setEnabled("solRevendaAtendimento", false);
		form.setEnabled("solEncEmailRevendaFinalizado", false);
		form.setEnabled("solEmailRevendaAtendimento", false);
		form.setEnabled("solEncaminharSolicitacao", false);

		//Tabela de Comunicação
		var indexTbComunicacao = form.getChildrenIndexes("comTbComunicacao");
		if(indexTbComunicacao.length > 0){
		    for (var i = 0; i < indexTbComunicacao.length; i++) { 
		    	if( form.getValue("comDataItem___"+indexTbComunicacao[i]).trim() != ""){
			    	form.setEnabled("comUsuarioItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comTipoUsuarioItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comDataItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comStatusItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comComInternaItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comComExternaItem___" + indexTbComunicacao[i], false);
			    	form.setEnabled("comComRevendaItem___" + indexTbComunicacao[i], false);
		    	}
		    }
		}	
		
	}
}