import { createRouter, createWebHistory, RouteLocationNormalizedLoaded } from 'vue-router'

type Route = RouteLocationNormalizedLoaded;

import Home from '@views/Home.vue'


const NotFound = () => (import("@views/NotFound.vue"));
const PostList = () => (import("@views/PostList.vue"));
const Post = () => (import("@views/Post.vue"));



const routes = [

    { 
        path: "/", 
        name: "home", 
        component: Home 
    },

    { 
        path: "/posts", 
        name: "posts", 
        component: PostList
    },

    {
        path: '/posts/:title_kebab',
        name: 'post',
        component: Post,
        props: (r: Route) => ({ title_kebab: r.params.title_kebab }),
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