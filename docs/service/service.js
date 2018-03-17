import {hostname} from '../config/name';
import dataHandle from './dataHandle';

class Service{
    constructor() {
        this.service={};
        this.sourceData={};
        this.hostMain = {
            service:this.service,
            inject:this.inject,
            sourceData:this.sourceData
        };
        window[hostname] = this.hostMain;
    }
    inject(needService){

    }
    provider(params){
        for(let i in params){
            if(this.service[i]){
               return  console.error(i+',exists!');
            }
            if(typeof params[i] !=='object'){
                return console.error('service'+i+',must be Object');
            }
            this.service[i]=new dataHandle(params[i]);
            this.sourceData[i]=params[i];
        }
    };

}
export default Service;