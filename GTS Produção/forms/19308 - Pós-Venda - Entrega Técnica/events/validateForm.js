function validateForm(form){
	
	var WKNumState = getValue('WKNumState');
	
	var message = "";
    var hasErros = false;
    
    switch (parseInt(WKNumState)) {
    	//INICIAL
        case INICIO_0 : 
        case INICIO : 
        	
        	if ( form.getValue("A1_TIPO") == 'TECNICO' && isMobile(form) ) {	
        		message += getMessage("Não é possível abrir uma solicitação de Entrega Técnica via smartphone!\n", 6, form);
                hasErros = true;
			}
        	
        	/*
			 * Cadastro de Equipamento
			 */
        	if (isEmpty("solicitante", form)) {
    			message += getMessage("Solicitante", 1, form);
    			hasErros = true;
    		}
    		if ( form.getValue("tipoSolicitante") == 'Revenda' && isEmpty("gerenteRevenda", form) ) {
                message += getMessage("Gerente da Revenda", 1, form);
                hasErros = true;
            }
    		if (isEmpty("gerenteSolicitante", form)) {
    			message += getMessage("Gerente Solicitante", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("tipoSolicitante", form)) {
    			message += getMessage("Tipo do Solicitante", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("equipNumSerie", form)) {
    			message += getMessage("Número de Série", 1, form);
    			hasErros = true;
    		}
    		
    		if ( form.getValue("tipoSolicitante") == 'Revenda' ) {
	    		if (isEmpty("revCodigo", form)) {
	    			message += getMessage("Cod. Revenda que está realizando a Entrega Técnica", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("revLoja", form)) {
	    			message += getMessage("Loja Revenda que está realizando a Entrega Técnica", 1, form);
	    			hasErros = true;
	    		}
    		}
    		
    		//Se for clicado em Enviar
    		if (getValue("WKCompletTask") == "true" ){
    		
	    		if (isEmpty("equipFilialNotaFiscal", form)) {
	    			message += getMessage("Filial da Nota Fiscal", 1, form);
	    			hasErros = true;
	    		}

	    		if (isEmpty("equipNumNotaFiscal", form)) {
	    			message += getMessage("Nota Fiscal", 1, form);
	    			hasErros = true;
	    		}
	    		
	    		if (isEmpty("equipDescricao", form)) {
	    			message += getMessage("Descrição do Equipamento", 1, form);
	    			hasErros = true;
	    		}

	    		if (isEmpty("equipCodProduto", form)) {
	    			message += getMessage("Código do Produto do Equipamento", 1, form);
	    			hasErros = true;
	    		}

	    		if (isEmpty("equipModelo", form)) {
	    			message += getMessage("Modelo do Equipamento", 1, form);
	    			hasErros = true;
	    		}
	    		
	    		if (isEmpty("equipAcoplamento", form)) {
	    			message += getMessage("Acoplamento do Equipamento", 1, form);
	    			hasErros = true;
	    		}
	    		
	    		if (isEmpty("equipDataVenda", form)) {
	    			message += getMessage("Data de Venda", 1, form);
	    			hasErros = true;
	    		}
	    		
	    		if (isEmpty("equipDataEntrega", form)) {
	    			message += getMessage("Data de Entrega", 1, form);
	    			hasErros = true;
	    		}else{
	    			
	    			var equipDataEntrega = form.getValue("equipDataEntrega");
            		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
            		var equipDataEntregaParse = sdf.parse(equipDataEntrega);
            		
         		    var dataHoje = java.util.Calendar.getInstance();
         			//Aqui primeiro converte a data hoje para dd/MM/yyyy, para posteriormente transformar em um campo date.
         		    var dataHojeParse = sdf.parse( sdf.format(dataHoje.getTime() ));
         		   	
         		    //Se a data de hoje antes que a data de Entrega
         		    if(dataHojeParse.before(equipDataEntregaParse)){
         		    	message += getMessage("Campo: <b>Data de Entrega</b> não pode ser maior que hoje.", 6, form);	
         		    	hasErros = true;
         		   	}
         		    
	    		}
	
	    		if (isEmpty("equipDataTerminoGarantia", form)) {
	    			message += getMessage("Término Garantia", 1, form);
	    			hasErros = true;
	    		}
			       	
			
	    		//Se não for um Adminstrativo GTS abrindo a solicitação, precisa validar o campos de revenda
	    		if (form.getValue("tipoSolicitante") != 'Administrativo GTS') {
	    			/*
	    			 * Cadastro da Loja (Revenda Vinculada no Equipamento)
	    			 */
	    			if (isEmpty("revEquipCpfCnpj", form)) {
		    			message += getMessage("CPF/CNPJ da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
	    			if (isEmpty("revEquipRazaoSocialRevenda", form)) {
		    			message += getMessage("Razão Social da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revEquipNomeFantasiaRevenda", form)) {
		    			message += getMessage("Nome Fantasia da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revEquipCpfCnpj", form)) {
		    			message += getMessage("CPF/CNPJ da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revEquipCodigo", form)) {
		    			message += getMessage("Código da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revEquipLoja", form)) {
		    			message += getMessage("Loja da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revEquipCidade", form)) {
		    			message += getMessage("Cidade da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revEquipEstadoHidden", form)) {
		    			message += getMessage("Estado da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
	    			
	    			
	    			/*
	    			 * Cadastro da Loja (Revenda que está realizando a Entrega Técnica)
	    			 */
		    		if (isEmpty("revCpfCnpj", form)) {
		    			message += getMessage("CPF/CNPJ da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revRazaoSocialRevenda", form)) {
		    			message += getMessage("Razão Social da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revNomeFantasiaRevenda", form)) {
		    			message += getMessage("Nome Fantasia da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revCpfCnpj", form)) {
		    			message += getMessage("CPF/CNPJ da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revCodigo", form)) {
		    			message += getMessage("Código da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revLoja", form)) {
		    			message += getMessage("Loja da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revCidade", form)) {
		    			message += getMessage("Cidade da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revEstadoHidden", form)) {
		    			message += getMessage("Estado da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (!isEmpty("revContVendasTelefone", form)) {
		    			if( form.getValue("revContVendasTelefone").length() < 10 ){
			    			message += getMessage("Telefone do Contato de Vendas", 2, form);
			    			hasErros = true;
			    		}
		    		}
		    		if (!isEmpty("revContVendasEmail", form)) {
		    			if( !validaEmail(form.getValue("revContVendasEmail")) ){	
		        			message += getMessage("<b>Contato de Vendas</b> está inválido.", 6, form);
		        			hasErros = true;
		        		}
		    		}
		    		if (!isEmpty("revContPecasTelefone", form)) {
		    			if( form.getValue("revContPecasTelefone").length() < 10 ){
			    			message += getMessage("Telefone do Contato de Peças", 2, form);
			    			hasErros = true;
			    		}
		    		}
		    		if (!isEmpty("revContPecasEmail", form)) {
		    			if( !validaEmail(form.getValue("revContPecasEmail")) ){	
		    				message += getMessage("<b>E-mail do Contato de Peças</b> está inválido.", 6, form);
		    				hasErros = true;
		    			}
		    		}
	    		
		    		if (isEmpty("revContServicoNome", form)) {
		    			message += getMessage("Nome do Contato de Serviço", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revContServicoTelefone", form)) {
		    			message += getMessage("Telefone do Contato de Serviço", 1, form);
		    			hasErros = true;
		    		}else if( form.getValue("revContServicoTelefone").length() < 10 ){
		    			message += getMessage("Telefone do Contato de Serviço", 2, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revContServicoEmail", form)) {
		    			message += getMessage("E-mail do Contato de Serviço", 1, form);
		    			hasErros = true;
		    		}else if( !validaEmail(form.getValue("revContServicoEmail")) ){	
		    			if (isMobile(form)) {
		    				message += getMessage("E-mail do Contato de Serviço está inválido.\n", 6, form);
		    			}else{
		    				message += getMessage("<b>E-mail do Contato de Serviço</b> está inválido.", 6, form);
		    			}
		    			hasErros = true;
		    		}
		    		
		    		if( form.getValue("revEquipCodigo") == form.getValue("revCodigo") 
		    				&& form.getValue("revEquipLoja") != form.getValue("revLoja") ){
		    			
		    			if ( form.getValue("revCienteTransfEquipRev") != 'ciente' ) {
	    	    			message += getMessage("Estou ciente que estou realizando a transferência de equipamento pela Revenda de origem.", 7, form);
	    	                hasErros = true;
	    	            }
		    			
		    		}
		    		
	    		}	
	    		if (isEmpty("revEntTecNome", form)) {
	    			message += getMessage("Nome do Entregador Técnico", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("revEntTecTelefone", form)) {
	    			message += getMessage("Telefone do Entregador Técnico", 1, form);
	    			hasErros = true;
	    		}else if( form.getValue("revEntTecTelefone").length() < 10 ){
	    			message += getMessage("Telefone do Entregador Técnico", 2, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("revEntTecCpf", form)) {
	    			message += getMessage("CPF do Entregador Técnico", 1, form);
	    			hasErros = true;
	    		}
		    		
    		
	    		/*
	    		 * Protocolo de Recebimento do Cliente Final
	    		 */
	    		if (isEmpty("protoRecResponsavel", form)) {
	    			message += getMessage("Responsável do Protocolo de Recebimento", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("protoRecTelefone", form)) {
	    			message += getMessage("Telefone do Protocolo de Recebimento", 1, form);
	    			hasErros = true;
	    		}else if( form.getValue("protoRecTelefone").length() < 10 ){
	    			message += getMessage("Telefone do Protocolo de Recebimento", 2, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("protoRecEmail", form)) {
	    			message += getMessage("E-mail do Protocolo de Recebimento", 1, form);
	    			hasErros = true;
	    		}else if( !validaEmail(form.getValue("protoRecEmail")) ){	
	    			if (isMobile(form)) {
	    				message += getMessage("E-mail Protocolo de Recebimento está inválido.\n", 6, form);
	    			}else{
	    				message += getMessage("<b>E-mail Protocolo de Recebimento</b> está inválido.", 6, form);
	    			}
	    			hasErros = true;
	    		}
	    		if (isEmpty("protoRecDataRecebimento", form)) {
	    			message += getMessage("Data Recebimento do Protocolo de Recebimento", 1, form);
	    			hasErros = true;
	    		}else{
	    			
	    			var protoRecDataRecebimento = form.getValue("protoRecDataRecebimento");
            		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
            		var protoRecDataRecebimentoParse = sdf.parse(protoRecDataRecebimento);
            		
         		    var dataHoje = java.util.Calendar.getInstance();
         			//Aqui primeiro converte a data hoje para dd/MM/yyyy, para posteriormente transformar em um campo date.
         		    var dataHojeParse = sdf.parse( sdf.format(dataHoje.getTime() ));
         		   	
         		    //Se a data de hoje antes que a data de Entrega
         		    if(dataHojeParse.before(protoRecDataRecebimentoParse)){
         		    	message += getMessage("Campo: <b>Data Recebimento do Protocolo de Recebimento</b> não pode ser maior que hoje.", 6, form);	
         		    	hasErros = true;
         		   	}
         		    
	    		}
	    		if (isEmpty("protoRecPossuiAvarias", form)) {
	    			message += getMessage("Possui Avarias", 3, form);
	    			hasErros = true;
	    		}else{
	    			if( form.getValue("protoRecPossuiAvarias") == 'sim' ){
	    				var indexesProtoRecTbAvarias = form.getChildrenIndexes("protoRecTbAvarias");
	    	    		if(indexesProtoRecTbAvarias.length == 0){
	    	            	if (isMobile(form)) {
	    	            		message += getMessage("Tabela de Avarias não possui nenhum item.\n", 6, form);
	    	            	}else{
	    	            		message += getMessage("Tabela de <b>Avarias</b> não possui nenhum item.", 6, form);
	    	            	}
	    	            	hasErros = true;
	    	            }else{
	    	            	for (var i = 0; i < indexesProtoRecTbAvarias.length; i++) {
	            				if (isEmpty("protoRecAvariasDescricaoItem___"+ indexesProtoRecTbAvarias[i], form) ){
	    							message += getMessage("Descrição" , 5, form, "Tabela de Avarias");
	    				           	hasErros = true;
	    						}
	            				if (isEmpty("protoRecAvariasImagemItem___"+ indexesProtoRecTbAvarias[i], form) ){
	            					message += getMessage("Imagem Avaria" , 5, form, "Tabela de Avarias");
	            					hasErros = true;
	            				}
	    	            	}
	    	            }
	    			}else if( form.getValue("protoRecPossuiAvarias") == 'nao' ){
	    				if ( form.getValue("protoRecCienteSemAvarias") != 'ciente' ) {
	    	    			message += getMessage(" Estou ciente que estou criando um protocolo de recebimento sem avarias.", 7, form);
	    	                hasErros = true;
	    	            }
	    			}
	    		}
    			
	    		/*
	    		 * Cliente
	    		 */
	    		if (isEmpty("cliCpfCnpj", form)) {
	    			message += getMessage("CPF/CNPJ do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliNomeCliente", form)) {
	    			message += getMessage("Nome do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliInscricaoEstadual", form)) {
	    			message += getMessage("Inscrição Estadual do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliCEP", form)) {
	    			message += getMessage("CEP do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliEndereco", form)) {
	    			message += getMessage("Endereço do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliBairro", form)) {
	    			message += getMessage("Bairro do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliCidade", form)) {
	    			message += getMessage("Cidade do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliEstadoHidden", form)) {
	    			message += getMessage("Estado do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliTelefonePesqSatisfacao", form)){
	    			message += getMessage("Telefone para Pesquisa de Satisfação", 1, form);
	    			hasErros = true;
	    		}else if( form.getValue("cliTelefonePesqSatisfacao").length() < 10 ){
    				message += getMessage("Telefone para Pesquisa de Satisfação", 2, form);
    				hasErros = true;
	    		}
	    		if (isEmpty("cliPossuiEquipamentoGTS", form)) {
	    			message += getMessage("Possui Equipamento da GTS", 1, form);
	    			hasErros = true;
	    		}
	    		if(form.getValue("cliPossuiEquipamentoGTS") == 'sim' ){
	    			var indexesCliTbEquipamentos = form.getChildrenIndexes("cliTbEquipamentos");
		            
		            if(indexesCliTbEquipamentos.length == 0){
		    			if (isMobile(form)) {
		            		message += getMessage("Tabela de Equipamentos da GTS não possui nenhum item.\n" , 6, form);
		            	}else{
		            		message += getMessage("<b>Tabela de Equipamentos da GTS</b> não possui nenhum item." , 6, form);
		            	}
		            	hasErros = true;
		            }else{
						for (var i = 0; i < indexesCliTbEquipamentos.length; i++) {
							
							if (isEmpty("cliEquipEquipamentoItem___"+ indexesCliTbEquipamentos[i], form) ){
								message += getMessage("Equipamento" , 5, form, " Equipamentos da GTS");
					           	hasErros = true;
							}
						}
		            }
	    		}
	    		
	    		
	    		/*
	    		 * Propriedade Rural do Cliente
	    		 */
	    		if (!isEmpty("propRuralCidade", form) ){
					if (isMobile(form)) {
	            		message += getMessage("Campo Cidade precisa estar inserida na Tabela de Propriedade Rural\n" , 6, form);
	            	}else{
	            		message += getMessage("Campo <b>Cidade</b> precisa estar inserida na <b>Tabela de Propriedade Rural</b>" , 6, form);
	            	}
		           	hasErros = true;
				}
	    		if (!isEmpty("propRuralEstado", form) ){
	    			if (isMobile(form)) {
	    				message += getMessage("Campo Estado precisa estar inserida na Tabela de Propriedade Rural\n" , 6, form);
	    			}else{
	    				message += getMessage("Campo <b>Estado</b> precisa estar inserida na <b>Tabela de Propriedade Rural</b>" , 6, form);
	    			}
	    			hasErros = true;
	    		}
	    		if (!isEmpty("propRuralNomePropriedade", form) ){
	    			if (isMobile(form)) {
	    				message += getMessage("Campo Nome da Propriedade precisa estar inserida na Tabela de Propriedade Rural\n" , 6, form);
	    			}else{
	    				message += getMessage("Campo <b>Nome da Propriedade</b> precisa estar inserida na <b>Tabela de Propriedade Rural</b>" , 6, form);
	    			}
	    			hasErros = true;
	    		}
	    		if (!isEmpty("propRuralKmAtePropriedade", form) ){
	    			if (isMobile(form)) {
	    				message += getMessage("Campo Km até a propriedade precisa estar inserida na Tabela de Propriedade Rural\n" , 6, form);
	    			}else{
	    				message += getMessage("Campo <b>Km até a Propriedade</b> precisa estar inserida na <b>Tabela de Propriedade Rural</b>" , 6, form);
	    			}
	    			hasErros = true;
	    		}
	    		
	    		var indexesPropRuralTbPropriedadesRurais = form.getChildrenIndexes("propRuralTbPropriedadesRurais");
	            
	            if(indexesPropRuralTbPropriedadesRurais.length == 0){
	    			if (isMobile(form)) {
	            		message += getMessage("Tabela de Propriedade Rural não possui nenhum item.\n" , 6, form);
	            	}else{
	            		message += getMessage("<b>Tabela de Propriedade Rural</b> não possui nenhum item." , 6, form);
	            	}
	            	hasErros = true;
	            }else{
	            	var propRuralEntregaQtdSelecionado = 0;
					for (var i = 0; i < indexesPropRuralTbPropriedadesRurais.length; i++) {
						var propRuralEntrega = form.getValue("propRuralEntrega___"+ indexesPropRuralTbPropriedadesRurais[i]);
						
						if(propRuralEntrega == 'selecionado'){
							propRuralEntregaQtdSelecionado++;
						}
						
						if (isEmpty("propRuralCidadeItem___"+ indexesPropRuralTbPropriedadesRurais[i], form) ){
							message += getMessage("Cidade" , 5, form, "Tabela de Propriedade Rural");
				           	hasErros = true;
						}
						if (isEmpty("propRuralEstadoItem___"+ indexesPropRuralTbPropriedadesRurais[i], form) ){
							message += getMessage("Estado" , 5, form, "Tabela de Propriedade Rural");
							hasErros = true;
						}
						if (isEmpty("propRuralNomePropriedadeItem___"+ indexesPropRuralTbPropriedadesRurais[i], form) ){
							message += getMessage("Nome da Propriedade" , 5, form, "Tabela de Propriedade Rural");
							hasErros = true;
						}
						if (isEmpty("propRuralKmAtePropriedadeItem___"+ indexesPropRuralTbPropriedadesRurais[i], form) ){
							message += getMessage("Km até a Propriedade" , 5, form, "Tabela de Propriedade Rural");
							hasErros = true;
						}
						
					}
					if(propRuralEntregaQtdSelecionado == 0){
						if (isMobile(form)) {
		            		message += getMessage("É preciso selecionar um local de Entrega de Equipamento na Tabela de Propriedade Rural\n" , 6, form);
		            	}else{
		            		message += getMessage("É preciso selecionar um local de <b>Entrega de Equipamento</b> na <b>Tabela de Propriedade Rural</b>" , 6, form);
		            	}
						hasErros = true;
					}else if(propRuralEntregaQtdSelecionado > 1){
						if (isMobile(form)) {
		            		message += getMessage("Só é possível selecionar um local de Entrega de Equipamento na Tabela de Propriedade Rural\n" , 6, form);
		            	}else{
		            		message += getMessage("Só é possível selecionar um local de <b>Entrega de Equipamento</b> na <b>Tabela de Propriedade Rural</b>" , 6, form);
		            	}
						hasErros = true;
					}
				
	            }
	            
	            /*
	    		 * Atendimento
	    		 */
	            if (isEmpty("atendKMTotalUtilizado", form) ){
					message += getMessage("Km Total Utilizado" , 1, form);
					hasErros = true;
				}
	            
	            /*
	             * Anexo
	             */
	            if( form.getValue("A1_TIPO").toUpperCase() != 'TECNICO'){
		            if (isEmpty("anexoRelAtendimento", form)) {
		    			message += getMessage("Relatório de Atendimento", 8, form);
		    			hasErros = true;
		    		} 
		            if (isEmpty("anexoChecklist", form)) {
		            	message += getMessage("Checklist", 8, form);
		            	hasErros = true;
		            } 
	            }
    		}
    		
    		break;
    		
        case FORMALIZA : 
    			
        	/*
			 * Cadastro de Equipamento
			 */
    		if (isEmpty("solicitante", form)) {
                message += getMessage("Solicitante", 1, form);
                hasErros = true;
            }
    		if (isEmpty("tipoSolicitante", form)) {
    			message += getMessage("Tipo do Solicitante", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("equipNumSerie", form)) {
    			message += getMessage("Número de Série", 1, form);
    			hasErros = true;
    		}
    		
    		//Se for clicado em Enviar
    		if (getValue("WKCompletTask") == "true" ){
    		
	    		if (isEmpty("equipNumNotaFiscal", form)) {
	    			message += getMessage("Nota Fiscal", 1, form);
	    			hasErros = true;
	    		}
	    		
	    		if (isEmpty("equipDescricao", form)) {
	    			message += getMessage("Descrição do Equipamento", 1, form);
	    			hasErros = true;
	    		}

	    		if (isEmpty("equipCodProduto", form)) {
	    			message += getMessage("Código do Produto do Equipamento", 1, form);
	    			hasErros = true;
	    		}

	    		if (isEmpty("equipModelo", form)) {
	    			message += getMessage("Modelo do Equipamento", 1, form);
	    			hasErros = true;
	    		}
	    		
	    		if (isEmpty("equipAcoplamento", form)) {
	    			message += getMessage("Acoplamento do Equipamento", 1, form);
	    			hasErros = true;
	    		}
	    		
	    		if (isEmpty("equipDataVenda", form)) {
	    			message += getMessage("Data de Venda", 1, form);
	    			hasErros = true;
	    		}
	    		
	    		if (isEmpty("equipDataEntrega", form)) {
	    			message += getMessage("Data de Entrega", 1, form);
	    			hasErros = true;
	    		}else{
	    			
	    			var equipDataEntrega = form.getValue("equipDataEntrega");
            		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
            		var equipDataEntregaParse = sdf.parse(equipDataEntrega);
            		
         		    var dataHoje = java.util.Calendar.getInstance();
         			//Aqui primeiro converte a data hoje para dd/MM/yyyy, para posteriormente transformar em um campo date.
         		    var dataHojeParse = sdf.parse( sdf.format(dataHoje.getTime() ));
         		   	
         		    //Se a data de hoje antes que a data de Entrega
         		    if(dataHojeParse.before(equipDataEntregaParse)){
         		    	message += getMessage("Campo: <b>Data de Entrega</b> não pode ser maior que hoje.", 6, form);	
         		    	hasErros = true;
         		   	}
         		    
	    		}
	
	    		if (isEmpty("equipDataTerminoGarantia", form)) {
	    			message += getMessage("Término Garantia", 1, form);
	    			hasErros = true;
	    		}
			       	
			
	    		
	    		//Se não for um Adminstrativo GTS abrindo a solicitação, precisa validar o campos de revenda
	    		if (form.getValue("tipoSolicitante") != 'Administrativo GTS') {
	    			/*
					 * Cadastro da Loja (Revenda Vinculada no Equipamento)
					 */
	    			if (isEmpty("revEquipCpfCnpj", form)) {
		    			message += getMessage("CPF/CNPJ da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
	    			if (isEmpty("revEquipRazaoSocialRevenda", form)) {
		    			message += getMessage("Razão Social da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revEquipNomeFantasiaRevenda", form)) {
		    			message += getMessage("Nome Fantasia da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revEquipCpfCnpj", form)) {
		    			message += getMessage("CPF/CNPJ da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revEquipCodigo", form)) {
		    			message += getMessage("Código da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revEquipLoja", form)) {
		    			message += getMessage("Loja da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revEquipCidade", form)) {
		    			message += getMessage("Cidade da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revEquipEstadoHidden", form)) {
		    			message += getMessage("Estado da Loja vinculada no Equipamento", 1, form);
		    			hasErros = true;
		    		}
	    			
	    			
		    		/*
	    			 * Cadastro da Loja (Revenda que está realizando a Entrega Técnica)
	    			 */
		    		if (isEmpty("revCpfCnpj", form)) {
		    			message += getMessage("CPF/CNPJ da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revRazaoSocialRevenda", form)) {
		    			message += getMessage("Razão Social da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revNomeFantasiaRevenda", form)) {
		    			message += getMessage("Nome Fantasia da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revCpfCnpj", form)) {
		    			message += getMessage("CPF/CNPJ da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revCodigo", form)) {
		    			message += getMessage("Código da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revLoja", form)) {
		    			message += getMessage("Loja da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revCidade", form)) {
		    			message += getMessage("Cidade da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revEstadoHidden", form)) {
		    			message += getMessage("Estado da Loja que está realizando a Entrega Técnica", 1, form);
		    			hasErros = true;
		    		}
		    		if (!isEmpty("revContVendasTelefone", form)) {
		    			if( form.getValue("revContVendasTelefone").length() < 10 ){
			    			message += getMessage("Telefone do Contato de Vendas", 2, form);
			    			hasErros = true;
			    		}
		    		}
		    		if (!isEmpty("revContVendasEmail", form)) {
		    			if( !validaEmail(form.getValue("revContVendasEmail")) ){	
		        			message += getMessage("<b>Contato de Vendas</b> está inválido.", 6, form);
		        			hasErros = true;
		        		}
		    		}
		    		if (!isEmpty("revContPecasTelefone", form)) {
		    			if( form.getValue("revContPecasTelefone").length() < 10 ){
			    			message += getMessage("Telefone do Contato de Peças", 2, form);
			    			hasErros = true;
			    		}
		    		}
		    		if (!isEmpty("revContPecasEmail", form)) {
		    			if( !validaEmail(form.getValue("revContPecasEmail")) ){	
		    				message += getMessage("<b>E-mail do Contato de Peças</b> está inválido.", 6, form);
		    				hasErros = true;
		    			}
		    		}
	    		
		    		if (isEmpty("revContServicoNome", form)) {
		    			message += getMessage("Nome do Contato de Serviço", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revContServicoTelefone", form)) {
		    			message += getMessage("Telefone do Contato de Serviço", 1, form);
		    			hasErros = true;
		    		}else if( form.getValue("revContServicoTelefone").length() < 10 ){
		    			message += getMessage("Telefone do Contato de Serviço", 2, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("revContServicoEmail", form)) {
		    			message += getMessage("E-mail do Contato de Serviço", 1, form);
		    			hasErros = true;
		    		}else if( !validaEmail(form.getValue("revContServicoEmail")) ){	
		    			if (isMobile(form)) {
		    				message += getMessage("E-mail do Contato de Serviço está inválido.\n", 6, form);
		    			}else{
		    				message += getMessage("<b>E-mail do Contato de Serviço</b> está inválido.", 6, form);
		    			}
		    			hasErros = true;
		    		}
		    		
		    		if( form.getValue("revEquipCodigo") == form.getValue("revCodigo") 
		    				&& form.getValue("revEquipLoja") != form.getValue("revLoja") ){
		    			
		    			if ( form.getValue("revCienteTransfEquipRev") != 'ciente' ) {
	    	    			message += getMessage("Estou ciente que estou realizando a transferência de equipamento pela Revenda de origem.", 7, form);
	    	                hasErros = true;
	    	            }
		    			
		    		}
	    		}	
	    		if (isEmpty("revEntTecNome", form)) {
	    			message += getMessage("Nome do Entregador Técnico", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("revEntTecTelefone", form)) {
	    			message += getMessage("Telefone do Entregador Técnico", 1, form);
	    			hasErros = true;
	    		}else if( form.getValue("revEntTecTelefone").length() < 10 ){
	    			message += getMessage("Telefone do Entregador Técnico", 2, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("revEntTecCpf", form)) {
	    			message += getMessage("CPF do Entregador Técnico", 1, form);
	    			hasErros = true;
	    		}
		    		
    		
	    		/*
	    		 * Protocolo de Recebimento do Cliente Final
	    		 */
	    		if (isEmpty("protoRecResponsavel", form)) {
	    			message += getMessage("Responsável do Protocolo de Recebimento", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("protoRecTelefone", form)) {
	    			message += getMessage("Telefone do Protocolo de Recebimento", 1, form);
	    			hasErros = true;
	    		}else if( form.getValue("protoRecTelefone").length() < 10 ){
	    			message += getMessage("Telefone do Protocolo de Recebimento", 2, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("protoRecEmail", form)) {
	    			message += getMessage("E-mail do Protocolo de Recebimento", 1, form);
	    			hasErros = true;
	    		}else if( !validaEmail(form.getValue("protoRecEmail")) ){	
	    			if (isMobile(form)) {
	    				message += getMessage("E-mail Protocolo de Recebimento está inválido.\n", 6, form);
	    			}else{
	    				message += getMessage("<b>E-mail Protocolo de Recebimento</b> está inválido.", 6, form);
	    			}
	    			hasErros = true;
	    		}
	    		if (isEmpty("protoRecDataRecebimento", form)) {
	    			message += getMessage("Data Recebimento do Protocolo de Recebimento", 1, form);
	    			hasErros = true;
	    		}else{
	    			
	    			var protoRecDataRecebimento = form.getValue("protoRecDataRecebimento");
            		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
            		var protoRecDataRecebimentoParse = sdf.parse(protoRecDataRecebimento);
            		
         		    var dataHoje = java.util.Calendar.getInstance();
         			//Aqui primeiro converte a data hoje para dd/MM/yyyy, para posteriormente transformar em um campo date.
         		    var dataHojeParse = sdf.parse( sdf.format(dataHoje.getTime() ));
         		   	
         		    //Se a data de hoje antes que a data de Entrega
         		    if(dataHojeParse.before(protoRecDataRecebimentoParse)){
         		    	message += getMessage("Campo: <b>Data Recebimento do Protocolo de Recebimento</b> não pode ser maior que hoje.", 6, form);	
         		    	hasErros = true;
         		   	}
         		    
	    		}
	    		if (isEmpty("protoRecPossuiAvarias", form)) {
	    			message += getMessage("Possui Avarias", 3, form);
	    			hasErros = true;
	    		}else{
	    			if( form.getValue("protoRecPossuiAvarias") == 'sim' ){
	    				var indexesProtoRecTbAvarias = form.getChildrenIndexes("protoRecTbAvarias");
	    	    		if(indexesProtoRecTbAvarias.length == 0){
	    	            	if (isMobile(form)) {
	    	            		message += getMessage("Tabela de Avarias não possui nenhum item.\n", 6, form);
	    	            	}else{
	    	            		message += getMessage("Tabela de <b>Avarias</b> não possui nenhum item.", 6, form);
	    	            	}
	    	            	hasErros = true;
	    	            }else{
	    	            	for (var i = 0; i < indexesProtoRecTbAvarias.length; i++) {
	            				if (isEmpty("protoRecAvariasDescricaoItem___"+ indexesProtoRecTbAvarias[i], form) ){
	    							message += getMessage("Descrição" , 5, form, "Tabela de Avarias");
	    				           	hasErros = true;
	    						}
	            				if (isEmpty("protoRecAvariasImagemItem___"+ indexesProtoRecTbAvarias[i], form) ){
	            					message += getMessage("Imagem Avaria" , 5, form, "Tabela de Avarias");
	            					hasErros = true;
	            				}
	    	            	}
	    	            }
	    			}else if( form.getValue("protoRecPossuiAvarias") == 'nao' ){
	    				if ( form.getValue("protoRecCienteSemAvarias") != 'ciente' ) {
	    	    			message += getMessage(" Estou ciente que estou criando um protocolo de recebimento sem avarias.", 7, form);
	    	                hasErros = true;
	    	            }
	    			}
	    		}
    			
	    		/*
	    		 * Cliente
	    		 */
	    		if (isEmpty("cliCpfCnpj", form)) {
	    			message += getMessage("CPF/CNPJ do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliNomeCliente", form)) {
	    			message += getMessage("Nome do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliInscricaoEstadual", form)) {
	    			message += getMessage("Inscrição Estadual do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliCEP", form)) {
	    			message += getMessage("CEP do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliEndereco", form)) {
	    			message += getMessage("Endereço do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliBairro", form)) {
	    			message += getMessage("Bairro do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliCidade", form)) {
	    			message += getMessage("Cidade do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliEstadoHidden", form)) {
	    			message += getMessage("Estado do Cliente", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("cliTelefonePesqSatisfacao", form)){
	    			message += getMessage("Telefone para Pesquisa de Satisfação", 1, form);
	    			hasErros = true;
	    		}else if( form.getValue("cliTelefonePesqSatisfacao").length() < 10 ){
    				message += getMessage("Telefone para Pesquisa de Satisfação", 2, form);
    				hasErros = true;
	    		}
	    		if (isEmpty("cliPossuiEquipamentoGTS", form)) {
	    			message += getMessage("Possui Equipamento da GTS", 1, form);
	    			hasErros = true;
	    		}
	    		if(form.getValue("cliPossuiEquipamentoGTS") == 'sim' ){
	    			var indexesCliTbEquipamentos = form.getChildrenIndexes("cliTbEquipamentos");
		            
		            if(indexesCliTbEquipamentos.length == 0){
		    			if (isMobile(form)) {
		            		message += getMessage("Tabela de Equipamentos da GTS não possui nenhum item.\n" , 6, form);
		            	}else{
		            		message += getMessage("<b>Tabela de Equipamentos da GTS</b> não possui nenhum item." , 6, form);
		            	}
		            	hasErros = true;
		            }else{
						for (var i = 0; i < indexesCliTbEquipamentos.length; i++) {
							
							if (isEmpty("cliEquipEquipamentoItem___"+ indexesCliTbEquipamentos[i], form) ){
								message += getMessage("Equipamento" , 5, form, " Equipamentos da GTS");
					           	hasErros = true;
							}
						}
		            }
	    		}
	    		
	    		
	    		/*
	    		 * Propriedade Rural do Cliente
	    		 */
	    		if (!isEmpty("propRuralCidade", form) ){
					if (isMobile(form)) {
	            		message += getMessage("Campo Cidade precisa estar inserida na Tabela de Propriedade Rural\n" , 6, form);
	            	}else{
	            		message += getMessage("Campo <b>Cidade</b> precisa estar inserida na <b>Tabela de Propriedade Rural</b>" , 6, form);
	            	}
		           	hasErros = true;
				}
	    		if (!isEmpty("propRuralEstado", form) ){
	    			if (isMobile(form)) {
	    				message += getMessage("Campo Estado precisa estar inserida na Tabela de Propriedade Rural\n" , 6, form);
	    			}else{
	    				message += getMessage("Campo <b>Estado</b> precisa estar inserida na <b>Tabela de Propriedade Rural</b>" , 6, form);
	    			}
	    			hasErros = true;
	    		}
	    		if (!isEmpty("propRuralNomePropriedade", form) ){
	    			if (isMobile(form)) {
	    				message += getMessage("Campo Nome da Propriedade precisa estar inserida na Tabela de Propriedade Rural\n" , 6, form);
	    			}else{
	    				message += getMessage("Campo <b>Nome da Propriedade</b> precisa estar inserida na <b>Tabela de Propriedade Rural</b>" , 6, form);
	    			}
	    			hasErros = true;
	    		}
	    		if (!isEmpty("propRuralKmAtePropriedade", form) ){
	    			if (isMobile(form)) {
	    				message += getMessage("Campo Km até a propriedade precisa estar inserida na Tabela de Propriedade Rural\n" , 6, form);
	    			}else{
	    				message += getMessage("Campo <b>Km até a Propriedade</b> precisa estar inserida na <b>Tabela de Propriedade Rural</b>" , 6, form);
	    			}
	    			hasErros = true;
	    		}
	    		
	    		var indexesPropRuralTbPropriedadesRurais = form.getChildrenIndexes("propRuralTbPropriedadesRurais");
	            
	            if(indexesPropRuralTbPropriedadesRurais.length == 0){
	    			if (isMobile(form)) {
	            		message += getMessage("Tabela de Propriedade Rural não possui nenhum item.\n" , 6, form);
	            	}else{
	            		message += getMessage("<b>Tabela de Propriedade Rural</b> não possui nenhum item." , 6, form);
	            	}
	            	hasErros = true;
	            }else{
	            	var propRuralEntregaQtdSelecionado = 0;
					for (var i = 0; i < indexesPropRuralTbPropriedadesRurais.length; i++) {
						var propRuralEntrega = form.getValue("propRuralEntrega___"+ indexesPropRuralTbPropriedadesRurais[i]);
						
						if(propRuralEntrega == 'selecionado'){
							propRuralEntregaQtdSelecionado++;
						}
						
						if (isEmpty("propRuralCidadeItem___"+ indexesPropRuralTbPropriedadesRurais[i], form) ){
							message += getMessage("Cidade" , 5, form, "Tabela de Propriedade Rural");
				           	hasErros = true;
						}
						if (isEmpty("propRuralEstadoItem___"+ indexesPropRuralTbPropriedadesRurais[i], form) ){
							message += getMessage("Estado" , 5, form, "Tabela de Propriedade Rural");
							hasErros = true;
						}
						if (isEmpty("propRuralNomePropriedadeItem___"+ indexesPropRuralTbPropriedadesRurais[i], form) ){
							message += getMessage("Nome da Propriedade" , 5, form, "Tabela de Propriedade Rural");
							hasErros = true;
						}
						if (isEmpty("propRuralKmAtePropriedadeItem___"+ indexesPropRuralTbPropriedadesRurais[i], form) ){
							message += getMessage("Km até a Propriedade" , 5, form, "Tabela de Propriedade Rural");
							hasErros = true;
						}
						
					}
					if(propRuralEntregaQtdSelecionado == 0){
						if (isMobile(form)) {
		            		message += getMessage("É preciso selecionar um local de Entrega de Equipamento na Tabela de Propriedade Rural\n" , 6, form);
		            	}else{
		            		message += getMessage("É preciso selecionar um local de <b>Entrega de Equipamento</b> na <b>Tabela de Propriedade Rural</b>" , 6, form);
		            	}
						hasErros = true;
					}else if(propRuralEntregaQtdSelecionado > 1){
						if (isMobile(form)) {
		            		message += getMessage("Só é possível selecionar um local de Entrega de Equipamento na Tabela de Propriedade Rural\n" , 6, form);
		            	}else{
		            		message += getMessage("Só é possível selecionar um local de <b>Entrega de Equipamento</b> na <b>Tabela de Propriedade Rural</b>" , 6, form);
		            	}
						hasErros = true;
					}
				
	            }
	            
	            /*
	    		 * Atendimento
	    		 */
	            if (isEmpty("atendKMTotalUtilizado", form) ){
					message += getMessage("Km Total Utilizado" , 1, form);
					hasErros = true;
				}
	            
	            /*
	             * Anexo
	             */
	            if (isEmpty("anexoRelAtendimento", form)) {
	    			message += getMessage("Relatório de Atendimento", 8, form);
	    			hasErros = true;
	    		} 
	            if (isEmpty("anexoChecklist", form)) {
	            	message += getMessage("Checklist", 8, form);
	            	hasErros = true;
	            } 
    		}
        	
        	
        	break;
        case GTS_ANALISA_CLIENTE : 
        	/*
    		 * Cliente
    		 */
    		if (isEmpty("cliCpfCnpj", form)) {
    			message += getMessage("CPF/CNPJ do Cliente", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("cliNomeCliente", form)) {
    			message += getMessage("Nome do Cliente", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("cliInscricaoEstadual", form)) {
    			message += getMessage("Inscrição Estadual do Cliente", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("cliCodigo", form)) {
    			message += getMessage("Código do Cliente", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("cliLoja", form)) {
    			message += getMessage("Loja do Cliente", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("cliCEP", form)) {
    			message += getMessage("CEP do Cliente", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("cliEndereco", form)) {
    			message += getMessage("Endereço do Cliente", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("cliBairro", form)) {
    			message += getMessage("Bairro do Cliente", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("cliCidade", form)) {
    			message += getMessage("Cidade do Cliente", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("cliEstadoHidden", form)) {
    			message += getMessage("Estado do Cliente", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("cliTelefonePesqSatisfacao", form)){
    			message += getMessage("Telefone para Pesquisa de Satisfação", 1, form);
    			hasErros = true;
    		}else if( form.getValue("cliTelefonePesqSatisfacao").length() < 10 ){
				message += getMessage("Telefone para Pesquisa de Satisfação", 2, form);
				hasErros = true;
    		}
        	break;
        case GTS_ANALISA_DEMANDA : 
        	
        	//Se for clicado em Enviar
    		if (getValue("WKCompletTask") == "true" ){
    			
        		if (isEmpty("entTecAprov", form)) {	
	       			message += getMessage("Aprovação Entrega Técnica", 3, form);
	       			hasErros = true;
        		}else if( form.getValue("entTecAprov") == 'aprovado' && form.getValue("tipoSolicitante") == 'Revenda' ){
        			
        			if (isEmpty("NFvalValorEntrega", form) ) {
    	                message += getMessage("Valor Entrega", 1, form);
    	                hasErros = true;
    	            }
    	    		if (isEmpty("NFvalValorDeslocamento", form) ) {
    	    			message += getMessage("Valor Deslocamento", 1, form);
    	    			hasErros = true;
    	    		}
    	    		if (isEmpty("NFvalValorTotal", form) ) {
    	    			message += getMessage("Valor Total", 1, form);
    	    			hasErros = true;
    	    		}
    	        	if (!isEmpty("NFvalValorAddEntrega", form) || !isEmpty("NFvalValorAddDeslocamento", form)) {
    	        		if (isEmpty("NFvalObservacao", form) ) {
    	        			message += getMessage("Observação", 1, form);
    	        			hasErros = true;
    	        		}
    	        	}
    	        	
        		}else if( form.getValue("entTecAprov") == 'reprovado' ){
        			
        			if (isEmpty("entTecAprovObservacao", form)) {	
	   	       			message += getMessage("Observação", 1, form);
	   	       			hasErros = true;
   	       			}
        			
        		}
    			
	    		
    		}
        	
        	break;
        	
        case ANALISA_RETORNO_GTS :
        	
        	//Se for clicado em Enviar
    		if (getValue("WKCompletTask") == "true" ){
    			
    			//Tabela de Possui Avarias
    			if (isEmpty("protoRecPossuiAvarias", form)) {
	    			message += getMessage("Possui Avarias", 3, form);
	    			hasErros = true;
	    		}else{
	    			if( form.getValue("protoRecPossuiAvarias") == 'sim' ){
	    				var indexesProtoRecTbAvarias = form.getChildrenIndexes("protoRecTbAvarias");
	    	    		if(indexesProtoRecTbAvarias.length == 0){
	    	            	if (isMobile(form)) {
	    	            		message += getMessage("Tabela de Avarias não possui nenhum item.\n", 6, form);
	    	            	}else{
	    	            		message += getMessage("Tabela de <b>Avarias</b> não possui nenhum item.", 6, form);
	    	            	}
	    	            	hasErros = true;
	    	            }else{
	    	            	for (var i = 0; i < indexesProtoRecTbAvarias.length; i++) {
	            				if (isEmpty("protoRecAvariasDescricaoItem___"+ indexesProtoRecTbAvarias[i], form) ){
	    							message += getMessage("Descrição" , 5, form, "Tabela de Avarias");
	    				           	hasErros = true;
	    						}
	            				if (isEmpty("protoRecAvariasImagemItem___"+ indexesProtoRecTbAvarias[i], form) ){
	            					message += getMessage("Imagem Avaria" , 5, form, "Tabela de Avarias");
	            					hasErros = true;
	            				}
	    	            	}
	    	            }
	    			}else if( form.getValue("protoRecPossuiAvarias") == 'nao' ){
	    				if ( form.getValue("protoRecCienteSemAvarias") != 'ciente' ) {
	    	    			message += getMessage(" Estou ciente que estou criando um protocolo de recebimento sem avarias.", 7, form);
	    	                hasErros = true;
	    	            }
	    			}
	    		}
    			
    			 /*
	             * Anexo
	             */
	            if (isEmpty("anexoRelAtendimento", form)) {
	    			message += getMessage("Relatório de Atendimento", 8, form);
	    			hasErros = true;
	    		} 
	            if (isEmpty("anexoChecklist", form)) {
	            	message += getMessage("Checklist", 8, form);
	            	hasErros = true;
	            } 
    		}
        	break;
        case REVENDA_NF_PGTO : 
        	
        	if (getValue("WKCompletTask") == "true" ){
        		
        		if (isEmpty("anexoNotaFiscal", form)) {
        			if (isMobile(form)) {
        				message += getMessage("É obrigatório anexar uma Nota Fiscal.\n", 6, form);
        			}else{
        				message += getMessage("É obrigatório anexar uma <b>Nota Fiscal</b>.", 6, form);
        			}
	    			hasErros = true;
	    		} 
        		
        		if (isEmpty("NFPagtoFormaPagamento", form)) {	
	       			 message += getMessage("Forma de Pagamento?", 3, form);
	       			 hasErros = true;
        		}
	       		
	       		if( form.getValue("NFPagtoFormaPagamento") == 'boleto' ){
	   	       		if (isEmpty("anexoBoleto", form)) {
		    			message += getMessage("Boleto", 8, form);
		    			hasErros = true;
		    		} 
	   	       	}else if( form.getValue("NFPagtoFormaPagamento") == 'transferencia' ){
	   	       		if (isEmpty("NFPagtoBanco", form)) {	
	   	       			message += getMessage("Banco", 1, form);
	   	       			hasErros = true;
  	       			}
	   	       		if (isEmpty("NFPagtoAgencia", form)) {	
	   	       			message += getMessage("Agência", 1, form);
	   	       			hasErros = true;
	   	       		}
	   	       		if (isEmpty("NFPagtoConta", form)) {	
	   	       			message += getMessage("Conta", 1, form);
	   	       			hasErros = true;
	   	       		}
	   	       	}
        	}
        	break;
        case GTS_ANALISA_NF_PGTO : 
        	
        	if (getValue("WKCompletTask") == "true" ){
        		
        		if (isEmpty("NFAprovAprovacao", form)) {	
	       			 message += getMessage("Aprovado?", 3, form);
	       			 hasErros = true;
        		}
	       		
	       		if( form.getValue("NFAprovAprovacao") == 'aprovado' ){
	   	       		if (isEmpty("NFAprovEmailAprovador", form)) {	
	   	       			message += getMessage("E-mail do Aprovador", 1, form);
   	       				hasErros = true;
	   	       		}
	   	       		if (isEmpty("NFAprovDataPrevPagto", form)) {	
	   	       			message += getMessage("Data de Previsão de Pagamento", 1, form);
	   	       			hasErros = true;
	   	       		}
		   	       	if (isEmpty("OCCpfCnpj", form)) {	
		   	       		message += getMessage("CPF/CNPJ da Revenda na Programação para Pagamento", 1, form);
		   	       		hasErros = true;
		   	       	}else if( form.getValue("OCCpfCnpj").length() != 14 && form.getValue("OCCpfCnpj").length() != 18){
			   	       	message += getMessage("CPF/CNPJ da Revenda na Programação para Pagamento", 2, form);
		   	       		hasErros = true;
		   	       	}
		   	       	if (isEmpty("OCRazaoSocialRevenda", form)) {	
	   	       			message += getMessage("Razão Social da Revenda na Programação para Pagamento", 1, form);
		       				hasErros = true;
	   	       		}
		   	       	if (isEmpty("OCNomeFantasiaRevenda", form)) {	
		   	       		message += getMessage("Nome Fantasia da Revenda na Programação para Pagamento", 1, form);
		   	       		hasErros = true;
		   	       	}
		   	       	if (isEmpty("OCValorNota", form)) {	
		   	       		message += getMessage("Valor da Nota na Programação para Pagamento", 1, form);
		   	       		hasErros = true;
		   	       	}
		   	       	if (isEmpty("OCEmailRecebimentoOC", form)) {
		    			message += getMessage("E-mail para Recebimento da Ordem de Compra", 1, form);
		    			hasErros = true;
		    		}else if( !validaEmail(form.getValue("OCEmailRecebimentoOC")) ){	
		    			if (isMobile(form)) {
		    				message += getMessage("E-mail para Recebimento da Ordem de Compra está inválido.\n", 6, form);
		    			}else{
		    				message += getMessage("<b>E-mail para Recebimento da Ordem de Compra</b> está inválido.", 6, form);
		    			}
		    			hasErros = true;
		    		}
		   	       	if ( form.getValue("OCConfirmaDados") != 'confirmo' ) {
		    			message += getMessage("Confirmo que os dados acima estão corretos para o lançamento da Ordem de Compra", 7, form);
		                hasErros = true;
		            }
	       		
	       		}else if( form.getValue("NFAprovAprovacao") == 'reprovado' ){
	   	       		if (isEmpty("NFAprovObservacao", form)) {	
	   	       			message += getMessage("Observação", 1, form);
	   	       			hasErros = true;
   	       			}
	   	       	}
        	}

        	break;
        case ANALISA_ERRO_EMAIL_CONFIRM_PGTO : 
        	
        	if (isEmpty("revContServicoEmail", form)) {
    			message += getMessage("E-mail do Contato de Serviço", 1, form);
    			hasErros = true;
    		}else if( !validaEmail(form.getValue("revContServicoEmail")) ){	
    			if (isMobile(form)) {
    				message += getMessage("E-mail do Contato de Serviço está inválido.\n", 6, form);
    			}else{
    				message += getMessage("<b>E-mail do Contato de Serviço</b> está inválido.", 6, form);
    			}
    			hasErros = true;
    		}
        	
        	break;
        	
        case ANALISA_ERRO_EMAIL_FINANC_FISCAL : 
        	
        	if (isEmpty("OCEmailRecebimentoOC", form)) {
    			message += getMessage("E-mail para Recebimento da Ordem de Compra", 1, form);
    			hasErros = true;
    		}else if( !validaEmail(form.getValue("OCEmailRecebimentoOC")) ){	
    			if (isMobile(form)) {
    				message += getMessage("E-mail para Recebimento da Ordem de Compra está inválido.\n", 6, form);
    			}else{
    				message += getMessage("<b>E-mail para Recebimento da Ordem de Compra</b> está inválido.", 6, form);
    			}
    			hasErros = true;
    		}
        	break;	
    }
        	
	if (hasErros) {
        if (isMobile(form)) throw message;
        throw "<ul style='list-style-type: disc; padding-left:90px' class='alert alert-danger'>" + message + "</ul>";
    }
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function dataAtual(formato){
    var retornoData = "";
	var data = new Date();
    
    var dia = addZero(data.getDate());
    var mes = addZero(data.getMonth()+1);
    var ano = data.getFullYear(); 
    
    var hora = addZero(data.getHours());
    var minuto = addZero(data.getMinutes());
    
    if(formato == "dd/mm/yyyy"){
    	retornoData = dia + "/" + mes + "/" + ano;
    }else if(formato == "yyyymmdd"){
    	retornoData = ano + "" + mes + "" + dia;
    }
    
    return retornoData;
}    
    
function getMessage(texto, tipoMensagem, form, tabpaifilho) {
    if (isMobile(form)) {
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
            	 return 'A tabela de  "' + tabpaifilho + '" possui um ou mais campos de "' + texto + '" inválido.\n'; 
            case 6:
           	 	return texto; 
            case 7:
           	 	return "Campo: "+texto+" precisa estar marcado.";
            case 8:
            	return "É preciso anexar um documento de "+texto+".";   
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
                return "<li>A tabela de <b>" + tabpaifilho + "</b> possui um ou mais campos de <b>" + texto + "</b> inválido.</li>";  
            case 6:
           	 	return "<li>"+texto+"</li>";     
            case 7:
           	 	return "<li>Campo: <b>"+texto+"</b> precisa estar marcado.</li>";     
            case 8:
            	return "<li>É obrigatório anexar um <b>"+texto+"</b>.</li>";     
        }
    }
}    