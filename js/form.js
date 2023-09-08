let selectedValue; // 선택된 값 저장을 위한 전역 변수

// 버튼에 이벤트 추가
const inform_buttons = document.querySelectorAll(".inqurey_option");
inform_buttons.forEach(button => {
  button.addEventListener("click", () => {
    // 모든 버튼에서 'checked' 클래스 제거
    inform_buttons.forEach(btn => btn.classList.remove("checked"));
    // 클릭한 버튼에만 'checked' 클래스 추가
    button.classList.add("checked");
    // 데이터 값 가져오기
    selectedValue = button.dataset.value;
  });
});

// 약관 동의
const checkbox = document.getElementById("agreeCheckbox");
const form_submit = document.getElementById("privateButton");

form_submit.addEventListener("click", (e) => {
  if (!checkbox.checked) {
    // 약관에 동의하지 않았다면 폼 제출 방지
    alert("약관에 동의하세요.");
    e.preventDefault();
  } else {
    e.preventDefault();

    if (typeof api_key !== 'undefined' && typeof api_secret !== 'undefined') {
      btn_sendMessage_customer();
      btn_sendMessage_counselor();
    } else {
      alert("로컬에서만 작동합니다");
    }


    // const name = document.getElementById("name").value;
    // const tel = document.getElementById("tel").value;
    // const email = document.getElementById("email").value;
    // const text = document.getElementById("text").value;

    // console.log(`이름: ${name}`);
    // console.log(`번호: ${tel}`);
    // console.log(`Email: ${email}`);
    // console.log(`버튼: ${selectedValue}`)
    // console.log(`텍스트: ${text}`);
  }
});