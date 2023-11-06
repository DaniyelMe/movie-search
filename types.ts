type Movie = {
  Title: string;
  Year: number;
  imdbID: string;
};

type MoviesApiResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Movie[];
};
