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

  // console.log(selectedValue);

  Promise.all([btn_sendMessage_customer(), btn_sendMessage_counselor()])
    .then(() => {
      alert("상담 신청이 완료되었습니다.");
    })
    .catch((error) => {
      console.error("Error during message sending:", error);
      alert("상담 신청이 실패했습니다.")
    });
}
