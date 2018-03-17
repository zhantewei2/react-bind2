import {queueName} from  './config/name.js';

import './defineArray';
export default function (bindFn) {
    window[queueName] = [];
    window._zInterval = setInterval(() => {
        if (window[queueName].length) {
            window[queueName].forEach(sourceComponent => {
                try{
                    sourceComponent.forceUpdate()
                }catch(e){}
            });
            window[queueName] = [];
        }
    }, 1);
}
