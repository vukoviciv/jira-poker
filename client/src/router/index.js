import { createRouter, createWebHistory } from 'vue-router';
import { storeToRefs } from 'pinia';
import useAuthStore from '@/stores/auth';
import WelcomePage from '@/pages/welcome-page.vue';
import RoomPage from '@/pages/room-page.vue';

const ROUTE_NAMES = {
  HOME: 'Home',
  ROOM: 'Room',
};

const routes = [
  { path: '/', name: ROUTE_NAMES.HOME, component: WelcomePage },
  { 
    path: '/room',
    beforeEnter: [authGuard],
    name: ROUTE_NAMES.ROOM,
    component: RoomPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function authGuard (_to, _from, next) {
  const authStore = useAuthStore();
  if (authStore.displayName) return next();
  return next({ name: ROUTE_NAMES.HOME });
}

export default router;
