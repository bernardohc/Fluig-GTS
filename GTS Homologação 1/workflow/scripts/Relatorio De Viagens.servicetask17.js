function servicetask17(attempt, message) {
	try{	
		var tipoPedido = hAPI.getCardValue("tipoPedido");
		var qtdCadastrosOrcamento = 1;
		if(tipoPedido == 'CP'){
			//Se for Compra Programada, verifica quantos cadastros de Compra Programada serão realizados
			qtdCadastrosOrcamento = hAPI.getCardValue("CPqtdOpcaoRecebimento");
		}
		
		for(var cadastro=1; cadastro<=qtdCadastrosOrcamento;cadastro++){
			var indice = 0;
			var campos1 = hAPI.getCardData(getValue("WKNumProces"));
			var contador1 = campos1.keySet().iterator();
			while (contador1.hasNext()) {
				
				var id1 = contador1.next();
				
				//pega a quantidade de itens
				var caux = id1.split("orcCodProdutoItem___").pop();
				if(parseInt(caux)>indice){		
					indice = parseInt(caux);
				}
			}
			var strauxArr = new Array();
			var straux = "";
			var campos = hAPI.getCardData(getValue("WKNumProces"));
			for (var j=1;j<=indice;j++){
				var contador = campos.keySet().iterator();
				straux = "";
				var orcCodProdutoItem = "";	
				var orcQtdItem = "";
				var orcPrecoTabelaItem = "";
				var orcPrecoUnitItem = "";
				var orcTotalItem = "";
				
				while (contador.hasNext()) {
					var id = contador.next();
					//item 1
					if (id.trim() == 'orcCodProdutoItem___'+j){
						orcCodProdutoItem = campos.get(id).trim();
					}
					
					//item 2
					if(tipoPedido == 'CP'){
						//Se o Tipo de Pedido for de Compra Programada 
						//Precisa verificar de qual retirada esta passa 1ª, 2ª ou 3ª
						if(cadastro == 1){
							//Se tiver passando pela 1 retirada
							if (id.trim() == 'orcQtdCP1RetItem___'+j){
								orcQtdItem = campos.get(id).trim();
							}
							if (id.trim() == 'orcCP1RetTotalCustoItem___'+j){
								orcTotalItem = campos.get(id).trim();
							}
						}else if(cadastro == 2){
							//Se tiver passando pela 2 retirada
							if (id.trim() == 'orcQtdCP2RetItem___'+j){
								orcQtdItem = campos.get(id).trim();
							}
							if (id.trim() == 'orcCP2RetTotalCustoItem___'+j){
								orcTotalItem = campos.get(id).trim();
							}
						}else if(cadastro == 3){
							//Se tiver passando pela 3 retirada
							if (id.trim() == 'orcQtdCP3RetItem___'+j){
								orcQtdItem = campos.get(id).trim();
							}
							if (id.trim() == 'orcCP3RetTotalCustoItem___'+j){
								orcTotalItem = campos.get(id).trim();
							}
						}
					}else{
						//Se não for Compra Programada pega a Quantidade item e Total de Custo do Item
						// Quantidade
						if (id.trim() == 'orcQtdItem___'+j){
							orcQtdItem = campos.get(id).trim();
						}
						
						if (id.trim() == 'orcTotalCustoItem___'+j){
							orcTotalItem = campos.get(id).trim();
						}
					}
					
					//item 3 Preço Tabela
					if (id.trim() == 'orcPrecoTabelaItem___'+j){
						orcPrecoTabelaItem = campos.get(id).trim();
					}
					//item 4 Preço Custo
					if (id.trim() == 'orcPrecoCustoItem___'+j){
						orcPrecoUnitItem = campos.get(id).trim();
					}
					//item 5
//						if (id.trim() == 'orcTotalCustoItem___'+j){
//							orcTotalItem = campos.get(id).trim();
//						}
		
				}
				//1-orcCodProdutoItem 			2-orcQtdItem	3-orcPrecoTabelaItem 	4-orcPrecoUnitItem		5-orcTotalItem			
				straux = orcCodProdutoItem +";"+ orcQtdItem +";"+orcPrecoTabelaItem+";"+ orcPrecoUnitItem +";"+ orcTotalItem +";0;0";
				
				
				if(tipoPedido == 'CP'){
					//Verifica se naquele item tem quantidade, se a quantidade for maior que 0, vai adicionar no array de produtos
					//se for 0 a quantidade daquela retidada, nao adiciona o ite.
					if(parseInt(orcQtdItem) > 0){
						strauxArr.push(straux);
					}
				}else{
					strauxArr.push(straux);
				}
				
				
			}
			
			
			var A1COD = new String(hAPI.getCardValue("A1_COD"));
			var A1LOJA = new String(hAPI.getCardValue("A1_LOJA"));
			var CONDPG = new String(hAPI.getCardValue("codCondPagto"));
			var TIPOPEDIDO = new String(hAPI.getCardValue("tipoPedido"));
			var IDFLUIG = new String(getValue('WKNumProces'));
			//Se for PEUSA cadastra com a tabela 025, senão tabela 011
			var TABPRECO = (TIPOPEDIDO == 'PEUSA') ? '025' : '011';
			
			var itensConstraint = JSON.stringify(strauxArr);
			
			var CPProgramacaoRetirada = "";
			var CPDataProgramacaoRetirada = "";
			var CPDiasRetirada = 0;
			if(tipoPedido == 'CP'){
				if(cadastro == 1){
					CPDiasRetirada = parseInt(hAPI.getCardValue("CPDiasRetirada_1"));
					CPProgramacaoRetirada = new String(hAPI.getCardValue("CPProgramacaoRetirada_1"));
					CPDataProgramacaoRetirada = dataAtualAddDays(CPDiasRetirada);
					
				}else if(cadastro == 2){
					CPDiasRetirada = parseInt(hAPI.getCardValue("CPDiasRetirada_2"));
					CPProgramacaoRetirada = new String(hAPI.getCardValue("CPProgramacaoRetirada_2"));
					CPDataProgramacaoRetirada = dataAtualAddDays(CPDiasRetirada);
				}else if(cadastro == 3){
					CPDiasRetirada = parseInt(hAPI.getCardValue("CPDiasRetirada_3"));
					CPProgramacaoRetirada = new String(hAPI.getCardValue("CPProgramacaoRetirada_3"));
					CPDataProgramacaoRetirada = dataAtualAddDays(CPDiasRetirada);
				}
			}
			var MATADMREV = new String(hAPI.getCardValue("gerenteRevenda"));
			var CODVENDPROTHEUS = new String(hAPI.getCardValue("codVendedorProtheus"));
		
			var cA1COD  = DatasetFactory.createConstraint("A1COD", A1COD, A1COD, ConstraintType.MUST);
			var cA1LOJA  = DatasetFactory.createConstraint("A1LOJA", A1LOJA, A1LOJA, ConstraintType.MUST);
			var cCONDPG  = DatasetFactory.createConstraint("CONDPG", CONDPG, CONDPG, ConstraintType.MUST);
			var cTABPRECO  = DatasetFactory.createConstraint("TABPRECO", TABPRECO, TABPRECO, ConstraintType.MUST);
			var cOBSORC  = DatasetFactory.createConstraint("OBSORC", '', '', ConstraintType.MUST);
			var cPERCDESC  = DatasetFactory.createConstraint("PERCDESC", '0', '0', ConstraintType.MUST);
			var cTIPOPEDIDO  = DatasetFactory.createConstraint("TIPOPEDIDO", TIPOPEDIDO, TIPOPEDIDO, ConstraintType.MUST);
			var cIDFLUIG  = DatasetFactory.createConstraint("IDFLUIG", IDFLUIG, IDFLUIG, ConstraintType.MUST);
			var cITENS  = DatasetFactory.createConstraint("ITENS", itensConstraint, itensConstraint, ConstraintType.MUST); 
			var cCODORC  = DatasetFactory.createConstraint("CODORC", '', '', ConstraintType.MUST); 
			var cMATADMREV  = DatasetFactory.createConstraint("MATADMREV", MATADMREV, MATADMREV, ConstraintType.MUST); 
			var cCPRETIRADA  = DatasetFactory.createConstraint("CPRETIRADA", CPProgramacaoRetirada, CPProgramacaoRetirada, ConstraintType.MUST); 
			var cCPDTRETIRADA = DatasetFactory.createConstraint("CPDTRETIRADA", CPDataProgramacaoRetirada, CPDataProgramacaoRetirada, ConstraintType.MUST); 
			var cCODVENDPROTHEUS = DatasetFactory.createConstraint("CODVENDPROTHEUS", CODVENDPROTHEUS, CODVENDPROTHEUS, ConstraintType.MUST); 
			
			var constraints = new Array(cA1COD, cA1LOJA, cCONDPG, cTABPRECO, cOBSORC, cPERCDESC, cTIPOPEDIDO, cIDFLUIG, cITENS, cCODORC, cMATADMREV, cCPRETIRADA, cCPDTRETIRADA, cCODVENDPROTHEUS);
			 
			var dataset = DatasetFactory.getDataset("dsCadastraOrcamento", [], constraints, []);
			var codRetorno = dataset.getValue(0, "CODRET");
			var msgRetorno = dataset.getValue(0, "MSG");
			
			if(codRetorno == "1"){
				log.info("Orçamento criado: cod-" + msgRetorno);
				if(tipoPedido == 'CP'){
					if(cadastro == 1){
						hAPI.setCardValue("CPNumOrcProtheus_1", msgRetorno);
					}else if(cadastro == 2){
						hAPI.setCardValue("CPNumOrcProtheus_2", msgRetorno);
					}else if(cadastro == 3){
						hAPI.setCardValue("CPNumOrcProtheus_3", msgRetorno);
					}
				}else{
					hAPI.setCardValue("numOrcamento", msgRetorno);
				}
			}else{
				throw msgRetorno;
			}
				
			
		}
		
		
	}catch(erro){ 
		
		log.info("Orçamento: deu erro na integração do Orçamento no ERP: " + erro);
    	throw(erro);
	}
	
}