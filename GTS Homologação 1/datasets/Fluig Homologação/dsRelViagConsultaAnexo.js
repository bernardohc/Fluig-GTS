function createDataset(fields, constraints, sortFields) {
	
    var newDataset = DatasetBuilder.newDataset();
    newDataset.addColumn("CODRET");
    newDataset.addColumn("MSGRET");
    newDataset.addColumn("idFluig");
    newDataset.addColumn("documentId");
    newDataset.addColumn("documentVersion");
    newDataset.addColumn("fileName");
    newDataset.addColumn("downloadUrl");
    newDataset.addColumn("extension");
	
	try{
		var idFluig = "";
		var fileDescription = "";

		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'idFluig' ) {
				idFluig = parseInt(constraints[i].initialValue);
			}
			if ( constraints[i].getFieldName().toString() == 'fileDescription' ) {
				fileDescription = constraints[i].initialValue;
			}
		}

		//Busca os Ids dos documentos em anexo, pelo dataset processAttachment
		var attachmentDocumentIds = getDocumentsIdFromProcess(idFluig);

		if (!attachmentDocumentIds.length) {
			newDataset.addRow(["2", "Sem anexos no processo."]);
			return newDataset;
		}

		var documentConstraints = [
			DatasetFactory.createConstraint("phisicalFile", "", "", ConstraintType.MUST_NOT),
			DatasetFactory.createConstraint("userSecurityId", "admin", "admin", ConstraintType.MUST)
		];

		for (i = 0; i < attachmentDocumentIds.length; ++i) {
			documentConstraints.push(DatasetFactory.createConstraint("documentPK.documentId", attachmentDocumentIds[i], attachmentDocumentIds[i], ConstraintType.SHOULD));
		}

		//Busca os dados dos documentos em anexo
		var attachmentsDs = DatasetFactory.getDataset("document", ["documentPK.documentId","documentPK.version", "documentDescription", "phisicalFile"], documentConstraints, ["lastModifiedDate"]);

		if (!attachmentsDs.rowsCount) {
			newDataset.addRow(["2", "Sem anexos no processo."]);
			return newDataset;
		}

		
		var documentId = 0;
		var version = "";
		var documentDescription = "";
		var extension = "";
		var localizouAnexo = false;

		for (var i = 0; i < attachmentsDs.rowsCount; ++i) {
			
			documentDescription = attachmentsDs.getValue(i, "documentDescription");
            
			if(documentDescription.contains(".") ){
				//Se tiver extensão no arquivo, remove para validar pelo nome do arquivo
				//Isso estava ocorrendo no mobile, que insere sempre a extensão.
				documentDescription = documentDescription.substring(0, documentDescription.lastIndexOf(46));
			}
			
			if( documentDescription == fileDescription){
				localizouAnexo = true;
				documentId = parseInt(attachmentsDs.getValue(i, "documentPK.documentId"));
				version = attachmentsDs.getValue(i, "documentPK.version");

				var phisicalFile = attachmentsDs.getValue(i, "phisicalFile");
				if(phisicalFile.contains(".") ){
					extension = phisicalFile.substring(phisicalFile.lastIndexOf(46)+1, phisicalFile.length());
				}
			}
		}

		if(localizouAnexo){
			//AddRow fora do para caso tenha 2 arquivos com o mesmo nome, mostra o ultimo
			var documentService = fluigAPI.getDocumentService();
			newDataset.addRow([
				"1",
				"OK",
				idFluig,
				documentId,
				version,
				documentDescription,
				documentService.getDownloadURL(documentId),
				extension,
			]);
		}else{
			newDataset.addRow(["2", "Anexo não localizado."]);
		}

	}catch(erro){    
		log.info("Erro no dataset dsRelViagConsultaAnexo: " + erro);
		newDataset.addRow(new Array('2', erro));
	}
    return newDataset;
	
	
}


/**
 * Pega os IDs dos documentos que são anexos do processo
 *
 * @param {number} processId
 * @returns {number[]}
 */
 function getDocumentsIdFromProcess(idFluig) {
    var ids = [];

    var processAttachmentsDs = DatasetFactory.getDataset(
        "processAttachment",
        ["documentId"],
        [
            DatasetFactory.createConstraint(
                "processAttachmentPK.processInstanceId",
                idFluig,
                idFluig,
                ConstraintType.MUST
            ),
            DatasetFactory.createConstraint(
                "originalThreadSequence",
                0,
                0,
                ConstraintType.MUST
            )
        ],
        null
    );

    for (var i = 0; i < processAttachmentsDs.rowsCount; ++i) {
        ids.push(parseInt(processAttachmentsDs.getValue(i, "documentId")));
    }

    return ids;
}