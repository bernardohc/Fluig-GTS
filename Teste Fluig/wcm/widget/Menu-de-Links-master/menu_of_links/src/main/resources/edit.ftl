<#-- cria uma div para a classe wcm-widget-class -->
<div class="wcm-widget-class super-widget fluig-style-guide edit"
    id="menu_of_links_${instanceId}"
    data-params="menu_of_links.instance({instanceId: '${instanceId!}', menuIcon: '${menuIcon!'fluigicon-plus'}', editMode: true})">
	
	<div class="form-group">
		<label>${i18n.getTranslation('edit.form.menucolor.legend')}</label>
		<input type="color" name="menu-color" id="menu-color" class="form-control" value="${menuColor!'#e74c3c'}" />
		<p class="help-block">${i18n.getTranslation('edit.form.helpblock')}</p>
	</div>
	
	<div class="form-group">
		<label>${i18n.getTranslation('edit.form.fontcolor.legend')}</label>
		<input type="color" name="font-color" id="font-color" class="form-control" value="${fontColor!'#ffffff'}" />
		<p class="help-block">${i18n.getTranslation('edit.form.helpblock')}</p>
	</div>
	
	<div class="form-group">
		<label>${i18n.getTranslation('edit.form.menu.icon.legend')}</label>
		<select name="menu-icon" id="menu-icon" class="selectpicker" data-width="100%"></select>
	</div>
		
	<div class="checkbox">
		<label>
			<input type="checkbox" name="targetLink" id="targetLink" <#if '${targetLink!}' == "_blank">checked="checked"</#if> /> 
			${i18n.getTranslation('edit.form.link.legend')}
		</label>		
	</div>
	
	<div class="form-group">
		<button class="btn btn-primary" data-save>${i18n.getTranslation('edit.form.save')}</button>
	</div>
</div>