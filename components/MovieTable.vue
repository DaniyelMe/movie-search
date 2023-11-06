<template>
  <div class="flex flex-col">
    <table class="min-w-full divide-y p-32">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column"
            @click="sortBy(column)"
            class="px-6 py-3 text-left cursor-pointer select-none"
            :class="{ 'border-r': column === 'Title' }"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y">
        <template v-if="sortedMovies.length">
          <tr v-for="movie in sortedMovies" :key="movie.Title + movie.Year">
            <td class="px-6 border-r py-4 w-2/3">{{ movie.Title }}</td>
            <td class="px-6 py-4 w-1/3">{{ movie.Year }}</td>
          </tr>
        </template>
        <tr v-else>
          <td class="px-6 py-4 text-center text-gray-500 w-2/3"></td>
          <td class="px-6 py-4 text-center text-gray-500 w-1/3"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

type Column = 'Title' | 'Year';

const props = defineProps<{ movies: Movie[] | [] }>();

const columns = ref<Column[]>(['Title', 'Year']);
const sortKey = ref<Column | ''>('');
const reverse = ref<boolean>(false);

const sortedMovies = computed(() => {
  return props.movies.slice().sort((a, b) => {
    if (!sortKey.value) return 0;

    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];

    if (reverse.value) {
      return aValue === bValue ? 0 : aValue > bValue ? -1 : 1;
    } else {
      return aValue === bValue ? 0 : aValue < bValue ? -1 : 1;
    }
  });
});

function sortBy(key: Column) {
  if (sortKey.value === key) {
    reverse.value = !reverse.value;
  } else {
    reverse.value = false;
    sortKey.value = key;
  }
}
</script>
