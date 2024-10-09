import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import MainRoutes from './MainRoutes'
import AuthRoutes from "./AuthRoutes";

export const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/authentication/Error.vue')
        },
        MainRoutes,
        AuthRoutes
    ]
})