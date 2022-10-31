<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<div id="ConsultaSACInterno_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
     data-params="ConsultaSACInterno.instance({viewMode: true})">

	<!-- Cabeçalho de Consulta SAC Interno -->
	 <div class="bs-example" id="divCabConsultaSacInterno" style="display:none;">
		<div class="panel-group" id="accordion">
			<div class="panel panel-default" id="geral">
<!-- 				<div class="panel-heading"> -->
<!-- 					<h4 class="panel-title"> -->
<!-- 						<a class="collapse-icon up" data-toggle="collapse" data-parent="#accordion" href="#collapseGeral"></a> -->
<!-- 					</h4> -->
<!-- 				</div> -->
				<div id="collapseGeral" class="panel-collapse collapse in">
					<div class="panel-body">
						<div class="row">
							<div class="col-md-2 col-md-offset-1" align="left">
								<div class="input-grup">
									<label for="conNumPedido">Nº Protocolo</label>
									<input type="text" name="conNumProtocoloFluig" id="conNumProtocoloFluig" class="form-control"  maxlength="20">
								</div>
							</div>
							<div class="col-md-2 " align="left">
								<div class="input-grup">
									<label for="conNumProtocoloTelefonico">Nº Protocolo Telefônico</label>
									<input type="text" name="conNumProtocoloTelefonico" id="conNumProtocoloTelefonico" class="form-control"  >
								</div>
							</div>
							<div class="col-md-2" align="left">
								<div class="input-grup">		   
									<label for="conStatusAtendimento">Status</label>       	
									<select name="conStatusAtendimento" id="conStatusAtendimento" class="form-control">
										<option value=""> </option>
							        	<option value="Abertura">Abertura</option>
							        	<option value="AguardandoAnalise">Aguardando Análise</option>
							        	<option value="EmAnalise">Em Análise</option>
							        	<option value="Finalizado">Finalizado</option>
							      	</select>					 	 
						   		</div>	
						    </div>
							<div class="col-md-2  " align="left">
								<label for="conDataAberturaDe">Data Abertura de</label>
								<div class="input-group">
									<input type="text" name="conDataAberturaDe" id="conDataAberturaDe" class="form-control" >				
									<span class="input-group-addon">
					                        <span class="fluigicon fluigicon-calendar"></span>
					                 </span>
								</div>
							</div>
							<div class="col-md-2" align="left">
								<label for="conDataAberturaAte">Data Abertura Até</label>
								<div class="input-group">
									<input type="text" name="conDataAberturaAte" id="conDataAberturaAte" class="form-control" >					
									<span class="input-group-addon">
			                           <span class="fluigicon fluigicon-calendar"></span>
			                        </span>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-3" align="left">
								<div class="input-grup">
									<label for="conNomeRequisitante">Nome Requisitante</label>
									<input type="text" name="conNomeRequisitante" id="conNomeRequisitante" class="form-control"  >
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
								<label for="conCpfCnpjRequisitante">CPF/CNPJ</label>
								<input type="text" name="conCpfCnpjRequisitante" id="conCpfCnpjRequisitante" class="form-control"  maxlength="20" readonly>
					        </div>
							<div class="col-md-2 " align="left">
							    <label for="conEstadoRequisitante">Estado</label>
				     			<select name="conEstadoRequisitante" id="conEstadoRequisitante" class="form-control" data-estado_requisitante>
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
							<div class="col-md-3 " align="left">
								<div class="input-grup">
									<label for="conCidadeRequisitante">Cidade</label>
									<select name="conCidadeRequisitante" id="conCidadeRequisitante" class="form-control">
										<option value=""> </option>
							      	</select>	
								</div>
							</div>
						</div>
						
						<div class="row">
						
							<div class="col-md-2 " align="left">
							    <label for="conEstadoRevenda">Estado</label>
				     			<select name="conEstadoRevenda" id="conEstadoRevenda" class="form-control" data-estado_revenda>
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
							<div class="col-md-3 " align="left">
								<div class="input-grup">
									<label for="conCidadeRevenda">Cidade</label>
									<select name="conCidadeRevenda" id="conCidadeRevenda" class="form-control" data-cidade_revenda>
										<option value=""> </option>
							      	</select>	
								</div>
							</div>
							
							<div class="col-md-3  " align="left">
								<div class="input-grup">
									<label for="conRevenda">Revenda</label>
									<select name="conRevenda" id="conRevenda" class="form-control">
										<option value=""> </option>
							      	</select>	
								</div>
							</div>
							<div class="col-md-2" align="left">
								<div class="input-grup">		   
									<label for="conTipoSolicitacao">Tipo</label>       	
									<select name="conTipoSolicitacao" id="conTipoSolicitacao" class="form-control">
										<option value=""> </option>
							        	<option value="Duvida">Dúvida</option>
							        	<option value="Elogio">Elogio</option>
							        	<option value="Reclamacao">Reclamação</option>
							        	<option value="Sugestao">Sugestão</option>
							        	<option value="Outros">Outros</option>
							      	</select>					 	 
						   		</div>	
						    </div>
						   
						    <div class="col-md-2" align="left">
								<div class="input-grup">		   
									<label for="conSetor">Setor</label>       	
									<select name="conSetor" id="conSetor" class="form-control">
										<option value=""> </option>
							      	</select>					 	 
						   		</div>	
						    </div>	
							
							
						</div>
					
						<div class="row">
							<br>
						</div>
						<div class="row">
							<div class="col-md-4 col-md-offset-4" style="text-align:center">
								<button class="btn btn-primary fs-full-width" data-filtrar_sac> Pesquisar SAC<span class="fluigicon fluigicon-filter "></span></button>
							</div>
							<div class="col-md-2" style="text-align:center">
								<button class="btn btn-light fs-full-width" data-limpar_filtro_sac> Limpar</button>
							</div>				
						</div>
					</div>
				</div>
			</div>
		</div>
    	
		<div class="row">
			<div class="col-md-12 scrooltable" id="target" data-isolated-scroll>
				<div id="tabelaSAC_${instanceId}"></div>
				<br>
			</div>
		</div>
	</div>
	
	<div id='dadosSAC' style="display:none;">
		
		<div class="row">
			<br>
		</div>
		<div class="row">
			<div class="col-md-2 " align="left">
				<button class="btn btn-primary fs-full-width" data-voltar_tela><span class="fluigicon fluigicon-login"></span>  Voltar a Tela de Pedidos</button>
			</div>
			<div class="col-md-2 " align="left">
				<button class="btn btn-light fs-full-width" data-imprimir_sac><span class="fluigicon fluigicon-print"></span>  Imprimir</button>
			</div>
		</div>
		<div class="row">
			<br>
		</div>
		
		<div class="row">
			<div class="col-md-2 col-md-offset-1" align="left">
				<div class="input-grup">
					<label for="visNumProtocoloFluig">Nº Protocolo</label>
					<input type="text" name="visNumProtocoloFluig" id="visNumProtocoloFluig" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2" align="left">
				<div class="input-grup">
					<label for="visNumProtocoloTelefonico">Nº Protocolo Telefônico</label>
					<input type="text" name="visNumProtocoloTelefonico" id="visNumProtocoloTelefonico" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2" align="left">
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
		<div id="divRequisitante">
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
						<input type="text" name="visCidadeRequisitante" id="visCidadeRequisitante" class="form-control" readonly>
					</div>
				</div>
			</div>
			
		</div>
		<div id="divSolicitacao">
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
				<div class="col-md-5 col-md-offset-1" align="left">
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
		<div id="divAtendimento" >
			<div class="row">
		        <div class="col-md-4" style="text-align:left">
		       		<h4 ><strong>Atendimento</strong></h4>
		       		<hr />  
		        </div>
		    </div>
			
			<div class="row">
				<div class="col-md-12 scrooltable" id="target" data-isolated-scroll>
					<div id="tabelaAtendimento_${instanceId}"></div>
						<script type="text/template" class="tabelaAtendimento">
					    <tr>
					        <td>{{atendId}}</td>
					        <td>{{atendData}}</td>
					        <td>{{atendUsuario}}</td>
					        <td>{{atendStatus}}</td>
					        <td class="quebratexto">{{atendComInterna}}</td>
					        <td class="quebratexto">{{atendComExterna}}</td>
					    </tr>
					</script>
				</div>
			</div>
		</div>    
	</div>
	
	
    

</div>
