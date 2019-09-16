<template>
  <q-page padding>
    <q-table
      :title="$t('news_and_campaigns')"
      :rows-per-page-label="$t('entries_by_page')"
      :data="news"
      :columns="columns"
      :loading="loading"
      :rows-per-page-options="[10, 20, 50]"
      :pagination.sync="pagination"
      row-key="id"
      @request="onRequest"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            key="title"
            :props="props"
            v-text="props.row.title"
            style="white-space: normal;"
          />
          <q-td
            key="description"
            :props="props"
            v-text="props.row.description"
            style="white-space: normal;"
          />
          <q-td key="main_image" :props="props">
            <q-img
              :src="props.row.main_image"
              style="width: 150px; height: 100px;"
            />
          </q-td>
          <q-td key="repost" :props="props">
            <q-icon
              :name="props.row.repost ? 'done' : 'close'"
              :color="props.row.repost ? 'positive' : 'negative'"
            />
          </q-td>
          <q-td
            key="period"
            :props="props"
            v-text="props.row.period"
            style="white-space: normal;"
          />
          <q-td
            key="created_at"
            :props="props"
            v-text="formatDate(props.row.created_at)"
          />
          <q-td key="edit">
            <div class="row justify-center">
              <q-btn
                size="sm"
                color="orange"
                :label="$t('edit')"
                :to="{
                  name: 'edit-news',
                  params: { id: props.row.id },
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
        :to="{ name: 'add-news' }"
      />
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { formatMixin } from 'components/helpers/mixins';

export default {
  name: 'AdminNews',
  mixins: [formatMixin],
  preFetch({ store }) {
    return store.dispatch('content/getNews', {
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
        rowsNumber: this.$store.state.content.newsTotal,
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
          name: 'repost',
          required: true,
          field: 'repost',
          sortable: true,
          label: this.$t('repost'),
          align: 'center',
        },
        {
          name: 'period',
          required: true,
          field: 'period',
          sortable: true,
          label: this.$t('periodic'),
          align: 'center',
        },
        {
          name: 'created_at',
          required: true,
          field: 'created_at',
          sortable: true,
          label: this.$t('created_at'),
          align: 'center',
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
      'news',
      'newsTotal',
    ]),
  },
  methods: {
    onRequest(props) {
      this.loading = true;
      this.pagination.page = props.pagination.page;
      this.pagination.rowsPerPage = props.pagination.rowsPerPage;
      this.pagination.sortBy = props.pagination.sortBy;
      this.pagination.descending = props.pagination.descending;

      this.getAllNews();
    },
    getAllNews() {
      this.$store.dispatch('content/getNews', {
        limit: this.pagination.rowsPerPage,
        offset: this.pagination.rowsPerPage * (this.pagination.page - 1),
        orderBy: this.pagination.sortBy || 'id',
        order: this.pagination.descending ? 'desc' : 'asc',
      })
        .then(() => {
          this.loading = false;
          this.pagination.rowsNumber = this.newsTotal;
        });
    },
  },
};
</script>
