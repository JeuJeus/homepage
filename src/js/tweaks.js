const toggleNavbarTransparencyByScrollStatus = () => {

    const navbar = document.querySelector('.navbar');
    const navbarNav = document.querySelector('.navbar-nav');
    const burgerMenu = document.querySelector('.navbar-toggler-icon');
    const burgerMenuButton = document.querySelector('.navbar-toggler');

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
        } else if(burgerMenuButton.classList.contains('collapsed')){
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
    if(typeof AOS === 'undefined') return;
    AOS.init({
        offset: 240,
        duration: 200,
        disable: 'mobile'
    });
};

const MY_BIRTH_DATE = '1998-02-24';
const MILLISECONDS_PER_YEAR = 3.15576e+10;
const getAge = () => Math.floor((new Date() - new Date(MY_BIRTH_DATE).getTime()) / MILLISECONDS_PER_YEAR);

const setMyCurrentAge = () => {
    let aboutMeP = document.getElementById('#about-me');
    if (!aboutMeP) return;

    aboutMeP.innerText = aboutMeP.innerText.replace('${MY_AGE}', getAge());
};

const hackToSetDynamicHeightOfTypedHeadings = (s) => {
    let typedHeadingDom = document.querySelector(`#typed-${s}-content`);
    let typedHeading = document.querySelector(`#typed-${s}-heading`);
    if (!typedHeadingDom || !typedHeading) return;

    typedHeadingDom.style.display = 'block';
    typedHeading.style.height = typedHeadingDom.getBoundingClientRect().height + 'px';
    typedHeadingDom.style.display = 'hidden';
};

const initiateTyping = () => {
    const toType = ['name', 'code', 'electronics', 'sports', 'music'];

    toType.forEach(s => hackToSetDynamicHeightOfTypedHeadings(s));
    toType.forEach(s => {
        if(!document.querySelector(`#typed-${s}-strings`)) return;
        new Typed(`#typed-${s}`, {stringsElement: `#typed-${s}-strings`, typeSpeed: 60, loop: true})
    });
}

const mutationObserverCvBugFix = () => {
    //TODO fix this bug -> the CV item in navbar is being set to active by $unclear when page is loaded
    //seen when cv-table size is too long, only in firefox
    let cvNavItem = document.getElementById('cv-nav-item');
    if (!cvNavItem) return;
    const observer = new MutationObserver(mutations => {
        mutations.forEach((mutation) => {
            let targetClassList = mutation.target.classList;
            if (window.scrollY <= 50 && targetClassList.contains('active')) targetClassList.remove('active')
        });
    });
    observer.observe(cvNavItem, {attributes: true, childList: false, characterData: true});
};

document.addEventListener("DOMContentLoaded", () => {

    setMyCurrentAge();
    initiateTyping();
    toggleNavbarTransparencyByScrollStatus();
    syncAllImageCarousels();
    initAnimationsOnScroll();

    // set current active paragraph
    new bootstrap.ScrollSpy(document.body, {target: '#navbarNav'});
    mutationObserverCvBugFix();
});

// restore scrollstate to page start on reload
window.location.hash = '';
if (history.scrollRestoration) history.scrollRestoration = 'manual';
else {
    window.onbeforeunload = () => {
        document.querySelector('html').style.scrollBehavior = '';
        window.scrollTo(0, 0);
    }
}
