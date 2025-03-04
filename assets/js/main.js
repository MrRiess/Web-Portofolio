'use strict';

/*=============== MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
    navToggle.classList.toggle('animate-toggle');
  });

  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
      navMenu.classList.remove('show-menu');
      navToggle.classList.remove('animate-toggle');
    }
  });
}

/*=============== FADE IN ===============*/
const reveal = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  reveal.forEach((section) => {
    const { top, bottom } = section.getBoundingClientRect();
    const isVisible = top < window.innerHeight * 1 && bottom > 0;
    section.classList.toggle('active', isVisible);
  });
};

let isScrolling;
window.addEventListener('scroll', () => {
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(revealOnScroll, 50);
});

window.addEventListener('load', revealOnScroll);

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav-link');

navLink.forEach((n) =>
  n.addEventListener('click', () => {
    navMenu?.classList.remove('show-menu');
    navToggle?.classList.remove('animate-toggle');
  })
);

/*=============== HEADER FADEOUT ===============*/
const bgHeader = document.querySelector('.bg-header');
bgHeader && setTimeout(() => bgHeader.classList.add('fade-out'), 2000);

const scrollHeader = () => {
  const header = document.getElementById('header');
  header?.classList.toggle('bg-header', window.scrollY >= 20);
};

window.addEventListener('scroll', scrollHeader);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionClass = document.querySelector(
      `.nav-menu a[href*="${current.getAttribute('id')}"]`
    );
    sectionClass?.classList.toggle(
      'active-link',
      scrollY > sectionTop && scrollY <= sectionTop + sectionHeight
    );
  });
};

window.addEventListener('scroll', scrollActive);

/*=============== SWIPER ===============*/
const servicesSwiper = new Swiper('.services-swiper', {
  spaceBetween: 32,
  pagination: { el: '.swiper-pagination', clickable: true },
  loop: true,
  breakpoints: { 769: { slidesPerView: 2 }, 1208: { slidesPerView: 3 } },
});

/*=============== POP UP ===============*/
let activeSwiperInstances = {};

const openPopup = (popupId) => {
  const popup = document.getElementById(popupId);
  if (!popup) return;

  // Tambahkan overlay
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  popup.classList.add('active');
  overlay.classList.add('active');

  // Lazy load image ketika pop-up terbuka
  popup.querySelectorAll('img[data-src]').forEach((img) => {
    img.src = img.dataset.src;
    img.removeAttribute('data-src'); // Hapus atribut setelah dimuat
  });

  if (!activeSwiperInstances[popupId]) {
    activeSwiperInstances[popupId] = new Swiper(
      `#${popupId} .certificate-swiper`,
      {
        spaceBetween: 32,
        loop: true,
        pagination: { el: `#${popupId} .swiper-pagination`, clickable: true },
      }
    );
  }

  // Event listener untuk close pop-up
  overlay.addEventListener('click', () => closePopup(popupId));
  document.addEventListener('keydown', handleKeyDown);
};

const closePopup = (popupId) => {
  const popup = document.getElementById(popupId);
  const overlay = document.querySelector('.overlay');
  if (popup) popup.classList.remove('active');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  }
  document.removeEventListener('keydown', handleKeyDown);
};

const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup.active');
    if (activePopup) closePopup(activePopup.id);
  }
};

/*=============== ACTIVE PROJECTS ===============*/
document
  .querySelector('.projects-container')
  ?.addEventListener('click', (e) => {
    if (e.target.classList.contains('projects-item')) {
      document
        .querySelectorAll('.projects-item')
        .forEach((item) => item.classList.remove('active-projects'));
      e.target.classList.add('active-projects');
    }
  });

/*=============== LAZY LOADING IMAGE ===============*/
document.addEventListener('DOMContentLoaded', function () {
  const lazyImages = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    let lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          lazyImageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      lazyImageObserver.observe(img);
    });
  }
});

/*=============== RESUME ===============*/
const accordionItems = document.querySelectorAll('.resume-item');

accordionItems.forEach((item) => {
  const header = item.querySelector('.resume-header');
  const content = item.querySelector('.resume-content');
  const icon = item.querySelector('.resume-icon i');

  if (header && content && icon) {
    header.addEventListener('click', () => {
      const isOpen = item.classList.toggle('accordion-open');
      content.style.height = isOpen ? `${content.scrollHeight}px` : '0';
      icon.className = isOpen ? 'ri-subtract-line' : 'ri-add-line';

      accordionItems.forEach((otherItem) => {
        if (
          otherItem !== item &&
          otherItem.classList.contains('accordion-open')
        ) {
          otherItem.querySelector('.resume-content').style.height = '0';
          otherItem.querySelector('.resume-icon i').className = 'ri-add-line';
          otherItem.classList.remove('accordion-open');
        }
      });
    });
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.resume-item')) {
    accordionItems.forEach((item) => {
      item.classList.remove('accordion-open');
      item.querySelector('.resume-content').style.height = '0';
      item.querySelector('.resume-icon i').className = 'ri-add-line';
    });
  }
});

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form');
const message = document.getElementById('message');

const SUPABASE_URL = 'https://rgwphyerwjlignahtzys.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnd3BoeWVyd2psaWduYWh0enlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTA1NjUsImV4cCI6MjA1NjA4NjU2NX0.wv4dVYU7ZdYhBY-2PfkGiozbbSHYYzTrgJWuz7JMEjw';

const sendFormData = async (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);

  if ([...formData.values()].some((value) => value === '')) {
    message.classList.add('color-red');
    message.textContent = 'Please fill in all the fields.';
    setTimeout(() => (message.textContent = ''), 7000);
    return;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (response.ok) {
      message.classList.add('color-first');
      message.textContent = 'Message sent successfully.';
      contactForm.reset();
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Error:', error);
    message.classList.add('color-red');
    message.textContent = 'Message sent loading. Please Wait';
  }

  setTimeout(() => (message.textContent = ''), 10000);
};

contactForm?.addEventListener('submit', sendFormData);

/*=============== THEME SWITCHER ===============*/
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const root = document.documentElement;

function updateTheme(isDark) {
  body.classList.toggle('dark', isDark);
  root.style.setProperty(
    '--gradient-text',
    isDark
      ? 'var(--gradient-color)'
      : 'linear-gradient(235deg, var(--gradient-text-start), var(--gradient-text-end))'
  );
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

const isDarkTheme = localStorage.getItem('theme') === 'dark';
themeToggle.checked = isDarkTheme;
updateTheme(isDarkTheme);

themeToggle.addEventListener('change', () => updateTheme(themeToggle.checked));

/*=============== MIXITUP ===============*/
var containerEl = document.querySelector('.projects-container');
if (containerEl) {
  var mixer = mixitup(containerEl, {
    selectors: {
      target: '.mix',
    },
    animation: {
      duration: 300,
      easing: 'ease-in-out',
    },
  });
}
