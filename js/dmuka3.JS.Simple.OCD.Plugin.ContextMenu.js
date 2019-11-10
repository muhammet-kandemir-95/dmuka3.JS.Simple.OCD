/**
 * dmuka3.JS.Simple.OCD.Plugin.ContextMenu
 * {
 * 	data: {
 * 		$contextMenuOptions: {
 * 			contextEl: <String>,
 * 			onShow?: <Function([this]$ocd)>,
 * 			onHide?: <Function([this]$ocd)>
 * 		}
 * 	}
 * }
 */
$d.ocd.plugins.$add('contextMenu', {
	methods: {
		contextMenuShow: function (x, y) {
			this.__hide.contextMenu.show(x, y);
		},
		contextMenuHide: function () {
			this.__hide.contextMenu.hide();
		}
	},
	on: {
		$init: function () {
			//#region Validations
			if (this.__isNullOrUndefined(this.$contextMenuOptions) === true) {
				console.error(this.__alias + ' "data.$contextMenuOptions" must be filled!', this);
				throw this.__alias + ' "data.$contextMenuOptions" must be filled!';
			}

			if (this.__isObject(this.$contextMenuOptions) === false) {
				console.error(this.__alias + ' "data.$contextMenuOptions" must be Object!', this);
				throw this.__alias + ' "data.$contextMenuOptions" must be Object!';
			}

			if (this.__isNullOrUndefined(this.$contextMenuOptions.contextEl) === true) {
				console.error(this.__alias + ' "data.$contextMenuOptions.contextEl" must be filled!', this);
				throw this.__alias + ' "data.$contextMenuOptions.contextEl" must be filled!';
			}

			if (this.__isString(this.$contextMenuOptions.contextEl) === false && this.__isHTML(this.$contextMenuOptions.contextEl) === false) {
				console.error(this.__alias + ' "data.$contextMenuOptions.contextEl" must be String or HTML Element!', this);
				throw this.__alias + ' "data.$contextMenuOptions.contextEl" must be String or HTML Element!';
			}

			if (this.__isNullOrUndefined(this.$contextMenuOptions.onShow) === false && this.__isFunction(this.$contextMenuOptions.onShow) === false) {
				console.error(this.__alias + ' "data.$contextMenuOptions.onShow" must be Function!', this);
				throw this.__alias + ' "data.$contextMenuOptions.onShow" must be Function!';
			}

			if (this.__isNullOrUndefined(this.$contextMenuOptions.onHide) === false && this.__isFunction(this.$contextMenuOptions.onHide) === false) {
				console.error(this.__alias + ' "data.$contextMenuOptions.onHide" must be Function!', this);
				throw this.__alias + ' "data.$contextMenuOptions.onHide" must be Function!';
			}
			//#endregion

			var self = this;
			var contextEl = null;

			if (self.__isString(self.$contextMenuOptions.contextEl) === true) {
				contextEl = document.querySelector(self.$contextMenuOptions.contextEl);

				if (self.__isNullOrUndefined(self.$contextMenuOptions.contextEl) === true) {
					console.error(self.__alias + ' "data.$contextMenuOptions.contextEl"\'s result must not be null!', self);
					throw self.__alias + ' "data.$contextMenuOptions.contextEl"\'s result must not be null!';
				}
			} else {
				contextEl = self.$contextMenuOptions.contextEl;
			}

			contextEl.style.position = 'fixed';
			self.__hide.contextMenu = {
				/**
				 * Context menu's situation.
				 */
				enable: false,
				/**
				 * Hide context menu.
				 */
				hide: function () {
					contextEl.style.display = 'none';
					if (self.__hide.contextMenu.enable === true && self.__isNullOrUndefined(self.$contextMenuOptions.onHide) === false) {
						self.$contextMenuOptions.onHide.call(self);
					}
					self.__hide.contextMenu.enable = false;
				},
				/**
				 * Show context menu.
				 * @param {Number} x 
				 * @param {Number} y 
				 */
				show: function (x, y) {
					contextEl.style.display = 'block';
					if (self.__isNullOrUndefined(x) === false) {
						contextEl.style.left = x + 'px';
					}
					if (self.__isNullOrUndefined(y) === false) {
						contextEl.style.top = y + 'px';
					}

					if (self.__isNullOrUndefined(self.$contextMenuOptions.onShow) === false) {
						self.$contextMenuOptions.onShow.call(self);
					}
					self.__hide.contextMenu.enable = true;
				}
			};
			contextEl.style.display = 'none';

			contextEl.$contextMenu = {
				hide: self.__hide.contextMenu.hide,
				show: self.__hide.contextMenu.show
			};

			self.$el.$.on('contextmenu', function (e) {
				e.preventDefault();
				self.__hide.contextMenu.show(e.clientX, e.clientY);
			});
			
			document.addEventListener('contextmenu', function (e) {
				if (self.$el !== e.target && self.$el.$.has(e.target) === false && contextEl !== e.target && contextEl.$.has(e.target) === false) {
					self.__hide.contextMenu.hide();
				}
			});

			document.addEventListener('click', function (e) {
				if (contextEl !== e.target && contextEl.$.has(e.target) === false) {
					self.__hide.contextMenu.hide();
				}
			});

			window.addEventListener('scroll', function () {
				self.__hide.contextMenu.hide();
			}, true);
		}
	}
});