var KitIntranetNews = SuperWidget
	.extend({
		numberOfArticles: null,
		orderByField: null,
		LIMIT: 2,
		OFFSET: 0,
		NEWS: null,

		bindings: {
			local: {
				'load-more-news': ['click_loadMoreNews'],
				'show-news-detail': ['click_showNewsDetail'],
				'number-of-articles': ['change_checkNumberOfArticles', 'keyup_checkNumberOfArticles'],
				'save-settings': ['click_saveSettings']
			}
		},

		init: function() {
			// remove o título da widget no slot.
			this.DOM.parents('.wcm_corpo_widget_single').siblings('.wcm_title_widget').remove();

			if (this.isEditMode) {
				this.serviceGetSettings();
			} else {
				this.serviceGetNews();
			}
		},

		serviceGetSettings: function() {
			var _this = this, settings = {
				url: '/api/public/ecm/document/getDocumentByDatasetName/kit_news',
				type: "GET",
				cache: false
			};
			FLUIGC.ajax(settings, function(error, data) {
				if (!error) {
					var formLink = WCMAPI.getServerURL() + WCMAPI.getProtectedContextPath() + '/'
						+ WCMAPI.getTenantCode() + "/ecmnavigation?app_ecm_navigation_doc=" + data.content.id;
					$('[data-form-link]', _this.DOM).attr('href', formLink).text(formLink);

					$('#orderByField', this.DOM).val(_this.orderByField);
				}
			});
		},

		serviceGetNews: function() {
			var _this = this, 
				constraintActive = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST), 
				constraintLimit = DatasetFactory.createConstraint("sqlLimit", this.numberOfArticles, this.numberOfArticles, ConstraintType.MUST), 
				constraints = [constraintActive, constraintLimit],
				orderByConstraint = new Array(this.orderByField || "documentid;desc"),
				callback = {
					success: function(data) {
						_this.prepareNews(data);
						_this.loadNews();
					}
				};
			DatasetFactory.getDataset('kit_news', null, constraints, orderByConstraint, callback);
		},

		prepareNews: function(news) {
			if (news != null && news.values.length > 0) {
				var docId = news.values[0]['Mensagem'];
				if (docId) {
					this.NEWS = {};
					this.NEWS.values = [];
					var html = Mustache.render(this.templates['template-no-news']);
					$('[data-list-news]', this.DOM).append(html);
				}else{
					for (i = 0; i < news.values.length; i++) {
						news.values[i].imgUrl = WCMAPI.getServerURL() + '/webdesk/streamcontrol/padrao.png?WDCompanyId='
							+ WCMAPI.getTenantId() + '&WDNrDocto=' + news.values[i]['metadata#id'] + '&WDNrVersao='
							+ news.values[i]['metadata#version'];
						news.values[i].news_body_min = (news.values[i].news_body.length > 150) ? news.values[i].news_body
							.substr(0, 300).concat('...') : news.values[i].news_body;
					}
					this.NEWS = news;
				}
			}
		},
		
		buildDate: function (news){
			news.formatPublishDate = moment(+news.publishDate).format("DD/MM/YYYY - HH:mm");
		},

		loadNews: function() {
			var html;

			if (this.NEWS.values.length - this.OFFSET > 1) {
				for (i = this.OFFSET; i < this.OFFSET + this.LIMIT; i++) {
					this.NEWS.values[i].arrayPosition = i;
					this.buildDate(this.NEWS.values[i]);
					html = Mustache.render(this.templates['template-news'], this.NEWS.values[i]);
					$('[data-list-news]', this.DOM).append(html);
				}
			} else if (this.NEWS.values.length - this.OFFSET == 1) {
				this.NEWS.values[this.OFFSET].arrayPosition = this.OFFSET;
				this.buildDate(this.NEWS.values[this.OFFSET]);
				html = Mustache.render(this.templates['template-news'], this.NEWS.values[this.OFFSET]);
				$('[data-list-news]', this.DOM).append(html);
			}

			if ($('[data-show-news-detail]', this.DOM).length === this.NEWS.values.length) {
				$('[data-row-load-more]', this.DOM).addClass('fs-display-none');
			}
		},

		loadMoreNews: function(el, ev) {
			this.OFFSET = this.OFFSET + this.LIMIT;
			this.loadNews();
		},

		showNewsDetail: function(el, ev) {
			var arrayPosition = $(el).data('array-position'), myModal = FLUIGC.modal({
				title: this.NEWS.values[arrayPosition].formatPublishDate,
				content: Mustache.render(this.templates['template-news-detail'], this.NEWS.values[arrayPosition]),
				id: 'fluig-modal_' + this.instanceId,
				size: 'large'
			});
		},

		checkNumberOfArticles: function(el, ev) {
			var $el = $(el), $formGroup = $el.parents('.form-group:first'), $saveSettings = $('[data-save-settings]',
				this.DOM), numberOfArticles = parseInt($el.val());

			if (numberOfArticles <= 0) {
				$saveSettings.attr('disabled', 'disabled');
				$formGroup.addClass('has-error');
			} else if (isNaN(numberOfArticles)) {
				$el.val('');
			} else {
				$saveSettings.removeAttr('disabled');
				$formGroup.removeClass('has-error');
			}
		},

		saveSettings: function(el, ev) {
			var settings = {
				numberOfArticles: $('[data-number-of-articles]', this.DOM).val(),
				orderByField: $('#orderByField', this.DOM).val()
			};
			WCMSpaceAPI.PageService.UPDATEPREFERENCES({
				async: true,
				success: function(data) {
					FLUIGC.toast({
						title: data.message,
						message: '',
						type: 'success'
					});
				},
				fail: function(xhr, message, errorData) {
					FLUIGC.toast({
						title: '${i18n.getTranslation("kit_news.error.saving.preferences")}',
						message: errorData.message,
						type: 'warning'
					});
				}
			}, this.instanceId, settings);
		}
	});