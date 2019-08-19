<template>
  <q-page padding>
    <div class="auth-tabs">
      <q-banner class="bg-grey-3">
        <div
          class="text-center font-size_20"
          v-text="$t('registration')"
        />
      </q-banner>
      <form @submit.prevent="submitForm" class="q-pa-md">
        <div class="q-gutter-md">
          <q-input
            outlined
            v-model="formData.phone_number"
            :label="$t('phone')"
            ref="phone_number"
            mask="# ### ### ## ##"
            fill-mask
            :hint="$t('phone_layout')"
            lazy-rules
            :rules="[
              val => !!val || $t('required_field'),
            ]"
          />
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
          <q-input
            ref="password"
            outlined
            v-model="formData.password"
            :label="$t('password')"
            :type="showPassword ? 'password' : 'text'"
            :rules="[
              val => !!val || $t('required_field'),
              val => val.length >= 6 || $t('six_characters_min'),
              val => val.length <= 25 || $t('twentyfive_characters_password'),
            ]"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
          <q-input
            ref="password2"
            outlined
            v-model="formData.password2"
            :label="$t('confirm_password')"
            :type="showPassword2 ? 'password' : 'text'"
            :rules="[
              val => !!val || $t('required_field'),
              val => this.$refs.password.value === this.$refs.password2.value
            || $t('passwords_should_match')
            ]"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword2 = !showPassword2"
              />
            </template>
          </q-input>
          <q-input
            outlined
            v-model="formData.name"
            :label="$t('name')"
            ref="first_name"
            lazy-rules
            :rules="[
              val => !!val || $t('required_field'),
              val => val.length <= 25 || $t('twentyfive_characters_name'),
            ]"
          />
          <q-input
            outlined
            v-model="formData.last_name"
            :label="$t('last_name')"
            ref="last_name"
            lazy-rules
            :rules="[
              val => !!val || $t('required_field'),
              val => val.length <= 25 || $t('twentyfive_characters_lastname'),
            ]"
          />
        </div>
        <div class="row">
          <q-checkbox
            right-label
            v-model="formData.subscribed"
            :label="$t('subscribe_for_newsletter')"
          />
        </div>
        <div class="row q-mt-md">
          <q-btn
            color="primary"
            :label="$t('register')"
            type="submit"
          />
        </div>
      </form>
    </div>
  </q-page>
</template>

<script>
import EmailValidationMixin from 'components/helpers/emailValidationMixin.vue';

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
  mixins: [EmailValidationMixin],
};
</script>

<style>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid lightgrey;
}
</style>
