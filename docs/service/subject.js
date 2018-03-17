class Subject{
    constructor(){
        let index=0;
        const store=[];
         this.next=v=>{
             store.forEach(i=>i.fn(v));
         };
         this.subscribe=cb=>{
             let localIndex=++index;
             store.push({
                 fn:cb,
                 index:localIndex
             });
             return {
                 unsubscribe:()=> {
                     const pos = store.findIndex(i => i.index === localIndex);
                     if (pos !== undefined) store.splice(pos, 1);
                    }
             }
         }
    }
}

export default Subject;