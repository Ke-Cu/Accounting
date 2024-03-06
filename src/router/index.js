// src/router/index.js

import Vue from "vue"
import VueRouter from "vue-router"

// 导入你的组件
import Home from "@/views/Home.vue"
import User from "@/views/User.vue"

import DailyBill from "@/components/DailyBill"
import MonthBill from "@/components/MonthBill"
import UpdateBill from "@/components/UpdateBill"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        children: [
            {
                path: "daily",
                name: "daily",
                component: DailyBill
            },
            {
                path: "month",
                name: "month",
                component: MonthBill
            },
            {
                path: "update",
                name: "update",
                component: UpdateBill
            },
        ],
    },
    {
        path: "/user",
        name: "user",
        component: User,
    },
]

const router = new VueRouter({
    mode: "history",
    routes,
})

export default router
