
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
		
		consultaProdutoDesconto : function(row, codProduto, Qtde, desc, flDesc){
			
			var loading = FLUIGC.loading(window);
			loading.show();
			var tipoPedido = "";
			tipoPedido = ($('#tipoPedido').val() != '' ? $('#tipoPedido').val() : '-' );
			
			$.ajax({
	    		type: "GET",
	    		dataType: "json",
	    		async: true,
	    		url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProdutoWS&filterFields=B1COD,"+codProduto+",QTD,"+Qtde+",A1COD,"+$('#A1_COD').val()+",A1LOJA,"+$('#A1_LOJA').val()+",DESC,"+desc+",FLDESC,"+flDesc+",TPPEDIDO,"+tipoPedido,
	    		data: "",
	    	    success: function (data, status, xhr) {
	    	    	
	    	    	
	    	    	if (data != null && data.content != null && data.content.length > 0) {
	    	    		const records = data.content;
	    		        var icon = '' ;
	    		        if( records[0].CODRET == "1"){
	    		            var record = records[0];
	    			    	var PRCCUSTOT = record.PRCCUSTOT;
	    			    	
	    			    	$("#itmPrcTotalPendenteItem___" + row ).val( PRCCUSTOT )
//	    			    	validafunctions.setMoeda("itmPrcTotalPendenteItem___" + row,2, false , '')
	    			    	
	    		        }
	    	    		
	    	    	}
					
					setTimeout(function(){ 
						loading.hide();
					}, 700);
	    	    	
	    	    },
				error: function(XMLHttpRequest, textStatus, errorThrown) {
	    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
	    	    	FLUIGC.toast({
			    		title: '',
			    		message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!' ,
			    		type: 'danger'
			    	});
	    	    	loading.hide();
				}
			});
			
			
		},
		
		
		consultaProdutoUSAAssync : function(row, codProduto, Qtde ){
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
	    		type: "GET",
	    		dataType: "json",
	    		async: true,
	    		url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProdutoUSAWS&filterFields=B1COD,"+codProduto+",QTD,"+Qtde+",A1COD,"+$('#A1_COD').val()+",A1LOJA,"+$('#A1_LOJA').val(),
	    		data: "",
	    	    success: function (data, status, xhr) {
	    	    	
	    	    	if (data != null && data.content != null && data.content.length > 0) {
	    	    		const records = data.content;
	    	    		if( records[0].CODRET == "1"){
	    		            var record = records[0];
	    					var ZDESCP = record.ZDESCP;
	    					var ZDESCPUSA = record.ZDESCPING;
	    					var PRCCUSTOT = record.PRCCUSTOT;
	    			    	var PRCCUSTOTDOL = record.PRCCUSTOTDOL;
	    			    	
	    			    	if(ZDESCP != ""){
	    			    		$("#orcProdDesc").val(ZDESCP);
	    			    	}
	    			    	if(ZDESCPUSA != ""){
	    			    		$("#orcProdDescUSA").val(ZDESCPUSA);
	    			    	}
	    			    	if(PRCCUSTOT != ""){
	    			    		$("#itmPrcTotalPendenteItem___" + row ).val( PRCCUSTOT );
	    			    	}
	    			    	if(PRCCUSTOTDOL != ""){
	    			    		$("#itmPrcDolarTotalPendenteItem___" + row ).val( PRCCUSTOTDOL );
	    			    	}
	    	    		}
	    	    	}
	    	    	setTimeout(function(){ 
	    	    		loading.hide();
	    	    	}, 1000);
	    	    },
				error: function(XMLHttpRequest, textStatus, errorThrown) {
	    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
	    	    	FLUIGC.toast({
			    		title: '',
			    		message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!' ,
			    		type: 'danger'
			    	});
	    	    	loading.hide();
				}
			});
			
			
		},
	}
})();


var eventsFuncoes = (function() {
	return {
		setup : function() {	
			
			
			$(document).on("click", "#idFluigOrcamentoHref", function() {
				var idFluig = $('#idFluigOrcamento').val();
				
				$("#idFluigOrcamentoHref").attr("href", top.WCMAPI.serverURL + "/portal/p/GTS/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+idFluig);
			});
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
	
	// Ocultar Aba de anexos do workflow
	window.parent.$("#processTabs").find("li").first().hide();
	window.parent.$("#processTabs").find("li").last().hide();
	window.parent.$("#breadcrumb").remove();
	window.parent.$("#textActivity").remove();
	
	
	if(CURRENT_STATE == ADM_GTS_DEFINE_DATA)
	{	
		var WKUserGerRevenda = $('#WKUserGerRevenda').val();
		var siglaUFUser = WKUserGerRevenda.substring(0, 2);
		var paisRevenda = "";
		
		if(siglaUFUser == "EX"){
			paisRevenda = WKUserGerRevenda.substring(2, 5);
		}else{
			paisRevenda = "BRA";
		}
		
		var today = new Date();
		
		 $("input[name*=itmCodProdutoItem___]").each(function(index){
			var index = validafunctions.getPosicaoFilho($(this).attr("id"));
			
			//BUSCA O VALOR DE CUSTO PENDENTE
			var itmCodProdutoItem = $("#itmCodProdutoItem___"+index).val();
			var itmQtdPendenteItem = Number($("#itmQtdPendenteItem___"+ index).val());
			
			FLUIGC.calendar('#itmDataPrevistaChegadaItem___'+index,{
				  language: 'pt-br',
				  minDate: today,
				  pickDate: true,
				  pickTime: false
		
			});
			
			if(paisRevenda == "USA"){
				//BUSCA O VALOR DE CUSTO PENDENTE
				var itmCodProdutoItem = $("#itmCodProdutoItem___"+index).val();
				var itmQtdPendenteItem = Number($("#itmQtdPendenteItem___"+ index).val());
				
				funcoes.consultaProdutoUSAAssync(index, itmCodProdutoItem, itmQtdPendenteItem);
				
			}else{
				
				//Quando tem um desconto a mais que é do tipo de Compra Programada ou Pedido Promocional, puxa a porcentagem de desconto a mais do parametrizador.
				var PercentDesconto = 0;
				 //Utiliza N
	//			 var flDesc = ( tpTemDesconto ? "S" : "N")
				 var flDesc =  "N";
				 
				funcoes.consultaProdutoDesconto(index, itmCodProdutoItem, itmQtdPendenteItem, PercentDesconto, flDesc);		
		 	}
			
		 });
		
	}
}