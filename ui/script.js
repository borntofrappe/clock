const heading = document.querySelector("h1");
const toggleSize = document.querySelector("main > button");

toggleSize.addEventListener("click", () => {
  let expand = heading.classList.contains("expand");
  expand = !expand;

  toggleSize.querySelector("span").textContent = expand ? "Restore" : "Expand";
  toggleSize
    .querySelector("use")
    .setAttribute("href", expand ? "#icon-restore" : "#icon-expand");

  if (!document.startViewTransition) {
    heading.classList.toggle("expand");
  } else {
    document.startViewTransition(async () => {
      await heading.classList.toggle("expand");
    });
  }
});
