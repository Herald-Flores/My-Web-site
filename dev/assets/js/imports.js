// Import jQuery
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

// Import libraries
var bootstrap = require('bootstrap');
require('paroller.js');
import WOW from 'wow.js';
import Swiper from 'swiper';  
let owl_carousel = require('owl.carousel');
window.fn = owl_carousel;

const ScrollReveal = require('scrollreveal')

// FALSE in production.
const debug = true;

// Console log functions
function log(message) {
    if (debug) { 
        console.info(message);
    }
}
function table(message) {
    if (debug) { 
        console.table(message);
    }
}
function warn(message) {
    if (debug) { 
        console.warn(message);
    }
}
function error(message) {
    if (debug) { 
        console.error(message);
    }
}

$('.navbar-toggler').click(function () {
    $(this).toggleClass('active');
    $('.collapse').toggleClass('show');
    $('html, body').toggleClass('not-scroll');

    var btns = header.getElementsByClassName("nav-item");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
            $('html, body').removeClass('not-scroll');
            $('.collapse').removeClass('show');
        });
    }
});

var header = document.getElementById("navbarNavDropdown");
var btns = header.getElementsByClassName("nav-item");
for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}



//Scoll Reveal & CountUp
let srDelay = 200;
let srDuration = 2000;
ScrollReveal().reveal('.sreveal-3ms', {
    origin: 'bottom',
    distance: '10px',
    delay: 300,
    duration: srDuration,
    ease: 'ease',
    viewFactor: .1,
    mobile: false,
    //reset: true
})

let srDelay1s = 200;
let srDuration1s = 2000;
ScrollReveal().reveal('.sreveal-1s', {
    origin: 'bottom',
    distance: '15px',
    delay: 1000,
    duration: srDuration,
    ease: 'ease',
    viewFactor: .1,
    mobile: false,
    //reset: true
})
/*
* From Left to right
*/
ScrollReveal().reveal('.sreveal-lr', {
    origin: 'left',
    distance: '15px',
    delay: srDelay,
    duration: srDuration,
    ease: 'ease',
    viewFactor: .1,
    mobile: false,
    //reset: true
})
/*
* From Left to right
*/
ScrollReveal().reveal('.sreveal-rl', {
    origin: 'right',
    distance: '15px',
    delay: srDelay,
    duration: srDuration,
    ease: 'ease',
    viewFactor: .1,
    mobile: false,
    //reset: true
})
ScrollReveal().reveal('.sreveal-hero', {
    origin: 'bottom',
    distance: '70px',
    delay: srDelay,
    duration: srDuration,
    ease: 'ease',
    mobile: true,
    reset: true
})


//Check if browser is IE
var ie= "";
if (navigator.userAgent.search("MSIE") >= 0) {
    ie ="IE11";
}
var timescroll;

$('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        if(!$(this).hasClass('no-animate')){
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            event.preventDefault();
                if(ie === "IE11"){
                    timescroll= 1800;
                }else{
                    timescroll= 1300;
                }
                $('html, body').animate({
                    scrollTop: target.offset().top-50
                }, timescroll, function() {
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                    return false;
                } else {
                    $target.attr('tabindex','-1'); 
                    $target.focus(); 
                };
            });
        }
            }
        }
});

// World countries array 
// { name, topLevelDomain, alpha2Code, alpha3Code, callingCodes, capital, altSpellings, region, subregion
// population, latlng, demonym, area, gini, timezones, borders, nativeName, numericCode, currencies, languages
// translations, flag, regionalBlocs, cioc }
// const countries = new Request('assets/data/countries-full.json');
// fetch(countries)
//     .then(response => response.json())
//     .then(data => {
//         //table(data)
//         for (const country of data) {
//             //log(country.name)
//         }
//     }).catch(err => error(err));