import { getSql } from "@/lib/db";
import SubscribeForm from "@/components/SubscribeForm";
import { PageHero, Section, Shell } from "@/components/ui";

export const metadata = { title: "News & Updates" };
export const dynamic = "force-dynamic";

type Post = { id: number; tag: string; title: string; excerpt: string | null; file_url: string | null; created_at: string };

async function getPosts(): Promise<Post[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const sql = getSql();
    const rows = await sql`
      select id, tag, title, excerpt, file_url, created_at
        from posts where published = true order by created_at desc limit 30`;
    return rows as Post[];
  } catch (error) {
    console.error("posts unavailable", error);
    return [];
  }
}

export default async function NewsPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero
        kicker="Insights"
        title="News &amp; updates"
        standfirst="Progress as we build the kitchen, choose the first schools and set the standards we will report against."
      />

      <Section>
        <Shell className="py-20">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id}>
                  <div className="text-[13.5px] font-bold text-gold-700">{post.tag}</div>
                  <h2 className="mt-2 text-[24px] leading-[1.18]">{post.title}</h2>
                  {post.excerpt ? <p className="mt-3 text-[16.5px] leading-[1.6] text-sand-700">{post.excerpt}</p> : null}
                  {post.file_url ? (
                    <a href={post.file_url} className="mt-4 inline-block text-[15px] font-bold">
                      Download the PDF
                    </a>
                  ) : null}
                  <div className="mt-3 text-[13.5px] text-sand-600">
                    {new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-surface p-12 text-center">
              <h2 className="text-[23px] leading-[1.2]">The first pieces go up soon</h2>
              <p className="mx-auto mt-3 max-w-[42ch] text-[16.5px] leading-[1.6] text-sand-800">
                Leave your email and we will send the first one when it is ready.
              </p>
              <div className="mx-auto mt-6 max-w-[440px]">
                <SubscribeForm />
              </div>
            </div>
          )}
        </Shell>
      </Section>
    </>
  );
}
