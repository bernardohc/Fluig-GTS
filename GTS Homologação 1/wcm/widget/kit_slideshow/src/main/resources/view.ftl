<#attempt>
    <#assign parameters = "{widgetVersion : '${applicationVersion!}', instanceId: '${instanceId!}', slideShowTitle: '${slideShowTitle!}', sourceType: '${sourceType!}', instagramTargetAccount: '${instagramTargetAccount!}', instagramTargetAccountID: '${instagramTargetAccountID!}', applicationSourceClientID: '${applicationSourceClientID!}', fluigDirectoryName: '${fluigDirectoryName!}', fluigDirectoryID: '${fluigDirectoryID!}', showImageTitle: '${showImageTitle!}', autoSize: '${autoSize!'false'}', resize: '${resize!'false'}'}"?html>
    <div id="SlideShow_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="SlideShow.instance(${parameters})" style="margin-top: 30px;">
        <script type="text/template" class="template_slideshow">
            <ul id="photoList_${instanceId}"></ul>
        </script>
    </div>
    <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<#recover>
	<#include "/social_error.ftl">
</#attempt>