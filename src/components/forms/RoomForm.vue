<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <q-input
      dense
      outlined
      :value="room.number"
      :hint="$t('room_number')"
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
      :value="room.description"
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
      :value="room.price"
      :hint="$t('price')"
      class="text-right"
      :rules="[
        val => !!val || $t('required_field'),
      ]"
      lazy-rules
      @change="onChange('price', $event.target.value)"
    />
    <q-checkbox
      :value="room.active"
      :label="$t('active')"
      @input="onChange('active', $event)"
    />
    <q-select
      dense
      outlined
      :hint="$t('housing')"
      :options="housingsOptions"
      :value="room.housing"
      :rules="[
        val => !!val || $t('required_field'),
      ]"
      lazy-rules
      @filter="getHousings"
      @input="onChange('housing', $event)"
    />
    <q-input
      dense
      outlined
      :value="room.capacity"
      :hint="$t('capacity')"
      class="text-right"
      :rules="[
        val => !!val || $t('required_field'),
      ]"
      lazy-rules
      @change="onChange('capacity', $event.target.value)"
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
  name: 'RoomForm',
  data() {
    return {
      housingsOptions: null,
    };
  },
  computed: {
    ...mapState('rooms', ['housings']),
  },
  props: {
    room: {
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
      const newData = Object.assign({}, this.room);
      newData[prop] = newValue;

      this.$emit('change', newData);
    },
    getHousings(val, update) {
      if (this.housingsOptions !== null) {
        update();

        return;
      }

      this.$store.dispatch('rooms/getHousings')
        .then(() => {
          update(() => {
            this.housingsOptions = this.housings.map(c => c.id);
          });
        });
    },
  },
};
</script>
