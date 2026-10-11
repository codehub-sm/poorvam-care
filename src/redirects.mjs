/**
 * Retired URLs → the page that now answers the same question. One hop each,
 * to the closest intent, never to the home page just because it's there.
 *
 * Sources, all still requested by crawlers or backlinks:
 *   - the 2023 HTTrack-mirrored static site (*.html), from the old server.js map
 *   - short SPA routes the React site used before the -bangalore slugs
 *   - /service-packages, retired when prices came off the site (Sep 2026)
 *   - /appointments, the dead patient-portal route
 *
 * build.mjs fails if a source here is also a live page, or a target isn't one.
 */
export const LEGACY_REDIRECTS = {
  '/speechAndLanguage.html': '/speech-therapy-electronic-city',
  '/speechTherapy.html': '/speech-therapy-electronic-city',
  '/speechtherapy.html': '/speech-therapy-electronic-city',
  '/occupationalTherapy.html': '/occupational-therapy-for-children-bangalore',
  '/occupationaltherapy.html': '/occupational-therapy-for-children-bangalore',
  '/aba.html': '/aba-therapy-for-children-bangalore',
  '/specialeducation.html': '/special-education-for-children-bangalore',
  '/developmentalEducation.html': '/special-education-for-children-bangalore',
  '/socialSkillsGroupTraining.html': '/therapeutic-enrichment',
  '/therapy.html': '/child-development',
  '/about.html': '/about',
  '/team.html': '/about',
  '/gallery.html': '/about',
  '/contact.html': '/contact',
  '/booking.html': '/book',
  '/blog.html': '/blog',
  '/index-2.html': '/',

  '/speech-therapy': '/speech-therapy-electronic-city',
  '/occupational-therapy': '/occupational-therapy-for-children-bangalore',
  '/aba-therapy': '/aba-therapy-for-children-bangalore',
  '/special-education': '/special-education-for-children-bangalore',
  '/teletherapy': '/online',
  '/hearing': '/hearing-center',

  '/service-packages': '/book',
  '/appointments': '/book',
};
