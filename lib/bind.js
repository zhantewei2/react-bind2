'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _defineArray = require('./defineArray.js');

var _config = require('./config/config.js');

exports.default = function (that, bindObj) {

    var defaultOne = function defaultOne(obj, keyName) {
        var value = obj[keyName];
        Object.defineProperty(obj, keyName, {
            get: function get() {
                return value;
            },
            set: function set(val) {
                if (val === value) return;
                value = val;
                traverse(val);
                (0, _config.appendCheck)(that);
            }
        });
    };
    //define arr

    var checkArr = {
        push: function push(value) {
            (0, _config.appendCheck)(that);
            traverse(value);
        },
        pop: function pop(value) {
            (0, _config.appendCheck)(that);
        },
        shift: function shift(value) {
            (0, _config.appendCheck)(that);
        },
        unshift: function unshift(value) {
            (0, _config.appendCheck)(that);
            traverse(value);
        },
        splice: function splice(pos, count, value) {
            if (value) traverse(value);
            (0, _config.appendCheck)(that);
        },
        reverse: function reverse() {
            (0, _config.appendCheck)(that);
        }

    };

    var defaultArr = function defaultArr(arr) {
        arr[_defineArray.arrAppendName] = checkArr;
        arr.forEach(function (arrItem) {
            return traverse(arrItem);
        });
    };

    function traverse(obj) {
        if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') return;
        if (!(obj instanceof Array)) {
            //is react component:
            if (obj.$$typeof) return;

            Object.keys(obj).forEach(function (key) {
                defaultOne(obj, key);
                traverse(obj[key]);
            });
            Object.seal(obj);
        } else {
            defaultArr(obj);
        }
    };

    traverse(bindObj);
    return bindObj;
};