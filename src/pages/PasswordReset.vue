<template>
  <q-page padding>
    <div class="auth-tabs">
      <div>
        <q-banner class="bg-grey-3">
          <div
            class="text-center font-size_20"
            v-text="$t('password_reset')"
          >
          </div>
        </q-banner>
        <div class="font-size_12 q-pa-md" v-text="$t('forgot_password_message')"></div>
      </div>
      <form @submit.prevent="submitForm" class="q-pa-md">
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
  name: 'PasswordReset',
  data() {
    return {
      formData: {
        email: '',
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.email.validate();
      if (
        !this.$refs.email.hasError
      ) {
        this.$store.dispatch('user/resetPassword', this.formData)
          .then(() => this.$q.notify({
            icon: 'close',
            color: 'primary',
            position: 'center',
            message: 'Данные о смене пароля отправлены на email',
          }))
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
