function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var atv_atual = getValue("WKNumState");
	var WKCompletTask = getValue("WKCompletTask");
    
    if(atv_atual == INICIO_0 || atv_atual == INICIO || atv_atual == SALVAR_RELATORIO || AJUSTA_RELATORIO){
        
        var message = ".\n";
        var hasErros = false;
        var attachments = hAPI.listAttachments();
        
        var indexesTbRelDespesas = hAPI.getChildrenIndexes("tbRelDespesas");
					
        var hasAttachDespesa = false;
        for (var i = 0; i < indexesTbRelDespesas.length; i++) {
            
            hasAttachDespesa = false;
            for(var j = 0; j < attachments.size(); j++ ){
                var docDtoDespesa = attachments.get(j);
                var documentDescription = docDtoDespesa.getDocumentDescription();
               
                if(documentDescription.contains(".") ){
                    //Se tiver extensão no arquivo, remove para validar pelo nome do arquivo
                    //Isso estava ocorrendo no mobile, que insere sempre a extensão.
                    var extensaoDoArquivo = documentDescription.substring(documentDescription.lastIndexOf(46) + 1, documentDescription.length() ).toLowerCase();
                    
                    //Tem caso de o nome do arquivo ter .(ponto), ocasionado uma inconsitencia 
                    //Como aqui script de workflow não tem como saber se é web ou mobile, foi necessário verificar a extensão do arquivo
                    if( extensaoDoArquivo == "pdf" || extensaoDoArquivo == "png" || extensaoDoArquivo == "jpg" || extensaoDoArquivo == "jpeg" ){
                        //Se for a extensão do arquivo, vai cortar a extensão e retornar somente o nome do nome do arquivo
                        documentDescription = documentDescription.substring(0, documentDescription.lastIndexOf(46));
                    }
                }
                if(documentDescription == hAPI.getCardValue("rvDespAnexo___"+indexesTbRelDespesas[i]) ){
                    hasAttachDespesa = true;
                }
            }
            
            if(!hasAttachDespesa){
                hasErros = true;
                message +=  "\n-Não foi localizado o anexo da despesa código " + hAPI.getCardValue("rvDespCodiID___"+indexesTbRelDespesas[i]) + ", favor anexar.";
            }
        }


        if(hasErros){
            throw message + "\n\n";
        }

    }
}