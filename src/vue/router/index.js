import { createRouter, createWebHistory } from "vue-router"

import Home from "../views/Home.vue"
import Monitor from "../views/Monitor.vue"
import Xrpl from "../views/Xrpl.vue"
import Test from "../views/Test.vue"

export const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: { layout: "MainLayout" },
    },
    {
        path: "/monitor",
        name: "Monitor",
        component: Monitor,
        meta: { layout: "MainLayout" },
    },
    {
        path: "/xrpl",
        name: "Xrpl",
        component: Xrpl,
        meta: { layout: "MainLayout" },
    },
    {
        path: "/test",
        name: "Test",
        component: Test,
        meta: { layout: "MainLayout" },
    },
]

const history = createWebHistory()

const router = createRouter({
    history,
    routes,
})

export default router
