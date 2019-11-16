/**
 * dmuka3.JS.Simple.OCD.Plugin.DateTime
 * {
 * 	day(default: true): <Boolean>,
 * 	month(default: true): <Boolean>,
 * 	year(default: true): <Boolean>,
 * 	hour(default: false): <Boolean>,
 * 	minute(default: false): <Boolean>,
 * 	second(default: false): <Boolean>,
 * 	millisecond(default: false): <Boolean>,
 * 	order(default: ['day', 'month', 'year', 'hour', 'minute', 'second', 'millisecond']): <Array(String)>,
 * 	label: {
 * 		day(default: 'Day : '): <String>,
 * 		month(default: 'Month : '): <String>,
 * 		year(default: 'Year : '): <String>,
 * 		hour(default: 'Hour : '): <String>,
 * 		minute(default: 'Minute : '): <String>,
 * 		second(default: 'Second : '): <String>,
 * 		millisecond(default: 'Ms : '): <String>
 * 	}
 * }
 */
$d.ocd.plugins.$add('datetime', function ($options) {
	//#region Validations
	if (this.__isNullOrUndefined($options) === true) {
		throw '"$options" must be filled!';
	}

	if (this.__isObject($options) === false) {
		throw '"$options" must be Object!';
	}

	if (this.__isNullOrUndefined($options.day) === false && this.__isBool($options.day) === false) {
		throw '"$options.day" must be Boolean!';
	}

	if (this.__isNullOrUndefined($options.month) === false && this.__isBool($options.month) === false) {
		throw '"$options.month" must be Boolean!';
	}

	if (this.__isNullOrUndefined($options.year) === false && this.__isBool($options.year) === false) {
		throw '"$options.year" must be Boolean!';
	}

	if (this.__isNullOrUndefined($options.hour) === false && this.__isBool($options.hour) === false) {
		throw '"$options.hour" must be Boolean!';
	}

	if (this.__isNullOrUndefined($options.minute) === false && this.__isBool($options.minute) === false) {
		throw '"$options.minute" must be Boolean!';
	}

	if (this.__isNullOrUndefined($options.second) === false && this.__isBool($options.second) === false) {
		throw '"$options.second" must be Boolean!';
	}

	if (this.__isNullOrUndefined($options.millisecond) === false && this.__isBool($options.millisecond) === false) {
		throw '"$options.millisecond" must be Boolean!';
	}

	if (this.__isNullOrUndefined($options.label) === false && this.__isString($options.label.day) === false) {
		throw '"$options.label.day" must be String!';
	}

	if (this.__isNullOrUndefined($options.label) === false && this.__isString($options.label.month) === false) {
		throw '"$options.label.month" must be String!';
	}

	if (this.__isNullOrUndefined($options.label) === false && this.__isString($options.label.year) === false) {
		throw '"$options.label.year" must be String!';
	}

	if (this.__isNullOrUndefined($options.label) === false && this.__isString($options.label.hour) === false) {
		throw '"$options.label.hour" must be String!';
	}

	if (this.__isNullOrUndefined($options.label) === false && this.__isString($options.label.minute) === false) {
		throw '"$options.label.minute" must be String!';
	}

	if (this.__isNullOrUndefined($options.label) === false && this.__isString($options.label.second) === false) {
		throw '"$options.label.second" must be String!';
	}

	if (this.__isNullOrUndefined($options.label) === false && this.__isString($options.label.millisecond) === false) {
		throw '"$options.label.millisecond" must be String!';
	}

	if (this.__isNullOrUndefined($options.order) === false && this.__isArray($options.order) === false) {
		throw '"$options.order" must be Array!';
	}

	if (this.__isNullOrUndefined($options.order) === false && $options.order.indexOf('day') < 0) {
		throw '"$options.order" must contain "day"!';
	}

	if (this.__isNullOrUndefined($options.order) === false && $options.order.indexOf('month') < 0) {
		throw '"$options.order" must contain "month"!';
	}

	if (this.__isNullOrUndefined($options.order) === false && $options.order.indexOf('year') < 0) {
		throw '"$options.order" must contain "year"!';
	}

	if (this.__isNullOrUndefined($options.order) === false && $options.order.indexOf('hour') < 0) {
		throw '"$options.order" must contain "hour"!';
	}

	if (this.__isNullOrUndefined($options.order) === false && $options.order.indexOf('minute') < 0) {
		throw '"$options.order" must contain "minute"!';
	}

	if (this.__isNullOrUndefined($options.order) === false && $options.order.indexOf('second') < 0) {
		throw '"$options.order" must contain "second"!';
	}

	if (this.__isNullOrUndefined($options.order) === false && $options.order.indexOf('millisecond') < 0) {
		throw '"$options.order" must contain "millisecond"!';
	}
	//#endregion

	var mixin = {
		get: function () {
			return this.__hide.datetime.getDate();
		},
		set: function (value) {
			if (this.__isString(value) === true) {
				value = new Date(value);
			}
			this.__hide.datetime.setDate(value);
		},
		methods: {
		},
		on: {
			$init: function () {
				var self = this;
				var label = {
					day: 'Day : ',
					month: 'Month : ',
					year: 'Year : ',
					hour: 'Hour : ',
					minute: 'Minute : ',
					second: 'Second : ',
					millisecond: 'Ms : '
				};
				if (self.__isNullOrUndefined($options.label) === false) {
					label = $options.label;
				}

				var order = ['day', 'month', 'year', 'hour', 'minute', 'second', 'millisecond'];
				if (self.__isNullOrUndefined($options.order) === false) {
					order = $options.order;
				}

				var defaultValue = self.$el.$.text().trim();
				self.$el.$.html('');

				var topParent = $d.q.create('div');
				topParent.$.addClass('dmuka3-datetime');
				self.$el.$.append(topParent);

				// #region Day
				var dayParent = $d.q.create('span');
				dayParent.$.addClass('dmuka3-datetime-day');
				if ($options.day === false) {
					dayParent.$.css('display', 'none');
				}

				var dayLabel = $d.q.create('label');
				dayLabel.$.text(label.day);
				dayParent.$.append(dayLabel);

				var dayCb = $d.q.create('select');
				dayCb.$.css('margin-right', '5px');
				var dayCbOptions = [];
				for (var i = 1; i <= 31; i++) {
					var dayCbOption = $d.q.create('option');
					dayCbOption.$.attr('value', i.toString());
					dayCbOption.$.text(i.toString().padStart(2, '0'));
					dayCb.$.append(dayCbOption);
					dayCbOptions.push(dayCbOption);
				}
				dayParent.$.append(dayCb);
				// #endregion

				// #region Month
				var monthParent = $d.q.create('span');
				monthParent.$.addClass('dmuka3-datetime-month');
				if ($options.month === false) {
					monthParent.$.css('display', 'none');
				}

				var monthLabel = $d.q.create('label');
				monthLabel.$.text(label.month);
				monthParent.$.append(monthLabel);

				var monthCb = $d.q.create('select');
				monthCb.$.css('margin-right', '5px');
				var monthCbOptions = [];
				for (var i = 1; i <= 12; i++) {
					var monthCbOption = $d.q.create('option');
					monthCbOption.$.attr('value', i.toString());
					monthCbOption.$.text(i.toString().padStart(2, '0'));
					monthCb.$.append(monthCbOption);
					monthCbOptions.push(monthCbOption);
				}
				monthParent.$.append(monthCb);
				// #endregion

				// #region Year
				var yearParent = $d.q.create('span');
				yearParent.$.addClass('dmuka3-datetime-year');
				if ($options.year === false) {
					yearParent.$.css('display', 'none');
				}

				var yearLabel = $d.q.create('label');
				yearLabel.$.text(label.year);
				yearParent.$.append(yearLabel);

				var yearCb = $d.q.create('select');
				yearCb.$.css('margin-right', '5px');
				var yearCbOptions = [];
				for (var i = 1800; i <= 2100; i++) {
					var yearCbOption = $d.q.create('option');
					yearCbOption.$.attr('value', i.toString());
					yearCbOption.$.text(i.toString());
					yearCb.$.append(yearCbOption);
					yearCbOptions.push(yearCbOption);
				}
				yearParent.$.append(yearCb);
				// #endregion

				// #region Hour
				var hourParent = $d.q.create('span');
				hourParent.$.addClass('dmuka3-datetime-hour');
				if ($options.hour !== true) {
					hourParent.$.css('display', 'none');
				}

				var hourLabel = $d.q.create('label');
				hourLabel.$.text(label.hour);
				hourParent.$.append(hourLabel);

				var hourCb = $d.q.create('select');
				hourCb.$.css('margin-right', '5px');
				var hourCbOptions = [];
				for (var i = 0; i <= 23; i++) {
					var hourCbOption = $d.q.create('option');
					hourCbOption.$.attr('value', i.toString());
					hourCbOption.$.text(i.toString().padStart(2, '0'));
					hourCb.$.append(hourCbOption);
					hourCbOptions.push(hourCbOption);
				}
				hourParent.$.append(hourCb);
				// #endregion

				// #region Minute
				var minuteParent = $d.q.create('span');
				minuteParent.$.addClass('dmuka3-datetime-minute');
				if ($options.minute !== true) {
					minuteParent.$.css('display', 'none');
				}

				var minuteLabel = $d.q.create('label');
				minuteLabel.$.text(label.minute);
				minuteParent.$.append(minuteLabel);

				var minuteCb = $d.q.create('select');
				minuteCb.$.css('margin-right', '5px');
				var minuteCbOptions = [];
				for (var i = 0; i <= 59; i++) {
					var minuteCbOption = $d.q.create('option');
					minuteCbOption.$.attr('value', i.toString());
					minuteCbOption.$.text(i.toString().padStart(2, '0'));
					minuteCb.$.append(minuteCbOption);
					minuteCbOptions.push(minuteCbOption);
				}
				minuteParent.$.append(minuteCb);
				// #endregion

				// #region Second
				var secondParent = $d.q.create('span');
				secondParent.$.addClass('dmuka3-datetime-second');
				if ($options.second !== true) {
					secondParent.$.css('display', 'none');
				}

				var secondLabel = $d.q.create('label');
				secondLabel.$.text(label.second);
				secondParent.$.append(secondLabel);

				var secondCb = $d.q.create('select');
				secondCb.$.css('margin-right', '5px');
				var secondCbOptions = [];
				for (var i = 0; i <= 59; i++) {
					var secondCbOption = $d.q.create('option');
					secondCbOption.$.attr('value', i.toString());
					secondCbOption.$.text(i.toString().padStart(2, '0'));
					secondCb.$.append(secondCbOption);
					secondCbOptions.push(secondCbOption);
				}
				secondParent.$.append(secondCb);
				// #endregion

				// #region Millisecond
				var millisecondParent = $d.q.create('span');
				millisecondParent.$.addClass('dmuka3-datetime-millisecond');
				if ($options.millisecond !== true) {
					millisecondParent.$.css('display', 'none');
				}

				var millisecondLabel = $d.q.create('label');
				millisecondLabel.$.text(label.millisecond);
				millisecondParent.$.append(millisecondLabel);

				var millisecondCb = $d.q.create('select');
				millisecondCb.$.css('margin-right', '5px');
				var millisecondCbOptions = [];
				for (var i = 0; i <= 999; i++) {
					var millisecondCbOption = $d.q.create('option');
					millisecondCbOption.$.attr('value', i.toString());
					millisecondCbOption.$.text(i.toString().padStart(2, '0'));
					millisecondCb.$.append(millisecondCbOption);
					millisecondCbOptions.push(millisecondCbOption);
				}
				millisecondParent.$.append(millisecondCb);
				// #endregion

				var addedOrder = {};
				for (var i = 0; i < order.length; i++) {
					var orderItem = order[i].toString().toLowerCase();
					addedOrder[orderItem] = true;
					switch (orderItem) {
						case 'day':
							topParent.$.append(dayParent);
							break;
						case 'month':
							topParent.$.append(monthParent);
							break;
						case 'year':
							topParent.$.append(yearParent);
							break;
						case 'hour':
							topParent.$.append(hourParent);
							break;
						case 'minute':
							topParent.$.append(minuteParent);
							break;
						case 'second':
							topParent.$.append(secondParent);
							break;
						case 'millisecond':
							topParent.$.append(millisecondParent);
							break;
						default:
							break;
					}
				}

				if (addedOrder['day'] !== true) {
					topParent.$.append(dayParent);
				}
				if (addedOrder['month'] !== true) {
					topParent.$.append(monthParent);
				}
				if (addedOrder['year'] !== true) {
					topParent.$.append(yearParent);
				}
				if (addedOrder['hour'] !== true) {
					topParent.$.append(hourParent);
				}
				if (addedOrder['minute'] !== true) {
					topParent.$.append(minuteParent);
				}
				if (addedOrder['second'] !== true) {
					topParent.$.append(secondParent);
				}
				if (addedOrder['millisecond'] !== true) {
					topParent.$.append(millisecondParent);
				}

				self.__hide.datetime = {
					/**
					 * Check max day count by be selected month and year.
					 */
					checkMaxDay: function () {
						var month = parseInt(monthCb.value);
						var year = parseInt(yearCb.value);

						var dayCount = new Date(year, month, 0).getDate();

						for (var i = 27; i < dayCbOptions.length; i++) {
							var dayCbOption = dayCbOptions[i];
							if (i + 1 <= dayCount) {
								dayCbOption.$.removeAttr('disabled');
							} else {
								dayCbOption.$.attr('disabled', '');
							}
						}

						var day = parseInt(dayCb.value);
						if (day > dayCount) {
							dayCb.value = dayCount;
						}
					},
					/**
					 * Set date value to selects.
					 * @param {Date} date 
					 */
					setDate: function (date) {
						dayCb.value = date.getDate();
						monthCb.value = date.getMonth() + 1;
						yearCb.value = date.getFullYear();
						hourCb.value = date.getHours();
						minuteCb.value = date.getMinutes();
						secondCb.value = date.getSeconds();
						millisecondCb.value = date.getMilliseconds();

						self.__hide.datetime.checkMaxDay();
					},
					/**
					 * Get value as date.
					 */
					getDate: function () {
						return new Date(yearCb.value + '-' + monthCb.value + '-' + dayCb.value + ' ' + hourCb.value + ':' + minuteCb.value + ':' + secondCb.value + '.' + millisecondCb.value);
					},
					/**
					 * datetime's elements.
					 */
					elements: {
						day: {
							parent: dayParent,
							label: dayLabel,
							cb: dayCb,
							options: dayCbOptions
						},
						month: {
							parent: monthParent,
							label: monthLabel,
							cb: monthCb,
							options: monthCbOptions
						},
						year: {
							parent: yearParent,
							label: yearLabel,
							cb: yearCb,
							options: yearCbOptions
						},
						hour: {
							parent: hourParent,
							label: hourLabel,
							cb: hourCb,
							options: hourCbOptions
						},
						minute: {
							parent: minuteParent,
							label: minuteLabel,
							cb: minuteCb,
							options: minuteCbOptions
						},
						second: {
							parent: secondParent,
							label: secondLabel,
							cb: secondCb,
							options: secondCbOptions
						},
						millisecond: {
							parent: millisecondParent,
							label: millisecondLabel,
							cb: millisecondCb,
							options: millisecondCbOptions
						}
					}
				};

				if (defaultValue === '') {
					self.__hide.datetime.setDate(new Date());
				} else {
					self.__hide.datetime.setDate(new Date(defaultValue));
				}

				monthCb.$.on('change', function (e) {
					self.__hide.datetime.checkMaxDay();
				});

				yearCb.$.on('change', function (e) {
					self.__hide.datetime.checkMaxDay();
				});
			}
		}
	};

	return mixin;
});