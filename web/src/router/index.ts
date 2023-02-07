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
import AddUserToGroup from "../views/AddUserToGroup.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      auth: true,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    meta: {
      auth: false,
    },
  },
  {
    path: "/start",
    name: "start",
    component: Start,
    meta: {
      auth: false,
    },
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
      auth: true,
    },
  },
  {
    path: "/userprofile",
    name: "userprofile",
    component: UserProfile,
    meta: {
      auth: true,
    },
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
    meta: {
      auth: false,
    },
  },
  {
    path: "/event-list",
    name: "event-list",
    component: EventList,
    meta: {
      auth: true,
    },
  },
  {
    path: "/group-list",
    name: "group-list",
    component: GroupList,
    meta: {
      auth: true,
    },
  },
  {
    path: "/create-group",
    name: "create-group",
    component: CreateGroup,
    meta: {
      auth: true,
    },
  },
  {
    path: "/group/:id",
    name: "group",
    component: GroupPage,
    meta: {
      auth: true,
    },
  },
  {
    path: "/map-activity/:poligonoid",
    name: "map-activity",
    component: MapActivity,
    meta: {
      auth: true,
    },
  },
  {
    path: "/add-user-to-group/:grupoid",
    name: "add-user-to-group",
    component: AddUserToGroup,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const auth = localStorage.getItem("token");
  if (to.meta?.auth) {
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
    if (auth) {
      next("/");
    } else {
      next();
    }
  }
});

export default router;
