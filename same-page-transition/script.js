const main = document.querySelector("main");
const button = main.querySelector("button");

button.addEventListener("click", () => {
  let expanded = main.classList.contains("expand");
  expanded = !expanded;
  const text = expanded ? "Restore" : "Expand";
  const href = expanded ? "#icon-restore" : "#icon-expand";

  button.querySelector("title").textContent = text;
  button.querySelector("use").setAttribute("href", href);

  if (!document.startViewTransition) {
    main.classList.toggle("expand");
    button.querySelector("title").textContent = text;
    button.querySelector("use").setAttribute("href", href);
  } else {
    document.startViewTransition(async () => {
      await main.classList.toggle("expand");
      button.querySelector("title").textContent = text;
      button.querySelector("use").setAttribute("href", href);
    });
  }
});
