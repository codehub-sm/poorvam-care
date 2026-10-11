import { html, bookButton, serviceList } from '../layout.mjs';

/** Served with a real 404 status by the Amplify catch-all, for any unknown path. */
export default {
  path: '/404',
  title: 'Page not found | Poorvam Care',
  description: 'This page does not exist or has moved. Find speech therapy, occupational therapy, ABA and special education at Poorvam Care, Electronic City, Bengaluru.',
  noindex: true,
  body: html`
<section class="phero">
  <div class="wrap">
    <h1>We could not find that page</h1>
    <p class="lede">It may have moved when we rebuilt the site. Everything we offer is below, or you can talk to us directly.</p>
    <div class="phero__acts">${bookButton('Book a consultation', 'assessment', 'btn btn--ink')}<a class="btn btn--line" href="/">Go to the home page</a></div>
  </div>
</section>
<section class="band">
  <div class="wrap">
    <h2>Our therapies</h2>
    ${serviceList()}
  </div>
</section>
`,
};
