function validateForm(form){
	
	var message = "";
    var hasErros = false;
    
    /*
     * Valida obrigatoriamente os Dados Gerais
     */
    if (isEmpty("geraisCarimboDataHora", form)) {
		message += getMessage("Carimbo de Data/Hora", 1, form);
		hasErros = true;
	}
    if (isEmpty("geraisNumFrota", form)) {
    	message += getMessage("Nº Frota", 1, form);
    	hasErros = true;
    }
    if (isEmpty("geraisCondutor", form)) {
    	message += getMessage("Condutor", 1, form);
    	hasErros = true;
    }
    if (isEmpty("geraisEstaComCNHeVigente", form)) {
    	message += getMessage("Você está com a sua CNH e em Vigência?", 1, form);
    	hasErros = true;
    }
    if (isEmpty("geraisCategoriaCNH", form)) {
    	message += getMessage("Categoria da sua CNH", 1, form);
    	hasErros = true;
    }
    if (isEmpty("geraisCidade", form)) {
    	message += getMessage("Cidade", 1, form);
    	hasErros = true;
    }
    if (isEmpty("geraisEstado", form)) {
    	message += getMessage("Estado", 1, form);
    	hasErros = true;
    }
    
    
    //Se for clicado em Enviar
	if (getValue("WKCompletTask") == "true" ){
		/*
		 * VEÍCULO
		 */
		if (isEmpty("veiVeiculo", form)) {
	    	message += getMessage("Veículo", 1, form);
	    	hasErros = true;
	    }
		if (isEmpty("veiKmAtual", form)) {
			message += getMessage("Km Atual", 1, form);
			hasErros = true;
		}
		if (isEmpty("veiEstaAbastecido", form)) {
			message += getMessage("O Veículo está Abastecido?", 1, form);
			hasErros = true;
		}
		if (isEmpty("veiPossuiSemiReboque", form)) {
			message += getMessage("Possui Semi Reboque?", 1, form);
			hasErros = true;
		}
		if (isEmpty("veiNumFrotaSemiReboqueAtrelado", form)) {
			message += getMessage("Nº Frota Semi Reboque Atrelado", 1, form);
			hasErros = true;
		}
		/*
		 * PNEUS
		 */
		if (isEmpty("pneuPneuDiantCavBomEstado", form)) {
			message += getMessage("Pneus Dianteira Cavalo em bom estado?", 1, form);
			hasErros = true;
		}else if(form.getValue("pneuPneuDiantCavBomEstado") == 'Outro' && isEmpty("pneuPneuDiantCavBomEstadoOut", form)  ){
			message += getMessage("Pneus Dianteira Cavalo em bom estado?", 9, form);
			hasErros = true;
		}
		if (isEmpty("pneuPneuTracaoCavBomEstado", form)) {
			message += getMessage("Pneus Tração Cavalo em bom estado?", 1, form);
			hasErros = true;
		}else if(form.getValue("pneuPneuTracaoCavBomEstado") == 'Outro' && isEmpty("pneuPneuTracaoCavBomEstadoOut", form)  ){
			message += getMessage("Pneus Tração Cavalo em bom estado?", 9, form);
			hasErros = true;
		}
		if (isEmpty("pneuPneuTruckCavBomEstado", form)) {
			message += getMessage("Pneus Truck Cavalo em bom estado?", 1, form);
			hasErros = true;
		}else if(form.getValue("pneuPneuTruckCavBomEstado") == 'Outro' && isEmpty("pneuPneuTruckCavBomEstadoOut", form)  ){
			message += getMessage("Pneus Truck Cavalo em bom estado?", 9, form);
			hasErros = true;
		}
		if (isEmpty("pneuPneuSemiReb1Eixo", form)) {
			message += getMessage("Pneus Semi Reboque - 1º Eixo?", 1, form);
			hasErros = true;
		}else if(form.getValue("pneuPneuSemiReb1Eixo") == 'Outro' && isEmpty("pneuPneuSemiReb1EixoOut", form)  ){
			message += getMessage("Pneus Semi Reboque - 1º Eixo?", 9, form);
			hasErros = true;
		}
		if (isEmpty("pneuPneuSemiReb2Eixo", form)) {
			message += getMessage("Pneus Semi Reboque - 2º Eixo?", 1, form);
			hasErros = true;
		}else if(form.getValue("pneuPneuSemiReb2Eixo") == 'Outro' && isEmpty("pneuPneuSemiReb2EixoOut", form)  ){
			message += getMessage("Pneus Semi Reboque - 2º Eixo?", 9, form);
			hasErros = true;
		}
		if (isEmpty("pneuPneuSemiReb3Eixo", form)) {
			message += getMessage("Pneus Semi Reboque - 3º Eixo?", 1, form);
			hasErros = true;
		}else if(form.getValue("pneuPneuSemiReb3Eixo") == 'Outro' && isEmpty("pneuPneuSemiReb3EixoOut", form)  ){
			message += getMessage("Pneus Semi Reboque - 3º Eixo?", 9, form);
			hasErros = true;
		}
		if (isEmpty("pneuPneuSterpBomEstado", form)) {
			message += getMessage("Pneus Sterp em bom estado?", 1, form);
			hasErros = true;
		}else if(form.getValue("pneuPneuSterpBomEstado") == 'Outro' && isEmpty("pneuPneuSterpBomEstadoOut", form)  ){
			message += getMessage("Pneus Sterp em bom estado?", 9, form);
			hasErros = true;
		}
		if (isEmpty("pneuRodaCavSemiRebBomEstado", form)) {
			message += getMessage("Rodas do Cavalo e Semi Reboque em bom estado?", 1, form);
			hasErros = true;
		}else if(form.getValue("pneuRodaCavSemiRebBomEstado") == 'Outro' && isEmpty("pneuRodaCavSemiRebBomEstadoOut", form)  ){
			message += getMessage("Rodas do Cavalo e Semi Reboque em bom estado?", 9, form);
			hasErros = true;
		}
		
		/*
		 * ÓLEOS
		 */
		if (isEmpty("oleoHidNvlCorreto", form)) {
			message += getMessage("Óleo Hidráulico no nível correto?", 1, form);
			hasErros = true;
		}
		if (isEmpty("oleoFluidoFreioNvlCorreto", form)) {
			message += getMessage("Óleo Fluido de Freio no nível correto?", 1, form);
			hasErros = true;
		}
		if (isEmpty("oleoMotorValidadeeNvlCorreto", form)) {
			message += getMessage("Óleo de Motor na Validade e nível correto?", 1, form);
			hasErros = true;
		}
		
		/*
		 * MOTOR
		 */
		if (isEmpty("motorCorreiasBomEstado", form)) {
			message += getMessage("Correias em bom estado?", 1, form);
			hasErros = true;
		}
		if (isEmpty("motorRadiadorArrefNivel", form)) {
			message += getMessage("Água do Radiador ou Líquido de Arrefecimento no nível?", 1, form);
			hasErros = true;
		}
		if (isEmpty("motorBateriasFuncionando", form)) {
			message += getMessage("Baterias funcionando?", 1, form);
			hasErros = true;
		}
		
		/*
		 * EXTERNO
		 */
		if (isEmpty("extLanternasLentesOK", form)) {
			message += getMessage("Lanternas e Lentes ok?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extEscapamentoOK", form)) {
			message += getMessage("Escapamento ok?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extTampaCombustivelOK", form)) {
			message += getMessage("Tampas de Combustível estão ok?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extCarroTampAssoalhoBomEstado", form)) {
			message += getMessage("Carroceria, tampas e assoalho em bom estado?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extLatariaPinturaBomEstado", form)) {
			message += getMessage("Lataria e Pintura em bom estado?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extSistemaArlaOK", form)) {
			message += getMessage("Sistema de Arla esta funcionando ok?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extTravaSegQuintaRodaFunc", form)) {
			message += getMessage("Trava de Segurança da quinta roda esta funcionando corretamente?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extTomEletMangConexArFunc", form)) {
			message += getMessage("Tomada elétrica, mangueiras e conexões de ar estão funcionando corretamente?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extPesSemiReboqueFunc", form)) {
			message += getMessage("Os pés do Semi reboque estão baixando e levantando corretamente?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extTravaPortaFechaduraFunc", form)) {
			message += getMessage("Travas das Portas e Fechaduras estão funcionando corretamente?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extProtecoesParalamaOK", form)) {
			message += getMessage("Proteções, Paralamas, para barros e badanas estão ok?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extFreioCavESemiReboqueFunc", form)) {
			message += getMessage("Freios do cavalo e semi reboque estão funcionando corretamente?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extRuidoAnormal", form)) {
			message += getMessage("Possui algum nível de ruído ou barulho anormal?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extTrianguloSinalOK", form)) {
			message += getMessage("Possui triangulo de sinalização?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extMacadoChaveRodaOK", form)) {
			message += getMessage("Veículo possui Macaco e chave de rodas?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extSuspEixoTruckFunc", form)) {
			message += getMessage("Suspensor de eixo do truck esta funcionando bem?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extBasculandoOK", form)) {
			message += getMessage("Veiculo esta basculando e possui alavanca para bascular?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extSemiRebPinoReiOK", form)) {
			message += getMessage("Semi Reboque esta com o Pino Rei em boas condições?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extTravaSegQuintaRodaOK", form)) {
			message += getMessage("Trava de Segurança da Quinta Roda esta esta em boas condições?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extTanqueCombOK", form)) {
			message += getMessage("Tanques de Combustível estão em boas condições e sem vazamentos?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extManivelaPeSemiRebFunc", form)) {
			message += getMessage("Manivela e Pés do Semi Reboque estão funcionando corretamente?", 1, form);
			hasErros = true;
		}
		if (isEmpty("extIdentDifVist", form)) {
			message += getMessage("Identificou algo diferente durante a vistoria externa ao redor do veículo?", 1, form);
			hasErros = true;
		}
		/*
		 * INTERNO
		 */
		if (isEmpty("intCintoSegurancaOK", form)) {
			message += getMessage("Cinto de Segurança Perfeito e funcionando?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intFreioEstacionamentoFunc", form)) {
			message += getMessage("Freio de Estacionamento funcionando?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intDirecaoBomEstado", form)) {
			message += getMessage("Direção em bom estado e sem Folgas?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intLimpadorParabrisaFunc", form)) {
			message += getMessage("Limpador de Para-brisa funcionando bem e com Água?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intInstrumPainelFunc", form)) {
			message += getMessage("Instrumentos do Painel funcionando bem?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intRetrovisorAjust", form)) {
			message += getMessage("Retrovisores Ajustados e funcionando bem?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intBuzinaFunc", form)) {
			message += getMessage("Buzina funcionando bem?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intFaroisLampFunc", form)) {
			message += getMessage("Faróis e Lâmpadas funcionando bem?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intSetaPiscaFunc", form)) {
			message += getMessage("Setas e Piscas funcionando bem?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intAlertaFunc", form)) {
			message += getMessage("Alerta funcionando bem?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intLuzReFunc", form)) {
			message += getMessage("Luz de Ré e Alarme funcionando bem?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intLuzFreioFunc", form)) {
			message += getMessage("Luz de Freio funcionando bem?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intExtintorDentroValidade", form)) {
			message += getMessage("Possui Extintor dentro da validade?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intVidroParabrisaOK", form)) {
			message += getMessage("Vidros e Para-brisa estão ok?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intCortBancoEstofOK", form)) {
			message += getMessage("Cortinas, Bancos e Estofamento em bom estado?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intChaveGeralOK", form)) {
			message += getMessage("Possui Chave Geral de Segurança e em bom estado?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intRadioPXFunc", form)) {
			message += getMessage("Rádio PX esta funcionando corretamente?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intClimatizadorFunc", form)) {
			message += getMessage("Climatizador esta funcionando corretamente?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intArCondicionadoFunc", form)) {
			message += getMessage("Ar Condicionado esta funcionando corretamente?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intArCavSemiRebVazamento", form)) {
			message += getMessage("Sistemas de Ar Cavalo x Semi Reboque possui algum vazamento?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intFreioMotorFunc", form)) {
			message += getMessage("Freio Motor esta funcionando corretamente?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intSomRadioFMFunc", form)) {
			message += getMessage("Som e rádio FM estão funcionando corretamente?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intEsguichoFunc", form)) {
			message += getMessage("Esguicho esta injetando água?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intPalhetaOK", form)) {
			message += getMessage("Palhetas estão em boas condições?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intTacografoOK", form)) {
			message += getMessage("Tacógrafos esta funcionando e foi trocado nos últimos 7 dias?", 1, form);
			hasErros = true;
		}
		if (isEmpty("intTAGPedagioFuncCorreto", form)) {
			message += getMessage("O Veículo está com a TAG do Sem Parar Funcionando Corretamente?", 1, form);
			hasErros = true;
		}
		/*
		 * DOCUMENTAÇÃO
		 */
		if (isEmpty("docCertifTacografoOK", form)) {
			message += getMessage("Certificado do Tacógrafo esta junto com os documentos e em vigência?", 1, form);
			hasErros = true;
		}
		if (isEmpty("docCavSemiRebOK", form)) {
			message += getMessage("Documentos do Cavalo e Semi reboque estão no veiculo e em vigência?", 1, form);
			hasErros = true;
		}
		if (isEmpty("docCartaoSeguro", form)) {
			message += getMessage("O Veículo está com o Cartão Seguro, com o Nº 0800 para Chamar Socorro?", 1, form);
			hasErros = true;
		}
		if (isEmpty("docCartaoAbastecimento", form)) {
			message += getMessage("O Veículo está com o Cartão de Abastecimento RF?", 1, form);
			hasErros = true;
		}
		if (isEmpty("docAETemVigencia", form)) {
			message += getMessage("O Veículo está com todos os AETs e em Vigência?", 1, form);
			hasErros = true;
		}
		if (isEmpty("docSinalExcessoCorreto", form)) {
			message += getMessage("O Veículo está com a Tampa Traseira Sinalizando Excesso Corretamento e Legível?", 1, form);
			hasErros = true;
		}
		if (isEmpty("docEtiqTrocaOleo", form)) {
			message += getMessage("O Veículo possui Manual e Etiqueta indicando a próxima Revisão de Troca de Óleo e Filtros?", 1, form);
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
                return "<li>A tabela de <b>" + tabpaifilho + "</b> possui um ou mais campos de <b>" + texto + "</b> inválido.</li>";  
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