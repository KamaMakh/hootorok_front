<template>
  <q-page padding>
    <q-table
      :title="$t('users')"
      :rows-per-page-label="$t('entries_by_page')"
      :data="rooms"
      :columns="columns"
      :loading="loading"
      :rows-per-page-options="[10, 20, 50]"
      :pagination="pagination"
      row-key="id"
      @request="onRequest"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="number" :props="props">{{ props.row.number }}</q-td>
          <q-td key="housing" :props="props">{{ props.row.housing }}</q-td>
          <q-td key="capacity" :props="props">{{ props.row.capacity }}</q-td>
          <q-td key="main_image" :props="props">{{ props.row.main_image }}</q-td>
          <q-td key="price" :props="props">{{ props.row.price }}</q-td>
          <q-td key="edit" auto-width>
            <q-btn flat :label="$t('edit')" :to="`/admin/rooms/${props.row.id}/edit`"/>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="q-ma-md flex justify-center">
      <q-btn :label="$t('add')" to="/admin/rooms/add" />
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AdminRooms',
  data() {
    return {
      loading: false,
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: null,
      },
      columns: [
        {
          name: 'id',
          required: true,
          field: 'id',
          label: 'id',
          align: 'left',
          sortable: true,

        },
        {
          name: 'number',
          required: true,
          field: 'number',
          label: this.$t('room_number'),
          align: 'left',
          sortable: true,
        },
        {
          name: 'housing',
          required: true,
          field: 'housing',
          label: this.$t('housing'),
          align: 'left',
          sortable: true,
        },
        {
          name: 'capacity',
          required: true,
          field: 'capacity',
          label: this.$t('capacity'),
          align: 'left',
          sortable: true,
        },
        {
          name: 'main_image',
          required: true,
          field: 'main_image',
          label: this.$t('photo'),
          align: 'left',
        },
        {
          name: 'price',
          required: true,
          field: 'price',
          label: this.$t('price_per_day'),
          align: 'left',
          sortable: true,
        },
        {
          name: 'edit',
          required: true,
          field: 'edit',
          label: this.$t('edit'),
          align: 'center',
        },
      ],
    };
  },
  computed: {
    ...mapState('rooms', [
      'rooms',
      'roomsTotal',
    ]),
  },
  async mounted() {
    this.getRooms();
  },
  methods: {
    onRequest(props) {
      this.loading = true;
      this.pagination.page = props.pagination.page;
      this.pagination.rowsPerPage = props.pagination.rowsPerPage;
      this.pagination.sortBy = props.pagination.sortBy;
      this.pagination.descending = props.pagination.descending;
      this.getRooms();
    },
    getRooms() {
      this.$store.dispatch('rooms/getRooms', {
        limit: this.pagination.rowsPerPage,
        offset: this.pagination.rowsPerPage * (this.pagination.page - 1),
        orderBy: this.pagination.sortBy || 'id',
        order: this.pagination.descending ? 'DESC' : 'ASC',
      }).then(() => {
        this.loading = false;
        this.pagination.rowsNumber = this.roomsTotal;
      });
    },
  },
};
</script>
