<script lang="ts">
  import type { Display, Theme } from "$lib/types";

  let largeDisplay = $state(false);
  let darkTheme = $state(false);

  const updateDisplay = () => {
    const display: Display = largeDisplay ? "large" : "";
    document.documentElement.setAttribute("data-display", display);
    localStorage.setItem("data-display", display);
  };

  const toggleLargeDisplay = () => {
    largeDisplay = !largeDisplay;

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        updateDisplay();
      });
    } else {
      updateDisplay();
    }
  };

  const toggleDarkTheme = () => {
    darkTheme = !darkTheme;

    const theme: Theme = darkTheme ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", theme);
  };
</script>

<button
  id="toggle-large-display"
  onclick={toggleLargeDisplay}
  aria-pressed={largeDisplay}
>
  <span class="visually-hidden">Toggle large display</span>
  <!-- prettier-ignore -->
  <svg data-pressed="false" width="1em" height="1em" viewBox="0 0 1 1">
          <use href="#icon-expand" width="1" height="1" />
        </svg>
  <!-- prettier-ignore -->
  <svg data-pressed="true" display="none" width="1em" height="1em" viewBox="0 0 1 1">
          <use href="#icon-reduce" width="1" height="1" />
        </svg>
</button>
<button
  id="toggle-dark-theme"
  onclick={toggleDarkTheme}
  aria-pressed={darkTheme}
>
  <span class="visually-hidden">Toggle dark theme</span>
  <!-- prettier-ignore -->
  <svg data-pressed="false" width="1em" height="1em" viewBox="0 0 1 1">
          <use href="#icon-sun" width="1" height="1" />
        </svg>
  <!-- prettier-ignore -->
  <svg data-pressed="true" display="none" width="1em" height="1em" viewBox="0 0 1 1">
          <use href="#icon-moon" width="1" height="1" />
        </svg>
</button>
