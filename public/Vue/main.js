import Vue from 'vue';
import App from './App.vue';

const vue = new Vue({
    el: '#chat',
    render: h => h(App),
    data: {msg: [], other: {db: ''}}
});

const socket = io('devlix.info');
socket.on('event', msg => {
    vue.msg.push(msg.data);

    if (msg.event == 'updateDatabase') {
        vue.$set(vue.other, 'db', JSON.stringify(msg.data, null, '\t'));
    }
});