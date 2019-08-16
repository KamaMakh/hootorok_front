<template>
  <q-page padding>
    <h1 class="text-h2" v-text="$t('faq')"/>
    <p>Описание условия доставки1</p>
    <p>Описание условия доставки2</p>
    <p>Описание условия доставки3</p>
    <div class="feedback">
      <q-banner class="bg-grey-3">
        <div
          class="text-center font-size_20"
          v-text="$t('feedback')"></div>
      </q-banner>
      <form @submit.prevent="submitForm" class="q-pa-md">
        <div class="q-gutter-md">
          <q-input
            type="textarea"
            outlined
            v-model="formData.question"
            :label="$t('question')"
            ref="question"
            lazy-rules
            :rules="[
            val => !!val || $t('required_field'),
            val => val.length >= 15 || $t('number_characters_question'),
            val => val.length <= 1000 || $t('number_characters_question'),
          ]"
          />
          <q-input
            outlined
            v-model="formData.name"
            :label="$t('name')"
            ref="name"
            lazy-rules
            :rules="[
              val => !!val || $t('required_field'),
              val => val.length <= 25 || $t('twentyfive_characters_name'),
            ]"
          />
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
              val => isValidPhoneNumber || $t('enter_correct_tel_number'),
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
              val => isValidEmailAddress || $t('enter_correct_email'),
            ]"
          />
          <div class="submitWrapper row q-mt-md">
            <q-btn
              color="primary"
              :label="$t('send_message')"
              type="submit"
            />
            <p class="requestSent text-green"
              v-if="showMessage"
            >{{$t('request_sent')}}
            </p>
          </div>
        </div>
      </form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Faq',
  data() {
    return {
      formData: {
        question: '',
        name: '',
        phone_number: '',
        email: '',
      },
      showMessage: false,
    };
  },
  methods: {
    submitForm() {
      this.$refs.question.validate();
      this.$refs.name.validate();
      this.$refs.phone_number.validate();
      this.$refs.email.validate();
      if (
        !this.$refs.question.hasError
          && !this.$refs.name.hasError
          && !this.$refs.phone_number.hasError
          && !this.$refs.email.hasError
      ) {
        this.showMessage = true;
        this.$store.dispatch('/sendMessage', this.formData)
          .then(function showMessage() {
            this.showMessage = true;
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
  computed: {
    isValidEmailAddress() {
      // eslint-disable-next-line
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.$refs.email.value);
    },
    isValidPhoneNumber() {
      const re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/;
      return re.test(this.$refs.phone_number.value);
    },
  },
};
</script>

<style>
  .feedback {
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid lightgrey;
  }
  .submitWrapper{
    position: relative;
  }
  .requestSent{
    position: absolute;
    right: 0;
  }
</style>
