function enableFields(form){
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO || atv_atual == INICIO_0 || atv_atual == TECNICO_COMPLEMENTA){
		if(atv_atual == INICIO || atv_atual == TECNICO_COMPLEMENTA){
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
		//Dados Gerais
		form.setEnabled("gerTecnicoGTS", false);
		form.setEnabled("gerEstado", false);
		form.setEnabled("codigoTecnicoGTS", false);
		form.setEnabled("gerNumeroOS", false);
		form.setEnabled("gerModalidade", false);
		form.setEnabled("gerNumSerie", false);
		form.setEnabled("gerModeloEquipamento", false);
		form.setEnabled("gerLaudo", false);
		form.setEnabled("cliCpfCnpj", false);
		form.setEnabled("cliInscricaoEstadual", false);
		form.setEnabled("cliNomeCliente", false);
		form.setEnabled("cliCodigo", false);
		form.setEnabled("cliLoja", false);
		form.setEnabled("cliCEP", false);
		form.setEnabled("cliEndereco", false);
		form.setEnabled("cliBairro", false);
		form.setEnabled("cliComplemento", false);
		form.setEnabled("cliCidade", false);
		form.setEnabled("cliEstado", false);
		form.setEnabled("cliTelefone", false);
		form.setEnabled("cliEmail", false);
		//Máquina
		form.setEnabled("maqDescFamilia", false);
		form.setEnabled("maqDescModeloMaquina", false);
		form.setEnabled("maqNumLinha", false);
		form.setEnabled("maqEspacamento", false);
		form.setEnabled("maqHastes", false);
		form.setEnabled("maqPes", false);
		form.setEnabled("maqMarcaColheitadeiraTrator", false);
		form.setEnabled("maqModelo", false);
		form.setEnabled("maqAno", false);
		//Revenda
		form.setEnabled("revCpfCnpj", false);
		form.setEnabled("revInscricaoEstadual", false);
		form.setEnabled("revNomeRevenda", false);
		form.setEnabled("revCodigo", false);
		form.setEnabled("revLoja", false);
		form.setEnabled("revCEP", false);
		form.setEnabled("revEndereco", false);
		form.setEnabled("revBairro", false);
		form.setEnabled("revComplemento", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revTelefone", false);
		form.setEnabled("revEmail", false);
		form.setEnabled("revTecAcompAtendimento", false);
		form.setEnabled("revTecAcompAtendimentoNome", false);
		form.setEnabled("revTecAcompAtendimentoCPF", false);
		form.setEnabled("revTecAcompAtendimentoTel", false);
		//Atendimento
		form.setEnabled("atdDataAtendimento", false);
		form.setEnabled("atdHoraInicial", false);
		form.setEnabled("atdHoraFinal", false);
		form.setEnabled("atdKmInicial", false);
		form.setEnabled("atdKmFinal", false);
		var indexAtdTbAtendimentos = form.getChildrenIndexes("atdTbAtendimentos");
		if(indexAtdTbAtendimentos.length > 0){
		    for (var i = 0; i < indexAtdTbAtendimentos.length; i++) { 
		    	form.setEnabled("atdDataAtendimentoItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdHoraInicialItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdHoraFinalItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdSaldoHorasItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdKmInicialItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdKmFinalItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdSaldoKmItem___" + indexAtdTbAtendimentos[i], false);
		    }
		}		
		form.setEnabled("atdTotalHoras", false);
		form.setEnabled("atdTotalKM", false);
		form.setEnabled("atdNomePessoaAcompAtend", false);
		form.setEnabled("atdTelPessoaAcompAtend", false);
		form.setEnabled("atdFazenda", false);
		form.setEnabled("atdEstado", false);
		form.setEnabled("atdCidade", false);
		form.setEnabled("atdAtendimentoFinalizado", false);
		//Falha
		var indexTbFalha = form.getChildrenIndexes("falTbFalha");
		if(indexTbFalha.length > 0){
		    for (var i = 0; i < indexTbFalha.length; i++) { 
				form.setEnabled("falCodFalhaFamiliaItem___" + indexTbFalha[i], false);
				form.setEnabled("falModeloMaquinaItem___" + indexTbFalha[i], false);
				form.setEnabled("falGrupoMaquinaItem___" + indexTbFalha[i], false);
				form.setEnabled("falDescFalhaFalhaItem___" + indexTbFalha[i], false);
				form.setEnabled("falCodigoFalhaItem___" + indexTbFalha[i], false);
				form.setEnabled("falPendenciaItem___" + indexTbFalha[i], false);
			}
		}
		
		//Observações Gerais
		form.setEnabled("obsObservacoesGerais", false);
		
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
			    	form.setEnabled("comComTecnicoItem___" + indexTbComunicacao[i], false);
		    	}
		    }
		}
	}else if( atv_atual == TECNICO_GTS){
		//Dados Gerais
		form.setEnabled("gerTecnicoGTS", false);
		form.setEnabled("gerEstado", false);
		form.setEnabled("codigoTecnicoGTS", false);
		form.setEnabled("gerNumeroOS", false);
		form.setEnabled("gerModalidade", false);
		form.setEnabled("gerNumSerie", false);
		form.setEnabled("gerModeloEquipamento", false);
		form.setEnabled("gerLaudo", false);
		form.setEnabled("cliCpfCnpj", false);
		form.setEnabled("cliInscricaoEstadual", false);
		form.setEnabled("cliNomeCliente", false);
		form.setEnabled("cliCodigo", false);
		form.setEnabled("cliLoja", false);
		form.setEnabled("cliCEP", false);
		form.setEnabled("cliEndereco", false);
		form.setEnabled("cliBairro", false);
		form.setEnabled("cliComplemento", false);
		form.setEnabled("cliCidade", false);
		form.setEnabled("cliEstado", false);
		form.setEnabled("cliTelefone", false);
		form.setEnabled("cliEmail", false);
		//Máquina
		form.setEnabled("maqDescFamilia", false);
		form.setEnabled("maqDescModeloMaquina", false);
		form.setEnabled("maqNumLinha", false);
		form.setEnabled("maqEspacamento", false);
		form.setEnabled("maqHastes", false);
		form.setEnabled("maqPes", false);
		form.setEnabled("maqMarcaColheitadeiraTrator", false);
		form.setEnabled("maqModelo", false);
		form.setEnabled("maqAno", false);
		//Revenda
		form.setEnabled("revCpfCnpj", false);
		form.setEnabled("revInscricaoEstadual", false);
		form.setEnabled("revNomeRevenda", false);
		form.setEnabled("revCodigo", false);
		form.setEnabled("revLoja", false);
		form.setEnabled("revCEP", false);
		form.setEnabled("revEndereco", false);
		form.setEnabled("revBairro", false);
		form.setEnabled("revComplemento", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revTelefone", false);
		form.setEnabled("revEmail", false);
		form.setEnabled("revTecAcompAtendimento", false);
		form.setEnabled("revTecAcompAtendimentoNome", false);
		form.setEnabled("revTecAcompAtendimentoCPF", false);
		form.setEnabled("revTecAcompAtendimentoTel", false);
		//Atendimento
		form.setEnabled("atdDataAtendimento", false);
		form.setEnabled("atdHoraInicial", false);
		form.setEnabled("atdHoraFinal", false);
		form.setEnabled("atdKmInicial", false);
		form.setEnabled("atdKmFinal", false);
		var indexAtdTbAtendimentos = form.getChildrenIndexes("atdTbAtendimentos");
		if(indexAtdTbAtendimentos.length > 0){
		    for (var i = 0; i < indexAtdTbAtendimentos.length; i++) { 
		    	form.setEnabled("atdDataAtendimentoItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdHoraInicialItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdHoraFinalItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdSaldoHorasItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdKmInicialItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdKmFinalItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdSaldoKmItem___" + indexAtdTbAtendimentos[i], false);
		    }
		}		
		form.setEnabled("atdTotalHoras", false);
		form.setEnabled("atdTotalKM", false);
		form.setEnabled("atdNomePessoaAcompAtend", false);
		form.setEnabled("atdTelPessoaAcompAtend", false);
		form.setEnabled("atdFazenda", false);
		form.setEnabled("atdEstado", false);
		form.setEnabled("atdCidade", false);
		form.setEnabled("atdAtendimentoFinalizado", false);
		//Falha
		var indexTbFalha = form.getChildrenIndexes("falTbFalha");
		if(indexTbFalha.length > 0){
		    for (var i = 0; i < indexTbFalha.length; i++) { 
				form.setEnabled("falCodFalhaFamiliaItem___" + indexTbFalha[i], false);
				form.setEnabled("falModeloMaquinaItem___" + indexTbFalha[i], false);
				form.setEnabled("falGrupoMaquinaItem___" + indexTbFalha[i], false);
				form.setEnabled("falDescFalhaFalhaItem___" + indexTbFalha[i], false);
				form.setEnabled("falCodigoFalhaItem___" + indexTbFalha[i], false);
				form.setEnabled("falPendenciaItem___" + indexTbFalha[i], false);
			}
		}
		//Observações Gerais
		form.setEnabled("obsObservacoesGerais", false);
		
		//Comunicação - Solicitação
		form.setEnabled("solDescSetor", false);
		form.setEnabled("solStatus", false);
		form.setEnabled("solEncaminharSolicitacao", false);
		form.setEnabled("solFinalizarSolicitacao", false);
		
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
			    	form.setEnabled("comComTecnicoItem___" + indexTbComunicacao[i], false);
		    	}
		    }
		}	
		
		
	}else if( atv_atual == SETOR_GTS){
		//Dados Gerais
		form.setEnabled("gerTecnicoGTS", false);
		form.setEnabled("gerEstado", false);
		form.setEnabled("codigoTecnicoGTS", false);
		form.setEnabled("gerNumeroOS", false);
		form.setEnabled("gerModalidade", false);
		form.setEnabled("gerNumSerie", false);
		form.setEnabled("gerModeloEquipamento", false);
		form.setEnabled("gerLaudo", false);
		form.setEnabled("cliCpfCnpj", false);
		form.setEnabled("cliInscricaoEstadual", false);
		form.setEnabled("cliNomeCliente", false);
		form.setEnabled("cliCodigo", false);
		form.setEnabled("cliLoja", false);
		form.setEnabled("cliCEP", false);
		form.setEnabled("cliEndereco", false);
		form.setEnabled("cliBairro", false);
		form.setEnabled("cliComplemento", false);
		form.setEnabled("cliCidade", false);
		form.setEnabled("cliEstado", false);
		form.setEnabled("cliTelefone", false);
		form.setEnabled("cliEmail", false);
		//Máquina
		form.setEnabled("maqDescFamilia", false);
		form.setEnabled("maqDescModeloMaquina", false);
		form.setEnabled("maqNumLinha", false);
		form.setEnabled("maqEspacamento", false);
		form.setEnabled("maqHastes", false);
		form.setEnabled("maqPes", false);
		form.setEnabled("maqMarcaColheitadeiraTrator", false);
		form.setEnabled("maqModelo", false);
		form.setEnabled("maqAno", false);
		//Revenda
		form.setEnabled("revCpfCnpj", false);
		form.setEnabled("revInscricaoEstadual", false);
		form.setEnabled("revNomeRevenda", false);
		form.setEnabled("revCodigo", false);
		form.setEnabled("revLoja", false);
		form.setEnabled("revCEP", false);
		form.setEnabled("revEndereco", false);
		form.setEnabled("revBairro", false);
		form.setEnabled("revComplemento", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revTelefone", false);
		form.setEnabled("revEmail", false);
		form.setEnabled("revTecAcompAtendimento", false);
		form.setEnabled("revTecAcompAtendimentoNome", false);
		form.setEnabled("revTecAcompAtendimentoCPF", false);
		form.setEnabled("revTecAcompAtendimentoTel", false);
		//Atendimento
		form.setEnabled("atdDataAtendimento", false);
		form.setEnabled("atdHoraInicial", false);
		form.setEnabled("atdHoraFinal", false);
		form.setEnabled("atdKmInicial", false);
		form.setEnabled("atdKmFinal", false);
		var indexAtdTbAtendimentos = form.getChildrenIndexes("atdTbAtendimentos");
		if(indexAtdTbAtendimentos.length > 0){
		    for (var i = 0; i < indexAtdTbAtendimentos.length; i++) { 
		    	form.setEnabled("atdDataAtendimentoItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdHoraInicialItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdHoraFinalItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdSaldoHorasItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdKmInicialItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdKmFinalItem___" + indexAtdTbAtendimentos[i], false);
		    	form.setEnabled("atdSaldoKmItem___" + indexAtdTbAtendimentos[i], false);
		    }
		}		
		form.setEnabled("atdTotalHoras", false);
		form.setEnabled("atdTotalKM", false);
		form.setEnabled("atdNomePessoaAcompAtend", false);
		form.setEnabled("atdTelPessoaAcompAtend", false);
		form.setEnabled("atdFazenda", false);
		form.setEnabled("atdEstado", false);
		form.setEnabled("atdCidade", false);
		form.setEnabled("atdAtendimentoFinalizado", false);
		//Falha
		var indexTbFalha = form.getChildrenIndexes("falTbFalha");
		if(indexTbFalha.length > 0){
		    for (var i = 0; i < indexTbFalha.length; i++) { 
				form.setEnabled("falCodFalhaFamiliaItem___" + indexTbFalha[i], false);
				form.setEnabled("falModeloMaquinaItem___" + indexTbFalha[i], false);
				form.setEnabled("falGrupoMaquinaItem___" + indexTbFalha[i], false);
				form.setEnabled("falDescFalhaFalhaItem___" + indexTbFalha[i], false);
				form.setEnabled("falCodigoFalhaItem___" + indexTbFalha[i], false);
				form.setEnabled("falPendenciaItem___" + indexTbFalha[i], false);
			}
		}
		//Observações Gerais
		form.setEnabled("obsObservacoesGerais", false);
		
		
		//Comunicação - Solicitação
		form.setEnabled("solDescSetor", false);
		form.setEnabled("solStatus", false);
		form.setEnabled("solEncaminharSolicitacao", false);
		form.setEnabled("solFinalizarSolicitacao", false);
		
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
			    	form.setEnabled("comComTecnicoItem___" + indexTbComunicacao[i], false);
		    	}
		    }
		}
	}
}