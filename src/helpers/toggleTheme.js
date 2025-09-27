export function toggleTheme(setTheme) {
  setTheme((prevTheme) => {
    const newTheme = prevTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    return newTheme;
  });
}
