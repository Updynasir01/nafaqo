// Editable website content: the defaults (taken from content/site.ts and the
// original page copy) and the form the dashboard's page editor is built from.
// Client-safe: no server imports.
import {
  capabilities,
  chain,
  contact,
  faqs,
  financing,
  heroVideoId,
  localValue,
  metrics,
  mission,
  modelNodes,
  operatingStandard,
  outcomes,
  partners,
  phases,
  priorities,
  story,
  valueChain,
  values,
  vision,
  whereWeStart,
} from "@/content/site";

export type Item = Record<string, string>;

function toItems(list: readonly Record<string, unknown>[]): Item[] {
  return list.map((entry) => {
    const item: Item = {};
    for (const [key, value] of Object.entries(entry)) {
      item[key] = Array.isArray(value) ? value.join(", ") : String(value ?? "");
    }
    return item;
  });
}

export const DEFAULTS = {
  // Site-wide
  contactAddress1: String(contact.address[0] ?? ""),
  contactAddress2: String(contact.address[1] ?? ""),
  contactPhone: String(contact.phone ?? ""),
  contactEmail: String(contact.email ?? ""),
  tagline: String(contact.tagline ?? ""),
  footerBlurb: "Building hot school meals for Somali children, cooked in Mogadishu.",
  footerCtaTitle: "A school meal is the cheapest thing we can do for a child\u2019s education.",
  footerStayBody: "We will publish operating reports quarterly and results annually.",

  // Home
  homeVideo: heroVideoId,
  homeHeroTitle: "Nourishing the",
  homeHeroAccent: "Future",
  homeHeroButton: "Explore Our Model",
  homeStatement:
    "Buying, cooking, delivery and checking all sit **in one system we run ourselves** \u2014 which is how a meal stays **safe, the same every day, and cheap enough to grow.**",
  chain: toItems(chain),
  homeModelTitle: "One kitchen. Many schools. One record.",
  homeModelBody: "Meals get lost in the gaps between people. We run one kitchen, many schools, and one record that joins them.",
  homeModelButton: "How it works",
  homeOutcomesTitle: "What a meal changes",
  outcomes: toItems(outcomes),
  workTitle: "Who we work with",
  workBody: "School feeding only works when everyone carries a part of it.",
  workWith: toItems(partners),
  operatingStandard,
  homeCtaPrimary: "Contact Us",
  homeCtaSecondary: "Latest updates",

  // Who we are
  whoKicker: "About us",
  whoTitle: "Who we are",
  whoStandfirst:
    "\u201cNAFAQO\u201d means nourishment in Somali. It reflects a simple conviction: nourishing children today builds the learning, opportunity and stability of tomorrow.",
  whoStoryTitle: "Our story",
  story: [...story],
  vision,
  mission,
  whoStatement:
    "Somalia\u2019s first integrated, centralised school-feeding model \u2014 one accountable system rather than scattered, unconnected arrangements.",
  whoImage: "/assets/photo-serving-line.png",
  whoValuesTitle: "Our Values",
  values: [...values],
  whoWhereTitle: "Where we are starting",
  whereWeStart: [...whereWeStart],
  whoWhereImage: "/assets/photo-serving-queue.png",
  whoFaqTitle: "Questions people ask us",
  faqs: toItems(faqs),
  whoPartnersTitle: "Our partners",
  whoPartnersBody: "The organisations working with us to build the model.",

  // Why Nafaqo
  whyKicker: "Why Nafaqo",
  whyTitle: "Why Nafaqo",
  whyStandfirst:
    "School feeding is not a new idea in Somalia. What has been missing is a single operator accountable for the whole chain \u2014 from the farm to the child, with a record to show for it.",
  whyHoldTitle: "What we hold together",
  capabilities: toItems(capabilities),
  whyCoTitle: "Co-investment, not charity",
  whyCoBody:
    "School feeding is affordable when the cost is shared, and durable when the share moves steadily towards Somali and public sources.",
  financing: toItems(financing),
  whyPublishTitle: "What we will publish",
  whyPublishBody: "These are the measures we commit to reporting openly, including the ones that disappoint.",
  metrics: toItems(metrics),
  whyPublishQuote:
    "We will publish operating reports quarterly and results annually, with independent review of the evidence behind our claims.",
  whyLocalTitle: "Jobs, skills and local value",
  localValue: toItems(localValue),
  valueChain: [...valueChain],

  // How it works
  howKicker: "Our model",
  howTitle: "How it works",
  howStandfirst:
    "One central kitchen serving a network of schools, with a single record connecting what was cooked, what was delivered and which child received it.",
  howHubTitle: "Hub and spoke",
  howHubBody: "Meals get lost in the gaps between people. We run one kitchen, many schools, and one record that joins them.",
  modelNodes: toItems(modelNodes),
  howBuildTitle: "What we are building towards",
  priorities: toItems(priorities),
  phases: toItems(phases),
  howImage: "/assets/photo-dining-hall.png",

  // What we do
  whatKicker: "Our model",
  whatTitle: "What we do",
  whatStandfirst: "Six capabilities that hold each other up. Pick one to read more about how it works in practice.",

  // News
  newsKicker: "Insights",
  newsTitle: "News & updates",
  newsStandfirst: "Progress as we build the kitchen, choose the first schools and set the standards we will report against.",
  newsEmptyTitle: "The first pieces go up soon",
  newsEmptyBody: "Leave your email and we will send the first one when it is ready.",

  // Contact
  contactKicker: "Get in touch",
  contactTitle: "Come and see the kitchen",
  contactStandfirst: "We are in Hodan, Mogadishu. Write to us, call, or drop in.",
  contactFormTitle: "Tell us how you would like to help.",
  contactFormBody: "Messages reach the Nafaqo Kitchen team in Mogadishu directly.",
  contactClosing: "Nourished children. Stronger schools. A more resilient Somalia.",
};

export type Content = typeof DEFAULTS;
export type ContentKey = keyof Content;
export type FieldType = "text" | "textarea" | "image" | "lines" | "list";
export type ItemField = { key: string; label: string; multiline?: boolean };
export type Field = { key: ContentKey; label: string; type: FieldType; help?: string; itemFields?: ItemField[] };
export type PageSchema = { id: string; label: string; path: string; fields: Field[] };

const titleBody: ItemField[] = [
  { key: "title", label: "Title" },
  { key: "body", label: "Text", multiline: true },
];

const hero = (prefix: "who" | "why" | "how" | "what" | "news" | "contact"): Field[] => [
  { key: (prefix + "Kicker") as ContentKey, label: "Small label above the title", type: "text" },
  { key: (prefix + "Title") as ContentKey, label: "Page title", type: "text" },
  { key: (prefix + "Standfirst") as ContentKey, label: "Introduction", type: "textarea" },
];

const work: Field[] = [
  { key: "workTitle", label: "\u201cWho we work with\u201d heading", type: "text", help: "Also shown on the Home page." },
  { key: "workBody", label: "\u201cWho we work with\u201d text", type: "textarea" },
  { key: "workWith", label: "Who we work with \u2014 cards", type: "list", itemFields: titleBody },
];

export const PAGES: PageSchema[] = [
  {
    id: "home",
    label: "Home",
    path: "/",
    fields: [
      { key: "homeVideo", label: "Hero video (YouTube link or ID)", type: "text" },
      { key: "homeHeroTitle", label: "Hero title", type: "text" },
      { key: "homeHeroAccent", label: "Hero title \u2014 gold word", type: "text" },
      { key: "homeHeroButton", label: "Hero button", type: "text" },
      { key: "homeStatement", label: "Statement", type: "textarea", help: "Wrap words in **double stars** to show them darker." },
      { key: "chain", label: "Farm-to-child steps", type: "list", itemFields: [{ key: "label", label: "Step" }, { key: "note", label: "Text", multiline: true }] },
      { key: "homeModelTitle", label: "Model panel heading", type: "text" },
      { key: "homeModelBody", label: "Model panel text", type: "textarea" },
      { key: "homeModelButton", label: "Model panel button", type: "text" },
      { key: "homeOutcomesTitle", label: "\u201cWhat a meal changes\u201d heading", type: "text" },
      { key: "outcomes", label: "What a meal changes", type: "list", itemFields: titleBody },
      ...work,
      { key: "operatingStandard", label: "Operating standard quote", type: "textarea", help: "Also shown on How It Works and What We Do." },
      { key: "homeCtaPrimary", label: "Closing button 1", type: "text" },
      { key: "homeCtaSecondary", label: "Closing button 2", type: "text" },
    ],
  },
  {
    id: "who",
    label: "Who We Are",
    path: "/about/who-we-are",
    fields: [
      ...hero("who"),
      { key: "whoStoryTitle", label: "Story heading", type: "text" },
      { key: "story", label: "Story paragraphs", type: "lines" },
      { key: "vision", label: "Vision", type: "textarea" },
      { key: "mission", label: "Mission", type: "textarea" },
      { key: "whoStatement", label: "Statement", type: "textarea" },
      { key: "whoImage", label: "Main photo", type: "image" },
      { key: "whoValuesTitle", label: "Values heading", type: "text" },
      { key: "values", label: "Values", type: "lines" },
      { key: "whoWhereTitle", label: "\u201cWhere we are starting\u201d heading", type: "text" },
      { key: "whereWeStart", label: "\u201cWhere we are starting\u201d paragraphs", type: "lines" },
      { key: "whoWhereImage", label: "\u201cWhere we are starting\u201d photo", type: "image" },
      { key: "whoFaqTitle", label: "Questions heading", type: "text" },
      { key: "faqs", label: "Questions and answers", type: "list", itemFields: [{ key: "q", label: "Question" }, { key: "a", label: "Answer", multiline: true }] },
      { key: "whoPartnersTitle", label: "Partners heading", type: "text", help: "Partners themselves are added in Settings." },
      { key: "whoPartnersBody", label: "Partners text", type: "textarea" },
    ],
  },
  {
    id: "why",
    label: "Why Nafaqo",
    path: "/about/why-nafaqo",
    fields: [
      ...hero("why"),
      { key: "whyHoldTitle", label: "Capabilities heading", type: "text" },
      {
        key: "capabilities",
        label: "Capabilities",
        type: "list",
        help: "Also shown on What We Do.",
        itemFields: [...titleBody, { key: "tags", label: "Tags (separate with commas)" }],
      },
      { key: "whyCoTitle", label: "Financing heading", type: "text" },
      { key: "whyCoBody", label: "Financing text", type: "textarea" },
      { key: "financing", label: "Financing steps", type: "list", itemFields: [{ key: "step", label: "Step label" }, ...titleBody] },
      { key: "whyPublishTitle", label: "Reporting heading", type: "text" },
      { key: "whyPublishBody", label: "Reporting text", type: "textarea" },
      { key: "metrics", label: "Measures we will publish", type: "list", itemFields: [{ key: "label", label: "Measure" }, { key: "cadence", label: "How often" }] },
      { key: "whyPublishQuote", label: "Reporting quote", type: "textarea" },
      { key: "whyLocalTitle", label: "Local value heading", type: "text" },
      { key: "localValue", label: "Local value cards", type: "list", itemFields: titleBody },
      { key: "valueChain", label: "Value chain labels", type: "lines" },
    ],
  },
  {
    id: "how",
    label: "How It Works",
    path: "/model/how-it-works",
    fields: [
      ...hero("how"),
      { key: "howHubTitle", label: "Hub and spoke heading", type: "text" },
      { key: "howHubBody", label: "Hub and spoke text", type: "textarea" },
      {
        key: "modelNodes",
        label: "Model diagram steps",
        type: "list",
        help: "Also used by the diagram on the Home page. Keep four steps.",
        itemFields: [{ key: "short", label: "Tab label" }, ...titleBody],
      },
      { key: "howBuildTitle", label: "Priorities heading", type: "text" },
      { key: "priorities", label: "Priorities", type: "list", itemFields: [...titleBody, { key: "success", label: "Success line" }] },
      { key: "phases", label: "Phases", type: "list", itemFields: titleBody },
      ...work,
      { key: "howImage", label: "Closing photo", type: "image" },
      { key: "operatingStandard", label: "Operating standard quote", type: "textarea" },
    ],
  },
  {
    id: "what",
    label: "What We Do",
    path: "/model/what-we-do",
    fields: [
      ...hero("what"),
      {
        key: "capabilities",
        label: "Capabilities",
        type: "list",
        help: "Also shown on Why Nafaqo.",
        itemFields: [...titleBody, { key: "tags", label: "Tags (separate with commas)" }],
      },
      { key: "operatingStandard", label: "Operating standard quote", type: "textarea" },
    ],
  },
  {
    id: "news",
    label: "News & Updates",
    path: "/insights/news",
    fields: [
      ...hero("news"),
      { key: "newsEmptyTitle", label: "Heading before the first post", type: "text" },
      { key: "newsEmptyBody", label: "Text before the first post", type: "textarea" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
    fields: [
      ...hero("contact"),
      { key: "contactAddress1", label: "Address line 1", type: "text", help: "Contact details also appear in the footer." },
      { key: "contactAddress2", label: "Address line 2", type: "text" },
      { key: "contactPhone", label: "Phone", type: "text" },
      { key: "contactEmail", label: "Email", type: "text" },
      { key: "contactFormTitle", label: "Form heading", type: "text" },
      { key: "contactFormBody", label: "Form text", type: "textarea" },
      { key: "contactClosing", label: "Closing line", type: "textarea" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    path: "/",
    fields: [
      { key: "footerCtaTitle", label: "Footer headline", type: "textarea" },
      { key: "footerBlurb", label: "Text under the logo", type: "textarea" },
      { key: "footerStayBody", label: "\u201cStay informed\u201d text", type: "textarea" },
      { key: "tagline", label: "Bottom tagline", type: "text" },
    ],
  },
];

export function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

/** Pulls a YouTube video ID out of a full link, or returns the value as-is. */
export function youtubeId(value: string): string {
  const v = value.trim();
  const match = v.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{6,})/);
  return match ? match[1] : v;
}
