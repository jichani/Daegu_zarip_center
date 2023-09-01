let first_swiper = new Swiper(".first_swiper", {
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  effect: window.innerWidth > 769 ? 'fade' : '', // 페이드 효과 사용
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },


});

var buttons = document.querySelectorAll('.carousel_button .button');
buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    var slideIndex = parseInt(this.getAttribute('data-slide'));
    first_swiper.slideToLoop(slideIndex); // slideToLoop 메소드로 변경
  });
});

first_swiper.on('slideChange', function () {
  buttons.forEach(function (button) {
    var slideIndex = parseInt(button.getAttribute('data-slide'));
    if (slideIndex === first_swiper.realIndex) { // realIndex 속성으로 변경
      button.classList.add('active'); // 'active'는 활성화 상태를 나타내는 클래스입니다.
    } else {
      button.classList.remove('active');
    }
  });
});