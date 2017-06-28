import Vue from 'vue'
import VueRouter from 'vue-router'
import {List, Detail, Add} from '../components'

Vue.use(VueRouter);

let routes = [
    {path: '/list', component: List},
    {path: '/detail/:id', name: 'detail', component: Detail},
    {path: '/add', component: Add},
    {path: '*', redirect: '/list'}
];

export default new VueRouter({routes});