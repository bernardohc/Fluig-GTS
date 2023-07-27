var validafunctions = (function(){

	var theme = "smoothness";

	//var DEFAULT_CSS = new Array("/totvs/css/totvs-tdi-boot.css", "/totvs/bootstrap-3.2.0/css/bootstrap.css",  "/totvs/bootstrap-3.2.0/css/bootstrap-theme.css", "http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css", "/totvs/bootstrap-3.2.0/datapicker/css/bootstrap-datetimepicker.min.css");
	//var LIST_JS = new Array("/totvs/js/jqwidgets/jqxcore.js", "/totvs/js/jqwidgets/jqxtabs.js", "/totvs/js/jquery/jquery-ui-1.10.3/jquery-ui.js", "/totvs/js/jquery/jquery.price_format.1.8.js", "/totvs/js/jquery/jquery.maskedinput.min.js", "/totvs/bootstrap-3.2.0/js/bootstrap.js", "/totvs/bootstrap-3.2.0/datapicker/js/bootstrap-datetimepicker.min.js");

	//var DEFAULT_CSS = new Array("/totvs/css/totvs-tdi-boot.css", "/totvs/bootstrap-3.2.0/css/bootstrap.css",  "/totvs/bootstrap-3.2.0/css/bootstrap-theme.css", "http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css", "/totvs/bootstrap-3.2.0/datapicker/css/datepicker3.css");
	//var LIST_JS = new Array("/totvs/js/jqwidgets/jqxcore.js", "/totvs/js/jqwidgets/jqxtabs.js", "/totvs/js/jquery/jquery-ui-1.10.3/jquery-ui.js", "/totvs/js/jquery/jquery.price_format.1.8.js", "/totvs/js/jquery/jquery.maskedinput.min.js", "/totvs/bootstrap-3.2.0/js/bootstrap.js", "/totvs/bootstrap-3.2.0/datapicker/js/bootstrap-datepicker.js", "/totvs/bootstrap-3.2.0/datapicker/js/locales/bootstrap-datepicker.pt-BR.js");

	//var DEFAULT_CSS = ["/totvs/css/totvs-tdi-boot.css"];
	//var LIST_JS = ["/totvs/js/jqwidgets/jqxcore.js", "/totvs/js/jqwidgets/jqxtabs.js", "/totvs/js/jquery/jquery-ui-1.11.4/jquery-ui.min.js", "/totvs/js/jquery/jquery.price_format.2.0.min.js", "/totvs/js/jquery/jquery.maskedinput.min.js"];

	var js_loaded = [];
	var saveClick = null;
	var sendClick = null;
	var requireds = [];
	var zooms = [];
	var datasets = null;

	return {
		start: function() {
			validafunctions.addTitle();
			validafunctions.setupButtonsTotvs();
			validafunctions.setupDataAttributes();
			validafunctions.loadDefaults();
			validafunctions.setReadOnlyDisabledFields();
			validafunctions.datasets = $.parseJSON( '[{"id": "centroCusto", "label": "Código,Descrição", "fields": "codigo,descricao", "dataset": "ds_centro_custo_maxime" },{"id": "colleague", "label": "Matricula,Nome", "fields": "colleagueId,colleagueName", "dataset": "colleague" },{"id": "pais", "label": "Código,Nome", "fields": "codigo,descricao", "dataset": "ds_pais_maxime" },{"id": "assunto", "label": "Código,Descrição,Obrigatório", "fields": "topicPK.topicId,description,mandatory", "dataset": "topic" }]');
		},
		ismobile: function() {
			if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            	    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
				return true;
			}
			return false;
		},
		addTitle: function() {
			validafunctions.setTitulo($(document).find("title").text());
		},
		loadDefaults: function() {
			for (var i=0;i<DEFAULT_CSS.length;i++) {
				var f = DEFAULT_CSS[i];
				f = f.replace("<theme>", theme);
				validafunctions.loadFile(f, "css");
			}
		},
		dataEnabled: function() {
			var e = $(this).data("enabled");
			if (e !== undefined) {
				var a;
				e = new String(e);
				if (e.indexOf(",") == -1) { a = new Array(e[0]); }
				else { a = e.split(","); }
			}
		},
		loadJs: function(index, type) {
			//var loaded = false;
			//for (var i=0;i<js_loaded.length;i++) {
			//	var j = js_loaded[i];
			//	if (j == index) { loaded = true; }
			//}
			//if (!loaded) {
				validafunctions.loadFile(LIST_JS[index], "js");
				js_loaded.push(index);
			//}
		},
		loadFile: function(file, type){
			var fileref = null;
			if (type == "js") {
				$.ajax({
		            url: file,
		            dataType: "script",
		            async: false
		        });
			} else if (type == "css"){
				fileref = document.createElement("link");
				fileref.setAttribute("rel", "stylesheet");
				fileref.setAttribute("type", "text/css");
				fileref.setAttribute("href", file);
			}
			if (fileref != null) {
				document.getElementsByTagName("head")[0].appendChild(fileref);
			}
		},
		setTitulo: function(titulo) {

			var html = '<div class="page-header">';
			if (validafunctions.ismobile()) {
				html += "<img src='http://fluig.totvs.com/totvs/images/mobile_logo.png' width='76' height='25' class='ui-btn-left' />";
				html += titulo;
			} else {
				html += "<a href='http://www.totvs.com.br' target='_blank'><img src='/totvs/images/company_logo.png' id='totvsLogo' alt='Totvs' title='Totvs' border='0' /></a>";
				html += '<h2 class="title">' + titulo + '</h2>';
			}
			html += '</div>';
			$(html).prependTo($("body"));
		},
		setTabsControl: function(id, size) {
			//validafunctions.loadJs(0);
			//validafunctions.loadJs(1);
			$("#" + id).jqxTabs({width: '98%', height: size, theme: theme, scrollable: true, scrollPosition: "both"});
		},
		setData: function(id, formato, desabilitarAnterior, desabilitarPosterior) {
//			validafunctions.loadJs(6);
//			validafunctions.loadJs(7);

			//if (formato == undefined || formato == null || formato == "") { formato = "dd/mm/yyyy"; }

			//var i = $("#" + id);
			
			var options = {
				    language: "pt-br",
				    showToday: true,
				    };
			
			return FLUIGC.calendar("#" + id, options);

			/*var div = i.parent().html();
			var html = '<div class="input-group date" id="date_' + id + '">' + div + '<span class="input-group-addon"><span class="fluigicon fluigicon-calendar"></span></span></div>';

			i.parent().html(html);*/

			

//			$('.input-group.date').datepicker(options);
		},
		setNumero: function(id, decimals, negatives) {
			//validafunctions.loadJs(3);
			$("#" + id).priceFormat({
				clearPrefix: true,
				prefix: '',
			    centsSeparator: ',',
			    thousandsSeparator: '.',
			    centsLimit: decimals,
			    allowNegative: negatives
			});
		},
		soNumero: function(id, decimals, negatives) {
			//validafunctions.loadJs(3);
			$("#" + id).priceFormat({
				clearPrefix: true,
				prefix: '',
			    centsSeparator: '',
			    thousandsSeparator: '',
			    centsLimit: decimals,
			    allowNegative: negatives
			});
		},
		setMoeda: function(id, decimals, negatives , prefixo) {
			//validafunctions.loadJs(3);
			$("#" + id).priceFormat({
				prefix: prefixo,
			    centsSeparator: ',',
			    thousandsSeparator: '.',
			    centsLimit: decimals,
			    allowNegative: negatives
			});
		},
		moedanoprefix: function(id, decimals, negatives) {
			//validafunctions.loadJs(3);
			$("#" + id).priceFormat({
			    centsSeparator: ',',
			    thousandsSeparator: '.',
			    centsLimit: decimals,
			    allowNegative: negatives
			});
		},
		setPercentual: function(id, decimals, negatives) {
			//validafunctions.loadJs(3);
			$("#" + id).priceFormat({
				clearPrefix: true,
				prefix: '',
				suffix: '%',
			    centsSeparator: ',',
			    thousandsSeparator: '.',
			    centsLimit: decimals,
			    allowNegative: negatives
			});
		},
		somenteNumeros: function(id){
	        var er = /[^0-9.]/;
	        er.lastIndex = 0;
	        var campo = num;
	        if (er.test(campo.value)) {
	        	campo.value = "";
	        }
		},
		setRequired: function(id) {
			$("label[for=" + id + "]").addClass("required");
		},
		setUnrequired: function(id) {
			$("label[for=" + id + "]").removeClass("required");
		},
		setReadOnlyField: function(id) {
			var f = document.getElementById(id);
			if (f != null && f != undefined) {
				$("#" + id).addClass("required");
				f.readOnly = true;
			}
		},
		setWriteField: function(id) {
			var f = document.getElementById(id);
			if (f != null && f != undefined) {
				$("#" + id).removeClass("required");
				f.readOnly = false;
			}
		},
		setReadOnlyDisabledFields: function() {
			$("span").each(function(index) {
				var id = $(this).attr("id");
				if (id != undefined && id.substring(0,1) == "_") {
					$(this).attr("readonly", true);
				}
			});

			$("div").each(function(index) {
				var id = $(this).attr("id");
				if (id != undefined && id.substring(0,1) == "_") {
					$(this).attr("readonly", true);
				}
			});
		},
		setCep: function(id){
			//validafunctions.loadJs(4);
			$("#" + id).mask('99999-999');
			//$("#" + id).addClass("cep");
		},
		setTelefone: function(id){
			//validafunctions.loadJs(4);
			$("#" + id).mask("(99) 9999-999999");
			$("#" + id).focusout(function(){
			    var phone, element;
			    element = $(this);
			    element.unmask();
			    phone = element.val().replace(/\D/g, '');
			    if(phone.length > 10) {
			        element.mask("(99) 99999-99999");
			    } else {
			        element.mask("(99) 9999-999999");
			    }
			}).trigger('focusout');
			$("#" + id).addClass("telefone");
		},
		setFone: function(id){
			var val = $("#"+id).val();

			if(val.length >= 9){
				$("#"+id).mask("90000-0000");
			}else{
				$("#"+id).mask("0000-0000");
			}
			
		},
		setCpf: function(id){
			//validafunctions.loadJs(4);
			$("#" + id).mask("999.999.999-99");
			//$("#" + id).addClass("cpf");
		},
		setCnpj: function(id){
			//validafunctions.loadJs(4);
			$("#" + id).mask("99.999.999/9999-99");
			//$("#" + id).addClass("cnpj");
		},
		setHora: function(id){
			//validafunctions.loadJs(4);
			$("#" + id).mask('99:99');
			$("#" + id).addClass("hora");
		},
		setHoraSegundo: function(id){
			//validafunctions.loadJs(4);
			$("#" + id).mask('99:99:99');
		},
		setRg: function(id) {
			//validafunctions.loadJs(4);
			$("#" + id).mask("?99.999.999-9");
			$("#" + id).addClass("rg");
		},
		getFloatValue: function(id) {
			var v = $("#" + id).val();
			var s = v.replace(/[^\d,-]/g, '');
			s = s.replace(",", ".");
			return parseFloat(s);
		},
		getPosicaoFilho: function(id) {
			return parseInt(id.substring(id.indexOf("___") + 3));
		},
		hideLoading: function() {
			$("#loadingTotvs").hide();
			$(".totvs-overlay").hide();
		},
		showLoading: function(texto, onReady) {

			if ($("#divLoading").length == 0) {
				var html = '<div id="loadingTotvs">';
				html += '<div id="divLoading"  style="width: 250px; height: 60px; margin-right: auto; margin-left: auto; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; -webkit-box-shadow: black 0px 1px 10px; box-shadow: black 0px 1px 10px; position: relative;  top: 185px; background-color: rgb(233, 234, 240);">';
				html += '<div style="text-shadow: 1px 1px white;padding:10px;">' + texto + '</div>';
				html += '<img src="/portal/resources/images/rel_interstitial_loading.gif">';
				html += '</div>';
				html += '</div>';
				html += '<div class="totvs-overlay"></div>';
				$('body').append(html);
			}

			$("#loadingTotvs").show();
			$(".totvs-overlay").show();

			setTimeout(onReady, 100);

		},
		getZoom: function(id) {
			for (var x=0;x<zooms.length;x++) {
				var z = zooms[x];
				if (z.id == id) { return x; }
			}
			return -1;
		},
		setZoom: function(z) {
			var b = '<button type="button" class="btn btn-default btn-zoom" data-id="' + z.id + '"><span class="fluigicon fluigicon-zoom-in"></span></button>';
			var c = '<button type="button" class="btn btn-default btn-clear" data-id="' + z.id + '"><span class="fluigicon fluigicon-remove-circle"></span></button>';
			if (z.clean) {
				$("#" + z.images).after(c);
				$(".btn-clear").click(function(event){
					validafunctions.clean($(event.currentTarget).data("id"));
				});
			}
			$("#" + z.images).after(b);

			var list = z.input.split(",");
			for (var y=0;y<list.length;y++) {
				$("#" + list[y]).attr("readonly", true);
			}

			$(".btn-zoom").click(function(event){
				validafunctions.openZoom($(event.currentTarget).data("id"));
			});
		},
		openZoom: function(id) {
			var ds = null;
			for (var i=0;i<datasets.length;i++) {
				ds = datasets[i];
				if (id == ds.id) { break; }
				else { ds = null; }
			}

			if (ds != null) {
				var l = ds.label.split(",");
				var f = ds.fields.split(",");

				var df = "";
				var rf = "";
				for (var x=0;x<zooms.length;x++) {
					var z = zooms[x];
					if (z.id == ds.id) {
						rf = z.field;
						var list = z.show.split(",");
						for (var m=0;m<list.length;m++) {
							for (var y=0;y<f.length;y++) {
								if (list[m] == f[y]) {
									if (df == "") { df = f[y] + "," + l[y]; }
									else { df +=  "," + f[y] + "," + l[y];}
								}
							}
						}
					}
				}
				window.open("/webdesk/zoom.jsp?datasetId=" + ds.dataset + "&dataFields=" + df + "&resultFields=" + rf + "&title=Zoom&type=" + id, "zoom", "status=no,scrollbars=no,width=600,height=400,top=0,left=0");
			}
		},
		setSelectedZoomItem: function(selectedItem) {
			var tipo = selectedItem.type;
			for (var x=0;x<zooms.length;x++) {
				var z = zooms[x];
				if (z.id == tipo) {
					var list = z.input.split(",");
					var f = z.field.split(",");
					for (var y=0;y<list.length;y++) {
						$("#" + list[y]).val(selectedItem[f[y]]);
					}
					if (z.onready != undefined) {
						if (eval("typeof " + z.onready) == 'function') { window[z.onready](selectedItem); }
					}
				}
			}
		},
		clean: function(id) {
			for (var x=0;x<zooms.length;x++) {
				var z = zooms[x];
				if (z.id == id) {
					var list = z.input.split(",");
					for (var y=0;y<list.length;y++) {
						$("#" + list[y]).val("");
					}
				}
			}
		},
		setupButtonsTotvs: function() {
		/*	var w = window.parent.document.body;

			$(w).find("#workflowView-cardViewer").css("border", "0px");

			$(w).find("#btnSaveTotvs").remove();
			$(w).find("#btnSendTotvs").remove();

			$(w).find("#btnSave").hide();
			$(w).find("#btnSend").hide();

			var html = '<div><input type="button" name="btnSaveTotvs" id="btnSaveTotvs" value="Salvar"><input type="button" name="btnSendTotvs" id="btnSendTotvs" value="Enviar"></div>';
			$(w).find("#colleague").after(html);

			var save = $(w).find("#btnSaveTotvs");
			var send = $(w).find("#btnSendTotvs");

			save.click(function () {
				if (validateRequireds()) { return; }
				$(w).find("#btnSave").click();
			});

			send.click(function () {
				if (validateRequireds()) { return; }
				$(w).find("#btnSend").click();
			});*/
		},
		validateRequireds: function() {
			$("div").removeClass("has-error");

			for (var i=0;i<requireds.length;i++) {
				if ($("#" + requireds[i]).val() == "") {
					var label = $("label[for='"+ requireds[i] +"']");
					alert("Campo [" + label.html() + "] é obrigatório");

					$("#" + requireds[i]).parent().addClass("has-error");
					$("#" + requireds[i]).focus();

					return true;
				}
			}
		},
		setupDataAttributes: function() {
			$("*").each(function(){
				if ($(this).data("hidden") != undefined) {
					var act = $(this).data("hidden");
					var list = new Array();

					if ($.isNumeric(act)) { list.push(act); }
					else { list = act.split(",") }

					var hide = false;
					for (var i=0;i<list.length;i++) {
						if (atividade == list[i]) {
							hide = true;
							break;
						}
					}

					if (hide) { $(this).hide(); }

				}
			});

			$("form :input").each(function(){
				if ($(this).data("required") == true) {
					var label = $("label[for='"+ $(this).attr('name')+"']");
					label.addClass("required");
					requireds.push($(this).attr('name'));
				}
				if ($(this).data("type") == "cpf") { validafunctions.setCpf($(this).attr("id")); }
				else if ($(this).data("type") == "date") {
					var f = "";
					if ($(this).data("date-format") != undefined) { f = $(this).data("date-format"); }
					validafunctions.setData($(this).attr("id"), f);
				}
				else if ($(this).data("type") == "cep") { validafunctions.setCep($(this).attr("id")); }
				else if ($(this).data("type") == "telefone") { validafunctions.setTelefone($(this).attr("id")); }
				else if ($(this).data("type") == "cnpj") { validafunctions.setCnpj($(this).attr("id")); }
				else if ($(this).data("type") == "hora") { validafunctions.setHora($(this).attr("id")); }
				else if ($(this).data("type") == "horasegundo") { validafunctions.setHoraSegundo($(this).attr("id")); }
				else if ($(this).data("type") == "rg") { validafunctions.setRg($(this).attr("id")); }
				else if ($(this).data("type") == "inteiro") {
					var d = 2;
					if ($(this).data("decimals") != undefined) { d = +($(this).data("decimals")); }
					var n = false;
					if ($(this).data("negative") != undefined) { n = $(this).data("negative"); }
					validafunctions.setNumero($(this).attr("id"), d, n);
				} else if ($(this).data("type") == "moeda") {
					var d = 2;
					if ($(this).data("decimals") != undefined) { d = +($(this).data("decimals")); }
					var n = false;
					if ($(this).data("negative") != undefined) { n = $(this).data("negative"); }
					validafunctions.setMoeda($(this).attr("id"), d, n);
				} else if ($(this).data("type") == "percentual") {
					var d = 2;
					if ($(this).data("decimals") != undefined) { d = +($(this).data("decimals")); }
					var n = false;
					if ($(this).data("negative") != undefined) { n = $(this).data("negative"); }
					validafunctions.setPercentual($(this).attr("id"), d, n);
				}

				if ($(this).data("enabled") != undefined) {
					var act = $(this).data("enabled");
					var list = new Array();

					if ($.isNumeric(act)) { list.push(act); }
					else { list = act.split(",") }

					var disabled = true;
					for (var i=0;i<list.length;i++) {
						if (atividade == list[i]) {
							disabled = false;
							break;
						}
					}
					if (disabled) {
						if ($(this).is("button")) { $(this).hide(); }
						else if ($(this).is("input[type=text]")) { $(this).attr("readonly", true); }
					}

				}
				if ($(this).data("zoom-id") != undefined) {
					var index = validafunctions.getZoom($(this).data("zoom-id"));
					var o;
					if (index == -1) {
						o = new Object();
						o.id = $(this).data("zoom-id");
					} else {
						o = zooms[index];
					}

					if (o.input == undefined) { o.input = $(this).attr("id"); }
					else { o.input += "," + $(this).attr("id"); }

					if ($(this).data("zoom-show") != undefined) {
						o.show = $(this).data("zoom-show");
						o.images = $(this).attr("id");
					}
					if ($(this).data("zoom-callback") != undefined) {
						o.onready = $(this).data("zoom-callback");
					}
					if ($(this).data("zoom-field") != undefined) {
						if (o.field == undefined) { o.field = $(this).data("zoom-field"); }
						else { o.field += "," + $(this).data("zoom-field"); }
					}
					if ($(this).data("clean") != undefined && $(this).data("clean") == true) {
						o.clean = true;
					}

					if (index == -1) { zooms.push(o); }
					else { zooms[index] = o; }
				}

			});

			for (var i=0;i<zooms.length;i++) {
				var z = zooms[i];
				validafunctions.setZoom(z);
			}
		},
		getAmbiente: function() {
		     var ds = DatasetFactory.getDataset("dsParamAmbFormWkf", null, null, null);
		     if (ds){
		          if (ds.values.length > 0){
		        	  return ds.values[0];
		          } else return "erro ao retornar dados de ambiente - nao retorou registro";
		     } else return "erro ao retornar dados de ambiente - retornou nulo";
		},
		getdatasetasync: function(name, fields, constraints, order, onready, loading) {
			var data = {
				name: name,
				fields: fields,
				constraints: constraints,
				order: order
			};
			
			var myloading = FLUIGC.loading(window);
			if (loading != undefined && loading != null && $.type(loading) == "string") {
				myloading = FLUIGC.loading("#" + loading);
			}
			
			myloading.show();

			var result;
			simpleAjaxAPI.Create({
				url: parentOBJ.ECM.restUrl + "dataset/datasets/",
				data: data,
				async: true,
				success: function(data) {
					result = data;
					myloading.hide();
					onready(result)
				},
				error: function(data) {
					FLUIGC.toast({ title: 'Erro:', message: data.responseText, type: 'danger' });
					myloading.hide();
					onready(null);
				}
			});
			
		},
		showerror: function(msg) {
			FLUIGC.toast({ title: 'Erro:', message: msg, type: 'error' });
		},
		showwarning: function(msg) {
			FLUIGC.toast({ title: 'Aviso:', message: msg, type: 'warning' });
		},
		showinfo: function(msg) {
			FLUIGC.toast({ title: 'Informa&ccedil;&atilde;o:', message: msg, type: 'info' });
		}

	};
})();


function testeadicionalinha(){
		alert("entrou");
		lastLinhaNota = wdkAddChild('testelinha');
   		linhasCriadas++;

}
