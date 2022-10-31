var SlideShow = SuperWidget.extend({
	instanceId: null,
	widgetVersion: null,
	sourceType: null,
	instagramTargetAccount: null,
	instagramTargetAccountID: null,
	applicationSourceClientID: null,
	fluigDirectoryName: null,
	fluigDirectoryID: null,
	showImageTitle: null,
	autoSize: false,
	resize: false,
	mapAttrs: {
		TYPE_INSTAGRAM: 'Instagram',
		TYPE_FLUIGDIR: 'FluigDir',
		ERROR_TYPE_API_NOT_ALLOWED: 'APINotAllowedError',
		ERROR_TYPE_API_INVALID_CLIENT: 'OAuthParameterException',
		DOCTYPE_DIRECTORY: '1',
		LIMIT_CHAR_MESSAGE: 119
	},

	bindings: {
		local: {
			'option-instagram': ['click_instagramChosen'],
			'option-fluigdir': ['click_fluigDirChosen'],
			'addnew-clientid': ['click_goToInstagramClientManager'],
			'usedefault-clientid': ['click_useDefaultClientID'],
			'igprofile': ['click_goToInstagramProfile'],
			'save-preferences': ['click_savePreferences'],
			'find-fluigdir': ['click_chooseDirectory']
		},
		global: {}
	},

	init: function () {
		var that = this;

		// remove o título da widget no slot.
		this.DOM.parents('.wcm_corpo_widget_single').siblings('.wcm_title_widget').remove();

		if (that.isEditMode) {
			that.editMode();
		} else {
			that.processTemplate('template_slideshow', {}, '#SlideShow_' + that.instanceId, function () {
				that.viewMode();
			});
		}
	},

	definePreferences: function () {
		var mode = this.getMode();
		this.sourceType = $('#sourceType' + mode).val();
		this.instagramTargetAccount = $('#instagramTargetAccount' + mode).val();
		this.instagramTargetAccountID = $('#instagramTargetAccountID' + mode).val();
		this.applicationSourceClientID = $('#applicationSourceClientID' + mode).val();
		this.fluigDirectoryID = $('#fluigDirectoryID' + mode).val();
		this.fluigDirectoryName = $('#fluigDirectoryName' + mode).val();
		this.showImageTitle = $('#showImageTitle' + mode).prop('checked');
		this.autoSize = $("#autoSize" + mode).prop('checked');
		this.resize = $("#resize" + mode).prop('checked');
	},

	getMode: function () {
		return ((this.isEditMode) ? 'Edit' : 'View') + '_' + this.instanceId;
	},

	setDirectory: function (doc) {
		var mode = this.getMode();

		this.fluigDirectoryID = doc.documentId;
		$('#fluigDirectoryID' + mode).val(this.fluigDirectoryID);

		this.fluigDirectoryName = doc.documentDescription;
		$('#fluigDirectoryName' + mode).val(this.fluigDirectoryName);
	},

	viewMode: function () {
		var that = this;
		if (that.sourceType === that.mapAttrs.TYPE_FLUIGDIR) {
			that.getFluigImageReader();
		} else {
			that.getInstagramImageReader(function (response) {
				if (response) {
					var data = response.content.result;
					if (response.content.description.indexOf(':SUCCESS') !== -1) {
						that.loadInstagramImages(data);
					} else {
						that.showMessage('', 'danger', that.parseError(response));
					}
				} else {
					that.showMessage('', 'danger', '${i18n.getTranslation("kit_slideshow.error.noresponse")}');
				}
			});
		}
	},

	loadFluigImages: function (data) {
		var that = this, images = [], len = data.length, item, image;
		for (var i = 0; i < len; i++) {
			item = data[i];
			if (item.mimetype && that.validateMimeType(item)) {
				image = {
					src: that.getFluigFileUrl(item),
					title: (/^true$/i.test(that.showImageTitle)) ? that.cropMessage(that.getFluigFileDescription(item))
						: '',
					alt: that.getFluigFileDescription(item),
					linkhref: item.versionDescription
				};
				images.push(image);
			}
		}
		if (images.length > 0) {
			that.buildSlideShow(images);
		} else {
			this.displayNoDataFoundMessage();
		}
	},

	validateMimeType: function (item) {
		var mimeTypes = ['image/jpeg', 'image/bmp', 'image/x-windows-bmp', 'image/pjpeg', 'image/png', 'image/gif'];
		for (var index in mimeTypes) {
			var mime = mimeTypes[index];
			if (item.mimetype === mime) {
				return true;
			}
		}
		return false;
	},

	loadInstagramImages: function (data) {
		var images = [], arr = JSON.parse(data).data, len = arr.length, item, image;
		for (var i = 0; i < len; i++) {
			item = arr[i];
			image = {
				src: this.getInstagramImageUrl(item),
				alt: this.getInstagramCaptionMessage(item),
				linkhref: item.link
			};
			images.push(image);
		}
		this.buildSlideShow(images);
	},

	buildSlideShow: function (images) {
		var settings, photoList = $('#photoList_' + this.instanceId);
		if (images && images.length) {
			settings = {
				id: 'kitIntranetSlideshow' + this.instanceId,
				images: images,
				autoSize: this.autoSize,
				resize: this.resize
			};
			FLUIGC.carousel(photoList, settings);
		} else {
			this.showMessage('', 'warning', '${i18n.getTranslation("kit_slideshow.error.nodatatodisplay")}');
		}
	},

	getInstagramImageUrl: function (item) {
		return item.images.standard_resolution.url;
	},

	getFluigFileUrl: function (item) {
		var nrDocto = item['documentPK.documentId'];
		var nrVersao = item['documentPK.version'];
		var companyId = item['documentPK.companyId'];
		return WCMAPI.getServerURL() + '/webdesk/streamcontrol/' + item.phisicalFile + '?WDNrDocto=' + nrDocto
			+ '&WDNrVersao=' + nrVersao + '&WDCompanyId=' + companyId;
	},

	getInstagramCaptionMessage: function (item) {
		if (item && item.caption) {
			return item.caption.text;
		}
		return "";
	},

	getFluigFileDescription: function (item) {
		if (item.additionalComments) {
			return item.additionalComments;
		}
		return item.documentDescription;
	},

	editMode: function () {
		if (this.sourceType === this.mapAttrs.TYPE_FLUIGDIR) {
			this.fluigDirChosen();
		} else {
			this.instagramChosen();
		}
	},

	savePreferences: function () {
		var that = this;
		this.definePreferences();
		that.save(that.getPreferences());
	},

	parseError: function (response) {
		var that = this;
		switch (response.meta.error_type) {
			case that.mapAttrs.ERROR_TYPE_API_NOT_ALLOWED:
				return '${i18n.getTranslation("kit_slideshow.error.apinotallowed")}';
			case that.mapAttrs.ERROR_TYPE_API_INVALID_CLIENT:
				return '${i18n.getTranslation("kit_slideshow.error.invalidclientid")}';
			default:
				return response.meta.error_message;
		}
	},

	getFluigImageReader: function () {
		var constraints = [], dataset;

		constraints.push(DatasetFactory.createConstraint('parentDocumentId', this.fluigDirectoryID,
			this.fluigDirectoryID, ConstraintType.MUST));
		constraints.push(DatasetFactory.createConstraint('activeVersion', true, true, ConstraintType.MUST));

		dataset = DatasetFactory.getDataset('document', null, constraints, null);

		if (dataset && dataset.values.length > 0) {
			var docId = dataset.values[0].uUID;
			if (docId || docId.length) {
				this.loadFluigImages(dataset.values);
			} else {
				this.displayNoDataFoundMessage();
			}
		} else {
			this.displayNoDataFoundMessage();
		}
	},

	displayNoDataFoundMessage: function () {
		this.showMessage('', 'info', '${i18n.getTranslation("kit_slideshow.error.nodatatodisplay")}');
	},

	serviceInstagramUtil: function (url, callback) {
		var params = {
			companyId: WCMAPI.getOrganizationId(),
			serviceCode: 'instagram.demo',
			method: 'GET',
			endpoint: '/v1/users/self/media/recent'
		};

		var options = {
			url: url,
			data: JSON.stringify(params),
			async: true,
			contentType: 'application/json',
			type: 'POST'
		};

		FLUIGC.ajax(options, callback);
	},

	getInstagramImageReader: function (callback) {
		var that = this;
		var urlInvokeService = "/api/public/2.0/authorize/client/invoke";
		that.serviceInstagramUtil(urlInvokeService, function (err, data) {
			if (err) {
				FLUIGC.toast({
					message: '${i18n.getTranslation("kit_slideshow.error.invalidaccount")}',
					type: 'danger'
				});
				return false;
			}
			callback(data);
		});
	},

	normalizeAccount: function (instagramAccount) {
		var accountWithoutLastSlash, slashIndex = instagramAccount.lastIndexOf("/");
		if (slashIndex >= 0) {
			if (slashIndex === (instagramAccount.length - 1)) {
				accountWithoutLastSlash = instagramAccount.substring(0, slashIndex);
				return this.normalizeAccount(accountWithoutLastSlash);
			} else {
				return instagramAccount.substring(slashIndex + 1);
			}
		} else {
			return instagramAccount;
		}
	},

	save: function (preferences) {
		var that = this;
		if (that.sourceType === that.mapAttrs.TYPE_FLUIGDIR && preferences.fluigDirectoryName === ''
			&& preferences.fluigDirectoryID === '') {
			that.showMessageError('', '${i18n.getTranslation("kit_slideshow.edit.error.atleastone")}');
		} else {
			WCMSpaceAPI.PageService.UPDATEPREFERENCES({
				async: true,
				success: function (data) {
					FLUIGC.toast({
						title: data.message,
						message: '',
						type: 'success'
					});
				},
				fail: function (xhr, message, errorData) {
					that.showMessageError('', errorData.message);
				}
			}, that.instanceId, preferences);
		}
	},

	showMessageError: function (title, error) {
		this.showMessage(title, 'danger', error);
	},

	showMessage: function (title, type, message) {
		FLUIGC.toast({
			title: title,
			type: type,
			message: message
		});
	},

	getPreferences: function () {
		return {
			sourceType: this.sourceType,
			instagramTargetAccount: this.instagramTargetAccount,
			instagramTargetAccountID: this.instagramTargetAccountID,
			applicationSourceClientID: this.applicationSourceClientID,
			fluigDirectoryID: this.fluigDirectoryID,
			fluigDirectoryName: this.fluigDirectoryName,
			showImageTitle: this.showImageTitle,
			autoSize: this.autoSize,
			resize: this.resize
		};
	},

	processTemplate: function (templateName, data, target, callback) {
		var that = this;
		var html = Mustache.render(that.templates[templateName], data);
		$(target).html(html);
		if (callback) {
			callback();
		}
	},

	instagramChosen: function () {
		this.chooseSourceType(this.mapAttrs.TYPE_INSTAGRAM);
	},

	fluigDirChosen: function () {
		this.chooseSourceType(this.mapAttrs.TYPE_FLUIGDIR);
	},

	chooseSourceType: function (type) {
		var $optionButton = $('#sourceTypeButton_' + this.instanceId);
		var displayInstagramData = null;
		var displayFluigDirData = null;
		$('#sourceType' + this.getMode()).val(type);
		this.sourceType = type;
		if (type === this.mapAttrs.TYPE_FLUIGDIR) {
			$optionButton.text('${i18n.getTranslation("kit_slideshow.source.fluigdir")}' + ' ');
			displayFluigDirData = '';
			displayInstagramData = 'none';
			$("#showImageTitleEdit_" + this.instanceId).removeClass('fs-display-none');
		} else {
			$optionButton.text('${i18n.getTranslation("kit_slideshow.source.instagram")}' + ' ');
			displayFluigDirData = "none";
			displayInstagramData = "";
			$("#showImageTitleEdit_" + this.instanceId).addClass('fs-display-none');
		}

		$("#formFluigDir_" + this.instanceId).attr('style', 'display: ' + displayFluigDirData + ';');
		$("#formInstagram_" + this.instanceId).attr('style', 'display: ' + displayInstagramData + ';');
		$('<span>').addClass('caret').appendTo($optionButton);
	},

	goToInstagramClientManager: function () {
		this.openNewTab('http://instagram.com/developer/clients/manage/');
	},

	goToInstagramProfile: function () {
		this.definePreferences();
		this.openNewTab('http://instagram.com/' + this.instagramTargetAccount);
	},

	openNewTab: function (url) {
		var win = window.open(url);
		win.focus();
	},

	chooseDirectory: function () {
		var that = this;
		ECM.findDocument = {};

		var cfg = {
			url: '/ecm_finddocument/finddocument.ftl',
			width: 750,
			height: 500,
			title: '${i18n.getTranslation("kit_slideshow.edit.copyPhisicalFile.title")}',
			callBack: function () {
				ECM.findDocument.getDocuments(0, '1-2-8');
			},
			customButtons: new Array('${i18n.getTranslation("kit_slideshow.edit.select")}')
		};

		ECM.findDocument.panel = WCMC.panel(cfg);
		ECM.findDocument.panel.bind('panel-load', function () {
		});
		ECM.findDocument.panel.bind('panel-button-0', function () {
			if (ECM.findDocument.dataTable.selectedRows.length === 0) {

				FLUIGC.message.alert({
			    message: '${i18n.getTranslation("kit_slideshow.edit.error.atleastone")}' + '.',
			    title: '${i18n.getTranslation("kit_slideshow.label.warning")}',
			    label: '${i18n.getTranslation("kit_slideshow.label.close")}'
				});

				return;
			}

			if (ECM.findDocument.dataTable.selectedRows.length === 1) {
				var rowId = ECM.findDocument.dataTable.selectedRows[0];
				var doc = ECM.findDocument.dataTable.getData(rowId);

				if (doc.documentType === that.mapAttrs.DOCTYPE_DIRECTORY) {
					that.setDirectory(doc);
					ECM.findDocument.panel.close();
				} else {
					FLUIGC.message.alert({
				    message: '${i18n.getTranslation("kit_slideshow.edit.error.atleastone")}' + '.',
				    title: '${i18n.getTranslation("kit_slideshow.label.warning")}',
				    label: '${i18n.getTranslation("kit_slideshow.label.close")}'
					});
					return;
				}
			} else {
				FLUIGC.message.alert({
			    message: '${i18n.getTranslation("kit_slideshow.edit.error.justone")}' + '.',
			    title: '${i18n.getTranslation("kit_slideshow.label.warning")}',
			    label: '${i18n.getTranslation("kit_slideshow.label.close")}'
				});
				return;

			}
		});
	},

	cropMessage: function (message) {
		var croppedMessage = '';
		if (message.length > this.mapAttrs.LIMIT_CHAR_MESSAGE) {
			croppedMessage = message.substring(0, this.mapAttrs.LIMIT_CHAR_MESSAGE);
			croppedMessage = croppedMessage.concat("...");
		} else {
			croppedMessage = message;
		}

		return croppedMessage;
	}
});
