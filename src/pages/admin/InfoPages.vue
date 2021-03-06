<template>
  <q-page padding>
    <q-table
      wrap-cells
      :title="$t('info_pages')"
      :rows-per-page-label="$t('entries_by_page')"
      :data="infoPages"
      :columns="columns"
      :loading="loading"
      :rows-per-page-options="[10, 20, 50]"
      :pagination.sync="pagination"
      row-key="id"
      @request="onRequest"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props" v-text="props.row.id"/>
          <q-td key="title" :props="props" v-text="props.row.title"/>
          <q-td
            key="text_id"
            :props="props"
            v-text="props.row.text_id"
            style="width: 200px;"
          />
          <q-td
            key="description"
            :props="props"
            v-text="props.row.description"
          />
          <q-td key="main_image" :props="props">
            <q-img
              :src="props.row.main_image"
              style="width: 150px; height: 100px;"
            />
          </q-td>
          <q-td key="active" :props="props">
            <div class="row justify-center">
              <q-icon
                :name="props.row.active ? 'done' : 'close'"
                :color="props.row.active ? 'positive' : 'negative'"
              />
            </div>
          </q-td>
          <q-td key="edit">
            <div class="row justify-center">
              <q-btn
                size="sm"
                color="orange"
                :label="$t('edit')"
                :to="{
                  name: 'edit-page',
                  params: { id: props.row.text_id },
                }"
              />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="q-ma-md flex justify-center">
      <q-btn
        size="sm"
        color="positive"
        :label="$t('add')"
        :to="{
          name: 'add-page',
          query: { type: 'INFO' },
        }"
      />
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AdminInfoPages',
  preFetch({ store }) {
    return store.dispatch('content/getInfoPages', {
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
          name: 'title',
          required: true,
          field: 'title',
          label: this.$t('title'),
          sortable: true,
          align: 'left',
        },
        {
          name: 'text_id',
          required: true,
          field: 'text_id',
          label: this.$t('text_id'),
          align: 'center',
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
          name: 'main_image',
          required: true,
          field: 'main_image',
          label: this.$t('photo'),
          align: 'center',
        },
        {
          name: 'active',
          required: true,
          field: 'active',
          label: this.$t('active'),
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
    ...mapState('content', [
      'infoPages',
      'infoPagesTotal',
    ]),
  },
  methods: {
    onRequest(props) {
      this.loading = true;
      this.pagination.page = props.pagination.page;
      this.pagination.rowsPerPage = props.pagination.rowsPerPage;
      this.pagination.sortBy = props.pagination.sortBy;
      this.pagination.descending = props.pagination.descending;

      this.getAllInfos();
    },
    getAllInfos() {
      this.$store.dispatch('content/getInfoPages', {
        limit: this.pagination.rowsPerPage,
        offset: this.pagination.rowsPerPage * (this.pagination.page - 1),
        orderBy: this.pagination.sortBy || 'id',
        order: this.pagination.descending ? 'desc' : 'asc',
      })
        .then(() => {
          this.loading = false;
          this.pagination.rowsNumber = this.infoPagesTotal;
        });
    },
  },
};
</script>
