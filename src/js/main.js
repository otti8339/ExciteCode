// ============================================
// main.js
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // スムーススクロール
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // # 単体の場合は何もしない
    if (href === '#') return;

    e.preventDefault();
    document.querySelector(href).scrollIntoView({
      behavior: 'smooth'
    });
  });

  // AOSの初期化
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 0,
  });
});

  // ============================================
  // ハンバーガーメニュー（必要に応じて有効化）
  // ============================================
  const hamburger = document.querySelector('.js-hamburger');
  const nav = document.querySelector('.js-sp-nav');
  if (hamburger && nav ) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('is-open');
      nav.classList.toggle('is-open');
    });
  }

  const mv_swiper = new Swiper('.js-mv-swiper', {
    direction: 'vertical',
    loop: true,
    speed: 2000,
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
  });

  if (typeof gsap === 'undefined') return;

// 初期状態（PC/SP共通）
gsap.set('.mv__title-line', { y: 30, opacity: 0, visibility: 'visible' });
gsap.set('.mv__catch', { x: -30, opacity: 0, visibility: 'visible' });

const mm = gsap.matchMedia();

// PC: ロード時に時間差で発火
mm.add('(min-width: 768px)', () => {
  gsap.to('.mv__title-line', {
    y: 0,
    opacity: 1,
    duration: 0.6,
    delay: 0.2,
    stagger: 0.15,
    ease: 'power2.out',
  });

  gsap.to('.mv__catch', {
    x: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.9,
    ease: 'power2.out',
  });
});

// SP: スクロールで画面に入ったら発火
mm.add('(max-width: 767px)', () => {
  gsap.to('.mv__title-line', {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.mv__title',
      start: 'top 95%',
      toggleActions: 'play none none none',
    }
  });

  gsap.to('.mv__catch', {
    x: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.mv__catch-wrap',
      start: 'top 95%',
      toggleActions: 'play none none none',
    }
  });
});

  const splitTargets = document.querySelectorAll('.js-split-text');

  splitTargets.forEach(target => {
    const text = target.textContent;
    target.textContent = '';

    [...text].forEach(char => {
      const span = document.createElement('span');
      span.className = 'char';
      // 半角スペースは&nbsp;扱いに
      span.textContent = char === ' ' ? '\u00A0' : char;
      target.appendChild(span);
    });
  });

  gsap.registerPlugin(ScrollTrigger);

  // ============================================
  // News一覧ページ：記事リストのフェードイン
  // ============================================
 const newsItems = document.querySelectorAll('.news__item');
  if (newsItems.length > 0) {
    newsItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const inView = rect.top < window.innerHeight;

      if (inView) {
        // 画面内：ページロード時に順番にfade-up
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power2.out',
        });
      } else {
        // 画面外：スクロールで発火
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      }
    });
  }

document.querySelectorAll('.js-split-text').forEach(target => {
  const chars = target.querySelectorAll('.char');

  gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.1, // 1文字ずつの遅延
    scrollTrigger: {
      trigger: target,
      start: 'top 90%', // 画面下から20%入ったら発火
      toggleActions: 'play none none none',
      // markers: true, // デバッグ時に有効化
    }
  });
});

});





