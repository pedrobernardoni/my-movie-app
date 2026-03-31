import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  release_date?: string;
  runtime?: number;
  vote_average: number;
  poster_path?: string | null;
  backdrop_path?: string | null;
  genres?: Array<{ id: number; name: string }>;
};

async function getMovieDetails(id: string): Promise<MovieDetails> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 3600 } }
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return res.json();
}

function formatRuntime(runtime?: number): string {
  if (!runtime) return "-";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  if (!hours) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  return (
    <main className="min-h-screen bg-black text-white">
      {movie.backdrop_path && (
        <div className="relative h-[40vh] w-full">
          <Image
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        </div>
      )}

      <div className="container mx-auto -mt-24 px-6 pb-12 relative z-10">
        <Link
          href="/"
          className="inline-block mb-6 rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-900"
        >
          Back to trending
        </Link>

        <section className="grid gap-8 md:grid-cols-[240px_1fr] md:items-start">
          <div className="relative mx-auto w-[220px] md:w-[240px] aspect-[2/3] overflow-hidden rounded-xl bg-zinc-900">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                No poster available
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold">{movie.title}</h1>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-zinc-300">
              <span className="rounded-full bg-zinc-800 px-3 py-1">
                Rating: {movie.vote_average.toFixed(1)}
              </span>
              <span className="rounded-full bg-zinc-800 px-3 py-1">
                Release: {movie.release_date || "-"}
              </span>
              <span className="rounded-full bg-zinc-800 px-3 py-1">
                Runtime: {formatRuntime(movie.runtime)}
              </span>
            </div>

            {movie.genres?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            ) : null}

            <p className="mt-6 max-w-3xl leading-relaxed text-zinc-200">
              {movie.overview || "No synopsis available for this movie."}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
