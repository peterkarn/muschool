 const body = document.querySelector('.body');
 const main = document.querySelector('.main');
 const header = document.querySelector('.header');
 const swiperH = new Swiper('.swiper-container-h', {
   spaceBetween: 50,
   loop: true,
   touchRatio: 0.5,
   navigation: {
     nextEl: '.shops__horizontal-next',
     prevEl: '.shops__horizontal-prev',
   }
 });
 const swiperV = new Swiper('.swiper-container-v', {
   loop: true,
   direction: 'vertical',
   touchRatio: 0,
   spaceBetween: 100,
   slidesPerView: 1,
   enteredSlides: true,
   navigation: {
     nextEl: '.shops__next',
     prevEl: '.shops__prev',
   },
 });

 var swiperFormatsTopMobile = new Swiper('.formats__slider-top_mobile', {
   spaceBetween: 0,
   centeredSlides: true,
   slidesPerView: 'auto',
   touchRatio: 1,
   slideToClickedSlide: true,
   loop: false,
   loopedSlides: 1,
   breakpoints: {
     320: {
       slidesPerView: 1.5,
     },
     768: {
       slidesPerView: 2.8,
       spaceBetween: 20
     },
   }
 });

 var swiperFormatsTopDesktop = new Swiper('.formats__slider-top_desktop', {
   centeredSlides: true,
   slidesPerView: 'auto',
   touchRatio: 1,
   loop: false,
   slidesPerView: 3,
   loopedSlides: 0,
   centeredSlides: false,
   spaceBetween: 150,
 });

 var swiperFormatsBottom = new Swiper('.formats__slider-bottom', {
   spaceBetween: 10,
   loop: false,
   loopedSlides: 1,
   slidesPerView: 1,
   touchRatio: 0,
   thumbs: {
     swiper: swiperFormatsTopDesktop
   }

 });


 swiperFormatsTopMobile.controller.control = swiperFormatsBottom;
 swiperFormatsBottom.controller.control = swiperFormatsTopMobile;



 //accordion

 let accordionHeight = document.querySelector('.accordion').offsetHeight;

 function adaptiveHeight() {
   document.querySelector('.footer').style.paddingTop = `${100}px`;
 }


 document.querySelectorAll('.accordion-item__trigger').forEach((item) =>
   item.addEventListener('click', () => {
     const parent = item.parentNode;

     if (parent.classList.contains('accordion-item_active')) {
       parent.classList.remove('accordion-item_active');

     } else {
       document.querySelectorAll('.accordion-item').forEach((child) => child.classList.remove('accordion-item_active'));
       parent.classList.add('accordion-item_active');
     }
   })
 );

 // modals
 document.addEventListener('click', function (e) {
   e = e || window.event;
   var target = e.target || e.srcElement;

   if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
     if (target.hasAttribute('data-target')) {
       var m_ID = target.getAttribute('data-target');
       document.getElementById(m_ID).classList.add('open');
       body.classList.add('locked');
       header.classList.add('blur');
       main.classList.add('blur');
       validateForms('.modal-form', {
         tel: {
           required: true
         }
       }, '.thanks-popup', 'send goal');
       e.preventDefault();
     }
   }
   if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
     e.preventDefault();
     var modal = document.querySelector('[class="modal open"]');
     modal.classList.remove('open');
     body.classList.remove('locked');
     header.classList.remove('blur');
     main.classList.remove('blur');
     franchiseTypeFormInput.setAttribute('value', 'Пользователь не указал значение');
   }
 }, false);


 //forms

 const phoneInput = document.querySelectorAll('input[type="tel"]'),
   im = new Inputmask('+7 (999) 999-99-99');
 im.mask(phoneInput);

 let validateForms = function (selector, rules, successModal, yaGoal) {
   new window.JustValidate(selector, {
     rules: rules,
     messages: {
       name: {
         required: 'Обязательное поле'
       },
       tel: {
         required: 'Обязательное поле'
       }
     },
     submitHandler: function (form) {
       let formData = new FormData(form);

       let xhr = new XMLHttpRequest();
       xhr.onreadystatechange = function () {
         if (xhr.readyState === 4) {
           if (xhr.status === 200) {
             alert('Ваши данные успешно отправлены')
           }
         }
       }
       xhr.open('POST', 'mail.php', true)
       xhr.send(formData);
       form.reset();
     }
   });
 }

 validateForms('.form', {
   tel: {
     required: true
   }
 }, '.thanks-popup', 'send goal');


 // button info into the form

 const formButtonInfo = document.querySelectorAll('.content__footer-btn');
 const franchiseTypeFormInput = document.querySelector('.franchise');
 formButtonInfo.forEach((element) => {
   element.addEventListener('click', function () {
     franchiseTypeFormInput.setAttribute('value', this.getAttribute('value'));
   });
 });

 //===========webP support============

 //  function testWebP(callback) {

 //    var webP = new Image();
 //    webP.onload = webP.onerror = function () {
 //      callback(webP.height == 2);
 //    };
 //    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
 //  }

 //  testWebP(function (support) {

 //    if (support == true) {
 //      document.querySelector('body').classList.add('webp');
 //    } else {
 //      document.querySelector('body').classList.add('no-webp');
 //    }
 //  });