function imprimeRelatorioStrassTech(tipo) {
//	https://stackoverflow.com/questions/1360869/how-to-use-html-to-print-header-and-footer-on-every-printed-page-of-a-document
//	https://medium.com/@Idan_Co/the-ultimate-print-html-template-with-header-footer-568f415f6d2a
	var originalContents = document.body.innerHTML;
	
	let HTML = '';
	
	let WKNumProces = getWKNumProces();
	if(WKNumProces == 0){
		WKNumProces = "";
	}
	let anoAtual = new Date().getFullYear();
	
	let cliCpfCnpj = ( $("#cliCpfCnpj").val().length == 6 ) ? "" : $("#cliCpfCnpj").val();
	
	let itPedPrecoUnitItem = '0,00';
	let itPedValorFreteItem = '0,00';
	
	let pedTipoPreco = '';
	let pedTipoPrecoChecked = $("input:radio[name*='pedTipoPreco']:checked").val();
	if(pedTipoPrecoChecked == 'pedTipoPrecoPreFixado'){
		pedTipoPreco = 'Pré-Fixado na Data do Pedido'
	}else if(pedTipoPrecoChecked == 'pedTipoPrecoVariavel'){
		pedTipoPreco = 'Variável até o Faturamento';
	}
	
	if(tipo =='ImprimeOrcamento'){

	HTML='<html>'+		
	     '<head>'+
	        '<script type="text/javascript" src="/portal/resources/js/jquery/jquery.js"></script>'+
	        '<style type="text/css" media="print">'+
		        'body {'+
		        '  counter-reset: section;'+
		        '  font-family: Arial, Helvetica, sans-serif;'+
		        '}'+
		        '.quebratexto { '+
		        '   white-space: pre-line;'+
		        '   word-wrap: break-word;'+
		        '}'+
		        '.table-section { '+
		        '	border-bottom: 1px solid #4F4F4F;'+
		        '}'+
		        
		        '.header {'+
		        '  	height: 20px;'+
		        '  	width:  100%;'+
		        ' 	position: fixed;'+
		        ' 	top: 0;'+
		        '}'+
	        
		        '.header-pedido {'+
		        '  	height: 46px;'+
		        '  	width:  100%;'+
		        ' 	top: 0px;'+
		        '}'+
		        '.header-space {'+
		        '  	height: 5px;'+
		        '  	width:  100%;'+
		        '}'+
		        '.footer {'+
		        '  	height: 30px;'+
		        '  	width:  100%;'+
		        ' 	position: fixed;'+
		        ' 	bottom: 5px;'+
		        '}'+
		        '.footer-space {'+
		        '  	height: 40px;'+
		        '  	width:  100%;'+
		        '}'+
	        
		        '.header-section-relatorio{'+
		        ' 	font-size: 14px !important;'+
		        '}'+
		        '.fonte-pedido{'+
				'	font-size: 11px;'+
				'	text-align:left;'+
		        '}'+
		        '.fonte-itens-pedido{'+
		        ' 	font-size: 9px;'+
		        '}'+
		        '.fonte-contrato{'+
				'	font-size: 11px;'+
				'	text-align: justify;'+
		        '}'+

		        '@page {'+
		        '	margin: 10mm 5mm 5mm 5mm;'+
		        '}'+
		        
		        '@media print {'+
		        '	.content-block, p {'+
		        ' 		page-break-inside: avoid;'+
		        ' 	}'+
		        '	.pagebreak { page-break-before: always; } /* page-break-after works, as well */'+
		        
		        '  	h6{'+
		        '    	position: absolute;'+
		        '    	page-break-before: always;'+
		        '    	page-break-after: always;'+
		        '    	top: 0;'+
		        '    	right: 0;'+
		        '  	}'+
		        '  	h6::before {'+
		        '    	position: relative;'+
		        '    	top:  -20px;'+
		        '    	counter-increment: section;'+
		        '    	content: counter(section);'+
		        '  	}'+
		        '}'+
	        
	        '</style>'+
	        '<script>'+
		        'var bottom = 0;'+
		        '$(document).ready(function() {'+
		        '	for(var i = 1; i < 3 ; i++){'+
		        '   	bottom += 100;'+
		        '   	botString = bottom.toString();'+
		        '    	var $counter = $("h6.first").clone().removeClass("first");'+
		        '    	$counter.css("top", botString + "vh");'+
		        '    	($counter).insertBefore(".insert");'+
		        '	}'+
		        '});'+
	        '</script>'+
        '</head>'+    
	
        '<body align="top">'+
        
		    // table Principal    
		    '<table>'+
			    //thead Principal
			    '<thead>'+
			    	'<tr><td>'+
				    	'<div class="header-space">&nbsp;</div>'+
				    	'<h6 class="first"></h6>'+
				    	'<div class="insert"></div>'+
			    	'</td></tr>'+
			    '</thead>'+
	    
			    //tbody Principal
			    '<tbody>'+
			    '<tr><td>'+
		   
			        '<div class="header-pedido">'+
				        '<table style="width:  100%; border-bottom: 1px solid #4F4F4F; " >' +
				        '	<tr>' +
				        '		<td align="center" style="width:  165px;">' +
				        '			<img align="center" height="42" width="77" src="http://177.101.121.27:8075/assinatura/img2/StrassTech.png">' +
				        '		</td>' +
				        '		<td align="center" style="font-size: 22px !important;">' +
				        '			<b>PEDIDO ' + WKNumProces + '</b>' +
				        '		</td>' +
				        '		<td align="center" style="width:  165px;">' +
				        '		</td>' +
				        '	</tr>' +
				        '</table>'+
				    '</div>'+
				    '<div style="height: 5px; width: 100%;" >&nbsp;</div>'+
			    
			    
				    //Dados Comprador
			        '<table class="table-section" >' +
			        '	<tr>' +
			        '		<td align="left" class="header-section-relatorio">' +
			        '			<b>Dados do Comprador</b>' +
			        '		</td>' +
			        '	</tr>' +
			        '</table>'+
			        '<table style="width:  100%;" >' +
			        '	<tr>' +
			        '		<th class="fonte-pedido" style="width:18%; text-align:left;">CPF/CNPJ</th>' +
			        '		<th class="fonte-pedido" style="width:18%; text-align:left;">Inscrição Estadual</th>' +
			        '		<th class="fonte-pedido" style="width:46%; text-align:left;">Comprador</th>' +
			        '		<th class="fonte-pedido" style="width:18%; text-align:left;">Data Pedido</th>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" valign="top">' + cliCpfCnpj +'</td>' +
			        '		<td class="fonte-pedido" valign="top">' + $("#cliInscricaoEstadual").val() +'</td>' +
			        '		<td class="fonte-pedido" valign="top">' + $("#cliNome").val() +'</td>' +
			        '		<td class="fonte-pedido" valign="top">' + $("#solDataAbertura").val() +'</td>' +
			        '	</tr>' +
			        '</table>'+
		        
	        
			        //Endereço de Entrega
			        '<table class="table-section" >' +
			        '	<tr>' +
			        '		<td align="left" class="header-section-relatorio">' +
			        '			<b>Endereço de Entrega</b>' +
			        '		</td>' +
			        '	</tr>' +
			        '</table>'+
			        '<table style="width:  100%;" >' +
			        '	<tr>' +
			        '		<th class="fonte-pedido" style="width:35%; text-align:left;">CEP</th>' +
			        '		<th class="fonte-pedido" style="width:20%; text-align:left;">Estado</th>' +
			        '		<th class="fonte-pedido" style="width:35%; text-align:left;">Cidade</th>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" >' + $("#cliCEP").val() +'</td>' +
			        '		<td class="fonte-pedido" >' + $("#cliUFHidden").val() +'</td>' +
			        '		<td class="fonte-pedido" >' + $("#cliCidade").val() +'</td>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<th class="fonte-pedido" style="width:35%; text-align:left;">Endereço</th>' +
			        '		<th class="fonte-pedido" style="width:20%; text-align:left;">Bairro</th>' +
			        '		<th class="fonte-pedido" style="width:35%; text-align:left;">Complemento</th>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" valign="top">' + $("#cliEndereco").val() +'</td>' +
			        '		<td class="fonte-pedido" valign="top">' + $("#cliBairro").val() +'</td>' +
			        '		<td class="fonte-pedido" valign="top">' + $("#cliComplemento").val() +'</td>' +
			        '	</tr>' +
			        '</table>'+
		        
			        //Dados Pedido
			        '<table class="table-section" >' +
			        '	<tr>' +
			        '		<td align="left" class="header-section-relatorio">' +
			        '			<b>Dados do Pedido</b>' +
			        '		</td>' +
			        '	</tr>' +
			        '</table>'+
			        '<table style="width: 100%;" >' +
			        '	<tr>' +
			        '		<th class="fonte-pedido" style="width:100%; text-align:left;">Representante</th>'+
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" valign="top">' + $("#repNome").val() +'</td>'+
			        '	</tr>' +
			        '</table>'+ 
			        '<table style="width: 100%;" >' +
			        '	<tr>' +
			        '		<th class="fonte-pedido" style="width:35%; text-align:left;">Condição de Pagamento</th>'+
					'		<th class="fonte-pedido" style="width:20%; text-align:left;">Frete</th>' +
					'		<th class="fonte-pedido" style="width:35%; text-align:left;">Tipo de Preço</th>' +
			        '	</tr>' +
			        '	<tr>';
			        if( $('#pedCondPagto').val()  == 'OUTRO' ){
			HTML += '		<td class="fonte-pedido">' + $("#pedCondPagto").val() +'<br>'+ $("#pedOutraCodPagto").val() +'</td>';
			        }else{
			HTML += '		<td class="fonte-pedido">' + $("#pedCondPagto").val() +'</td>';        	
			        }
		    HTML += '		<td class="fonte-pedido" valign="top" >' + $("#pedFrete").val() +'</td>' +
		    		'		<td class="fonte-pedido" valign="top">' + pedTipoPreco +'</td>' +
			        '	</tr>' +
			        '</table>'+
			        
			        '<table style="width: 100%;" >' +
			        '	<tr>' +
			        '		<th class="fonte-pedido" style="width:100%; text-align:left;">Observação</th>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido quebratexto" style="text-align: justify;">' + $("#pedObservacao").val() +'</td>' +
			        '	</tr>' +
			        '</table>'+
	        
			        //Observações Gerais
			        '<table class="table-section" >' +
			        '	<tr>' +
			        '		<td align="left" class="header-section-relatorio">' +
			        '			<b>Observações Gerais</b>' +
			        '		</td>' +
			        '	</tr>' +
			        '</table>'+
			        '<table style="width: 100%;" >' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" >Fabricação em Lages/SC. ICMS diferencial de alíquota por conta do comprador.</td>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" >Validade do Pedido: Este Pedido tem validade de 60 dias a partir da data de emissão.</td>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" >Previsão de embarque: ' + $("#pedDataPrevEmbarque").val() + ' A descarga no destino é de total responsabilidade do cliente.</td>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" style="text-align: justify;">Poderá ocorrer atraso na produção e consequentemente na entrega do equipamento devido a escassez de matéria-prima, isentando a GTS, por força maior e/ou fato de terceiros, da obrigação de cumprir a previsão de embarque, bem como isentando eventuais responsabilidades ou custos suportados pelo cliente.</td>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" style="text-align: justify;">Preço será corrigido no dia do faturamento, se houver reajuste de valores de matéria prima ou mudança de impostos será repassado ao comprador.</td>' +
			        '	</tr>' +
			        '</table>'+
	        
			        //Itens Pedido
			        '<table class="table-section" >' +
			        '	<tr>' +
			        '		<td align="left" class="header-section-relatorio">' +
			        '			<b>Descrição da Compra</b>' +
			        '		</td>' +
			        '	</tr>' +
			        '</table>'+
			        '<table style="width: 100%;" >' +
			        '	<tr style="border-bottom: 1px solid #4F4F4F;">' +
			        '		<th class="fonte-pedido" style="text-align:left; width:4%;" >Qtd.</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:9%;" >Cod. Item</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:36%;" >Descrição</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:12%;" >Preço Unit.</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:7%;" >Frete</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:8%;" >NCM</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:8%;" >Finame</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:6%;" >IPI</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:10%;" >Total</th>' +
			        '	</tr>';
		    
					$("input[name^=itPedCodItemItem___]").each(function(index){
						var index = validafunctions.getPosicaoFilho($(this).attr("id"));
						
						itPedPrecoUnitItem = $("#itPedPrecoUnitItem___"+index).val();
						itPedValorFreteItem = $("#itPedValorFreteItem___"+index).val();
						
				HTML +=	'	<tr>' +
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itPedQtdItem___"+index).val() +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itPedCodItemItem___"+index).val() +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itPedDescricaoItemItem___"+index).val() +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ itPedPrecoUnitItem +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ itPedValorFreteItem +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itPedNCMItem___"+index).val() +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itPedFinameItem___"+index).val() +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itPedIPIAliqItem___"+index).val() +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itPedTotalCustoSemImpItem___"+index).val() +'</td>'+
						'	</tr>';
					});
				HTML += '</table>'+
        
			        '<table style="width: 100%;" >' +
			        '	<tr>' +
			        '		<th class="fonte-pedido" style="width:100%; text-align:left;">Observação do Produto</th>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido quebratexto" style="text-align: justify;">' + $("#pedObservacaoProduto").val() +'</td>' +
			        '	</tr>' +
			        '</table>';
			        
			        if(  $("input:radio[name*='pecaPossuiPeca']:checked").val() == "pecaPossuiPecaSim") {
			    //Adiciona Seção de 'Tem Peça'    	
			    HTML +=	'<table class="table-section" >' +
				        '	<tr>' +
				        '		<td align="left" class="header-section-relatorio">' +
				        '			<b>Peça</b>' +
				        '		</td>' +
				        '	</tr>' +
				        '</table>'+
				        '<table style="width: 100%;" >' +
				        '	<tr>' +
				        '		<th class="fonte-pedido" style="width:50%; text-align:left;">Descrição Peça(s)</th>' +
				        '		<th class="fonte-pedido" style="width:50%; text-align:left;">Valor Peça(s)</th>' +
				        '	</tr>' +
				        '	<tr>' +
				        '		<td class="fonte-pedido quebratexto" style="text-align: justify;">' + $("#pecaDescricao").val() +'</td>' +
				        '		<td class="fonte-pedido" style="text-align: justify; vertical-align: top;">' + $("#pecaValor").val() +'</td>' +
				        '	</tr>' +
				        '</table>'+
				        
				        //Totais
				        '<div class="content-block">'+
					 	'<br>'+
						'<table style="width:100%">'+
						'  <tr>'+
				        '     <th style="width:61%"></th>'+             
				        '     <th colspan="4" class="header-section-relatorio" style="text-align:center; border-bottom: 1px solid #4F4F4F;"><b>Totais</b></td>'+
				        '  </tr>'+
				        '  <tr>'+
				        '     <th style="width:61%"></th>'+             
				        '     <th class="fonte-pedido" style="text-align:center; width:12%;">Máquina</th>'+
				        '     <th class="fonte-pedido" style="text-align:center; width:9%;">Frete</th>'+
				        '     <th class="fonte-pedido" style="text-align:center; width:9%;">IPI</th>'+
				        '     <th class="fonte-pedido" style="text-align:center; width:9%;">Peça</th>'+
				        '  </tr>'+
				        '  <tr>'+
				        '     <td style="width:61%"></td>'+             
				        '     <td class="fonte-pedido" style="text-align:center; width:12%;" valign="top">' + itPedPrecoUnitItem + '</td>'+             
				        '     <td class="fonte-pedido" style="text-align:center; width:9%;" valign="top">' + itPedValorFreteItem + '</td>'+             
				        '     <td class="fonte-pedido" style="text-align:center; width:9%;" valign="top">' + $('#pedTotalIPI').val() + '</td>'+             
				        '     <td class="fonte-pedido" style="text-align:center; width:9%;" valign="top">' + $('#pecaValor').val() + '</td>'+             
				        '  </tr>'+ 
				        '</table>'+
				        '<table style="width:100%">'+
				        '  <tr>'+
				        '     <td style="width:61%"></td>'+    
				        '     <th class="fonte-pedido" style="text-align:center; width:39%;">Valor Total</th>'+
				        '  </tr>'+
				        '  <tr>'+
				        '     <td style="width:61%"></td>'+    
				        '     <td class="fonte-pedido" style="text-align:center; width:39%;" valign="top">' + $('#pedTotalPedido').val() + ' <br>(' + primeiraLetraMaiuscula( $('#pedTotalPedido').val().extenso(true) )+ ')</td>'+  
				        '  </tr>'+  
				        '</table>'+
				        '</div>';
			    
			        }else{
				
			        //Totais
			   HTML +='<div class="content-block">'+
				 	'<br>'+
					'<table style="width:100%">'+
					'  <tr>'+
			        '     <th style="width:61%"></th>'+             
			        '     <th colspan="3" class="header-section-relatorio" style="text-align:center; border-bottom: 1px solid #4F4F4F;"><b>Totais</b></td>'+
			        '  </tr>'+
			        '  <tr>'+
			        '     <th style="width:61%"></th>'+             
			        '     <th class="fonte-pedido" style="text-align:center; width:13%;">Máquina</th>'+
			        '     <th class="fonte-pedido" style="text-align:center; width:13%;">Frete</th>'+
			        '     <th class="fonte-pedido" style="text-align:center; width:13%;">IPI</th>'+
			        '  </tr>'+
			        '  <tr>'+
			        '     <td style="width:61%"></td>'+             
			        '     <td class="fonte-pedido" style="text-align:center; width:13%;" valign="top">' + itPedPrecoUnitItem + '</td>'+             
			        '     <td class="fonte-pedido" style="text-align:center; width:13%;" valign="top">' + itPedValorFreteItem + '</td>'+             
			        '     <td class="fonte-pedido" style="text-align:center; width:13%;" valign="top">' + $('#pedTotalIPI').val() + '</td>'+             
			        '  </tr>'+ 
			        '</table>'+
			        '<table style="width:100%">'+
			        '  <tr>'+
			        '     <td style="width:61%"></td>'+    
			        '     <th class="fonte-pedido" style="text-align:center; width:39%;">Valor Total</th>'+
			        '  </tr>'+
			        '  <tr>'+
			        '     <td style="width:61%"></td>'+    
			        '     <td class="fonte-pedido" style="text-align:center; width:39%;" valign="top">' + $('#pedTotalPedido').val() + ' <br>(' + primeiraLetraMaiuscula( $('#pedTotalPedido').val().extenso(true) )+ ')</td>'+  
			        '  </tr>'+  
			        '</table>'+
			        '</div>';
				}
			        /*
			         * Início do Contrato
			         */
			    HTML +='<br>'+
			        '<table class="table-section" >' +
			        '	<tr>' +
			        '		<td align="left" class="header-section-relatorio">' +
			        '			<b>Contrato de Compra e Venda referente Pedido nº ' + WKNumProces + '</b>'+
			        '		</td>' +
			        '	</tr>' +
			        '</table>'+
		        
			        //CONTEUDO CONTRATO
			        '<table>'+
				        '<thead>'+
				        	'<tr><td>'+
				        	'</td></tr>'+
				        '</thead>'+
			       	
				        '<tbody>'+
					        '<tr><td>'+
					       	'<div class="content fonte-contrato">'+
				       	
							    '<p>'+
							    'São partes do presente instrumento, de um lado GTS DO BRASIL LTDA, sociedade limitada, estabelecida na rua Alcides Baccin n° 3000, bairro São Paulo, na cidade de Lages (SC), inscrita no CNPJ sob n. 04.043.327/0001-00 e/ ou estabelecida na BR 116, km 246, Área Industrial, Lages (SC), inscrita no CNPJ sob no 04.043.327/0004-44, denominada VENDEDORA, pelo seu representante legal firmado abaixo, e a pessoa física ou jurídica, acima qualificada, denominado COMPRADOR, os quais tem entre si justo e contratado o que segue, mediante as cláusulas abaixo:'+
							    '<br><span style="font-weight: bold;">I.</span> O COMPRADOR declara, para todos os efeitos legais, a autenticidade e validade dos dados cadastrais informados no item Dados do Comprador acima, especialmente quanto às inscrições no CNPJ/MF ou CPF e a Inscrição Estadual informadas, sob a afirmação de que estão em plena vigência.'+
							    '<br><span style="font-weight: bold;">II.</span> A inobservância das datas de validade do pedido, condição de pagamento no vencimento das parcelas, do preço e previsão de embarque, implicará, automaticamente, na recusa de aceitação das condições propostas, sujeito ao remanejamento da disponibilidade ou cancelamento do pedido por parte da fábrica. Além disto, poderá́ a VENDEDORA recusar as condições deste, se os valores não enquadrarem com a Lista de Preços vigente na data do pedido, ou ainda em caso de frete CIF, se o valor do frete não for compatível com a Tabela de Valores de Frete, fornecida pela VENDEDORA ao Representante.'+
							    '<br><span style="font-weight: bold;">III.</span> Fica estabele ida a cláusula de Reserva de Domínio sobre o(s) equipamento(s), objeto deste contrato no campo “Descrição da Compra”, em favor da VENDEDORA, até que o COMPRADOR pague a última prestação ajustada, saldando a totalidade do preço estipulado no campo “Total do Pedido”, ambos descritos acima. O pagamento da prestação de vencimento mais recente não importa em prova de haver sido paga prestação vencida anteriormente, por isso, os títulos representativos das prestações podem constituir objeto de comercio, sendo transferíveis sem prejuízo de validade deste contrato. A posse direta do COMPRADOR não anula a posse indireta da VENDEDORA.'+
							    '<br><span style="font-weight: bold;">IV.</span> O COMPRADOR só poderá imitir-se na posse do(s) equipamento(s) descrito(s) acima, mediante efetiva quitação dos valores com vencimento até o dia do embarque. Dessa forma, a entrega do(s) equipamento(s), fica condicionada ao recebimento pela VENDEDORA, em tempo hábil, dos valores indicados acima.'+ 
							    '<br><span style="font-weight: bold;">Parágrafo Primeiro:</span> O transporte do (s) bem(s) é de inteira responsabilidade do cliente quando no campo “Dados do Pedido” estiver descrito Frete FOB, sendo o bem disponibilizado, neste caso, no portão da fábrica, em Lages-SC.'+
							    '<br><span style="font-weight: bold;">Parágrafo Segundo:</span> O transporte do(s) equipamento(s) correrá por conta da VENDEDORA, quando, no campo “Dados do Pedido” estiver descrito Frete CIF, e o respectivo valor de transporte estiver descrito ao lado, o qual deve estar de acordo com a Tabela de Valores de Frete da VENDEDORA. Neste caso, único e exclusivo, o COMPRADOR nomeia e constitui a VENDEDORA sua bastante procuradora para fins de contratar transportador e seguro de transporte com cobertura do portão da fábrica ao endereço de entrega.'+ 
							    
							    '<br><span style="font-weight: bold;">V CONDIÇÕES DE PAGAMENTO</span> '+
							    '<br>O pagamento das parcelas nos vencimentos pactuados, e a confirmação de seu recebimento pela VENDEDORA, convalidam o pedido e implicam na aceitação das condições do contrato por parte do COMPRADOR, salvo questões decorrentes de força maior, tais como PANDEMIA, inflação descontrolada, desabastecimento do mercado de matéria-prima, atrasos no abastecimento, dentre outras situações que fujam ao controle da VENDEDORA. Tais situações podem implicar em atrasos na entrega, negociação para ajustes dos preços em decorrência de inflação e/ou recomposição do valor de compra da moeda não previstos na assinatura do Pedido.'+
							    '<br><span style="font-weight: bold;">Parágrafo Primeiro:</span> As incidências tributarias constituem-se parcelas autônomas, com valor de alíquotas e base de cálculo fixados por imposição legal na data do faturamento. Eventuais alterações na legislação tributária, multas fiscais por informações cadastrais e/ou endereços incorretos indicados pelo COMPRADOR que venham a atingir este contrato serão suportadas, exclusivamente, pelo COMPRADOR, inclusive tributos inexistentes na data da contratação.'+
							    '<br><span style="font-weight: bold;">Parágrafo Segundo:</span> Variações de percentual, ou diferencial de alíquota de ICMS, e outras exigências tributarias do Estado do COMPRADOR correm por conta exclusiva do COMPRADOR.'+
							    '<br><span style="font-weight: bold;">Parágrafo Terceiro:</span> A venda, objeto deste contrato, pressupõe como forma de pagamento as condições previstas acima no presente instrumento. Ocorrendo a hipótese pagamento total ou parcial do valor através de financiamento bancário, o COMPRADOR estará́ sujeito às normas da Instituição Financeira para o encaminhamento, aprovação e formalização da correspondente operação de financiamento, inclusive quanto aos encargos financeiros e garantias de referida operação de financiamento.'+
							    '<br><span style="font-weight: bold;">Parágrafo Quarto:</span> No caso do financiamento bancário, compete ao COMPRADOR apresentar até a data de validade do pedido, a competente Autorização de Faturamento a qual dá inicio ao processo de produção do produto na VENDEDORA, ou seja, se houver atraso na liberação do financiamento ou se não restar quitados os valores previstos e nas correspondentes datas, pode ocorrer atraso na produção e entrega do produto, que seguirá os prazos de liberação do Banco ou do pagamento pelo COMPRADOR, onde a responsabilidade por esse atraso não se transfere para a VENDEDORA. '+
							    '<br><span style="font-weight: bold;">Parágrafo Quinto:</span> Autorização de faturamento é a manifestação formal e escrita do agente financeiro, viabilizando o faturamento, embarque e entrega do equipamento, desde que as demais parcelas estejam regularizadas.'+
							    '<br><span style="font-weight: bold;">Parágrafo Sexto:</span> O não pagamento das parcelas nas datas acordadas implicará na mora por parte do COMPRADOR, sujeitando-o aos encargos financeiros vigentes, juros de mora de 1% ao mês, multa de 2% ao mês, e despesas de cobrança, inclusive custas judiciais e honorários advocatícios. Ainda, a inadimplência de qualquer das parcelas tornará vencida imediatamente a dívida toda.'+
							    '<br><span style="font-weight: bold;">Parágrafo Sétimo:</span> A desistência do pedido por parte do cliente após 15 dias de sua assinatura do presente instrumento concede à VENDEDORA o direito de reservar parte do valor recebido para cobrir as despesas gerais tidas com os trâmites da negociação, na base de até 1% (um por cento) do valor do Pedido.'+
						    
							    '<br><span style="font-weight: bold;">VI PROTEÇÃO DE DADOS</span> '+
							    '<br>Cada uma das partes reconhece e concorda que é responsável por seu próprio processamento de dados pessoais relativos a este Contrato e, conforme aplicável, as partes concordam que cada uma das partes age como controlador de dados para os fins da Lei de Proteção de Dados;'+
							    '<br><span style="font-weight: bold;">Parágrafo Primeiro:</span> Cada parte deverá, quando aplicável: (i) apenas processar dados pessoais em cumprimento à Lei de Proteção de Dados e fará com que si mesma ou a outra parte não violem tal lei e (ii) agir de forma razoável no fornecimento de tais informações e assistência que a outra parte venha a razoavelmente solicitar para permitir que a outra parte cumpra com suas obrigações sob a Lei de Proteção de Dados;'+
							    '<br><span style="font-weight: bold;">Parágrafo Segundo:</span> Caso qualquer das partes tome conhecimento de uma Violação Relatável quanto ao processamento de dados pessoais de acordo com este Contrato, esta deverá: (i) fornecer à outra parte detalhes razoáveis de tal Violação Relatável sem demora indevida, e (ii) agir de forma razoável, cooperando com a outra parte relativamente a quaisquer comunicações ou notificações a serem emitidas a quaisquer titulares de dados e/ou autoridades de supervisão quanto à Violação Relatável;'+
							    '<br><span style="font-weight: bold;">Parágrafo Terceiro:</span> Caso qualquer das partes receba qualquer comunicação de qualquer autoridade supervisora quanto ao processamento de dados pessoais de acordo com este Contrato, esta deverá: (i) fornecer à outra parte detalhes razoáveis de tal comunicação, e (ii) agir de forma razoável cooperando com a outra parte relativamente a quaisquer respostas à comunicação;'+
							    '<br><span style="font-weight: bold;">Parágrafo Quarto:</span> A VENDEDORA coleta, usa e protege dados pessoais de acordo com sua Política de Privacidade;'+
							    
							    '<br><span style="font-weight: bold;">VII.</span> O COMPRADOR declara que teve prévio conhecimento do presente Contrato, conforme determinação do artigo 46 da Lei 8.078/90 (Código de Defesa do Consumidor).'+
								'<br><span style="font-weight: bold;">VIII. </span> Fica eleito o foro Cível da Comarca de Lages-SC para dirimir dúvidas ou omissões, ficando a parte sucumbente sujeita ao pagamento das custas processuais e honorários advocatícios.'+
								'</p>'+
							    '<div class="content-block">'+
								    '<br>'+
								    '<br>'+
								    
								    '<p style="text-align:right;">Lages, SC, ______ de __________________ de '+anoAtual+'</p>'+
								    
								    '<br>'+
								    '<br>'+
								    '<br>'+
								    '<br>'+
								    '<br>'+
								    '<table style="width: 500px; " >' +
						 	        '	<tr>' +
						 	        '		<td style="width: 200px ; text-align:center; font-size: 10px !important; border-top: 1px solid #4F4F4F;" >COMPRADOR</td>' +
						 	        '		<td style="width: 100px; text-align:center; font-size: 10px !important;" ></td>' +
						 	        '		<td style="width: 200px ; text-align:center; font-size: 10px !important; border-top: 1px solid #4F4F4F;" >VENDEDORA</td>' +
						 	        '	</tr>' +
						 	        '</table>'+
						 	        '<br>'+
								    '<br>'+
								    '<br>'+
								    '<br>'+
								    '<br>'+
								    '<br>'+
								    '<br>'+
						 	        '<table style="width: 500px; " >' +
						 	        '	<tr>' +
						 	        '		<td style="width: 200px ; text-align:center; font-size: 10px !important; border-top: 1px solid #4F4F4F;" >Testemunha 1</td>' +
						 	        '		<td style="width: 100px; text-align:center; font-size: 10px !important;" ></td>' +
						 	        '		<td style="width: 200px ; text-align:center; font-size: 10px !important; border-top: 1px solid #4F4F4F;" >Testemunha 2</td>' +
						 	        '	</tr>' +
						 	        '</table>'+
					 	        '</div>'+
				 	        '</div>'+
				 	        '</td></tr>'+
			 	        '</tbody>'+
	         		'</table>'+
	 	        
				//Fim tbody Principal
		    	'</td></tr>'+
			    '</tbody>'+
	     
			    //tfoot Principal
		    	'<tfoot>'+
		    		'<tr><td>'+
		          		'<div class="footer-space">&nbsp;</div>'+
		        	'</td></tr>'+
		  		'</tfoot>'+
	        
	  	    //Fim table Principal   	
	    	'</table>'+
	        
	    	//Header Fixo (com a númeração)
	    	'<div class="header"></div>'+
    	
	    	//Footer Fixo
	        '<div class="footer">'+
	       	 	'<table style="width:  100%;  border-top: 1px solid #4F4F4F; " >' +
	 	        '	<tr>' +
	 	        '		<td style="text-align:center; font-size: 10px !important;" >Rua Alcides Baccin, 3000 - Bairro São Paulo - Às margens da BR 282, KM 03 - Lages - Santa Catarina - CEP 88506-605 </td>' +
	 	        '	</tr>' +
	 	        '	<tr>' +
	 	        '		<td style="text-align:center; font-size: 10px !important;" >Fone/Fax: (49) 3251.7100 - gts@gtsdobrasil.com.br - www.gtsdobrasil.com.br</td>' +
	 	        '	</tr>' +
	 	        '</table>'+
	     	'</div>'+
	     	
	    '</body>'+
	    '</html>';
	
	}else if(tipo =='ImprimeOrcamentoExportacao'){
		
	HTML='<html>'+
         '<head>'+
	        '<script type="text/javascript" src="/portal/resources/js/jquery/jquery.js"></script>'+
	        '<style type="text/css" media="print">'+
		        'body {'+
		        '	counter-reset: section;'+
		        '	font-family: Arial, Helvetica, sans-serif;'+
		        '}'+
		        '.quebratexto { '+
		        '   white-space: pre-line;'+
		        '   word-wrap: break-word;'+
		        '}'+
		        '.table-section { '+
		        '	border-bottom: 1px solid #4F4F4F;'+
		        '}'+
		        
		        '.header {'+
		        '  	height: 20px;'+
		        '  	width:  100%;'+
		        ' 	position: fixed;'+
		        ' 	top: 0;'+
		        '}'+
		        '.header-pedido {'+
		        '  	height: 46px;'+
		        '  	width:  100%;'+
		        ' 	top: 0px;'+
		        '}'+
		        '.header-space {'+
		        '  	height: 5px;'+
		        '  	width:  100%;'+
		        '}'+
		        '.footer {'+
		        '  	height: 30px;'+
		        '  	width:  100%;'+
		        ' 	position: fixed;'+
		        ' 	bottom: 5px;'+
		        '}'+
		        '.footer-space {'+
		        '  	height: 40px;'+
		        '  	width:  100%;'+
		        '}'+
		        
		        '.header-section-relatorio{'+
		        ' 	font-size: 14px !important;'+
		        '}'+
		        '.fonte-pedido{'+
				'	font-size: 11px;'+
				'	text-align:left;'+
		        '}'+
		        '.fonte-itens-pedido{'+
		        ' 	font-size: 9px;'+
		        '}'+
		        '.fonte-contrato{'+
				'	font-size: 11px;'+
				'	text-align: justify;'+
		        '}'+
	
		        '@page {'+
		        '	margin: 10mm 5mm 5mm 5mm;'+
		        '}'+
		        
		        '@media print {'+
		        '	.content-block, p {'+
		        ' 		page-break-inside: avoid;'+
		        ' 	}'+
		        '	.pagebreak { page-break-before: always; } /* page-break-after works, as well */'+
		        
		        '	h6{'+
		        '    	position: absolute;'+
		        '    	page-break-before: always;'+
		        '    	page-break-after: always;'+
		        '    	top: 0;'+
		        '    	right: 0;'+
		        '  	}'+
		        '	h6::before {'+
		        '    	position: relative;'+
		        '    	top:  -20px;'+
		        '    	counter-increment: section;'+
		        '    	content: counter(section);'+
		        '  	}'+
		        '}'+
	        '</style>'+
	        '<script>'+
		        'var bottom = 0;'+
		        '$(document).ready(function() {'+
		        //Exportação é sem contrato, somente uma pag.
		        ' for(var i = 1; i < 1 ; i++){'+
		        '    bottom += 100;'+
		        '    botString = bottom.toString();'+
		        '    var $counter = $("h6.first").clone().removeClass("first");'+
		        '    $counter.css("top", botString + "vh");'+
		        '     ($counter).insertBefore(".insert");'+
		        ' } '+
		        ' });'+
	        '</script>'+
        '</head>'+    
	
        '<body align="top"> '+
        
		    // table Principal    
		    '<table>'+
			    //thead Principal
			    '<thead>'+
			    	'<tr><td>'+
				    	'<div class="header-space">&nbsp;</div>'+
				    	'<h6 class="first"></h6>'+
				    	'<div class="insert"></div>'+
			    	'</td></tr>'+
			    '</thead>'+
	    
	    
	    
			    //tbody Principal
			    '<tbody>'+
			    '<tr><td>'+
			   
			        '<div class="header-pedido">'+
				        '<table style="width:  100%; border-bottom: 1px solid #4F4F4F; " >' +
				        '	<tr>' +
				        '		<td align="center" style="width:  165px;">' +
				        '			<img align="center" height="42" width="77" src="http://177.101.121.27:8075/assinatura/img2/StrassTech.png">' +
				        '		</td>' +
				        '		<td align="center" style="font-size: 22px !important;">' +
				        '			<b>PEDIDO ' + WKNumProces + '</b>' +
				        '		</td>' +
				        '		<td align="center" style="width:  165px;">' +
				        '		</td>' +
				        '	</tr>' +
				        '</table>'+
				    '</div>'+
				    '<div style="height: 5px; width: 100%;" >&nbsp;</div>'+
			    
				    //Dados Comprador
			        '<table class="table-section" >' +
			        '	<tr>' +
			        '		<td align="left" class="header-section-relatorio">' +
			        '			<b>Dados do Comprador</b>' +
			        '		</td>' +
			        '	</tr>' +
			        '</table>'+
			        '<table style="width:  100%;" >' +
			        '	<tr>' +
			        '		<th class="fonte-pedido" style="width:18%; text-align:left;">CPF/CNPJ</th>' +
			        '		<th class="fonte-pedido" style="width:18%; text-align:left;">Inscrição Estadual</th>' +
			        '		<th class="fonte-pedido" style="width:46%; text-align:left;">Comprador</th>' +
			        '		<th class="fonte-pedido" style="width:18%; text-align:left;">Data Pedido</th>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" valign="top">' + cliCpfCnpj +'</td>' +
			        '		<td class="fonte-pedido" valign="top">' + $("#cliInscricaoEstadual").val() +'</td>' +
			        '		<td class="fonte-pedido" valign="top">' + $("#cliNome").val() +'</td>' +
			        '		<td class="fonte-pedido" valign="top">' + $("#solDataAbertura").val() +'</td>' +
			        '	</tr>' +
			        '</table>'+
		        
			        //Endereço de Entrega
			        '<table class="table-section" >' +
			        '	<tr>' +
			        '		<td align="left" class="header-section-relatorio">' +
			        '			<b>Endereço de Entrega</b>' +
			        '		</td>' +
			        '	</tr>' +
			        '</table>'+
			        '<table style="width:  100%;" >' +
			        '	<tr>' +
			        '		<th class="fonte-pedido" style="width:35%; text-align:left;">CEP</th>' +
			        '		<th class="fonte-pedido" style="width:20%; text-align:left;">Estado</th>' +
			        '		<th class="fonte-pedido" style="width:35%; text-align:left;">Cidade</th>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" >' + $("#cliCEP").val() +'</td>' +
			        '		<td class="fonte-pedido" >' + $("#cliUFHidden").val() +'</td>' +
			        '		<td class="fonte-pedido" >' + $("#cliCidade").val() +'</td>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<th class="fonte-pedido" style="width:35%; text-align:left;">Endereço</th>' +
			        '		<th class="fonte-pedido" style="width:20%; text-align:left;">Bairro</th>' +
			        '		<th class="fonte-pedido" style="width:35%; text-align:left;">Complemento</th>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" valign="top">' + $("#cliEndereco").val() +'</td>' +
			        '		<td class="fonte-pedido" valign="top">' + $("#cliBairro").val() +'</td>' +
			        '		<td class="fonte-pedido" valign="top">' + $("#cliComplemento").val() +'</td>' +
			        '	</tr>' +
			        '</table>'+
				        
			        //Dados Pedido
			        '<table class="table-section" >' +
			        '	<tr>' +
			        '		<td align="left" class="header-section-relatorio">' +
			        '			<b>Dados do Pedido</b>' +
			        '		</td>' +
			        '	</tr>' +
			        '</table>'+
			        '<table style="width: 100%;" >' +
			        '	<tr>' +
			        '		<th class="fonte-pedido" style="width:100%; text-align:left;">Representante</th>'+
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" valign="top">' + $("#repNome").val() +'</td>'+
			        '	</tr>' +
			        '</table>'+ 
			        '<table style="width: 100%;" >' +
			        '	<tr>' +
			        '		<th class="fonte-pedido" style="width:35%; text-align:left;">Condição de Pagamento</th>'+
					'		<th class="fonte-pedido" style="width:20%; text-align:left;">Frete</th>' +
					'		<th class="fonte-pedido" style="width:35%; text-align:left;">Tipo de Preço</th>' +
			        '	</tr>' +
			        '	<tr>';
			        if( $('#pedCondPagto').val()  == 'OUTRO' ){
			HTML += '		<td class="fonte-pedido">' + $("#pedCondPagto").val() +'<br>'+ $("#pedOutraCodPagto").val() +'</td>';
			        }else{
			HTML += '		<td class="fonte-pedido">' + $("#pedCondPagto").val() +'</td>';        	
			        }
		    HTML += '		<td class="fonte-pedido" valign="top" >' + $("#pedFrete").val() +'</td>' +
		    		'		<td class="fonte-pedido" valign="top">' + pedTipoPreco +'</td>' +
			        '	</tr>' +
			        '</table>'+
			        
			        '<table style="width: 100%;" >' +
			        '	<tr>' +
			        '		<th class="fonte-pedido" style="width:100%; text-align:left;">Observação</th>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido quebratexto" style="text-align: justify;">' + $("#pedObservacao").val() +'</td>' +
			        '	</tr>' +
			        '</table>'+
	        
			        //Observações Gerais
			        '<table class="table-section" >' +
			        '	<tr>' +
			        '		<td align="left" class="header-section-relatorio">' +
			        '			<b>Observações Gerais</b>' +
			        '		</td>' +
			        '	</tr>' +
			        '</table>'+
			        '<table style="width: 100%;" >' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" >Fabricação em Lages/SC. ICMS diferencial de alíquota por conta do comprador.</td>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" >Validade do Pedido: Este Pedido tem validade de 60 dias a partir da data de emissão.</td>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" >Previsão de embarque: ' + $("#pedDataPrevEmbarque").val() + ' A descarga no destino é de total responsabilidade do cliente.</td>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" style="text-align: justify;">Poderá ocorrer atraso na produção e consequentemente na entrega do equipamento devido a escassez de matéria-prima, isentando a GTS, por força maior e/ou fato de terceiros, da obrigação de cumprir a previsão de embarque, bem como isentando eventuais responsabilidades ou custos suportados pelo cliente.</td>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido" style="text-align: justify;">Preço será corrigido no dia do faturamento, se houver reajuste de valores de matéria prima ou mudança de impostos será repassado ao comprador.</td>' +
			        '	</tr>' +
			        '</table>'+
	        
			        //Itens Pedido
			        '<table class="table-section" >' +
			        '	<tr>' +
			        '		<td align="left" class="header-section-relatorio">' +
			        '			<b>Descrição da Compra</b>' +
			        '		</td>' +
			        '	</tr>' +
			        '</table>'+
			        '<table style="width: 100%;" >' +
			        '	<tr style="border-bottom: 1px solid #4F4F4F;">' +
			        '		<th class="fonte-pedido" style="text-align:left; width:4%;" >Qtd.</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:9%;" >Cod. Item</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:31%;" >Descrição</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:15%;" >Preço Unit. (USD)</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:9%;" >Frete (USD)</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:8%;" >NCM</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:8%;" >Finame</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:6%;" >IPI</th>' +
			        '		<th class="fonte-pedido" style="text-align:left; width:10%;" >Total (USD)</th>' +
			        '	</tr>';
					$("input[name^=itPedCodItemItem___]").each(function(index){
						var index = validafunctions.getPosicaoFilho($(this).attr("id"));
						itPedPrecoUnitItem = $("#itPedPrecoUnitItem___"+index).val();
						itPedValorFreteItem = $("#itPedValorFreteItem___"+index).val();
				HTML +=	'	<tr>' +
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itPedQtdItem___"+index).val() +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itPedCodItemItem___"+index).val() +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itPedDescricaoItemItem___"+index).val() +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ itPedPrecoUnitItem +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ itPedValorFreteItem +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itPedNCMItem___"+index).val() +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itPedFinameItem___"+index).val() +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itPedIPIAliqItem___"+index).val() +'</td>'+
						'		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itPedTotalCustoSemImpItem___"+index).val() +'</td>'+
						'	</tr>';
					});
				HTML += '</table>'+
        
			        '<table style="width: 100%;" >' +
			        '	<tr>' +
			        '		<th class="fonte-pedido" style="width:100%; text-align:left;">Observação do Produto</th>' +
			        '	</tr>' +
			        '	<tr>' +
			        '		<td class="fonte-pedido quebratexto" style="text-align: justify;">' + $("#pedObservacaoProduto").val() +'</td>' +
			        '	</tr>' +
			        '</table>';
			        
			        if(  $("input:radio[name*='pecaPossuiPeca']:checked").val() == "pecaPossuiPecaSim") {
		        	//Adiciona Seção de 'Tem Peça'    	
			    HTML +=	'<table class="table-section" >' +
				        '	<tr>' +
				        '		<td align="left" class="header-section-relatorio">' +
				        '			<b>Peça</b>' +
				        '		</td>' +
				        '	</tr>' +
				        '</table>'+
				        '<table style="width: 100%;" >' +
				        '	<tr>' +
				        '		<th class="fonte-pedido" style="width:50%; text-align:left;">Descrição Peça(s)</th>' +
				        '		<th class="fonte-pedido" style="width:50%; text-align:left;">Valor Peça(s) (USD)</th>' +
				        '	</tr>' +
				        '	<tr>' +
				        '		<td class="fonte-pedido quebratexto" style="text-align: justify;">' + $("#pecaDescricao").val() +'</td>' +
				        '		<td class="fonte-pedido" style="text-align: justify; vertical-align: top;">' + $("#pecaValor").val() +'</td>' +
				        '	</tr>' +
				        '</table>'+
				        
				      //Totais
				        '<div class="content-block">'+
					 	'<br>'+
						'<table style="width:100%">'+
						'  <tr>'+
				        '     <th style="width:61%"></th>'+             
				        '     <th colspan="4" class="header-section-relatorio" style="text-align:center; border-bottom: 1px solid #4F4F4F;"><b>Totais</b></td>'+
				        '  </tr>'+
				        '  <tr>'+
				        '     <th style="width:61%"></th>'+             
				        '     <th class="fonte-pedido" style="text-align:center; width:12%;">Máquina (USD)</th>'+
				        '     <th class="fonte-pedido" style="text-align:center; width:9%;">Frete (USD)</th>'+
				        '     <th class="fonte-pedido" style="text-align:center; width:9%;">IPI (USD)</th>'+
				        '     <th class="fonte-pedido" style="text-align:center; width:9%;">Peça (USD)</th>'+
				        '  </tr>'+
				        '  <tr>'+
				        '     <td style="width:61%"></td>'+             
				        '     <td class="fonte-pedido" style="text-align:center; width:12%;" valign="top">' + itPedPrecoUnitItem + '</td>'+             
				        '     <td class="fonte-pedido" style="text-align:center; width:9%;" valign="top">' + itPedValorFreteItem + '</td>'+             
				        '     <td class="fonte-pedido" style="text-align:center; width:9%;" valign="top">' + $('#pedTotalIPI').val() + '</td>'+             
				        '     <td class="fonte-pedido" style="text-align:center; width:9%;" valign="top">' + $('#pecaValor').val() + '</td>'+             
				        '  </tr>'+ 
				        '</table>'+
				        '<table style="width:100%">'+
				        '  <tr>'+
				        '     <td style="width:61%"></td>'+    
				        '     <th class="fonte-pedido" style="text-align:center; width:39%;">Valor Total (USD)</th>'+
				        '  </tr>'+
				        '  <tr>'+
				        '     <td style="width:61%"></td>'+    
				        '     <td class="fonte-pedido" style="text-align:center; width:39%;" valign="top">' + $('#pedTotalPedido').val() + ' <br>(' + primeiraLetraMaiuscula( $('#pedTotalPedido').val().extensoDolar(true) ) + ')</td>'+  
				        '  </tr>'+  
				        '</table>'+
				        '</div>';
			        }else{
						
				        //Totais
				   HTML +='<div class="content-block">'+
					 	'<br>'+
						'<table style="width:100%">'+
						'  <tr>'+
				        '     <th style="width:61%"></th>'+             
				        '     <th colspan="3" class="header-section-relatorio" style="text-align:center; border-bottom: 1px solid #4F4F4F;"><b>Totais</b></td>'+
				        '  </tr>'+
				        '  <tr>'+
				        '     <th style="width:61%"></th>'+             
				        '     <th class="fonte-pedido" style="text-align:center; width:13%;">Máquina (USD)</th>'+
				        '     <th class="fonte-pedido" style="text-align:center; width:13%;">Frete (USD)</th>'+
				        '     <th class="fonte-pedido" style="text-align:center; width:13%;">IPI (USD)</th>'+
				        '  </tr>'+
				        '  <tr>'+
				        '     <td style="width:61%"></td>'+             
				        '     <td class="fonte-pedido" style="text-align:center; width:13%;" valign="top">' + itPedPrecoUnitItem + '</td>'+             
				        '     <td class="fonte-pedido" style="text-align:center; width:13%;" valign="top">' + itPedValorFreteItem + '</td>'+             
				        '     <td class="fonte-pedido" style="text-align:center; width:13%;" valign="top">' + $('#pedTotalIPI').val() + '</td>'+             
				        '  </tr>'+ 
				        '</table>'+
				        '<table style="width:100%">'+
				        '  <tr>'+
				        '     <td style="width:61%"></td>'+    
				        '     <th class="fonte-pedido" style="text-align:center; width:39%;">Valor Total (USD)</th>'+
				        '  </tr>'+
				        '  <tr>'+
				        '     <td style="width:61%"></td>'+    
				        '     <td class="fonte-pedido" style="text-align:center; width:39%;" valign="top">' + $('#pedTotalPedido').val() + ' <br>(' + primeiraLetraMaiuscula( $('#pedTotalPedido').val().extensoDolar(true) ) + ')</td>'+  
				        '  </tr>'+  
				        '</table>'+
				        '</div>';
					}
	 	        
				//Fim tbody Principal
			    HTML +=	'</td></tr>'+
			    '</tbody>'+
			     
			    //tfoot Principal
		    	'<tfoot>'+
		    		'<tr><td>'+
		          		'<div class="footer-space">&nbsp;</div>'+
		        	'</td></tr>'+
		  		'</tfoot>'+
	        
	  	    //Fim table Principal   	
	    	'</table>'+
	        
	    	//Header Fixo (com a númeração)
	    	'<div class="header"></div>'+
    	
	    	//Footer Fixo
	        '<div class="footer">'+
	       	 	'<table style="width:  100%;  border-top: 1px solid #4F4F4F; " >' +
	 	        '	<tr>' +
	 	        '		<td style="text-align:center; font-size: 10px !important;" >Rua Alcides Baccin, 3000 - Bairro São Paulo - Às margens da BR 282, KM 03 - Lages - Santa Catarina - CEP 88506-605 </td>' +
	 	        '	</tr>' +
	 	        '	<tr>' +
	 	        '		<td style="text-align:center; font-size: 10px !important;" >Fone/Fax: (49) 3251.7100 - gts@gtsdobrasil.com.br - www.gtsdobrasil.com.br</td>' +
	 	        '	</tr>' +
	 	        '</table>'+
	     	'</div>'+
	     	
	     	
	    '</body>'+
	    '</html>';
		
	}
	  
	var WindowObject = window.open('about:blank', "_blank", "width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes,titlebar=yes");
	WindowObject.document.writeln(HTML);
	WindowObject.document.close();
	WindowObject.focus();
	WindowObject.print();
	
}