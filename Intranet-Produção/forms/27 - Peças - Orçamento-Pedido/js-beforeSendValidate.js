var beforeSendValidate = function(numState,nextState){
    
    var A1_TIPO = $('#A1_TIPO').val().toUpperCase();
    var A1_PAIS = $('#A1_PAIS').val().toUpperCase();
    var message = "";
    var hasErros = false;
    
    switch (parseInt(numState)) {
    	case INICIO_0 : 
    	case INICIO :
    	case FORMALIZAPEDIDO:
    	case FORMALIZAPEDIDOUSA:	
    		if(A1_PAIS == "USA"){
    			$("input[name*=orcCodProdutoItem___]").each(function(index){
    				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
    				
    				var orcCodProdutoItem = $("#orcCodProdutoItem___"+ index).val()
    				var orcDescProdutoItem = $("#orcDescProdutoItem___"+ index).val()
    				
    				//calcula o valor de quantidade pelo preço de custo
					var qtdItem = Number($("#orcQtdItem___"+ index).val());	
					var valCustoItem = validafunctions.getFloatValue("orcPrecoCustoItem___"+index);
					
					var totalCustoItem = (valCustoItem * qtdItem);
					totalCustoItem = Math.round(totalCustoItem * 100) / 100;
					totalCustoItem = totalCustoItem.toFixed(2)
					
					//Este é o valor que é enviado para o Protheus
					var orcTotalCustoItem = validafunctions.getFloatValue("orcTotalCustoItem___"+index);
					orcTotalCustoItem = orcTotalCustoItem.toFixed(2)
					
					//foi colocado essa tratativa, pq existem casos que a quantidade de embalagem não bate com o multiplo
					//os usuários estã trocando e clicando já em enviar.
					if(totalCustoItem != orcTotalCustoItem){
						message += getMessage("The total calculation of product <b>" +orcCodProdutoItem + " - " + orcDescProdutoItem + "</b> has not been completed.", 6, '');
		                hasErros = true;
					}
					
    			});	
    			
    		}else if( A1_TIPO == 'GERENTE' ){
    			
    			var tipoPedido = $('#tipoPedido').val();
    			
    			if(tipoPedido == "CP"){
    				
    				var CPqtdOpcaoRecebimento = Number($('#CPqtdOpcaoRecebimento').val());
    				
    				$("input[name*=orcCodProdutoItem___]").each(function(index){
        				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
        				
        				if(CPqtdOpcaoRecebimento >= 1){
        					var orcQtdCP1RetItem = Number($("#orcQtdCP1RetItem___"+ index).val());	
        					if(orcQtdCP1RetItem > 0){
	        					var orcCodProdutoItem = $("#orcCodProdutoItem___"+ index).val();
	            				var orcDescProdutoItem = $("#orcDescProdutoItem___"+ index).val();
	        					
	            				//calcula o valor de quantidade pelo preço de custo
//	        					var orcQtdCP1RetItem = Number($("#orcQtdCP1RetItem___"+ index).val());	
	        					var valCustoItem = validafunctions.getFloatValue("orcPrecoCustoItem___"+index);
	            				
	        					var totalCustoCP1Item = (valCustoItem * orcQtdCP1RetItem);
	        					totalCustoCP1Item = Math.round(totalCustoCP1Item * 100) / 100;
	        					totalCustoCP1Item = totalCustoCP1Item.toFixed(2)
	        					
	        					//Este é o valor que é enviado para o Protheus
	        					var orcCP1RetTotalCustoItem = validafunctions.getFloatValue("orcCP1RetTotalCustoItem___"+index);
	        					orcCP1RetTotalCustoItem = orcCP1RetTotalCustoItem.toFixed(2)
	        					
	        					//foi colocado essa tratativa, pq existem casos que a quantidade de embalagem não bate com o multiplo
	        					//os usuários estã trocando e clicando já em enviar.
	        					if(totalCustoCP1Item != orcCP1RetTotalCustoItem){
	        						message += getMessage("O cálculo total do produto <b>" +orcCodProdutoItem + " - " + orcDescProdutoItem + "</b> não foi finalizado.", 6, '');
	        		                hasErros = true;
	        					}
        					}
        					
        				}
        				if(CPqtdOpcaoRecebimento >= 2){
        					
        					var orcQtdCP2RetItem = Number($("#orcQtdCP2RetItem___"+ index).val());	
        					if(orcQtdCP2RetItem > 0){
        						var orcCodProdutoItem = $("#orcCodProdutoItem___"+ index).val()
                				var orcDescProdutoItem = $("#orcDescProdutoItem___"+ index).val()
            					
                				//calcula o valor de quantidade pelo preço de custo
//            					var orcQtdCP2RetItem = Number($("#orcQtdCP2RetItem___"+ index).val());	
            					var valCustoItem = validafunctions.getFloatValue("orcPrecoCustoItem___"+index);
                				
            				
            					
            					var totalCustoCP2Item = (valCustoItem * orcQtdCP2RetItem);
            					totalCustoCP2Item = Math.round(totalCustoCP2Item * 100) / 100;
            					totalCustoCP2Item = totalCustoCP2Item.toFixed(2)
            					
            					//Este é o valor que é enviado para o Protheus
            					var orcCP2RetTotalCustoItem = validafunctions.getFloatValue("orcCP2RetTotalCustoItem___"+index);
            					console.log('valCusto2Item'+orcCP2RetTotalCustoItem);
            					orcCP2RetTotalCustoItem = orcCP2RetTotalCustoItem.toFixed(2)
        						console.log('valCusto2Item'+orcCP2RetTotalCustoItem);
            					//foi colocado essa tratativa, pq existem casos que a quantidade de embalagem não bate com o multiplo
            					//os usuários estã trocando e clicando já em enviar.
            					if(totalCustoCP2Item != orcCP2RetTotalCustoItem){
            						message += getMessage("O cálculo total do produto <b>" +orcCodProdutoItem + " - " + orcDescProdutoItem + "</b> não foi finalizado.", 6, '');
            		                hasErros = true;
            					}
        					}
        				}
        					
    					if(CPqtdOpcaoRecebimento >= 3){
        						
    						var orcQtdCP3RetItem = Number($("#orcQtdCP3RetItem___"+ index).val());	
    						if(orcQtdCP3RetItem > 0){
	    						var orcCodProdutoItem = $("#orcCodProdutoItem___"+ index).val()
	            				var orcDescProdutoItem = $("#orcDescProdutoItem___"+ index).val()
	        					
	            				//calcula o valor de quantidade pelo preço de custo
//	        					var orcQtdCP3RetItem = Number($("#orcQtdCP3RetItem___"+ index).val());	
	        					var valCustoItem = validafunctions.getFloatValue("orcPrecoCustoItem___"+index);
	            				
	        				
	        					
	        					var totalCustoCP3Item = (valCustoItem * orcQtdCP3RetItem);
	        					totalCustoCP3Item = Math.round(totalCustoCP3Item * 100) / 100;
	        					totalCustoCP3Item = totalCustoCP3Item.toFixed(2)
	        					
	        					//Este é o valor que é enviado para o Protheus
	        					var orcCP3RetTotalCustoItem = validafunctions.getFloatValue("orcCP3RetTotalCustoItem___"+index);
	        					console.log('valCusto3Item'+orcCP3RetTotalCustoItem);
	        					orcCP3RetTotalCustoItem = orcCP3RetTotalCustoItem.toFixed(2)
	        					console.log('valCusto3Item'+orcCP3RetTotalCustoItem);
	        					
	        					//foi colocado essa tratativa, pq existem casos que a quantidade de embalagem não bate com o multiplo
	        					//os usuários estã trocando e clicando já em enviar.
	        					if(totalCustoCP3Item != orcCP3RetTotalCustoItem){
	        						message += getMessage("O cálculo total do produto <b>" +orcCodProdutoItem + " - " + orcDescProdutoItem + "</b> não foi finalizado.", 6, '');
	        		                hasErros = true;
	        					}
    						}
        				}
        				
        				
    				});	
    			}else{
    				$("input[name*=orcCodProdutoItem___]").each(function(index){
        				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
        				
        				var orcCodProdutoItem = $("#orcCodProdutoItem___"+ index).val()
        				var orcDescProdutoItem = $("#orcDescProdutoItem___"+ index).val()
        				
        				//calcula o valor de quantidade pelo preço de custo
    					var qtdItem = Number($("#orcQtdItem___"+ index).val());	
    					var valCustoItem = validafunctions.getFloatValue("orcPrecoCustoItem___"+index);
    					
    					var totalCustoItem = (valCustoItem * qtdItem);
    					totalCustoItem = Math.round(totalCustoItem * 100) / 100;
    					totalCustoItem = totalCustoItem.toFixed(2)
    					
    					//Este é o valor que é enviado para o Protheus
    					var orcTotalCustoItem = validafunctions.getFloatValue("orcTotalCustoItem___"+index);
    					orcTotalCustoItem = orcTotalCustoItem.toFixed(2)
    					
    					//foi colocado essa tratativa, pq existem casos que a quantidade de embalagem não bate com o multiplo
    					//os usuários estã trocando e clicando já em enviar.
    					if(totalCustoItem != orcTotalCustoItem){
    						message += getMessage("O cálculo total do produto <b>" +orcCodProdutoItem + " - " + orcDescProdutoItem + "</b> não foi finalizado.", 6, '');
    		                hasErros = true;
    					}
    					
        			});	
    			}
    			
    		}
    		
		break;
    }
    
    if (hasErros) {
        throw "<ul style='list-style-type: disc; padding-left:90px' class='alert alert-danger'>" + message + "</ul>";
    }
}

function getMessage(texto, tipoMensagem, form, tabpaifilho) {
    switch (tipoMensagem) {
        case 1:
            return "<li>Campo: <b>" + texto + "</b> não pode estar vazio.</li>";
        case 2:
            return '<li>Campo: <b>"' + texto + '"</b> está inválido.\n';    
        case 3:
            return "<li>Selecione uma opção em: <b>" + texto + "</b></li>";
        case 4:
            return "<li>Campo: <b>" + texto + "</b> não pode ser zero.</li>";
        case 5:
            return "<li>A tabela de <b>" + tabpaifilho + "</b> possui um ou mais campos de <b>" + texto + "</b> inválido.</li>";  
        case 6:
       	 	return "<li>"+texto+"</li>";     
    }
}    