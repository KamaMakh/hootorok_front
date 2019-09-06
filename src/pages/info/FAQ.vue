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

    <div class="feedback q-mt-xl">
      <q-banner class="bg-grey-3">
        <div
          class="text-center font-size_20"
          v-text="$t('feedback')"
        />
      </q-banner>
      <feedback-form/>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { emailValidationMixin } from 'components/helpers/mixins';
import FeedbackForm from 'components/FeedbackForm.vue';

export default {
  name: 'FAQ',
  mixins: [emailValidationMixin],
  preFetch({ store }) {
    return store.dispatch('content/getFAQ');
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('content', ['faq']),
  },
  components: {
    FeedbackForm,
  },
};
</script>

<style lang="stylus" scoped>
.feedback
  max-width: 500px
  margin-left: auto
  margin-right: auto
  border: 1px solid lightgrey
</style>
