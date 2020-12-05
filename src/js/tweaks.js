$(function () {
    const nav = $('.navbar');
    const navbarnav = $(".navbar-nav");

    $(document).scroll(function () {
        nav.toggleClass('scrolled', $(this).scrollTop() > 10);
        navbarnav.toggleClass('scrolled', $(this).scrollTop() > 10);
    });

    const burgerMenu = $('.navbar-toggler-icon');

    burgerMenu.click(function () {
        nav.toggleClass('scrolled', !nav.hasClass('scrolled'));
        navbarnav.toggleClass('scrolled', !navbarnav.hasClass('scrolled'));
    });
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
