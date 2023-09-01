let first_swiper = new Swiper(".first_swiper", {
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  effect: window.innerWidth > 769 ? 'fade' : '', // 페이드 효과 사용
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      var textArray = ['재정관리', '주거관리', '진로관리', '건강관리', '법률관리'];
      var svgArray = [
        '<svg>...</svg>',  // 첫 번째 SVG 코드
        '<svg>...</svg>',  // 두 번째 SVG 코드
        '<svg>...</svg>',  // 세 번째 SVG 코드
        '<svg>...</svg>',  // 네 번째 SVG 코드
        '<svg>...</svg>'   // 다섯 번째 SVG 코드
      ];
      return '<span class="' + className + '">' +
        svgArray[index] +
        '<span>' + textArray[index] + '</span>' +
        '</span>';
    }
  },
});