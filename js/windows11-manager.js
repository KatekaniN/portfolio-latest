// Windows 11 Style Window Manager
class Windows11Manager {
  constructor() {
    this.activeWindows = [];
    this.draggedWindow = null;
    this.dragOffset = { x: 0, y: 0 };
    this.zIndexCounter = 1000;
    this.isStartMenuOpen = false;
    this.notificationHistory = [];
    this.maxNotifications = 10;
    this.currentCalendarDate = null;
    this.selectedCalendarDate = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateClock();
    this.startClockUpdate();
    this.setupWindowSnapping();
    this.addWindows11Animations();
    this.initializeWindowStructure(); // Add this
  }

  initializeWindowStructure() {
    // Ensure all windows are properly attached to body and not nested
    const windows = document.querySelectorAll(".window");
    windows.forEach((window) => {
      if (window.parentElement !== document.body) {
        console.log(
          `Moving window ${window.id} to body level (was nested in ${window.parentElement.tagName})`
        );
        document.body.appendChild(window);
      }
      // Ensure proper initial styling
      window.style.position = "absolute";
    });
    console.log(`Initialized ${windows.length} windows at body level`);
  }





























  setupEventListeners() {
    // Desktop icon handlers with Windows 11 interactions
    document.querySelectorAll(".desktop-icon").forEach((icon) => {
      icon.addEventListener("dblclick", (e) => {
        e.preventDefault();
        const windowId = icon.getAttribute("data-window");
        this.openWindow(windowId);
        this.addOpenAnimation(icon);
      });

      icon.addEventListener("click", (e) => {
        e.stopPropagation();
        this.selectIcon(icon);
      });

      // Add hover sound effect (visual feedback)
      icon.addEventListener("mouseenter", () => {
        icon.style.transform = "translateY(-2px) scale(1.02)";
      });

      icon.addEventListener("mouseleave", () => {
        if (!icon.classList.contains("selected")) {
          icon.style.transform = "";
        }
      });
    });

    // Desktop click handler
    document.getElementById("desktop").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        this.deselectAllIcons();
        this.closeStartMenu();
      }
    });

    // Window dragging setup
    this.setupWindowDragging();

    // Keyboard shortcuts (Windows 11 style)
    document.addEventListener("keydown", (e) => {
      this.handleKeyboardShortcuts(e);
    });

    // Prevent context menu (we'll add our own later)
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }

  addOpenAnimation(icon) {
    icon.style.animation = "none";
    icon.offsetHeight; // Trigger reflow
    icon.style.animation = "pulse 0.3s ease-out";
    setTimeout(() => {
      icon.style.animation = "";
    }, 300);
  }

  selectIcon(icon) {
    this.deselectAllIcons();
    icon.classList.add("selected");
    icon.style.transform = "translateY(-2px) scale(1.02)";
  }

  deselectAllIcons() {
    document.querySelectorAll(".desktop-icon").forEach((i) => {
      i.classList.remove("selected");
      i.style.transform = "";
    });
  }

  openWindow(windowId) {
    console.log(`Opening window: ${windowId}`);
    const window = document.getElementById(windowId);
    if (!window) {
      console.error(`Window not found: ${windowId}`);
      return;
    }

    // CRITICAL: Ensure window is attached to body, not nested inside another window
    if (window.parentElement !== document.body) {
      console.log(
        `Moving window ${windowId} to body (was in ${window.parentElement.id || "unknown"})`
      );
      document.body.appendChild(window);
    }

    // If window is already active, just bring it to front
    if (
      this.activeWindows.includes(windowId) &&
      window.classList.contains("active")
    ) {
      window.style.zIndex = ++this.zIndexCounter;
      this.addFocusEffect(window);
      console.log(`Window ${windowId} brought to front`);
      return;
    }

    // Remove active class from all other windows to unfocus them
    this.activeWindows.forEach((activeId) => {
      const activeWindow = document.getElementById(activeId);
      if (activeWindow && activeId !== windowId) {
        activeWindow.classList.remove("focused");
      }
    });

    // Ensure window is in clean state before opening
    this.resetWindowState(window);

    // Force proper positioning and display
    window.style.position = "absolute";

    // Windows 11 opening animation
    window.classList.add("opening");
    setTimeout(() => window.classList.remove("opening"), 400);

    // Activate the window
    window.classList.add("active");
    window.style.zIndex = ++this.zIndexCounter;

    // Update active windows list
    if (!this.activeWindows.includes(windowId)) {
      this.activeWindows.push(windowId);
    }

    this.updateTaskbar();
    this.centerWindowSmart(window);

    // Add focus ring effect
    this.addFocusEffect(window);

    console.log(
      `Window ${windowId} opened successfully at zIndex ${window.style.zIndex}`
    );
  }

  resetWindowState(window) {
    window.classList.remove("maximized", "focused");

    // Clear minimized state
    delete window.dataset.isMinimized;
    delete window.dataset.wasActive;

    // Reset to original dimensions and position if they exist
    if (window.dataset.originalWidth) {
      window.style.width = window.dataset.originalWidth;
      window.style.height = window.dataset.originalHeight;
      window.style.left = window.dataset.originalLeft;
      window.style.top = window.dataset.originalTop;
    }

    // Clear stored original dimensions
    delete window.dataset.originalWidth;
    delete window.dataset.originalHeight;
    delete window.dataset.originalLeft;
    delete window.dataset.originalTop;

    // Reset visual properties
    window.style.transform = "";
    window.style.borderRadius = "0px";
    window.style.boxShadow = "";

    // Ensure proper positioning
    window.style.position = "absolute";

    // Reset maximize button
    const maximizeBtn = window.querySelector(".window-control.maximize");
    if (maximizeBtn) {
      maximizeBtn.innerHTML = "\u25A1"; // Default maximize symbol
      maximizeBtn.title = "Maximize";
    }
  }

  closeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (!window) return;

    // Windows 11 closing animation
    window.style.animation = "windowClose 0.2s ease-in forwards";

    setTimeout(() => {
      window.classList.remove("active");
      window.style.animation = "";

      // RESET WINDOW STATE - Add these lines
      this.resetWindowState(window);

      this.activeWindows = this.activeWindows.filter((id) => id !== windowId);
      this.updateTaskbar();
    }, 200);
  }
  centerWindowSmart(window) {
    const rect = window.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight - 56; // Account for taskbar

    // Smart positioning - avoid overlapping too much
    const baseX = Math.max(50, (screenWidth - rect.width) / 2);
    const baseY = Math.max(50, (screenHeight - rect.height) / 2);

    // Offset for multiple windows
    const offset = this.activeWindows.length * 30;

    window.style.left =
      Math.min(baseX + offset, screenWidth - rect.width - 50) + "px";
    window.style.top =
      Math.min(baseY + offset, screenHeight - rect.height - 50) + "px";
  }

  addFocusEffect(window) {
    // Remove focus from other windows
    document.querySelectorAll(".window").forEach((w) => {
      w.classList.remove("focused");
    });

    window.classList.add("focused");

    // Add subtle glow effect
    window.style.boxShadow = `
        0 32px 64px rgba(0, 120, 212, 0.15),
        0 16px 32px rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba(0, 120, 212, 0.2)
    `;

    setTimeout(() => {
      window.style.boxShadow = "";
    }, 1000);
  }

  setupWindowDragging() {
    document.querySelectorAll(".window-header").forEach((header) => {
      header.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("window-control")) return;

        this.draggedWindow = e.target.closest(".window");
        const rect = this.draggedWindow.getBoundingClientRect();
        this.dragOffset.x = e.clientX - rect.left;
        this.dragOffset.y = e.clientY - rect.top;

        // Bring to front and add dragging state
        this.draggedWindow.style.zIndex = ++this.zIndexCounter;
        this.draggedWindow.classList.add("dragging");

        // Change cursor
        document.body.style.cursor = "grabbing";
      });
    });

    document.addEventListener("mousemove", (e) => {
      if (this.draggedWindow) {
        const newX = Math.max(
          0,
          Math.min(
            window.innerWidth - this.draggedWindow.offsetWidth,
            e.clientX - this.dragOffset.x
          )
        );
        const newY = Math.max(
          0,
          Math.min(
            window.innerHeight - this.draggedWindow.offsetHeight - 56,
            e.clientY - this.dragOffset.y
          )
        );

        this.draggedWindow.style.left = newX + "px";
        this.draggedWindow.style.top = newY + "px";

        // Show snap zones when near edges
        this.showSnapZones(e.clientX, e.clientY);
      }
    });

    document.addEventListener("mouseup", (e) => {
      if (this.draggedWindow) {
        this.draggedWindow.classList.remove("dragging");
        document.body.style.cursor = "";

        // Handle window snapping
        this.handleWindowSnap(e.clientX, e.clientY);
        this.hideSnapZones();

        this.draggedWindow = null;
      }
    });
  }

  setupWindowSnapping() {
    this.snapZones = document.createElement("div");
    this.snapZones.className = "snap-zones";
    this.snapZones.style.display = "none";
    document.body.appendChild(this.snapZones);
  }

  showSnapZones(mouseX, mouseY) {
    const threshold = 20;
    const showLeft = mouseX < threshold;
    const showRight = mouseX > window.innerWidth - threshold;
    const showTop = mouseY < threshold;

    if (showLeft || showRight || showTop) {
      this.snapZones.style.display = "block";
      this.snapZones.innerHTML = `
            ${showLeft ? '<div class="snap-zone left"></div>' : ""}
            ${showRight ? '<div class="snap-zone right"></div>' : ""}
            ${showTop ? '<div class="snap-zone top"></div>' : ""}
        `;
    } else {
      this.snapZones.style.display = "none";
    }
  }

  hideSnapZones() {
    this.snapZones.style.display = "none";
  }

  handleWindowSnap(mouseX, mouseY) {
    if (!this.draggedWindow) return;

    const threshold = 20;
    const window = this.draggedWindow;

    if (mouseX < threshold) {
      // Snap to left half
      window.style.left = "0px";
      window.style.top = "0px";
      window.style.width = "50vw";
      window.style.height = "calc(100vh - 56px)";
    } else if (mouseX > window.innerWidth - threshold) {
      // Snap to right half
      window.style.left = "50vw";
      window.style.top = "0px";
      window.style.width = "50vw";
      window.style.height = "calc(100vh - 56px)";
    } else if (mouseY < threshold) {
      // Snap to maximize
      window.style.left = "0px";
      window.style.top = "0px";
      window.style.width = "100vw";
      window.style.height = "calc(100vh - 56px)";
    }
  }

  updateTaskbar() {
    const taskbarWindows = document.getElementById("openWindows");
    taskbarWindows.innerHTML = "";

    this.activeWindows.forEach((windowId) => {
      const window = document.getElementById(windowId);
      const title = window.querySelector(".window-title").textContent.trim();
      const isMinimized = window.dataset.isMinimized === "true";

      const taskbarItem = document.createElement("div");
      taskbarItem.className = `taskbar-window ${
        isMinimized ? "minimized" : ""
      }`;
      taskbarItem.innerHTML = `<i class="fas fa-window-maximize"></i> ${title}`;

      // Handle taskbar click - restore if minimized, focus if not
      taskbarItem.onclick = () => {
        if (isMinimized) {
          this.restoreMinimizedWindow(windowId);
        } else {
          this.focusWindow(windowId);
        }
      };

      // Add active state for currently focused window (not minimized)
      if (!isMinimized && window.style.zIndex == this.zIndexCounter) {
        taskbarItem.classList.add("active");
      }

      taskbarWindows.appendChild(taskbarItem);
    });
  }

  focusWindow(windowId) {
    const window = document.getElementById(windowId);
    const isMinimized = window.dataset.isMinimized === "true";

    if (isMinimized) {
      // If window is minimized, restore it
      this.restoreMinimizedWindow(windowId);
    } else {
      // If window is not minimized, just bring to front
      window.style.zIndex = ++this.zIndexCounter;
      this.addFocusEffect(window);
      this.updateTaskbar();
    }
  }

  handleKeyboardShortcuts(e) {
    // Windows key + D (show desktop)
    if (e.metaKey && e.key === "d") {
      e.preventDefault();
      this.minimizeAllWindows();
    }

    // Alt + Tab (window switching)
    if (e.altKey && e.key === "Tab") {
      e.preventDefault();
      this.switchToNextWindow();
    }

    // Alt + F4 (close window)
    if (e.altKey && e.key === "F4") {
      e.preventDefault();
      if (this.activeWindows.length > 0) {
        const lastWindow = this.activeWindows[this.activeWindows.length - 1];
        this.closeWindow(lastWindow);
      }
    }

    // Windows key (toggle start menu)
    if (e.key === "Meta") {
      e.preventDefault();
      this.toggleStartMenu();
    }
  }

  minimizeAllWindows() {
    document.querySelectorAll(".window.active").forEach((window) => {
      window.style.animation = "windowMinimize 0.3s ease-out forwards";
      setTimeout(() => {
        window.style.animation = "";
        window.style.transform = "scale(0.1)";
        window.style.opacity = "0";
      }, 300);
    });

    // Restore after 2 seconds
    setTimeout(() => {
      document.querySelectorAll(".window.active").forEach((window) => {
        window.style.transform = "";
        window.style.opacity = "";
      });
    }, 2000);
  }

  switchToNextWindow() {
    if (this.activeWindows.length <= 1) return;

    const currentIndex = this.activeWindows.findIndex((id) => {
      const window = document.getElementById(id);
      return window.style.zIndex == this.zIndexCounter;
    });

    const nextIndex = (currentIndex + 1) % this.activeWindows.length;
    const nextWindowId = this.activeWindows[nextIndex];

    this.focusWindow(nextWindowId);
  }

  addWindows11Animations() {
    // Add CSS animations for Windows 11 effects
    const style = document.createElement("style");
    style.textContent = `
        @keyframes windowClose {
            to {
                opacity: 0;
                transform: scale(0.9) translateY(20px);
            }
        }
        
        @keyframes windowMinimize {
            to {
                opacity: 0;
                transform: scale(0.1) translateY(100vh);
            }
        }
        
        @keyframes windowRestore {
            from {
                opacity: 0;
                transform: scale(0.1) translateY(100vh);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .snap-zones {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
        }
        
        .snap-zone {
            position: absolute;
            background: rgba(0, 120, 212, 0.3);
            border: 2px solid rgba(0, 120, 212, 0.6);
            border-radius: 8px;
            pointer-events: none;
        }
        
        .snap-zone.left {
            left: 0;
            top: 0;
            width: 50vw;
            height: calc(100vh - 56px);
        }
        
        .snap-zone.right {
            right: 0;
            top: 0;
            width: 50vw;
            height: calc(100vh - 56px);
        }
        
        .snap-zone.top {
            left: 0;
            top: 0;
            width: 100vw;
            height: calc(100vh - 56px);
        }
        
        .window.focused {
            transition: box-shadow 0.3s ease;
        }
        
        .taskbar-window {
            position: relative;
            overflow: hidden;
        }
        
        .taskbar-window::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: #0078d4;
            transform: scaleX(0);
            transition: transform 0.2s ease;
        }
        
        .taskbar-window.active::before {
            transform: scaleX(1);
        }
        
        .taskbar-window.minimized {
            opacity: 0.6;
            font-style: italic;
        }
        
        .taskbar-window.minimized::before {
            background: #1E9BE4;
            transform: scaleX(1);
        }
        
        .start-menu {
            position: fixed;
            bottom: 64px;
            left: 50%;
            transform: translateX(-50%);
            width: 600px;
            height: 740px;
            background: rgba(32, 32, 32, 0.98);
            backdrop-filter: blur(40px) saturate(150%);
            border-radius: 12px;
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
            display: none;
            z-index: 9998;
            overflow: hidden;
        }
        
        .start-menu.active {
            display: block;
            animation: startMenuOpen 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .start-menu-container {
            height: 100%;
            display: flex;
            flex-direction: column;
            color: #ffffff;
        }
        
        /* Search Section */
        .start-search-section {
            padding: 24px 24px 16px 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        
        .start-search-container {
            position: relative;
            margin-bottom: 16px;
        }
        
        .start-search-input {
            width: 100%;
            height: 44px;
            padding: 0 16px 0 44px;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 6px;
            color: #ffffff;
            font-size: 14px;
            font-family: 'Segoe UI', sans-serif;
            outline: none;
            transition: all 0.2s ease;
        }
        
        .start-search-input::placeholder {
            color: rgba(255, 255, 255, 0.54);
        }
        
        .start-search-input:focus {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(96, 205, 255, 0.8);
            box-shadow: 0 0 0 1px rgba(96, 205, 255, 0.4);
        }
        
        .search-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: rgba(255, 255, 255, 0.54);
            font-size: 16px;
            pointer-events: none;
        }
        
        .search-suggestions {
            margin-top: 8px;
        }
        
        .suggestions-text {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.54);
            margin-bottom: 8px;
        }
        
        .suggestion-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }
        
        .suggestion-tag {
            padding: 4px 12px;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            color: rgba(255, 255, 255, 0.8);
            font-size: 12px;
            cursor: pointer;
            transition: all 0.15s ease;
            font-family: 'Segoe UI', sans-serif;
        }
        
        .suggestion-tag:hover {
            background: rgba(255, 255, 255, 0.12);
            border-color: rgba(255, 255, 255, 0.16);
        }
        
        /* Pinned Section */
        .start-pinned-section {
            padding: 20px 24px;
        }
        
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            border: none;
            background: none;
            border-bottom: none;
            padding-bottom: 0;
        }
        
        .section-title {
            font-size: 12px;
            font-weight: 600;
            margin: 0;
            color: #ffffff;
            font-family: 'Segoe UI', sans-serif;
            border: none;
            background: none;
            border-bottom: none;
            padding-bottom: 0;
        }
        
        .pinned-apps-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 12px;
        }
        
        .pinned-app {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8px 8px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.15s ease;
            position: relative;
        }
        
       
        
        .app-icon {
            width: 48px;
            height: 48px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .app-icon img {
            width: 32px;
            height: 32px;
            object-fit: contain;
        }
        
        .app-label {
            font-size: 12px;
            color: #ffffff;
            text-align: center;
            font-family: 'Segoe UI', sans-serif;
            line-height: 1.2;
        }
        
        /* Recommended Section */
        .start-recommended-section {
            padding: 20px 24px;
            flex: 1;
            overflow-y: auto;
        }
        
        .recommended-items {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        
        .recommended-item {
            display: flex;
            align-items: center;
            padding: 8px 8px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.15s ease;
            gap: 12px;
        }
        
        .recommended-item:hover {
            background: rgba(255, 255, 255, 0.06);
        }
        
        .recommended-icon {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .recommended-icon img {
            width: 24px;
            height: 24px;
            object-fit: contain;
        }
        
        .recommended-content {
            flex: 1;
            min-width: 0;
        }
        
        .recommended-title {
            font-size: 14px;
            color: #ffffff;
            font-weight: 400;
            margin-bottom: 2px;
            font-family: 'Segoe UI', sans-serif;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .recommended-subtitle {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.54);
            font-family: 'Segoe UI', sans-serif;
        }
        
        .recommended-time {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.54);
            font-family: 'Segoe UI', sans-serif;
            flex-shrink: 0;
        }
        
        /* Account Section */
        .start-account-section {
            padding: 16px 24px;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .account-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .account-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .account-name {
            font-size: 14px;
            color: #ffffff;
            font-weight: 600;
            font-family: 'Segoe UI', sans-serif;
        }
        
        .account-actions {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .power-button {
            width: 32px;
            height: 32px;
            background: none;
            border: none;
            border-radius: 6px;
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
            transition: all 0.15s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .power-button:hover {
            background: rgba(255, 255, 255, 0.06);
            color: #ffffff;
        }
        
        /* Search Results */
        .search-results-container {
            margin-top: 12px;
            display: none;
            max-height: 300px;
            overflow-y: auto;
        }
        
        .search-results-container[style*="block"] {
            display: block !important;
        }
        
        /* Search input styling */
        #startMenuSearch {
            transition: all 0.3s ease;
        }
        
        #startMenuSearch:focus {
            outline: none;
            border-color: rgba(0, 120, 212, 0.6) !important;
            box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.2) !important;
            background: rgba(255, 255, 255, 0.15) !important;
        }
        
        /* Search results styling */
        .search-result-item {
            animation: searchResultFadeIn 0.3s ease-out;
        }
        
        @keyframes searchResultFadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Custom scrollbar for search results */
        #searchResults > div:first-child {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }
        
        #searchResults > div:first-child::-webkit-scrollbar {
            width: 6px;
        }
        
        #searchResults > div:first-child::-webkit-scrollbar-track {
            background: transparent;
        }
        
        #searchResults > div:first-child::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 3px;
        }
        
        #searchResults > div:first-child::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
        }
        
        @keyframes startMenuOpen {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
  }



































































  minimizeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (!window) return;

    // Mark as minimized but keep in activeWindows
    window.dataset.isMinimized = "true";

    // Animate minimize
    window.style.animation = "windowMinimize 0.3s ease-out forwards";

    setTimeout(() => {
      window.classList.remove("active");
      window.style.animation = "";
      window.style.transform = "scale(0.1)";
      window.style.opacity = "0";
      window.style.pointerEvents = "none";

      // Keep window in activeWindows array but mark as minimized
      // This way it stays in the taskbar for restoration
      this.updateTaskbar();
    }, 300);
  }

  maximizeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (!window) return;

    if (window.classList.contains("maximized")) {
      // Restore window
      this.restoreWindow(windowId);
    } else {
      // Maximize window
      this.doMaximizeWindow(windowId);
    }
  }

  doMaximizeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (!window) return;

    // Only store original dimensions if not already stored
    if (!window.dataset.originalWidth) {
      window.dataset.originalWidth = window.style.width || "600px";
      window.dataset.originalHeight = window.style.height || "400px";
      window.dataset.originalLeft = window.style.left || "100px";
      window.dataset.originalTop = window.style.top || "100px";
    }

    // Maximize
    window.classList.add("maximized");
    window.style.width = "100vw";
    window.style.height = "calc(100vh - 56px)";
    window.style.left = "0px";
    window.style.top = "0px";
    window.style.borderRadius = "0px";

    // Update maximize button symbol
    const maximizeBtn = window.querySelector(".window-control.maximize");
    if (maximizeBtn) {
      maximizeBtn.innerHTML = "\u25A3";
      maximizeBtn.title = "Restore";
    }
  }

  restoreWindow(windowId) {
    const window = document.getElementById(windowId);
    if (!window) return;

    // Restore original dimensions
    window.classList.remove("maximized");
    window.style.width = window.dataset.originalWidth || "600px";
    window.style.height = window.dataset.originalHeight || "400px";
    window.style.left = window.dataset.originalLeft || "100px";
    window.style.top = window.dataset.originalTop || "100px";
    window.style.borderRadius = "0px";

    // Update maximize button symbol
    const maximizeBtn = window.querySelector(".window-control.maximize");
    if (maximizeBtn) {
      maximizeBtn.innerHTML = "\u25A1"; // Maximize symbol
      maximizeBtn.title = "Maximize";
    }
  }

  restoreMinimizedWindow(windowId) {
    const window = document.getElementById(windowId);
    if (!window) return;

    // Remove minimized state
    delete window.dataset.isMinimized;

    // Show the window with restore animation
    window.style.display = "block";
    window.classList.add("active");
    window.style.animation = "windowRestore 0.3s ease-out";

    // Reset styles after animation
    setTimeout(() => {
      window.style.animation = "";
      window.style.transform = "";
      window.style.opacity = "";
      window.style.pointerEvents = "";
    }, 300);

    // Bring to front
    window.style.zIndex = ++this.zIndexCounter;
    this.addFocusEffect(window);
    this.updateTaskbar();
  }

  startClockUpdate() {
    setInterval(() => this.updateClock(), 1000);
  }
}

