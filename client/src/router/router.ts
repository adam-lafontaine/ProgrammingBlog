import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const VIEWS_ROOT = "../views";
const TEST_VIEW = `${VIEWS_ROOT}/Test.vue`;

const ABOUT_VIEW = `${VIEWS_ROOT}/About.vue`;
const POSTS_VIEW = `${VIEWS_ROOT}/Posts.vue`;


const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },  

  {
    path: '/posts',
    name: 'Posts',
    component: () => import("../views/PostList.vue")
  },

  {
    path: '/posts/:title_kebab',
    name: 'Posts',
    component: () => import("../views/Post.vue")
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router