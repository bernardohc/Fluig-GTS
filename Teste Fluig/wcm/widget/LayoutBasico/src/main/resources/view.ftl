<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
    data-params="MyWidget.instance({cor:'${cor!''}'})> 


    <!-- efetua a tradução do texto do objeto i18n -->	
    <h1>${i18n.getTranslation('hello.example.hello')}</h1>

    <form role="form">
        <div class="form-group col-md-3">
            <label for="text01">Click</label>
            <input type="text" class="form-control" id="text01" placeholder="">
            <div>
                <button type="button" class="btn btn-default" data-show-click>${i18n.getTranslation('hello.button.showMessage')}</button>
            </div>
        </div>
        <div class="form-group col-md-3">
            <label for="text02">Dbl CLick</label>
            <input type="text" class="form-control" id="text02" placeholder="">
            <div>
                <button type="button" class="btn btn-default" data-show-dblClick>${i18n.getTranslation('hello.button.showMessage')}</button>
            </div>            
        </div>
        <div class="form-group col-md-3">
            <label for="text03">Keypress</label>
            <input type="text" class="form-control" id="text03" placeholder="">
            <div>
                <button type="button" class="btn btn-default" data-show-keypress>${i18n.getTranslation('hello.button.showMessage')}</button>
            </div>            
        </div>
        <div class="form-group col-md-3">
            <label for="text04">Mouse Over</label>
            <input type="text" class="form-control" id="text04" placeholder="">
            <div>
                <button type="button" class="btn btn-default" data-show-mouseOver>${i18n.getTranslation('hello.button.showMessage')}</button>
            </div>            
        </div>
    </form>

    <div>
        <button type="button" class="btn btn-default" data-show-message>${i18n.getTranslation('hello.button.showMessage')}</button>
    </div>
    <br>
    <br>

    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title"><i class="flaticon flaticon-pin-map icon-md" aria-hidden="true"></i>Financeiro</h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="form-group col-md-10 col-md-offset-1">
                    <p style="color:${cor!''}">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac enim sed tortor egestas elementum. Etiam nec sodales odio. Nunc eget erat porta, aliquam ipsum eget, auctor risus. 
                        Aenean auctor non nulla vitae consectetur. Curabitur in purus sapien. Vivamus erat ante, posuere nec pellentesque quis, mattis at arcu.
                         Nam eleifend magna quis sem malesuada, eu ullamcorper lacus vehicula. Maecenas euismod diam dolor, id hendrerit ex feugiat id. Nunc rutrum ut augue nec lobortis. 
                         Integer ut ex at libero auctor vehicula. Suspendisse nec viverra nibh. Ut varius massa aliquam venenatis sodales. Nulla tincidunt dolor at mi fermentum viverra ac quis orci. 
                         Cras at purus ac odio rhoncus pharetra. Quisque fermentum, sapien vel eleifend porta, enim massa cursus libero, id lacinia est nisl a odio. 
                    </p>
                </div>
            </div>
        </div>
    </div>


    <div id='helloMessage_${instanceId}'>
    </div>
    

</div>
