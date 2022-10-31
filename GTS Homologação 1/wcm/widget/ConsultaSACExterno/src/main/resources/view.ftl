<div id="ConsultaSACExterno_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" 
	data-params="ConsultaSACExterno.instance({viewMode: true})">

	<div class="bs-example" id="divCabConsultaSacExterno" style="display:none;">
		<div class="row">
			<div class="col-md-3" align="middle">
				<img align="center" height="90" width="165" src="https://i.ibb.co/wc27BYd/Logo-GTS.jpg">
            </div>
			<div class="col-md-6" align="left">
				<font class="banner-header" color="000" ><h1><strong>Consulta SAC</strong></h1></font>
            </div>
		</div>
		</br>
		</br>	
		<div class="row">
			<div class="col-md-2 col-md-offset-2" align="left">
				<div class="input-grup">
					<label for="conNumPedido">Nº Protocolo</label>
					<input type="text" name="conNumProtocoloFluig" id="conNumProtocoloFluig" class="form-control"  maxlength="20">
				</div>
			</div>
			<div class="col-md-2" align="left">
				<div class="input-grup">		   
					<label for="conTipoPessoaRequisitante">Tipo Pessoa</label>       	
					<select name="conTipoPessoaRequisitante" id="conTipoPessoaRequisitante" class="form-control" data-tipo_pessoa_requisitante>
						<option value=""> </option>
			        	<option value="PF">Pessoa Física</option>
       					<option value="PJ">Pessoa Jurídica</option>	
			      	</select>					 	 
		   		</div>	
		    </div>
		    <div class="col-md-2 " align="left">
				<label for="conCpfCnpjRequisitante">CPF/CNPJ*</label>
				<input type="text" name="conCpfCnpjRequisitante" id="conCpfCnpjRequisitante" class="form-control"  maxlength="20" readonly>
	        </div>
	        
	        <div class="col-md-2 " style="text-align:center">
	        	<br>
				<button class="btn btn-light fs-full-width" data-consultar_sac> Consultar <span class="fluigicon fluigicon-search"></span></button>
			</div>
		</div>
		<div class="row">
			</br>
<!-- 			<div class="col-md-6 col-md-offset-3" align="center"> -->
<!-- 				<div class="g-recaptcha" data-sitekey="6LfhEx4bAAAAAFYiWj3kDJpeWHtJIkmQij0K3cX8" ></div> -->
<!-- 				<div id="g-recaptcha-error" style="display: none;"><span style="color:red;">Favor preencha o captcha corretamente.</span></div> -->
<!-- 			</div> -->
		</div>
			
	</div>
	
	
	
	<div id="divDadosGeraisConsultaSacExterno" style="display:none;">
		</br>
		</br>
		<div class="row">
	        <div class="col-md-4" style="text-align:left">
	       		<h4 ><strong>Dados Gerais</strong></h4>
	       		<hr />  
	        </div>
	    </div>
		<div class="row">
			<div class="col-md-2 col-md-offset-1" align="left">
				<div class="input-grup">
					<label for="visNumProtocoloFluig">Nº Protocolo</label>
					<input type="text" name="visNumProtocoloFluig" id="visNumProtocoloFluig" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2 " align="left">
				<div class="input-grup">
					<label for="visStatusAtendimento">Status</label>
					<input type="text" name="visStatusAtendimento" id="visStatusAtendimento" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2" align="left">
				<div class="input-grup">
					<label for="visDataAbertura">Data Abertura</label>
					<input type="text" name="visDataAbertura" id="visDataAbertura" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2" align="left">
				<div class="input-grup">
					<label for="visDataFinalizado">Data Finalizado</label>
					<input type="text" name="visDataFinalizado" id="visDataFinalizado" class="form-control" readonly>
				</div>
			</div>
		</div>
	</div>
	<div id="divRequisitante" style="display:none;">
	    <div class="row">
	        <div class="col-md-4" style="text-align:left">
	       		<h4 ><strong>Requisitante</strong></h4>
	       		<hr />  
	        </div>
	    </div>
	    <div class="row">
			<div class="col-md-4 col-md-offset-1" align="left">
				<div class="input-grup">
					<label for="visNomeRequisitante">Nome</label>
					<input type="text" name="visNomeRequisitante" id="visNomeRequisitante" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2" align="left">
				<div class="input-grup">
					<label for="visTipoPessoaRequisitante">Tipo Pessoa</label>
					<select name="visTipoPessoaRequisitante" id="visTipoPessoaRequisitante" class="form-control" readonly disabled>
						<option value=""> </option>
			        	<option value="PF">Pessoa Física</option>
			        	<option value="PJ">Pessoa Jurídica</option>	
			      	</select>
				</div>
			</div>
			<div class="col-md-2" align="left">
				<div class="input-grup">
					<label for="visCpfCnpjRequisitante">CPF/CNPJ</label>
					<input type="text" name="visCpfCnpjRequisitante" id="visCpfCnpjRequisitante" class="form-control" readonly>
					
				</div>
			</div>
			<div class="col-md-2" align="left">
				<div class="input-grup">
					<label for="visTelRequisitante">Telefone</label>
					<input type="text" name="visTelRequisitante" id="visTelRequisitante" class="form-control" readonly>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4 col-md-offset-1" align="left">
				<div class="input-grup">
					<label for="visEmailRequisitante">E-mail</label>
					<input type="text" name="visEmailRequisitante" id="visEmailRequisitante" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2 " align="left">
			    <label for="visEstadoRequisitante">Estado*</label>
     			<select name="visEstadoRequisitante" id="visEstadoRequisitante" class="form-control" readonly disabled>
      				<option value=""></option>
      				<option value="AC">Acre</option>
					<option value="AL">Alagoas</option>
					<option value="AP">Amapá</option>
					<option value="AM">Amazonas</option>
					<option value="BA">Bahia</option>
					<option value="CE">Ceará</option>
					<option value="DF">Distrito Federal</option>
					<option value="ES">Espírito Santo</option>
					<option value="GO">Goiás</option>
					<option value="MA">Maranhão</option>
					<option value="MT">Mato Grosso</option>
					<option value="MS">Mato Grosso do Sul</option>
					<option value="MG">Minas Gerais</option>
					<option value="PA">Pará</option>
					<option value="PB">Paraíba</option>
					<option value="PR">Paraná</option>
					<option value="PE">Pernambuco</option>
					<option value="PI">Piauí</option>
					<option value="RJ">Rio de Janeiro</option>
					<option value="RN">Rio Grande do Norte</option>
					<option value="RS">Rio Grande do Sul</option>
					<option value="RO">Rondônia</option>
					<option value="RR">Roraima</option>
					<option value="SC">Santa Catarina</option>
					<option value="SP">São Paulo</option>
					<option value="SE">Sergipe</option>
					<option value="TO">Tocantins</option>
				</select>
			</div>
			<div class="col-md-2" align="left">
				<div class="input-grup">
					<label for="visCidadeRequisitante">Cidade</label>
					<input type="hidden" name="visCodCidadeRequisitante" id="visCodCidadeRequisitante" class="form-control" readonly>
					<input type="text" name="visCidadeRequisitante" id="visCidadeRequisitante" class="form-control" readonly>
				</div>
			</div>
		</div>
    </div>
	<div id="divSolicitacao"  style="display:none;">
	    <div class="row">
	        <div class="col-md-4" style="text-align:left">
	       		<h4 ><strong>Solicitação</strong></h4>
	       		<hr />  
	        </div>
	    </div>
	    <div class="row">
		    <div class="col-md-2 col-md-offset-1" align="left">
				<label for="visTipoSolicitacao">Tipo</label>
				<input type="text" name="visTipoSolicitacao" id="visTipoSolicitacao" class="form-control" readonly>
		    </div>
		    <div class="col-md-2 " align="left">
				<div class="input-grup">
					<label for="visSetor">Setor</label>
					<input type="text" name="visSetor" id="visSetor" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2" align="left">
				<div class="input-grup">
					<label for="visNumSerie">Nº Série</label>
					<input type="text" name="visNumSerie" id="visNumSerie" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-3" align="left">
				<div class="input-grup">
					<label for="visModeloEquipamento">Modelo Equipamento</label>
					<input type="text" name="visModeloEquipamento" id="visModeloEquipamento" class="form-control" readonly>
				</div>
			</div>
		    
		</div>
		<div class="row">
			<div class="col-md-2 col-md-offset-1" align="left">
			    <label for="visEstadoRevenda">Estado*</label>
     			<select name="visEstadoRevenda" id="visEstadoRevenda" class="form-control" readonly disabled>
      				<option value=""></option>
      				<option value="AC">Acre</option>
					<option value="AL">Alagoas</option>
					<option value="AP">Amapá</option>
					<option value="AM">Amazonas</option>
					<option value="BA">Bahia</option>
					<option value="CE">Ceará</option>
					<option value="DF">Distrito Federal</option>
					<option value="ES">Espírito Santo</option>
					<option value="GO">Goiás</option>
					<option value="MA">Maranhão</option>
					<option value="MT">Mato Grosso</option>
					<option value="MS">Mato Grosso do Sul</option>
					<option value="MG">Minas Gerais</option>
					<option value="PA">Pará</option>
					<option value="PB">Paraíba</option>
					<option value="PR">Paraná</option>
					<option value="PE">Pernambuco</option>
					<option value="PI">Piauí</option>
					<option value="RJ">Rio de Janeiro</option>
					<option value="RN">Rio Grande do Norte</option>
					<option value="RS">Rio Grande do Sul</option>
					<option value="RO">Rondônia</option>
					<option value="RR">Roraima</option>
					<option value="SC">Santa Catarina</option>
					<option value="SP">São Paulo</option>
					<option value="SE">Sergipe</option>
					<option value="TO">Tocantins</option>
				</select>
			</div>
			<div class="col-md-2" align="left">
				<div class="input-grup">
					<label for="visCidadeRevenda">Cidade</label>
					<input type="hidden" name="visCodCidadeRevenda" id="visCodCidadeRevenda" class="form-control" readonly>
					<input type="text" name="visCidadeRevenda" id="visCidadeRevenda" class="form-control" readonly>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4 col-md-offset-1" align="left">
				<div class="input-grup">
					<label for="visRevenda">Revenda</label>
					<input type="text" name="visRevenda" id="visRevenda" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2 " align="left">
				<label for="visTipoPessoaRevenda">Tipo*</label>
				<select name="visTipoPessoaRevenda" id="visTipoPessoaRevenda" class="form-control" readonly disabled>
					<option value=""> </option>
		        	<option value="PF">Pessoa Física</option>
		        	<option value="PJ">Pessoa Jurídica</option>	
		      	</select>
		    </div>
		    <div class="col-md-2 " align="left">
				<label for="visCpfCnpjRevenda">CPF/CNPJ*</label>
				<input type="text" name="visCpfCnpjRevenda" id="visCpfCnpjRevenda" class="form-control"  readonly>
	        </div>
		</div>
		<div class="row">
			<div class="col-md-4 col-md-offset-1" align="left">
				<div class="input-grup">
					<label for="visAssuntoSolicitacao">Assunto</label>
					<input type="text" name="visAssuntoSolicitacao" id="visAssuntoSolicitacao" class="form-control" readonly>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-8 col-md-offset-1" align="left">
				<label for="visDescricaoSolicitacao">Descrição da Solicitação</label>
				<textarea rows="5" cols="8" name="visDescricaoSolicitacao" id="visDescricaoSolicitacao" class="form-control " readonly></textarea>
	         </div> 
		</div>
    </div>
	<div id="divAtendimento" style="display:none;">
		<div class="row">
	        <div class="col-md-4" style="text-align:left">
	       		<h4 ><strong>Atendimento</strong></h4>
	       		<hr />  
	        </div>
	    </div>
		
		<div class="row">
			<div class="col-md-10 col-md-offset-1 scrooltable" id="target" data-isolated-scroll>
				<div id="tabelaAtendimento_${instanceId}"></div>
				<script type="text/template" class="tabelaAtendimento">
				    <tr>
				        <td>{{Id}}</td>
				        <td>{{atendData}}</td>
				        <td>{{atendStatus}}</td>
				        <td class="quebratexto">{{atendComExterna}}</td>
				    </tr>
				</script>
			</div>
		</div>
		
		</br>
		</br>
		</br>
		</br>
		
	</div>     
	  
	  
	<div class="footer section cookies-alert" style="display:none">
		<div class="row">
			<div class="col-md-9 col-md-offset-1" >
				<p>Para gerar uma experiência personalizada utilizamos cookies neste site, portanto ao prosseguir com a utilização você concorda com os termos presentes na <a href="https://gtsdobrasil.ind.br/br/politica_de_privacidade">Política de Privacidade</a>. A GTS do Brasil preza pela conformidade com a Lei Geral de Proteção de Dados Pessoais - Lei 13.709/18.</p>
			</div>
			<div class="col-md-2" >
				<a class="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-border ttm-btn-color-white mt-15 mb-20 cookie-close" data-fechar_cookie >PROSSEGUIR</a>
			</div>
		</div>
	</div>  
	    
</div>

<script src='https://www.google.com/recaptcha/api.js'></script>