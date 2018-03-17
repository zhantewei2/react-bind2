export const arrAppendName='$ztwfn';


const patchWrite=(originObj,methodName,appendFn)=>{
    const originFn=originObj[methodName];
    originObj[methodName]=function(...args){
        appendFn.apply(this,args);
       return originFn.apply(this,args);
    }
};

const methods=['push','pop','unshift','shift','splice','reverse'];

methods.forEach(item=>{
   patchWrite(Array.prototype,item,function(...args){
       if(!this[arrAppendName])return;
       const fn=this[arrAppendName][item];
       fn&&fn.apply(this,args);
   })
});

