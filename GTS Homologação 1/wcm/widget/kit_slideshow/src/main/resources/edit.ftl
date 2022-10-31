<#assign parameters = "{sourceType: '${sourceType!}', instanceId: '${instanceId!}', instagramTargetAccountID: '${instagramTargetAccountID!}', fluigDirectoryID: '${fluigDirectoryID!}', instagramTargetAccount: '${instagramTargetAccount!}', instagramTargetAccountID: '${instagramTargetAccountID!}', applicationSourceClientID: '${applicationSourceClientID!}', fluigDirectoryName: '${fluigDirectoryName!}', fluigDirectoryID: '${fluigDirectoryID!}'}"?html>
<div id="SlideShow_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="SlideShow.instance(${parameters})">
    <input type="hidden" id="sourceTypeEdit_${instanceId}" value="${sourceType!}"/>
    <form role="form" id="editForm_${instanceId}" name="editForm_${instanceId}" class="fs-sm-space">
        <div class="dropdown">
            <h3>${i18n.getTranslation('kit_slideshow.edit.title')}</h3>
            <button class="btn btn-default dropdown-toggle" type="button"
                    id="sourceTypeButton_${instanceId}" data-toggle="dropdown">
            </button>
            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                <li data-option-instagram role="presentation">
                    <a role="menuitem" tabindex="-1" href="#">${i18n.getTranslation('kit_slideshow.source.instagram')}</a>
                </li>
                <li data-option-fluigdir role="presentation">
                    <a role="menuitem" tabindex="-1" href="#">${i18n.getTranslation('kit_slideshow.source.fluigdir')}</a>
                </li>
            </ul>
        </div>
        <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" <#if autoSize! == 'true'>checked</#if> id="autoSizeEdit_${instanceId}"> ${i18n.getTranslation('kit_slideshow.edit.autoSize')}
                </label>
            </div>
        </div>
        <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" <#if resize! == 'true'>checked</#if> id="resizeEdit_${instanceId}"> ${i18n.getTranslation('kit_slideshow.edit.resize')}
                </label>
            </div>
        </div>
        <div id="formInstagram_${instanceId}">
            <div class="form-group">
            ${i18n.getTranslation('kit_slideshow.edit.configuration.instagram')}
            </div>
            <div class="form-group">
                <button class="btn btn-default" data-addnew-clientid>
                    ${i18n.getTranslation('kit_slideshow.edit.addnew.source.clientid')}
                </button>

            </div>
        </div>
        <div id="formFluigDir_${instanceId}">
            <div class="form-group">
                <label for="fluigDirectoryNameEdit_${instanceId}">${i18n.getTranslation('kit_slideshow.edit.fluigdirectory')}</label>
                <input type="text" READONLY class="form-control" id="fluigDirectoryNameEdit_${instanceId}"
                       value="${fluigDirectoryName!}"/>
                <input type="hidden" id="fluigDirectoryIDEdit_${instanceId}" value="${fluigDirectoryID!}"/>
                <br>
                <button class="btn btn-primary" data-find-fluigdir>
                    ${i18n.getTranslation('kit_slideshow.source.ecmdir')}
                </button>
                <div class="form-group">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" class="fs-display-none" <#if showImageTitle! == 'true'>checked</#if> id="showImageTitleEdit_${instanceId}"> ${i18n.getTranslation('kit_slideshow.edit.showTitles')}
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div>
        	<div class="text-right">
	            <button type="submit" class="btn btn-primary" data-save-preferences>
	                ${i18n.getTranslation('kit_slideshow.edit.savepref')}
	            </button>
            </div>
        </div>
    </form>
</div>