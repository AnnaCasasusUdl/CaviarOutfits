document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.textContent = '☰';
            });
        });
    }

    // Welcome Modal Functionality
    const welcomeModal = document.querySelector('#welcomeModal');
    const modalClose = document.querySelector('.modal-close');

    if (welcomeModal && window.location.pathname.endsWith('1.index.html')) {
        if (!localStorage.getItem('hasVisitedIndex')) {
            welcomeModal.style.display = 'flex';
            localStorage.setItem('hasVisitedIndex', 'true');
        }

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                welcomeModal.style.display = 'none';
            });
        }

        welcomeModal.addEventListener('click', (e) => {
            if (e.target === welcomeModal) {
                welcomeModal.style.display = 'none';
            }
        });
    }

    // Slider Rotation Logic
    const sliderImages = document.querySelectorAll('.slider img');
    let currentImageIndex = 0;

    function showNextImage() {
        sliderImages.forEach(img => img.classList.remove('active'));
        sliderImages[currentImageIndex].classList.add('active');
        currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
    }

    if (sliderImages.length > 0) {
        sliderImages[0].classList.add('active');
        setInterval(showNextImage, 5000);
    }

    // Full-Screen Image Enlargement Logic
    const highlightImages = document.querySelectorAll('.highlight-grid img');
    console.log('Imágenes destacadas encontradas:', highlightImages);
    if (highlightImages.length === 0) {
        console.warn('No se encontraron imágenes en .highlight-grid');
    }

    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');

    if (modal && modalContent) {
        const modalImage = document.createElement('img');
        modalImage.classList.add('modal-image');
        const closeButton = document.createElement('button');
        closeButton.classList.add('modal-close-image');
        closeButton.textContent = 'X';

        modalContent.appendChild(modalImage);
        modalContent.appendChild(closeButton);

        highlightImages.forEach(img => {
            img.addEventListener('click', () => {
                modalContent.classList.add('image-modal');
                modalImage.src = img.src;
                modal.style.display = 'flex';
            });
        });

        modalImage.addEventListener('click', () => {
            modal.style.display = 'none';
            modalContent.classList.remove('image-modal');
        });

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            modalContent.classList.remove('image-modal');
        });
    }

    // Registration Form Validation
    const registerForm = document.querySelector('#registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const confirmPassword = document.querySelector('#confirm-password').value;

            const errorEmail = document.querySelector('#error-email');
            const errorPasswordMatch = document.querySelector('#error-password-match');

            let isValid = true;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (!emailRegex.test(email)) {
                errorEmail.textContent = 'El correu electrònic no és vàlid. Ha de contenir @ i un domini vàlid (ex: domini.ext)';
                errorEmail.style.display = 'block';
                isValid = false;
            } else {
                errorEmail.style.display = 'none';
            }

            if (password !== confirmPassword) {
                errorPasswordMatch.textContent = 'Les contrasenyes no coincideixen';
                errorPasswordMatch.style.display = 'block';
                isValid = false;
            } else {
                errorPasswordMatch.style.display = 'none';
            }

            if (isValid) {
                alert('Registre completat amb èxit!');
                registerForm.reset();
            }
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
                error.classList.remove('active');
            });

            const name = document.getElementById('name').value.trim();
            if (!name) {
                document.getElementById('nameError').textContent = 'El nom és obligatori.';
                document.getElementById('nameError').classList.add('active');
                isValid = false;
            }

            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (!email) {
                document.getElementById('emailError').textContent = 'El correu electrònic és obligatori.';
                document.getElementById('emailError').classList.add('active');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Introdueix un correu electrònic vàlid (ex: nom@domini.ext).';
                document.getElementById('emailError').classList.add('active');
                isValid = false;
            }

            const message = document.getElementById('message').value.trim();
            if (!message) {
                document.getElementById('messageError').textContent = 'El missatge és obligatori.';
                document.getElementById('messageError').classList.add('active');
                isValid = false;
            }

            if (isValid) {
                console.log({
                    name,
                    email,
                    subject: document.getElementById('subject').value.trim(),
                    message
                });
                alert('Formulari enviat correctament! (Dades al consola)');
                contactForm.reset();
            }
        });
    }

    // Flip Card Click Support for Touch Devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const flipInner = item.querySelector('.flip-card-inner');
            if (flipInner) {
                item.addEventListener('click', (e) => {
                    if (e.target.tagName !== 'A') {
                        flipInner.classList.toggle('flipped');
                    }
                });
            }
        });
    }
});