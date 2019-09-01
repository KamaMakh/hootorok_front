<template>
  <q-page padding>
    <h1
      class="text-h2"
      v-text="$t('faq')"
    />
    <div :key="block.topic" v-for="block in faq">
      <h2 class="text-h6" v-text="block.topic"/>
      <div :key="question.id" v-for="question in block.faq" class="text-body2">
        <p class="text-bold" v-text="question.title"/>
        <p class="" v-text="question.content"/>
      </div>
    </div>

    <div class="feedback">
      <q-banner class="bg-grey-3">
        <div
          class="text-center font-size_20"
          v-text="$t('feedback')"
        />
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
            unmasked-value
            fill-mask
            :hint="$t('phone_layout')"
            lazy-rules
            :rules="[
              val => !!val || $t('required_field'),
              val => val.length === 11 || $t('eleven_numbers_min')
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
              val => isValidEmail(formDate.email) || $t('enter_correct_email'),
            ]"
          />
          <div class="relative-position row q-mt-md">
            <q-btn
              color="primary"
              :label="$t('send')"
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { emailValidationMixin } from 'components/helpers/mixins';

export default {
  name: 'FAQ',
  mixins: [emailValidationMixin],
  preFetch({ store }) {
    return store.dispatch('content/getFAQ');
  },
  data() {
    return {
      formData: {
        question: '',
        name: '',
        phone_number: '',
        email: '',
      },
    };
  },
  computed: {
    ...mapState('content', ['faq']),
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
        this.$store.dispatch('content/sendFeedback', this.formData)
          .then(() => this.$q.notify({
            icon: 'done',
            color: 'positive',
            message: this.$t('request_sent'),
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

<style lang="stylus" scoped>
.feedback
  max-width: 500px
  margin: 0 auto
  border: 1px solid lightgrey
</style>
