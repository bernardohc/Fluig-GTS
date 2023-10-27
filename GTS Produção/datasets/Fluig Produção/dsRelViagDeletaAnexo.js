function createDataset(fields, constraints, sortFields) {

	try {

		var newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("CODRET");
		newDataset.addColumn("MSGRET");
		newDataset.addColumn("IDFLUIG");
		newDataset.addColumn("IDDOCUMENTO");
		newDataset.addColumn("DELETADO");

		var idFluig = "";
		var fileDescription = "";
		var wkUser = "";
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'idFluig' ) {
				idFluig = parseInt(constraints[i].initialValue);
			}
			if ( constraints[i].getFieldName().toString() == 'fileDescription' ) {
				fileDescription = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'wkUser' ) {
				wkUser = constraints[i].initialValue;
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
		var attachmentsDs = DatasetFactory.getDataset("document",["documentPK.documentId", "documentDescription"],documentConstraints, ["lastModifiedDate"]);

		if (!attachmentsDs.rowsCount) {
			newDataset.addRow(["2", "Sem anexos no processo."]);
			return newDataset;
		}

		var documentId = "";
		for (var i = 0; i < attachmentsDs.rowsCount; ++i) {
			var documentDescription = attachmentsDs.getValue(i, "documentDescription");
            
			if(documentDescription.contains(".") ){
				//Se tiver extensão no arquivo, remove para validar pelo nome do arquivo
				//Isso estava ocorrendo no mobile, que insere sempre a extensão.
				documentDescription = documentDescription.substring(0, documentDescription.lastIndexOf(46));
			}
			
			if( documentDescription == fileDescription){
				documentId = parseInt(attachmentsDs.getValue(i, "documentPK.documentId"));
			}
		}

		if (documentId == "") {
			newDataset.addRow(["2", "Anexo não localizado."]);
			return newDataset;
		}

		//Pesquisa o workflowProcess para pegar o processId e version
		var cstWP1 = DatasetFactory.createConstraint("workflowProcessPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
        var cstWP2 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", idFluig, idFluig, ConstraintType.MUST);
        var cstWP = new Array(cstWP1, cstWP2);
        var dsWorkflowProcess = DatasetFactory.getDataset("workflowProcess", null, cstWP, null);
		var processId = dsWorkflowProcess.getValue(0, "processId");
		var version = dsWorkflowProcess.getValue(0, "version");

		//Pesquisa o processTask para pegar o currentMovto pelo movementSequence
		var cstPT1 = DatasetFactory.createConstraint("processTaskPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
        var cstPT2 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", idFluig, idFluig, ConstraintType.MUST);
        var cstPT3 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
        var cstPT = new Array(cstPT1, cstPT2, cstPT3);
        var dsProcessTask = DatasetFactory.getDataset("processTask", null, cstPT, null);
		var currentMovto = dsProcessTask.getValue(0, "processTaskPK.movementSequence");

		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
			companyId: getValue('WKCompany') + '',
			serviceCode: 'ServidorFluigGTS',
			endpoint: '/ecm/api/rest/ecm/workflowView/deleteAttachments',
			method: 'post',
			params: {
				processId: processId,
				version: version,
				managerMode: false,
				taskUserId: wkUser,
				processInstanceId: idFluig,
				isDigitalSigned: false,
				selectedState: '',
				attachments: [{ documentId: documentId, deleted: true  }],
				currentMovto: currentMovto
			},
			timeoutService: '100',
			headers: {
				"Content-Type": "application/json"
			}
        }

		var vo = clientService.invoke(JSONUtil.toJSON(data));
		
        if(vo.getResult()== null || vo.getResult().isEmpty()){
			log.info("Não foi possível remover o anexo.")
			log.dir( vo )
        	newDataset.addRow(new Array('2', "Não foi possível remover o anexo, retorno da API vazio."));
        }else{
            
			if(vo.getHttpStatusResult() != 200 ){
				var result = vo.getResult();
				log.info("Não foi possível remover o anexo.")
				log.info(result)
				var message = result.substring(result.indexOf("message")+21, result.indexOf("detail")-3);
				newDataset.addRow(new Array('2', "Não foi possível remover o anexo: " + message));
			}else{	

				var result = JSON.parse(vo.getResult());

				if(result.code != undefined){
					var message = result.code + " - " +result.message;
					newDataset.addRow(new Array('2', message));
				}else{
					newDataset.addRow(new Array("1", "Sucesso", idFluig, documentId, result.content[0].deleted))
				}
			}
        }

	}catch (exception) {

		log.info("Erro no dataset dsRelViagDeletaAnexo: " + exception);
		newDataset.addRow(new Array('2', exception));
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