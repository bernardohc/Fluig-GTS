function validateForm(form){
	
	var WKNumState = getValue('WKNumState');
	var WKNextState = getValue('WKNextState');
	
	var message = "";
    var hasErros = false;
    
    switch (parseInt(WKNumState)) {
    	//INICIAL
        case INICIO_0 : 
        case INICIO : 
        
		if (isEmpty("equipNumSerie", form)) {
			message += getMessage("Número de Série", 1, form);
			hasErros = true;
		}else{
			if (isEmpty("equipDescricao", form)) {
				message += getMessage("Descrição do Equipamento", 1, form);
				hasErros = true;
			}
		}

    		//Se for clicado em Enviar
    		if (getValue("WKCompletTask") == "true"  ){
				
				if (isEmpty("revSolicicaoVinculada", form)) {
					message += getMessage("Esta solicitação é para a Revenda vinculada?", 3, form);
					hasErros = true;
				}else if(  form.getValue("revSolicicaoVinculada") == 'sim' ){
					if (isEmpty("revEquipEstadoHidden", form)) {
						message += getMessage("Estado da Revenda", 1, form);
						hasErros = true;
					}

				}else if(  form.getValue("revSolicicaoVinculada") == 'nao' ){
					if (isEmpty("revEstadoHidden", form)) {
						message += getMessage("Estado da Revenda Vinculada", 1, form);
						hasErros = true;
					}
					if (isEmpty("revRevenda", form)) {
						message += getMessage("Revenda Vinculada", 1, form);
						hasErros = true;
					}
				}

				if (isEmpty("solTipoSolicitacao", form)) {
					message += getMessage("Tipo de Solicitação", 3, form);
					hasErros = true;
				}else{
					if(  form.getValue("solTipoSolicitacao") == 'IN' ){
						if (isEmpty("solTipoInformacao", form)) {
							message += getMessage("Tipo de Informação", 3, form);
							hasErros = true;
						}
					}else if(  form.getValue("solTipoSolicitacao") == 'MP' || form.getValue("solTipoSolicitacao") == 'PS'   ){

						//Itens Pedido
						var indexTbFalha = form.getChildrenIndexes("falTbFalha");
						if(indexTbFalha.length == 0){
							if (isMobile(form)) {
								message += getMessage("Tabela de 'Descrição da Falha' não possui nenhum registro.", 6, form);
							}else{
								message += getMessage("Tabela <b>Descrição da Falha</b> não possui nenhum registro.", 6, form);
							}
							hasErros = true;
						}else{

							var falFamilia = false;
							var falModeloMaquina = false;
							var falGrupoMaquina = false;
							var falDescFalhaFalha = false;
							var falCodigoFalha = false;
							var falRecorrente = false;
							var falhasDuplicadas = new java.util.ArrayList() ;

							for (var i = 0; i < indexTbFalha.length; i++) {
								//Família
								if (!falFamilia && isEmpty("falFamiliaItem___"+ indexTbFalha[i], form)) {
									message += getMessage("Família", 5, form, "Descrição da Falha");
									hasErros = true;
									falFamilia = true;
								}else if (!falFamilia && isEmpty("falCodFamiliaItem___"+ indexTbFalha[i], form)) {
									message += getMessage("Código Família", 5, form, "Descrição da Falha");
									hasErros = true;
									falFamilia = true;
								}else if (!falFamilia && isEmpty("falCodFalhaFamiliaItem___"+ indexTbFalha[i], form)) {
									message += getMessage("Código da Falha da Família", 5, form, "Descrição da Falha");
									hasErros = true;
									falFamilia = true;
								}
								//Modelo
								if (!falModeloMaquina && isEmpty("falModeloMaquinaItem___"+ indexTbFalha[i], form)) {
									message += getMessage("Modelo da Máquina", 5, form, "Descrição da Falha");
									hasErros = true;
									falModeloMaquina = true;
								}else if (!falModeloMaquina && isEmpty("falCodFalhaModeloMaquinaItem___"+ indexTbFalha[i], form)) {
									message += getMessage("Código da Falha Modelo da Máquina", 5, form, "Descrição da Falha");
									hasErros = true;
									falModeloMaquina = true;
								}
								//Grupo
								if (!falGrupoMaquina && isEmpty("falGrupoMaquinaItem___"+ indexTbFalha[i], form)) {
									message += getMessage("Grupo", 5, form, "Descrição da Falha");
									hasErros = true;
									falGrupoMaquina = true;
								}else if (!falGrupoMaquina && isEmpty("falCodFalhaGrupoMaquinaItem___"+ indexTbFalha[i], form)) {
									message += getMessage("Código do Grupo da Máquina", 5, form, "Descrição da Falha");
									hasErros = true;
									falGrupoMaquina = true;
								}
								//Falha
								if (!falDescFalhaFalha && isEmpty("falDescFalhaFalhaItem___"+ indexTbFalha[i], form)) {
									message += getMessage("Falha", 5, form, "Descrição da Falha");
									hasErros = true;
									falDescFalhaFalha = true;
								}else if (!falDescFalhaFalha && isEmpty("falCodFalhaFalhaItem___"+ indexTbFalha[i], form)) {
									message += getMessage("Falha", 5, form, "Descrição da Falha");
									hasErros = true;
									falDescFalhaFalha = true;
								}
								//Código da Falha
								if (!falCodigoFalha && isEmpty("falCodigoFalhaItem___"+ indexTbFalha[i], form)) {
									message += getMessage("Código de Falha", 5, form, "Descrição da Falha");
									hasErros = true;
									falCodigoFalha = true;
								}else if(!falCodigoFalha &&  form.getValue("falCodigoFalhaItem___"+ indexTbFalha[i]).length() != 14){
									message += getMessage("Código de Falha", 5, form, "Descrição da Falha");
									hasErros = true;
									falCodigoFalha = true;
								}


								//Validar se o Código Falha já foi inserido.
								var falCodigoFalhaItem = form.getValue("falCodigoFalhaItem___"+ indexTbFalha[i]);
								
								var indexTbFalhaDuplicado = form.getChildrenIndexes("falTbFalha");
								for (var j = 0; j < indexTbFalhaDuplicado.length; j++) {
									if(form.getValue("falCodigoFalhaItem___"+ indexTbFalhaDuplicado[j]) == form.getValue("falCodigoFalhaItem___"+ indexTbFalha[i])
										&& indexTbFalhaDuplicado[j] != indexTbFalha[i] 
										&& !falhasDuplicadas.contains( falCodigoFalhaItem ) ){
										message += getMessage("O código de falha <b>" +falCodigoFalhaItem+ "</b> está <b>duplicado</b>.", 6, form, "");
										
										falhasDuplicadas.add(falCodigoFalhaItem);
										hasErros = true;
									}
								}
								
								//Pendencia
								if (!falRecorrente && isEmpty("falRecorrenteItem___"+ indexTbFalha[i], form)) {
									message += getMessage("Este problema é recorrente?", 5, form, "Descrição da Falha");
									hasErros = true;
									falRecorrente =  true;
								}
							}
						}

					}
				}
				if (isEmpty("solDescricaoGeral", form)) {
					message += getMessage("Descrição da Solicitação", 1, form);
					hasErros = true;
				}
				
				if (isEmpty("solNome", form)) {
					message += getMessage("Nome do Solicitante", 1, form);
					hasErros = true;
				}
				if (isEmpty("solEmail", form)) {
					message += getMessage("E-mail do Solicitante", 1, form);
					hasErros = true;
				}else if( !validaEmail(form.getValue("solEmail")) ){	
					message += getMessage("E-mail do Solicitante", 9, form);
					hasErros = true;
				}
				if (isEmpty("solTelefone", form)) {
					message += getMessage("Telefone do Solicitante", 1, form);
					hasErros = true;
				}
				if (isEmpty("solCidade", form)) {
					message += getMessage("Cidade do Solicitante", 1, form);
					hasErros = true;
				}
				if (isEmpty("solEstado", form)) {
					message += getMessage("Estado do Solicitante", 1, form);
					hasErros = true;
				}

				if(  form.getValue("gerOrigemSolicitacao") == 'Site' ){
					if (isEmpty("solDeAcordoLGPD", form)) {
						message += getMessage("Estou de acordo com a Política de Privacidade de Dados", 7, form);
						hasErros = true;
					}
				}
				
    		}
        	
        	break;
        case SUPORTE_GTS : 
        	
        	if (isEmpty("solDescSetor", form)) {
    			message += getMessage("Setor", 3, form);
    			hasErros = true;
    		}else if((isEmpty("solCodSetor", form))){
    			message += getMessage("Código do Setor", 3, form);
    			hasErros = true;
    		}else if((isEmpty("solCodGrupoSetor", form))){
    			message += getMessage("Código Grupo do Setor", 3, form);
    			hasErros = true;
    		}
        	if (isEmpty("solStatus", form)) {
    			message += getMessage("Status", 3, form);
    			hasErros = true;
    		}else if( form.getValue("solStatus") == 'Em Preenchimento' ){
    			message += getMessage("Status não pode ser a opção <b>Em Preenchimento</b>.", 6, form);
    			hasErros = true;
    		}
        	//Se for clicado em Enviar
    		if (getValue("WKCompletTask") == "true" ){

	    		if ( form.getValue("solStatus") != 'Finalizado' ){
	    			if (isEmpty("solEncaminharSolicitacao", form)) {
	        			message += getMessage("Encaminhar Solicitação", 3, form);
	        			hasErros = true;
	        		}else if ( form.getValue("solEncaminharSolicitacao") == 'Revenda' ) {
						if (isEmpty("solRevendaAtendimento", form)) {
							message += getMessage("Revenda", 3, form);
							hasErros = true;
						}else if((isEmpty("solMatFluigRevendaAtendimento", form))){
							message += getMessage("Matricula da Revenda", 1, form);
							hasErros = true;
						}
					}
	    		}else if ( form.getValue("solStatus") == 'Finalizado' && form.getValue("solFinalizarSolicitacao") != 'finalizar' ) {
	                message += getMessage("Para finalizar é preciso selecionar o status como <b>Finalizado</b> e marcar a opção <b>Finalizar Atendimento</b>.", 6, form);
	                hasErros = true;
	            }
	        	if ( form.getValue("solStatus") != 'Finalizado' && form.getValue("solFinalizarSolicitacao") == 'finalizar' ) {
	                message += getMessage("Para finalizar é preciso selecionar o status como <b>Finalizado</b> e marcar a opção <b>Finalizar Atendimento</b>.", 6, form);
	                hasErros = true;
	            }
	        	if ( form.getValue("solStatus") == 'Finalizado' && form.getValue("solEncEmailRevendaFinalizado") == 'sim' ) {
					if (isEmpty("solRevendaAtendimento", form)) {
	        			message += getMessage("Revenda", 1, form);
	        			hasErros = true;
	        		}
					if (isEmpty("solEmailRevendaAtendimento", form)) {
	        			message += getMessage("E-mail Revenda", 1, form);
	        			hasErros = true;
	        		}else if( !validaEmail(form.getValue("solEmailRevendaAtendimento")) ){	
						message += getMessage("E-mail da Revenda", 9, form);
						hasErros = true;
					}
				}


	        	//Comunicação
	        	var indexTbComunicacao = form.getChildrenIndexes("comTbComunicacao");
        		
        		for (var i = 0; i < indexTbComunicacao.length; i++) {
        			//Última linha
        			if( indexTbComunicacao[i] == indexTbComunicacao.length ){	
        				
        				//Se for movimentada para a Revenda, a obrigatoriedade é para mensagem para a Revenda.
        				if ( form.getValue("solEncaminharSolicitacao") == 'Revenda' ){
							if (isEmpty("comComRevendaItem___" + indexTbComunicacao[i], form) ) {
								message += getMessage("Comunicação Revenda", 1, form);
								hasErros = true;
							}
						}else if ( form.getValue("solEncaminharSolicitacao") == 'Interno' ) {
        					if ( isEmpty("comComInternaItem___" + indexTbComunicacao[i], form) ) {
    							message += getMessage("Comunicação Interna", 1, form);
    	        				hasErros = true;
            				}
        				}else if ( form.getValue("solStatus") == 'Finalizado' ) {
							if ( isEmpty("comComExternaItem___" + indexTbComunicacao[i], form) ) {
    							message += getMessage("Comunicação Externa", 1, form);
    	        				hasErros = true;
            				}
        				}
        			}
        		}
	        	
    		}
        	break;
        case REVENDA : 
        	
        	if (getValue("WKCompletTask") == "true" ){
	        	//Comunicação
	        	var indexTbComunicacao = form.getChildrenIndexes("comTbComunicacao");
	    		
	    		for (var i = 0; i < indexTbComunicacao.length; i++) {
	    			//Última linha
	    			if( indexTbComunicacao[i] == indexTbComunicacao.length ){	
	    				if ( isEmpty("comComRevendaItem___" + indexTbComunicacao[i], form) ) {
							message += getMessage("Comunicação Revenda", 1, form);
	        				hasErros = true;
	    				}
	    			}
	    		}
        	}
        	break;
        	
        case SETOR_GTS : 
        	
        	if (getValue("WKCompletTask") == "true" ){
	        	//Comunicação
	        	var indexTbComunicacao = form.getChildrenIndexes("comTbComunicacao");
	    		
	    		for (var i = 0; i < indexTbComunicacao.length; i++) {
	    			//Última linha
	    			if( indexTbComunicacao[i] == indexTbComunicacao.length ){	
						if ( isEmpty("comComInternaItem___" + indexTbComunicacao[i], form) ) {
							message += getMessage("Comunicação Interna", 1, form);
	        				hasErros = true;
	    				}
	    			}
	    		}
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
			case 9:
            	return texto + " está inválido.";      
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
			case 9:
            	return "<li><b>"+ texto + "</b> está inválido.</li>";       
        }
    }
}    