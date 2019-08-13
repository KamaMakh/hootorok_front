<template>
  <q-page padding>
    <div class="auth-tabs">
      <q-banner class="bg-grey-3">
        <div
          class="text-center font-size_20"
          v-text="$t('new_password')"
        />
      </q-banner>
      <form @submit.prevent="submitForm" class="q-pa-md">
        <div class="q-gutter-md">
          <q-input
            ref="password"
            outlined
            v-model="formData.password"
            :label="$t('password')"
            :type="hidePassword ? 'password' : 'text'"
            :rules="[
              val => !!val || $t('required_field'),
              val => val.length >= 6 || $t('six_characters_min'),
              val => val.length <= 25 || $t('twentyfive_characters_password'),
            ]"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                :name="hidePassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="hidePassword = !hidePassword"
              />
            </template>
          </q-input>
          <q-input
            ref="password2"
            outlined
            v-model="formData1.password2"
            :label="$t('confirm_password')"
            :type="hidePassword2 ? 'password' : 'text'"
            :rules="[
              val => !!val || $t('required_field'),
              val => this.$refs.password.value === this.$refs.password2.value
            || $t('passwords_should_match')
            ]"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                :name="hidePassword2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="hidePassword2 = !hidePassword2"
              />
            </template>
          </q-input>
        </div>
        <div class="row q-mt-md">
          <q-btn
            color="primary"
            :label="$t('set_new_password')"
            type="submit"
          />
        </div>
      </form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'NewPassword',
  data() {
    return {
      formData: {
        password: '',
      },
      formData1: {
        password2: '',
      },
      hidePassword: true,
      hidePassword2: true,
      tab: 'Login',
    };
  },
  methods: {
    submitForm() {
      this.$refs.password.validate();
      this.$refs.password2.validate();
      if (
        !this.$refs.password.hasError
        && !this.$refs.password2.hasError
        && this.$refs.password.value === this.$refs.password2.value
      ) {
        this.$store.dispatch('user/setNewPassword', this.formData)
          .then(() => this.$router.push({ name: 'cabinet' }))
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
  computed: {
    isValidEmailAddress() {
    // eslint-disable-next-line
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.$refs.email.value).toLowerCase());
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
