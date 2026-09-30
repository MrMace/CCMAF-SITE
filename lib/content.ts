import { publicClient } from "@/lib/supabase/public";

/**
 * Default site content. The site renders this as-is with zero setup.
 * Anything saved from /admin is stored in Supabase (table `site_content`)
 * and overrides these defaults, one document per top-level key.
 */
export const defaults = {
  site: {
    name: "Circle City Martial Arts & Fitness",
    shortName: "CCMAF",
    address: "1202 N Illinois St, Indianapolis, IN",
    phone: "",
    email: "",
    facebook: "https://facebook.com/circlecitymartialarts",
    instagram: "https://instagram.com/10thplanetindy/",
    youtube: "https://youtube.com/channel/UCBP0pB4MZAEGxUdIPoXYfAw",
  },
  home: {
    heroEyebrow: "Indianapolis, Indiana",
    heroTitleLine1: "Train hard.",
    heroTitleLine2: "Belong here.",
    heroText:
      "The premier destination for martial arts practitioners in the heart of Indianapolis. A dynamic, empowering environment for all ages and fitness levels, with experienced instructors behind you every step.",
    stats: [
      { value: "4", label: "Disciplines" },
      { value: "Mon-Sat", label: "Classes every week" },
      { value: "All ages", label: "Kids to adults" },
    ],
    programsTitle: "Find your discipline",
    programsText:
      "Beginner-friendly through competition level. Pick one or train them all.",
    programs: [
      {
        title: "10th Planet Jiu Jitsu",
        text: "No-gi submission grappling built on the famed 10th Planet system. Modern, technical and fun.",
      },
      {
        title: "Kickboxing",
        text: "Circle City Kickboxing: striking, conditioning and technique in a high-energy room.",
      },
      {
        title: "Boxing",
        text: "Circle City Boxing classes Monday, Wednesday, Friday and Saturday.",
      },
      {
        title: "Gi Jiu Jitsu",
        text: "Traditional gi grappling that sharpens grips, control and strategy.",
      },
      {
        title: "10th Planet Kids",
        text: "45-minute classes Monday to Friday: beginner, mixed level and competition based.",
      },
    ],
    freeBannerTitle: "Try us out. First class is free.",
    freeBannerButton: "Claim my free class",
    contactTitle: "Let's get you on the mat",
    contactText:
      "Questions about classes, memberships or your first visit? Send us a note and we'll be in touch.",
  },
  schedule: {
    title: "Weekly schedule",
    text: "Drop in for any class. New here? Your first class is free.",
    days: [
      {
        day: "Monday",
        classes: [
          { time: "5:15 PM", name: "Kids Jiu Jitsu" },
          { time: "6:00 PM", name: "Jiu Jitsu Fundamentals" },
          { time: "7:00 PM", name: "Jiu Jitsu Comp Class" },
          { time: "7:30 PM", name: "Boxing" },
        ],
      },
      {
        day: "Tuesday",
        classes: [
          { time: "5:15 PM", name: "Kids Jiu Jitsu" },
          { time: "6:00 PM", name: "Jiu Jitsu Fundamentals" },
          { time: "7:00 PM", name: "Kickboxing" },
        ],
      },
      {
        day: "Wednesday",
        classes: [
          { time: "5:15 PM", name: "Kids Jiu Jitsu" },
          { time: "6:00 PM", name: "Jiu Jitsu Fundamentals" },
          { time: "7:00 PM", name: "Jiu Jitsu Comp Class" },
          { time: "7:30 PM", name: "Boxing" },
        ],
      },
      {
        day: "Thursday",
        classes: [
          { time: "5:15 PM", name: "Kids Jiu Jitsu" },
          { time: "6:00 PM", name: "Jiu Jitsu Fundamentals (10 Round Thursday)" },
          { time: "7:00 PM", name: "MMA / Kickboxing Sparring" },
        ],
      },
      {
        day: "Friday",
        classes: [
          { time: "6:00 PM", name: "Jiu Jitsu Fundamentals" },
          { time: "7:00 PM", name: "Boxing Open Gym" },
        ],
      },
      {
        day: "Saturday",
        classes: [
          { time: "9:00 AM", name: "MMA" },
          { time: "10:00 AM", name: "Kickboxing" },
          { time: "11:00 AM", name: "Boxing Open Gym" },
          { time: "11:00 AM", name: "Jiu Jitsu Fundamentals" },
          { time: "12:00 PM", name: "Open Mat" },
        ],
      },
      {
        day: "Sunday",
        classes: [{ time: "", name: "Closed. Recovery / family time." }],
      },
    ],
  },
  pricing: {
    title: "Simple pricing",
    text: "Every membership includes access to the full class schedule for its program.",
    plans: [
      {
        name: "Unlimited",
        price: "$159",
        text: "Full access to everything: 10th Planet Jiu Jitsu, kickboxing, boxing and Gi Jiu Jitsu.",
        featured: "yes",
      },
      {
        name: "One Discipline",
        price: "$115",
        text: "Choose 10th Planet Jiu Jitsu or Circle City Kickboxing. Classes Monday to Saturday.",
        featured: "",
      },
      {
        name: "Boxing",
        price: "$85",
        text: "Full access to every Circle City Boxing class: Mon, Wed, Fri and Sat.",
        featured: "",
      },
      {
        name: "Kids",
        price: "$85",
        text: "Full access to 10th Planet Kids classes Monday to Friday.",
        featured: "",
      },
    ],
    note: "New members get a complimentary first class.",
  },
  remembrance: {
    eyebrow: "In loving memory",
    title: 'Christian "King" Jones',
    dates: "Went home March 9, 2021 · Age 27",
    paragraphs: [
      {
        text: 'Christian "King" Alexander Jones-Christopher, 27, of Indianapolis, went home to be with the Lord on March 9, 2021.',
      },
      {
        text: "An Air Force veteran, Christian studied Exercise Science and Personal Training at Ivy Tech and Ball State. He worked in hospitality and pursued mixed martial arts, finishing with an amateur record of 8-2 and a professional record of 2-1.",
      },
      {
        text: "He is survived by his parents, siblings, his two children, Coen and Isla, and his girlfriend, Kaytlin Irene Fee, along with many extended family members and friends. He is missed by everyone in our gym family.",
      },
    ],
  },
};

export type Defaults = typeof defaults;
export type ContentKey = keyof Defaults;

export const contentLabels: Record<ContentKey, { title: string; hint: string }> = {
  site: { title: "Contact & social", hint: "Name, address, phone, email and social links shown across the site." },
  home: { title: "Home page", hint: "Hero, stats, class cards, free-class banner and contact intro." },
  schedule: { title: "Class schedule", hint: "Weekly schedule by day." },
  pricing: { title: "Membership pricing", hint: "Plans, prices and descriptions." },
  remembrance: { title: "Remembrance page", hint: "Tribute text." },
};

function merge<T>(base: T, override: unknown): T {
  if (Array.isArray(base) || typeof base !== "object" || base === null) {
    return (override ?? base) as T;
  }
  if (typeof override !== "object" || override === null || Array.isArray(override)) return base;
  const out = { ...(base as object) } as Record<string, unknown>;
  for (const [k, v] of Object.entries(override)) {
    out[k] = k in out ? merge((base as Record<string, unknown>)[k], v) : v;
  }
  return out as T;
}

export async function getContent<K extends ContentKey>(key: K): Promise<Defaults[K]> {
  const db = publicClient();
  if (!db) return defaults[key];
  try {
    const { data } = await db.from("site_content").select("value").eq("key", key).maybeSingle();
    return data?.value ? merge(defaults[key], data.value) : defaults[key];
  } catch {
    return defaults[key];
  }
}
