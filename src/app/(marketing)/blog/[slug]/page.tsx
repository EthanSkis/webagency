import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { posts, getPost } from "@/content/blog";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  return { title: p?.title ?? "Post", description: p?.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="container max-w-3xl py-16">
      <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
        ← All posts
      </Link>

      <header className="mt-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.tags.join(", ")}</span>
        </div>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
      </header>

      {post.cover && (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border">
          <Image src={post.cover} alt={post.title} fill className="object-cover" priority />
        </div>
      )}

      <div className="prose prose-neutral mt-10 max-w-none whitespace-pre-wrap dark:prose-invert">
        {post.content}
      </div>
    </article>
  );
}
