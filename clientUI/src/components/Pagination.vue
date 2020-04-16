<template>
  <div class="pagination">
    <button :disabled="page - 1 < 1" @click="prevPage">&laquo;</button>
    <select @change="fetchMore(page)" v-model="page">
      <option v-for="index in totalPages" :key="index" :value="index">{{ index }}</option>
    </select>
    <button :disabled="page + 1 > totalPages" @click="nextPage(page)">&raquo;</button>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  data() {
    return {
      page: 1,
      pageSize: 10
    };
  },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalItems: {
      type: Number,
      required: true
    }
  },

  methods: {
    fetchMore(currentPage) {
      this.$emit("fetch-more", { currentPage, pageSize: this.pageSize });
    },
    nextPage: function() {
      this.page += 1;
      this.fetchMore(this.page);
    },
    prevPage: function() {
      this.page -= 1;
      this.fetchMore(this.page);
    },
    resetPage: function() {

    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    }
  }
};
</script>
<style scoped>
.pagination button {
  padding: 8px 16px;
  text-decoration: none;
  border: none;
  outline: none;
}

.pagination {
  display: flex;
  padding-top: 5px;
}
</style>