<template>
  <q-page padding>
    <h1 class="text-h2" v-text="$t('profile')"/>
    {{ user }}
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
            unmasked-value
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
              val => isValidEmail(formData.email) || $t('enter_correct_email')
            ]"
          />
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
          <q-input
            outlined
            v-model="formData.first_name"
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
            v-model="formData.second_name"
            :label="$t('second_name')"
            ref="second_name"
            lazy-rules
            :rules="[
              val => !!val || $t('required_field'),
              val => val.length <= 25 || $t('twentyfive_characters_secondname'),
            ]"
          />
        </div>
        <!-- <div class="row">
          <q-checkbox
            right-label
            v-model="formData.subscribed"
            :label="$t('subscribe_for_newsletter')"
          />
        </div> -->
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
import { mapState } from 'vuex';

export default {
  name: 'Cabinet',
  data() {
    return {};
  },
  computed: {
    ...mapState('user', ['user']),
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
