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
        component: () => import('pages/info/Info.vue'),
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
        path: 'info/payment',
        name: 'payment',
        component: () => import('pages/info/Payment.vue'),
      },
      {
        path: 'info/faq',
        name: 'faq',
        component: () => import('pages/info/Faq.vue'),
      },
      {
        path: 'info/booking-info',
        name: 'booking-info',
        component: () => import('pages/info/BookingInfo.vue'),
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('pages/News.vue'),
      },
      {
        path: 'news/:id',
        name: 'news-item',
        props: true,
        component: () => import('pages/NewsItem.vue'),
      },
      {
        path: 'services',
        name: 'services',
        component: () => import('pages/Services.vue'),
      },
      {
        path: 'services/:id',
        name: 'service',
        props: true,
        component: () => import('pages/ServiceItem.vue'),
      },
      {
        path: 'map',
        name: 'map',
        component: () => import('pages/DummyPage.vue'),
      },
      {
        path: 'thermal',
        name: 'thermal',
        component: () => import('pages/Thermal.vue'),
      },
      {
        path: 'rooms',
        name: 'rooms',
        component: () => import('pages/Rooms.vue'),
      },
      {
        path: 'rooms/:id',
        name: 'room',
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
