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
        <div
          class="font-size_12 q-pa-md"
          v-text="$t('forgot_password_message')"
        />
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
              val => isValidEmail(formData.email) || $t('enter_correct_email')
            ]"
          />
        <div class="row q-mt-md">
          <q-btn
            color="primary"
            :label="$t('send')"
            type="submit"
          />
        </div>
      </form>
    </div>
  </q-page>
</template>

<script>
import { emailValidationMixin } from 'components/helpers/mixins';

export default {
  name: 'PasswordReset',
  mixins: [emailValidationMixin],
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

      if (!this.$refs.email.hasError) {
        this.$store.dispatch('user/resetPassword', this.formData)
          .then(() => this.$q.notify({
            icon: 'close',
            color: 'primary',
            position: 'center',
            message: this.$t('change_password_success_send'),
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
};
</script>

<style>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid lightgrey;
}
</style>
