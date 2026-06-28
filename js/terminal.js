/* Portfolio Terminal — a real interactive console that replaces the old chatbot.
 * Type `help` to list commands. Commands surface portfolio info and can open
 * other windows or switch the theme. No external dependencies beyond the global
 * `windowManager`. Instantiated once by bootstrap.js after DOMContentLoaded. */

class PortfolioTerminal {
  constructor() {
    this.outputEl = document.getElementById("terminalOutput");
    this.inputEl = document.getElementById("terminalInput");
    if (!this.outputEl || !this.inputEl) {
      return;
    }

    this.history = [];
    this.historyIndex = -1;
    this.commands = this.buildCommands();

    this.inputEl.addEventListener("keydown", (e) => this.handleKey(e));

    this.printBanner();
  }

  // ---- escaping ----------------------------------------------------------
  escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // ---- output ------------------------------------------------------------
  print(html, className) {
    const line = document.createElement("div");
    line.className = "terminal-line" + (className ? " " + className : "");
    line.innerHTML = html;
    this.outputEl.appendChild(line);
    this.scrollToBottom();
  }

  printLines(lines) {
    lines.forEach((entry) => {
      if (typeof entry === "string") {
        this.print(entry);
      } else {
        this.print(entry.text, entry.class);
      }
    });
  }

  spacer() {
    this.print("", "term-spacer");
  }

  scrollToBottom() {
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  // ---- banner ------------------------------------------------------------
  printBanner() {
    this.printLines([
      { text: "Katekani OS [Version 11.0]", class: "term-accent" },
      {
        text: "(c) Katekani Nyamandi. All rights reserved.",
        class: "term-muted",
      },
      { text: "", class: "term-spacer" },
      {
        text:
          'Type <span class="term-strong">help</span> to see available commands.',
        class: "term-muted",
      },
      { text: "", class: "term-spacer" },
    ]);
  }

  // ---- input handling ----------------------------------------------------
  handleKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.runLine(this.inputEl.value);
      this.inputEl.value = "";
      this.historyIndex = this.history.length;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.recallHistory(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      this.recallHistory(1);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      this.clear();
    }
  }

  recallHistory(direction) {
    if (!this.history.length) {
      return;
    }
    this.historyIndex = Math.min(
      Math.max(this.historyIndex + direction, 0),
      this.history.length
    );
    this.inputEl.value = this.history[this.historyIndex] || "";
    // Move caret to end.
    const len = this.inputEl.value.length;
    requestAnimationFrame(() => this.inputEl.setSelectionRange(len, len));
  }

  runLine(raw) {
    const input = raw.trim();
    // Echo the prompt + command.
    this.print(
      '<span class="term-prompt-echo">visitor@katekani:~$</span> ' +
        this.escapeHtml(raw),
      "terminal-echo"
    );

    if (!input) {
      return;
    }

    this.history.push(input);

    const [name, ...args] = input.split(/\s+/);
    const command = this.commands[name.toLowerCase()];
    if (command) {
      command.run(args);
    } else {
      this.print(
        "Command not found: " +
          this.escapeHtml(name) +
          '. Type <span class="term-strong">help</span> for a list of commands.',
        "term-error"
      );
    }
    this.spacer();
  }

  clear() {
    this.outputEl.innerHTML = "";
  }

  // ---- helpers -----------------------------------------------------------
  openWindow(id) {
    if (typeof windowManager !== "undefined" && windowManager.openWindow) {
      windowManager.openWindow(id);
      return true;
    }
    return false;
  }

  // ---- command table -----------------------------------------------------
  buildCommands() {
    const windows = {
      about: "About",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      personal: "Personal",
      resume: "Resume",
      games: "Games",
      terminal: "Terminal",
    };

    return {
      help: {
        desc: "List all available commands",
        run: () => {
          this.print("Available commands:", "term-strong");
          this.spacer();
          const order = [
            "about",
            "skills",
            "projects",
            "experience",
            "contact",
            "social",
            "resume",
            "open",
            "theme",
            "neofetch",
            "ls",
            "echo",
            "date",
            "whoami",
            "history",
            "clear",
            "help",
          ];
          order.forEach((key) => {
            const cmd = this.commands[key];
            if (!cmd) {
              return;
            }
            const label = key.padEnd(12, " ").replace(/ /g, "&nbsp;");
            this.print(
              '<span class="term-accent">' +
                label +
                "</span> " +
                cmd.desc,
              "term-muted"
            );
          });
        },
      },

      about: {
        desc: "Who is Katekani?",
        run: () => {
          this.printLines([
            { text: "Katekani Nyamandi", class: "term-strong" },
            { text: "Junior Full Stack Developer", class: "term-accent" },
            { text: "", class: "term-spacer" },
            "Former Mathematical Statistics student at the University of",
            "Pretoria who discovered coding and never looked back. Loves",
            "building things people can see and interact with.",
            { text: "", class: "term-spacer" },
            {
              text: 'Run <span class="term-strong">open about</span> for the full story.',
              class: "term-muted",
            },
          ]);
        },
      },

      skills: {
        desc: "Tech stack and tools",
        run: () => {
          this.printLines([
            { text: "Frontend", class: "term-strong" },
            "  React, Next.js, JavaScript, HTML, CSS",
            { text: "Backend", class: "term-strong" },
            "  Node.js, Express, REST & GraphQL APIs",
            { text: "Data", class: "term-strong" },
            "  PostgreSQL",
            { text: "Mobile", class: "term-strong" },
            "  React Native",
            { text: "Exploring", class: "term-strong" },
            "  Java, building & using LLMs (ChatGPT, Gemini Vision)",
            { text: "", class: "term-spacer" },
            {
              text: 'Run <span class="term-strong">open skills</span> for the full breakdown.',
              class: "term-muted",
            },
          ]);
        },
      },

      projects: {
        desc: "Selected projects",
        run: () => {
          this.printLines([
            "A collection of full stack and mobile builds, from web apps",
            "to a self-taught React Native plant care app.",
            { text: "", class: "term-spacer" },
            {
              text: 'Run <span class="term-strong">open projects</span> to browse them.',
              class: "term-muted",
            },
          ]);
          this.openWindow("projects");
        },
      },

      experience: {
        desc: "Career journey",
        run: () => {
          this.printLines([
            "From Mathematical Statistics to full stack development,",
            "a self-taught journey driven by a love of building.",
            { text: "", class: "term-spacer" },
            {
              text: 'Run <span class="term-strong">open personal</span> for the timeline.',
              class: "term-muted",
            },
          ]);
        },
      },

      contact: {
        desc: "Get in touch",
        run: () => {
          this.printLines([
            {
              text:
                "Email     " +
                '<a href="mailto:knyamandi99@gmail.com">knyamandi99@gmail.com</a>',
            },
            {
              text:
                "GitHub    " +
                '<a href="https://github.com/KatekaniN" target="_blank" rel="noopener noreferrer">github.com/KatekaniN</a>',
            },
            {
              text:
                "LinkedIn  " +
                '<a href="https://www.linkedin.com/in/katekanin" target="_blank" rel="noopener noreferrer">linkedin.com/in/katekanin</a>',
            },
            { text: "", class: "term-spacer" },
            {
              text: 'Run <span class="term-strong">open contact</span> to send a message.',
              class: "term-muted",
            },
          ]);
          this.openWindow("contact");
        },
      },

      social: {
        desc: "Social links",
        run: () => {
          this.printLines([
            {
              text:
                "GitHub    " +
                '<a href="https://github.com/KatekaniN" target="_blank" rel="noopener noreferrer">github.com/KatekaniN</a>',
            },
            {
              text:
                "LinkedIn  " +
                '<a href="https://www.linkedin.com/in/katekanin" target="_blank" rel="noopener noreferrer">linkedin.com/in/katekanin</a>',
            },
          ]);
        },
      },

      resume: {
        desc: "Open the resume",
        run: () => {
          this.print("Opening resume...", "term-muted");
          this.openWindow("resume");
        },
      },

      open: {
        desc: "open <app> - launch a window",
        run: (args) => {
          const target = (args[0] || "").toLowerCase();
          if (!target) {
            this.print(
              "Usage: open &lt;app&gt; - try: " +
                Object.keys(windows).join(", "),
              "term-muted"
            );
            return;
          }
          if (!windows[target]) {
            this.print(
              "Unknown app: " + this.escapeHtml(target) + ".",
              "term-error"
            );
            this.print(
              "Available: " + Object.keys(windows).join(", "),
              "term-muted"
            );
            return;
          }
          if (this.openWindow(target)) {
            this.print(
              "Launching " + windows[target] + "...",
              "term-success"
            );
          } else {
            this.print("Window manager not ready.", "term-error");
          }
        },
      },

      theme: {
        desc: "theme [dark|light] - switch the theme",
        run: (args) => {
          const mode = (args[0] || "toggle").toLowerCase();
          const root = document.documentElement;
          const current = root.getAttribute("data-theme") || "light";
          let wantDark;
          if (mode === "dark") {
            wantDark = true;
          } else if (mode === "light") {
            wantDark = false;
          } else if (mode === "toggle") {
            wantDark = current !== "dark";
          } else {
            this.print(
              "Usage: theme [dark|light|toggle]",
              "term-muted"
            );
            return;
          }
          const isDark = current === "dark";
          if (
            wantDark !== isDark &&
            typeof windowManager !== "undefined" &&
            windowManager.toggleTheme
          ) {
            windowManager.toggleTheme();
          }
          this.print(
            "Theme set to " + (wantDark ? "dark" : "light") + ".",
            "term-success"
          );
        },
      },

      neofetch: {
        desc: "System info",
        run: () => {
          const theme =
            document.documentElement.getAttribute("data-theme") || "light";
          this.printLines([
            { text: "visitor@katekani", class: "term-accent" },
            { text: "-----------------", class: "term-muted" },
            { text: 'OS        Katekani OS 11.0' },
            { text: "Host      Portfolio Desktop" },
            { text: "Shell     katsh 1.0" },
            { text: "Theme     " + theme },
            { text: "Stack     React · Next.js · Node.js · PostgreSQL" },
            { text: "Uptime    always online" },
          ]);
        },
      },

      ls: {
        desc: "List sections",
        run: () => {
          this.print(
            Object.keys(windows)
              .map((k) => '<span class="term-accent">' + k + "</span>")
              .join("&nbsp;&nbsp;")
          );
        },
      },

      echo: {
        desc: "echo <text> - print text",
        run: (args) => {
          this.print(this.escapeHtml(args.join(" ")));
        },
      },

      date: {
        desc: "Current date and time",
        run: () => {
          this.print(new Date().toString());
        },
      },

      whoami: {
        desc: "Print the current user",
        run: () => {
          this.print("visitor");
        },
      },

      history: {
        desc: "Show command history",
        run: () => {
          if (!this.history.length) {
            this.print("No history yet.", "term-muted");
            return;
          }
          this.history.forEach((cmd, i) => {
            this.print(
              '<span class="term-muted">' +
                String(i + 1).padStart(3, " ").replace(/ /g, "&nbsp;") +
                "</span>&nbsp;&nbsp;" +
                this.escapeHtml(cmd)
            );
          });
        },
      },

      clear: {
        desc: "Clear the screen",
        run: () => {
          this.clear();
        },
      },

      cls: {
        desc: "Clear the screen",
        run: () => {
          this.clear();
        },
      },

      sudo: {
        desc: "Superuser do",
        run: () => {
          this.print(
            "Nice try. You already have everything you need here.",
            "term-warning"
          );
        },
      },
    };
  }
}
