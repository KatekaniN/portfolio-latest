// notifications.js — Notification center, calendar, and clock (augments Windows11Manager.prototype)

Windows11Manager.prototype.updateStartMenuTime = function () {
    const timeElement = document.getElementById("startMenuTime");
    const dateElement = document.getElementById("startMenuDate");

    if (timeElement && dateElement) {
      const now = new Date();
      timeElement.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      dateElement.textContent = now.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  };

Windows11Manager.prototype.updateClock = function () {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const dateString = now.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    const clockElement = document.getElementById("clock");
    if (clockElement) {
      clockElement.innerHTML = `
        <div style="font-size: 14px; font-weight: 600;">${timeString}</div>
        <div style="font-size: 12px; opacity: 0.8;">${dateString}</div>
      `;

      // Add click handler for notification center
      clockElement.onclick = () => this.toggleNotificationCenter();
      clockElement.style.cursor = "pointer";
    }
  };

Windows11Manager.prototype.toggleNotificationCenter = function () {
    const existingCenter = document.getElementById("notificationCenter");
    if (existingCenter) {
      existingCenter.remove();
      return;
    }

    this.createNotificationCenter();
  };

Windows11Manager.prototype.createNotificationCenter = function () {
    const now = new Date();
    this.currentCalendarDate = this.currentCalendarDate || new Date();

    const notificationCenter = document.createElement("div");
    notificationCenter.id = "notificationCenter";
    notificationCenter.innerHTML = `
      <div class="notification-center">
        <!-- Header -->
        <div class="notification-center-header">
          <h3>Notifications</h3>
          <div class="notification-actions">
            <button class="notification-action-btn" onclick="windowManager.clearAllNotifications()">
              Clear all
            </button>
          </div>
        </div>

        <!-- Notifications List -->
        <div class="notification-center-content" id="notificationCenterContent">
          ${this.renderNotificationHistory()}
        </div>
      </div>

      <!-- Calendar -->
      <div class="calendar-widget">
        <div class="calendar-header">
          <button class="calendar-nav-btn" onclick="windowManager.changeCalendarMonth(-1)">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="calendar-title">
            <div class="calendar-date">${this.currentCalendarDate.toLocaleDateString([], { weekday: "long", day: "numeric" })}</div>
            <div class="calendar-month">${this.currentCalendarDate.toLocaleDateString([], { month: "long", year: "numeric" })}</div>
          </div>
          <button class="calendar-nav-btn" onclick="windowManager.changeCalendarMonth(1)">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div class="calendar-grid" id="calendarGrid">
          ${this.createCalendarGrid()}
        </div>
      </div>
    `;

    document.body.appendChild(notificationCenter);

    // Close when clicking outside
    setTimeout(() => {
      document.addEventListener(
        "click",
        (e) => {
          if (
            !notificationCenter.contains(e.target) &&
            !document.getElementById("clock").contains(e.target)
          ) {
            notificationCenter.remove();
          }
        },
        { once: true }
      );
    }, 100);
  };

Windows11Manager.prototype.createCalendarGrid = function () {
    const now = new Date();
    const calendarDate = this.currentCalendarDate || now;
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const today = now.getDate();
    const isCurrentMonth =
      year === now.getFullYear() && month === now.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    let calendar = `
      <div class="calendar-days-header">
        ${daysOfWeek.map((day) => `<div class="calendar-day-header">${day}</div>`).join("")}
      </div>
      <div class="calendar-days">
    `;

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(
        year,
        month,
        0 - (startingDayOfWeek - 1 - i)
      ).getDate();
      const isSelected =
        this.selectedCalendarDate &&
        this.selectedCalendarDate.getFullYear() === year &&
        this.selectedCalendarDate.getMonth() === month - 1 &&
        this.selectedCalendarDate.getDate() === prevMonthDay;

      let dayClasses = "calendar-day prev-month";
      if (isSelected) dayClasses += " selected";

      calendar += `<div class="${dayClasses}" onclick="windowManager.selectCalendarDay(${year}, ${month - 1}, ${prevMonthDay})">${prevMonthDay}</div>`;
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today && isCurrentMonth;
      const isSelected =
        this.selectedCalendarDate &&
        this.selectedCalendarDate.getFullYear() === year &&
        this.selectedCalendarDate.getMonth() === month &&
        this.selectedCalendarDate.getDate() === day;

      let dayClasses = "calendar-day";
      if (isToday) dayClasses += " today";
      if (isSelected) dayClasses += " selected";

      calendar += `<div class="${dayClasses}" onclick="windowManager.selectCalendarDay(${year}, ${month}, ${day})">${day}</div>`;
    }

    // Add days from next month to fill the grid
    const totalCells = startingDayOfWeek + daysInMonth;
    const remainingCells = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
      const isSelected =
        this.selectedCalendarDate &&
        this.selectedCalendarDate.getFullYear() === year &&
        this.selectedCalendarDate.getMonth() === month + 1 &&
        this.selectedCalendarDate.getDate() === day;

      let dayClasses = "calendar-day next-month";
      if (isSelected) dayClasses += " selected";

      calendar += `<div class="${dayClasses}" onclick="windowManager.selectCalendarDay(${year}, ${month + 1}, ${day})">${day}</div>`;
    }

    calendar += "</div>";
    return calendar;
  };

Windows11Manager.prototype.changeCalendarMonth = function (direction) {
    if (!this.currentCalendarDate) {
      this.currentCalendarDate = new Date();
    }

    this.currentCalendarDate.setMonth(
      this.currentCalendarDate.getMonth() + direction
    );

    // Update the calendar display
    const calendarGrid = document.getElementById("calendarGrid");
    const calendarTitle = document.querySelector(".calendar-title");

    if (calendarGrid) {
      calendarGrid.innerHTML = this.createCalendarGrid();
    }

    if (calendarTitle) {
      calendarTitle.innerHTML = `
        <div class="calendar-date">${this.currentCalendarDate.toLocaleDateString([], { weekday: "long", day: "numeric" })}</div>
        <div class="calendar-month">${this.currentCalendarDate.toLocaleDateString([], { month: "long", year: "numeric" })}</div>
      `;
    }
  };

Windows11Manager.prototype.selectCalendarDay = function (year, month, day) {
    // Store the selected date
    this.selectedCalendarDate = new Date(year, month, day);

    // Re-render the notification center to update the calendar with the selected date
    const notificationCenter = document.getElementById("notificationCenter");
    if (notificationCenter) {
      const centerContent = notificationCenter.querySelector(
        ".notification-center-content"
      );
      if (centerContent) {
        centerContent.innerHTML = this.createNotificationCenter();
      }
    }
  };

Windows11Manager.prototype.clearAllNotifications = function () {
    if (this.notificationHistory.length === 0) {
      return; // No notifications to clear
    }

    this.notificationHistory = [];

    // Update the notification center if it's open
    const notificationContent = document.getElementById(
      "notificationCenterContent"
    );
    if (notificationContent) {
      notificationContent.innerHTML = this.renderNotificationHistory();
    }
  };

Windows11Manager.prototype.dismissNotification = function (notificationId) {
    // Convert to string for consistent comparison
    const targetId = notificationId.toString();

    // Add smooth animation before removing
    const notificationItem = document
      .querySelector(`[onclick*="${targetId}"]`)
      ?.closest(".notification-center-item");
    if (notificationItem) {
      notificationItem.style.transform = "translateX(100%)";
      notificationItem.style.opacity = "0";
      notificationItem.style.transition = "all 0.3s ease";

      setTimeout(() => {
        // Remove the specific notification from history
        this.notificationHistory = this.notificationHistory.filter(
          (notification) => notification.id.toString() !== targetId
        );

        // Update the notification center if it's open
        const notificationContent = document.getElementById(
          "notificationCenterContent"
        );
        if (notificationContent) {
          notificationContent.innerHTML = this.renderNotificationHistory();
        }
      }, 300);
    } else {
      // Fallback if animation element not found
      this.notificationHistory = this.notificationHistory.filter(
        (notification) => notification.id.toString() !== targetId
      );

      const notificationContent = document.getElementById(
        "notificationCenterContent"
      );
      if (notificationContent) {
        notificationContent.innerHTML = this.renderNotificationHistory();
      }
    }
  };

Windows11Manager.prototype.addToNotificationHistory = function (title, body, icon) {
    const notification = {
      id: Date.now(),
      title,
      body,
      icon,
      timestamp: new Date(),
      read: false,
    };

    this.notificationHistory.unshift(notification);

    // Keep only the last maxNotifications
    if (this.notificationHistory.length > this.maxNotifications) {
      this.notificationHistory = this.notificationHistory.slice(
        0,
        this.maxNotifications
      );
    }

    // Update notification center if it's open
    const notificationContent = document.getElementById(
      "notificationCenterContent"
    );
    if (notificationContent) {
      notificationContent.innerHTML = this.renderNotificationHistory();
    }
  };

Windows11Manager.prototype.renderNotificationHistory = function () {
    if (this.notificationHistory.length === 0) {
      return `
        <div class="no-notifications">
          <i class="fas fa-bell-slash" style="font-size: 32px; opacity: 0.3; margin-bottom: 8px;"></i>
          <div style="opacity: 0.6; font-size: 14px;">No notifications</div>
          <div style="opacity: 0.4; font-size: 12px;">You're all caught up!</div>
        </div>
      `;
    }

    return this.notificationHistory
      .map((notification) => {
        const timeAgo = this.getTimeAgo(notification.timestamp);
        const iconSrc = this.getNotificationIcon(notification.icon);
        const isRead = notification.read || false;

        return `
        <div class="notification-center-item ${isRead ? "read" : ""}">
          <div class="notification-item-icon">
            ${iconSrc}
          </div>
          <div class="notification-item-content" onclick="windowManager.markNotificationAsRead('${notification.id}')">
            <div class="notification-item-header">
              <span class="notification-item-title">Portfolio System</span>
              <span class="notification-item-time">${timeAgo} <i class="fas fa-chevron-down"></i></span>
            </div>
            <div class="notification-item-subtitle">Re: ${notification.title}</div>
            <div class="notification-item-body">${notification.body}</div>
            <div class="notification-item-source">Portfolio • Notification</div>
          </div>
          <button class="notification-dismiss-btn" onclick="event.stopPropagation(); windowManager.dismissNotification('${notification.id}')" title="Dismiss">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;
      })
      .join("");
  };

Windows11Manager.prototype.getNotificationIcon = function (iconClass) {
    // Map Font Awesome icons to appropriate images
    const iconMap = {
      "fas fa-download":
        '<img src="./icons/folder.png" alt="download" style="width: 24px; height: 24px;">',
      "fas fa-check":
        '<img src="./icons/settings.png" alt="success" style="width: 24px; height: 24px;">',
      "fas fa-calendar-check":
        '<img src="./icons/name-tag/icons8-name-tag-48.png" alt="calendar" style="width: 24px; height: 24px;">',
      "fas fa-info-circle":
        '<img src="./icons/kate.png" alt="info" style="width: 24px; height: 24px;">',
      "fas fa-search":
        '<img src="./icons/terminal.png" alt="search" style="width: 24px; height: 24px;">',
    };

    return (
      iconMap[iconClass] ||
      '<img src="./icons/folder.png" alt="notification" style="width: 24px; height: 24px;">'
    );
  };

Windows11Manager.prototype.getTimeAgo = function (timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

Windows11Manager.prototype.markNotificationAsRead = function (notificationId) {
    const notification = this.notificationHistory.find(
      (n) => n.id.toString() === notificationId
    );
    if (notification && !notification.read) {
      notification.read = true;

      // Update the notification center if it's open
      const notificationContent = document.getElementById(
        "notificationCenterContent"
      );
      if (notificationContent) {
        notificationContent.innerHTML = this.renderNotificationHistory();
      }
    }
  };
