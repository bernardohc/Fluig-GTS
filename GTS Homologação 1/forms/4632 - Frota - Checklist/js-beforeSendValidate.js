var beforeSendValidate = function(numState,nextState){
	removeClassError();
	validaCampos(parseInt(numState), nextState);
}

/*****************************************************************************************************************/
function validaCampos(numState, nextState){
	let message = "";
	let hasErros = false;
	
	if(isEmpty('geraisCarimboDataHora')){
		message += getMessage("Carimbo de Data/Hora", 1);
		hasErros = true;
		$('#geraisCarimboDataHora').closest(".form-group").addClass("has-error");
	}
	if(isEmpty('geraisNumFrota')){
		message += getMessage("Nº Frota", 1);
		hasErros = true;
		$('#geraisNumFrota').closest(".form-group").addClass("has-error");
	}
	if(isEmpty('geraisCondutor')){
		message += getMessage("Condutor", 1);
		hasErros = true;
		$('#geraisCondutor').closest(".form-group").addClass("has-error");
	}
	if(isEmpty('geraisEstaComCNHeVigente')){
		message += getMessage("Você está com a sua CNH e em Vigência?", 1);
		hasErros = true;
		$('#geraisEstaComCNHeVigente').closest(".form-group").addClass("has-error");
	}
	if(isEmpty('geraisCategoriaCNH')){
		message += getMessage("Categoria da sua CNH", 1);
		hasErros = true;
		$('#geraisCategoriaCNH').closest(".form-group").addClass("has-error");
	}
	if(isEmpty('geraisCidade')){
		message += getMessage("Cidade", 1);
		hasErros = true;
		$('#geraisCidade').closest(".form-group").addClass("has-error");
	}
	if(isEmpty('geraisEstado')){
		message += getMessage("Estado", 1);
		hasErros = true;
		$('#geraisEstado').closest(".form-group").addClass("has-error");
	}
	
	
	if(nextState > 0){
		/*
		 * VEÍCULO
		 */
		if (isEmpty("veiVeiculo")) {
	    	message += getMessage("Veículo", 1);
	    	hasErros = true;
	    	$('#veiVeiculo').closest(".form-group").addClass("has-error");
	    }
		if (isEmpty("veiKmAtual")) {
			message += getMessage("Km Atual", 1);
			hasErros = true;
			$('#veiKmAtual').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("veiEstaAbastecido")) {
			message += getMessage("O Veículo está Abastecido?", 1);
			hasErros = true;
			$('#veiEstaAbastecido').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("veiPossuiSemiReboque")) {
			message += getMessage("Possui Semi Reboque?", 1);
			hasErros = true;
			$('#veiPossuiSemiReboque').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("veiNumFrotaSemiReboqueAtrelado")) {
			message += getMessage("Nº Frota Semi Reboque Atrelado", 1);
			hasErros = true;
			$('#veiNumFrotaSemiReboqueAtrelado').closest(".form-group").addClass("has-error");
		}
		
		/*
		 * PNEUS
		 */
		if (isEmpty("pneuPneuDiantCavBomEstado")) {
			message += getMessage("Pneus Dianteira Cavalo em bom estado?", 1);
			hasErros = true;
			$('#pneuPneuDiantCavBomEstado').closest(".form-group").addClass("has-error");
		}else if( $("#pneuPneuDiantCavBomEstado").val() == 'Outro' && isEmpty("pneuPneuDiantCavBomEstadoOut")  ){
			message += getMessage("Pneus Dianteira Cavalo em bom estado?", 9);
			hasErros = true;
			$('#pneuPneuDiantCavBomEstadoOut').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("pneuPneuTracaoCavBomEstado")) {
			message += getMessage("Pneus Tração Cavalo em bom estado?", 1);
			hasErros = true;
			$('#pneuPneuTracaoCavBomEstado').closest(".form-group").addClass("has-error");
		}else if($("#pneuPneuTracaoCavBomEstado").val() == 'Outro' && isEmpty("pneuPneuTracaoCavBomEstadoOut")  ){
			message += getMessage("Pneus Tração Cavalo em bom estado?", 9);
			hasErros = true;
			$('#pneuPneuTracaoCavBomEstadoOut').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("pneuPneuTruckCavBomEstado")) {
			message += getMessage("Pneus Truck Cavalo em bom estado?", 1);
			hasErros = true;
			$('#pneuPneuTruckCavBomEstado').closest(".form-group").addClass("has-error");
		}else if($("#pneuPneuTruckCavBomEstado").val() == 'Outro' && isEmpty("pneuPneuTruckCavBomEstadoOut")  ){
			message += getMessage("Pneus Truck Cavalo em bom estado?", 9);
			hasErros = true;
			$('#pneuPneuTruckCavBomEstadoOut').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("pneuPneuSemiReb1Eixo")) {
			message += getMessage("Pneus Semi Reboque - 1º Eixo?", 1);
			hasErros = true;
			$('#pneuPneuSemiReb1Eixo').closest(".form-group").addClass("has-error");
		}else if($("#pneuPneuSemiReb1Eixo").val() == 'Outro' && isEmpty("pneuPneuSemiReb1EixoOut")  ){
			message += getMessage("Pneus Semi Reboque - 1º Eixo?", 9);
			hasErros = true;
			$('#pneuPneuSemiReb1EixoOut').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("pneuPneuSemiReb2Eixo")) {
			message += getMessage("Pneus Semi Reboque - 2º Eixo?", 1);
			hasErros = true;
			$('#pneuPneuSemiReb2Eixo').closest(".form-group").addClass("has-error");
		}else if($("#pneuPneuSemiReb2Eixo").val() == 'Outro' && isEmpty("pneuPneuSemiReb2EixoOut")  ){
			message += getMessage("Pneus Semi Reboque - 2º Eixo?", 9);
			hasErros = true;
			$('#pneuPneuSemiReb2EixoOut').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("pneuPneuSemiReb3Eixo")) {
			message += getMessage("Pneus Semi Reboque - 3º Eixo?", 1);
			hasErros = true;
			$('#pneuPneuSemiReb3Eixo').closest(".form-group").addClass("has-error");
		}else if($("#pneuPneuSemiReb3Eixo").val() == 'Outro' && isEmpty("pneuPneuSemiReb3EixoOut")  ){
			message += getMessage("Pneus Semi Reboque - 3º Eixo?", 9);
			hasErros = true;
			$('#pneuPneuSemiReb3EixoOut').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("pneuPneuSterpBomEstado")) {
			message += getMessage("Pneus Sterp em bom estado?", 1);
			hasErros = true;
			$('#pneuPneuSterpBomEstado').closest(".form-group").addClass("has-error");
		}else if($("#pneuPneuSterpBomEstado").val() == 'Outro' && isEmpty("pneuPneuSterpBomEstadoOut")  ){
			message += getMessage("Pneus Sterp em bom estado?", 9);
			hasErros = true;
			$('#pneuPneuSterpBomEstadoOut').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("pneuRodaCavSemiRebBomEstado")) {
			message += getMessage("Rodas do Cavalo e Semi Reboque em bom estado?", 1);
			hasErros = true;
			$('#pneuRodaCavSemiRebBomEstado').closest(".form-group").addClass("has-error");
		}else if($("#pneuRodaCavSemiRebBomEstado").val() == 'Outro' && isEmpty("pneuRodaCavSemiRebBomEstadoOut")  ){
			message += getMessage("Rodas do Cavalo e Semi Reboque em bom estado?", 9);
			hasErros = true;
			$('#pneuRodaCavSemiRebBomEstadoOut').closest(".form-group").addClass("has-error");
		}
		
		/*
		 * ÓLEOS
		 */
		if (isEmpty("oleoHidNvlCorreto")) {
			message += getMessage("Óleo Hidráulico no nível correto?", 1);
			hasErros = true;
			$('#oleoHidNvlCorreto').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("oleoFluidoFreioNvlCorreto")) {
			message += getMessage("Óleo Fluido de Freio no nível correto?", 1);
			hasErros = true;
			$('#oleoFluidoFreioNvlCorreto').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("oleoMotorValidadeeNvlCorreto")) {
			message += getMessage("Óleo de Motor na Validade e nível correto?", 1);
			hasErros = true;
			$('#oleoMotorValidadeeNvlCorreto').closest(".form-group").addClass("has-error");
		}
		
		/*
		 * MOTOR
		 */
		if (isEmpty("motorCorreiasBomEstado")) {
			message += getMessage("Correias em bom estado?", 1);
			hasErros = true;
			$('#motorCorreiasBomEstado').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("motorRadiadorArrefNivel")) {
			message += getMessage("Água do Radiador ou Líquido de Arrefecimento no nível?", 1);
			hasErros = true;
			$('#motorRadiadorArrefNivel').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("motorBateriasFuncionando")) {
			message += getMessage("Baterias funcionando?", 1);
			hasErros = true;
			$('#motorBateriasFuncionando').closest(".form-group").addClass("has-error");
		}
		
		/*
		 * EXTERNO
		 */
		if (isEmpty("extLanternasLentesOK")) {
			message += getMessage("Lanternas e Lentes ok?", 1);
			hasErros = true;
			$('#extLanternasLentesOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extEscapamentoOK")) {
			message += getMessage("Escapamento ok?", 1);
			hasErros = true;
			$('#extEscapamentoOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extTampaCombustivelOK")) {
			message += getMessage("Tampas de Combustível estão ok?", 1);
			hasErros = true;
			$('#extTampaCombustivelOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extCarroTampAssoalhoBomEstado")) {
			message += getMessage("Carroceria, tampas e assoalho em bom estado?", 1);
			hasErros = true;
			$('#extCarroTampAssoalhoBomEstado').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extLatariaPinturaBomEstado")) {
			message += getMessage("Lataria e Pintura em bom estado?", 1);
			hasErros = true;
			$('#extLatariaPinturaBomEstado').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extSistemaArlaOK")) {
			message += getMessage("Sistema de Arla esta funcionando ok?", 1);
			hasErros = true;
			$('#extSistemaArlaOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extTravaSegQuintaRodaFunc")) {
			message += getMessage("Trava de Segurança da quinta roda esta funcionando corretamente?", 1);
			hasErros = true;
			$('#extTravaSegQuintaRodaFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extTomEletMangConexArFunc")) {
			message += getMessage("Tomada elétrica, mangueiras e conexões de ar estão funcionando corretamente?", 1);
			hasErros = true;
			$('#extTomEletMangConexArFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extPesSemiReboqueFunc")) {
			message += getMessage("Os pés do Semi reboque estão baixando e levantando corretamente?", 1);
			hasErros = true;
			$('#extPesSemiReboqueFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extTravaPortaFechaduraFunc")) {
			message += getMessage("Travas das Portas e Fechaduras estão funcionando corretamente?", 1);
			hasErros = true;
			$('#extTravaPortaFechaduraFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extProtecoesParalamaOK")) {
			message += getMessage("Proteções, Paralamas, para barros e badanas estão ok?", 1);
			hasErros = true;
			$('#extProtecoesParalamaOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extFreioCavESemiReboqueFunc")) {
			message += getMessage("Freios do cavalo e semi reboque estão funcionando corretamente?", 1);
			hasErros = true;
			$('#extFreioCavESemiReboqueFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extRuidoAnormal")) {
			message += getMessage("Possui algum nível de ruído ou barulho anormal?", 1);
			hasErros = true;
			$('#extRuidoAnormal').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extTrianguloSinalOK")) {
			message += getMessage("Possui triangulo de sinalização?", 1);
			hasErros = true;
			$('#extTrianguloSinalOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extMacadoChaveRodaOK")) {
			message += getMessage("Veículo possui Macaco e chave de rodas?", 1);
			hasErros = true;
			$('#extMacadoChaveRodaOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extSuspEixoTruckFunc")) {
			message += getMessage("Suspensor de eixo do truck esta funcionando bem?", 1);
			hasErros = true;
			$('#extSuspEixoTruckFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extBasculandoOK")) {
			message += getMessage("Veiculo esta basculando e possui alavanca para bascular?", 1);
			hasErros = true;
			$('#extBasculandoOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extSemiRebPinoReiOK")) {
			message += getMessage("Semi Reboque esta com o Pino Rei em boas condições?", 1);
			hasErros = true;
			$('#extSemiRebPinoReiOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extTravaSegQuintaRodaOK")) {
			message += getMessage("Trava de Segurança da Quinta Roda esta esta em boas condições?", 1);
			hasErros = true;
			$('#extTravaSegQuintaRodaOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extTanqueCombOK")) {
			message += getMessage("Tanques de Combustível estão em boas condições e sem vazamentos?", 1);
			hasErros = true;
			$('#extTanqueCombOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extManivelaPeSemiRebFunc")) {
			message += getMessage("Manivela e Pés do Semi Reboque estão funcionando corretamente?", 1);
			hasErros = true;
			$('#extManivelaPeSemiRebFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("extIdentDifVist")) {
			message += getMessage("Identificou algo diferente durante a vistoria externa ao redor do veículo?", 1);
			hasErros = true;
			$('#extIdentDifVist').closest(".form-group").addClass("has-error");
		}
		
		
		/*
		 * INTERNO
		 */
		if (isEmpty("intCintoSegurancaOK")) {
			message += getMessage("Cinto de Segurança Perfeito e funcionando?", 1);
			hasErros = true;
			$('#intCintoSegurancaOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intFreioEstacionamentoFunc")) {
			message += getMessage("Freio de Estacionamento funcionando?", 1);
			hasErros = true;
			$('#intFreioEstacionamentoFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intDirecaoBomEstado")) {
			message += getMessage("Direção em bom estado e sem Folgas?", 1);
			hasErros = true;
			$('#intDirecaoBomEstado').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intLimpadorParabrisaFunc")) {
			message += getMessage("Limpador de Para-brisa Funcionando Bem e com Água?", 1);
			hasErros = true;
			$('#intLimpadorParabrisaFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intInstrumPainelFunc")) {
			message += getMessage("Instrumentos do Painel funcionando bem?", 1);
			hasErros = true;
			$('#intInstrumPainelFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intRetrovisorAjust")) {
			message += getMessage("Retrovisores Ajustados e funcionando bem?", 1);
			hasErros = true;
			$('#intRetrovisorAjust').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intBuzinaFunc")) {
			message += getMessage("Buzina funcionando bem?", 1);
			hasErros = true;
			$('#intBuzinaFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intFaroisLampFunc")) {
			message += getMessage("Faróis e Lâmpadas funcionando bem?", 1);
			hasErros = true;
			$('#intFaroisLampFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intSetaPiscaFunc")) {
			message += getMessage("Setas e Piscas funcionando bem?", 1);
			hasErros = true;
			$('#intSetaPiscaFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intAlertaFunc")) {
			message += getMessage("Alerta funcionando bem?", 1);
			hasErros = true;
			$('#intAlertaFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intLuzReFunc")) {
			message += getMessage("Luz de Ré e Alarme funcionando bem?", 1);
			hasErros = true;
			$('#intLuzReFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intLuzFreioFunc")) {
			message += getMessage("Luz de Freio funcionando bem?", 1);
			hasErros = true;
			$('#intLuzFreioFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intExtintorDentroValidade")) {
			message += getMessage("Possui Extintor dentro da validade?", 1);
			hasErros = true;
			$('#intExtintorDentroValidade').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intVidroParabrisaOK")) {
			message += getMessage("Vidros e Para-brisa estão ok?", 1);
			hasErros = true;
			$('#intVidroParabrisaOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intCortBancoEstofOK")) {
			message += getMessage("Cortinas, Bancos e Estofamento em bom estado?", 1);
			hasErros = true;
			$('#intCortBancoEstofOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intChaveGeralOK")) {
			message += getMessage("Possui Chave Geral de Segurança e em bom estado?", 1);
			hasErros = true;
			$('#intChaveGeralOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intRadioPXFunc")) {
			message += getMessage("Rádio PX esta funcionando corretamente?", 1);
			hasErros = true;
			$('#intRadioPXFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intClimatizadorFunc")) {
			message += getMessage("Climatizador esta funcionando corretamente?", 1);
			hasErros = true;
			$('#intClimatizadorFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intArCondicionadoFunc")) {
			message += getMessage("Ar Condicionado esta funcionando corretamente?", 1);
			hasErros = true;
			$('#intArCondicionadoFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intArCavSemiRebVazamento")) {
			message += getMessage("Sistemas de Ar Cavalo x Semi Reboque possui algum vazamento?", 1);
			hasErros = true;
			$('#intArCavSemiRebVazamento').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intFreioMotorFunc")) {
			message += getMessage("Freio Motor esta funcionando corretamente?", 1);
			hasErros = true;
			$('#intFreioMotorFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intSomRadioFMFunc")) {
			message += getMessage("Som e rádio FM estão funcionando corretamente?", 1);
			hasErros = true;
			$('#intSomRadioFMFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intEsguichoFunc")) {
			message += getMessage("Esguicho esta injetando água?", 1);
			hasErros = true;
			$('#intEsguichoFunc').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intPalhetaOK")) {
			message += getMessage("Palhetas estão em boas condições?", 1);
			hasErros = true;
			$('#intPalhetaOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intTacografoOK")) {
			message += getMessage("Tacógrafos esta funcionando e foi trocado nos últimos 7 dias?", 1);
			hasErros = true;
			$('#intTacografoOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("intTAGPedagioFuncCorreto")) {
			message += getMessage("O Veículo está com a TAG do Sem Parar Funcionando Corretamente?", 1);
			hasErros = true;
			$('#intTAGPedagioFuncCorreto').closest(".form-group").addClass("has-error");
		}
		
		/*
		 * DOCUMENTAÇÃO
		 */
		if (isEmpty("docCertifTacografoOK")) {
			message += getMessage("Certificado do Tacógrafo esta junto com os documentos e em vigência?", 1);
			hasErros = true;
			$('#docCertifTacografoOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("docCavSemiRebOK")) {
			message += getMessage("Documentos do Cavalo e Semi reboque estão no veiculo e em vigência?", 1);
			hasErros = true;
			$('#docCavSemiRebOK').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("docCartaoSeguro")) {
			message += getMessage("O Veículo está com o Cartão Seguro, com o Nº 0800 para Chamar Socorro?", 1);
			hasErros = true;
			$('#docCartaoSeguro').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("docCartaoAbastecimento")) {
			message += getMessage("O Veículo está com o Cartão de Abastecimento RF?", 1);
			hasErros = true;
			$('#docCartaoAbastecimento').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("docAETemVigencia")) {
			message += getMessage("O Veículo está com todos os AETs e em Vigência?", 1);
			hasErros = true;
			$('#docAETemVigencia').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("docSinalExcessoCorreto")) {
			message += getMessage("O Veículo está com a Tampa Traseira Sinalizando Excesso Corretamento e Legível?", 1);
			hasErros = true;
			$('#docSinalExcessoCorreto').closest(".form-group").addClass("has-error");
		}
		if (isEmpty("docEtiqTrocaOleo")) {
			message += getMessage("O Veículo possui Manual e Etiqueta indicando a próxima Revisão de Troca de Óleo e Filtros?", 1);
			hasErros = true;
			$('#docEtiqTrocaOleo').closest(".form-group").addClass("has-error");
		}
		
	}
	
	if (hasErros) {
        if (isMobile == 'true') throw message;
        throw "<ul style='list-style-type: disc; padding-left:90px' class='alert alert-danger'>" + message + "</ul>";
    }
}

function getMessage(texto, tipoMensagem) {
    if ( isMobile == 'true' ) {
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
//            	 return 'A tabela de  "' + tabpaifilho + '" possui um ou mais campos de "' + texto + '" inválido.\n'; 
            case 6:
           	 	return texto; 
            case 7:
           	 	return "Campo: "+texto+" precisa estar marcado.";
            case 8:
            	return "É preciso anexar um documento de "+texto+".";
            case 9:
            	return "Descrição 'Outro' da resposta '" + texto + "' não pode estar vazio.";  
        }
    } else {
        switch (tipoMensagem) {
            case 1:
                return "<li>Campo: <b>" + texto + "</b> não pode estar vazio.</li>";
            case 2:
                return '<li>Campo: <b>' + texto + '</b> está inválido.\n';    
            case 3:
                return "<li>Selecione uma opção em: <b>" + texto + "</b></li>";
            case 4:
                return "<li>Campo: <b>" + texto + "</b> não pode ser zero.</li>";
            case 5:
//                return "<li>A tabela de <b>" + tabpaifilho + "</b> possui um ou mais campos de <b>" + texto + "</b> inválido.</li>";  
            case 6:
           	 	return "<li>"+texto+"</li>";     
            case 7:
           	 	return "<li>Campo: <b>"+texto+"</b> precisa estar marcado.</li>";     
            case 8:
            	return "<li>É obrigatório anexar um <b>"+texto+"</b>.</li>";     
            case 9:
            	return "<li>Descrição <b>Outro</b> da resposta <b>" + texto + "</b> não pode estar vazio.</li>";     
        }
    }
}    



/*****************************************************************************************************************/

function removeClassError(){
	$(".has-error").removeClass("has-error");
	$(".has-free").removeClass("has-free");
	$(".has-free-table").removeClass("has-free-table");
	$(".has-free-array").removeClass("has-free-array");
	$(".has-free-msg").removeClass("has-free-msg");
  	$("form").find("label").css("color", "rgb(89,89,89)");
  	$("form").find("th").css("color", "rgb(89,89,89)");
}