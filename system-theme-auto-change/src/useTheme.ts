import { useEffect, useState } from "react";
const LOCAL_KEY = "__theme__";

type themeTypes = "light" | "dark" | "auto";

const match = window.matchMedia("(prefers-color-scheme: dark)");

const followSystem = () => {
  if (match.matches) {
    setDataset("dark");
  } else {
    setDataset("light");
  }
};

function setDataset(theme: themeTypes) {
  document.documentElement.dataset.theme = theme;
}

export const useTheme = () => {
  const inital = (localStorage.getItem(LOCAL_KEY) || "auto") as themeTypes;
  const [theme, setTheme] = useState<themeTypes>(inital);
  useEffect(() => {
    if (theme === "auto") {
      followSystem();
      match.addEventListener("change", followSystem);
    } else {
      setDataset(theme);
      match.removeEventListener("change", followSystem);
    }
    localStorage.setItem(LOCAL_KEY, theme);
  });

  return {
    theme,
    setTheme,
  };
};
