"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Subject = function Subject() {
    _classCallCheck(this, Subject);

    var index = 0;
    var store = [];
    this.next = function (v) {
        store.forEach(function (i) {
            return i.fn(v);
        });
    };
    this.subscribe = function (cb) {
        var localIndex = ++index;
        store.push({
            fn: cb,
            index: localIndex
        });
        return {
            unsubscribe: function unsubscribe() {
                var pos = store.findIndex(function (i) {
                    return i.index === localIndex;
                });
                if (pos !== undefined) store.splice(pos, 1);
            }
        };
    };
};

exports.default = Subject;