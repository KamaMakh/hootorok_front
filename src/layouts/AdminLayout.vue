<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated>
      <q-toolbar class="q-gutter-x-sm justify-between">
        <div>
          <q-btn
            flat
            round
            dense
            @click="leftDrawerOpen = !leftDrawerOpen"
            icon="menu"
            color="white"
          />
          <router-link
            :to="{ name: 'home' }"
            class="standard-link text-white q-mx-md"
            v-text="'Главная'"
          />
        </div>
        <div>
          <router-link
            :to="{ name: 'cabinet' }"
            class="standard-link text-white q-ml-md"
            v-text="$t('profile')"
          />
          <router-link
            :to="{ name: 'logout' }"
            class="standard-link text-white q-ml-md"
            v-text="$t('logout')"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list dense>
        <q-item-label header v-text="'Админка'"/>
        <q-item class="items-center" :to="{ name: 'admin-feedback' }">
          <q-item-label v-text="$t('feedback')"/>
        </q-item>
        <q-item class="items-center" :to="{ name: 'admin-services' }">
          <q-item-label v-text="$t('list_of_services')"/>
        </q-item>
        <q-item class="items-center" :to="{ name: 'admin-info-pages' }">
          <q-item-label v-text="$t('info_pages')"/>
        </q-item>
        <q-item class="items-center" :to="{ name: 'admin-faq' }">
          <q-item-label v-text="$t('faq')"/>
        </q-item>
        <q-item class="items-center" :to="{ name: 'admin-housings' }">
          <q-item-label v-text="$t('housing_facilities')"/>
        </q-item>
        <q-item class="items-center" :to="{ name: 'admin-rooms' }">
          <q-item-label v-text="$t('rooms_and_houses')"/>
        </q-item>
        <q-item class="items-center" :to="{ name: 'admin-news' }">
          <q-item-label v-text="$t('news_and_campaigns')"/>
        </q-item>
        <q-item class="items-center" :to="{ name: 'admin-users' }">
          <q-item-label v-text="$t('users')"/>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'AdminLayout',
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  methods: {},
};
</script>
