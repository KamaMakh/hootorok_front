<template>
  <form @submit.prevent="submitForm" class="col">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <div class="registrationHeader">Авторизация</div>
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.phone_number"
        label="Телефон или email"
        class="col q-ml-md q-mr-md"
        ref="phone_number"
        lazy-rules
        :rules="[
          val => !!val || 'Поле обязательно'
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
        type="password"
        :rules="[
          val => !!val || 'Поле обязательно',
          val => val.length >= 6 || 'Пароль должен быть не менее 6 знаков'
          ]"
        lazy-rules
      >
        <div class="column justify-center">
          <q-icon name="visibility" size="18px" color="primary" @click="showPassword()" />
        </div>
      </q-input>
    </div>
    <div class="row">
      <q-btn color="primary" label="Войти" type="submit" class="q-ml-md q-mb-md" />
    </div>
    <div class="row q-ml-md q-mb-md">
      <router-link :to="'/auth/forgot-password'" v-text="$t('Забыли пароль?')" />
    </div>
    <div class="row q-ml-md q-mb-md">
      <router-link :to="{ name: 'registration' }" v-text="$t('registration')" />
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      formData: {
        password: '',
        phone_number: '',
        subscribed: 'false',
      },
    };
  },
  methods: {
    ...mapActions('auth', ['loginUser', 'handleAuthState']),
    showPassword() {
      const x = this.$refs.password;
      if (x.type === 'password') {
        x.type = 'text';
      } else {
        x.type = 'password';
      }
    },
    submitForm() {
      if (
        !this.$refs.phone_number.hasError
        && !this.$refs.password.hasError
      ) {
        this.loginUser(this.formData);
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
