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