
<#import "/wcm.ftl" as wcm/>
<#if pageRender.isEditMode()=true>
	<@wcm.header authenticated="true"/>
</#if>
<!-- WCM Wrapper content -->
<div class="wcm-wrapper-content">
	<#if pageRender.isEditMode()=true>
    	<@wcm.menu />
	</#if>
    <!-- Wrapper -->
    <#if pageRender.isEditMode()=true>
   		<div class="wcm-all-content" >
    <#else>
    	<div class="wcm-all-content" style="padding: 0px 0px 0px 0px !important;">
    </#if>
        <div id="wcm-content" style="padding: 0px 0px 0px 0px !important;"> 

            <!-- Your content here -->
			<#if pageRender.isEditMode()=true>
			<div name="formatBar" id="formatBar"></div>
			<div id="edicaoPagina" class="clearfix">
				<#else>
				<div id="visualizacaoPagina" class="clearfix">
					</#if>

					<!-- Slot 1 -->
					<div id="divSlot1" class="editable-slot slotfull layout-1-1">
						<@wcm.renderSlot id="SlotA" decorator="false" editableSlot="true" />
					</div>
  					
				</div>
			</div>
			<#if pageRender.isEditMode()=true>	
            	<@wcm.footer layoutuserlabel="wcm.layoutdefault.user" />
            </#if>
        </div>
    </div>
</div>