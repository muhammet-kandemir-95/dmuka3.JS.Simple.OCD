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
		el.setAttribute('ocd-el-id', ocdElId.toString());
		fnc(ocdElId.toString());
		el.removeAttribute('ocd-el-id');
	}

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
				get $parentOcd () {
					if (self.$ocd !== null && self.$ocd !== undefined) {
						return self.$ocd.$parent;
					} else {
						var el = self.parentNode;

						while (el.$ocd === null || el.$ocd === undefined) {
							el = el.parentNode;
						}

						return el.$ocd;
					}
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
							return classAttr.trim() === value || classAttr.indexOf(' ' + value) >= 0 || classAttr.indexOf(value + ' ') >= 0;
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
						return self.removeAttribute(name);
					};
				},
				get css () {
					return function () {
						if (arguments.length === 1) {
							if (checkVariableIsString(arguments[0]) === true) {
								return self.style[arguments[0]];
							} else {
								for (var key in arguments[0]) {
									self.style[key] = arguments[0][key];
								}
							}
						} else if (arguments.length === 2) {
							self.style[arguments[0]] = arguments[1];
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
							return self.value;
						} else if (arguments.length === 1) {
							self.value = arguments[0];
							return result;
						}
					};
				},
				get create () {
					return function (tagName) {
						return document.createElement(tagName);
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
							})
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
							})
							return result;
						}

						return self.querySelector(query);
					};
				},
				get append () {
					return function (el) {
						self.appendChild(el);
						return result;
					};
				},
				get appendBegin () {
					return function (el) {
						el.insertAdjacentElement('afterbegin', self);
						return result;
					};
				},
				get insertBefore () {
					return function (el) {
						el.insertAdjacentElement('beforebegin', self);
						return result;
					};
				},
				get insertAfter () {
					return function (el) {
						el.insertAdjacentElement('afterend', self);
						return result;
					};
				},
				get has () {
					return function (el) {
						ocdElId++;
						el.setAttribute('ocd-el-id', ocdElId.toString());
						var result = self.querySelector(el.tagName + '[ocd-el-id="' + ocdElId + '"]') !== null;
						el.removeAttribute('ocd-el-id');
						return result;
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
			if (self.__ocdElementData === null || self.__ocdElementData === undefined) {
				self.__ocdElementData = {};
			}

			var result = null;
			result = {
				get create () {
					return function (tagName) {
						return document.createElement(tagName);
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
						return self.querySelectorAll(query);
					};
				},
				get first () {
					return function (query) {
						return self.querySelector(query);
					};
				},
				get seturl () {
					return function (url) {
						if (checkVariableIsNullOrUndefined(history.replaceState) === false) {
							history.replaceState(null, null, url);
						} else {
							location.href = url;
						}
					};
				},
				get ajax () {
					return function (options) {
						var url = options.url;
						var type = options.type || 'GET';
						var data = options.data || '';
						var callback = options.callback || function () { };
						var success = options.success || function () { };
						var error = options.error || function () { };
						var onprogress = options.onprogress || function () { };
						var onabort = options.onabort || function () { };
						var contentType = options.contentType;
						var headers = options.headers || {};
						var responseType = options.responseType;

						var xhr = new XMLHttpRequest();
						xhr.open(type, url, true);

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
								callback.call(xhr, xhr.response);

								if (xhr.status >= 200 && xhr.status < 300) {
									success.call(xhr, xhr.response, xhr.status);
								} else {
									error.call(xhr, xhr.response, xhr.status);
								}
							}
						}

						xhr.onprogress = function () {
							onprogress.call(xhr);
						};

						xhr.onabort = function () {
							onabort.call(xhr);
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
						if (arguments.length === 1) {
							// GET
							var name = arguments[0];
							var nameEQ = name + "=";
							var ca = document.cookie.split(';');
							for (var i = 0; i < ca.length; i++) {
								var c = ca[i];
								while (c.charAt(0) == ' ') c = c.substring(1, c.length);
								if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
							}
							return null;
						} else if (arguments.length === 2 || arguments.length === 3) {
							var name = arguments[0];
							var value = arguments[1];
							var days = arguments[2];
							if (checkVariableIsNullOrUndefined(days) === true) {
								days = 365;
							}

							if (checkVariableIsNullOrUndefined(value) === true) {
								// REMOVE
								document.cookie = name + '=; Max-Age=-99999999;';
							} else {
								// SET
								var expires = "";
								var date = new Date();
								date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
								expires = "; expires=" + date.toUTCString();
								document.cookie = name + "=" + (value || "") + expires + "; path=/";
							}
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
				prop === '__alias' ||
				prop === '__jobject' ||
				prop === '__ocd' ||
				prop === '__ocdData' ||
				prop === '__ocdDataEnableCount' ||
				prop === '__runOnceCheck' ||
				prop === '$root' ||
				prop === '$parent' ||
				prop === 'jobject' ||
				prop === '$set' ||
				prop === '$loaded' ||
				prop === '$el' ||
				prop === '$index' ||
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

				if (v[key].__ocd === false) {
					continue;
				}

				o[key] = toJObject(v[key]);
			}

			return o;
		}
	}

	/**
	 * Fill the ocd item by a object value.
	 * @param {any} v 
	 * @param {any} ocdP 
	 */
	function recursiveFill (v, ocdP) {
		if (ocdP.__ocd === true) {
			ocdP.value = v;
		} else if (checkVariableIsArray(v)) {
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

				if (checkVariableIsNullOrUndefined(ocdP.__ocdData) === false && ocdP.__ocdData[key] === true) {
					ocdP[key] = v[key];
				} else {
					recursiveFill(v[key], ocdP[key]);
				}
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
		//#endregion
		var ocdItem = null;

		var declareStd = function () {
			if (checkVariableIsNullOrUndefined(rootOcd) === true) {
				rootOcd = ocdItem;
				rootOcd.__runOnceCheck = false;
			}

			Object.defineProperty(ocdItem, '$runOnce', {
				get: function () {
					return function (fnc) {
						if (rootOcd.__runOnceCheck === false) {
							rootOcd.__runOnceCheck = true;

							setTimeout(function () {
								fnc.call(ocdItem);
								rootOcd.__runOnceCheck = false;
							});
						}
					};
				}
			});

			Object.defineProperty(ocdItem, '$el', {
				get: function () {
					return ocdEl;
				}
			});

			var dataProps = {};
			var dataPropsEnableCount = 0;
			Object.defineProperty(ocdItem, '__ocdData', {
				get: function () {
					return dataProps;
				}
			});
			Object.defineProperty(ocdItem, '__ocdDataEnableCount', {
				get: function () {
					return dataPropsEnableCount;
				}
			});

			Object.defineProperty(ocdItem, '__jobject', {
				get: function () {
					return jobject !== false;
				}
			});

			Object.defineProperty(ocdEl, '$ocd', {
				get: function () {
					return ocdItem;
				}
			});

			Object.defineProperty(ocdItem, '$root', {
				get: function () {
					return rootOcd;
				}
			});

			if (checkVariableIsNullOrUndefined(parentOcd) === false) {
				Object.defineProperty(ocdItem, '$parent', {
					get: function () {
						return parentOcd;
					}
				});
			}

			Object.defineProperty(ocdItem, 'jobject', {
				get: function () {
					return toJObject(ocdItem);
				}
			});

			ocdItem.toJSON = function () {
				return ocdItem.jobject;
			};

			ocdItem.toString = function () {
				return ocdItem.value;
			};


			for (var key in getPropAsObject(methods)) {
				(function (key) {
					Object.defineProperty(ocdItem, key, {
						get: function () {
							return function () {
								methods[key].apply(ocdItem, arguments);
							};
						}
					});
				})(key);
			}

			for (var key in getPropAsObject(data)) {
				(function (key) {
					Object.defineProperty(dataProps, key, {
						get: function () {
							return data[key].jobject !== false;
						}
					});

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
							if (checkVariableIsNullOrUndefined(result) === false) {
								value = result;
							}
							el.$.data(key, value);
						};
					}

					Object.defineProperty(ocdItem, key, {
						get: function () {
							return dataGet(ocdEl, key);
						},
						set: function (value) {
							dataSet(ocdEl, value, key);
						}
					});

					queues.push(function () {
						if (checkVariableIsNullOrUndefined(data[key].default) === false) {
							ocdEl.$.data(key, data[key].default);
							if (checkVariableIsFunction(data[key].default) === true) {
								dataSet(ocdEl, data[key].default(ocdItem), key);
							} else {
								dataSet(ocdEl, data[key].default, key);
							}
						} else if (checkVariableIsNullOrUndefined(dataGet) === false) {
							dataSet(ocdEl, dataGet(ocdEl, key), key);
						}
					});
				})(key);
			}

			if (checkVariableIsNullOrUndefined(on) === false) {
				for (var key in getPropAsObject(on)) {
					if (key[0] === '$') {
						continue;
					}

					(function (key) {
						ocdEl.addEventListener(key, function (e) {
							return on[key].call(ocdItem, e);
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

			ocdItem = {
				get __ocd () {
					return jobject !== false;
				},
				get value () {
					return ocdGet.call(ocdItem);
				},
				set value (value) {
					ocdSet.call(ocdItem, value);
				}
			};

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
		Object.defineProperty(item, '__hide', {
			get: function () {
				return hide;
			}
		});

		Object.defineProperty(item, '__isNullOrUndefined', {
			get: function () {
				return checkVariableIsNullOrUndefined;
			}
		});

		Object.defineProperty(item, '__isDate', {
			get: function () {
				return checkVariableIsDate;
			}
		});

		Object.defineProperty(item, '__isString', {
			get: function () {
				return checkVariableIsString;
			}
		});

		Object.defineProperty(item, '__isNumber', {
			get: function () {
				return checkVariableIsNumber;
			}
		});

		Object.defineProperty(item, '__isArray', {
			get: function () {
				return checkVariableIsArray;
			}
		});

		Object.defineProperty(item, '__isBool', {
			get: function () {
				return checkVariableIsBoolean;
			}
		});

		Object.defineProperty(item, '__isObject', {
			get: function () {
				return checkVariableIsObject;
			}
		});

		Object.defineProperty(item, '__isHTML', {
			get: function () {
				return checkVariableIsHTML;
			}
		});

		Object.defineProperty(item, '__isFunction', {
			get: function () {
				return checkVariableIsFunction;
			}
		});

		Object.defineProperty(item, '__alias', {
			get: function () {
				return alias;
			}
		});
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
									mixin.on[key].apply(this, arguments);
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
				var cloneElClone = cloneEl.cloneNode(true);
				cloneElClone.removeAttribute('ocd-clone');
				cloneEl.remove();
				clone = function (value) {
					return cloneElClone.cloneNode(true);
				};
			} else {
				ocdElIdProcess(queryParentEl, function (ocdElId) {
					var cloneEl = queryParentEl.parentNode.querySelector('*[ocd-el-id="' + ocdElId + '"]>*[ocd-clone]');
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
			for (var i = 0; i < query.length; i++) {
				var element = query[i];
				checkVariableIsHTML(element, alias + '[' + i + ']');
			}
		} else if (checkVariableIsHTML(query) === true) {
			queryResults = [query];
		}

		if (single === true) {
			checkVariableIsNullOrUndefined(queryResults[0], alias + ' "query"\'s result must not be null!');
			queryResults.length = 1;
		}

		var resultOcd = [];
		Object.defineProperty(resultOcd, '__jobject', {
			get: function () {
				return jobject !== false;
			}
		});

		if (checkVariableIsNullOrUndefined(queryParentEl) === false && checkVariableIsNullOrUndefined(queryParentEl.$ocd) === true) {
			Object.defineProperty(queryParentEl, '$ocd', {
				get: function () {
					return resultOcd;
				}
			});
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
			for (var i = 0; i < resultOcd.length; i++) {
				if (resultOcd[i] === ocdItem) {
					return i;
				}
			}

			return -1;
		};

		for (var i = 0; i < queryResults.length; i++) {
			var ocdEl = queryResults[i];

			var ocdItem = createOcdItem({
				rootOcd: rootOcd,
				jobject: jobject,
				parentOcd: resultOcd,
				queues: queues,
				ocdEl: ocdEl,
				sub: sub,
				get: get,
				set: set,
				data: data,
				on: on,
				methods: methods
			});
			Array.prototype.push.call(resultOcd, ocdItem);

			(function (ocdItem) {
				createEasyMethods(ocdItem);

				Object.defineProperty(ocdItem, '$remove', {
					get: function () {
						return function () {
							removeOcdItemMethod(ocdItem);
						};
					}
				});

				Object.defineProperty(ocdItem, '$index', {
					get: function () {
						return getIndexOcdItemMethod(ocdItem);
					}
				});

				queues.push(function () {
					oninit.call(ocdItem);
				});
			})(ocdItem);
		}

		if (checkVariableIsNullOrUndefined(parentEl) === false) {
			var createACloneOcd = function (value, fnc) {
				var cloneEl = clone.call(parentOcd);
				fnc(cloneEl);

				var ocdItem = createOcdItem({
					rootOcd: rootOcd,
					jobject: jobject,
					parentOcd: resultOcd,
					queues: queues,
					ocdEl: cloneEl,
					sub: sub,
					get: get,
					set: set,
					data: data,
					on: on,
					methods: methods
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

			Object.defineProperty(resultOcd, '$el', {
				get: function () {
					return queryParentEl;
				}
			});

			Object.defineProperty(resultOcd, '$parent', {
				get: function () {
					return parentOcd;
				}
			});

			Object.defineProperty(resultOcd, '$set', {
				get: function () {
					return function (value) {
						recursiveFill(value, resultOcd);
					};
				}
			});

			Object.defineProperty(resultOcd, '$add', {
				get: function () {
					return function (value) {
						var ocdNewItem = createACloneOcd(value, function (el) {
							queryParentEl.appendChild(el);
						});

						Array.prototype.push.call(resultOcd, ocdNewItem.ocd);

						createEasyMethods(ocdNewItem.ocd);

						Object.defineProperty(ocdNewItem.ocd, '$set', {
							get: function () {
								return function (value) {
									recursiveFill(value, ocdNewItem.ocd);
								};
							}
						});

						Object.defineProperty(ocdNewItem.ocd, '$remove', {
							get: function () {
								return function () {
									removeOcdItemMethod(ocdNewItem.ocd);
								};
							}
						});

						Object.defineProperty(ocdNewItem.ocd, '$index', {
							get: function () {
								return getIndexOcdItemMethod(ocdNewItem.ocd);
							}
						});

						consumeQueues(queues);

						oninit.call(ocdNewItem.ocd);

						return ocdNewItem.ocd;
					};
				}
			});

			Object.defineProperty(resultOcd, '$addRange', {
				get: function () {
					return function (values) {
						for (var i = 0; i < values.length; i++) {
							var value = values[i];
							resultOcd.$add(value);
						}
					};
				}
			});

			Object.defineProperty(resultOcd, '$removeAt', {
				get: function () {
					return function (index) {
						var ocdItem = resultOcd[index];
						ocdItem.$el.remove();
						resultOcd.splice(index, 1);

						onremove.call(ocdItem);
					};
				}
			});

			Object.defineProperty(resultOcd, '$clear', {
				get: function () {
					return function (index) {
						var len = resultOcd.length;
						for (var i = len - 1; i >= 0; i--) {
							resultOcd.$removeAt(i);
						}
					};
				}
			});

			Object.defineProperty(resultOcd, '$insert', {
				get: function () {
					return function (index, value) {
						if (index >= resultOcd.length) {
							return resultOcd.$add(value);
							return;
						}

						var ocdItem = resultOcd[index];
						var ocdNewItem = createACloneOcd(value, function (el) {
							ocdItem.$el.parentNode.insertBefore(el, ocdItem.$el);
						});

						resultOcd.splice(index, 0, ocdNewItem.ocd);

						createEasyMethods(ocdNewItem.ocd);

						Object.defineProperty(ocdNewItem.ocd, '$set', {
							get: function () {
								return function (value) {
									recursiveFill(value, ocdNewItem.ocd);
								};
							}
						});

						Object.defineProperty(ocdNewItem.ocd, '$remove', {
							get: function () {
								return function () {
									removeOcdItemMethod(ocdNewItem.ocd);
								};
							}
						});

						Object.defineProperty(ocdNewItem.ocd, '$index', {
							get: function () {
								return getIndexOcdItemMethod(ocdNewItem.ocd);
							}
						});

						consumeQueues(queues);

						oninit.call(ocdNewItem.ocd);

						return ocdNewItem.ocd;
					};
				}
			});
		}

		Object.defineProperty(resultOcd, 'jobject', {
			get: function () {
				return toJObject(resultOcd);
			}
		});

		for (var i = 0; i < resultOcd.length; i++) {
			var resultOcdItem = resultOcd[i];

			(function (resultOcdItem) {
				Object.defineProperty(resultOcdItem, '$set', {
					get: function () {
						return function (value) {
							recursiveFill(value, resultOcdItem);
						};
					}
				});
			})(resultOcdItem);
		}

		if (checkVariableIsNullOrUndefined(parentEl) === true) {
			if (single === true) {
				resultOcd = resultOcd[0];

				delete resultOcd.$remove;
				delete resultOcd.$index;
			}

			return resultOcd;
		} else {
			if (single === true) {
				resultOcd = resultOcd[0];

				delete resultOcd.$remove;
				delete resultOcd.$index;
			}

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
	function consumeQueues (queues) {
		var queuesClone = cloneObject(queues);
		queues.length = 0;
		for (var i = 0; i < queuesClone.length; i++) {
			queuesClone[i]();
		}
	}

	/**
	 * To check schema is correct.
	 * @param {any} schema 
	 * @param {string} alias 
	 * @param {boolean} sub 
	 * @param {boolean} mixin 
	 */
	function checkSchema (schema, alias, sub, mixin) {
		/*
		{
			query: <string|array|HTMLElement>,
			get?: <function([this]$ocd):any>,
			set?: <function([this]$ocd, value)>,
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
				on?: ...,
				methods?: ...
			}],
			sub?: [{
				parentQuery?: <string|array|HTMLElement>,
				query: <string|array|HTMLElement>,
				single: <bool>,
				alias: <string>,
				get?: <function([this]$ocd):any>,
				set?: <function([this]$ocd, value)>,
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
					on?: ...,
					methods?: ...
				}],
				sub?: [{
					parentQuery?: <string|array|HTMLElement>,
					query: <string|array|HTMLElement>,
					single: <bool>,
					alias: <string>,
					get?: <function([this]$ocd):any>,
					set?: <function([this]$ocd, value)>,
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

		if (mixin === false) {
			// Checking alias...
			if (sub === true) {
				checkVariableIsNullOrUndefined(schema.alias, alias + currentAlias + ' Alias');

				checkVariableIsString(schema.alias, alias + currentAlias + ' Alias');

				schema.alias = schema.alias.trim();
				if (schema.alias.trim().length === 0) {
					throw alias + currentAlias + ' "alias" must be filled!';
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
				// Checking methods.prop...
				if (checkVariableIsFunction(schema.methods[key]) === false) {
					throw alias + currentAlias + ' "methods.' + key + '" must be Function!';
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
		Object.defineProperty(window, '$d', {
			get: function () {
				return $d;
			}
		});
	}

	Object.defineProperty(window['$d'], 'q', {
		get: function () {
			return document.$;
		}
	});

	var ocdFnc = function (schema) {
		schema = cloneObject(schema);
		checkSchema(schema, '$', false, false);

		var queues = [];

		var $ocd = createOcdBySchema({
			schema: schema,
			queues: queues
		});

		consumeQueues(queues);

		Object.defineProperty($ocd, '$loaded', {
			get: function () {
				return true;
			}
		});

		return $ocd;
	};

	var globalPlugins = {};
	var globalPluginSelf = {};
	createEasyMethods(globalPluginSelf);
	Object.defineProperty(globalPlugins, '$add', {
		get: function () {
			return function (alias, plugin) {
				checkVariableIsString(alias, 'Plugin\'s alias');
				checkVariableIsFunction(plugin, 'Plugin\'s');

				Object.defineProperty(globalPlugins, alias, {
					get: function () {
						return function () {
							return plugin.apply(globalPluginSelf, arguments);
						};
					}
				});
			};
		}
	});

	Object.defineProperty(ocdFnc, 'plugins', {
		get: function () {
			return globalPlugins;
		}
	});

	Object.defineProperty(window['$d'], 'ocd', {
		get: function () {
			return ocdFnc;
		}
	});
})();
