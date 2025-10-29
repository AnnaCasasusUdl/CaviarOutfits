// === SCROLL SUAVE PARA SLIDERS ===
function scrollSlider(id, distance) {
    const slider = document.getElementById(id);
    if (slider) {
        slider.scrollBy({ left: distance, behavior: 'smooth' });
    }
}

// === SCROLL SUAVE EN ANCLAS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#') && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            const collapse = document.getElementById('navbarMenu');
            if (collapse && bootstrap.Collapse.getInstance(collapse)) {
                bootstrap.Collapse.getInstance(collapse).hide();
            }
        }
    });
});

// === ARRASTRE EN POLAROID SLIDER ===
const polaroidSlider = document.getElementById('polaroid-slider');
if (polaroidSlider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    polaroidSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        polaroidSlider.style.cursor = 'grabbing';
        startX = e.pageX - polaroidSlider.offsetLeft;
        scrollLeft = polaroidSlider.scrollLeft;
    });

    polaroidSlider.addEventListener('mouseleave', () => {
        isDown = false;
        polaroidSlider.style.cursor = 'grab';
    });

    polaroidSlider.addEventListener('mouseup', () => {
        isDown = false;
        polaroidSlider.style.cursor = 'grab';
    });

    polaroidSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - polaroidSlider.offsetLeft;
        const walk = (x - startX) * 2;
        polaroidSlider.scrollLeft = scrollLeft - walk;
    });
}

// === MODO OSCURO ===
const darkModeToggle = document.querySelector('#darkModeToggle a');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
        } else {
            icon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
        }

        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    }
}

// === ANIMACIÓN HORIZONTAL CON GSAP (TICKER) ===
document.addEventListener('DOMContentLoaded', function () {
    const ticker = document.querySelector('.ticker-content');
    if (!ticker) return;

    const clone = ticker.cloneNode(true);
    document.getElementById('ticker').appendChild(clone);

    gsap.to([ticker, clone], {
        x: "-50%",
        duration: 20,
        ease: "none",
        repeat: -1,
        modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % (ticker.offsetWidth / 2))
        }
    });
});