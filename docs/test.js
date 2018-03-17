"use strict";

var patchWrite = function patchWrite(originObj, methodName, appendFn) {
		var originFn = originObj[methodName];
		originObj[methodName] = function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
				}

				appendFn.apply(undefined, [this].concat(args));
				originFn.apply(originObj, args);
		};
};
var origin = Array.prototype.push;
Array.prototype.push = function (a) {
		console.log(this);
		origin.apply(this, arguments);
};
var arr = [1, 2, 3];
arr.push(1);