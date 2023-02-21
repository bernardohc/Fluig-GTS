<#import "/wcm.ftl" as wcm/>
<@wcm.header authenticated="true"/>
<!-- WCM Wrapper content -->
<div class="wcm-wrapper-content">

    <@wcm.menu />

    <!-- Wrapper -->
    <div class="wcm-all-content">
        <div id="wcm-content" class="clearfix wcm-background">

            <!-- Your content here -->
            <body>
                <div class="fluig-style-guide">
                    <div class="container">
                        <div class="jumbotron">
                            <h1>Hello World</h1>
                            <p> </p>
                        </div>
                            <div class="row">
                                <div class="col-md-12 col-lg-12">
                                    <h2>${i18n.getTranslation('Titulo')}</h2>
                                    <div class="editable-slot slotfull layout-1-1" id="slotContainer001">
                                        <@wcm.renderSlot id="Slot001" decorator="false" editableSlot="true" />
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </body
        
            <#--  <@wcm.footer layoutuserlabel="wcm.layoutdefault.user"/>  -->
        </div>
    </div>
</div>