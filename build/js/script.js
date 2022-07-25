// ------------------------------
// ---- HEADER MOBILE SCRIPT ----
// ------------------------------

let headerBtn = document.querySelector('.header__nav-mobile__button-wrapper')

headerBtn.onclick = function() {
    if (document.querySelector('.header__nav-mobile').classList.contains('h_m-close')) {
        document.querySelector('.header__nav-mobile').classList.add('h_m-open')
        document.querySelector('.header__nav-mobile').classList.remove('h_m-close')
    } else {
        document.querySelector('.header__nav-mobile').classList.remove('h_m-open')
        document.querySelector('.header__nav-mobile').classList.add('h_m-close')
    }
}

document.querySelectorAll('.header__nav-link').forEach(item => {
    item.addEventListener('click', event => {
        headerBtn.click()
    })
})

// -----------------------
// ---- HEADER SCRIPT ----
// -----------------------


let headerDesktop = document.querySelector('.header__nav')

window.addEventListener('scroll', function() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        headerDesktop.style.background = 'rgb(238, 238, 238, 0.7)'
        headerDesktop.style.backDropFilter = 'rgb(238, 238, 238, 0.7)'
    } else {
        headerDesktop.style.background = 'rgb(238, 238, 238, 0)'
    }
})

let headerPlay = document.querySelector('.header__content-button_play')

headerPlay.onclick = function() {
    document.querySelector('.gallery__wrapper').scrollIntoView({behavior: "smooth"})
    document.querySelector('.poly').classList.add('poly-active')
    setTimeout(() => {
        document.querySelector('.poly').classList.remove('poly-active')
    }, 3000)    
    document.querySelector('.contact__modal').style.display = 'flex'
}

window.onscroll = function() {
    document.querySelector('.header__scrolldown').classList.add('header__scrolldown-hide')
    document.querySelector('.header__scrolldown').classList.remove('header__scrolldown-display')
}

setTimeout(() => {
    document.querySelector('.header__scrolldown').classList.add('header__scrolldown-display')
    document.querySelector('.header__scrolldown').classList.remove('header__scrolldown-hide')
    console.log('2sec')
}, 8000) 

// -----------------------------------
// ---- HEADER -- DYNAMIC -- TEXT ----
// -----------------------------------

const dynamic = document.getElementById('header-message'),

messages = [
  'Web Designer',
  'Digital Designer',
  'Video Editor',
  'PR Manager',
  'Gamer',
  'person you should hire!'
]
let currentMessage = 0
function typeMessage() {
  if (!messages[currentMessage]) {
    currentMessage = 0
  }
  const currentStr = messages[currentMessage]
  currentStr.split()
  let part = ''
  let currentLetter = 0;
  let int1 = setInterval(()=>{
    if (!currentStr[currentLetter]) {
      currentMessage++
      setTimeout(()=>{
        deleteMessage(part)
      }, 3500);
      clearInterval(int1)
    } else {
      part += currentStr[currentLetter++]
      dynamic.innerHTML = part
    }
  }, 100)
}
function deleteMessage(str) {
  let int = setInterval(()=>{
    if (str.length === 0) {
      setTimeout(()=>{
        typeMessage()
      }, 500)
      clearInterval(int)
    } else {
      str = str.split('')
      str.pop()
      str = str.join('')
      dynamic.innerHTML = str
    }
  }, 50)
}

typeMessage()

// -------------------
// ----- COUNTER -----
// -------------------

let counterOffers = document.getElementById('counter_offers')
let counterPercentage = document.getElementById('counter_percentage')
let counterYears = document.getElementById('counter_years')
let counterAwards = document.getElementById('counter_awards')

function animateCounter(element, target, number, delay) {
    if(number < target) {
        let interval = setInterval(function() {
            element.textContent = number
            if (target >= number) {
                number++; 
            } else {
                clearInterval(interval)
            }
        }, delay);
    }
}

$(window).on('scroll',function() { // on scroll
    let windowHeight = window.innerHeight
    let countersWrapperTop = document.querySelector('.counter__wrapper').offsetTop
    var IsDone = false;
    if (document.body.scrollTop >= countersWrapperTop - windowHeight || document.documentElement.scrollTop >= countersWrapperTop - windowHeight ) {
        animateCounter(counterOffers, 100, 0, 50)
        animateCounter(counterPercentage, 87, 0, 50)
        animateCounter(counterYears, 6, 0, 200)
        animateCounter(counterAwards, 24, 0, 100)
        $(window).off('scroll'); // stop repeating function after scrolling
    } else {

    }
})

// -------------------
// ----- GALLERY -----
// -------------------


function filterSelection(c) {
  let x = document.getElementsByClassName("gallery__content-item")
  for (let i = 0; i < x.length; i++) {
    removeClass(x[i], "gallery__show") 
    addClass(x[i], "gallery__hide") 
    if (x[i].className.indexOf(c) > -1) {
        addClass(x[i], "gallery__show")
        removeClass(x[i], "gallery__hide") 
    }
  }
}

function addClass(element, name) {
  let arr1 = element.className.split(" ");
  let arr2 = name.split(" ")
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i]
    }
  }
}

function removeClass(element, name) {
  let arr1 = element.className.split(" ")
  let arr2 = name.split(" ")
  for (let i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);    
    }
  }
  element.className = arr1.join(" ")
}


document.getElementById('gallery__btn-media').onclick = function() {
    filterSelection('gallery__category-media')
    if (window.matchMedia("(max-width: 633px)").matches) {
        document.querySelector('.gallery__nav-underline').style.marginTop = '300px'
        document.querySelector('.gallery__nav-underline').style.marginLeft = '0%'
    } else {
        document.querySelector('.gallery__nav-underline').style.marginLeft = '25%'
    }
}
document.getElementById('gallery__btn-frontend').onclick = function() {
    filterSelection('gallery__category-frontend') 
    if (window.matchMedia("(max-width: 633px)").matches) {
        document.querySelector('.gallery__nav-underline').style.marginTop = '450px'
        document.querySelector('.gallery__nav-underline').style.marginLeft = '0%'
    } else {
        document.querySelector('.gallery__nav-underline').style.marginLeft = '50%'
    }
}
document.getElementById('gallery__btn-design').onclick = function() {
    filterSelection('gallery__category-design') 
    if (window.matchMedia("(max-width: 633px)").matches) {
        document.querySelector('.gallery__nav-underline').style.marginTop = '600px'
        document.querySelector('.gallery__nav-underline').style.marginLeft = '0%'
    } else {
        document.querySelector('.gallery__nav-underline').style.marginLeft = '75%'
    }
}

document.getElementById('gallery__btn-all').onclick = function() {
    for (let i = 0; i <= document.getElementsByClassName('gallery__content-item').length; i++) {
        document.getElementsByClassName('gallery__content-item')[i].classList.add('gallery__show')
        document.getElementsByClassName('gallery__content-item')[i].classList.remove('gallery__hide')
        if (window.matchMedia("(max-width: 633px)").matches) {
            document.querySelector('.gallery__nav-underline').style.marginTop = '150px'
            document.querySelector('.gallery__nav-underline').style.marginLeft = '0%'
        } else {
            document.querySelector('.gallery__nav-underline').style.marginLeft = '0%'
        }
    }
}



for (let i = 0; i < document.querySelectorAll('.gallery__item-more').length; i++) {
    document.getElementsByClassName('gallery__content-more-open')[i].onclick = function() {
        document.getElementsByClassName('gallery__item-more')[i].classList.add('gallery__item-more-display')
        document.getElementsByClassName('gallery__item-more')[i].classList.remove('gallery__item-more-hide')
    }
    document.getElementsByClassName('gallery__content-item-span')[i].onclick = function() {
        document.getElementsByClassName('gallery__item-more')[i].classList.add('gallery__item-more-display')
        document.getElementsByClassName('gallery__item-more')[i].classList.remove('gallery__item-more-hide')
    }
    document.getElementsByClassName('gallery__content-more-close')[i].onclick = function() {
        document.getElementsByClassName('gallery__item-more')[i].classList.remove('gallery__item-more-display')
        document.getElementsByClassName('gallery__item-more')[i].classList.add('gallery__item-more-hide')
    }
}


console.log(document.querySelectorAll('.gallery__content-item').length)

// -------------------
// ---- SERVICE ------
// -------------------


for (let i = 0; i<3; i++) {
    document.getElementsByClassName('service__content-item-more')[i].onclick = function() {
        if (document.getElementsByClassName('service__content-item')[i].classList.contains('service__content-item-close')) {
            document.getElementsByClassName('service__content-item')[i].classList.add('service__content-item-open')
            document.getElementsByClassName('service__content-item')[i].classList.remove('service__content-item-close')
        } else {
            document.getElementsByClassName('service__content-item')[i].classList.remove('service__content-item-open')
            document.getElementsByClassName('service__content-item')[i].classList.add('service__content-item-close')
        }
    }
}

// --------------------
// ----- CONTACTS -----
// --------------------

document.querySelector('.hire__location-text').onclick = function() {
    if (document.querySelector('.hire__additional').classList.contains('hire__additional-close')) {
        document.querySelector('.hire__additional').classList.add('hire__additional-open')
        document.querySelector('.hire__additional').classList.remove('hire__additional-close')
        document.querySelector('.hire__item-arrow').style.transform = 'rotate(90deg)'
    } else {
        document.querySelector('.hire__additional').classList.add('hire__additional-close')
        document.querySelector('.hire__additional').classList.remove('hire__additional-open')
        document.querySelector('.hire__item-arrow').style.transform = 'rotate(0deg)'

    }
    console.log(1)
}

// Google Map

function myMap() {
    let mapProp= {
      center:new google.maps.LatLng(51.508742,-0.120850),
      zoom:5,
    }
    let map = new google.maps.Map(document.getElementById('googleMap'),mapProp);
}
    

// Navigation stuff (e.g go to element onclick)

document.querySelector('.header__content-button_contact').onclick = () => {
    document.querySelector('.hire__wrapper').scrollIntoView({behavior: "smooth"})
}
document.querySelector('.about__button').onclick = () => {
    document.querySelector('.hire__wrapper').scrollIntoView({behavior: "smooth"})
}

document.querySelectorAll('.service__button').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelector('.hire__wrapper').scrollIntoView({behavior: "smooth"})
    })
})

document.querySelectorAll('.header__nav-link').forEach(item => {
    item.addEventListener('click', event => {
        function scrollAction(name) {
            document.querySelectorAll(`.header__nav-link-${name}`).forEach(item => {
                item.addEventListener('click', event => {
                    document.querySelector(`.${name}__wrapper`).scrollIntoView({behavior: "smooth"})
                })
            })
        }
        scrollAction('header')
        scrollAction('about')
        scrollAction('service')
        scrollAction('experience')
        scrollAction('gallery')
        scrollAction('reviews')
        scrollAction('contacts')
    })
})

document.getElementById('about__span').onclick = () => {
    document.querySelector('.experience__wrapper').scrollIntoView({behavior: "smooth"})
}

// SLIDER

$(document).ready(function(){
    $('.reviews__slider').slick(
        {
            arrows: true,
            dots: true
        }
    );    
    $('.experience__content').slick(
        {
            arrows: true,
            vertical: true,
            swiping: false,
            prevArrow: $('.experience__time-prev'),
            nextArrow: $('.experience__time-next')
        }
    );   
    $('.experience__time-slider').slick(
        {
            arrows: true,
            vertical: true,
            swiping: false,
            asNavFor: '.experience__content',
            prevArrow: $('.experience__time-prev'),
            nextArrow: $('.experience__time-next')
        }
    );  
});

// SCROLLREVEAL

const sr = ScrollReveal({
    distance: '60px',
    duration: 1000,
    delay: 300,
    // reset: true
})

sr.reveal(`section`)

