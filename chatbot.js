// WhatsApp-style Portfolio Chatbot
class PortfolioChatbot {
  constructor() {
    this.messages = [];
    this.messageCount = 1;
    this.conversationState = "main";
    this.messagesContainer = document.getElementById("chatbotMessages");
    this.statusCount = document.getElementById("chatbotMessageCount");
    this.resetButton = document.getElementById("resetChatbot");

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Handle option button clicks
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("chatbot-option-btn")) {
        const action = e.target.getAttribute("data-action");
        this.handleUserChoice(action, e.target.textContent);
      }
    });

    // Reset conversation
    if (this.resetButton) {
      this.resetButton.addEventListener("click", () => {
        this.resetConversation();
      });
    }
  }

  handleUserChoice(action, buttonText) {
    // Add user message
    this.addUserMessage(buttonText);

    // Show typing indicator
    this.showTyping();

    // Simulate delay then respond
    setTimeout(() => {
      this.hideTyping();
      this.handleBotResponse(action);
    }, 1000);
  }

  handleBotResponse(action) {
    let response = "";
    let options = [];

    switch (action) {
      case "experience":
        response = "Great! Here's Katekani's work experience:";
        options = [
          { text: "🎯 Current Role at Ogilvy", action: "ogilvy-role" },
          { text: "📚 Learning Journey", action: "learning-journey" },
          { text: "💼 Business Development", action: "business-dev" },
          { text: "🔙 Back to Main Menu", action: "main" },
        ];
        break;

      case "ogilvy-role":
        response =
          "🎯 **Junior Developer at Ogilvy South Africa** (Mar 2025 - Present)\n\n• Frontend development for charity foundation websites\n• Mentoring 2025 AI Software Development cohort\n• API optimization with Node.js and Express.js\n• WordPress & Adobe Experience Manager";
        options = [
          { text: "🛠️ Tech Stack Details", action: "tech-stack" },
          { text: "👥 Mentoring Experience", action: "mentoring" },
          { text: "🔙 Back to Experience", action: "experience" },
        ];
        break;

      case "learning-journey":
        response =
          "📚 **Umuzi Learnership** (Mar 2024 - Mar 2025)\n\nFrom zero to full-stack developer in 12 months!\n• Mastered JavaScript, React, Node.js, PostgreSQL\n• Built real projects solving actual problems\n• Won hackathons (FNB App of the Year!)\n• Earned Higher Certificate in Systems Development";
        options = [
          { text: "🏆 Hackathon Wins", action: "hackathons" },
          { text: "📜 Certificate Details", action: "certificate" },
          { text: "🔙 Back to Experience", action: "experience" },
        ];
        break;

      case "business-dev":
        response =
          "💼 **Business Development Coordinator** (2023-2024)\n\nWorked remotely with a US startup:\n• Business strategy and client relationships\n• Cross-cultural communication\n• Understanding user needs from business perspective\n\nThis role helped me see tech from the business side!";
        options = [
          { text: "🌍 Remote Work Experience", action: "remote-work" },
          { text: "🔙 Back to Experience", action: "experience" },
        ];
        break;

      case "projects":
        response = "🚀 Here are Katekani's key projects:";
        options = [
          { text: "🍫 Cadbury Chocolate AI", action: "cadbury-project" },
          { text: "🌱 Plant Care Assistant", action: "plant-project" },
          { text: "💻 GitHub API Consumer", action: "github-project" },
          { text: "🏆 Hackathon Projects", action: "hackathons" },
          { text: "🔙 Back to Main Menu", action: "main" },
        ];
        break;

      case "cadbury-project":
        response =
          "🍫 **Cadbury Globe - Mood-to-Chocolate AI**\n\nAI that detects your mood and recommends the perfect chocolate!\n• Uses Gemini Vision API for emotion detection\n• Camera-based mood analysis\n• Personalized chocolate recommendations\n• Built with React & Node.js";
        options = [
          { text: "🔗 View Live Demo", action: "cadbury-demo" },
          { text: "💡 How It Works", action: "cadbury-tech" },
          { text: "🔙 Back to Projects", action: "projects" },
        ];
        break;

      case "cadbury-demo":
        response =
          "🔗 **Live Demo**: https://cadbury-globe-frontend.onrender.com/\n\nTry it out! The app will analyze your mood through your camera and suggest the perfect Cadbury chocolate. It's fun and surprisingly accurate! 😊";
        options = [
          { text: "🔙 Back to Projects", action: "projects" },
          {
            text: "📞 Want to discuss this project?",
            action: "contact-project",
          },
        ];
        break;

      case "plant-project":
        response =
          "🌱 **Plantly - Plant Care Assistant**\n\nSelf-taught React Native to build this!\n• Plant identification using AI\n• Watering reminders and care tips\n• Built with React Native & Expo\n• Helps people keep their plants healthy";
        options = [
          { text: "📱 View Demo", action: "plant-demo" },
          { text: "🔙 Back to Projects", action: "projects" },
        ];
        break;

      case "skills":
        response = "🛠️ Here's Katekani's technical expertise:";
        options = [
          { text: "⚛️ Frontend Skills", action: "frontend-skills" },
          { text: "🖥️ Backend Skills", action: "backend-skills" },
          { text: "📱 Mobile Development", action: "mobile-skills" },
          { text: "🤖 AI Integration", action: "ai-skills" },
          { text: "🔙 Back to Main Menu", action: "main" },
        ];
        break;

      case "frontend-skills":
        response =
          "⚛️ **Frontend Development**\n\n• **Expert**: JavaScript, React, HTML5/CSS3\n• **Advanced**: React Native, Tailwind CSS, Bootstrap\n• **Accessibility**: WCAG guidelines, inclusive design\n• **Responsive**: Mobile-first approach";
        options = [
          { text: "🎨 Design Philosophy", action: "design-philosophy" },
          { text: "🔙 Back to Skills", action: "skills" },
        ];
        break;

      case "backend-skills":
        response =
          "🖥️ **Backend Development**\n\n• **Expert**: Node.js, Express.js\n• **Advanced**: REST APIs, PostgreSQL\n• **Testing**: Jasmine, Jest, TDD practices\n• **Deployment**: Render, Railway, Docker";
        options = [
          { text: "🗄️ Database Experience", action: "database-skills" },
          { text: "🔙 Back to Skills", action: "skills" },
        ];
        break;

      case "contact":
        response =
          "📞 **Ready to connect with Katekani?**\n\nShe's always excited to discuss new opportunities!";
        options = [
          { text: "📧 Email Her", action: "email-contact" },
          { text: "📅 Schedule a Meeting", action: "schedule-meeting" },
          { text: "💼 LinkedIn", action: "linkedin-contact" },
          { text: "💻 GitHub", action: "github-contact" },
          { text: "🔙 Back to Main Menu", action: "main" },
        ];
        break;

      case "email-contact":
        response =
          "📧 **Email**: knyamandi99@gmail.com\n\nFeel free to reach out directly! She usually responds within 24 hours and loves hearing about new opportunities and collaborations.";
        options = [
          { text: "📞 Other Contact Methods", action: "contact" },
          { text: "🔙 Main Menu", action: "main" },
        ];
        break;

      case "schedule-meeting":
        response =
          "📅 **Schedule a Quick Chat**\n\nBook a meeting directly with Katekani:\nhttps://calendar.app.google/LnkWXbra3MUtCyQM9\n\nPerfect for discussing opportunities, projects, or just having a tech chat!";
        options = [
          { text: "📞 Other Contact Methods", action: "contact" },
          { text: "🔙 Main Menu", action: "main" },
        ];
        break;

      case "main":
        response =
          "🏠 **Main Menu** - What would you like to know about Katekani?";
        options = [
          { text: "💼 Work Experience", action: "experience" },
          { text: "🚀 Projects", action: "projects" },
          { text: "🛠️ Technical Skills", action: "skills" },
          { text: "📞 Contact Info", action: "contact" },
        ];
        break;

      case "contact-project":
        response =
          "🤝 **Want to discuss this project in detail?**\n\nKatekani would love to share more about the technical challenges, AI implementation, or potential collaborations!";
        options = [
          { text: "📧 Send Email", action: "email-contact" },
          { text: "📅 Schedule Call", action: "schedule-meeting" },
          { text: "🔙 Back to Projects", action: "projects" },
        ];
        break;

      default:
        response = "🤔 I didn't understand that. Let me help you navigate:";
        options = [{ text: "🔙 Main Menu", action: "main" }];
    }

    this.addBotMessage(response, options);
  }

  addUserMessage(text) {
    const messageDiv = this.createMessageElement(
      "user",
      text
        .replace(
          /[📧💼🚀🛠️📞🎯📚💼🍫🌱💻🏆⚛️🖥️📱🤖🎨🗄️📅💻🏠🤝🔙🔗💡📱🤔]/g,
          ""
        )
        .trim()
    );
    this.messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
    this.updateMessageCount();
  }

  addBotMessage(text, options = []) {
    const messageDiv = this.createMessageElement("bot", text, options);
    this.messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
    this.updateMessageCount();
  }

  createMessageElement(type, text, options = []) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `chatbot-message ${type}-message`;

    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (type === "bot") {
      messageDiv.innerHTML = `
        <div class="chatbot-message-avatar">
          <div class="bot-avatar">
            <img src="./icons/kate.png" alt="assistant icon" />
          </div>
        </div>
        <div class="chatbot-message-content">
          <div class="chatbot-message-header">
            <span class="chatbot-message-author">Kate's Assistant</span>
            <span class="chatbot-message-timestamp">${timestamp}</span>
          </div>
          <div class="chatbot-message-text">${text.replace(/\n/g, "<br>")}</div>
          ${
            options.length > 0
              ? `
            <div class="chatbot-options">
              ${options
                .map(
                  (option) => `
                <button class="chatbot-option-btn" data-action="${option.action}">
                  ${option.text}
                </button>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="chatbot-message-content user-content">
          <div class="chatbot-message-header">
            <span class="chatbot-message-author">You</span>
            <span class="chatbot-message-timestamp">${timestamp}</span>
          </div>
          <div class="chatbot-message-text">${text}</div>
        </div>
      `;
    }

    return messageDiv;
  }

  updateMessageCount() {
    this.messageCount++;
    if (this.statusCount) {
      this.statusCount.textContent = `Messages: ${this.messageCount}`;
    }
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }

  showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "chatbot-typing-indicator";
    typingDiv.id = "typingIndicator";
    typingDiv.innerHTML = `
      <div class="chatbot-message bot-message">
        <div class="chatbot-message-avatar">
          <div class="bot-avatar">
            <img src="./icons/kate.png" alt="assistant icon" />
          </div>
        </div>
        <div class="chatbot-message-content">
          <div class="chatbot-typing-animation">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    `;
    this.messagesContainer.appendChild(typingDiv);
    this.scrollToBottom();
  }

  hideTyping() {
    const typingIndicator = document.getElementById("typingIndicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  resetConversation() {
    // Clear all messages except the welcome message
    const messages =
      this.messagesContainer.querySelectorAll(".chatbot-message");
    messages.forEach((message, index) => {
      if (index > 0) {
        // Keep the first (welcome) message
        message.remove();
      }
    });

    this.messageCount = 1;
    this.conversationState = "main";
    if (this.statusCount) {
      this.statusCount.textContent = "Messages: 1";
    }
  }
}

// Initialize the chatbot when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Wait a bit for the window to be ready
  setTimeout(() => {
    if (document.getElementById("chatbotMessages")) {
      new PortfolioChatbot();
    }
  }, 1000);
});
