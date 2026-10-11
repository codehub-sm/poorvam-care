/* Poorvam Care — shared behaviour. No framework; every feature degrades to a
   plain link (Book → /book, Call → tel:, WhatsApp → wa.me). */
(function () {
  'use strict';
  var PC = window.PC || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function track(event, params) {
    try { window.gtag && window.gtag('event', event, params || {}); } catch (e) { /* analytics never blocks a booking */ }
  }

  /* ---------- header ---------- */
  var top = document.querySelector('.top');
  if (top) {
    var onScroll = function () { top.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  var menuBtn = document.querySelector('.top__menu');
  var drawer = document.getElementById('drawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', function () {
      var open = drawer.hidden;
      drawer.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---------- click tracking ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-track]');
    if (a) track(a.getAttribute('data-track') + '_click', { page: location.pathname });
  });

  /* ---------- booking ---------- */
  var DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  /** Next six open days. After 6 pm today is not offered: nobody can be fitted in. */
  function openDays() {
    var out = [];
    var d = new Date();
    if (d.getHours() >= 18) d.setDate(d.getDate() + 1);
    while (out.length < 6) {
      if ((PC.hoursDays || []).indexOf(FULL[d.getDay()]) !== -1) out.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return out;
  }

  function fillDays(form) {
    var box = form.querySelector('[data-days]');
    if (!box || box.childElementCount) return;
    var today = new Date().toDateString();
    var tomorrow = new Date(Date.now() + 864e5).toDateString();
    openDays().forEach(function (d, i) {
      var label = d.toDateString() === today ? 'Today' : d.toDateString() === tomorrow ? 'Tomorrow' : DAY[d.getDay()];
      var value = FULL[d.getDay()] + ' ' + d.getDate() + ' ' + MON[d.getMonth()];
      var l = document.createElement('label');
      l.className = 'chip';
      l.innerHTML = '<input type="radio" name="day"' + (i === 0 ? ' checked' : '') + '><span>' + label + '<small>' + d.getDate() + ' ' + MON[d.getMonth()] + '</small></span>';
      l.querySelector('input').value = value;
      box.appendChild(l);
    });
  }

  /** Saturday closes early, so only its morning band can be picked. */
  function syncBands(form) {
    var day = val(form, 'day');
    var sat = day.indexOf('Saturday') === 0;
    var bands = form.querySelectorAll('[data-bands] input');
    var firstOk = null;
    bands.forEach(function (b) {
      var ok = !sat || (PC.saturdayBands || []).indexOf(b.value) !== -1;
      b.disabled = !ok;
      b.closest('.chip').hidden = !ok;
      if (ok && !firstOk) firstOk = b;
      if (!ok && b.checked) b.checked = false;
    });
    if (firstOk && !form.querySelector('[data-bands] input:checked')) firstOk.checked = true;
  }

  /** Online needs a country (licensure follows where the child lives); a centre needs a day and time. */
  function syncMode(form) {
    var online = val(form, 'centre') === 'online';
    form.querySelector('[data-when]').hidden = online;
    form.querySelector('[data-online]').hidden = !online;
    var phone = form.querySelector('[name=phone]');
    phone.placeholder = online ? 'With country code, e.g. +61 4xx xxx xxx' : '98xxxxxxxx';
    gate(form);
  }

  function gate(form) {
    var g = form.querySelector('[data-gate]');
    var country = val(form, 'country');
    var blocked = val(form, 'centre') === 'online' && (PC.blocked || []).indexOf(country) !== -1;
    if (blocked) {
      g.textContent = 'We can’t take online clients living in ' + country + '. Speech-language pathology is licensed where the child lives, and our RCI registration doesn’t cover it. A licensed therapist in your state or province is the right route.';
      track('booking_country_blocked', { country: country });
    }
    g.hidden = !blocked;
    return blocked;
  }

  function setRadio(form, name, value) {
    if (!value) return;
    var el = form.querySelector('input[name="' + name + '"][value="' + value + '"]');
    if (el) el.checked = true;
  }

  function showStep(form, n) {
    form.querySelectorAll('.booking__step').forEach(function (s) { s.classList.toggle('is-on', s.getAttribute('data-step') === String(n)); });
    form.querySelectorAll('.booking__steps li').forEach(function (li, i) { li.classList.toggle('is-on', i < n); });
    form.setAttribute('data-at', n);
    var first = form.querySelector('.booking__step.is-on input:not([type=hidden]), .booking__step.is-on button');
    if (first && n > 1) first.focus({ preventScroll: true });
  }

  function val(form, name) {
    var el = form.querySelector('[name="' + name + '"]:checked') || form.querySelector('select[name="' + name + '"], textarea[name="' + name + '"], input[name="' + name + '"]:not([type=radio])');
    return el ? String(el.value || '').trim() : '';
  }

  /** Indian mobile: 10 digits starting 6–9, with or without +91 / 0. Returns +91XXXXXXXXXX. */
  function indianPhone(raw) {
    var d = String(raw).replace(/\D/g, '');
    if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2);
    if (d.length === 11 && d[0] === '0') d = d.slice(1);
    return /^[6-9]\d{9}$/.test(d) ? '+91' + d : null;
  }
  /** Online families abroad: any number written with its country code. */
  function intlPhone(raw) {
    var s = String(raw).trim();
    var d = s.replace(/\D/g, '');
    if (/^(\+|00)/.test(s) && d.length >= 8 && d.length <= 15) return '+' + d.replace(/^00/, '');
    return indianPhone(raw);
  }

  function summary(b) {
    return 'Hi ' + PC.brand + ', I would like to book: ' + b.service +
      '\nChild’s age: ' + b.age +
      '\n' + (b.online ? 'Online, from ' + b.country : 'Centre: ' + b.centre + '\nWhen: ' + b.day + ', ' + b.slot) +
      '\nName: ' + b.name + '\nPhone: ' + b.phone + (b.note ? '\nNoticed: ' + b.note : '');
  }

  function waLink(text) { return 'https://wa.me/' + PC.whatsapp + '?text=' + encodeURIComponent(text); }

  /* Three sinks, written in parallel. Any one confirming means the lead
     survived. The Apps Script is posted as text/plain so there is no CORS
     preflight and its JSON reply stays readable; never no-cors, which hid
     lead loss twice on the old site. */
  function postSheet(row) {
    return fetch(PC.sinks.sheet, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(row) })
      .then(function (r) { return r.ok ? r.text() : Promise.reject(new Error('sheet ' + r.status)); })
      .then(function (t) { var j = null; try { j = JSON.parse(t); } catch (e) { /* old deployment */ } if (j && j.ok === false) throw new Error(j.error || 'sheet error'); return j && j.ok ? 'confirmed' : 'unconfirmed'; });
  }
  function postWeb3(row) {
    var body = {};
    Object.keys(row).forEach(function (k) { body[k] = String(row[k]); });
    body.access_key = PC.sinks.web3formsKey;
    body.subject = 'New lead — ' + row.name + ' · ' + row.service + ' · ' + row.centre;
    body.from_name = 'Poorvam Care Website';
    return fetch(PC.sinks.web3forms, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().then(function (j) { if (r.ok && j && j.success) return 'confirmed'; throw new Error((j && j.message) || 'web3forms ' + r.status); }); });
  }
  /* Theraflow's public enquiry door. It wants a token minted at least two
     seconds before the post (its anti-bot fill-time check), so the token is
     fetched when the form is first touched and topped up to that age on submit. */
  var tfToken = null;
  function tfBase() { return PC.sinks.theraflowApi + '/api/public/enquiry/' + encodeURIComponent(PC.sinks.theraflowSlug); }
  function primeTheraflow() {
    if (tfToken) return tfToken;
    tfToken = fetch(tfBase() + '/token', { credentials: 'omit' })
      .then(function (r) { if (!r.ok) throw new Error('theraflow token ' + r.status); return r.json(); })
      .then(function (j) { return { token: j.formToken, at: Date.now() }; });
    tfToken.catch(function () { tfToken = null; });
    return tfToken;
  }
  function postTheraflow(b, raw) {
    return primeTheraflow().then(function (t) {
      var wait = Math.max(0, 2300 - (Date.now() - t.at));
      return new Promise(function (r) { setTimeout(r, wait); }).then(function () { return t.token; });
    }).then(function (token) {
      var tz = ''; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { /* none */ }
      return fetch(tfBase(), {
        method: 'POST', credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: b.name, phone: b.phone, email: '', childName: '', childAge: b.age,
          concern: '[Poorvam Care] ' + b.service + (b.online ? ' - online from ' + b.country : ' - ' + b.day + ', ' + b.slot) + (b.note ? ' - ' + b.note : ''),
          locationId: b.online ? null : (PC.theraflowLocations[raw.centre] || null),
          preferredMode: b.online ? 'online' : 'in_clinic',
          consent: true, honeypot: '', formToken: token, areaText: b.online ? b.country : '', timezone: tz,
        }),
      });
    }).then(function (r) {
      return r.json().catch(function () { return null; }).then(function (j) {
        if (r.ok && j && j.ok) return 'confirmed';
        throw new Error((j && (j.error || j.code)) || 'theraflow ' + r.status);
      });
    });
  }

  function settle(p) { return p.then(function (v) { return { ok: true, v: v }; }, function (e) { return { ok: false, e: e }; }); }

  function initBooking(form) {
    fillDays(form);
    syncBands(form);
    syncMode(form);
    form.addEventListener('focusin', primeTheraflow, { once: true });
    form.addEventListener('click', primeTheraflow, { once: true });
    form.addEventListener('change', function (e) {
      if (e.target.name === 'day') syncBands(form);
      if (e.target.name === 'centre') syncMode(form);
      if (e.target.name === 'country') gate(form);
    });
    form.addEventListener('click', function (e) {
      var at = Number(form.getAttribute('data-at') || 1);
      if (e.target.closest('[data-next]')) {
        if (at === 2 && val(form, 'centre') === 'online') {
          if (!val(form, 'country')) { var sel = form.querySelector('[name=country]'); sel.setAttribute('aria-invalid', 'true'); sel.focus(); return; }
          if (gate(form)) return;
        }
        showStep(form, at + 1);
      }
      if (e.target.closest('[data-back]')) { showStep(form, at - 1); }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = form.querySelector('.booking__err');
      var nameEl = form.querySelector('[name=name]');
      var phoneEl = form.querySelector('[name=phone]');
      var consentEl = form.querySelector('[name=consent]');
      var online = val(form, 'centre') === 'online';
      var phone = online ? intlPhone(phoneEl.value) : indianPhone(phoneEl.value);
      nameEl.setAttribute('aria-invalid', String(nameEl.value.trim().length < 2));
      phoneEl.setAttribute('aria-invalid', String(!phone));
      var msg = nameEl.value.trim().length < 2 ? 'Please add your name.'
        : !phone ? (online ? 'Please enter your mobile number with its country code, like +61 or +971.' : 'Please enter a 10-digit mobile number.')
        : !consentEl.checked ? 'Please tick the box so we can call you back.' : '';
      if (msg) { err.textContent = msg; err.hidden = false; return; }
      err.hidden = true;
      if (val(form, 'website')) return; // honeypot: a person never fills it

      var b = {
        online: online,
        service: (PC.services || {})[val(form, 'service')] || val(form, 'service'),
        age: val(form, 'age'),
        centre: (PC.centres || {})[val(form, 'centre')] || val(form, 'centre'),
        country: online ? val(form, 'country') : 'India',
        day: online ? '' : val(form, 'day'), slot: online ? '' : val(form, 'slot'),
        name: nameEl.value.trim(), phone: phone, note: val(form, 'note'),
      };
      var leadId = 'PC-' + Date.now().toString(36).toUpperCase();
      // Same columns as the React site's LEAD_FIELDS, so the Leads sheet needs no change.
      var row = {
        timestamp: new Date().toISOString(), leadId: leadId, form: PC.sinks.formName, stage: 'booking-request',
        name: b.name, phone: b.phone, country: b.country, childAge: b.age, service: b.service, concern: b.note,
        message: online ? 'Online' : b.centre + ' · ' + b.day + ' · ' + b.slot, consent: 'yes', pageUrl: location.href,
        centre: b.centre, preferredDay: b.day, preferredTime: b.slot, mode: online ? 'online' : 'centre',
      };
      var submit = form.querySelector('[type=submit]');
      submit.disabled = true; submit.textContent = 'Sending…';

      Promise.all([settle(postTheraflow(b, { centre: val(form, 'centre') })), settle(postSheet(row)), settle(postWeb3(row))]).then(function (res) {
        if (!res[0].ok) track('booking_theraflow_failed', { error: String(res[0].e && res[0].e.message || '') });
        var landed = res.some(function (r) { return r.ok; });
        if (!landed) {
          // Every sink down: say so plainly and hand over the WhatsApp route,
          // which carries the same details and depends on none of them.
          submit.disabled = false; submit.textContent = 'Send request';
          err.innerHTML = '';
          err.appendChild(document.createTextNode('We could not send that from here. Send it on WhatsApp instead; the details are already filled in. '));
          var a = document.createElement('a'); a.href = waLink(summary(b)); a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Open WhatsApp';
          err.appendChild(a); err.hidden = false;
          track('booking_failed', { service: b.service });
          return;
        }
        if (res.some(function (r) { return !r.ok; })) track('booking_sink_partial', { service: b.service });
        track('generate_lead', { service: b.service, centre: b.centre, form: 'booking' });
        form.querySelectorAll('.booking__step, .booking__steps').forEach(function (n) { n.hidden = true; n.classList.remove('is-on'); });
        var done = form.querySelector('[data-done]');
        done.querySelector('[data-done-phone]').textContent = b.phone;
        done.querySelector('[data-done-wa]').href = waLink(summary(b) + '\nRef: ' + leadId);
        done.hidden = false;
      });
    });
    showStep(form, 1);
  }

  document.querySelectorAll('[data-booking]').forEach(initBooking);

  function preset(form, service, centre) {
    setRadio(form, 'service', service);
    setRadio(form, 'centre', centre);
    syncMode(form);
  }

  var sheet = document.getElementById('book-sheet');
  var sheetForm = sheet && sheet.querySelector('form');
  function openSheet(service, centre) {
    if (!sheet || typeof sheet.showModal !== 'function') return false;
    preset(sheetForm, service, centre);
    if (!sheetForm.querySelector('[data-done]').hidden) return sheet.showModal(), true;
    showStep(sheetForm, service ? 2 : 1);
    sheet.showModal();
    primeTheraflow();
    track('booking_open', { service: service || '', page: location.pathname });
    return true;
  }
  // /book holds the form inline; there a Book link just scrolls to it.
  var inline = document.querySelector('main [data-booking]');
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-book]');
    if (!a) return;
    var service = a.getAttribute('data-book');
    var centre = a.getAttribute('data-centre');
    if (inline) {
      e.preventDefault();
      preset(inline, service, centre);
      if (service) showStep(inline, 2);
      inline.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      return;
    }
    if (openSheet(service, centre)) e.preventDefault();
  });
  if (sheet) {
    sheet.addEventListener('click', function (e) { if (e.target === sheet || e.target.closest('[data-close]')) sheet.close(); });
  }
  if (inline) {
    // ?service= and ?centre= from Book links; ?mode=online|centre from links the old site published.
    var q = new URLSearchParams(location.search);
    var centre = q.get('centre') || (q.get('mode') === 'online' ? 'online' : '');
    preset(inline, q.get('service'), centre);
    if (q.get('service') || centre) showStep(inline, 2);
  }

  /* ---------- scroll story: the chapter in the middle of the screen drives the stage ---------- */
  var storyEl = document.getElementById('story');
  if (storyEl && 'IntersectionObserver' in window) {
    var chapters = storyEl.querySelectorAll('.story__step');
    var seen = {};
    storyEl.setAttribute('data-ch', '1');
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var ch = en.target.getAttribute('data-ch');
        storyEl.setAttribute('data-ch', ch);
        chapters.forEach(function (s) { s.classList.toggle('is-on', s === en.target); });
        if (!seen[ch]) { seen[ch] = true; track('story_chapter', { chapter: ch }); }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    chapters.forEach(function (s) { sio.observe(s); });
  }

  /* ---------- graphics that grow in once, when scrolled into view ---------- */
  if ('IntersectionObserver' in window && !reduceMotion) {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('is-armed');
      var rio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { el.classList.add('is-in'); rio.disconnect(); } });
      }, { threshold: 0.25 });
      rio.observe(el);
    });
  }
})();
