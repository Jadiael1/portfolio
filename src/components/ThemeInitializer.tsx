export const ThemeInitializer = () => {
	const script = `
    (function () {
      const html = document.documentElement;
      try {
        const themeIntent = localStorage.getItem("theme-intent");
        if (!themeIntent) {
          localStorage.setItem("theme-intent", "system");
        }
        const newThemeStorage = themeIntent || "system";
        const isDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const resolvedThemeSystem =
          newThemeStorage === "system"
            ? { true: "dark", false: "light" }[isDarkMode]
            : newThemeStorage;
        const resolvedTheme =
          newThemeStorage === "system" ? resolvedThemeSystem : newThemeStorage;
        html.setAttribute("data-theme", resolvedTheme);
        html.setAttribute("data-theme-intent", newThemeStorage);
      } catch {
        const isDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const theme = isDarkMode ? "dark" : "light";
        html.setAttribute("data-theme", theme);
        html.setAttribute("data-theme-intent", theme);
      }
    })();
  `;

	return <script dangerouslySetInnerHTML={{ __html: script }} />;
};
