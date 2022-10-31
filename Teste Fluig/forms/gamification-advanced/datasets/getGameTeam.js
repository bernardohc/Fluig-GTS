function createDataset(fields, constraints, sortFields) {

	var datasetResult = DatasetBuilder.newDataset();

	datasetResult.addColumn("Result");

	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == "user") {
				user = constraints[i].initialValue;
			}
		}
		if (user == null) {
			datasetResult.addRow(["Gamification error: Missing getGameTeam gamefication query params"]);
			return datasetResult;
		}
	}
	
/*
 * 	Adicione aqui a sua implementação que retornará o time do jogador informado 
 * 
 *  datasetResult.addRow([teamCode]);
 * 
*/
	
	return datasetResult;
}