function validateForm(form){
	
	if(form.getValue("gamename") == null || form.getValue("gamename") == "") {
		throw "Favor informar o nome do jogo.";
	}
	
	if(form.getFormMode() == "ADD") {
		var cardId = form.getCardIndex();
		var constraintDocumentId1 = DatasetFactory.createConstraint("documentPK.documentId", cardId, cardId, ConstraintType.MUST);
		var constraintDocumentId2 = DatasetFactory.createConstraint("activeVersion", "true", "true", ConstraintType.MUST);
		var datasetDocument = DatasetFactory.getDataset("document", ["datasetName"], [constraintDocumentId1,constraintDocumentId2], null);
		
		if(datasetDocument.rowsCount > 0) {
			var datasetName = datasetDocument.getValue(0, "datasetName");
			if(datasetName != null) {
				var registerValue = form.getValue("gamename");
				var constraintForm = DatasetFactory.createConstraint("gamename", registerValue, registerValue, ConstraintType.MUST)
				var datasetForm = DatasetFactory.getDataset(datasetName, null, [constraintForm], null);
				
				if(datasetForm.rowsCount > 0) {
					throw 'Jogo ' + registerValue + ' já foi cadastrado';
				}
			}
		}
	}
	
	
}