import { createRouter, createWebHistory, /*RouteLocationNormalizedLoaded*/ } from 'vue-router'

/*type Route = RouteLocationNormalizedLoaded;*/

import Home from '@views/Home.vue'


const NotFound = () => (import("@views/NotFound.vue"));



const routes = [

    { 
        path: "/", 
        name: "home", 
        component: Home 
    },
    { 
        path: "/posts", 
        name: "posts", 
        component: NotFound
    },

    {
        path: "/home",
        redirect: "/"
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: NotFound
    }
];


const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: "router-link-active active",
    
    routes: routes
});


export default router;