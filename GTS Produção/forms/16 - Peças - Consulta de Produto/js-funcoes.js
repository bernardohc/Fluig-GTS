
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
			$("#orcProdPercentAcresc").val('0%');
			$("#orcProdDesc").val('');
			$("#orcProdCodAntigo").val('');
			$("#orcProdPrecoSugerido").val('');
			$("#orcProdPrecoSugeridoMP").val(''); /*Inserido*/					
			$("#orcProdPrecoVenda").val('');
			$("#orcProdEstoque").val('');
			$("#orcProdEmbalagem").val('');
			$("#orcProdPesoUnit").val('');
			$("#orcProdUnMedida").val('');
			$("#orcProdCurvaABC").val('');
			$("#orcProdCodCritico").val('');
			$("#orcProdRecompra").val('');
			$("#orcProdNCM").val('');
			$("#orcProdIPI").val('');
			$("#orcProdAlqIPI").val('');
			$("#orcProdICMS").val('');
			$("#orcProdAlqICMS").val('');
			$("#orcProdICMSRET").val('');
			$("#orcProdPIS").val('');
			$("#orcProdCofins").val('');
			$("#orcProdCustoTotal").val('');
			$("#orcProdCustoTotalItemMP").val(''); /*Inserido*/
			
		},
		
		consultaProdutoQtdAssync : function(codProduto, Qtde){
			var loading = FLUIGC.loading(window);
			loading.show();
	   		
			//Função que consulta o Preço de Máquina Parada e PG com 50% de desconto
			funcoes.consultaProdutoQtdMPAssync( $("#orcProdCod" ).val() , '1' );
			
			$.ajax({
	    		type: "GET",
	    		dataType: "json",
	    		async: true,
	    		url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProdutoWS&filterFields=B1COD,"+codProduto+",QTD,1,A1COD,"+$('#A1_COD').val()+",A1LOJA,"+$('#A1_LOJA').val(),
	    		data: "",
	    	    success: function (data, status, xhr) {
	    	    	console.log("data", data);
	    	    	
	    	    	if (data != null && data.content != null && data.content.length > 0) {

		    	    	const records = data.content;
		    	    	if( records[0].CODRET == "1"){
//		    	    		for ( var index in records) {
//			    	    		var record = records[index];							
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
								var ICMS = record.ICMS;
								var ICMSRET = record.ICMSRET;
								var TABELA= record.PRCTABELA;
								var SUGERIDO= record.PRCSUGE;
								var CURVAABC= record.CURVAABC; /*inserido*/
								var CODCRITICO= record.CODCRITICO /*inserido*/
								var RECOMPRA= record.RECOMPRA /*inserido*/
								var PRECOVENDA = record.PRCSUGE;
								var PRCCUSTOT = record.PRCCUSTOT;
						    	var NCM = record.POSIPINCM;
						    	var PRECOMIN = record.PRCMIN;
						    	var PRECOCUSTO = record.PRCCUSTO;
						    	var ALIQIPI = record.ALIQIPI;
						    	var ALIQICMS = record.ALIQICMS;
						    	var PIS = record.PIS;
						    	var COFINS = record.COFINS;
						    	
						    	if(COD != ""){
						    		$("#orcProdCod").val(COD);
						    	}
						    	if(ZCODANT != ""){
						    		$("#orcProdCodAntigo").val(ZCODANT);
						    	}
						    	if(ZDESCP != ""){
						    		$("#orcProdDesc").val(ZDESCP);
						    	}
						    	if(IPI != ""){
						    		$("#orcProdIPI").val(IPI);
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
						    	if(ICMS != ""){
						    		$("#orcProdICMS").val(ICMS);
						    	}
						    	if(ICMSRET != ""){
						    		$("#orcProdICMSRET").val(ICMSRET);
						    	}
						    	if(TABELA != ""){
						    		$("#orcPrecoTabela").val(TABELA);
						    	}
						    	if(SUGERIDO != ""){
						    		$("#orcProdPrecoSugerido").val(SUGERIDO);
						    	}
						    	if(CURVAABC != ""){
						    		$("#orcProdCurvaABC").val(CURVAABC); /*Inserido ABC*/
						    	}
						    	if(CODCRITICO != ""){
						    		$("#orcProdCodCritico").val(CODCRITICO); /*Inserido CODCRITICO*/
						    	}
						    	if(RECOMPRA != ""){
						    		$("#orcProdRecompra").val(RECOMPRA); /*Inserido RECOMPRA*/					    		
						    	}					    	
						    	if(PRECOVENDA != ""){
						    		$("#orcProdPrecoVenda").val(PRECOVENDA);
						    	}
						    	if(NCM != ""){
						    		$("#orcProdNCM").val(NCM);
						    	}
						    	if(PRECOMIN != ""){
						    		$("#orcProdPrecoMin").val(PRECOMIN);
						    	}
						    	if(PRECOCUSTO != ""){
						    		$("#orcProdPrecoCusto").val(PRECOCUSTO);
						    	}
						    	if(PRCCUSTOT != "" && ( $('#A1_TIPO').val().toUpperCase() == 'GERENTE' || $('#A1_TIPO').val().toUpperCase() == 'MASTER') ){
						    		$("#orcProdCustoTotal").val(PRCCUSTOT);
						    	}
						    	if(ALIQIPI != ""){
						    		$("#orcProdAlqIPI").val(ALIQIPI);
						    	}
						    	if(ALIQICMS != ""){
						    		$("#orcProdAlqICMS").val(ALIQICMS);
						    	}
						    	if(PIS != ""){
						    		$("#orcProdPIS").val(PIS);
						    	}
						    	if(COFINS != ""){
						    		$("#orcProdCOFINS").val(COFINS);
						    	}
						    	
//			    	    	}
		    	    	}else if (records[0].CODRET == "2"){
		    	    		
//		    	    		FLUIGC.toast({ title: '', message: "Erro ao consultar o produto, comunicar o Administrador do Sistema!", type: 'danger' });
		    	    		FLUIGC.toast({ title: '', message: "Erro ao consultar o produto, comunicar o Administrador do Sistema!", type: 'danger' });
		   				 	console.log(records[0].MSG);
		    	    		funcoes.limpaCampos() 
		    	    		
		    	    	}
		    	    	
		    	    	
		    	    	
	    	    	}else{
//	    	    		FLUIGC.toast({ title: '', message: 'O codigo do produto informado não existe na base de dados!', type: 'warning' });
	    	    		if(getLanguage() == "en_US"){
	    	    			mensagem = 'The product code entered does not exist in the database!';
	    	    		}else{
	    	    			mensagem = 'O código do produto informado não existe na base de dados!';
	    	    		}
	    	    		FLUIGC.toast({ title: '', message: mensagem, type: 'warning' });
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
		
		consultaProdutoQtdMPAssync : function(codProduto, Qtde){
			var loading = FLUIGC.loading(window);
			loading.show();
	   		 
			$.ajax({
	    		type: "GET",
	    		dataType: "json",
	    		async: true,
	    		url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProdutoWS&filterFields=B1COD,"+codProduto+",QTD,1,A1COD,"+$('#A1_COD').val()+",A1LOJA,"+$('#A1_LOJA').val()+",TPPEDIDO,MP",
	    		data: "",
	    	    success: function (data, status, xhr) {
//	    	    	console.log("data", data);
	    	    	
	    	    	if (data != null && data.content != null && data.content.length > 0) {
	    	    			
		    	    	const records = data.content;
		    	    	if( records[0].CODRET == "1"){
//		    	    		for ( var index in records) {
//			    	    		var record = records[index];
		    	    		var record = records[0];
							
							var SUGERIDOMP = record.PRCSUGE;
							var PRCCUSTOTMP = record.PRCCUSTOT;
					    	
					    	if(SUGERIDOMP != ""){
					    		$("#orcProdPrecoSugeridoMP").val(SUGERIDOMP);
					    	}

					    	if(PRCCUSTOTMP != ""){
					    		$("#orcProdCustoTotalItemMP").val(PRCCUSTOTMP);
					    	}
					    	
		    	    	}
	    	    	}else{
//	    	    		FLUIGC.toast({ title: '', message: 'O codigo do produto informado não existe na base de dados!', type: 'warning' });
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
		
		consultaProdutoQtdUSAAssync : function(codProduto, Qtde){
			var loading = FLUIGC.loading(window);
			loading.show();
	   		
			$.ajax({
	    		type: "GET",
	    		dataType: "json",
	    		async: true,
	    		url: "/api/public/ecm/dataset/search?datasetId=dsConsultaProdutoUSAWS&filterFields=B1COD,"+codProduto+",QTD,1,A1COD,"+$('#A1_COD').val()+",A1LOJA,"+$('#A1_LOJA').val(),
	    		data: "",
	    	    success: function (data, status, xhr) {
	    	    	if (data != null && data.content != null && data.content.length > 0) {
		    	    	const records = data.content;
		    	    	if( records[0].CODRET == "1"){
			    	    		var record = records[0];							
			    	    		var COD = record.COD;
								var ZCODANT = record.ZCODANT;
								var ZDESCP = record.ZDESCP;
								var ZDESCPUSA = record.ZDESCPING;
								var TIPO = record.TIPO;
								var IPI = record.IPI;
								var PESO = record.PESO;
								var UM = record.UNMED;
								var ESTOQUE = record.ESTOQUE;
								var EMBALAGEM = record.EMBALAGEM;
								var ICMS = record.ICMS;
								var ICMSRET = record.ICMSRET;
								var TABELA= record.PRCTABELA;
								var SUGERIDO= record.PRCSUGE;
								var CURVAABC= record.CURVAABC; /*inserido*/
								var CODCRITICO= record.CODCRITICO /*inserido*/
								var RECOMPRA= record.RECOMPRA /*inserido*/
								var PRECOVENDA = record.PRCSUGE;
								var PRCCUSTOT = record.PRCCUSTOT;
								var PRCCUSTOTDOL = record.PRCCUSTOTDOL;
						    	var NCM = record.POSIPINCM;
						    	var PRECOMIN = record.PRCMIN;
						    	var PRECOCUSTO = record.PRCCUSTO;
						    	var PRECOCUSTODOLAR = record.PRCCUSTODOL;
						    	var ALIQIPI = record.ALIQIPI;
						    	var ALIQICMS = record.ALIQICMS;
						    	var PIS = record.PIS;
						    	var COFINS = record.COFINS;
						    	
						    	if(COD != ""){
						    		$("#orcProdCod").val(COD);
						    	}
						    	if(ZCODANT != ""){
						    		$("#orcProdCodAntigo").val(ZCODANT);
						    	}
//						    	if(ZDESCP != ""){
//						    		$("#orcProdDesc").val(ZDESCP);
//						    	}
						    	if(ZDESCPUSA != ""){
						    		$("#orcProdDesc").val(ZDESCPUSA);
						    	}
						    	if(IPI != ""){
						    		$("#orcProdIPI").val(IPI);
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
						    	if(ICMS != ""){
						    		$("#orcProdICMS").val(ICMS);
						    	}
						    	if(ICMSRET != ""){
						    		$("#orcProdICMSRET").val(ICMSRET);
						    	}
						    	if(TABELA != ""){
						    		$("#orcPrecoTabela").val(TABELA);
						    	}
						    	if(SUGERIDO != ""){
						    		$("#orcProdPrecoSugerido").val(SUGERIDO);
						    	}
						    	if(CURVAABC != ""){
						    		$("#orcProdCurvaABC").val(CURVAABC); /*Inserido ABC*/
						    	}
						    	if(CODCRITICO != ""){
						    		$("#orcProdCodCritico").val(CODCRITICO); /*Inserido CODCRITICO*/
						    	}
						    	if(RECOMPRA != ""){
						    		$("#orcProdRecompra").val(RECOMPRA); /*Inserido RECOMPRA*/					    		
						    	}					    	
						    	if(PRECOVENDA != ""){
						    		$("#orcProdPrecoVenda").val(PRECOVENDA);
						    	}
						    	if(NCM != ""){
						    		$("#orcProdNCM").val(NCM);
						    	}
						    	if(PRECOMIN != ""){
						    		$("#orcProdPrecoMin").val(PRECOMIN);
						    	}
						    	if(PRECOCUSTO != ""){
						    		$("#orcProdPrecoCusto").val(PRECOCUSTO);
						    	}
//						    	if(PRCCUSTOT != "" && ( $('#A1_TIPO').val().toUpperCase() == 'GERENTE' || $('#A1_TIPO').val().toUpperCase() == 'MASTER') ){
//						    		$("#orcProdCustoTotal").val(PRCCUSTOT);
//						    	}
						    	if(PRCCUSTOTDOL != "" && ( $('#A1_TIPO').val().toUpperCase() == 'GERENTE' || $('#A1_TIPO').val().toUpperCase() == 'MASTER') ){
						    		PRECOCUSTODOLAR = formatNumber(PRECOCUSTODOLAR, 6, 3, '.', ',' )
						    		$("#orcProdCustoTotal").val(PRECOCUSTODOLAR);
						    	}
						    	if(ALIQIPI != ""){
						    		$("#orcProdAlqIPI").val(ALIQIPI);
						    	}
						    	if(ALIQICMS != ""){
						    		$("#orcProdAlqICMS").val(ALIQICMS);
						    	}
						    	if(PIS != ""){
						    		$("#orcProdPIS").val(PIS);
						    	}
						    	if(COFINS != ""){
						    		$("#orcProdCOFINS").val(COFINS);
						    	}
						    	
		    	    	}else if (records[0].CODRET == "2"){
		    	    		
		    	    		FLUIGC.toast({ title: '', message: "Error when consulting the product, notify the System Administrator!", type: 'danger' });
		   				 	console.log(records[0].MSG);
		    	    		funcoes.limpaCampos() 
		    	    		
		    	    	}
		    	    	
		    	    	
		    	    	
	    	    	}else{
	    	    		if(getLanguage() == "en_US"){
	    	    			mensagem = 'The product code entered does not exist in the database!';
	    	    		}else{
	    	    			mensagem = 'O código do produto informado não existe na base de dados!';
	    	    		}
	    	    		FLUIGC.toast({ title: '', message: mensagem, type: 'warning' });
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
		
		calculaPrecoVenda : function(){
			var PrecoSugerido = validafunctions.getFloatValue("orcProdPrecoSugerido");
			var Percent = validafunctions.getFloatValue("orcProdPercentAcresc");
			var PrecoVenda = 0;
			
			if(!isNaN(PrecoSugerido) && !isNaN(Percent)) {
				PrecoVenda = PrecoSugerido + ((PrecoSugerido * Percent) / 100);
			}
			
			if(!isNaN(PrecoVenda)){
				$("#orcProdPrecoVenda").val(PrecoVenda.toFixed(2));
				validafunctions.setMoeda("orcProdPrecoVenda", 2, false , '')
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
			
			$(document).on("change", "#orcProdCod", function() {
				if($('#orcProdCod').val().trim() != ''){
					var A1_PAIS= $('#A1_PAIS').val();
					
					if(A1_PAIS == 'USA'){
						
						funcoes.consultaProdutoQtdUSAAssync( $("#orcProdCod" ).val(), $("#orcProdQtd" ).val(), )
						
					}else{
						$("#orcProdPercentAcresc").val('0%');
						funcoes.consultaProdutoQtdAssync( $("#orcProdCod" ).val() , '1' );
					}
					
				}else{
					funcoes.limpaCampos();	
				}
				
			});
				
			$(document).on("change", "#orcProdPercentAcresc", function() {
				funcoes.calculaPrecoVenda();
			});
			
			$(document).on("click", "#limparCampos", function() { 
				funcoes.limpaCampos();	
				$("#orcProdCod").focus();
				
			});

			$(document).on("click", "#estoqueRevenda", function() { 
				
				const orcProdCod = $("#orcProdCod" ).val().trim();
				
				if(orcProdCod == ''){
					
					FLUIGC.toast({ title: '', message: "É preciso preencher um código de produto!", type: 'warning' });
					
				}else{
					var loading = FLUIGC.loading(window);
					loading.show();
					
					const WKUser = getWKUser();
					const siglaUFUser = WKUser.substring(0, 2);
					
					var html = "<div class='fluig-style-guide'>" +
									"<div class='table-responsive' style='overflow: auto; height: 220px;'>" +
										"<table class='table table-hover table-zoom table-condensed'>" +
											"<thead>" +
											"</thead>" +
											"<tbody>" +
											"</tbody>" +
										"</table>" +
									"</div>" +
							    "</div>";
					
					
					$.ajax({
			    		type: "GET",
			    		dataType: "json",
			    		async: true,
			    		url: "/api/public/ecm/dataset/search?datasetId=dsOrcPedConsultaEstoqueRevenda&filterFields=PROCOD,"+orcProdCod+",UF,"+siglaUFUser,
			    		data: "",
			    	    success: function (data, status, xhr) {
			    	    	console.log(data);
			    	    	if (data != null && data.content != null && data.content.length > 0) {
				    	    	const records = data.content;
				    	    	if( records[0].CODRET == "1"){
				    	    		
				    	    		var thead = "<tr>" +
											    	"<td style='font-weight: bold; width:45%;'>Revenda</td>" +
											    	"<td style='font-weight: bold; width:20%;'>Cidade</td>" +
											    	"<td style='font-weight: bold; width:5%; text-align:center;'>Estado</td>" +
											    	"<td style='font-weight: bold; width:15%; text-align:center;'>Telefone</td>" +
											    	"<td style='font-weight: bold; width:15%; text-align:center;''>Data Venda</td>" +
										    	"</tr>" ;
				    	    		$(".table-zoom > thead").append(thead);
				    	    		
				    	    		for ( var index in records) {
					    	    		var record = records[index];
					    	    	
					    	    		var REVENDA = record.REVENDA;
										var CIDADE = record.CIDADE;
										var UF = record.UF;
										var TELEFONE = record.TELEFONE;
										var DATAVENDA = record.DATAVENDA;
										
										var tbody = "<tr data-dataset=" + i + ">";
												tbody += "<td style='font-size:11px;' >" + REVENDA + "</td>";
												tbody += "<td style='font-size:11px;'>" + CIDADE+ "</td>";
												tbody += "<td style='font-size:11px; text-align:center;'>" + UF + "</td>";
												tbody += "<td style='font-size:11px; text-align:center;'>" + TELEFONE + "</td>";
												tbody += "<td style='font-size:11px; text-align:center;''>" + DATAVENDA + "</td>";
											tbody += "</tr>";
										$(".table-zoom > tbody").append(tbody);
				    	    		}
				    	    	}else{
				    	    		
				    	    		var tbody = "<tr>";
											tbody += "<td style='text-align:center;'>"+records[0].MSGRET+"</td>";
										tbody += "</tr>";
									$(".table-zoom > tbody").append(tbody);
								
				    	    	}
				    	    	
			    	    	}else{
			    	    		
			    	    		var tbody = "<tr>";
										tbody += "<td style='text-align:center;'>Nenhum registro localizado</td>";
									tbody += "</tr>";
								$(".table-zoom > tbody").append(tbody);
						
			    	    	}
			    	    	
			    	    	loading.hide();
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
					
					var myModal = FLUIGC.modal({
					    title: 'Estoque Revenda',
					    content: html,
					    formModal: false,
					    size: 'large',
					    id: 'modal-estoqueRevenda',
					    actions: [{
					        'label': 'Fechar',
					        'autoClose': true
					    }]
					}, function(err, data) {
					    if(err) {
					    	FLUIGC.toast({ title: 'Erro:', message: err, type: 'danger' });
							loading.hide();
					    } else {
					        // do something with data
					    }
					});
				}
				
				
			});
			
			$(document).on("click", "#aplicacao", function() { 
				
				var orcProdCod = $('#orcProdCod').val();
				
				if(orcProdCod == ""){
					FLUIGC.toast({
			    		title: '',
			    		message: 'Informe o código do produto!' ,
			    		type: 'warning'
			    	});
				}
				else{
					window.open("https://www.google.com.br/" + orcProdCod,"_blank");
				}
				
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
	
//	FLUIGC.popover('.bs-docs-popover-hover',{trigger: 'hover', placement: 'top', html: true, template: '<div class="popover" role="tooltip" style="max-width: 450px !important; width: 450px !important;" ><div class="arrow" ></div><div class="popover-content" style="max-width: 450px !important; width: 450px !important;"></div></div>'});
	
	
}


