import { createWebHistory, createRouter } from "vue-router";
import Main from "@/views/Main.vue";
import CreateConfig from "@/views/CreateConfig.vue";

const routes = [
  {
    path: "/",
    name: "Main.vue",
    component: Main,
  },
  {
    path: "/create_config",
    name: "CreateConfig.vue",
    component: CreateConfig,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;