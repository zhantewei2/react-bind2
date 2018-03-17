'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _subject = require('./subject.js');

var _subject2 = _interopRequireDefault(_subject);

var _name = require('../config/name.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    listener data change;
 */

var dataHandle = function dataHandle(originData) {
    var _this = this;

    _classCallCheck(this, dataHandle);

    var mainSub = new _subject2.default();
    var that = this;
    this.mainSub = mainSub;
    var checkArr = {
        push: function push(value) {
            mainSub.next();
            that.checkData(value);
        },
        pop: function pop(value) {
            mainSub.next();
        },
        shift: function shift(value) {
            mainSub.next();
        },
        unshift: function unshift(value) {
            that.checkData(value);
            mainSub.next();
        },
        splice: function splice(pos, count, value) {
            this.checkData(value);
            mainSub.next();
        },
        reverse: function reverse() {
            mainSub.next();
        }
    };

    this.defineProperty = function (data, key) {
        var value = data[key];
        _this.checkData(value);
        Object.defineProperty(data, key, {
            set: function set(v) {
                mainSub.next(v);
                that.checkData(v);
                value = v;
            },
            get: function get() {
                return value;
            }
        });
    };

    this.defineObj = function (data) {
        Object.keys(data).forEach(function (key) {
            return _this.defineProperty(data, key);
        });
    };

    this.checkData = function (data) {
        if (data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
            if (data instanceof Array) {
                data[_name.arrAppendName] = checkArr;
                data.forEach(function (v) {
                    return _this.checkData(v);
                });
            } else {
                //is react component:
                if (data.$$typeof) return;
                _this.defineObj(data);
            }
        }
    };
    this.checkData(originData);
};

exports.default = dataHandle;

// class dataHandle{
//     constructor(data){
//         this.index=0;
//         this.subSpace=[];
//         const that=this;
//         const removeSubSpace=index=>{
//             this.subSpace.splice(this.subSpace.findIndex(i=>i.index===index),1);
//         };
//         const removeLeaveSpace=(data)=>data[containerName].forEach(subIndex=>this.subSpace.splice(this.subSpace.findIndex(i=>i.index===index),1));
//
//         const removeAllSubSpace=data=>{
//             if(typeof data === 'object'){
//                 //移除本身
//                 removeLeaveSpace(data);
//                 //递归删除
//                 Object.keys(data).forEach(key=>removeAllSubSpace(data[key]))
//             }
//         }
//
//         this.defineArray=(arrData)=>{
//
//         };
//
//         this.CheckValue=(checkData)=>{
//           if(typeof checkData ==='object'){
//               if(checkData instanceof Array){
//                   this.defineArray(checkData);
//               }else{
//                   Object.keys(checkData).forEach(key=>this.defineListen(checkData,key));
//
//               }
//           }
//         };
//
//         this.defineListen=(data,key)=>{
//             let
//                 value=data[key],
//                 selfSub=new Subject(),
//                 index=this.index++;
//
//             this.subSpace.push({
//                 sub:selfSub,
//                 index:index
//             });
//             data[containerName].push(index);
//
//             Object.defineProperty(data,key,{
//                 get:()=>value,
//                 set:(v)=>{
//                     if(v===value)return;
//                     selfSub.next(v);
//                     if(typeof v==='object'){
//                         if(typeof value ==='object'){
//                             //移除subspace:
//                             removeAllSubSpace(value);
//                         }
//                         that.checkValue(v);
//                     }
//                     value=v;
//                 }
//             })
//         }
//
//     }
//
//     removeListen(){
//
//     }
//
//     handle(data){
//
//     }
// }