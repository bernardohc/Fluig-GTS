function enableFields(form){
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO || atv_atual == INICIO_0){
		
		
	}else if ( atv_atual == FORMALIZAPEDIDOUSA){
		
		form.setEnabled("tipoPedido", false);
		form.setEnabled("zoomCondPagto", false);
		
	}else if(atv_atual == GTSVERIFICAORCAMENTO){
		
		form.setEnabled("numOrcamento", false);
		form.setEnabled("numPedido", false);
		form.setEnabled("tipoPedido", false);
		form.setEnabled("zoomCondPagto", false);
		form.setEnabled("chkTransporteProprio", false);
		form.setEnabled("tpTransportadora", false);
		form.setEnabled("nomeTransportadora", false);
		form.setEnabled("chkRedespacho", false);
		form.setEnabled("nomeRedespacho", false);
		form.setEnabled("zoomRedespacho", false);
		form.setEnabled("garantiaBalcao", false);
		form.setEnabled("chkAceitePG", false);
		form.setEnabled("CPchkAceite", false);
		
		var indexes = form.getChildrenIndexes("tbItensOrcamento");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("orcQtdItem___" + indexes[i], false);
		    	form.setEnabled("orcQtdCP1RetItem___" + indexes[i], false);
		    	form.setEnabled("orcQtdCP2RetItem___" + indexes[i], false);
		    	form.setEnabled("orcQtdCP3RetItem___" + indexes[i], false);
		    	form.setEnabled("orcPrecoUnitItem___" + indexes[i], false);
		    }
		}
	
	}else if(atv_atual == ANALISAERROINTEGRAORCAMENTO){
		
//		form.setEnabled("numOrcamento", false);
		form.setEnabled("numPedido", false);
		form.setEnabled("tipoPedido", false);
		form.setEnabled("zoomCondPagto", false);
		form.setEnabled("chkTransporteProprio", false);
		form.setEnabled("tpTransportadora", false);
		form.setEnabled("nomeTransportadora", false);
		form.setEnabled("chkRedespacho", false);
		form.setEnabled("nomeRedespacho", false);
		form.setEnabled("zoomRedespacho", false);
		form.setEnabled("garantiaBalcao", false);
		form.setEnabled("chkAceitePG", false);
		form.setEnabled("CPchkAceite", false);
		
	}else if(atv_atual == GTSVERIFICAPEDIDO){
		
		form.setEnabled("numOrcamento", false);
		form.setEnabled("numPedido", false);
		form.setEnabled("tipoPedido", false);
		form.setEnabled("zoomCondPagto", false);
		form.setEnabled("chkTransporteProprio", false);
		form.setEnabled("tpTransportadora", false);
		form.setEnabled("nomeTransportadora", false);
		form.setEnabled("chkRedespacho", false);
		form.setEnabled("nomeRedespacho", false);
		form.setEnabled("zoomRedespacho", false);
		form.setEnabled("garantiaBalcao", false);
		form.setEnabled("chkAceitePG", false);
		form.setEnabled("CPchkAceite", false);
		
		var indexes = form.getChildrenIndexes("tbItensOrcamento");
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setEnabled("orcQtdItem___" + indexes[i], false);
		    	form.setEnabled("orcQtdCP1RetItem___" + indexes[i], false);
		    	form.setEnabled("orcQtdCP2RetItem___" + indexes[i], false);
		    	form.setEnabled("orcQtdCP3RetItem___" + indexes[i], false);
		    	form.setEnabled("orcPrecoUnitItem___" + indexes[i], false);
		    }
		}
		
	}else if(atv_atual == ANALISAERROINTEGRAPEDIDO){
		
		form.setEnabled("numOrcamento", false);
//		form.setEnabled("numPedido", false);
		form.setEnabled("tipoPedido", false);
		form.setEnabled("zoomCondPagto", false);
		form.setEnabled("chkTransporteProprio", false);
		form.setEnabled("tpTransportadora", false);
		form.setEnabled("nomeTransportadora", false);
		form.setEnabled("chkRedespacho", false);
		form.setEnabled("nomeRedespacho", false);
		form.setEnabled("zoomRedespacho", false);
		form.setEnabled("garantiaBalcao", false);
		form.setEnabled("chkAceitePG", false);
		form.setEnabled("CPchkAceite", false);
		
	}
	
	/*else if(atv_atual == GERENTEREVISAPEDIDO){
		
		form.setEnabled("chkTransporteProprio", false);
		form.setEnabled("tpTransportadora", false);
		form.setEnabled("nomeTransportadora", false);
		form.setEnabled("chkRedespacho", false);
		form.setEnabled("nomeRedespacho", false);
		form.setEnabled("zoomRedespacho", false);
		form.setEnabled("garantiaBalcao", false);
		form.setEnabled("chkAceitePG", false);
		
	}*/

}
