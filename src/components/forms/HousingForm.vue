<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <q-input
      dense
      outlined
      :value="housing.title"
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
      type="number"
      :value="housing.number"
      :hint="$t('number')"
      class="text-right"
      :rules="[
        val => !!val || $t('required_field'),
      ]"
      lazy-rules
      @change="onChange('number', $event.target.value)"
    />
    <q-input
      dense
      outlined
      type="textarea"
      :value="housing.description"
      :hint="$t('description')"
      class="text-right"
      :rules="[
        val => !!val || $t('required_field'),
      ]"
      lazy-rules
      @change="onChange('description', $event.target.value)"
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
  name: 'HousingForm',
  props: {
    housing: {
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
      const newData = Object.assign({}, this.housing);
      newData[prop] = prop === 'number' ? Number(newValue) : newValue;

      this.$emit('change', newData);
    },
  },
};
</script>
