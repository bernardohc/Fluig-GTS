
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
		
				
		/*
		 * Cabeçalho do produto
		 */
		
		limpaCampos : function(){
			$("#orcProdCod").val('');
			$("#orcProdDesc").val('');
			$("#orcProdCodAntigo").val('');
			$("#orcProdPrecoTabela").val('');
			$("#orcProdEstoque").val('');
			$("#orcProdEmbalagem").val('');
			$("#orcProdPesoUnit").val('');
			$("#orcProdUnMedida").val('');
			$("#orcProdNCM").val('');
			$("#orcProdPrecoComDesconto").val('');
			$("#orcProdCurvaABC").val('');
			$("#orcProdCodCritico").val('');
			$("#orcProdRecompra").val('');
		},
		
		consultaProdutoQtdAssync : function(codProduto, Qtde){
			var loading = FLUIGC.loading(window);
			loading.show();
//			console.log("/api/public/ecm/dataset/search?datasetId=dsConsultaProdutoWS&filterFields=B1COD,"+codProduto+",QTD,1,A1COD,"+$('#A1_COD').val()+"A1LOJA,"+$('#A1_LOJA').val())
	   		 
			$.ajax({
	    		type: "GET",
	    		dataType: "json",
	    		async: true,
	    		url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProdutoTabela&filterFields=B1COD,"+codProduto+",QTD,1",
	    		data: "",
	    	    success: function (data, status, xhr) {
	    	    	console.log("data", data);
	    	    	
	    	    	if (data != null && data.content != null && data.content.length > 0) {
	    	    			
	    	    		
		    	    	const records = data.content;
		    	    	if( records[0].CODRET == "1"){
//		    	    	for ( var index in records) {
//		    	    		var record = records[index];
	    	    			var record = records[0];
							
		    	    		var COD = record.COD;
							var ZCODANT = record.ZCODANT;
							var ZDESCP = record.ZDESCP;
							var TIPO = record.TIPO;
							var IPI = record.IPI;
							var PESO = record.PESO;
							var UM = record.UNMED;
							var ESTOQUE = record.ESTOQUE;
							var EMBALAGEM = record.EMBALAGEM;
							var TABELA= record.PRCTABELA;
					    	var NCM = record.POSIPINCM;
					    	var CURVAABC= record.CURVAABC; 
							var CODCRITICO= record.CODCRITICO 
							var RECOMPRA= record.RECOMPRA 
							
					    	if(COD != ""){
					    		$("#orcProdCod").val(COD);
					    	}
					    	if(ZCODANT != ""){
					    		$("#orcProdCodAntigo").val(ZCODANT);
					    	}
					    	if(ZDESCP != ""){
					    		$("#orcProdDesc").val(ZDESCP);
					    	}
					    	if(PESO != ""){
					    		$("#orcProdPesoUnit").val(PESO);
					    	}	
					    	if(UM != ""){
					    		$("#orcProdUnMedida").val(UM);
					    	}
					    	if(ESTOQUE != ""){
					    		$("#orcProdEstoque").val(ESTOQUE);
					    	}
					    	if(EMBALAGEM != ""){
					    		$("#orcProdEmbalagem").val(EMBALAGEM);
					    	}
					    	if(TABELA != ""){
					    		$("#orcProdPrecoTabela").val(TABELA);
					    	}
					    	if(NCM != ""){
					    		$("#orcProdNCM").val(NCM);
					    	}
					    	if(CURVAABC != ""){
					    		$("#orcProdCurvaABC").val(CURVAABC); 
					    	}
					    	if(CODCRITICO != ""){
					    		$("#orcProdCodCritico").val(CODCRITICO); 
					    	}
					    	if(RECOMPRA != ""){
					    		$("#orcProdRecompra").val(RECOMPRA); 				    		
					    	}
					    	
					    	funcoes.calculaPrecoDesconto();
		    	    	}else if (records[0].CODRET == "2"){
		    	    		
		    	    		FLUIGC.toast({ title: '', message: "Erro ao consultar o produto, comunicar o Administrador do Sistema!", type: 'danger' });
		   				 	console.log(records[0].MSG);
		    	    		funcoes.limpaCampos() 
		    	    		
		    	    	}
	    	    	}else{
	    	    		FLUIGC.toast({ title: '', message: 'O codigo do produto informado não existe na base de dados!', type: 'warning' });
	   				 	funcoes.limpaCampos() 
	    	    	}
	    	    	loading.hide();;
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
		
		calculaPrecoDesconto : function(){
			var PrecoTabela = validafunctions.getFloatValue("orcProdPrecoTabela");
			var Percent = validafunctions.getFloatValue("orcProdPercentDesc");
			var PrecoComDesconto = 0;
			
			if(!isNaN(PrecoTabela) && !isNaN(Percent)) {
				PrecoComDesconto = PrecoTabela - ((PrecoTabela * Percent) / 100);
			}
			
			if(!isNaN(PrecoComDesconto)){
				$("#orcProdPrecoComDesconto").val(PrecoComDesconto.toFixed(2));
				validafunctions.setMoeda("orcProdPrecoComDesconto", 2, false , '')
			}
		},
		

	}
})();


var eventsFuncoes = (function() {
	return {
		setup : function() {	
			
			
			$(document).on("keyup", "#orcProdCod", function() {
				$("#orcProdCod").val( $("#orcProdCod").val().toUpperCase()   );
			});
			/*
			 * Tabela de Itens
			 */
			$(document).on("change", "#orcProdCod", function() {
				if($('#orcProdCod').val() != ''){
//					$("#orcProdPercentDesc").val('0%');
					funcoes.consultaProdutoQtdAssync( $("#orcProdCod" ).val() , '1' )
				}else{
					funcoes.limpaCampos();	
				}
				
			});
			
			$(document).on("change", "#orcProdPercentDesc", function() {
				var orcProdPercentDesc = validafunctions.getFloatValue("orcProdPercentDesc");
				if(orcProdPercentDesc > 100){
					FLUIGC.toast({
			    		title: '',
			    		message: 'Não é possível inserir mais de 100% de desconto!' ,
			    		type: 'warning'
			    	});
					$("#orcProdPercentDesc").val('0%');
				}else{
					funcoes.calculaPrecoDesconto();
				}
				
			});
				
			$(document).on("click", "#limparCampos", function() { 
				funcoes.limpaCampos();	
				$("#orcProdCod").focus();
				$("#orcProdPercentDesc").val('0%');
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
	
	FLUIGC.popover('.bs-docs-popover-hover',{trigger: 'hover', placement: 'top', html: true, template: '<div class="popover" role="tooltip" style="max-width: 450px !important; width: 450px !important;" ><div class="arrow" ></div><div class="popover-content" style="max-width: 450px !important; width: 450px !important;"></div></div>'});
	
	
}
