<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
     data-params="HelloWorld.instance({message: 'Hello world'})">

   
	
	<div id="formPrincipal">
		<div class="form-group">
			<label for="nome">Nome</label>
			<input type="text" class="form-control" name="nome" id="nome">
		</div>
		<div class="form-group">
			<label for="email">E-mail</label>
			<input type="mail" class="form-control" name="email" id="email">
		</div>
		<div class="form-group">
			<label for="perfil">Perfil</label>
			<select name="perfil" class="form-control" id="perfil">
				<option value="Desenvolvedor">Desenvolvedor</option>
				<option value="Redator">Redator</option>
				<option value="Analista de Negócio">Analista de Negócio</option>
				<option value="Produtor de Conteúdo">Produtor de Conteúdo</option>
			</select>
		</div>	
		<div class="form-group">
			<label for="linkedin">LinkedIn</label>
			<input type="text" class="form-control" name="linkedin" id="linkedin">
		</div>	
	</div>

    <div>
        <button type="enviar" class="btn btn-primary" data-show-message>Enviar</button>
    </div>
</div>
<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>