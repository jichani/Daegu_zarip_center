$(function () {
  $("header nav a").click(function (e) {
    $.scrollTo(this.hash || 0, 600); /* 속도 절, 숫자가 작을수록 빠름 */
    e.preventDefault();
  });
});