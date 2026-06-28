document.addEventListener("DOMContentLoaded", () => {
  windowManager = new Windows11Manager();
  window.windowManager = windowManager;
  window.personalFeatures = new Windows11PersonalFeatures();
  window.portfolioTerminal = new PortfolioTerminal();
  // Easter eggs removed for professional portfolio
  // kanbanManager = new KanbanManager();
  // window.kanbanManager = kanbanManager;

  // Make functions globally accessible
  window.closeWindow = (windowId) => windowManager.closeWindow(windowId);
  window.minimizeWindow = (windowId) => windowManager.minimizeWindow(windowId);
  window.maximizeWindow = (windowId) => windowManager.maximizeWindow(windowId);
  window.showStartMenu = () => windowManager.toggleStartMenu();

  // Sync the taskbar tray theme icon with the persisted theme.
  const isDark =
    document.documentElement.getAttribute("data-theme") === "dark";
  const trayThemeIcon = document.querySelector("#trayThemeToggle i");
  if (trayThemeIcon) {
    trayThemeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
  }

  // Welcome notification
  setTimeout(() => {
    personalFeatures.showNotification(
      "Welcome to Katekani's Portfolio!",
      "Double-click icons to open windows, drag to move them. <br> Explore the taskbar and start menu for more features.",
      "fab fa-windows"
    );
  }, 1000);
});
