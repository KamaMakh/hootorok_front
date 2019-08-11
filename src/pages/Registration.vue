<template>
  <q-page padding>
    <div class="q-mt-md q-mb-md auth-tabs">
      <q-banner class="bg-grey-3 col">
        <div
          class="text-center font-size_20"
          v-text="$t('registration')"
        ></div>
      </q-banner>
      <form @submit.prevent="submitForm" class="q-pa-md">
        <div class="q-gutter-md">
          <q-input
            outlined
            v-model="formData.tel"
            v-bind:label="$t('phone')"
            class="col q-ml-md q-mr-md"
            ref="tel"
            mask="# ### ### ## ##"
            fill-mask
            v-bind:hint="$t('phone_layout')"
            lazy-rules
            :rules="[
          val => !!val || $t('required_field'),
          ]"
          />
          <q-input
            outlined
            v-model="formData.email"
            label="E-mail"
            class="col q-ml-md q-mr-md"
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
            v-bind:label="$t('password')"
            class="col q-ml-md q-mr-md"
            :type="isPwd ? 'password' : 'text'"
            :rules="[
          val => !!val || $t('required_field'),
          val => val.length >= 6 || $t('six_characters_min'),
          val => val.length <= 25 || $t('twentyfive_characters_password'),
          ]"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            ref="password2"
            outlined
            v-model="formData.password2"
            v-bind:label="$t('confirm_password')"
            class="col q-ml-md q-mr-md"
            :type="isPwd2 ? 'password' : 'text'"
            :rules="[
          val => !!val || $t('required_field'),
          val => this.$refs.password.value === this.$refs.password2.value
            || $t('passwords_should_match')
          ]"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd2 = !isPwd2"
              />
            </template>
          </q-input>
          <q-input
            outlined
            v-model="formData.name"
            v-bind:label="$t('name')"
            class="col q-ml-md q-mr-md"
            ref="name"
            lazy-rules
            :rules="[
          val => !!val || $t('required_field'),
          val => val.length <= 25 || $t('twentyfive_characters_name'),
          ]"
          />
          <q-input
            outlined
            v-model="formData.surname"
            v-bind:label="$t('last_name')"
            class="col q-ml-md q-mr-md"
            ref="surname"
            lazy-rules
            :rules="[
          val => !!val || $t('required_field'),
          val => val.length <= 25 || $t('twentyfive_characters_lastname'),
          ]"
          />
        </div>
        <div class="row">
          <q-checkbox
            class="q-mb-md"
            right-label
            v-model="formData.subscribed"
            v-bind:label="$t('subscribe_for_newsletter')"
          />
        </div>
        <div class="row">
          <q-btn
            color="primary"
            v-bind:label="$t('register')"
            type="submit"/>
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
        name: '',
        surname: '',
        tel: '',
        subscribed: false,
      },
      isPwd: true,
      isPwd2: true,
      tab: 'Login',
    };
  },
  methods: {
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      this.$refs.password2.validate();
      this.$refs.name.validate();
      this.$refs.surname.validate();
      this.$refs.tel.validate();
      if (
        !this.$refs.email.hasError
        && !this.$refs.password.hasError
        && !this.$refs.password2.hasError
        && !this.$refs.name.hasError
        && !this.$refs.surname.hasError
        && !this.$refs.tel.hasError
      ) {
        this.$store.dispatch('auth/registerUser', this.formData)
          .then(this.$router.push('/booking'))
          .catch(err => console.log(err));
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
