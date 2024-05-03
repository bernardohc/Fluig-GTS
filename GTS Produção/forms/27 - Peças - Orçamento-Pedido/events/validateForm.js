function validateForm(form){
	
	var WKNumState = getValue('WKNumState');
	var WKNextState = getValue('WKNextState');
	
	var message = "";
    var hasErros = false;
    var ehIntegracaoCatalogo = false;
    
    switch (parseInt(WKNumState)) {
    	//INICIAL
        case INICIO_0 : 
        case INICIO : 
        	
        	var origemSolicitacao = form.getValue("origemSolicitacao");
        	if(origemSolicitacao == null){
        		ehIntegracaoCatalogo = true;
        		if(retornaPais().toUpperCase() == 'USA'){
        			message += "-You must inform the origin of the request.\n";
        		}else{
        			message += "-É preciso informar a origem da solicitação.\n";
        		}
            	hasErros = true;
        	}else if(origemSolicitacao == 'catalogo' && form.getValue("itensProcessados") != 'true' ){
        		
        		ehIntegracaoCatalogo = true;
        		
        		var A1_PAIS = retornaPais();
        		
        		var numCatalogo = form.getValue("numCatalogo");
        		if(numCatalogo == null){
        			if(A1_PAIS.toUpperCase() == 'USA'){
        				message += "-You must enter the 'Parts Catalog Order Number'.\n";
        			}else{
        				message += "-É preciso informar o 'Número de Pedido do Catálogo de Peças'.\n";
        			}
		           	hasErros = true;
        		}else{
        			if ( isEmpty("numCatalogo", form) ){
        				if(A1_PAIS.toUpperCase() == 'USA'){
            				message += "-You must enter the 'Parts Catalog Order Number'.\n";
            			}else{
            				message += "-É preciso informar o 'Número de Pedido do Catálogo de Peças'.\n";
            			}
   					 	hasErros = true;
	   				}else{
	   					//Produto inválido - e possuir espaço)
	   					if ( contemEspaco(form.getValue("numCatalogo")) ){
	   						if(A1_PAIS.toUpperCase() == 'USA'){
	            				message += "-The 'Parts Catalog Order Number' field is invalid: field has space.\n";
	            			}else{
	            				message += "-O campo 'Número de Pedido do Catálogo de Peças' está inválido: campo possui espaço.\n";
	            			}
	   			           	hasErros = true;
	   					}
	   				}
        		}
        		
        		
        		var indexesTbItensOrcamento = form.getChildrenIndexes("tbItensOrcamento");
	            
	            if(indexesTbItensOrcamento.length == 0){
	            	if(A1_PAIS.toUpperCase() == 'USA'){
        				message += "-Items table does not have any items.\n";
        			}else{
        				message += "-Tabela de itens não possui nenhum item.\n";
        			}
	            	message += "\n";
	            	hasErros = true;
	            }else{
					for (var i = 0; i < indexesTbItensOrcamento.length; i++) {
						var orcQtdItem = form.getValue("orcQtdItem___"+ indexesTbItensOrcamento[i]);
						var orcCodProdutoItem = form.getValue("orcCodProdutoItem___"+ indexesTbItensOrcamento[i]);
						
						//Possui Qtd e não possui código de produto
						if( orcQtdItem != '' && orcCodProdutoItem == null ){
							if(A1_PAIS.toUpperCase() == 'USA'){
								message += "-Index item " + indexesTbItensOrcamento[i] + " has no related product.\n";
		        			}else{
		        				message += "-O item do índice " + indexesTbItensOrcamento[i] + " não possui produto relacionado.\n";
		        			}
				           	hasErros = true;
						}
						
						//Possui Código de produto e não possui item
						if( orcQtdItem == null && orcCodProdutoItem != '' ){
							if(A1_PAIS.toUpperCase() == 'USA'){
								message += "-Index item " + indexesTbItensOrcamento[i] + " has no related quantity.\n";
		        			}else{
		        				message += "-O item do índice " + indexesTbItensOrcamento[i] + " não possui quantidade relacionada.\n";
		        			}
				           	hasErros = true;
						}
						
						//Quantidade inválida - vazia
						if ( isEmpty("orcQtdItem___"+indexesTbItensOrcamento[i], form) ){
							if(A1_PAIS.toUpperCase() == 'USA'){
								message += "-Index item " + indexesTbItensOrcamento[i] + " has an invalid quantity: empty field.\n";
		        			}else{
		        				message += "-O item do índice " + indexesTbItensOrcamento[i] + " possui uma quantidade inválida: campo vazio.\n";
		        			}
				           	hasErros = true;
						}else{
							//Quantidade inválida - igual a zero
							if ( form.getValue("orcQtdItem___"+indexesTbItensOrcamento[i]) == '0' ){
								if(A1_PAIS.toUpperCase() == 'USA'){
									message += "-Index item " + indexesTbItensOrcamento[i] + " has an invalid quantity: field equals zero.\n";
			        			}else{
			        				message += "-O item do índice " + indexesTbItensOrcamento[i] + " possui uma quantidade inválida: campo igual a zero.\n";
			        			}
						        hasErros = true;
							}
							//Quantidade inválida - não inteiro
							if ( !isInteger(form.getValue("orcQtdItem___"+indexesTbItensOrcamento[i]))  ){
								if(A1_PAIS.toUpperCase() == 'USA'){
									message += "-Index item " + indexesTbItensOrcamento[i] + " has an invalid quantity: value is not an integer.\n";
			        			}else{
			        				message += "-O item do índice " + indexesTbItensOrcamento[i] + " possui uma quantidade inválida: valor não é inteiro.\n";
			        			}
						        hasErros = true;
							}
							//Quantidade inválida - possui espaço
							if ( contemEspaco(form.getValue("orcQtdItem___"+indexesTbItensOrcamento[i])) ){
								if(A1_PAIS.toUpperCase() == 'USA'){
									message += "-Index item " + indexesTbItensOrcamento[i] + " has an invalid quantity: has space.\n";
			        			}else{
			        				message += "-O item do índice " + indexesTbItensOrcamento[i] + " possui uma quantidade inválida: possui espaço.\n";
			        			}
								hasErros = true;
							}
						}
						
						//Produto inválido - vazia
						if ( isEmpty("orcCodProdutoItem___"+indexesTbItensOrcamento[i], form) ){
							if(A1_PAIS.toUpperCase() == 'USA'){
								message += "-Index item " + indexesTbItensOrcamento[i] + " has an invalid product code: empty field.\n";
		        			}else{
		        				message += "-O item do índice " + indexesTbItensOrcamento[i] + " possui um código de produto inválido: campo vazio.\n";
		        			} 
				           	hasErros = true;
						}else{
							//Produto inválido - quantidade de caracteres maior que 20
							if ( form.getValue("orcCodProdutoItem___"+indexesTbItensOrcamento[i]).length() > 20 ){
								if(A1_PAIS.toUpperCase() == 'USA'){
									message += "-Index item " + indexesTbItensOrcamento[i] + " has an invalid product code: field longer than 20 characters.\n";
			        			}else{
			        				message += "-O item do índice " + indexesTbItensOrcamento[i] + " possui um código de produto inválido: campo com mais de 20 caracteres.\n";
			        			} 
								hasErros = true;
							}
							//Produto inválido - código não for maiúsculo
							if ( !isUpperCase(form.getValue("orcCodProdutoItem___"+indexesTbItensOrcamento[i])) ){
								if(A1_PAIS.toUpperCase() == 'USA'){
									message += "-Index item " + indexesTbItensOrcamento[i] + " has an invalid product code: field is not uppercase.\n";
			        			}else{
			        				message += "-O item do índice " + indexesTbItensOrcamento[i] + " possui um código de produto inválido: campo não está em maiúsculo.\n";
			        			} 
					           	hasErros = true;
							}
							//Produto inválido - e possuir espaço)
							if ( contemEspaco(form.getValue("orcCodProdutoItem___"+indexesTbItensOrcamento[i])) ){
								if(A1_PAIS.toUpperCase() == 'USA'){
									message += "-Index item " + indexesTbItensOrcamento[i] + " has an invalid product code: field has space.\n";
			        			}else{
			        				message += "-O item do índice " + indexesTbItensOrcamento[i] + " possui um código de produto inválido: campo possui espaço.\n";
			        			}  
					           	hasErros = true;
							}
						}
						
						//Validar se o produto já foi inserido.
						var indexesTbItensOrcamentoDuplicado = form.getChildrenIndexes("tbItensOrcamento");
						for (var j = 0; j < indexesTbItensOrcamentoDuplicado.length; j++) {
							if(form.getValue("orcCodProdutoItem___"+ indexesTbItensOrcamentoDuplicado[j]) == form.getValue("orcCodProdutoItem___"+ indexesTbItensOrcamento[i])
								&& 	indexesTbItensOrcamentoDuplicado[j] != indexesTbItensOrcamento[i]
								){
								if(A1_PAIS.toUpperCase() == 'USA'){
									message += "-The item " + indexesTbItensOrcamento[i] +" has duplicate product code " +orcCodProdutoItem+ ".\n";
			        			}else{
			        				message += "-O item " + indexesTbItensOrcamento[i] +" possui o código de produto " +orcCodProdutoItem+ " duplicado.\n";
			        			}  
					           	hasErros = true;
							}
						}
						
					}
					
	            }
        		
        	
        	}else if(form.getValue("A1_PAIS").toUpperCase() == 'USA'){
        		
        		if (isEmpty("defineExpPedidoSalvarCancel", form)) {
        			message += getMessage("Select an option under <b>What do you want to do?</b>", 6, form);
	                hasErros = true;
	                
        		}else if( form.getValue("defineExpPedidoSalvarCancel") == 'cancelar' ){
//        	       		if (isEmpty("gerarPedidoMotCancel", form)) {	
//        	       			message += getMessage("Motivo de Cancelamento", 1, form);
//                           hasErros = true;
//        	       		}
    	        }else{
    	        	
    	        	var pedidoNoPrazo = true;
    	        	
                		
            		var dataMaximaOrcamento = '';
    	       		var dataHoje = '';
    	       		var fields = ["startDateProcess"];
    	     		var c1 = DatasetFactory.createConstraint("workflowProcessPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
    	     		var c2 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", getValue("WKNumProces"), getValue("WKNumProces"), ConstraintType.MUST);
    	     		var datasetWorkflowProcess = DatasetFactory.getDataset("workflowProcess", fields, [ c1, c2 ], null);
    	     		if(dsTemValor(datasetWorkflowProcess)){
    	     			
    	     			startDateProcess = datasetWorkflowProcess.getValue(0, "startDateProcess");
    	     			//Adiciona 30 dias a mais na data de início do processo
    	     			startDateProcess.setDate(startDateProcess.getDate()+60);
    	     			var diaMaxOrc = addZero(startDateProcess.getDate());
    		     		var mesMaxOrc = addZero(startDateProcess.getMonth()+1);
    		     		//Para pegar o ano, não funciona com getFullYear, então transformo a data em string e retiro os primeiros 4 caracteres que é o ano
    		     		startDateProcess = startDateProcess.toString();
    		     		anoMaxOrc = startDateProcess.substring(0, 4);
    		     		dataMaximaOrcamento = anoMaxOrc+ "" + mesMaxOrc + "" + diaMaxOrc;
    	     			
    		     		
    	     			//Valida a data maxima com a data de hoje
    	     			dataHoje = new Date();
    	     			dataHoje.setDate(dataHoje.getDate());
    	     		    var diaHoje = addZero(dataHoje.getDate());
    	     		    var mesHoje = addZero(dataHoje.getMonth()+1);
    	     		    var anoHoje = dataHoje.getFullYear(); 
    	     		    dataHoje = anoHoje+ "" + mesHoje + "" + diaHoje;
    	     		   
    	     		}
    	     		
    	     		if(dataHoje > dataMaximaOrcamento){
    	       			message += getMessage("The order has been open for more than 60 days, you need to cancel this quote and create a new one.", 6, form);	
    	       			hasErros = true;
    	       			pedidoNoPrazo = false;
    	       		}
    	     		
                	
                	if(pedidoNoPrazo){
                		
                		if (isEmpty("vendedor1", form)) {
        	       			message += getMessage("Field <b>Seller 1</b> can not be empty.", 6, form);
                            hasErros = true;
                        }
                    	if (isEmpty("vendedor4", form)) {
                    		message += getMessage("Field <b>Seller 4</b> can not be empty.", 6, form);
                    		hasErros = true;
                    	}
                    	if (isEmpty("vendedor5", form)) {
                    		message += getMessage("Field <b>Seller 5</b> can not be empty.", 6, form);
                    		hasErros = true;
                    	}
                    	// if (isEmpty("vendedor7", form)) {
                    	// 	message += getMessage("Field <b>Seller 7</b> can not be empty.", 6, form);
                    	// 	hasErros = true;
                    	// }
                    	// if (isEmpty("vendedor8", form)) {
                    	// 	message += getMessage("Field <b>Seller 8</b> can not be empty.", 6, form);
                    	// 	hasErros = true;
                    	// }
                		
	            		var indexes = form.getChildrenIndexes("tbItensOrcamento");
	    	            var itemOrcamentoCodProdItem = false;
	    	            var itemOrcamentoDescProdItem = false;
	    	            
	    	            if(indexes.length == 0){
	    	            	if (isMobile(form)) {
	    	            		message += getMessage("Item table has no items.", 6, form);
	    	            	}else{
	    	            		message += getMessage("Item table has no items.", 6, form);
	    	            	}
	    	            	hasErros = true;
	    	            }else{
	    					for (var i = 0; i < indexes.length; i++) {
	    						var orcQtdItem = '';
	    						var orcEmbalagemItem = '';
	    						var orcCodProdutoItem = form.getValue("orcCodProdutoItem___"+ indexes[i]);
	            				var orcDescProdutoItem = form.getValue("orcDescProdutoItem___"+ indexes[i]);
	    						
	    						if (form.getValue("orcQtdItem___"+indexes[i]) == '0'){
	    							 message += getMessage("Item <b>" + orcCodProdutoItem + " - " +orcDescProdutoItem +"</b> has an invalid <b>Quantity</b> field.", 6, form);
	    				           	 hasErros = true;
	    						}
	    						
	    						if (!itemOrcamentoCodProdItem && isEmpty("orcCodProdutoItem___" + indexes[i], form)) {
	    							 message += getMessage("The <b>Items table</b> has one or more invalid <b>Product Code</b> fields.", 6, form);
	    				           	 hasErros = true;
	    				           	itemOrcamentoCodProdItem =  true;
	    						}
	    						
	    						if (!itemOrcamentoDescProdItem && isEmpty("orcDescProdutoUSAItem___" + indexes[i], form)) {
	    							message += getMessage("The <b>Items table</b> has one or more invalid <b>Product Description</b> fields.", 6, form);
	    							hasErros = true;
	    							itemOrcamentoDescProdItem =  true;
	    						}
	    						
	    						if ( isEmpty("orcPrecoCustoItem___" + indexes[i], form)) {
	    							 message += getMessage("Item <b>" + orcCodProdutoItem + " - " +orcDescProdutoItem +"</b> has an invalid <b>Cost Price</b> field.", 6, form);
	    							 hasErros = true;
	    				           	itemDivergPecaDescProdItem = true;
	    						}		
	    						
	    						orcQtdItem = form.getValue("orcQtdItem___"+indexes[i])
	    						orcEmbalagemItem = form.getValue("orcEmbalagemItem___"+indexes[i])
	    						
	    						if( orcEmbalagemItem > 1 || !isEmpty("orcEmbalagemItem___" + indexes[i], form) ){
	    							var calculoMultiplo = orcQtdItem % orcEmbalagemItem;
	    							if( calculoMultiplo > 0 ){
	    								message += getMessage("The <b>Product Quantity " + orcCodProdutoItem + " - " +orcDescProdutoItem + "</b> is invalid by its packaging multiple.", 6, form, "");
	    					           	hasErros = true;
	    								
	    							}
	    						}
	    					}
	    					
	    	            }
	    	            
	    	            //Se for clicado em Enviar valida se o valor mínimo foi atingido
			            if (getValue("WKCompletTask") == "true" ){
				        	if (form.getValue("ValorValido") == 'false'){
				        		message +=  getMessage("The minimum total amount for this type of order is <b>$ "+ form.getValue("ValorMinimo") + "</b>", 6, form);
				   	           	hasErros = true;
								
							}
			            }
                	}
    	        }
					
        	}	
        	//Se o usuário for Balconista ou se for Gerente e ter escolhido um orcamento
        	else if(form.getValue("A1_TIPO").toUpperCase() == 'BALCONISTA' || form.getValue("defineOrcamentoPedido") == 'orcamento'){
        		
        		if (isEmpty("orcNomeClienteFinal", form)) {
                    message += getMessage("Nome do Cliente", 1, form);
                    hasErros = true;
                }
            	if (isEmpty("orcTelClienteFinal", form)) {
                    message += getMessage("Telefone", 1, form);
                    hasErros = true;
                }        
            	
            	if (isEmpty("vendedor1", form)) {
                    message += getMessage("Vendedor 1", 1, form);
                    hasErros = true;
                }
            	if (isEmpty("vendedor4", form)) {
            		message += getMessage("Vendedor 4", 1, form);
            		hasErros = true;
            	}
            	if (isEmpty("vendedor5", form)) {
            		message += getMessage("Vendedor 5", 1, form);
            		hasErros = true;
            	}
            	// if (isEmpty("vendedor7", form)) {
            	// 	message += getMessage("Vendedor 7", 1, form);
            	// 	hasErros = true;
            	// }
            	// if (isEmpty("vendedor8", form)) {
            	// 	message += getMessage("Vendedor 8", 1, form);
            	// 	hasErros = true;
            	// }
            	
            	
            	var indexes = form.getChildrenIndexes("tbItensOrcamento");
                var itemOrcamentoCodProdItem = false;
                var itemOrcamentoDescProdItem = false;
                var itemOrcamentoPrecoUnitItem = false;
                
               
                if(indexes.length == 0){
                	if (isMobile(form)) {
                		message += getMessage("Tabela de itens não possui nenhum item.", 6, form);
                	}else{
                		message += getMessage("Tabela <b>itens</b> não possui nenhum item.", 6, form);
                	}
                	hasErros = true;
                }else{
    				for (var i = 0; i < indexes.length; i++) {					
    					if (!itemOrcamentoCodProdItem && isEmpty("orcCodProdutoItem___" + indexes[i], form)) {
    						message += getMessage("Cod. Produto", 5, form, "Itens do orçamento");
    			           	hasErros = true;
    			           	itemOrcamentoCodProdItem=  true;
    					}
    					
    					if ( !itemOrcamentoDescProdItem && isEmpty("orcDescProdutoItem___" + indexes[i], form)) {
    						message += getMessage("Desc. Produto", 5, form, "Itens do orçamento");
    			           	hasErros = true;
    			           	itemOrcamentoDescProdItem = true;
    					}	

    					if ( !itemOrcamentoPrecoUnitItem && isEmpty("orcPrecoUnitItem___" + indexes[i], form)) {
    						message += getMessage("Valor Unitário", 5, form, "Itens do orçamento");
    						hasErros = true;
    						itemOrcamentoPrecoUnitItem = true;
    					}	
    					
    					if (form.getValue("orcQtdItem___"+indexes[i]) == '0'){
    						message += getMessage("Quantidade", 4, form, "Itens do orçamento");
    			           	hasErros = true;
    					}
    					
    					if (isEmpty("orcQtdItem___" + indexes[i], form)){
    						message += getMessage("Quantidade", 1, form, "Itens do orçamento");
    			           	hasErros = true;
    					}
    					
    				}
                }
                
        	}else if( form.getValue("A1_TIPO").toUpperCase() == 'GERENTE' ){
        		
    			if (isEmpty("defineOrcamentoPedido", form)) {
        			message += getMessage("O que você deseja realizar?", 3, form);
	                hasErros = true;
	                
        		}else if( form.getValue("defineOrcamentoPedido") == 'Cancelar' ){
//        	       		if (isEmpty("gerarPedidoMotCancel", form)) {	
//        	       			message += getMessage("Motivo de Cancelamento", 1, form);
//                           hasErros = true;
//        	       		}
    	        }else{
        			
        			
        			var pedidoNoPrazo = true;
                	if(parseInt(WKNumState) == INICIO){
                		
                		var dataMaximaOrcamento = '';
        	       		var dataHoje = '';
        	       		var fields = ["startDateProcess"];
        	     		var c1 = DatasetFactory.createConstraint("workflowProcessPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
        	     		var c2 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", getValue("WKNumProces"), getValue("WKNumProces"), ConstraintType.MUST);
        	     		var datasetWorkflowProcess = DatasetFactory.getDataset("workflowProcess", fields, [ c1, c2 ], null);
        	     		if(dsTemValor(datasetWorkflowProcess)){
        	     			
        	     			startDateProcess = datasetWorkflowProcess.getValue(0, "startDateProcess");
        	     			//Adiciona 30 dias a mais na data de início do processo
        	     			startDateProcess.setDate(startDateProcess.getDate()+20);
        	     			var diaMaxOrc = addZero(startDateProcess.getDate());
        		     		var mesMaxOrc = addZero(startDateProcess.getMonth()+1);
        		     		//Para pegar o ano, não funciona com getFullYear, então transformo a data em string e retiro os primeiros 4 caracteres que é o ano
        		     		startDateProcess = startDateProcess.toString();
        		     		anoMaxOrc = startDateProcess.substring(0, 4);
        		     		dataMaximaOrcamento = anoMaxOrc+ "" + mesMaxOrc + "" + diaMaxOrc;
        	     			
        		     		
        	     			//Valida a data maxima com a data de hoje
        	     			dataHoje = new Date();
        	     			dataHoje.setDate(dataHoje.getDate());
        	     		    var diaHoje = addZero(dataHoje.getDate());
        	     		    var mesHoje = addZero(dataHoje.getMonth()+1);
        	     		    var anoHoje = dataHoje.getFullYear(); 
        	     		    dataHoje = anoHoje+ "" + mesHoje + "" + diaHoje;
        	     		   
        	     		}
        	     		
        	     		if(dataHoje > dataMaximaOrcamento){
        	       			message += getMessage("O orçamento está aberto a mais de 15 dias, é preciso cancelar este orçamento e criar um novo.", 6, form);	
        	       			hasErros = true;
        	       			pedidoNoPrazo = false;
        	       		}
        	     		
                	}
                	
                	if(pedidoNoPrazo){
                		
                		if (isEmpty("vendedor1", form)) {
                            message += getMessage("Vendedor 1", 1, form);
                            hasErros = true;
                        }
                    	if (isEmpty("vendedor4", form)) {
                    		message += getMessage("Vendedor 4", 1, form);
                    		hasErros = true;
                    	}
                    	if (isEmpty("vendedor5", form)) {
                    		message += getMessage("Vendedor 5", 1, form);
                    		hasErros = true;
                    	}
                    	// if (isEmpty("vendedor7", form)) {
                    	// 	message += getMessage("Vendedor 7", 1, form);
                    	// 	hasErros = true;
                    	// }
                    	// if (isEmpty("vendedor8", form)) {
                    	// 	message += getMessage("Vendedor 8", 1, form);
                    	// 	hasErros = true;
                    	// }
                		
		        		if (isEmpty("tipoPedido", form)) {
			                message += getMessage("Tipo de pedido", 1, form);
			                hasErros = true;
			            }
			        	
			        	if (isEmpty("codCondPagto", form)) {
			                message += getMessage("Condição de pagamento", 1, form);
			                hasErros = true;
			            }
			        	
			        	if (isEmpty("tpFrete", form)) {
			                message += getMessage("Frete", 1, form);
			                hasErros = true;
			            }
			        	
			        	if ( form.getValue("chkTransporteProprio") == 'sim' ) {
			        		if(isEmpty("nomeTransportadora", form)){
			        			message += getMessage("Transportadora", 1, form);
				                hasErros = true;
			        		} 	
			        	}else if ( form.getValue("chkRedespacho") == 'sim' ) {
		        			if( form.getValue("tpFrete").toUpperCase() != 'CIF' ){
			        			if (isMobile(form)) {
			        				message += getMessage("<b>Frete</b> deve estar definido como <b>CIF</b>.", 6, form);
			        			}else{
			        				message += getMessage("<b>Frete</b> deve estar definido como <b>CIF</b>.", 6, form);
			        			}
				                hasErros = true;
			        		}
		        			
		        			if(isEmpty("nomeTransportadora", form)){
			        			message += getMessage("Transportadora", 1, form);
				                hasErros = true;
			        		}else if(isEmpty("codTransportadora", form)){
			        			message += getMessage("Cod. Transportadora", 1, form);
				                hasErros = true;
			        		} 	
		        			
			        		if(isEmpty("zoomRedespacho", form)){
			        			message += getMessage("Redespacho", 1, form);
				                hasErros = true;
			        		}else if(isEmpty("nomeRedespacho", form)){
			        			message += getMessage("Redespacho", 1, form);
				                hasErros = true;
			        		}else if(isEmpty("redespachoMsgNotaFiscal", form)){
			        			message += getMessage("Mensagem para Nota Fiscal - Redespacho", 1, form);
				                hasErros = true;
			        		}
			        		
		        		}else{
			            	if(isEmpty("tpTransportadora", form)){
			        			message += getMessage("Transportadora", 1, form);
				                hasErros = true;
			        		}else if(isEmpty("codTransportadora", form)){
			        			message += getMessage("Cod. Transportadora", 1, form);
				                hasErros = true;
			        		}
			            }
			        	
			        	
			        	if( form.getValue("tipoPedido") == 'PG' ){
			        		
			        		if (isEmpty("dataAberturaPed", form)) {
			                    message += getMessage("Data de Abertura do Atendimento", 1, form);
			                    hasErros = true;
			                }
			        		
			        		if (isEmpty("garantiaBalcao", form)) {
			                    message += getMessage("Garantia balcão?", 1, form);
			                    hasErros = true;
			                }
			        		
			        		if( form.getValue("garantiaBalcao") == 'Sim' ){
			        			if (isEmpty("dataEmissaoBalcao", form)) {
			                        message += getMessage("Data da Emissão via balcão NF", 1, form);
			                        hasErros = true;
			                    }
			        			if (isEmpty("NFEmissaoBalcao", form)) {
			                        message += getMessage("Num. da Nota Fiscal via balcão", 1, form);
			                        hasErros = true;
			                    }
			        			
			        		}
			        		
			        		if( form.getValue("garantiaBalcao") == 'Nao' ){
			        			if (isEmpty("nroNFGTS", form)) {
			                        message += getMessage("Num. da NF GTS da Compra do Equip.", 1, form);
			                        hasErros = true;
			                    }
			        			if (isEmpty("dataVenda", form)) {
			                        message += getMessage("Data da NF da venda do Equip. p/ o cliente", 1, form);
			                        hasErros = true;
			                    }
			        			if (isEmpty("nroNFVenda", form)) {
			                        message += getMessage("Num. da NF da venda do Equip. p/ o cliente", 1, form);
			                        hasErros = true;
			                    }
			        			if (isEmpty("serieEquipamento", form)) {
			                        message += getMessage("Série Equipamento em Período de Garantia", 1, form);
			                        hasErros = true;
			                    }
			        		}
			        	}
			        	
			        	if( form.getValue("tipoPedido") == 'PP' ){
			        		
			        		if (isEmpty("periodoInicialDescontoPP", form) || isEmpty("periodoFinalDescontoPP", form) || isEmpty("porcDescontoPP", form)) {
		                        message += getMessage("Não existe <b>pedido promocional</b> hoje, favor selecionar outro tipo de pedido.", 6, form);
		                        hasErros = true;
		                    }
			        	}
			        	
			        	if( form.getValue("tipoPedido") == 'CP' ){
			        		
			        		if ( form.getValue("CPchkAceite") != 'aceito' ) {
			        			message += getMessage("Aceite Compra Programada", 7, form);
			                    hasErros = true;
			                }
			        		
			        		//Se for clicado em Enviar valida se o valor mínimo foi atingido
				            if (getValue("WKCompletTask") == "true" ){
				        		var CPValor_1 = parseInt(form.getValue("CPValor_1").replace('.','').replace(',','.') );
				        		if(CPValor_1 < 1500){
				        			if (isMobile(form)) {
					            		message += getMessage("O valor mínimo da 1ª retirada é de R$ 1.500,00", 6, form);
					            	}else{
					            		message += getMessage("O valor mínimo da 1ª retirada é de <b>R$ 1.500,00</b>", 6, form);
					            	}
				        			
			                        hasErros = true;
				        		}
			        		}
			        		
			        		var CPqtdOpcaoRecebimento = form.getValue("CPqtdOpcaoRecebimento");
			        		if( CPqtdOpcaoRecebimento == 2){
			        			if (isEmpty("CPProgramacaoRetirada_2", form)) {
			                        message += getMessage("Programação da 2ª Retirada", 1, form);
			                        hasErros = true;
			                    }
			        			
			        		}else if( CPqtdOpcaoRecebimento == 3){
			        			if (isEmpty("CPProgramacaoRetirada_2", form)) {
			                        message += getMessage("Programação da 2ª Retirada", 1, form);
			                        hasErros = true;
			                    }
			        			
			        			if (isEmpty("CPProgramacaoRetirada_3", form)) {
			                        message += getMessage("Programação da 3ª Retirada", 1, form);
			                        hasErros = true;
			                    }
			        			
			        		}
			        		
			        	}
			        	
			        	var indexes = form.getChildrenIndexes("tbItensOrcamento");
			            var itemOrcamentoCodProdItem = false;
			            var itemOrcamentoDescProdItem = false;
			            var itemOrcamentoPrecoUnitItem = false;
			            var itemOrcamentoExisteQtdCP1Ret = false;
			            var itemOrcamentoExisteQtdCP2Ret = false;
			            var itemOrcamentoExisteQtdCP3Ret = false;
			            
			            if(indexes.length == 0){
			            	if (isMobile(form)) {
			            		message += getMessage("Tabela de itens não possui nenhum item.", 6, form);
			            	}else{
			            		message += getMessage("Tabela <b>itens</b> não possui nenhum item.", 6, form);
			            	}
			            	hasErros = true;
			            }else{
							for (var i = 0; i < indexes.length; i++) {
								var orcQtdItem = '';
								var orcEmbalagemItem = '';
								var orcCodProdutoItem = form.getValue("orcCodProdutoItem___"+ indexes[i]);
	            				var orcDescProdutoItem = form.getValue("orcDescProdutoItem___"+ indexes[i]);
								
								if (!itemOrcamentoCodProdItem && isEmpty("orcCodProdutoItem___" + indexes[i], form)) {
									message += getMessage("Cod. Produto", 5, form, "Itens do orçamento");
						           	hasErros = true;
						           	itemOrcamentoCodProdItem=  true;
								}
								
								if ( !itemOrcamentoDescProdItem && isEmpty("orcDescProdutoItem___" + indexes[i], form)) {
		    						message += getMessage("Desc. Produto", 5, form, "Itens do orçamento");
		    			           	hasErros = true;
		    			           	itemOrcamentoDescProdItem = true;
		    					}	
								
								if ( !itemOrcamentoPrecoUnitItem && isEmpty("orcPrecoCustoItem___" + indexes[i], form)) {
									message += getMessage("Valor Custo no produto " + orcCodProdutoItem + " - " +orcDescProdutoItem, 5, form, "Itens do orçamento");
						           	hasErros = true;
						           	itemOrcamentoPrecoUnitItem = true;
								}		
								
								if (form.getValue("orcQtdItem___"+indexes[i]) == '0'){
									message += getMessage("Quantidade no produto " + orcCodProdutoItem + " - " +orcDescProdutoItem, 4, form, "Itens do orçamento");
						           	hasErros = true;
								}
								
								if (isEmpty("orcPrecoCustoItem___" + indexes[i], form)){
									message += getMessage("Preço Custo no produto " + orcCodProdutoItem + " - " +orcDescProdutoItem, 1, form, "Itens do orçamento");
						           	hasErros = true;
								}
								
								if(form.getValue("tipoPedido") == 'CP'){
									
									var CPqtdOpcaoRecebimento = parseInt(form.getValue("CPqtdOpcaoRecebimento"));
									
									orcEmbalagemItem = form.getValue("orcEmbalagemItem___"+indexes[i]);
									
									if( orcEmbalagemItem > 1 || !isEmpty("orcEmbalagemItem___" + indexes[i], form) ){
										
										if(CPqtdOpcaoRecebimento >= 1){
											var orcQtdCP1RetItem = parseInt(form.getValue("orcQtdCP1RetItem___"+indexes[i]));
											var calculoMultiploCP1 = orcQtdCP1RetItem % orcEmbalagemItem;
											if( calculoMultiploCP1 > 0 ){
												message += getMessage("A <b>Quantidade do produto " + orcCodProdutoItem + " - " +orcDescProdutoItem + "</b> está inválida pelo múltiplo de sua embalagem na 1ª retirada.", 6, form, "");
									           	hasErros = true;
												
											}
											
											if(orcQtdCP1RetItem > 0){
												//Esse if é só para marcar a variavel itemOrcamentoExisteQtdCP1Ret que existe pelo menos uma quantidade de retirada
												//de pelo menos de 1 produto naquela retirada.
												itemOrcamentoExisteQtdCP1Ret = true;
											}
											
										}
										
										if(CPqtdOpcaoRecebimento >= 2){
											var orcQtdCP2RetItem = parseInt(form.getValue("orcQtdCP2RetItem___"+indexes[i]));
											var calculoMultiploCP2 = orcQtdCP2RetItem % orcEmbalagemItem;
											if( calculoMultiploCP2 > 0 ){
												message += getMessage("A <b>Quantidade do produto " + orcCodProdutoItem + " - " +orcDescProdutoItem + "</b> está inválida pelo múltiplo de sua embalagem na 2ª retirada.", 6, form, "");
												hasErros = true;
												
											}
											
											if(orcQtdCP2RetItem > 0){
												//Esse if é só para marcar a variavel itemOrcamentoExisteQtdCP1Ret que existe pelo menos uma quantidade de retirada
												//de pelo menos de 1 produto naquela retirada.
												itemOrcamentoExisteQtdCP2Ret = true;
											}
										}
										
										if(CPqtdOpcaoRecebimento >= 3){
											var orcQtdCP3RetItem = parseInt(form.getValue("orcQtdCP3RetItem___"+indexes[i]));
											var calculoMultiploCP3 = orcQtdCP3RetItem % orcEmbalagemItem;
											if( calculoMultiploCP3 > 0 ){
												message += getMessage("A <b>Quantidade do produto " + orcCodProdutoItem + " - " +orcDescProdutoItem + "</b> está inválida pelo múltiplo de sua embalagem na 3ª retirada.", 6, form, "");
												hasErros = true;
												
											}
											
											if(orcQtdCP3RetItem > 0){
												//Esse if é só para marcar a variavel itemOrcamentoExisteQtdCP1Ret que existe pelo menos uma quantidade de retirada
												//de pelo menos de 1 produto naquela retirada.
												itemOrcamentoExisteQtdCP3Ret = true;
											}
										}
										
										
									}
									
									
								}else{
									orcQtdItem = form.getValue("orcQtdItem___"+indexes[i])
									orcEmbalagemItem = form.getValue("orcEmbalagemItem___"+indexes[i])
									
									if( orcEmbalagemItem > 1 || !isEmpty("orcEmbalagemItem___" + indexes[i], form) ){
										var calculoMultiplo = orcQtdItem % orcEmbalagemItem;
										if( calculoMultiplo > 0 ){
											
											message += getMessage("A <b>Quantidade do produto " + orcCodProdutoItem + " - " +orcDescProdutoItem + "</b> está inválida pelo múltiplo de sua embalagem.", 6, form, "");
								           	hasErros = true;
											
										}
									}
								}
							}
							
							if(form.getValue("tipoPedido") == 'CP'){
								
								var CPqtdOpcaoRecebimento = parseInt(form.getValue("CPqtdOpcaoRecebimento"));
								if(CPqtdOpcaoRecebimento >= 1){
									//Se não tiver nenhum item em nenhum produto na quantidade de retirada 2, dispara essa msg
									if(!itemOrcamentoExisteQtdCP1Ret){
										message += getMessage("Não existe <b>nenhuma quantidade</b> na 1ª retirada", 6, form, "");
							           	hasErros = true;
									}
								}
								if(CPqtdOpcaoRecebimento >= 2){
									//Se não tiver nenhum item em nenhum produto na quantidade de retirada 2, dispara essa msg
									if(!itemOrcamentoExisteQtdCP2Ret){
										message += getMessage("Não existe <b>nenhuma quantidade</b> na 2ª retirada", 6, form, "");
							           	hasErros = true;
									}
								}
								if(CPqtdOpcaoRecebimento >= 3){
									//Se não tiver nenhum item em nenhum produto na quantidade de retirada 3, dispara essa msg
									if(!itemOrcamentoExisteQtdCP3Ret){
										message += getMessage("Não existe <b>nenhuma quantidade</b> na 3ª retirada", 6, form, "");
							           	hasErros = true;
									}
								}
								
							}
							
							
			            }
			           //Se for clicado em Enviar valida se o valor mínimo foi atingido
			            if (getValue("WKCompletTask") == "true" ){
				        	if (form.getValue("ValorValido") == 'false'){
				        		message +=  getMessage("O valor mínimo do total para este tipo de pedido é de <b>R$ "+ form.getValue("ValorMinimo") + "</b>", 6, form);
				   	           	hasErros = true;
								
							}
			            }
	        		}
        		}
        		
        	}else{
        		
        		message +=  getMessage("Não é possível salvar o pedido.", 6, form);
   	           	hasErros = true;
				
   	           	
        	}
        	break;
        	
        case REVISARORCAMENTO:  
        	
        	if (isEmpty("formalizarPedido", form)) {	
	           	 message += getMessage("É preciso selecionar a ação (<b>Formalizar Pedido</b>, <b>Cancelar</b> ou <b>Salvar</b>)", 6, form);
	           	 hasErros = true;
	       	}
	       	
	       	if( form.getValue("formalizarPedido") == 'Cancelar' ){
	       		if (isEmpty("formalizarPedidoMotCancel", form)) {	
	       			message += getMessage("Motivo de Cancelamento", 1, form);
                    hasErros = true;
	       		}
	       	}else{
	       		
	       		var dataMaximaOrcamento = '';
	       		var dataHoje = '';
	       		var fields = ["startDateProcess"];
	     		var c1 = DatasetFactory.createConstraint("workflowProcessPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	     		var c2 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", getValue("WKNumProces"), getValue("WKNumProces"), ConstraintType.MUST);
	     		var datasetWorkflowProcess = DatasetFactory.getDataset("workflowProcess", fields, [ c1, c2 ], null);
	     		if(dsTemValor(datasetWorkflowProcess)){
	     			
	     			startDateProcess = datasetWorkflowProcess.getValue(0, "startDateProcess");
	     			//Adiciona 30 dias a mais na data de início do processo
	     			startDateProcess.setDate(startDateProcess.getDate()+20);
	     			var diaMaxOrc = addZero(startDateProcess.getDate());
		     		var mesMaxOrc = addZero(startDateProcess.getMonth()+1);
		     		//Para pegar o ano, não funciona com getFullYear, então transformo a data em string e retiro os primeiros 4 caracteres que é o ano
		     		startDateProcess = startDateProcess.toString();
		     		anoMaxOrc = startDateProcess.substring(0, 4);
		     		dataMaximaOrcamento = anoMaxOrc+ "" + mesMaxOrc + "" + diaMaxOrc;
	     			
		     		
	     			//Valida a data maxima com a data de hoje
	     			dataHoje = new Date();
	     			dataHoje.setDate(dataHoje.getDate());
	     		    var diaHoje = addZero(dataHoje.getDate());
	     		    var mesHoje = addZero(dataHoje.getMonth()+1);
	     		    var anoHoje = dataHoje.getFullYear(); 
	     		    dataHoje = anoHoje+ "" + mesHoje + "" + diaHoje;
	     		   
	     		} 
	       		if(dataHoje > dataMaximaOrcamento){
	       			message += getMessage("O orçamento está aberto a mais de 15 dias, é preciso cancelar este orçamento e criar um novo.", 6, form);	
	       			hasErros = true;
	       		}else{
	       			
	       			
	       			if (isEmpty("orcNomeClienteFinal", form)) {
	                    message += getMessage("Nome do Cliente", 1, form);
	                    hasErros = true;
	                }
	            	if (isEmpty("orcTelClienteFinal", form)) {
	                    message += getMessage("Telefone", 1, form);
	                    hasErros = true;
	                }        
	            	if (isEmpty("gerenteRevenda", form)) {
		                message += getMessage("Não está definido o Gerente da Revenda! Entre em contato com o Administrador!", 6, form);
		                hasErros = true;
		            }
	            	
	            	var indexes = form.getChildrenIndexes("tbItensOrcamento");
	                var itemOrcamentoCodProdItem = false;
	                var itemOrcamentoDescProdItem = false;
	                var itemDivergPecaPrecoUnitItem = false;
	                
	               
	                if(indexes.length == 0){
	                	if (isMobile(form)) {
	                		message += getMessage("Tabela de itens não possui nenhum item.", 6, form);
	                	}else{
	                		message += getMessage("Tabela <b>itens</b> não possui nenhum item.", 6, form);
	                	}
	                	hasErros = true;
	                }else{
	    				for (var i = 0; i < indexes.length; i++) {					
	    					if (!itemOrcamentoCodProdItem && isEmpty("orcCodProdutoItem___" + indexes[i], form)) {
	    						message += getMessage("Cod. Produto", 5, form, "Itens do orçamento");
	    			           	hasErros = true;
	    			           	itemOrcamentoCodProdItem=  true;
	    					}
	    					
	    					if ( !itemOrcamentoDescProdItem && isEmpty("orcDescProdutoItem___" + indexes[i], form)) {
	    						message += getMessage("Desc. Produto", 5, form, "Itens do orçamento");
	    			           	hasErros = true;
	    			           	itemOrcamentoDescProdItem = true;
	    					}	

	    					if ( !itemDivergPecaPrecoUnitItem && isEmpty("orcPrecoUnitItem___" + indexes[i], form)) {
	    						message += getMessage("Valor Unitário", 5, form, "Itens do orçamento");
	    						hasErros = true;
	    						itemDivergPecaPrecoUnitItem = true;
	    					}	
	    					
	    					if (form.getValue("orcQtdItem___"+indexes[i]) == '0'){
	    						message += getMessage("Quantidade", 4, form, "Itens do orçamento");
	    			           	hasErros = true;
	    					}
	    					
	    					if (isEmpty("orcQtdItem___" + indexes[i], form)){
	    						message += getMessage("Quantidade", 1, form, "Itens do orçamento");
	    			           	hasErros = true;
	    					}
	    					
	    				}
	                }
	       		}
	       	}
        	
        	break;
        case FORMALIZAPEDIDO:
        	
        	if (isEmpty("gerarPedidoGTS", form)) {	
	           	 message += getMessage("É preciso selecionar a ação (<b>Gerar Pedido na GTS</b>, <b>Cancelar</b> ou <b>Salvar</b>)", 6, form);
	           	 hasErros = true;
	       	}
	       	
	       	if( form.getValue("gerarPedidoGTS") == 'Cancelar' ){
	       		if (isEmpty("gerarPedidoMotCancel", form)) {	
	       			message += getMessage("Motivo de Cancelamento", 1, form);
                   hasErros = true;
	       		}
	       	}else{
	       		
	       		var dataMaximaOrcamento = '';
	       		var dataHoje = '';
	       		var fields = ["startDateProcess"];
	     		var c1 = DatasetFactory.createConstraint("workflowProcessPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	     		var c2 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", getValue("WKNumProces"), getValue("WKNumProces"), ConstraintType.MUST);
	     		var datasetWorkflowProcess = DatasetFactory.getDataset("workflowProcess", fields, [ c1, c2 ], null);
	     		if(dsTemValor(datasetWorkflowProcess)){
	     			
	     			startDateProcess = datasetWorkflowProcess.getValue(0, "startDateProcess");
	     			//Adiciona 30 dias a mais na data de início do processo
	     			startDateProcess.setDate(startDateProcess.getDate()+20);
	     			var diaMaxOrc = addZero(startDateProcess.getDate());
		     		var mesMaxOrc = addZero(startDateProcess.getMonth()+1);
		     		//Para pegar o ano, não funciona com getFullYear, então transformo a data em string e retiro os primeiros 4 caracteres que é o ano
		     		startDateProcess = startDateProcess.toString();
		     		anoMaxOrc = startDateProcess.substring(0, 4);
		     		dataMaximaOrcamento = anoMaxOrc+ "" + mesMaxOrc + "" + diaMaxOrc;
	     			
		     		
	     			//Valida a data maxima com a data de hoje
	     			dataHoje = new Date();
	     			dataHoje.setDate(dataHoje.getDate());
	     		    var diaHoje = addZero(dataHoje.getDate());
	     		    var mesHoje = addZero(dataHoje.getMonth()+1);
	     		    var anoHoje = dataHoje.getFullYear(); 
	     		    dataHoje = anoHoje+ "" + mesHoje + "" + diaHoje;
	     		   
	     		} 
	     		getMessage(dataHoje, 6, form);
	     		getMessage(dataMaximaOrcamento, 6, form);
	       		if(dataHoje > dataMaximaOrcamento){
	       			message += getMessage("O orçamento está aberto a mais de 15 dias, é preciso cancelar este orçamento e criar um novo.", 6, form);	
	       			hasErros = true;
	       		}else{
	       			
	       			if (isEmpty("vendedor1", form)) {
	                    message += getMessage("Vendedor 1", 1, form);
	                    hasErros = true;
	                }
	            	if (isEmpty("vendedor4", form)) {
	            		message += getMessage("Vendedor 4", 1, form);
	            		hasErros = true;
	            	}
	            	if (isEmpty("vendedor5", form)) {
	            		message += getMessage("Vendedor 5", 1, form);
	            		hasErros = true;
	            	}
	            	// if (isEmpty("vendedor7", form)) {
	            	// 	message += getMessage("Vendedor 7", 1, form);
	            	// 	hasErros = true;
	            	// }
	            	// if (isEmpty("vendedor8", form)) {
	            	// 	message += getMessage("Vendedor 8", 1, form);
	            	// 	hasErros = true;
	            	// }
	            	
		        	if (isEmpty("tipoPedido", form)) {
		                message += getMessage("Tipo de pedido", 1, form);
		                hasErros = true;
		            }
		        	
		        	if (isEmpty("codCondPagto", form)) {
		                message += getMessage("Condição de pagamento", 1, form);
		                hasErros = true;
		            }
		        	
		        	if (isEmpty("tpFrete", form)) {
		                message += getMessage("Frete", 1, form);
		                hasErros = true;
		            }
		        	
		        	if ( form.getValue("chkTransporteProprio") == 'sim' ) {
		        		if(isEmpty("nomeTransportadora", form)){
		        			message += getMessage("Transportadora", 1, form);
			                hasErros = true;
		        		} 	
		        	}else if ( form.getValue("chkRedespacho") == 'sim' ) {
	        			if( form.getValue("tpFrete").toUpperCase() != 'CIF' ){
		        			if (isMobile(form)) {
		        				message += getMessage("<b>Frete</b> deve estar definido como <b>CIF</b>.", 6, form);
		        			}else{
		        				message += getMessage("<b>Frete</b> deve estar definido como <b>CIF</b>.", 6, form);
		        			}
			                hasErros = true;
		        		}
	        			
	        			if(isEmpty("nomeTransportadora", form)){
		        			message += getMessage("Transportadora", 1, form);
			                hasErros = true;
		        		}else if(isEmpty("codTransportadora", form)){
		        			message += getMessage("Cod. Transportadora", 1, form);
			                hasErros = true;
		        		} 	
	        			
		        		if(isEmpty("zoomRedespacho", form)){
		        			message += getMessage("Redespacho", 1, form);
			                hasErros = true;
		        		}else if(isEmpty("nomeRedespacho", form)){
		        			message += getMessage("Redespacho", 1, form);
			                hasErros = true;
		        		}else if(isEmpty("redespachoMsgNotaFiscal", form)){
		        			message += getMessage("Mensagem para Nota Fiscal - Redespacho", 1, form);
			                hasErros = true;
		        		}
		        		
	        		}else{
		            	if(isEmpty("tpTransportadora", form)){
		        			message += getMessage("Transportadora", 1, form);
			                hasErros = true;
		        		}else if(isEmpty("codTransportadora", form)){
		        			message += getMessage("Cod. Transportadora", 1, form);
			                hasErros = true;
		        		}
		            }
		        	
		        	if( form.getValue("tipoPedido") == 'PG' ){
		        		
		        		if (isEmpty("dataAberturaPed", form)) {
		                    message += getMessage("Data de Abertura do Atendimento", 1, form);
		                    hasErros = true;
		                }
		        		
		        		if (isEmpty("garantiaBalcao", form)) {
		                    message += getMessage("Garantia balcão?", 1, form);
		                    hasErros = true;
		                }
		        		
		        		if( form.getValue("garantiaBalcao") == 'Sim' ){
		        			if (isEmpty("dataEmissaoBalcao", form)) {
		                        message += getMessage("Data da Emissão via balcão NF", 1, form);
		                        hasErros = true;
		                    }
		        			if (isEmpty("NFEmissaoBalcao", form)) {
		                        message += getMessage("Num. da Nota Fiscal via balcão", 1, form);
		                        hasErros = true;
		                    }
		        			
		        		}
		        		
		        		if( form.getValue("garantiaBalcao") == 'Nao' ){
		        			if (isEmpty("nroNFGTS", form)) {
		                        message += getMessage("Num. da NF GTS da Compra do Equip.", 1, form);
		                        hasErros = true;
		                    }
		        			if (isEmpty("dataVenda", form)) {
		                        message += getMessage("Data da NF da venda do Equip. p/ o cliente", 1, form);
		                        hasErros = true;
		                    }
		        			if (isEmpty("nroNFVenda", form)) {
		                        message += getMessage("Num. da NF da venda do Equip. p/ o cliente", 1, form);
		                        hasErros = true;
		                    }
		        			if (isEmpty("serieEquipamento", form)) {
		                        message += getMessage("Série Equipamento em Período de Garantia", 1, form);
		                        hasErros = true;
		                    }
		        		}
		        	}
		        	
		        	if( form.getValue("tipoPedido") == 'PP' ){
		        		
		        		if (isEmpty("periodoInicialDescontoPP", form) || isEmpty("periodoFinalDescontoPP", form) || isEmpty("porcDescontoPP", form)) {
	                        message += getMessage("Não existe <b>pedido promocional</b> hoje, favor selecionar outro tipo de pedido.", 6, form);
	                        hasErros = true;
	                    }
		        	}
		        	
		        	if( form.getValue("tipoPedido") == 'CP' ){
		        		
		        		if ( form.getValue("CPchkAceite") != 'aceito' ) {
		        			message += getMessage("Aceite Compra Programada", 7, form);
		                    hasErros = true;
		                }
		        		
		        		var CPValor_1 = parseInt(form.getValue("CPValor_1").replace('.','').replace(',','.') );
		        		if(CPValor_1 < 1500){
		        			if (isMobile(form)) {
			            		message += getMessage("O valor mínimo da 1ª retirada é de R$ 1.500,00", 6, form);
			            	}else{
			            		message += getMessage("O valor mínimo da 1ª retirada é de <b>R$ 1.500,00</b>", 6, form);
			            	}
		        			
	                        hasErros = true;
		        		}
		        		
		        		var CPqtdOpcaoRecebimento = form.getValue("CPqtdOpcaoRecebimento");
		        		if( CPqtdOpcaoRecebimento == 2){
		        			if (isEmpty("CPProgramacaoRetirada_2", form)) {
		                        message += getMessage("Programação da 2ª Retirada", 1, form);
		                        hasErros = true;
		                    }
		        			
		        		}else if( CPqtdOpcaoRecebimento == 3){
		        			if (isEmpty("CPProgramacaoRetirada_2", form)) {
		                        message += getMessage("Programação da 2ª Retirada", 1, form);
		                        hasErros = true;
		                    }
		        			
		        			if (isEmpty("CPProgramacaoRetirada_3", form)) {
		                        message += getMessage("Programação da 3ª Retirada", 1, form);
		                        hasErros = true;
		                    }
		        			
		        		}
		        		
		        	}
		        	
		        	var indexes = form.getChildrenIndexes("tbItensOrcamento");
		            var itemOrcamentoCodProdItem = false;
		            var itemOrcamentoDescProdItem = false;
		            var itemOrcamentoExisteQtdCP1Ret = false;
		            var itemOrcamentoExisteQtdCP2Ret = false;
		            var itemOrcamentoExisteQtdCP3Ret = false;

		            if(indexes.length == 0){
		            	if (isMobile(form)) {
		            		message += getMessage("Tabela de itens não possui nenhum item.", 6, form);
		            	}else{
		            		message += getMessage("Tabela <b>itens</b> não possui nenhum item.", 6, form);
		            	}
		            	hasErros = true;
		            }else{
						for (var i = 0; i < indexes.length; i++) {
							var orcQtdItem = '';
							var orcEmbalagemItem = '';
							var orcCodProdutoItem = form.getValue("orcCodProdutoItem___"+ indexes[i]);
            				var orcDescProdutoItem = form.getValue("orcDescProdutoItem___"+ indexes[i]);
							
							if (!itemOrcamentoCodProdItem && isEmpty("orcCodProdutoItem___" + indexes[i], form)) {
								 message += getMessage("Cod. Produto", 5, form, "Itens do orçamento");
					           	 hasErros = true;
					           	itemDivergPecaCodProdItem=  true;
							}
							
							if ( !itemOrcamentoDescProdItem && isEmpty("orcPrecoCustoItem___" + indexes[i], form)) {
								 message += getMessage("Valor Custo no produto " + orcCodProdutoItem + " - " +orcDescProdutoItem, 5, form, "Itens do orçamento");
					           	 hasErros = true;
					           	itemDivergPecaDescProdItem = true;
							}		
							
							if (form.getValue("orcQtdItem___"+indexes[i]) == '0'){
								message += getMessage("Quantidade no produto " + orcCodProdutoItem + " - " +orcDescProdutoItem, 4, form, "Itens do orçamento");
					           	 hasErros = true;
							}
							
							if (isEmpty("orcPrecoCustoItem___" + indexes[i], form)){
								message += getMessage("Preço Custo no produto " + orcCodProdutoItem + " - " +orcDescProdutoItem, 1, form, "Itens do orçamento");
					           	hasErros = true;
							}
							
							if(form.getValue("tipoPedido") == 'CP'){
								
								var CPqtdOpcaoRecebimento = parseInt(form.getValue("CPqtdOpcaoRecebimento"));
								
								orcEmbalagemItem = form.getValue("orcEmbalagemItem___"+indexes[i]);
								
								if( orcEmbalagemItem > 1 || !isEmpty("orcEmbalagemItem___" + indexes[i], form) ){
									
									if(CPqtdOpcaoRecebimento >= 1){
										var orcQtdCP1RetItem = parseInt(form.getValue("orcQtdCP1RetItem___"+indexes[i]));
										var calculoMultiploCP1 = orcQtdCP1RetItem % orcEmbalagemItem;
										if( calculoMultiploCP1 > 0 ){
											message += getMessage("A <b>Quantidade do produto " + orcCodProdutoItem + " - " +orcDescProdutoItem + "</b> está inválida pelo múltiplo de sua embalagem na 1ª retirada.", 6, form, "");
								           	hasErros = true;
											
										}
										
										if(orcQtdCP1RetItem > 0){
											//Esse if é só para marcar a variavel itemOrcamentoExisteQtdCP1Ret que existe pelo menos uma quantidade de retirada
											//de pelo menos de 1 produto naquela retirada.
											itemOrcamentoExisteQtdCP1Ret = true;
										}
										
									}
									
									if(CPqtdOpcaoRecebimento >= 2){
										var orcQtdCP2RetItem = parseInt(form.getValue("orcQtdCP2RetItem___"+indexes[i]));
										var calculoMultiploCP2 = orcQtdCP2RetItem % orcEmbalagemItem;
										if( calculoMultiploCP2 > 0 ){
											message += getMessage("A <b>Quantidade do produto " + orcCodProdutoItem + " - " +orcDescProdutoItem + "</b> está inválida pelo múltiplo de sua embalagem na 2ª retirada.", 6, form, "");
											hasErros = true;
											
										}
										
										if(orcQtdCP2RetItem > 0){
											//Esse if é só para marcar a variavel itemOrcamentoExisteQtdCP1Ret que existe pelo menos uma quantidade de retirada
											//de pelo menos de 1 produto naquela retirada.
											itemOrcamentoExisteQtdCP2Ret = true;
										}
									}
									
									if(CPqtdOpcaoRecebimento >= 3){
										var orcQtdCP3RetItem = parseInt(form.getValue("orcQtdCP3RetItem___"+indexes[i]));
										var calculoMultiploCP3 = orcQtdCP3RetItem % orcEmbalagemItem;
										if( calculoMultiploCP3 > 0 ){
											message += getMessage("A <b>Quantidade do produto " + orcCodProdutoItem + " - " +orcDescProdutoItem + "</b> está inválida pelo múltiplo de sua embalagem na 3ª retirada.", 6, form, "");
											hasErros = true;
											
										}
										
										if(orcQtdCP3RetItem > 0){
											//Esse if é só para marcar a variavel itemOrcamentoExisteQtdCP1Ret que existe pelo menos uma quantidade de retirada
											//de pelo menos de 1 produto naquela retirada.
											itemOrcamentoExisteQtdCP3Ret = true;
										}
									}
									
									
								}
								
								
							}else{
								orcQtdItem = form.getValue("orcQtdItem___"+indexes[i])
								orcEmbalagemItem = form.getValue("orcEmbalagemItem___"+indexes[i])
								
								if( orcEmbalagemItem > 1 || !isEmpty("orcEmbalagemItem___" + indexes[i], form) ){
									var calculoMultiplo = orcQtdItem % orcEmbalagemItem;
									if( calculoMultiplo > 0 ){
										
										message += getMessage("A <b>Quantidade do produto " + orcCodProdutoItem + " - " +orcDescProdutoItem + "</b> está inválida pelo múltiplo de sua embalagem.", 6, form, "");
							           	hasErros = true;
										
									}
								}
							}
						}
						
						if(form.getValue("tipoPedido") == 'CP'){
							
							var CPqtdOpcaoRecebimento = parseInt(form.getValue("CPqtdOpcaoRecebimento"));
							if(CPqtdOpcaoRecebimento >= 1){
								//Se não tiver nenhum item em nenhum produto na quantidade de retirada 2, dispara essa msg
								if(!itemOrcamentoExisteQtdCP1Ret){
									message += getMessage("Não existe <b>nenhuma quantidade</b> na 1ª retirada", 6, form, "");
						           	hasErros = true;
								}
							}
							if(CPqtdOpcaoRecebimento >= 2){
								//Se não tiver nenhum item em nenhum produto na quantidade de retirada 2, dispara essa msg
								if(!itemOrcamentoExisteQtdCP2Ret){
									message += getMessage("Não existe <b>nenhuma quantidade</b> na 2ª retirada", 6, form, "");
						           	hasErros = true;
								}
							}
							if(CPqtdOpcaoRecebimento >= 3){
								//Se não tiver nenhum item em nenhum produto na quantidade de retirada 3, dispara essa msg
								if(!itemOrcamentoExisteQtdCP3Ret){
									message += getMessage("Não existe <b>nenhuma quantidade</b> na 3ª retirada", 6, form, "");
						           	hasErros = true;
								}
							}
							
						}
						
						
		            }
		            
		            //Se for clicado em Enviar valida se o valor mínimo foi atingido
		            if (getValue("WKCompletTask") == "true" ){
		            	if (form.getValue("ValorValido") == 'false'){
			        		message +=  getMessage("O valor mínimo do total para este tipo de pedido é de <b>R$ "+ form.getValue("ValorMinimo") + "</b>", 6, form);
			   	           	hasErros = true;
							
						}
		            }
	       		}
	        	
        	
	       	}
        	
        	break;
        case FORMALIZAPEDIDOUSA:
        	
        	if (isEmpty("gerarPedidoGTS", form)) {	
	           	 message += getMessage("You must select an action (<b>Generate Order in GTS</b>, <b>Cancel</b> or <b>Save</b>", 6, form);
	           	 hasErros = true;
	       	}
	       	
	       	if( form.getValue("gerarPedidoGTS") == 'Cancelar' ){
	       		if (isEmpty("gerarPedidoMotCancel", form)) {	
	       			message += getMessage("Field: <b>Reason for Cancellation</b> cannot be empty.", 6, form);
                  hasErros = true;
	       		}
	       	}else{
	       		
	       		if (isEmpty("vendedor1", form)) {
	       			message += getMessage("Field <b>Seller 1</b> can not be empty.", 6, form);
                    hasErros = true;
                }
            	if (isEmpty("vendedor4", form)) {
            		message += getMessage("Field <b>Seller 4</b> can not be empty.", 6, form);
            		hasErros = true;
            	}
            	if (isEmpty("vendedor5", form)) {
            		message += getMessage("Field <b>Seller 5</b> can not be empty.", 6, form);
            		hasErros = true;
            	}
            	// if (isEmpty("vendedor7", form)) {
            	// 	message += getMessage("Field <b>Seller 7</b> can not be empty.", 6, form);
            	// 	hasErros = true;
            	// }
            	// if (isEmpty("vendedor8", form)) {
            	// 	message += getMessage("Field <b>Seller 8</b> can not be empty.", 6, form);
            	// 	hasErros = true;
            	// }
	       		
	       		
	        	var indexes = form.getChildrenIndexes("tbItensOrcamento");
	            var itemOrcamentoCodProdItem = false;
	            var itemOrcamentoDescProdItem = false;
	            
	            if(indexes.length == 0){
	            	if (isMobile(form)) {
	            		message += getMessage("Item table has no items.", 6, form);
	            	}else{
	            		message += getMessage("Item table has no items.", 6, form);
	            	}
	            	hasErros = true;
	            }else{
					for (var i = 0; i < indexes.length; i++) {
						var orcQtdItem = '';
						var orcEmbalagemItem = '';
						var orcCodProdutoItem = form.getValue("orcCodProdutoItem___"+ indexes[i]);
	    				var orcDescProdutoItem = form.getValue("orcDescProdutoItem___"+ indexes[i]);
						
						if (form.getValue("orcQtdItem___"+indexes[i]) == '0'){
							 message += getMessage("Item <b>" + orcCodProdutoItem + " - " +orcDescProdutoItem +"</b> has an invalid <b>Quantity</b> field.", 6, form);
				           	 hasErros = true;
						}
						
						if (!itemOrcamentoCodProdItem && isEmpty("orcCodProdutoItem___" + indexes[i], form)) {
							 message += getMessage("The <b>Items table</b> has one or more invalid <b>Product Code</b> fields.", 6, form);
				           	 hasErros = true;
				           	itemOrcamentoCodProdItem =  true;
						}
						
						if ( isEmpty("orcPrecoCustoItem___" + indexes[i], form)) {
							 message += getMessage("Item <b>" + orcCodProdutoItem + " - " +orcDescProdutoItem +"</b> has an invalid <b>Cost Price</b> field.", 6, form);
							 hasErros = true;
				           	itemDivergPecaDescProdItem = true;
						}		
						
						orcQtdItem = form.getValue("orcQtdItem___"+indexes[i])
						orcEmbalagemItem = form.getValue("orcEmbalagemItem___"+indexes[i])
						
						if( orcEmbalagemItem > 1 || !isEmpty("orcEmbalagemItem___" + indexes[i], form) ){
							var calculoMultiplo = orcQtdItem % orcEmbalagemItem;
							if( calculoMultiplo > 0 ){
								message += getMessage("The <b>Product Quantity " + orcCodProdutoItem + " - " +orcDescProdutoItem + "</b> is invalid by its packaging multiple.", 6, form, "");
					           	hasErros = true;
								
							}
						}
					}
					
	            }
	            //Se for clicado em Enviar valida se o valor mínimo foi atingido
	            if (getValue("WKCompletTask") == "true" ){
		        	if (form.getValue("ValorValido") == 'false'){
		        		message +=  getMessage("The minimum total amount for this type of order is <b>$ "+ form.getValue("ValorMinimo") + "</b>", 6, form);
		   	           	hasErros = true;
						
					}
	            }
    		}
        	break;
        	
        case ANALISAERROINTEGRAORCAMENTO:
			if(WKNextState == GTSVERIFICAORCAMENTO || WKNextState == INTEGRAPEDIDOPROTHEUS){
				if (isEmpty("numOrcamento", form)) {
					message += getMessage("Nº do Orçamento", 1, form );
					hasErros = true;
				}
			}
			if(WKNextState == GTSVERIFICAPEDIDO){
				if (isEmpty("numOrcamento", form)) {
					message += getMessage("Nº do Orçamento", 1, form );
					hasErros = true;
				}
				if (isEmpty("numPedido", form)) {
					message += getMessage("Nº do Pedido de Venda", 1, form );
					hasErros = true;
				}
			}

			break;
			
        case GTSVERIFICAORCAMENTO:
        	
			if (form.getValue("tipoPedidoPosVenda") == "sim" ) {	
				if ( form.getValue("chkPosVendaCientePedido") != 'ciente' ) {
					message += getMessage("Ciencia do Pedido de Garantia", 7, form);
					hasErros = true;
				}
				if ( isEmpty("obsPosVendaCientePedido", form) ) {
					message += getMessage("Observação Pós-Venda", 1, form);
					hasErros = true;
				}
			}else{
				if (isEmpty("partesTransformaOrcEmPed", form)) {	
					message += getMessage("É preciso selecionar a ação (<b>Transformar Orçamento em Pedido na GTS</b> ou <b>Cancelar</b>)", 6, form);
					hasErros = true;
				}
			}
	       	
        	break;
        	
        case ANALISAERROINTEGRAPEDIDO:

			if(WKNextState == GTSVERIFICAPEDIDO){
				if (isEmpty("numOrcamento", form)) {
					message += getMessage("Nº do Orçamento", 1, form );
					hasErros = true;
				}
				if (isEmpty("numPedido", form)) {
					message += getMessage("Nº do Pedido de Venda", 1, form );
					hasErros = true;
				}
			}
			
			break;
			
        case GTSVERIFICAPEDIDO:
        	
        	if ( form.getValue("chkPartesCientePedido") != 'ciente' ) {
    			message += getMessage("Ciencia do Pedido", 7, form);
                hasErros = true;
            }
        	
        	break;
    }
        	
	if (hasErros) {
        if (isMobile(form) || ehIntegracaoCatalogo){
        	throw message;
        }else{
        	throw "<ul style='list-style-type: disc; padding-left:90px' class='alert alert-danger'>" + message + "</ul>";
        }
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
        }
    } else {
        switch (tipoMensagem) {
            case 1:
                return "<li>Campo: <b>" + texto + "</b> não pode estar vazio.</li>";
            case 2:
                return '<li>Campo: <b>"' + texto + '"</b> está inválido.\n';    
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
        }
    }
}    
