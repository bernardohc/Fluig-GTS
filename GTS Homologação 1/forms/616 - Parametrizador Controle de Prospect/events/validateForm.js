function validateForm(form){
	
	var WKNumState = getValue('WKNumState');
	
	var message = "";
    var hasErros = false;
	
	var indexes = form.getChildrenIndexes("table_familia_tipo_produto");
   
	for (var i = 0; i < indexes.length; i++) {	
		
		if ( isEmpty("familia___"+indexes[i], form) &&  isEmpty("tipoProduto___"+indexes[i], form) ) {
			message += getMessage("É preciso preencher uma <b>Família</b> ou <b>Tipo de Produto</b> na linha " + indexes[i], 6, form);
			hasErros = true;
		}   
		if ( isEmpty("familiaTipoProduto___"+indexes[i], form)  ) {
			message += getMessage("É preciso preencher uma <b>Família/Tipo de Produto</b> na linha " + indexes[i], 6, form);
			hasErros = true;
		}
    }
    
       
        	
	if (hasErros) {
        if (isMobile(form)) throw message;
        throw "<ul style='list-style-type: disc; padding-left:90px' class='alert alert-danger'>" + message + "</ul>";
    }
}
    
    
function getMessage(texto, tipoMensagem, form, tabpaifilho) {
    if (isMobile(form)) {
        switch (tipoMensagem) {
            case 1:
                return 'Campo "' + texto + '" não pode estar vazio.\n';
            case 2:
                return 'Campo "' + texto + '" está inválido.\n';    
            case 3:
                return 'Selecione uma opção em "' + texto + '".\n';
            case 4:
                return 'Campo "' + texto + '" não pode ser zero.\n'; 
            case 5:
            	 return 'A tabela de  "' + tabpaifilho + '" possui um ou mais campos de "' + texto + '" inválido.\n'; 
            case 6:
           	 	return texto; 
        }
    } else {
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
}    