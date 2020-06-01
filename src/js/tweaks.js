$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > 10);
        var $navbarnav = $(".navbar-nav");
        $navbarnav.toggleClass('scrolled', $(this).scrollTop() > 10);
    });
});