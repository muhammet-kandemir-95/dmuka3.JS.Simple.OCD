/**
 * dmuka3.JS.Simple.OCD.Plugin.ContextMenu
 * {
 * 	contextEl: <String | HTMLElement | Function>,
 * 	zIndex?(999999): <Number>,
 * 	onShow?: <Function([this]$ocd)>,
 * 	onHide?: <Function([this]$ocd)>
 * }
 */
$d.ocd.plugins.$add('contextMenu', function ($options) {
	//#region Validations
	if (this.__isNullOrUndefined($options) === true) {
		$options = {};
	}

	if (this.__isObject($options) === false) {
		throw '"$options" must be Object!';
	}

	if (this.__isNullOrUndefined($options.contextEl) === true) {
		throw '"$options.contextEl" must be filled!';
	}

	if (this.__isString($options.contextEl) === false && this.__isHTML($options.contextEl) === false && this.__isFunction($options.contextEl) === false) {
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
		data: {
			contextMenuEl: {
				get: function () {
					return this.__hide.contextMenu.el;
				}
			},
			contextMenuOcd: {
				get: function () {
					return this.__hide.contextMenu.el.$.$ocd;
				}
			}
		},
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

				if (self.__isNullOrUndefined($options.zIndex) === false) {
					zIndex = $options.zIndex.toString();
				}

				if (self.__isString($options.contextEl) === true) {
					contextEl = $d.q.first($options.contextEl);
				} else if (self.__isFunction($options.contextEl) === true) {
					contextEl = $options.contextEl.call(self);
				} else {
					contextEl = $options.contextEl;
				}

				if (self.__isNullOrUndefined(contextEl) === true) {
					console.error(self.$alias + ' "contextEl"\'s result must not be null!', self);
					throw self.$alias + ' "contextEl"\'s result must not be null!';
				}

				var firstLoadForContextEl = contextEl.$.data('dmuka3.JS.Simple.OCD.Plugin.ContextMenu-loaded') === true;
				contextEl.$.data('dmuka3.JS.Simple.OCD.Plugin.ContextMenu-loaded', true);

				if (firstLoadForContextEl === false) {
					contextEl.$.css({
						position: 'fixed',
						zIndex: zIndex
					});
					contextEl.__hide = {};

					contextEl.__hide.contextMenu = {
						el: contextEl,
						/**
						 * Context menu's situation.
						 */
						enable: false,
						/**
						 * Hide context menu.
						 */
						hide: function () {
							contextEl.$.css('display', 'none');
							if (contextEl.__hide.contextMenu.enable === true) {
								if (self.__isNullOrUndefined(contextEl.__hide.contextMenu.lastOcd.__hide.contextMenuOnHide) === false) {
									contextEl.__hide.contextMenu.lastOcd.__hide.contextMenuOnHide.call(self);
								}
							}
							contextEl.__hide.contextMenu.enable = false;
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

							contextEl.__hide.contextMenu.enable = true;
						}
					};

					contextEl.$.data('contextMenuHide', contextEl.__hide.contextMenu.hide);
					contextEl.$.data('contextMenuShow', contextEl.__hide.contextMenu.show);

					contextEl.$.css('display', 'none');
					contextEl.$.on('contextmenu', function (e) {
						e.preventDefault();
					});

					$d.q.on('click', function (e) {
						if (contextEl !== e.target && contextEl.$.has(e.target) === false) {
							contextEl.__hide.contextMenu.hide();
						}
					});
	
					window.$q.on('scroll', function () {
						contextEl.__hide.contextMenu.hide();
					}, true);
	
					window.$q.on('resize', function () {
						contextEl.__hide.contextMenu.hide();
					});
				}
				self.__hide.contextMenu = contextEl.__hide.contextMenu;
				self.__hide.contextMenuOnHide = $options.onHide;

				self.$el.$.on('contextmenu', function (e) {
					e.preventDefault();
					contextEl.$.data('contextMenuOcd', self);
					self.__hide.contextMenu.lastOcd = self;
					self.__hide.contextMenu.show(e.clientX, e.clientY);

					if (self.__isNullOrUndefined($options.onShow) === false) {
						$options.onShow.call(self);
					}
				});
			}
		}
	};

	return mixin;
});