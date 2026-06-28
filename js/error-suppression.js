// Suppress browser extension errors that don't affect the portfolio functionality
window.addEventListener("error", (e) => {
  if (e.filename && e.filename.includes("contentscript.bundle.js")) {
    e.preventDefault();
    return false;
  }
});

window.addEventListener("unhandledrejection", (e) => {
  if (
    e.reason &&
    e.reason.message &&
    e.reason.message.includes("message port closed")
  ) {
    e.preventDefault();
    return false;
  }
});

