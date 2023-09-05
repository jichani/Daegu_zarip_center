const button = document.querySelector(".contact");
const dialog = document.querySelector("dialog");
const close_button = document.querySelector(".close_btn");

const contact_buttons = document.querySelectorAll(".contact_button")

button.addEventListener("click", () => {
  dialog.showModal();
});

for (let i = 0; i < contact_buttons.length; i++) {
  contact_buttons[i].addEventListener("click", () => {
    dialog.showModal();
  });
}

close_button.addEventListener("click", () => {
  dialog.close();
});

window.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});