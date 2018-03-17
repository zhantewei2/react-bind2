'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _name = require('../config/name');

var _config = require('../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inject = function Inject(Com, params) {
    var InjectComponent = function (_Component) {
        _inherits(InjectComponent, _Component);

        function InjectComponent(props) {
            _classCallCheck(this, InjectComponent);

            var _this = _possibleConstructorReturn(this, (InjectComponent.__proto__ || Object.getPrototypeOf(InjectComponent)).call(this));

            _this.serviceSub = [];
            _this.injectProps = {};
            params.forEach(function (name) {
                var service = window[_name.hostname]['service'][name];
                if (service) {
                    _this.serviceSub.push(service.mainSub.subscribe(function () {
                        (0, _config.appendCheck)(_this);
                    }));
                }
                _this.injectProps[name] = window[_name.hostname]['sourceData'][name];
            });
            return _this;
        }

        _createClass(InjectComponent, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(Com, Object.assign({}, this.props, { inject: this.injectProps }));
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.serviceSub.forEach(function (sub) {
                    return sub.unsubscribe();
                });
            }
        }]);

        return InjectComponent;
    }(_react.Component);

    return InjectComponent;
};
exports.default = Inject;