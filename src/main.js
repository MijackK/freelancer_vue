import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Echo from 'laravel-echo';
import ajaxR from './ajax'
import Toaster from '@meforma/vue-toaster';

window.Pusher = require('pusher-js');
window.Echo = new Echo({
   broadcaster: 'pusher',
   key: process.env.VUE_APP_WEBSOCKETS_KEY,
   wsHost:process.env.VUE_APP_WEBSOCKETS_SERVER,
   wsPort:6001,
   forceTLS: false,
   disableStats:true,
   authorizer: (channel, options) => {
    return {
        authorize: (socketId, callback) => {
            ajaxR.post('/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name
            })
            .then(response => {
                callback(false, response.data);
            })
            .catch(error => {
                callback(true, error);
            });
        }
    };
},
});


createApp(App).use(Toaster).use(router).mount('#app')
