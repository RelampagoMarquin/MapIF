import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Start from "../views/Start.vue";
import CreateEvent from "../views/CreateEvent.vue";
import CreateActivity from "../components/CreateActivity.vue";
import ScheduleActivity from "../views/ScheduleActivity.vue";
import Home from "../views/Home.vue";
import UserProfile from "../views/UserProfile.vue";
import CreateLocal from "../views/CreateLocal.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import { useAuthStore } from "../stores/authStore";
import MapActivity from "../views/MapActivity.vue";
import GroupList from "../views/GroupList.vue";
import CreateGroup from "../views/CreateGroup.vue";
import GroupPage from "../views/GroupPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      auth:true
    },
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
      auth: true,
    },
  },
  {
    path: "/create-activity/:idpoligono",
    name: "create-activity",
    component: CreateActivity,
    meta: {
      auth: true,
    },
  },
  {
    path: "/schedule-activity/:idevento",
    name: "schedule-activity",
    component: ScheduleActivity,
    meta: {
      auth:true
    },
  },
  {
    path: "/userprofile/:id",
    name: "userprofile",
    component: UserProfile,
    meta: {
      auth: true,
    },
    props: true,
  },
  {
    path: "/create-local/:idevent",
    name: "create-local",
    component: CreateLocal,
    meta: {
      auth: true,
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
    meta: {
      auth:true
    },
  },
  {
    path: "/group-list",
    name: "group-list",
    component: GroupList,
  },
  {
    path: "/create-group",
    name: "create-group",
    component: CreateGroup,
  },
  {
    path: "/group/:id",
    name: "group",
    component: GroupPage,
  },
  {
    path: "/map-activity/:poligonoid",
    name: "map-activity",
    component: MapActivity,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta?.auth) {
    const auth = localStorage.getItem("token");
    if (auth) {
      if (authStore.isExpired()) {
        next("login");
      } else {
        next();
      }
    } else {
      next("login");
    }
  } else {
    next();
  }
});

export default router;
