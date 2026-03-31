// app/page.tsx
import MovieCard from '@/components/MovieCard';
import Image from 'next/image';

async function getTrendingMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 3600 } } // Refreshes the data every hour
  );
  
  if (!res.ok) throw new Error('Failed to fetch movies');
  const data = await res.json();
  return data.results;
}

export default async function HomePage() {
  const movies = await getTrendingMovies();

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
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </main>
  );
}