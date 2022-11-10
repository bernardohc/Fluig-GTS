function imprimeRelatorio() {
    //	https://stackoverflow.com/questions/1360869/how-to-use-html-to-print-header-and-footer-on-every-printed-page-of-a-document
    //	https://medium.com/@Idan_Co/the-ultimate-print-html-template-with-header-footer-568f415f6d2a
        var originalContents = document.body.innerHTML;
        
        let HTML = '<html>'+
            '<head>'+
            '<script type="text/javascript" src="/portal/resources/js/jquery/jquery.js"></script>'+
            '<style type="text/css" media="print">'+
            'body {'+
            '  counter-reset: section;'+
            '  font-family: Arial, Helvetica, sans-serif;'+
            '}'+

            '.table-main { '+
            '   width:100%;'+
            '}'+

            '.table-section { '+
            '   width:  100%;'+
            '}'+
            
            '.header {'+
            '  	height: 20px;'+
            '  	width:  100%;'+
            ' 	top: 0;'+
            '}'+
        
            '.header-relatorio {'+
            '  	width:  100%;'+
            ' 	top: 0px;'+
            '}'+

            '.header-space {'+
            '  	height: 5px;'+
            ' 	position: fixed;'+
            '  	width:  100%;'+
            '}'+

            '.footer {'+
            '  	height: 30px;'+
           // '  	width:  100%;'+
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

            '@page {'+
            '	margin: 10mm 5mm 5mm 5mm;'+
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

            '<body align=" rigth">'+
                // table Principal    
                '<table class="table-main">'+
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
            
                        '<div class="header-relatorio">'+
                            '<table style="width:  100%; border-bottom: 1px solid #4F4F4F;">' +
                            '	<tr>' +
                            '		<td align="center" style="width:  165px;">' +
                            '			<img align="center" height="42" width="77" src="http://177.101.121.27:8887/portal/api/servlet/image/GTS/custom/logo_image.png">' +
                            '		</td>' +
                            '		<td align="center" style="font-size: 22px !important;">' +
                            '			<b>Relatório de Viagens ' + WKNumProces + '</b>' +
                            '		</td>' +
                            '		<td align="center" style="width:  165px;">' +
                            '		</td>' +
                            '	</tr>' +
                            '</table>'+
                        '</div>'+
                        '<div style="height:5px; width:100%;" >&nbsp;</div>'+

                        //Dados Relatório
                        '<table class="table-section"  style=" border-bottom: 1px solid #4F4F4F;">' +
                        '	<tr>' +
                        '		<td align="left" class="header-section-relatorio">' +
                        '			<b>Viagem</b>' +
                        '		</td>' +
                        '	</tr>' +
                        '</table>'+
                        '<table style="width:  100%;" >' +
                        '	<tr>' +
                        '		<th class="fonte-pedido" style="width28%; text-align:left;">Matricula Solicitante</th>' +
                        '		<th class="fonte-pedido" style="width:30%; text-align:left;">Nome Solicitante</th>' +
                        '		<th class="fonte-pedido" style="width:15%; text-align:left;">Data do Relatório</th>' +
                        '		<th class="fonte-pedido" style="width:15%; text-align:left;">Valor Adiantamento</th>' +  
                        '	</tr>' +
                        '	<tr>' +
                        '		<td class="fonte-pedido" valign="top">' + $("#solMatSolicitante").val() +'</td>' +
                        '		<td class="fonte-pedido" valign="top">' + $("#solNomeSolicitante").val() +'</td>' +
                        '		<td class="fonte-pedido" valign="top">' + $("#solDataRelatorio").val() +'</td>' +
                        '		<td class="fonte-pedido" valign="top">' + $("#solValorAdiantamento").val() +'</td>' +
                        '	</tr>' +
                        '	<tr>' +
                        '		<th class="fonte-pedido" style="width:28%; text-align:left;">Nº de Colaboradores</th>' +
                        '		<th class="fonte-pedido" style="width:30%; text-align:left;">Data de Saída</th>' +
                        '		<th class="fonte-pedido" style="width:15%; text-align:left;">Data de Retorno</th>' + 
                        '	</tr>' +
                        '	<tr>' +
                        '		<td class="fonte-pedido" valign="top">' + $("#solNumColaboradores").val() +'</td>' +
                        '		<td class="fonte-pedido" valign="top">' + $("#solDataSaida").val() +'</td>' +
                        '		<td class="fonte-pedido" valign="top">' + $("#solDataRetorno").val() +'</td>' +
                        '	</tr>' +
                        '</table>'+

                        //Itens do relatório
                        '<table class="table-section"  style="width:  100%; border-bottom: 1px solid #4F4F4F; border-top: 1px solid #4F4F4F; ">' +
                        '	<tr>' +
                        '		<td align="left" class="header-section-relatorio">' +
                        '			<b>Dados do Relatório</b>' +
                        '		</td>' +
                        '	</tr>' +
                        '</table>'+
                        '<table style="width: 100%;" >' +
                        '	<tr style="border-bottom: 1px solid #4F4F4F;">' +
                        '		<th class="fonte-pedido" style="text-align:left; width:10%;" >Estabelecimento</th>' +
                        '		<th class="fonte-pedido" style="text-align:left; width:10%;" >Documento</th>' +
                        '		<th class="fonte-pedido" style="text-align:left; width:10%;" >Data</th>' +
                        '		<th class="fonte-pedido" style="text-align:left; width:10%;" >Tp. Pagamento</th>' +
                        '		<th class="fonte-pedido" style="text-align:left; width:10%;" >Classificação</th>' +
                        '		<th class="fonte-pedido" style="text-align:left; width:10%;" >Valor</th>' +
                        '		<th class="fonte-pedido" style="text-align:left; width:10%;" >Centro Custo</th>' +
                        '	</tr>';
                        $("input[name^=solEstabelecimento__]").each(function(index){
                            var index = validafunctions.getPosicaoFilho($(this).attr("id"));
                    HTML +=	'	<tr>' +
                            '		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#solEstabelecimento___"+index).val() +'</td>'+
                            '		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#solDocumento___"+index).val() +'</td>'+
                            '		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#solDataDocumento___"+index).val() +'</td>'+
                            '		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itSolTipoPagamento___"+index).val() +'</td>'+
                            '		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itSolTipoDespesaItem___"+index).val() +'</td>'+
                            '		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itSolValorDespesa___"+index).val() +'</td>'+
                            '		<td style="text-align:left; " class="fonte-itens-pedido" >'+ $("#itSolCentroCusto___"+index).val() +'</td>'+
                            '	</tr>';
                        });
                    HTML += '</table>'+
                        //Totais do relatório
                        '<table class="table-section"  style="width:  100%; border-bottom: 1px solid #4F4F4F; border-top: 1px solid #4F4F4F; ">' +
                        '	<tr>' +
                        '		<td align="left" class="header-section-relatorio">' +
                        '			<b>Totais</b>' +
                        '		</td>' +
                        '	</tr>' +
                        '</table>'+
                        '<table style="width:  100%;" >' +
                        '	<tr>' +
                        '		<th class="fonte-pedido" style="width:30%; text-align:left;">Observação</th>' +
                        '		<th class="fonte-pedido" style="width:25%; text-align:left;">Diária</th>' +
                        '		<th class="fonte-pedido" style="width:33%; text-align:left;">Total de Despesas</th>' +
                        '		<th class="fonte-pedido" style="width:25%; text-align:left;">Saldo</th>' +  
                        '	</tr>' +
                        '	<tr>' +
                        '		<td class="fonte-pedido" valign="top">' + $("#itSolObsDespesaItem").val() +'</td>' +
                        '		<td class="fonte-pedido" valign="top">' + $("#solValorDiaria").val() +'</td>' +
                        '		<td class="fonte-pedido" valign="top">' + $("#solTotalDespesas").val() +'</td>' +
                        '		<td class="fonte-pedido" valign="top">' + $("#solSaldo").val() +'</td>' +
                        '	</tr>' +
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
                            '<table style="width:100%; border-top: 1px solid #4F4F4F;" >' +
                            '	<tr>' +
                            '		<td style="text-align:center; font-size: 10px !important;" >Rua Alcides Baccin, 3000 - Bairro São Paulo - Às margens da BR 282, KM 03 - Lages - Santa Catarina - CEP 88506-605 </td>' +
                            '	</tr>' +
                            '	<tr>' +
                            '		<td style="text-align:center; font-size: 10px !important;" >Fone/Fax: (49) 3251.7100 - gts@gtsdobrasil.com.br - www.gtsdobrasil.com.br</td>' +
                            '	</tr>' +
                            '</table>'+
                       '</div>'+
                '</table>'+
            '</body>'+
    '</html>';
   
        
        var WindowObject = window.open( "_blank", "width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes,titlebar=yes");
        WindowObject.document.writeln();
        WindowObject.document.close();
        WindowObject.focus();
        WindowObject.print();
        
    }