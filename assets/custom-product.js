let mainSection = $("[id^=MainProduct-template--]").parent('section');
mainSection.css('background', 'linear-gradient(0deg, rgba(255,255,255,1) 53%, rgba(250,247,242,1) 95%, rgba(247,243,236,1) 100%)');

$('.custom-product-faq .item-tab-title').click(function(){
    $(this).parent().toggleClass('active');
});
