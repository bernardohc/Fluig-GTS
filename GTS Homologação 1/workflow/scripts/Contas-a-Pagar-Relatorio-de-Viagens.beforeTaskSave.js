function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var atv_atual = getValue("WKNumState");
	var WKCompletTask = getValue("WKCompletTask");
    
    if(atv_atual == INICIO_0 || atv_atual == INICIO || atv_atual == SALVAR_RELATORIO){
        
        var message = ".\n";
        var hasErros = false;
        var attachments = hAPI.listAttachments();
        
        var indexesTbRelDespesas = hAPI.getChildrenIndexes("tbRelDespesas");
					
        var hasAttachDespesa = false;
        for (var i = 0; i < indexesTbRelDespesas.length; i++) {
            
            hasAttachDespesa = false;
            for(var j = 0; j < attachments.size(); j++ ){
                var docDtoDespesa = attachments.get(j);
                
                if(docDtoDespesa.getDocumentDescription() == hAPI.getCardValue("rvDespAnexo___"+indexesTbRelDespesas[i]) ){
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