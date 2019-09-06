<template>
  <q-page padding>
    <q-table
      :title="$t('housing_facilities')"
      :rows-per-page-label="$t('entries_by_page')"
      :data="housings"
      :columns="columns"
      :loading="loading"
      :rows-per-page-options="[10, 20, 50]"
      :pagination="pagination"
      row-key="id"
      @request="onRequest"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props" v-text="props.row.id"/>
          <q-td key="title" :props="props" v-text="props.row.title"/>
          <q-td key="number" :props="props" v-text="props.row.number"/>
          <q-td
            key="description"
            :props="props"
            style="white-space: normal"
            v-text="props.row.description"
          />
          <q-td key="edit">
            <q-btn
              size="sm"
              color="orange"
              :label="$t('edit')"
              :to="{
                name: 'edit-housing',
                params: { id: props.row.id },
              }"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="q-ma-md flex justify-center">
      <q-btn
        size="sm"
        color="positive"
        :label="$t('add')"
        :to="{ name: 'add-housing' }"
      />
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AdminHousings',
  data() {
    return {
      image: false,
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
          name: 'title',
          required: true,
          field: 'title',
          label: this.$t('title'),
          align: 'left',
          sortable: true,
        },
        {
          name: 'number',
          required: true,
          field: 'number',
          label: this.$t('number'),
          align: 'left',
          sortable: true,
        },
        {
          name: 'description',
          required: true,
          field: 'description',
          label: this.$t('description'),
          align: 'left',
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
      'housings',
      'housingsTotal',
    ]),
  },
  async mounted() {
    this.getHousings();
  },
  methods: {
    onRequest(props) {
      this.loading = true;
      this.pagination.page = props.pagination.page;
      this.pagination.rowsPerPage = props.pagination.rowsPerPage;
      this.pagination.sortBy = props.pagination.sortBy;
      this.pagination.descending = props.pagination.descending;
      this.getHousings();
    },
    getHousings() {
      this.$store.dispatch('rooms/getHousings', {
        limit: this.pagination.rowsPerPage,
        offset: this.pagination.rowsPerPage * (this.pagination.page - 1),
        orderBy: this.pagination.sortBy || 'id',
        order: this.pagination.descending ? 'desc' : 'asc',
      }).then(() => {
        this.loading = false;
        this.pagination.rowsNumber = this.housingsTotal;
      });
    },
  },
};
</script>
