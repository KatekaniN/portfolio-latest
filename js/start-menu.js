// start-menu.js — Start menu and search (augments Windows11Manager.prototype)

Windows11Manager.prototype.toggleStartMenu = function () {
    this.isStartMenuOpen = !this.isStartMenuOpen;

    if (this.isStartMenuOpen) {
      this.showStartMenu();
    } else {
      this.closeStartMenu();
    }
  };

Windows11Manager.prototype.showStartMenu = function () {
    let startMenu = document.getElementById("startMenu");
    if (!startMenu) {
      startMenu = this.createStartMenu();
    }

    startMenu.classList.add("active");
    this.isStartMenuOpen = true;
  };

Windows11Manager.prototype.closeStartMenu = function () {
    const startMenu = document.getElementById("startMenu");
    if (startMenu) {
      startMenu.classList.remove("active");
    }
    this.isStartMenuOpen = false;
  };

Windows11Manager.prototype.createStartMenu = function () {
    const startMenu = document.createElement("div");
    startMenu.id = "startMenu";
    startMenu.className = "start-menu";
    startMenu.innerHTML = `
        <div class="start-menu-container">
            <!-- Search Section -->
            <div class="start-search-section">
                <div class="start-search-container">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" 
                           id="startMenuSearch" 
                           placeholder="Search for apps, settings, and documents" 
                           class="start-search-input"
                           autocomplete="off">
                </div>
                <div id="searchResults" class="search-results-container"></div>
                <div id="searchSuggestions" class="search-suggestions">
                    <div class="suggestions-text">Try searching for:</div>
                    <div class="suggestion-tags">
                        <button onclick="document.getElementById('startMenuSearch').value='hackathon'; windowManager.performSearch('hackathon');" class="suggestion-tag">hackathon</button>
                        <button onclick="document.getElementById('startMenuSearch').value='React'; windowManager.performSearch('React');" class="suggestion-tag">React</button>
                        <button onclick="document.getElementById('startMenuSearch').value='Node'; windowManager.performSearch('Node');" class="suggestion-tag">Node</button>
                        <button onclick="document.getElementById('startMenuSearch').value='JavaScript'; windowManager.performSearch('JavaScript');" class="suggestion-tag">JavaScript</button>
                        <button onclick="document.getElementById('startMenuSearch').value='resume'; windowManager.performSearch('developer');" class="suggestion-tag">developer</button>
                    </div>
                </div>
            </div>

            <!-- Pinned Section -->
            <div class="start-pinned-section">
                <div class="section-header">
                    <h3 class="section-title">Pinned</h3>
                </div>
                <div class="pinned-apps-grid">
                    ${this.createPinnedApps()}
                </div>
            </div>

            <!-- Recommended Section -->
            <div class="start-recommended-section">
                <div class="section-header">
                    <h3 class="section-title">Recommended</h3>
                </div>
                <div class="recommended-items">
                    ${this.createWindowsRecommendedItems()}
                </div>
            </div>

            <!-- Account Section -->
            <div class="start-account-section">
                <div class="account-info">
                    <img src="./icons/avatar.jpg" class="account-avatar" alt="User">
                    <span class="account-name">Katekani Nyamandi</span>
                </div>
                <div class="account-actions">
                    <button class="power-button theme-toggle-button" title="Toggle light/dark theme" aria-label="Toggle light/dark theme" onclick="event.stopPropagation(); windowManager.toggleTheme()">
                        <i class="fas ${document.documentElement.getAttribute("data-theme") === "dark" ? "fa-sun" : "fa-moon"}"></i>
                    </button>
                    <button class="power-button" title="Power" aria-label="Power" onclick="event.stopPropagation(); windowManager.togglePowerMenu()">
                        <i class="fas fa-power-off"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(startMenu);

    // Close start menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!startMenu.contains(e.target) && !e.target.closest(".start-button")) {
        this.closeStartMenu();
      }
    });

    // Set up search functionality
    this.setupStartMenuSearch();

    return startMenu;
  };

Windows11Manager.prototype.createPinnedApps = function () {
    const apps = [
      { icon: "home", label: "About", window: "about" },
      {
        icon: "terminal",
        label: "Projects",
        action: "window.open('https://github.com/KatekaniN', '_blank')",
      },
      { icon: "settings", label: "Skills", window: "skills" },
      { icon: "email", label: "Contact", window: "contact" },
      {
        icon: "name-tag/icons8-name-tag-96",
        label: "Personal",
        window: "personal",
      },
      { icon: "folder", label: "Resume", window: "resume" },
      {
        icon: "fun-room",
        label: "Games",
        window: "games",
        isFontAwesome: true,
        faIcon: "fa-gamepad",
      },
      {
        icon: "terminal",
        label: "Terminal",
        window: "terminal",
        isFontAwesome: true,
        faIcon: "fa-terminal",
      },
    ];

    return apps
      .map((app) => {
        const clickAction = app.action
          ? `${app.action}; windowManager.closeStartMenu();`
          : `windowManager.openWindow('${app.window}'); windowManager.closeStartMenu();`;

        const iconHtml = app.isFontAwesome
          ? `<i class="fa-solid ${app.faIcon || "fa-gamepad"}" style="color: #2C7EBD; font-size: 24px;"></i>`
          : `<img src="./icons/${app.icon}.png" alt="${app.label}">`;

        return `
        <div class="pinned-app" onclick="${clickAction}">
            <div class="app-icon">
                ${iconHtml}
            </div>
            <span class="app-label">${app.label}</span>
        </div>
    `;
      })
      .join("");
  };

Windows11Manager.prototype.createWindowsRecommendedItems = function () {
    const items = [
      {
        icon: "folder",
        title: "katekani nyamandi resume",
        subtitle: "You edited",
        time: "Recently",
        action: "downloadResume",
      },
      {
        icon: "terminal",
        title: "GitHub Projects",
        subtitle: "Recently accessed",
        time: "Today",
        action: "window.open('https://github.com/KatekaniN', '_blank')",
      },
      {
        icon: "email",
        title: "Contact Information",
        subtitle: "You viewed",
        time: "Yesterday",
        action: "openWindow('contact')",
      },
    ];

    return items
      .map(
        (item) => `
        <div class="recommended-item" onclick="windowManager.handleRecommendedAction(\`${item.action}\`)">
            <div class="recommended-icon">
                <img src="./icons/${item.icon}.png" alt="${item.title}">
            </div>
            <div class="recommended-content">
                <div class="recommended-title">${item.title}</div>
                <div class="recommended-subtitle">${item.subtitle}</div>
            </div>
            <div class="recommended-time">${item.time}</div>
        </div>
    `
      )
      .join("");
  };

Windows11Manager.prototype.handleRecommendedAction = function (action) {
    // Close the start menu first
    this.closeStartMenu();

    if (action === "downloadResume") {
      // Trigger resume download
      const link = document.createElement("a");
      link.href = "./katekani%20nyamandi%20resume.pdf";
      link.download = "Katekani_Nyamandi_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show notification
      setTimeout(() => {
        personalFeatures.showNotification(
          "Resume Downloaded!",
          "Katekani's resume has been downloaded to your device.",
          "fas fa-download"
        );
      }, 500);
    } else if (action.includes("github.com")) {
      // Handle GitHub link specifically
      window.open("https://github.com/KatekaniN", "_blank");
    } else if (action.startsWith("window.open(")) {
      // Handle other external links
      try {
        // Extract URL from window.open call
        const urlMatch = action.match(/window\.open\(['"`]([^'"`]+)['"`]/);
        if (urlMatch) {
          window.open(urlMatch[1], "_blank");
        }
      } catch (error) {
        console.error("Error opening external link:", error);
      }
    } else if (action.startsWith("openWindow(")) {
      // Extract window ID from the action string
      const windowId = action.match(/openWindow\(['"`]([^'"`]+)['"`]\)/)[1];
      setTimeout(() => {
        this.openWindow(windowId);
      }, 200);
    } else {
      // Unknown action - silently ignore
    }
  };

Windows11Manager.prototype.setupStartMenuSearch = function () {
    const searchInput = document.getElementById("startMenuSearch");
    const searchResults = document.getElementById("searchResults");
    const searchSuggestions = document.getElementById("searchSuggestions");

    if (!searchInput || !searchResults) return;

    let searchTimeout;
    let selectedResultIndex = -1;

    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      selectedResultIndex = -1; // Reset selection

      if (query.length === 0) {
        searchResults.style.display = "none";
        searchResults.innerHTML = "";
        if (searchSuggestions) searchSuggestions.style.display = "block";
        return;
      }

      // Hide suggestions when searching
      if (searchSuggestions) searchSuggestions.style.display = "none";

      // Debounce search to avoid too many searches
      searchTimeout = setTimeout(() => {
        this.performSearch(query);
      }, 300);
    });

    searchInput.addEventListener("keydown", (e) => {
      const resultItems = searchResults.querySelectorAll(".search-result-item");

      if (e.key === "Escape") {
        searchInput.value = "";
        searchResults.style.display = "none";
        searchResults.innerHTML = "";
        if (searchSuggestions) searchSuggestions.style.display = "block";
        selectedResultIndex = -1;
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (resultItems.length > 0) {
          selectedResultIndex = Math.min(
            selectedResultIndex + 1,
            resultItems.length - 1
          );
          this.updateResultSelection(resultItems, selectedResultIndex);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (resultItems.length > 0) {
          selectedResultIndex = Math.max(selectedResultIndex - 1, -1);
          this.updateResultSelection(resultItems, selectedResultIndex);
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedResultIndex >= 0 && resultItems[selectedResultIndex]) {
          resultItems[selectedResultIndex].click();
        } else if (resultItems.length > 0) {
          resultItems[0].click(); // Open first result if none selected
        }
      }
    });

    // Auto-focus search when start menu opens
    setTimeout(() => {
      if (document.getElementById("startMenu")?.classList.contains("active")) {
        searchInput.focus();
      }
    }, 150);
  };

Windows11Manager.prototype.updateResultSelection = function (resultItems, selectedIndex) {
    resultItems.forEach((item, index) => {
      if (index === selectedIndex) {
        item.style.background = "rgba(0, 120, 212, 0.3)";
        item.style.transform = "translateX(4px)";
        item.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        item.style.background = "rgba(255,255,255,0.05)";
        item.style.transform = "translateX(0px)";
      }
    });
  };

Windows11Manager.prototype.performSearch = function (query) {
    const searchResults = document.getElementById("searchResults");
    if (!searchResults) return;

    const results = this.searchWindowContent(query);
    this.displaySearchResults(results, query);
  };

Windows11Manager.prototype.searchWindowContent = function (query) {
    const results = [];
    const queryLower = query.toLowerCase();

    // Define windows to search through
    const windowsToSearch = [
      {
        id: "about",
        title: "About Me",
        icon: "fas fa-user",
      },
      {
        id: "projects",
        title: "Projects",
        icon: "fas fa-code",
      },
      {
        id: "skills",
        title: "Skills",
        icon: "fas fa-tools",
      },
      {
        id: "contact",
        title: "Contact",
        icon: "fas fa-envelope",
      },
      {
        id: "personal",
        title: "My Journey",
        icon: "fas fa-route",
      },
      {
        id: "resume",
        title: "Resume",
        icon: "fas fa-file-alt",
      },
      {
        id: "games",
        title: "Games",
        icon: "fas fa-gamepad",
      },
    ];

    windowsToSearch.forEach((windowInfo) => {
      const windowElement = document.getElementById(windowInfo.id);
      if (!windowElement) return;

      const windowContent = windowElement.querySelector(".window-content");
      if (!windowContent) return;

      const textContent =
        windowContent.textContent || windowContent.innerText || "";
      const htmlContent = windowContent.innerHTML;

      // Search in text content
      if (textContent.toLowerCase().includes(queryLower)) {
        // Find the specific context where the match occurs
        const matches = this.findContextMatches(textContent, queryLower);

        if (matches.length > 0) {
          results.push({
            windowId: windowInfo.id,
            title: windowInfo.title,
            icon: windowInfo.icon,
            matches: matches,
            score: this.calculateRelevanceScore(
              textContent,
              queryLower,
              windowInfo.title
            ),
          });
        }
      }
    });

    // Sort results by relevance score (higher is better)
    results.sort((a, b) => b.score - a.score);

    return results;
  };

Windows11Manager.prototype.findContextMatches = function (text, query) {
    const matches = [];
    const textLower = text.toLowerCase();
    const contextLength = 80; // Characters before and after match

    let searchIndex = 0;
    const maxMatches = 3; // Limit to prevent too many results

    while (searchIndex < textLower.length && matches.length < maxMatches) {
      const matchIndex = textLower.indexOf(query, searchIndex);
      if (matchIndex === -1) break;

      // Get context around the match
      const startContext = Math.max(0, matchIndex - contextLength);
      const endContext = Math.min(
        text.length,
        matchIndex + query.length + contextLength
      );

      let context = text.substring(startContext, endContext);

      // Add ellipsis if we truncated
      if (startContext > 0) context = "..." + context;
      if (endContext < text.length) context = context + "...";

      // Highlight the match
      const matchStart = matchIndex - startContext + (startContext > 0 ? 3 : 0);
      const matchEnd = matchStart + query.length;

      matches.push({
        context: context,
        matchStart: matchStart,
        matchEnd: matchEnd,
        originalMatch: text.substring(matchIndex, matchIndex + query.length),
      });

      searchIndex = matchIndex + query.length;
    }

    return matches;
  };

Windows11Manager.prototype.calculateRelevanceScore = function (content, query, title) {
    let score = 0;
    const contentLower = content.toLowerCase();
    const titleLower = title.toLowerCase();
    const queryLower = query.toLowerCase();

    // Title matches are more important
    if (titleLower.includes(queryLower)) {
      score += 100;
    }

    // Count occurrences in content
    const matches = (contentLower.match(new RegExp(queryLower, "g")) || [])
      .length;
    score += matches * 10;

    // Bonus for exact word matches
    const wordBoundaryRegex = new RegExp(`\\b${queryLower}\\b`, "gi");
    const exactMatches = (contentLower.match(wordBoundaryRegex) || []).length;
    score += exactMatches * 20;

    return score;
  };

Windows11Manager.prototype.displaySearchResults = function (results, query) {
    const searchResults = document.getElementById("searchResults");
    if (!searchResults) return;

    if (results.length === 0) {
      searchResults.style.display = "block";
      searchResults.innerHTML = `
        <div style="padding: 20px; text-align: center; color: rgba(255,255,255,0.54); font-size: 14px; font-family: 'Segoe UI', sans-serif;">
          <i class="fas fa-search" style="font-size: 32px; margin-bottom: 12px; display: block; opacity: 0.5;"></i>
          No results found for "${query}"
        </div>
      `;
      return;
    }

    searchResults.style.display = "block";
    searchResults.innerHTML = `
      <div style="max-height: 400px; overflow-y: auto;">
        <div style="padding: 12px 16px 8px; font-size: 12px; color: rgba(255,255,255,0.54); border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 4px; font-family: 'Segoe UI', sans-serif;">
          Found ${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"
        </div>
        ${results.map((result) => this.createWindowsSearchResultItem(result, query)).join("")}
      </div>
    `;
  };

Windows11Manager.prototype.createWindowsSearchResultItem = function (result, query) {
    const primaryMatch = result.matches[0];
    const highlightedContext = this.highlightMatch(
      primaryMatch.context,
      query,
      primaryMatch.matchStart,
      primaryMatch.matchEnd
    );

    return `
      <div class="search-result-item" 
           onclick="windowManager.openWindowFromSearch('${result.windowId}'); windowManager.closeStartMenu();"
           style="display: flex; align-items: center; padding: 12px 16px; border-radius: 6px; cursor: pointer; transition: all 0.15s ease; margin-bottom: 2px; gap: 12px;"
           onmouseover="this.style.background='rgba(255,255,255,0.06)'"
           onmouseout="this.style.background='transparent'">
        <div style="width: 32px; height: 32px; background: rgba(96, 205, 255, 0.1); border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <i class="${result.icon}" style="color: #60cdff; font-size: 16px;"></i>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-size: 14px; color: #ffffff; font-weight: 400; margin-bottom: 2px; font-family: 'Segoe UI', sans-serif;">
            ${result.title}
          </div>
          <div style="font-size: 12px; line-height: 1.4; color: rgba(255,255,255,0.7); font-family: 'Segoe UI', sans-serif; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${highlightedContext}
          </div>
          ${
            result.matches.length > 1
              ? `
            <div style="font-size: 11px; color: rgba(255,255,255,0.54); margin-top: 4px; font-family: 'Segoe UI', sans-serif;">
              +${result.matches.length - 1} more match${result.matches.length - 1 !== 1 ? "es" : ""}
            </div>
          `
              : ""
          }
        </div>
        <div style="color: rgba(255,255,255,0.3); flex-shrink: 0;">
          <i class="fas fa-external-link-alt" style="font-size: 12px;"></i>
        </div>
      </div>
    `;
  };

Windows11Manager.prototype.highlightMatch = function (context, query, matchStart, matchEnd) {
    const before = context.substring(0, matchStart);
    const match = context.substring(matchStart, matchEnd);
    const after = context.substring(matchEnd);

    return `${this.escapeHtml(before)}<span style="background: rgba(96, 205, 255, 0.25); color: #60cdff; padding: 1px 3px; border-radius: 2px; font-weight: 600;">${this.escapeHtml(match)}</span>${this.escapeHtml(after)}`;
  };

Windows11Manager.prototype.escapeHtml = function (text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };

Windows11Manager.prototype.openWindowFromSearch = function (windowId) {
    // Close search results
    const searchInput = document.getElementById("startMenuSearch");
    const searchResults = document.getElementById("searchResults");
    const searchSuggestions = document.getElementById("searchSuggestions");

    if (searchInput) searchInput.value = "";
    if (searchResults) {
      searchResults.style.display = "none";
      searchResults.innerHTML = "";
    }
    if (searchSuggestions) searchSuggestions.style.display = "block";

    // Open the window
    this.openWindow(windowId);
  };

Windows11Manager.prototype.getWindowTitle = function (windowId) {
    const titles = {
      about: "About Me",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      personal: "My Journey",
      resume: "Resume",
      games: "Games",
    };
    return titles[windowId] || windowId;
  };
