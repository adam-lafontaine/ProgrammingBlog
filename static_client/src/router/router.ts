import { createRouter, createWebHistory, RouteLocationNormalizedLoaded } from 'vue-router'

type Route = RouteLocationNormalizedLoaded;

import Home from '@views/Home.vue'

const About = () => (import("@views/About.vue"));
const Page = () => (import("@views/Page.vue"));
const NotFound = () => (import("@views/NotFound.vue"));



const routes = [
    { 
        path: "/", 
        name: "home", 
        component: Home 
    },
    {
        path: "/home",
        redirect: "/"
    },
    { 
        path: "/about", 
        name: "about", 
        component: About,
        alias: "/aboot"
    },
    {
        path: "/page/:id/:slug",
        name: "page",
        component: Page,
        props: (r: Route) => ({ page_id: r.params.id, slug: r.params.slug }),
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