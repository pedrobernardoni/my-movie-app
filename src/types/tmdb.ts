/** Fields used from TMDB trending/list responses in the UI */
export type TrendingMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average: number;
};
