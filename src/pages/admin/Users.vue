<template>
  <q-page padding>
    <q-table
      :title="$t('users')"
      :rows-per-page-label="$t('entries_by_page')"
      :data="users"
      :columns="columns"
      :loading="loading"
      :rows-per-page-options="[10, 20, 50]"
      :pagination.sync="pagination"
      row-key="id"
      @request="onRequest"
    />
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { formatMixin } from 'components/helpers/mixins';

export default {
  name: 'AdminUsers',
  mixins: [formatMixin],
  preFetch({ store }) {
    return store.dispatch('user/getUsers', {
      limit: 10,
      orderBy: 'id',
      order: 'asc',
    });
  },
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
          name: 'first_name',
          required: true,
          field: 'first_name',
          label: this.$t('name'),
          align: 'left',
          sortable: true,
        },
        {
          name: 'second_name',
          required: true,
          field: 'second_name',
          label: this.$t('second_name'),
          align: 'left',
          sortable: true,
        },
        {
          name: 'email',
          required: true,
          field: 'email',
          label: 'E-mail',
          align: 'left',
          sortable: true,
        },
        {
          name: 'phone_number',
          required: true,
          field: 'phone_number',
          label: this.$t('phone'),
          align: 'left',
          format: val => this.formatPhone(val),
          sortable: true,
        },
        {
          name: 'created_at',
          required: true,
          field: 'created_at',
          label: this.$t('registration_date'),
          align: 'left',
          format: val => this.formatDate(val),
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapState('user', [
      'users',
      'usersTotal',
    ]),
  },
  methods: {
    onRequest(props) {
      this.loading = true;
      this.pagination.page = props.pagination.page;
      this.pagination.rowsPerPage = props.pagination.rowsPerPage;
      this.pagination.sortBy = props.pagination.sortBy;
      this.pagination.descending = props.pagination.descending;
      this.getUsers();
    },
    getUsers() {
      this.$store.dispatch('user/getUsers', {
        limit: this.pagination.rowsPerPage,
        offset: this.pagination.rowsPerPage * (this.pagination.page - 1),
        orderBy: this.pagination.sortBy || 'id',
        order: this.pagination.descending ? 'desc' : 'asc',
      })
        .then(() => {
          this.loading = false;
          this.pagination.rowsNumber = this.usersTotal;
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
};
</script>
