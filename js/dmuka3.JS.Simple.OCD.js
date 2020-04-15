/**
 * https://github.com/muhammet-kandemir-95/dmuka3.JS.Simple.OCD
 * 
 * Object Connect to DOM
 * _______/\\\\\_____________/\\\\\\\\\__/\\\\\\\\\\\\____        
 *  _____/\\\///\\\________/\\\////////__\/\\\////////\\\__       
 *   ___/\\\/__\///\\\____/\\\/___________\/\\\______\//\\\_      
 *    __/\\\______\//\\\__/\\\_____________\/\\\_______\/\\\_     
 *     _\/\\\_______\/\\\_\/\\\_____________\/\\\_______\/\\\_    
 *      _\//\\\______/\\\__\//\\\____________\/\\\_______\/\\\_   
 *       __\///\\\__/\\\_____\///\\\__________\/\\\_______/\\\__  
 *        ____\///\\\\\/________\////\\\\\\\\\_\/\\\\\\\\\\\\/___ 
 *         ______\/////_____________\/////////__\////////////_____
 */
(function () {
	var $oldBrowser = false;

	var ocdElId = 1;
	function ocdElIdProcess (el, fnc) {
		ocdElId++;
		if (el.parentNode == null) {
			var elp = document.createElement('div');
			elp.append(el);
		}
		el.setAttribute('ocd-el-id', ocdElId.toString());
		fnc(ocdElId.toString());
		el.removeAttribute('ocd-el-id');
	}

	//#region Check Variable by ?
	/**
	 * Is variable's type boolean?
	 * @param {any} value 
	 * @param {string} errorVariableName 
	 */
	function checkVariableIsBoolean (value, errorVariableName) {
		if (checkVariableIsNullOrUndefined(value) === true) {
			return false;
		}

		if (value.constructor.name !== 'Boolean') {
			if (errorVariableName !== null && errorVariableName !== undefined) {
				throw errorVariableName + ' must be a Boolean!';
			}
			return false;
		}
		return true;
	}

	/**
	 * Is variable's type regex?
	 * @param {any} value 
	 * @param {string} errorVariableName 
	 */
	function checkVariableIsRegex (value, errorVariableName) {
		if (checkVariableIsNullOrUndefined(value) === true) {
			return false;
		}

		if (value.constructor.name !== 'RegExp') {
			if (errorVariableName !== null && errorVariableName !== undefined) {
				throw errorVariableName + ' must be a RegExp!';
			}
			return false;
		}
		return true;
	}

	/**
	 * Is variable's type object?
	 * @param {any} value 
	 * @param {string} errorVariableName 
	 */
	function checkVariableIsObject (value, errorVariableName) {
		if (checkVariableIsNullOrUndefined(value) === true) {
			return false;
		}

		if (value.constructor.name !== 'Object') {
			if (errorVariableName !== null && errorVariableName !== undefined) {
				throw errorVariableName + ' must be a Object!';
			}
			return false;
		}
		return true;
	}

	/**
	 * Is variable's type function?
	 * @param {any} value 
	 * @param {string} errorVariableName 
	 */
	function checkVariableIsFunction (value, errorVariableName) {
		if (checkVariableIsNullOrUndefined(value) === true) {
			return false;
		}

		if (value.constructor.name !== 'Function') {
			if (errorVariableName !== null && errorVariableName !== undefined) {
				throw errorVariableName + ' must be a Function!';
			}
			return false;
		}
		return true;
	}

	/**
	 * Is variable's type array/node list?
	 * @param {any} value 
	 * @param {string} errorVariableName 
	 */
	function checkVariableIsArray (value, errorVariableName) {
		if (checkVariableIsNullOrUndefined(value) === true) {
			return false;
		}

		if (value.constructor.name !== 'Array' && value.constructor.name !== 'NodeList') {
			if (errorVariableName !== null && errorVariableName !== undefined) {
				throw errorVariableName + ' must be a Array or a NodeList!';
			}
			return false;
		}
		return true;
	}

	/**
	 * Is variable's type date?
	 * @param {any} value 
	 * @param {string} errorVariableName 
	 */
	function checkVariableIsDate (value, errorVariableName) {
		if (checkVariableIsNullOrUndefined(value) === true) {
			return false;
		}

		if (value.constructor.name !== 'Date') {
			if (errorVariableName !== null && errorVariableName !== undefined) {
				throw errorVariableName + ' must be date!';
			}
			return false;
		}
		return true;
	}

	/**
	 * Is variable's type string?
	 * @param {any} value 
	 * @param {string} errorVariableName 
	 */
	function checkVariableIsString (value, errorVariableName) {
		if (checkVariableIsNullOrUndefined(value) === true) {
			return false;
		}

		if (value.constructor.name !== 'String') {
			if (errorVariableName !== null && errorVariableName !== undefined) {
				throw errorVariableName + ' must be string!';
			}
			return false;
		}
		return true;
	}

	/**
	 * Is variable's type number?
	 * @param {any} value 
	 * @param {number} errorVariableName 
	 */
	function checkVariableIsNumber (value, errorVariableName) {
		if (checkVariableIsNullOrUndefined(value) === true) {
			return false;
		}

		if (value.constructor.name !== 'Number') {
			if (errorVariableName !== null && errorVariableName !== undefined) {
				throw errorVariableName + ' must be number!';
			}
			return false;
		}
		return true;
	}

	/**
	 * Is variable's type null/undefined?
	 * @param {any} value 
	 * @param {string} errorVariableName 
	 */
	function checkVariableIsNullOrUndefined (value, errorVariableName) {
		if (value === null || value === undefined) {
			if (errorVariableName !== null && errorVariableName !== undefined) {
				throw errorVariableName + ' must be filled!';
			}
			return true;
		}
		return false;
	}

	/**
	 * Is variable's type html element?
	 * @param {any} value 
	 * @param {string} errorVariableName 
	 */
	function checkVariableIsHTML (value, errorVariableName) {
		if (checkVariableIsNullOrUndefined(value) === true) {
			return false;
		}

		var constructorName = value.constructor.name;
		if ((constructorName.indexOf('HTML') === 0 && constructorName.indexOf('Element') === constructorName.length - 7) === false) {
			if (errorVariableName !== null && errorVariableName !== undefined) {
				throw errorVariableName + ' must be a HTML Element!';
			}
			return false;
		}
		return true;
	}
	//#endregion


	//#region HTML Element Prototypes
	var _$ = {
		get: function () {
			var self = this;
			if (self.__ocdElementData === null || self.__ocdElementData === undefined) {
				self.__ocdElementData = {};
			}

			var result = null;
			result = {
				get $el () {
					return self;
				},
				get $ocd () {
					return self.$ocd;
				},
				get $parentOcd () {
					if (checkVariableIsNullOrUndefined(self.$ocd) === false) {
						if (checkVariableIsNullOrUndefined(self.$ocd.$list) === false) {
							return self.$ocd.$list;
						}
						return self.$ocd.$parent;
					} else {
						var el = self.parentNode;

						while (checkVariableIsNullOrUndefined(el.$ocd) === true) {
							el = el.parentNode;
						}

						return el.$ocd;
					}
				},
				get parent () {
					return self.parentNode;
				},
				get screen () {
					return self.getClientRects()[0];
				},
				get client () {
					var result = {
						x: self.clientLeft,
						y: self.clientTop,
						left: self.clientLeft,
						top: self.clientTop,
						width: self.clientWidth,
						height: self.clientHeight
					};

					return result;
				},
				get addClass () {
					return function (value) {
						try {
							self.classList.add(value);
						} catch (error) {
							// IE 9 > Version
							var classAttr = self.getAttribute('class');
							if (checkVariableIsNullOrUndefined(classAttr) === true) {
								classAttr = '';
							}
							if (classAttr === value) {
								classAttr = '';
							}
							classAttr = classAttr.replace(' ' + value, '').replace(value + ' ', '');
							classAttr += ' ' + value;
							self.setAttribute('class', classAttr);
						}
						return result;
					};
				},
				get removeClass () {
					return function (value) {
						try {
							self.classList.remove(value);
						} catch (error) {
							// IE 9 > Version
							var classAttr = self.getAttribute('class');
							if (checkVariableIsNullOrUndefined(classAttr) === true) {
								classAttr = '';
							}
							if (classAttr.trim() === value) {
								classAttr = '';
							}
							classAttr = classAttr.replace(' ' + value, '').replace(value + ' ', '');
							self.setAttribute('class', classAttr);
						}
						return result;
					};
				},
				get containsClass () {
					return function (value) {
						try {
							return self.classList.contains(value);
						} catch (error) {
							// IE 9 > Version
							var classAttr = self.getAttribute('class');
							if (checkVariableIsNullOrUndefined(classAttr) === true) {
								classAttr = '';
							}
							classAttr = classAttr.trim();
							while (classAttr.indexOf('  ') >= 0) {
								classAttr = classAttr.split('  ').join(' ');
							}
							return classAttr.trim() === value || classAttr.indexOf(' ' + value + ' ') >= 0 || classAttr.indexOf(' ' + value) === classAttr.length - value.length - 1 || classAttr.indexOf(value + ' ') === 0;
						}
					};
				},
				get attr () {
					return function () {
						if (arguments.length === 1) {
							return self.getAttribute(arguments[0]);
						} else if (arguments.length === 2) {
							self.setAttribute(arguments[0], arguments[1]);
							return result;
						}
					};
				},
				get removeAttr () {
					return function (name) {
						self.removeAttribute(name);
						return result;
					};
				},
				get css () {
					return function () {
						if (arguments.length === 1) {
							if (checkVariableIsString(arguments[0]) === true) {
								return self.style[arguments[0]];
							} else {
								for (var key in arguments[0]) {
									if (checkVariableIsNullOrUndefined(arguments[0][key]) == false && arguments[0][key].indexOf('!important') === arguments[0][key].length - '!important'.length) {
										self.style.setProperty(key, arguments[0][key].substr(0, arguments[0][key].length - '!important'.length), 'important');
									} else {
										self.style[key] = arguments[0][key];
									}
								}
							}
						} else if (arguments.length === 2) {
							if (checkVariableIsNullOrUndefined(arguments[1]) == false && arguments[1].indexOf('!important') === arguments[1].length - '!important'.length) {
								self.style.setProperty(arguments[0], arguments[1].substr(0, arguments[1].length - '!important'.length), 'important');
							} else {
								self.style[arguments[0]] = arguments[1];
							}
							return result;
						}
					};
				},
				get computedCss () {
					return function () {
						var computed = window.getComputedStyle(self, null);

						if (arguments.length === 1) {
							return computed[arguments[0]];
						} else {
							return computed;
						}
					}
				},
				get data () {
					return function () {
						if (arguments.length === 1) {
							return self.__ocdElementData[arguments[0]];
						} else if (arguments.length === 2) {
							self.__ocdElementData[arguments[0]] = arguments[1];
							return result;
						}
					};
				},
				get val () {
					return function () {
						if (arguments.length === 0) {
							switch (self.tagName) {
								case 'INPUT': {
									var type = self.getAttribute('type');
									if (checkVariableIsNullOrUndefined(type) === true) {
										type = 'text';
									}
									type = type.toLowerCase();

									switch (type) {
										case 'checkbox':
										case 'radio':
											return self.checked;
									}
								}
									break;
							}

							return self.value;
						} else if (arguments.length === 1) {
							switch (self.tagName) {
								case 'INPUT': {
									var type = self.getAttribute('type');
									if (checkVariableIsNullOrUndefined(type) === true) {
										type = 'text';
									}
									type = type.toLowerCase();

									switch (type) {
										case 'checkbox':
										case 'radio':
											self.checked = arguments[0];
											return result;
									}
								}
									break;
							}

							self.value = arguments[0];
							return result;
						}
					};
				},
				get create () {
					return function (tagNameOrHtml) {
						return window.$q.create(tagNameOrHtml);
					};
				},
				get html () {
					return function () {
						if (arguments.length === 0) {
							return self.innerHTML;
						} else if (arguments.length === 1) {
							self.innerHTML = arguments[0];
							return result;
						}
					};
				},
				get text () {
					return function () {
						if (arguments.length === 0) {
							return self.innerText;
						} else if (arguments.length === 1) {
							self.innerText = arguments[0];
							return result;
						}
					};
				},
				get is () {
					return function (query) {
						return self.matches(query);
					};
				},
				get on () {
					return function (name, fnc, options) {
						self.addEventListener(name, fnc, options);
						return result;
					};
				},
				get removeEvent () {
					return function (name, fnc, options) {
						self.removeEventListener(name, fnc, options);
						return result;
					};
				},
				get find () {
					return function (query) {
						if ($oldBrowser === false) {
							return self.querySelectorAll(':scope ' + query);
						}

						if (query.trim()[0] === '>') {
							var result = [];
							ocdElIdProcess(self, function (ocdElId) {
								result = self.parentNode.querySelectorAll('*[ocd-el-id="' + ocdElId + '"] ' + query);
							});
							return result;
						}

						return self.querySelectorAll(query);
					};
				},
				get first () {
					return function (query) {
						if ($oldBrowser === false) {
							return self.querySelector(':scope ' + query);
						}

						if (query.trim()[0] === '>') {
							var result = null;
							ocdElIdProcess(self, function (ocdElId) {
								result = self.parentNode.querySelector('*[ocd-el-id="' + ocdElId + '"] ' + query);
							});
							return result;
						}

						return self.querySelector(query);
					};
				},
				get append () {
					return function (el) {
						if (checkVariableIsArray(el) === true) {
							for (var i = 0; i < el.length; i++) {
								var elItem = el[i];
								if (checkVariableIsString(elItem) === true) {
									elItem = window.$q.create(elItem);
								}

								self.appendChild(elItem);
							}
							return result;
						}

						if (checkVariableIsString(el) === true) {
							el = window.$q.create(el);
						}
						self.appendChild(el);
						return result;
					};
				},
				get prepend () {
					return function (el) {
						if (checkVariableIsArray(el) === true) {
							for (var i = 0; i < el.length; i++) {
								var elItem = el[i];
								if (checkVariableIsString(elItem) === true) {
									elItem = window.$q.create(elItem);
								}

								self.insertBefore(elItem, self.firstChild);
							}
							return result;
						}

						if (checkVariableIsString(el) === true) {
							el = window.$q.create(el);
						}
						self.insertBefore(el, self.firstChild);
						return result;
					};
				},
				get insertBefore () {
					return function (el) {
						if (checkVariableIsArray(el) === true) {
							for (var i = 0; i < el.length; i++) {
								var elItem = el[i];

								elItem.parentNode.insertBefore(self, elItem);
								break;
							}
							return result;
						}

						el.parentNode.insertBefore(self, el);
						return result;
					};
				},
				get insertAfter () {
					return function (el) {
						if (checkVariableIsArray(el) === true) {
							for (var i = 0; i < el.length; i++) {
								var elItem = el[i];

								elItem.parentNode.insertBefore(self, elItem.nextSibling);
								break;
							}
							return result;
						}

						el.parentNode.insertBefore(self, el.nextSibling);
						return result;
					};
				},
				get has () {
					return function (el) {
						if (checkVariableIsArray(el) === true) {
							var hasResultAll = false;

							ocdElId++;
							for (var i = 0; i < el.length; i++) {
								var elItem = el[i];

								var hasResult = false;

								if (checkVariableIsString(elItem) === true) {
									hasResult = self.querySelector(elItem) !== null;
								} else {
									elItem.setAttribute('ocd-el-id', ocdElId.toString());
									hasResult = self.querySelector(elItem.tagName + '[ocd-el-id="' + ocdElId + '"]') !== null;
									elItem.removeAttribute('ocd-el-id');
								}

								if (hasResult === false) {
									hasResultAll = false;
									break;
								} else {
									hasResultAll = true;
								}
							}

							return hasResultAll;
						}

						var hasResult = false;
						if (checkVariableIsString(el) === true) {
							hasResult = self.querySelector(el) !== null;
						} else {
							ocdElId++;
							el.setAttribute('ocd-el-id', ocdElId.toString());
							hasResult = self.querySelector(el.tagName + '[ocd-el-id="' + ocdElId + '"]') !== null;
							el.removeAttribute('ocd-el-id');
						}
						return hasResult;
					}
				},
				get remove () {
					return function () {
						self.remove();
						return result;
					}
				},
				get prop () {
					return function () {
						if (arguments.length === 1) {
							if (checkVariableIsString(arguments[0]) === true) {
								return self[arguments[0]];
							} else {
								for (var key in arguments[0]) {
									self[key] = arguments[0][key];
								}
								return result;
							}
						} else if (arguments.length === 2) {
							self[arguments[0]] = arguments[1];
							return result;
						}
					}
				}
			};

			return result;
		}
	};
	Object.defineProperty(Element.prototype, '$', _$);
	_$ = {
		get: function () {
			var self = this;

			var result = null;
			result = {
				get $arr () {
					return self;
				},
				get $ocd () {
					var str = [];
					for (var i = 0; i < self.length; i++) {
						var element = self[i];

						str.push(element.$.$ocd);
					}

					return str;
				},
				get $parentOcd () {
					var str = [];
					for (var i = 0; i < self.length; i++) {
						var element = self[i];

						str.push(element.$.$parentOcd);
					}

					return str;
				},
				get parent () {
					var str = [];
					for (var i = 0; i < self.length; i++) {
						var element = self[i];

						str.push(element.$.parent);
					}

					return str;
				},
				get screen () {
					var str = [];
					for (var i = 0; i < self.length; i++) {
						var element = self[i];

						str.push(element.$.screen);
					}

					return str;
				},
				get client () {
					var str = [];
					for (var i = 0; i < self.length; i++) {
						var element = self[i];

						str.push(element.$.client);
					}

					return str;
				},
				get addClass () {
					return function (value) {
						for (var i = 0; i < self.length; i++) {
							var element = self[i];

							element.$.addClass(value);
						}

						return result;
					};
				},
				get removeClass () {
					return function (value) {
						for (var i = 0; i < self.length; i++) {
							var element = self[i];

							element.$.removeClass(value);
						}

						return result;
					};
				},
				get containsClass () {
					return function (value) {
						var containsClassResult = false;

						for (var i = 0; i < self.length; i++) {
							var element = self[i];

							if (element.$.containsClass(value) === false) {
								containsClassResult = false;
								break;
							} else {
								containsClassResult = true;
							}
						}

						return containsClassResult;
					};
				},
				get attr () {
					return function () {
						if (arguments.length === 1) {
							var str = [];
							for (var i = 0; i < self.length; i++) {
								var element = self[i];

								str.push(element.$.attr(arguments[0]));
							}

							return str;
						} else if (arguments.length === 2) {
							for (var i = 0; i < self.length; i++) {
								var element = self[i];

								element.$.attr(arguments[0], arguments[1]);
							}

							return result;
						}
					};
				},
				get removeAttr () {
					return function (name) {
						for (var i = 0; i < self.length; i++) {
							var element = self[i];

							element.$.removeAttr(name);
						}

						return result;
					};
				},
				get css () {
					return function () {
						if (arguments.length === 1) {
							if (checkVariableIsString(arguments[0]) === true) {
								var str = [];
								for (var i = 0; i < self.length; i++) {
									var element = self[i];

									str.push(element.$.css(arguments[0]));
								}

								return str;
							} else {
								for (var i = 0; i < self.length; i++) {
									var element = self[i];

									element.$.css(arguments[0]);
								}
							}
						} else if (arguments.length === 2) {
							for (var i = 0; i < self.length; i++) {
								var element = self[i];

								element.$.css(arguments[0], arguments[1]);
							}

							return result;
						}
					};
				},
				get computedCss () {
					return function () {
						if (arguments.length === 1) {
							var str = [];
							for (var i = 0; i < self.length; i++) {
								var element = self[i];

								str.push(element.$.computedCss(arguments[0]));
							}

							return str;
						} else {
							var str = [];
							for (var i = 0; i < self.length; i++) {
								var element = self[i];

								str.push(element.$.computedCss());
							}

							return str;
						}
					}
				},
				get data () {
					return function () {
						if (arguments.length === 1) {
							var str = [];
							for (var i = 0; i < self.length; i++) {
								var element = self[i];

								str.push(element.$.data(arguments[0]));
							}

							return str;
						} else if (arguments.length === 2) {
							for (var i = 0; i < self.length; i++) {
								var element = self[i];

								element.$.data(arguments[0], arguments[1]);
							}

							return result;
						}
					};
				},
				get val () {
					return function () {
						if (arguments.length === 0) {
							var str = [];
							for (var i = 0; i < self.length; i++) {
								var element = self[i];

								str.push(element.$.val());
							}

							return str;
						} else if (arguments.length === 1) {
							for (var i = 0; i < self.length; i++) {
								var element = self[i];

								element.$.val(arguments[0]);
							}

							return result;
						}
					};
				},
				get create () {
					return function (tagNameOrHtml) {
						return window.$q.create(tagNameOrHtml);
					};
				},
				get html () {
					return function () {
						if (arguments.length === 0) {
							var str = [];
							for (var i = 0; i < self.length; i++) {
								var element = self[i];

								str.push(element.$.html());
							}

							return str;
						} else if (arguments.length === 1) {
							for (var i = 0; i < self.length; i++) {
								var element = self[i];

								element.$.html(arguments[0]);
							}

							return result;
						}
					};
				},
				get text () {
					return function () {
						if (arguments.length === 0) {
							var str = [];
							for (var i = 0; i < self.length; i++) {
								var element = self[i];

								str.push(element.$.text());
							}

							return str;
						} else if (arguments.length === 1) {
							for (var i = 0; i < self.length; i++) {
								var element = self[i];

								element.$.text(arguments[0]);
							}

							return result;
						}
					};
				},
				get is () {
					return function (query) {
						var isResult = false;

						for (var i = 0; i < self.length; i++) {
							var element = self[i];

							if (element.$.is(query) === false) {
								isResult = false;
								break;
							} else {
								isResult = true;
							}
						}

						return isResult;
					};
				},
				get on () {
					return function (name, fnc, options) {
						for (var i = 0; i < self.length; i++) {
							var element = self[i];

							element.$.on(name, fnc, options);
						}

						return result;
					};
				},
				get removeEvent () {
					return function (name, fnc, options) {
						for (var i = 0; i < self.length; i++) {
							var element = self[i];

							element.$.removeEvent(name, fnc, options);
						}

						return result;
					};
				},
				get find () {
					return function (query) {
						var resultElAll = [];
						for (var i = 0; i < self.length; i++) {
							var element = self[i];

							var resultEls = element.$.find(query);
							for (var j = 0; j < resultEls.length; j++) {
								resultElAll.push(resultEls[j]);

							}
						}

						return null;
					};
				},
				get first () {
					return function (query) {
						for (var i = 0; i < self.length; i++) {
							var element = self[i];

							var resultEl = element.$.first(query);
							if (checkVariableIsNullOrUndefined(resultEl) === false) {
								return resultEl;
							}
						}

						return null;
					};
				},
				get append () {
					return function (el) {
						for (var i = 0; i < self.length; i++) {
							var element = self[i];

							element.$.append(el);
						}

						return result;
					};
				},
				get prepend () {
					return function (el) {
						for (var i = 0; i < self.length; i++) {
							var element = self[i];

							element.$.prepend(el);
						}

						return result;
					};
				},
				get insertBefore () {
					return function (el) {
						for (var i = 0; i < self.length; i++) {
							var element = self[i];

							element.$.insertBefore(el);
							break;
						}

						return result;
					};
				},
				get insertAfter () {
					return function (el) {
						for (var i = 0; i < self.length; i++) {
							var element = self[i];

							element.$.insertAfter(el);
							break;
						}

						return result;
					};
				},
				get has () {
					return function (el) {
						var hasResult = false;

						for (var i = 0; i < self.length; i++) {
							var element = self[i];

							if (element.$.has(el) === true) {
								hasResult = true;
								break;
							}
						}

						return hasResult;
					}
				},
				get remove () {
					return function () {
						for (var i = 0; i < self.length; i++) {
							var element = self[i];

							element.$.remove();
						}

						return result;
					}
				},
				get prop () {
					return function () {
						if (arguments.length === 1) {
							if (checkVariableIsString(arguments[0]) === false) {
								for (var i = 0; i < self.length; i++) {
									var element = self[i];

									element.$.prop(arguments[0]);
								}

								return result;
							} else {
								var str = [];
								for (var i = 0; i < self.length; i++) {
									var element = self[i];

									str.push(element.$.prop(arguments[0]));
								}

								return str;
							}
						} else if (arguments.length === 2) {
							for (var i = 0; i < self.length; i++) {
								var element = self[i];

								element.$.prop(arguments[0], arguments[1]);
							}

							return result;
						}
					}
				}
			};

			return result;
		}
	};
	Object.defineProperty(Array.prototype, '$', _$);
	Object.defineProperty(NodeList.prototype, '$', _$);
	_$ = {
		get: function () {
			var self = this;

			var result = null;
			result = {
				get create () {
					return function (tagNameOrHtml) {
						if (tagNameOrHtml.indexOf('<') >= 0 || tagNameOrHtml.indexOf(' ') >= 0) {
							var elp = $q.create('div');
							var el = $q.create('div');
							el.innerHTML = tagNameOrHtml;
							elp.$.append(el);

							var result = el.childNodes;
							if (result.length === 1) {
								result = result[0];
							}
							return result;
						}

						return document.createElement(tagNameOrHtml);
					};
				},
				get on () {
					return function (name, fnc, options) {
						self.addEventListener(name, fnc, options);
						return result;
					};
				},
				get removeEvent () {
					return function (name, fnc, options) {
						self.removeEventListener(name, fnc, options);
						return result;
					};
				},
				get find () {
					return function (query) {
						return document.querySelectorAll(query);
					};
				},
				get first () {
					return function (query) {
						return document.querySelector(query);
					};
				},
				get seturl () {
					return function (url) {
						if (checkVariableIsNullOrUndefined(history.replaceState) === false) {
							history.replaceState(null, null, url);
						} else {
							location.href = url;
						}
						return result;
					};
				},
				get ajax () {
					return function (options) {
						var async = checkVariableIsNullOrUndefined(options.async) === false ? options.async : true;
						var url = options.url;
						var type = checkVariableIsNullOrUndefined(options.type) === false ? options.type : 'GET';
						var data = checkVariableIsNullOrUndefined(options.data) === false ? options.data : '';
						var callback = checkVariableIsNullOrUndefined(options.callback) === false ? options.callback : function () { };
						var success = checkVariableIsNullOrUndefined(options.success) === false ? options.success : function () { };
						var error = checkVariableIsNullOrUndefined(options.error) === false ? options.error : function () { };
						var onprogress = checkVariableIsNullOrUndefined(options.progress) === false ? options.progress : function () { };
						var onabort = checkVariableIsNullOrUndefined(options.abort) === false ? options.abort : function () { };
						var contentType = options.contentType;
						var headers = checkVariableIsNullOrUndefined(options.headers) === false ? options.headers : {};
						var responseType = options.responseType;

						if (checkVariableIsObject(data) === true || checkVariableIsArray(data) === true) {
							data = JSON.stringify(data);
							if (checkVariableIsNullOrUndefined(contentType) === true) {
								contentType = 'application/json; charset=utf-8';
							}
						}

						var xhr = new XMLHttpRequest();
						xhr.open(type, url, async);

						if (responseType !== null && responseType !== undefined) {
							xhr.responseType = responseType;
						}

						if (contentType !== null && contentType !== undefined) {
							xhr.setRequestHeader('Content-Type', contentType);
						}
						for (var key in headers) {
							xhr.setRequestHeader(key, headers[key]);
						}

						xhr.onreadystatechange = function () {
							if (xhr.readyState === 4) {
								callback.call(xhr, xhr.response, xhr.status);

								if (xhr.status >= 200 && xhr.status < 300) {
									success.call(xhr, xhr.response, xhr.status);
								} else {
									error.call(xhr, xhr.response, xhr.status);
								}
							}
						}

						xhr.onprogress = function () {
							onprogress.apply(xhr, arguments);
						};

						xhr.onabort = function () {
							onabort.apply(xhr, arguments);
						};

						xhr.send(data);

						var result = {
							get xhr () {
								return xhr;
							},
							get abort () {
								return function () {
									xhr.abort();
								}
							}
						};

						return result;
					};
				},
				get cookie () {
					return function () {
						if (arguments.length === 0) {
							// GET
							var name = arguments[0];
							var cookies = {};
							var ca = document.cookie.split(';');
							for (var i = 0; i < ca.length; i++) {
								var c = ca[i];
								while (c.charAt(0) === ' ') c = c.substring(1, c.length);

								var cn = c.substring(0, c.indexOf('='));
								if (cn !== '') {
									cookies[cn] = decodeURIComponent(c.substring(cn.length + 1, c.length));
								}
							}
							return cookies;
						} else if (arguments.length === 1) {
							// GET
							var name = arguments[0];
							var nameEQ = name + "=";
							var ca = document.cookie.split(';');
							for (var i = 0; i < ca.length; i++) {
								var c = ca[i];
								while (c.charAt(0) === ' ') c = c.substring(1, c.length);
								if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
							}
							return null;
						} else if (arguments.length >= 2) {
							var name = arguments[0];
							var value = arguments[1];
							var days = arguments[2];
							var path = arguments[3];
							var domain = arguments[4];
							if (checkVariableIsNullOrUndefined(days) === true) {
								days = 365;
							}
							if (checkVariableIsNullOrUndefined(path) === true) {
								path = '/';
							}
							if (checkVariableIsNullOrUndefined(domain) === false) {
								domain = ' domain=' + domain + ';';
							} else {
								domain = '';
							}

							if (checkVariableIsNullOrUndefined(value) === true) {
								// REMOVE
								document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT;' + domain + ' path=' + path;
							} else {
								// SET
								var expires = "";
								var date = new Date();
								date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
								expires = "; expires=" + date.toUTCString();
								document.cookie = name + "=" + encodeURIComponent(value || "") + expires + ";" + domain + " path=" + path;
							}

							return result;
						}
					};
				},
				get queryString () {
					return function () {
						if (arguments.length === 0) {
							// GET all
							var queryString = window.location.search.slice(1).split('#')[0];

							var obj = {};
							var arr = queryString.split('&');

							for (var i = 0; i < arr.length; i++) {
								var a = arr[i].split('=');

								var paramName = a[0];
								var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

								paramName = paramName.toLowerCase();
								if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

								if (paramName.match(/\[(\d+)?\]$/)) {
									var key = paramName.replace(/\[(\d+)?\]/, '');
									if (!obj[key]) obj[key] = [];

									if (paramName.match(/\[\d+\]$/)) {
										var index = /\[(\d+)\]/.exec(paramName)[1];
										obj[key][index] = paramValue;
									} else {
										obj[key].push(paramValue);
									}
								} else {
									if (!obj[paramName]) {
										obj[paramName] = paramValue;
									} else if (obj[paramName] && typeof obj[paramName] === 'string') {
										obj[paramName] = [obj[paramName]];
										obj[paramName].push(paramValue);
									} else {
										obj[paramName].push(paramValue);
									}
								}
							}

							return obj;
						} else if (arguments.length === 1) {
							// GET param_name
							var url = window.location.href;
							var name = arguments[0].replace(/[\[\]]/g, '\\$&');
							var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
								results = regex.exec(url);
							if (!results) return null;
							if (!results[2]) return '';
							return decodeURIComponent(results[2].replace(/\+/g, ' '));
						}
					};
				}
			};

			return result;
		}
	};
	Object.defineProperty(document, '$', _$);
	Object.defineProperty(window, '$q', _$);
	window.doc = document;
	//#endregion

	//#region IE Bugs
	// For IE.
	if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
		$oldBrowser = true;
		Object.defineProperty(Function.prototype, 'name', {
			get: function () {
				var funcNameRegex = /function\s([^(]{1,})\(/;
				var results = (funcNameRegex).exec((this).toString());
				return (results && results.length > 1) ? results[1].trim() : "";
			},
			set: function (value) { }
		});
	}

	window.getComputedStyle = window.getComputedStyle || function (element) {
		return element.currentStyle;
	};

	if (!String.prototype.padStart) {
		String.prototype.padStart = function padStart (targetLength, padString) {
			targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
			padString = String(typeof padString !== 'undefined' ? padString : ' ');
			if (this.length >= targetLength) {
				return String(this);
			} else {
				targetLength = targetLength - this.length;
				if (targetLength > padString.length) {
					padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
				}
				return padString.slice(0, targetLength) + String(this);
			}
		};
	}

	if (!String.prototype.padEnd) {
		String.prototype.padEnd = function padEnd (targetLength, padString) {
			targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
			padString = String((typeof padString !== 'undefined' ? padString : ' '));
			if (this.length > targetLength) {
				return String(this);
			}
			else {
				targetLength = targetLength - this.length;
				if (targetLength > padString.length) {
					padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
				}
				return String(this) + padString.slice(0, targetLength);
			}
		};
	}

	if (!('remove' in Element.prototype)) {
		$oldBrowser = true;
		Element.prototype.remove = function () {
			if (this.parentNode) {
				this.parentNode.removeChild(this);
			}
		};
	}
	if (!Element.prototype.matches) {
		$oldBrowser = true;
		Element.prototype.matches = Element.prototype.msMatchesSelector;
	}

	try {
		document.body.querySelector(':scope>div');
	} catch (error) {
		$oldBrowser = true;
	}
	//#endregion

	/**
	 * Get property list of obj.
	 * @param {*} obj 
	 */
	function getPropAsObject (obj) {
		if (checkVariableIsNullOrUndefined(obj) === true) {
			return {};
		}

		var result = {};
		var props = Object.getOwnPropertyNames(obj);
		for (var i = 0; i < props.length; i++) {
			var prop = props[i];
			if (
				prop === '__hide' ||
				prop === '$alias' ||
				prop === '__jobject' ||
				prop === '__ocd' ||
				prop === '__ocdData' ||
				prop === '__ocdDataEnableCount' ||
				prop === '__runOnceCheck' ||
				prop === '$root' ||
				prop === '$parent' ||
				prop === '$list' ||
				prop === 'jobject' ||
				prop === '$set' ||
				prop === '$loaded' ||
				prop === '$el' ||
				prop === '$index' ||
				prop === '__isOcdItem' ||
				prop === '__isOcdValueItem' ||
				(checkVariableIsNullOrUndefined(obj.__ocdData) === false && obj.__ocdData[prop] === false)
			) {
				continue;
			}

			result[prop] = true;
		}

		return result;
	}

	/**
	 * Object/Array to Json Object.
	 * @param {any} v 
	 */
	function toJObject (v) {
		if (checkVariableIsNullOrUndefined(v) === true) {
			return v;
		} else if (v.__jobject === false) {
			return;
		} else if (checkVariableIsArray(v) === true) {
			var arr = [];

			for (var i = 0; i < v.length; i++) {
				var item = v[i];
				arr.push(toJObject(item));
			}

			return arr;
		} else if (checkVariableIsObject(v) === false) {
			return v;
		} else if (v.__ocd === true) {
			var ocdDataProps = getPropAsObject(v.__ocdData);
			if (v.__ocdDataEnableCount === 0) {
				return v.value;
			} else {
				var o = {
					value: v.value
				};

				for (var key in ocdDataProps) {
					o[key] = v[key];
				}

				return o;
			}
		} else {
			var o = {};

			for (var key in getPropAsObject(v)) {
				if (checkVariableIsFunction(v[key]) === true) {
					continue;
				}

				if (checkVariableIsNullOrUndefined(v[key]) === false) {
					if (v[key].__ocd === false) {
						continue;
					}
				}

				o[key] = toJObject(v[key]);
			}

			return o;
		}
	}

	/**
	 * Clear all methods of array which is not used by OCD.
	 * @param {*} arr 
	 */
	function clearArrayMethods (arr) {
		arr.concat = undefined;
		arr.copyWithin = undefined;
		arr.entries = undefined;
		arr.every = undefined;
		arr.fill = undefined;
		arr.filter = undefined;
		arr.find = undefined;
		arr.findIndex = undefined;
		arr.forEach = undefined;
		arr.from = undefined;
		arr.includes = undefined;
		arr.indexOf = undefined;
		arr.isArray = undefined;
		arr.join = undefined;
		arr.keys = undefined;
		arr.lastIndexOf = undefined;
		arr.map = undefined;
		arr.pop = undefined;
		arr.push = undefined;
		arr.reduce = undefined;
		arr.reduceRight = undefined;
		arr.reverse = undefined;
		arr.shift = undefined;
		arr.slice = undefined;
		arr.some = undefined;
		arr.sort = undefined;
		arr.splice = undefined;
		arr.toString = undefined;
		arr.unshift = undefined;
		arr.valueOf = undefined;
	}

	/**
	 * Fill the ocd item by a object value.
	 * @param {any} v 
	 * @param {any} ocdP 
	 */
	function recursiveFill (v, ocdP) {
		if (checkVariableIsNullOrUndefined(v) === false && v.__isOcdValueItem === true) {
			v = v.value;
		}

		if (ocdP.__isOcdValueItem === true && ocdP.__ocdDataEnableCount === 0) {
			ocdP.value = v;
		} else if (checkVariableIsArray(v) === true) {
			ocdP.$clear();
			for (var ai = 0; ai < v.length; ai++) {
				var vItem = v[ai];
				var ocdPItem = ocdP.$add();
				recursiveFill(vItem, ocdPItem);
			}
		} else {
			for (var key in getPropAsObject(v)) {
				if (ocdP[key] === undefined) {
					continue;
				}

				(function (key) {
					if (checkVariableIsNullOrUndefined(ocdP.__ocdData) === false && ocdP.__ocdData[key] === true) {
						ocdP[key] = v[key];

						try {
							Object.defineProperty(v, key, {
								configurable: true,
								get: function () {
									return ocdP[key];
								},
								set: function (value) {
									ocdP[key] = value;
								}
							});
						} catch (error) { }
					} else {
						recursiveFill(v[key], ocdP[key]);

						try {
							Object.defineProperty(v, key, {
								configurable: true,
								get: function () {
									return ocdP[key];
								},
								set: function (value) {
									recursiveFill(value, ocdP[key]);
								}
							});
						} catch (error) { }
					}
				})(key);
			}
		}
	}

	/**
	 * Create a ocd item. It maybe an array or object.
	 * This function also is recursive function with 'createOcdBySchema'
	 * @param {any} rootOcd 
	 * @param {boolean} jobject 
	 * @param {any} parentOcd 
	 * @param {Array} queues 
	 * @param {HTMLElement} ocdEl 
	 * @param {any} sub 
	 * @param {function} get 
	 * @param {function} set 
	 * @param {any} data 
	 * @param {any} on 
	 * @param {any} methods 
	 */
	function createOcdItem (params) {
		//#region Params
		var ocdEl = params.ocdEl;
		var sub = params.sub;
		var get = params.get;
		var set = params.set;
		var data = params.data;
		var jobject = params.jobject;
		var parentOcd = params.parentOcd;
		var queues = params.queues;
		var on = params.on;
		var rootOcd = params.rootOcd;
		var methods = params.methods;
		var watches = params.watches;
		//#endregion
		var ocdItem = null;

		var declareStd = function () {
			if (checkVariableIsNullOrUndefined(rootOcd) === true) {
				rootOcd = ocdItem;
				rootOcd.__runOnceCheck = false;
			}

			ocdItem.$runOnce = function (fnc) {
				if (rootOcd.__runOnceCheck === false) {
					rootOcd.__runOnceCheck = true;

					fnc.call(ocdItem);
					setTimeout(function () {
						rootOcd.__runOnceCheck = false;
					});
				}
			};

			ocdItem.__isOcdItem = true;
			ocdItem.$el = ocdEl;

			var dataProps = {};
			var dataPropsEnableCount = 0;

			ocdItem.__jobject = jobject !== false;
			ocdEl.$ocd = ocdItem;
			ocdItem.$root = rootOcd;

			if (checkVariableIsNullOrUndefined(parentOcd) === false) {
				if (checkVariableIsArray(parentOcd) === true) {
					ocdItem.$list = parentOcd;
				} else {
					ocdItem.$parent = parentOcd;
				}
			}

			ocdItem.jobject = function () {
				return toJObject(ocdItem);
			};

			ocdItem.toJSON = function () {
				return ocdItem.jobject();
			};

			ocdItem.toString = function () {
				return ocdItem.value;
			};


			for (var key in getPropAsObject(methods)) {
				(function (key) {
					ocdItem[key] = function () {
						return methods[key].apply(ocdItem, arguments);
					};
				})(key);
			}

			for (var key in getPropAsObject(data)) {
				(function (key) {
					dataProps[key] = data[key].jobject !== false;

					if (data[key].jobject === true) {
						dataPropsEnableCount++;
					}

					var dataGet = data[key].get;
					if (checkVariableIsNullOrUndefined(dataGet) === true) {
						dataGet = function (el, key) {
							return el.$.data(key);
						};
					} else {
						dataGet = function (el, key) {
							return data[key].get.call(ocdItem, key, el.$.data(key));
						};
					}

					var dataSet = data[key].set;
					if (checkVariableIsNullOrUndefined(dataSet) === true) {
						dataSet = function (el, value, key) {
							el.$.data(key, value);
						};
					} else {
						dataSet = function (el, value, key) {
							var result = data[key].set.call(ocdItem, value, key);
							if (result !== undefined) {
								value = result;
							}
							el.$.data(key, value);
						};
					}

					var loadDefaultCheck = false;
					var loadDefault = function () {
						if (loadDefaultCheck === true) {
							return;
						}
						loadDefaultCheck = true;

						if (checkVariableIsNullOrUndefined(data[key].default) === false) {
							if (checkVariableIsNullOrUndefined(get) === false) {
								var value = dataGet(ocdEl, key);

								if (checkVariableIsNullOrUndefined(value) === false && value !== '') {
									dataSet(ocdEl, value, key);
									return;
								}
							}

							if (checkVariableIsFunction(data[key].default) === true) {
								dataSet(ocdEl, data[key].default(ocdItem), key);
							} else {
								dataSet(ocdEl, data[key].default, key);
							}
						} else if (checkVariableIsNullOrUndefined(dataGet) === false) {
							dataSet(ocdEl, dataGet(ocdEl, key), key);
						}
					};

					Object.defineProperty(ocdItem, key, {
						get: function () {
							loadDefault();
							return dataGet(ocdEl, key);
						},
						set: function (value) {
							dataSet(ocdEl, value, key);
						}
					});

					queues.push({
						last: true,
						fnc: loadDefault
					});
				})(key);
			}
			ocdItem.__ocdData = dataProps;
			ocdItem.__ocdDataEnableCount = dataPropsEnableCount;

			if (checkVariableIsNullOrUndefined(on) === false) {
				for (var key in getPropAsObject(on)) {
					if (key[0] === '$') {
						continue;
					}

					(function (key) {
						ocdEl.addEventListener(key, function () {
							return on[key].apply(ocdItem, arguments);
						});
					})(key);
				}
			}
		};

		if (checkVariableIsNullOrUndefined(sub) === false) {
			ocdItem = {};

			declareStd();

			for (var si = 0; si < sub.length; si++) {
				var subItem = sub[si];

				createOcdBySchema({
					parentEl: ocdEl,
					schema: subItem,
					parentOcd: ocdItem,
					queues: queues,
					rootOcd: rootOcd
				});
			}
		} else {
			var ocdGet = get;
			if (checkVariableIsNullOrUndefined(ocdGet) === true) {
				switch (ocdEl.tagName) {
					case 'INPUT': {
						var type = ocdEl.getAttribute('type');
						if (checkVariableIsNullOrUndefined(type) === true) {
							type = 'text';
						}
						type = type.toLowerCase();

						switch (type) {
							case 'checkbox':
							case 'radio':
								ocdGet = function () {
									return this.$el.checked;
								};
								break;
							case 'file':
								ocdGet = function () {
									return this.$el.files;
								};
								break;
							default:
								ocdGet = function () {
									return this.$el.value;
								};
								break;
						}
					}
						break;
					case 'SELECT': {
						ocdGet = function () {
							return this.$el.value;
						};
					}
						break;
					case 'TEXTAREA': {
						ocdGet = function () {
							return this.$el.value;
						};
					}
						break;
					case 'OPTION': {
						ocdGet = function () {
							return this.$el.getAttribute('value');
						};
					}
						break;
					default: {
						ocdGet = function () {
							return this.$el.innerHTML;
						};
					}
						break;
				}
			}

			var ocdSet = set;
			if (checkVariableIsNullOrUndefined(ocdSet) === true) {
				switch (ocdEl.tagName) {
					case 'INPUT': {
						var type = ocdEl.getAttribute('type');
						if (checkVariableIsNullOrUndefined(type) === true) {
							type = 'text';
						}
						type = type.toLowerCase();

						switch (type) {
							case 'checkbox':
							case 'radio':
								ocdSet = function (value) {
									this.$el.checked = value == true;
								};
								break;
							default:
								ocdSet = function (value) {
									this.$el.value = value;
								};
								break;
						}
					}
						break;
					case 'SELECT': {
						ocdSet = function (value) {
							this.$el.value = value;
						};
					}
						break;
					case 'TEXTAREA': {
						ocdSet = function (value) {
							this.$el.value = value;
						};
					}
						break;
					case 'OPTION': {
						ocdSet = function (value) {
							if (checkVariableIsString(value) === true) {
								this.$el.setAttribute('value', value);
								this.$el.innerText = value;
							} else {
								this.$el.setAttribute('value', value.value);
								this.$el.innerText = value.text;
							}
						};
					}
						break;
					default: {
						ocdSet = function (value) {
							this.$el.innerHTML = value;
						};
					}
						break;
				}
			}

			var triggerWatches = function () {
				var value = ocdItem.value;

				if (checkVariableIsNullOrUndefined(set) === false) {
					ocdSet.call(ocdItem, value, true);
				}

				value = ocdItem.value;

				for (var i = 0; i < watches.length; i++) {
					watches[i].call(ocdItem, value, true);
				}
			};

			ocdItem = {
				__ocd: jobject !== false,
				__isOcdValueItem: true,
				get value () {
					return ocdGet.call(ocdItem);
				},
				set value (value) {
					ocdSet.call(ocdItem, value);

					for (var i = 0; i < watches.length; i++) {
						watches[i].call(ocdItem, value, false);
					}
				}
			};

			queues.push(function () {
				switch (ocdEl.tagName) {
					case 'INPUT': {
						var type = ocdEl.getAttribute('type');
						if (checkVariableIsNullOrUndefined(type) === true) {
							type = 'text';
						}
						type = type.toLowerCase();

						switch (type) {
							case 'checkbox':
							case 'radio':
								ocdEl.addEventListener('change', function () {
									triggerWatches();
								});
								break;
							default:
								ocdEl.addEventListener('input', function () {
									triggerWatches();
								});
								break;
						}
					}
						break;
					case 'SELECT': {
						ocdEl.addEventListener('change', function () {
							triggerWatches();
						});
					}
						break;
					case 'TEXTAREA': {
						ocdEl.addEventListener('input', function () {
							triggerWatches();
						});
					}
						break;
					default: {
						var runOnceEvent = false;
						ocdEl.addEventListener('input', function () {
							if (runOnceEvent === true) {
								return;
							}
							runOnceEvent = true;

							triggerWatches();

							setTimeout(function () {
								runOnceEvent = false;
							});
						});
						ocdEl.addEventListener('change', function () {
							if (runOnceEvent === true) {
								return;
							}
							runOnceEvent = true;

							triggerWatches();

							setTimeout(function () {
								runOnceEvent = false;
							});
						});
					}
						break;
				}
			});

			queues.push({
				last: true,
				fnc: function () {
					triggerWatches();
				}
			});

			declareStd();
		}


		return ocdItem;
	}

	/**
	 * Added some methods to item.
	 * @param {*} item 
	 */
	function createEasyMethods (item) {
		var hide = {};
		item.__hide = hide;

		item.__getPropAsObject = getPropAsObject;
		item.__cloneObject = cloneObject;
		item.__isNullOrUndefined = checkVariableIsNullOrUndefined;
		item.__isDate = checkVariableIsDate;
		item.__isString = checkVariableIsString;
		item.__isNumber = checkVariableIsNumber;
		item.__isArray = checkVariableIsArray;
		item.__isBool = checkVariableIsBoolean;
		item.__isRegex = checkVariableIsRegex;
		item.__isObject = checkVariableIsObject;
		item.__isHTML = checkVariableIsHTML;
		item.__isFunction = checkVariableIsFunction;
	};

	/**
	 * Create a ocd item by schema.
	 * @param {HTMLElement} parentEl 
	 * @param {any} schema 
	 * @param {any} parentOcd 
	 * @param {Array} queues 
	 * @param {any} rootOcd 
	 */
	function createOcdBySchema (params) {
		//#region Params
		var parentEl = params.parentEl;
		var schema = params.schema;
		var parentOcd = params.parentOcd;
		var queues = params.queues;
		var rootOcd = params.rootOcd;
		//#endregion

		var alias = schema.alias;
		var watches = schema.watches;
		if (checkVariableIsNullOrUndefined(watches) === true) {
			watches = [];
		}

		var jobject = schema.jobject;
		var single = schema.single;
		if (checkVariableIsNullOrUndefined(parentEl) === true) {
			single = true;
			jobject = true;
		}

		var on = schema.on;
		if (checkVariableIsNullOrUndefined(schema.on) === true) {
			on = {};
		}

		var get = schema.get;
		var set = schema.set;

		var data = schema.data;
		if (checkVariableIsNullOrUndefined(data) === true) {
			data = {};
		}

		var methods = schema.methods;
		if (checkVariableIsNullOrUndefined(methods) === true) {
			methods = {};
		}

		var parentQuery = schema.parentQuery;
		var clone = schema.clone;
		if (checkVariableIsNullOrUndefined(schema.mixins) === false) {
			var addedMixins = [];
			for (var i = 0; i < schema.mixins.length; i++) {
				var mixin = schema.mixins[i];

				if (addedMixins.indexOf(mixin) >= 0) {
					continue;
				}
				addedMixins.push(mixin);

				var addSubMixin = null;
				addSubMixin = function (m) {
					if (checkVariableIsNullOrUndefined(m.mixins) === false) {
						for (var si = 0; si < m.mixins.length; si++) {
							schema.mixins.push(m.mixins[si]);
							addSubMixin(m.mixins[si]);
						}
					}
				};
				addSubMixin(mixin);

				if (checkVariableIsNullOrUndefined(get) === true && checkVariableIsNullOrUndefined(mixin.get) === false) {
					get = mixin.get;
				}

				if (checkVariableIsNullOrUndefined(set) === true && checkVariableIsNullOrUndefined(mixin.set) === false) {
					set = mixin.set;
				}

				if (checkVariableIsNullOrUndefined(clone) === true && checkVariableIsNullOrUndefined(mixin.clone) === false) {
					clone = mixin.clone;
				}

				if (checkVariableIsNullOrUndefined(mixin.methods) === false) {
					for (var key in getPropAsObject(mixin.methods)) {
						if (checkVariableIsNullOrUndefined(methods[key]) === true) {
							methods[key] = mixin.methods[key];
						}
					}
				}

				if (checkVariableIsNullOrUndefined(mixin.watches) === false) {
					for (var i = 0; i < mixin.watches.length; i++) {
						watches.push(mixin.watches[i]);
					}
				}

				if (checkVariableIsNullOrUndefined(mixin.data) === false) {
					for (var key in getPropAsObject(mixin.data)) {
						if (checkVariableIsNullOrUndefined(data[key]) === true) {
							data[key] = mixin.data[key];
						}
					}
				}

				if (checkVariableIsNullOrUndefined(mixin.on) === false) {
					for (var key in getPropAsObject(mixin.on)) {
						(function (key) {
							if (checkVariableIsNullOrUndefined(on[key]) === true) {
								on[key] = mixin.on[key];
							} else {
								var previousOn = on[key];
								on[key] = function () {
									previousOn.apply(this, arguments);
									return mixin.on[key].apply(this, arguments);
								};
							}
						})(key);
					}
				}
			}
		}

		var sub = schema.sub;
		var query = schema.query;

		var oninit = on.$init;
		if (checkVariableIsNullOrUndefined(oninit) === true) {
			oninit = function () { };
		}
		var onremove = on.$remove;
		if (checkVariableIsNullOrUndefined(onremove) === true) {
			onremove = function () { };
		}

		var queryParentEl = parentEl;
		if (checkVariableIsString(parentQuery) === true) {
			if (parentQuery !== '') {
				if (checkVariableIsNullOrUndefined(parentEl) === false) {
					if ($oldBrowser === false) {
						queryParentEl = parentEl.querySelector(':scope ' + parentQuery);
					} else {
						if (parentQuery.trim()[0] === '>') {
							ocdElIdProcess(parentEl, function (ocdElId) {
								queryParentEl = parentEl.parentNode.querySelector('*[ocd-el-id="' + ocdElId + '"] ' + parentQuery);
							});
						} else {
							queryParentEl = parentEl.querySelector(parentQuery);
						}
					}
				} else {
					queryParentEl = document.querySelector(parentQuery);
				}

				checkVariableIsNullOrUndefined(queryParentEl, alias + ' "parentQuery"\'s result must not be null!');
			}
		} else if (checkVariableIsHTML(parentQuery) === true) {
			queryParentEl = parentQuery;
		}

		if (checkVariableIsNullOrUndefined(parentEl) === false && checkVariableIsNullOrUndefined(clone) === true && single !== true) {
			if ($oldBrowser === false) {
				var cloneEl = queryParentEl.querySelector(':scope>*[ocd-clone]');
				if (checkVariableIsNullOrUndefined(cloneEl) === true) {
					if((function () {
						window['console']['error']('Clone element("' + query + '") was not found in "' + parentQuery + '"', queryParentEl);
						return true;
					})() === true){
						throw 'Clone element("' + query + '") was not found in "' + parentQuery + '"';
					}
				}
				var cloneElClone = cloneEl.cloneNode(true);
				cloneElClone.removeAttribute('ocd-clone');
				cloneEl.remove();
				clone = function (value) {
					return cloneElClone.cloneNode(true);
				};
			} else {
				ocdElIdProcess(queryParentEl, function (ocdElId) {
					var cloneEl = queryParentEl.parentNode.querySelector('*[ocd-el-id="' + ocdElId + '"]>*[ocd-clone]');
					if (checkVariableIsNullOrUndefined(cloneEl) === true) {
						(function () {
							window['console']['error']('Clone element("' + query + '") was not found in "' + parentQuery + '"', queryParentEl);
						})();
						throw 'Clone element("' + query + '") was not found in "' + parentQuery + '"';
					}
					var cloneElClone = cloneEl.cloneNode(true);
					cloneElClone.removeAttribute('ocd-clone');
					cloneEl.remove();
					clone = function (value) {
						return cloneElClone.cloneNode(true);
					};
				});
			}
		}

		var queryResults = null;
		if (checkVariableIsString(query) === true) {
			if (single === true) {
				if (checkVariableIsNullOrUndefined(queryParentEl) === false) {
					if ($oldBrowser === false) {
						queryResults = [];
						queryResults.push(queryParentEl.querySelector(':scope ' + query));
					} else {
						queryResults = [];

						if (query.trim()[0] === '>') {
							ocdElIdProcess(queryParentEl, function (ocdElId) {
								queryResults.push(queryParentEl.parentNode.querySelector('*[ocd-el-id="' + ocdElId + '"] ' + query));
							});
						} else {
							queryResults.push(queryParentEl.querySelector(query));
						}
					}
				} else {
					queryResults = [];
					queryResults.push(document.body.querySelector(query));
				}
			} else {
				if (checkVariableIsNullOrUndefined(queryParentEl) === false) {
					if ($oldBrowser === false) {
						queryResults = queryParentEl.querySelectorAll(':scope ' + query);
					} else {
						if (query.trim()[0] === '>') {
							ocdElIdProcess(queryParentEl, function (ocdElId) {
								queryResults = queryParentEl.parentNode.querySelectorAll('*[ocd-el-id="' + ocdElId + '"] ' + query);
							});
						} else {
							queryResults = queryParentEl.querySelectorAll(query);
						}
					}
				} else {
					queryResults = document.body.querySelectorAll(query);
				}
			}
		} else if (checkVariableIsArray(query) === true) {
			queryResults = query;
		} else if (checkVariableIsHTML(query) === true) {
			queryResults = [query];
		}

		if (single === true) {
			checkVariableIsNullOrUndefined(queryResults[0], alias + ' "query"\'s result must not be null!');
			queryResults.length = 1;
		}

		var resultOcd = [];
		resultOcd.__jobject = jobject !== false;

		if (checkVariableIsNullOrUndefined(queryParentEl) === false && checkVariableIsNullOrUndefined(queryParentEl.$ocd) === true) {
			queryParentEl.$ocd = resultOcd;
		}

		var removeOcdItemMethod = function (ocdItem) {
			for (var i = 0; i < resultOcd.length; i++) {
				var item = resultOcd[i];
				if (item === ocdItem) {
					resultOcd.$removeAt(i);
					break;
				}
			}
		};
		var getIndexOcdItemMethod = function (ocdItem) {
			if (checkVariableIsNullOrUndefined(ocdItem.__index) === false) {
				return ocdItem.__index;
			}

			for (var i = 0; i < resultOcd.length; i++) {
				if (resultOcd[i] === ocdItem) {
					return i;
				}
			}

			return -1;
		};

		var declareOcdItemStds = function (ocdItem) {
			createEasyMethods(ocdItem);

			ocdItem.$set = function (value) {
				recursiveFill(value, ocdItem);
			};
			ocdItem.$remove = function () {
				removeOcdItemMethod(ocdItem);
			};

			Object.defineProperty(ocdItem, '$index', {
				configurable: true,
				get: function () {
					return getIndexOcdItemMethod(ocdItem);
				}
			});

			Object.defineProperty(ocdItem, '$alias', {
				configurable: true,
				get: function () {
					return alias + '[' + ocdItem.$index + ']';
				}
			});
		};

		for (var i = 0; i < queryResults.length; i++) {
			var ocdEl = queryResults[i];

			var ocdItem = createOcdItem({
				rootOcd: rootOcd,
				jobject: jobject,
				parentOcd: single === true ? parentOcd : resultOcd,
				queues: queues,
				ocdEl: ocdEl,
				sub: sub,
				get: get,
				set: set,
				data: data,
				on: on,
				methods: methods,
				watches: watches
			});
			Array.prototype.push.call(resultOcd, ocdItem);

			(function (ocdItem) {
				declareOcdItemStds(ocdItem);

				queues.push(function () {
					oninit.call(ocdItem);
				});
			})(ocdItem);
		}

		if (checkVariableIsNullOrUndefined(parentEl) === false) {
			var createACloneOcd = function (value, fnc) {
				var cloneEl = clone.call(resultOcd, value);
				fnc(cloneEl);

				var ocdItem = createOcdItem({
					rootOcd: rootOcd,
					jobject: jobject,
					parentOcd: single === true ? parentOcd : resultOcd,
					queues: queues,
					ocdEl: cloneEl,
					sub: sub,
					get: get,
					set: set,
					data: data,
					on: on,
					methods: methods,
					watches: watches
				});

				if (checkVariableIsNullOrUndefined(value) === false) {
					recursiveFill(value, ocdItem);
				}

				var result = {
					el: cloneEl,
					ocd: ocdItem
				};
				return result;
			};

			resultOcd.$el = queryParentEl;
			resultOcd.$root = rootOcd;

			if (checkVariableIsArray(parentOcd) === true) {
				resultOcd.$list = parentOcd;
			} else {
				resultOcd.$parent = parentOcd;
			}

			resultOcd.$set = function (value) {
				recursiveFill(value, resultOcd);
			};

			resultOcd.$add = function (value) {
				var ocdNewItem = createACloneOcd(value, function (el) {
					queryParentEl.appendChild(el);
				});

				Array.prototype.push.call(resultOcd, ocdNewItem.ocd);

				declareOcdItemStds(ocdNewItem.ocd);

				consumeQueues(queues, function () {
					oninit.call(ocdNewItem.ocd);
				});

				return ocdNewItem.ocd;
			};
			resultOcd.$addRange = function (values) {
				for (var i = 0; i < values.length; i++) {
					var value = values[i];
					resultOcd.$add(value);
				}
			};
			resultOcd.$removeAt = function (index) {
				var ocdItem = resultOcd[index];

				var lastIndex = ocdItem.$index;
				ocdItem.__index = lastIndex;
				ocdItem.$el.remove();

				Array.prototype.splice.call(resultOcd, index, 1);

				onremove.call(ocdItem);
			};
			resultOcd.$clear = function () {
				var len = resultOcd.length;
				for (var i = len - 1; i >= 0; i--) {
					resultOcd.$removeAt(i);
				}
			};
			resultOcd.$insert = function (index, value) {
				if (index >= resultOcd.length) {
					return resultOcd.$add(value);
				}

				var ocdItem = resultOcd[index];
				var ocdNewItem = createACloneOcd(value, function (el) {
					ocdItem.$el.parentNode.insertBefore(el, ocdItem.$el);
				});

				Array.prototype.splice.call(resultOcd, index, 0, ocdNewItem.ocd);

				declareOcdItemStds(ocdNewItem.ocd);

				consumeQueues(queues, function () {
					oninit.call(ocdNewItem.ocd);
				});

				return ocdNewItem.ocd;
			};

			clearArrayMethods(resultOcd);
		}

		resultOcd.jobject = function () {
			return toJObject(resultOcd);
		};

		if (checkVariableIsNullOrUndefined(parentEl) === true) {
			resultOcd = resultOcd[0];

			delete resultOcd.$remove;
			delete resultOcd.$index;

			delete resultOcd.$alias;
			resultOcd.$alias = '$root';

			return resultOcd;
		} else {
			if (single === true) {
				resultOcd = resultOcd[0];

				delete resultOcd.$remove;
				delete resultOcd.$index;
			}

			delete resultOcd.$alias;
			resultOcd.$alias = alias;

			var result = parentOcd;

			Object.defineProperty(result, alias, {
				get: function () {
					return resultOcd;
				},
				set: function (value) {
					resultOcd.$set(value);
				}
			});

			return result;
		}
	}

	/**
	 * Consume queues from array.
	 * @param {*} queues 
	 */
	function consumeQueues (queues, fnc) {
		var queuesClone = cloneObject(queues);
		queues.length = 0;
		for (var i = 0; i < queuesClone.length; i++) {
			if (queuesClone[i].last !== true) {
				queuesClone[i]();
			}
		}

		if (checkVariableIsNullOrUndefined(fnc) === false) {
			fnc();
		}

		for (var i = 0; i < queuesClone.length; i++) {
			if (queuesClone[i].last === true) {
				queuesClone[i].fnc();
			}
		}
	}

	/**
	 * To check schema is correct.
	 * @param {any} schema 
	 * @param {string} alias 
	 * @param {boolean} sub 
	 * @param {boolean} mixin 
	 */
	function checkSchema (schema, alias, sub, mixin, root) {
		/*
		{
			query: <string|array|HTMLElement>,
			get?: <function([this]$ocd):any>,
			set?: <function([this]$ocd, value, auto)>,
			data?: {
				prop1: {
					jobject?: <bool>,
					default?: <any|function([this]$ocd):any>,
					get?: <function([this]$ocd, key, currentValue):any>,
					set?: <function([this]$ocd, value, key)>
				},
				prop2: ...,
				...
			},
			methods?: {
				method1: <function([this]$ocd, ...):any>,
				method2: ...,
				...
			},
			watches?: <Array(function([this]$ocd, value, auto))>,
			on?: {
				$init?: <function([this]$ocd)>,
				$remove?: <function([this]$ocd)>,
				eventName1: <function([this]$ocd, e):any>,
				eventName2: ...,
				...
			},
			mixins?: [{
				get?: ...,
				set?: ...,
				clone?: ...,
				mixins?: ...,
				data?: ...,
				watches?: ...,
				on?: ...,
				methods?: ...
			}],
			sub?: [{
				parentQuery?: <string|HTMLElement>,
				query: <string|array|HTMLElement>,
				single: <bool>,
				alias: <string>,
				get?: <function([this]$ocd):any>,
				set?: <function([this]$ocd, value, auto)>,
				data?: {
					prop1: {
						jobject?: <bool>,
						default?: <any|function([this]$ocd):any>,
						get?: <function([this]$ocd, key, currentValue):any>,
						set?: <function([this]$ocd, value, key)>
					},
					prop2: ...,
					...
				},
				clone?: <function([this]$parentOcd, value):el>,
				watches?: <Array(function([this]$ocd, value, auto))>,
				on?: {
					$init?: <function([this]$ocd)>,
					$remove?: <function([this]$ocd)>,
					eventName1: <function([this]$ocd, e):any>,
					eventName2: ...,
					...
				},
				mixins?: [{
					get?: ...,
					set?: ...,
					clone?: ...,
					mixins?: ...,
					data?: ...,
					watches?: ...,
					on?: ...,
					methods?: ...
				}],
				sub?: [{
					parentQuery?: <string|HTMLElement>,
					query: <string|array|HTMLElement>,
					single: <bool>,
					alias: <string>,
					get?: <function([this]$ocd):any>,
					set?: <function([this]$ocd, value, auto)>,
					data?: {
						prop1: {
							jobject?: <bool>,
							default?: <any|function([this]$ocd):any>,
							get?: <function([this]$ocd, key, currentValue):any>,
							set?: <function([this]$ocd, value, key)>
						},
						prop2: ...,
						...
					},
					clone?: <function([this]$parentOcd, value):el>,
					watches?: <Array(function([this]$ocd, value, auto))>,
					on?: {
						$init?: <function([this]$ocd)>,
						$remove?: <function([this]$ocd)>,
						eventName1: <function([this]$ocd, e):any>,
						eventName2: ...,
						...
					},
					mixins?: [{
						get?: ...,
						set?: ...,
						clone?: ...,
						mixins?: ...,
						data?: ...,
						watches?: ...,
						on?: ...,
						methods?: ...
					}],
					sub?: ...
				}, ...]
			}, ...]
		}
		 */
		var currentAlias = '';
		if (checkVariableIsNullOrUndefined(schema.alias) === false) {
			currentAlias = '<' + schema.alias + '>';
		}

		if (root === true) {
			// Checking single...
			if (checkVariableIsNullOrUndefined(schema.single) === false) {
				throw alias + currentAlias + ' "single" cannot be used on root!';
			}

			// Checking parentQuery...
			if (checkVariableIsNullOrUndefined(schema.parentQuery) === false) {
				throw alias + currentAlias + ' "parentQuery" cannot be used on root!';
			}

			// Checking alias...
			if (checkVariableIsNullOrUndefined(schema.alias) === false) {
				throw alias + currentAlias + ' "alias" cannot be used on root!';
			}

			// Checking jobject...
			if (checkVariableIsNullOrUndefined(schema.jobject) === false) {
				throw alias + currentAlias + ' "jobject" cannot be used on root!';
			}

			// Checking clone...
			if (checkVariableIsNullOrUndefined(schema.clone) === false) {
				throw alias + currentAlias + ' "clone" cannot be used on root!';
			}
		}

		if (mixin === false) {
			// Checking alias...
			if (sub === true) {
				checkVariableIsNullOrUndefined(schema.alias, alias + currentAlias + ' Alias');

				checkVariableIsString(schema.alias, alias + currentAlias + ' Alias');

				schema.alias = schema.alias.trim();
				if (schema.alias.trim().length === 0) {
					throw alias + currentAlias + ' "alias" must be filled!';
				}

				if (schema.alias[0] === '$') {
					throw alias + currentAlias + ' "alias" must not have "$" on name at the beginning!';
				}
				if (schema.alias[0] === '_' && key[1] === '_') {
					throw alias + currentAlias + ' "alias" must not have "__" on name at the beginning!';
				}

			}

			// Checking single...
			if (checkVariableIsNullOrUndefined(schema.single) === false && checkVariableIsBoolean(schema.single) === false) {
				throw alias + currentAlias + ' "single" must be Boolean!';
			}

			// Checking parentQuery...
			if (schema.single !== true) {
				if (checkVariableIsString(schema.parentQuery) === true) {
				} else if (checkVariableIsHTML(schema.parentQuery) === true) {
				} else if (checkVariableIsNullOrUndefined(schema.parentQuery) === false) {
					throw alias + currentAlias + ' "parentQuery" must be String or HTMLElement if you don\'t use "single: true"!';
				} else if (sub === true && checkVariableIsNullOrUndefined(schema.parentQuery) === true) {
					throw alias + currentAlias + ' "parentQuery" must be String or HTMLElement if you don\'t use "single: true"!';
				}
			}

			// Checking query...
			if (checkVariableIsString(schema.query) === true) {
				if (schema.query.trim().length === 0) {
					throw alias + currentAlias + ' "query" must be filled!';
				}
			} else if (checkVariableIsArray(schema.query) === true) {
				for (var i = 0; i < schema.query.length; i++) {
					var element = schema.query[i];
					if (checkVariableIsHTML(element) === false) {
						throw alias + currentAlias + ' "query[' + i + ']" must be HTMLElement!';
					}
				}
			} else if (checkVariableIsHTML(schema.query) === true) {
			} else {
				throw alias + currentAlias + ' "query" must be String, Array, NodeList or HTMLElement!';
			}

			// Checking jobject...
			if (checkVariableIsNullOrUndefined(schema.jobject) === false && checkVariableIsBoolean(schema.jobject) === false) {
				throw alias + currentAlias + ' "jobject" must be Boolean!';
			}
		} else {
			// Checking alias...
			if (checkVariableIsNullOrUndefined(schema.alias) === false) {
				throw alias + currentAlias + ' "alias" cannot be used on a mixin!';
			}

			// Checking jobject...
			if (checkVariableIsNullOrUndefined(schema.jobject) === false) {
				throw alias + currentAlias + ' "jobject" cannot be used on a mixin!';
			}

			// Checking single...
			if (checkVariableIsNullOrUndefined(schema.single) === false) {
				throw alias + currentAlias + ' "single" cannot be used on a mixin!';
			}

			// Checking parentQuery...
			if (checkVariableIsNullOrUndefined(schema.parentQuery) === false) {
				throw alias + currentAlias + ' "parentQuery" cannot be used on a mixin!';
			}

			// Checking query...
			if (checkVariableIsNullOrUndefined(schema.query) === false) {
				throw alias + currentAlias + ' "query" cannot be used on a mixin!';
			}

			// Checking sub...
			if (checkVariableIsNullOrUndefined(schema.sub) === false) {
				throw alias + currentAlias + ' "sub" cannot be used on a mixin!';
			}
		}

		// Checking get...
		if (checkVariableIsNullOrUndefined(schema.get) === false && checkVariableIsFunction(schema.get) === false) {
			throw alias + currentAlias + ' "get" must be Function!';
		}

		// Checking set...
		if (checkVariableIsNullOrUndefined(schema.set) === false && checkVariableIsFunction(schema.set) === false) {
			throw alias + currentAlias + ' "set" must be Function!';
		}

		// Checking clone...
		if (checkVariableIsNullOrUndefined(schema.clone) === false && checkVariableIsFunction(schema.clone) === false) {
			throw alias + currentAlias + ' "clone" must be Function!';
		}

		// Checking data...
		if (checkVariableIsNullOrUndefined(schema.data) === false) {
			if (checkVariableIsObject(schema.data) === false) {
				throw alias + currentAlias + ' "data" must be Object!';
			}

			// Checking data's properties...
			for (var key in schema.data) {
				if (key[0] === '$') {
					throw alias + currentAlias + ' "data.' + key + '" must not have "$" on name at the beginning!';
				}
				if (key[0] === '_' && key[1] === '_') {
					throw alias + currentAlias + ' "data.' + key + '" must not have "__" on name at the beginning!';
				}

				// Checking data.prop...
				if (checkVariableIsObject(schema.data[key]) === false) {
					throw alias + currentAlias + ' "data.' + key + '" must be Object!';
				}

				// Checking data.prop.jobject...
				if (checkVariableIsNullOrUndefined(schema.data[key].jobject) === false && checkVariableIsBoolean(schema.data[key].jobject) === false) {
					throw alias + currentAlias + ' "data.' + key + '.jobject" must be Boolean!';
				}

				// Checking data.prop.get...
				if (checkVariableIsNullOrUndefined(schema.data[key].get) === false && checkVariableIsFunction(schema.data[key].get) === false) {
					throw alias + currentAlias + ' "data.' + key + '.get" must be Function!';
				}

				// Checking data.prop.set...
				if (checkVariableIsNullOrUndefined(schema.data[key].set) === false && checkVariableIsFunction(schema.data[key].set) === false) {
					throw alias + currentAlias + ' "data.' + key + '.set" must be Function!';
				}
			}
		}

		// Checking methods...
		if (checkVariableIsNullOrUndefined(schema.methods) === false) {
			if (checkVariableIsObject(schema.methods) === false) {
				throw alias + currentAlias + ' "methods" must be Object!';
			}

			// Checking methods's properties...
			for (var key in schema.methods) {
				if (key[0] === '$') {
					throw alias + currentAlias + ' "methods.' + key + '" must not have "$" on name at the beginning!';
				}
				if (key[0] === '_' && key[1] === '_') {
					throw alias + currentAlias + ' "methods.' + key + '" must not have "__" on name at the beginning!';
				}

				// Checking methods.prop...
				if (checkVariableIsFunction(schema.methods[key]) === false) {
					throw alias + currentAlias + ' "methods.' + key + '" must be Function!';
				}
			}
		}

		// Checking watches...
		if (checkVariableIsNullOrUndefined(schema.watches) === false) {
			if (checkVariableIsArray(schema.watches) === false) {
				throw alias + currentAlias + ' "watches" must be Array!';
			}

			// Checking watches's properties...
			for (var i = 0; i < schema.watches.length; i++) {
				// Checking watches.item...
				if (checkVariableIsFunction(schema.watches[i]) === false) {
					throw alias + currentAlias + ' "watches[' + i + ']" must be Function!';
				}
			}
		}

		// Checking on...
		if (checkVariableIsNullOrUndefined(schema.on) === false) {
			if (checkVariableIsObject(schema.on) === false) {
				throw alias + currentAlias + ' "on" must be Object!';
			}

			// Checking on's properties...
			for (var key in schema.on) {
				if (key[0] === '_' && key[1] === '_') {
					throw alias + currentAlias + ' "on.' + key + '" must not have "__" on name at the beginning!';
				}

				// Checking on.prop...
				if (checkVariableIsFunction(schema.on[key]) === false) {
					throw alias + currentAlias + ' "on.' + key + '" must be Function!';
				}
			}
		}

		// Checking mixins...
		if (checkVariableIsNullOrUndefined(schema.mixins) === false) {
			if (checkVariableIsArray(schema.mixins) === false) {
				throw alias + currentAlias + ' "mixins" must be Array!';
			}

			// Checking mixins's items...
			for (var i = 0; i < schema.mixins.length; i++) {
				var mixin = schema.mixins[i];
				checkSchema(mixin, alias + currentAlias + '.mixins[' + i + ']', false, true);
			}
		}

		// Checking sub...
		if (checkVariableIsNullOrUndefined(schema.sub) === false) {
			if (checkVariableIsArray(schema.sub) === false) {
				throw alias + currentAlias + ' "sub" must be Array!';
			}

			// Checking sub's items...
			for (var i = 0; i < schema.sub.length; i++) {
				var sub = schema.sub[i];
				checkSchema(sub, alias + currentAlias + '.sub[' + i + ']', true, false);
			}
		}
	}

	/**
	 * Create a clone object from source without references.
	 * @param {any} source 
	 */
	function cloneObject (source) {
		var destination = source;
		if (checkVariableIsNullOrUndefined(source) === true) {
			return destination;
		}

		if (checkVariableIsArray(source) === true) {
			destination = [];
			for (var i = 0; i < source.length; i++) {
				destination.push(source[i]);
			}

			return destination;
		} else if (checkVariableIsObject(source) === true) {
			destination = {};

			for (var key in source) {
				destination[key] = cloneObject(source[key]);
			}

			return destination;
		}

		return destination;
	}

	if (window['$d'] === null || window['$d'] === undefined) {
		var $d = {};
		window.$d = $d;
	}

	window['$d'].q = document.$;

	var ocdFnc = function (schema) {
		schema = cloneObject(schema);
		checkSchema(schema, '$', false, false, true);

		var queues = [];

		var $ocd = createOcdBySchema({
			schema: schema,
			queues: queues
		});

		consumeQueues(queues);

		$ocd.$loaded = true;

		return $ocd;
	};

	var globalPlugins = {};
	var globalPluginSelf = {};
	createEasyMethods(globalPluginSelf);
	globalPlugins.$add = function (alias, plugin) {
		checkVariableIsString(alias, 'Plugin\'s alias');
		checkVariableIsFunction(plugin, 'Plugin\'s');

		globalPlugins[alias] = function () {
			return plugin.apply(globalPluginSelf, arguments);
		};
	};

	ocdFnc.plugins = globalPlugins;
	window['$d'].ocd = ocdFnc;

	var global = {};
	$d.$global = global;
})();
