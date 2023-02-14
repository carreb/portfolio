import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";


// pages
import Homepage from "./components/AboutPage.vue";
import NotFound from "./components/NotFound.vue";
import BlogPage from "./components/BlogPage.vue";

library.add(faUserSecret, faInstagram, faChalkboardUser, faCaretDown);

const routes = [
  { path: "/", component: Homepage, name: "home" },
  { path: "/blog", component: BlogPage, name: "blog" },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(FloatingVue)
  .mount("#app");
