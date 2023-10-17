const main = document.querySelector("main");
const toggleSize = main.querySelector("button");

toggleSize.addEventListener("click", () => {
  let expand = main.classList.contains("expand");
  expand = !expand;

  toggleSize.setAttribute("aria-pressed", expand ? "true" : "false");
  toggleSize
    .querySelector("use")
    .setAttribute("href", expand ? "#icon-restore" : "#icon-expand");

  if (!document.startViewTransition) {
    main.classList.toggle("expand");
  } else {
    document.startViewTransition(async () => {
      await main.classList.toggle("expand");
    });
  }
});
