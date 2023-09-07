const mainMenuItems = document.querySelectorAll(".sideAccordion_title");

for (let i = 0; i < mainMenuItems.length; i++) {
  mainMenuItems[i].addEventListener("click", () => {

    // 모든 메뉴 항목의 'show' 클래스 제거
    for (let j = 0; j < mainMenuItems.length; j++) {
      if (i !== j) {
        mainMenuItems[j].classList.remove("show");
      }
    }

    // 현재 클릭한 메뉴 항목에 'show' 클래스 추가
    mainMenuItems[i].classList.add("show");
  });
}
