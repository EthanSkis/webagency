import Link from "next/link";
import Image from "next/image";
import { posts } from "@/content/blog";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Blog" };

export default function BlogIndexPage() {
  return (
    <div className="container py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-accent">Blog</p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">Notes from the studio.</h1>
        <p className="mt-4 text-muted-foreground">
          Process, code, design, and the occasional opinion.
        </p>
      </header>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            {p.cover && (
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            )}
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatDate(p.publishedAt)}</span>
                <span>·</span>
                <span>{p.tags.join(", ")}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold leading-tight">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
