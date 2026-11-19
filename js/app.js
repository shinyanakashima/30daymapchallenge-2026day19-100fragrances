(function () {
  'use strict';

  // order around the wheel, clockwise from the top
  var CATS = ['flower', 'green', 'water', 'smoke', 'other', 'food'];
  // palette taken from the Mapterhorn logo, as in Day 11
  // hues from the Mapterhorn logo, toned down so the hazes read as scent rather than neon
  var COLORS = {
    flower: '#ff6eb4', green: '#b8e05a', water: '#3cd2ad',
    smoke: '#b77cf2', other: '#cfc2f2', food: '#ff9a52'
  };
  var MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DAY11 = 'https://shinyanakashima.github.io/30daymapchallenge-2026day11-100soundscapes/';

  var T = {
    en: {
      title: 'The 100 Fragrant Landscapes of Japan',
      subtitle: 'a map of scents',
      lead: '100 places where a scent is part of the landscape, chosen in 2001 by Japan’s Ministry of the Environment.',
      pairShort: 'Day 11: Soundscapes →',
      aboutShort: 'About',
      pairKicker: 'Part 2 of a pair · Day 11',
      pairTitle: 'The 100 Soundscapes of Japan →',
      about: 'About & notes',
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
      catNote: {
        flower: 'lavender, plum, wisteria, peony, osmanthus',
        green: 'cedar, cypress, camphor, moss, grassland',
        water: 'tide, rocky shores, sea fog, river wind',
        smoke: 'hot springs, incense, kilns, candles',
        other: 'old books, ink, indigo, rain on stone',
        food: 'crackers, tea, sake, soy sauce, eel'
      },
      hubAll: 'all scents',
      monthName: function (m) { return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][m - 1]; },
      monthTick: function (m) { return MONTHS_EN[m - 1].charAt(0); },
      monthHint: function (m, n) { return 'Scents of ' + ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][m - 1] + ': ' + n + ' places'; },
      monthLabel: 'Month',
      also: 'also',
      tour: 'Tour from the south', tourShort: 'Tour', tourStop: 'Stop', tourSpeed: 'Tour speed', tourPause: 'Pause', tourResume: 'Resume', tourPrev: 'Previous place', tourNext: 'Next place',
      photo: 'Photo',
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
        '<li>Photos come from Wikipedia and Wikimedia Commons under the licence shown with each one. Some show the town or the subject (a flower, a dish) rather than the exact place.</li>' +
        '</ul>' +
        '<h3>Sources</h3><ul>' +
        '<li>Ministry of the Environment, Japan: <a href="https://www.env.go.jp/air/kaori/ichiran.htm" target="_blank" rel="noopener">Kaori Fukei 100-sen (100 Fragrant Landscapes)</a>, list and entry pages; press release of 30 October 2001</li>' +
        '<li>Base map: land outline from <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a>; detail from <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">GSI Tiles (blank map)</a>, Geospatial Information Authority of Japan.</li>' +
        '</ul>' +
        '<p>#30DayMapChallenge 2026 · Day 19 · Senses: Smell · <a href="https://github.com/shinyanakashima/30daymapchallenge-2026day19-100fragrances" target="_blank" rel="noopener">Data &amp; code</a></p>' +
        '<p>The map is tilted, and a thin plume of scent rises from each place, swaying as it fades.</p>' +
        '<p>The outer ring of the wheel picks a month: only the scents of that month stay lit. Hover a name tag or a dot on the wheel to find a place.</p>' +
        '<p>“Tour from the south” visits the places one by one from Okinawa up to Hokkaido (only the scents chosen on the wheel, if any). Drag the map, click a place or press Esc to stop. The buttons over the photo (or Space) pause and resume, and ×1 (or + / −) changes the speed.</p>' +
        '<p>Keyboard: ← / → move around the wheel (during the tour, previous / next place), ↑ / ↓ change the month, 0 shows all, Esc closes.</p>'
    },
    ja: {
      title: '日本のかおり風景100選',
      subtitle: 'かおりの地図',
      lead: '2001年に環境省が選んだ、かおりが風景の一部になっている100の場所。',
      pairShort: 'Day 11 音の暦 →',
      aboutShort: '注記',
      pairKicker: '2部作の後編・Day 11',
      pairTitle: '日本の音風景100選 音の暦 →',
      about: 'この地図について・注記',
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
      catNote: {
        flower: 'ラベンダー・梅・藤・牡丹・金木犀',
        green: '杉・檜・楠・苔・草原',
        water: '潮・磯・海霧・川を渡る風',
        smoke: '温泉・線香・窯・ろうそく',
        other: '古書・墨・藍・雨上がりの石',
        food: 'せんべい・茶・酒・醤油・うなぎ'
      },
      hubAll: 'すべて',
      monthName: function (m) { return m + '月'; },
      monthTick: function (m) { return String(m); },
      monthHint: function (m, n) { return m + '月にかおる場所 ' + n + '件'; },
      monthLabel: '月',
      also: 'ほかに',
      tour: '南からめぐる', tourShort: 'めぐる', tourStop: '止める', tourSpeed: 'ツアーの速さ', tourPause: '一時停止', tourResume: '再開', tourPrev: '前の場所', tourNext: '次の場所',
      photo: '写真',
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
        '<li>写真はWikipedia・Wikimedia Commonsの自由ライセンス画像で、ライセンスは写真ごとに表示しています。地点そのものではなく、町や対象（花・料理など）の写真の場合があります。</li>' +
        '</ul>' +
        '<h3>出典</h3><ul>' +
        '<li>環境省「<a href="https://www.env.go.jp/air/kaori/ichiran.htm" target="_blank" rel="noopener">かおり風景100選</a>」（一覧表・各地点の紹介ページ）、報道発表資料（2001年10月30日）</li>' +
        '<li>背景地図：陸域の輪郭 <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a>、詳細 <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">地理院タイル（白地図）</a>（国土地理院）</li>' +
        '</ul>' +
        '<p>#30DayMapChallenge 2026・Day 19・Senses: Smell・<a href="https://github.com/shinyanakashima/30daymapchallenge-2026day19-100fragrances" target="_blank" rel="noopener">データとコード</a></p>' +
        '<p>地図を斜めから見下ろし、各地点からかおりが細く立ちのぼって揺れながら消えていく様子を描いています。</p>' +
        '<p>輪の外周で月を選ぶと、その月にかおる場所だけが残ります。輪の縁の点にマウスを乗せると、その場所が地図に示されます。</p>' +
        '<p>「南からめぐる」を押すと、沖縄から北海道へ南から順に1か所ずつめぐります（輪で種類や月を選んでいるときは、その場所だけ）。地図をドラッグする、地点を押す、Esc で止まります。写真の上のボタン（またはスペース）で一時停止・再開、×1 のボタン（または ＋ / −）で速さを変えられます。</p>' +
        '<p>キーボード：← / → で輪を回る（ツアー中は前後の場所へ）、↑ / ↓ で月を変える、0 ですべて、Esc で閉じる。</p>'
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
  var state = { lang: 'en', focus: null, preview: null, month: null, selected: null };
  try {
    var saved = localStorage.getItem('fragrances-lang');
    if (saved === 'ja' || saved === 'en') state.lang = saved;
  } catch (e) { /* storage unavailable */ }
  if (params.get('lang') === 'ja' || params.get('lang') === 'en') state.lang = params.get('lang');
  if (CATS.indexOf(params.get('scent')) >= 0) state.focus = params.get('scent');
  var pm = parseInt(params.get('month'), 10);
  if (pm >= 1 && pm <= 12) state.month = pm;

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
        seamask: { type: 'geojson', data: 'data/japan-sea-mask.geojson' },
        gsi: {
          type: 'raster',
          tiles: ['https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png'],
          tileSize: 256, minzoom: 5, maxzoom: 14,
          // the blank map has no tiles over the open sea beyond Japan
          bounds: [121.0, 19.4, 154.0, 46.9]
        }
      },
      layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': '#0a0919' } },
        { id: 'land', type: 'fill', source: 'land', paint: { 'fill-color': '#1f1b42', 'fill-outline-color': '#2f2a5e' } },
        {
          id: 'gsi', type: 'raster', source: 'gsi', minzoom: 5,
          paint: {
            // light overlay on the indigo land: keeps prefecture lines and labels faintly visible
            'raster-opacity': ['interpolate', ['linear'], ['zoom'], 5, 0, 6, 0.07, 9, 0.1],
            'raster-saturation': -1
          }
        },
        // the blank-map tiles paint the sea white too, so cover everything outside the land outline
        { id: 'seamask', type: 'fill', source: 'seamask', minzoom: 5, paint: { 'fill-color': '#0a0919', 'fill-antialias': false } }
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
  // the map is tilted so the scents can rise from it
  // a tilted view, north kept roughly at the top so the outline of Japan stays familiar
  function camAngles() { return isNarrow() ? { pitch: 45, bearing: 18 } : { pitch: 45, bearing: -12 }; }
  var FRAME = [[122.9, 24.3], [124.2, 24.4], [129.7, 33.2], [130.6, 31.2], [132.6, 32.8], [135.8, 33.5], [139.0, 34.7], [140.9, 35.7],
    [141.6, 38.3], [142.0, 39.6], [141.3, 41.4], [139.9, 41.5], [141.6, 45.4], [145.6, 43.3], [143.9, 42.9], [139.4, 38.2], [135.2, 35.6], [130.9, 34.3]];
  function setCamera() {
    var a = camAngles(), pad = fitPadding(), W = map.getContainer().clientWidth, H = map.getContainer().clientHeight;
    var cam = map.cameraForBounds([[122.6, 24.0], [146.2, 45.6]], { padding: pad, bearing: a.bearing });
    if (!cam) return;
    map.jumpTo({ center: cam.center, zoom: cam.zoom, bearing: a.bearing, pitch: a.pitch });
    // fit the tilted outline of Japan into the free area of the screen, leaving room above for the rising scent
    var top = pad.top + 40;
    for (var k = 0; k < 4; k++) {
      var xs = [], ys = [];
      FRAME.forEach(function (c) { var q = map.project(c); xs.push(q.x); ys.push(q.y); });
      var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
      var aw = W - pad.left - pad.right, ah = H - top - pad.bottom;
      var dz = Math.log(Math.min(aw / (x1 - x0), ah / (y1 - y0))) / Math.LN2;
      var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, tx = pad.left + aw / 2, ty = top + ah / 2;
      var c0 = map.unproject([cx, cy]), c1 = map.unproject([tx, ty]);
      var cen = map.getCenter();
      map.jumpTo({ center: [cen.lng + (c0.lng - c1.lng), cen.lat + (c0.lat - c1.lat)], zoom: map.getZoom() + dz * 0.9 });
    }
  }
  map.once('load', setCamera);
  var lastCamNarrow = isNarrow();
  window.addEventListener('resize', function () {
    if (isNarrow() !== lastCamNarrow && map.loaded()) { lastCamNarrow = isNarrow(); setCamera(); }
  });
  window.fragranceMap = map;
  map.addControl(new maplibregl.AttributionControl({
    compact: true,
    customAttribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">地理院タイル (GSI)</a> | <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a> | Data: <a href="https://www.env.go.jp/air/kaori/ichiran.htm" target="_blank" rel="noopener">環境省 Ministry of the Environment</a>'
  }), 'bottom-right');
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

  function fitPadding() {
    var w = window.innerWidth;
    if (w <= 720) return { top: 84, bottom: 290, left: 16, right: 16 };
    return { top: 76, bottom: 30, left: 30, right: 360 };
  }

  function catColor() {
    return ['match', ['get', 'category'], 'flower', COLORS.flower, 'green', COLORS.green, 'water', COLORS.water,
      'smoke', COLORS.smoke, 'other', COLORS.other, COLORS.food];
  }
  // feature-state "f": 2 = the scent in focus, 1 = no focus, 0 = faded
  var F = ['coalesce', ['feature-state', 'f'], 1];
  var SEL = ['boolean', ['feature-state', 'sel'], false];
  var HL = ['boolean', ['feature-state', 'hl'], false];
  // opacity of a haze layer; th (latitude) is used while the hazes first rise, north to south
  function hazeOpacity(a2, a1, a0, th) {
    var base = ['match', F, 2, a2, 1, a1, a0];
    if (th == null) return base;
    return ['*', ['min', 1, ['max', 0, ['/', ['-', ['get', 'lat'], th], 2.5]]], base];
  }
  var OP = { 'haze-wide': [0.36, 0.26, 0.03], 'haze-drift': [0.28, 0.2, 0.025], 'haze-core': [0.55, 0.36, 0.04] };
  function setReveal(th) {
    Object.keys(OP).forEach(function (id) {
      var o = OP[id];
      map.setPaintProperty(id, 'circle-opacity', hazeOpacity(o[0], o[1], o[2], th));
    });
  }

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
              properties: { id: it.id, category: it.category, lat: it.lat, p1: (it.id * 2.39996) % 6.2832, p2: (it.id * 1.3) % 6.2832 },
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
            'circle-opacity': hazeOpacity(0.36, 0.26, 0.03, introOn() ? 47 : null),
            'circle-pitch-alignment': 'map'
          }
        });
        map.addLayer({
          id: 'haze-drift', type: 'circle', source: 'pts',
          paint: {
            'circle-radius': hazeRadius(0.7, 1),
            'circle-color': catColor(),
            'circle-blur': 1,
            'circle-pitch-alignment': 'map',
            'circle-opacity': hazeOpacity(0.28, 0.2, 0.025, introOn() ? 47 : null),
            'circle-translate': [0, 0]
          }
        });
        map.addLayer({
          id: 'haze-core', type: 'circle', source: 'pts',
          paint: {
            'circle-radius': hazeRadius(0.26, 1),
            'circle-color': catColor(),
            'circle-blur': 0.9,
            'circle-pitch-alignment': 'map',
            'circle-opacity': hazeOpacity(0.55, 0.36, 0.04, introOn() ? 47 : null)
          }
        });
        map.addLayer({
          id: 'sel', type: 'circle', source: 'pts',
          paint: {
            'circle-radius': hazeRadius(0.42, 1),
            'circle-color': 'rgba(0,0,0,0)',
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 1.5,
            'circle-pitch-alignment': 'map',
            'circle-stroke-opacity': ['case', SEL, 0.9, HL, 0.55, 0]
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
          tourStop();
          select(best ? best.id : null);
          if (isNarrow()) hoverPlace(null);
        });
        map.on('mousemove', function (e) {
          var hits = map.queryRenderedFeatures([[e.point.x - 10, e.point.y - 10], [e.point.x + 10, e.point.y + 10]], { layers: ['hit'] });
          map.getCanvas().style.cursor = hits.length ? 'pointer' : '';
          var best = null, bd = Infinity;
          hits.forEach(function (f) {
            var it = byId[f.properties.id];
            var q = map.project([it.lon, it.lat]);
            var d = Math.hypot(q.x - e.point.x, q.y - e.point.y) + (isLit(it) ? 0 : 1000);
            if (d < bd) { bd = d; best = it; }
          });
          hoverPlace(best ? best.id : null);
        });
        map.getCanvas().addEventListener('mouseleave', function () { hoverPlace(null); });

        if (window.innerWidth <= 720) {
          var attrib = document.querySelector('.maplibregl-ctrl-attrib');
          if (attrib) { attrib.classList.remove('maplibregl-compact-show'); attrib.removeAttribute('open'); }
        }
        buildWheel();
        applyFocus();
        if (introOn()) introStart = performance.now();
        startAnimation();
      });
  });

  // ---------- name tag on hover ----------
  var tag = new maplibregl.Popup({ closeButton: false, closeOnClick: false, offset: 14, className: 'name-tag', maxWidth: '260px' });
  var hovered = null;
  function hoverPlace(id) {
    if (hovered === id) return;
    if (hovered && map.getSource('pts')) map.setFeatureState({ source: 'pts', id: hovered }, { hl: false });
    hovered = id;
    if (!id) { tag.remove(); return; }
    var it = byId[id];
    map.setFeatureState({ source: 'pts', id: id }, { hl: true });
    tag.setLngLat([it.lon, it.lat])
      .setHTML('<i class="dot" style="background:' + COLORS[it.category] + ';color:' + COLORS[it.category] + '"></i>' +
        esc(state.lang === 'ja' ? it.name_ja : it.name_en))
      .addTo(map);
  }
  function isLit(it) {
    var f = state.preview || state.focus;
    return (!f || it.category === f) && (!state.month || it.months.indexOf(state.month) >= 0);
  }

  // ---------- focus ----------
  function clearAll() {
    tourStop();
    state.focus = null; state.month = null; state.preview = null;
    applyFocus();
  }
  function setFocus(c) {
    tourStop();
    state.focus = (c && c !== state.focus) ? c : null;
    state.preview = null;
    applyFocus();
  }
  function setMonth(m) {
    tourStop();
    state.month = (m && m !== state.month) ? m : null;
    applyFocus();
  }
  // hovering a part of the wheel shows its places on the map before it is chosen
  function setPreview(c) {
    if (state.preview === c) return;
    state.preview = c;
    paintFocus();
  }
  function paintFocus() {
    var t = T[state.lang];
    var f = state.preview || state.focus;
    var any = !!f || !!state.month;
    var n = 0;
    items.forEach(function (it) {
      var lit = isLit(it);
      if (lit) n++;
      var v = !any ? 1 : (lit ? 2 : 0);
      if (map.getSource('pts')) map.setFeatureState({ source: 'pts', id: it.id }, { f: v });
    });
    Array.prototype.forEach.call(document.querySelectorAll('#wheel .pdot'), function (d) {
      d.classList.toggle('off', !isLit(byId[+d.getAttribute('data-id')]));
    });
    Array.prototype.forEach.call(document.querySelectorAll('#wheel .mon'), function (g) {
      var m = +g.getAttribute('data-m');
      g.classList.toggle('on', state.month === m);
      g.setAttribute('aria-pressed', state.month === m ? 'true' : 'false');
    });
    Array.prototype.forEach.call(document.querySelectorAll('#wheel .seg'), function (g) {
      var c = g.getAttribute('data-cat');
      g.classList.toggle('dim', !!f && f !== c);
      g.classList.toggle('lit', f === c);
    });
    var hn = document.querySelector('#wheel .hub .hn'), hl = document.querySelector('#wheel .hub .hl'), hm = document.querySelector('#wheel .hub .hm');
    if (hn) {
      hn.textContent = n;
      hl.textContent = f ? t.cat[f] : t.hubAll;
      hl.setAttribute('style', f ? 'fill:' + COLORS[f] : '');
      hm.textContent = state.month ? t.monthName(state.month) : '';
    }
    $('wheelHint').textContent = f ? t.catNote[f] : (state.month ? t.monthHint(state.month, n) : t.wheelHint);
    $('wheelHint').classList.toggle('on', any);
  }
  function applyFocus() {
    var t = T[state.lang];
    paintFocus();
    Array.prototype.forEach.call(document.querySelectorAll('#wheel .seg'), function (g) {
      g.setAttribute('aria-pressed', state.focus === g.getAttribute('data-cat') ? 'true' : 'false');
    });
    var hub = document.querySelector('#wheel .hub');
    if (hub) hub.setAttribute('aria-pressed', (state.focus || state.month) ? 'false' : 'true');
    try {
      var u = new URL(location.href);
      if (state.focus) u.searchParams.set('scent', state.focus); else u.searchParams.delete('scent');
      if (state.month) u.searchParams.set('month', state.month); else u.searchParams.delete('month');
      history.replaceState(null, '', u.toString());
    } catch (e) { /* ignore */ }
    if (state.selected) renderCard();
    if (hovered) { var h = hovered; hovered = null; hoverPlace(h); }
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
    var R0 = 54, R1 = 124, RIM = 5, GAP = 1.2;
    // each part of the wheel takes an angle in proportion to its count (with a minimum, so labels fit)
    var MIN = 38, total = items.length;
    var raw = CATS.map(function (c) { return 360 * (counts[c] || 0) / total; });
    var extra = raw.reduce(function (acc, v) { return acc + Math.max(0, MIN - v); }, 0);
    var big = raw.reduce(function (acc, v) { return acc + (v > MIN ? v : 0); }, 0);
    var spans = raw.map(function (v) { return v < MIN ? MIN : v - extra * v / big; });
    var defs = el('defs', {}, svg);
    var blur = el('filter', { id: 'wglow', x: '-30%', y: '-30%', width: '160%', height: '160%' }, defs);
    el('feGaussianBlur', { stdDeviation: '4' }, blur);
    var start = -spans[0] / 2;
    CATS.forEach(function (c, i) {
      var a0 = start + GAP, a1 = start + spans[i] - GAP, mid = start + spans[i] / 2;
      start += spans[i];
      var gr = el('radialGradient', { id: 'wg-' + c, cx: 0, cy: 0, r: R1, gradientUnits: 'userSpaceOnUse' }, defs);
      el('stop', { offset: (R0 / R1).toFixed(3), 'stop-color': COLORS[c], 'stop-opacity': 0.04 }, gr);
      el('stop', { offset: '1', 'stop-color': COLORS[c], 'stop-opacity': 0.42 }, gr);
      var g = el('g', { 'class': 'seg', 'data-cat': c, role: 'button', tabindex: '0', 'aria-pressed': 'false' }, svg);
      el('path', { 'class': 'glow', d: arcPath(R1 - RIM, R1 + 2, a0, a1), fill: COLORS[c], filter: 'url(#wglow)' }, g);
      el('path', { 'class': 'fill', d: arcPath(R0, R1, a0, a1), fill: 'url(#wg-' + c + ')' }, g);
      el('path', { 'class': 'rim', d: arcPath(R1 - RIM, R1, a0, a1), fill: COLORS[c] }, g);
      var title = el('title', {}, g);
      title.textContent = t.cat[c] + ': ' + (counts[c] || 0);
      g.setAttribute('aria-label', t.cat[c] + ', ' + (counts[c] || 0));
      var p = polar(narrow ? 84 : 88, mid);
      var lines = narrow ? [t.catShort[c]] : t.catWheel[c];
      var lh = narrow ? 17 : 13;
      var y0 = p[1] - (lines.length - 1) * lh / 2 - (narrow ? 2 : 4);
      lines.forEach(function (str, k) {
        var tx = el('text', { x: p[0].toFixed(1), y: (y0 + k * lh).toFixed(1), 'text-anchor': 'middle' }, g);
        if (narrow) tx.setAttribute('style', 'font-size:' + (state.lang === 'ja' ? 17 : 16) + 'px');
        tx.textContent = str;
      });
      var tn = el('text', { 'class': 'n', x: p[0].toFixed(1), y: (y0 + lines.length * lh - (narrow ? 2 : 0)).toFixed(1), 'text-anchor': 'middle' }, g);
      if (narrow) tn.setAttribute('style', 'font-size:14px');
      tn.textContent = counts[c] || 0;
      // one dot per place along the rim, north to south
      var mine = items.filter(function (it) { return it.category === c; }).sort(function (x, y) { return y.lat - x.lat; });
      mine.forEach(function (it, k) {
        var q = polar(R1 - 12, a0 + (k + 0.5) * (a1 - a0) / mine.length);
        var d = el('circle', { 'class': 'pdot', 'data-id': it.id, cx: q[0].toFixed(1), cy: q[1].toFixed(1), r: narrow ? 2.6 : 2.1 }, g);
        d.addEventListener('mouseenter', function () { hoverPlace(it.id); });
        d.addEventListener('mouseleave', function () { hoverPlace(null); });
        d.addEventListener('click', function (e) { e.stopPropagation(); select(it.id); });
      });
      g.addEventListener('click', function () { setFocus(c); });
      g.addEventListener('mouseenter', function () { setPreview(c); });
      g.addEventListener('mouseleave', function () { setPreview(null); });
      g.addEventListener('focus', function () { setPreview(c); });
      g.addEventListener('blur', function () { setPreview(null); });
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFocus(c); }
      });
    });
    var hub = el('g', { 'class': 'hub', role: 'button', tabindex: '0', 'aria-pressed': 'true', 'aria-label': t.all }, svg);
    el('circle', { r: R0 - 6 }, hub);
    var hn = el('text', { 'class': 'hn', y: narrow ? 4 : 2, 'text-anchor': 'middle' }, hub);
    if (narrow) hn.setAttribute('style', 'font-size:26px');
    var hl = el('text', { 'class': 'hl', y: narrow ? 26 : 20, 'text-anchor': 'middle' }, hub);
    if (narrow) hl.setAttribute('style', 'font-size:13px');
    var hm = el('text', { 'class': 'hm', y: narrow ? -24 : -22, 'text-anchor': 'middle' }, hub);
    if (narrow) hm.setAttribute('style', 'font-size:13px');
    hub.addEventListener('click', clearAll);
    hub.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); clearAll(); }
    });
    // month ring around the wheel
    var MR0 = 134, MR1 = 156;
    for (var m = 1; m <= 12; m++) {
      (function (m) {
        var a0 = (m - 1) * 30 - 15 + 1.2, a1 = (m - 1) * 30 + 15 - 1.2;
        var g = el('g', { 'class': 'mon', 'data-m': m, role: 'button', tabindex: '0', 'aria-pressed': 'false', 'aria-label': t.monthLabel + ' ' + t.monthName(m) }, svg);
        el('path', { d: arcPath(MR0, MR1, a0, a1) }, g);
        var q = polar((MR0 + MR1) / 2, (m - 1) * 30);
        var tx = el('text', { x: q[0].toFixed(1), y: (q[1] + (narrow ? 5 : 3.6)).toFixed(1), 'text-anchor': 'middle' }, g);
        if (narrow) tx.setAttribute('style', 'font-size:14px');
        tx.textContent = t.monthTick(m);
        g.addEventListener('click', function () { setMonth(m); });
        g.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setMonth(m); }
        });
      })(m);
    }
  }

  // ---------- keyboard ----------
  document.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName) || '';
    if (e.key === 'Escape') { if (tour.on) { tourStop(); return; } select(null); closeAbout(); return; }
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (tour.on && (e.key === ' ' || e.key === 'Spacebar') && tag !== 'BUTTON') { tourPause(!tour.paused); e.preventDefault(); return; }
    if (tour.on && (e.key === '+' || e.key === '=' || e.key === '-')) { nextSpeed(e.key === '-' ? -1 : 1); e.preventDefault(); return; }
    if (tour.on && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) { tourGo(tour.i + (e.key === 'ArrowRight' ? 1 : -1)); e.preventDefault(); return; }
    var i = state.focus ? CATS.indexOf(state.focus) : -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') tourStop();
    if (e.key === 'ArrowRight') { setFocus(CATS[(i + 1) % CATS.length]); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { setFocus(CATS[(i - 1 + CATS.length) % CATS.length]); e.preventDefault(); }
    else if (e.key === 'ArrowDown') { state.month = state.month ? state.month % 12 + 1 : 1; applyFocus(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { state.month = state.month ? (state.month + 10) % 12 + 1 : 12; applyFocus(); e.preventDefault(); }
    else if (e.key === '0') { clearAll(); }
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

  function renderPhoto(it, t) {
    var fig = $('cardPhoto'), img = $('cardImg');
    var im = it.image;
    if (!im) { fig.hidden = true; img.removeAttribute('src'); return; }
    if (img.getAttribute('src') !== im.url) {
      fig.hidden = true;
      img.onload = function () { fig.hidden = false; };
      img.onerror = function () { fig.hidden = true; };
      img.src = im.url;
    } else {
      fig.hidden = !img.complete || !img.naturalWidth;
    }
    img.alt = state.lang === 'ja' ? it.name_ja : it.name_en;
    var lic = im.license_url
      ? '<a href="' + esc(im.license_url) + '" target="_blank" rel="noopener">' + esc(im.license) + '</a>'
      : esc(im.license);
    $('cardCredit').innerHTML = esc(t.photo) + ': <a href="' + esc(im.source_page) + '" target="_blank" rel="noopener">' +
      esc(im.artist) + '</a> / ' + lic + ' · Wikimedia Commons';
  }

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
    renderPhoto(it, t);
    $('cardName').textContent = ja ? it.name_ja : it.name_en;
    $('cardAlt').textContent = ja ? it.name_en : it.name_ja;
    $('cardPlace').textContent = ja
      ? it.prefecture_ja + '・' + it.municipality_ja
      : it.municipality_en + ', ' + it.prefecture_en;
    $('cardDesc').textContent = ja ? it.description_ja : it.description_en;
    var cells = '';
    for (var m = 1; m <= 12; m++) {
      var on = it.months.indexOf(m) >= 0;
      cells += '<span class="' + (on ? 'on' : '') + (m === state.month ? ' cur' : '') + '"' + (on ? ' style="background:' + col + '"' : '') + '>' +
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
  $('cardClose').addEventListener('click', function () { tourStop(); select(null); });

  // ---------- tour ----------
  // Visit the places one by one from the south (Okinawa) to the north (Hokkaido).
  var tour = { on: false, paused: false, list: [], i: 0, timer: null };
  var FLY_MS = 2000, STAY_MS = 3000;
  var SPEEDS = [1, 2, 0.5], speed = 1;
  try { var sv = parseFloat(localStorage.getItem('fragrances-tour-speed')); if (SPEEDS.indexOf(sv) >= 0) speed = sv; } catch (e) { /* ignore */ }
  function setSpeed(v) {
    speed = v;
    try { localStorage.setItem('fragrances-tour-speed', String(v)); } catch (e) { /* ignore */ }
    tourUI();
  }
  function nextSpeed(dir) {
    var order = [0.5, 1, 2], k = order.indexOf(speed);
    if (dir) setSpeed(order[Math.max(0, Math.min(order.length - 1, k + dir))]);
    else setSpeed(SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length]);
  }
  function tourPadding() {
    var W = window.innerWidth, H = window.innerHeight;
    if (isNarrow()) return { top: 90, bottom: Math.round(H * 0.56), left: 20, right: 20 };
    return { top: 140, bottom: 60, left: 40, right: 420 };
  }
  function tourUI() {
    var t = T[state.lang], b = $('tourBtn');
    b.setAttribute('aria-pressed', tour.on ? 'true' : 'false');
    $('tourLabel').textContent = tour.on ? t.tourStop : (isNarrow() ? t.tourShort : t.tour);
    $('tourN').textContent = tour.on ? (tour.i + 1) + '/' + tour.list.length : '';
    b.setAttribute('aria-label', tour.on ? t.tourStop : t.tour);
    var sp = $('tourSpeed');
    sp.hidden = !tour.on;
    sp.textContent = '×' + speed;
    sp.setAttribute('aria-label', t.tourSpeed + ' ×' + speed);
    document.body.classList.toggle('touring', tour.on);
    $('tourCtl').hidden = !tour.on;
    var pz = $('tourPause');
    pz.setAttribute('aria-pressed', tour.paused ? 'true' : 'false');
    pz.setAttribute('aria-label', tour.paused ? t.tourResume : t.tourPause);
    $('tourPrev').setAttribute('aria-label', t.tourPrev);
    $('tourNext').setAttribute('aria-label', t.tourNext);
  }
  function tourSchedule(ms) {
    clearTimeout(tour.timer);
    if (!tour.paused) tour.timer = setTimeout(function () { tourGo(tour.i + 1); }, ms);
  }
  function tourPause(p) {
    if (!tour.on) return;
    tour.paused = p;
    if (p) clearTimeout(tour.timer); else tourSchedule(STAY_MS / speed);
    tourUI();
  }
  function tourGo(i) {
    if (!tour.on) return;
    clearTimeout(tour.timer);
    if (i < 0) i = 0;
    if (i >= tour.list.length) { tourStop(true); return; }
    tour.i = i;
    var it = tour.list[i];
    hoverPlace(null);
    select(it.id);
    tourUI();
    var still = reduceMotion && reduceMotion.matches;
    var opts = { center: [it.lon, it.lat], zoom: 7.4, pitch: 55, bearing: camAngles().bearing, padding: tourPadding() };
    var fly = FLY_MS / speed, stay = STAY_MS / speed;
    if (still) map.jumpTo(opts); else map.flyTo(Object.assign({ duration: fly, curve: 1.3 }, opts));
    tourSchedule((still ? 0 : fly) + stay);
  }
  function tourStart() {
    var list = items.filter(isLit).sort(function (a, b) { return a.lat - b.lat || a.lon - b.lon; });
    if (!list.length) return;
    tour.on = true; tour.paused = false; tour.list = list;
    closeAbout();
    tourGo(0);
  }
  function tourStop(finished) {
    if (!tour.on) return;
    tour.on = false; tour.paused = false;
    clearTimeout(tour.timer);
    tourUI();
    if (finished) {
      select(null);
      // fly back out to the whole of Japan
      var here = { center: map.getCenter(), zoom: map.getZoom(), pitch: map.getPitch(), bearing: map.getBearing(), padding: map.getPadding() };
      map.setPadding({ top: 0, bottom: 0, left: 0, right: 0 });
      setCamera();
      var there = { center: map.getCenter(), zoom: map.getZoom(), pitch: map.getPitch(), bearing: map.getBearing() };
      if (!(reduceMotion && reduceMotion.matches)) {
        map.jumpTo(here);
        map.flyTo(Object.assign({ duration: FLY_MS, padding: { top: 0, bottom: 0, left: 0, right: 0 } }, there));
      }
    }
  }
  $('tourBtn').addEventListener('click', function () { if (tour.on) tourStop(); else tourStart(); });
  $('tourSpeed').addEventListener('click', function () { nextSpeed(0); });
  $('tourPause').addEventListener('click', function () { tourPause(!tour.paused); });
  $('tourPrev').addEventListener('click', function () { tourGo(tour.i - 1); });
  $('tourNext').addEventListener('click', function () { tourGo(tour.i + 1); });
  // dragging or zooming the map by hand ends the tour
  ['dragstart', 'wheel', 'touchstart'].forEach(function (ev) {
    map.on(ev, function (e) { if (tour.on && e.originalEvent) tourStop(); });
  });

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
    $('wheelHint').textContent = t.wheelHint;
    tourUI();
    $('pairLink').href = DAY11 + (state.lang === 'ja' ? '?lang=ja' : '');
    Array.prototype.forEach.call(document.querySelectorAll('.lang button'), function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === state.lang ? 'true' : 'false');
    });
    if (!$('about').hidden) $('aboutBody').innerHTML = t.about_html;
    if (items.length) {
      buildWheel();
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
  var INTRO_MS = 3600, introStart = null, introDone = false, revealTh = introOn0() ? 47 : null;
  function introOn0() { return !(reduceMotion && reduceMotion.matches); }
  function introOn() { return !introDone && !(reduceMotion && reduceMotion.matches); }
  function drawHaze(t, drift) {
    if (!map.getLayer('haze-wide')) return;
    map.setPaintProperty('haze-wide', 'circle-radius', hazeRadius(1, breath(t, 0.13, 0.55, 'p1')));
    map.setPaintProperty('haze-drift', 'circle-radius', hazeRadius(0.7, breath(t, 0.2, 0.8, 'p2')));
    map.setPaintProperty('haze-core', 'circle-radius', hazeRadius(0.26, breath(t, 0.08, 0.9, 'p1')));
    map.setPaintProperty('haze-drift', 'circle-translate', drift);
  }
  function frame(ts) {
    if (introStart != null && !introDone) {
      // hazes rise one after another from Hokkaido down to Okinawa
      var k = Math.min(1, (ts - introStart) / INTRO_MS);
      var e = 1 - Math.pow(1 - k, 2);
      revealTh = 47 - e * 27;
      setReveal(revealTh);
      if (k >= 1) { introDone = true; revealTh = null; setReveal(null); }
    }
    if (ts - lastDraw > 50) {
      var t = ts / 1000;
      drawHaze(t, [Math.sin(t * 0.21) * 5 + 2, Math.cos(t * 0.17) * 3 - 1]);
      lastDraw = ts;
    }
    drawPlumes(ts / 1000, false);
    rafId = requestAnimationFrame(frame);
  }
  function drawStatic() {
    if (!map.getLayer('haze-wide')) return;
    if (!introDone) { introDone = true; revealTh = null; setReveal(null); }
    drawPlumes(0, true);
    map.setPaintProperty('haze-wide', 'circle-radius', hazeRadius(1, 1));
    map.setPaintProperty('haze-drift', 'circle-radius', hazeRadius(0.7, 1));
    map.setPaintProperty('haze-core', 'circle-radius', hazeRadius(0.26, 1));
    map.setPaintProperty('haze-drift', 'circle-translate', [0, 0]);
  }
  // ---------- rising scent ----------
  // Each place sends up soft wisps that sway and fade, drawn on a canvas over the tilted map.
  var plume = $('plume'), pctx = plume.getContext('2d');
  var sprites = {};
  function sprite(col) {
    if (sprites[col]) return sprites[col];
    var c = document.createElement('canvas'); c.width = c.height = 64;
    var g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, col); gr.addColorStop(0.35, col + 'aa'); gr.addColorStop(1, col + '00');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return (sprites[col] = c);
  }
  function sizePlume() {
    var r = window.devicePixelRatio || 1, w = plume.clientWidth, h = plume.clientHeight;
    if (plume.width !== Math.round(w * r) || plume.height !== Math.round(h * r)) {
      plume.width = Math.round(w * r); plume.height = Math.round(h * r);
    }
    pctx.setTransform(r, 0, 0, r, 0, 0);
  }
  var WISPS = 5, LIFE = 4.2;
  function drawPlumes(t, still) {
    if (!items.length) return;
    sizePlume();
    var w = plume.clientWidth, h = plume.clientHeight;
    pctx.clearRect(0, 0, w, h);
    var s = Math.max(isNarrow() ? 0.6 : 0.9, Math.min(1.8, Math.pow(2, map.getZoom() - 5)));
    var f = state.preview || state.focus, any = !!f || !!state.month;
    pctx.globalCompositeOperation = 'screen';
    items.forEach(function (it) {
      var p = map.project([it.lon, it.lat]);
      if (p.x < -60 || p.x > w + 60 || p.y < -40 || p.y > h + 200) return;
      var a = !any ? 0.4 : (isLit(it) ? 0.75 : 0.05);
      if (state.selected === it.id) a = 1;
      if (revealTh != null) a *= Math.max(0, Math.min(1, (it.lat - revealTh) / 2.5));
      if (a <= 0.01) return;
      var img = sprite(COLORS[it.category]);
      var ph = (it.id * 0.618) % 1;
      for (var k = 0; k < WISPS; k++) {
        // u: 0 at the ground, 1 at the top of the plume
        var u = still ? (k + 0.5) / WISPS : ((t / LIFE + ph + k / WISPS) % 1);
        var rise = u * 64 * s;
        var sway = Math.sin(t * 0.9 + it.id + u * 5) * 7 * s * u;
        var size = (7 + 24 * u) * s;
        var al = a * Math.sin(Math.PI * u) * (1 - u * 0.35) * 0.5;
        pctx.globalAlpha = al;
        pctx.drawImage(img, p.x + sway - size / 2, p.y - rise - size / 2, size, size);
      }
    });
    pctx.globalAlpha = 1;
    pctx.globalCompositeOperation = 'source-over';
  }
  map.on('move', function () { if (reduceMotion && reduceMotion.matches) drawPlumes(0, true); });
  window.addEventListener('resize', function () { if (reduceMotion && reduceMotion.matches) drawPlumes(0, true); });

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
