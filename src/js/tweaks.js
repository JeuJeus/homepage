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


    //#### Sync all Carousels together for optical perfection
    const carousels = document.querySelectorAll('.carousel-sync');
    let carouselsLock = new WeakSet();

    let slideAllCarousels = (direction,cyclingCarousel) => {
        carousels.forEach(carousel => {
            if(carousel === cyclingCarousel || carouselsLock.has(carousel)) return;

            carouselsLock.add(carousel);

            let carouselInstance = bootstrap.Carousel.getInstance(carousel);
            if(direction === 'left') carouselInstance.next();
            else carouselInstance.prev();
        });
    }

    carousels.forEach(c =>
        c.addEventListener('slid.bs.carousel',()=> carouselsLock.delete(c)));

    carousels.forEach(c=>
        c.addEventListener('slide.bs.carousel', (e) => slideAllCarousels(e.direction,c)));


    // $('.carousel-sync').carousel('cycle');
    // $('.carousel-sync').on('click', '.carousel-control[data-slide]', function (ev) {
    //     ev.preventDefault();
    //     $('.carousel-sync').carousel($(this).data('slide'));
    // });
    // $('.carousel-sync').on('mouseover', function (ev) {
    //     ev.preventDefault();
    //     $('.carousel-sync').carousel('pause');
    // });
    // $('.carousel-sync').on('mouseleave', function (ev) {
    //     ev.preventDefault();
    //     $('.carousel-sync').carousel('cycle');
    // });

});


