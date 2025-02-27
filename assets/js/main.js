/*=============== MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle");

/* Menu Show - Hidden */
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show-menu");
  navToggle.classList.toggle("animate-toggle");
});

/*=============== HEADER FADEOUT ===============*/
const bgHeader = document.querySelector(".bg-header");
function startFadeOut() {
  bgHeader.classList.add("fade-out");
}

/*=============== FADE IN ===============*/
/* Scroll */
const reveal = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  reveal.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.75) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

function scrollReveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((reveal) => {
    const revealTop = reveal.getBoundingClientRect().top;
    const revealBottom = reveal.getBoundingClientRect().bottom;

    if (revealTop < window.innerHeight && revealBottom > 0) {
      reveal.classList.add("active");
    } else {
      reveal.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", scrollReveal);
window.addEventListener("load", scrollReveal);

setTimeout(startFadeOut, 2000);

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav-link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");

  navToggle.classList.remove("animate-toggle");
  navMenu.classList.remove("show-menu");
};

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
  const header = document.getElementById("header");

  this.scrollY >= 20
    ? header.classList.add("bg-header")
    : header.classList.remove("bg-header");
};

window.addEventListener("scroll", scrollHeader);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");
    const sectionClass = document.querySelector(
      `.nav-menu a[href*="${sectionId}"]`
    );

    if (sectionClass) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        sectionClass.classList.add("active-link");
      } else {
        sectionClass.classList.remove("active-link");
      }
    }
  });
};

// Tambahkan event listener untuk scroll
window.addEventListener("scroll", scrollActive);

/*=============== SERVICES SWIPER ===============*/
var servicesSwiper = new Swiper(".services-swiper", {
  spaceBetween: 32,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    769: {
      slidesPerView: 2,
    },
    1208: {
      slidesPerView: 3,
    },
  },
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
function openPopup(id) {
  document.getElementById(id).style.display = "flex";
}

function closePopup(id) {
  document.getElementById(id).style.display = "none";
}

document.addEventListener("click", function (event) {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    if (event.target === popup) {
      closePopup(popup.id);
    }
  });
});

var mixer = mixitup(".projects-container", {
  selectors: {
    target: ".mix",
  },
  animation: {
    duration: 300,
  },
});

/* Active Projects */
const linkProjects = document.querySelectorAll(".projects-item");

function activeProjects() {
  linkProjects.forEach((a) => {
    a.classList.remove("active-projects");
  });
  this.classList.add("active-projects");
}

linkProjects.forEach((a) => a.addEventListener("click", activeProjects));

/*=============== RESUME ===============*/
const accordionItems = document.querySelectorAll(".resume-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".resume-header"),
    content = item.querySelector(".resume-content"),
    icon = item.querySelector(".resume-icon i");

  header.addEventListener("click", () => {
    const isOpen = item.classList.toggle("accordion-open");

    content.style.height = isOpen ? content.scrollHeight + "px" : "0";
    icon.className = isOpen ? "ri-subtract-line" : "ri-add-line";

    accordionItems.forEach((otherItem) => {
      if (
        otherItem !== item &&
        otherItem.classList.contains("accordion-open")
      ) {
        otherItem.querySelector(".resume-content").style.height = "0";
        otherItem.querySelector(".resume-icon i").classList = "ri-add-line";
        otherItem.classList.remove("accordion-open");
      }
    });
  });
});

document.addEventListener("click", (event) => {
  const isClickInside = event.target.closest(".resume-item");
  if (!isClickInside) {
    accordionItems.forEach((item) => {
      item.classList.remove("accordion-open");
      item.querySelector(".resume-content").style.height = "0";
      item.querySelector(".resume-icon i").className = "ri-add-line";
    });
  }
});

/*=============== EMAIL JS ===============*/
function getWIBDateTime() {
  const now = new Date();
  const offset = 7; // WIB is UTC+7
  const utc = now.getTime() + now.getTimezoneOffset() * 60000; // Convert to UTC
  const wib = new Date(utc + 3600000 * offset); // Convert to WIB
  return wib.toISOString(); // Format as ISO string
}

const contactForm = document.getElementById("contact-form"),
  contactName = document.getElementById("contact-name"),
  contactEmail = document.getElementById("contact-email"),
  contactSubject = document.getElementById("contact-subject"),
  contactMessage = document.getElementById("contact-message"),
  message = document.getElementById("message");

const SUPABASE_URL = "https://rgwphyerwjlignahtzys.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnd3BoeWVyd2psaWduYWh0enlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTA1NjUsImV4cCI6MjA1NjA4NjU2NX0.wv4dVYU7ZdYhBY-2PfkGiozbbSHYYzTrgJWuz7JMEjw";

const sendFormData = async (e) => {
  e.preventDefault();

  if (
    contactName.value === "" ||
    contactEmail.value === "" ||
    contactSubject.value === "" ||
    contactMessage.value === ""
  ) {
    message.classList.remove("color-first");
    message.classList.add("color-red");
    message.textContent = "Please fill in all the fields.";

    setTimeout(() => {
      message.textContent = "";
    }, 7000);
    return;
  }

  const formData = {
    name: contactName.value,
    email: contactEmail.value,
    subject: contactSubject.value,
    message: contactMessage.value,
    created_at: getWIBDateTime(), // Tambahkan waktu WIB
  };

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      message.classList.remove("color-red");
      message.classList.add("color-first");
      message.textContent = "Message sent successfully.";
      contactForm.reset();
    } else {
      throw new Error(data.message || "Failed to send message");
    }
  } catch (error) {
    console.error("Error:", error);
    message.classList.add("color-red");
    message.textContent = "Message sent loading. Please Wait";
  }

  setTimeout(() => {
    message.textContent = "";
  }, 10000);
};

contactForm.addEventListener("submit", sendFormData);

const sendEmail = (e) => {
  e.preventDefault();

  if (
    contactName.value === "" ||
    contactEmail.value === "" ||
    contactSubject.value === "" ||
    contactMessage.value === ""
  ) {
    message.classList.remove("color-first");
    message.classList.add("color-red");
    message.textContent = "Please fill in all the fields.";

    setTimeout(() => {
      message.textContent = "";
    }, 7000);
    return;
  }

  emailjs
    .sendForm(
      "service_rmblcto",
      "template_7qfnujf",
      "#contact-form",
      "E58mVnk7AvZaPera9"
    )
    .then(() => {
      message.classList.remove("color-red");
      message.classList.add("color-first");
      message.textContent = "Message sent successfully.";

      setTimeout(() => {
        message.textContent = "";
      }, 10000);
      contactForm.reset();
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      message.classList.add("color-red");
      message.textContent = "Failed to send message. Please try again.";
    });
};

contactForm.addEventListener("submit", sendEmail);

/*=============== STYLE SWITCHER ===============*/
const styleSwitcher = document.getElementById("style-switcher"),
  switcherToggle = document.getElementById("switcher-toggle"),
  switcherClose = document.getElementById("switcher-close");

/* Switcher show */
switcherToggle.addEventListener("click", () => {
  styleSwitcher.classList.add("show-switcher");
});

/* Switcher hidden */
switcherClose.addEventListener("click", () => {
  styleSwitcher.classList.remove("show-switcher");
});

/*=============== THEME COLORS ===============*/
const colors = document.querySelectorAll(".style-switcher-color");

colors.forEach((color) => {
  color.onclick = () => {
    const activeColor = color.style.getPropertyValue("--hue");

    colors.forEach((c) => c.classList.remove("active-color"));
    color.classList.add("active-color");

    document.documentElement.style.setProperty("--hue", activeColor);
  };
});

/*=============== LIGHT/DARK MODE ===============*/
let currentTheme = "light";
document.body.className = currentTheme;

document.querySelectorAll('input[name="body-theme"]').forEach((input) => {
  input.addEventListener("change", () => {
    currentTheme = input.value;
    document.body.className = currentTheme;
  });
});

