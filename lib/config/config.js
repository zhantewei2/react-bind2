'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appendCheck = exports.methods = undefined;

var _name = require('./name');

var methods = exports.methods = ['push', 'pop', 'unshift', 'shift', 'splice', 'reverse'];
var appendCheck = exports.appendCheck = function appendCheck(that) {
    if (window[_name.queueName].indexOf(that) === -1) window[_name.queueName].push(that);
};