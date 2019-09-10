<template>
  <q-page padding>
    <h1 class="text-h5" v-text="this.$t('add_room')"/>
    <room-form
      :room="room"
      :onSubmit="addRoom"
      :button-text="$t('add')"
      @change="onChange"
      class="q-mt-md"
    />
  </q-page>
</template>

<script>
import RoomForm from 'components/forms/RoomForm.vue';

export default {
  name: 'AddRoom',
  data() {
    return {
      room: {
        number: '',
        description: '',
        main_image: '',
        content_images: [],
        price: '',
        active: '',
        housing: '',
        capacity: '',
      },
    };
  },
  methods: {
    onChange(newRoom) {
      this.room = newRoom;
    },
    addRoom() {
      const room = Object.assign({}, this.room);

      this.$store.dispatch('rooms/addRoom', room)
        .then(() => {
          this.$router.push({ name: 'admin-services' });
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
  components: {
    RoomForm,
  },
};
</script>
