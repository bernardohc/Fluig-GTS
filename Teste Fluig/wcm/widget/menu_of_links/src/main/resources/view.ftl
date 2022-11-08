<script src="/webdesk/vcXMLRPC.js"></script>
<script src="/webdesk/vcXMLRPC.js"></script>
<script src="/menuoflinks/resources/js/bootstrap-select.min.js"></script>
<script src="/menuoflinks/resources/js/menu_of_links.js"></script>

<!-- cria uma div para a classe wcm-widget-class -->
<div class="fluig-style-guide wcm-widget-class super-widget"
	id="menu_of_links_${instanceId}"
    data-params="menu_of_links.instance({instanceId: '${instanceId!}', menuIcon: '${menuIcon!'fluigicon-plus'}', menuColor: '${menuColor!'#e74c3c'}', fontColor: '${fontColor!'#ffffff'}', targetLink: '${targetLink!'_self'}', viewMode: true})">
	
	<ol class="breadcrumb">
		<li>${i18n.getTranslation('view.breadcrumb.title')}</li>
	</ol>
	
	<div class="panel-group" id="menu_accordion"></div>
</div>
