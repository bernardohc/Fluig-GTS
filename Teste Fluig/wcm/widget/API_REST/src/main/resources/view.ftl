<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
     data-params="HelloWorld.instance({message: 'Hello world'})">

    <!-- efetua a tradução do texto do objeto i18n -->	
    <h1>${i18n.getTranslation('hello.example.hello')}</h1>

    <div class="panel panel-default">
	    <div class="panel-heading">LISTA DIRETÓRIOS</div>
		    <div class="panel-body">
                <div class="col-md-12">
                    <select name="lista_diretorios_${instanceId}" id="lista_diretorios_${instanceId}" class="form-control" data-carregaDiretorio>
                        <option value="">Selecione...</option>
                    </select>
                </div>
			     <div class="col-md-12">
			    	<ul id="relacionar_diretorios_${instanceId}" class="list-group">
			    		<li  class="list-group-item active">
			    			Diretorios encontrados
			    			<span id="bagde_diretorios_${instanceId}" class="badge badge-warning">0</span>
			    		</li>
			    	</ul>
			    </div>	 
            </div>   
        </div>
    </div>  

</div>
