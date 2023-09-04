const inform_buttons = document.querySelectorAll(".inqurey_option");

inform_buttons.forEach(button => {
  button.addEventListener("click", () => {
    // 모든 버튼에서 'checked' 클래스 제거
    inform_buttons.forEach(btn => btn.classList.remove("checked"));
    // 클릭한 버튼에만 'checked' 클래스 추가
    button.classList.add("checked");
    // 데이터 값 가져오기
    const value = button.dataset.value;

    console.log(value); // 콘솔에 값 출력
  });
});

// 약관 동의
const checkbox = document.getElementById("agreeCheckbox");
const form_submit = document.getElementById("privateButton");

form_submit.addEventListener("click", () => {
  if (!checkbox.checked) {
    alert("약관에 동의하세요.");
    e.preventDefault(); // 약관에 동의하지 않았다면 폼 제출 방지
  }
});