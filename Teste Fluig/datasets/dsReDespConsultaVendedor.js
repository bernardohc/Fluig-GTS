function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("CODVEND");
	newDataset.addColumn("NOME");
	newDataset.addColumn("EMAIL");

	try {

		var MATFLUIG = '';

		// Configura Constraints
		for ( var i in constraints) {
			if (constraints[i].getFieldName().toString() == 'MATFLUIG') {
				MATFLUIG = constraints[i].initialValue;
			}
		}
		// Validacação constraint
		var camposValidos = true;
		if (MATFLUIG == '') {
			camposValidos = false;
			newDataset.addRow(new Array('2',
					'Matrícula do usuário não preenchido.'));
		}

		if (!camposValidos) {
			return newDataset;
		}

		// Configura conexão WS
		var properties = {};
		// properties["basic.authorization"] = "true";
		// properties["basic.authorization.username"] = "admin";
		// properties["basic.authorization.password"] = "pass123root!@#";
		properties["disable.chunking"] = "true";
		properties["log.soap.messages"] = "true";
		properties["receive.timeout"] = "300000"; // milissegundos 300000
		// igual a 5 minutos

		var supplierService = ServiceManager.getService('WSORCMAQ');
		var serviceHelper = supplierService.getBean();
		var serviceLocatorWSORCMAQ = serviceHelper
				.instantiate('br.com.protheus.WSORCMAQ');
		var service = serviceLocatorWSORCMAQ.getWSORCMAQSOAP();
		var metodosWSORCMAQ = supplierService.getCustomClient(service,
				"br.com.protheus.WSORCMAQSOAP", properties);

		// Chama método getvendedor
		var result = new Array();
		result = metodosWSORCMAQ.getvendedor(MATFLUIG, '');

		log.info('--Retorno dsReDespConsultaVendedor--');
		log.dir(result);

		// Retorno Chamada Metodo
		var CODRET = result.getWSRETVEND().get(0).getCODRET();
		if (CODRET == '1') {
			var CODVEND = result.getWSRETVEND().get(0).getCOD();
			var NOME = result.getWSRETVEND().get(0).getNOME();
			var EMAIL = result.getWSRETVEND().get(0).getEMAIL();

			newDataset.addRow(new Array('1', 'Sucesso', CODVEND, NOME, EMAIL));

		} else {
			var MSGRET = result.getWSRETVEND().get(0).getMSGRET();
			newDataset.addRow(new Array('2', MSGRET));
		}

	} catch (erro) {
		log.info("Reembolso de Despesa: erro na busca de vendedor: " + erro);
		newDataset.addRow(new Array('2', erro));
	}

	return newDataset;
}
