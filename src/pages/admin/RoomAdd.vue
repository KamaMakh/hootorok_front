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
        number: undefined,
        description: '',
        // TODO: remove temp main_image value
        main_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrPDZHgrGKsCE4a4ABzZxX_cTC_DBR-XsxSmTdt6ZIPGzTGa_aaA',
        content_images: [],
        price: undefined,
        active: true,
        housing: undefined,
        capacity: undefined,
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
          this.$router.push({ name: 'admin-rooms' });
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
