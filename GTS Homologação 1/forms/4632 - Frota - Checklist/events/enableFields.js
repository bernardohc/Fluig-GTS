function enableFields(form){ 
	
	var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO){
		
		form.setEnabled("geraisCarimboDataHora", false);
		form.setEnabled("geraisNumFrota", false);
		form.setEnabled("geraisDataAbertura", false);
		form.setEnabled("geraisCondutor", false);
		form.setEnabled("geraisEstaComCNHeVigente", false);
		form.setEnabled("geraisCategoriaCNH", false);
		form.setEnabled("geraisCidade", false);
		form.setEnabled("geraisEstado", false);
		
	}
	
}