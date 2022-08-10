
/* --------------------- DoosanENC Released 2022.08.08 --------------------- */
/* --------------------- Published by 4m Creative --------------------- */

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
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage'],
        menu: '#rightnavi',
        verticalCentered: false,
        css3: true,
        sectionsColor: ['#FEC260', '#3FA796', '#A10035', '#FEC260'],
        // navigation: true,
        // navigationPosition: 'right',
        // navigationTooltips: ['Masterpiece', 'Business', 'Social responsibility', 'Career', 'Channel'],
        // showActiveTooltip: false,

        // controlArrows: true,            // 슬라이드 컨트롤 애로우 생성 
        // slidesNavigation: true,         // 슬라이드 컨트롤 네비게이션 생성
        // slidesNavPosition: 'bottom',    // 슬라이드 컨트롤 네비게이션 위치 

        scrollingSpeed: 1000,



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
            var backgroundImageUrl = "../images/main/sec01_bg1.png";

            // checking if image is already there in cache 
            if (sessionStorage.getItem(backgroundImageUrl)) {

              console.log('-> intro animation start');

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
                console.log('-> intro animation end');
                $('.header').addClass('wht');
            });


        });
    },

    mainSwiper: () => {
        var swiper = new Swiper(".mainSwiper", {
            spaceBetween: 30,
            speed: 1000,
            effect: "fade",
            loop: true,
            // autoplay: true,
            
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
              el: ".swiper-pagination-sec01",
              clickable: true,
            },

            //  슬라이드 이벤트 감지 - 참고 https://songsong.dev/entry/swiperjs-%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%8D%94-%EA%B8%B0%EB%B3%B8-%EC%82%AC%EC%9A%A9%EB%B2%95-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0
            on : {  

              slideChangeTransitionStart: () => {
                  
                  $('.swiper-pagination-bullet').eq(this.realIndex).addClass('realIndex');
                  // $('.swiper-pagination-bullet').not(':eq(' + this.realIndex + ')').removeClass('realIndex');
                  
              },

              slideChangeTransitionEnd: () => {

                
              },
            }

        });


        let dd = $('.realIndex').position();
        console.log(dd);
        $('.bullet_hr').css('left', (dd / 10) + 'rem');
        
          
 
        


        $(document).on('click', '.mainSwiper .swiper-pagination-bullet, .mainSwiper .swiper-button', () => {
            let $this = $('.swiper-pagination-bullet-active').position().left;

            console.log('bullet click / ' + 'position : ' + $this);
            $('.bullet_hr').css('left', ($this / 10) + 'rem')
        })
    },

    sec02Swiper: () => {
      var listArray = ["01","02","03"];
      var swiper2 = new Swiper(".section02 .swiper", {
        speed: 500,
        loop: true,
        effect: "fade",
        watchOverflow: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,

        pagination: {
          el: '.swiper-pagination-sec02',
          clickable: 'true',
          type: 'bullets',
          renderBullet: function (index, className) {
              return '<span class="' + className + '">' + '<em>'+ listArray[index]+'</em>' + '<i></i>' + '<b></b>'  + '</span>';
          },
      
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },


    });

    },


  
};
