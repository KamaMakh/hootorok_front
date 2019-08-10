<template>
  <div class="q-mt-md q-mb-md">
    <q-page class="auth-tabs text-grey">
      <form @submit.prevent="submitForm" class="col">
        <div class="row q-mb-md">
          <q-banner class="bg-grey-3 col">
            <div class="registrationHeader">Регистрация</div>
          </q-banner>
        </div>
        <div class="row q-mb-md">
          <q-input
            outlined
            v-model="formData.tel"
            label="Телефон"
            class="col q-ml-md q-mr-md"
            ref="tel"
            mask="# ### ### ## ##"
            fill-mask
            hint="Формат: 8 ### ### ## ##"
            lazy-rules
            :rules="[
          val => !!val || 'Поле обязательно',
          val => isValidTelNumber || 'Пожалуйста введите корректный номер телефона',
          ]"
          />
        </div>
        <div class="row q-mb-md">
          <q-input
            outlined
            v-model="formData.email"
            label="E-mail"
            class="col q-ml-md q-mr-md"
            ref="email"
            lazy-rules
            :rules="[
          val => !!val || 'Поле обязательно',
          val => isValidEmailAddress || 'Невалидный e-mail'
          ]"
          />
        </div>
        <div class="row q-mb-md">
          <q-input
            ref="password"
            outlined
            v-model="formData.password"
            label="Пароль"
            class="col q-ml-md q-mr-md"
            :type="isPwd ? 'password' : 'text'"
            :rules="[
          val => !!val || 'Поле обязательно',
          val => val.length >= 6 || 'Ожидается минимум 6 символов',
          val => val.length <= 25 || 'Сократите пароль до 25 символов',
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
        </div>
        <div class="row q-mb-md">
          <q-input
            ref="password2"
            outlined
            v-model="formData.password2"
            label="Подтверждение пароля"
            class="col q-ml-md q-mr-md"
            :type="isPwd2 ? 'password' : 'text'"
            :rules="[
          val => !!val || 'Поле обязательно',
          val => this.$refs.password.value === this.$refs.password2.value || 'Пароли не совпадают'
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
        </div>
        <div class="row q-mb-md">
          <q-input
            outlined
            v-model="formData.name"
            label="Имя"
            class="col q-ml-md q-mr-md"
            ref="name"
            lazy-rules
            :rules="[
          val => !!val || 'Поле обязательно',
          val => val.length <= 25 || 'Сократите имя до 25 символов',
          ]"
          />
        </div>
        <div class="row">
          <q-input
            outlined
            v-model="formData.surname"
            label="Фамилия"
            class="col q-ml-md q-mr-md"
            ref="surname"
            lazy-rules
            :rules="[
          val => !!val || 'Поле обязательно',
          val => val.length <= 25 || 'Сократите имя до 25 символов',
          ]"
          />
        </div>
        <div class="row">
          <q-checkbox
            class="q-ml-sm q-mb-md"
            right-label
            v-model="formData.subscribed"
            label="Подписаться на рассылку об акциях и скидках"
          />
        </div>
        <div class="row">
          <q-btn color="primary" label="Зарегистрироваться" type="submit" class="q-ml-md q-mb-md" />
        </div>
      </form>
    </q-page>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
    ...mapActions('auth', ['registerUser', 'handleAuthState']),
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
        this.registerUser(this.formData);
      }
    },
  },
  mounted() {
    this.handleAuthState();
  },
  computed: {
    isValidTelNumber() {
      // eslint-disable-next-line
      const telNumber = /^((8|7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
      return telNumber.test(String(this.$refs.tel.value));
    },
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
.registrationHeader {
  text-align: center;
  font-size: 20px;
}
</style>
