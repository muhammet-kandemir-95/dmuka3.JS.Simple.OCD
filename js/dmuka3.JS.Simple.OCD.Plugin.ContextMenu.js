/**
 * dmuka3.JS.Simple.OCD.Plugin.ContextMenu
 * {
 * 	data: {
 * 		$contextMenuOptions: {
 * 			contextEl: <String>
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
				 * Hide context menu.
				 */
				hide: function () {
					contextEl.style.display = 'none';
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
				}
			};
			self.__hide.contextMenu.hide();

			contextEl.$contextMenu = {
				hide: self.__hide.contextMenu.hide,
				show: self.__hide.contextMenu.show
			};

			self.$el.$.on('contextmenu', function (e) {
				e.preventDefault();
				self.__hide.contextMenu.show(e.clientX, e.clientY);
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