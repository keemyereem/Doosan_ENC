
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

  addEventListener("fetch", (event) => {
    event.respondWith(
      (async () => {
        // Respond from the cache if we can
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;
  
        // Else, use the preloaded response, if it's there
        const response = await event.preloadResponse;
        if (response) return response;
  
        // Else try the network.
        return fetch(event.request);
      })()
    );
  });

});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **공통**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var commonEvent = {
    init:function(){
       this.headerEvent();
       this.submenuEvent();
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
  submenuEvent: () => {
      $(document).on('click', '.sub_visual_menu .depth', function(){
          $(this).toggleClass("open");
      });

      $(document).on('click', '.sub_visual_menu .depth .drop_box li a', function(){
          var selected = $(this).text();
          var dep_tit = $(this).closest('.drop_box').siblings('.dep_tit');
          dep_tit.text(selected);  
          
      });

      $(document).on('click', '.scroll_down', function() {
        $('html, body').animate({scrollTop:300}, '300');
      });

  },

  
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **메인**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mainEvent = {
    init:function(){
        this.headerEvent();
        this.intro();
        this.sec04Card();
        this.sec05Video();
        this.sec06Tab();
        this.footerEvent();
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
        $(window).ready(() =>{
          $('body').addClass('blockScroll');
          $('#rightnavi, .sec01_controller').addClass('blind')
        });

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

                $('body').removeClass('blockScroll');
                $('.header').addClass('wht');
                $('#rightnavi, .sec01_controller').removeClass('blind');

                mainEvent.createFullpage();
                mainEvent.mainSwiper();
            });


        });
    },

    mainSwiper: () => {
        var swiper = new Swiper(".mainSwiper", {
            spaceBetween: 30,
            speed: 500,
            effect: "fade",
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
              el: ".swiper-pagination-sec01",
              clickable: true,
            },

            //  슬라이드 이벤트 감지 - 참고 https://songsong.dev/entry/swiperjs-슬라이더-기본-사용법-알아보기
            on : {  
                init: function() {
                    // this.autoplay.stop()
                },

                slideChangeTransitionStart: function() {
                    $('.swiper-slide').addClass('changing');
                    $('.swiper-slide').removeClass('changed');
                },

                slideChangeTransitionEnd: () => {
                    $('.swiper-slide').removeClass('changing');
                    $('.swiper-slide').addClass('changed');
                },
            }

        });

        // 페이지네이션 동그라미 슬라이드별 이동
        swiper.on('transitionStart', ()=> {
            let $this = $('.swiper-pagination-bullet-active').position().left;
            $('.bullet_hr').css('left', ($this / 10) + 'rem');
        });

        // Next, Prev버튼 클릭 시 오토플레이 재개
        $(document).on('click', '.swiper-button', () => {
            swiper.autoplay.start();
        });


    },

    sec02Swiper: () => {
      var listArray = ["01","02","03"];
      var swiper2 = new Swiper(".section02 .swiper", {
        speed: 500,
        loop: true,
        autoplayDisableOnInteraction: false,
        slidesPerView: 1, 
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
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

    sec03Swiper: () => {
      var listArray = ["주택사업","건축사업","토목사업"];
      var swiper3 = new Swiper(".section03 .bus_swiper", {
        speed: 500,
        loop: true,
        autoplayDisableOnInteraction: false,
        slidesPerView: 1, 
        allowTouchMove: false,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        watchOverflow: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,

        pagination: {
          el: '.swiper-pagination-sec03',
          clickable: 'true',
          type: 'bullets',
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + '<em>'+ listArray[index]+'</em>' + '</span>';
          },
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },


      });
      //마우스 오버시 자동슬라이드 멈춤
      $(".section03 .bus_swiper").each(function(elem, target){
        var swp = target.swiper;
        $(this).hover(function() {
            swp.autoplay.stop();
        }, function() {
            swp.autoplay.start();
        });
      });


      var innerSwiper3 = new Swiper(".section03 .inner_swiper", {
        speed: 500,
        loop: false,
        autoplayDisableOnInteraction: false,
        slidesPerView: 1, 
        watchOverflow: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,

        pagination: {
          el: '.section03 .right .swiper-pagination',
          clickable: 'true',
          type: 'bullets',
      
        },
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false
        // },


      });

    },

    sec04Card: () => {
      $('.card li').hover(function() {
        var getSrc = $(this).children('.icon').attr('src');
        getSrc = getSrc.replace(".png","_hover.png");
        
        $(this).children('.icon').attr('src', getSrc);
        
      }, function() {
        var getSrc = $(this).children('.icon').attr('src');
        getSrc = getSrc.replace("_hover.png", ".png");

        $(this).children('.icon').attr('src', getSrc);
      });
      
    },
    
    sec05Video: () => {

      
      $(".video_thumb").on("click", function(){
        $(this).addClass('blind');
        $(this).siblings('.video').removeClass('blind');

        // var iframe = $("#video02")
        // var src = iframe.attr('src');
        // if(datasrc!=src){
        //   iframe.attr('src','https://www.youtube.com/embed/tjuR-GhAnIs?autoplay=1');
        //   alert('aa');
        // }
      });

      $(document).mouseup(function (e){
        var LayerPopup = $(".video_thumb");
        if(LayerPopup.has(e.target).length === 0){
          LayerPopup.removeClass("blind");
          $('.video').addClass('blind');
        }
      });
    },

    sec06Tab: () => {
      var Tabs = $('.section06 .right .tab li');
      Tabs.on("click", function(){
        $(this).addClass('on');
        $(this).siblings().removeClass('on');

        var Tabs_idx = Tabs.index(this);
        $('.section06 .right .contents > ul').removeClass('on');
        $('.section06 .right .contents > ul').eq(Tabs_idx).addClass('on');
        
      });
    },

    footerEvent: () => {
      $(document).on("click",".family_site .site_selected",function(){
        var selElm = $(this).parent();
        if(!selElm.hasClass("open")){
            selElm.addClass("open");
        }else{
            selElm.removeClass("open");
        }
      });

      $(document).on("click",".family_site .site_list li a",function(){
        var selected = this.innerText;
        var siteName = document.getElementsByClassName('site_selected')[0];
        var familySite = this.parentNode.parentNode.parentNode;
        siteName.innerText = selected;
        familySite.classList.remove('open');
      });
    },

    createFullpage: () => {
      $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage', 'seventhPage'],
        menu: '#rightnavi',
        verticalCentered: false,
        css3: true,
        
        // sectionsColor: ['#FEC260', '#3FA796', '#fff', '#fff', '#fff'],
        // controlArrows: true,            // 슬라이드 컨트롤 애로우 생성 
        // slidesNavigation: true,         // 슬라이드 컨트롤 네비게이션 생성
        // slidesNavPosition: 'bottom',    // 슬라이드 컨트롤 네비게이션 위치 

        scrollingSpeed: 1000,
        onLeave: function(index, nextIndex, direction){

          if(nextIndex == 1 || nextIndex == 5){
            setTimeout(() => {
              $(".header").addClass("wht");
            }, 1000);
            
          }else {
            setTimeout(() => {
            $(".header").removeClass("wht");
            }, 1000);

          }

          // footer
          if(nextIndex == 7){
            $("#rightnavi, .header").addClass("indent");

          }else {
            $("#rightnavi, .header").removeClass("indent");

          }
        },

        afterLoad: function(anchorLink, index){
          /* 인포그래픽 섹션 도달 후 오토플레이 시작 */

          if (index == 2) {
            setTimeout(() => {
              mainEvent.sec02Swiper();
              // console.log('--> swiper02 initiating');

            }, 300);
          } else if (index == 3) {
            setTimeout(() => {
              mainEvent.sec03Swiper();
              // console.log('--> swiper03 initiating');

            },300);
          } else {
           
          }

          // footer
          if (index == 7) {
            setTimeout(() => {
              $('.footer .sec_tit > span').addClass('fin')
            }, 200);
          } else {
           
          }
        },



    });
  },

  
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **서브**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var civilEngineerEvent = {
  init: function(){
    this.civilTab();
    this.civilSwiper();
  },
  civilTab: () => {
    var Tabs = $('.civil_engineer .tab_box ul li');
    Tabs.on("click", function(){
      $(this).addClass('on');
      $(this).siblings().removeClass('on');
    });

  },

  civilSwiper: () => {
    $(".civil_engineer .outline .swiper").each(function(index){
      console.log(index);
      var idx = index +1;

      // 첫번째 슬라이드 2depth 스와이퍼 
      var bus03Swiper = new Swiper('.civil_engineer .outline .swiper0' + idx, {
          observer: true,
          observeParents: true,
          slidesPerView : 1,
          speed: 500,
          
          navigation: {
              nextEl: '.civil_engineer .outline .swiper-button-next0' + idx,
              prevEl: '.civil_engineer .outline .swiper-button-prev0' + idx,
          },
          watchOverflow: true,


        });
      });
  },

};