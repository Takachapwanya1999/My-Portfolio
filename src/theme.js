const themeToggle = document.getElementById("themeToggle");
function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}
function handleThemeToggle() {
    if (themeToggle.checked) {
        setTheme("dark");
    }
    else {
        setTheme("light");
    }
}
themeToggle.addEventListener("change", handleThemeToggle);
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    setTheme(savedTheme);
    if (savedTheme === "dark") {
        themeToggle.checked = true;
    }
    else {
        themeToggle.checked = false;
    }
}
else {
    setTheme("light");
}
