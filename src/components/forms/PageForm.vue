<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <q-input
      dense
      outlined
      :value="page.text_id"
      :hint="$t('text_id')"
      class="text-right"
      :rules="[
        val => !!val || $t('required_field'),
      ]"
      lazy-rules
      @change="onChange('text_id', $event.target.value)"
    />
    <q-select
      dense
      outlined
      :hint="$t('type')"
      :options="options"
      v-model="page.type"
      :rules="[
        val => !!val || $t('required_field'),
      ]"
      lazy-rules
      @change="onChange($event.target.value)"
    />
    <!-- <q-select
      dense
      outlined
      :hint="$t('category')"
      :options="categories"
      v-model="page.category"
      :rules="[
        val => !!val || $t('required_field'),
      ]"
      lazy-rules
      @change="onChange($event.target.value)"
    /> -->
    <q-input
      dense
      outlined
      :value="page.title"
      :hint="$t('title')"
      class="text-right"
      :rules="[
        val => !!val || $t('required_field'),
      ]"
      lazy-rules
      @change="onChange('title', $event.target.value)"
    />
    <q-input
      dense
      outlined
      type="textarea"
      :value="page.description"
      :hint="$t('description')"
      class="text-right"
      :rules="[
        val => !!val || $t('required_field'),
      ]"
      lazy-rules
      @change="onChange('description', $event.target.value)"
    />
    <q-input
      dense
      outlined
      type="textarea"
      :value="page.content"
      :hint="$t('content')"
      class="text-right"
      :rules="[
        val => !!val || $t('required_field'),
      ]"
      lazy-rules
      @change="onChange('content', $event.target.value)"
    />
    <q-checkbox
      v-model="page.active"
      :label="$t('active')"
      @change="onChange('active', $event.target.value)"
    />
    <div class="row">
      <q-btn
        color="primary"
        size="sm"
        type="submit"
        :label="buttonText"
      />
    </div>
  </q-form>
</template>

<script>
// import { mapState } from 'vuex';
export default {
  name: 'PageForm',
  data() {
    return {
      options: [
        'SERVICE', 'INFO', 'FAQ',
      ],
      // categories: ['1', '2', '3'],
    };
  },
  props: {
    page: {
      type: Object,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
    buttonText: {
      type: String,
      default: 'Save',
    },
  },
  methods: {
    onChange(prop, newValue) {
      const newData = Object.assign({}, this.page);
      newData[prop] = prop === 'text_id' ? newValue : newValue;

      this.$emit('change', newData);
    },
  },
  // async mounted() {
  //   this.$store.dispatch('content/getCategories');
  // },
  // computed: {
  //   ...mapState('content', ['pages']),
  // },
};
</script>
