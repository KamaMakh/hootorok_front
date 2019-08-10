<template>
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
          val => isValidTelNumber(val) || 'Пожалуйста введите корректный номер телефона',
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
          val => isValidEmailAddress(val) || 'Невалидный e-mail'
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
        <div class="column justify-center">
          <q-icon name="visibility" size="18px" color="primary" @click="showPassword()" />
        </div>
      </q-input>
    </div>
    <div class="row q-mb-md">
      <q-input
        ref="password2"
        outlined
        v-model="formData.password2"
        label="Подтверждение пароля"
        class="col q-ml-md q-mr-md"
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          val => !!val || 'Поле обязательно',
          val => isPasswordsMatch(val) || 'Пароли не совпадают'
          ]"
        lazy-rules
      >
        <div class="column justify-center">
          <q-icon name="visibility" size="18px" color="primary" @click="showPassword2()" />
        </div>
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
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      formData: {
        email: '',
        password: '',
        password2: '',
        name: '',
        surname: '',
        tel: '',
        subscribed: 'false',
      },
    };
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'handleAuthState']),
    // showPassword() {
    //   const x = this.$refs.password;
    //   if (x.type === 'password') {
    //     x.type = 'text';
    //   } else {
    //     x.type = 'password';
    //   }
    // },
    // showPassword2() {
    //   const x = this.$refs.password2;
    //   if (x.type === 'password') {
    //     x.type = 'text';
    //   } else {
    //     x.type = 'password';
    //   }
    // },
    isValidEmailAddress(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    isValidTelNumber(tel) {
      //const telNumber = /^((\+7|7|8)+([0-9]){10})$/;
      const telNumber = /^((8|7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
      return telNumber.test(String(tel));
    },
    isPasswordsMatch(password2) {
      if (this.$refs.password.value === password2) {
        return true;
      }
    },
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
};
</script>

<style scoped>
.registrationHeader {
  text-align: center;
  font-size: 20px;
}
</style>
