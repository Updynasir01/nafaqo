// All copy is taken verbatim from the Nafaqo Kitchen Institutional Profile.
// Do not add statistics, partnerships, funding figures or claims that are not in that document.

export const nav = [
  {
    label: "About",
    items: [
      { href: "/about/who-we-are", label: "Who We Are" },
      { href: "/about/why-nafaqo", label: "Why Nafaqo" },
    ],
  },
  {
    label: "Our Model",
    items: [
      { href: "/model/how-it-works", label: "How It Works" },
      { href: "/model/what-we-do", label: "What We Do" },
    ],
  },
  {
    label: "Insights",
    items: [
      { href: "/insights/news", label: "News & Updates" },
      { href: "/insights/reports", label: "Reports & Resources" },
    ],
  },
] as const;

export const contact = {
  address: ["Amira Castle, Opposite Pizza House,", "Hodan, Mogadishu, Somalia"],
  email: "info@nafaqo.org",
  site: "Nafaqo.org",
  siteHref: "https://nafaqo.org",
  phone: "+252 61 000 0000",
  tagline: "Nourishing Learning \u00b7 Strengthening Food Systems \u00b7 Building Somalia\u2019s Future",
};

export const pillars = [
  { title: "Nourishing Learning", body: "A fed child concentrates, participates and completes the school day." },
  { title: "Strengthening Food Systems", body: "Every meal is income for Somali farmers, cooks, drivers and small businesses." },
  { title: "Building Somalia\u2019s Future", body: "A nationally owned system that improves education and nutrition while creating local economic value." },
];

export const chain = [
  { num: "01", label: "Farm", icon: "Sprout", note: "Somali farmers, cooperatives and women-led enterprises supply the system against forward commitments and clear quality specifications." },
  { num: "02", label: "Local sourcing", icon: "Handshake", note: "Transparent procurement keeps value in the country and builds suppliers who can grow into predictable demand." },
  { num: "03", label: "Central kitchen", icon: "ChefHat", note: "One kitchen standard delivers consistent quality, safer food and better cost control than dozens of separate arrangements ever could." },
  { num: "04", label: "School", icon: "School", note: "Meals travel on fixed routes, in controlled conditions, on a timetable, with clear handover and school-level supervision." },
  { num: "05", label: "Child", icon: "HeartHandshake", note: "A fed child concentrates, participates and completes the school day \u2014 and eats without stigma." },
  { num: "06", label: "Digital verification", icon: "BadgeCheck", note: "Proof of dispatch is never treated as proof that a child was fed. We follow the meal to the end of the chain." },
] as const;

export const outcomes = [
  { title: "Learning.", body: "A fed child concentrates, participates and completes the school day." },
  { title: "Attendance and retention.", body: "For families under economic pressure, a daily meal at school can decide who stays enrolled \u2014 and who does not." },
  { title: "Health and dignity.", body: "A reliable, nutritious meal protects growth and wellbeing, and lets every child eat without stigma." },
  { title: "Local resilience.", body: "Sourced and cooked locally, every meal is income for Somali farmers, cooks, drivers and small businesses." },
];

export const capabilities = [
  { num: "01", icon: "Truck", title: "Meal production and delivery", body: "Nutritious, culturally appropriate meals on consistent portions, safe handling and dependable schedules.", tags: ["Consistent portions", "Safe handling", "Dependable schedules"] },
  { num: "02", icon: "ClipboardCheck", title: "Kitchen operations and quality assurance", body: "Standardised recipes, documented hygiene, trained personnel, inventory control and routine checks.", tags: ["Standardised recipes", "Documented hygiene", "Routine checks"] },
  { num: "03", icon: "Salad", title: "Nutrition and menu planning", body: "We design practical menus that consider children\u2019s nutritional needs, Somali food preferences, seasonal availability, affordability, portion standards and food-safety requirements.", tags: ["Somali food preferences", "Seasonal availability", "Portion standards"] },
  { num: "04", icon: "ScanLine", title: "Digital registration and verification", body: "Learner records, meal verification, delivery monitoring and financial reconciliation in one auditable trail.", tags: ["Learner records", "Delivery monitoring", "One auditable trail"] },
  { num: "05", icon: "Sprout", title: "Local sourcing and supplier development", body: "Transparent procurement from Somali farmers, cooperatives, women-led enterprises and transporters.", tags: ["Farmers & cooperatives", "Women-led enterprises", "Transporters"] },
  { num: "06", icon: "GraduationCap", title: "Skills and institutional capacity", body: "Kitchen planning, food-safety standards, workforce training, cost analysis and systems partners can run themselves.", tags: ["Workforce training", "Food-safety standards", "Cost analysis"] },
] as const;

export const modelNodes = [
  { num: "01", short: "The hub", title: "The hub: one central kitchen", body: "Bulk procurement, standardised recipes, documented hygiene controls, trained teams and routine quality assurance. Volume is what makes safety, consistency and low cost possible at the same time." },
  { num: "02", short: "The spokes", title: "The spokes: a network of schools", body: "Meals travel to schools on fixed routes, in controlled conditions, on a timetable, with clear handover and school-level supervision." },
  { num: "03", short: "The record", title: "The record: verified to the child", body: "Digital registration and meal verification confirm which learner received which meal, at which school, on which day \u2014 reconciled against what was spent." },
  { num: "04", short: "The loop", title: "The loop: managed on data", body: "Cost per meal, waste, delivery failures, attendance and feedback from children and schools are reviewed continuously and fed into the next cycle." },
] as const;

export const priorities = [
  { num: "01", title: "Feed children well", body: "Meals that meet real nutritional need, served with dignity.", success: "Success: better attendance, participation and readiness to learn." },
  { num: "02", title: "Deliver reliably at scale", body: "Safe, efficient, repeatable operations from sourcing to handover.", success: "Success: the same standard on the millionth meal as the first." },
  { num: "03", title: "Prove everything", body: "Learner records, deliveries, procurement and spending that are traceable.", success: "Success: results any partner can independently verify." },
  { num: "04", title: "Build Somali value", body: "Jobs, skills, suppliers and institutional capacity that stay in the country.", success: "Success: a system Somali institutions can finance and run." },
];

export const phases = [
  { num: "01", title: "Prove", body: "A structured pilot in Mogadishu producing hard evidence on nutrition, cost per meal, delivery reliability, verification and attendance." },
  { num: "02", title: "Perfect", body: "Drive cost, waste and delivery failure down. Fix the model where the evidence says it is weak, before scale multiplies the weakness." },
  { num: "03", title: "Replicate", body: "Add kitchens and school networks district by district and region by region, repeating a proven hub-and-spoke unit rather than reinventing one." },
  { num: "04", title: "Enable", body: "Transfer the model \u2014 standards, training, technology and technical advice \u2014 so ministries, municipalities and Somali businesses operate it themselves." },
];

export const financing = [
  { step: "Step one", title: "Catalytic philanthropy", body: "Funds the kitchen, the systems and the early risk \u2014 the costs that build the model, not the cost of feeding one child once. We are seeking the investment that takes the model beyond the first kitchen." },
  { step: "Step two", title: "Public co-financing", body: "Federal and state ministries and municipal authorities progressively subsidise the meal as results are demonstrated, moving school feeding into the public budget where it belongs." },
  { step: "Step three", title: "Household and community contribution", body: "A small, dignified contribution where families can afford it \u2014 always fully subsidised where they cannot. No child is ever turned away for inability to pay." },
  { step: "Step four", title: "Somali private sector, diaspora and zakat", body: "Somali businesses, philanthropy and diaspora giving are a large and underused source of predictable local financing \u2014 and a foundation of national ownership." },
];

export const fundingMix = [
  { source: "Catalytic philanthropy", pilot: "Primary funder", consolidation: "Declining share", scale: "Catalytic and targeted only" },
  { source: "Public co-financing", pilot: "Engaged and aligned", consolidation: "Growing subsidy", scale: "Primary funder" },
  { source: "Household contribution", pilot: "Nominal or none", consolidation: "Modest where affordable", scale: "Sustained, always waived where needed" },
  { source: "Somali business and diaspora", pilot: "Founding support", consolidation: "Expanding", scale: "Structural and institutionalised" },
];

export const metrics = [
  { num: "01", label: "Children fed daily and meals served", cadence: "quarterly" },
  { num: "02", label: "Cost per meal", cadence: "quarterly" },
  { num: "03", label: "Share of deliveries digitally verified", cadence: "quarterly" },
  { num: "04", label: "Nutritional composition against standards", cadence: "quarterly" },
  { num: "05", label: "Attendance and enrolment change in partner schools", cadence: "annually" },
  { num: "06", label: "Value of local procurement", cadence: "annually" },
  { num: "07", label: "Jobs created and share held by women", cadence: "annually" },
  { num: "08", label: "Share of costs carried by public and local sources", cadence: "annually" },
];

export const localValue = [
  { icon: "Briefcase", title: "Jobs where the children are", body: "Cooks, packers, drivers, supervisors and quality staff recruited from the communities we will serve, on formal terms and fair pay." },
  { icon: "UsersRound", title: "Women first", body: "Deliberate priority for women and for parents of enrolled children \u2014 the people with the strongest stake in the meal being good." },
  { icon: "Sprout", title: "Supplier development", body: "Forward commitments, clear quality specifications and post-harvest support so Somali farmers and cooperatives can grow into predictable demand." },
  { icon: "Award", title: "Certified, portable skills", body: "Food safety and hygiene, portion and nutrition standards, cold chain, equipment handling, stock control and record-keeping \u2014 training that holds value beyond Nafaqo." },
] as const;

export const valueChain = ["Farmers", "Suppliers", "Kitchen workers", "Transporters", "Schools", "Children"];

export const partners = [
  { num: "01", icon: "Landmark", title: "Government and education authorities", body: "Policy direction, standards, oversight, co-financing and the foundation for long-term public ownership." },
  { num: "02", icon: "Tractor", title: "Producers and service partners", body: "Farmers, cooperatives, women-led enterprises, processors, transporters and suppliers who sustain the delivery chain." },
  { num: "03", icon: "Users", title: "Schools, parents and communities", body: "Registration, daily supervision, safeguarding, respectful distribution and accountability at the point of delivery." },
  { num: "04", icon: "Microscope", title: "Technical and development partners", body: "Expertise, evidence, innovation, financing and independent assurance across nutrition, food safety, technology and monitoring." },
] as const;

export const values = ["Child-centred", "Somali ownership", "Accountability", "Partnership", "Dignity and inclusion", "Quality and safety", "Learning"];

export const operatingStandard =
  "A meal is not delivered because it left the kitchen. It is delivered when it reaches the intended child, at the correct school, at the correct time \u2014 and we can prove it.";

export const story = [
  "The word \u2018nafaqo\u2019 means nourishment in Somali. We chose it because the problem is that plain: children arrive at school with nothing to eat, and a hungry child cannot learn.",
  "We are starting with one kitchen in Mogadishu and a small number of schools, because we want to prove the thing works before asking anyone to scale it. The sourcing, the menus, the delivery routes and the record of who was fed are all being built around that first kitchen.",
  "We are Somali and we are building this for Somali children. The aim is not to run every school kitchen in the country. It is to build a model that works and hand it to the institutions that should own it.",
];

export const vision = "A Somalia where no child has to learn hungry.";

export const mission =
  "To feed children well, prove it works, and build a school-feeding model Somali institutions can run and expand themselves.";

export const whereWeStart = [
  "Our first kitchen is in Hodan district, Mogadishu. It will serve the schools within reach of a single morning delivery route.",
  "We will add a school only when the kitchen can serve it at the same standard as the others. That is the limit on how fast we grow, and we would rather keep it.",
];

export const faqs = [
  {
    q: "Do children pay for the meal?",
    a: "A small contribution where families can afford it, and the meal is fully subsidised where they cannot. No child is ever turned away for inability to pay.",
  },
  {
    q: "Who pays for the rest?",
    a: "A mix that shifts over time: philanthropy early on, public co-financing as results are demonstrated, and Somali businesses, diaspora giving and zakat. The aim is for most of it to come from Somali and public sources.",
  },
  {
    q: "How do you know a child actually ate?",
    a: "Registration and meal verification record which learner received which meal, at which school, on which day. Proof that food left the kitchen is not proof that a child was fed.",
  },
  {
    q: "What is in a meal?",
    a: "Menus are built around Somali food children actually eat, what is in season, their nutritional needs and fixed portion standards. We will review them regularly and change them when the children tell us to.",
  },
  {
    q: "Why one central kitchen?",
    a: "Cooking in one place instead of twenty is what keeps food safe, keeps quality the same every day, and keeps the cost per meal low enough to grow.",
  },
  {
    q: "Can our school join?",
    a: "Write to us. We are selecting the first schools now, and we will add more as the kitchen can serve them at the same standard.",
  },
];

export const heroVideoId = "2N_K4di7eD0";
