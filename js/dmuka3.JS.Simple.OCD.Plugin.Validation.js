/**
 * dmuka3.JS.Simple.OCD.Plugin.Validation
 * {
 * 	$callback?: <function([this]$ocd, result)>,
 * 	props...: {
 * 		maxlen?: <number>,
 * 		minlen?: <number>,
 * 		max?: <number>,
 * 		min?: <number>,
 * 		regex?: <regexp>,
 * 		email?: <boolean>,
 * 		required?: <boolean>,
 * 		check?: <function([this]$ocd)>,
 * 		callback?: <function([this]$ocd, result)>
 * 	}
 * }
 */
$d.ocd.plugins.$add('validation', function ($options) {
	//#region Validations
	if (this.__isNullOrUndefined($options) === true) {
		$options = {};
	}

	if (this.__isObject($options) === false) {
		throw '"$options" must be Object!';
	}

	if (this.__isNullOrUndefined($options.$callback) === false && this.__isFunction($options.$callback) === false) {
		throw '"$options.$callback" must be Function!';
	}

	var props = this.__getPropAsObject($options);
	var existsProp = false;
	for (var key in props) {
		if (key === '$callback') {
			continue;
		}

		existsProp = true;
		var prop = $options[key];

		if (this.__isObject(prop) === false) {
			throw '"$options.' + key + '" must be Object!';
		}

		if (this.__isNullOrUndefined(prop.message) === false && this.__isObject(prop.message) === false) {
			throw '"$options.' + key + '.message" must be Object!';
		}

		if (this.__isNullOrUndefined(prop.maxlen) === false && this.__isNumber(prop.maxlen) === false) {
			throw '"$options.' + key + '.maxlen" must be Number!';
		}

		if (this.__isNullOrUndefined(prop.minlen) === false && this.__isNumber(prop.minlen) === false) {
			throw '"$options.' + key + '.minlen" must be Number!';
		}

		if (this.__isNullOrUndefined(prop.max) === false && this.__isNumber(prop.max) === false) {
			throw '"$options.' + key + '.max" must be Number!';
		}

		if (this.__isNullOrUndefined(prop.min) === false && this.__isNumber(prop.min) === false) {
			throw '"$options.' + key + '.min" must be Number!';
		}

		if (this.__isNullOrUndefined(prop.regex) === false && this.__isRegex(prop.regex) === false) {
			throw '"$options.' + key + '.regex" must be Regex!';
		}

		if (this.__isNullOrUndefined(prop.email) === false && this.__isBool(prop.email) === false) {
			throw '"$options.' + key + '.email" must be Boolean!';
		}

		if (this.__isNullOrUndefined(prop.required) === false && this.__isBool(prop.required) === false) {
			throw '"$options.' + key + '.required" must be Boolean!';
		}

		if (this.__isNullOrUndefined(prop.check) === false && this.__isFunction(prop.check) === false) {
			throw '"$options.' + key + '.check" must be Boolean!';
		}

		if (this.__isNullOrUndefined(prop.callback) === false && this.__isFunction(prop.callback) === false) {
			throw '"$options.' + key + '.callback" must be Function!';
		}
	}

	if (existsProp === false) {
		throw 'At least "$options" must have a property!';
	}
	//#endregion

	var mixin = {
		methods: {
			valid: function () {
				var resultAll = {
					ok: true,
					errs: []
				};
				var self = this;

				for (var key in props) {
					if (key === '$callback') {
						continue;
					}

					var prop = $options[key];
					if (self.__isNullOrUndefined(prop.message) === true) {
						prop.message = {};
					}

					var subControl = null;
					subControl = function (levels, levelIndex, o, ocd) {
						if (levelIndex + 1 === levels.length) {
							var propValue = o[levels[levelIndex]];

							var checkErr = function (prop, propValue) {
								if (propValue.__isOcdItem === true) {
									ocd = propValue;
								}

								if (propValue.__isOcdValueItem === true) {
									propValue = propValue.value;
								}

								var result = {
									ok: true,
									errs: []
								};

								if (self.__isNullOrUndefined(prop.maxlen) === false && prop.maxlen < propValue.length) {
									result.ok = false;
									result.errs.push({
										type: 'maxlen',
										message: prop.message['maxlen'],
										prop: key,
										ocd: ocd
									});
								}

								if (self.__isNullOrUndefined(prop.minlen) === false && prop.minlen > propValue.length) {
									result.ok = false;
									result.errs.push({
										type: 'minlen',
										message: prop.message['minlen'],
										prop: key,
										ocd: ocd
									});
								}

								if (self.__isNullOrUndefined(prop.max) === false && prop.max < propValue) {
									result.ok = false;
									result.errs.push({
										type: 'max',
										message: prop.message['max'],
										prop: key,
										ocd: ocd
									});
								}

								if (self.__isNullOrUndefined(prop.min) === false && prop.min > propValue) {
									result.ok = false;
									result.errs.push({
										type: 'min',
										message: prop.message['min'],
										prop: key,
										ocd: ocd
									});
								}

								if (self.__isNullOrUndefined(prop.regex) === false && prop.regex.test(propValue) === false) {
									result.ok = false;
									result.errs.push({
										type: 'regex',
										message: prop.message['regex'],
										prop: key,
										ocd: ocd
									});
								}

								if (self.__isNullOrUndefined(prop.email) === false && /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(propValue) === false) {
									result.ok = false;
									result.errs.push({
										type: 'email',
										message: prop.message['email'],
										prop: key,
										ocd: ocd
									});
								}

								if (self.__isNullOrUndefined(prop.required) === false && prop.required === true && (self.__isNullOrUndefined(propValue) === true || propValue.length <= 0)) {
									result.ok = false;
									result.errs.push({
										type: 'required',
										message: prop.message['required'],
										prop: key,
										ocd: ocd
									});
								}

								if (self.__isNullOrUndefined(prop.check) === false && prop.check.call(ocd) !== true) {
									result.ok = false;
									result.errs.push({
										type: 'check',
										message: prop.message['check'],
										prop: key,
										ocd: ocd
									});
								}

								if (self.__isNullOrUndefined(prop.callback) === false) {
									prop.callback.call(ocd, result);
								}

								if (self.__isNullOrUndefined($options.$callback) === false) {
									$options.$callback.call(ocd, result);
								}

								if (result.ok === false) {
									resultAll.ok = false;

									for (var i = 0; i < result.errs.length; i++) {
										resultAll.errs.push(result.errs[i]);
									}
								}
							};

							if (self.__isArray(propValue) === false) {
								checkErr(prop, propValue);
							} else {
								for (var i = 0; i < propValue.length; i++) {
									var item = propValue[i];
									checkErr(prop, item);
								}
							}
						} else {
							var oPropValue = o[levels[levelIndex]];
							if (self.__isArray(oPropValue) === false) {
								if (oPropValue.__isOcdItem === true) {
									ocd = oPropValue;
								}
								subControl(levels, levelIndex + 1, oPropValue, ocd);
							} else {
								for (var i = 0; i < oPropValue.length; i++) {
									var item = oPropValue[i];
									if (item.__isOcdItem === true) {
										ocd = item;
									}
									subControl(levels, levelIndex + 1, item, ocd);
								}
							}
						}
					};
					subControl(key.split('.'), 0, self, self);
				}

				return resultAll;
			}
		}
	};

	return mixin;
});