/**
 * dmuka3.JS.Simple.OCD.Plugin.Mask
 * {
 * 	// ?    = All Characters
 * 	// 9    = Only Number
 * 	// a, A = Only Letter Insensitive
 * 	// l    = Only Lower Letter
 * 	// L    = Only Upper Letter
 * 	// Examples = ["99.99.9999 99:99", "L-99", "??LL99-AAA", ...]
 * 	mask: <String>,
 * 	// Required completely filling.
 * 	fill?: <Boolean>
 * }
 */
$d.ocd.plugins.$add('mask', function ($options) {
	//#region Validations
	if (this.__isNullOrUndefined($options) === true) {
		throw '"$options" must be filled!';
	}

	if (this.__isObject($options) === false) {
		throw '"$options" must be Object!';
	}

	if (this.__isString($options.mask) === false) {
		throw '"$options.mask" must be String!';
	}

	if (this.__isNullOrUndefined($options.fill) === false && this.__isBool($options.fill) === false) {
		throw '"$options.fill" must be Boolean!';
	}
	//#endregion

	var mixin = {
		get: function () {
			this.__hide.mask.refreshInput();
			return this.$el.value;
		},
		set: function (value) {
			this.$el.value = value;
			this.__hide.mask.refreshInput();
		},
		methods: {
			maskUpdate: function () {
				this.__hide.mask.refreshInput();
			}
		},
		on: {
			$init: function () {
				var self = this;

				var inputEvent = function (e) {
					var val = this.value;
					var newVal = '';
					var cursorIndex = this.selectionStart;
					var countMaskCharacter = 0;

					var maskIndex = 0;
					for (var i = 0; i < val.length; i++) {
						if (maskIndex >= $options.mask.length) {
							break;
						}

						var c = val[i];
						var mask = $options.mask[maskIndex];
						while (true) {
							if (mask !== '?' && mask !== '9' && mask !== 'a' && mask !== 'A' && mask !== 'l' && mask !== 'L') {
								newVal += mask;

								if (c === mask) {
									i++;

									if (i >= val.length) {
										break;
									}

									c = val[i];
								} else {
									if (i === cursorIndex - 1) {
										countMaskCharacter++;
									}
								}

								maskIndex++;

								if (maskIndex >= $options.mask.length) {
									break;
								}
							} else {
								break;
							}

							mask = $options.mask[maskIndex];
						}

						if (i >= val.length) {
							break;
						}

						if (maskIndex >= $options.mask.length) {
							break;
						}

						mask = $options.mask[maskIndex];

						if (mask === '9') {
							if (c >= '0' && c <= '9') {
								newVal += c;
								maskIndex++;
							}
						} else if (mask === 'a' || mask === 'A') {
							if (c.toUpperCase() !== c || c.toLowerCase() !== c) {
								newVal += c;
								maskIndex++;
							}
						} else if (mask === '?') {
							newVal += c;
							maskIndex++;
						} else if (mask === 'l') {
							if (c.toUpperCase() !== c && c.toLowerCase() === c) {
								newVal += c;
								maskIndex++;
							}
						} else if (mask === 'L') {
							if (c.toLowerCase() !== c && c.toUpperCase() === c) {
								newVal += c;
								maskIndex++;
							}
						}
					}

					if (val.length === cursorIndex) {
						cursorIndex += 1;
					}
					cursorIndex += countMaskCharacter;

					this.value = newVal;
					if (this.value.length > cursorIndex) {
						this.selectionStart = cursorIndex;
						this.selectionEnd = cursorIndex;
					}
				};

				self.$el.$.on('input', inputEvent);

				self.__hide.mask = {
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

				if ($options.fill === true) {
					if (self.$el.value.length !== $options.mask.length) {
						self.$el.value = '';
					}

					self.$el.$.on('focusout', function (e) {
						if (this.value.length !== $options.mask.length) {
							self.__hide.mask.previousValue = this.value;
							this.value = '';
						}
					}).on('focus', function (e) {
						if (this.value.length === 0) {
							this.value = self.__hide.mask.previousValue;
							this.selectionStart = this.value.length;
							this.selectionEnd = this.value.length;
						}
					});
				}
			}
		}
	};

	return mixin;
});