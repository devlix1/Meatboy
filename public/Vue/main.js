import Vue from 'vue';

import Messages from './Modules/Messages.vue';

const vue = new Vue({
    el: '#h__payload',
    render: h => h(Messages),
    data: {msg: []}
});

const socket = io('devlix.info');
socket.on('event', msg => {
    if (msg.event == 'onMessage')
        vue.msg.push(msg.data);

    /*if (msg.event == 'updateDatabase') {
        vue.$set(vue.other, 'db', JSON.stringify(msg.data, null, '\t'));
    }*/
});