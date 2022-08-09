$(function(){
    
    AOS.init({
        // 핸들링 참고: https://github.com/michalsnik/aos
		once : true,
		throttleDelay : 99,
		duration: 1000,
        anchorPlacement: 'center-bobttom',
        startEvent: "load",

	});

    $('#fullpage').fullpage({
        'verticalCentered': false,
        'css3': false,
        'sectionsColor': ['#FEC260', '#3FA796', '#A10035'],
        'navigation': true,
        'navigationPosition': 'right',
        'navigationTooltips': ['Masterpiece', 'Business', 'Social responsibility', 'Career', 'Channel'],

        controlArrows: true,            // 슬라이드 컨트롤 애로우 생성 
		slidesNavigation: true,         // 슬라이드 컨트롤 네비게이션 생성
		slidesNavPosition: 'bottom',    // 슬라이드 컨트롤 네비게이션 위치 

        scrollingSpeed: 1000,
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage'],
        menu: '#rightnavi',

    });

});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **공통**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var commonEvent = {
    init:function(){
       this.headerEvent();
    }, 

    headerEvent:function(){

        
    },

};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **메인**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mainEvent = {
    init:function(){
        this.headerEvent();
        this.intro();
        this.mainSwiper();
        this.sec02Swiper();
    },

    headerEvent:() => {

        //언어선택
        $(document).on("click",".lang_select .lang_current",function(){
            var selElm = $(this).parent();
            if(!selElm.hasClass("open")){
                selElm.addClass("open");
            }else{
                selElm.removeClass("open");
            }
        });

    },

    intro:() => {
        $(window).load(() => {
            var backgroundImageUrl = "../images/main/sec01_bg.png";

            // checking if image is already there in cache 
            if (sessionStorage.getItem(backgroundImageUrl)) {

              console.log('intro animation start');

              // after image showing, animation start
              setTimeout(() => {
                $('.section01').addClass('ani');
              }, 1000);

            } else {
              var img = new Image();
              img.src = backgroundImageUrl;
              img.onload = function() {
                sessionStorage.setItem(backgroundImageUrl, true);
                img = undefined;
              };

              console.log('cannot founded background image!');
            };

            // after animation ended, initializing object
            var x = document.getElementById("intro_trigger");
            x.addEventListener("animationend", () => {
                console.log('인트로 모션 완료')
            });


        });
    },

    mainSwiper: () => {
        var swiper = new Swiper(".mainSwiper", {
            spaceBetween: 30,
            speed: 1000,
            effect: "fade",
            
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
              el: ".swiper-pagination-sec01",
              clickable: true,
            },
        });

        $(document).on('click', '.mainSwiper .swiper-pagination-bullet', () => {
            let $this = $('.swiper-pagination-bullet-active').position().left;
            console.log('bullet click!');
            
            

        })
    },

    sec02Swiper: () => {
        var getTimeout = function(){var e=setTimeout,b={};setTimeout=function(a,c){var d=e(a,c);b[d]=[Date.now(),c];return d};return function(a){return(a=b[a])?Math.max(a[1]-Date.now()+a[0],0):NaN}}();

        // https://curtistimson.co.uk/post/js/default-negative-variables-to-zero-in-javascript/
        function sanitisePercentage(i){
          return Math.min(100,Math.max(0,i));
        }
        
        // Slider
        var percentTime;
        var tick;
        var progressBar = document.querySelector('.swiper-hero-progress');
        
        var swiper2 = new Swiper(".section02 .swiper", {
            speed: 500,
            loop: true,
            effect: "fade",
            watchOverflow: true,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,

            pagination: {
              el: ".section02 .swiper-pagination",
              clickable: true,
              renderBullet: function (index, className) {
                return '<span class="' + className + '">' +'0' + (index + 1) + '</span>';
              },

            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            on: {
                init: function () {
                  $(".swiper-progress-bar").removeClass("animate");
                  $(".swiper-progress-bar").removeClass("active");
                  $(".swiper-progress-bar").eq(0).addClass("animate");
                  $(".swiper-progress-bar").eq(0).addClass("active");
                },
                slideChangeTransitionStart: function () {
                  $(".swiper-progress-bar").removeClass("animate");
                  $(".swiper-progress-bar").removeClass("active");
                  $(".swiper-progress-bar").eq(0).addClass("active");
                },
                slideChangeTransitionEnd: function () {
                  $(".swiper-progress-bar").eq(0).addClass("animate");
                }
            }

        });
        





    },


  
};
