let tabs = document.querySelectorAll('.tab');
        let content = document.querySelectorAll('.content-item');
        for (let i = 0; i < tabs.length; i++) {            
            tabs[i].addEventListener('click', () => tabClick(i));
        }

        function tabClick(currentTab) {
            removeActive();
            tabs[currentTab].classList.add('active');
            content[currentTab].classList.add('active');
            console.log(currentTab);
        }

        function removeActive() {
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove('active');
                content[i].classList.remove('active');
            }
        }




		// ----------swiper-slider---------
var swiper = '';
$(window).on('load', function(){
    swiper = new Swiper('#catgory-slider', {
        loop: false,
        slidesPerView: "auto",
        allowTouchMove: false,
        spaceBetween: 5,
        mousewheel: true,
        slideToClickedSlide: true,
        centeredSlides: false,
        navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
        }
    });
});


$(".category-button").click(function(){
    $(".category-button").removeClass("active");
    $(this).addClass('active');
    var getid = $(this).data('id');
    $(".data-text").removeClass('active');
    $("#"+getid).addClass("active");
});
