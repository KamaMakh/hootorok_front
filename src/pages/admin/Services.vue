<template>
  <q-page padding>
    <q-table
      :title="$t('services')"
      :rows-per-page-label="$t('entries_by_page')"
      :data="services"
      :columns="columns"
      :loading="loading"
      :rows-per-page-options="[10, 20, 50]"
      :pagination="pagination"
      row-key="id"
      @request="onRequest"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="title" :props="props" v-text="props.row.title"/>
          <q-td key="text_id" :props="props" v-text="props.row.text_id"/>
          <q-td
            key="description"
            :props="props"
            v-text="props.row.description"
          />
          <q-td key="main_image" :props="props">
            <img
              :src="props.row.main_image"
              @click="showImage = true"
              style="height: 100px; cursor: pointer"
            />
            <q-dialog v-model="showImage">
              <q-card>
                <q-card-section class="row items-center">
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-card-section>
                  <img :src="props.row.main_image" alt="">
                </q-card-section>
              </q-card>
            </q-dialog>
          </q-td>
          <q-td key="active"
            :props="props"
            :v-if="props.row.active"
          >
            <div class="row justify-center">
              <q-icon name="done" size="24px" color="primary"></q-icon>
            </div>
          </q-td>
          <q-td key="edit">
            <div class="row justify-center">
              <q-btn
                size="sm"
                color="orange"
                :label="$t('edit')"
                :to="{
                  name: 'edit-service',
                  params: { id: props.row.text_id },
                }"/>
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
        :to="{ name: 'add-service' }"
      />
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AdminServices',
  data() {
    return {
      showImage: false,
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
          label: this.$t('service_name'),
          align: 'left',
          sortable: true,
        },
        {
          name: 'text_id',
          required: true,
          field: 'text_id',
          label: this.$t('id'),
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
      'services',
      'servicesTotal',
    ]),
  },
  mounted() {
    this.getServices();
  },
  methods: {
    onRequest(props) {
      this.loading = true;
      this.pagination.page = props.pagination.page;
      this.pagination.rowsPerPage = props.pagination.rowsPerPage;
      this.pagination.sortBy = props.pagination.sortBy;
      this.pagination.descending = props.pagination.descending;
      this.getServices();
    },
    getServices() {
      this.$store.dispatch('content/getAllServices', {
        limit: this.pagination.rowsPerPage,
        offset: this.pagination.rowsPerPage * (this.pagination.page - 1),
        orderBy: this.pagination.sortBy || 'id',
        order: this.pagination.descending ? 'desc' : 'asc',
      }).then(() => {
        this.loading = false;
        this.pagination.rowsNumber = this.servicesTotal;
      });
    },
  },
};
</script>
