/**
 * Single source of truth for every fact poorvamcare.in states about the centre.
 *
 * The React site already learned this the hard way: the phone number appeared
 * 51 times across 30 files and the hero and trust bar disagreed on the years.
 * Local ranking reads name, address and phone as one identity, so each value
 * lives here once and every page, schema block, llms.txt and the booking
 * script render from it.
 *
 * A value that is not known yet is `null`, never a guess. Pages that need it
 * must not render a claim built on it. `build.mjs` lists every null so the gap
 * stays visible until someone fills it.
 */

export const SITE_URL = 'https://poorvamcare.in';
export const BRAND = 'Poorvam Care';
/** What both Google Business Profiles are called (owner, 2026-10-12). */
export const GBP_NAME = 'Poorvam Care';
/**
 * The older listing name. GSC shows people still search it ("poorvam care &
 * hearing solutions", 42% CTR), so schema keeps it as an alternateName.
 */
export const FORMER_NAME = 'Poorvam Care & Hearing Solutions';

export const CONTACT = {
  phone: '+918884864343',
  phoneDisplay: '+91 88848 64343',
  whatsapp: '918884864343',
  email: 'poorvam.care@gmail.com',
};

/** Same hours at both centres (confirmed by the owner, 2026-10-11). */
export const HOURS = {
  spec: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '19:00' },
  ],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  display: 'Mon–Sat, 9 am – 7 pm',
  closedDisplay: 'Sunday closed',
  /** Booking time bands, as a parent thinks of the day. */
  bands: [
    { id: 'morning', label: 'Morning', hint: '9–12' },
    { id: 'afternoon', label: 'Afternoon', hint: '12–4' },
    { id: 'evening', label: 'After school', hint: '4–7' },
  ],
  saturdayBands: ['morning', 'afternoon', 'evening'],
};

export const LOCATIONS = [
  {
    id: 'phase-1',
    page: '/electronic-city-phase-1',
    short: 'Phase 1',
    name: 'Electronic City Phase 1',
    /** The Google listing this centre's map and reviews come from (owner's link, 2026-10-12). */
    gbpName: 'Poorvam Care',
    // Address and pin exactly as on that listing, so name, address and phone read as one entity.
    street: 'Hulimangala Rd, near Sai Mandir Temple, above RxDx Multi speciality Clinic, Shikaripalya, Electronic City, Hulimangala',
    landmark: 'Above RxDx Multi Speciality Clinic, near the Sai Mandir Temple, Hulimangala Road',
    postalCode: '560105',
    lat: 12.8310616,
    lng: 77.6481503,
    mapUrl: 'https://www.google.com/maps/place/Poorvam+Care/@12.8310616,77.6481503,17z/data=!4m6!3m5!1s0x3bae6b00409a1443:0x10297ef00f20f804!8m2!3d12.8310616!4d77.6481503!16s%2Fg%2F11xg5t2rv5',
    /** As read off the listing on 2026-10-12. */
    rating: { stars: '5.0', reviews: 16 },
    /** Google CID (decimal of the ftid's second half); opens the listing where its reviews live. */
    cid: '1164601548163053572',
    /** Google Maps feature id (0x…:0x…) from the listing URL; drives the map embed. */
    ftid: '0x3bae6b00409a1443:0x10297ef00f20f804',
    /** Branch id in Theraflow (api.theraflow.in/enquire/poorvam). */
    theraflowLocationId: 2,
    /** Families with prams and wheelchairs decide on this. Confirmed 2026-10-11. */
    access: 'Lift available.',
    nearby: ['Hulimangla', 'Neeladri Nagar', 'Doddathoguru', 'Konappana Agrahara', 'Begur', 'Hosa Road'],
  },
  {
    id: 'phase-2',
    page: '/electronic-city-phase-2',
    short: 'Phase 2',
    name: 'Electronic City Phase 2',
    /** The Phase 2 Care listing (owner's link, 2026-10-12). */
    gbpName: 'Poorvam Care',
    street: 'Ananth Nagar, Phase 1, Phase II, Electronic City, Hebbagodi',
    landmark: 'Above the Bata showroom in Ananth Nagar, opposite Udupi Aaradhya',
    postalCode: '560100',
    lat: 12.8362079,
    lng: 77.6868117,
    mapUrl: 'https://www.google.com/maps/place/Poorvam+Care/@12.8362079,77.6868117,17z/data=!4m6!3m5!1s0x3bae6d84e96c6c51:0xa28128c091eabca!8m2!3d12.8362079!4d77.6868117!16s%2Fg%2F11sw0t8q00',
    rating: { stars: '4.6', reviews: 74 },
    cid: '731855332105432010',
    ftid: '0x3bae6d84e96c6c51:0xa28128c091eabca',
    theraflowLocationId: 1,
    access: 'Upstairs, reached by stairs. There is no lift.',
    nearby: ['Ananth Nagar', 'Hebbagodi', 'Bommasandra', 'Chandapura', 'Huskur', 'Attibele'],
  },
];

/**
 * A site-wide star rating, shown only when set. It must be a figure Google
 * actually shows: on 2026-10-12 the listings read 5.0 (16 reviews, Phase 1)
 * and 4.6 (74 reviews, Phase 2), about 4.7 combined. The owner asked for no
 * counts or dates on the pages, so until a single verified figure is agreed
 * this stays null and pages link to the Google reviews without a number.
 */
export const GOOGLE_RATING = null;

/** Owner-supplied figures already published on the live site. */
export const SUMMER_CAMP = { runs: true, months: 'April–May', page: '/therapeutic-enrichment' };

export const STATS = {
  years: '13+',
  families: '1000+',
  ages: '2–14',
};

/** The one clinician the site names. */
export const DIRECTOR = {
  id: 'apoorva-rai',
  name: 'Apoorva Rai',
  initials: 'AR',
  role: 'Clinical Director & Lead Speech-Language Pathologist',
  credentials: 'MASLP, RCI registered',
  memberships: ['Indian Speech and Hearing Association (ISHA)'],
  years: '13+',
  bio: 'Apoorva holds a Master of Audiology and Speech-Language Pathology and leads the therapy team at both centres. Her work centres on autism, speech delay, articulation, ADHD and therapy after a cochlear implant. She reviews the clinical content on this site.',
  photo: null,
};

export const REVIEWER = DIRECTOR;

/**
 * What a family can book. `id` is what the booking form sends; `tone` is the
 * colour the therapy owns everywhere on the site, so a parent learns the map
 * by colour before reading. Coral stays reserved for "book".
 */
export const SERVICES = [
  { id: 'speech', label: 'Speech therapy', short: 'Speech', tone: 'blue', icon: 'speech', page: '/speech-therapy-electronic-city', blurb: 'Late talking, unclear speech, stammering and language delay.' },
  { id: 'ot', label: 'Occupational therapy', short: 'OT', tone: 'mint', icon: 'hand', page: '/occupational-therapy-for-children-bangalore', blurb: 'Sensory needs, fine motor skills, handwriting and daily routines.' },
  { id: 'aba', label: 'Behaviour therapy (ABA)', short: 'ABA', tone: 'violet', icon: 'blocks', page: '/aba-therapy-for-children-bangalore', blurb: 'Building communication and independence, cutting meltdowns.' },
  { id: 'special-ed', label: 'Special education', short: 'Special ed', tone: 'sun', icon: 'book', page: '/special-education-for-children-bangalore', blurb: 'Reading, writing and maths taught the way your child learns.' },
  { id: 'enrichment', label: 'Therapeutic enrichment', short: 'Enrichment', tone: 'pink', icon: 'spark', page: '/therapeutic-enrichment', blurb: 'Small-group play, social skills and school readiness.' },
  { id: 'parent', label: 'Parent counselling', short: 'Parents', tone: 'coral', icon: 'heart', page: '/parent-counselling', blurb: 'Guidance after a diagnosis, and a plan you can use at home.' },
];

/** The first-visit option for a parent who doesn't know which therapy yet. */
export const ASSESSMENT = { id: 'assessment', label: 'Not sure yet: assess my child', short: 'Assessment', page: '/child-development' };

/**
 * Online therapy markets. Licensure follows the CLIENT's location, so the US
 * and Canada are a real gate in the booking flow, not a footer disclaimer.
 */
export const ONLINE = {
  page: '/online',
  markets: [
    { id: 'india', name: 'India', page: '/online/india', hreflang: 'en-IN' },
    { id: 'australia', name: 'Australia', page: '/online/australia', hreflang: 'en-AU' },
    { id: 'uae', name: 'UAE', page: '/online/uae', hreflang: 'en-AE' },
  ],
  blocked: ['United States', 'Canada'],
  languages: ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu', 'Malayalam'],
};

/**
 * Where a booking goes. Theraflow is the system of record; the sheet and the
 * email are the same two sinks the React site used, with the same row schema
 * (LEAD_FIELDS in the old client/src/lib/leads.ts), so a Theraflow outage
 * never loses a booking.
 */
export const LEAD_SINKS = {
  theraflowApi: 'https://api.theraflow.in',
  theraflowSlug: 'poorvam',
  sheet: 'https://script.google.com/macros/s/AKfycbzlz71svz_5jZu8xw5_V6pHZlEPI53zPtg9Ye4UcDm8Eet8zKi4A62mlkxIxr7SgLilWg/exec',
  web3forms: 'https://api.web3forms.com/submit',
  // Public by design: it authorises delivery to one inbox and cannot read anything.
  web3formsKey: 'd97383cd-9adf-412e-bf97-c7cccf0dfff9',
  formName: 'poorvamcare-booking',
};

/** GA4 measurement id. The React site read it from an env var that was never set. */
export const GA4_ID = null;

export const SOCIAL = [
  'https://www.facebook.com/profile.php?id=61572411165781',
  'https://www.instagram.com/poorvam_care/',
];

/** Hearing is its own brand; Care links across where a parent is unsure. */
export const SISTER = { name: 'Poorvam Hearing', url: 'https://poorvamhearing.com', childHearing: 'https://poorvamhearing.com/child-hearing.html' };

export const NAV = [
  { label: 'Speech', href: '/speech-therapy-electronic-city' },
  { label: 'OT', href: '/occupational-therapy-for-children-bangalore' },
  { label: 'Autism', href: '/speech-therapy-for-autism-bangalore' },
  { label: 'All therapies', href: '/child-development' },
  { label: 'Online', href: '/online' },
  { label: 'Centres', href: '/contact' },
  { label: 'About', href: '/about' },
];

export const telLink = `tel:${CONTACT.phone}`;
export function whatsappLink(message) {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Localities and the centre that is closer. One list, so the home page,
 * contact page, locality pages and llms.txt can't disagree.
 */
export const AREAS = [
  { name: 'Electronic City Phase 1', centre: 'phase-1' },
  { name: 'Hulimangla', centre: 'phase-1' },
  { name: 'Neeladri Nagar', centre: 'phase-1' },
  { name: 'Doddathoguru', centre: 'phase-1' },
  { name: 'Konappana Agrahara', centre: 'phase-1' },
  { name: 'Begur', centre: 'phase-1' },
  { name: 'Hosa Road', centre: 'phase-1' },
  { name: 'Bommanahalli', centre: 'phase-1' },
  { name: 'Kudlu Gate', centre: 'phase-1' },
  { name: 'Jigani', centre: 'phase-1' },
  { name: 'Singasandra', centre: 'phase-1' },
  { name: 'HSR Layout', centre: 'phase-1', page: '/child-therapy-hsr-layout-bangalore' },
  { name: 'BTM Layout', centre: 'phase-1', page: '/speech-therapy-btm-layout-bangalore' },
  { name: 'Koramangala', centre: 'phase-1', page: '/speech-therapy-koramangala-bangalore' },
  { name: 'Electronic City Phase 2', centre: 'phase-2' },
  { name: 'Ananth Nagar', centre: 'phase-2' },
  { name: 'Hebbagodi', centre: 'phase-2' },
  { name: 'Kammasandra', centre: 'phase-2' },
  { name: 'Bommasandra', centre: 'phase-2' },
  { name: 'Chandapura', centre: 'phase-2' },
  { name: 'Huskur', centre: 'phase-2' },
  { name: 'Attibele', centre: 'phase-2' },
  { name: 'Anekal', centre: 'phase-2' },
];

/** Further localities with their own page; far enough that online sessions are offered alongside. */
export const FAR_AREAS = [
  { name: 'Whitefield', page: '/speech-therapy-whitefield-bangalore' },
  { name: 'Marathahalli', page: '/speech-therapy-marathahalli-bangalore' },
];

/**
 * Hero photographs. These are AI-generated illustrations, not pictures of our
 * centres, staff or the children we work with, and the footer says so. That
 * is why no centre, locality or about page uses one: there a photo would read
 * as "this is the place" or "this is the team".
 * Files: assets/img/photos/<key>-{720,1200}.webp and <key>-1200.jpg.
 */
export const PHOTOS = {
  home: 'A mother and her small daughter playing with a ball during a therapy session, a therapist beside them',
  speech: 'A speech therapist holding a picture card by her mouth as a toddler reaches for it, his mother watching',
  ot: 'An occupational therapist watching a young boy thread wooden beads onto a string',
  aba: 'A therapist and a young boy sharing a high-five after sorting coloured blocks',
  'special-ed': 'A special educator beside a girl building a word with wooden letter tiles',
  enrichment: 'A small group of children playing hand drums and shakers in a circle with a therapist',
  parent: 'A therapist talking with a mother and father on a sofa while their child plays nearby',
  autism: 'A therapist blowing bubbles while a laughing boy reaches up to pop them',
  delay: 'A father and toddler pointing at a picture book together, a therapist encouraging them',
  assessment: 'A therapist observing a small girl stacking blocks while her mother watches',
  online: 'A mother and son at home waving to a therapist on a laptop video call',
  book: 'A mother on the phone at home while her child plays behind her',
};
export const PHOTO_NOTE = 'Photographs on this site are illustrations, not pictures of our centres, staff or the children we work with.';

/** Embeddable map of a centre's own Google listing; null until the listing's ftid is known. */
export function mapEmbedUrl(l) {
  if (!l.ftid) return null;
  const pb = `!1m18!1m12!1m3!1d1500!2d${l.lng}!3d${l.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${l.ftid}!2s${encodeURIComponent(l.gbpName)}!5e0!3m2!1sen!2sin!4v1728600000000!5m2!1sen!2sin`;
  return `https://www.google.com/maps/embed?pb=${pb}`;
}

export const reviewsUrl = (l) => (l.cid ? `https://www.google.com/maps?cid=${l.cid}` : null);
