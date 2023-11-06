<template>
  <div class="px-6 py-3">
    <header>
      <h1 class="text-3xl font-bold">Movies Search</h1>

      <p class="text-gray-600 whitespace-no-wrap">
        Search for any movie you like:
      </p>
    </header>

    <div class="flex justify-start py-3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Type movie name..."
        class="p-2 mx-1 rounded-lg outline"
      />

      <BaseButton @click="handelSetSearchTerm" class="mx-1 rounded-lg">
        Search
      </BaseButton>
    </div>

    <MovieTable
      v-show="searchResultData.page"
      :movies="searchResultData?.data"
      :isLoading="isLoading"
    />

    <PaginationButtons
      v-show="searchResultData.page"
      :page="searchResultData.page"
      :totalPages="searchResultData.total_pages"
      @update:page="setPage"
      ref="paginationRef"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import MovieTable from '~/components/MovieTable.vue';
import PaginationButtons from '~/components/PaginationButtons.vue';
import BaseButton from '~/components/base/BaseButton.vue';

import { useMoviesSearch } from './composables/useMoviesSearch';

const searchQuery = ref('');
const paginationRef = ref();
const { setSearchTerm, setPage, searchTerm, searchResults, isLoading, error } =
  useMoviesSearch();

const searchResultData = computed(() => {
  const { page = 0, total_pages = 0, data = [] } = searchResults.value || {};

  return { page, total_pages, data };
});

function handelSetSearchTerm() {
  if (searchTerm.value == searchQuery.value) {
    return;
  }

  setSearchTerm(searchQuery.value);
  if (paginationRef.value) {
    paginationRef.value.resetPage();
  }
}
</script>
