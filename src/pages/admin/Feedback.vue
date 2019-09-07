<template>
  <q-page padding>
    <q-table
      :title="$t('feedback')"
      :rows-per-page-label="$t('entries_by_page')"
      :data="allMessages"
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
          <q-td key="name" :props="props" v-text="props.row.name"/>
          <q-td key="email" :props="props" v-text="props.row.email"/>
          <q-td key="phone" :props="props" v-text="props.row.phone"/>
          <q-td key="actions">
            <div class="row justify-center">
              <q-btn
                size="sm"
                class="q-ma-sm"
                color="blue"
                :label="$t('watch')"
                @click="lookFeedback(props)"
                />
                <q-btn
                round
                size="sm"
                class="q-ma-sm"
                color="red"
                icon="close"
                @click="confirm(props.row.id)"
                />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="icon">
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">{{ oneFeedback.name }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          {{ oneFeedback.message }}
        </q-card-section>

        <q-card-section class="items-center">
          <div class="text-body2"> {{ oneFeedback.phone }}</div>
          <div class="text-body2">{{ oneFeedback.email }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AdminFeedback',
  data() {
    return {
      oneFeedback: {},
      icon: false,
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
          name: 'name',
          required: true,
          field: 'name',
          label: this.$t('name'),
          align: 'center',
          sortable: true,
        },
        {
          name: 'email',
          required: true,
          field: 'email',
          label: 'E-mail',
          align: 'center',
          sortable: true,
        },
        {
          name: 'phone',
          required: true,
          field: 'phone',
          label: this.$t('phone'),
          align: 'center',
          sortable: true,
        },
        {
          name: 'actions',
          required: true,
          field: 'actions',
          label: this.$t('actions'),
          align: 'center',
        },
      ],
    };
  },
  computed: {
    ...mapState('content', [
      'allMessages',
      'allMessagesTotal',
    ]),
  },
  async mounted() {
    this.getAllMessages();
  },
  methods: {
    lookFeedback(props) {
      this.icon = true;
      this.oneFeedback.name = props.row.name;
      this.oneFeedback.email = props.row.email;
      this.oneFeedback.phone = props.row.phone;
      this.oneFeedback.message = props.row.message;
    },
    onRequest(props) {
      this.loading = true;
      this.pagination.page = props.pagination.page;
      this.pagination.rowsPerPage = props.pagination.rowsPerPage;
      this.pagination.sortBy = props.pagination.sortBy;
      this.pagination.descending = props.pagination.descending;
      this.getAllMessages();
    },
    confirm(id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to turn on the wifi?',
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          this.deleteMessage(id);
        });
    },
    getAllMessages() {
      this.$store.dispatch('content/getAllMessages', {
        limit: this.pagination.rowsPerPage,
        offset: this.pagination.rowsPerPage * (this.pagination.page - 1),
        orderBy: this.pagination.sortBy || 'id',
        order: this.pagination.descending ? 'desc' : 'asc',
      }).then(() => {
        this.loading = false;
        this.pagination.rowsNumber = this.allMessagesTotal;
      });
    },
    deleteMessage(id) {
      this.$store.dispatch('admin/deleteMessage', {
        id,
      }).then(() => {
        this.loading = true;
        this.getAllMessages();
      });
    },
  },
};
</script>
