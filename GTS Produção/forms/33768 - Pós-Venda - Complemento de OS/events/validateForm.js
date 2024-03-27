function validateForm(form){
	
	var WKNumState = getValue('WKNumState');
	var WKNextState = getValue('WKNextState');
	
	var message = "";
    var hasErros = false;
    
    switch (parseInt(WKNumState)) {
    	//INICIAL
        case INICIO_0 : 
        case INICIO : 
        case TECNICO_COMPLEMENTA  : 
        	
        	if (isEmpty("solDesejaRealizar", form)) {
        		if (isMobile(form)){
    				message += getMessage("É preciso selecionar a ação ('Salvar' ou 'Enviar para Suporte GTS')", 6, form);
    			}else{
    				message += getMessage("É preciso selecionar a ação (<b>Salvar</b> ou <b>Enviar para Suporte GTS</b>)", 6, form);
    			}
	           	hasErros = true;
	       	}else{
	       		
	       		if( form.getValue("solDesejaRealizar") == 'EnviarGTS' ){
	       			if( WKNumState == WKNextState ){
	       				if (isMobile(form)){
	        				message += getMessage("Você selecionou a opção 'Enviar para Suporte GTS' e está salvando a solicitação.", 6, form);
	        			}else{
	        				message += getMessage("Você selecionou a opção <b>Enviar para Suporte GTS</b> e está salvando a solicitação.", 6, form);
	        			}
	       				hasErros = true;
	       			}
	       		}
	       		
	       	}
        	
        	//Dados Gerais
        	var codigoUtilizado = false;
        	if (!isEmpty("gerNumeroOS", form)) {
	        	var gerNumeroOS = form.getValue('gerNumeroOS');	
	    		var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	    		var c2 = DatasetFactory.createConstraint("gerNumeroOS", gerNumeroOS, gerNumeroOS, ConstraintType.MUST);
	    		var constraintsForm = new Array(c1, c2);    
	    		  
	    		var dsFormComplementoOS = DatasetFactory.getDataset("dsFormComplementoOS", null, constraintsForm, null);
	    		   
	    	
	    		for (var i = 0; i < dsFormComplementoOS.rowsCount; i++){
	    			codigoUtilizado = true;
	    		}
	    		   
	    		if (codigoUtilizado){
	    			if (isMobile(form)){
	    				message += getMessage("Número de Ordem de Serviço já utilizado.", 6, form);
	    			}else{
	    				message += getMessage("<b>Número de Ordem de Serviço</b> já utilizado.", 6, form);
	    			}
	        	    hasErros = true;
	    		}
        	}
    		
    		if (isEmpty("codigoTecnicoGTS", form)) {
    			message += getMessage("Código Técnico da GTS", 1, form);
    			hasErros = true;
    		}
    		
    		
    		//Atendimento
			if (!isEmpty("atdDataAtendimento", form) ){
				if (isMobile(form)) {
            		message += getMessage('Campo "Data de Atendimento" precisa estar inserida na Tabela de Atendimentos\n' , 6, form);
            	}else{
            		message += getMessage('Campo <b>Data de Atendimento</b> precisa estar inserida na <b>Tabela de Atendimentos</b>' , 6, form);
            	}
	           	hasErros = true;
			}
			if (!isEmpty("atdHoraInicial", form) ){
				if (isMobile(form)) {
            		message += getMessage('Campo "Hora Inicial" precisa estar inserida na Tabela de Atendimentos\n' , 6, form);
            	}else{
            		message += getMessage('Campo <b>Hora Inicial</b> precisa estar inserida na <b>Tabela de Atendimentos</b>' , 6, form);
            	}
	           	hasErros = true;
			}
			if (!isEmpty("atdHoraFinal", form) ){
				if (isMobile(form)) {
            		message += getMessage('Campo "Hora Final" precisa estar inserida na Tabela de Atendimentos\n' , 6, form);
            	}else{
            		message += getMessage('Campo <b>Hora Final</b> precisa estar inserida na <b>Tabela de Atendimentos</b>' , 6, form);
            	}
	           	hasErros = true;
			}
			if (!isEmpty("atdDeslocamento", form) ){
				if (isMobile(form)) {
            		message += getMessage('Campo "Horas em Deslocamento" precisa estar inserida na Tabela de Atendimentos\n' , 6, form);
            	}else{
            		message += getMessage('Campo <b>Horas em Deslocamento</b> precisa estar inserida na <b>Tabela de Atendimentos</b>' , 6, form);
            	}
	           	hasErros = true;
			}
			if (!isEmpty("atdIntervalo", form) ){
				if (isMobile(form)) {
            		message += getMessage('Campo "Tempo de Intervalo" precisa estar inserida na Tabela de Atendimentos\n' , 6, form);
            	}else{
            		message += getMessage('Campo <b>Tempo de Intervalo</b> precisa estar inserida na <b>Tabela de Atendimentos</b>' , 6, form);
            	}
	           	hasErros = true;
			}
			if (!isEmpty("atdKmInicial", form) ){
				if (isMobile(form)) {
            		message += getMessage('Campo "KM Inicial" precisa estar inserida na Tabela de Atendimentos\n' , 6, form);
            	}else{
            		message += getMessage('Campo <b>KM Inicial</b> precisa estar inserida na <b>Tabela de Atendimentos</b>' , 6, form);
            	}
	           	hasErros = true;
			}
			if (!isEmpty("atdKmFinal", form) ){
				if (isMobile(form)) {
            		message += getMessage('Campo "KM Final" precisa estar inserida na Tabela de Atendimentos\n' , 6, form);
            	}else{
            		message += getMessage('Campo <b>KM Final</b> precisa estar inserida na <b>Tabela de Atendimentos</b>' , 6, form);
            	}
	           	hasErros = true;
			}
    		
    		
    		//Se for clicado em Enviar
    		if (getValue("WKCompletTask") == "true" && !codigoUtilizado ){
    			
    			if( form.getValue("solDesejaRealizar") == 'EnviarGTS' ){
    				
	            	if (isEmpty("gerNumeroOS", form)) {
		    			message += getMessage("Número da OS", 1, form);
		    			hasErros = true;
		    		}else if(form.getValue("gerNumeroOS").length() != 6){
		    			message += getMessage("Número da OS", 2, form);
		    			hasErros = true;
		    		}
	    			
					if (isEmpty("gerEstado", form)) {
	        			message += getMessage("Estado do Atendimento", 1, form);
	        			hasErros = true;
	        		}
	    			if (isEmpty("matFluigSuporteGTS", form)) {
	        			message += getMessage("Matrícula Fluig do Suporte GTS", 1, form);
	        			hasErros = true;
	        		}
					
					if (isEmpty("gerLaudo", form)) {
						message += getMessage("Laudo", 1, form);
						hasErros = true;
					}

	    			//Dados Gerais
	    			if (isEmpty("maqDescFamilia", form)) {
	    				message += getMessage("Família", 1, form);
	    				hasErros = true;
	    			}else if(isEmpty("maqCodFamilia", form)){
	    				message += getMessage("Código da Família", 1, form);
	    				hasErros = true;
	    			}else if(isEmpty("maqCodFalhaFamilia", form)){
	    				message += getMessage("Código de Falha Família", 1, form);
	    				hasErros = true;
	    			}else if( form.getValue("maqCodFamilia") == 'FPM' || form.getValue("maqCodFamilia") == 'FSM' ){
	    				//FPM- Plataforma de Milho
	    				//FSM - Semeadora Exattus 
	    				if (isEmpty("maqNumLinha", form)) {
	        				message += getMessage("Número de Linhas", 1, form);
	        				hasErros = true;
	        			}
	    				if (isEmpty("maqEspacamento", form)) {
	        				message += getMessage("Espaçamento", 1, form);
	        				hasErros = true;
	        			}
	    			}else if( form.getValue("maqCodFamilia") == 'FPC' ){
	    				//FPC - Plataformas de Cereais Flexer 
	    				if (isEmpty("maqPes", form)) {
	        				message += getMessage("Pés", 1, form);
	        				hasErros = true;
	        			}
	    			}else if( form.getValue("maqCodFamilia") == 'FDC' || form.getValue("maqCodFamilia") == 'FCS' ){
	    				//FDC - TERRUS
	    				//FCS - TERRUS FERTTI
	    				if (isEmpty("maqHastes", form)) {
	        				message += getMessage("Hastes", 1, form);
	        				hasErros = true;
	        			}
	    			}
        			
    			
	    			if (isEmpty("maqDescModeloMaquina", form)) {
	    				message += getMessage("Modelo da Máquina", 1, form);
	    				hasErros = true;
	    			}else if(isEmpty("maqCodFalhaModeloMaquina", form)){
	    				message += getMessage("Código de Falha do Modelo da Máquina", 1, form);
	    				hasErros = true;
	    			}
	    			
	    			if (isEmpty("maqMarcaColheitadeiraTrator", form)) {
	    				message += getMessage("Marca Colheiradeira/Trator", 1, form);
	    				hasErros = true;
	    			}
	    			if (isEmpty("maqModelo", form)) {
	    				message += getMessage("Modelo Colheiradeira/Trator", 1, form);
	    				hasErros = true;
	    			}
	    			
	    			//Cliente
	    			//Se tem revCodigo, é porque puxou a Revenda cadastrada no Protheus
	    			if( !isEmpty("cliCodigo", form) ){
	    				
	    			}else{
	    				if (isEmpty("cliNomeCliente", form)) {
		    				message += getMessage("Nome do Cliente", 1, form);
		    				hasErros = true;
		    			}
	    				if (isEmpty("cliCidade", form)) {
	    					message += getMessage("Cidade do Cliente", 1, form);
	    					hasErros = true;
	    				}
	    				if (isEmpty("cliEstado", form)) {
	    					message += getMessage("Estado do Cliente", 1, form);
	    					hasErros = true;
	    				}
	    				if (isEmpty("cliTelefone", form)) {
	    					message += getMessage("Telefone do Cliente", 1, form);
	    					hasErros = true;
	    				}
	    			}
	    			
	    			//Revenda
	    			//Se tem revCodigo, é porque puxou a Revenda cadastrada no Protheus
	    			if( !isEmpty("revCodigo", form) ){
	    				
	    			}else{
	    				if (isEmpty("revNomeRevenda", form)) {
		    				message += getMessage("Nome da Revenda", 1, form);
		    				hasErros = true;
		    			}
	    				if (isEmpty("revCidade", form)) {
	    					message += getMessage("Cidade da Revenda", 1, form);
	    					hasErros = true;
	    				}
	    				if (isEmpty("revEstado", form)) {
	    					message += getMessage("Estado da Revenda", 1, form);
	    					hasErros = true;
	    				}
	    				if (isEmpty("revTelefone", form)) {
	    					message += getMessage("Telefone da Revenda", 1, form);
	    					hasErros = true;
	    				}
	    			}
	    			
	    			
	    			if (isEmpty("revTecAcompAtendimento", form)) {
	    				message += getMessage("Técnico da Revenda acompanhou o atendimento?", 3, form);
	    				hasErros = true;
	    			}else if(  form.getValue("revTecAcompAtendimento") == 'sim' ){
	    				if (isEmpty("revTecAcompAtendimentoNome", form)) {
	        				message += getMessage("Nome do Técnico que Acompanhou o Atendimento", 1, form);
	        				hasErros = true;
	        			}
	    				if (isEmpty("revTecAcompAtendimentoCPF", form)) {
	        				message += getMessage("CPF do Técnico que Acompanhou o Atendimento", 1, form);
	        				hasErros = true;
	        			}else if(form.getValue("revTecAcompAtendimentoCPF").length() != 14){
	        				message += getMessage("CPF do Técnico que Acompanhou o Atendimento", 2, form);
	        				hasErros = true;
	        			}
	    				if (isEmpty("revTecAcompAtendimentoTel", form)) {
	        				message += getMessage("Telefone do Técnico que Acompanhou o Atendimento", 1, form);
	        				hasErros = true;
	        			}
	    			}
    			
    			
	    			var indexAtdTbAtendimentos = form.getChildrenIndexes("atdTbAtendimentos");
		            if(indexAtdTbAtendimentos.length == 0){
		    			if (isMobile(form)) {
		            		message += getMessage("'Tabela de Atendimento' não possui nenhum registro.\n" , 6, form);
		            	}else{
		            		message += getMessage("<b>Tabela de Atendimento</b> não possui nenhum registro." , 6, form);
		            	}
		            	hasErros = true;
		            }
		            if (isEmpty("atdNomePessoaAcompAtend", form)) {
	        			message += getMessage("Quem acompanhou o atendimento", 1, form);
	        			hasErros = true;
	        		}
		            if (isEmpty("atdTelPessoaAcompAtend", form)) {
		            	message += getMessage("Telefone de quem acompanhou o atendimento", 1, form);
		            	hasErros = true;
		            }
	    			//Descrição da Falha
	    			if (isEmpty("atdAtendimentoFinalizado", form)) {
	        			message += getMessage("Atendimento foi finalizado?", 3, form);
	        			hasErros = true;
	        		}else if(  form.getValue("atdAtendimentoFinalizado") == 'nao' ){
	        			
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
							var falPendencia = false;
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
								if (!falPendencia && isEmpty("falPendenciaItem___"+ indexTbFalha[i], form)) {
									message += getMessage("Pendência", 5, form, "Descrição da Falha");
									hasErros = true;
									falPendencia =  true;
								}
							}
						}
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
	        		}else if ( form.getValue("solEncaminharSolicitacao") == 'Interno' ) {
	            		
	        			//Aqui vai o setor?
	        			
	            	}
	    		}else if ( form.getValue("solStatus") == 'Finalizado' && form.getValue("solFinalizarSolicitacao") != 'finalizar' ) {
	                message += getMessage("Para finalizar é preciso selecionar o status como <b>Finalizado</b> e marcar a opção <b>Finalizar Atendimento</b>.", 6, form);
	                hasErros = true;
	            }
	        	if ( form.getValue("solStatus") != 'Finalizado' && form.getValue("solFinalizarSolicitacao") == 'finalizar' ) {
	                message += getMessage("Para finalizar é preciso selecionar o status como <b>Finalizado</b> e marcar a opção <b>Finalizar Atendimento</b>.", 6, form);
	                hasErros = true;
	            }
	        	
	        	//Comunicação
	        	var indexTbComunicacao = form.getChildrenIndexes("comTbComunicacao");
        		
        		for (var i = 0; i < indexTbComunicacao.length; i++) {
        			//Última linha
        			if( indexTbComunicacao[i] == indexTbComunicacao.length ){	
        				
        				//Se for movimentada para o Técnico, a obrigatoriedade é para mensagem para o técnico.
        				if ( form.getValue("solEncaminharSolicitacao") == 'Tecnico' ) {
        					if ( isEmpty("comComTecnicoItem___" + indexTbComunicacao[i], form) ) {
    							message += getMessage("Comunicação Técnico GTS", 1, form);
    	        				hasErros = true;
            				}
        				}else{
        					if (isEmpty("comComInternaItem___" + indexTbComunicacao[i], form) && isEmpty("comComTecnicoItem___" + indexTbComunicacao[i], form) ) {
    							if(isMobile(form)){
    								message += getMessage("É preciso preencher uma 'Comunicação Interna' ou 'Comunicação Técnico GTS'.", 6, form);
    							}else{
    								message += getMessage("É preciso preencher uma <b>Comunicação Interna</b> ou <b>Comunicação Técnico GTS</b>.", 6, form);
    							}
    	        				hasErros = true;
            				}
        				}
        				
        			}
        		}
	        	
    		}
        	break;
        case TECNICO_GTS : 
        	
        	if (getValue("WKCompletTask") == "true" ){
	        	//Comunicação
	        	var indexTbComunicacao = form.getChildrenIndexes("comTbComunicacao");
	    		
	    		for (var i = 0; i < indexTbComunicacao.length; i++) {
	    			//Última linha
	    			if( indexTbComunicacao[i] == indexTbComunicacao.length ){	
	    				if ( isEmpty("comComTecnicoItem___" + indexTbComunicacao[i], form) ) {
							message += getMessage("Comunicação Técnico GTS", 1, form);
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
	    				if (isEmpty("comComInternaItem___" + indexTbComunicacao[i], form) && isEmpty("comComTecnicoItem___" + indexTbComunicacao[i], form) ) {
							if(isMobile(form)){
								message += getMessage("É preciso preencher uma 'Comunicação Interna' ou 'Comunicação ao Técnico'.", 6, form);
							}else{
								message += getMessage("É preciso preencher uma <b>Comunicação Interna</b> ou <b>Comunicação ao Técnico</b>.", 6, form);
							}
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