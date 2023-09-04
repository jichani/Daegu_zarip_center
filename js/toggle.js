const mainMenuTitle = document.querySelectorAll(".sideAccordion_title");
const subMenues = document.querySelectorAll(".sideAccordion_menu");

console.log(subMenues);

for (let i = 0; i < mainMenuTitle.length; i++) {
  mainMenuTitle[i].addEventListener("click", () => {
    subMenues[i].classList.toggle("show");
    for (let j = 0; j < mainMenuTitle.length; j++) {
      if (i !== j) {
        subMenues[j].classList.remove("show");
      }
    }
  });
}
