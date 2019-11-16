/**
 * dmuka3.JS.Simple.OCD.Plugin.Number
 * {
 * 	precision(default: 2): <Number>,
 * 	format(default: true): <Boolean>,
 * 	formatChars(default: ['.', ',']): <Array(String)>
 * }
 */
$d.ocd.plugins.$add('number', function ($options) {
	//#region Validations
	if (this.__isNullOrUndefined($options) === true) {
		throw '"$options" must be filled!';
	}

	if (this.__isObject($options) === false) {
		throw '"$options" must be Object!';
	}

	if (this.__isNullOrUndefined($options.precision) === false && this.__isNumber($options.precision) === false) {
		throw '"$options.precision" must be Number!';
	}

	if (this.__isNullOrUndefined($options.format) === false && this.__isBool($options.format) === false) {
		throw '"$options.format" must be Boolean!';
	}

	if (this.__isNullOrUndefined($options.formatChars) === false && this.__isArray($options.formatChars) === false) {
		throw '"$options.formatChars" must be Array!';
	}

	if (this.__isNullOrUndefined($options.formatChars) === false && $options.formatChars.length !== 2) {
		throw '"$options.formatChars.length" must be 2!';
	}

	if (this.__isNullOrUndefined($options.formatChars) === false && this.__isString($options.formatChars[0]) === false) {
		throw '"$options.formatChars[0]" must be String!';
	}

	if (this.__isNullOrUndefined($options.formatChars) === false && this.__isString($options.formatChars[1]) === false) {
		throw '"$options.formatChars[1]" must be String!';
	}

	if (this.__isNullOrUndefined($options.formatChars) === false && $options.formatChars[0].length !== 1) {
		throw '"$options.formatChars[0].length" must be 1!';
	}

	if (this.__isNullOrUndefined($options.formatChars) === false && $options.formatChars[1].length !== 1) {
		throw '"$options.formatChars[1].length" must be 1!';
	}
	//#endregion

	var mixin = {
		get: function () {
			this.__hide.number.refreshInput();

			var val = this.$el.value;
			val = val.split(this.__hide.number.formatChars[0]).join('');
			val = val.split(this.__hide.number.formatChars[1]).join('.');
			return parseFloat(val);
		},
		set: function (value) {
			this.$el.value = value;
			this.__hide.number.refreshInput();
		},
		methods: {
			numberUpdate: function () {
				this.__hide.number.refreshInput();
			}
		},
		on: {
			$init: function () {
				var self = this;
				var formatChars = [',', '.'];
				if (this.__isNullOrUndefined($options.formatChars) === false) {
					formatChars = $options.formatChars;
				}

				var precision = 2;
				if (this.__isNullOrUndefined($options.precision) === false) {
					precision = $options.precision;
				}

				var inputEvent = function (e) {
					var val = this.value;
					var newVal = '';
					var cursorIndex = this.selectionStart;

					var dotExist = false;
					var precisionCounter = 0;
					var pc = null;
					for (var i = 0; i < val.length; i++) {
						var c = val[i];

						if (c >= '0' && c <= '9') {
							if (precisionCounter < precision || precision <= 0) {
								newVal += c;

								if (dotExist === true) {
									precisionCounter++;
								}
							}
						} else if ($options.format !== false) {
							if (c === formatChars[0]) {
								if (newVal.length !== 0 && c !== pc && dotExist === false) {
									newVal += c;
								} else if (i <= cursorIndex) {
									cursorIndex = Math.max(0, cursorIndex - 1);
								}
							} else if (c === formatChars[1]) {
								if (dotExist === false && pc !== formatChars[0] && precision > 0) {
									newVal += c;
								} else if (i <= cursorIndex) {
									cursorIndex = Math.max(0, cursorIndex - 1);;
								}
								dotExist = true;
							}
						}

						if (newVal.length > 0) {
							pc = newVal[newVal.length - 1];
						}
					}

					if ($options.format !== false) {
						var iop = newVal.indexOf(formatChars[1]);
						var dotCounter = 4;
						val = newVal;
						if (iop >= 0) {
							newVal = newVal.substr(iop);
						} else {
							newVal = '';
							iop = val.length;
						}

						for (var i = iop - 1; i >= 0; i--) {
							var c = val[i];

							if (dotCounter > 4) {
								dotCounter = 4;
							}
							dotCounter--;
							if (dotCounter < 0) {
								dotCounter = 4;
							}

							if (c === formatChars[0]) {
								if (dotCounter === 0) {
									newVal = c + newVal;
									dotCounter = 4;
								} else if (i <= cursorIndex) {
									dotCounter++;
									cursorIndex = Math.max(0, cursorIndex - 1);;
								}
							} else {
								if (dotCounter === 0) {
									newVal = formatChars[0] + newVal;
									if (i <= cursorIndex) {
										cursorIndex++;
									}
									dotCounter = 3;
								}
								newVal = c + newVal;
							}
						}
					}

					if (val.length === cursorIndex) {
						cursorIndex += 1;
					}

					if (this.value.length + 1 === newVal.length && newVal.length > 0 && (newVal[cursorIndex - 1] === formatChars[0] || newVal[cursorIndex - 1] === formatChars[1])) {
						cursorIndex = Math.max(0, cursorIndex - 1);;
					}

					this.value = newVal;
					if (this.value.length > cursorIndex) {
						this.selectionStart = cursorIndex;
						this.selectionEnd = cursorIndex;
					}
				};

				self.$el.$.on('input', inputEvent);

				self.__hide.number = {
					/**
					 * $options.formatChars
					 */
					formatChars: formatChars,
					/**
					 * This is only to provide more useful to be used with fill.
					 * It is used on focusin and focusout.
					 */
					previousValue: self.$el.value,
					/**
					 * Check all rules from the beginning.
					 */
					refreshInput: function () {
						inputEvent.call(self.$el, { preventDefault: function () { } });
					}
				};
			}
		}
	};

	return mixin;
});