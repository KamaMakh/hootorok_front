<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <q-input
      dense
      outlined
      :value="news.title"
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
      :value="news.description"
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
      :value="news.content"
      :hint="$t('content')"
      class="text-right"
      :rules="[
        val => !!val || $t('required_field'),
      ]"
      lazy-rules
      @change="onChange('content', $event.target.value)"
    />
    <q-checkbox
      :value="news.repost"
      :label="$t('repost')"
      @input="onChange('repost', $event)"
    />
    <q-input
      dense
      outlined
      type="number"
      :value="news.period"
      :hint="$t('periodic')"
      class="text-right"
      min="1"
      @change="onChange('period', $event.target.value)"
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
  name: 'NewsForm',
  props: {
    news: {
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
      const newData = Object.assign({}, this.news);
      newData[prop] = prop === 'period' ? Number(newValue) : newValue;

      this.$emit('change', newData);
    },
  },
};
</script>
