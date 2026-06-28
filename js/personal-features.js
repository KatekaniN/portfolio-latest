// Enhanced Personal Features for Windows 11
class Windows11PersonalFeatures {
  constructor() {
    this.init();
  }

  init() {
    this.addPersonalTouches();
    this.setupInteractiveElements();
    this.addNotificationSystem();
  }

  addPersonalTouches() {
    // Dynamic greeting based on time
    this.updateGreeting();

    // Add typing effect to tagline
    setTimeout(() => this.addTypingEffect(), 2000);

    // Add random tech facts to console
    this.addTechFacts();
  }

  updateGreeting() {
    // Disabled for professional portfolio design
    // Keep clean profile name instead of casual greeting
  }

  addTypingEffect() {
    const tagline = document.querySelector(".tagline");
    if (!tagline) return;

    const text = tagline.textContent;
    tagline.textContent = "";
    tagline.style.whiteSpace = "nowrap";
    tagline.style.setProperty(
      "font-family",
      "Segoe UI, sans-serif",
      "important"
    );
    tagline.style.overflow = "hidden";
    tagline.style.display = "inline-block";
    tagline.style.fontSize = "1.2em";
    tagline.style.fontWeight = "bold";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        setTimeout(() => {
          tagline.style.borderRight = "none";
        }, 1000);
      }
    };

    typeWriter();
  }

  addTechFacts() {
    const facts = [
      "Fun fact: The first computer bug was literally a bug - a moth found in a relay!",
      "Did you know: JavaScript was created in just 10 days by Brendan Eich!",
      "Cool: The term 'debugging' was coined by Grace Hopper in 1947!",
      "Amazing: There are over 700 programming languages in existence!",
      "Interesting: The first website ever created is still online: info.cern.ch",
      "Mind-blowing: Google processes over 8.5 billion searches per day!",
      "Wild: The average person checks their phone 96 times per day!",
    ];

    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    // Random fact display disabled for production
  }

  setupInteractiveElements() {
    // Enhanced hover effects for project cards
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px) scale(1.02)";
        card.style.boxShadow = "0 16px 48px rgba(0, 0, 0, 0.15)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.boxShadow = "";
      });
    });

    // Add ripple effect to buttons
    document
      .querySelectorAll(".project-link, .personal-link, .download-resume")
      .forEach((button) => {
        button.addEventListener("click", (e) => {
          this.createRipple(e);
        });
      });
  }

  createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;

    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  addNotificationSystem() {
    // Add CSS for notifications
    const style = document.createElement("style");
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .notification {
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: rgba(43, 43, 43, 0.95);
            backdrop-filter: blur(30px);
            color: white;
            padding: 0;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.08);
            z-index: 10000;
            width: 364px;
            animation: slideInNotification 0.3s ease-out;
            font-family: 'Segoe UI', system-ui, sans-serif;
        }
        
        @keyframes slideInNotification {
            from {
                opacity: 0;
                transform: translateY(100%);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .notification-header {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 16px 16px 8px 16px;
        }
        
        .notification-avatar {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .notification-content {
            flex: 1;
            min-width: 0;
        }
        
        .notification-sender {
            font-weight: 600;
            font-size: 15px;
            color: #ffffff;
            margin-bottom: 2px;
        }
        
        .notification-subject {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 4px;
        }
        
        .notification-body {
            font-size: 14px;
            color: #ffffff;
            line-height: 1.3;
            margin-bottom: 2px;
        }
        
        .notification-source {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
        }
        
        .notification-actions {
            display: flex;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.02);
            border-radius: 0 0 8px 8px;
        }
        
        .notification-action {
            flex: 1;
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.8);
            padding: 12px;
            cursor: pointer;
            font-size: 12px;
            font-family: 'Segoe UI', system-ui, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            transition: background-color 0.15s ease;
        }
        
        .notification-action:hover {
            background: rgba(255, 255, 255, 0.08);
        }
        
        .notification-action:not(:last-child) {
            border-right: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .notification-action i {
            font-size: 16px;
            margin-bottom: 2px;
        }

        /* Notification Center & Calendar */
        #notificationCenter {
            position: fixed;
            bottom: 70px;
            right: 20px;
            width: 400px;
            max-height: 80vh;
            background: rgba(43, 43, 43, 0.96);
            backdrop-filter: blur(30px);
            border-radius: 12px;
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.08);
            z-index: 10001;
            animation: slideInFromBottom 0.3s ease-out;
            font-family: 'Segoe UI', system-ui, sans-serif;
            color: white;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        @keyframes slideInFromBottom {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .notification-center {
            padding: 20px 20px 16px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            flex-shrink: 0;
        }

        .notification-center-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }

        .notification-center-header h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
        }

        .notification-actions {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        .notification-action-btn {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-family: 'Segoe UI', system-ui, sans-serif;
            transition: background-color 0.15s ease;
        }

        .notification-action-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
        }

        .notification-center-content {
            max-height: 250px;
            overflow-y: auto;
            flex-shrink: 1;
            padding: 0 20px;
            margin: 0 -20px;
        }

        .notification-center-content::-webkit-scrollbar {
            width: 8px;
        }

        .notification-center-content::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
        }

        .notification-center-content::-webkit-scrollbar-thumb {
            background: rgba(96, 165, 250, 0.3);
            border-radius: 4px;
        }

        .notification-center-content::-webkit-scrollbar-thumb:hover {
            background: rgba(96, 165, 250, 0.5);
        }

        .notification-center-item {
            display: flex;
            gap: 12px;
            padding: 12px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            position: relative;
        }

        .notification-center-item:last-child {
            border-bottom: none;
        }

        .notification-item-icon {
            flex-shrink: 0;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .notification-item-content {
            flex: 1;
            min-width: 0;
            cursor: pointer;
            padding-right: 30px;
        }

        .notification-dismiss-btn {
            position: absolute;
            top: 12px;
            right: 0;
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            transition: all 0.15s ease;
            opacity: 0;
        }

        .notification-center-item:hover .notification-dismiss-btn {
            opacity: 1;
        }

        .notification-center-item.read {
            opacity: 0.6;
        }

        .notification-center-item.read .notification-item-title,
        .notification-center-item.read .notification-item-subtitle {
            font-weight: normal;
        }

        .notification-dismiss-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #ff6b6b;
        }

        .notification-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2px;
        }

        .notification-item-title {
            font-weight: 600;
            font-size: 14px;
        }

        .notification-item-time {
            font-size: 12px;
            opacity: 0.7;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .notification-item-subtitle {
            font-size: 13px;
            opacity: 0.8;
            margin-bottom: 2px;
        }

        .notification-item-body {
            font-size: 13px;
            line-height: 1.3;
            margin-bottom: 4px;
        }

        .notification-item-source {
            font-size: 11px;
            opacity: 0.6;
            margin-bottom: 8px;
        }

        .notification-additional {
            font-size: 11px;
            opacity: 0.7;
            background: rgba(255, 255, 255, 0.08);
            padding: 2px 6px;
            border-radius: 3px;
        }

        .calendar-widget {
            padding: 16px 20px;
            flex-shrink: 0;
        }

        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }

        .calendar-nav-btn {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
            padding: 8px;
            border-radius: 6px;
            transition: background-color 0.15s ease;
        }

        .calendar-nav-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
        }

        .calendar-title {
            text-align: center;
        }

        .calendar-date {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 2px;
        }

        .calendar-month {
            font-size: 12px;
            opacity: 0.8;
        }

        .calendar-days-header {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 2px;
            margin-bottom: 8px;
        }

        .calendar-day-header {
            text-align: center;
            font-size: 11px;
            opacity: 0.6;
            padding: 4px;
        }

        .calendar-days {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 2px;
        }

        .calendar-day {
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.15s ease;
        }

        .calendar-day:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .calendar-day.today {
            background: #0078d4;
            color: white;
            font-weight: 600;
        }

        .calendar-day.selected {
            background: rgba(0, 120, 212, 0.3);
            color: white;
            border: 1px solid #0078d4;
        }

        .calendar-day.prev-month,
        .calendar-day.next-month {
            opacity: 0.3;
        }

        .no-notifications {
            text-align: center;
            padding: 40px 20px;
            opacity: 0.6;
        }

        .notification-center-item {
            cursor: pointer;
            transition: background-color 0.15s ease;
        }

        .notification-center-item:hover {
            background: rgba(255, 255, 255, 0.03);
        }
    `;
    document.head.appendChild(style);
  }

  showNotification(
    title,
    body,
    icon = "fas fa-info-circle",
    saveToHistory = true
  ) {
    // Add to notification history only if requested
    if (saveToHistory && windowManager) {
      windowManager.addToNotificationHistory(title, body, icon);
    }

    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `
        <div class="notification-header">
            <div class="notification-avatar">
                <i class="${icon}" style="color: rgba(255,255,255,0.9); font-size: 18px;"></i>
            </div>
            <div class="notification-content">
                <div class="notification-sender">Portfolio System</div>
                <div class="notification-subject">Re: ${title}</div>
                <div class="notification-body">${body}</div>
                <div class="notification-source">Portfolio • Notification</div>
            </div>
        </div>
        <div class="notification-actions">
            <button class="notification-action" onclick="this.closest('.notification').remove()">
                <i class="fas fa-flag"></i>
                Set flag
            </button>
            <button class="notification-action" onclick="this.closest('.notification').remove()">
                <i class="fas fa-archive"></i>
                Archive
            </button>
            <button class="notification-action" onclick="this.closest('.notification').remove()">
                <i class="fas fa-times"></i>
                Dismiss
            </button>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 6 seconds (longer for Windows-style notifications)
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation =
          "slideInNotification 0.3s ease-out reverse";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }
    }, 6000);
  }

  minimizeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (!window) return;

    // Mark as minimized but keep in activeWindows for taskbar
    window.dataset.isMinimized = "true";

    // Animate minimize to taskbar
    window.style.animation = "windowMinimize 0.3s ease-out forwards";

    setTimeout(() => {
      // Hide the window but keep it in DOM
      window.style.display = "none";
      window.style.animation = "";

      // Don't remove from activeWindows - keep it for taskbar
      // this.activeWindows = this.activeWindows.filter(id => id !== windowId); // Remove this line

      // Update taskbar to show minimized state
      this.updateTaskbar();
    }, 300);
  }

  maximizeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (!window) return;

    // Check if already maximized
    const isMaximized =
      window.style.width === "100vw" || window.classList.contains("maximized");

    if (isMaximized) {
      // Restore to original size
      window.style.left = "300px";
      window.style.top = "120px";
      window.style.width = "650px";
      window.style.height = "500px";
      window.classList.remove("maximized");
    } else {
      // Maximize
      window.style.left = "0px";
      window.style.top = "0px";
      window.style.width = "100vw";
      window.style.height = "calc(100vh - 56px)";
      window.classList.add("maximized");
    }

    // Add Windows 11 animation effect
    window.style.transition = "all 0.2s ease-out";
    setTimeout(() => {
      window.style.transition = "";
    }, 200);
  }
}

