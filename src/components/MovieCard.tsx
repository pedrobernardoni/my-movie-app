// Importando módulos nativos do Next.js para uso de imagens e links
import Image from 'next/image';
import Link from 'next/link';

export default function MovieCard({ movie }: { movie: any}) {
    return (
        <Link href={`/movie/${movie.id}`} className="group block overflow-hidden rounded-xl bg-zinc-900 transition-all hover:scale-105">
            <div className="relative aspect-[2/3] w-full">
                <Image 
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="truncate font-medium text-white">{movie.title}</h3>
                <p className="text-sm text-zinc-400">{movie.release_date?.split('-')[0]}</p>
                <p className="text-sm text-zinc-400">{movie.vote_average.toFixed(1)}</p>
            </div>
        </Link>
    )
}