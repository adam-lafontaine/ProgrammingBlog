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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },

  {
    path: '/posts',
    name: 'Posts',
    component: () => import("../views/Posts.vue")
  },

  {
    path: '/posts/:title_kebab',
    name: 'Posts',
    component: () => import("../views/Posts.vue")
  },






  {
    path: '/test',
    name: 'Test',
    component: () => import("../views/Test.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router