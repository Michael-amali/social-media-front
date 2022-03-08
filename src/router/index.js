import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ProfilePage from "../views/ProfilePage.vue";
import Messenger from "../views/Messenger.vue";
// import {  getAuthToken, isCurrentUser } from "../services/auth";
import ForgotPassword from "../views/ForgotPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import Settings from "../views/Settings.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/profile/:username/:id",
    name: "ProfilePage",
    component: ProfilePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/messenger",
    name: "Messenger",
    component: Messenger,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/forgot_password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/reset_password/:token",
    name: "ResetPassword",
    component: ResetPassword,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.authToken) {
    next({
      name: "Login",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
