
/* --------------------- DoosanENC Released 2022.08.08 --------------------- */
/* --------------------- Published by 4m Creative --------------------- */



$(function(){
    
  const isMobile = () => {
    const user = navigator.userAgent;
    let isCheck = false;

    if ( user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1 ) {
        isCheck = true;
    }

    return isCheck;
  }
if (isMobile() == false) {
  console.log('*PC environment')
  $('html').attr('id', 'pc')
} else {
  console.log('*Mobile environment')
  $('html').attr('id', 'mobile')
}


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
    this.subVisual();
    this.submenuEvent();
    this.footerEvent();
    this.goTopEvent();
    this.iptEvent();
    this.tabEvent();
  }, 

  headerEvent: () => {
    $(window).on('scroll',function(){
      $(".header").css("left",0-$(this).scrollLeft());
    });
  },

  subVisual: () => {
    $(window).load(() => {
      $('.sub_visual').addClass('ani')
    })
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
        var titleTop = $('.title_area').offset().top;
        $('html, body')/* .removeClass('smooth') */.animate({scrollTop: titleTop}, '300');
      });


      const subMenu = document.querySelector(".sub_visual_menu");
      const fixMenu = subMenu.offsetTop;


      $(window).on('scroll', function() {
        let st = $(window).scrollTop();
        
        if(st >= fixMenu) {
          subMenu.classList.add('fixed');
        } else {
          subMenu.classList.remove('fixed');
        }
        
        if (st >= fixMenu - 200) {
          $('.header').addClass('indentUp');
        } else {  
          $('.header').removeClass('indentUp');
        }
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

    $(window).on('scroll', function() {
      let st = $(window).scrollTop();
      let footer = document.querySelector(".footer").offsetTop;

      if ($(window).width() > 768) {
          footer = footer - 300;

          if(st >= footer) {
              setTimeout(() => {
                  $('.footer .sec_tit > span').addClass('fin')
              }, 200);
          }
      }
    });
  },
  
  goTopEvent: () => {
    $(window).scroll(function() {
      // top button controll
      if ($(this).scrollTop() > 700) {
          $('#topButton').fadeIn();
      } else {
          $('#topButton').fadeOut();
      }
      var footerTop = $('.footer').offset().top - $(window).outerHeight();
      var pos = $('.footer').outerHeight() + Number(80);
      var pos_m = $('.footer').outerHeight() + Number(35);
      
      if($(this).scrollTop() > footerTop){
        if($(window).width() > 767){
          $('#topButton').addClass('on').css({'bottom':pos});
        }else{
          $('#topButton').addClass('on').css({'bottom':pos_m});
        }
        
      }else {
        if($(window).width() > 767){
          $('#topButton').removeClass('on').css({'bottom':'8rem'});
        }else{
          $('#topButton').removeClass('on').css({'bottom':'3.5rem'});
        }
        
      }

    });

    $(document).on('click', '#topButton', function() {
        $('html, body')/* .removeClass('smooth') */.animate({scrollTop:0}, '300');
    });
    
  },

  iptEvent: () => {
    //selectbox
    var selectType = $(".select_row>select");
    selectType.addClass("selectBox");
    selectChange(selectType);
    function selectChange(type) {
        type.change(function () {
            var select_name = $(this).children("option:selected").text();
            $(this).siblings("label").text(select_name);
        });
    };

    //file
    var fileTarget = $('#upload_file');
    fileTarget.on('change', function(){
        var cur =$ (".file_row input[type='file']").val();
        $(".upload_name").val(cur);
    });
  },

  tabEvent: () => {
    var Tabs = $('.tab_box ul li');
    Tabs.on("click", function(){
      $(this).addClass('on');
      $(this).siblings().removeClass('on');
    });

  },

};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **메인**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mainEvent = {
  init:function(){
      this.intro();
      this.sec02Swiper();
      this.sec03Swiper();
      this.sec04Card();
      this.sec06Tab();
      this.headerEvent();
      this.footerEvent();
  },

  createFullpage: () => {

    $('#fullpage').fullpage({
      anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage', 'seventhPage'],
      menu: '#rightnavi',
      verticalCentered: false,
      css3: true,
      scrollingSpeed: 800,

      onLeave: function(index, nextIndex, direction){

        if(nextIndex == 1 || nextIndex == 5){
          setTimeout(() => {
            $(".header").addClass("wht");
          }, 500);
          
        }else {
          setTimeout(() => {
            $(".header").removeClass("wht");
          }, 500);

        }
        
        // footer
        if(nextIndex == 7){
          $("#rightnavi, .header").addClass("indent");

        }else {
          $("#rightnavi, .header").removeClass("indent");

        }
      },

      afterLoad: function(anchorLink, index){
        
        // 인포그래픽 섹션 도달 후 오토플레이 시작
        if (index == 1) {
          swiper.autoplay.start();
        } else {
          swiper.autoplay.stop();
          swiper.slideTo(1);
        }
        if (index == 2) {
          swiper2.autoplay.start();
        } else {
          swiper2.autoplay.stop();
          swiper2.slideTo(1);
        }
        if (index == 3) {
          swiper3.autoplay.start();
        } else {
          swiper3.autoplay.stop();
          swiper3.slideTo(1);
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
            }, 500);

          } else {
            var img = new Image();
            img.src = backgroundImageUrl;
            img.onload = function() {
              sessionStorage.setItem(backgroundImageUrl, true);
              img = undefined;
            };

            console.log('-X cannot found imgData.');

            setTimeout(() => {
              $('.section01').addClass('ani');
            }, 500);
          };

          // after animation ended, initializing object
          var x = document.getElementById("intro_trigger");
          x.addEventListener("animationend", () => {
              console.log('-> intro animation end');

              $('body').removeClass('blockScroll');
              $('.header').addClass('wht');
              $('#rightnavi, .sec01_controller').removeClass('blind');
              
              setTimeout(() => {
                $('.clip-wrap').addClass('indent');
              }, 0);

              mainEvent.mainSwiper();

              let deviveChecker = $('#mobile')
              if (!deviveChecker.length) {
                mainEvent.createFullpage();
              } else {
                mainEvent.sec02Swiper();
                mainEvent.sec03Swiper();
              }
              
      
                
              
              
              
          });


      });
  },

  mainSwiper: () => {
    var interleaveOffset = 0.5;

    var swiperOptions = {
      speed: 1000,
      loop: false,
      watchSlidesProgress: true,
      autoplay: {
          delay: 3500,
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
      on: {
        progress: function() {
          var swiper = this;
          
          for (var i = 0; i < swiper.slides.length; i++) {
            // console.log('swiper length: '+ swiper.slides[i]);

            var slideProgress = swiper.slides[i].progress;
            var innerOffset = swiper.width * interleaveOffset;
            var innerTranslate = slideProgress * innerOffset;

            swiper.slides[i].querySelector(".slide-inner").style.transform =
              "translate3d(" + innerTranslate + "px, 0, 0)";

            swiper.slides[i].querySelector(".slide-inner").style.transition =
              "transform 1s";

            // swiper.slides[i].querySelector(".slide-inner").style.transition =
            //   "background-size 6s";
            
            // var cList = this.slides[i].classList;
            // if(cList.contains('changed') && cList.contains('swiper-slide-active')){
            //   swiper.slides[i].querySelector(".slide-inner").style.transition =
            //   "background-size 6s";
            // }
          }      
        },
        touchStart: function() {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
          }
        },
        setTransition: function(speed) {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + "ms";
            swiper.slides[i].querySelector(".slide-inner").style.transitionDuration = speed + "ms";
            swiper.slides[i].querySelector(".slide-inner").style.transitionProperty = "transform";
          }
        }
      }
    };

    swiper = new Swiper(".mainSwiper", swiperOptions);

    // var sliderBgSetting = $(".slide-bg-image");
    // sliderBgSetting.each(function(indx){
    //     if ($(this).attr("data-background")){
    //         $(this).css("background-image", "url(" + $(this).data("background") + ")");
    //     }
    // });


    // swiper = new Swiper(".mainSwiper", {
    //     spaceBetween: 30,
    //     speed: 500,
    //     effect: "fade",
    //     loop: true,
    //     autoplay: {
    //         delay: 3500,
    //         disableOnInteraction: true,
    //     },
        
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev",
    //     },
    //     pagination: {
    //       el: ".swiper-pagination-sec01",
    //       clickable: true,
    //     },

    //     //  슬라이드 이벤트 감지 - 참고 https://songsong.dev/entry/swiperjs-슬라이더-기본-사용법-알아보기
    //     on : {  
    //         init: function() {
    //             // this.autoplay.stop()
    //         },

    //         slideChangeTransitionStart: function() {
    //             $('.swiper-slide').addClass('changing');
    //             $('.swiper-slide').removeClass('changed');
    //         },

    //         slideChangeTransitionEnd: () => {
    //             $('.swiper-slide').removeClass('changing');
    //             $('.swiper-slide').addClass('changed');
    //         },
    //     },
          

    //   });

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
    var listArray = ["01","02","03","04",'05'];
    swiper2 = new Swiper(".section02 .myswiper", {
      speed: 500,
      loop: true,
      autoplayDisableOnInteraction: false,
      slidesPerView: 1, 
      initialSlide: 0,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      watchOverflow: true,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      observer: true,
      observeParents: true,

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
          disableOnInteraction: false,
      },

      on : {  
        init: function() {
          this.autoplay.stop();
        }

      }

    });

    $(window).on('load resize', function(e) {

      let bullet = $('.swiper-pagination-sec02 .swiper-pagination-bullet');
      let bulletWidth = bullet.width();
      let bulletMargin = parseInt( bullet.css('margin-right'));
      let index = 0;

      bulletWidth = bulletWidth + bulletMargin;
    
      $(document).on('click','.swiper2-button-next',function(){
        index += 1;
        if (index > bullet.length - 3) {
          index = 0;
        };
        next();
      });

      swiper2.on('slideChange', function() {
        if (this.realIndex > 2) {
          index += 1;
          if (index > bullet.length - 3) {
            index = bullet.length - 3;
          };

        } else if (this.realIndex === 0) {
          index = 0;
        };
        next();
      });

      function next(){
          $('.swiper-pagination-sec02').css({
            'transform':'translateX(' + -(bulletWidth * index) + 'px)',
            'transition':'.3s'
          });
      }
    });

  },


  sec03Swiper: () => {
    var listArray = ["주택사업","건축사업","토목사업"];
    swiper3 = new Swiper(".section03 .bus_swiper", {
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
        el: '.bus_swiper .swiper-pagination-sec03',
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

      on : {  
        init: function() {
           this.autoplay.stop()
        }
      }

    });

    //마우스 오버시 자동슬라이드 멈춤
    $(".section03 .bus_swiper").each(function(elem, target){
      var swp = target.swiper;
      $(this).hover(function() {
          swp.autoplay.stop();
          // $(this).find('.right').addClass('on');
      }, function() {
          swp.autoplay.start();
          // $(this).find('.right').removeClass('on');
      });

    });

    innerSwiper3 = new Swiper(".section03 .inner_swiper", {
      speed: 500,
      loop: false,
      autoplayDisableOnInteraction: false,
      slidesPerView: 1, 
      watchOverflow: true,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,

      pagination: {
        el: '.section03 .inner_swiper .swiper-pagination',
        clickable: 'true',
        type: 'bullets',
    
      },


    });

    $(".section03 .inner_swiper").each(function(elem, target){
      var innerswp = target.swiper;

      $('.swiper-pagination-sec03 > span').on('click', function(){
        setTimeout(() => {
          innerswp.slideTo(0,0);
        }, 200);
      });
    });

  },

  sec04Card: () => {
    if($('body').width() > 768){

      $('.card li').hover(function() {
        $(this).find('.icon').hide();
        $(this).find('.icon_white').show();
        $(this).find('h3 span').last().addClass('on');

        var idx = $('.card li').index(this);
        $('.counting').each(function() {
          var $this = $('.card li').eq(idx).find('.counting'), /* $(this), */
          countTo = $this.attr('data-count');

          $({ countNum: $this.text()}).animate({
            countNum: countTo
          },
  
          {
            duration: 800,
            easing:'linear',
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum);
            }
          });

        });

      }, function() {
        $(this).find('.icon').show();
        $(this).find('.icon_white').hide();
        $(this).find('h3 span').last().removeClass('on');

        var idx = $('.card li').index(this);
        $('.counting').each(function() {
          var $this = $('.card li').eq(idx).find('.counting');
          
          $({ countNum: $this.text()}).animate({
            countNum: 0
          },
  
          {
            duration: 800,
            easing:'linear',
            step: function() {
              $this.text(Math.floor(this.countNum));
              
            },
            complete: function() {
              $this.text(this.countNum);
            }
          });  

        });
      });

    } else {  // MOBILE

    }

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

  headerEvent: () => {
    $(window).on('scroll',function(){
      $(".header").css("left",0-$(this).scrollLeft());
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

};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **서브**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var civilEngineerEvent = {
  init: function(){
    this.civilTab();
    this.civilSwiper();
  },
  // civilTab: () => {
  //   var Tabs = $('.civil_engineer .tab_box ul li');
  //   Tabs.on("click", function(){
  //     $(this).addClass('on');
  //     $(this).siblings().removeClass('on');
  //   });

  // },

  civilSwiper: () => {
    $(".civil_engineer .outline .swiper").each(function(index){
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

  //사업실적 팝업
  function popupbusiness(popConts) {
    var popthis = $(".popup."+popConts);
      popthis.fadeIn(300);
      setTimeout(() => {
        $('.pop_cont .list img').css({'transform':'scale(1.2)','transition':'all 3s'});
    }, 200);


    popthis.find(".pop_close").click(function(){
        popthis.fadeOut(300);
        setTimeout(() => {
          $('.pop_cont .list img').css({'transform':'scale(1)'});
        }, 200);
    });
  }


var civilOutline = {
  init: function(){
    this.outlineNav();
  },

  outlineNav: () => {

    const section = $('.section');
    const fixSidemenu = $('.civil_engineer .section_nav');
    const fraction = fixSidemenu.find('.fraction');
    const fixmenuHeight = $('.sub_visual_menu').height();
    
    fraction.children('.total_page').text(section.length)

    $(window).on('load resize scroll', function(e) {
      let gap = $(window).height() / 4;
      let currentPosition = $(window).scrollTop() + fixmenuHeight;
      let fractionOut = (section.eq(section.length - 1).innerHeight() / 4) + $('.footer').offset().top - $('.footer').outerHeight();

      if (currentPosition > section.eq(0).offset().top - gap && currentPosition < fractionOut) {
        fixSidemenu.addClass('on');

        section.each(function (index) {
          
          indexName = section.eq(index).find('.tit').text();

          if (index + 1 !== section.length) {

            if (currentPosition > section.eq(index).offset().top - gap && currentPosition < section.eq(index + 1).offset().top) {
              section.eq(index).addClass('active');
              section.not(':eq(' + index + ')').removeClass('active');
              fraction.children('.current_page').text(index + 1);
              fraction.children('.page_name').text(indexName);
            }
          } else {

            if (currentPosition > section.eq(index).offset().top - gap) {
              section.eq(index).addClass('active');
              section.not(':eq(' + index + ')').removeClass('active');
              fraction.children('.current_page').text(index + 1);
              fraction.children('.page_name').text(indexName);
            }
          }

        });

      } else {
        fixSidemenu.removeClass('on');
        section.removeClass('active');
      }
    });

    $('.section_nav .button').on('click', function() {
      let ctlIdx = fraction.children('.current_page').text();

      if ($(this).hasClass('prev') == true) {
        if (ctlIdx == 1) {
          ctlIdx = 0;
        } else {
        ctlIdx = ctlIdx - 2;
        }

        $('html, body').animate({
          scrollTop: section.eq(ctlIdx).offset().top - fixmenuHeight
        }, 500);
      } else {
        $('html, body').animate({
          scrollTop: section.eq(ctlIdx).offset().top
        }, 500);
      }
    })

  },
}

var companyEvent = {
  init: function(){
    this.chart();
  },

  chart: ()=> {
    const graph = $('.investment .graph');
    const graphBarColor = ['#999999', '#f78600', '#e73100'];

    // 그래프 별 작동 토글
    graph.each((index) => {
      const line = graph.eq(index).find('.graph_bg li');
      const bar = graph.eq(index).find('.graph_bar li');
      let maxPercent = graph.eq(index).find('.graph_bg li').eq(0).attr('data-line');

      // 라인 백그라운드 생성
      line.each((idx) => {
        lineData = line.eq(idx).attr('data-line');
        let lineNum = lineData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        line.eq(idx).children('span').text(lineNum);
        if (lineData === '0') {
          line.eq(idx).addClass('standard');
        }
      });

      // 수치 data 기반 바 높이값 생성
      bar.each((i) => {
        let barData = bar.eq(i).attr('data-percent');
        let barNum = barData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        let barPercent = Math.abs(barData) / maxPercent * 100;
        
        if (barData < 0) {
          graph.eq(index).addClass('convert')
          bar.eq(i).addClass('minus');
        }

        bar.eq(i).css({'height': + barPercent + '%', 'background': '' + graphBarColor[i]});
        bar.eq(i).find('> span').text(barNum).css({'border': '.1rem solid' + graphBarColor[i], 'color': '' + graphBarColor[i]});


        // 수치상 '-'값이 있는 경우 그래프 방향 조정
        if (graph.eq(index).hasClass('convert')) {
          let dataMinus = Math.abs(bar.eq(i).attr('data-percent'));

          maxPercent = Math.abs(lineData);
          barPercent = dataMinus / maxPercent * 100;
          bar.eq(i).css('height', + barPercent + '%');
        }

      });

      // '0' 수치 기준점으로 그래프바 위치 고정 및 그래프 비율 조절
      if (line.length) {
        let gH = graph.eq(index).height();
        let zeroH = graph.eq(index).find('.standard').position().top;
        let stdH = graph.eq(index).find('.standard').height() / 2;
        let countH = $('.graph > span').height();
        let barH = $('.convert .graph_bar').height();

        let standardIdx = $('.convert').find('.graph_bg .standard').index() + 1;
        let standardPosition = (gH - (zeroH + stdH + countH)) / 10;
        let standardHeight = (barH / (line.length - 1) * standardIdx) / 10;

        graph.eq(index).find('.graph_bar').css('bottom', + standardPosition + 'rem');
        $('.convert .graph_bar').css({'height': + standardHeight + 'rem'})
      }

      
      
    });
  },
}














































//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                        **모바일**                                                                  ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var mobileEvent = {

init: function(){
  this.civilTabSwiper();
  this.sec02Swiper();
  this.sec03Swiper();
  this.mainScroll();
},

civilTabSwiper: () => {
  var tabSwiper = new Swiper(".civil_engineer .outline_tab_swiper", {
    speed: 500,
    loop: false,
    autoplayDisableOnInteraction: false,
    slidesPerView: 3, 
    a11y : false, 
    simulateTouch: true,
    touchRatio: 0,
    slideToClickedSlide : false,
    allowTouchMove : true, 
    draggable: true,
    watchOverflow: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,

    navigation: {
      nextEl: ".tab-swiper-nav .swiper-button-next",
      prevEl: ".tab-swiper-nav .swiper-button-prev",
    },

  });

},

sec02Swiper: () => {
  var listArray = ["01","02","03"];
  swiper2_m = new Swiper("#mobile .section02 .mobSwiper", {
    speed: 500,
    loop: true,
    autoplayDisableOnInteraction: false,
    slidesPerView: 1, 
    initialSlide: 0,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    watchOverflow: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    observer: true,
    observeParents: true,

    pagination: {
      el: '#mobile .swiper-pagination-sec02',
      clickable: 'true',
      type: 'bullets',
      renderBullet: function (index, className) {
          return '<span class="' + className + '">' + '<em>'+ listArray[index]+'</em>' + '<i></i>' + '<b></b>'  + '</span>';
      },
    },

    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },

    on : {  
      init: function() {
        this.autoplay.stop();
      }
    }

  });

  $(window).on('load resize', function(e) {      
    swiper2_m.on('slideChange', function() {
      index = this.realIndex;
      next();
    });

    function next(){
      const focused = document.querySelector('.swiper-pagination-sec02 .swiper-pagination-bullet-active');

      setTimeout (function() {
          focused.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
      }, 0)
    }
  });

},

sec03Swiper: () => {
  var listArray = ["주택사업","건축사업","토목사업"];
  swiper3_m = new Swiper("#mobile .section03 .bus_swiper_m", {
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
      el: '#mobile .swiper-pagination-sec03',
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

    on : {  
      init: function() {
         this.autoplay.stop()
      }
    }


  });
  //마우스 오버시 자동슬라이드 멈춤
  $("#mobile .section03 .bus_swiper_m").each(function(elem, target){
    var swp = target.swiper;
    $(this).hover(function() {
        swp.autoplay.stop();
    }, function() {
        swp.autoplay.start();
    });
  });

  var innerSwiper3_m = new Swiper("#mobile .section03 .inner_swiper_m", {
    speed: 500,
    loop: false,
    autoplayDisableOnInteraction: false,
    slidesPerView: 1, 
    watchOverflow: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,

    pagination: {
      el: '#mobile .section03 .inner_swiper_m .swiper-pagination',
      clickable: 'true',
      type: 'bullets',
  
    },

  });

  $("#mobile .section03 .inner_swiper_m").each(function(elem, target){
    var innerswp = target.swiper;

    $('#mobile .swiper-pagination-sec03 > span').on('click', function(){
      setTimeout(() => {
        innerswp.slideTo(0,0);
      }, 200);
    });
  });
},

mainScroll: () => {

  $(window).on('scroll', function() {

    var st = $(window).scrollTop();
    var sec2Top = $('#mobile .section02').position().top - 300;
    var sec3Top = $('#mobile .section03').position().top - 300;
    var sec4Top = $('#mobile .section04').position().top - 300;

    if (st > 100) {
      $('.header').removeClass('wht');
      $('.header').addClass('wht_m')
    } else {
      $('.header').addClass('wht');
      $('.header').removeClass('wht_m');
    }


    if (sec3Top > st && st > sec2Top) {
      $('#mobile .section02').addClass('active');
      swiper2_m.autoplay.start();
    } else {
      $('#mobile .section02').removeClass('active');
      swiper2_m.autoplay.stop();
    }


    if ( sec4Top > st && st > sec3Top ) {
      $('#mobile .section03').addClass('active');
      swiper3_m.autoplay.start();
    } else {
      $('#mobile .section03').removeClass('active');
      swiper3_m.autoplay.stop();
    }
  });
},

};
