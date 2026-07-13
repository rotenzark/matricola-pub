/* ===== MATRICOLA PUB · main.js ===== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro = document.getElementById('intro');
  function closeIntro() { if (intro) { intro.classList.add('done'); setTimeout(function () { intro.style.display = 'none'; }, 800); } }
  if (intro) { if (reduce) intro.style.display = 'none'; else { document.getElementById('intro-skip').addEventListener('click', closeIntro); setTimeout(closeIntro, 2600); } }

  var header = document.getElementById('site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.getElementById('burger'), nav = document.querySelector('.nav');
  burger.addEventListener('click', function () { var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); document.body.style.overflow = ''; }); });

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (r) { io.observe(r); });
    setTimeout(function () { reveals.forEach(function (r) { if (r.getBoundingClientRect().top < window.innerHeight) r.classList.add('in'); }); }, 1500);
  } else reveals.forEach(function (r) { r.classList.add('in'); });

  function romeNow() { return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' })); }
  function closeOf(day) { return (day === 5 || day === 6) ? 2 : 1; } // Fri/Sat close 02, else 01
  function isOpen(d) { var day = d.getDay(), h = d.getHours() + d.getMinutes() / 60; if (h >= 18) return true; var prev = (day + 6) % 7; return h < closeOf(prev); }
  function updateLive() {
    var d = romeNow(), open = isOpen(d), dot = document.getElementById('live-dot'), txt = document.getElementById('live-text');
    if (!dot) return; var en = LANG === 'en', day = d.getDay(), close = closeOf(day);
    if (open) { dot.className = 'open'; txt.textContent = en ? ('Open now · closes at 0' + close + ':00') : ('Aperto ora · chiude alle 0' + close + ':00'); }
    else { dot.className = 'closed'; txt.textContent = en ? 'Closed · opens today at 18:00' : 'Chiuso · apre oggi alle 18:00'; }
  }

  var lb = document.getElementById('lightbox'), lbImg = document.getElementById('lb-img');
  document.querySelectorAll('.g-item').forEach(function (fig) { fig.addEventListener('click', function () { lbImg.src = fig.getAttribute('data-full'); lbImg.alt = (fig.querySelector('img') || {}).alt || ''; lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); }); });
  function closeLb() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); setTimeout(function () { lbImg.src = ''; }, 300); }
  document.getElementById('lb-close').addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  var LANG = 'it';
  var EN = {
    'intro.txt': 'Matricola', 'intro.skip': 'Enter →', 'brand.sub': 'Pub · Politecnico · Città Studi',
    'nav.serata': 'The night', 'nav.cucina': 'Beer & food', 'nav.eventi': 'Events', 'nav.dove': 'Find us', 'cta.call': 'Call',
    'hero.badge': 'By the Politecnico · from 6pm', 'hero.h1a': 'Matricola.', 'hero.h1b': 'From 6pm till late.',
    'hero.sub': "The Città Studi pub where the night starts with an aperitivo and ends when it's already tomorrow. Beers on tap, burgers, cocktails and themed nights, among the dark-wood interiors.",
    'hero.cta1': 'The night', 'hero.cta2': 'Book a table', 'hero.live': 'Checking hours…',
    'serata.kicker': 'The night', 'serata.h2': 'How it ends up.', 'serata.lead': "A quick aperitivo that turns into dinner, then beer, then cocktails — «as often happens», they write. Here's how an evening at Matricola flows.",
    's.1t': 'Aperitivo', 's.1p': 'It starts: a cold beer or a cocktail and nibbles, right after lectures.',
    's.2t': 'Dinner', 's.2p': 'Burgers, tartare, big salads: pub food, the kind that really fills you up.',
    's.3t': 'Beer & cocktails', 's.3p': 'Time for the taps and the «Matricola\'s cocktails». Dark wood, chatter, music.',
    's.4t': 'Last round', 's.4p': 'We close at 1, on Friday and Saturday at 2. Then we\'ll see.',
    'cucina.kicker': 'Beer & food', 'cucina.h2': 'On tap and off the grill.',
    'cc.1t': 'Beers on tap', 'cc.1p': 'Guinness, Trappist and craft, always rotating. Plus a bottle list.',
    'cc.2t': 'Kitchen', 'cc.2p': 'Burgers, tartare, big salads and daily specials. Aperitivo that becomes dinner.',
    'cc.3t': 'Cocktails', 'cc.3p': 'The «Matricola\'s cocktails» and the great classics, from aperitivo to last round.',
    'cucina.note': 'Full menu in the pub and on matricolapub.it. Prices to be confirmed.',
    'eventi.kicker': 'Events & themed nights', 'eventi.h2': 'Never just a Thursday.',
    'eventi.p1': "Matricola transforms itself: from the «Garrison» Peaky Blinders night — 1920s, (fake) gambling, magic and vintage atmospheres — to the regular events that keep Città Studi alive.",
    'eventi.p2': "Keep an eye on the calendar: there's almost always a good reason to drop by.",
    'gallery.kicker': 'Gallery', 'gallery.h2': 'Inside Matricola',
    'rev.kicker': 'Voices', 'rev.h2': '2,313 reviews, 4.0★',
    'dove.kicker': 'Find us', 'dove.h2': 'In Città Studi,<br>facing the Politecnico.',
    'dove.addr': 'Address', 'dove.hours': 'Hours', 'dove.hoursv': 'Every night from 6pm · until 1 (Fri–Sat until 2)', 'dove.phone': 'Phone', 'dove.call': 'Call & book', 'dove.route': 'Get directions',
    'faq.h2': 'Frequently asked',
    'faq.q1': 'Where are you?', 'faq.a1': 'At Viale Romagna 43, in Città Studi, near the Politecnico.',
    'faq.q2': 'When are you open?', 'faq.a2': 'Every night from 6pm: until 1, on Friday and Saturday until 2.',
    'faq.q3': 'Is there food?', 'faq.a3': 'Yes: aperitivo, burgers, tartare, big salads and our cocktails, plus beers on tap.',
    'faq.q4': 'Do you do themed nights?', 'faq.a4': 'Yes, we organise themed nights and events. Call for the calendar.',
    'foot.sub': 'Città Studi · Milan', 'foot.where': 'Where', 'foot.hours': 'Hours', 'foot.hoursv': 'Every night from 6pm', 'foot.contact': 'Contact',
    'foot.disclaimer': 'Demo website. Content and photos gathered from public sources (Google Maps); hours, menu and prices are indicative, to be confirmed with the pub.',
    'ab.call': 'Call', 'ab.route': 'Directions'
  };
  var IT = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) { IT[el.getAttribute('data-i18n')] = el.innerHTML; });
  function setLang(lang) {
    LANG = lang; var dict = lang === 'en' ? EN : IT;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'), v = dict[k]; if (v == null && lang === 'en') v = IT[k]; if (v != null) el.innerHTML = v; });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-lang') === lang); });
    updateLive();
  }
  document.querySelectorAll('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); }); });
  updateLive(); setInterval(updateLive, 60000);
})();
