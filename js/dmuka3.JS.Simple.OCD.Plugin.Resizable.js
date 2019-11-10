/**
 * dmuka3.JS.Simple.OCD.Plugin.Resizable
 * {
 * 	resizeX?(default: true): <Boolean>,
 * 	resizeY?(default: true): <Boolean>,
 * 	onResize?: <Function([this]$ocd, size)>,
 * 	onBegin?: <Function([this]$ocd)>,
 * 	onEnd?: <Function([this]$ocd)>,
 * 	resizeBarWidth?(default: 10px): <String>,
 * 	resizeBarHeight?(default: 10px): <String>
 * }
 */
$d.ocd.plugins.$add('resizable', function ($options) {
	//#region Validations
	if (this.__isNullOrUndefined($options) === true) {
		throw '"$options" must be filled!';
	}

	if (this.__isObject($options) === false) {
		throw '"$options" must be Object!';
	}

	if (this.__isNullOrUndefined($options.resizeX) === false && this.__isBool($options.resizeX) === false) {
		throw '"$options.resizeX" must be Boolean!';
	}

	if (this.__isNullOrUndefined($options.resizeY) === false && this.__isBool($options.resizeY) === false) {
		throw '"$options.resizeY" must be Boolean!';
	}

	if (this.__isNullOrUndefined($options.onResize) === false && this.__isFunction($options.onResize) === false) {
		throw '"$options.onResize" must be Function!';
	}

	if (this.__isNullOrUndefined($options.onBegin) === false && this.__isFunction($options.onBegin) === false) {
		throw '"$options.onBegin" must be Function!';
	}

	if (this.__isNullOrUndefined($options.onEnd) === false && this.__isFunction($options.onEnd) === false) {
		throw '"$options.onEnd" must be Function!';
	}

	if (this.__isNullOrUndefined($options.resizeBarWidth) === false && this.__isFunction($options.resizeBarWidth) === false) {
		throw '"$options.resizeBarWidth" must be Function!';
	}

	if (this.__isNullOrUndefined($options.resizeBarHeight) === false && this.__isFunction($options.resizeBarHeight) === false) {
		throw '"$options.resizeBarHeight" must be Function!';
	}
	//#endregion

	var resizeBarWidth = '10px';
	var resizeBarHeight = '10px';
	if (this.__isNullOrUndefined($options.resizeBarWidth) === false) {
		resizeBarWidth = $options.resizeBarWidth;
	}
	if (this.__isNullOrUndefined($options.resizeBarHeight) === false) {
		resizeBarHeight = $options.resizeBarHeight;
	}

	var mixin = {
		on: {
			$init: function () {
				var self = this;

				self.$el.$.css({
					'touch-action': 'none'
				});

				if (
					self.$el.$.css('position') !== 'relative' &&
					self.$el.$.css('position') !== 'absolute' &&
					self.$el.$.css('position') !== 'fixed'
				) {
					self.$el.$.css('position', 'relative');
				}

				var resizeBarHorizantal = $d.q.create('div');
				resizeBarHorizantal.$.css({
					position: 'absolute',
					left: '0px',
					bottom: '0px',
					width: '100%',
					height: resizeBarHeight,
					cursor: 'n-resize'
				});
				if ($options.resizeX !== false) {
					self.$el.$.append(resizeBarHorizantal);
				}

				var resizeBarVertical = $d.q.create('div');
				resizeBarVertical.$.css({
					position: 'absolute',
					right: '0px',
					top: '0px',
					width: resizeBarWidth,
					height: '100%',
					cursor: 'w-resize'
				});
				if ($options.resizeY !== false) {
					self.$el.$.append(resizeBarVertical);
				}

				var resizeBarBoth = $d.q.create('div');
				resizeBarBoth.$.css({
					position: 'absolute',
					right: '0px',
					bottom: '0px',
					width: resizeBarWidth,
					height: resizeBarHeight,
					cursor: 'nw-resize'
				});
				if ($options.resizeX !== false && $options.resizeY !== false) {
					self.$el.$.append(resizeBarBoth);
				}

				self.__hide.resizable = {
					down: false,
					type: {
						w: false,
						h: false
					},
					barHorizantal: resizeBarHorizantal,
					barVertical: resizeBarVertical,
					barBoth: resizeBarBoth,
					coordinate: {
						x: 0,
						y: 0
					},
					size: {
						w: 0,
						h: 0
					}
				};

				var checkSize = function (w, h) {
					var result = {
						get w () {
							return w;
						},
						set w (value) {
							w = value;
							if ($options.resizeX !== false) {
								self.$el.style.width = w + 'px';
							}
						},
						get h () {
							return h;
						},
						set h (value) {
							h = value;
							if ($options.resizeY !== false) {
								self.$el.style.height = h + 'px';
							}
						}
					};
					result.w = w;
					result.h = h;

					if (self.__isNullOrUndefined($options.onResize) === false) {
						$options.onResize.call(self, result);
					}
				};

				var downEvent = function (e) {
					if (self.__hide.resizable.down === true) {
						return;
					}

					self.__hide.resizable.type.w = e.target === self.__hide.resizable.barHorizantal || e.target === self.__hide.resizable.barBoth;
					self.__hide.resizable.type.h = e.target === self.__hide.resizable.barVertical || e.target === self.__hide.resizable.barBoth;

					if (self.__hide.resizable.type.w === true || self.__hide.resizable.type.h === true) {
						if (e.type.indexOf('touch') >= 0) {
							e.clientX = e.touches[0].clientX;
							e.clientY = e.touches[0].clientY;
						} else {
							e.preventDefault();
						}
						self.__hide.resizable.down = true;

						if (self.__isNullOrUndefined($options.onBegin) === false) {
							$options.onBegin.call(self);
						}

						self.__hide.resizable.coordinate = {
							x: e.clientX,
							y: e.clientY
						};

						self.__hide.resizable.size = {
							w: self.$el.$.client.width,
							h: self.$el.$.client.height
						};
					}
				};
				$d.q.on('mousedown', downEvent);
				$d.q.on('touchstart', downEvent);

				var moveEvent = function (e) {
					if (self.__hide.resizable.down === false) {
						return;
					}

					if (e.type.indexOf('touch') >= 0) {
						e.clientX = e.touches[0].clientX;
						e.clientY = e.touches[0].clientY;
					}

					if (self.__hide.resizable.type.w === false) {
						self.__hide.resizable.coordinate.y = e.clientY;
					}
					if (self.__hide.resizable.type.h === false) {
						self.__hide.resizable.coordinate.x = e.clientX;
					}

					checkSize(self.__hide.resizable.size.w + (e.clientX - self.__hide.resizable.coordinate.x), self.__hide.resizable.size.h + (e.clientY - self.__hide.resizable.coordinate.y));
				};
				$d.q.on('mousemove', moveEvent);
				$d.q.on('touchmove', moveEvent);

				var upEvent = function (e) {
					if (self.__hide.resizable.down === false) {
						return;
					}

					self.__hide.resizable.down = false;
					if (self.__isNullOrUndefined($options.onEnd) === false) {
						$options.onEnd.call(self);
					}
				};
				$d.q.on('mouseup', upEvent);
				$d.q.on('touchend', upEvent);
				$d.q.on('touchcancel', upEvent);
			}
		}
	};

	return mixin;
});