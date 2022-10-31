<div id="ConsultaDespesas_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
     data-params="ConsultaDespesas.instance({viewMode: true})">

   <!-- Cabeçalho de Consulta Despesas -->
    <div class="bs-example" id="divCabConsultaDespesas" style="display:none;">
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
							<div class="col-md-2 col-md-offset-1 " align="left">
								<div class="input-grup">
									<label for="conNumFluig">Nº Fluig</label>
									<input type="text" name="conNumFluig" id="conNumFluig" class="form-control" data-consulta_num_fluig />
								</div>
							</div>
							<div class="col-md-2 " align="left">
							<div class="input-grup">
									<label for="conNumNotalFiscal">Nº Nota Fiscal</label>
									<input type="text" name="conNumNotalFiscal" id="conNumNotalFiscal" class="form-control" data-consulta_num_nota />
								</div>
							</div>
							<div class="col-md-2 col-xs-6" align="left">
								<label for="conDataEmissaoNota">Data Emissão da Nota</label>
								<div class="input-group">
									<input type="text" name="conDataEmissaoNota" id="conDataEmissaoNota" class="form-control" />				
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
							<div class="col-md-4 col-md-offset-4 col-xs-8" style="text-align:center">
								<button class="btn btn-primary fs-full-width" data-consultar_despesas>Consultar Despesas<span class="fluigicon fluigicon-filter "></span></button>
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
		
		<div id="tabelaDespesas" class="row" style="display:none;">
			<div style="overflow-x: auto; width: 100%" class="col-md-12 scrooltable" data-isolated-scroll>
				<div id="tabelaDespesas_${instanceId}"></div>
				<br>
			</div>
		</div>
	</div>
    

</div>
