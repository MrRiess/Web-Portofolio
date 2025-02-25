/*=============== MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle');

/* Menu Show - Hidden */
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
    navToggle.classList.toggle('animate-toggle');
});

/*=============== HEADER FADEOUT ===============*/
const bgHeader = document.querySelector(".bg-header");
function startFadeOut() {
    bgHeader.classList.add("fade-out");
}

setTimeout(startFadeOut, 2000);

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav-link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');

    navToggle.classList.remove('animate-toggle');
    navMenu.classList.remove('show-menu');
};

navLink.forEach((n) => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header');

    this.scrollY >= 20
        ? header.classList.add('bg-header')
        : header.classList.remove('bg-header');
};

window.addEventListener('scroll', scrollHeader);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const sectionClass = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

        if (sectionClass) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sectionClass.classList.add('active-link');
            } else {
                sectionClass.classList.remove('active-link');
            }
        }
    });
};

// Tambahkan event listener untuk scroll
window.addEventListener('scroll', scrollActive);

/*=============== SERVICES SWIPER ===============*/
var servicesSwiper = new Swiper('.services-swiper', {
    spaceBetween: 32,

    pagination: {
        el: '.swiper-pagination',
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

document.addEventListener('click', function(event) {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        if (event.target === popup) {
            closePopup(popup.id);
        }
    });
});

var mixer = mixitup('.projects-container', {
    selectors: {
        target: '.mix',
    },
    animation: {
        duration: 300,
    },
});

/* Active Projects */
const linkProjects = document.querySelectorAll('.projects-item');

function activeProjects() {
    linkProjects.forEach((a) => {
        a.classList.remove('active-projects');
    });
    this.classList.add('active-projects')
};

linkProjects.forEach((a) => a.addEventListener('click', activeProjects));

/*=============== RESUME ===============*/
const accordionItems = document.querySelectorAll('.resume-item');

accordionItems.forEach((item) => {
    const header = item.querySelector('.resume-header'),
          content = item.querySelector('.resume-content'),
          icon = item.querySelector('.resume-icon i');
    
    header.addEventListener('click', () => {
        const isOpen = item.classList.toggle('accordion-open');

        content.style.height = isOpen ? content.scrollHeight + 'px' : '0';
        icon.className = isOpen ? 'ri-subtract-line' : 'ri-add-line';

        accordionItems.forEach((otherItem) => {
            if (otherItem !== item && otherItem.classList.contains('accordion-open')) {
                otherItem.querySelector('.resume-content').style.height = '0';
                otherItem.querySelector(".resume-icon i").classList = 'ri-add-line';
                otherItem.classList.remove('accordion-open');
            }
        });
    });
});

document.addEventListener('click', (event) => {
    const isClickInside = event.target.closest('.resume-item');
    if (!isClickInside) {
        accordionItems.forEach(item => {
            item.classList.remove('accordion-open');
            item.querySelector('.resume-content').style.height = '0';
            item.querySelector(".resume-icon i").className = 'ri-add-line';
        });
    }
});

/*=============== EMAIL JS ===============*/
// const contactForm = document.getElementById('contact-form'),
// contactName = document.getElementById('contact-name'),
// contactEmail = document.getElementById('contact-email'),
// contactSubject = document.getElementById('contact-subject'),
// contactMessage = document.getElementById('contact-message'),
// message = document.getElementById('message');

// const sendEmail = (e) => {
//     e.preventDefault();

//     // Validasi form
//     if (contactName.value === '' || contactEmail.value === '' || contactSubject.value === '' || contactMessage.value === '') {
//         message.classList.remove('color-first');
//         message.classList.add('color-red');
//         message.textContent = 'Please fill in all the fields.';

//         setTimeout(() => {
//             message.textContent = '';
//         }, 3000);
//     } else {
//         // Data form
//         const formData = {
//             name: contactName.value,
//             email: contactEmail.value,
//             subject: contactSubject.value,
//             message: contactMessage.value
//         };

//         // Kirim data ke EmailJS
//         emailjs.sendForm(
//             "service_rmblcto", // Service ID EmailJS
//             "template_7qfnujf", // Template ID EmailJS
//             "#contact-form", // Form ID
//             'E58mVnk7AvZaPera9' // Public Key EmailJS
//         )
//         .then(
//             () => {
//                 // Kirim data ke Google Sheets (backend atau Google Apps Script)
//                 fetch('https://script.google.com/macros/s/AKfycbyQVAUZLnQsWchrZYQJvA0jL4n-0r8Ri5FRx44Y80EJ2vU9Jq20uTUvtB2tf_bPL-ov3Q/exec', {
//                     method: 'POST',
//                     body: JSON.stringify(formData),
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 })
//                 .then(response => response.text())
//                 .then(() => {
//                     message.classList.add('color-first');
//                     message.textContent = 'Message sent successfully.';

//                     setTimeout(() => {
//                         message.textContent = "";
//                     }, 5000);
//                 })
//                 .catch(error => {
//                     console.error('Error saving to spreadsheet:', error);
//                     alert('Failed to save data to spreadsheet. Please try again.');
//                 });
//             },
//             (error) => {
//                 alert('OOPs! SOMETHING WENT WRONG WITH EMAILJS...', error);
//             }
//         );

//         // Reset form
//         contactName.value = '';
//         contactEmail.value = '';
//         contactSubject.value = '';
//         contactMessage.value = '';
//     }
// };

// // Event listener untuk form
// contactForm.addEventListener('submit', sendEmail);

const contactForm = document.getElementById('contact-form'),
    contactName = document.getElementById('contact-name'),
    contactEmail = document.getElementById('contact-email'),
    contactSubject = document.getElementById('contact-subject'),
    contactMessage = document.getElementById('contact-message'),
    message = document.getElementById('message');

const sendFormData = async (e) => {
    e.preventDefault();

    if (contactName.value === '' || contactEmail.value === '' || contactSubject.value === '' || contactMessage.value === '') {
        message.classList.remove('color-first');
        message.classList.add('color-red');
        message.textContent = 'Please fill in all the fields.';

        setTimeout(() => {
            message.textContent = '';
        }, 7000);
        return;
    }

    const formData = {
        name: contactName.value,
        email: contactEmail.value,
        subject: contactSubject.value,
        message: contactMessage.value
    };

    try {
        const response = await fetch('http://localhost:8000/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            message.classList.remove('color-red');
            message.classList.add('color-first');
            message.textContent = 'Message sent successfully.';
            contactForm.reset();
        } else {
            throw new Error(data.error || 'Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        message.classList.add('color-red');
        message.textContent = 'Failed to send message. Please try again.';
    }

    setTimeout(() => {
        message.textContent = '';
    }, 10000);
};

contactForm.addEventListener('submit', sendFormData);

const sendEmail = (e) => {
    e.preventDefault();

    if (contactName.value === '' || contactEmail.value === '' || contactSubject.value === '' || contactMessage.value === '') {
        message.classList.remove('color-first');
        message.classList.add('color-red');
        message.textContent = 'Please fill in all the fields.';

        setTimeout(() => {
            message.textContent = '';
        }, 7000);
        return;
    }

    emailjs.sendForm(
        "service_rmblcto",
        "template_7qfnujf",
        "#contact-form",
        'E58mVnk7AvZaPera9'
    )
    .then(() => {
        message.classList.remove('color-red');
        message.classList.add('color-first');
        message.textContent = 'Message sent successfully.';

        setTimeout(() => {
            message.textContent = "";
        }, 10000);
        contactForm.reset();
    })
    .catch(error => {
        console.error('EmailJS error:', error);
        message.classList.add('color-red');
        message.textContent = 'Failed to send message. Please try again.';
    });
};

contactForm.addEventListener('submit', sendEmail);

/*=============== STYLE SWITCHER ===============*/
const styleSwitcher = document.getElementById('style-switcher'),
    switcherToggle = document.getElementById('switcher-toggle'),
    switcherClose = document.getElementById('switcher-close');

/* Switcher show */
switcherToggle.addEventListener('click', () => {
    styleSwitcher.classList.add('show-switcher');
});

/* Switcher hidden */
switcherClose.addEventListener("click", () => {
    styleSwitcher.classList.remove("show-switcher");
});

/*=============== THEME COLORS ===============*/
const colors = document.querySelectorAll(".style-switcher-color");

colors.forEach((color) => {
    color.onclick = () => {
        const activeColor = color.style.getPropertyValue("--hue")

        colors.forEach((c) => c.classList.remove("active-color"));
        color.classList.add("active-color");

        document.documentElement.style.setProperty("--hue", activeColor);
    };
});

/*=============== LIGHT/DARK MODE ===============*/
let currentTheme = 'light';
document.body.className = currentTheme;

document.querySelectorAll('input[name="body-theme"]').forEach((input) => {
    input.addEventListener('change', () => {
        currentTheme = input.value;
        document.body.className = currentTheme;
    });
});