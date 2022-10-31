<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<div id="ConsultaPedidosMaquina_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" 
	data-params="ConsultaPedidosMaquina.instance({viewMode: true})">
	
	
	
	<!-- Cabeçalho de Consulta Pedido -->
    <div class="bs-example" id="divCabConsultaPedido" style="display:none;">
		<div class="panel-group" id="accordion">
			<div class="panel panel-default" id="geral">
				<div class="panel-heading">
					<h4 class="panel-title">
						<a class="collapse-icon up" data-toggle="collapse" data-parent="#accordion" href="#collapseGeral">Filtros</a>
					</h4>
				</div>
				<div id="collapseGeral" class="panel-collapse collapse in">
					<div class="panel-body">
						<div class="row" style="display:none;">
							<div class="col-md-1 col-md-offset-1" align="left">
								<div class="input-grup">
									<label for="conCompanyId">Company Id</label>
									<input type="hidden" name="conCompanyId" id="conCompanyId" class="form-control"  >
								</div>
							</div>
							<div class="col-md-2 " align="left">
								<div class="input-grup">
									<label for="conMatricula">Matricula</label>
									<input type="hidden" name="conMatricula" id="conMatricula" class="form-control"  >
								</div>
							</div>
							<div class="col-md-2 " align="left">
								<div class="input-grup">
									<label for="conTipoUsuario">Tipo Usuário</label>
									<input type="hidden" name="conTipoUsuario" id="conTipoUsuario" class="form-control"  >
									<input type="hidden" name="conTipoUsuarioDesc" id="conTipoUsuarioDesc" class="form-control"  >
								</div>
							</div>
							<div class="col-md-2 " align="left">
								<div class="input-grup">
									<label for="conCodRevenda">Cod. Revenda</label>
									<input type="hidden" name="conCodRevenda" id="conCodRevenda" class="form-control"  >
								</div>
							</div>
							<div class="col-md-2 " align="left">
								<div class="input-grup">
									<label for="conLojaRevenda">Loja Revenda</label>
									<input type="hidden" name="conLojaRevenda" id="conLojaRevenda" class="form-control"  >
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-2 col-md-offset-1 " align="left">
								<div class="input-grup">
									<label for="conNumPedidoFluig">Nº Pedido (Id Fluig)</label>
									<input type="text" name="conNumPedidoFluig" id="conNumPedidoFluig" class="form-control"  />
								</div>
							</div>
							<div class="col-md-2 " align="left">
								<div class="input-grup">
									<label for="conNumPedidoInterno">Nº Pedido (Interno)</label>
									<input type="text" name="conNumPedidoInterno" id="conNumPedidoInterno" class="form-control"  />
								</div>
							</div>
							<div class="col-md-2 col-xs-6" align="left">
								<label for="conDataEmissaoDe">Data Emissão de</label>
								<div class="input-group">
									<input type="text" name="conDataEmissaoDe" id="conDataEmissaoDe" class="form-control" />				
									<span class="input-group-addon">
				                           <span class="fluigicon fluigicon-calendar"></span>
				                    </span>
								</div>
							</div>
							<div class="col-md-2 col-xs-6" align="left">
								<label for="conDataEmissaoAte">Data Emissão Até</label>
								<div class="input-group">
									<input type="text" name="conDataEmissaoAte" id="conDataEmissaoAte" class="form-control" />					
									<span class="input-group-addon">
				                           <span class="fluigicon fluigicon-calendar"></span>
				                       </span>
								</div>
							</div>
							<div class="col-md-2" >   
		                        <div class="form-group">
		                             <label>Situação</label>                                   
		                             <select class="form-control" name="conSituacao" id="conSituacao">
		                                  <option value=""></option>
		                                  <option value="1">Em Aberto</option>
		                                  <option value="2">Faturado</option>                                                  
		                                  <option value="3">Finalizado</option>                                                  
		                             </select>
		                        </div>
		                   	</div>
						</div>
					
						<div class="row">
							<br>
						</div>
						<div class="row">
							<div class="col-md-4 col-md-offset-4 col-xs-8" style="text-align:center">
								<button class="btn btn-primary fs-full-width" data-pesquisar_pedidos>Pesquisar Pedidos<span class="fluigicon fluigicon-filter "></span></button>
							</div>			
							<div class="col-md-2 col-xs-4 " style="text-align:center">
								<button class="btn btn-light fs-full-width" data-limpar_filtro>Limpar</button>
							</div>			
						</div>
					</div>
				</div>
			</div>
		</div>
    	
    	<div class="row">
			<br>
		</div>
    
    	<div class="row">
			<div class="col-md-12" >
				<p style="text-align:center">&nbsp;&nbsp;
					<img src='/ConsultaPedidosMaquina/resources/images/bola-branca.png' height='30' width='30'/><strong>- Vazio  &nbsp;</strong> 
					<img src='/ConsultaPedidosMaquina/resources/images/bola-cinza.png' height='26' width='26'/><strong>- Início OP &nbsp;</strong> 
					<img src='/ConsultaPedidosMaquina/resources/images/bola-verde.png'  height='30' width='30' /><strong>- Montagem </strong>
					<img src='/ConsultaPedidosMaquina/resources/images/bola-amarela.png'  height='30' width='30' /><strong>- Teste</strong> 
					<img src='/ConsultaPedidosMaquina/resources/images/bola-azul.png'  height='30' width='30' /><strong>- Finalizada</strong> 
				</p>
			</div>
		</div>
		
		
		<div class="row">
			<br>
		</div>
		
		<div id="tabelaPedidos" class="row" style="display:none;">
			<div style="overflow-x: auto; width: 100%" class="col-md-12 scrooltable" data-isolated-scroll>
				<div id="tabelaPedidos_${instanceId}"></div>
				<br>
			</div>
		</div>
	</div>
	
	<div id='dadosPedido' style="display:none;">
		
		<div class="row">
			<div class="col-md-2 " align="left">
				<button class="btn btn-primary fs-full-width" data-voltar_tela><span class="fluigicon fluigicon-login"></span>  Voltar a Tela de Pedidos</button>
			</div>
			<div class="col-md-8" align="left">
			 		&nbsp;
			</div>
		</div>
		
		<div class="row">
			<br>
		</div>
			
		<div class="row">
			<div class="col-md-1 col-md-offset-3 col-xs-6 " align="left">
				<div class="input-grup">
					<label for="visIdFluig">Id Fluig</label>
					<a href="" id="idFluigHref" target="_blank"> 
						<input type="text" name="visIdFluig" id="visIdFluig" class="form-control" readonly style="cursor: pointer;">
					</a>
				</div>
			</div>
			<div class="col-md-1 col-xs-6 " align="left">
				<div class="input-grup">
					<label for="visNumPedido">Nº Pedido</label>
					<input type="text" name="visNumPedidoInterno" id="visNumPedidoInterno" class="form-control" readonly>
					<input  type="hidden"  name="visFilialPedidoInterno" id="visFilialPedidoInterno">
				</div>
			</div>
			<div class="col-md-2 col-xs-6" align="left">
				<div class="input-grup">
					<label for="visDataEmissao">Data Emissão</label>
					<input type="text" name="visDataEmissao" id="visDataEmissao" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2 col-xs-6" align="left">
				<div class="input-grup">
					<label for="visStatusMaquina">Status Máquina</label>
					<input type="text" name="visStatusMaquina" id="visStatusMaquina" class="form-control" readonly>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-3 col-md-offset-3" align="left">
				<div class="input-grup">
					<label for="visCliente">Cond. Pagamento</label>
					<input type="text" name="visCondPagto" id="visCondPagto" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2 col-xs-6" align="left">
				<div class="input-grup">
					<label for="visLibFinanceira">Liberação Financeira</label>
					<input type="text" name="visLibFinanceira" id="visLibFinanceira" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-1 col-xs-6" align="left">
				<div class="input-grup">
					<label for="visTipoFrete">Tipo Frete</label>
					<input type="text" name="visTipoFrete" id="visTipoFrete" class="form-control" readonly>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4 col-md-offset-1" align="left">
				<div class="input-grup">
					<label for="visRevendedor">Revendedor</label>
					<input type="text" name="visRevendedor" id="visRevendedor" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-3" align="left">
				<div class="input-grup">
					<label for="visRepresentante">Representante</label>
					<input type="text" name="visRepresentante" id="visRepresentante" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-3 " align="left">
				<div class="input-grup">
					<label for="visGestorTerritorial">Gestor Territorial</label>
					<input type="text" name="visGestorTerritorial" id="visGestorTerritorial" class="form-control" readonly>
				</div>
			</div>
		</div>	
		
		<div class="row">
			<div class="col-md-4 col-md-offset-1" align="left">
				<div class="input-grup">
					<label for="visCliente">Cliente</label>
					<input type="text" name="visClienteNome" id="visClienteNome" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-3 col-xs-6" align="left">
				<div class="input-grup">
					<label for="visCliente">CPF/CNPJ Cliente</label>
					<input type="text" name="visClienteCpfCnpj" id="visClienteCpfCnpj" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-3 col-xs-6" align="left">
				<div class="input-grup">
					<label for="visCliente">Inscrição Estadual</label>
					<input type="text" name="visClienteIE" id="visClienteIE" class="form-control" readonly>
				</div>
			</div>
		</div>
		<div class="row">	
			<div class="col-md-2 col-md-offset-1 col-xs-6" align="left" >
				<div class="input-grup">
					<label for="visNumNota">Nº Nota</label>
					<input type="text" name="visNumNota" id="visNumNota" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2 col-xs-6" align="left" >
				<div class="input-grup">
					<label for="visDataEmissao">Data Emissão NF</label>
					<input type="text" name="visDataEmissaoNF" id="visDataEmissaoNF" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-4 " align="left" >
				<div class="input-grup">
					<label for="visChaveNF">Chave Nota Fiscal</label>
					<input type="text" name="visChaveNF" id="visChaveNF" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2 " align="left" >
				<label for="visChaveNF">&nbsp</label>
				<button class="btn btn-default fs-full-width" data-baixar_nota>Baixar Nota<span class="flaticon flaticon-description  icon-sm"></span></button>
			</div>
		</div>
		
		<div class="row">
			<div class="col-md-4 col-md-offset-1" align="left">
				<div class="input-grup">
					<label for="visObservacao">Observação</label>
					<textarea rows="3" cols="12" name="visObservacao" id="visObservacao" class="form-control " readonly></textarea>
				</div>
			</div>
		</div>
		
		<!-- Tabela de Itens -->
		<div class="row">
			<div style="overflow-x: auto; width: 100%">
				<div class="col-md-12 col-xs-12" >
					<div id="tabelaItensPedido_${instanceId}"></div>
				</div>
			</div>
		</div>
		
		<div class="row">
			<div class="col-md-2 col-md-offset-10 col-xs-6 col-xs-offset-6" align="left">
				<label for="totalPedido">Valor Total</label>
		      	<input type="text" name="visTotalPedido" id="visTotalPedido" class="form-control" readonly="readonly">
			</div>
		</div>
		
		<div id="voltarTelaBottom" class="row" style="display:none;">
			<div class="row">
				<br><br><br>
			</div>
			<div class="col-md-2 " align="left">
				<button class="btn btn-primary fs-full-width" data-voltar_tela><span class="fluigicon fluigicon-login"></span>  Voltar a Tela de Pedidos</button>
			</div>
			<div class="col-md-8" align="left">
			 		&nbsp;
			</div>
		</div>
	</div>
	
	<div class="row">
		<br>
	</div>
	<div class="row">
		<br>
	</div>	
	<div class="row">
		<br>
	</div>
	
</div>

