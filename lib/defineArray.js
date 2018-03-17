'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var arrAppendName = exports.arrAppendName = '$ztwfn';

var patchWrite = function patchWrite(originObj, methodName, appendFn) {
    var originFn = originObj[methodName];
    originObj[methodName] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        appendFn.apply(this, args);
        return originFn.apply(this, args);
    };
};

var methods = ['push', 'pop', 'unshift', 'shift', 'splice', 'reverse'];

methods.forEach(function (item) {
    patchWrite(Array.prototype, item, function () {
        if (!this[arrAppendName]) return;
        var fn = this[arrAppendName][item];

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        fn && fn.apply(this, args);
    });
});