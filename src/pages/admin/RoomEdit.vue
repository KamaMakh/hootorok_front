<template>
  <q-page padding>
    <template v-if="room">
      <h1 class="text-h5" v-text="$t('edit_room')"/>
      <room-form
        :room="room"
        :onSubmit="editRoom"
        :button-text="$t('edit')"
        @change="onChange"
        class="q-mt-md"
      />
    </template>
    <template v-else>
      <div class="text-caption text-center" v-text="$t('not_found')"/>
    </template>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import RoomForm from 'components/forms/RoomForm.vue';

export default {
  name: 'RoomEdit',
  preFetch({ store, currentRoute }) {
    return store.dispatch('rooms/getRoom', currentRoute.params.id);
  },
  computed: {
    ...mapState('rooms', [
      'room',
      'rooms',
    ]),
  },
  methods: {
    onChange(newRoom) {
      this.$store.commit('rooms/setRoom', newRoom);
    },
    editRoom() {
      const room = Object.assign({}, this.room, {
        created_at: undefined,
        updated_at: undefined,
      });

      this.$store.dispatch('rooms/editRoom', room)
        .then(() => this.$router.push({ name: 'admin-rooms' }))
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
