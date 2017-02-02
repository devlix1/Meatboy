const data = {msg: []};
export default data;

import Vue from 'vue';
import App from './App.vue';

const vue = new Vue({
    el: '#chat',
    render: h => h(App),
    mounted: () => {
        const socket = io('http://localhost');
        socket.on('event', msg => {
            data.msg.push(msg.data)
        });
    }
});