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
	Object.defineProperty(Element.prototype, '$', {
		get: function () {
			var self = this;
			if (self.__ocdElementData === null || self.__ocdElementData === undefined) {
				self.__ocdElementData = {};
			}

			var result = {
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
				data: function () {
					if (arguments.length === 1) {
						return self.__ocdElementData[arguments[0]];
					} else if (arguments.length === 2) {
						self.__ocdElementData[arguments[0]] = arguments[1];
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
				is: function (query) {
					return self.matches(query);
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

	window['$ocdQuery'] = document.body.$;
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
	 * @param {boolean} jobject 
	 * @param {any} parentOcd 
	 * @param {Array} queues 
	 * @param {any} on 
	 * @param {any} subOn 
	 * @param {any} rootOcd 
	 * @param {any} methods 
	 */
	function createOcdItem (queryResultItemEl, sub, get, set, data, jobject, parentOcd, queues, on, subOn, rootOcd, methods) {
		var ocdItem = null;

		var declareStd = function () {
			Object.defineProperty(ocdItem, '__ocdData', {
				get: function () {
					return dataProps;
				}
			});

			Object.defineProperty(queryResultItemEl, '$ocd', {
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

			ocdItem.__proto__.toString = function () {
				return ocdItem.value;
			};


			var methodsOcd = {};
			for(var key in methods) {
				(function (key) {
					methodsOcd[key] = function () {
						methods[key].apply(ocdItem, arguments);
					};
				})(key);
			}

			Object.defineProperty(ocdItem, 'm', {
				get: function () {
					return methodsOcd;
				}
			});

			var dataProps = [];
			for (var key in data) {
				(function (key) {
					if (data[key].jobject === true) {
						dataProps.push(key);
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
							el.$.data(key, value);
							data[key].set.call(ocdItem, value, key);
						};
					}

					Object.defineProperty(ocdItem, key, {
						get: function () {
							return dataGet(queryResultItemEl, key);
						},
						set: function (value) {
							dataSet(queryResultItemEl, value, key);
						}
					});

					queues.push(function () {
						if (checkVariableIsNullOrUndefined(data[key].default) === false) {
							if (checkVariableIsFunction(data[key].default) === true) {
								dataSet(queryResultItemEl, data[key].default(ocdItem), key);
							} else {
								dataSet(queryResultItemEl, data[key].default, key);
							}
						} else if (checkVariableIsNullOrUndefined(dataGet) === false) {
							dataSet(queryResultItemEl, dataGet(queryResultItemEl, key), key);
						}
					});
				})(key);
			}

			if (checkVariableIsNullOrUndefined(on) === false) {
				for (var key in on) {
					(function (key) {
						queryResultItemEl.addEventListener(key, function (e) {
							return on[key].call(ocdItem, e);
						});
					})(key);
				}
			}
		};

		if (checkVariableIsNullOrUndefined(sub) === false) {
			ocdItem = {};

			if (checkVariableIsNullOrUndefined(rootOcd) === true) {
				rootOcd = ocdItem;

				var runOnceCheck = false;
				ocdItem.runOnce = function (fnc) {
					if (runOnceCheck === false) {
						runOnceCheck = true;

						setTimeout(() => {
							fnc.call(ocdItem);
							runOnceCheck = false;
						});
					}
				};
			}

			Object.defineProperty(ocdItem, 'el', {
				get: function () {
					return queryResultItemEl;
				}
			});

			declareStd();

			for (let si = 0; si < sub.length; si++) {
				const subItem = sub[si];

				commitSchema(queryResultItemEl, subItem, ocdItem, queues, subOn, rootOcd);
			}
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
								ocdGet = function () {
									return this.el.checked;
								};
								break;
							default:
								ocdGet = function () {
									return this.el.value;
								};
								break;
						}
					}
						break;
					case 'SELECT': {
						ocdGet = function () {
							return this.el.value;
						};
					}
						break;
					default: {
						ocdGet = function () {
							return this.el.innerHTML;
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
								ocdSet = function (value) {
									this.el.checked = value == true;
								};
								break;
							default:
								ocdSet = function (value) {
									this.el.value = value;
								};
								break;
						}
					}
						break;
					case 'SELECT': {
						ocdSet = function (value) {
							this.el.value = value;
						};
					}
						break;
					default: {
						ocdSet = function (value) {
							this.el.innerHTML = value;
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
				},
				get el () {
					return queryResultItemEl;
				}
			};

			declareStd();
		}


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
				if (v[key].__ocd === false) {
					continue;
				}

				o[key] = toJObject(v[key]);
			}
			if (checkVariableIsNullOrUndefined(v.__ocdData) === false) {
				for (let i = 0; i < v.__ocdData.length; i++) {
					o[v.__ocdData[i]] = toJObject(v[v.__ocdData[i]]);
				}
			}

			return o;
		}
	};

	/**
	 * Fill the ocd item by a object value.
	 * @param {any} v 
	 * @param {any} ocdP 
	 */
	function recursiveFill (v, ocdP) {
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
				if (checkVariableIsNullOrUndefined(ocdP.__ocdData) === false && ocdP.__ocdData.indexOf(key) >= 0) {
					ocdP[key] = v[key];
				} else {
					recursiveFill(v[key], ocdP[key]);
				}
			}
		}
	};

	/**
	 * Create a ocd item by schema.
	 * @param {HTMLElement} parentEl 
	 * @param {any} schema 
	 * @param {any} parentOcd 
	 * @param {Array} queues 
	 * @param {any} subOn 
	 * @param {any} rootOcd 
	 */
	function commitSchema (parentEl, schema, parentOcd, queues, subOn, rootOcd) {
		/*
		{
			parentQuery?: <string|array|HTMLElement>,
			query: <string|array|HTMLElement>,
			get?: <function($ocd):any>,
			set?: <function($ocd, value)>,
			data?: {
				prop1: {
					jobject: <bool>,
					default: <any|function([this]$ocd):any>,
					get: <function([this]$ocd, key, currentValue):any>,
					set: <function([this]$ocd, value, key)>
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
				init?: <function([this]$ocd)>,
				remove?: <function([this]$ocd)>,
				eventName1: <function([this]$ocd, e):any>,
				eventName2: ...,
				...
			},
			subOn?: {
				init?: <function([this]$ocd)>,
				remove?: <function([this]$ocd)>,
				eventName1: <function([this]$ocd, e):any>,
				eventName2: ...,
				...
			},
			sub?: [{
				parentQuery?: <string|array|HTMLElement>,
				query: <string|array|HTMLElement>,
				single: <bool>,
				alias: <string>,
				get?: <function([this]$ocd):any>,
				set?: <function([this]$ocd, value)>,
				data?: {
					prop1: {
						jobject: <bool>,
						default: <any|function([this]$ocd):any>,
						get: <function([this]$ocd, key, currentValue):any>,
						set: <function([this]$ocd, value, key)>
					},
					prop2: ...,
					...
				},
				clone?: <function([this]$parentOcd, value):el>,
				on?: {
					init?: <function([this]$ocd)>,
					remove?: <function([this]$ocd)>,
					eventName1: <function([this]$ocd, e):any>,
					eventName2: ...,
					...
				},
				subOn?: {
					init?: <function([this]$ocd)>,
					remove?: <function([this]$ocd)>,
					eventName1: <function([this]$ocd, e):any>,
					eventName2: ...,
					...
				},
				sub?: [{
					parentQuery?: <string|array|HTMLElement>,
					query: <string|array|HTMLElement>,
					single: <bool>,
					alias: <string>,
					get?: <function($ocd):any>,
					set?: <function($ocd, value)>,
					data?: {
						prop1: {
							jobject: <bool>,
							default: <any|function([this]$ocd):any>,
							get: <function([this]$ocd, key, currentValue):any>,
							set: <function([this]$ocd, value, key)>
						},
						prop2: ...,
						...
					},
					clone?: <function([this]$parentOcd, value):el>,
					on?: {
						init?: <function([this]$ocd)>,
						remove?: <function([this]$ocd)>,
						eventName1: <function([this]$ocd, e):any>,
						eventName2: ...,
						...
					},
					subOn?: {
						init?: <function([this]$ocd)>,
						remove?: <function([this]$ocd)>,
						eventName1: <function([this]$ocd, e):any>,
						eventName2: ...,
						...
					},
					sub?: ...
				}, ...]
			}, ...]
		}
		 */
		var alias = schema.alias;
		if (checkVariableIsNullOrUndefined(parentEl) === false) {
			checkVariableIsNullOrUndefined(alias, 'Alias');
		}

		var single = schema.single;
		if (checkVariableIsNullOrUndefined(parentEl) === true) {
			single = true;
		}

		var on = {};
		var subOnCurrent = {};
		if (checkVariableIsNullOrUndefined(subOn) === false) {
			for (var key in subOn) {
				subOnCurrent[key] = subOn[key];
				on[key] = subOn[key];
			}
		}

		if (checkVariableIsNullOrUndefined(schema.subOn) === false) {
			for (var key in schema.subOn) {
				subOnCurrent[key] = schema.subOn[key];
				on[key] = schema.subOn[key];
			}
		}

		if (checkVariableIsNullOrUndefined(schema.on) === false) {
			for (var key in schema.on) {
				on[key] = schema.on[key];
			}
		}

		var sub = schema.sub;
		var query = schema.query;
		checkVariableIsNullOrUndefined(query, 'Query');

		var parentQuery = schema.parentQuery;

		var jobject = schema.jobject;
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
		var oninit = on.init;
		if (checkVariableIsNullOrUndefined(oninit) === true) {
			oninit = function () { };
		}
		var onremove = on.remove;
		if (checkVariableIsNullOrUndefined(onremove) === true) {
			onremove = function () { };
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
		if (checkVariableIsNullOrUndefined(parentEl) === false && checkVariableIsNullOrUndefined(clone) === true && single !== true) {
			var cloneEl = queryParentEl.querySelector(':scope>*[ocd-clone]');
			var cloneElClone = cloneEl.cloneNode(true);
			cloneElClone.removeAttribute('ocd-clone');
			cloneEl.remove();
			clone = function (value) {
				return cloneElClone.cloneNode(true);
			};
		}

		var queryResults = null;
		if (checkVariableIsString(query) === true) {
			if (single === true) {
				queryResults = [(queryParentEl || document).querySelector(':scope ' + query)];
			} else {
				queryResults = (queryParentEl || document).querySelectorAll(':scope ' + query);
			}
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

		if (single === true && queryResults.length > 1) {
			queryResults.length = 1;
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

			var ocdItem = createOcdItem(queryResultItemEl, sub, get, set, data, jobject, parentOcd, queues, on, subOnCurrent, rootOcd, methods);
			Array.prototype.push.call(resultOcd, ocdItem);

			(function (ocdItem) {
				ocdItem.remove = function () {
					removeOcdItemMethod(ocdItem);
				};
	
				queues.push(function () {
					oninit.call(ocdItem);
				});
			})(ocdItem);
		}

		if (checkVariableIsNullOrUndefined(parentEl) === false) {
			var createACloneOcd = function (value) {
				var cloneEl = clone.call(parentOcd);

				var ocdItem = createOcdItem(cloneEl, sub, get, set, data, jobject, parentOcd, queues, on, subOnCurrent, rootOcd, methods);
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

				consumeQueues(queues);

				oninit.call(ocdNewItem.ocd);

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

				onremove.call(ocdItem);
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

				consumeQueues(queues);

				oninit.call(ocdNewItem.ocd);
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

			(function (resultOcdItem) {
				resultOcdItem.set = function (value) {
					recursiveFill(value, resultOcdItem);
				};
			})(resultOcdItem);
		}

		if (checkVariableIsNullOrUndefined(parentEl) === true) {
			if (single === true) {
				resultOcd = resultOcd[0];

				delete resultOcd.remove;
			}

			return resultOcd;
		} else {
			if (single === true) {
				resultOcd = resultOcd[0];

				delete resultOcd.remove;
			}

			var result = parentOcd;
			result[alias] = resultOcd;
			return result;
		}
	}

	/**
	 * Consume queues from array.
	 * @param {*} queues 
	 */
	function consumeQueues (queues) {
		for (let i = 0; i < queues.length; i++) {
			queues[i]();
		}

		queues.length = 0;
	}

	if (window['$d'] === null || window['$d'] === undefined) {
		window['$d'] = {};
	}

	window['$d']['ocd'] = function (schema) {
		var queues = [];

		var $ocd = commitSchema(undefined, schema, undefined, queues);
		consumeQueues(queues);

		return $ocd;
	};
})();