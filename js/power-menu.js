// power-menu.js — Power menu, system actions, and theme (augments Windows11Manager.prototype)

Windows11Manager.prototype.showPowerOptions = function () {
    // Close any existing power menu first
    const existingMenu = document.getElementById("powerMenu");
    if (existingMenu) {
      existingMenu.remove();
    }

    // Create power options menu
    const powerMenu = document.createElement("div");
    powerMenu.id = "powerMenu";
    powerMenu.className = "power-menu";
    powerMenu.style.cssText = `
    position: fixed;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    background: rgba(32, 32, 32, 0.95);
    backdrop-filter: blur(40px);
    color: white;
    border-radius: 12px;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 10002;
    animation: powerMenuSlide 0.3s ease-out;
    overflow: hidden;
`;

    powerMenu.innerHTML = `
    <div style="padding: 20px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="fas fa-power-off" style="color: #0078d4; font-size: 20px;"></i>
                <h3 style="margin: 0; font-size: 16px;">Power Options</h3>
            </div>
            <button onclick="windowManager.closePowerMenu()" 
                    style="background: none; border: none; color: rgba(255,255,255,0.6); cursor: pointer; font-size: 18px; padding: 4px; border-radius: 4px; transition: color 0.2s;"
                    onmouseover="this.style.color='white'"
                    onmouseout="this.style.color='rgba(255,255,255,0.6)'">×</button>
        </div>
        
        <div class="power-options-grid">
            ${this.createPowerOption(
              "sleep",
              "fas fa-moon",
              "Sleep Mode",
              "Dim the lights and save your session",
              "#4a90e2"
            )}
            ${this.createPowerOption(
              "restart",
              "fas fa-redo-alt",
              "Restart",
              "Refresh the experience with new animations",
              "#FFB908"
            )}
            ${this.createPowerOption(
              "shutdown",
              "fas fa-power-off",
              "Shut Down",
              "Clean shutdown with farewell message",
              ""
            )}
            ${this.createPowerOption(
              "hibernate",
              "fas fa-pause-circle",
              "Hibernate",
              "Freeze current state and minimize all",
              "#938EDF"
            )}
            ${this.createPowerOption(
              "maintenance",
              "fas fa-tools",
              "Maintenance",
              "Clear cache and optimize performance",
              "#95a5a6"
            )}
            ${this.createPowerOption(
              "theme",
              "fas fa-circle-half-stroke",
              "Toggle Theme",
              "Switch between light and dark mode",
              "#0078d4"
            )}
        </div>
        
        <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 12px; opacity: 0.7; text-align: center;">
            <i class="fas fa-info-circle"></i> Portfolio will remember your session
        </div>
    </div>
`;

    document.body.appendChild(powerMenu);

    // Prevent immediate closing by stopping event propagation
    powerMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Set up click-outside-to-close with a delay
    setTimeout(() => {
      const closeHandler = (e) => {
        if (
          !powerMenu.contains(e.target) &&
          !e.target.closest(".start-button")
        ) {
          this.closePowerMenu();
          document.removeEventListener("click", closeHandler);
        }
      };
      document.addEventListener("click", closeHandler);
    }, 100);

    // Also close with Escape key
    const escapeHandler = (e) => {
      if (e.key === "Escape") {
        this.closePowerMenu();
        document.removeEventListener("keydown", escapeHandler);
      }
    };
    document.addEventListener("keydown", escapeHandler);
  };

// Add this method to toggle power menu (for the start menu button)
Windows11Manager.prototype.togglePowerMenu = function () {
    const existingMenu = document.getElementById("powerMenu");
    if (existingMenu) {
      this.closePowerMenu();
    } else {
      this.showPowerOptions();
    }
  };

// Create individual power option
Windows11Manager.prototype.createPowerOption = function (action, icon, title, description, color) {
    return `
    <div class="power-option" data-action="${action}" 
         style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; margin-bottom: 8px;"
         onmouseover="this.style.background='rgba(255,255,255,0.05)'"
         onmouseout="this.style.background='transparent'"
         onclick="windowManager.executePowerAction('${action}');">
        <div style="width: 40px; height: 40px; background: ${color}; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
            <i class="${icon}" style="color: white; font-size: 18px;"></i>
        </div>
        <div style="flex: 1;">
            <div style="font-weight: 600; margin-bottom: 2px;">${title}</div>
            <div style="font-size: 12px; opacity: 0.8; line-height: 1.3;">${description}</div>
        </div>
    </div>
`;
  };

// Execute power actions
Windows11Manager.prototype.executePowerAction = function (action) {
    this.closePowerMenu();

    switch (action) {
      case "sleep":
        this.sleepMode();
        break;
      case "restart":
        this.restartSystem();
        break;
      case "shutdown":
        this.shutdownSystem();
        break;
      case "hibernate":
        this.hibernateSystem();
        break;
      case "demo":
        this.demoMode();
        break;
      case "maintenance":
        this.maintenanceMode();
        break;
      case "theme":
        this.toggleTheme();
        break;
    }
  };

// Toggle light/dark theme and persist the choice
Windows11Manager.prototype.toggleTheme = function () {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    const iconClass = next === "dark" ? "fas fa-sun" : "fas fa-moon";
    document
      .querySelectorAll(".theme-toggle-button i, #trayThemeToggle i")
      .forEach((icon) => {
        icon.className = iconClass;
      });
    personalFeatures.showNotification(
      next === "dark" ? "Dark Mode" : "Light Mode",
      next === "dark"
        ? "Switched to the dark theme."
        : "Switched to the light theme.",
      next === "dark" ? "fas fa-moon" : "fas fa-sun"
    );
  };

// Get time-appropriate greeting
Windows11Manager.prototype.getTimeBasedGreeting = function () {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return {
        message: "Good morning!",
        description: "Portfolio is now awake and ready.",
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        message: "Good afternoon!",
        description: "Portfolio is back online.",
      };
    } else if (hour >= 17 && hour < 21) {
      return {
        message: "Good evening!",
        description: "Portfolio has resumed activity.",
      };
    } else {
      return {
        message: "Good night!",
        description: "Portfolio is active in night mode.",
      };
    }
  };

// Sleep Mode - Dim everything and show screensaver
Windows11Manager.prototype.sleepMode = function () {
    personalFeatures.showNotification(
      "Entering Sleep Mode",
      "Portfolio is going to sleep. Click anywhere to wake up.",
      "fas fa-moon"
    );

    // Dim the entire screen
    const sleepOverlay = document.createElement("div");
    sleepOverlay.id = "sleepOverlay";
    sleepOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    z-index: 15000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    animation: fadeIn 2s ease;
`;

    sleepOverlay.innerHTML = `
    <div style="text-align: center; color: white;">
        <div style="font-size: 48px; margin-bottom: 16px; animation: pulse 2s infinite;"><i class="fas fa-moon"></i></div>
        <div style="font-size: 24px; margin-bottom: 8px;">Sleep Mode</div>
        <div style="font-size: 14px; opacity: 0.7;">Click anywhere to wake up</div>
        <div id="sleepTime" style="font-size: 32px; margin-top: 20px; font-family: monospace;"></div>
    </div>
`;

    document.body.appendChild(sleepOverlay);

    // Show current time
    const updateSleepTime = () => {
      const timeElement = document.getElementById("sleepTime");
      if (timeElement) {
        timeElement.textContent = new Date().toLocaleTimeString();
      }
    };

    const sleepInterval = setInterval(updateSleepTime, 1000);
    updateSleepTime();

    // Wake up on click
    sleepOverlay.addEventListener("click", () => {
      clearInterval(sleepInterval);
      sleepOverlay.remove();
      const greeting = this.getTimeBasedGreeting();
      personalFeatures.showNotification(
        greeting.message,
        greeting.description,
        "fas fa-sun"
      );
    });
  };

// Restart - Reload with animation
Windows11Manager.prototype.restartSystem = function () {
    personalFeatures.showNotification(
      "Restarting...",
      "Portfolio will restart with fresh animations.",
      "fas fa-redo-alt"
    );

    // Create restart animation
    const restartOverlay = document.createElement("div");
    restartOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #0078d4;
    z-index: 20000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 1s ease;
`;

    restartOverlay.innerHTML = `
    <div style="text-align: center; color: white;">
        <div style="width: 60px; height: 60px; border: 4px solid rgba(255,255,255,0.3); border-top: 4px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
        <div style="font-size: 24px; margin-bottom: 8px;">Restarting</div>
        <div style="font-size: 14px; opacity: 0.8;">Please wait...</div>
    </div>
`;

    document.body.appendChild(restartOverlay);

    setTimeout(() => {
      location.reload();
    }, 3000);
  };

// Shutdown - Farewell message and blank screen
Windows11Manager.prototype.shutdownSystem = function () {
    personalFeatures.showNotification(
      "Shutting Down...",
      "Thanks for visiting! See you next time.",
      "fas fa-power-off"
    );

    const shutdownOverlay = document.createElement("div");
    shutdownOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #1e1e1e 0%, #2d2d30 50%, #1e1e1e 100%);
    z-index: 20000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 2s ease;
`;

    shutdownOverlay.innerHTML = `
    <div style="text-align: center; color: white; animation: fadeInUp 1s ease 2s both; max-width: 600px; padding: 40px;">
        <div style="margin-bottom: 30px;">
            <i class="fas fa-user-circle" style="font-size: 64px; color: #0078d4; margin-bottom: 20px;"></i>
        </div>
        
        <div style="font-size: 36px; margin-bottom: 20px; font-weight: 300;">Thanks for exploring my portfolio!</div>
        
        <div style="font-size: 18px; opacity: 0.8; margin-bottom: 30px; line-height: 1.6;">
            I hope you enjoyed discovering my projects, skills, and the interactive Windows 11 experience.<br>
            Feel free to connect with me for opportunities or collaborations.
        </div>
        

        
        <div style="margin-bottom: 30px;">
            <div style="font-size: 16px; margin-bottom: 15px; opacity: 0.9;">Connect with me:</div>
            <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px;">
                <a href="https://github.com/katekanin" target="_blank" style="color: white; text-decoration: none; opacity: 0.8; transition: opacity 0.3s;">
                    <i class="fab fa-github" style="font-size: 24px;"></i>
                </a>
                <a href="https://linkedin.com/in/katekanin" target="_blank" style="color: white; text-decoration: none; opacity: 0.8; transition: opacity 0.3s;">
                    <i class="fab fa-linkedin" style="font-size: 24px;"></i>
                </a>
                <a href="https://calendar.app.google/LnkWXbra3MUtCyQM9" target="_blank" style="color: white; text-decoration: none; opacity: 0.8; transition: opacity 0.3s;">
                    <i class="fas fa-calendar-alt" style="font-size: 24px;"></i>
                </a>
            </div>
        </div>
        
        <button onclick="location.reload()" 
                style="background: linear-gradient(135deg, #0078d4, #106ebe); color: white; border: none; padding: 15px 30px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 500; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0, 120, 212, 0.3);"
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0, 120, 212, 0.4)'"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0, 120, 212, 0.3)'">
            <i class="fas fa-power-off" style="margin-right: 8px;"></i>
            Power On Again
        </button>
        
        <div style="margin-top: 30px; font-size: 14px; opacity: 0.5;">
            <i class="fas fa-heart" style="margin-right: 5px; color: #ff6b6b;"></i>
            Made with love and JavaScript by Katekani Nyamandi
        </div>
    </div>
`;

    document.body.appendChild(shutdownOverlay);
  };

// Hibernate - Minimize all windows and show desktop
Windows11Manager.prototype.hibernateSystem = function () {
    personalFeatures.showNotification(
      "Hibernating...",
      "All windows minimized. State saved for later.",
      "fas fa-pause-circle"
    );

    // Store current window states
    const windowStates = this.activeWindows.map((windowId) => {
      const window = document.getElementById(windowId);
      return {
        id: windowId,
        left: window.style.left,
        top: window.style.top,
        width: window.style.width,
        height: window.style.height,
        zIndex: window.style.zIndex,
      };
    });

    localStorage.setItem("hibernatedWindows", JSON.stringify(windowStates));

    // Minimize all windows with animation
    document.querySelectorAll(".window.active").forEach((window, index) => {
      setTimeout(() => {
        window.style.animation = "windowMinimize 0.5s ease-out forwards";
        setTimeout(() => {
          window.classList.remove("active");
          window.style.animation = "";
        }, 500);
      }, index * 100);
    });

    this.activeWindows = [];
    this.updateTaskbar();

    // Add restore button to desktop
    setTimeout(() => {
      const restoreButton = document.createElement("button");
      restoreButton.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 120, 212, 0.9);
        color: white;
        border: none;
        padding: 16px 32px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: pulse 2s infinite;
    `;
      restoreButton.innerHTML = '<i class="fas fa-play"></i> Restore Session';
      restoreButton.onclick = () =>
        this.restoreHibernatedSession(restoreButton);

      document.body.appendChild(restoreButton);
    }, 1000);
  };

// Demo Mode - Auto showcase features
Windows11Manager.prototype.demoMode = function () {
    personalFeatures.showNotification(
      "Demo Mode Activated!",
      "Sit back and watch the automated showcase.",
      "fas fa-play-circle"
    );

    const demoSequence = [
      () => this.openWindow("about"),
      () => this.openWindow("projects"),
      () => this.openWindow("skills"),
      () => this.openWindow("contact"),
      () => this.openWindow("personal"),
      () => this.openWindow("resume"),
      () => this.showStartMenu(),
      () => this.closeStartMenu(),
      () => {
        // Close all windows
        [...this.activeWindows].forEach((windowId) => {
          this.closeWindow(windowId);
        });
      },
    ];

    demoSequence.forEach((action, index) => {
      setTimeout(action, (index + 1) * 2000);
    });

    // End demo
    setTimeout(
      () => {
        personalFeatures.showNotification(
          "Demo Complete!",
          "Feel free to explore on your own now.",
          "fas fa-check-circle"
        );
      },
      demoSequence.length * 2000 + 2000
    );
  };

// Maintenance Mode - Clear cache and optimize
Windows11Manager.prototype.maintenanceMode = function () {
    personalFeatures.showNotification(
      "Maintenance Mode",
      "Optimizing performance and clearing cache...",
      "fas fa-tools"
    );

    // Clear localStorage
    const keysToKeep = ["hibernatedWindows"];
    const allKeys = Object.keys(localStorage);
    allKeys.forEach((key) => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });

    // Close all windows
    [...this.activeWindows].forEach((windowId) => {
      this.closeWindow(windowId);
    });

    // Reset icon positions
    document.querySelectorAll(".desktop-icon").forEach((icon) => {
      icon.style.transform = "";
      icon.classList.remove("selected");
    });

    // Show maintenance progress
    const progressOverlay = document.createElement("div");
    progressOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    z-index: 15000;
    display: flex;
    align-items: center;
    justify-content: center;
`;

    progressOverlay.innerHTML = `
    <div style="text-align: center; color: white;">
        <div style="font-size: 48px; margin-bottom: 20px;"><i class="fas fa-tools"></i></div>
        <div style="font-size: 24px; margin-bottom: 20px;">Maintenance in Progress</div>
        <div style="width: 300px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; overflow: hidden;">
            <div id="maintenanceProgress" style="width: 0%; height: 100%; background: #0078d4; border-radius: 2px; transition: width 0.3s ease;"></div>
        </div>
        <div id="maintenanceStatus" style="margin-top: 12px; font-size: 14px; opacity: 0.8;">Starting maintenance...</div>
    </div>
`;

    document.body.appendChild(progressOverlay);

    const steps = [
      "Clearing temporary files...",
      "Optimizing animations...",
      "Refreshing components...",
      "Updating cache...",
      "Finalizing...",
    ];

    steps.forEach((step, index) => {
      setTimeout(
        () => {
          document.getElementById("maintenanceStatus").textContent = step;
          document.getElementById("maintenanceProgress").style.width = `${
            ((index + 1) / steps.length) * 100
          }%`;
        },
        (index + 1) * 800
      );
    });

    setTimeout(
      () => {
        progressOverlay.remove();
        personalFeatures.showNotification(
          "Maintenance Complete!",
          "Portfolio optimized and ready for peak performance.",
          "fas fa-check-circle"
        );
      },
      steps.length * 800 + 1000
    );
  };

// Close power menu
Windows11Manager.prototype.closePowerMenu = function () {
    const powerMenu = document.getElementById("powerMenu");
    if (powerMenu) {
      powerMenu.style.animation = "powerMenuSlide 0.3s ease-out reverse";
      setTimeout(() => powerMenu.remove(), 300);
    }
  };

// Restore hibernated session
Windows11Manager.prototype.restoreHibernatedSession = function (button) {
    const hibernatedWindows = JSON.parse(
      localStorage.getItem("hibernatedWindows") || "[]"
    );

    button.remove();

    hibernatedWindows.forEach((windowState, index) => {
      setTimeout(() => {
        this.openWindow(windowState.id);
        const window = document.getElementById(windowState.id);
        if (window) {
          window.style.left = windowState.left;
          window.style.top = windowState.top;
          window.style.width = windowState.width;
          window.style.height = windowState.height;
          window.style.zIndex = windowState.zIndex;
        }
      }, index * 200);
    });

    const greeting = this.getTimeBasedGreeting();
    personalFeatures.showNotification(
      greeting.message,
      "All your windows are back where you left them.",
      "fas fa-window-restore"
    );

    localStorage.removeItem("hibernatedWindows");
  };
