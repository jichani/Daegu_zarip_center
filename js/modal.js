const button = document.querySelector(".contact");
const dialog = document.querySelector("dialog");
const close_button = document.querySelector(".close_btn");

button.addEventListener("click", () => {
  dialog.showModal();
});

close_button.addEventListener("click", () => {
  dialog.close();
});

window.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});