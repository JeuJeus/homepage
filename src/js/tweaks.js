document.addEventListener("DOMContentLoaded", () => {

    //#### Change Navbar Background when page is scrolled more than 50 pixels or burgermenu is opened for readability
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

    const isLocalVersion = () => window.location.pathname.includes('homepage') && window.location.hostname.includes('localhost');

    //Only on main page
    if(window.location.pathname === '/' || isLocalVersion()) {

        //#### Sync all Carousels together for optical perfection
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

        AOS.init({
            offset: 240,
            duration: 200,
            disable: 'mobile'
        });

        //##### Scrollspy
        let scrollSpy = new bootstrap.ScrollSpy(document.body, {target: '#navbarNav'});
    }
});

if (history.scrollRestoration) history.scrollRestoration = 'manual';
else {
    window.onbeforeunload = () => {
        document.querySelector('html').style.scrollBehavior = '';
        window.scrollTo(0, 0);
    }
}

