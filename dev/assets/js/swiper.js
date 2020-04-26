var beneficioSwiper = undefined;
function initBeneficioSwiper() {
    if ( (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' || breakpoint === 'xl' ) && (beneficioSwiper == undefined)) {
        beneficioSwiper = new Swiper('.swiper-beneficios', {
        breakpointsInverse: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 30
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 30
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 40
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 50
            }
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        loop: true
    });

    }
}

$( document ).ready(function() {
    initBeneficioSwiper();
});

window.addEventListener('resize', function () {
	initBeneficioSwiper();
}, false);