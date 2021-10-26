import { createWebHistory, createRouter } from "vue-router";
import Main from "@/views/Main.vue";
import CreateConfig from "@/views/CreateConfig.vue";
import ListContainer from "@/views/ListContainer.vue";
import AddContainer from "@/views/AddContainer.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/create_config",
    name: "CreateConfig",
    component: CreateConfig,
  },
  {
    path: "/list_container",
    name: "ListContainer",
    component: ListContainer,
  },
  {
    path: "/add_container/:name",
    name: "AddContainer",
    component: AddContainer,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;