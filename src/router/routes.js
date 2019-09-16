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
        path: 'cabinet/orders',
        name: 'orders',
        props: true,
        component: () => import('pages/DummyPage.vue'),
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
        path: 'recovery',
        name: 'recovery',
        component: () => import('pages/NewPassword.vue'),
      },
      {
        path: 'info/payment',
        name: 'payment-info',
        component: () => import('pages/info/PaymentInfo.vue'),
      },
      {
        path: 'info/faq',
        name: 'faq',
        component: () => import('pages/info/FAQ.vue'),
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
        props: true,
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
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    meta: { requiresAdmin: true },
    redirect: { name: 'admin-feedback' },
    children: [
      {
        path: 'feedback',
        name: 'admin-feedback',
        component: () => import('pages/admin/Feedback.vue'),
      },
      {
        path: 'housings',
        name: 'admin-housings',
        component: () => import('pages/admin/Housings.vue'),
      },
      {
        path: 'housings/:id/edit',
        name: 'edit-housing',
        props: true,
        component: () => import('pages/admin/HousingEdit.vue'),
      },
      {
        path: 'housings/add',
        name: 'add-housing',
        component: () => import('pages/admin/HousingAdd.vue'),
      },
      {
        path: 'rooms',
        name: 'admin-rooms',
        component: () => import('pages/admin/Rooms.vue'),
      },
      {
        path: 'rooms/:id/edit',
        name: 'edit-room',
        props: true,
        component: () => import('pages/admin/RoomEdit.vue'),
      },
      {
        path: 'rooms/add',
        name: 'add-room',
        component: () => import('pages/admin/RoomAdd.vue'),
      },
      {
        path: 'services',
        name: 'admin-services',
        component: () => import('pages/admin/Services.vue'),
      },
      {
        path: 'pages/:id/edit',
        name: 'edit-page',
        component: () => import('pages/admin/PageEdit.vue'),
        props: true,
      },
      {
        path: 'pages/add',
        name: 'add-page',
        component: () => import('pages/admin/PageAdd.vue'),
      },
      {
        path: 'news',
        name: 'admin-news',
        component: () => import('pages/admin/News.vue'),
      },
      {
        path: 'news/:id/edit',
        name: 'edit-news',
        props: true,
        component: () => import('pages/admin/NewsEdit.vue'),
      },
      {
        path: 'news/add',
        name: 'add-news',
        component: () => import('pages/admin/NewsAdd.vue'),
      },
      {
        path: 'info-pages',
        name: 'admin-info-pages',
        component: () => import('pages/admin/InfoPages.vue'),
      },
      {
        path: 'faq',
        name: 'admin-faq',
        component: () => import('pages/admin/FAQ.vue'),
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('pages/admin/Users.vue'),
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
