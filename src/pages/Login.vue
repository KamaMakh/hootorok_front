<template>
  <div class="q-mt-md q-mb-md">
    <q-page class=" text-grey">
      <form @submit.prevent="submitForm" class="col auth-tabs">
        <div class="row q-mb-md">
          <q-banner class="bg-grey-3 col">
            <div v-text="$t('authorization')" class="registrationHeader"></div>
          </q-banner>
        </div>
        <div class="row q-mb-md">
          <q-input
            outlined
            v-model="formData.login"
            v-bind:label="$t('phone_or_email')"
            class="col q-ml-md q-mr-md"
            ref="login"
            v-bind:hint="$t('phone_layout')"
            lazy-rules
            :rules="[
              val => !!val || $t('required_field')
              ]"
          />
        </div>
        <div class="row q-mb-md">
          <q-input
            ref="password"
            outlined
            v-model="formData.password"
            v-bind:label="$t('password')"
            class="col q-ml-md q-mr-md"
            type="password"
            :rules="[
              val => !!val || $t('required_field'),
              val => val.length >= 6 || $t('six_characters_min')
              ]"
            lazy-rules
          >
          </q-input>
        </div>
        <div class="row">
          <q-btn color="primary" v-bind:label="$t('enter')" type="submit" class="q-ml-md q-mb-md" />
        </div>
        <div class="row q-ml-md q-mb-md">
          <router-link :to="'/auth/forgot-password'" v-text="$t('forgot_password')" />
        </div>
        <div class="row q-ml-md q-mb-md">
          <router-link :to="{ name: 'registration' }" v-text="$t('registration')" />
        </div>
      </form>
    </q-page>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      formData: {
        login: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    submitForm() {
      if (
        !this.$refs.login.hasError
        && !this.$refs.password.hasError
      ) {
        this.$store.dispatch('auth/loginUser', this.formData)
          .then(this.$router.push('/booking'))
          .catch(err => console.log(err));
      }
    },
  },
  mounted() {
  },
};
</script>

<style>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid lightgrey;
}
.registrationHeader {
  text-align: center;
  font-size: 20px;
}
</style>
