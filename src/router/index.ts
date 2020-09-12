import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

const Login = () => import(/* webpackChunkName: 'login' */ '../views/login.vue');
const Home = () => import(/* webpackChunkName: 'home' */ '../views/home.vue');
const Welcome = () => import(/* webpackChunkName: 'Welcome' */ '../views/welcome.vue');
const Users = () => import(/* webpackChunkName: 'users' */ '../views/users.vue');
const Roles = () => import(/* webpackChunkName: 'roles' */ '../views/roles.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/welcome',
    component: Home,
    children: [
      {
        path: 'welcome',
        name: 'Welcome',
        component: Welcome,
      },
      {
        path: 'users',
        name: 'Users',
        component: Users,
      },
      {
        path: 'roles',
        name: 'Roles',
        component: Roles,
      },
    ]
  },
  {
    path: '',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由守卫
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
