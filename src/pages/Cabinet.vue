<template>
  <q-page padding>
    <h1
      class="text-center text-h5"
      v-text="$t('cabinet')"
    />
    <div class="row justify-center">
      <form
        @submit.prevent="submitForm"
        class="col-xs-12 col-sm-6"
        style="max-width: 500px;"
      >
        <div class="q-gutter-md">
          <q-input
            dense
            outlined
            v-model="formData.first_name"
            ref="first_name"
            lazy-rules
            class="text-right"
            :hint="$t('name')"
            :rules="[
              val => !!val || $t('required_field'),
              val => val.length <= 25 || $t('twentyfive_characters_name'),
            ]"
          />
          <q-input
            dense
            outlined
            v-model="formData.second_name"
            ref="second_name"
            lazy-rules
            :hint="$t('second_name')"
            :rules="[
              val => !!val || $t('required_field'),
              val => val.length <= 25 || $t('twentyfive_characters_secondname'),
            ]"
          />
          <q-input
            dense
            outlined
            v-model="formData.email"
            ref="email"
            lazy-rules
            hint="E-mail"
            :rules="[
              val => !!val || $t('required_field'),
              val => isValidEmail(formData.email) || $t('enter_correct_email')
            ]"
          />
          <q-input
            dense
            outlined
            v-model="formData.phone_number"
            :label="$t('phone')"
            ref="phone_number"
            mask="# ### ### ## ##"
            unmasked-value
            :hint="$t('phone_layout')"
            lazy-rules
            :rules="[
              val => !!val || $t('required_field'),
            ]"
          />
          <q-input
            dense
            outlined
            ref="password"
            v-model="formData.password"
            :type="hidePassword ? 'password' : 'text'"
            :hint="$t('new_password')"
            :rules="[
              val => (!val || val.length >= 6) || $t('six_characters_min'),
              val => (!val || val.length <= 25) || $t('twentyfive_characters_password'),
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
            dense
            outlined
            ref="password2"
            v-model="password_repeat"
            :type="hidePassword2 ? 'password' : 'text'"
            :hint="$t('confirm_password')"
            :rules="[
              val => isPasswordsEqual || $t('passwords_should_match')
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
        <!-- <div class="row">
          <q-checkbox
            right-label
            v-model="formData.subscribed"
            :label="$t('subscribe_for_newsletter')"
          />
        </div> -->
        <div class="row q-gutter-md q-py-md justify-between">
          <q-btn
            color="primary"
            :label="$t('save')"
            type="submit"
          />
          <q-btn
            color="primary"
            :label="$t('my_orders')"
            icon-right="arrow_right"
            :to="{ name: 'my-orders'}"
          />
        </div>
      </form>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { emailValidationMixin } from 'components/helpers/mixins';

export default {
  name: 'Cabinet',
  mixins: [emailValidationMixin],
  data() {
    return {
      formData: {
        id: this.$store.state.user.user.id,
        first_name: this.$store.state.user.user.first_name,
        second_name: this.$store.state.user.user.second_name,
        email: this.$store.state.user.user.email,
        phone_number: this.$store.state.user.user.phone_number,
        password: '',
      },
      password_repeat: '',
      hidePassword: true,
      hidePassword2: true,
    };
  },
  computed: {
    ...mapState('user', ['user']),
    isPasswordsEqual() {
      return this.formData.password === this.password_repeat;
    },
    isPasswordsEmpty() {
      return !this.formData.password && !this.password_repeat;
    },
  },
  methods: {
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      this.$refs.password2.validate();
      this.$refs.first_name.validate();
      this.$refs.second_name.validate();
      this.$refs.phone_number.validate();
      if (
        !this.$refs.email.hasError
        && !this.$refs.password.hasError
        && !this.$refs.password2.hasError
        && !this.$refs.first_name.hasError
        && !this.$refs.second_name.hasError
        && !this.$refs.phone_number.hasError
      ) {
        const newUser = Object.assign({}, this.formData);

        if (this.isPasswordsEmpty) {
          delete newUser.password;
        }

        this.$store.dispatch('user/editProfile', newUser)
          .then(() => {
            this.formData.password = '';
            this.password_repeat = '';

            this.$q.notify({
              icon: 'done',
              color: 'positive',
              message: this.$t('data_successfully_saved'),
            });
          })
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
