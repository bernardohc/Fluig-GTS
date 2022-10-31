
$(document).ready(function() {
	setTimeout(function() {
		funcoes.start();
	}, 100)
});

var funcoes = (function() {
	var loading = FLUIGC.loading(window);
	var index = 0;
	return {
		start : function() {
			eventsFuncoes.setup();
		},
		
				
		carregaDados : function(){
			
			
			var WKUser = getWKUser();
			var WKCompany = getWKCompany();
			
			var param = window.location.href.split("&")
            
			var codempresa = param[0].split("WDCompanyId=")[1];
			var documentID = param[1].split("WDParentDocumentId=")[1];
			var solicitacao = param[2].split("IDsolicitacao=")[1];
			var A1_PAIS = "";
			$("#numOrcamento").append(solicitacao);  
			
			var c1 = DatasetFactory.createConstraint('solicitacao', solicitacao, solicitacao, ConstraintType.MUST);
           
            var datasetReturned = DatasetFactory.getDataset("dsFormOrcamento", null, new Array(c1), null);
           
            if(datasetReturned.values.length > 0){		
            	
            	var tipoPedido = datasetReturned.values['0']['tipoPedido'];
            	var descricaoTipoPedido = funcoes.descricaoTipoPedido(tipoPedido);
            	
            	A1_PAIS = datasetReturned.values['0']['A1_PAIS'];
            	
            	$("#orcTpPedido").append(descricaoTipoPedido);           	
            	if(A1_PAIS == 'USA'){
            		$("#orcCondPgto").append(datasetReturned.values['0']['condPagto'].replace('dias após o envio', 'days after shipment'));
            	}else{
            		$("#orcCondPgto").append(datasetReturned.values['0']['condPagto']);
            	}
            	$("#orcDataOrcamento").append(datasetReturned.values['0']['DataAbertura']);
            	$("#pedObservacao").append(datasetReturned.values['0']['pedObservacao']);  
            	$("#totalIPI").append(datasetReturned.values['0']['totalIPI']); 
            	$("#totalICMSRet").append(datasetReturned.values['0']['totalICMSRet']); 
            	$("#totalCustoPedido").append(datasetReturned.values['0']['totalCustoPedido']); 
            	$("#totalCustoPedidoDolar").append(datasetReturned.values['0']['totalCustoPedidoDolar']); 
            	
            	var DocumentId = datasetReturned.values['0']['documentid']
            }
            
            
            
            var c1 = DatasetFactory.createConstraint('NumFormulario', DocumentId, DocumentId, ConstraintType.MUST);
            
            var datasetFilho = DatasetFactory.getDataset("dsFormOrcamentoItens", null, new Array(c1), null);
            
            var records = datasetFilho.values;
            for (var index in records) {
                var record = records[index];
                
                
                var qtdProd = record.orcQtdItem;
                var embProd = record.orcEmbalagemItem;
                var codProd = record.orcCodProdutoItem;
                var desProd = "";
                var precoCustoProd = "";
                if(A1_PAIS == 'USA'){
                	 desProd = record.orcDescProdutoUSAItem;
                	 precoCustoProd = record.orcPrecoCustoDolarItem;
                }else{
                	 desProd = record.orcDescProdutoItem;
                	 precoCustoProd = record.orcPrecoCustoItem;
                }
                var NCMProd = record.orcNCMItem;
                var alqIPIProd = record.orcAlqIPIItem;
                var alqICMSProd = record.orcAlqICMSItem;
                var totalCustoComImpProd = record.orcTotalCustoComImpItem;
                var orcTotalCustoDolarItem = record.orcTotalCustoDolarItem;
             
				
                var newRow = $("<tr>");
                var cols = "";
                cols += '<td align=center class="font-item">' + qtdProd + '</td>';
//                cols += '<td align=center class="font-item">' + embProd + '</td>';
                cols += '<td class="font-item">' + codProd + '</td>';
                cols += '<td class="font-item">' + desProd + '</td>';
                cols += '<td align=center class="font-item">' + NCMProd + '</td>';
                cols += '<td align=left class="font-item">' + precoCustoProd + '</td>';
                cols += '<td align=left class="font-item hide-usa">' + alqIPIProd + '</td>';
                cols += '<td align=left class="font-item hide-usa">' + alqICMSProd + '</td>';
                cols += '<td align=left class="font-item hide-usa">' + totalCustoComImpProd + '</td>';
                cols += '<td align=left class="font-item show-usa" style="display:none;">' + orcTotalCustoDolarItem + '</td>';
                

                newRow.append(cols);
                $("#tbItensOrcamento").append(newRow);
        
        
            }
            
            if(A1_PAIS == 'USA'){
            	$(".hide-usa").hide();
            	$(".show-usa").show();
            	
            }else{
            	
            }
		},
		
		descricaoTipoPedido : function(tipoPedido){
			
			var descTipoPedido = '';
			switch (tipoPedido) {
				case 'CP' : 
						descTipoPedido = 'Compra Programada'
					break;
				case 'PC' : 
						descTipoPedido = 'Pedido Contrato'
					break;
		        case 'PCI':  
		        		descTipoPedido = 'Pedido Contrato Estoque Inicial de Novos Equipamentos'
		        	break;
		        case 'PE':  
		        	descTipoPedido = 'Pedido Estoque'
		        		break;
		        case 'PEUSA':  
		        	descTipoPedido = 'Stock Order'
		        		break;
		        case 'PP':  
		        	descTipoPedido = 'Pedido Promocional'
		        		break;
		        case 'PG':  
		        	descTipoPedido = 'Pedido Garantia'
		        		break;
		        case 'MP':  
		        	descTipoPedido = 'Máquina Parada'
		        		break;
		        	
			}
			
			return descTipoPedido;
		}
		
	}
})();


var eventsFuncoes = (function() {
	return {
		setup : function() {	
			
			
		}
	}
})();




function modal( title , html) {
    var myModal = FLUIGC.modal({
        title: title ,
        content: html,
        id: 'fluig-modal',
        actions: [{
            'label': 'Fechar',
            'autoClose': true
        }]
    }, function(err, data) {
        if (err) {
            // do error handling
        } else {
            // do something with data
        }
    });
}


function loadForm(){
	funcoes.carregaDados();
	window.print();
}