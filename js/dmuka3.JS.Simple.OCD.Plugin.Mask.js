/**
 * dmuka3.JS.Simple.OCD.Plugin.Mask
 * {
 * 	data: {
 * 		$maskOptions: {
 * 			// ?    = All Characters
 * 			// 9    = Only Number
 * 			// a, A = Only Letter Insensitive
 * 			// l    = Only Lower Letter
 * 			// L    = Only Upper Letter
 * 			// Examples = ["99.99.9999 99:99", "L-99", "??LL99-AAA", ...]
 * 			mask: <String>,
 * 			fill?: <Boolean>
 * 		}
 * 	}
 * }
 */
$d.ocd.plugins.$add('mask', {
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
			//#region Validations
			if (this.__isNullOrUndefined(this.$maskOptions) === true) {
				console.error(this.__alias + ' "data.$maskOptions" must be filled!', this);
				throw this.__alias + ' "data.$maskOptions" must be filled!';
			}

			if (this.__isObject(this.$maskOptions) === false) {
				console.error(this.__alias + ' "data.$maskOptions" must be Object!', this);
				throw this.__alias + ' "data.$maskOptions" must be Object!';
			}

			if (this.__isString(this.$maskOptions.mask) === false) {
				console.error(this.__alias + ' "data.$maskOptions.mask" must be String!', this);
				throw this.__alias + ' "data.$maskOptions.mask" must be String!';
			}

			if (this.__isNullOrUndefined(this.$maskOptions.fill) === false && this.__isBool(this.$maskOptions.fill) === false) {
				console.error(this.__alias + ' "data.$maskOptions.fill" must be Boolean!', this);
				throw this.__alias + ' "data.$maskOptions.fill" must be Boolean!';
			}
			//#endregion

			var self = this;

			var inputEvent = function (e) {
				var val = this.value;
				var newVal = '';
				var cursorIndex = this.selectionStart;
				var countMaskCharacter = 0;

				var maskIndex = 0;
				for (let i = 0; i < val.length; i++) {
					if (maskIndex >= self.$maskOptions.mask.length) {
						break;
					}

					var c = val[i];
					var mask = self.$maskOptions.mask[maskIndex];
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

							if (maskIndex >= self.$maskOptions.mask.length) {
								break;
							}
						} else {
							break;
						}

						mask = self.$maskOptions.mask[maskIndex];
					}

					if (i >= val.length) {
						break;
					}

					if (maskIndex >= self.$maskOptions.mask.length) {
						break;
					}

					mask = self.$maskOptions.mask[maskIndex];

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
			if (this.$maskOptions.fill === true) {
				self.$el.$.on('focusout', function (e) {
					if (this.value.length !== self.$maskOptions.mask.length) {
						self.__hide.mask.previousValue = this.value;
						this.value = '';
					}
				}).on('focus', function (e) {
					if (this.value.length === 0) {
						this.value = self.__hide.mask.previousValue;
					}
				});
			}

			self.__hide.mask = {
				previousValue: self.$el.value,
				refreshInput: function () {
					inputEvent.call(self.$el, { preventDefault: function () { } });
				}
			};
		}
	}
});