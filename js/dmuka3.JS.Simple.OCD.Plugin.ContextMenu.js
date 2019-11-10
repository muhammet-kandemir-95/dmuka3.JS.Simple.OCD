/**
 * dmuka3.JS.Simple.OCD.Plugin.ContextMenu
 * {
 * 	contextEl: <String>,
 * 	zIndex?(999999): <Number>,
 * 	onShow?: <Function([this]$ocd)>,
 * 	onHide?: <Function([this]$ocd)>
 * }
 */
$d.ocd.plugins.$add('contextMenu', function ($options) {
	//#region Validations
	if (this.__isNullOrUndefined($options) === true) {
		throw '"$options" must be filled!';
	}

	if (this.__isObject($options) === false) {
		throw '"$options" must be Object!';
	}

	if (this.__isNullOrUndefined($options.contextEl) === true) {
		throw '"$options.contextEl" must be filled!';
	}

	if (this.__isString($options.contextEl) === false && this.__isHTML($options.contextEl) === false) {
		throw '"$options.contextEl" must be String or HTML Element!';
	}

	if (this.__isNullOrUndefined($options.onShow) === false && this.__isFunction($options.onShow) === false) {
		throw '"$options.onShow" must be Function!';
	}

	if (this.__isNullOrUndefined($options.onHide) === false && this.__isFunction($options.onHide) === false) {
		throw '"$options.onHide" must be Function!';
	}

	if (this.__isNullOrUndefined($options.zIndex) === false && this.__isNumber($options.zIndex) === false) {
		throw '"$options.zIndex" must be Number!';
	}
	//#endregion

	var mixin = {
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
				var self = this;
				var contextEl = null;
				var zIndex = '999999';
				var bodyEl = $d.q.first('body');

				if (this.__isNullOrUndefined($options.zIndex) === false) {
					zIndex = $options.zIndex.toString();
				}

				if (self.__isString($options.contextEl) === true) {
					contextEl = $d.q.first($options.contextEl);

					if (self.__isNullOrUndefined($options.contextEl) === true) {
						console.error(self.__alias + ' "data.$contextMenuOptions.contextEl"\'s result must not be null!', self);
						throw self.__alias + ' "data.$contextMenuOptions.contextEl"\'s result must not be null!';
					}
				} else {
					contextEl = $options.contextEl;
				}

				contextEl.$.css({
					position: 'fixed',
					zIndex: zIndex
				});
				self.__hide.contextMenu = {
					/**
					 * Context menu's situation.
					 */
					enable: false,
					/**
					 * Hide context menu.
					 */
					hide: function () {
						contextEl.$.css('display', 'none');
						if (self.__hide.contextMenu.enable === true && self.__isNullOrUndefined($options.onHide) === false) {
							$options.onHide.call(self);
						}
						self.__hide.contextMenu.enable = false;
					},
					/**
					 * Show context menu.
					 * @param {Number} x 
					 * @param {Number} y 
					 */
					show: function (x, y) {
						contextEl.$.css('display', 'block');

						if (self.__isNullOrUndefined(x) === false) {
							contextEl.$.css({
								left: x + 'px',
								right: 'auto'
							});
							if (contextEl.$.screen.left + contextEl.$.screen.width > Math.min(window.innerWidth, bodyEl.$.client.width)) {
								contextEl.$.css({
									left: 'auto',
									right: (Math.min(window.innerWidth, bodyEl.$.client.width) - x) + 'px'
								});
							}
						}
						if (self.__isNullOrUndefined(y) === false) {
							contextEl.$.css({
								top: y + 'px',
								bottom: 'auto'
							});
							if (contextEl.$.screen.top + contextEl.$.screen.height > Math.min(window.innerHeight, bodyEl.$.client.height)) {
								contextEl.$.css({
									top: 'auto',
									bottom: (Math.min(window.innerHeight, bodyEl.$.client.height) - y) + 'px'
								});
							}
						}

						if (self.__isNullOrUndefined($options.onShow) === false) {
							$options.onShow.call(self);
						}
						self.__hide.contextMenu.enable = true;
					}
				};
				contextEl.$.css('display', 'none');

				contextEl.$contextMenu = {
					hide: self.__hide.contextMenu.hide,
					show: self.__hide.contextMenu.show
				};

				self.$el.$.on('contextmenu', function (e) {
					e.preventDefault();
					self.__hide.contextMenu.show(e.clientX, e.clientY);
				});

				$d.q.on('contextmenu', function (e) {
					if (self.$el !== e.target && self.$el.$.has(e.target) === false && contextEl !== e.target && contextEl.$.has(e.target) === false) {
						self.__hide.contextMenu.hide();
					}
				});

				$d.q.on('click', function (e) {
					if (contextEl !== e.target && contextEl.$.has(e.target) === false) {
						self.__hide.contextMenu.hide();
					}
				});

				window.$.on('scroll', function () {
					self.__hide.contextMenu.hide();
				}, true);

				window.$.on('resize', function () {
					self.__hide.contextMenu.hide();
				});
			}
		}
	};

	return mixin;
});