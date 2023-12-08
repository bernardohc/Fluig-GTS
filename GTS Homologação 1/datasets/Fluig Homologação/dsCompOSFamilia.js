function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("familiaCod");
	newDataset.addColumn("familiaDesc");
	newDataset.addColumn("familiaCodFalha");
	newDataset.addColumn("modeloDesc");
	newDataset.addColumn("modeloCodFalha");
	
	var tipoFiltro  = 'modelos';
	var codFamilia  = 'FPN - FPL';
	
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'tipoFiltro' ) {
			tipoFiltro = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'codFamilia' ) {
			codFamilia = constraints[i].initialValue;
		}
	}
	
	var dados = getDadosSubconjuntoEquipamento()
//	log.info('subconjuntoEquipamento');
//	log.dir(dados);
	
	for(i=0; i < dados.length; i++){
		
		if(tipoFiltro == 'familia'){
			newDataset.addRow(new Array('1', 'Retorno OK', dados[i]['codFamilia'], dados[i]['descFamilia'], dados[i]['codFalhaFamilia']));
		}else if(tipoFiltro == 'modelos'){
			if(codFamilia == dados[i]['codFamilia']){
				log.info('--descFamilia-->'+dados[i]['descFamilia']);
				for(j=0; j < dados[i]['modelos'].length; j++){
					log.info('--modelos-->'+dados[i]['modelos'][j]['modeloDesc']);
					newDataset.addRow(new Array('1', 'Retorno OK', dados[i]['codFamilia'], dados[i]['descFamilia'], dados[i]['codFalhaFamilia'], dados[i]['modelos'][j]['modeloDesc'], dados[i]['modelos'][j]['modeloCodFalha']));
				}
			}
		}
		
		
	}
	
	
	return newDataset;
}

function getDadosSubconjuntoEquipamento(){
	
	var subconjuntoEquipamento = [{
									codFamilia: 'FPC',
									descFamilia: 'PLATAFORMA FLEXER',
									codFalhaFamilia: '100',
									modelos : [{
												modeloDesc : 'XP',
												modeloCodFalha : '101',
											},{
												modeloDesc : 'XS',
												modeloCodFalha : '102',
											},{
												modeloDesc : 'SEEDING',
												modeloCodFalha : '103',
											}]
								  },{
									codFamilia:'FPM',
									descFamilia: 'PLATAFORMA DE MILHO',
									codFalhaFamilia: '200',
									modelos : [{
												modeloDesc : 'PRODUTIVA',
												modeloCodFalha : '201',
											},{
												modeloDesc : 'PRODUTIVA BLACK',
												modeloCodFalha : '202',
											},{
												modeloDesc : 'X 10',
												modeloCodFalha : '203',
											},{
												modeloDesc : 'VELLOX',
												modeloCodFalha : '204',
											},{
												modeloDesc : 'ALLUX',
												modeloCodFalha : '205',
											},{
												modeloDesc : 'GREENSYSTEM',
												modeloCodFalha : '206',
											},{
												modeloDesc : 'FOLDING PRO',
												modeloCodFalha : '207',
											},{
												modeloDesc : 'TOP LINE',
												modeloCodFalha : '208',
											}]
								  },{
									codFamilia: 'FCG',
									descFamilia: 'CARRETAS GRANELEIRAS',
									codFalhaFamilia: '300',
									modelos : [{
												modeloDesc : 'UP GRAIN 19000',
												modeloCodFalha : '301',
											},{
												modeloDesc : 'UP GRAIN 25000',
												modeloCodFalha : '302',
											},{
												modeloDesc : 'UP GRAIN 19000 MULT.',
												modeloCodFalha : '303',
											},{
												modeloDesc : 'UP GRAIN 25000 MULT.',
												modeloCodFalha : '304',
											},{
												modeloDesc : 'GRAIN BLACK',
												modeloCodFalha : '305',
											},{
												modeloDesc : 'WAGGON 36000',
												modeloCodFalha : '306',
											}]
								},{
									codFamilia: 'FDC',
									descFamilia: 'TERRUS',
									codFalhaFamilia: '400',
									modelos : [{
												modeloDesc : 'DXS',
												modeloCodFalha : '401',
											},{
												modeloDesc : 'DSR',
												modeloCodFalha : '402',
											},{
												modeloDesc : 'DUO',
												modeloCodFalha : '403',
											},{
												modeloDesc : 'COTTON',
												modeloCodFalha : '404',
											},{
												modeloDesc : 'CANAVIEIRO',
												modeloCodFalha : '405',
											},{
												modeloDesc : 'SEEDIND',
												modeloCodFalha : '406',
											}]
										},{
									codFamilia: 'FCS',
									descFamilia: 'TERRUS FERTTI',
									codFalhaFamilia: '500',
									modelos : [{
												modeloDesc : 'F1',
												modeloCodFalha : '501',
											},{
												modeloDesc : 'F2',
												modeloCodFalha : '502',
											},{
												modeloDesc : 'F2',
												modeloCodFalha : '503',
											}]
									},{
									codFamilia: 'FNT',
									descFamilia: 'TILLER',
									codFalhaFamilia: '600',
									modelos : [{
												modeloDesc : 'G1',
												modeloCodFalha : '601',
											},{
												modeloDesc : 'BRAVOS G2',
												modeloCodFalha : '602',
											}]
									},{
									codFamilia: 'FSM',
									descFamilia: 'SEMEADORA EXATTUS',
									codFalhaFamilia: '700',
									modelos : [{
												modeloDesc : 'G2',
												modeloCodFalha : '701',
											}]
									},{
									codFamilia: 'FPN - FPL',
									descFamilia: 'PLANNER',
									codFalhaFamilia: '800',
									modelos : [{
												modeloDesc : 'PL 310 HD',
												modeloCodFalha : '801',
											},{
												modeloDesc : 'PN 510 CT',
												modeloCodFalha : '802',
											},{
												modeloDesc : 'PN 710 CT',
												modeloCodFalha : '803',
											},{
												modeloDesc : 'PN 710 CN',
												modeloCodFalha : '804',
											}]
									}];
			
	
	return subconjuntoEquipamento;
}
