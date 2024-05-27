function validateForm(form){
	
	var WKNumState = getValue('WKNumState');
	
	var message = "";
    var hasErros = false;
    
    //Valida em qualquer etapa
    if (!isEmpty("comIntComunicacaoInterna", form)) {
        message += getMessage("Você preencheu a <b>Comunicação Interna</b> e não adicionou na lista.", 6, form);
        hasErros = true;
    }
    
    switch (parseInt(WKNumState)) {
    
    	//INICIAL
        case INICIO_0 : 
        case INICIO : 
        case REP_VERIFICA_PED : 
        case REV_VERIFICA_PED : 
        	if (getValue("WKCompletTask") == "true" ){
	        	
        		var pedidoNoPrazo = true;
        		var cancelaPedido = false;
        		
        			
    			//Dados Revenda
        		//Qauando ta vindo da primeira interação (INICIO_0) já vem marcado como GerarPedido
	        	if (isEmpty("defineGeracaoPedidoInicio", form)) {
	                message += getMessage("O que você deseja realizar?", 3, form);
	                hasErros = true;
	            }
    			
	        	if( form.getValue("defineGeracaoPedidoInicio") == 'Cancelar' ){
	        		
	        		cancelaPedido = true;
        			
    				if (isEmpty("motCancelamentoGeracaoPedido", form)) {
    					message += getMessage("Motivo Cancelamento", 1, form);
		                hasErros = true;
    				}
	        		
    			}else{
    				/*
        			 * Primeiro valida se está dentro do prazo de validade
        			 */
					var solDataValidadePedido = form.getValue("solDataValidadePedido");
            		
            		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
            		var dataValidadePedidoParse = sdf.parse(solDataValidadePedido);
            		
         		    var dataHoje = java.util.Calendar.getInstance();
         			//Aqui primeiro converte a data hoje para dd/MM/yyyy, para posteriormente transformar em um campo date.
         		    var dataHojeParse = sdf.parse( sdf.format(dataHoje.getTime() ));
         		   	
         		    //Se a data de hoje for maior que a data de validade, (maior ou depois)
         		    if(dataHojeParse.after(dataValidadePedidoParse)){
         		    	if(isMobile(form)){
         		    		message += getMessage("Este orçamento está aberto mais que 60 dias, você precisa cancelar esta solicitação e criar uma nova.", 6, form);	
         		    	}else{
         		    		message += getMessage("Este orçamento está aberto mais que <b>60 dias</b>, você precisa <b>cancelar</b> esta solicitação e <b>criar uma nova</b>.", 6, form);	
         		    	}
         		    	hasErros = true;
         		   		pedidoNoPrazo = false;
         		   	}
    				
        			
    			}
   	     		
     		    //Se o Pedido estiver no Prazo e não foi selecionado Cancelar, vai validar as informações abaixo
        		if(pedidoNoPrazo && !cancelaPedido){
        			
        			//Solicitante
        			if( form.getValue("solTipoSolicitante") == 'RepresentanteNacional' ||  form.getValue("solTipoSolicitante") == 'RepresentanteExportacao'){
        				if (isEmpty("solGerenteAprovaWKUser", form)) {
        					message += getMessage("Código de Aprovação do Gerente", 1, form);
			                hasErros = true;
        				}
        			}
        			
        			if (isEmpty("solAcompanhaPedidoWKUser", form)) {
		                message += getMessage("Solicitante de Acompanhamento de Pedido", 1, form);
		                hasErros = true;
		            }
        			
		        	//Dados Revenda
		        	if (isEmpty("pedClienteRevenda", form)) {
		                message += getMessage("Consumidor Final/Revendedor", 3, form);
		                hasErros = true;
		            }
		        	
		        	
		        	//Representante
		        	if (!isEmpty("repNome", form)) {
		        		if (isEmpty("repA3COD", form)) {
			                message += getMessage("Código do Representante", 1, form);
			                hasErros = true;
		        		}
		        		if (isEmpty("repWKUser", form)) {
		        			message += getMessage("Matrícula Fluig do Representante", 1, form);
		        			hasErros = true;
		        		}
		            }
		        	
		        	if( form.getValue("repTipo") == 'RepresentanteNacional' ){
			    		if (isEmpty("repGesTerA3COD", form)) {
			                message += getMessage("Código do Gestor Territorial", 1, form);
			                hasErros = true;
			            }
		        	}
		    		
		        	if (isEmpty("repGesTerA3COD", form) && !isEmpty("repGestorTerritorial", form) ) {
		                message += getMessage("Código do Gestor Territorial", 1, form);
		                hasErros = true;
		            }
		        	
		        	if (isEmpty("repGestorTerritorialWKUser", form) && !isEmpty("repGestorTerritorial", form) ) {
		                message += getMessage("Matrícula Fluig do Gestor Territorial", 1, form);
		                hasErros = true;
		            }
		        	//Dados Revenda
		        	if (!isEmpty("revCpfCnpj", form) && isEmpty("revA3COD", form)) {	
    	       			message += getMessage("Código da Revenda", 1, form);
    	       			hasErros = true;
    	       		}
    				if (!isEmpty("revCpfCnpj", form) && isEmpty("revMatFluig", form)) {	
    	       			message += getMessage("Matrícula da Revenda", 1, form);
    	       			hasErros = true;
    	       		}
		        	
		    		//Dados Cliente
		    		//Se o cliCodigo estiver vazio, é que não encontrou o cliente na base do Protheus, então precisa fazer a validação dos campos
		    		if(isEmpty("cliCodigo", form)){
		    			if (isEmpty("cliCpfCnpj", form)) {
			                message += getMessage("CPF/CNPJ do Cliente", 1, form);
			                hasErros = true;
			            }
			    		if (isEmpty("cliNome", form)) {
			    			message += getMessage("Nome do Cliente", 1, form);
			    			hasErros = true;
			    		}
			    		if (isEmpty("cliCEP", form)) {
			    			message += getMessage("CEP do Cliente", 1, form);
			    			hasErros = true;
			    		}
			    		if (isEmpty("cliUF", form)) {
			    			message += getMessage("Estado do Cliente", 1, form);
			    			hasErros = true;
			    		}
			    		if (isEmpty("cliCidade", form)) {
			    			message += getMessage("Cidade do Cliente", 1, form);
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
			    		if (isEmpty("cliEmail", form)) {
			    			message += getMessage("E-mail do Cliente", 1, form);
			    			hasErros = true;
			    		}else if( !validaEmail(form.getValue("cliEmail")) ){	
			    			message += getMessage("E-mail do Cliente está inválido.", 6, form);
			    			hasErros = true;
			    		}
		    		}else{
		    			
//		    			if ( form.getValue("pedClienteRevenda") == 'Revenda' && form.getValue("solTipoSolicitante") != 'RepresentanteExportacao'){
//		    				//Se encontrou o cliente e for definidor como 'Revendedor', é obrigatório ter os 'Dados da Revenda'
//	    					if ( isEmpty("revCpfCnpj", form) ) {	
//	        	       			message += getMessage("CPF/CNPJ da Revenda", 1, form);
//	        	       			hasErros = true;
//	        	       		}
//	    					if ( isEmpty("revA3COD", form) ) {	
//	        	       			message += getMessage("Código da Revenda", 1, form);
//	        	       			hasErros = true;
//	        	       		}
//	    					if ( isEmpty("revNome", form) ) {	
//	        	       			message += getMessage("Nome da Revenda", 1, form);
//	        	       			hasErros = true;
//	        	       		}
//	    					if ( isEmpty("revMatFluig", form) ) {	
//	        	       			message += getMessage("Matrícula da Revenda", 1, form);
//	        	       			hasErros = true;
//	        	       		}
//	    				}
		    			
		    			//Se encontrou o cliente, precisa estar preenchido os campos de comissão
		    			if (isEmpty("vendedor1", form)) {
			    			message += getMessage("Vendedor 1", 1, form);
			    			hasErros = true;
			    		}
			    		if (isEmpty("vendedor5", form)) {
			    			message += getMessage("Vendedor 5", 1, form);
			    			hasErros = true;
			    		}
			    		
		    		}
		    		
		    		//Dados Pedido
		    		if (isEmpty("pedCodCondPagto", form)) {
		    			message += getMessage("Condição de Pagamento", 1, form);
		    			hasErros = true;
		    		}else if (isEmpty("pedCondPagto", form)) {
		    			message += getMessage("Condição de Pagamento", 1, form);
		    			hasErros = true;
		    		}
		    		
		    		if( form.getValue("pedCondPagto") == 'OUTRO' ){
		    			if (isEmpty("pedOutraCodPagto", form)) {
			    			message += getMessage("Outra Condição de Pagamento", 1, form);
			    			hasErros = true;
			    		}
		    		}
		    		if (isEmpty("pedFrete", form)) {
		    			message += getMessage("Frete", 1, form);
		    			hasErros = true;
		    		}
		    		
		    		if (isEmpty("pedDataPrevEmbarque", form)){
		    			message += getMessage("Data Prev. Embarque", 1, form);
		    			hasErros = true;
		    		}else{
		    		
						var pedDataPrevEmbarque = form.getValue("pedDataPrevEmbarque");
	            		
	            		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
	            		var pedDataPrevEmbarqueParse = sdf.parse(pedDataPrevEmbarque);
	            		
	         		    var dataHoje = java.util.Calendar.getInstance();
	         			//Aqui primeiro converte a data hoje para dd/MM/yyyy, para posteriormente transformar em um campo date.
	         		    var dataHojeParse = sdf.parse( sdf.format(dataHoje.getTime() ));
	         		   	
	         		    //Pega a data de abertura e adiciona 15 dias, para validar a data de previsão de embarque mínima
	         		    if(parseInt(WKNumState) == INICIO){
	         		    	//Se for na atividade de início, precisa pegar a data do dia, e não a data de abertura.
	         		    	var dataHoje = java.util.Calendar.getInstance();
	         		    	var dataMinPrevEmbarque = addDias("dd/MM/yyyy", sdf.format(dataHoje.getTime()), 15);
		         		    var dataMinPrevEmbarqueParse = sdf.parse(dataMinPrevEmbarque);
	         		    }else{
	         		    	var solDataAbertura = form.getValue("solDataAbertura");
	         		    	var dataMinPrevEmbarque = addDias("dd/MM/yyyy", solDataAbertura, 15);
		         		    var dataMinPrevEmbarqueParse = sdf.parse(dataMinPrevEmbarque);
	         		    }
	         		    
	            		
	         		    //Se a data de hoje for maior que a data de prev de embarque
	         		    if(dataHojeParse.after(pedDataPrevEmbarqueParse)){
	         		    	if(isMobile(form)){
	         		    		message += getMessage('"Data Prev. Embarque" não pode ser menor que hoje.', 6, form);	
	         		    	}else{
	         		    		message += getMessage("<b>Data Prev. Embarque</b> não pode ser menor que hoje.", 6, form);	
	         		    	}
	         		    	hasErros = true;
	         		    
	         		    	
	         		    //Aqui ta com um bugzinho que poder selecionar a data de previsão de embarque como data de hoje, e não 30 dias além de hoje	
	         		   	}else if(dataHojeParse.equals(pedDataPrevEmbarqueParse)){
			    			if (isMobile(form)) {
			            		message += getMessage('"Data Prev. Embarque" não pode ser a data de hoje.', 6, form);
			            	}else{
			            		message += getMessage("<b>Data Prev. Embarque</b> não pode ser a data de hoje.", 6, form);
			            	}
			                hasErros = true;
			            
			            //Se a data de previsão de embarque for menor que a Data de abertura mais 15 dias     
	         		   	}else if(pedDataPrevEmbarqueParse.before(dataMinPrevEmbarqueParse) ){
		         		   	if (isMobile(form)) {
			            		message += getMessage('"Data Prev. Embarque" precisa ser no mínimo a data '+ dataMinPrevEmbarque +'.', 6, form);
			            	}else{
			            		message += getMessage("<b>Data Prev. Embarque</b> precisa ser no mínimo a data <b>"+ dataMinPrevEmbarque +"</b>.", 6, form);
			            	}
			                hasErros = true;
	         		   	}
         		    
		    		}
		    		
		    		if ( form.getValue("pedTipoPreco") == '' ) {
		    			message += getMessage("Tipo de Preço", 3, form);
		                hasErros = true;
		            }
		    		
		    		//Itens Pedido
		    		var indexesItensPedido = form.getChildrenIndexes("tbItensPedido");
		    		if(indexesItensPedido.length == 0){
		            	if (isMobile(form)) {
		            		message += getMessage("Tabela de itens de pedido não possui nenhum item.", 6, form);
		            	}else{
		            		message += getMessage("Tabela <b>itens de pedido</b> não possui nenhum item.", 6, form);
		            	}
		            	hasErros = true;
		            }else{
		            	for (var i = 0; i < indexesItensPedido.length; i++) {
							var itPedCodItemItem = form.getValue("itPedCodItemItem___"+ indexesItensPedido[i]);
	        				var itPedDescricaoItemItem = form.getValue("itPedDescricaoItemItem___"+ indexesItensPedido[i]);
							
	        				if (form.getValue("itPedQtdItem___"+indexesItensPedido[i]) == '0'){
								message += getMessage("Quantidade do item " + itPedCodItemItem + " - " +itPedDescricaoItemItem, 4, form, "Itens do pedido");
					           	hasErros = true;
							}
	        				
							if (isEmpty("itPedCodItemItem___" + indexesItensPedido[i], form)) {
								 message += getMessage("Cod. Item", 5, form, "Itens do pedido");
					           	 hasErros = true;
							}
							
							if (isEmpty("itPedTotalCustoSemImpItem___" + indexesItensPedido[i], form)) {
								 message += getMessage("Preço", 5, form, "Itens do pedido");
					           	 hasErros = true;
							}
		            	}
		            }
		    		
		    		//Possui Peça?
		    		if ( form.getValue("pecaPossuiPeca") == '' ) {
		    			message += getMessage("Possui Peça(s)", 3, form);
		                hasErros = true;
		            }else if(form.getValue("pecaPossuiPeca") == 'pecaPossuiPecaSim'){
		            	if ( isEmpty("pecaDescricao", form) ) {
			    			message += getMessage("Descrição da(s) Peça(s)", 1, form);
			                hasErros = true;
			            }
		            	if ( isEmpty("pecaCodPagto", form) ) {
			    			message += getMessage("Condição de Pagamento da(s) Peça(s)", 1, form);
			                hasErros = true;
			            }
		            	if ( isEmpty("pecaValor", form) ) {
			    			message += getMessage("Valor da(s) Peça(s)", 1, form);
			                hasErros = true;
			            }
		            }
        		}
        	}

    		break;	
    		
        case REP_VERIFICA_PED : 
        	
        	if (getValue("WKCompletTask") == "true" ){
	        	
        		var pedidoNoPrazo = true;
        		var cancelaPedido = false;
        		
        			
    			//Dados Revenda
        		//Qauando ta vindo da primeira interação (INICIO_0) já vem marcado como GerarPedido
	        	if (isEmpty("defineGeracaoPedidoInicio", form)) {
	                message += getMessage("O que você deseja realizar?", 3, form);
	                hasErros = true;
	            }
    			
	        	//Itens Pedido
	    		var indexesItensPedido = form.getChildrenIndexes("tbItensPedido");
	    		if(indexesItensPedido.length == 0){
	            	if (isMobile(form)) {
	            		message += getMessage("Tabela de itens de pedido não possui nenhum item.", 6, form);
	            	}else{
	            		message += getMessage("Tabela <b>itens de pedido</b> não possui nenhum item.", 6, form);
	            	}
	            	hasErros = true;
	            }
	    		
	        	if( form.getValue("defineGeracaoPedidoInicio") == 'Cancelar' ){
	        		
	        		cancelaPedido = true;
        			 
	        		if (isEmpty("motCancelamentoGeracaoPedido", form)) {
    					message += getMessage("Motivo Cancelamento", 1, form);
		                hasErros = true;
    				}
    			}
        	
        	}
        	
        	break;	
        case GER_TER_APROVA : 
        	
        	if (getValue("WKCompletTask") == "true" ){
        		
        		if (isEmpty("aprovGerTerritorial", form)) {	
	   	           	 message += getMessage("Aprovação Gerente Territorial", 3, form);
	   	           	 hasErros = true;
	   	       	}
        		if( form.getValue("aprovGerTerritorial") == 'reprovado' ){
    	       		if (isEmpty("aprovGerTerritorialMotivoRep", form)) {	
    	       			message += getMessage("Motivo da Reprovação", 1, form);
                       hasErros = true;
    	       		}
    	       	}
        		
        		//Itens Pedido
	    		var indexesItensPedido = form.getChildrenIndexes("tbItensPedido");
	    		if(indexesItensPedido.length == 0){
	            	if (isMobile(form)) {
	            		message += getMessage("Tabela de itens de pedido não possui nenhum item.", 6, form);
	            	}else{
	            		message += getMessage("Tabela <b>itens de pedido</b> não possui nenhum item.", 6, form);
	            	}
	            	hasErros = true;
	            }
        		
        	}
        	break;	
        	
        	
        case REVISA_ORC :
        	
        	if (getValue("WKCompletTask") == "true" ){
        		
        		if (isEmpty("revPedSolicitanteAcao", form)) {
	                message += getMessage("Solicitante Revisa Pedido", 3, form);
	                hasErros = true;
	            }
        		
        		if( form.getValue("revPedSolicitanteAcao") == 'cancelar' ){
        			if (isEmpty("revPedSolicitanteObs", form)) {	
    	       			message += getMessage("Motivo", 1, form);
                       hasErros = true;
    	       		}
        		}
        		
        		if( form.getValue("revPedSolicitanteAcao") == 'retornaGerTerritorial' ){
        			
        			//Solicitante
        			if( form.getValue("solTipoSolicitante") == 'RepresentanteNacional' ||  form.getValue("solTipoSolicitante") == 'RepresentanteExportacao'){
        				if (isEmpty("solGerenteAprovaWKUser", form)) {
        					message += getMessage("Código de Aprovação do Gerente", 1, form);
			                hasErros = true;
        				}
        			}
        			
		        	//Dados Revenda
		        	if (isEmpty("pedClienteRevenda", form)) {
		                message += getMessage("Consumidor Final/Revendedor", 3, form);
		                hasErros = true;
		            }
		        	
		        	//Representante
		        	if( form.getValue("repTipo") == 'RepresentanteNacional' ){
			    		if (isEmpty("repGesTerA3COD", form)) {
			                message += getMessage("Código do Gestor Territorial", 1, form);
			                hasErros = true;
			            }
		        	}
		    		
		    		
		    		//Dados Cliente
		    		//Se o cliCodigo estiver vazio, é que não encontrou o cliente na base do Protheus, então precisa fazer a validação dos campos
		    		if(isEmpty("cliCodigo", form)){
		    			if (isEmpty("cliCpfCnpj", form)) {
			                message += getMessage("CPF/CNPJ do Cliente", 1, form);
			                hasErros = true;
			            }
			    		if (isEmpty("cliNome", form)) {
			    			message += getMessage("Nome do Cliente", 1, form);
			    			hasErros = true;
			    		}
			    		if (isEmpty("cliCEP", form)) {
			    			message += getMessage("CEP do Cliente", 1, form);
			    			hasErros = true;
			    		}
			    		if (isEmpty("cliUF", form)) {
			    			message += getMessage("Estado do Cliente", 1, form);
			    			hasErros = true;
			    		}
			    		if (isEmpty("cliCidade", form)) {
			    			message += getMessage("Cidade do Cliente", 1, form);
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
			    		if (isEmpty("cliEmail", form)) {
			    			message += getMessage("E-mail do Cliente", 1, form);
			    			hasErros = true;
			    		}else if( !validaEmail(form.getValue("cliEmail")) ){	
			    			message += getMessage("E-mail do Cliente está inválido.", 6, form);
			    			hasErros = true;
			    		}
		    		}else{
		    			
//		    			if ( form.getValue("pedClienteRevenda") == 'Revenda' ){
//		    				//Se encontrou o cliente e for definidor como 'Revendedor', é obrigatório ter os 'Dados da Revenda'
//	    					if ( isEmpty("revCpfCnpj", form) ) {	
//	        	       			message += getMessage("CPF/CNPJ da Revenda", 1, form);
//	        	       			hasErros = true;
//	        	       		}
//	    					if ( isEmpty("revA3COD", form) ) {	
//	        	       			message += getMessage("Código da Revenda", 1, form);
//	        	       			hasErros = true;
//	        	       		}
//	    					if ( isEmpty("revNome", form) ) {	
//	        	       			message += getMessage("Nome da Revenda", 1, form);
//	        	       			hasErros = true;
//	        	       		}
//	    					if ( isEmpty("revMatFluig", form) ) {	
//	        	       			message += getMessage("Matrícula da Revenda", 1, form);
//	        	       			hasErros = true;
//	        	       		}
//	    				}
		    			//Se encontrou o cliente, precisa estar preenchido os campos de comissão
		    			if (isEmpty("vendedor1", form)) {
			    			message += getMessage("Vendedor 1", 1, form);
			    			hasErros = true;
			    		}
			    		if (isEmpty("vendedor5", form)) {
			    			message += getMessage("Vendedor 5", 1, form);
			    			hasErros = true;
			    		}
		    		}
		    		
		    		//Dados Pedido
		    		if (isEmpty("pedCodCondPagto", form)) {
		    			message += getMessage("Condição de Pagamento", 1, form);
		    			hasErros = true;
		    		}else if (isEmpty("pedCondPagto", form)) {
		    			message += getMessage("Condição de Pagamento", 1, form);
		    			hasErros = true;
		    		}
		    		
		    		if( form.getValue("pedCondPagto") == 'OUTRO' ){
		    			if (isEmpty("pedOutraCodPagto", form)) {
			    			message += getMessage("Outra Condição de Pagamento", 1, form);
			    			hasErros = true;
			    		}
		    		}
		    		if (isEmpty("pedFrete", form)) {
		    			message += getMessage("Frete", 1, form);
		    			hasErros = true;
		    		}
		    		
		    		if (isEmpty("pedDataPrevEmbarque", form)){
		    			message += getMessage("Data Prev. Embarque", 1, form);
		    			hasErros = true;
		    		}else{
		    		
						var pedDataPrevEmbarque = form.getValue("pedDataPrevEmbarque");
	            		
	            		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
	            		var pedDataPrevEmbarqueParse = sdf.parse(pedDataPrevEmbarque);
	            		
	         		    var dataHoje = java.util.Calendar.getInstance();
	         			//Aqui primeiro converte a data hoje para dd/MM/yyyy, para posteriormente transformar em um campo date.
	         		    var dataHojeParse = sdf.parse( sdf.format(dataHoje.getTime() ));
	         		   	
	         		    //Pega a data de abertura e adiciona 15 dias, para validar a data de previsão de embarque mínima
	         		    if(parseInt(WKNumState) == INICIO){
	         		    	//Se for na atividade de início, precisa pegar a data do dia, e não a data de abertura.
	         		    	var dataHoje = java.util.Calendar.getInstance();
	         		    	var dataMinPrevEmbarque = addDias("dd/MM/yyyy", sdf.format(dataHoje.getTime()), 15);
		         		    var dataMinPrevEmbarqueParse = sdf.parse(dataMinPrevEmbarque);
	         		    }else{
	         		    	var solDataAbertura = form.getValue("solDataAbertura");
	         		    	var dataMinPrevEmbarque = addDias("dd/MM/yyyy", solDataAbertura, 15);
		         		    var dataMinPrevEmbarqueParse = sdf.parse(dataMinPrevEmbarque);
	         		    }
	         		    
	            		
	         		    //Se a data de hoje for maior que a data de prev de embarque
	         		    if(dataHojeParse.after(pedDataPrevEmbarqueParse)){
	         		    	if(isMobile(form)){
	         		    		message += getMessage('"Data Prev. Embarque" não pode ser menor que hoje.', 6, form);	
	         		    	}else{
	         		    		message += getMessage("<b>Data Prev. Embarque</b> não pode ser menor que hoje.", 6, form);	
	         		    	}
	         		    	hasErros = true;
	         		    
	         		    	
	         		    //Aqui ta com um bugzinho que poder selecionar a data de previsão de embarque como data de hoje, e não 30 dias além de hoje	
	         		   	}else if(dataHojeParse.equals(pedDataPrevEmbarqueParse)){
			    			if (isMobile(form)) {
			            		message += getMessage('"Data Prev. Embarque" não pode ser a data de hoje.', 6, form);
			            	}else{
			            		message += getMessage("<b>Data Prev. Embarque</b> não pode ser a data de hoje.", 6, form);
			            	}
			                hasErros = true;
			            
			            //Se a data de previsão de embarque for menor que a Data de abertura mais 15 dias     
	         		   	}else if(pedDataPrevEmbarqueParse.before(dataMinPrevEmbarqueParse) ){
		         		   	if (isMobile(form)) {
			            		message += getMessage('"Data Prev. Embarque" precisa ser no mínimo a data '+ dataMinPrevEmbarque +'.', 6, form);
			            	}else{
			            		message += getMessage("<b>Data Prev. Embarque</b> precisa ser no mínimo a data <b>"+ dataMinPrevEmbarque +"</b>.", 6, form);
			            	}
			                hasErros = true;
	         		   	}
         		    
		    		}
		    		
		    		if ( form.getValue("pedTipoPreco") == '' ) {
		    			message += getMessage("Tipo de Preço", 3, form);
		                hasErros = true;
		            }
		    		
		    		//Itens Pedido
		    		var indexesItensPedido = form.getChildrenIndexes("tbItensPedido");
		    		if(indexesItensPedido.length == 0){
		            	if (isMobile(form)) {
		            		message += getMessage("Tabela de itens de pedido não possui nenhum item.", 6, form);
		            	}else{
		            		message += getMessage("Tabela <b>itens de pedido</b> não possui nenhum item.", 6, form);
		            	}
		            	hasErros = true;
		            }else{
		            	for (var i = 0; i < indexesItensPedido.length; i++) {
							var itPedCodItemItem = form.getValue("itPedCodItemItem___"+ indexesItensPedido[i]);
	        				var itPedDescricaoItemItem = form.getValue("itPedDescricaoItemItem___"+ indexesItensPedido[i]);
							
	        				if (form.getValue("itPedQtdItem___"+indexesItensPedido[i]) == '0'){
								message += getMessage("Quantidade do item " + itPedCodItemItem + " - " +itPedDescricaoItemItem, 4, form, "Itens do pedido");
					           	hasErros = true;
							}
	        				
							if (isEmpty("itPedCodItemItem___" + indexesItensPedido[i], form)) {
								 message += getMessage("Cod. Item", 5, form, "Itens do pedido");
					           	 hasErros = true;
							}
		            	}
		            }
		    		
		    		//Possui Peça?
		    		if ( form.getValue("pecaPossuiPeca") == '' ) {
		    			message += getMessage("Possui Peça(s)", 3, form);
		                hasErros = true;
		            }else if(form.getValue("pecaPossuiPeca") == 'pecaPossuiPecaSim'){
		            	if ( isEmpty("pecaDescricao", form) ) {
			    			message += getMessage("Descrição da(s) Peça(s)", 1, form);
			                hasErros = true;
			            }
		            	if ( isEmpty("pecaCodPagto", form) ) {
			    			message += getMessage("Condição de Pagamento da(s) Peça(s)", 1, form);
			                hasErros = true;
			            }
		            	if ( isEmpty("pecaValor", form) ) {
			    			message += getMessage("Valor da(s) Peça(s)", 1, form);
			                hasErros = true;
			            }
		            }
        			
        		}
        		
        	}
        	
        	
        	break;
        case GTS_VALIDA_ORC : 
        	if (getValue("WKCompletTask") == "true" ){
        		
        		if (isEmpty("aprovAdmGTS", form)) {	
        			 message += getMessage("Administrativo GTS", 3, form);
	   	           	 hasErros = true;
	   	       	}
        		if (isEmpty("acompanhaAdmGTSClas", form)) {	
        			 message += getMessage("Classificação Pedido", 3, form);
	   	           	 hasErros = true;
	   	       	}
        		
        		if( form.getValue("aprovAdmGTS") == 'reprovado' || form.getValue("aprovAdmGTS") == 'retornadoSol' ){
    	       		if (isEmpty("aprovAdmGTSMotivo", form)) {	
    	       			message += getMessage("Motivo", 1, form);
                       hasErros = true;
    	       		}
    	       	}
        		
        		//Itens Pedido
	    		var indexesItensPedido = form.getChildrenIndexes("tbItensPedido");
	    		if(indexesItensPedido.length == 0){
	            	if (isMobile(form)) {
	            		message += getMessage("Tabela de itens de pedido não possui nenhum item.", 6, form);
	            	}else{
	            		message += getMessage("Tabela <b>itens de pedido</b> não possui nenhum item.", 6, form);
	            	}
	            	hasErros = true;
	            }
	    		
        		if( form.getValue("aprovAdmGTS") == 'aprovado' ){
        			
        			
    				if (!isEmpty("repNome", form) && isEmpty("repA3COD", form)) {	
    	       			message += getMessage("Código do Representante", 1, form);
    	       			hasErros = true;
    	       		}
        			
        			
        			//Se Cliente/Revenda for Cliente, e tiver preenchido o campos CPF/CNPJ é preciso estar preenchido o campo de código
    				if (!isEmpty("revCpfCnpj", form) && isEmpty("revA3COD", form)) {	
    	       			message += getMessage("Código da Revenda", 1, form);
    	       			hasErros = true;
    	       		}
    				if (!isEmpty("revCpfCnpj", form) && isEmpty("revMatFluig", form)) {	
    	       			message += getMessage("Matrícula da Revenda", 1, form);
    	       			hasErros = true;
    	       		}
        			
        			if ( isEmpty("cliCodigo", form)) {	
    	       			message += getMessage("Código do Cliente", 1, form);
    	       			hasErros = true;
    	       		}
        			
        			if ( isEmpty("cliLoja", form)) {	
    	       			message += getMessage("Loja do Cliente", 1, form);
    	       			hasErros = true;
    	       		}
        			
        			//Campos de Comissão preenchidos
	    			if (isEmpty("vendedor1", form)) {
		    			message += getMessage("Vendedor 1", 1, form);
		    			hasErros = true;
		    		}else if( form.getValue("vendedor1").length() != 6 ){
		    			message += getMessage("Campo: <b>Vendedor 1</b> não possui 6 caracteres.", 6, form);
		    			hasErros = true;
		    		}
	    			if (!isEmpty("vendedor2", form) &&  form.getValue("vendedor2").length() != 6 ) {
	    				message += getMessage("Campo: <b>Vendedor 2</b> não possui 6 caracteres.", 6, form);
		    			hasErros = true;
		    		}
	    			if (!isEmpty("vendedor3", form) &&  form.getValue("vendedor3").length() != 6 ) {
	    				message += getMessage("Campo: <b>Vendedor 3</b> não possui 6 caracteres.", 6, form);
	    				hasErros = true;
	    			}
		    		if (isEmpty("vendedor5", form)) {
		    			message += getMessage("Vendedor 5", 1, form);
		    			hasErros = true;
		    		}else if( form.getValue("vendedor5").length() != 6 ){
		    			message += getMessage("Campo: <b>Vendedor 5</b> não possui 6 caracteres.", 6, form);
		    			hasErros = true;
		    		}
		    		if (!isEmpty("vendedor6", form) &&  form.getValue("vendedor6").length() != 6 ) {
	    				message += getMessage("Campo: <b>Vendedor 6</b> não possui 6 caracteres.", 6, form);
	    				hasErros = true;
	    			}
		    		
        			var indexesItensPedido = form.getChildrenIndexes("tbItensPedido");
        			for (var i = 0; i < indexesItensPedido.length; i++) {
        				var itPedCodItemItem = form.getValue("itPedCodItemItem___"+ indexesItensPedido[i]);
        				var itPedDescricaoItemItem = form.getValue("itPedDescricaoItemItem___"+ indexesItensPedido[i]);
						
        				if (form.getValue("itPedFilialItem___"+indexesItensPedido[i]).trim() == ''){
							message += getMessage("Filial do item " + itPedCodItemItem + " - " +itPedDescricaoItemItem, 1, form, "Itens do pedido");
				           	hasErros = true;
						}else if( form.getValue("itPedFilialItem___"+indexesItensPedido[i]).trim().length() != 6 ){
//							message += getMessage("Filial do item " + itPedCodItemItem + " - " +itPedDescricaoItemItem, 1, form, "Itens do pedido");
							message += getMessage("Campo: <b>Filial do item " + itPedCodItemItem + " - " + itPedDescricaoItemItem + "</b> não possui 6 caracteres.", 6, form);
							hasErros = true;
						}
        				
	            	}
        		}
        	}
        	break;	
        	
        case REV_CIENTE_PED :
        	
        	//Itens Pedido
    		var indexesItensPedido = form.getChildrenIndexes("tbItensPedido");
    		if(indexesItensPedido.length == 0){
            	if (isMobile(form)) {
            		message += getMessage("Tabela de itens de pedido não possui nenhum item.", 6, form);
            	}else{
            		message += getMessage("Tabela <b>itens de pedido</b> não possui nenhum item.", 6, form);
            	}
            	hasErros = true;
            }
    		
        	if ( form.getValue("revChkCientePedido") != 'ciente' ) {
    			message += getMessage("Um pedido de máquina está está sendo gerado com seu dados de revenda.", 7, form);
                hasErros = true;
            }
        	
        	break;	
        
		case REP_CIENTE_PED :
		        
			//Itens Pedido
    		var indexesItensPedido = form.getChildrenIndexes("tbItensPedido");
    		if(indexesItensPedido.length == 0){
            	if (isMobile(form)) {
            		message += getMessage("Tabela de itens de pedido não possui nenhum item.", 6, form);
            	}else{
            		message += getMessage("Tabela <b>itens de pedido</b> não possui nenhum item.", 6, form);
            	}
            	hasErros = true;
            }
        	if ( form.getValue("repChkCientePedido") != 'ciente' ) {
    			message += getMessage("Um pedido de máquina está sendo gerado com seu dados de representante.", 7, form);
                hasErros = true;
            }
        	
        	break;
		case GESTER_CIENTE_PED :
			
			//Itens Pedido
    		var indexesItensPedido = form.getChildrenIndexes("tbItensPedido");
    		if(indexesItensPedido.length == 0){
            	if (isMobile(form)) {
            		message += getMessage("Tabela de itens de pedido não possui nenhum item.", 6, form);
            	}else{
            		message += getMessage("Tabela <b>itens de pedido</b> não possui nenhum item.", 6, form);
            	}
            	hasErros = true;
            }
			if ( form.getValue("repGesTerChkCientePedido") != 'ciente' ) {
				message += getMessage("Um pedido de máquina está sendo gerado com seu dados de gestor territorial.", 7, form);
		        hasErros = true;
		    }
			
			break;
        case REV_RET_ADM_GTS : 
        	
        	if (getValue("WKCompletTask") == "true" ){
        		
        		//Solicitante
    			if( form.getValue("solTipoSolicitante") == 'RepresentanteNacional' ||  form.getValue("solTipoSolicitante") == 'RepresentanteExportacao'){
    				if (isEmpty("solGerenteAprovaWKUser", form)) {
    					message += getMessage("Código de Aprovação do Gerente", 1, form);
		                hasErros = true;
    				}
    			}
    			
    			if (isEmpty("solAcompanhaPedidoWKUser", form)) {
	                message += getMessage("Solicitante de Acompanhamento de Pedido", 1, form);
	                hasErros = true;
	            }
    			
	        	//Dados Revenda
	        	if (isEmpty("pedClienteRevenda", form)) {
	                message += getMessage("Consumidor Final/Revendedor", 3, form);
	                hasErros = true;
	            }
	        	
	        	
	        	//Representante
	        	if (!isEmpty("repNome", form)) {
	        		if (isEmpty("repA3COD", form)) {
		                message += getMessage("Código do Representante", 1, form);
		                hasErros = true;
	        		}
	        		if (isEmpty("repWKUser", form)) {
	        			message += getMessage("Matrícula Fluig do Representante", 1, form);
	        			hasErros = true;
	        		}
	            }
	        	
	        	if( form.getValue("repTipo") == 'RepresentanteNacional' ){
		    		if (isEmpty("repGesTerA3COD", form)) {
		                message += getMessage("Código do Gestor Territorial", 1, form);
		                hasErros = true;
		            }
	        	}
	    		
	        	if (isEmpty("repGesTerA3COD", form) && !isEmpty("repGestorTerritorial", form) ) {
	                message += getMessage("Código do Gestor Territorial", 1, form);
	                hasErros = true;
	            }
	        	
	        	if (isEmpty("repGestorTerritorialWKUser", form) && !isEmpty("repGestorTerritorial", form) ) {
	                message += getMessage("Matrícula Fluig do Gestor Territorial", 1, form);
	                hasErros = true;
	            }
	        	//Dados Revenda
	        	if (!isEmpty("revCpfCnpj", form) && isEmpty("revA3COD", form)) {	
	       			message += getMessage("Código da Revenda", 1, form);
	       			hasErros = true;
	       		}
				if (!isEmpty("revCpfCnpj", form) && isEmpty("revMatFluig", form)) {	
	       			message += getMessage("Matrícula da Revenda", 1, form);
	       			hasErros = true;
	       		}
	        	
	    		//Dados Cliente
	    		//Se o cliCodigo estiver vazio, é que não encontrou o cliente na base do Protheus, então precisa fazer a validação dos campos
	    		if(isEmpty("cliCodigo", form)){
	    			if (isEmpty("cliCpfCnpj", form)) {
		                message += getMessage("CPF/CNPJ do Cliente", 1, form);
		                hasErros = true;
		            }
		    		if (isEmpty("cliNome", form)) {
		    			message += getMessage("Nome do Cliente", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("cliCEP", form)) {
		    			message += getMessage("CEP do Cliente", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("cliUF", form)) {
		    			message += getMessage("Estado do Cliente", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("cliCidade", form)) {
		    			message += getMessage("Cidade do Cliente", 1, form);
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
		    		if (isEmpty("cliEmail", form)) {
		    			message += getMessage("E-mail do Cliente", 1, form);
		    			hasErros = true;
		    		}else if( !validaEmail(form.getValue("cliEmail")) ){	
		    			message += getMessage("E-mail do Cliente está inválido.", 6, form);
		    			hasErros = true;
		    		}
	    		}else{
//	    			if ( form.getValue("pedClienteRevenda") == 'Revenda' ){
//	    				//Se encontrou o cliente e for definidor como 'Revendedor', é obrigatório ter os 'Dados da Revenda'
//    					if ( isEmpty("revCpfCnpj", form) ) {	
//        	       			message += getMessage("CPF/CNPJ da Revenda", 1, form);
//        	       			hasErros = true;
//        	       		}
//    					if ( isEmpty("revA3COD", form) ) {	
//        	       			message += getMessage("Código da Revenda", 1, form);
//        	       			hasErros = true;
//        	       		}
//    					if ( isEmpty("revNome", form) ) {	
//        	       			message += getMessage("Nome da Revenda", 1, form);
//        	       			hasErros = true;
//        	       		}
//    					if ( isEmpty("revMatFluig", form) ) {	
//        	       			message += getMessage("Matrícula da Revenda", 1, form);
//        	       			hasErros = true;
//        	       		}
//    				}
	    			//Se encontrou o cliente, precisa estar preenchido os campos de comissão
	    			if (isEmpty("vendedor1", form)) {
		    			message += getMessage("Vendedor 1", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("vendedor5", form)) {
		    			message += getMessage("Vendedor 5", 1, form);
		    			hasErros = true;
		    		}
		    		
	    		}
	    		
	    		//Dados Pedido
	    		if (isEmpty("pedCodCondPagto", form)) {
	    			message += getMessage("Condição de Pagamento", 1, form);
	    			hasErros = true;
	    		}else if (isEmpty("pedCondPagto", form)) {
	    			message += getMessage("Condição de Pagamento", 1, form);
	    			hasErros = true;
	    		}
	    		
	    		if( form.getValue("pedCondPagto") == 'OUTRO' ){
	    			if (isEmpty("pedOutraCodPagto", form)) {
		    			message += getMessage("Outra Condição de Pagamento", 1, form);
		    			hasErros = true;
		    		}
	    		}
	    		if (isEmpty("pedFrete", form)) {
	    			message += getMessage("Frete", 1, form);
	    			hasErros = true;
	    		}
	    		
	    		if (isEmpty("pedDataPrevEmbarque", form)){
	    			message += getMessage("Data Prev. Embarque", 1, form);
	    			hasErros = true;
	    		}
	    		
	    		if ( form.getValue("pedTipoPreco") == '' ) {
	    			message += getMessage("Tipo de Preço", 3, form);
	                hasErros = true;
	            }
	    		
	    		//Itens Pedido
	    		var indexesItensPedido = form.getChildrenIndexes("tbItensPedido");
	    		if(indexesItensPedido.length == 0){
	            	if (isMobile(form)) {
	            		message += getMessage("Tabela de itens de pedido não possui nenhum item.", 6, form);
	            	}else{
	            		message += getMessage("Tabela <b>itens de pedido</b> não possui nenhum item.", 6, form);
	            	}
	            	hasErros = true;
	            }else{
	            	for (var i = 0; i < indexesItensPedido.length; i++) {
						var itPedCodItemItem = form.getValue("itPedCodItemItem___"+ indexesItensPedido[i]);
        				var itPedDescricaoItemItem = form.getValue("itPedDescricaoItemItem___"+ indexesItensPedido[i]);
						
        				if (form.getValue("itPedQtdItem___"+indexesItensPedido[i]) == '0'){
							message += getMessage("Quantidade do item " + itPedCodItemItem + " - " +itPedDescricaoItemItem, 4, form, "Itens do pedido");
				           	hasErros = true;
						}
        				
						if (isEmpty("itPedCodItemItem___" + indexesItensPedido[i], form)) {
							 message += getMessage("Cod. Item", 5, form, "Itens do pedido");
				           	 hasErros = true;
						}
						
						if (isEmpty("itPedTotalCustoSemImpItem___" + indexesItensPedido[i], form)) {
							 message += getMessage("Preço", 5, form, "Itens do pedido");
				           	 hasErros = true;
						}
	            	}
	            }
	    		
	    		//Possui Peça?
	    		if ( form.getValue("pecaPossuiPeca") == '' ) {
	    			message += getMessage("Possui Peça(s)", 3, form);
	                hasErros = true;
	            }else if(form.getValue("pecaPossuiPeca") == 'pecaPossuiPecaSim'){
	            	if ( isEmpty("pecaDescricao", form) ) {
		    			message += getMessage("Descrição da(s) Peça(s)", 1, form);
		                hasErros = true;
		            }
	            	if ( isEmpty("pecaCodPagto", form) ) {
		    			message += getMessage("Condição de Pagamento da(s) Peça(s)", 1, form);
		                hasErros = true;
		            }
	            	if ( isEmpty("pecaValor", form) ) {
		    			message += getMessage("Valor da(s) Peça(s)", 1, form);
		                hasErros = true;
		            }
	            }
        	}
        	
        	break;
        	
        case ERRO_INTEGRA_ORCAMENTO :
        	
        	//Itens Pedido
    		var indexesItensPedido = form.getChildrenIndexes("tbItensPedido");
    		if(indexesItensPedido.length == 0){
            	if (isMobile(form)) {
            		message += getMessage("Tabela de itens de pedido não possui nenhum item.", 6, form);
            	}else{
            		message += getMessage("Tabela <b>itens de pedido</b> não possui nenhum item.", 6, form);
            	}
            	hasErros = true;
            }else{
				for (var i = 0; i < indexesItensPedido.length; i++) {
					var itPedCodItemItem = form.getValue("itPedCodItemItem___"+ indexesItensPedido[i]);
					var itPedDescricaoItemItem = form.getValue("itPedDescricaoItemItem___"+ indexesItensPedido[i]);
					
					if (form.getValue("itPedFilialItem___"+indexesItensPedido[i]).trim() == ''){
						message += getMessage("Filial do item " + itPedCodItemItem + " - " +itPedDescricaoItemItem, 1, form, "Itens do pedido");
			           	hasErros = true;
					}
					
		    	}
    		}
			
        	break;
        	
        case GTS_ACOMP_PED :
        	
        	if (getValue("WKCompletTask") == "true" ){
        		
        		if (isEmpty("acompanhaAdmGTS", form)) {	
	       			 message += getMessage("Administrativo GTS", 3, form);
	       			 hasErros = true;
        		}
	       		
	       		if( form.getValue("acompanhaAdmGTS") == 'retornaSolicitante' ){
	   	       		if (isEmpty("acompanhaAdmGTSObs", form)) {	
	   	       			message += getMessage("Observação", 1, form);
   	       				hasErros = true;
	   	       		}
	   	       	}
        	}
        	break;
        	
        case SOL_REV_PED : 
        	if (getValue("WKCompletTask") == "true" ){
        		
        		//Solicitante
    			if( form.getValue("solTipoSolicitante") == 'RepresentanteNacional' ||  form.getValue("solTipoSolicitante") == 'RepresentanteExportacao'){
    				if (isEmpty("solGerenteAprovaWKUser", form)) {
    					message += getMessage("Código de Aprovação do Gerente", 1, form);
		                hasErros = true;
    				}
    			}
    			
    			if (isEmpty("solAcompanhaPedidoWKUser", form)) {
	                message += getMessage("Solicitante de Acompanhamento de Pedido", 1, form);
	                hasErros = true;
	            }
    			
	        	//Dados Revenda
	        	if (isEmpty("pedClienteRevenda", form)) {
	                message += getMessage("Consumidor Final/Revendedor", 3, form);
	                hasErros = true;
	            }
	        	
	        	
	        	//Representante
	        	if (!isEmpty("repNome", form)) {
	        		if (isEmpty("repA3COD", form)) {
		                message += getMessage("Código do Representante", 1, form);
		                hasErros = true;
	        		}
	        		if (isEmpty("repWKUser", form)) {
	        			message += getMessage("Matrícula Fluig do Representante", 1, form);
	        			hasErros = true;
	        		}
	            }
	        	
	        	if( form.getValue("repTipo") == 'RepresentanteNacional' ){
		    		if (isEmpty("repGesTerA3COD", form)) {
		                message += getMessage("Código do Gestor Territorial", 1, form);
		                hasErros = true;
		            }
	        	}
	    		
	        	if (isEmpty("repGesTerA3COD", form) && !isEmpty("repGestorTerritorial", form) ) {
	                message += getMessage("Código do Gestor Territorial", 1, form);
	                hasErros = true;
	            }
	        	
	        	if (isEmpty("repGestorTerritorialWKUser", form) && !isEmpty("repGestorTerritorial", form) ) {
	                message += getMessage("Matrícula Fluig do Gestor Territorial", 1, form);
	                hasErros = true;
	            }
	        	//Dados Revenda
	        	if (!isEmpty("revCpfCnpj", form) && isEmpty("revA3COD", form)) {	
	       			message += getMessage("Código da Revenda", 1, form);
	       			hasErros = true;
	       		}
				if (!isEmpty("revCpfCnpj", form) && isEmpty("revMatFluig", form)) {	
	       			message += getMessage("Matrícula da Revenda", 1, form);
	       			hasErros = true;
	       		}
	        	
	    		//Dados Cliente
	    		//Se o cliCodigo estiver vazio, é que não encontrou o cliente na base do Protheus, então precisa fazer a validação dos campos
	    		if(isEmpty("cliCodigo", form)){
	    			if (isEmpty("cliCpfCnpj", form)) {
		                message += getMessage("CPF/CNPJ do Cliente", 1, form);
		                hasErros = true;
		            }
		    		if (isEmpty("cliNome", form)) {
		    			message += getMessage("Nome do Cliente", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("cliCEP", form)) {
		    			message += getMessage("CEP do Cliente", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("cliUF", form)) {
		    			message += getMessage("Estado do Cliente", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("cliCidade", form)) {
		    			message += getMessage("Cidade do Cliente", 1, form);
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
		    		if (isEmpty("cliEmail", form)) {
		    			message += getMessage("E-mail do Cliente", 1, form);
		    			hasErros = true;
		    		}else if( !validaEmail(form.getValue("cliEmail")) ){	
		    			message += getMessage("E-mail do Cliente está inválido.", 6, form);
		    			hasErros = true;
		    		}
	    		}else{
//	    			if ( form.getValue("pedClienteRevenda") == 'Revenda' ){
//	    				//Se encontrou o cliente e for definidor como 'Revendedor', é obrigatório ter os 'Dados da Revenda'
//    					if ( isEmpty("revCpfCnpj", form) ) {	
//        	       			message += getMessage("CPF/CNPJ da Revenda", 1, form);
//        	       			hasErros = true;
//        	       		}
//    					if ( isEmpty("revA3COD", form) ) {	
//        	       			message += getMessage("Código da Revenda", 1, form);
//        	       			hasErros = true;
//        	       		}
//    					if ( isEmpty("revNome", form) ) {	
//        	       			message += getMessage("Nome da Revenda", 1, form);
//        	       			hasErros = true;
//        	       		}
//    					if ( isEmpty("revMatFluig", form) ) {	
//        	       			message += getMessage("Matrícula da Revenda", 1, form);
//        	       			hasErros = true;
//        	       		}
//    				}
	    			//Se encontrou o cliente, precisa estar preenchido os campos de comissão
	    			if (isEmpty("vendedor1", form)) {
		    			message += getMessage("Vendedor 1", 1, form);
		    			hasErros = true;
		    		}
		    		if (isEmpty("vendedor5", form)) {
		    			message += getMessage("Vendedor 5", 1, form);
		    			hasErros = true;
		    		}
		    		
	    		}
	    		
	    		//Dados Pedido
	    		if (isEmpty("pedCodCondPagto", form)) {
	    			message += getMessage("Condição de Pagamento", 1, form);
	    			hasErros = true;
	    		}else if (isEmpty("pedCondPagto", form)) {
	    			message += getMessage("Condição de Pagamento", 1, form);
	    			hasErros = true;
	    		}
	    		
	    		if( form.getValue("pedCondPagto") == 'OUTRO' ){
	    			if (isEmpty("pedOutraCodPagto", form)) {
		    			message += getMessage("Outra Condição de Pagamento", 1, form);
		    			hasErros = true;
		    		}
	    		}
	    		if (isEmpty("pedFrete", form)) {
	    			message += getMessage("Frete", 1, form);
	    			hasErros = true;
	    		}
	    		
	    		if (isEmpty("pedDataPrevEmbarque", form)){
	    			message += getMessage("Data Prev. Embarque", 1, form);
	    			hasErros = true;
	    		}/*else{
	    		
					var pedDataPrevEmbarque = form.getValue("pedDataPrevEmbarque");
            		
            		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
            		var pedDataPrevEmbarqueParse = sdf.parse(pedDataPrevEmbarque);
            		
         		    var dataHoje = java.util.Calendar.getInstance();
         			//Aqui primeiro converte a data hoje para dd/MM/yyyy, para posteriormente transformar em um campo date.
         		    var dataHojeParse = sdf.parse( sdf.format(dataHoje.getTime() ));
         		   	
         		    //Pega a data de abertura e adiciona 15 dias, para validar a data de previsão de embarque mínima
         		    if(parseInt(WKNumState) == INICIO){
         		    	//Se for na atividade de início, precisa pegar a data do dia, e não a data de abertura.
         		    	var dataHoje = java.util.Calendar.getInstance();
         		    	var dataMinPrevEmbarque = addDias("dd/MM/yyyy", sdf.format(dataHoje.getTime()), 15);
	         		    var dataMinPrevEmbarqueParse = sdf.parse(dataMinPrevEmbarque);
         		    }else{
         		    	var solDataAbertura = form.getValue("solDataAbertura");
         		    	var dataMinPrevEmbarque = addDias("dd/MM/yyyy", solDataAbertura, 15);
	         		    var dataMinPrevEmbarqueParse = sdf.parse(dataMinPrevEmbarque);
         		    }
         		    
            		
         		    //Se a data de hoje for maior que a data de prev de embarque
         		    if(dataHojeParse.after(pedDataPrevEmbarqueParse)){
         		    	if(isMobile(form)){
         		    		message += getMessage('"Data Prev. Embarque" não pode ser menor que hoje.', 6, form);	
         		    	}else{
         		    		message += getMessage("<b>Data Prev. Embarque</b> não pode ser menor que hoje.", 6, form);	
         		    	}
         		    	hasErros = true;
         		    
         		    	
         		    //Aqui ta com um bugzinho que poder selecionar a data de previsão de embarque como data de hoje, e não 30 dias além de hoje	
         		   	}else if(dataHojeParse.equals(pedDataPrevEmbarqueParse)){
		    			if (isMobile(form)) {
		            		message += getMessage('"Data Prev. Embarque" não pode ser a data de hoje.', 6, form);
		            	}else{
		            		message += getMessage("<b>Data Prev. Embarque</b> não pode ser a data de hoje.", 6, form);
		            	}
		                hasErros = true;
		            
		            //Se a data de previsão de embarque for menor que a Data de abertura mais 15 dias     
         		   	}else if(pedDataPrevEmbarqueParse.before(dataMinPrevEmbarqueParse) ){
	         		   	if (isMobile(form)) {
		            		message += getMessage('"Data Prev. Embarque" precisa ser no mínimo a data '+ dataMinPrevEmbarque +'.', 6, form);
		            	}else{
		            		message += getMessage("<b>Data Prev. Embarque</b> precisa ser no mínimo a data <b>"+ dataMinPrevEmbarque +"</b>.", 6, form);
		            	}
		                hasErros = true;
         		   	}
     		    
	    		}*/
	    		
	    		if ( form.getValue("pedTipoPreco") == '' ) {
	    			message += getMessage("Tipo de Preço", 3, form);
	                hasErros = true;
	            }
	    		
	    		//Itens Pedido
	    		var indexesItensPedido = form.getChildrenIndexes("tbItensPedido");
	    		if(indexesItensPedido.length == 0){
	            	if (isMobile(form)) {
	            		message += getMessage("Tabela de itens de pedido não possui nenhum item.", 6, form);
	            	}else{
	            		message += getMessage("Tabela <b>itens de pedido</b> não possui nenhum item.", 6, form);
	            	}
	            	hasErros = true;
	            }else{
	            	for (var i = 0; i < indexesItensPedido.length; i++) {
						var itPedCodItemItem = form.getValue("itPedCodItemItem___"+ indexesItensPedido[i]);
        				var itPedDescricaoItemItem = form.getValue("itPedDescricaoItemItem___"+ indexesItensPedido[i]);
						
        				if (form.getValue("itPedQtdItem___"+indexesItensPedido[i]) == '0'){
							message += getMessage("Quantidade do item " + itPedCodItemItem + " - " +itPedDescricaoItemItem, 4, form, "Itens do pedido");
				           	hasErros = true;
						}
        				
						if (isEmpty("itPedCodItemItem___" + indexesItensPedido[i], form)) {
							 message += getMessage("Cod. Item", 5, form, "Itens do pedido");
				           	 hasErros = true;
						}
						
						if (isEmpty("itPedTotalCustoSemImpItem___" + indexesItensPedido[i], form)) {
							 message += getMessage("Preço", 5, form, "Itens do pedido");
				           	 hasErros = true;
						}
	            	}
	            }
	    		
	    		//Possui Peça?
	    		if ( form.getValue("pecaPossuiPeca") == '' ) {
	    			message += getMessage("Possui Peça(s)", 3, form);
	                hasErros = true;
	            }else if(form.getValue("pecaPossuiPeca") == 'pecaPossuiPecaSim'){
	            	if ( isEmpty("pecaDescricao", form) ) {
		    			message += getMessage("Descrição da(s) Peça(s)", 1, form);
		                hasErros = true;
		            }
	            	if ( isEmpty("pecaCodPagto", form) ) {
		    			message += getMessage("Condição de Pagamento da(s) Peça(s)", 1, form);
		                hasErros = true;
		            }
	            	if ( isEmpty("pecaValor", form) ) {
		    			message += getMessage("Valor da(s) Peça(s)", 1, form);
		                hasErros = true;
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
           	 	return texto+"\n"; 
            case 7:
           	 	return "Campo: "+texto+" precisa estar marcado.\n";   	 	
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
        }
    }
}    