function scrollSlider(id, distance) {
    const slider = document.getElementById(id);
    slider.scrollBy({ left: distance, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#') && href !== '#') {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const collapse = document.getElementById('navbarMenu');
            if (collapse && bootstrap.Collapse.getInstance(collapse)) {
                bootstrap.Collapse.getInstance(collapse).hide();
            }
        }
    });
});

// === ARRASTRE EN POLAROID SLIDER ===
const polaroidSlider = document.getElementById('polaroid-slider');
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