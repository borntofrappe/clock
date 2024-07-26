const buttonToggleDisplay = document.querySelector("button#toggle-display");

if (document.documentElement.getAttribute("data-mode") === "display") {
  buttonToggleDisplay.setAttribute("aria-pressed", "true");
}

const toggleDisplay = () => {
  const mode =
    buttonToggleDisplay.getAttribute("aria-pressed") === "true" ? "display" : "default";
  document.documentElement.setAttribute("data-mode", mode);

  localStorage.setItem('data-mode', mode)
};

buttonToggleDisplay.addEventListener("click", function () {
  this.setAttribute(
    "aria-pressed",
    this.getAttribute("aria-pressed") === "true" ? "false" : "true"
  );

  if (document.startViewTransition) {
    document.startViewTransition(() => {
      toggleDisplay();
    });
  } else {
    toggleDisplay();
  }
});
