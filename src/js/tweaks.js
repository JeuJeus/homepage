$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        var $navbarnav = $(".navbar-nav");
        $navbarnav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});