<template>
  <q-page padding>
    <q-table
      :title="$t('faq')"
      :data="faq"
      :columns="columns"
      :loading="loading"
      :rows-per-page-options="['all']"
      :pagination.sync="pagination"
      hide-bottom
      row-key="id"
      @request="onRequest"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            key="title"
            :props="props"
            v-text="props.row.faq[0].title"
            style="white-space: normal;"
          />
          <q-td
            key="text_id"
            :props="props"
            v-text="props.row.faq[0].text_id"
          />
          <q-td
            key="description"
            :props="props"
            v-text="props.row.faq[0].description"
          />
          <q-td
            key="active"
            :props="props"
          >
            <q-icon
              :name="props.row.active ? 'done' : 'close'"
              :color="props.row.active ? 'positive' : 'negative'"
            />
          </q-td>
          <q-td key="edit">
            <div class="row justify-center">
              <q-btn
                size="sm"
                color="orange"
                :label="$t('edit')"
                :to="{
                  name: 'edit-page',
                  params: { id: props.row.faq[0].text_id },
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
        :to="{ name: 'add-page' }"
      />
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AdminFAQ',
  preFetch({ store }) {
    return store.dispatch('content/getFAQ', {
      orderBy: 'id',
      order: 'asc',
    });
  },
  data() {
    return {
      showImage: false,
      loading: false,
      pagination: {
        sortBy: 'id',
        descending: false,
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
          name: 'text_id',
          required: true,
          field: 'text_id',
          label: this.$t('text_id'),
          align: 'left',
          sortable: true,
        },
        {
          name: 'description',
          required: true,
          field: 'description',
          label: this.$t('description'),
          align: 'left',
          sortable: true,
        },
        {
          name: 'active',
          required: true,
          field: 'active',
          label: this.$t('active'),
          align: 'center',
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
      'faq',
    ]),
  },
  methods: {
    onRequest(props) {
      this.loading = true;
      this.pagination.sortBy = props.pagination.sortBy;
      this.pagination.descending = props.pagination.descending;
      this.getFAQ();
    },
    getFAQ() {
      this.$store.dispatch('content/getFAQ', {
        orderBy: this.pagination.sortBy || 'id',
        order: this.pagination.descending ? 'desc' : 'asc',
      })
        .then(() => {
          this.loading = false;
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
