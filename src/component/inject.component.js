import React,{Component} from 'react';
import {hostname} from '../config/name';
import {appendCheck} from '../config/config';

const Inject=(Com,params)=>{

    class InjectComponent extends Component{
        constructor(props){
            super();
            this.serviceSub=[];
            this.injectProps={};
            params.forEach(name=>{
                let service=window[hostname]['service'][name];
                if(service){
                    this.serviceSub.push(
                        service.mainSub.subscribe(()=>{
                            appendCheck(this)
                        })
                    );
                }
                this.injectProps[name]=window[hostname]['sourceData'][name];
            });
        }
        render(){
            return React.createElement(Com,Object.assign({},this.props,{inject:this.injectProps}));
        }
        componentWillUnmount(){
            this.serviceSub.forEach(sub=>sub.unsubscribe());
        }
    }
    return InjectComponent
}
export default Inject;