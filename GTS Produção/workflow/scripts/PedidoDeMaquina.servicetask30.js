function servicetask30(attempt, message) {
	try{
		
		var indexesItensPedido = hAPI.getChildrenIndexes("tbItensPedido");
		for (var i = 0; i < indexesItensPedido.length; i++) {
			
			//CABEÇALHO
			var cabHashMap = new java.util.HashMap();
			var cabArrList = new java.util.ArrayList();
			var cabJson = {};
			//Primeiro adiciona em um HashMap, com nome do campo e valor
			cabHashMap.put("FILIAL", hAPI.getCardValue("itPedFilialItem___"+indexesItensPedido[i]) );
			cabHashMap.put("CODCLI", hAPI.getCardValue("cliCodigo"));
			cabHashMap.put("LOJACLI", hAPI.getCardValue("cliLoja"));
			cabHashMap.put("TABELA", hAPI.getCardValue("tabPreco"));
			cabHashMap.put("IDFLUIG", getValue('WKNumProces')+"");
			cabHashMap.put("CONDPGTO", hAPI.getCardValue("pedCodCondPagto"));
			cabHashMap.put("PORCDESC", "0");
			cabHashMap.put("TPFRETE", hAPI.getCardValue("pedFrete"));
			cabHashMap.put("FRETE", hAPI.getCardValue("itPedValorFreteItem___"+indexesItensPedido[i]));
			cabHashMap.put("VEND1", hAPI.getCardValue("vendedor1")); //representante
			cabHashMap.put("VEND2", hAPI.getCardValue("vendedor2")); //revenda
			cabHashMap.put("VEND3", hAPI.getCardValue("vendedor3")); //000008 se for representante nacional e nada se for exportação
			cabHashMap.put("VEND4", hAPI.getCardValue("vendedor4")); 
			cabHashMap.put("VEND5", hAPI.getCardValue("vendedor5")); //Gestor Territorial
			cabHashMap.put("VEND6", hAPI.getCardValue("vendedor6")); //AGCO e CASE
			cabHashMap.put("VEND7", hAPI.getCardValue("vendedor7"));
			cabHashMap.put("VEND8", hAPI.getCardValue("vendedor8"));
			cabHashMap.put("VEND9", hAPI.getCardValue("vendedor9"));
			cabHashMap.put("VEND10", hAPI.getCardValue("vendedor10"));
			var pecaPossuiPeca = "";
			if(hAPI.getCardValue("pecaPossuiPeca") == "pecaPossuiPecaSim"){
				pecaPossuiPeca = "1";
			}else if(hAPI.getCardValue("pecaPossuiPeca") == "pecaPossuiPecaNao"){
				pecaPossuiPeca = "2";
			}
			cabHashMap.put("PECAPOSSUI", pecaPossuiPeca);
			cabHashMap.put("PECADESC", hAPI.getCardValue("pecaDescricao"));
			cabHashMap.put("PECACONDPGTO", hAPI.getCardValue("pecaCodPagto"));
			cabHashMap.put("PECAVALOR", hAPI.getCardValue("pecaValor"));
				
			//Adiciona em um ArrayList para consegui converter em JSON
			cabArrList.add(cabHashMap);
			//Converte o ArrayList para um JSON, para poder passar este JSON na constraint
			cabJson = JSONUtil.toJSON(cabArrList);
			
			//ITENS
			var itensHashMap = new java.util.HashMap();
			var itensArrList = new java.util.ArrayList();
			var itensJson = {};
			
			
			//Precisa limpar o itensHashMap para adicionar no itensArrList
			itensHashMap = new java.util.HashMap();
			
			itensHashMap.put("QTDPRD", hAPI.getCardValue("itPedQtdItem___"+indexesItensPedido[i]));
			itensHashMap.put("CODPRD", hAPI.getCardValue("itPedCodItemItem___"+indexesItensPedido[i]));
			itensHashMap.put("VLRTAB", hAPI.getCardValue("itPedPrecoTabelaItem___"+indexesItensPedido[i]));
			itensHashMap.put("DSCNT", hAPI.getCardValue("itPedPorcDescontoItem___"+indexesItensPedido[i]));
			itensHashMap.put("VLRPRD", hAPI.getCardValue("itPedPrecoUnitItem___"+indexesItensPedido[i]));
			itensHashMap.put("DTPREVEMBARQUE", formataData(hAPI.getCardValue("pedDataPrevEmbarque"), "yyyymmdd") );
			
			itensArrList.add(itensHashMap);
				
			
			//Converte o ArrayList para um JSON, para poder passar este JSON na constraint
			itensJson = JSONUtil.toJSON(itensArrList); 
			
			var cCAB  = DatasetFactory.createConstraint("CAB", cabJson, "", ConstraintType.MUST);
			var cITENS  = DatasetFactory.createConstraint("ITENS", itensJson, "", ConstraintType.MUST); 
			
			var constraints = new Array(cCAB, cITENS);
			 
			var dataset = DatasetFactory.getDataset("dsPedMaqCadastraOrcamento", [], constraints, []);
			var codRetorno = dataset.getValue(0, "CODRET");
			var msgRetorno = dataset.getValue(0, "MSGRET");
			
			if(codRetorno == "1"){
				hAPI.setCardValue("itPedNumOrcTotvsItem___"+indexesItensPedido[i], msgRetorno);
			}else{
				throw msgRetorno;
			}
		
		}
	}catch(erro){ 
		
		log.info("Orçamento: deu erro na integração do Orçamento no ERP: " + erro);
		throw(erro);
	}
}