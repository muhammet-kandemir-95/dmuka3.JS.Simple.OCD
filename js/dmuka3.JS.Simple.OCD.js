/**
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
	//#region HTML Element Prototypes
	Object.defineProperty(Element.prototype, 'ocd', {
		get: function () {
			var self = this;

			var result = {
				get $parentOcd () {
					var el = self.parentNode;

					while (el.$ocdItem === null || el.$ocdItem === undefined) {
						el = el.parentNode;
					}

					return el.$ocdItem;
				},
				addClass: function (value) {
					self.classList.add(value);
				},
				removeClass: function (value) {
					self.classList.remove(value);
				},
				containsClass: function (value) {
					return self.classList.contains(value);
				},
				attr: function () {
					if (arguments.length === 1) {
						return self.getAttribute(arguments[0]);
					} else if (arguments.length === 2) {
						self.setAttribute(arguments[0], arguments[1]);
					}
				},
				html: function () {
					if (arguments.length === 0) {
						return self.innerHTML;
					} else if (arguments.length === 1) {
						self.innerHTML = arguments[0];
					}
				},
				text: function () {
					if (arguments.length === 0) {
						return self.innerText;
					} else if (arguments.length === 1) {
						self.innerText = arguments[0];
					}
				},
				on: function (name, fnc) {
					self.addEventListener(name, fnc);
				},
				removeEvent: function (name, fnc) {
					self.removeEventListener(name, fnc);
				},
				find: function (query) {
					return self.querySelectorAll(':scope ' + query);
				},
				findFirst: function (query) {
					return self.querySelector(':scope ' + query);
				},
				append: function (el) {
					self.appendChild(el);
				},
				appendBegin: function (el) {
					el.insertAdjacentElement('afterbegin', self);
				},
				append: function (el) {
					self.appendChild(el);
				},
				insertBefore: function (el) {
					el.insertAdjacentElement('beforebegin', self);
				},
				insertAfter: function (el) {
					el.insertAdjacentElement('afterend', self);
				}
			};

			return result;
		}
	});

	window['$ocdq'] = document.body.ocd;
	//#endregion

	//#region Check Variable by ?
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
				throw errorVariableName + ' must be a Array or a NodeList!';
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
	 * Create a ocd item. It maybe an array or object.
	 * This function also is recursive function with 'commitSchema'
	 * @param {HTMLElement} queryResultItemEl 
	 * @param {any} sub 
	 * @param {function} get 
	 * @param {function} set 
	 * @param {any} data 
	 */
	function createOcdItem (queryResultItemEl, sub, get, set, data) {
		var ocdItem = null;
		if (checkVariableIsNullOrUndefined(sub) === false) {
			ocdItem = {};
			for (let si = 0; si < sub.length; si++) {
				const subItem = sub[si];

				commitSchema(queryResultItemEl, subItem, ocdItem);
			}

			Object.defineProperty(ocdItem, 'el', {
				get: function () {
					return queryResultItemEl;
				}
			});
		} else {
			var ocdGet = get;
			if (checkVariableIsNullOrUndefined(ocdGet) === true) {
				switch (queryResultItemEl.tagName) {
					case 'INPUT': {
						var type = queryResultItemEl.getAttribute('type');
						if (checkVariableIsNullOrUndefined(type) === true) {
							type = 'text';
						}
						type = type.toLowerCase();

						switch (type) {
							case 'checkbox':
							case 'radio':
								ocdGet = function (el) {
									return el.checked;
								};
								break;
							default:
								ocdGet = function (el) {
									return el.value;
								};
								break;
						}
					}
						break;
					case 'SELECT': {
						ocdGet = function (el) {
							return el.value;
						};
					}
						break;
					default: {
						ocdGet = function (el) {
							return el.innerHTML;
						};
					}
						break;
				}
			}

			var ocdSet = set;
			if (checkVariableIsNullOrUndefined(ocdSet) === true) {
				switch (queryResultItemEl.tagName) {
					case 'INPUT': {
						var type = queryResultItemEl.getAttribute('type');
						if (checkVariableIsNullOrUndefined(type) === true) {
							type = 'text';
						}
						type = type.toLowerCase();

						switch (type) {
							case 'checkbox':
							case 'radio':
								ocdSet = function (el, value) {
									el.checked = value == true;
								};
								break;
							default:
								ocdSet = function (el, value) {
									el.value = value;
								};
								break;
						}
					}
						break;
					case 'SELECT': {
						ocdSet = function (el, value) {
							el.value = value;
						};
					}
						break;
					default: {
						ocdSet = function (el, value) {
							el.innerHTML = value;
						};
					}
						break;
				}
			}

			ocdItem = {
				get __ocd () {
					return true;
				},
				get value () {
					return ocdGet(queryResultItemEl);
				},
				set value (value) {
					ocdSet(queryResultItemEl, value);
				},
				get el () {
					return queryResultItemEl;
				}
			};

			var dataProps = [];
			for (var key in data) {
				if (data[key].jobject === true) {
					dataProps.push(key);
				}

				Object.defineProperty(ocdItem, key, {
					get: function () {
						return data[key].get(queryResultItemEl);
					},
					set: function (value) {
						data[key].set(queryResultItemEl, value);
					}
				});
				data[key].set(queryResultItemEl, data[key].get(queryResultItemEl));
			}

			Object.defineProperty(ocdItem, '__ocdData', {
				get: function () {
					return dataProps;
				}
			});
		}

		Object.defineProperty(queryResultItemEl, '$ocdItem', {
			get: function () {
				return ocdItem;
			}
		});

		Object.defineProperty(ocdItem, 'jobject', {
			get: function () {
				return toJObject(ocdItem);
			}
		});

		ocdItem.__proto__.toString = function () {
			return ocdItem.value;
		};

		return ocdItem;
	}

	/**
	 * Object/Array to Json Object.
	 * @param {any} v 
	 */
	function toJObject (v) {
		if (checkVariableIsNullOrUndefined(v) === true) {
			return v;
		} else if (checkVariableIsArray(v)) {
			var arr = [];

			for (let i = 0; i < v.length; i++) {
				const item = v[i];
				arr.push(toJObject(item));
			}

			return arr;
		} else if (v.constructor.name !== 'Object') {
			return v;
		} else if (v.__ocd === true) {
			if (v.__ocdData.length === 0) {
				return v.value;
			} else {
				var o = {
					value: v.value
				};

				for (let i = 0; i < v.__ocdData.length; i++) {
					const dataKey = v.__ocdData[i];
					o[dataKey] = v[dataKey];
				}

				return o;
			}
		} else {
			var o = {};

			for (var key in v) {
				if (checkVariableIsFunction(v[key]) === true) {
					continue;
				}

				o[key] = toJObject(v[key]);
			}

			return o;
		}
	};

	/**
	 * Create a ocd item by schema.
	 * @param {HTMLElement} parentEl 
	 * @param {any} schema 
	 * @param {any} parentObj 
	 */
	function commitSchema (parentEl, schema, parentObj) {
		/*
		{
			query: <string|array|HTMLElement>,
			get?: <function(el):any>,
			set?: <function(el, value)>,
			data?: {
				prop1: {
					jobject: <bool>,
					get: <function(el):any>,
					set: <function(el, value)>
				},
				prop2: ...,
				...
			},
			oninit?: <function(ocdItem)>,
			onremove?: <function(ocdItem)>,
			sub: [{
				parentQuery?: <string|array|HTMLElement>,
				query: <string|array|HTMLElement>,
				alias: <string>,
				get?: <function(el):any>,
				set?: <function(el, value)>,
				data?: {
					prop1: {
						jobject: <bool>,
						get: <function(el):any>,
						set: <function(el, value)>
					},
					prop2: ...,
					...
				},
				clone: <function(value):el>,
				oninit?: <function(ocdItem)>,
				onremove?: <function(ocdItem)>,
				sub: [{
					parentQuery?: <string|array|HTMLElement>,
					query: <string|array|HTMLElement>,
					alias: <string>,
					get?: <function(el):any>,
					set?: <function(el, value)>,
					data?: {
						prop1: {
							jobject: <bool>,
							get: <function(el):any>,
							set: <function(el, value)>
						},
						prop2: ...,
						...
					},
					clone: <function():el>,
					oninit?: <function(ocdItem)>,
					onremove?: <function(ocdItem)>,
					sub: ...
				}, ...]
			}, ...]
		}
		 */
		var alias = schema.alias;
		if (checkVariableIsNullOrUndefined(parentEl) === false) {
			checkVariableIsNullOrUndefined(alias, 'Alias');
		}

		var obj = schema.obj;
		var sub = schema.sub;
		var query = schema.query;
		checkVariableIsNullOrUndefined(query, 'Query');

		var parentQuery = schema.parentQuery;

		var get = schema.get;
		var set = schema.set;
		var data = schema.data;
		if (checkVariableIsNullOrUndefined(data) === true) {
			data = {};
		}
		var oninit = schema.oninit;
		if (checkVariableIsNullOrUndefined(oninit) === true) {
			oninit = function (ocdItem) { };
		}
		var onremove = schema.onremove;
		if (checkVariableIsNullOrUndefined(onremove) === true) {
			onremove = function (ocdItem) { };
		}

		var queryParentEl = parentEl;
		if (checkVariableIsString(parentQuery) === true) {
			queryParentEl = (parentEl || document).querySelector(':scope ' + parentQuery);
		} else if (checkVariableIsHTML(parentQuery) === true) {
			queryParentEl = parentQuery;
		} else if (checkVariableIsNullOrUndefined(parentQuery) === false) {
			throw 'Query must be String or HTMLElement';
		}

		var clone = schema.clone;
		if (checkVariableIsNullOrUndefined(parentEl) === false && checkVariableIsNullOrUndefined(clone) === true && obj !== true) {
			var cloneEl = queryParentEl.querySelector(':scope>*[ocd-clone]');
			var cloneElClone = cloneEl.cloneNode(true);
			cloneElClone.removeAttribute('ocd-clone');
			cloneEl.remove();
			clone = function () {
				return cloneElClone.cloneNode(true);
			};
		}

		var queryResults = null;
		if (checkVariableIsString(query) === true) {
			queryResults = (queryParentEl || document).querySelectorAll(':scope ' + query);
		} else if (checkVariableIsArray(query) === true) {
			for (let i = 0; i < query.length; i++) {
				const element = query[i];
				checkVariableIsHTML(element, alias + '[' + i + ']');
			}
		} else if (checkVariableIsHTML(query) === true) {
			queryResults = [query];
		} else {
			throw 'Query must be String, Array, NodeList or HTMLElement';
		}

		var resultOcd = [];
		var removeOcdItemMethod = function (ocdItem) {
			for (let i = 0; i < resultOcd.length; i++) {
				const item = resultOcd[i];
				if (item === ocdItem) {
					resultOcd.removeAt(i);
					break;
				}
			}
		};
		for (let i = 0; i < queryResults.length; i++) {
			const queryResultItemEl = queryResults[i];

			var ocdItem = createOcdItem(queryResultItemEl, sub, get, set, data);
			Array.prototype.push.call(resultOcd, ocdItem);

			ocdItem.remove = function () {
				removeOcdItemMethod(ocdItem);
			};

			oninit(ocdItem);
		}

		if (checkVariableIsNullOrUndefined(parentEl) === false) {
			var recursiveFill = function (v, ocdP) {
				if (
					checkVariableIsNullOrUndefined(v) === true ||
					(
						v.constructor.name !== 'Object' &&
						v.constructor.name !== 'Array'
					)
				) {
					ocdP.value = v;
				} else if (checkVariableIsArray(v)) {
					ocdP.clear();
					for (let ai = 0; ai < v.length; ai++) {
						const vItem = v[ai];
						var ocdPItem = ocdP.add();
						recursiveFill(vItem, ocdPItem);
					}
				} else {
					for (var key in v) {
						recursiveFill(v[key], ocdP[key]);
					}
				}
			};

			var createACloneOcd = function (value) {
				var cloneEl = clone();

				var ocdItem = createOcdItem(cloneEl, sub, get, set, data);
				if (checkVariableIsNullOrUndefined(value) === false) {
					recursiveFill(value, ocdItem);
				}

				var result = {
					el: cloneEl,
					ocd: ocdItem
				};
				return result;
			};

			Object.defineProperty(resultOcd, 'el', {
				get: function () {
					return queryParentEl;
				}
			});

			resultOcd.set = function (index, value) {
				recursiveFill(value, resultOcd[index]);
			};

			resultOcd.add = function (value) {
				var ocdNewItem = createACloneOcd(value);
				queryParentEl.appendChild(ocdNewItem.el);

				Array.prototype.push.call(resultOcd, ocdNewItem.ocd);
				ocdNewItem.ocd.remove = function () {
					removeOcdItemMethod(ocdNewItem.ocd);
				};

				oninit(ocdNewItem.ocd);

				return ocdNewItem.ocd;
			};

			resultOcd.addRange = function (values) {
				for (let i = 0; i < values.length; i++) {
					const value = values[i];
					resultOcd.add(value);
				}
			};

			resultOcd.removeAt = function (index) {
				var ocdItem = resultOcd[index];
				ocdItem.el.remove();
				resultOcd.splice(index, 1);

				onremove(ocdItem);
			};

			resultOcd.clear = function (index) {
				var len = resultOcd.length;
				for (let i = len - 1; i >= 0; i--) {
					resultOcd.removeAt(i);
				}
			};

			resultOcd.insert = function (index, value) {
				if (index >= resultOcd.length) {
					resultOcd.add(value);
					return;
				}

				var ocdNewItem = createACloneOcd(value);
				var ocdItem = resultOcd[index];
				ocdItem.el.parentNode.insertBefore(ocdNewItem.el, ocdItem.el);

				resultOcd.splice(index, 0, ocdNewItem.ocd);
				ocdNewItem.ocd.remove = function () {
					removeOcdItemMethod(ocdNewItem.ocd);
				};

				oninit(ocdNewItem.ocd);
			};

			delete resultOcd.concat;
			delete resultOcd.copyWithin;
			delete resultOcd.entries;
			delete resultOcd.every;
			delete resultOcd.fill;
			delete resultOcd.filter;
			delete resultOcd.find;
			delete resultOcd.findIndex;
			delete resultOcd.forEach;
			delete resultOcd.from;
			delete resultOcd.includes;
			delete resultOcd.indexOf;
			delete resultOcd.isArray;
			delete resultOcd.join;
			delete resultOcd.keys;
			delete resultOcd.lastIndexOf;
			delete resultOcd.map;
			delete resultOcd.pop;
			delete resultOcd.push;
			delete resultOcd.reduce;
			delete resultOcd.reduceRight;
			delete resultOcd.reverse;
			delete resultOcd.shift;
			delete resultOcd.slice;
			delete resultOcd.some;
			delete resultOcd.sort;
			delete resultOcd.splice;
			delete resultOcd.unshift;
			delete resultOcd.values;
		}

		Object.defineProperty(resultOcd, 'jobject', {
			get: function () {
				return toJObject(resultOcd);
			}
		});

		for (let i = 0; i < resultOcd.length; i++) {
			const resultOcdItem = resultOcd[i];

			resultOcdItem.set = function (value) {
				recursiveFill(value, resultOcdItem);
			};
		}

		if (checkVariableIsNullOrUndefined(parentEl) === true) {
			if (obj === true) {
				resultOcd = resultOcd[0];
			}

			return resultOcd;
		} else {
			if (obj === true) {
				resultOcd = resultOcd[0];
			}

			var result = parentObj;
			result[alias] = resultOcd;
			return result;
		}
	}

	if (window['$d'] === null || window['$d'] === undefined) {
		window['$d'] = {};
	}

	window['$d']['ocd'] = function (schema) {
		return commitSchema(undefined, schema);
	};
})();