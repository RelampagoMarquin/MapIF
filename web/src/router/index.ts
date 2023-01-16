import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Start from "../views/Start.vue";
import CreateEvent from "../views/CreateEvent.vue";
import CreateActivity from "../views/CreateActivity.vue";
import ScheduleActivity from "../views/ScheduleActivity.vue";
import Home from "../views/Home.vue";
import UserProfile from "../views/UserProfile.vue";
import CreateLocal from "../views/CreateLocal.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import { useAuthStore } from "../stores/authStore";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/start",
    name: "start",
    component: Start,
  },
  {
    path: "/create-event",
    name: "create-event",
    component: CreateEvent,
    meta: {
      auth:true
    },
  },
  {
    path: "/create-activity",
    name: "create-activity",
    component: CreateActivity,
    meta: {
      auth:true
    },
  },
  {
    path: "/schedule-activity",
    name: "schedule-activity",
    component: ScheduleActivity,
  },
  {
    path: "/userprofile/:id",
    name: "userprofile",
    component: UserProfile,
    meta: {
      auth:true
    },
    props: true,
  },
  {
    path: "/create-local",
    name: "create-local",
    component: CreateLocal,
    meta: {
      auth:true
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/event-list",
    name: "event-list",
    component: EventList,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta?.auth){
    const auth = localStorage.getItem('token')
    if (auth){
      if (authStore.isExpired()){
        next('login');
      }else{
        next();
      }
    } else {
      next('login');
    }
  } else {
    next();
  }
})

export default router;
