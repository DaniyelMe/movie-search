<template>
  <div class="flex flex-col items-center mt-4">
    <nav aria-label="Movie navigation">
      <ul class="inline-flex -space-x-px text-sm">
        <li>
          <BaseButton
            :disabled="currentPage === 1"
            @click="goToPage(page - 1)"
            href="#"
            class="rounded-l-lg"
            >Previous</BaseButton
          >
        </li>

        <li v-for="page in visiblePages" :key="page" @click="goToPage(page)">
          <BaseButton
            class="flex items-center justify-center px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            :class="{
              'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white':
                page === currentPage
            }"
          >
            {{ page }}
          </BaseButton>
        </li>
        <li>
          <BaseButton
            :disabled="currentPage >= totalPages"
            @click="goToPage(page + 1)"
            class="rounded-r-lg"
            >Next
          </BaseButton>
        </li>
      </ul>
    </nav>

    <div
      v-if="totalPages > 0"
      class="block text-sm text-gray-700 dark:text-gray-400"
    >
      <span class="font-semibold text-gray-900">
        {{ currentPage }}
      </span>

      of
      <span class="font-semibold text-gray-900">
        {{ totalPages }}
      </span>

      Total Pages
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseButton from './base/BaseButton.vue';

const props = defineProps<{ totalPages: number; page: number }>();
const emit = defineEmits(['update:page']);

const currentPage = ref(1);

const visiblePages = computed(() => {
  // Calculate the range of pages to display
  let start = currentPage.value - 1;
  let end = currentPage.value + 1;

  // Adjust if at the beginning
  if (currentPage.value === 1) {
    start = 1;
    end = 3;
  }

  // Adjust if at the end
  if (currentPage.value === props.totalPages) {
    start = props.totalPages - 2;
    end = props.totalPages;
  }

  // Make sure the start and end are within the bounds
  start = Math.max(start, 1);
  end = Math.min(end, props.totalPages);

  // Generate the array of page numbers to display
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
});

function goToPage(pageIndex: number) {
  if (pageIndex >= 1 && pageIndex <= props.totalPages) {
    currentPage.value = pageIndex;
    // Emit an event with the new page number for parent component
    emit('update:page', pageIndex);
  }
}

function resetPage() {
  currentPage.value = 1;
  emit('update:page', 1);
}
defineExpose({
  resetPage
});
</script>
