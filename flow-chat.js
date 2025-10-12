const FLOW_CHAT_SCENES = {
  start: {
    message:
      "👋 <strong>Hi there!</strong> I'm Katekani's chatbot. Think of me like a WhatsApp conversation — tap any option below and I'll lead you to more details or help you wrap things up whenever you're ready.",
    options: [
      { label: "🌟 Highlights about Kate", next: "highlights" },
      { label: "🚀 Explore projects", next: "projects" },
      { label: "🛠️ Technical skills", next: "skills" },
      { label: "🤝 Work with Kate", next: "work" },
      { label: "🔚 End chat", type: "end" },
    ],
  },
  highlights: {
    message:
      "✨ Katekani is a <strong>Junior Developer at Ogilvy South Africa</strong>, creating polished digital experiences and mentoring fresh developers. Her journey from mathematical statistics to software is powered by resilience, curiosity, and a love for solving real-world problems.",
    options: [
      { label: "🎯 Current role", next: "ogilvy" },
      { label: "📚 Learning journey", next: "learning" },
      { label: "💼 Previous experience", next: "business" },
      { label: "🔙 Back to main", next: "start", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  ogilvy: {
    message:
      "🎯 <strong>Junior Developer @ Ogilvy (Mar 2025 – Present)</strong><br>• Crafting modern interfaces for large foundations<br>• Pairing with backend squads on API integrations<br>• Mentoring the 2025 AI Software Development cohort<br>• Shipping accessible, high-performance experiences",
    options: [
      { label: "🛠️ Tech stack", next: "stack" },
      { label: "👥 Mentoring work", next: "mentoring" },
      { label: "🔙 Back", next: "highlights", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  stack: {
    message:
      "🛠️ <strong>Core toolbelt</strong><br>• React & Next.js for frontends that feel instant<br>• Node.js & Express for APIs and integrations<br>• PostgreSQL and Prisma for structured data<br>• Tailwind, Chakra UI, and custom CSS for design systems",
    options: [
      { label: "🤖 AI experiments", next: "ai" },
      { label: "🔙 Back", next: "ogilvy", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  mentoring: {
    message:
      "👥 <strong>Mentorship @ Ogilvy</strong><br>• Code reviews and pairing sessions with new devs<br>• Workshops on clean architecture and debugging<br>• Sharing lessons from hackathons and product launches<br>• Helping teammates design inclusive user journeys",
    options: [
      { label: "🔙 Back", next: "ogilvy", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  learning: {
    message:
      "📚 <strong>Umuzi Learnership (2024 – 2025)</strong><br>• Built full-stack apps weekly, practicing TDD<br>• Won hackathons including the <em>FNB App of the Year</em><br>• Learned to prototype AI apps with Gemini and OpenAI<br>• Deep-dive into accessibility and UX research",
    options: [
      { label: "🏆 Hackathon wins", next: "hackathons" },
      { label: "📜 Certifications", next: "certifications" },
      { label: "🔙 Back", next: "highlights", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  business: {
    message:
      "💼 <strong>Business Development Coordinator (2023 – 2024)</strong><br>• Worked remotely with a US startup<br>• Translated business needs into actionable roadmaps<br>• Strengthened stakeholder communication<br>• Sparked a passion for building the tech behind the pitch",
    options: [
      { label: "🔙 Back", next: "highlights", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  hackathons: {
    message:
      "🏆 <strong>Moments that changed everything</strong><br>• <strong>FNB App of the Year:</strong> led a fintech app tackling township funding gaps<br>• <strong>Safe Spaces Hackathon:</strong> built a safety network with live mapping<br><br>These wins cemented Kate's love for human-centered engineering.",
    options: [
      { label: "🔙 Back", next: "learning", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  certifications: {
    message:
      "📜 <strong>Key credentials</strong><br>• Higher Certificate in Systems Development (NQF 5)<br>• Advanced certification in Agile delivery (Umuzi)<br>• Continuous coursework in LLM development and Java",
    options: [
      { label: "🔙 Back", next: "learning", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  projects: {
    message:
      "🚀 Ready to tour some flagship builds? Pick a project lane and I'll unpack it for you.",
    options: [
      { label: "🍫 Cadbury AI", next: "projectCadbury" },
      { label: "🌱 Plantly mobile", next: "projectPlantly" },
      { label: "💻 GitHub profile", next: "projectGithub" },
      { label: "🎮 Mini games", next: "projectGames" },
      { label: "🔙 Back to main", next: "start", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  projectCadbury: {
    message:
      "🍫 <strong>Cadbury Mood-to-Chocolate</strong><br>• Gemini Vision analyses your current mood<br>• Suggests the perfect Cadbury treat in real time<br>• React frontend, Node.js orchestration, Tailwind UI<br>• Designed for joy, with analytics for shopper insights",
    links: [
      {
        label: "Open live demo",
        href: "https://cadbury-globe-frontend.onrender.com/",
        icon: "fa-solid fa-up-right-from-square",
      },
      {
        label: "View GitHub frontend",
        href: "https://github.com/KatekaniN/cadbury-globe-frontend",
        icon: "fab fa-github",
      },
    ],
    options: [
      { label: "💡 Implementation details", next: "projectCadburyTech" },
      { label: "🔙 Back to projects", next: "projects", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  projectCadburyTech: {
    message:
      "🧠 <strong>Cadbury AI under the hood</strong><br>• Camera stream piped to Gemini Vision for mood detection<br>• Recommendation engine pairs emotions with chocolate profiles<br>• Uses optimistic UI updates and graceful fallbacks for permissions<br>• Built end-to-end within two weeks for a product pitch",
    options: [
      { label: "🔙 Back", next: "projectCadbury", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  projectPlantly: {
    message:
      "🌱 <strong>Plantly – Plant care assistant</strong><br>• React Native + Expo mobile app<br>• Plant.ID API for visual identification<br>• Personalized care schedule with push reminders<br>• Built out of pure love for keeping plants alive!",
    links: [
      {
        label: "See landing page",
        href: "https://katekanin.github.io/plantly-website/",
        icon: "fa-solid fa-up-right-from-square",
      },
      {
        label: "View GitHub repo",
        href: "https://github.com/KatekaniN/plantly",
        icon: "fab fa-github",
      },
    ],
    options: [
      { label: "🔙 Back to projects", next: "projects", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  projectGithub: {
    message:
      "💻 <strong>GitHub API Consumer</strong><br>• Automatically curates GitHub stats into a live profile<br>• Implements caching to slash load times by 60%<br>• Jasmine tests + Render deployment pipeline<br>• Perfect showcase for Kate's API craftsmanship",
    links: [
      {
        label: "Open live app",
        href: "https://consume-frontend.onrender.com/",
        icon: "fa-solid fa-up-right-from-square",
      },
      {
        label: "Frontend repository",
        href: "https://github.com/KatekaniN/consume-frontend",
        icon: "fab fa-github",
      },
      {
        label: "Backend repository",
        href: "https://github.com/KatekaniN/consume-backend",
        icon: "fab fa-github",
      },
    ],
    options: [
      { label: "🔙 Back to projects", next: "projects", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  projectGames: {
    message:
      "🎮 <strong>Retro mini games</strong><br>• Snake, Pong, and a Flappy prototype bundled into this portfolio<br>• Canvas rendering with custom physics and controls<br>• Multiple difficulty levels, pause/resume, and responsive layout",
    cta: {
      title: "Ready to play?",
      body: "Open the Games window on the desktop and hit Start to relive the 90s!",
      buttonLabel: "Open Games window",
      action: { type: "open-window", windowId: "games" },
    },
    options: [
      { label: "🔙 Back to projects", next: "projects", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  skills: {
    message: "🛠️ Choose a skill area and I'll break down Kate's strengths.",
    options: [
      { label: "⚛️ Frontend craft", next: "skillFrontend" },
      { label: "🖥️ Backend delivery", next: "skillBackend" },
      { label: "📱 Mobile & devices", next: "skillMobile" },
      { label: "🤖 AI & data", next: "skillAI" },
      { label: "🔙 Back to main", next: "start", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  skillFrontend: {
    message:
      "⚛️ <strong>Frontend craft</strong><br>• React, Next.js, and Astro for dynamic experiences<br>• TypeScript for maintainable component systems<br>• Accessibility-first mindset with automated audits<br>• Design systems using Tailwind, Chakra, and vanilla CSS",
    options: [
      { label: "🧭 Explore backend", next: "skillBackend" },
      { label: "🔙 Back", next: "skills", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  skillBackend: {
    message:
      "🖥️ <strong>Backend delivery</strong><br>• Node.js, Express, NestJS for API orchestration<br>• PostgreSQL, Supabase, Prisma for data integrity<br>• Testing with Jest, Jasmine, Supertest<br>• CI/CD workflows on Render, Railway, and GitHub Actions",
    options: [
      { label: "🔙 Back", next: "skills", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  skillMobile: {
    message:
      "📱 <strong>Mobile & cross-device</strong><br>• React Native + Expo for rapid mobile delivery<br>• Device APIs: camera, notifications, sensors<br>• Progressive Web Apps with offline fallbacks<br>• Responsive design tuned for Windows-style layouts",
    options: [
      { label: "🔙 Back", next: "skills", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  skillAI: {
    message:
      "🤖 <strong>AI & data tinkering</strong><br>• Gemini and OpenAI APIs for conversational agents<br>• Vision models to interpret images and moods<br>• Prompt engineering for reliable responses<br>• Beginnings of fine-tuning custom LLMs in Python",
    options: [
      { label: "🔙 Back", next: "skills", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  work: {
    message: "🤝 Let's plan the next steps. Want to collaborate with Kate?",
    options: [
      { label: "📨 Send a message", next: "contact" },
      { label: "📅 Book a quick call", next: "calendar" },
      { label: "💼 View LinkedIn", next: "linkedin" },
      { label: "🏢 Download resume", next: "resume" },
      { label: "🔙 Back to main", next: "start", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  contact: {
    message:
      '📨 <strong>Direct email</strong><br>Reach Kate at <a href="mailto:knyamandi99@gmail.com">knyamandi99@gmail.com</a>.<br>She replies within 24 hours.',
    cta: {
      title: "Prefer a form?",
      body: "Open the Contact window and drop a message straight from this desktop.",
      buttonLabel: "Open Contact window",
      action: { type: "open-window", windowId: "contact" },
    },
    options: [
      { label: "📅 Book a call", next: "calendar" },
      { label: "🔙 Back", next: "work", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  calendar: {
    message:
      '📅 <strong>Schedule a quick chat</strong><br>Pick a slot that works for you: <a href="https://calendar.app.google/LnkWXbra3MUtCyQM9" target="_blank" rel="noopener noreferrer">Google Calendar booking link</a>.',
    options: [
      { label: "📨 Email instead", next: "contact" },
      { label: "🔙 Back", next: "work", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  linkedin: {
    message:
      '💼 <strong>LinkedIn</strong><br>Connect with Kate here: <a href="https://linkedin.com/in/katekanin" target="_blank" rel="noopener noreferrer">linkedin.com/in/katekanin</a>.',
    options: [
      { label: "🔙 Back", next: "work", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
  resume: {
    message:
      "📄 <strong>Resume download</strong><br>Grab the PDF from the Resume window or use <em>Download PDF</em> inside it.",
    cta: {
      title: "Need it now?",
      body: "I'll pop open the Resume window so you can download it instantly.",
      buttonLabel: "Open Resume window",
      action: { type: "open-window", windowId: "resume" },
    },
    options: [
      { label: "🔙 Back", next: "work", variant: "secondary" },
      { label: "🔚 End chat", type: "end", variant: "danger" },
    ],
  },
};

class ChatbotFlow {
  constructor() {
    this.messagesContainer = document.getElementById("flowChatMessages");
    this.optionsContainer = document.getElementById("flowChatOptions");
    this.typingIndicator = document.getElementById("flowChatTyping");
    this.resetButton = document.getElementById("flowChatReset");
    this.currentScene = null;
    this.conversationEnded = false;

    if (!this.messagesContainer || !this.optionsContainer) {
      return;
    }

    this.bindEvents();
    this.presentScene("start", { skipTyping: true });
  }

  bindEvents() {
    this.optionsContainer.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-scene]");
      if (!button || button.disabled || this.conversationEnded) return;

      const sceneKey = button.getAttribute("data-scene");
      const optionType = button.getAttribute("data-type");
      const optionVariant = button.getAttribute("data-variant");

      const option = {
        next: sceneKey,
        type: optionType || null,
        variant: optionVariant || null,
        label: button.textContent.trim(),
      };

      this.handleOption(option, button.dataset);
    });

    if (this.resetButton) {
      this.resetButton.addEventListener("click", () => this.reset());
    }
  }

  handleOption(option, dataset) {
    this.addUserMessage(option.label);
    this.disableOptions();

    const delay = this.calculateDelay(option.label);

    this.showTyping();
    setTimeout(() => {
      this.hideTyping();

      if (option.type === "end") {
        this.finishConversation(dataset.endMessage);
        return;
      }

      if (option.type === "open-window" && dataset.windowId) {
        if (dataset.preMessage) {
          this.addBotMessage({ message: dataset.preMessage });
        }
        if (typeof windowManager !== "undefined" && windowManager) {
          windowManager.openWindow(dataset.windowId);
        }
        if (option.next && option.next !== "#stay") {
          this.presentScene(option.next);
        } else {
          this.renderOptions([]);
        }
        return;
      }

      if (option.next && option.next !== "#stay") {
        this.presentScene(option.next);
      }
    }, delay);
  }

  presentScene(sceneKey, { skipTyping = false } = {}) {
    const scene = FLOW_CHAT_SCENES[sceneKey];
    if (!scene) return;

    this.currentScene = sceneKey;

    if (!skipTyping) {
      this.showTyping();
      setTimeout(() => {
        this.hideTyping();
        this.addBotMessage(scene);
        this.renderOptions(scene.options || []);
      }, this.calculateDelay(scene.message));
    } else {
      this.addBotMessage(scene);
      this.renderOptions(scene.options || []);
    }
  }

  addUserMessage(text) {
    const message = document.createElement("div");
    message.className = "flowchat-message user";

    const bubble = document.createElement("div");
    bubble.className = "flowchat-bubble";
    bubble.textContent = text;

    const time = document.createElement("span");
    time.className = "flowchat-time";
    time.textContent = this.getTimestamp();

    message.appendChild(bubble);
    message.appendChild(time);

    this.messagesContainer.appendChild(message);
    this.scrollToBottom();
  }

  addBotMessage(sceneOrMessage) {
    const {
      message,
      links = [],
      cta = null,
    } = typeof sceneOrMessage === "string"
      ? { message: sceneOrMessage }
      : sceneOrMessage;

    const wrapper = document.createElement("div");
    wrapper.className = "flowchat-message bot";

    const bubble = document.createElement("div");
    bubble.className = "flowchat-bubble";
    bubble.innerHTML = message.replace(/\n/g, "<br>");

    if (links && links.length > 0) {
      const linksContainer = document.createElement("div");
      linksContainer.className = "flowchat-links";
      links.forEach((link) => {
        const anchor = document.createElement("a");
        anchor.href = link.href;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        if (link.icon) {
          anchor.innerHTML = `<i class="${link.icon}"></i> ${link.label}`;
        } else {
          anchor.textContent = link.label;
        }
        linksContainer.appendChild(anchor);
      });
      bubble.appendChild(linksContainer);
    }

    if (cta) {
      const ctaBox = document.createElement("div");
      ctaBox.className = "flowchat-cta";
      ctaBox.innerHTML = `<strong>${cta.title}</strong>${cta.body}`;

      if (cta.action && cta.buttonLabel) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = cta.buttonLabel;
        button.addEventListener("click", () => {
          if (cta.action.type === "open-window" && cta.action.windowId) {
            if (typeof windowManager !== "undefined" && windowManager) {
              windowManager.openWindow(cta.action.windowId);
            }
          }
        });
        ctaBox.appendChild(button);
      }

      bubble.appendChild(ctaBox);
    }

    const time = document.createElement("span");
    time.className = "flowchat-time";
    time.textContent = this.getTimestamp();

    wrapper.appendChild(bubble);
    wrapper.appendChild(time);

    this.messagesContainer.appendChild(wrapper);
    this.scrollToBottom();
  }

  renderOptions(options) {
    this.optionsContainer.innerHTML = "";

    if (!options || options.length === 0 || this.conversationEnded) {
      return;
    }

    options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "flowchat-option";
      button.textContent = option.label;
      button.setAttribute("data-scene", option.next || "#stay");
      if (option.type) button.setAttribute("data-type", option.type);
      if (option.variant) button.classList.add(option.variant);
      if (option.variant) button.setAttribute("data-variant", option.variant);
      if (option.type === "open-window" && option.windowId) {
        button.setAttribute("data-window-id", option.windowId);
      }
      if (option.preMessage) {
        button.setAttribute("data-pre-message", option.preMessage);
      }
      if (option.endMessage) {
        button.setAttribute("data-end-message", option.endMessage);
      }
      this.optionsContainer.appendChild(button);
    });
  }

  disableOptions() {
    this.optionsContainer
      .querySelectorAll("button")
      .forEach((button) => (button.disabled = true));
  }

  showTyping() {
    if (this.typingIndicator) {
      this.typingIndicator.hidden = false;
    }
  }

  hideTyping() {
    if (this.typingIndicator) {
      this.typingIndicator.hidden = true;
    }
  }

  finishConversation(customMessage) {
    if (this.conversationEnded) return;

    const message =
      customMessage ||
      "Thanks for chatting! If you'd like to explore more, just restart the conversation.";

    this.addBotMessage({ message });

    const finished = document.createElement("div");
    finished.className = "flowchat-finished";
    finished.innerHTML =
      "Chat session closed. Tap <strong>Restart conversation</strong> whenever you're ready to explore again.";

    this.messagesContainer.appendChild(finished);
    this.scrollToBottom();

    this.optionsContainer.innerHTML = "";
    this.conversationEnded = true;
  }

  reset() {
    this.messagesContainer.innerHTML = "";
    this.optionsContainer.innerHTML = "";
    this.conversationEnded = false;
    this.presentScene("start", { skipTyping: true });
  }

  calculateDelay(text = "") {
    const base = 600;
    const extra = Math.min(1200, text.length * 10);
    return base + extra;
  }

  getTimestamp() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (document.getElementById("flowChatMessages")) {
      new ChatbotFlow();
    }
  }, 400);
});
