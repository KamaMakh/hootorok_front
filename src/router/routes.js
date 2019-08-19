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
        name: 'auth',
        component: () => import('pages/Login.vue'),
      },
      {
        path: 'registration',
        name: 'registration',
        component: () => import('pages/Registration.vue'),
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
      },
      {
        path: '/auth/forgot-password',
        name: 'passwordreset',
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
