<template>
  <q-card
    flat
    square
    class="card-link"
  >
    <router-link
      class="text-h6 q-py-sm block standard-link text-default"
      :to="{
        name: 'room',
        params: { id: room.id },
      }"
      v-text="`${$t('room_number')} ${room.id}`"
    />
    <q-img
      basic
      :src="room.main_image"
      :ratio="16/9"
      @click="emitShowPhotos"
      class="cursor-pointer"
    >
      <q-tooltip>{{ $t('see_all_room_photos') }}</q-tooltip>
    </q-img>
    <q-separator class="q-my-sm"/>
    <div class="row justify-between text-body2 text-bold">
      <div v-text="`${room.price} ${$t('rur/night')}`"/>
      <div v-text="`${room.capacity} ${$t('man')}`"/>
    </div>
    <div class="row no-wrap q-mt-md items-center justify-between">
      <div class="text-body2" v-text="room.description"/>
      <q-btn
        flat
        color="grey"
        class="justify-center items-center"
        :to="{
          name: 'room',
          params: { id: room.id },
        }"
      >
        <q-icon name="arrow_forward_ios" style="font-size: 14px;"/>
      </q-btn>
    </div>
    <slot name="actions"/>
  </q-card>
</template>

<script>
export default {
  name: 'RoomCard',
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitShowPhotos() {
      this.$emit('show-photos', this.room.content_images);
    },
  },
};
</script>
