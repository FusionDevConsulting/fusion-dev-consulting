(function () {
  const storageKey = "fusion-dev-theme";
  const root = document.documentElement;

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    document.querySelectorAll(".theme-toggle").forEach((button) => {
      const nextTheme = theme === "dark" ? "light" : "dark";
      button.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
      button.setAttribute("title", `Switch to ${nextTheme} mode`);
      button.textContent = theme === "dark" ? "☀" : "☾";
    });
  }

  function closeMobileMenu() {
    const navLinks = document.querySelector(".nav-links");
    const hamburger = document.querySelector(".hamburger");

    navLinks?.classList.remove("is-open");
    hamburger?.classList.remove("is-open");
    hamburger?.setAttribute("aria-expanded", "false");
  }

  function iconSvg(name) {
    const icons = {
      linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.98H3.63v11.03h3.31V8.98ZM5.29 4a1.92 1.92 0 1 0 0 3.84A1.92 1.92 0 0 0 5.29 4Zm8.8 4.98h-3.17v11.03h3.3v-5.46c0-1.44.27-2.83 2.05-2.83 1.75 0 1.77 1.64 1.77 2.92v5.37h3.3v-6.06c0-2.98-.64-5.27-4.12-5.27-1.67 0-2.79.92-3.25 1.79h-.05l.17-1.49Z"/></svg>',
      x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.3 10.4 6.1-7.1h-1.5l-5.3 6.1-4.2-6.1H4.5l6.4 9.3-6.4 7.4H6l5.5-6.4 4.5 6.4h4.9l-6.6-9.6Zm-2 2.3-.6-.9-5.2-7.4h2.2l4.2 6 .6.9 5.5 7.8h-2.2l-4.5-6.4Z"/></svg>',
      mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.8 6h14.4c1 0 1.8.8 1.8 1.8v8.4c0 1-.8 1.8-1.8 1.8H4.8c-1 0-1.8-.8-1.8-1.8V7.8C3 6.8 3.8 6 4.8 6Zm.6 1.8 6.6 4.6 6.6-4.6H5.4Zm13.8 8.4V9.7l-6.7 4.7a.9.9 0 0 1-1 0L4.8 9.7v6.5h14.4Z"/></svg>',
      gear: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.1A3.9 3.9 0 1 0 12 15.9 3.9 3.9 0 0 0 12 8.1Zm0 6A2.1 2.1 0 1 1 12 9.9a2.1 2.1 0 0 1 0 4.2Zm8.5-1.6v-1l-2.1-.7c-.2-.7-.4-1.2-.7-1.7l1-2-1.5-1.5-2 .9c-.6-.3-1.1-.5-1.7-.7L12.8 3h-1.6l-.7 2.8c-.6.2-1.2.4-1.7.7l-2-.9-1.5 1.5 1 2c-.3.5-.6 1.1-.7 1.7l-2.1.7v1l2.1.7c.2.7.4 1.2.7 1.7l-1 2 1.5 1.5 2-.9c.5.3 1.1.5 1.7.7l.7 2.8h1.6l.7-2.8c.6-.2 1.2-.4 1.7-.7l2 .9 1.5-1.5-1-2c.3-.5.6-1.1.7-1.7l2.1-.7Z"/></svg>',
      apps: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.8C4 4.8 4.8 4 5.8 4h3.4C10.2 4 11 4.8 11 5.8v3.4c0 1-.8 1.8-1.8 1.8H5.8C4.8 11 4 10.2 4 9.2V5.8Zm9 0c0-1 .8-1.8 1.8-1.8h3.4c1 0 1.8.8 1.8 1.8v3.4c0 1-.8 1.8-1.8 1.8h-3.4c-1 0-1.8-.8-1.8-1.8V5.8ZM4 14.8c0-1 .8-1.8 1.8-1.8h3.4c1 0 1.8.8 1.8 1.8v3.4c0 1-.8 1.8-1.8 1.8H5.8c-1 0-1.8-.8-1.8-1.8v-3.4Zm9.2 2.8 4.4-4.4 2.2 2.2-4.4 4.4h-2.2v-2.2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
      automate: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h4l2-5 4 10 2-5h4M7 5a8 8 0 0 1 10 0M17 19a8 8 0 0 1-10 0" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      ai: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8.5A4 4 0 0 1 12 4a4 4 0 0 1 4 4.5M6.5 13.5a4 4 0 0 0 7.2 2.4M17.5 13.5a4 4 0 0 1-7.2 2.4M8 8.5h8v5H8v-5Zm1.5 2.5h.1m4.8 0h.1M12 13v2.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      integration: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 7.5h-2a4.5 4.5 0 0 0 0 9h2m7-9h2a4.5 4.5 0 0 1 0 9h-2M8 12h8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
      analytics: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V5m0 14h14M8 16v-4m4 4V8m4 8v-6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
      cloud: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.4 18H17a4 4 0 0 0 .5-8A5.5 5.5 0 0 0 7 8.3 4.9 4.9 0 0 0 7.4 18Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      sharepoint: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7h8M8 12h8M8 17h5M5 4h14v16H5V4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      migration: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h11l-3-3m3 3-3 3M19 17H8l3 3m-3-3 3-3" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      excellence: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 4 2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7L12 4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
      partnership: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 12.5 11 15a2 2 0 0 0 2.8 0l4.7-4.7a2.2 2.2 0 0 0-3.1-3.1L12.5 10l-.9-.9a2.2 2.2 0 0 0-3.1 0L5.5 12a3 3 0 0 0 0 4.2l1.3 1.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      innovation: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6m-5 3h4m-6.5-8.5a5.5 5.5 0 1 1 9 4.2c-.8.7-1.5 1.5-1.5 2.3H9c0-.8-.7-1.6-1.5-2.3a5.5 5.5 0 0 1 0-4.2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      trust: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 5 7v5c0 4.2 2.9 6.8 7 8 4.1-1.2 7-3.8 7-8V7l-7-3Zm-3 8 2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      impact: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h16M7 16l3.5-4 3 2.5L19 7m0 0h-4m4 0v4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      growth: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20V9m0 0C9 9 7 7.3 6 4c3.4 0 5.3 1.5 6 5Zm0 0c3 0 5-1.7 6-5-3.4 0-5.3 1.5-6 5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      speed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19a7 7 0 1 0-7-7m7 0 4-4M4 19h16M3 12h3M4.5 7.5l2.1 2.1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      best: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4 7v6c0 4 3.3 6.6 8 8 4.7-1.4 8-4 8-8V7l-8-4Zm-3 9 2 2 4-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      finance: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h16M6 10v8m4-8v8m4-8v8m4-8v8M5 18h14M12 4l8 4H4l8-4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      healthcare: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14M6 6h12v12H6V6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      manufacturing: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V9l5 3V9l5 3V7h6v12H4Zm3-3h2m3 0h2m3 0h1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      retail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h15l-2 7H8L6 4H3m6 15h.1m8 0h.1" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      document: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h7l3 3v13H7V4Zm7 0v4h4M9.5 12h5M9.5 16h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      search: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Zm5-1.5L20 20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>'
    };

    return icons[name] || "";
  }

  function renderFooter() {
    let footer = document.querySelector("footer");
    if (!footer) {
      footer = document.createElement("footer");
      document.body.appendChild(footer);
    }

    footer.innerHTML = `
      <div class="footer-container">
        <div class="footer-section footer-brand-block">
          <a href="index.html" class="footer-logo">
            <img src="Images/Logo.png" alt="Fusion Dev">
          </a>
          <p>Microsoft 365, Power Platform, AI agent, RPA migration, and enterprise automation consulting for organizations that need practical delivery and measurable outcomes.</p>
          <div class="footer-social" aria-label="Social links">
            <a href="https://www.linkedin.com/company/fusion-dev-consulting" aria-label="LinkedIn" title="LinkedIn">${iconSvg("linkedin")}</a>
            <a href="https://x.com/AIFusionDev" aria-label="Twitter/X" title="Twitter/X">${iconSvg("x")}</a>
            <a href="mailto:priyaranjan.ks@fusiondevconsulting.ai" aria-label="Email" title="Email">${iconSvg("mail")}</a>
       
          </div>
        </div>
        <div class="footer-section">
          <h3>Services</h3>
          <ul class="footer-links">
            <li><a href="services.html#m365">Microsoft 365</a></li>
            <li><a href="services.html#sharepoint">SharePoint</a></li>
            <li><a href="services.html#powerplatform">Power Platform</a></li>
            <li><a href="services.html#rpa">RPA Automation</a></li>
            <li><a href="services.html#agents">AI Agents</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Company</h3>
          <ul class="footer-links">
            <li><a href="about.html">About</a></li>
            <li><a href="clients.html">Clients</a></li>
            <li><a href="https://www.fusiondevconsulting.ai/">Blog</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-section footer-contact-list">
          <h3>Contact</h3>
          <ul class="footer-links">
            <li><a href="mailto:priyaranjan.ks@fusiondevconsulting.ai">Email Us</a></li>
            <li><a href="contact.html">Book a consultation</a></li>
        
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copyright">© 2026 Fusion Dev Consulting. All rights reserved.</div>
        <div class="footer-legal">
          <a href="contact.html">Privacy</a>
          <a href="contact.html">Terms</a>
          <a href="contact.html">Cookies</a>
        </div>
      </div>
    `;
  }

  function enhanceInlineSocialLinks() {
    document.querySelectorAll(".social-link").forEach((link) => {
      const label = `${link.getAttribute("title") || ""} ${link.textContent || ""} ${link.href || ""}`.toLowerCase();
      let iconName = "";
      let accessibleLabel = link.getAttribute("aria-label") || link.getAttribute("title") || "";

      if (label.includes("linkedin") || label.trim() === "in") {
        iconName = "linkedin";
        accessibleLabel = accessibleLabel || "LinkedIn";
      } else if (label.includes("mailto") || label.includes("mail") || label.includes("@")) {
        iconName = "mail";
        accessibleLabel = accessibleLabel || "Email";
      } else if (label.includes("twitter") || label.includes("x.com") || label.includes("𝕏")) {
        iconName = "x";
        accessibleLabel = accessibleLabel || "Twitter/X";
      } else if (label.includes("github") || label.includes("gear") || label.includes("gh")) {
        iconName = "gear";
        accessibleLabel = accessibleLabel || "Technical profile";
      }

      if (!iconName) return;

      link.innerHTML = iconSvg(iconName);
      link.setAttribute("aria-label", accessibleLabel);
      link.setAttribute("title", accessibleLabel);
    });
  }

  function enhanceContentIcons() {
    document.querySelectorAll("[data-icon]").forEach((element) => {
      const iconName = element.getAttribute("data-icon");
      const svg = iconSvg(iconName);
      if (!svg) return;

      element.innerHTML = svg;
      element.setAttribute("aria-hidden", "true");
    });
  }

  window.toggleMenu = function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    const hamburger = document.querySelector(".hamburger");

    if (!navLinks || !hamburger) return;

    const isOpen = navLinks.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  };

  applyTheme(getPreferredTheme());

  document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");
    const hamburger = document.querySelector(".hamburger");

    renderFooter();
    enhanceInlineSocialLinks();
    enhanceContentIcons();

    if (nav && !nav.querySelector(".theme-toggle")) {
      const themeButton = document.createElement("button");
      themeButton.className = "theme-toggle";
      themeButton.type = "button";
      nav.insertBefore(themeButton, hamburger || null);
    }

    applyTheme(getPreferredTheme());

    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        localStorage.setItem(storageKey, nextTheme);
        applyTheme(nextTheme);
      });
    });

    if (hamburger) {
      hamburger.setAttribute("aria-label", "Open menu");
      hamburger.setAttribute("aria-expanded", "false");
      if (!hamburger.hasAttribute("onclick")) {
        hamburger.addEventListener("click", window.toggleMenu);
      }
    }

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    const currentPage = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach((link) => {
      const hrefPage = (link.getAttribute("href") || "").split("#")[0];
      if (hrefPage === currentPage) {
        link.setAttribute("aria-current", "page");
      }
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    const revealElements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
  });
}());
