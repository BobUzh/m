$(()=>{
  console.log(1);
   let swiper = new Swiper(".mybanner-swiper", {
      slidesPerView: 3.3,
      spaceBetween: 24,
      loop: true,
      centeredSlides: true,
        breakpoints: {
            300: {
              slidesPerView: 1.5,
              spaceBetween: 24,
            },
            500: {
              slidesPerView: 2.2,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 3.3,
              spaceBetween: 24,
            },
          }
     /* pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },*/
    });
  let swiper2 = new Swiper(".menu-swiper", {
      slidesPerView: 6.1,
      spaceBetween: 24,
      centeredSlides: true,
      loop: true, 
      breakpoints: {
        200: {
            slidesPerView: 1.1,
            spaceBetween: 24,
        },
        300: {
            slidesPerView: 1.5,
            spaceBetween: 24,
        },
        500: {
           slidesPerView: 2.1,
           spaceBetween: 24,
        },
        768: {
           slidesPerView: 3.1,
          spaceBetween: 24,
        },
        900: {
           slidesPerView: 4.1,
          spaceBetween: 24,
        },
        1400: {
           slidesPerView: 6.1,
          spaceBetween: 24,
        },
      }
     /* pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },*/
    });
    let swiper3 = new Swiper(".swiper-testimonial", {
      slidesPerView: 4,
      spaceBetween: 24,
      breakpoints: {
        200: {
            slidesPerView: 1,
            spaceBetween: 24,
        },
        300: {
            slidesPerView: 1.2,
            spaceBetween: 24,
        },
        500: {
           slidesPerView: 1.5,
           spaceBetween: 24,
        },
        600: {
           slidesPerView: 2.1,
           spaceBetween: 24,
        },
        768: {
           slidesPerView: 2.5,
           spaceBetween: 24,
        },
        900: {
           slidesPerView: 3.5,
          spaceBetween: 24,
        },
        1024: {
           slidesPerView: 4,
          spaceBetween: 24,
        }
      }
     /* pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },*/
    });
});



$(()=>{
  $('.section__steps .tab_item').click(function(){
    console.log(1);
      $(this).toggleClass('active');
  });
});
$(()=>{
  $('.process__btn').click(function(){
    $(this).closest('.process__item').toggleClass('active');
  });
})

$(document).ready(function(){
  $('.process__item:nth-child(1)').removeClass('active');  
});

