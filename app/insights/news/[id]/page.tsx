import Link from "next/link";
import { notFound } from "next/navigation";
import { getSql } from "@/lib/db";
import { Section, Shell } from "@/components/ui";

export const dynamic = "force-dynamic";

type Post = {
  id: number;
  tag: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  file_url: string | null;
  created_at: string;
};

async function getPost(id: string): Promise<Post | null> {
  if (!process.env.DATABASE_URL) return null;
  const numeric = Number(id);
  if (!Number.isInteger(numeric)) return null;
  try {
    const sql = getSql();
    const rows = await sql`
      select id, tag, title, excerpt, body, file_url, created_at
        from posts where id = ${numeric} and published = true limit 1`;
    return (rows[0] as Post) ?? null;
  } catch (error) {
    console.error("post unavailable", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  return post ? { title: post.title, description: post.excerpt ?? undefined } : { title: "Article" };
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  const paragraphs = (post.body ?? post.excerpt ?? "")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <>
      <Section>
        <Shell className="max-w-[820px] py-20">
          <Link href="/insights/news" className="text-[14px] font-bold uppercase tracking-[0.1em] text-green-700">
            Back to news
          </Link>
          <div className="mt-8 text-[13.5px] font-bold text-gold-700">{post.tag}</div>
          <h1 className="mt-3 max-w-[24ch] text-[clamp(30px,4.4vw,52px)] leading-[1.04]">{post.title}</h1>
          <div className="mt-5 text-[14.5px] text-sand-600">
            {new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </div>

          {post.excerpt ? (
            <p className="mt-10 border-l-[3px] border-gold-400 pl-6 text-[19px] leading-[1.6] text-ink">{post.excerpt}</p>
          ) : null}

          <div className="mt-10">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-6 text-[17.5px] leading-[1.75] text-sand-800 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          {post.file_url ? (
            <a
              href={post.file_url}
              className="mt-10 inline-block rounded-full bg-green-700 px-6 py-3.5 text-[15px] font-bold text-white no-underline"
            >
              Download the PDF
            </a>
          ) : null}
        </Shell>
      </Section>
    </>
  );
}
