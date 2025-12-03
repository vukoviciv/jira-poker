import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '../pages/welcome-page.vue';
import RoomPage from '../pages/room-page.vue';

const routes = [
  { path: '/', name: 'Home', component: WelcomePage },
  { path: '/room', name: 'Room', component: RoomPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
