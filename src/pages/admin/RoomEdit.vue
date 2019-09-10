<template>
  <q-page padding>
    <template v-if="currentRoom">
      <h1 class="text-h5" v-text="$t('edit_room')"/>
      <room-form
        :room="currentRoom"
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
      'rooms',
    ]),
    currentRoom() {
      return this.rooms[this.$attrs.id];
    },
  },
  methods: {
    onChange(newRoom) {
      this.$store.commit('rooms/setRoom', {
        room: newRoom,
      });
    },
    editRoom() {
      const room = Object.assign({}, this.currentRoom, {
        created_at: undefined,
        updated_at: undefined,
        id: undefined,
      });

      this.$store.dispatch('rooms/editRoom', room)
        .then(() => this.$router.push({ name: 'admin-services' }))
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

<style scoped>

</style>
