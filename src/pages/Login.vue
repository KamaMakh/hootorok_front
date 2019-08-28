<template>
  <q-page padding>
    <div class="auth-tabs">
      <q-banner class="bg-grey-3">
        <div
          v-text="$t('authorization')"
          class="text-center font-size_20"
        />
      </q-banner>
      <form @submit.prevent="submitForm" class="q-pa-md">
        <div class="q-gutter-md">
          <q-input
            outlined
            v-model="formData.login"
            v-bind:label="$t('phone_or_email')"
            ref="login"
            v-bind:hint="$t('phone_layout')"
            lazy-rules
            :rules="[
              val => !!val || $t('required_field')
            ]"
          />
          <q-input
            ref="password"
            outlined
            v-model="formData.password"
            v-bind:label="$t('password')"
            type="password"
            :rules="[
              val => !!val || $t('required_field'),
              val => val.length >= 6 || $t('six_characters_min')
            ]"
            lazy-rules
          />
          <div class="row">
            <q-btn color="primary" v-bind:label="$t('enter')" type="submit" />
          </div>
          <div>
            <router-link :to="{ name: 'password-reset' }" v-text="$t('forgot_password')" />
          </div>
          <div>
            <router-link :to="{ name: 'registration' }" v-text="$t('registration')" />
          </div>
        </div>
      </form>
    </div>
  </q-page>
</template>

<script>
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
    submitForm() {
      this.$refs.login.validate();
      this.$refs.password.validate();
      if (
        !this.$refs.login.hasError
        && !this.$refs.password.hasError
      ) {
        this.$store.dispatch('user/login', this.formData)
          .then(() => this.$router.push({ name: 'booking' }))
          .catch((error) => {
            this.$q.notify({
              icon: 'close',
              color: 'negative',
              message: error,
            });
          });
      }
    },
  },
};
</script>

<style>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid lightgrey;
}
</style>
