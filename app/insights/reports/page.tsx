import { getSql } from "@/lib/db";
import { PageHero, Quote, Section, Shell } from "@/components/ui";
import { metrics } from "@/content/site";

export const metadata = { title: "Reports & Resources" };
export const dynamic = "force-dynamic";

type Doc = { id: number; title: string; note: string | null; status: string; file_url: string | null };

async function getDocuments(): Promise<Doc[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const sql = getSql();
    const rows = await sql`select id, title, note, status, file_url from documents order by id`;
    return rows as Doc[];
  } catch (error) {
    console.error("documents unavailable", error);
    return [];
  }
}

export default async function ReportsPage() {
  const documents = await getDocuments();

  return (
    <>
      <PageHero
        kicker="Insights"
        title="Reports &amp; resources"
        standfirst="These are the measures we commit to reporting openly, including the ones that disappoint. Figures will be published as the Mogadishu pilot generates them."
      />

      <Section>
        <Shell className="py-20">
          <h2 className="max-w-[26ch] text-[clamp(25px,3vw,36px)] leading-[1.08]">What we will publish</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {metrics.map((metric) => (
              <div key={metric.num} className="flex items-baseline justify-between gap-4 border-b border-divider pb-4">
                <span className="text-[16px] leading-[1.5]">{metric.label}</span>
                <span className="flex-none text-[13px] font-bold uppercase tracking-[0.1em] text-gold-700">{metric.cadence}</span>
              </div>
            ))}
          </div>
          <Quote className="mt-14 text-ink">
            We will publish operating reports quarterly and results annually, with independent review of the evidence
            behind our claims.
          </Quote>
        </Shell>
      </Section>

      <Section tone="surface">
        <Shell className="py-20">
          <h2 className="max-w-[24ch] text-[clamp(25px,3vw,36px)] leading-[1.08]">Documents</h2>
          <p className="mt-4 max-w-[56ch] text-[17px] leading-[1.65] text-sand-800">
            Our first operating report will be published once the pilot is serving meals. Write to us if you need
            something before then.
          </p>
          <div className="mt-10 max-w-[820px] border-t border-divider">
            {documents.map((doc) => (
              <div key={doc.id} className="flex flex-wrap items-baseline justify-between gap-4 border-b border-divider py-6">
                <div>
                  <div className="font-head text-[19px] font-semibold">{doc.title}</div>
                  {doc.note ? <div className="mt-1 text-[15.5px] text-sand-700">{doc.note}</div> : null}
                </div>
                {doc.file_url ? (
                  <a href={doc.file_url} className="text-[14px] font-bold uppercase tracking-[0.1em] text-green-700">
                    Download PDF
                  </a>
                ) : (
                  <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-gold-700">{doc.status}</span>
                )}
              </div>
            ))}
          </div>
        </Shell>
      </Section>
    </>
  );
}
