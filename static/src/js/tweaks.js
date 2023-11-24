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
        } else if (burgerMenuButton.classList.contains('collapsed') || (!burgerMenuButton.classList.contains('collapsed') && window.scrollY <= 50)) {
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

const initiateTyping = () => {
    ['name', 'blog', 'code', 'electronics', 'sports', 'music'].forEach(s => {
        if (!document.querySelector(`#typed-${s}-strings`)) return;
        new Typed(`#typed-${s}`, {stringsElement: `#typed-${s}-strings`, typeSpeed: 60, loop: true})
    });
}

const connectedCVBulletPoints = [
    {from: 'timeline-bullet-before-abitur', to: 'timeline-bullet-abitur'},
    {from: 'timeline-bullet-abitur', to: 'timeline-bullet-fsj'},
    {from: 'timeline-bullet-fsj', to: 'timeline-bullet-after-bachelor'},
    {from: 'timeline-bullet-fsj', to: 'timeline-bullet-uni-lpz', color: 'branch-study'},
    {from: 'timeline-bullet-uni-lpz', to: 'timeline-bullet-fhdw', color: 'branch-study'},
    {from: 'timeline-bullet-fhdw', to: 'timeline-bullet-kb', color: 'branch-first-job'},
    {from: 'timeline-bullet-fhdw', to: 'timeline-bullet-bachelor', color: 'branch-study'},
    {from: 'timeline-bullet-bachelor', to: 'timeline-bullet-after-bachelor', color: 'branch-study'},
    {from: 'timeline-bullet-after-bachelor', to: 'timeline-bullet-wismar', color: 'branch-study'},
    {from: 'timeline-bullet-after-bachelor', to: 'timeline-bullet-before-dozent'},
    {from: 'timeline-bullet-before-dozent', to: 'timeline-bullet-after-dozent'},
    {from: 'timeline-bullet-before-dozent', to: 'timeline-bullet-fhdw-dozent', color: 'branch-second-job'},
    {from: 'timeline-bullet-fhdw-dozent', to: 'timeline-bullet-after-dozent', color: 'branch-second-job'},
    {from: 'timeline-bullet-after-dozent', to: 'timeline-bullet-after-master'},
    {from: 'timeline-bullet-wismar', to: 'timeline-bullet-master', color: 'branch-study'},
    {from: 'timeline-bullet-master', to: 'timeline-bullet-after-master', color: 'branch-study'},
    {from: 'timeline-bullet-after-master', to: 'timeline-bullet-currently'},
    {from: 'timeline-bullet-kb', to: 'timeline-bullet-kb-ciso', color: 'branch-first-job'},
    {from: 'timeline-bullet-kb-ciso', to: 'timeline-bullet-first-job-currently', color: 'branch-first-job'},
];

const connectTwoBulletPointsWithLine = (timeline, startPoint, endPoint, color) => {
    const start = document.querySelector(`#${startPoint}`);
    const end = document.querySelector(`#${endPoint}`);

    let connectingSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    connectingSvg.classList.add('connecting-line');

    timeline.appendChild(connectingSvg);

    const connectingLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    connectingLine.classList.add('line');
    if (color) connectingLine.classList.add(color);
    connectingLine.setAttribute('x1', start.offsetLeft + (start.offsetWidth / 2));
    connectingLine.setAttribute('y1', start.offsetTop + (start.offsetHeight / 2));
    connectingLine.setAttribute('x2', end.offsetLeft + (end.offsetWidth / 2));
    connectingLine.setAttribute('y2', end.offsetTop + (end.offsetHeight / 2));
    connectingSvg.appendChild(connectingLine);
};

const connectCVBulletPointsToTimelineTree = () => {
    document.querySelectorAll('.timeline > .connecting-line').forEach(b => b.remove());
    const timeline = document.querySelector('.timeline');
    connectedCVBulletPoints.forEach(tuple => connectTwoBulletPointsWithLine(timeline, tuple.from, tuple.to, tuple.color));
}

let fixedTimelineOnMobile = false;
const hackToFixCvBulletsPositionOnMobile = () => {
    //hack -> on mobile cv bullets are placed in wrong spot, probably due to lazy loading of dom elements, workaround atm - fix me
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting === true) connectCVBulletPointsToTimelineTree();
    }, {threshold: [0.1]});
    observer.observe(document.querySelector("#timeline"));
};

document.addEventListener("DOMContentLoaded", () => {

    initiateTyping();
    toggleNavbarTransparencyByScrollStatus();
    syncAllImageCarousels();

    connectCVBulletPointsToTimelineTree();
    hackToFixCvBulletsPositionOnMobile();

    // set current active paragraph
    new bootstrap.ScrollSpy(document.body, {target: '#navbarNav'});
});
window.addEventListener('resize', () => connectCVBulletPointsToTimelineTree());

// restore scrollstate to page start on reload
window.location.hash = '';
if (history.scrollRestoration) history.scrollRestoration = 'manual';
else {
    window.onbeforeunload = () => {
        document.querySelector('html').style.scrollBehavior = '';
        window.scrollTo(0, 0);
    }
}
