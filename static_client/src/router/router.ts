import { createRouter, createWebHistory, RouteLocationNormalizedLoaded } from 'vue-router'

type Route = RouteLocationNormalizedLoaded;

import Home from '@views/Home.vue'


const PageNotFound = () => (import("@views/PageNotFound.vue"));
const PostNotFound = () => (import("@views/PostNotFound.vue"));
const PostList = () => (import("@views/PostList.vue"));
const Post = () => (import("@views/Post.vue"));


export const routes = {
    home: { name: "home" },
    post_list: { name: "posts"},
    post: { name: "post" },
    no_page: { name: "no_page" },
    no_post: { name: "no_post" }
};



const route_definitions = [

    { 
        path: "/", 
        name: routes.home.name, 
        component: Home 
    },

    { 
        path: "/posts", 
        name: routes.post_list.name, 
        component: PostList
    },

    {
        path: '/posts/:title_kebab',
        name: routes.post.name,
        component: Post,
        props: (r: Route) => ({ title_kebab: r.params.title_kebab }),
    },

    {
        path: "/home",
        redirect: "/"
    },

    {
        path: "/post-not-found",
        name: routes.no_post.name,
        component: PostNotFound
    },

    {
        path: "/:pathMatch(.*)*",
        name: routes.no_page.name,
        component: PageNotFound
    }
];


const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: "router-link-active active",
    
    routes: route_definitions
});


export default router;