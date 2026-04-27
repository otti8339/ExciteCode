// ============================================
// main.js
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // スムーススクロール
  // ============================================
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
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


});

// document.addEventListener('DOMContentLoaded', () => {
//   // GSAPが読み込まれているかチェック
//   if (typeof gsap === 'undefined') return;
  
//   gsap.set('.mv__title-line, .mv__catch', { visibility: 'visible' });
//   gsap.registerPlugin(ScrollTrigger);

//   // MV内の要素を時間差で出現させる
//   gsap.from('.mv__title-line', {
//     y: 30,           // 30px下から
//     opacity: 0,      // 透明から
//     duration: 0.8,   // 0.8秒かけて
//     delay: 0.3,      // 0.3秒遅らせて開始
//     stagger: 0.2,    // 各要素を0.2秒ずつずらす
//     ease: 'power2.out',
//   });
  
//   gsap.from('.mv__catch', {
//     x: -30,          // 30px左から
//     opacity: 0,      // 透明から
//     duration: 0.8,
//     delay: 0.9,      // タイトルが出終わってから
//     ease: 'power2.out',
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  gsap.set('.mv__title-line, .mv__catch', { visibility: 'visible' });
  // ScrollTriggerプラグインを登録
  gsap.registerPlugin(ScrollTrigger);
  
  // タイトル: ロード時に時間差で出現
  gsap.from('.mv__title-line', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    stagger: 0.2,
    ease: 'power2.out',
  });
  
  // キャッチ: スクロールして見えてきたら出現
  gsap.from('.mv__catch', {
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.mv__catch-wrap',  // この要素を起点に
      start: 'top 80%',             // 要素の上端が画面の80%位置に来たら発火
      // markers: true,             // デバッグ用。動作確認したら消す
    },
  });
});