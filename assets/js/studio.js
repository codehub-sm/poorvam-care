/* Poorvam Studio: estimate, WhatsApp booking request, carousel and analytics.
   No backend: the form builds a message and opens WhatsApp with it. */
(function () {
  'use strict';
  var PS = window.PS || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function track(event, params) {
    try { window.gtag && window.gtag('event', event, params || {}); } catch (e) { /* analytics never blocks a booking */ }
  }
  var inr = function (n) { return '₹' + Number(n).toLocaleString('en-IN'); };

  /* ---------- CTAs ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-cta]');
    if (!a) return;
    track('studio_cta_click', { cta: a.getAttribute('data-cta') });
    var p = a.getAttribute('data-purpose');
    if (p && form) { form.purpose.value = p; update(); }
  });

  /* ---------- rates seen ---------- */
  var rates = document.getElementById('rates');
  if (rates && 'IntersectionObserver' in window) {
    var rio = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { track('studio_rates_view', {}); rio.disconnect(); }
    }, { threshold: 0.4 });
    rio.observe(rates);
  }

  /* ---------- carousel ---------- */
  var car = document.querySelector('[data-carousel]');
  if (car) {
    var track_ = car.querySelector('[data-track]');
    var slides = car.querySelectorAll('.st-slide');
    var count = car.querySelector('[data-count]');
    var at = function () { return Math.round(track_.scrollLeft / track_.clientWidth); };
    var go = function (i) {
      i = (i + slides.length) % slides.length;
      track_.scrollTo({ left: i * track_.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    var prev = car.querySelector('[data-prev]');
    var next = car.querySelector('[data-next]');
    if (prev) prev.addEventListener('click', function () { go(at() - 1); });
    if (next) next.addEventListener('click', function () { go(at() + 1); });
    track_.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(at() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(at() - 1); }
    });
    if (count) track_.addEventListener('scroll', function () { count.textContent = (at() + 1) + ' / ' + slides.length; }, { passive: true });
  }

  /* ---------- booking form ---------- */
  var form = document.querySelector('[data-studio-form]');
  if (!form) return;
  var R = PS.rates || {};
  var B = PS.birthday || {};
  var K = PS.blocks || {};
  var isEvent = function (p) { return p === 'Birthday party' || /^(Workshop|Brand)/.test(p); };
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var out = {
    total: form.querySelector('[data-total]'), how: form.querySelector('[data-how]'),
    warn: form.querySelector('[data-warn]'), err: form.querySelector('[data-err]'),
    msg: form.querySelector('[data-msg]'), text: form.querySelector('[data-msg-text]'),
  };

  // Default date: three days from today, in local time.
  var d0 = new Date(); d0.setDate(d0.getDate() + 3);
  var iso = function (d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  if (!form.date.value) form.date.value = iso(d0);
  form.date.min = iso(new Date());

  var lastHours = form.hours.value;
  function estimate() {
    var purpose = form.purpose.value;
    var day = form.date.value ? new Date(form.date.value + 'T00:00') : null;
    var weekend = day ? (day.getDay() === 0 || day.getDay() === 6) : false;
    var startH = parseInt((form.start.value || '0').split(':')[0], 10) + (parseInt((form.start.value || '0:0').split(':')[1], 10) || 0) / 60;
    var hours = Math.max(1, Math.min(16, parseInt(form.hours.value, 10) || 1));
    var birthday = purpose === 'Birthday party';
    var event = isEvent(purpose);
    var e = { purpose: purpose, weekend: weekend, hours: hours, start: startH, event: event, birthday: birthday };
    if (birthday) {
      e.hours = B.hours;
      e.total = weekend ? B.weekend : B.weekday;
      e.how = 'Birthday package, ' + B.hours + ' hours, ' + (weekend ? 'weekend' : 'weekday') + ' price.';
    } else if (/^Brand/.test(purpose)) {
      e.total = PS.commercial * hours;
      e.how = inr(PS.commercial) + '/hr × ' + hours + ' hrs (brand and commercial shoot rate, any day).';
    } else {
      var rate = weekend ? R.weekend : (startH >= R.eveningFrom ? R.weekdayEvening : R.weekdayDay);
      e.total = rate * hours;
      e.how = inr(rate) + '/hr × ' + hours + ' hr' + (hours > 1 ? 's' : '') + ' (' + (weekend ? 'weekend rate' : startH >= R.eveningFrom ? 'weekday evening rate' : 'weekday off-peak rate') + ').';
      // Workshop blocks: any time at weekends; on weekdays only when the booking ends by K.dayEnd.
      if (/^Workshop/.test(purpose) && K.half && (weekend || startH + hours <= K.dayEnd)) {
        var day_ = weekend ? 'weekend' : 'weekday';
        [K.half, K.full].forEach(function (b, i) {
          if (hours < b.hours) return;
          var t = b[day_] + (hours - b.hours) * rate;
          if (t < e.total) {
            e.total = t;
            e.how = (i ? 'Full day' : 'Half day') + ' (' + b.hours + ' hrs, ' + day_ + ') ' + inr(b[day_]) + (hours > b.hours ? ' + ' + (hours - b.hours) + ' hr' + (hours - b.hours > 1 ? 's' : '') + ' × ' + inr(rate) : '') + '.';
          }
        });
      }
    }
    e.deposit = event ? PS.deposit : 0;
    e.end = startH + e.hours;
    return e;
  }

  function update() {
    var birthday = form.purpose.value === 'Birthday party';
    var event = isEvent(form.purpose.value);
    if (birthday) {
      if (!form.hours.disabled) lastHours = form.hours.value;
      form.hours.value = B.hours; form.hours.disabled = true;
    } else {
      if (form.hours.disabled) { form.hours.disabled = false; form.hours.value = lastHours; }
      form.hours.min = event ? 3 : 1;
      if (event && Number(form.hours.value) < 3) form.hours.value = 3;
    }
    var e = estimate();
    out.total.textContent = inr(e.total);
    out.how.textContent = e.how + (e.deposit ? ' Plus ' + inr(e.deposit) + ' refundable deposit.' : '') + ' 18% GST extra where applicable. Public holidays are charged at the weekend rate.';
    var warn = '';
    if (e.end > PS.close) warn = 'That runs past 10 PM. Choose an earlier start or fewer hours.';
    else if (e.start < PS.open) warn = 'The hall opens at 6 AM.';
    out.warn.textContent = warn; out.warn.hidden = !warn;
    return e;
  }
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  update();

  function hhmm(h) {
    var H = Math.floor(h), M = Math.round((h - H) * 60);
    var ap = H >= 12 ? 'PM' : 'AM'; var h12 = H % 12 || 12;
    return h12 + (M ? ':' + String(M).padStart(2, '0') : '') + ' ' + ap;
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var name = form.name.value.trim();
    var people = parseInt(form.people.value, 10);
    var problem = !form.date.value ? 'Please choose a date.'
      : name.length < 2 ? 'Please add your name.'
      : !(people >= 1 && people <= 40) ? 'The hall holds up to 40 people.' : '';
    form.name.setAttribute('aria-invalid', String(name.length < 2));
    var e = update();
    if (!problem && (e.end > PS.close || e.start < PS.open)) problem = out.warn.textContent;
    out.err.textContent = problem; out.err.hidden = !problem;
    if (problem) return;

    var day = new Date(form.date.value + 'T00:00');
    var when = DAYS[day.getDay()] + ' ' + day.getDate() + ' ' + day.toLocaleString('en-IN', { month: 'short' }) + ' ' + day.getFullYear();
    var text = 'Hi Poorvam Studio, I would like to book the hall.' +
      '\nFor: ' + e.purpose +
      '\nDate: ' + when +
      '\nTime: ' + hhmm(e.start) + ' to ' + hhmm(e.end) + ' (' + e.hours + ' hr' + (e.hours > 1 ? 's' : '') + ')' +
      '\nPeople: ' + people +
      '\nName: ' + name +
      '\nEstimate: ' + inr(e.total) + (e.deposit ? ' + ' + inr(e.deposit) + ' refundable deposit' : '') + ' (GST extra where applicable)';
    out.text.textContent = text;
    out.msg.hidden = false;
    track('studio_whatsapp_submit', { purpose: e.purpose, estimate: e.total, value: e.total, currency: 'INR' });
    if (PS.wa) window.open('https://wa.me/' + PS.wa + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    out.msg.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
  });

  var copyBtn = form.querySelector('[data-copy]');
  copyBtn.addEventListener('click', function () {
    var t = out.text.textContent;
    var done = function () { var l = copyBtn.lastChild; var was = l.textContent; l.textContent = ' Copied'; setTimeout(function () { l.textContent = was; }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(done, function () {});
    else { var r = document.createRange(); r.selectNodeContents(out.text); var s = getSelection(); s.removeAllRanges(); s.addRange(r); document.execCommand('copy'); done(); }
  });
})();
