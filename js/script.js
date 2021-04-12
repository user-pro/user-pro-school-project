(function () {
   let counterSlide = 0;
   if (document.documentElement.clientWidth < 1024 && document.documentElement.clientHeight < 900) {
      alert(`ваше устройство не поддерживается страницей`);
      return;
   }
   const headerLinks = document.querySelectorAll(".header__link");

   const mainSlider = new Swiper('.main-slider', {

      wrapperClass: `main-slider__content`,
      slideClass: `main-slider__slide`,
      direction: `vertical`,
      slidesPerView: `auto`,
      paralax: true,

      pagination: {
         el: '.main-slider__pagination',
         type: `bullets`,
         clickable: true,
         bulletClass: `main-slider__bullet`,
         bulletActiveClass: `main-slider__bullet_active`
      },

      scrollbar: {
         el: `.main-slider__scroll`,
         dargClass: `main-slider__drag-scroll`,
         draggable: true,
      },

      keyBoard: {
         enable: true,
         onlyInViewport: true,
         pageUpDown: true,
      },

      mousewheel: {
         sensitivity: 1
      },

      init: false,

      watchOverFlow: true,
      speed: 400,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,

      on: {
         init() {
            headerSlider();
            mainSliderWrapper.classList.add(`loaded`);
            // setTimeout(setScrollType, 200);
            setScrollType();
         },
         slideChange() {
            headerSliderRemove();
            headerLinks[mainSlider.realIndex].classList.add("active");
         },
         progress() {
            setTimeout(() => {

               if (document.documentElement.clientWidth > 1024) {
                  setScrollType();
               }
               console.log(12);
            }, 500)
         },
         resize() {
            setScrollType();
         }
      }
   });

   const secondScreenSlider = new Swiper(`.second-screen__slider`, {
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },
      loop: true,
      slidesPerView: 1,
      spaceBetween: 40,
   });


   let mainSliderWrapper = document.querySelector(`.main-slider-wrapper`);
   document.addEventListener("DOMContentLoaded", () => {

      mainSlider.init();
      if (mainSlider) {
         mainSlider.params.freeMode = false;
      }
   });

   function headerSlider() {
      if (headerLinks.length) {
         headerLinks[mainSlider.realIndex].classList.add("active");
         headerLinks.forEach((item, i) => {
            item.addEventListener("click", (e) => {
               headerSliderRemove();
               mainSlider.slideTo(i, 400);
               item.classList.add("active");

               e.preventDefault();

            });
         });
      }
   }
   window.addEventListener('scroll', setScrollType);
   function setScrollType() {
      if (mainSliderWrapper.classList.contains(`free`)) {
         mainSliderWrapper.classList.remove(`free`);
         mainSlider.params.freeMode = false;
      }

      for (let index = 0; index < mainSlider.slides.length; index++) {
         const mainSlide = mainSlider.slides[index],
            mainSlideContent = mainSlide.querySelector(`.container`);
         if (mainSlideContent) {
            const mainSlideContentHeight = mainSlideContent.offsetHeight;
            if (mainSlideContentHeight > window.innerHeight) {
               mainSliderWrapper.classList.add(`free`);
               mainSlider.params.freeMode = true;
               break;
            }
         }

      }
   }
   function headerSliderRemove() {
      const activeLink = document.querySelector(".header__link.active");
      if (activeLink) {
         activeLink.classList.remove("active");
      }
   }




   const footer = document.querySelector(`.footer`),
      phoneButton = document.querySelector(`.phone-button`),
      accordeons = document.querySelectorAll(`.accordeon`);


   setTimeout(() => {
      const accordTimeOut = 200;
      accordeons.forEach((accordeon) => {
         accordeon.classList.add(`hide`);
         setTimeout(() => {
            const accodeonButton = accordeon.querySelector(`.accordeon__button`),
               accordeonContent = accordeon.querySelector(`.accordeon__content`);
            let accContentHeight = accordeonContent.querySelector(`.accordeon-content-js`).clientHeight;

            document.querySelectorAll(`.accordeon__content`).forEach(item => item.style.cssText = `max-height: 0px;margin-top: 0px;`);

            accordeon.addEventListener(`click`, () => {

               accContentHeight = accordeonContent.querySelector(`.accordeon-content-js`).clientHeight;

               accordeon.classList.toggle(`open`);
               if (accordeon.classList.contains(`open`)) {
                  accordeonContent.style.cssText = `
                  max-height: ${accContentHeight}px;
                  margin-top: 10px;
               `;
                  accodeonButton.classList.remove(`on`);
                  accodeonButton.classList.add(`off`);
                  // 
               } else {
                  accordeonContent.style.cssText = `
                  max-height: 0px;
                  margin-top: 0px;
               `;
                  accodeonButton.classList.add(`on`);
                  accodeonButton.classList.remove(`off`);
               }
            });
         }, accordTimeOut);
      });

   }, 1000);


   const jsFunctionElems = document.querySelectorAll(`.js-function`),
      fourthScreenBtn = document.querySelector(`.fourth-screen__btn`);

   let counter = 1;
   fourthScreenBtn.addEventListener("click", () => {
      if (counter < jsFunctionElems.length) {

         jsFunctionElems[counter].classList.add(`active`);
      }
      counter++;

      if (counter >= jsFunctionElems.length) {
         jsFunctionElems.forEach(item => {
            item.classList.add(`active`);
         });
         fourthScreenBtn.classList.add(`off`);
      }

   });

}());