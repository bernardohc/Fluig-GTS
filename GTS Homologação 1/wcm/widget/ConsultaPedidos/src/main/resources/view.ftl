<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<div id="body_${instanceId}">
<div id="ConsultaPedidos_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
     data-params="ConsultaPedidos.instance({viewMode: true})">
	
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
						<div class="row">
							<div id="divZoomRevendedor" class="col-md-4 col-md-offset-1" style='display:none' >
								<label for="txtNome">Revenda</label>
								<div class="input-group">
									<input type="hidden" name="codRevenda" id="codRevenda" class="form-control" readonly>
									<input type="hidden" name="lojaRevenda" id="lojaRevenda"  class="form-control" readonly>
									<input type="text" name="nomeRevenda" id="nomeRevenda"  class="form-control" >
									<span class="input-group-addon group-zoom no-view zoom-click btn-primary" data-event="selecionaRevendeda">
							    		<span class="fluigicon fluigicon-zoom-in "></span>
							    	</span>
								</div>
							</div>
							<div id="divNumPedido" class="col-md-1 " align="left">
								<div class="input-grup">
									<label for="conNumPedido">Nº Pedido</label>
									<input type="text" name="conNumPedido" id="conNumPedido" class="form-control"  >
								</div>
							</div>
							
							<div id="divIdFluig" class="col-md-1 " align="left">
								<div class="input-grup">
									<label for="conNumPedido">Id Fluig</label>
									<input type="text" name="conIdFluig" id="conIdFluig" class="form-control"  >
								</div>
							</div>
							
							<div class="col-md-2  " align="left">
								<label for="conDataEmissaoDe">Data Emissão de</label>
								<div class="input-group">
									<input type="text" name="conDataEmissaoDe" id="conDataEmissaoDe" class="form-control" >				
									<span class="input-group-addon">
				                           <span class="fluigicon fluigicon-calendar"></span>
				                    </span>
								</div>
							</div>
							<div class="col-md-2" align="left">
								<label for="conDataEmissaoAte">Data Emissão Até</label>
								<div class="input-group">
									<input type="text" name="conDataEmissaoAte" id="conDataEmissaoAte" class="form-control" >					
									<span class="input-group-addon">
				                           <span class="fluigicon fluigicon-calendar"></span>
				                       </span>
								</div>
							</div>
						</div>
					
						<div class="row">
							<br>
						</div>
						<div class="row">
							<div class="col-md-4 col-md-offset-4" style="text-align:center">
								<button class="btn btn-primary fs-full-width" data-pesquisar_pedidos> Pesquisar Pedidos<span class="fluigicon fluigicon-filter "></span></button>
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
			<div class="col-md-12" >
				<p style="text-align:center">&nbsp;&nbsp;<img src='/ConsultaPedidos/resources/images/2verde.png' height='30' width='30'/>
					<strong>- Recebido &nbsp;</strong> 
					<img src='/ConsultaPedidos/resources/images/3amarelo.png' height='30' width='30'/>
					<strong>- Em Separação &nbsp;</strong> 
					<img src='/ConsultaPedidos/resources/images/1vermelho.png'  height='30' width='30' />
					<strong>- Faturado</strong>
					<img src='/ConsultaPedidos/resources/images/4azul.png'  height='30' width='30' />
					<strong>- Bloqueado</strong> 
				</p>
			</div>
		</div>
		
		<div class="row">
			<div class="col-md-12 scrooltable" id="target" data-isolated-scroll>
				<div id="tabelaPedidos_${instanceId}"></div>
				<br>
			</div>
		</div>
	</div>
	
	<div id='dadosPedido' style="display:none;">
		
		<div class="row">
			<br>
		</div>
		<div class="row">
			<div class="col-md-2 " align="left">
				<button class="btn btn-primary fs-full-width" data-voltar_tela><span class="fluigicon fluigicon-login"></span>  Voltar a Tela de Pedidos</button>
			</div>
			<div id="divImprimir" class="col-md-2 col-md-offset-7" align="left" style="display:none;">
				<button class="btn btn-default fs-full-width" data-imprimir><span class="fluigicon fluigicon-print"></span>  Imprimir</button>
			</div>			
		</div>
			
		<div class="row">
			<br>
		</div>
			
		<div class="row">
			<div class="col-md-1 col-md-offset-1" align="left">
				<div class="input-grup">
					<label for="visNumPedido">Nº Pedido</label>
					<input type="text" name="visNumPedido" id="visNumPedido" class="form-control" readonly>
					<input  type="hidden"  name="visFilialPedido" id="visFilialPedido">
				</div>
			</div>
			<div class="col-md-1 " align="left">
				<div class="input-grup">
					<label for="visIdFluig">Id Fluig</label>
					<input type="text" name="visIdFluig" id="visIdFluig" class="form-control" readonly>
				</div>
			</div>
			
			<div class="col-md-3" align="left">
				<div class="input-grup">
					<label for="visTipoPedido">Tipo Pedido</label>
					<input type="text" name="visTipoPedido" id="visTipoPedido" class="form-control" readonly>
				</div>
			</div>
			
			<div class="col-md-5 " align="left">
				<div class="input-grup">
					<label for="visRevenda">Revendedor</label>
					<input type="text" name="visRevenda" id="visRevenda" class="form-control" readonly>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-2 col-md-offset-1" align="left">
				<div class="input-grup">
					<label for="visDataEmissao">Data Emissão</label>
					<input type="text" name="visDataEmissao" id="visDataEmissao" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2 " align="left">
				<div class="input-grup">
					<label for="visCondPgto">Condição de Pagamento</label>
					<input type="text" name="visCondPgto" id="visCondPgto" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2 " align="left">
				<div class="input-grup">
					<label for="visTipoFrete">Tipo Frete</label>
					<input type="text" name="visTipoFrete" id="visTipoFrete" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2" align="left">
				<div class="input-grup">
					<label for="visValFrete">Valor Frete</label>
					<input type="text" name="visValFrete" id="visValFrete" class="form-control" readonly>
				</div>
			</div>
			<div class="col-md-2" align="left">
				<div class="input-grup">
					<label for="visStatus">Status</label>
					<input type="text" name="visStatus" id="visStatus" class="form-control" readonly>
				</div>
			</div>
		</div>	
		
		<div class="row">
			<div id="divNumNF1" class="col-md-2 col-md-offset-1" align="left">
				<div class="input-grup">
					<label for="visNumNota1">Número Nota</label>
					<input type="text" name="visNumNota1" id="visNumNota1" class="form-control" readonly>
				</div>
			</div>
			<div id="divDtEmissaoNF1" class="col-md-2 " align="left" >
				<div class="input-grup">
					<label for="visDataEmissaoNF1">Data Emissão NF</label>
					<input type="text" name="visDataEmissaoNF1" id="visDataEmissaoNF1" class="form-control" readonly>
				</div>
			</div>
			<div id="divChaveNotaFiscal1" class="col-md-4" align="left" style="display:none;">
				<div class="input-grup">
					<label for="visChaveNota1">Chave Nota Fiscal</label>
					<input type="text" name="visChaveNota1" id="visChaveNota1" class="form-control" readonly>
				</div>
			</div>
		</div>
		
		<div class="row">
			<div id="divNumNF2" class="col-md-2 col-md-offset-1" align="left" style="display:none;">
				<div class="input-grup">
					<label for="visNumNota2">Número Nota</label>
					<input type="text" name="visNumNota2" id="visNumNota2" class="form-control" readonly>
				</div>
			</div>
			<div id="divDtEmissaoNF2" class="col-md-2 " align="left" style="display:none;">
				<div class="input-grup">
					<label for="visDataEmissaoNF2">Data Emissão NF</label>
					<input type="text" name="visDataEmissaoNF2" id="visDataEmissaoNF2" class="form-control" readonly>
				</div>
			</div>
			<div id="divChaveNotaFiscal2" class="col-md-4" align="left" style="display:none;">
				<div class="input-grup">
					<label for="visChaveNota2">Chave Nota Fiscal</label>
					<input type="text" name="visChaveNota2" id="visChaveNota2" class="form-control" readonly>
				</div>
			</div>
		</div>
		
		<div class="row">
			<div id="divNumNF2" class="col-md-2 col-md-offset-1" align="left" style="display:none;">
				<div class="input-grup">
					<label for="visNumNota3">Número Nota</label>
					<input type="text" name="visNumNota3" id="visNumNota3" class="form-control" readonly>
				</div>
			</div>
			<div id="divDtEmissaoNF3"  class="col-md-2 " align="left" style="display:none;">
				<div class="input-grup">
					<label for="visDataEmissaoNF3">Data Emissão NF</label>
					<input type="text" name="visDataEmissaoNF3" id="visDataEmissaoNF3" class="form-control" readonly>
				</div>
			</div>
			<div id="divChaveNotaFiscal3" class="col-md-4" align="left" style="display:none;">
				<div class="input-grup">
					<label for="visChaveNota3">Chave Nota Fiscal</label>
					<input type="text" name="visChaveNota3" id="visChaveNota3" class="form-control" readonly>
				</div>
			</div>
		</div>
		
		<!-- Tabela de Itens -->
		<div class="row">
			<div class="col-md-12 scrooltable" id="target" data-isolated-scroll>
				<div id="tabelaItensPedidoAdministrador_${instanceId}"></div>
			</div>
		</div>
		
		<div class="row">
			<div class="col-md-8 col-md-offset-2 scrooltable" id="target" data-isolated-scroll>
				<div id="tabelaItensPedidoBalconista_${instanceId}"></div>
			</div>
		</div>
		
		<div id="divTotais">
           	<div class="col-sm-12">
			    <div class="row">
			        <div class="col-md-6 col-md-offset-6" style="text-align:center">
			       		<h3 class="totais" ><strong>Totais</strong></h3>
			       		<hr />  
			        </div>
			    </div>
			</div>
           
           	<div class="col-sm-12">
				<div class="row">
					<div class="col-md-2 col-md-offset-6" align="left">
						<label for="visTotalIPI">IPI</label>
				      	<input type="text" name="visTotalIPI" id="visTotalIPI" class="form-control" readonly="readonly">
					</div>
					
					<div class="col-md-2" align="left">
						<label for="visTotalICMSRet">ICMS-ST</label>
				      	<input type="text" name="visTotalICMSRet" id="visTotalICMSRet" class="form-control" readonly="readonly">
					</div>
					
					<div class="col-md-2" align="left">
						<label for="totalPedido">Valor Total</label>
				      	<input type="text" name="visTotalPedido" id="visTotalPedido" class="form-control" readonly="readonly">
					</div>
				</div>
			</div>
		</div>	
		
		
		<div class="row">
			<div class="col-md-2" align="left">
				<button class="btn btn-primary fs-full-width" data-voltar_tela><span class="fluigicon fluigicon-login"></span> Voltar a Tela de Pedidos</button>
			</div>	
			<div class="col-md-8" align="left">
			 		&nbsp;
			</div>	
		</div>
	</div>
		
</div>
</div>