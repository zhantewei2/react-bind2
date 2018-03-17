import {arrAppendName} from './defineArray';
import {appendCheck} from './config/config';




export default (that,bindObj)=>{

    const defaultOne=(obj,keyName)=>{
        let value=obj[keyName];
        Object.defineProperty(obj,keyName,{
            get:()=>{
                return value;
            },
            set:(val)=>{
                if(val===value)return;
                value=val;
                traverse(val);
                appendCheck(that);
            }
        })
    };
    //define arr

    const checkArr={
        push:function(value){
            appendCheck(that);
            traverse(value);
        },
        pop:function(value){
            appendCheck(that);
        },
        shift:function(value){appendCheck(that)},
        unshift:function(value){
            appendCheck(that);
            traverse(value);
        },
        splice:function(pos,count,value){
            if(value)traverse(value);
            appendCheck(that);
        },
        reverse:function(){
            appendCheck(that);
        }


    };

    const defaultArr=(arr)=>{
        arr[arrAppendName]=checkArr;
        arr.forEach(arrItem=>traverse(arrItem));
    };

    function traverse(obj){
        if(typeof obj !== 'object')return;
        if(!(obj instanceof Array)){
            for(let key in obj){
                defaultOne(obj,key);
                traverse(obj[key]);
            }
            Object.seal(obj);
        }else{
            defaultArr(obj);
        }
    };

    traverse(bindObj);
    return bindObj;

}