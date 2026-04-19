/* ========================================
   暦眼 -REKIGAN- LP Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initParticles();
  initScrollAnimations();
  initHeader();
  initLangSwitcher();
});

/* ローディング画面 */
function initLoader() {
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.querySelectorAll('#hero .fade-up').forEach(el => {
        el.classList.add('visible');
      });
    }, 2000);
  });

  setTimeout(() => {
    loader.classList.add('hidden');
    document.querySelectorAll('#hero .fade-up').forEach(el => {
      el.classList.add('visible');
    });
  }, 4000);
}

/* パーティクル（霊的な光の粒） */
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;
  let time = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle(isSmall) {
    const small = isSmall !== undefined ? isSmall : Math.random() > 0.3;
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: small ? Math.random() * 1.2 + 0.3 : Math.random() * 2 + 0.8,
      speedY: -(Math.random() * 0.15 + 0.03),
      speedX: (Math.random() - 0.5) * 0.12,
      drift: Math.random() * Math.PI * 2,
      driftSpeed: Math.random() * 0.003 + 0.001,
      driftAmount: Math.random() * 0.3 + 0.1,
      opacity: 0,
      maxOpacity: small ? Math.random() * 0.3 + 0.08 : Math.random() * 0.45 + 0.15,
      fadeSpeed: Math.random() * 0.002 + 0.0005,
      growing: true,
      glow: !small && Math.random() > 0.6
    };
  }

  function init() {
    resize();
    particles = [];
    const count = Math.min(Math.floor(canvas.width * 0.12), 120);
    for (let i = 0; i < count; i++) {
      const p = createParticle();
      p.opacity = Math.random() * p.maxOpacity;
      p.growing = Math.random() > 0.5;
      particles.push(p);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time++;

    particles.forEach((p, i) => {
      p.drift += p.driftSpeed;
      p.x += p.speedX + Math.sin(p.drift) * p.driftAmount;
      p.y += p.speedY;

      if (p.growing) {
        p.opacity += p.fadeSpeed;
        if (p.opacity >= p.maxOpacity) p.growing = false;
      } else {
        p.opacity -= p.fadeSpeed;
        if (p.opacity <= 0) {
          particles[i] = createParticle();
          particles[i].y = canvas.height + Math.random() * 20;
          return;
        }
      }

      if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
        particles[i] = createParticle();
        particles[i].y = canvas.height + Math.random() * 20;
      }

      if (p.glow && p.opacity > 0.08) {
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, `rgba(201, 169, 110, ${p.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(201, 169, 110, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 169, 110, ${p.opacity})`;
      ctx.fill();
    });

    animId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    init();
    draw();
  });

  init();
  draw();
}

/* スクロールアニメーション */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-up').forEach(el => {
    if (!el.closest('#hero')) {
      observer.observe(el);
    }
  });
}

/* ヘッダースクロール */
function initHeader() {
  const header = document.getElementById('header');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 80) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* 多言語切り替え */
const translations = {
  ja: {
    'nav.cta': '鑑定予約',
    'hero.sub': 'あなたの「見えない領域」に触れる。',
    'hero.badge': '陰陽師霊視鑑定',
    'intro.statement': '<strong>占いではありません。</strong>',
    'intro.body1': 'オーラが視える。過去が視える。<br>いま、あなたの周りに何があるかが視える。',
    'intro.body2': '暦（koyomi）は、幼少期から「視える」能力を持つ、<br class="pc-only">日本でも極めて希少な<strong>女性の陰陽師</strong>です。',
    'trinity.lead': '占い師が「未来を読む」存在だとすれば——',
    'trinity.title': '「見る・施す・防ぐ」<br><em>三位一体。</em>',
    'trinity.desc': '結界を張る。不要な縁を切る。エネルギーを入れる。<br>ただ鑑定するだけでなく、<br class="sp-only"><strong>その場で状況を変える力</strong>がここにあります。',
    'reading.title': '<span class="section-title-en">CLAIRVOYANCE</span>あなたを見た瞬間、<br>視えるものがあります。',
    'reading.card1.title': 'オーラの色・状態',
    'reading.card1.desc': 'いま、あなたがどんな<br>エネルギーを纏っているか',
    'reading.card2.title': '現状の本質',
    'reading.card2.desc': '表面的な悩みの奥にある、<br>本当の原因',
    'reading.card3.title': '過去の痕跡',
    'reading.card3.desc': 'あなたの背景に残る出来事や<br>人間関係の影響',
    'reading.note': '「なぜかうまくいかない」「理由のない不調が続く」<br>──その答えが、霊視の中にあることがあります。',
    'diff.title': '<span class="section-title-en">DIFFERENCE</span>占いの、さらに奥へ。',
    'diff.th1': '一般的な占い',
    'diff.th2': '陰陽師霊視鑑定',
    'diff.row1.label': 'できること',
    'diff.row1.normal': '視る・伝える',
    'diff.row1.rekigan': '<strong>視る＋施す＋防ぐ</strong>',
    'diff.row2.label': 'アプローチ',
    'diff.row2.normal': '統計・象徴の解釈',
    'diff.row2.rekigan': '<strong>直接の霊視・エネルギー操作</strong>',
    'diff.row3.label': '結界・お祓い',
    'diff.row3.normal': '不可',
    'diff.row3.rekigan': '<strong>対応可能</strong>',
    'diff.row4.label': '縁切り・縁繋ぎ',
    'diff.row4.normal': '不可',
    'diff.row4.rekigan': '<strong>対応可能</strong>',
    'diff.quote': '占い師は「見る」だけ。<br>暦は、<strong>見たうえで、動かします。</strong>',
    'services.title': '<span class="section-title-en">SERVICES</span>鑑定で提供できること',
    'services.s1.title': '霊視鑑定',
    'services.s1.desc': 'オーラ・過去・現状のリーディング',
    'services.s2.title': '結界術',
    'services.s2.desc': '張る・切る——空間と人を守護する',
    'services.s3.title': 'エネルギー注入',
    'services.s3.desc': 'パワーを入れ、本来の状態へ導く',
    'services.s4.title': '良縁繋ぎ',
    'services.s4.desc': '恋愛・人間関係の縁を整える',
    'services.s5.title': '健康面へのアプローチ',
    'services.s5.desc': 'エネルギー的な観点から身体に働きかける',
    'services.note': '※医療行為ではありません。医師の診断・治療に代わるものではありません。',
    'price.title': '<span class="section-title-en">PRICE</span>料金',
    'price.label': '初回鑑定',
    'price.unit': '分',
    'price.tax': '（税込）',
    'price.desc': '追加は10分ごとに¥5,500。<br>必要な分だけ、必要な時間だけ。',
    'price.note': 'タイマーで時間管理を徹底。予想外の請求はありません。',
    'price.remote': '遠隔での霊視鑑定も可能です。ご本人様の写真をご用意ください。',
    'voice.title': '<span class="section-title-en">VOICE</span>体験者の声',
    'voice.v1.text': '初めて会った瞬間に、誰にも話していないことを言い当てられた。思わず涙が流れた。',
    'voice.v1.cite': '── 40代男性 T.T',
    'voice.v2.text': '鑑定後、ずっと重かった身体が嘘みたいに軽くなった。あの感覚は今でも忘れられない。',
    'voice.v2.cite': '── 30代女性 J.K',
    'cta.lead': '「すごい人がいる」と、<br class="sp-only">静かに広がっています。',
    'cta.desc': '<p>宣伝はしていません。</p><p>ただ、一度鑑定を受けた方が、<br class="sp-only">大切な人にだけ紹介してくれる。</p><p>そうやって、暦（koyomi）のもとに集まる<br class="sp-only">人のご縁を大切に、<br>人生をよりよくするきっかけをあなたに。</p>',
    'cta.closing': 'まずは10分。<br>視えるものを、確かめてみてください。',
    'cta.button': 'LINE@で鑑定を予約する',
    'footer.note1': '※本サービスは占い・スピリチュアルサービスであり、医療行為・金融助言ではありません。',
    'footer.note2': '※効果には個人差があります。',
    'footer.note3': '※不安を煽る勧誘は一切行いません。',
    'footer.note4': '※鑑定内容は厳守し、第三者に開示することはありません。',
    'footer.note5': '※18歳未満の方は保護者の同意が必要です。',
    'footer.link1': '特定商取引法に基づく表記',
    'footer.link2': 'プライバシーポリシー'
  },
  en: {
    'nav.cta': 'Book Now',
    'hero.sub': 'Touching the realm you cannot see.',
    'hero.badge': 'Onmyoji Clairvoyant Reading',
    'intro.statement': '<strong>This is not fortune-telling.</strong>',
    'intro.body1': 'She sees auras. She sees the past.<br>She sees what surrounds you right now.',
    'intro.body2': 'Koyomi has possessed the gift of "sight" since childhood —<br class="pc-only">one of Japan\'s extremely rare <strong>female Onmyoji</strong>.',
    'trinity.lead': 'If a fortune-teller is someone who "reads the future" —',
    'trinity.title': '"See, Act, Protect"<br><em>The Trinity.</em>',
    'trinity.desc': 'Setting barriers. Cutting unwanted ties. Channeling energy.<br>Not just reading, but<br class="sp-only"><strong>the power to change your situation on the spot</strong>.',
    'reading.title': '<span class="section-title-en">CLAIRVOYANCE</span>The moment I see you,<br>things become visible.',
    'reading.card1.title': 'Aura Color & State',
    'reading.card1.desc': 'What kind of energy<br>surrounds you right now',
    'reading.card2.title': 'True Essence',
    'reading.card2.desc': 'The real cause hidden<br>beneath surface worries',
    'reading.card3.title': 'Traces of the Past',
    'reading.card3.desc': 'Events and relationships<br>that linger in your background',
    'reading.note': '"Things just don\'t work out." "Unexplained fatigue persists."<br>── The answers may lie within a clairvoyant reading.',
    'diff.title': '<span class="section-title-en">DIFFERENCE</span>Beyond fortune-telling.',
    'diff.th1': 'Typical Fortune-Telling',
    'diff.th2': 'Onmyoji Clairvoyant Reading',
    'diff.row1.label': 'Capability',
    'diff.row1.normal': 'See & Convey',
    'diff.row1.rekigan': '<strong>See + Act + Protect</strong>',
    'diff.row2.label': 'Approach',
    'diff.row2.normal': 'Statistical / Symbolic',
    'diff.row2.rekigan': '<strong>Direct Clairvoyance & Energy Work</strong>',
    'diff.row3.label': 'Barriers & Purification',
    'diff.row3.normal': 'Not available',
    'diff.row3.rekigan': '<strong>Available</strong>',
    'diff.row4.label': 'Tie Cutting / Bonding',
    'diff.row4.normal': 'Not available',
    'diff.row4.rekigan': '<strong>Available</strong>',
    'diff.quote': 'Fortune-tellers only "see."<br>Koyomi sees — and <strong>takes action.</strong>',
    'services.title': '<span class="section-title-en">SERVICES</span>What We Offer',
    'services.s1.title': 'Clairvoyant Reading',
    'services.s1.desc': 'Reading auras, past, and present state',
    'services.s2.title': 'Barrier Arts',
    'services.s2.desc': 'Setting and cutting — protecting spaces and people',
    'services.s3.title': 'Energy Infusion',
    'services.s3.desc': 'Channeling power to restore your natural state',
    'services.s4.title': 'Bond Alignment',
    'services.s4.desc': 'Harmonizing ties in love and relationships',
    'services.s5.title': 'Health Approach',
    'services.s5.desc': 'Working on the body from an energetic perspective',
    'services.note': '* This is not a medical practice. It does not replace medical diagnosis or treatment.',
    'price.title': '<span class="section-title-en">PRICE</span>Pricing',
    'price.label': 'Initial Reading',
    'price.unit': 'min',
    'price.tax': '(tax incl.)',
    'price.desc': '¥5,500 per additional 10 minutes.<br>Only the time you need, nothing more.',
    'price.note': 'Strict timer management. No surprise charges.',
    'price.remote': 'Remote clairvoyant readings are also available. Please prepare a photo of yourself.',
    'voice.title': '<span class="section-title-en">VOICE</span>Client Testimonials',
    'voice.v1.text': 'The moment we first met, she revealed things I had never told anyone. Tears just flowed.',
    'voice.v1.cite': '── Man in his 40s, T.T',
    'voice.v2.text': 'After the reading, my body — which had felt so heavy — became incredibly light. I\'ll never forget that feeling.',
    'voice.v2.cite': '── Woman in her 30s, J.K',
    'cta.lead': '"There\'s someone extraordinary" —<br class="sp-only"> word spreads quietly.',
    'cta.desc': '<p>We don\'t advertise.</p><p>Those who experience a reading<br class="sp-only"> simply share it with their closest loved ones.</p><p>We cherish each connection that brings<br class="sp-only"> people to Koyomi —<br>and offer you a chance to transform your life.</p>',
    'cta.closing': 'Start with 10 minutes.<br>See for yourself what becomes visible.',
    'cta.button': 'Book via LINE@',
    'footer.note1': '* This is a spiritual service, not medical treatment or financial advice.',
    'footer.note2': '* Results vary by individual.',
    'footer.note3': '* We never use fear-based solicitation.',
    'footer.note4': '* All reading contents are kept strictly confidential and will not be disclosed to third parties.',
    'footer.note5': '* Parental consent is required for those under 18.',
    'footer.link1': 'Specified Commercial Transactions Act',
    'footer.link2': 'Privacy Policy'
  },
  'zh-CN': {
    'nav.cta': '预约鉴定',
    'hero.sub': '触及你"看不见的领域"。',
    'hero.badge': '阴阳师灵视鉴定',
    'intro.statement': '<strong>这不是占卜。</strong>',
    'intro.body1': '能看到灵气。能看到过去。<br>能看到此刻围绕在你身边的一切。',
    'intro.body2': '暦（koyomi）自幼便拥有"视觉"能力，<br class="pc-only">是日本极为罕见的<strong>女性阴阳师</strong>。',
    'trinity.lead': '如果说占卜师是"解读未来"的存在——',
    'trinity.title': '"看·施·防"<br><em>三位一体。</em>',
    'trinity.desc': '结界守护。斩断不良缘分。注入能量。<br>不仅是鉴定，<br class="sp-only"><strong>当场改变现状的力量</strong>就在这里。',
    'reading.title': '<span class="section-title-en">CLAIRVOYANCE</span>看到你的瞬间，<br>有些东西就显现了。',
    'reading.card1.title': '灵气的颜色与状态',
    'reading.card1.desc': '此刻你身上<br>环绕着怎样的能量',
    'reading.card2.title': '现状的本质',
    'reading.card2.desc': '表面烦恼深处<br>真正的原因',
    'reading.card3.title': '过去的痕迹',
    'reading.card3.desc': '残留在你背景中的<br>事件与人际关系的影响',
    'reading.note': '"为什么总是不顺利""莫名的不适持续着"<br>──答案可能就在灵视之中。',
    'diff.title': '<span class="section-title-en">DIFFERENCE</span>超越占卜，更深一层。',
    'diff.th1': '一般占卜',
    'diff.th2': '阴阳师灵视鉴定',
    'diff.row1.label': '能力范围',
    'diff.row1.normal': '看·传达',
    'diff.row1.rekigan': '<strong>看＋施＋防</strong>',
    'diff.row2.label': '方法',
    'diff.row2.normal': '统计·象征解读',
    'diff.row2.rekigan': '<strong>直接灵视·能量操作</strong>',
    'diff.row3.label': '结界·驱邪',
    'diff.row3.normal': '不可',
    'diff.row3.rekigan': '<strong>可对应</strong>',
    'diff.row4.label': '断缘·结缘',
    'diff.row4.normal': '不可',
    'diff.row4.rekigan': '<strong>可对应</strong>',
    'diff.quote': '占卜师只是"看"。<br>暦，<strong>看了之后，还会行动。</strong>',
    'services.title': '<span class="section-title-en">SERVICES</span>鉴定提供的服务',
    'services.s1.title': '灵视鉴定',
    'services.s1.desc': '灵气·过去·现状的解读',
    'services.s2.title': '结界术',
    'services.s2.desc': '布阵·断切——守护空间与人',
    'services.s3.title': '能量注入',
    'services.s3.desc': '注入力量，引导至本来的状态',
    'services.s4.title': '良缘牵引',
    'services.s4.desc': '调整恋爱·人际关系的缘分',
    'services.s5.title': '健康调理',
    'services.s5.desc': '从能量角度对身体进行调理',
    'services.note': '※本服务非医疗行为，不能替代医生的诊断和治疗。',
    'price.title': '<span class="section-title-en">PRICE</span>价格',
    'price.label': '首次鉴定',
    'price.unit': '分钟',
    'price.tax': '（含税）',
    'price.desc': '每增加10分钟追加¥5,500。<br>只需要的时长，不多不少。',
    'price.note': '严格计时管理。不会有意外收费。',
    'price.remote': '也可进行远程灵视鉴定。请准备本人的照片。',
    'voice.title': '<span class="section-title-en">VOICE</span>体验者的声音',
    'voice.v1.text': '第一次见面的瞬间，她就说出了我从未对任何人说过的事。我不禁流下了泪水。',
    'voice.v1.cite': '── 40多岁男性 T.T',
    'voice.v2.text': '鉴定后，一直沉重的身体变得不可思议地轻松了。那种感觉至今难忘。',
    'voice.v2.cite': '── 30多岁女性 J.K',
    'cta.lead': '"有一个了不起的人"——<br class="sp-only">这句话在静静传开。',
    'cta.desc': '<p>我们不做宣传。</p><p>只是接受过鉴定的人，<br class="sp-only">会推荐给自己重要的人。</p><p>就这样，珍惜每一份来到暦（koyomi）<br class="sp-only">身边的缘分，<br>为你的人生带来转机。</p>',
    'cta.closing': '先从10分钟开始。<br>亲自确认所看到的一切。',
    'cta.button': '通过LINE@预约鉴定',
    'footer.note1': '※本服务为占卜·灵性服务，非医疗行为或金融建议。',
    'footer.note2': '※效果因人而异。',
    'footer.note3': '※绝不进行恐吓式推销。',
    'footer.note4': '※鉴定内容严格保密，绝不向第三方透露。',
    'footer.note5': '※未满18岁者需获得监护人同意。',
    'footer.link1': '特定商业交易法标注',
    'footer.link2': '隐私政策'
  },
  'zh-TW': {
    'nav.cta': '預約鑑定',
    'hero.sub': '觸及你「看不見的領域」。',
    'hero.badge': '陰陽師靈視鑑定',
    'intro.statement': '<strong>這不是占卜。</strong>',
    'intro.body1': '能看到靈氣。能看到過去。<br>能看到此刻圍繞在你身邊的一切。',
    'intro.body2': '暦（koyomi）自幼便擁有「視覺」能力，<br class="pc-only">是日本極為罕見的<strong>女性陰陽師</strong>。',
    'trinity.lead': '如果說占卜師是「解讀未來」的存在——',
    'trinity.title': '「看·施·防」<br><em>三位一體。</em>',
    'trinity.desc': '結界守護。斬斷不良緣分。注入能量。<br>不僅是鑑定，<br class="sp-only"><strong>當場改變現狀的力量</strong>就在這裡。',
    'reading.title': '<span class="section-title-en">CLAIRVOYANCE</span>看到你的瞬間，<br>有些東西就顯現了。',
    'reading.card1.title': '靈氣的顏色與狀態',
    'reading.card1.desc': '此刻你身上<br>環繞著怎樣的能量',
    'reading.card2.title': '現狀的本質',
    'reading.card2.desc': '表面煩惱深處<br>真正的原因',
    'reading.card3.title': '過去的痕跡',
    'reading.card3.desc': '殘留在你背景中的<br>事件與人際關係的影響',
    'reading.note': '「為什麼總是不順利」「莫名的不適持續著」<br>──答案可能就在靈視之中。',
    'diff.title': '<span class="section-title-en">DIFFERENCE</span>超越占卜，更深一層。',
    'diff.th1': '一般占卜',
    'diff.th2': '陰陽師靈視鑑定',
    'diff.row1.label': '能力範圍',
    'diff.row1.normal': '看·傳達',
    'diff.row1.rekigan': '<strong>看＋施＋防</strong>',
    'diff.row2.label': '方法',
    'diff.row2.normal': '統計·象徵解讀',
    'diff.row2.rekigan': '<strong>直接靈視·能量操作</strong>',
    'diff.row3.label': '結界·驅邪',
    'diff.row3.normal': '不可',
    'diff.row3.rekigan': '<strong>可對應</strong>',
    'diff.row4.label': '斷緣·結緣',
    'diff.row4.normal': '不可',
    'diff.row4.rekigan': '<strong>可對應</strong>',
    'diff.quote': '占卜師只是「看」。<br>暦，<strong>看了之後，還會行動。</strong>',
    'services.title': '<span class="section-title-en">SERVICES</span>鑑定提供的服務',
    'services.s1.title': '靈視鑑定',
    'services.s1.desc': '靈氣·過去·現狀的解讀',
    'services.s2.title': '結界術',
    'services.s2.desc': '布陣·斷切——守護空間與人',
    'services.s3.title': '能量注入',
    'services.s3.desc': '注入力量，引導至本來的狀態',
    'services.s4.title': '良緣牽引',
    'services.s4.desc': '調整戀愛·人際關係的緣分',
    'services.s5.title': '健康調理',
    'services.s5.desc': '從能量角度對身體進行調理',
    'services.note': '※本服務非醫療行為，不能替代醫生的診斷和治療。',
    'price.title': '<span class="section-title-en">PRICE</span>價格',
    'price.label': '首次鑑定',
    'price.unit': '分鐘',
    'price.tax': '（含稅）',
    'price.desc': '每增加10分鐘追加¥5,500。<br>只需要的時長，不多不少。',
    'price.note': '嚴格計時管理。不會有意外收費。',
    'price.remote': '也可進行遠程靈視鑑定。請準備本人的照片。',
    'voice.title': '<span class="section-title-en">VOICE</span>體驗者的聲音',
    'voice.v1.text': '第一次見面的瞬間，她就說出了我從未對任何人說過的事。我不禁流下了淚水。',
    'voice.v1.cite': '── 40多歲男性 T.T',
    'voice.v2.text': '鑑定後，一直沉重的身體變得不可思議地輕鬆了。那種感覺至今難忘。',
    'voice.v2.cite': '── 30多歲女性 J.K',
    'cta.lead': '「有一個了不起的人」——<br class="sp-only">這句話在靜靜傳開。',
    'cta.desc': '<p>我們不做宣傳。</p><p>只是接受過鑑定的人，<br class="sp-only">會推薦給自己重要的人。</p><p>就這樣，珍惜每一份來到暦（koyomi）<br class="sp-only">身邊的緣分，<br>為你的人生帶來轉機。</p>',
    'cta.closing': '先從10分鐘開始。<br>親自確認所看到的一切。',
    'cta.button': '透過LINE@預約鑑定',
    'footer.note1': '※本服務為占卜·靈性服務，非醫療行為或金融建議。',
    'footer.note2': '※效果因人而異。',
    'footer.note3': '※絕不進行恐嚇式推銷。',
    'footer.note4': '※鑑定內容嚴格保密，絕不向第三方透露。',
    'footer.note5': '※未滿18歲者需獲得監護人同意。',
    'footer.link1': '特定商業交易法標註',
    'footer.link2': '隱私政策'
  }
};

const langLabels = { ja: 'JA', en: 'EN', 'zh-CN': '简中', 'zh-TW': '繁中' };

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });
  document.documentElement.lang = lang === 'zh-CN' ? 'zh-Hans' : lang === 'zh-TW' ? 'zh-Hant' : lang;
  document.getElementById('langToggle').querySelector('.lang-label').textContent = langLabels[lang];
  document.querySelectorAll('.lang-dropdown button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem('rekigan-lang', lang);
}

function initLangSwitcher() {
  const switcher = document.querySelector('.lang-switcher');
  const toggle = document.getElementById('langToggle');
  const dropdown = document.getElementById('langDropdown');

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    switcher.classList.toggle('open');
  });

  dropdown.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-lang]');
    if (!btn) return;
    applyLanguage(btn.dataset.lang);
    switcher.classList.remove('open');
  });

  document.addEventListener('click', () => {
    switcher.classList.remove('open');
  });

  const saved = localStorage.getItem('rekigan-lang');
  if (saved && saved !== 'ja') {
    applyLanguage(saved);
  }
}
