(function () {
  'use strict';

  // order around the wheel, clockwise from the top
  var CATS = ['flower', 'green', 'water', 'smoke', 'other', 'food'];
  var COLORS = {
    flower: '#ff8fc6', green: '#7ccf6a', water: '#4fb0ff',
    smoke: '#d6cfc2', other: '#a98bff', food: '#ffb547'
  };
  var MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DAY11 = 'https://shinyanakashima.github.io/30daymapchallenge-2026day11-100soundscapes/';

  var T = {
    en: {
      title: 'The 100 Fragrant Landscapes of Japan',
      subtitle: 'a map of scents',
      lead: 'In 2001 Japan’s Ministry of the Environment chose 100 places where a scent is part of the landscape. Pick a scent on the wheel to see where it drifts.',
      pairKicker: 'Part 2 of a pair · Day 11',
      pairTitle: 'The 100 Soundscapes of Japan →',
      about: 'About & notes',
      countAll: 'All scents',
      wheelHint: 'Choose a scent',
      all: 'All',
      wheelLabel: 'Scent type',
      cat: {
        flower: 'Flowers', green: 'Woods & grass', water: 'Sea & water',
        smoke: 'Steam & smoke', other: 'Other', food: 'Food & drink'
      },
      catWheel: {
        flower: ['Flowers'], green: ['Woods &', 'grass'], water: ['Sea &', 'water'],
        smoke: ['Steam &', 'smoke'], other: ['Other'], food: ['Food &', 'drink']
      },
      catShort: { flower: 'Flowers', green: 'Woods', water: 'Sea', smoke: 'Steam', other: 'Other', food: 'Food' },
      also: 'also',
      season: 'Season',
      allYear: 'All year',
      estimated: 'estimated',
      pointNote: 'Point at the site',
      areaNote: 'Representative point of a wider area',
      monthsText: function (it) {
        if (it.all_year) return 'All year';
        return compressMonths(it.months).map(function (r) {
          return r[0] === r[1] ? MONTHS_EN[r[0] - 1] : MONTHS_EN[r[0] - 1] + '–' + MONTHS_EN[r[1] - 1];
        }).join(', ');
      },
      about_html:
        '<h3>About this map</h3>' +
        '<p>On 30 October 2001, Japan’s Ministry of the Environment selected the <b>100 Fragrant Landscapes of Japan</b> from 600 entries sent in from across the country: places where a good scent belongs to the scenery, the culture or daily life, and where local people work to keep it.</p>' +
        '<p>The hundred scents are placed on the map as soft hazes and sorted into six kinds. Pick one on the wheel and its places come forward while the others fade.</p>' +
        '<table>' +
        '<tr><td>Flowers</td><td>flowers, herbs and blossoming fruit trees</td></tr>' +
        '<tr><td>Woods &amp; grass</td><td>trees, forests, timber, moss, grassland and green fields</td></tr>' +
        '<tr><td>Sea &amp; water</td><td>tide, rocky shores, sea fog and river wind</td></tr>' +
        '<tr><td>Steam &amp; smoke</td><td>hot springs and sulphur, incense, kilns, bonfires and candles</td></tr>' +
        '<tr><td>Food &amp; drink</td><td>crackers, cooking, markets, fruit, tea, sake, vinegar and soy sauce</td></tr>' +
        '<tr><td>Other</td><td>old books, ink, glue, herbal medicine, face powder, indigo and rain on stone</td></tr>' +
        '</table>' +
        '<p>This is the second half of a pair. <a href="' + DAY11 + '">Day 11, The 100 Soundscapes of Japan</a>, maps sounds by <i>when</i> you can hear them; this map sorts scents by <i>what</i> they smell of.</p>' +
        '<h3>Notes</h3><ul>' +
        '<li>The list was selected in 2001. Some places may no longer smell the same today.</li>' +
        '<li>Points are representative locations. Towns, coasts, forests and farming areas are shown with one point.</li>' +
        '<li>The six kinds of scent are a guide, assigned from each name and its description. Places with more than one scent are placed by the main one; the others are listed as “also”.</li>' +
        '<li>Seasons come from the official pages. Months marked “estimated” were read from words such as “spring” or “autumn”.</li>' +
        '<li>Descriptions are short summaries written for this map, not quotations.</li>' +
        '</ul>' +
        '<h3>Sources</h3><ul>' +
        '<li>Ministry of the Environment, Japan: <a href="https://www.env.go.jp/air/kaori/ichiran.htm" target="_blank" rel="noopener">Kaori Fukei 100-sen (100 Fragrant Landscapes)</a>, list and entry pages; press release of 30 October 2001</li>' +
        '<li>Base map: land outline from <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a>; detail from <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">GSI Tiles (blank map)</a>, Geospatial Information Authority of Japan.</li>' +
        '</ul>' +
        '<p>#30DayMapChallenge 2026 · Day 19 · Senses: Smell · <a href="https://github.com/shinyanakashima/30daymapchallenge-2026day19-100fragrances" target="_blank" rel="noopener">Data &amp; code</a></p>' +
        '<p>Keyboard: ← / → move around the wheel, 0 shows all, Esc closes.</p>'
    },
    ja: {
      title: '日本のかおり風景100選',
      subtitle: 'かおりの地図',
      lead: '2001年、環境省は「かおり風景100選」を選びました。輪からかおりの種類を選ぶと、そのかおりの場所が浮かび上がります。',
      pairKicker: '2部作の後編・Day 11',
      pairTitle: '日本の音風景100選 音の暦 →',
      about: 'この地図について・注記',
      countAll: 'すべてのかおり',
      wheelHint: 'かおりを選ぶ',
      all: 'すべて',
      wheelLabel: 'かおりの種類',
      cat: {
        flower: '花', green: '木・森・草', water: '海・水辺',
        smoke: '湯けむり・煙', other: 'そのほか', food: '食べ物・飲み物'
      },
      catWheel: {
        flower: ['花'], green: ['木・森・草'], water: ['海・水辺'],
        smoke: ['湯けむり', '・煙'], other: ['そのほか'], food: ['食べ物', '・飲み物']
      },
      catShort: { flower: '花', green: '木・森', water: '海', smoke: '湯・煙', other: 'ほか', food: '食' },
      also: 'ほかに',
      season: '季節',
      allYear: '一年中',
      estimated: '推定',
      pointNote: '地点',
      areaNote: '範囲が広いため代表点',
      monthsText: function (it) {
        if (it.all_year) return '一年中';
        return compressMonths(it.months).map(function (r) {
          return r[0] === r[1] ? r[0] + '月' : r[0] + '〜' + r[1] + '月';
        }).join('、');
      },
      about_html:
        '<h3>この地図について</h3>' +
        '<p>2001年10月30日、環境省は全国から寄せられた600件の応募の中から「かおり風景100選」を選びました。よいかおりが自然や文化、暮らしと一体になった風景で、地域の人々がそのかおりを守り育てている場所です。</p>' +
        '<p>100のかおりを、ふわりと広がる霞として地図に置き、6つの種類に分けました。輪から種類を選ぶと、そのかおりの場所が濃く浮かび、ほかは薄くなります。</p>' +
        '<table>' +
        '<tr><td>花</td><td>花・ハーブ・花の咲く果樹</td></tr>' +
        '<tr><td>木・森・草</td><td>樹木・森林・材木・苔・草原・田畑の緑</td></tr>' +
        '<tr><td>海・水辺</td><td>潮・磯・海霧・川を渡る風</td></tr>' +
        '<tr><td>湯けむり・煙</td><td>温泉と硫黄・線香とお香・窯・焚火・ろうそく</td></tr>' +
        '<tr><td>食べ物・飲み物</td><td>せんべい・料理・市場・果実・茶・酒・酢・醤油</td></tr>' +
        '<tr><td>そのほか</td><td>古書・墨・にかわ・和漢薬・おしろい・藍・雨上がりの石</td></tr>' +
        '</table>' +
        '<p>この地図は2部作の後編です。<a href="' + DAY11 + '?lang=ja">Day 11「日本の音風景100選 音の暦」</a>は音を「いつ聞けるか」で見せ、この地図はかおりを「どんなかおりか」で見せます。</p>' +
        '<h3>注記</h3><ul>' +
        '<li>100選は2001年の選定です。今も同じようにかおるとは限りません。</li>' +
        '<li>地点は代表点です。町・海岸・森・農地など範囲の広いものも1点で示しています。</li>' +
        '<li>かおりの種類は、名称と説明から分けた目安です。複数のかおりがあるものは主なかおりで分け、ほかのかおりは「ほかに」として示しています。</li>' +
        '<li>季節は環境省の紹介ページによります。「推定」は「春」「秋」などの表現から月に読み替えたものです。</li>' +
        '<li>説明文はこの地図のために書いた短い要約で、紹介ページからの転載ではありません。</li>' +
        '</ul>' +
        '<h3>出典</h3><ul>' +
        '<li>環境省「<a href="https://www.env.go.jp/air/kaori/ichiran.htm" target="_blank" rel="noopener">かおり風景100選</a>」（一覧表・各地点の紹介ページ）、報道発表資料（2001年10月30日）</li>' +
        '<li>背景地図：陸域の輪郭 <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a>、詳細 <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">地理院タイル（白地図）</a>（国土地理院）</li>' +
        '</ul>' +
        '<p>#30DayMapChallenge 2026・Day 19・Senses: Smell・<a href="https://github.com/shinyanakashima/30daymapchallenge-2026day19-100fragrances" target="_blank" rel="noopener">データとコード</a></p>' +
        '<p>キーボード：← / → で輪を回る、0 ですべて、Esc で閉じる。</p>'
    }
  };

  function compressMonths(ms) {
    // ranges that may wrap around the year end (e.g. Dec–Mar)
    var set = {}; ms.forEach(function (m) { set[m] = true; });
    var starts = ms.filter(function (m) { return !set[m === 1 ? 12 : m - 1]; }).sort(function (a, b) { return a - b; });
    if (!starts.length) return [[1, 12]];
    return starts.map(function (s) {
      var e = s;
      while (set[e === 12 ? 1 : e + 1] && (e === 12 ? 1 : e + 1) !== s) e = e === 12 ? 1 : e + 1;
      return [s, e];
    });
  }

  // ---------- state ----------
  var params = new URLSearchParams(location.search);
  var state = { lang: 'en', focus: null, selected: null };
  try {
    var saved = localStorage.getItem('fragrances-lang');
    if (saved === 'ja' || saved === 'en') state.lang = saved;
  } catch (e) { /* storage unavailable */ }
  if (params.get('lang') === 'ja' || params.get('lang') === 'en') state.lang = params.get('lang');
  if (CATS.indexOf(params.get('scent')) >= 0) state.focus = params.get('scent');

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  var items = [];
  var byId = {};
  var counts = {};
  var $ = function (id) { return document.getElementById(id); };
  var SVGNS = 'http://www.w3.org/2000/svg';

  // ---------- map ----------
  var map = new maplibregl.Map({
    container: 'map',
    style: {
      version: 8,
      sources: {
        land: { type: 'geojson', data: 'data/japan-land.geojson' },
        gsi: {
          type: 'raster',
          tiles: ['https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png'],
          tileSize: 256, minzoom: 5, maxzoom: 14
        }
      },
      layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': '#0f141b' } },
        { id: 'land', type: 'fill', source: 'land', paint: { 'fill-color': '#262c35', 'fill-opacity': ['interpolate', ['linear'], ['zoom'], 5, 1, 6, 0] } },
        {
          id: 'gsi', type: 'raster', source: 'gsi', minzoom: 5,
          paint: {
            'raster-opacity': ['interpolate', ['linear'], ['zoom'], 5, 0, 6, 1],
            'raster-brightness-max': 0.16,
            'raster-brightness-min': 0.04,
            'raster-saturation': -1,
            'raster-contrast': 0
          }
        }
      ]
    },
    bounds: [[122.6, 24.0], [146.2, 45.6]],
    fitBoundsOptions: { padding: fitPadding() },
    minZoom: 3,
    maxZoom: 12,
    attributionControl: false,
    dragRotate: false,
    pitchWithRotate: false,
    keyboard: false
  });
  map.touchZoomRotate.disableRotation();
  window.fragranceMap = map;
  map.addControl(new maplibregl.AttributionControl({
    compact: true,
    customAttribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">地理院タイル (GSI)</a> | <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a> | Data: <a href="https://www.env.go.jp/air/kaori/ichiran.htm" target="_blank" rel="noopener">環境省 Ministry of the Environment</a>'
  }), 'bottom-right');
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

  function fitPadding() {
    var w = window.innerWidth;
    if (w <= 720) return { top: 165, bottom: 205, left: 20, right: 20 };
    return { top: 30, bottom: 30, left: 260, right: 220 };
  }

  function catColor() {
    return ['match', ['get', 'category'], 'flower', COLORS.flower, 'green', COLORS.green, 'water', COLORS.water,
      'smoke', COLORS.smoke, 'other', COLORS.other, COLORS.food];
  }
  // feature-state "f": 1 = in focus (or no focus), 0 = faded
  var F = ['coalesce', ['feature-state', 'f'], 1];
  var SEL = ['boolean', ['feature-state', 'sel'], false];

  // haze radius at each zoom; B is the breathing factor (an expression)
  function hazeRadius(scale, B) {
    return ['interpolate', ['exponential', 1.6], ['zoom'],
      3, ['*', 13 * scale, B],
      5, ['*', 30 * scale, B],
      7, ['*', 54 * scale, B],
      10, ['*', 100 * scale, B],
      12, ['*', 140 * scale, B]];
  }
  function breath(t, amp, speed, key) {
    return ['+', 1, ['*', amp, ['sin', ['+', t * speed, ['get', key]]]]];
  }

  map.on('load', function () {
    fetch('data/fragrances.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        items = data.items;
        items.forEach(function (it) {
          byId[it.id] = it;
          counts[it.category] = (counts[it.category] || 0) + 1;
        });
        var fc = {
          type: 'FeatureCollection',
          features: items.map(function (it) {
            return {
              type: 'Feature', id: it.id,
              // per-point phases so the hazes do not breathe in step
              properties: { id: it.id, category: it.category, p1: (it.id * 2.39996) % 6.2832, p2: (it.id * 1.3) % 6.2832 },
              geometry: { type: 'Point', coordinates: [it.lon, it.lat] }
            };
          })
        };
        map.addSource('pts', { type: 'geojson', data: fc });

        map.addLayer({
          id: 'haze-wide', type: 'circle', source: 'pts',
          paint: {
            'circle-radius': hazeRadius(1, 1),
            'circle-color': catColor(),
            'circle-blur': 1,
            'circle-opacity': ['case', ['==', F, 1], 0.34, 0.035],
            'circle-pitch-alignment': 'map'
          }
        });
        map.addLayer({
          id: 'haze-drift', type: 'circle', source: 'pts',
          paint: {
            'circle-radius': hazeRadius(0.7, 1),
            'circle-color': catColor(),
            'circle-blur': 1,
            'circle-opacity': ['case', ['==', F, 1], 0.3, 0.03],
            'circle-translate': [0, 0]
          }
        });
        map.addLayer({
          id: 'haze-core', type: 'circle', source: 'pts',
          paint: {
            'circle-radius': hazeRadius(0.26, 1),
            'circle-color': catColor(),
            'circle-blur': 0.9,
            'circle-opacity': ['case', ['==', F, 1], 0.5, 0.05]
          }
        });
        map.addLayer({
          id: 'sel', type: 'circle', source: 'pts',
          paint: {
            'circle-radius': hazeRadius(0.42, 1),
            'circle-color': 'rgba(0,0,0,0)',
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': ['case', SEL, 0.9, 0]
          }
        });
        // invisible target for clicks
        map.addLayer({
          id: 'hit', type: 'circle', source: 'pts',
          paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 9, 8, 14],
            'circle-color': '#000',
            'circle-opacity': 0
          }
        });

        map.on('click', function (e) {
          var pad = window.innerWidth <= 720 ? 16 : 10;
          var hits = map.queryRenderedFeatures([[e.point.x - pad, e.point.y - pad], [e.point.x + pad, e.point.y + pad]], { layers: ['hit'] });
          var best = null, bd = Infinity;
          hits.forEach(function (f) {
            var it = byId[f.properties.id];
            var p = map.project([it.lon, it.lat]);
            var d = Math.hypot(p.x - e.point.x, p.y - e.point.y);
            // prefer points of the scent in focus
            if (state.focus && it.category !== state.focus) d += 1000;
            if (d < bd) { bd = d; best = it; }
          });
          select(best ? best.id : null);
        });
        map.on('mousemove', function (e) {
          var hits = map.queryRenderedFeatures([[e.point.x - 8, e.point.y - 8], [e.point.x + 8, e.point.y + 8]], { layers: ['hit'] });
          map.getCanvas().style.cursor = hits.length ? 'pointer' : '';
        });

        if (window.innerWidth <= 720) {
          var attrib = document.querySelector('.maplibregl-ctrl-attrib');
          if (attrib) { attrib.classList.remove('maplibregl-compact-show'); attrib.removeAttribute('open'); }
        }
        buildWheel();
        buildCounts();
        applyFocus();
        startAnimation();
      });
  });

  // ---------- focus ----------
  function setFocus(c) {
    state.focus = (c && c !== state.focus) ? c : null;
    applyFocus();
  }
  function applyFocus() {
    var t = T[state.lang];
    items.forEach(function (it) {
      var on = !state.focus || it.category === state.focus;
      if (map.getSource('pts')) map.setFeatureState({ source: 'pts', id: it.id }, { f: on ? 1 : 0 });
    });
    Array.prototype.forEach.call(document.querySelectorAll('#wheel .seg'), function (g) {
      var c = g.getAttribute('data-cat');
      g.setAttribute('aria-pressed', state.focus === c ? 'true' : 'false');
      g.classList.toggle('dim', !!state.focus && state.focus !== c);
    });
    var hub = document.querySelector('#wheel .hub');
    if (hub) hub.setAttribute('aria-pressed', state.focus ? 'false' : 'true');
    Array.prototype.forEach.call(document.querySelectorAll('#countList button'), function (b) {
      var c = b.getAttribute('data-cat');
      b.setAttribute('aria-pressed', state.focus === c ? 'true' : 'false');
      b.classList.toggle('dim', !!state.focus && state.focus !== c);
    });
    $('countFocus').textContent = state.focus ? t.cat[state.focus] : t.countAll;
    $('countTotal').textContent = state.focus ? (counts[state.focus] || 0) : items.length;
    try {
      var u = new URL(location.href);
      if (state.focus) u.searchParams.set('scent', state.focus); else u.searchParams.delete('scent');
      history.replaceState(null, '', u.toString());
    } catch (e) { /* ignore */ }
    if (reduceMotion && reduceMotion.matches) drawStatic();
  }

  // ---------- wheel ----------
  function polar(r, deg) {
    var a = (deg - 90) * Math.PI / 180;
    return [r * Math.cos(a), r * Math.sin(a)];
  }
  function arcPath(r0, r1, a0, a1) {
    var p0 = polar(r1, a0), p1 = polar(r1, a1), p2 = polar(r0, a1), p3 = polar(r0, a0);
    var large = (a1 - a0) > 180 ? 1 : 0;
    return 'M' + p0[0].toFixed(2) + ',' + p0[1].toFixed(2) +
      'A' + r1 + ',' + r1 + ' 0 ' + large + ' 1 ' + p1[0].toFixed(2) + ',' + p1[1].toFixed(2) +
      'L' + p2[0].toFixed(2) + ',' + p2[1].toFixed(2) +
      'A' + r0 + ',' + r0 + ' 0 ' + large + ' 0 ' + p3[0].toFixed(2) + ',' + p3[1].toFixed(2) + 'Z';
  }
  function el(name, attrs, parent) {
    var e = document.createElementNS(SVGNS, name);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(e);
    return e;
  }
  function isNarrow() { return window.innerWidth <= 720; }

  function buildWheel() {
    var svg = $('wheel');
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var t = T[state.lang];
    var narrow = isNarrow();
    svg.setAttribute('aria-label', t.wheelLabel);
    var R0 = 50, R1 = 124, GAP = 1.6, step = 360 / CATS.length;
    CATS.forEach(function (c, i) {
      var a0 = i * step - step / 2 + GAP, a1 = i * step + step / 2 - GAP;
      var g = el('g', { 'class': 'seg', 'data-cat': c, role: 'button', tabindex: '0', 'aria-pressed': 'false' }, svg);
      el('path', { 'class': 'fill', d: arcPath(R0, R1, a0, a1), fill: COLORS[c] }, g);
      el('path', { 'class': 'ring', d: arcPath(R0 + 2, R1 - 2, a0 + 0.8, a1 - 0.8) }, g);
      var title = el('title', {}, g);
      title.textContent = t.cat[c] + ': ' + (counts[c] || 0);
      g.setAttribute('aria-label', t.cat[c] + ', ' + (counts[c] || 0));
      var mid = polar(87, i * step);
      var lines = narrow ? [t.catShort[c]] : t.catWheel[c];
      var lh = narrow ? 17 : 13;
      var y0 = mid[1] - (lines.length - 1) * lh / 2 - (narrow ? -5 : 4);
      lines.forEach(function (s, k) {
        var tx = el('text', { x: mid[0].toFixed(1), y: (y0 + k * lh).toFixed(1), 'text-anchor': 'middle' }, g);
        if (narrow) tx.setAttribute('style', 'font-size:' + (state.lang === 'ja' ? 19 : 17) + 'px');
        tx.textContent = s;
      });
      if (!narrow) {
        var tn = el('text', { 'class': 'n', x: mid[0].toFixed(1), y: (y0 + lines.length * lh).toFixed(1), 'text-anchor': 'middle' }, g);
        tn.textContent = counts[c] || 0;
      }
      g.addEventListener('click', function () { setFocus(c); });
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFocus(c); }
      });
    });
    var hub = el('g', { 'class': 'hub', role: 'button', tabindex: '0', 'aria-pressed': 'true', 'aria-label': t.all }, svg);
    el('circle', { r: R0 - 5 }, hub);
    var h1 = el('text', { y: narrow ? -2 : -6, 'text-anchor': 'middle' }, hub);
    h1.textContent = t.all;
    if (narrow) h1.setAttribute('style', 'font-size:17px');
    var h2 = el('text', { 'class': 'n', y: narrow ? 20 : 16, 'text-anchor': 'middle' }, hub);
    h2.textContent = items.length;
    if (narrow) h2.setAttribute('style', 'font-size:22px');
    hub.addEventListener('click', function () { setFocus(null); });
    hub.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFocus(null); }
    });
  }

  function buildCounts() {
    var ul = $('countList');
    ul.innerHTML = '';
    var t = T[state.lang];
    var max = Math.max.apply(null, CATS.map(function (c) { return counts[c] || 0; }));
    CATS.forEach(function (c) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-cat', c);
      b.setAttribute('aria-pressed', 'false');
      b.innerHTML = '<i class="dot" style="background:' + COLORS[c] + ';color:' + COLORS[c] + '"></i>' +
        '<span>' + esc(t.cat[c]) + '</span><span class="n">' + (counts[c] || 0) + '</span>' +
        '<i class="bar" style="background:' + COLORS[c] + ';width:' + Math.round(100 * (counts[c] || 0) / max) + '%"></i>';
      b.addEventListener('click', function () { setFocus(c); });
      li.appendChild(b);
      ul.appendChild(li);
    });
  }

  // ---------- keyboard ----------
  document.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName) || '';
    if (e.key === 'Escape') { select(null); closeAbout(); return; }
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    var i = state.focus ? CATS.indexOf(state.focus) : -1;
    if (e.key === 'ArrowRight') { setFocus(CATS[(i + 1) % CATS.length]); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { setFocus(CATS[(i - 1 + CATS.length) % CATS.length]); e.preventDefault(); }
    else if (e.key === '0') { setFocus(null); }
  });

  // ---------- card ----------
  function select(id) {
    if (state.selected && map.getSource('pts')) map.setFeatureState({ source: 'pts', id: state.selected }, { sel: false });
    state.selected = id;
    if (!id) { $('card').hidden = true; return; }
    map.setFeatureState({ source: 'pts', id: id }, { sel: true });
    renderCard();
    $('card').hidden = false;
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function renderCard() {
    var it = byId[state.selected];
    if (!it) return;
    var t = T[state.lang];
    var ja = state.lang === 'ja';
    var col = COLORS[it.category];
    var cat = '<i class="dot" style="background:' + col + ';color:' + col + '"></i>' + esc(t.cat[it.category]) + ' · No. ' + it.id;
    if (it.category_also.length) {
      cat += '<span class="also">' + esc(t.also) + ': ' + it.category_also.map(function (c) { return esc(t.cat[c]); }).join(ja ? '、' : ', ') + '</span>';
    }
    $('cardCat').innerHTML = cat;
    $('cardName').textContent = ja ? it.name_ja : it.name_en;
    $('cardAlt').textContent = ja ? it.name_en : it.name_ja;
    $('cardPlace').textContent = ja
      ? it.prefecture_ja + '・' + it.municipality_ja
      : it.municipality_en + ', ' + it.prefecture_en;
    $('cardDesc').textContent = ja ? it.description_ja : it.description_en;
    var cells = '';
    for (var m = 1; m <= 12; m++) {
      var on = it.months.indexOf(m) >= 0;
      cells += '<span class="' + (on ? 'on' : '') + '"' + (on ? ' style="background:' + col + '"' : '') + '>' +
        (ja ? m : MONTHS_EN[m - 1].charAt(0)) + '</span>';
    }
    $('cardMonths').innerHTML = cells;
    var when = '<b>' + esc(t.season) + ':</b> ' + esc(t.monthsText(it)) + (it.months_estimated ? '<span class="est">' + esc(t.estimated) + '</span>' : '');
    if (ja) when += '<br><span style="color:var(--ink-3)">紹介ページの季節：' + esc(it.months_basis_ja) + '</span>';
    $('cardWhen').innerHTML = when;
    var loc = esc(it.location_type === 'area' ? t.areaNote : t.pointNote);
    if (ja) {
      loc += '：' + esc(it.location_note_ja) +
        '<br>かおりの源：' + esc(it.scent_source_ja);
      if (it.municipality_listed_ja !== it.municipality_ja) loc += '<br>100選一覧表の市町村：' + esc(it.municipality_listed_ja);
    }
    $('cardLoc').innerHTML = loc;
  }
  $('cardClose').addEventListener('click', function () { select(null); });

  // ---------- about ----------
  function openAbout() {
    $('aboutBody').innerHTML = T[state.lang].about_html;
    $('about').hidden = false;
    document.querySelector('.about-btn').setAttribute('aria-expanded', 'true');
    $('aboutClose').focus();
  }
  function closeAbout() {
    if ($('about').hidden) return;
    $('about').hidden = true;
    document.querySelector('.about-btn').setAttribute('aria-expanded', 'false');
  }
  document.querySelector('.about-btn').addEventListener('click', function () { if ($('about').hidden) openAbout(); else closeAbout(); });
  $('aboutClose').addEventListener('click', closeAbout);

  // ---------- language ----------
  function applyLang() {
    var t = T[state.lang];
    document.documentElement.lang = state.lang;
    document.title = state.lang === 'ja' ? '日本のかおり風景100選 かおりの地図' : 'The 100 Fragrant Landscapes of Japan: a map of scents';
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (e) {
      var v = t[e.getAttribute('data-i18n')];
      if (typeof v === 'string') e.textContent = v;
    });
    $('pairLink').href = DAY11 + (state.lang === 'ja' ? '?lang=ja' : '');
    Array.prototype.forEach.call(document.querySelectorAll('.lang button'), function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === state.lang ? 'true' : 'false');
    });
    if (!$('about').hidden) $('aboutBody').innerHTML = t.about_html;
    if (items.length) {
      buildWheel();
      buildCounts();
      applyFocus();
      if (state.selected) renderCard();
    }
  }
  Array.prototype.forEach.call(document.querySelectorAll('.lang button'), function (b) {
    b.addEventListener('click', function () {
      state.lang = b.getAttribute('data-lang');
      try { localStorage.setItem('fragrances-lang', state.lang); } catch (e) { /* ignore */ }
      try {
        var u = new URL(location.href);
        if (u.searchParams.has('lang')) { u.searchParams.set('lang', state.lang); history.replaceState(null, '', u.toString()); }
      } catch (e) { /* ignore */ }
      applyLang();
    });
  });

  var lastNarrow = isNarrow();
  window.addEventListener('resize', function () {
    if (isNarrow() !== lastNarrow && items.length) { lastNarrow = isNarrow(); buildWheel(); applyFocus(); }
  });

  // ---------- haze animation ----------
  // The hazes slowly breathe and the middle layer drifts a little, like a scent on a light wind.
  var rafId = null;
  var lastDraw = 0;
  function drawHaze(t, drift) {
    if (!map.getLayer('haze-wide')) return;
    map.setPaintProperty('haze-wide', 'circle-radius', hazeRadius(1, breath(t, 0.13, 0.55, 'p1')));
    map.setPaintProperty('haze-drift', 'circle-radius', hazeRadius(0.7, breath(t, 0.2, 0.8, 'p2')));
    map.setPaintProperty('haze-core', 'circle-radius', hazeRadius(0.26, breath(t, 0.08, 0.9, 'p1')));
    map.setPaintProperty('haze-drift', 'circle-translate', drift);
  }
  function frame(ts) {
    if (ts - lastDraw > 50) {
      var t = ts / 1000;
      drawHaze(t, [Math.sin(t * 0.21) * 5 + 2, Math.cos(t * 0.17) * 3 - 1]);
      lastDraw = ts;
    }
    rafId = requestAnimationFrame(frame);
  }
  function drawStatic() {
    if (!map.getLayer('haze-wide')) return;
    map.setPaintProperty('haze-wide', 'circle-radius', hazeRadius(1, 1));
    map.setPaintProperty('haze-drift', 'circle-radius', hazeRadius(0.7, 1));
    map.setPaintProperty('haze-core', 'circle-radius', hazeRadius(0.26, 1));
    map.setPaintProperty('haze-drift', 'circle-translate', [0, 0]);
  }
  function startAnimation() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    if (reduceMotion && reduceMotion.matches) { drawStatic(); return; }
    rafId = requestAnimationFrame(frame);
  }
  if (reduceMotion && reduceMotion.addEventListener) {
    reduceMotion.addEventListener('change', function () { if (map.getLayer('haze-wide')) startAnimation(); });
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && rafId) { cancelAnimationFrame(rafId); rafId = null; }
    else if (!document.hidden && map.getLayer && map.getLayer('haze-wide')) startAnimation();
  });

  applyLang();
})();
