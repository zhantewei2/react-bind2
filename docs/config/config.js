import {queueName} from './name';
export const  methods=['push','pop','unshift','shift','splice','reverse'];
export const appendCheck=that=>{
    if(window[queueName].indexOf(that)===-1)window[queueName].push(that);
}