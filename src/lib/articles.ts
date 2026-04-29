/**
 * Mock article data — replace with a CMS or MDX source later.
 */

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO date string
  readTime: string;
  heroImage: string;
  heroAlt: string;
  author: {
    name: string;
    role: string;
  };
  body: string[]; // paragraphs (HTML-safe plain text for now)
};

export const ARTICLES: Article[] = [
  {
    slug: "ai-strategy-without-the-hype",
    title: "AI Strategy Without the Hype",
    excerpt:
      "Most organisations don't need a massive AI overhaul. They need a clear view of where AI actually adds value — and the confidence to start small.",
    category: "Strategy",
    date: "2026-03-01",
    readTime: "5 min read",
    heroImage: "/images/service-images/service-mobile.webp",
    heroAlt: "Strategy planning on a mobile device",
    author: { name: "Performance Peak", role: "Digital Strategy" },
    body: [
      "There's a lot of noise around AI right now. Every vendor has an AI story. Every conference has an AI track. And most organisations are left wondering whether they're falling behind — or whether the whole thing is overhyped.",
      "The truth, as usual, is somewhere in the middle. AI is genuinely useful for certain problems: pattern recognition in large datasets, automating repetitive decisions, surfacing insights that would take a human team weeks to find. But it's not magic, and it's not a strategy in itself.",
      "A good AI strategy starts with your actual business problems — not with the technology. What's slowing your team down? Where are you losing time to manual processes? Which decisions would benefit from better data? Start there, and the right tools follow naturally.",
      "We've worked with organisations that saved thousands of hours per year by automating a single reporting workflow. Others have used simple classification models to triage customer enquiries, freeing up their team for higher-value work. None of these required a PhD in machine learning.",
      "The key is to start with a focused pilot, measure the results honestly, and scale what works. That's not glamorous, but it's how lasting change happens.",
    ],
  },
  {
    slug: "why-your-digital-transformation-stalled",
    title: "Why Your Digital Transformation Stalled",
    excerpt:
      "Digital transformation fails when it's treated as a technology project. Here's how to refocus on the things that actually move the needle.",
    category: "Insight",
    date: "2026-02-18",
    readTime: "7 min read",
    heroImage: "/images/service-images/service-web.webp",
    heroAlt: "Web dashboard showing analytics data",
    author: { name: "Performance Peak", role: "Digital Strategy" },
    body: [
      "If your digital transformation has stalled, you're not alone. Research consistently shows that the majority of transformation initiatives fail to deliver their intended outcomes. But the reasons are rarely technical.",
      "The most common pattern we see is this: an organisation invests in new technology — a platform, a tool, a system — without first understanding the processes it needs to support or the people who'll use it.",
      "Technology is an enabler, not a solution. A new CRM doesn't fix a broken sales process. A fancy dashboard doesn't help if the underlying data is unreliable. And an AI chatbot doesn't improve customer experience if the knowledge base behind it is out of date.",
      "The organisations that succeed tend to do three things differently. First, they invest time upfront in understanding how work actually flows — not how it's supposed to flow on paper. Second, they involve the people doing the work in shaping the solution. Third, they measure outcomes, not outputs.",
      "If your transformation has hit a wall, the fix usually isn't more technology. It's stepping back, listening to the people on the ground, and rebuilding the plan around what actually matters.",
    ],
  },
  {
    slug: "building-websites-that-last",
    title: "Building Websites That Last",
    excerpt:
      "A website shouldn't need rebuilding every two years. Here's our approach to building sites that stay fast, accessible and easy to maintain.",
    category: "Build",
    date: "2026-02-05",
    readTime: "4 min read",
    heroImage: "/images/operator.webp",
    heroAlt: "Developer working on a laptop",
    author: { name: "Performance Peak", role: "Engineering" },
    body: [
      "The average lifespan of a business website is about two to three years. That's not because the technology becomes obsolete — it's because the site was built in a way that makes it hard to maintain and adapt.",
      "We take a different approach. Every site we build is designed to be easy to update, fast to load, and accessible to everyone. That means choosing mature, well-supported frameworks, writing clean code, and making deliberate choices about dependencies.",
      "Performance is a feature, not an afterthought. We measure and optimise Core Web Vitals from day one. We think carefully about image formats, font loading strategies, and JavaScript bundle sizes. The result is a site that feels instant — and stays that way.",
      "Accessibility isn't a bolt-on either. Semantic HTML, proper heading hierarchy, keyboard navigation, screen reader testing — these are all part of our standard process, not an upgrade.",
      "The websites we build are designed to last. Not because they're over-engineered, but because they're built simply and thoughtfully. When the time comes to evolve them, the foundation is solid.",
    ],
  },
  {
    slug: "data-you-already-have",
    title: "The Data You Already Have (But Aren't Using)",
    excerpt:
      "Most organisations are sitting on valuable data they never look at. Here's how to find it and put it to work.",
    category: "Insight",
    date: "2026-01-22",
    readTime: "6 min read",
    heroImage: "/images/service-images/service-elearning.webp",
    heroAlt: "Data visualisation on screen",
    author: { name: "Performance Peak", role: "Data & Analytics" },
    body: [
      "Every organisation generates data. Customer interactions, operational metrics, financial transactions, support tickets, website analytics — the list goes on. But in our experience, most organisations use only a fraction of what they collect.",
      "The problem isn't usually a lack of data. It's a lack of connection. Data lives in silos — different teams, different systems, different formats. Nobody has a complete picture, so everyone makes decisions based on incomplete information.",
      "The first step isn't to buy a new analytics platform. It's to map out what you already have. Where does your data live? Who owns it? How fresh is it? What questions could it answer if it were accessible?",
      "We've helped organisations discover that the answers to their biggest strategic questions were already sitting in a combination of their CRM, their finance system, and their web analytics. They just needed someone to connect the dots.",
      "Start with one question you'd love to answer. Then trace back to the data sources that could help. You might be surprised by what's already within reach.",
    ],
  },
];

export const getArticleBySlug = (slug: string): Article | undefined =>
  ARTICLES.find((a) => a.slug === slug);

export const formatArticleDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
