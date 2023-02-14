function intermediateconditional2() {

	var valorDesejado = hAPI.getCardValue("valorDesejado");
	
	var dataset = DatasetFactory.getDataset("dsValorDolar", null, null, null);
	var valorAtual = dataset.getValue(0, "valor");
	
	if (valorAtual <= valorDesejado) {
		return true;
	}
}