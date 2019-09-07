<template>
  <form @submit.prevent="onSubmit" class="q-pa-md">
    <div class="q-gutter-md">
      <q-input
        type="textarea"
        outlined
        v-model="data.message"
        :label="$t('question')"
        ref="message"
        lazy-rules
        :rules="[
          val => !!val || $t('required_field'),
          val => ((val.length >= 15) && (val.length <= 1000))
            || $t('expected_length_between', [15, 1000]),
        ]"
      />
      <q-input
        outlined
        v-model="data.name"
        :label="$t('name')"
        ref="name"
        lazy-rules
        :rules="[
          val => !!val || $t('required_field'),
          val => val.length <= 25 || $t('expected_less_than', [25]),
        ]"
      />
      <q-input
        outlined
        v-model="data.phone"
        :label="$t('phone')"
        ref="phone"
        mask="# ### ### ## ##"
        unmasked-value
        fill-mask
        :hint="$t('phone_layout')"
        lazy-rules
        :rules="[
          val => !!val || $t('required_field'),
          val => val.length === 11 || $t('expected_length', [11]),
        ]"
      />
      <q-input
        outlined
        v-model="data.email"
        label="E-mail"
        ref="email"
        lazy-rules
        :rules="[
          val => !!val || $t('required_field'),
          val => isValidEmail(data.email) || $t('enter_correct_email'),
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
</template>

<script>
import { emailValidationMixin } from 'components/helpers/mixins';

export default {
  name: 'FeedbackForm',
  mixins: [emailValidationMixin],
  data() {
    return {
      data: {
        name: '',
        email: '',
        phone: '',
        message: '',
      },
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      const inputKeys = Object.keys(this.data);
      const inputs = inputKeys.map(id => this.$refs[id]);

      inputs.forEach(i => i.validate());

      if (inputs.some(i => i.hasError)) return;

      this.$store.dispatch('content/sendFeedback', Object.assign({}, this.data))
        .then(() => {
          inputKeys.forEach((k) => {
            this.data[k] = '';
          });

          inputs.forEach(i => i.resetValidation());

          this.$q.notify({
            icon: 'done',
            color: 'positive',
            message: this.$t('request_sent'),
          });
        })
        .catch((error) => {
          this.$q.notify({
            icon: 'close',
            color: 'negative',
            message: error,
          });
        });
    },
  },
};
</script>
