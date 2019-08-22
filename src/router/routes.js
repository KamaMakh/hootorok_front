
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Index.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/Login.vue'),
      },
      {
        path: 'registration',
        name: 'registration',
        component: () => import('pages/Registration.vue'),
      },
      {
        path: 'rooms',
        name: 'rooms',
        component: () => import('pages/Rooms.vue'),
      },
      {
        path: 'rooms/:id',
        name: 'roomItem',
        props: true,
        component: () => import('pages/RoomItem.vue'),
      },
      {
        path: 'housings',
        name: 'housings',
        props: true,
        component: () => import('pages/Housings.vue'),
      },

    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
