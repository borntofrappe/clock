const buttonToggleSize = document.querySelector("button#toggle-size");

if (document.documentElement.getAttribute("data-mode") === "display") {
  buttonToggleSize.setAttribute("aria-pressed", "true");
}

const toggleSize = () => {
  const size =
    buttonToggleSize.getAttribute("aria-pressed") === "true" ? "display" : "default";
  document.documentElement.setAttribute("data-mode", size);
};

buttonToggleSize.addEventListener("click", function () {
  this.setAttribute(
    "aria-pressed",
    this.getAttribute("aria-pressed") === "true" ? "false" : "true"
  );

  if (document.startViewTransition) {
    document.startViewTransition(() => {
      toggleSize();
    });
  } else {
    toggleSize();
  }
});
