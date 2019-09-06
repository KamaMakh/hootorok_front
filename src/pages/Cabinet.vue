<template>
  <q-page padding>
    <div class="auth-tabs">
      <q-banner class="bg-grey-3">
        <div
          class="text-center font-size_20"
          v-text="$t('cabinet')"
        />
      </q-banner>
      <form @submit.prevent="submitForm" class="q-pa-md">
        <div class="q-gutter-md">
          <q-input
            outlined
            v-model="formData.first_name"
            ref="first_name"
            lazy-rules
            :rules="[
              val => !!val || $t('required_field'),
              val => val.length <= 25 || $t('twentyfive_characters_name'),
            ]"
          >
          <template v-slot:before>
            <span class="span-form" v-text="$t('name')"></span>
          </template>
          </q-input>
          <!-- <q-input
            outlined
            v-model="formData1.parental_name"
            :label="$t('parental_name')"
            ref="parental_name"
          /> -->
          <q-input
            outlined
            v-model="formData.second_name"
            ref="second_name"
            lazy-rules
            :rules="[
              val => !!val || $t('required_field'),
              val => val.length <= 25 || $t('twentyfive_characters_secondname'),
            ]"
          >
          <template v-slot:before>
            <span class="span-form" v-text="$t('second_name')" width="200px"></span>
          </template>
          </q-input>
          <q-input
            outlined
            v-model="formData.email"
            ref="email"
            lazy-rules
            :rules="[
              val => !!val || $t('required_field'),
              val => isValidEmail(formData.email) || $t('enter_correct_email')
            ]"
          >
          <template v-slot:before>
            <span class="span-form" v-text="$t('E-mail')"></span>
          </template>
          </q-input>
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
              val => isValidPhone(formData.phone_number) || $t('enter_correct_tel_number')
            ]"
          >
          <template v-slot:before>
            <span class="span-form" v-text="$t('phone')"></span>
          </template>
          </q-input>
          <q-input
            ref="password"
            outlined
            v-model="formData.password"
            :type="hidePassword ? 'password' : 'text'"
            :rules="[
              val => isPasswordsEmpty()
            || $t('passwords_should_match')
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
          <template v-slot:before>
            <span class="span-form" v-text="$t('new_password')"></span>
          </template>
          </q-input>
          <q-input
            ref="password2"
            outlined
            v-model="formData1.password2"
            :type="hidePassword2 ? 'password' : 'text'"
            :rules="[
              val => val.length <= 25 || $t('twentyfive_characters_password'),
              val => isPasswordsEmpty()
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
          <template v-slot:before>
            <span class="span-form" v-text="$t('confirm_password')"></span>
          </template>
          </q-input>
          <!-- <q-input
            v-model="formData1.birthday"
            outlined
            :label="$t('birthday')"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale">
                  <q-date
                    v-model="formData1.birthday"
                    @input="() => $refs.qDateProxy.hide()"
                    mask="DD.MM.YYYY"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            class="q-pt-md q-pb-md"
            outlined
            v-model="formData1.gender"
            :options="options"
            :label="$t('gender')"
          /> -->
        </div>
        <!-- <div class="row">
          <q-checkbox
            right-label
            v-model="formData1.subscribed"
            :label="$t('subscribe_for_newsletter')"
          />
        </div> -->
        <div class="row q-mt-md">
          <q-btn
            color="primary"
            :label="$t('save')"
            type="submit"
          />
          <q-space />
          <q-btn
            color="primary"
            :label="$t('go_to_my_orders')"
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
import { emailValidationMixin, phoneValidationMixin } from 'components/helpers/mixins';

export default {
  name: 'Cabinet',
  mixins: [emailValidationMixin, phoneValidationMixin],
  data() {
    return {
      formData: {
        first_name: '',
        second_name: '',
        email: '',
        password: '',
        phone_number: '',
      },
      formData1: {
        password2: '',
        // parental_name: '',
        // birthday: '',
        // gender: '',
        // subscribed: false,
      },
      hidePassword: true,
      hidePassword2: true,
      tab: 'Login',
      options: [
        'Male', 'Female',
      ],
      check: false,
    };
  },
  computed: {
    ...mapState('user', ['user']),
  },
  methods: {
    isPasswordsEmpty() {
      if (this.$refs.password.value !== undefined
        && this.$refs.password2.value !== undefined
      ) {
        if (this.$refs.password.value === this.$refs.password2.value) {
          return true;
        }
        return false;
      }
      return true;
    },
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      this.$refs.password2.validate();
      this.$refs.first_name.validate();
      // this.$refs.parental_name.validate();
      this.$refs.second_name.validate();
      this.$refs.phone_number.validate();
      if (
        !this.$refs.email.hasError
        && !this.$refs.password.hasError
        && !this.$refs.password2.hasError
        && !this.$refs.first_name.hasError
        // && !this.$refs.parental_name.hasError
        && !this.$refs.second_name.hasError
        && !this.$refs.phone_number.hasError
      ) {
        this.$store.dispatch('user/editProfile', this.formData)
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
  mounted() {
    this.formData = Object.assign({}, this.user);
  },
};
</script>

<style>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid lightgrey;
}
.span-form {
  width: 180px;
  font-size: 1rem;
  text-align: right;
}
</style>
