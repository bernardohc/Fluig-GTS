
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
			
			
			var param = window.location.href.split("&");
            
			var codempresa = param[0].split("WDCompanyId=")[1];
			var documentID = param[1].split("WDParentDocumentId=")[1];
			var numPed = param[2].split("numPed=")[1];
			var filialPed = param[3].split("filial=")[1];
			
			$("#numPedido").append(numPed);
			
			var c1 = DatasetFactory.createConstraint('c5Num', numPed, numPed, ConstraintType.MUST);
	           
            var datasetReturned = DatasetFactory.getDataset("dsConsultaPedido", null, new Array(c1), null);
           
            if(datasetReturned.values.length > 0){				
            	
            	var tipoFrete = '';
            	switch (datasetReturned.values['0']['C5_TPFRETE']) {
	    			case 'C' :
	    				tipoFrete = 'CIF'; 
	    				break;
	    			case 'F' :
	    				tipoFrete = 'FOB'; 
	    				break;
	    			case 'T' :
	    				tipoFrete = 'Por Conta Terceiros'; 
	    				break;
	    			case 'R' :
	    				tipoFrete = 'Por Conta Remetente'; 
	    				break;
	    			case 'D' :
	    				tipoFrete = 'Por Conta Destinatário'; 
	    				break;
	    			case 'S' :
	    				tipoFrete = 'Sem Frete'; 
	    				break;
	    		}
            	
            	$("#pedRevenda").append(datasetReturned.values['0']['A1_NOME']);           	
            	$("#pedTpPedido").append(datasetReturned.values['0']['CJ_ZTPPED']);
            	$("#pedDataEmissao").append(datasetReturned.values['0']['C5_EMISSAO']);
            	$("#pedCondPgto").append(datasetReturned.values['0']['E4_DESCRI']);  
            	$("#pedTpFrete").append(tipoFrete); 
            	
            	$("#pedValFrete").append(datasetReturned.values['0']['C5_FRETE']);  
            	
            }
			
            
            var loading = FLUIGC.loading(window);
        	loading.show();
    		
    		var somatot =  0;
    		
    		$.ajax({
    	        async: true,
    	        type: "GET",
    	        url: "/api/public/ecm/dataset/search?datasetId=dsConsultaItensPedidoWS&filterFields=numPedido,"+numPed+",filialPedido,"+filialPed,
    	        success : function(data) {
    	            // código omitido
    	        	console.log(data)
    	        	
    	        	if (data != null && data.content != null && data.content.length > 0) {
    	        		const records = data.content;
    	    	    	for ( var index in records) {
    	    	    		var record = records[index];
    	    	    		
    	    	    		var PRCTOTALIT = record.PRCTOTALIT
    		            	PRCTOTALIT = PRCTOTALIT.replace(/[^\d,-]/g, '');
    						PRCTOTALIT = PRCTOTALIT.replace(",", ".");
    						PRCTOTALIT = parseFloat(PRCTOTALIT);
    						
    						var IPI = record.IPI
    						IPI = parseFloat(IPI);
    						
							var codProd = record.C6_PRODUTO;
							var desProd = record.B1_ZDESCP;
							var NCM = record.POSIPINCM;
							var qtdProd = record.C6_QTDVEN;
							var prcVenda = record.PRCVENDA;
							var AliqIPI = formatNumber(record.ALIQIPI, 2, 3, '.', ',');
							var AliqICMS = formatNumber(record.ALIQICMS, 2, 3, '.', ',');
							var ICMSRet = formatNumber(record.ICMSRET, 2, 3, '.', ',');
							var TotalProd = formatNumber( PRCTOTALIT + IPI , 2, 3, '.', ',');
							 
							var newRow = $("<tr>");
							var cols = "";
							cols += '<td class="font-item" >' + codProd + '</td>';
							cols += '<td class="font-item" >' + desProd + '</td>';
							cols += '<td class="font-item" >' + qtdProd + '</td>';
							cols += '<td class="font-item" >' + prcVenda + '</td>';
							cols += '<td class="font-item" >' + NCM + '</td>';
							cols += '<td class="font-item" >' + AliqIPI + '</td>';
							cols += '<td class="font-item" >' + AliqICMS + '</td>';
							cols += '<td class="font-item" >' + ICMSRet + '</td>';
							cols += '<td class="font-item" >' + TotalProd + '</td>';
							
							newRow.append(cols);
							$("#tbItensPedido").append(newRow);
    			                
    	    	    		TOTIPI = formatNumber(record.TOTIPI, 2, 3, '.', ',') 
    		            	TOTICMSRE = formatNumber(record.TOTICMSRE, 2, 3, '.', ',') 
    		            	TOTNOTA = formatNumber(record.TOTNOTA, 2, 3, '.', ',') 
    	    	    	}
    	    	    	
    	    	    	
    	    	    	TOTIPI = formatNumber(record.TOTIPI, 2, 3, '.', ',') 
    	            	TOTICMSRE = formatNumber(record.TOTICMSRE, 2, 3, '.', ',') 
    	            	TOTNOTA = formatNumber(record.TOTNOTA, 2, 3, '.', ',') 
    	            	
    	            	$("#totalIPI").append(TOTIPI);  
    	            	$("#totalICMSRet").append(TOTICMSRE);  
    	            	$("#totalPedido").append(TOTNOTA);  
    	        	}
            
    	        	loading.hide();
        			
    	        	window.print();
    	        },
    	        error: function (msg){
    	            // código omitido
    	        	loading.hide();
    	        }
    	    });
		},
		
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
//	window.print();
}