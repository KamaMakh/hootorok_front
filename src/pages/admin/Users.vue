<template>
  <q-page padding>
    <q-table
      title="Пользователи"
      rows-per-page-label="Записей на странице"
      :data="users"
      :columns="columns"
      :loading="loading"
      :rows-per-page-options="[10, 20, 50]"
      :pagination="pagination"
      row-key="name"
      @request="onRequest"
    />
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AdminUsers',
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
          label: 'Имя',
          align: 'left',
          sortable: true,
        },
        {
          name: 'second_name',
          required: true,
          field: 'second_name',
          label: 'Фамилия',
          align: 'left',
          sortable: true,
        },
        {
          name: 'email',
          required: true,
          field: 'email',
          label: 'email',
          align: 'left',
          sortable: true,
        },
        {
          name: 'phone_number',
          required: true,
          field: 'phone_number',
          label: 'Номер телефона',
          align: 'left',
          format: val => this.formatPhone(val),
          sortable: true,
        },
        {
          name: 'created_at',
          required: true,
          field: 'created_at',
          label: 'Дата создания',
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
  async mounted() {
    this.getUsers();
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
      this.$store.dispatch('user/getAllUsers', {
        limit: this.pagination.rowsPerPage,
        offset: this.pagination.rowsPerPage * (this.pagination.page - 1),
        orderBy: this.pagination.sortBy || 'id',
        order: this.pagination.descending ? 'desc' : 'asc',
      }).then(() => {
        this.loading = false;
        this.pagination.rowsNumber = this.usersTotal;
      });
    },
    formatPhone(phone) {
      return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1-($2)-$3-$4-$5');
    },
    formatDate(dateTime) {
      const date = new Date(dateTime * 1000);
      const format = num => (num < 10 ? `0${num}` : num);
      const day = format(date.getDate());
      const month = format(date.getMonth() + 1);
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
    },
  },
};
</script>
