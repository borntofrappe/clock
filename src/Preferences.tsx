import { createSignal, onMount } from "solid-js";

function Preferences() {
  const [largeDisplay, setLargeDisplay] = createSignal(false);
  const [darkTheme, setDarkTheme] = createSignal(false);

  onMount(() => {
    const display = document.documentElement.getAttribute("data-display");
    const theme = document.documentElement.getAttribute("data-theme");
    if (display === "large") {
      setLargeDisplay(true);
    }
    if (theme === "dark") {
      setDarkTheme(true);
    }
  });

  const updateDisplay = () => {
    const display = largeDisplay() ? "large" : "normal";
    document.documentElement.setAttribute("data-display", display);
    localStorage.setItem("data-display", display);
  };

  const toggleLargeDisplay = () => {
    setLargeDisplay(!largeDisplay());

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        updateDisplay();
      });
    } else {
      updateDisplay();
    }
  };

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme());

    const theme = darkTheme() ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", theme);
  };

  return (
    <>
      <button
        id="toggle-large-display"
        onClick={toggleLargeDisplay}
        aria-label="Toggle large display"
        aria-pressed={largeDisplay()}
      >
        <svg data-pressed="false" width="1em" height="1em" viewBox="0 0 1 1">
          <use href="#icon-expand" width="1" height="1" />
        </svg>
        <svg
          data-pressed="true"
          display="none"
          width="1em"
          height="1em"
          viewBox="0 0 1 1"
        >
          <use href="#icon-reduce" width="1" height="1" />
        </svg>
      </button>
      <button
        id="toggle-dark-theme"
        onClick={toggleDarkTheme}
        aria-label="Toggle dark theme"
        aria-pressed={darkTheme()}
      >
        <svg data-pressed="false" width="1em" height="1em" viewBox="0 0 1 1">
          <use href="#icon-sun" width="1" height="1" />
        </svg>
        <svg
          data-pressed="true"
          display="none"
          width="1em"
          height="1em"
          viewBox="0 0 1 1"
        >
          <use href="#icon-moon" width="1" height="1" />
        </svg>
      </button>
    </>
  );
}

export default Preferences;
