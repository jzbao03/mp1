const navbar = document.querySelector('#navbar');
const navLinks = document.querySelectorAll('nav a');

function updateNavbar() {
  navbar.classList.toggle('small', window.scrollY > 40);
  let currentSection = 'home';
  navLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section.getBoundingClientRect().top <= navbar.offsetHeight + 10) {
      currentSection = section.id;
    }
  });
  // Contact is short, so it may never reach the top of the window.
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) {
    currentSection = 'contact';
  }
  navLinks.forEach(link => {
    if (link.hash === '#' + currentSection) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', updateNavbar, { passive: true });
window.addEventListener('resize', updateNavbar);
window.addEventListener('load', updateNavbar);
navbar.addEventListener('transitionend', updateNavbar);
updateNavbar();

const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
function showSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  currentSlide = index;
  slides.forEach((slide, i) => {
    slide.hidden = i !== currentSlide;
  });
  document.querySelector('#slide-number').textContent = (currentSlide + 1) + ' / ' + slides.length;
}
document.querySelector('.previous').addEventListener('click', () => showSlide(currentSlide - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(currentSlide + 1));
document.querySelector('.carousel').addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    showSlide(currentSlide + (event.key === 'ArrowRight' ? 1 : -1));
  }
});

const dialog = document.querySelector('#project-dialog');
let lastButton;
document.querySelectorAll('.details').forEach(button => {
  button.addEventListener('click', () => {
    lastButton = button;
    const title = button.parentElement.querySelector('h3').textContent;
    document.querySelector('#dialog-title').textContent = title;
    document.querySelector('#dialog-description').textContent = button.dataset.description;
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right ||
      event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  lastButton.focus({ preventScroll: true });
});

// The close button is the popup's only interactive element.
dialog.addEventListener('keydown', event => {
  if (event.key === 'Tab') {
    event.preventDefault();
    document.querySelector('#close-dialog').focus();
  }
});
