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
    // Hidden input field 업데이트
    document.getElementById('inquiryType').value = selectedValue;
  });
});

function buttonConsulting(e) {
  e.preventDefault();

  // 선택된 버튼 찾기
  const selectedButton = document.querySelector('.inqurey_option.checked');

  // 만약 선택된 버튼이 없다면 경고 메시지 표시 후 함수 종료
  if (!selectedButton) {
    alert('문의할 카테고리를 선택해주세요.');
    return false;
  }

  // 선택된 버튼의 데이터 값 가져오기
  const selectedValue = selectedButton.dataset.value;

  // console.log(selectedValue);

  if (typeof api_key !== 'undefined' && typeof api_secret !== 'undefined') {
    btn_sendMessage_customer();
    btn_sendMessage_counselor();
    // console.log("api 키는 있지만 일시적으로 막아둠!");
    return true;
  } else {
    alert("api 키가 없으니 로컬에서만 작동합니다");
    return false;
  }
}
