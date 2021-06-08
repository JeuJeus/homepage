document.addEventListener("DOMContentLoaded", () => {

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
        if (window.scrollY > 300) {
            navbar.classList.add('scrolled');
            navbarNav.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
            navbarNav.classList.remove('scrolled');
        }
    };

});

$('.carousel-sync').carousel('cycle');
$('.carousel-sync').on('click', '.carousel-control[data-slide]', function (ev) {
    ev.preventDefault();
    $('.carousel-sync').carousel($(this).data('slide'));
});
$('.carousel-sync').on('mouseover', function (ev) {
    ev.preventDefault();
    $('.carousel-sync').carousel('pause');
});
$('.carousel-sync').on('mouseleave', function (ev) {
    ev.preventDefault();
    $('.carousel-sync').carousel('cycle');
});
