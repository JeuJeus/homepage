const toggleNavbarTransparencyByScrollStatus = () => {

    const navbar = document.querySelector('.navbar');
    const navbarNav = document.querySelector('.navbar-nav');
    const burgerMenu = document.querySelector('.navbar-toggler-icon');

    burgerMenu.addEventListener('click', () => {
        if (!navbar.classList.contains('scrolled') && !navbarNav.classList.contains('scrolled')) {
            navbar.classList.toggle('scrolled');
            navbarNav.classList.toggle('scrolled');
        }
    });

    window.onscroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbarNav.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
            navbarNav.classList.remove('scrolled');
        }
    };
};

const syncAllImageCarousels = () => {
    const carousels = document.querySelectorAll('.carousel-sync');
    let carouselsLock = new WeakSet();

    let slideAllCarousels = (direction, cyclingCarousel) => {
        carousels.forEach(carousel => {
            if (carousel === cyclingCarousel || carouselsLock.has(carousel)) return;

            carouselsLock.add(carousel);

            let carouselInstance = bootstrap.Carousel.getInstance(carousel);
            if (direction === 'left') carouselInstance.next();
            else carouselInstance.prev();
        });
    }

    let pauseAllCarouselsOnHover = () => carousels.forEach(c => bootstrap.Carousel.getInstance(c).pause());
    let cycleAllCarouselsOnHoverLeave = () => carousels.forEach(c => bootstrap.Carousel.getInstance(c).cycle());

    carousels.forEach(c => {
        c.addEventListener('slid.bs.carousel', () => carouselsLock.delete(c));
        c.addEventListener('slide.bs.carousel', (e) => slideAllCarousels(e.direction, c));
        c.addEventListener('mouseover', () => pauseAllCarouselsOnHover());
        c.addEventListener('mouseleave', () => cycleAllCarouselsOnHoverLeave());
    });
};

const initAnimationsOnScroll = () => {
    AOS.init({
        offset: 240,
        duration: 200,
        disable: 'mobile'
    });
};

const isLocalVersion = () => window.location.pathname.includes('homepage') && window.location.hostname.includes('localhost');

const MY_BIRTH_DATE = '1998-02-24';
const MILLISECONDS_PER_YEAR = 3.15576e+10;
const getAge = () => Math.floor((new Date() - new Date(MY_BIRTH_DATE).getTime()) / MILLISECONDS_PER_YEAR);

const setMyCurrentAge = () => {
    let aboutMeP = document.getElementById('#about-me');
    aboutMeP.innerText = aboutMeP.innerText.replace('${MY_AGE}', getAge());
};

document.addEventListener("DOMContentLoaded", () => {

    setMyCurrentAge();

    toggleNavbarTransparencyByScrollStatus();

    if(window.location.pathname === '/' || isLocalVersion()) {
        syncAllImageCarousels();
        initAnimationsOnScroll();
    }
});

//restore scrollstate to page start on reload
if (history.scrollRestoration) history.scrollRestoration = 'manual';
else {
    window.onbeforeunload = () => {
        document.querySelector('html').style.scrollBehavior = '';
        window.scrollTo(0, 0);
    }
}

