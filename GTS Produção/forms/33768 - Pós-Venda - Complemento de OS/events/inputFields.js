function inputFields(form){
	
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	  
	if (form.getValue('atdDataAtendimento').match(regEx)) {
        var split = form.getValue('atdDataAtendimento').split('-');
        form.setValue('atdDataAtendimento', split[2] + '/' + split[1] + '/' + split[0]);
	}
	
	
	var indexAtdTbAtendimentos = form.getChildrenIndexes("atdTbAtendimentos");
	if(indexAtdTbAtendimentos.length > 0){
	    for (var i = 0; i < indexAtdTbAtendimentos.length; i++) { 
	    	if (form.getValue('atdDataAtendimentoItem___'+ indexAtdTbAtendimentos[i]).match(regEx)) {
	            var split = form.getValue('atdDataAtendimentoItem___'+ indexAtdTbAtendimentos[i]).split('-');
	            form.setValue('atdDataAtendimentoItem___'+ indexAtdTbAtendimentos[i], split[2] + '/' + split[1] + '/' + split[0]);
	    	}
	    }
	}	
	
	
}