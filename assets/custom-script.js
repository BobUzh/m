$(document).ready(function(){

$('.mybanner-swiper .slide__img img').css('opacity','1');  

var $page = $('html, body');
$('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
});

  
$('.custom-main-article-content div').each(function(){
  $(this).find('img').closest('div').addClass('articleImageBlock');
})

  
  
// $('.process__item:first-child').addClass('active');


$('.menu-week .iten-tab-title').click(function(){
    $(this).toggleClass('active');
    $(this).closest('.iten-tab').find('.iten-tab-content').toggleClass('active');
});

$('.nutrients-content .item-tab-title').click(function(){
    $(this).toggleClass('active');
    $(this).closest('.item-tab').find('.item-tab-content').toggleClass('active');
});

$('.menu-page-how-it-works .tabs .tab-item-title').click(function(){
    $(this).toggleClass('active');
    $(this).closest('.tab-item').find('.tab-item-content').toggleClass('active');
});

$('.menu-page-how-it-works .container').attr('id','how-it-works');
$('.menu-page-section-menu .container').attr('id','daily-sample-menu');
$('.menu-week .container').attr('id','weekly-sample-menu');
$('.menu-nutrients .container').attr('id','key-nutries');
$('.menu-page-ingridients .container').attr('id','ingredient-highlights');

//main blog
$( ".blog-page-featured-posts-item.other-column" ).wrapAll( "<div class='main-right-column' />");


$('.article-bottom a:contains(main)').addClass('hidden');
$('.custom-blog-tags-list a:contains(main)').addClass('hidden');
$('.article-cart-bottom a:contains(main)').addClass('hidden');
$('.main-article-tags a:contains(main)').addClass('hidden');



//blog
$('.custom-blog-tags-list a').each(function () {
  let linkBtn = $(this).attr('href');
  let mainCurrent = $('.main-page-link').attr('href');
  if(window.location.pathname == linkBtn) {
    $(this).addClass('active');
  }
  
})

if ($(window).width() < 1300){
   $('.custom-blog-tags-list').addClass('swiper'); 
   $('.custom-blog-tags-list-wrap').addClass('swiper-wrapper'); 
   $('.blog-select-link').addClass('swiper-slide'); 

     var swiper1 = new Swiper(".custom-blog-tags-list", {
      slidesPerView: 5.9,
        spaceBetween: 0,
      // autoplay: {
      //   delay: 1500,
      //   disableOnInteraction: false,
      // },
         breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 2.5,
                spaceBetween: 0,
                slideToClickedSlide: true,
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 3,
                spaceBetween: 0,
                slideToClickedSlide: true,
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 4.5,
                spaceBetween: 0,
      
            }
        }
    });
  
}


$('.main-addresses-section button').addClass('a-btn');
$('.main-login-custom button').addClass('a-btn');
$('.main-register-custom button').addClass('a-btn');
$('#checkout.cart__checkout-button').addClass('a-btn');

$('.add-to-cart-custom-btn').append('<svg class="right" width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 4.50278C12.4984 5.56246 12.0477 6.57831 11.2466 7.32762C10.4455 8.07692 9.35949 8.49853 8.2266 8.5C6.14636 8.5 2.1523 5.72029 1.3737 5.13655L0.5 4.50278L1.3737 3.86901C2.1523 3.31306 6.12853 0.5 8.2266 0.5C9.36004 0.50294 10.4461 0.925781 11.247 1.67597C12.0479 2.42616 12.4984 3.44259 12.5 4.50278Z" fill="white"/></svg>');
$('.add-to-cart-custom-btn').append('<svg class="left" width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 4.50278C12.4984 5.56246 12.0477 6.57831 11.2466 7.32762C10.4455 8.07692 9.35949 8.49853 8.2266 8.5C6.14636 8.5 2.1523 5.72029 1.3737 5.13655L0.5 4.50278L1.3737 3.86901C2.1523 3.31306 6.12853 0.5 8.2266 0.5C9.36004 0.50294 10.4461 0.925781 11.247 1.67597C12.0479 2.42616 12.4984 3.44259 12.5 4.50278Z" fill="white"/></svg>');


$('.product__accordion.accordion summary').click(function(){
  $(this).find('svg path.vertical').toggleClass('active');
})



//scroll animation
$('.shopify-section').addClass('element-animation');
$('.shopify-section:first-child').removeClass('element-animation');
$('.new-main-collection-product-grid').removeClass('element-animation');
$('.section-header').removeClass('element-animation');
$('.custom-popup').removeClass('element-animation');

  
function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
       change.target.classList.add('element-show');
      }
    });
  }
  
  let options = {
    threshold: [0.2] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.element-animation');
  
  for (let elm of elements) {
    observer.observe(elm);
  }  

  
});

$(document).ready(function() {
    if(localStorage.getItem('popState') != 'shown'){
        $("#custompopup").delay(1000).fadeIn();
        $('body').addClass('lock');
        localStorage.setItem('popState','shown')
         
    }else{
      $('.custom-popup').addClass('non-active');
    }


 

  
    $('.popup-close').click(function () {
      $('body').removeClass('lock');
      $('.custom-popup').css('display','none');
      $('.custom-popup').css('z-index','-1');
     
    })
});


$(function() {
  // copy content to clipboard
  function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
  }

  // copy coupone code to clipboard
  $(".promocode-btn").on("click", function() {
    copyToClipboard(".span-promocode");
  });
});


$('.list-menu li:last-child').addClass('a-btn');






