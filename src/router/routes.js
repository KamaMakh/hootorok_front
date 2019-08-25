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
        meta: {
          requiresVisitor: true,
        },
      },
      {
        path: 'registration',
        name: 'registration',
        component: () => import('pages/Registration.vue'),
        meta: {
          requiresVisitor: true,
        },
      },
      {
        path: 'cabinet',
        name: 'cabinet',
        component: () => import('pages/Cabinet.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'logout',
        name: 'logout',
        component: () => import('pages/Logout.vue'),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: () => import('pages/Contacts.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('pages/About.vue'),
      },
      {
        path: 'info',
        name: 'info',
        component: () => import('pages/Info.vue'),
      },
      {
        path: 'booking',
        name: 'booking',
        component: () => import('pages/Booking.vue'),
        props: true,
      },
      {
        path: 'auth/forgot-password',
        name: 'password-reset',
        component: () => import('pages/PasswordReset.vue'),
      },
      {
        path: 'services/:id',
        name: 'services',
        component: () => import('pages/Services.vue'),
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
