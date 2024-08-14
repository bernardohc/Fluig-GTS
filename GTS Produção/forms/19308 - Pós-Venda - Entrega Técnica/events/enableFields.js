function enableFields(form){
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO || atv_atual == INICIO_0){
	
	}else if( atv_atual == FORMALIZA){
		
	}else if( atv_atual == GTS_ANALISA_CLIENTE){
		
		/*
		 * Cadastramento
		 */
		//Cadastro do Equipamento
		form.setEnabled("equipNumSerie", false);
		form.setEnabled("equipTipoNota", false);
		form.setEnabled("equipNumNotaFiscal", false);
		form.setEnabled("equipDescricao", false);
		form.setEnabled("equipModelo", false);
		form.setEnabled("equipAcoplamento", false);
		form.setEnabled("equipDataEntrega", false);
		form.setEnabled("equipDataTerminoGarantia", false);
		//Cadastro da Loja (Revenda Vinculada no Equipamento)
		form.setEnabled("revEquipRazaoSocialRevenda", false);
		form.setEnabled("revEquipNomeFantasiaRevenda", false);
		form.setEnabled("revEquipCodigo", false);
		form.setEnabled("revEquipLoja", false);
		form.setEnabled("revEquipCidade", false);
		form.setEnabled("revEquipEstado", false);
		form.setEnabled("revEquipClassPeca", false);
		form.setEnabled("revEquipClassServico", false);
		form.setEnabled("revEquipEmail", false);
		form.setEnabled("revEquipTelefone", false);
		//Cadastro da Loja (Revenda que está realizando a Entrega Técnica)
		form.setEnabled("revRazaoSocialRevenda", false);
		form.setEnabled("revNomeFantasiaRevenda", false);
		form.setEnabled("revCodigo", false);
		form.setEnabled("revLoja", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revClassPeca", false);
		form.setEnabled("revClassServico", false);
		form.setEnabled("revEmail", false);
		form.setEnabled("revTelefone", false);
		form.setEnabled("revContVendasNome", false);
		form.setEnabled("revContVendasTelefone", false);
		form.setEnabled("revContVendasEmail", false);
		form.setEnabled("revContPecasNome", false);
		form.setEnabled("revContPecasTelefone", false);
		form.setEnabled("revContPecasEmail", false);
		form.setEnabled("revContServicoNome", false);
		form.setEnabled("revContServicoTelefone", false);
		form.setEnabled("revContServicoEmail", false);
		form.setEnabled("revEntTecNome", false);
		form.setEnabled("revEntTecTelefone", false);
		form.setEnabled("revEntTecCpf", false);
		form.setEnabled("revEntTecRUC", false);
		form.setEnabled("revCienteTransfEquipRev", false);
		//Protocolo de Recebimento do Cliente Final
		form.setEnabled("protoRecResponsavel", false);
		form.setEnabled("protoRecTelefone", false);
		form.setEnabled("protoRecEmail", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecPossuiAvarias", false);
		form.setEnabled("protoRecCienteSemAvarias", false);
		var indexesProtoRecTbAvarias = form.getChildrenIndexes("protoRecTbAvarias");
		if(indexesProtoRecTbAvarias.length > 0){
		    for (var i = 0; i < indexesProtoRecTbAvarias.length; i++) { 
		    	form.setEnabled("protoRecAvariasDescricaoItem___" + indexesProtoRecTbAvarias[i], false);
		    }
		}
		//Cliente
		form.setEnabled("cliTelefonePesqSatisfacao", false);
		form.setEnabled("cliPossuiEquipamentoGTS", false);
		var indexesCliTbEquipamentos = form.getChildrenIndexes("cliTbEquipamentos");
		if(indexesCliTbEquipamentos.length > 0){
		    for (var i = 0; i < indexesCliTbEquipamentos.length; i++) { 
		    	form.setEnabled("cliEquipEquipamentoItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipModeloItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipAnoItem___" + indexesCliTbEquipamentos[i], false);
		    }
		}
		//Propriedade Rural do Cliente
		form.setEnabled("propRuralCidade", false);
		form.setEnabled("propRuralEstado", false);
		form.setEnabled("propRuralNomePropriedade", false);
		form.setEnabled("propRuralKmAtePropriedade", false);
		var indexesPropRuralTbPropriedadesRurais = form.getChildrenIndexes("propRuralTbPropriedadesRurais");
		if(indexesPropRuralTbPropriedadesRurais.length > 0){
		    for (var i = 0; i < indexesPropRuralTbPropriedadesRurais.length; i++) { 
		    	form.setEnabled("propRuralEntrega___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralCidadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralEstadoItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralNomePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralKmAtePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    }
		}
		//Km Total Utilizado
		form.setEnabled("atendKMTotalUtilizado", false);
		//Anexo
		
	}else if( atv_atual == ANALISA_ERRO_INTEGRACAO_BASE_ATENDIMENTO){
		
		/*
		 * Cadastramento
		 */
		//Cadastro do Equipamento
		form.setEnabled("equipNumSerie", false);
		form.setEnabled("equipTipoNota", false);
		form.setEnabled("equipNumNotaFiscal", false);
		form.setEnabled("equipDescricao", false);
		form.setEnabled("equipModelo", false);
		form.setEnabled("equipAcoplamento", false);
		form.setEnabled("equipDataEntrega", false);
		form.setEnabled("equipDataTerminoGarantia", false);
		//Cadastro da Loja (Revenda Vinculada no Equipamento)
		form.setEnabled("revEquipRazaoSocialRevenda", false);
		form.setEnabled("revEquipNomeFantasiaRevenda", false);
		form.setEnabled("revEquipCodigo", false);
		form.setEnabled("revEquipLoja", false);
		form.setEnabled("revEquipCidade", false);
		form.setEnabled("revEquipEstado", false);
		form.setEnabled("revEquipClassPeca", false);
		form.setEnabled("revEquipClassServico", false);
		form.setEnabled("revEquipEmail", false);
		form.setEnabled("revEquipTelefone", false);
		//Cadastro da Loja (Revenda que está realizando a Entrega Técnica)
		form.setEnabled("revRazaoSocialRevenda", false);
		form.setEnabled("revNomeFantasiaRevenda", false);
		form.setEnabled("revCodigo", false);
		form.setEnabled("revLoja", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revClassPeca", false);
		form.setEnabled("revClassServico", false);
		form.setEnabled("revEmail", false);
		form.setEnabled("revTelefone", false);
		form.setEnabled("revContVendasNome", false);
		form.setEnabled("revContVendasTelefone", false);
		form.setEnabled("revContVendasEmail", false);
		form.setEnabled("revContPecasNome", false);
		form.setEnabled("revContPecasTelefone", false);
		form.setEnabled("revContPecasEmail", false);
		form.setEnabled("revContServicoNome", false);
		form.setEnabled("revContServicoTelefone", false);
		form.setEnabled("revContServicoEmail", false);
		form.setEnabled("revEntTecNome", false);
		form.setEnabled("revEntTecTelefone", false);
		form.setEnabled("revEntTecCpf", false);
		form.setEnabled("revEntTecRUC", false);
		form.setEnabled("revCienteTransfEquipRev", false);
		//Protocolo de Recebimento do Cliente Final
		form.setEnabled("protoRecResponsavel", false);
		form.setEnabled("protoRecTelefone", false);
		form.setEnabled("protoRecEmail", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecPossuiAvarias", false);
		form.setEnabled("protoRecCienteSemAvarias", false);
		var indexesProtoRecTbAvarias = form.getChildrenIndexes("protoRecTbAvarias");
		if(indexesProtoRecTbAvarias.length > 0){
		    for (var i = 0; i < indexesProtoRecTbAvarias.length; i++) { 
		    	form.setEnabled("protoRecAvariasDescricaoItem___" + indexesProtoRecTbAvarias[i], false);
		    }
		}
		//Cliente
		form.setEnabled("cliPais", false);
		form.setEnabled("cliCpfCnpj", false);
		form.setEnabled("cliRUC", false);
		form.setEnabled("cliNomeCliente", false);
		form.setEnabled("cliInscricaoEstadual", false);
		form.setEnabled("cliTelefonePesqSatisfacao", false);
		form.setEnabled("cliPossuiEquipamentoGTS", false);
		var indexesCliTbEquipamentos = form.getChildrenIndexes("cliTbEquipamentos");
		if(indexesCliTbEquipamentos.length > 0){
		    for (var i = 0; i < indexesCliTbEquipamentos.length; i++) { 
		    	form.setEnabled("cliEquipEquipamentoItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipModeloItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipAnoItem___" + indexesCliTbEquipamentos[i], false);
		    }
		}
		//Propriedade Rural do Cliente
		form.setEnabled("propRuralCidade", false);
		form.setEnabled("propRuralEstado", false);
		form.setEnabled("propRuralNomePropriedade", false);
		form.setEnabled("propRuralKmAtePropriedade", false);
		var indexesPropRuralTbPropriedadesRurais = form.getChildrenIndexes("propRuralTbPropriedadesRurais");
		if(indexesPropRuralTbPropriedadesRurais.length > 0){
		    for (var i = 0; i < indexesPropRuralTbPropriedadesRurais.length; i++) { 
		    	form.setEnabled("propRuralEntrega___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralCidadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralEstadoItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralNomePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralKmAtePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    }
		}
		//Km Total Utilizado
		form.setEnabled("atendKMTotalUtilizado", false);
		//Anexo
		//Observação Geral
		form.setEnabled("obsObservacaoGeral", false);
		
		
	}else if( atv_atual == GTS_ANALISA_DEMANDA){
		/*
		 * Cadastramento
		 */
		//Cadastro do Equipamento
		form.setEnabled("equipNumSerie", false);
		form.setEnabled("equipTipoNota", false);
		form.setEnabled("equipNumNotaFiscal", false);
		form.setEnabled("equipDescricao", false);
		form.setEnabled("equipModelo", false);
		form.setEnabled("equipAcoplamento", false);
		form.setEnabled("equipDataEntrega", false);
		form.setEnabled("equipDataTerminoGarantia", false);
		//Cadastro da Loja (Revenda Vinculada no Equipamento)
		form.setEnabled("revEquipRazaoSocialRevenda", false);
		form.setEnabled("revEquipNomeFantasiaRevenda", false);
		form.setEnabled("revEquipCodigo", false);
		form.setEnabled("revEquipLoja", false);
		form.setEnabled("revEquipCidade", false);
		form.setEnabled("revEquipEstado", false);
		form.setEnabled("revEquipClassPeca", false);
		form.setEnabled("revEquipClassServico", false);
		form.setEnabled("revEquipEmail", false);
		form.setEnabled("revEquipTelefone", false);
		//Cadastro da Loja (Revenda que está realizando a Entrega Técnica)
		form.setEnabled("revRazaoSocialRevenda", false);
		form.setEnabled("revNomeFantasiaRevenda", false);
		form.setEnabled("revCodigo", false);
		form.setEnabled("revLoja", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revClassPeca", false);
		form.setEnabled("revClassServico", false);
		form.setEnabled("revEmail", false);
		form.setEnabled("revTelefone", false);
		form.setEnabled("revContVendasNome", false);
		form.setEnabled("revContVendasTelefone", false);
		form.setEnabled("revContVendasEmail", false);
		form.setEnabled("revContPecasNome", false);
		form.setEnabled("revContPecasTelefone", false);
		form.setEnabled("revContPecasEmail", false);
		form.setEnabled("revContServicoNome", false);
		form.setEnabled("revContServicoTelefone", false);
		form.setEnabled("revContServicoEmail", false);
		form.setEnabled("revEntTecNome", false);
		form.setEnabled("revEntTecTelefone", false);
		form.setEnabled("revEntTecCpf", false);
		form.setEnabled("revEntTecRUC", false);
		form.setEnabled("revCienteTransfEquipRev", false);
		//Protocolo de Recebimento do Cliente Final
		form.setEnabled("protoRecResponsavel", false);
		form.setEnabled("protoRecTelefone", false);
		form.setEnabled("protoRecEmail", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecPossuiAvarias", false);
		form.setEnabled("protoRecCienteSemAvarias", false);
		var indexesProtoRecTbAvarias = form.getChildrenIndexes("protoRecTbAvarias");
		if(indexesProtoRecTbAvarias.length > 0){
		    for (var i = 0; i < indexesProtoRecTbAvarias.length; i++) { 
		    	form.setEnabled("protoRecAvariasDescricaoItem___" + indexesProtoRecTbAvarias[i], false);
		    }
		}
		//Cliente
		form.setEnabled("cliPais", false);
		form.setEnabled("cliCpfCnpj", false);
		form.setEnabled("cliRUC", false);
		form.setEnabled("cliNomeCliente", false);
		form.setEnabled("cliInscricaoEstadual", false);
		form.setEnabled("cliCEP", false);
		form.setEnabled("cliEndereco", false);
		form.setEnabled("cliBairro", false);
		form.setEnabled("cliComplemento", false);
		form.setEnabled("cliCidade", false);
		form.setEnabled("cliEstado", false);
		form.setEnabled("cliTelefone", false);
		form.setEnabled("cliEmail", false);
		form.setEnabled("cliTelefonePesqSatisfacao", false);
		form.setEnabled("cliPossuiEquipamentoGTS", false);
		var indexesCliTbEquipamentos = form.getChildrenIndexes("cliTbEquipamentos");
		if(indexesCliTbEquipamentos.length > 0){
		    for (var i = 0; i < indexesCliTbEquipamentos.length; i++) { 
		    	form.setEnabled("cliEquipEquipamentoItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipModeloItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipAnoItem___" + indexesCliTbEquipamentos[i], false);
		    }
		}
		//Propriedade Rural do Cliente
		form.setEnabled("propRuralCidade", false);
		form.setEnabled("propRuralEstado", false);
		form.setEnabled("propRuralNomePropriedade", false);
		form.setEnabled("propRuralKmAtePropriedade", false);
		var indexesPropRuralTbPropriedadesRurais = form.getChildrenIndexes("propRuralTbPropriedadesRurais");
		if(indexesPropRuralTbPropriedadesRurais.length > 0){
		    for (var i = 0; i < indexesPropRuralTbPropriedadesRurais.length; i++) { 
		    	form.setEnabled("propRuralEntrega___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralCidadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralEstadoItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralNomePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralKmAtePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    }
		}
		//Km Total Utilizado
		form.setEnabled("atendKMTotalUtilizado", false);
		//Anexo
		//Observação Geral
		form.setEnabled("obsObservacaoGeral", false);
		
		//Emissão NF/Forma Pagamento
		if(form.getValue("tipoSolicitante") == 'Administrativo GTS' || form.getValue("equipNumSerie").substring(0, 3) == 'FGS'){
			form.setEnabled("NFvalValorEntrega", false);
			form.setEnabled("NFvalValorDeslocamento", false);
			form.setEnabled("NFvalValorAddEntrega", false);
			form.setEnabled("NFvalValorAddDeslocamento", false);
			form.setEnabled("NFvalObservacao", false);
		}
		
	}else if( atv_atual == ANALISA_RETORNO_GTS){	
		
		//Observação Geral
		//Aprovação Entrega Técnica
		form.setEnabled("entTecAprov", false);
		form.setEnabled("entTecAprovObservacao", false);
		
		//Cliente
		form.setEnabled("cliRUC", false);
		
		
	}else if( atv_atual == REVENDA_NF_PGTO){
		
		/*
		 * Cadastramento
		 */
		//Cadastro do Equipamento
		form.setEnabled("equipNumSerie", false);
		form.setEnabled("equipTipoNota", false);
		form.setEnabled("equipNumNotaFiscal", false);
		form.setEnabled("equipDescricao", false);
		form.setEnabled("equipModelo", false);
		form.setEnabled("equipAcoplamento", false);
		form.setEnabled("equipDataEntrega", false);
		form.setEnabled("equipDataTerminoGarantia", false);
		//Cadastro da Loja (Revenda Vinculada no Equipamento)
		form.setEnabled("revEquipRazaoSocialRevenda", false);
		form.setEnabled("revEquipNomeFantasiaRevenda", false);
		form.setEnabled("revEquipCodigo", false);
		form.setEnabled("revEquipLoja", false);
		form.setEnabled("revEquipCidade", false);
		form.setEnabled("revEquipEstado", false);
		form.setEnabled("revEquipClassPeca", false);
		form.setEnabled("revEquipClassServico", false);
		form.setEnabled("revEquipEmail", false);
		form.setEnabled("revEquipTelefone", false);
		//Cadastro da Loja (Revenda que está realizando a Entrega Técnica)
		form.setEnabled("revRazaoSocialRevenda", false);
		form.setEnabled("revNomeFantasiaRevenda", false);
		form.setEnabled("revCodigo", false);
		form.setEnabled("revLoja", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revClassPeca", false);
		form.setEnabled("revClassServico", false);
		form.setEnabled("revEmail", false);
		form.setEnabled("revTelefone", false);
		form.setEnabled("revContVendasNome", false);
		form.setEnabled("revContVendasTelefone", false);
		form.setEnabled("revContVendasEmail", false);
		form.setEnabled("revContPecasNome", false);
		form.setEnabled("revContPecasTelefone", false);
		form.setEnabled("revContPecasEmail", false);
		form.setEnabled("revContServicoNome", false);
		form.setEnabled("revContServicoTelefone", false);
		form.setEnabled("revContServicoEmail", false);
		form.setEnabled("revEntTecNome", false);
		form.setEnabled("revEntTecTelefone", false);
		form.setEnabled("revEntTecCpf", false);
		form.setEnabled("revEntTecRUC", false);
		form.setEnabled("revCienteTransfEquipRev", false);
		//Protocolo de Recebimento do Cliente Final
		form.setEnabled("protoRecResponsavel", false);
		form.setEnabled("protoRecTelefone", false);
		form.setEnabled("protoRecEmail", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecPossuiAvarias", false);
		form.setEnabled("protoRecCienteSemAvarias", false);
		var indexesProtoRecTbAvarias = form.getChildrenIndexes("protoRecTbAvarias");
		if(indexesProtoRecTbAvarias.length > 0){
		    for (var i = 0; i < indexesProtoRecTbAvarias.length; i++) { 
		    	form.setEnabled("protoRecAvariasDescricaoItem___" + indexesProtoRecTbAvarias[i], false);
		    }
		}
		//Cliente
		form.setEnabled("cliPais", false);
		form.setEnabled("cliCpfCnpj", false);
		form.setEnabled("cliRUC", false);
		form.setEnabled("cliNomeCliente", false);
		form.setEnabled("cliInscricaoEstadual", false);
		form.setEnabled("cliCEP", false);
		form.setEnabled("cliEndereco", false);
		form.setEnabled("cliBairro", false);
		form.setEnabled("cliComplemento", false);
		form.setEnabled("cliCidade", false);
		form.setEnabled("cliEstado", false);
		form.setEnabled("cliTelefone", false);
		form.setEnabled("cliEmail", false);
		form.setEnabled("cliTelefonePesqSatisfacao", false);
		form.setEnabled("cliPossuiEquipamentoGTS", false);
		var indexesCliTbEquipamentos = form.getChildrenIndexes("cliTbEquipamentos");
		if(indexesCliTbEquipamentos.length > 0){
		    for (var i = 0; i < indexesCliTbEquipamentos.length; i++) { 
		    	form.setEnabled("cliEquipEquipamentoItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipModeloItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipAnoItem___" + indexesCliTbEquipamentos[i], false);
		    }
		}
		//Propriedade Rural do Cliente
		form.setEnabled("propRuralCidade", false);
		form.setEnabled("propRuralEstado", false);
		form.setEnabled("propRuralNomePropriedade", false);
		form.setEnabled("propRuralKmAtePropriedade", false);
		var indexesPropRuralTbPropriedadesRurais = form.getChildrenIndexes("propRuralTbPropriedadesRurais");
		if(indexesPropRuralTbPropriedadesRurais.length > 0){
		    for (var i = 0; i < indexesPropRuralTbPropriedadesRurais.length; i++) { 
		    	form.setEnabled("propRuralEntrega___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralCidadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralEstadoItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralNomePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralKmAtePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    }
		}
		//Km Total Utilizado
		form.setEnabled("atendKMTotalUtilizado", false);
		//Anexo
		//Observação Geral
		form.setEnabled("obsObservacaoGeral", false);
		
		/*
		 * Emissão NF/Forma Pagamento
		 */
		//Valores
		form.setEnabled("NFvalValorEntrega", false);
		form.setEnabled("NFvalValorDeslocamento", false);
		form.setEnabled("NFvalValorAddEntrega", false);
		form.setEnabled("NFvalValorAddDeslocamento", false);
		form.setEnabled("NFvalValorTotal", false);
		form.setEnabled("NFvalObservacao", false);
		
		//Aprovação
		form.setEnabled("NFAprovAprovacao", false);
		form.setEnabled("NFAprovObservacao", false);
		form.setEnabled("NFAprovDataPrevPagto", false);
	}else if( atv_atual == GTS_ANALISA_NF_PGTO){
		
		/*
		 * Cadastramento
		 */
		//Cadastro do Equipamento
		form.setEnabled("equipNumSerie", false);
		form.setEnabled("equipTipoNota", false);
		form.setEnabled("equipNumNotaFiscal", false);
		form.setEnabled("equipDescricao", false);
		form.setEnabled("equipModelo", false);
		form.setEnabled("equipAcoplamento", false);
		form.setEnabled("equipDataEntrega", false);
		form.setEnabled("equipDataTerminoGarantia", false);
		//Cadastro da Loja (Revenda Vinculada no Equipamento)
		form.setEnabled("revEquipRazaoSocialRevenda", false);
		form.setEnabled("revEquipNomeFantasiaRevenda", false);
		form.setEnabled("revEquipCodigo", false);
		form.setEnabled("revEquipLoja", false);
		form.setEnabled("revEquipCidade", false);
		form.setEnabled("revEquipEstado", false);
		form.setEnabled("revEquipClassPeca", false);
		form.setEnabled("revEquipClassServico", false);
		form.setEnabled("revEquipEmail", false);
		form.setEnabled("revEquipTelefone", false);
		//Cadastro da Loja (Revenda que está realizando a Entrega Técnica)
		form.setEnabled("revRazaoSocialRevenda", false);
		form.setEnabled("revNomeFantasiaRevenda", false);
		form.setEnabled("revCodigo", false);
		form.setEnabled("revLoja", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revClassPeca", false);
		form.setEnabled("revClassServico", false);
		form.setEnabled("revEmail", false);
		form.setEnabled("revTelefone", false);
		form.setEnabled("revContVendasNome", false);
		form.setEnabled("revContVendasTelefone", false);
		form.setEnabled("revContVendasEmail", false);
		form.setEnabled("revContPecasNome", false);
		form.setEnabled("revContPecasTelefone", false);
		form.setEnabled("revContPecasEmail", false);
		form.setEnabled("revContServicoNome", false);
		form.setEnabled("revContServicoTelefone", false);
		form.setEnabled("revContServicoEmail", false);
		form.setEnabled("revEntTecNome", false);
		form.setEnabled("revEntTecTelefone", false);
		form.setEnabled("revEntTecCpf", false);
		form.setEnabled("revEntTecRUC", false);
		form.setEnabled("revCienteTransfEquipRev", false);
		//Protocolo de Recebimento do Cliente Final
		form.setEnabled("protoRecResponsavel", false);
		form.setEnabled("protoRecTelefone", false);
		form.setEnabled("protoRecEmail", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecPossuiAvarias", false);
		form.setEnabled("protoRecCienteSemAvarias", false);
		var indexesProtoRecTbAvarias = form.getChildrenIndexes("protoRecTbAvarias");
		if(indexesProtoRecTbAvarias.length > 0){
		    for (var i = 0; i < indexesProtoRecTbAvarias.length; i++) { 
		    	form.setEnabled("protoRecAvariasDescricaoItem___" + indexesProtoRecTbAvarias[i], false);
		    }
		}
		//Cliente
		form.setEnabled("cliPais", false);
		form.setEnabled("cliCpfCnpj", false);
		form.setEnabled("cliRUC", false);
		form.setEnabled("cliNomeCliente", false);
		form.setEnabled("cliInscricaoEstadual", false);
		form.setEnabled("cliCEP", false);
		form.setEnabled("cliEndereco", false);
		form.setEnabled("cliBairro", false);
		form.setEnabled("cliComplemento", false);
		form.setEnabled("cliCidade", false);
		form.setEnabled("cliEstado", false);
		form.setEnabled("cliTelefone", false);
		form.setEnabled("cliEmail", false);
		form.setEnabled("cliTelefonePesqSatisfacao", false);
		form.setEnabled("cliPossuiEquipamentoGTS", false);
		var indexesCliTbEquipamentos = form.getChildrenIndexes("cliTbEquipamentos");
		if(indexesCliTbEquipamentos.length > 0){
		    for (var i = 0; i < indexesCliTbEquipamentos.length; i++) { 
		    	form.setEnabled("cliEquipEquipamentoItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipModeloItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipAnoItem___" + indexesCliTbEquipamentos[i], false);
		    }
		}
		//Propriedade Rural do Cliente
		form.setEnabled("propRuralCidade", false);
		form.setEnabled("propRuralEstado", false);
		form.setEnabled("propRuralNomePropriedade", false);
		form.setEnabled("propRuralKmAtePropriedade", false);
		var indexesPropRuralTbPropriedadesRurais = form.getChildrenIndexes("propRuralTbPropriedadesRurais");
		if(indexesPropRuralTbPropriedadesRurais.length > 0){
		    for (var i = 0; i < indexesPropRuralTbPropriedadesRurais.length; i++) { 
		    	form.setEnabled("propRuralEntrega___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralCidadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralEstadoItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralNomePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralKmAtePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    }
		}
		//Km Total Utilizado
		form.setEnabled("atendKMTotalUtilizado", false);
		//Anexo
		//Observação Geral
		form.setEnabled("obsObservacaoGeral", false);
		
		/*
		 * Emissão NF/Forma Pagamento
		 */
		//Valores
		form.setEnabled("NFvalValorEntrega", false);
		form.setEnabled("NFvalValorDeslocamento", false);
		form.setEnabled("NFvalValorAddEntrega", false);
		form.setEnabled("NFvalValorAddDeslocamento", false);
		form.setEnabled("NFvalValorTotal", false);
		form.setEnabled("NFvalObservacao", false);
		
		//Nota Fiscal/Forma de Pagamento
		form.setEnabled("NFPagtoFormaPagamento", false);
		form.setEnabled("NFPagtoBanco", false);
		form.setEnabled("NFPagtoAgencia", false);
		form.setEnabled("NFPagtoConta", false);
		form.setEnabled("NFPagtoCodIdentificador", false);
		form.setEnabled("NFPagtoNome", false);
		form.setEnabled("NFPagtoCpfCnpj", false);
		
	}else if( atv_atual == ANALISA_ERRO_EMAIL_CONFIRM_PGTO){
		
		/*
		 * Cadastramento
		 */
		//Cadastro do Equipamento
		form.setEnabled("equipNumSerie", false);
		form.setEnabled("equipTipoNota", false);
		form.setEnabled("equipNumNotaFiscal", false);
		form.setEnabled("equipDescricao", false);
		form.setEnabled("equipModelo", false);
		form.setEnabled("equipAcoplamento", false);
		form.setEnabled("equipDataEntrega", false);
		form.setEnabled("equipDataTerminoGarantia", false);
		//Cadastro da Loja (Revenda Vinculada no Equipamento)
		form.setEnabled("revEquipRazaoSocialRevenda", false);
		form.setEnabled("revEquipNomeFantasiaRevenda", false);
		form.setEnabled("revEquipCodigo", false);
		form.setEnabled("revEquipLoja", false);
		form.setEnabled("revEquipCidade", false);
		form.setEnabled("revEquipEstado", false);
		form.setEnabled("revEquipClassPeca", false);
		form.setEnabled("revEquipClassServico", false);
		form.setEnabled("revEquipEmail", false);
		form.setEnabled("revEquipTelefone", false);
		//Cadastro da Loja (Revenda que está realizando a Entrega Técnica)
		form.setEnabled("revRazaoSocialRevenda", false);
		form.setEnabled("revNomeFantasiaRevenda", false);
		form.setEnabled("revCodigo", false);
		form.setEnabled("revLoja", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revClassPeca", false);
		form.setEnabled("revClassServico", false);
		form.setEnabled("revEmail", false);
		form.setEnabled("revTelefone", false);
		form.setEnabled("revContVendasNome", false);
		form.setEnabled("revContVendasTelefone", false);
		form.setEnabled("revContVendasEmail", false);
		form.setEnabled("revContPecasNome", false);
		form.setEnabled("revContPecasTelefone", false);
		form.setEnabled("revContPecasEmail", false);
//		form.setEnabled("revContServicoNome", false);
//		form.setEnabled("revContServicoTelefone", false);
//		form.setEnabled("revContServicoEmail", false);
		form.setEnabled("revEntTecNome", false);
		form.setEnabled("revEntTecTelefone", false);
		form.setEnabled("revEntTecCpf", false);
		form.setEnabled("revEntTecRUC", false);
		form.setEnabled("revCienteTransfEquipRev", false);
		//Protocolo de Recebimento do Cliente Final
		form.setEnabled("protoRecResponsavel", false);
		form.setEnabled("protoRecTelefone", false);
		form.setEnabled("protoRecEmail", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecPossuiAvarias", false);
		form.setEnabled("protoRecCienteSemAvarias", false);
		var indexesProtoRecTbAvarias = form.getChildrenIndexes("protoRecTbAvarias");
		if(indexesProtoRecTbAvarias.length > 0){
		    for (var i = 0; i < indexesProtoRecTbAvarias.length; i++) { 
		    	form.setEnabled("protoRecAvariasDescricaoItem___" + indexesProtoRecTbAvarias[i], false);
		    }
		}
		//Cliente
		form.setEnabled("cliPais", false);
		form.setEnabled("cliCpfCnpj", false);
		form.setEnabled("cliRUC", false);
		form.setEnabled("cliNomeCliente", false);
		form.setEnabled("cliInscricaoEstadual", false);
		form.setEnabled("cliCEP", false);
		form.setEnabled("cliEndereco", false);
		form.setEnabled("cliBairro", false);
		form.setEnabled("cliComplemento", false);
		form.setEnabled("cliCidade", false);
		form.setEnabled("cliEstado", false);
		form.setEnabled("cliTelefone", false);
		form.setEnabled("cliEmail", false);
		form.setEnabled("cliTelefonePesqSatisfacao", false);
		form.setEnabled("cliPossuiEquipamentoGTS", false);
		var indexesCliTbEquipamentos = form.getChildrenIndexes("cliTbEquipamentos");
		if(indexesCliTbEquipamentos.length > 0){
		    for (var i = 0; i < indexesCliTbEquipamentos.length; i++) { 
		    	form.setEnabled("cliEquipEquipamentoItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipModeloItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipAnoItem___" + indexesCliTbEquipamentos[i], false);
		    }
		}
		//Propriedade Rural do Cliente
		form.setEnabled("propRuralCidade", false);
		form.setEnabled("propRuralEstado", false);
		form.setEnabled("propRuralNomePropriedade", false);
		form.setEnabled("propRuralKmAtePropriedade", false);
		var indexesPropRuralTbPropriedadesRurais = form.getChildrenIndexes("propRuralTbPropriedadesRurais");
		if(indexesPropRuralTbPropriedadesRurais.length > 0){
		    for (var i = 0; i < indexesPropRuralTbPropriedadesRurais.length; i++) { 
		    	form.setEnabled("propRuralEntrega___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralCidadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralEstadoItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralNomePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralKmAtePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    }
		}
		//Km Total Utilizado
		form.setEnabled("atendKMTotalUtilizado", false);
		//Anexo
		//Observação Geral
		form.setEnabled("obsObservacaoGeral", false);
		
		/*
		 * Emissão NF/Forma Pagamento
		 */
		//Valores
		form.setEnabled("NFvalValorEntrega", false);
		form.setEnabled("NFvalValorDeslocamento", false);
		form.setEnabled("NFvalValorAddEntrega", false);
		form.setEnabled("NFvalValorAddDeslocamento", false);
		form.setEnabled("NFvalValorTotal", false);
		form.setEnabled("NFvalObservacao", false);
		
		//Nota Fiscal/Forma de Pagamento
		form.setEnabled("NFPagtoFormaPagamento", false);
		form.setEnabled("NFPagtoBanco", false);
		form.setEnabled("NFPagtoAgencia", false);
		form.setEnabled("NFPagtoConta", false);
		form.setEnabled("NFPagtoCodIdentificador", false);
		form.setEnabled("NFPagtoNome", false);
		form.setEnabled("NFPagtoCpfCnpj", false);
		
		//Aprovação
		form.setEnabled("NFAprovAprovacao", false);
		form.setEnabled("NFAprovObservacao", false);
		form.setEnabled("NFAprovDataPrevPagto", false);
		
		
		/*
		 * Programação para pagamento
		 */
		form.setEnabled("OCEmailRecebimentoOC", false);
		form.setEnabled("OCConfirmaDados", false);
		
	}else if( atv_atual == ANALISA_ERRO_INTEGRACAO_OC){
		
		/*
		 * Cadastramento
		 */
		//Cadastro do Equipamento
		form.setEnabled("equipNumSerie", false);
		form.setEnabled("equipTipoNota", false);
		form.setEnabled("equipNumNotaFiscal", false);
		form.setEnabled("equipDescricao", false);
		form.setEnabled("equipModelo", false);
		form.setEnabled("equipAcoplamento", false);
		form.setEnabled("equipDataEntrega", false);
		form.setEnabled("equipDataTerminoGarantia", false);
		//Cadastro da Loja (Revenda Vinculada no Equipamento)
		form.setEnabled("revEquipRazaoSocialRevenda", false);
		form.setEnabled("revEquipNomeFantasiaRevenda", false);
		form.setEnabled("revEquipCodigo", false);
		form.setEnabled("revEquipLoja", false);
		form.setEnabled("revEquipCidade", false);
		form.setEnabled("revEquipEstado", false);
		form.setEnabled("revEquipClassPeca", false);
		form.setEnabled("revEquipClassServico", false);
		form.setEnabled("revEquipEmail", false);
		form.setEnabled("revEquipTelefone", false);
		//Cadastro da Loja (Revenda que está realizando a Entrega Técnica)
		form.setEnabled("revRazaoSocialRevenda", false);
		form.setEnabled("revNomeFantasiaRevenda", false);
		form.setEnabled("revCodigo", false);
		form.setEnabled("revLoja", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revClassPeca", false);
		form.setEnabled("revClassServico", false);
		form.setEnabled("revEmail", false);
		form.setEnabled("revTelefone", false);
		form.setEnabled("revContVendasNome", false);
		form.setEnabled("revContVendasTelefone", false);
		form.setEnabled("revContVendasEmail", false);
		form.setEnabled("revContPecasNome", false);
		form.setEnabled("revContPecasTelefone", false);
		form.setEnabled("revContPecasEmail", false);
		form.setEnabled("revContServicoNome", false);
		form.setEnabled("revContServicoTelefone", false);
		form.setEnabled("revContServicoEmail", false);
		form.setEnabled("revEntTecNome", false);
		form.setEnabled("revEntTecTelefone", false);
		form.setEnabled("revEntTecCpf", false);
		form.setEnabled("revEntTecRUC", false);
		form.setEnabled("revCienteTransfEquipRev", false);
		//Protocolo de Recebimento do Cliente Final
		form.setEnabled("protoRecResponsavel", false);
		form.setEnabled("protoRecTelefone", false);
		form.setEnabled("protoRecEmail", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecPossuiAvarias", false);
		form.setEnabled("protoRecCienteSemAvarias", false);
		var indexesProtoRecTbAvarias = form.getChildrenIndexes("protoRecTbAvarias");
		if(indexesProtoRecTbAvarias.length > 0){
		    for (var i = 0; i < indexesProtoRecTbAvarias.length; i++) { 
		    	form.setEnabled("protoRecAvariasDescricaoItem___" + indexesProtoRecTbAvarias[i], false);
		    }
		}
		//Cliente
		form.setEnabled("cliPais", false);
		form.setEnabled("cliCpfCnpj", false);
		form.setEnabled("cliRUC", false);
		form.setEnabled("cliNomeCliente", false);
		form.setEnabled("cliInscricaoEstadual", false);
		form.setEnabled("cliCEP", false);
		form.setEnabled("cliEndereco", false);
		form.setEnabled("cliBairro", false);
		form.setEnabled("cliComplemento", false);
		form.setEnabled("cliCidade", false);
		form.setEnabled("cliEstado", false);
		form.setEnabled("cliTelefone", false);
		form.setEnabled("cliEmail", false);
		form.setEnabled("cliTelefonePesqSatisfacao", false);
		form.setEnabled("cliPossuiEquipamentoGTS", false);
		var indexesCliTbEquipamentos = form.getChildrenIndexes("cliTbEquipamentos");
		if(indexesCliTbEquipamentos.length > 0){
		    for (var i = 0; i < indexesCliTbEquipamentos.length; i++) { 
		    	form.setEnabled("cliEquipEquipamentoItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipModeloItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipAnoItem___" + indexesCliTbEquipamentos[i], false);
		    }
		}
		//Propriedade Rural do Cliente
		form.setEnabled("propRuralCidade", false);
		form.setEnabled("propRuralEstado", false);
		form.setEnabled("propRuralNomePropriedade", false);
		form.setEnabled("propRuralKmAtePropriedade", false);
		var indexesPropRuralTbPropriedadesRurais = form.getChildrenIndexes("propRuralTbPropriedadesRurais");
		if(indexesPropRuralTbPropriedadesRurais.length > 0){
		    for (var i = 0; i < indexesPropRuralTbPropriedadesRurais.length; i++) { 
		    	form.setEnabled("propRuralEntrega___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralCidadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralEstadoItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralNomePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralKmAtePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    }
		}
		//Km Total Utilizado
		form.setEnabled("atendKMTotalUtilizado", false);
		//Anexo
		//Observação Geral
		form.setEnabled("obsObservacaoGeral", false);
		
		/*
		 * Emissão NF/Forma Pagamento
		 */
		//Valores
		form.setEnabled("NFvalValorEntrega", false);
		form.setEnabled("NFvalValorDeslocamento", false);
		form.setEnabled("NFvalValorAddEntrega", false);
		form.setEnabled("NFvalValorAddDeslocamento", false);
		form.setEnabled("NFvalValorTotal", false);
		form.setEnabled("NFvalObservacao", false);
		
		//Nota Fiscal/Forma de Pagamento
		form.setEnabled("NFPagtoFormaPagamento", false);
		form.setEnabled("NFPagtoBanco", false);
		form.setEnabled("NFPagtoAgencia", false);
		form.setEnabled("NFPagtoConta", false);
		form.setEnabled("NFPagtoCodIdentificador", false);
		form.setEnabled("NFPagtoNome", false);
		form.setEnabled("NFPagtoCpfCnpj", false);
		
		//Aprovação
		form.setEnabled("NFAprovAprovacao", false);
		form.setEnabled("NFAprovObservacao", false);
		form.setEnabled("NFAprovDataPrevPagto", false);
		
		
		/*
		 * Programação para pagamento
		 */
		form.setEnabled("OCConfirmaDados", false);
		
	}else if( atv_atual == ANALISA_ERRO_EMAIL_FINANC_FISCAL){
		
		/*
		 * Cadastramento
		 */
		//Cadastro do Equipamento
		form.setEnabled("equipNumSerie", false);
		form.setEnabled("equipTipoNota", false);
		form.setEnabled("equipNumNotaFiscal", false);
		form.setEnabled("equipDescricao", false);
		form.setEnabled("equipModelo", false);
		form.setEnabled("equipAcoplamento", false);
		form.setEnabled("equipDataEntrega", false);
		form.setEnabled("equipDataTerminoGarantia", false);
		//Cadastro da Loja (Revenda Vinculada no Equipamento)
		form.setEnabled("revEquipRazaoSocialRevenda", false);
		form.setEnabled("revEquipNomeFantasiaRevenda", false);
		form.setEnabled("revEquipCodigo", false);
		form.setEnabled("revEquipLoja", false);
		form.setEnabled("revEquipCidade", false);
		form.setEnabled("revEquipEstado", false);
		form.setEnabled("revEquipClassPeca", false);
		form.setEnabled("revEquipClassServico", false);
		form.setEnabled("revEquipEmail", false);
		form.setEnabled("revEquipTelefone", false);
		//Cadastro da Loja (Revenda que está realizando a Entrega Técnica)
		form.setEnabled("revRazaoSocialRevenda", false);
		form.setEnabled("revNomeFantasiaRevenda", false);
		form.setEnabled("revCodigo", false);
		form.setEnabled("revLoja", false);
		form.setEnabled("revCidade", false);
		form.setEnabled("revEstado", false);
		form.setEnabled("revClassPeca", false);
		form.setEnabled("revClassServico", false);
		form.setEnabled("revEmail", false);
		form.setEnabled("revTelefone", false);
		form.setEnabled("revContVendasNome", false);
		form.setEnabled("revContVendasTelefone", false);
		form.setEnabled("revContVendasEmail", false);
		form.setEnabled("revContPecasNome", false);
		form.setEnabled("revContPecasTelefone", false);
		form.setEnabled("revContPecasEmail", false);
		form.setEnabled("revContServicoNome", false);
		form.setEnabled("revContServicoTelefone", false);
		form.setEnabled("revContServicoEmail", false);
		form.setEnabled("revEntTecNome", false);
		form.setEnabled("revEntTecTelefone", false);
		form.setEnabled("revEntTecCpf", false);
		form.setEnabled("revEntTecRUC", false);
		form.setEnabled("revCienteTransfEquipRev", false);
		//Protocolo de Recebimento do Cliente Final
		form.setEnabled("protoRecResponsavel", false);
		form.setEnabled("protoRecTelefone", false);
		form.setEnabled("protoRecEmail", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecDataRecebimento", false);
		form.setEnabled("protoRecPossuiAvarias", false);
		form.setEnabled("protoRecCienteSemAvarias", false);
		var indexesProtoRecTbAvarias = form.getChildrenIndexes("protoRecTbAvarias");
		if(indexesProtoRecTbAvarias.length > 0){
		    for (var i = 0; i < indexesProtoRecTbAvarias.length; i++) { 
		    	form.setEnabled("protoRecAvariasDescricaoItem___" + indexesProtoRecTbAvarias[i], false);
		    }
		}
		//Cliente
		form.setEnabled("cliPais", false);
		form.setEnabled("cliCpfCnpj", false);
		form.setEnabled("cliRUC", false);
		form.setEnabled("cliNomeCliente", false);
		form.setEnabled("cliInscricaoEstadual", false);
		form.setEnabled("cliCEP", false);
		form.setEnabled("cliEndereco", false);
		form.setEnabled("cliBairro", false);
		form.setEnabled("cliComplemento", false);
		form.setEnabled("cliCidade", false);
		form.setEnabled("cliEstado", false);
		form.setEnabled("cliTelefone", false);
		form.setEnabled("cliEmail", false);
		form.setEnabled("cliTelefonePesqSatisfacao", false);
		form.setEnabled("cliPossuiEquipamentoGTS", false);
		var indexesCliTbEquipamentos = form.getChildrenIndexes("cliTbEquipamentos");
		if(indexesCliTbEquipamentos.length > 0){
		    for (var i = 0; i < indexesCliTbEquipamentos.length; i++) { 
		    	form.setEnabled("cliEquipEquipamentoItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipModeloItem___" + indexesCliTbEquipamentos[i], false);
		    	form.setEnabled("cliEquipAnoItem___" + indexesCliTbEquipamentos[i], false);
		    }
		}
		//Propriedade Rural do Cliente
		form.setEnabled("propRuralCidade", false);
		form.setEnabled("propRuralEstado", false);
		form.setEnabled("propRuralNomePropriedade", false);
		form.setEnabled("propRuralKmAtePropriedade", false);
		var indexesPropRuralTbPropriedadesRurais = form.getChildrenIndexes("propRuralTbPropriedadesRurais");
		if(indexesPropRuralTbPropriedadesRurais.length > 0){
		    for (var i = 0; i < indexesPropRuralTbPropriedadesRurais.length; i++) { 
		    	form.setEnabled("propRuralEntrega___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralCidadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralEstadoItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralNomePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    	form.setEnabled("propRuralKmAtePropriedadeItem___" + indexesPropRuralTbPropriedadesRurais[i], false);
		    }
		}
		//Km Total Utilizado
		form.setEnabled("atendKMTotalUtilizado", false);
		//Anexo
		//Observação Geral
		form.setEnabled("obsObservacaoGeral", false);
		
		/*
		 * Emissão NF/Forma Pagamento
		 */
		//Valores
		form.setEnabled("NFvalValorEntrega", false);
		form.setEnabled("NFvalValorDeslocamento", false);
		form.setEnabled("NFvalValorAddEntrega", false);
		form.setEnabled("NFvalValorAddDeslocamento", false);
		form.setEnabled("NFvalValorTotal", false);
		form.setEnabled("NFvalObservacao", false);
		
		//Nota Fiscal/Forma de Pagamento
		form.setEnabled("NFPagtoFormaPagamento", false);
		form.setEnabled("NFPagtoBanco", false);
		form.setEnabled("NFPagtoAgencia", false);
		form.setEnabled("NFPagtoConta", false);
		form.setEnabled("NFPagtoCodIdentificador", false);
		form.setEnabled("NFPagtoNome", false);
		form.setEnabled("NFPagtoCpfCnpj", false);
		
		//Aprovação
		form.setEnabled("NFAprovAprovacao", false);
		form.setEnabled("NFAprovObservacao", false);
		form.setEnabled("NFAprovDataPrevPagto", false);
		
		
		/*
		 * Programação para pagamento
		 */
		form.setEnabled("OCConfirmaDados", false);
		
		
	}
}
