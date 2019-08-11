<template>
  <q-page padding>
    <div class="auth-tabs">
      <div class="q-gutter-md">
        <q-banner class="bg-grey-3">
          <div
            class="text-center font-size_20"
            v-text="$t('password_reset')"
          >
          </div>
        </q-banner>
        <div class="font-size_12 q-pl-md">
          Если вы забыли пароль, введите e-mail указанный при регистрации.
          Контрольная строка для смены пароля,
          а также ваши регистрационные данные, будут высланы вам по e-mail.
        </div>
      </div>
      <form @submit.prevent="submitForm" class="q-pa-md">
        <div class="q-gutter-md">
          <q-input
            outlined
            v-model="formData.email"
            label="E-mail"
            ref="email"
            lazy-rules
            :rules="[
              val => !!val || $t('required_field'),
              val => isValidEmailAddress || $t('enter_correct_email')
            ]"
          />
        </div>
        <div class="row q-mt-md">
          <q-btn
            color="primary"
            :label="$t('reset_password')"
            type="submit"
          />
        </div>
      </form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Registration',
  data() {
    return {
      formData: {
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        subscribed: false,
      },
      showPassword: true,
      showPassword2: true,
      tab: 'Login',
    };
  },
  methods: {
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      this.$refs.password2.validate();
      this.$refs.first_name.validate();
      this.$refs.last_name.validate();
      this.$refs.phone_number.validate();
      if (
        !this.$refs.email.hasError
        && !this.$refs.password.hasError
        && !this.$refs.password2.hasError
        && !this.$refs.first_name.hasError
        && !this.$refs.last_name.hasError
        && !this.$refs.phone_number.hasError
      ) {
        this.$store.dispatch('user/register', this.formData)
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
