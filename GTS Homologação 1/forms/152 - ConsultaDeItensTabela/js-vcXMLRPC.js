// Legado da vcXMLRPC.js

// Definição de tipos de dados utilizados para manipulação de datasets
var ConstraintType = {};
ConstraintType.MUST = 1;
ConstraintType.SHOULD = 2;
ConstraintType.MUST_NOT = 3;

// Definição da variavéis do processo
var parentOBJ = {};
var WKDef = WKDefField = "";
var WKVersDef = WKVersDefField = "";
var WKNumProces = WKNumProcesField = "";
var WKNumState = WKNumStateField = "";

if (parent && parent.ECM && parent.ECM.workflowView && parent.ECM.workflowView.processDefinition) {
	WKDef = WKDefField = parent.ECM.workflowView.processId;
	WKVersDef = WKVersDefField = parent.ECM.workflowView.version;
	WKNumProces = WKNumProcesField = parent.ECM.workflowView.processDefinition.processInstanceId;
	WKNumState = WKNumStateField = parent.ECM.workflowView.processDefinition.currentMovto; // corrigir atividade e não
	// movimento
}
if (window.opener != undefined) {
	parentOBJ = window.opener.parent;
} else {
	parentOBJ = parent;
}

function ajaxRequestDefault() {
	var def = {
		url: null,
		dataType: 'json',
		cache: false,
		processData: false,
		contentType: "application/json; charset=UTF-8",
		type: 'POST',
		success: function() {
		},
		failure: function() {
		}
	};
	return def;
}

function isObject(o) {
	return $.isArray(o) | $.isPlainObject(o) | $.isFunction(o);
};

fluigXMLRPC = {};
fluigXMLRPC.Request = function(options, type) {
	var def = new ajaxRequestDefault();
	def.type = type;

	if (options.data) {
		if (isObject(options.data)) {
			options.data = JSON.stringify(options.data);
		}
	}
	var config = $.extend(def, options);
	$.ajax(config);
};

fluigXMLRPC.Create = function(options) {
	fluigXMLRPC.Request(options, 'POST');
};

fluigXMLRPC.Read = function(options) {
	fluigXMLRPC.Request(options, 'GET');
};

fluigXMLRPC.warn = function(message) {
	console.log("WARN " + message);
	if (fluigXMLRPC.debugging) {
		fluigXMLRPC.debug("fluigXMLRPC.warn: " + message);
	}
};

fluigXMLRPC.ecmRestUrl = window.location.protocol + "//" + window.location.host + "/api/public/ecm/";

fluigXMLRPC.datasetsUrl = fluigXMLRPC.ecmRestUrl + "dataset/datasets/";
fluigXMLRPC.availableDatasetsUrl = fluigXMLRPC.ecmRestUrl + "dataset/availableDatasets/";

fluigXMLRPC.error = function(message, errorThrown) {
	if (parentOBJ && parentOBJ.WCMAPI && parentOBJ.WCMAPI.failHandler) {
		parentOBJ.WCMAPI.failHandler(message);
	} else {
		console.log(message, errorThrown);
	}
	if (fluigXMLRPC.debugging) {
		fluigXMLRPC.debug("fluigXMLRPC.error: " + message);
	}
}

fluigXMLRPC.initDebugMode = function(field) {
	fluigXMLRPC.debugging = true;
	fluigXMLRPC.debugField = field;

	fluigXMLRPC.debug("debug initiate");
}

fluigXMLRPC.debug = function(message) {
	// double check
	if (fluigXMLRPC.debugging) {
		if (isObject(message)) {
			message = JSON.stringify(message);
		}
		var field = document.getElementById(fluigXMLRPC.debugField);
		field.innerHTML = field.innerHTML + message + "<br>\n";
	}
}

var simpleAjaxAPI = {};

if (!window.jQuery
	|| (/MSIE (\d+\.\d+);/.test(navigator.userAgent) && RegExp.$1 < 10 && (parent != undefined && parent.ECM === undefined))) {
	// Se o formulário não tiver jQuery, ou carregá-lo após o vcXMLRPC.js, ou o browser for menor/igual a IE9, é
	// necessária a implementação nativa para ajax.
	simpleAjaxAPI = (function() {
		function request(method, config) {
			var xhr = new XMLHttpRequest();
			xhr.open(method, config.url, config.async);
			xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
			xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					var response = JSON.parse(xhr.responseText);
					if (xhr.status == 200) {
						config.success(response)
					} else if (config.error) {
						config.error();
					} else {
						parentOBJ.WCMAPI.failHandler(xhr);
					}
				}
			}

			if (method == "POST") {
				xhr.send(JSON.stringify(config.data));
			} else {
				xhr.send();
			}
		};

		var simpleAjaxAPI = {};
		simpleAjaxAPI.Create = function(config) {
			request("POST", config);
		};

		simpleAjaxAPI.Read = function(config) {
			request("GET", config);
		};

		return simpleAjaxAPI;
	})();

} else {
	simpleAjaxAPI.Create = fluigXMLRPC.Create;
	simpleAjaxAPI.Read = fluigXMLRPC.Read;
}

// Definição de funções de Dataset
var DatasetFactory = {}
DatasetFactory.getDataset = function(name, fields, constraints, order, callback) {
	var data = {
		name: name,
		fields: fields,
		constraints: constraints,
		order: order
	};

	if (fluigXMLRPC.debugging) {
		fluigXMLRPC.debug("#DatasetFactory.getDataset " + fluigXMLRPC.datasetsUrl);
		fluigXMLRPC.debug(data);
		fluigXMLRPC.debug("callback? " + (callback != undefined));
	}

	var result;
	simpleAjaxAPI.Create({
		url: fluigXMLRPC.datasetsUrl,
		data: data,
		async: (callback != undefined),
		success: function(data) {
			if (fluigXMLRPC.debugging) {
				fluigXMLRPC.debug("#DatasetFactory.getDataset success");
				fluigXMLRPC.debug(data);
			}
			if (callback) {
				callback.success(data.content);
			} else {
				result = data.content;
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			if (fluigXMLRPC.debugging) {
				fluigXMLRPC.debug("#DatasetFactory.getDataset error");
				fluigXMLRPC.debug(jqXHR);
				fluigXMLRPC.debug(textStatus);
				fluigXMLRPC.debug(errorThrown);
			}
			if (callback) {
				callback.error(jqXHR, textStatus, errorThrown);
			} else {
				fluigXMLRPC.error(textStatus, errorThrown);
			}
		}
	});
	return result;
}

DatasetFactory.createConstraint = function(field, initialValue, finalValue, type, likeSearch) {
	return new SearchConstraint(field, initialValue, finalValue, type, likeSearch);
}

function SearchConstraint(field, initialValue, finalValue, type, likeSearch) {
	this._field = field;
	this._initialValue = (initialValue != null) ? initialValue : "___NULL___VALUE___";
	this._finalValue = (finalValue != null) ? finalValue : "___NULL___VALUE___";
	this._type = type;
	this._likeSearch = likeSearch;
	if (fluigXMLRPC.debugging) {
		fluigXMLRPC.debug("#SearchConstraint created");
		fluigXMLRPC.debug(this);
	}
}

DatasetFactory.getAvailableDatasets = function(callback) {

	if (fluigXMLRPC.debugging) {
		fluigXMLRPC.debug("#DatasetFactory.getAvailableDatasets " + fluigXMLRPC.availableDatasetsUrl);
		fluigXMLRPC.debug("callback? " + (callback != undefined));
	}

	var result;
	simpleAjaxAPI.Read({
		url: fluigXMLRPC.availableDatasetsUrl,
		async: (callback != undefined),
		success: function(data) {
			if (fluigXMLRPC.debugging) {
				fluigXMLRPC.debug("#DatasetFactory.getAvailableDatasets success");
				fluigXMLRPC.debug(data);
			}
			if (callback) {
				callback.success(data.content);
			} else {
				result = data.content;
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			if (fluigXMLRPC.debugging) {
				fluigXMLRPC.debug("#DatasetFactory.getAvailableDatasets error");
				fluigXMLRPC.debug(jqXHR);
				fluigXMLRPC.debug(textStatus);
				fluigXMLRPC.debug(errorThrown);
			}
			if (callback) {
				callback.error(jqXHR, textStatus, errorThrown);
			} else {
				fluigXMLRPC.error(textStatus, errorThrown);
			}
		}
	});
	return result;
}

DatasetFactory.getDatasetValues = function(datasetId, filter, callback) {
	if (filter == null) {
		filter = {};
	} else if (typeof (filter) != "object") {
		fluigXMLRPC.warn("Filtro Invalido" + ".");
	}

	var data = {
		datasetId: datasetId,
		filter: filter
	};

	if (typeof (datasetId) == "number") {
		var url = fluigXMLRPC.ecmRestUrl + "dataset/cardDatasetValues/";
	} else {
		var url = fluigXMLRPC.ecmRestUrl + "dataset/standardDatasetValues/";
	}

	if (fluigXMLRPC.debugging) {
		fluigXMLRPC.debug("#DatasetFactory.getDatasetValues " + url);
		fluigXMLRPC.debug(data);
		fluigXMLRPC.debug("callback? " + (callback != undefined));
	}

	var result;
	simpleAjaxAPI.Create({
		url: url,
		data: data,
		async: (callback != undefined),
		success: function(data) {
			if (fluigXMLRPC.debugging) {
				fluigXMLRPC.debug("#DatasetFactory.getDatasetValues success");
				fluigXMLRPC.debug(data);
			}
			if (callback) {
				callback.success(data.content);
			} else {
				result = data.content;
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			if (fluigXMLRPC.debugging) {
				fluigXMLRPC.debug("#DatasetFactory.getDatasetValues error");
				fluigXMLRPC.debug(jqXHR);
				fluigXMLRPC.debug(textStatus);
				fluigXMLRPC.debug(errorThrown);
			}
			if (callback) {
				callback.error(jqXHR, textStatus, errorThrown);
			} else {
				fluigXMLRPC.error(textStatus, errorThrown);
			}
		}
	});
	return result;
}

// @Deprecated (legado)
function getDatasetValues(datasetId, filter) {
	return DatasetFactory.getDatasetValues(datasetId, filter);
}
function setDatasetParams(datasetId, filter) {
	$().prop();
}
