// src/theme/ThemeProvider.tsx
import * as React from "react";
import { ThemeContext, type Theme } from "./theme-context";

const THEME_STORAGE_KEY = "theme";

type ThemeProviderProps = React.PropsWithChildren<{
  /**
   * "light" | "dark" | "system"
   * - "system" = follow OS prefers-color-scheme
   * - default = "system"
   */
  defaultTheme?: Theme | "system";
}>;

function getInitialTheme(defaultTheme: Theme | "system" = "system"): Theme {
  if (typeof window === "undefined") {
    // during SSR or non-browser env
    return defaultTheme === "dark" ? "dark" : "light";
  }

  // 1) if stored in localStorage, use that
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  // 2) otherwise, use defaultTheme
  if (defaultTheme === "light" || defaultTheme === "dark") {
    return defaultTheme;
  }

  // 3) defaultTheme === "system" → follow system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "system",
}) => {
  const [theme, setThemeState] = React.useState<Theme>(() =>
    getInitialTheme(defaultTheme),
  );

  // Sync to <html> class + localStorage
  React.useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = React.useCallback(
    () => setThemeState((prev) => (prev === "light" ? "dark" : "light")),
    [],
  );

  const value = React.useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
