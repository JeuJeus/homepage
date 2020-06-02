$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > 10);
        var $navbarnav = $(".navbar-nav");
        $navbarnav.toggleClass('scrolled', $(this).scrollTop() > 10);
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