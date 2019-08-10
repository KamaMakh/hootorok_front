
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
        path: 'auth',
        name: 'login',
        component: () => import('pages/Login.vue'),
      },
      {
        path: 'registration',
        name: 'registration',
        component: () => import('pages/Registration.vue'),
      },
      {
        path: 'cabinet',
        name: 'cabinet',
        component: () => import('pages/Cabinet.vue'),
      },
      {
        path: 'logout',
        name: 'logout',
        component: () => import('pages/Logout.vue'),
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
