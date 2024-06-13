import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Calendar from '@/pages/Calendar.vue';
import Chart from '../pages/chart.vue';
import Settings from '@/pages/Settings.vue';
import Cal from '@/components/Cal.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
    },

    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
    { path: '/cal', component: Cal },
    {
      path: '/chart',
      name: 'chart',
      component: Chart,
    },
  ],
});

export default router;
