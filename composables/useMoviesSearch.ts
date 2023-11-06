import { ref } from "vue";

export function useMoviesSearch() {
  const searchTerm = ref("");
  const page = ref(1);

  const { data, pending, error, refresh } = useFetch<MoviesApiResponse>(
    () =>
      searchTerm.value &&
      `https://jsonmock.hackerrank.com/api/movies/search/?Title=${searchTerm.value}&page=${page.value}`,
    {
      key: `movies-search-${searchTerm.value}`, // Cache key
    }
  );

  function setSearchTerm(term: string) {
    searchTerm.value = term;
  }

  function setPage(pageNumber: number) {
    page.value = pageNumber;
  }

  return {
    searchTerm,
    setSearchTerm,
    setPage,
    searchResults: data,
    isLoading: pending,
    error,
  };
}
