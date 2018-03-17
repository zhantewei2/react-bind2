'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _name = require('../config/name');

var _dataHandle = require('./dataHandle');

var _dataHandle2 = _interopRequireDefault(_dataHandle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Service = function () {
    function Service() {
        _classCallCheck(this, Service);

        this.service = {};
        this.sourceData = {};
        this.hostMain = {
            service: this.service,
            inject: this.inject,
            sourceData: this.sourceData
        };
        window[_name.hostname] = this.hostMain;
    }

    _createClass(Service, [{
        key: 'inject',
        value: function inject(needService) {}
    }, {
        key: 'provider',
        value: function provider(params) {
            for (var i in params) {
                if (this.service[i]) {
                    return console.error(i + ',exists!');
                }
                if (_typeof(params[i]) !== 'object') {
                    return console.error('service' + i + ',must be Object');
                }
                this.service[i] = new _dataHandle2.default(params[i]);
                this.sourceData[i] = params[i];
            }
        }
    }]);

    return Service;
}();

exports.default = Service;