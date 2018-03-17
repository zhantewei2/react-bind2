'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (bindFn) {
    window[_name.queueName] = [];
    window._zInterval = setInterval(function () {
        if (window[_name.queueName].length) {
            window[_name.queueName].forEach(function (sourceComponent) {
                try {
                    sourceComponent.forceUpdate();
                } catch (e) {}
            });
            window[_name.queueName] = [];
        }
    }, 1);
};

var _name = require('./config/name.js');

require('./defineArray');