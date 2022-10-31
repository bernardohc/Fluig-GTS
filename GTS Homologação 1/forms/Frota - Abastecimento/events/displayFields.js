function displayFields(form,customHTML){
	var atv_atual = getValue("WKNumState");
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);
	
	var usuarioCorrente = fluigAPI.getUserService().getCurrent();
	
	
	if(atv_atual == INICIO_0){
		
		if(!isMobile(form)){
			//Puxando para cima o body
			customHTML.append("<script>$('body').addClass('class-body-inicio');</script>");
			//Oculta todas as abas (Workflow, Complementes e Anexo)
			customHTML.append("<script>window.parent.$('#processTabs').find('li').hide();</script>");
		}
		
		form.setValue("solicitante",  usuarioCorrente.getCode() );
		form.setValue("nomeSolicitante",  usuarioCorrente.getFullName() );

		//Preenche nome do motorista com o nome de quem está abrindo a solicitação
		var dsAbastConsultaMotorista = DatasetFactory.getDataset("dsAbastConsultaMotorista", null, null, null);
		if(dsTemValor(dsAbastConsultaMotorista)){
			//COD_MOTORISTA
			if( dsAbastConsultaMotorista.getValue(0, "COD_MOTORISTA") != '' && dsAbastConsultaMotorista.getValue(0, "COD_MOTORISTA") !== undefined && dsAbastConsultaMotorista.getValue(0, "COD_MOTORISTA") != 'undefined' ){ 
				form.setValue("geraisCodMotorista",  dsAbastConsultaMotorista.getValue(0, "COD_MOTORISTA") );
			}else{
				customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário está sem o configuração de Cód. Motorista!', type: 'danger'});</script>");
			}
			//CPF_MOTORISTA
			if( dsAbastConsultaMotorista.getValue(0, "CPF_MOTORISTA") != '' && dsAbastConsultaMotorista.getValue(0, "CPF_MOTORISTA") !== undefined && dsAbastConsultaMotorista.getValue(0, "CPF_MOTORISTA") != 'undefined' ){ 
				form.setValue("geraisCPFMotorista",  dsAbastConsultaMotorista.getValue(0, "CPF_MOTORISTA") );
			}else{
				customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário está sem o configuração de CPF!', type: 'danger'});</script>");
			}
		}
		
		form.setValue("geraisNomeMotorista",  usuarioCorrente.getFullName() );
	}else if(atv_atual == INICIO){
		
		if(!isMobile(form)){
			if(form.getFormMode() == 'VIEW'){
				//Oculta a aba do workflow
				customHTML.append("<script>window.parent.$('#processTabs').find('li').first().hide();</script>");
				//Oculta a aba anexos
				customHTML.append("<script>window.parent.$('#processTabs').find('li').last().hide();</script>");
			}else if(form.getFormMode() == 'MOD'){
				//Puxando para cima o body
				customHTML.append("<script>$('body').addClass('class-body-inicio');</script>");
				//Oculta todas as abas (Workflow, Complementes e Anexo)
				customHTML.append("<script>window.parent.$('#processTabs').find('li').hide();</script>");
			}
		}
		
	}else if(atv_atual == INTEGRACAO_ABASTECIMENTO){
		
		if(!isMobile(form)){
			//Oculta a aba do workflow
			customHTML.append("<script>window.parent.$('#processTabs').find('li').first().hide();</script>");
			//Oculta a aba anexos
			customHTML.append("<script>window.parent.$('#processTabs').find('li').last().hide();</script>");
		}
		
	}else if(atv_atual == ANALISA_ERRO_INTEGRACAO_ABASTECIMENTO){
		
		if(!isMobile(form)){
			//Oculta a aba do workflow
			customHTML.append("<script>window.parent.$('#processTabs').find('li').first().hide();</script>");
			//Oculta a aba anexos
			customHTML.append("<script>window.parent.$('#processTabs').find('li').last().hide();</script>");
		}
		
		if(form.getFormMode() == 'MOD'){
			//Tira a opção de readonly do Cod e CPF do motorista, para caso precise incluir manualmente por conta de erro.
			customHTML.append("<script>$('#geraisCodMotorista').prop('readonly', false);</script>");
			customHTML.append("<script>$('#geraisCPFMotorista').prop('readonly', false);</script>");
			
		}
		
	}else if(atv_atual == FIM){
		
		if(!isMobile(form)){
			//Oculta a aba do workflow
			customHTML.append("<script>window.parent.$('#processTabs').find('li').first().hide();</script>");
			//Oculta a aba anexos
			customHTML.append("<script>window.parent.$('#processTabs').find('li').last().hide();</script>");
		}
		
		form.setVisibleById("divCodAbastecimento", true);
	}

}
