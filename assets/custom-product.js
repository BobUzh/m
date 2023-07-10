let mainSection = $("[id^=MainProduct-template--]").parent('section');
mainSection.css('background', 'linear-gradient(0deg, rgba(255,255,255,1) 53%, rgba(250,247,242,1) 95%, rgba(247,243,236,1) 100%)');

let varisntSelect = $('.product-form__input--dropdown select');
let [firstSelect, secondSelect, thirdSelect] = varisntSelect;

let mainIsActive = $(thirdSelect).val() != 'None';
if (mainIsActive) $('.main-product-item').addClass('product-item_active');

$(firstSelect).change(function(event) {
    if(!$('.main-product-item').hasClass('product-item_active')) {
        thirdSelect.value = 'None'; 
    } else {
        thirdSelect.value = event.target.value;    
    }
});

$('.main-product-item').click(function() {
    let firstSelectedValue = $(firstSelect).val();
    let secondSelectedValue = $(secondSelect).val();
    let thirdSelectedValue = $(thirdSelect).val();

    let newValue = thirdSelectedValue == 'None' ?  firstSelectedValue : 'None';
    let isActive = thirdSelectedValue != 'None';

    isActive ? $(this).removeClass('product-item_active') : $(this).addClass('product-item_active');

    $(thirdSelect).val(newValue).change();
    $('variant-selects')[0].onVariantChange();
    
});

  $('.product-item').click(function() {
    let isActive = $(this).hasClass('product-item_active');
    let thisPrice = $(this).data('price');
    let customPrice = $('.custom-price-item').text().replace(/[^0-9]/g, '');
    let customSum = $('.custom-price-item').data('price');

    if (isActive) {
        let sum = Number(customPrice) - Number(thisPrice);
        let formatSum = format_money(sum, '{{amount}}');
        let additionalSum = Number(customSum) - Number(thisPrice)
        $('.custom-price-item').text('$'+formatSum);
        $('.custom-price-item').data('price', additionalSum).attr('data-price',additionalSum);  
        $(this).removeClass('product-item_active');
    } else {
      let sum = Number(customPrice) + Number(thisPrice);
      let formatSum = format_money(sum, '{{amount}}');
      let additionalSum = Number(customSum) + Number(thisPrice)
      $('.custom-price-item').text('$'+formatSum);
      $('.custom-price-item').data('price', additionalSum).attr('data-price',additionalSum); 
      $(this).addClass('product-item_active');
    }

    // $('.price__regular .price-item').text(finalPrice).change();
});

$('.custom-product-container').on('click', '#custom-btn button', function() {
    let pickerValue = $('#picker').val();

    if (!pickerValue) {
      $('.calendar-message').addClass('calendar-error-show');
      return
    };

    let items = [];
    let products = $('.product-item.product-item_active');

    products.each(function() {
        items.push({'id': $(this).data('product-id'), 'quantity': 1})
    });

  console.log('==')
  console.log(items)
    
    fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'items': items})
      })
      .then(response => {
        $('.custom-product-container .product-form__submit').trigger('click');
        console.log(response)
        return response.json();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
});

$('.custom-product-faq .item-tab-title').click(function(){
  $(this).parent().toggleClass('active');
});

$('.product-item svg').click(function(e) {
  e.stopPropagation();
  let prodId = $(this).parent().data('product-id');
  $('#custompopup').css('display', 'block');
  $('#custompopup .main[data-product-id="'+prodId+'"] ').addClass('active');
  console.log(prodId)
})

$('.popup-close').click(function(e) {
  $('#custompopup').css('display', 'none');
  $('#custompopup .main').removeClass('active');
})

