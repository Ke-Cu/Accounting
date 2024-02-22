// src/router/index.js

import Vue from 'vue';
import VueRouter from 'vue-router';

// 导入你的组件
import Home from '@/views/Home.vue';
import User from '@/views/User.vue';


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/user',
        name: 'user',
        component: User
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
