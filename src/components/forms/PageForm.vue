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
        val => isValidString(page.text_id) || $t('correct_string_message')
      ]"
      lazy-rules
      @change="onChange('text_id', $event.target.value)"
    />
    <q-select
      dense
      outlined
      :hint="$t('type')"
      :options="typeOptions"
      :value="computedType"
      :rules="[
        val => !!val || $t('required_field'),
      ]"
      lazy-rules
      :readonly="readonlyType"
      @input="onChange('type', $event)"
    />
    <q-select
      dense
      outlined
      :hint="$t('category')"
      :options="categoriesOptions"
      :value="page.category"
      :rules="[
        val => !!val || $t('required_field'),
      ]"
      lazy-rules
      @filter="getCategories"
      @input="onChange('category', $event)"
    />
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
      :value="page.active"
      :label="$t('active')"
      @input="onChange('active', $event)"
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
import { mapState } from 'vuex';

export default {
  name: 'PageForm',
  data() {
    return {
      typeOptions: [
        'SERVICE', 'INFO', 'FAQ',
      ],
      categoriesOptions: null,
    };
  },
  computed: {
    ...mapState('content', ['categories']),
    computedType() {
      if (this.page.id) return this.page.type;

      return this.$route.query.type || this.page.type;
    },
    readonlyType() {
      return Boolean(this.page.id) || Boolean(this.$route.query.type);
    },
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
      newData[prop] = newValue;

      this.$emit('change', newData);
    },
    isValidString(textId) {
      return Boolean(/^[a-z0-9_-]+$/i.test(textId));
    },
    getCategories(val, update) {
      if (this.categoriesOptions !== null) {
        update();

        return;
      }

      this.$store.dispatch('content/getCategories')
        .then(() => {
          update(() => {
            this.categoriesOptions = this.categories.map(c => c.id);
          });
        });
    },
  },
};
</script>
