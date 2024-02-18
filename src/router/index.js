// src/router/index.js

import Vue from 'vue';
import VueRouter from 'vue-router';

// 导入你的组件
import Home from '@/views/Home.vue';
// import About from '@/views/About.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     component: About
    // }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
