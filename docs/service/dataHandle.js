import Subject from './subject.js';
import {arrAppendName,containerName} from '../config/name.js';

/*
    listener data change;
 */


class dataHandle{
    constructor(originData){
        const mainSub=new Subject();
        const that=this;
        this.mainSub=mainSub;
        const checkArr={
            push:function(value){
                mainSub.next();
                that.checkData(value)
            },
            pop:function(value){
                mainSub.next();
            },
            shift:function(value){mainSub.next()},
            unshift:function(value){
                that.checkData(value);
                mainSub.next();
            },
            splice:function(pos,count,value){
                this.checkData(value);
                mainSub.next();
            },
            reverse:function(){
                mainSub.next();
            }
        };

        this.defineProperty=(data,key)=>{
            let value=data[key];
            this.checkData(value);
            Object.defineProperty(data,key,{
                set:v=>{
                    mainSub.next(v);
                    that.checkData(v);
                    value=v;
                },
                get:()=>value
            })
        };

        this.defineObj=data=>{
            Object.keys(data).forEach(key=>this.defineProperty(data,key));
        };

        this.checkData=(data)=>{
            if(typeof data === 'object'){
                if(data instanceof Array){
                    data[arrAppendName]=checkArr;
                    data.forEach(v=>this.checkData(v));
                }else{
                    this.defineObj(data);
                }
            }
        };
        this.checkData(originData);
    }
}
export default dataHandle;




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