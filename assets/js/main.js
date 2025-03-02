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
    section.classList.toggle(
      'active',
      top < window.innerHeight * 1 && bottom > 0
    );
  });
};

window.addEventListener('scroll', revealOnScroll);
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
let certificateSwiper = null;

const openPopup = (popupId) => {
  const popup = document.getElementById(popupId);
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  popup.classList.add('active');
  overlay.classList.add('active');

  if (!certificateSwiper) {
    certificateSwiper = new Swiper('.certificate-swiper', {
      spaceBetween: 32,
      loop: true,
      pagination: { el: '.swiper-pagination', clickable: true },
    });
  }

  overlay.addEventListener('click', () => closePopup(popupId));
  document.addEventListener('keydown', handleKeyDown);
};

const closePopup = (popupId) => {
  const popup = document.getElementById(popupId);
  const overlay = document.querySelector('.overlay');
  popup?.classList.remove('active');
  overlay?.classList.remove('active');
  setTimeout(() => overlay?.remove(), 300);
  document.removeEventListener('keydown', handleKeyDown);
};

const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup.active');
    activePopup && closePopup(activePopup.id);
  }
};

/*=============== ACTIVE PROJECTS ===============*/
const linkProjects = document.querySelectorAll('.projects-item');

linkProjects.forEach((a) =>
  a.addEventListener('click', () => {
    linkProjects.forEach((item) => item.classList.remove('active-projects'));
    a.classList.add('active-projects');
  })
);

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

/*=============== STYLE SWITCHER ===============*/
const styleSwitcher = document.getElementById('style-switcher');
const switcherToggle = document.getElementById('switcher-toggle');
const switcherClose = document.getElementById('switcher-close');

const openSwitcher = () => styleSwitcher?.classList.add('show-switcher');
const closeSwitcher = () => styleSwitcher?.classList.remove('show-switcher');

switcherToggle?.addEventListener('click', openSwitcher);
switcherClose?.addEventListener('click', closeSwitcher);

document.addEventListener('click', (event) => {
  if (
    styleSwitcher?.classList.contains('show-switcher') &&
    !styleSwitcher.contains(event.target) &&
    !switcherToggle.contains(event.target)
  ) {
    closeSwitcher();
  }
});

document.addEventListener('keydown', (event) => {
  if (
    event.key === 'Escape' &&
    styleSwitcher?.classList.contains('show-switcher')
  ) {
    closeSwitcher();
  }
});

/*=============== THEME COLORS ===============*/
const colors = document.querySelectorAll('.style-switcher-color');

colors.forEach((color) => {
  color.addEventListener('click', () => {
    const activeColor = color.style.getPropertyValue('--hue');
    colors.forEach((c) => c.classList.remove('active-color'));
    color.classList.add('active-color');
    document.documentElement.style.setProperty('--hue', activeColor);
    document.documentElement.style.setProperty(
      '--gradient-start',
      `hsl(${activeColor}, 70%, 50%)`
    );
    document.documentElement.style.setProperty(
      '--gradient-end',
      `hsl(${parseInt(activeColor) + 45}, 70%, 50%)`
    );
  });
});

/*=============== LIGHT/DARK MODE ===============*/
let currentTheme = 'light';
document.body.className = currentTheme;

document.querySelectorAll('input[name="body-theme"]').forEach((input) => {
  input.addEventListener('change', () => {
    currentTheme = input.value;
    document.body.className = currentTheme;
    document.documentElement.style.setProperty(
      '--gradient-text',
      currentTheme === 'dark'
        ? 'var(--gradient-color)'
        : 'linear-gradient(235deg, var(--gradient-text-start), var(--gradient-text-end))'
    );
  });
});
