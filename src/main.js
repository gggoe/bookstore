import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import router from './router/router'

new Vue({
    el: '#app',
    render: h => h(App),
    router
});
