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
