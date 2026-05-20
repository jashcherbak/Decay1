// 1. Управление бургер-меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links li');

function closeMenu() {
    nav.classList.remove('active');
    burger.classList.remove('toggle');
}

burger.addEventListener('click', (e) => {
    e.stopPropagation(); 
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
});

navItems.forEach(item => {
    item.addEventListener('click', closeMenu);
});

window.addEventListener('click', (e) => {
    if (nav.classList.contains('active')) {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            closeMenu();
        }
    }
});

nav.addEventListener('click', (e) => {
    e.stopPropagation();
});

// 2. Анимация появления элементов при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.hidden').forEach(el => {
    observer.observe(el);
});

// 3. Контроль автозапуска фонового видео
const bgVideo = document.querySelector('.hero-video');

if (bgVideo) {
    window.addEventListener('DOMContentLoaded', () => {
        bgVideo.play().catch(error => {
            console.log("Автозапуск фонового видео заблокирован браузером:", error);
        });
    });
}

// 4. Управление интерактивным видео в секции "О игре"
const videoWrapper = document.querySelector('.video-container');
const aboutVideo = document.getElementById('about-video');
const playBtn = document.getElementById('play-button');

if (videoWrapper && aboutVideo && playBtn) {
    function togglePlay() {
        if (aboutVideo.paused) {
            aboutVideo.play();
            videoWrapper.classList.add('playing');
        } else {
            aboutVideo.pause();
            videoWrapper.classList.remove('playing');
        }
    }

    playBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        togglePlay();
    });

    videoWrapper.addEventListener('click', togglePlay);

    aboutVideo.addEventListener('ended', () => {
        videoWrapper.classList.remove('playing');
    });
}
