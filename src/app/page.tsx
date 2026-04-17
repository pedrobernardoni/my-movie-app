// app/page.tsx
import MovieCard from '@/components/MovieCard';
import Image from 'next/image';
import type { TrendingMovie } from '@/types/tmdb';

type TrendingResult = {
  movies: TrendingMovie[];
  error: 'missing_key' | 'api_error' | null;
};

async function getTrendingMovies(): Promise<TrendingResult> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return { movies: [], error: 'missing_key' };
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return { movies: [], error: 'api_error' };
  }

  const data = (await res.json()) as { results?: TrendingMovie[] };
  return { movies: data.results ?? [], error: null };
}

export default async function HomePage() {
  const { movies, error } = await getTrendingMovies();

  return (
    <main className="min-h-screen bg-black px-6 py-12">
      <header className="mb-12 flex flex-col items-center text-center">
        <div className="flex flex-col max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <Image
            src="/logo.png"
            alt=""
            width={100}
            height={100}
            className="shrink-0 object-contain"
          />
          <h1 className="text-4xl font-extrabold leading-none tracking-tight text-white">
            CinePulse!
          </h1>
        </div>
        <p className="mt-3 text-lg text-gray-500">
          Your daily dose of trending cinema.
        </p>
      </header>
      <div className="container mx-auto">
        {error ? (
          <div
            role="alert"
            className="mx-auto max-w-lg rounded-lg border border-zinc-700 bg-zinc-900/80 px-5 py-4 text-center text-zinc-300"
          >
            <p className="font-medium text-white">
              {error === 'missing_key'
                ? 'TMDB API key is not configured'
                : 'Could not load trending movies'}
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              {error === 'missing_key'
                ? 'Set TMDB_API_KEY in your environment (for example in Vercel Project Settings → Environment Variables), then redeploy.'
                : 'The movie database request failed. Check your API key and try again later.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}