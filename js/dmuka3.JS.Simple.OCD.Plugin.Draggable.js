/**
 * dmuka3.JS.Simple.OCD.Plugin.Draggable
 * {
 * 	timeout?(default: 0): <Number>,
 * 	content?(default: $el.parentElement): <String|HTML>,
 * 	contentX?(default: false): <Boolean>,
 * 	contentY?(default: false): <Boolean>,
 * 	moveX?(default: true): <Boolean>,
 * 	moveY?(default: true): <Boolean>,
 * 	onMove?: <Function([this]$ocd, pos)>,
 * 	onDown?: <Function([this]$ocd)>,
 * 	onUp?: <Function([this]$ocd)>,
 * 	onBegin?: <Function([this]$ocd)>,
 * 	onEnd?: <Function([this]$ocd)>
 * }
 */
$d.ocd.plugins.$add('draggable', function ($options) {
	//#region Validations
	if (this.__isNullOrUndefined($options) === true) {
		throw '"$options" must be filled!';
	}

	if (this.__isObject($options) === false) {
		throw '"$options" must be Object!';
	}

	if (this.__isNullOrUndefined($options.timeout) === false && this.__isNumber($options.timeout) === false) {
		throw '"$options.timeout" must be Number!';
	}

	if (this.__isNullOrUndefined($options.content) === false && this.__isString($options.content) === false && this.__isHTML($options.content) === false) {
		throw '"$options.content" must be String or HTML Element!';
	}

	if (this.__isNullOrUndefined($options.contentX) === false && this.__isBool($options.contentX) === false) {
		throw '"$options.contentX" must be Boolean!';
	}

	if (this.__isNullOrUndefined($options.contentX) === false && this.__isBool($options.contentX) === false) {
		throw '"$options.contentX" must be Boolean!';
	}

	if (this.__isNullOrUndefined($options.moveX) === false && this.__isBool($options.moveX) === false) {
		throw '"$options.moveX" must be Boolean!';
	}

	if (this.__isNullOrUndefined($options.moveY) === false && this.__isBool($options.moveY) === false) {
		throw '"$options.moveY" must be Boolean!';
	}

	if (this.__isNullOrUndefined($options.onMove) === false && this.__isFunction($options.onMove) === false) {
		throw '"$options.onMove" must be Function!';
	}

	if (this.__isNullOrUndefined($options.onDown) === false && this.__isFunction($options.onDown) === false) {
		throw '"$options.onDown" must be Function!';
	}

	if (this.__isNullOrUndefined($options.onUp) === false && this.__isFunction($options.onUp) === false) {
		throw '"$options.onUp" must be Function!';
	}

	if (this.__isNullOrUndefined($options.onBegin) === false && this.__isFunction($options.onBegin) === false) {
		throw '"$options.onBegin" must be Function!';
	}

	if (this.__isNullOrUndefined($options.onEnd) === false && this.__isFunction($options.onEnd) === false) {
		throw '"$options.onEnd" must be Function!';
	}
	//#endregion

	var mixin = {
		on: {
			$init: function () {
				var self = this;

				self.$el.$.css({
					position: 'absolute',
					'touch-action': 'none'
				});

				self.__hide.draggable = {
					content: self.$el.parentElement,
					down: false,
					active: false,
					coordinate: {
						x: 0,
						y: 0
					},
					timeout: $options.timeout,
					timer: null
				};

				if (self.__isNullOrUndefined(self.__hide.draggable.timeout) === true) {
					self.__hide.draggable.timeout = 0;
				}

				if (this.__isString($options.content) === true) {
					self.__hide.draggable.content = $d.q.first($options.content);
				} else if (this.__isHTML($options.content) === true) {
					self.__hide.draggable.content = $options.content;
				}

				if (this.__isNullOrUndefined(self.__hide.draggable.content) === true) {
					throw 'content\'s result must not be null!';
				}

				var checkPosition = function (x, y) {
					var result = {
						get x () {
							return x;
						},
						set x (value) {
							x = value;
							if ($options.moveX !== false) {
								self.$el.style.left = x + 'px';
							}
						},
						get y () {
							return y;
						},
						set y (value) {
							y = value;
							if ($options.moveY !== false) {
								self.$el.style.top = y + 'px';
							}
						}
					};
					result.x = x - self.__hide.draggable.coordinate.x;
					result.y = y - self.__hide.draggable.coordinate.y;

					if (self.__isNullOrUndefined($options.onMove) === false) {
						$options.onMove.call(self, result);
					}

					if ($options.contentX === true) {
						if (self.$el.$.screen.left < self.__hide.draggable.content.$.screen.left) {
							result.x += (self.__hide.draggable.content.$.screen.left - self.$el.$.screen.left);
						} else if (self.$el.$.screen.left + self.$el.$.screen.width > self.__hide.draggable.content.$.screen.left + self.__hide.draggable.content.$.screen.width) {
							result.x -= ((self.$el.$.screen.left + self.$el.$.screen.width) - (self.__hide.draggable.content.$.screen.left + self.__hide.draggable.content.$.screen.width));
						}
					}

					if ($options.contentY === true) {
						if (self.$el.$.screen.top < self.__hide.draggable.content.$.screen.top) {
							result.y += (self.__hide.draggable.content.$.screen.top - self.$el.$.screen.top);
						} else if (self.$el.$.screen.top + self.$el.$.screen.height > self.__hide.draggable.content.$.screen.top + self.__hide.draggable.content.$.screen.height) {
							result.y -= ((self.$el.$.screen.top + self.$el.$.screen.height) - (self.__hide.draggable.content.$.screen.top + self.__hide.draggable.content.$.screen.height));
						}
					}
				};

				var downEvent = function (e) {
					if (self.__hide.draggable.down === true) {
						return;
					}

					if (e.target === self.$el || self.$el.$.has(e.target) === true) {
						if (e.type.indexOf('touch') >= 0) {
							e.pageX = e.touches[0].pageX;
							e.pageY = e.touches[0].pageY;
							e.clientX = e.touches[0].clientX;
							e.clientY = e.touches[0].clientY;
						} else {
							e.preventDefault();
						}
						e.stopPropagation();
						self.__hide.draggable.down = true;

						self.__hide.draggable.coordinate = {
							x: (e.clientX - self.$el.$.screen.left),
							y: (e.clientY - self.$el.$.screen.top)
						};

						if (self.__isNullOrUndefined($options.onDown) === false) {
							$options.onDown.call(self);
						}

						var activeDrag = function () {
							if (self.__isNullOrUndefined($options.onBegin) === false) {
								$options.onBegin.call(self);
							}

							self.__hide.draggable.active = true;
							checkPosition(e.pageX, e.pageY);
						};
						if (self.__hide.draggable.timeout > 0) {
							self.__hide.draggable.timer = setTimeout(function () {
								self.__hide.draggable.timer = null;
								if (self.__hide.draggable.down === true) {
									activeDrag();
								}
							}, self.__hide.draggable.timeout);
						} else {
							activeDrag();
						}
					}
				};
				$d.q.on('mousedown', downEvent);
				$d.q.on('touchstart', downEvent);

				var moveEvent = function (e) {
					if (self.__hide.draggable.active === false) {
						return;
					}

					if (e.type.indexOf('touch') >= 0) {
						e.pageX = e.touches[0].pageX;
						e.pageY = e.touches[0].pageY;
					}
					checkPosition(e.pageX, e.pageY);
				};
				$d.q.on('mousemove', moveEvent);
				$d.q.on('touchmove', moveEvent);

				var upEvent = function (e) {
					if (self.__hide.draggable.down === false) {
						return;
					}

					if (self.__isNullOrUndefined($options.onUp) === false) {
						$options.onUp.call(self);
					}

					var active = self.__hide.draggable.active;
					self.__hide.draggable.down = false;
					self.__hide.draggable.active = false;
					clearTimeout(self.__hide.draggable.timer);
					self.__hide.draggable.timer = null;

					if (e.type.indexOf('touch') >= 0) {
						if (active === true) {
							if (self.__isNullOrUndefined($options.onEnd) === false) {
								$options.onEnd.call(self);
							}
						}
						return;
					} else {
						e.preventDefault();
					}
					e.stopPropagation();

					if (active === true) {
						if (self.__isNullOrUndefined($options.onEnd) === false) {
							$options.onEnd.call(self);
						}
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