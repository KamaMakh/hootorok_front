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
      :options="options"
      v-model="page.type"
      :rules="[
        val => !!val || $t('required_field'),
      ]"
      lazy-rules
      @change="onChange($event.target.value)"
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
export default {
  name: 'PageForm',
  data() {
    return {
      options: [
        'SERVICE', 'INFO', 'FAQ',
      ],
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
    isValidString(textId) {
      if (/^[a-z0-9_-]+$/i.test(textId)) {
        return true;
      }
      return false;
    },
  },
};
</script>
