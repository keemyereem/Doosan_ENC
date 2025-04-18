/* --------------------- DoosanENC Released 2022.08.08 --------------------- */
/* --------------------- Published by 4m Creative --------------------- */

$(function () { });


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                  **골프단 신규 - 2023.03.28**                                                      ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let site = {
  init: function () {
    this.configureResponsiveLayout();
    this.initEvents();
  },

  configureResponsiveLayout: function() {
    // Add 'golf' class to body on window load
    $(window).ready(() => {
      $('body').addClass('golf');
    });

    let $playersSection = $('.section').not('.section1, .section2, .footer');
    if ($('#mobile').length && $('.container').hasClass('golfTeaser')) {
      $playersSection.each((index, element) => {
        let $golfImg = $(element).find('img');
        let mobileUrl = $golfImg.attr('src').replace('.png', '_mob.png');
        $golfImg.attr('src', mobileUrl);
      });
    } else if ($('#mobile').length) {
      let $searchFrame = $('.golf_search');
      $searchFrame.each((index, element) => {
        
        $(element).children('button').each((i, el) => {
          let $golfImg = $(el).find('img');
          let mobileUrl = $golfImg.attr('src').replace(/\.(png|jpg|jpeg|gif)/i, '_mob.$1');
          $golfImg.attr('src', mobileUrl);
        })
        
      });
      
      $(window).on("load scroll resize", function() {
        if ($(this).scrollTop() > 400) {
          $("#topButton").fadeIn();
        } else {
          $("#topButton").fadeOut();
        }
      });
    } else {
      site.createFullPageGolf();
    }
    

    // Add click event to top button
    $(document).on('click', '#topButton', () => {
      if ($('#mobile').length) {
        $("html").animate({ scrollTop: 0 }, "300");
      } else {
        let goTop = location.href.split('#');
        window.location = goTop[0] + '#firstPage';
      }
    });

    // Remove 'wht' class from header on mouse leave
    $('.golf .header').mouseleave(() => {
      $('.header').removeClass('wht');
    });

  },

  createFullPageGolf: function() {

    $("#fullpage").fullpage({
      anchors: [
        "firstPage",
        "secondPage",
        "thirdPage",
        "fourthPage",
        "fifthPage",
        "sixthPage",
        "seventhPage",
      ],
      // Add menu to the right navigation element
      menu: "#rightnavi",
      // Disable vertical centering of sections
      verticalCentered: false,
      // Disable scrollOverflow
      scrollOverflow: false,
      // Set normalScrollElements to '.popup'
      normalScrollElements: '.popup',
      // Enable CSS3 transitions
      css3: true,
      // Set scrolling speed to 800ms
      scrollingSpeed: 800,
      // Set responsive width to 800px
      responsiveWidth: 800,

      // Called on section leave
      onLeave: function (index, nextIndex, direction) {
        // Adjust additional features per anchor
        if (nextIndex == 1) {
          // Show header and hide topButton on the first page
          $('.header').fadeIn(500);
          $(".golf > #topButton").fadeOut(500);
        } else if (nextIndex == $(".section").length) {
          // Hide header and topButton on the last (footer) page
          $('.header').fadeOut(500);
          $(".golf > #topButton").fadeOut(500);
        } else {
          // Hide or show header and topButton depending on the current page and the mobile device
          $("#mobile").length ? $('.header').fadeOut(500) : $('.header').fadeIn(500);
          $(".golf > #topButton").fadeIn(500);
        }

        // Hide rightnavi on the first, second and last (footer) page
        if (nextIndex == 1 || nextIndex == 2 || nextIndex == $(".section").length) {
          $(".golf #rightnavi").hide();
        } else {
          $(".golf #rightnavi").fadeIn(500);
        }

        // Change header style depending on the current page
        if (nextIndex !== 1) {
          setHeaderNormal();
        } else {
          setHeaderWhite();
        }

        // Change header style to white
        function setHeaderWhite() {
          setTimeout(() => {
            $(".header").addClass("wht");
          }, 500);
          $(".golf #sub .header .gnb > ul > li").hover(
              function() {},
              function() {
                $(".header").addClass("wht");
                $(".header").css({ background: "transparent" });
              }
          );
        }

        // Change header style to normal
        function setHeaderNormal() {
          setTimeout(() => {
            $(".header").removeClass("wht");
          }, 500);
          $(".golf #sub .header .gnb > ul > li").hover(
              function() {
                $(".header").css({ background: "#ffffff" });
              },
              function() {
                $(".header").removeClass("wht");
                $(".header").css({ background: "transparent" });
              }
          );
        }

      },

      // Called after section load
      afterLoad: function (anchorLink, index) {
        // Add 'ani' class to the current section
        if (index == index) {
          $('.section').eq(index - 1).addClass('ani')
        }

        // Add 'fin' class to the footer span element on the last (footer) page
        if (index == $(".section").length) {
          setTimeout(() => {
            $(".footer .sec_tit > span").addClass("fin");
          }, 200);
        }
      },

      afterResponsive: function(isResponsive) {
        if (isResponsive && !$('.container').hasClass('golfTeaser')) {
          $('.section').addClass('fp-auto-height-responsive');
        }
      }
    });

  },

  initEvents: function() {
    commonEvent.init();
    companyEvent.init();
    golfPlayers.init();
  }
};


let golfPlayers = {
  init: function () {
    this.popupForGolf();
    this.bannerCarousel();
    this.playerCarousel();
    this.popup01();
    this.popup02();
    this.popup03();
  },

  popupForGolf: function() {
    let LayerPopup1 = $('.popup .pop_players'),
        LayerPopup2 = $('.popup .pop_news'),
        LayerPopup3 = $('.popup .pop_gallery'),
        popupClose = $(".pop_close"),
        popBtn = $('.openPopup'),
        $section2Cursor = $(".seciton2_cursor");

    let popup = document.querySelector(".popup"),
        circle = document.querySelector(".pop_close");


    // 영역 밖 이동 시 마우스 닫기 버튼 보이기
    $(document).on('mousemove', function (e) {
      if (!$('#mobile').length) {
        if ($('.popup').children('ul').has(e.target).length === 0) {
          popupClose.css({ transform: "scale(1)" });
        } else {
          popupClose.css({ transform: "scale(0)" });
        }

        let $section2Active = $('.splide__slide.is-active');
        if ($section2Active.has(e.target).length === 0) {
          $section2Cursor.css({ transform: "scale(0)" });
        } else {
          let ctlX = e.clientX - 45,
              crlY = e.clientY - 45;

          $section2Cursor.css({transform: "scale(1)", left: ctlX, top: crlY});
          e.stopPropagation();
        }
      }
    });

    // 영영 밖 이동 시 마우스 닫기 버튼  커서 따라다니기
    popup.addEventListener("mousemove", (e) => {
      if (!$('#mobile').length) {
        let mouseX = e.clientX;
        let mouseY = e.clientY;

        circle.style.left = mouseX - 35 + "px";
        circle.style.top = mouseY - 35 + "px";
      }

    });

    $(window).on("scroll", function () {
      $(".popup > ul").css("left", 0 - $(this).scrollLeft());
      $section2Cursor.css('margin-left', 0 + $(this).scrollLeft());
    });

    popBtn.on('click', function() {
      $("html").addClass("blockScroll");
      $('.popup').addClass('on');
      
      let slide = $(this).closest('.splide__slide');
      let newsList = $(this).closest('.news_list');
      
      if (slide.length) {
        LayerPopup1.css('display', 'flex');
      } else if (newsList.length) {
        LayerPopup2.css('display', 'block');
      } else {
        LayerPopup3.css('display', 'flex');
      }
    });

    popupClose.on("click", () => {
      // 팝업 닫기 function
      $("html").removeClass("blockScroll");
      $(".popup, .popup > ul").fadeOut(300);
      
      const videoElement = LayerPopup1.find('.video');
      if (videoElement.length) {
        videoElement.removeClass('on');
      }
    });
  },
  
  bannerCarousel: function() {
    
    // Initialize the Swiper slider for golf
    function initGolfSwiper() {
      const golfBanner = new Swiper(".swiperGolf1", {
        spaceBetween: 30,
        effect: "fade",
        speed: 500,
        loop: true,
        autoplay: {
          delay: 3000
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          init: function() {
            // Call mobileImageTransfer function on initialization
            mobileImageTransfer();
          },
          slideChangeTransitionStart: function() {
            const txtPieceChild = $('.txtPiece span');
            txtPieceChild.addClass('slideUp');
            txtPieceChild.on('transitionend', function() {
              const selTitParent = $('.golfMain .section1 article');
              let selTit = $(".swiper-slide-active h2").html().split('<br>');
              
              // 영문버전에서 번역문 길어짐으로 인한 개행추가 방지문
              if ($('.en').length) {
                if ($("#mobile").length) {
                  selTit = $(".swiper-slide-active h2").html().split('<br class="br_m">');
                } else {
                  selTit = $(".swiper-slide-active h2").html().split('<br class="br_pc">');
                }
              }
              
              devideWord(selTit, selTitParent);
            })
          },
          slideChangeTransitionEnd: function() {
            $('.txtPiece').each(function(index) {
              $('.txtPiece').eq(index).children('span').css('transition-delay', index * 0.06 + 's');
            });
            $('.txtPiece span').removeClass('slideUp');
          }
        }
      });
      
      // Restart autoplay on banner arrow click
      const bannerArrow = $('.section1 article > div');
      bannerArrow.children().on('click', function() {
        golfBanner.autoplay.start();
      });
      
      // Replace image URLs with mobile version for smaller screens
      function mobileImageTransfer() {
        const slideMob = $('.swiper-slide');
        if ($('#mobile').length) {
          slideMob.each(function(index) {
            const golfImgUrl = slideMob.eq(index).find('img');
            const mobileUrl = golfImgUrl.attr('src').replace(/\.(png|jpg|jpeg|gif)/i, '_mob.$1');
            golfImgUrl.attr('src', mobileUrl);
          });
        }
        checkWord();
      }
      
      // Split the text into separate H2 tags and style them
      function devideWord(selTitSplit, selTitParent) {
        selTitParent.children('h2').remove();
        for (let i = selTitSplit.length - 1; i >= 0; i--) {
          let txt = i;
          selTitParent.prepend(`<h2 class="txtPiece"><span class="slideUp">${selTitSplit[txt]}</span></h2>`);
          if ($('.txtPiece').length < selTitSplit.length) {
            txt = (selTitSplit.length - 1) - $('.txtPiece').length;
          } else if (selTitSplit.length == 1) {
            selTitParent.children('h2').after('<h2>&nbsp;</h2>');
          }
        }
        
        // 메인배너 슬라이드 개별 제어 공간 ----------------------------------------------------------------------
        
        if (golfBanner.realIndex === 1 && !$('#mobile').length) { // 골프단 3번째 타이틀 크기 및 자간조정 추가 - 2023.05.18 (3번째 -> 2번째 변경 2023.05.22)
          selTitParent.children('h2').css({'letter-spacing': '-.35rem', 'font-size' : '5.2rem', 'padding': '.525rem 0'});
          
        } else if (golfBanner.realIndex === 2 && $('.golfMain.en').length && !$('#mobile').length) { // 골프단 영문버전 3번째 타이틀 크기 및 자간조정 추가 2023.05.25
          selTitParent.children('h2').css({'letter-spacing': '-.35rem'});
        }
        
        // ---------------------------------------------------------------------- 메인배너 슬라이드 개별 제어 공간
        
        checkWord();
      }
      
      // Check if the text contains mixed font families
      function checkWord() {
        const txtPiece = $('.txtPiece');
        const check_kor = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
        txtPiece.each((index) => {
          const check_txt = txtPiece.eq(index).text();
          if (!check_kor.test(check_txt)) {
            txtPiece.eq(index).css("font-family", '"Montserrat", sans-serif');
          }
        });
      }
    }

    // Call the initGolfSwiper function on document ready
    $(document).ready(function() {
      initGolfSwiper();
    });
  },
  
  playerCarousel: function() {
    // 선수소개 슬라이드
    let splide = new Splide( '.splide', {
      type   : 'loop',
      perPage: 5,
      perMove: 1,
      focus  : 'center',
      snap   : true,
      speed: 500,
      easing: 'cubic-bezier(0,0,.23,1)',
      autoWidth: true,
      pagination: false,
      updateOnMove: true,
      autoplay: true,
      interval: 3000,
      flickPower: 10,
      breakpoints: {
        640: {
          autoWidth: true,
          perPage: 1,
        },
        1024: {
          autoWidth: true,
          perPage: 3,
        }
      }
      
    }).mount();
    
    const navBtn = $('.desc_pagination');
    
    let $section2Slide = $('.splide__slide'),
      $section2Cursor = $('.seciton2_cursor'),
      popBtn = $('.openPopup'),
      popClose = $('.pop_close');
      
    
    const { Autoplay } = splide.Components;
    
    // ●● click ●● 페이지네이션 버튼 클릭 시
    navBtn.on('click', function() {
      // 이전, 다음버튼 클릭 시 splide 슬라이더 동작
      $(this).hasClass('next') ? splide.go( '+1' ) : splide.go( '-1' );
    });
    
    // 골프단 페이지 모든 팝업을 실행할 경우 선수소개 슬라이드는 멈춤.
    popBtn.on('click', function(e) {
      if ($('.popup').hasClass('on')) {
        Autoplay.pause();
      };
      
      // 끝쪽 선수카드 일부가 팝업이 안열리는 버그 - 기존의 팝업 오픈이벤트 복사
      // let clickIdx = Number($(this).parent().index());
      // splide.go(clickIdx);
      //
      // $(".popup").fadeIn(300);
      // $(".popup").addClass("on");
      // $("html").addClass("blockScroll");
      //
      // let slide = $(this).closest('.splide__slide');
      // let LayerPopup1 = $('.popup .pop_players');
      //
      // if (slide.length) {
      //   LayerPopup1.css('display', 'flex');
      // }
    })
    
    // 모든 팝업 닫기버튼을 누르면 오토플레이 재개
    popClose.on('click', function() {
      Autoplay.play();
    })
    
    
    // ********************************************* 문제 발생 시, 해당코드 삭제 2023.05.25
    
    // Arrow 버튼 클릭 하면 오토플레이 재개 2023.05.25
    let toggleButton = document.querySelectorAll('.sec2_ap' );
    [].forEach.call(toggleButton,function(toggleButton){
      toggleButton.addEventListener("click", click, false);
    });
    
    function click(e){
      //if ( Autoplay.isPaused() ) {
        Autoplay.play();
        console.log('dd')
      //} else {
        //Autoplay.pause();
      //}
    };
    
    // 문제 발생 시, 해당코드 삭제 2023.05.25 *********************************************
    

    // ********* 모바일 환경
    if ($('#mobile').length) {
      $section2Cursor.remove();
      $section2Slide.children().append($section2Cursor.clone());
      $section2Slide.find('.seciton2_cursor').on('click', function() {
        $(this).parent().trigger( "click" );
      });
      
      $section2Slide.each(function(index) {
        let golfImgUrl = $section2Slide.eq(index).find('.mask_circle img');
        let mobileUrl = golfImgUrl.attr('src').replace(/\.(png|jpg|jpeg|gif)/i, '_mob.$1');
        golfImgUrl.attr('src', mobileUrl);
      });
      
      
    }
  
  },

  popup01: function() {
    // ●● const ●● 재생버튼, 페이지네이션 버튼, 각 선수들의 동영상 프레임 ID
    const playBtn = $('#btn-play'),
          navBtn = $('.desc_pagination'),
          popup = $('.popup'),
          popBtn = $('.openPopup'),
          navNum = $('.desc_number'),
          imageCont = $('.tab .img'),
          tabCont = $('.tab_container');
          
    // 각 선수 정보(개발반영시 변경 예상)
    // 0 동영상/ 1 이미지/ 2 이름/ 3 영문이름/ 4 인터뷰/ 5 생년월일/ 6 입회년도/ 7 데뷔전/ 8 명칭 풀네임/ 9 주요성적
    const selectPlayers = [
      [
        "818591181",
        "images/golf/player_yhj.png",
        "유현주",
        "Yoo Hyunju",
        "“평소 투어프로로서의 경험 뿐 아니라 방송, 모델, <br class='br_m'>인플루언서 등 <br class='br_pc'>여러 분야에서 다양한 경험을 <br class='br_m'>‘갖고(have)’ 싶다고 생각했어요.”",
        "1994년 02월 28일",
        "2011년 10월",
        "2012년 제5회 롯데마트 여자오픈",
        "유현주 프로",
        [
          ["2024", "<i>노랑통닭 큐캐피탈파트너스 드림챌린지 1차전 5위</i>"],
          ["2022", "<i>지에이코리아 드림투어 2차전 6위</i>"],
          ["2021", "<i>무안CC·올포유 드림투어 4차전 14위</i>"],
          ["2020", "<i>제주삼다수 마스터스 25위</i>"],
          ["2017", "<i>MY 문영 퀸즈파크 챔피언십 2017 25위</i>"],
          ["2016", "<i>팬텀 클래식 With YTN 27위</i>"],
          ["2012", "<i>BS금융그룹 부산은행ㆍ서울경제 여자오픈 14위</i>"],
        ],
      ],
      [
        "818598210",
        "images/golf/player_yhyoj.jpg",
        "유효주",
        "Yoo Hyoju",
        "“제 인생의 동반자인 골프와 함께 즐겁게 <br class='br_m'>‘살고(live)’ 싶고, <br class='br_pc'>언젠가는 We've에 제 집을 마련해서 행복하게 살고 싶어요.”",
        "1997년 04월 21일",
        "2015년 10월",
        "2017년 롯데렌터카 여자오픈",
        "유효주 프로",
        [
          ["2024", "<i>두산 매치플레이 9위</i>"],
          [
            "2022",
            "<i><b>WEMIX 챔피언십 with 와우매니지먼트그룹 SBS Golf 우승</b></i>",
          ],
          ["2021", "<i>롯데 오픈 7위</i>"],
          ["2017", "<i>KB금융 스타챔피언십 3위</i>"],
        ],
      ],
      [
        "000000000",
        "images/golf/player_lyl.jpg",
        "이율린",
        "Lee Yoollyn",
        "“필드라는 공간에서 골프를 칠 때, <br>저는 가장 ‘살아있다(live)’고 느껴요. <br>필드는 저에게 '기쁨을 주는 공간'이에요.”",
        "2002년 12월 29일",
        "2022년 08월",
        "2023년 롯데렌터카 여자오픈",
        "이율린 프로",
        [
          [
            "2024",
            "<i>KLPGA 2025 정규투어 시드순위전 1위</i><br>" +
              "<i><b>덕신EPC·서울경제 레이디스 클래식 2위</b></i><br>" +
              "<i>넥센 세인트나인 마스터즈 2024 15위</i>",
          ],
          ["2023", "<i>동부건설 한국토지신탁 챔피언십 7위</i>"],
          ["2021", "<i>강민구배 제45회 한국여자아마추어골프선수권대회 3위</i>"],
          [
            "2020",
            "<i><b>국가대표 선발전 여자부 1위</b></i><br>" +
              "<i><b>제11회 KLPGA 회장배 여자아마추어골프선수권대회 우승</b></i><br>" +
              "<i>강민구배 제44회 한국여자아마추어골프선수권대회 2위</i>",
          ],
        ],
      ],
      [
        "818590506",
        "images/golf/player_pk.jpg",
        "박결",
        "Park Gyeol",
        "“어릴 때부터 골프를 너무 사랑해서 <br class='br_m'>골프선수가 되었고, <br class='br_pc'>현재 골프선수로 많은 <br class='br_m'>팬들의 사랑을 받고 있다고 생각해요. <br>그런 의미에서 저에게 골프는 ‘love’나 다름없죠.”",
        "1996년 01월 09일",
        "2014년 10월",
        "2015년 제8회 롯데마트 여자오픈",
        "박결 프로",
        [
          ["2024", "<i>제12회 E1 채리티 오픈 3위</i>"],
          [
            "2023",
            "<i>대보하우스디 오픈 4위</i><br>" +
              "<i>에버콜라겐·더시에나 퀸즈 크라운 2923 3위</i><br>" +
              "<i>제45회 크리스 F&C KLPGA 챔피언십 2위</i>",
          ],
          ["2022", "<i>넥센∙세인트나인 마스터즈 2022 3위</i>"],
          [
            "2018",
            "<i><b>SK네트웍스∙서울경제 레이디스 클래식 우승</b></i> <br>" +
              "<i>제12회 S-OIL 챔피언십 2위</i> <br>" +
              "<i>효성 챔피언십 with SBS 2위</i>",
          ],
          ["2017", "<i>삼천리 Together Open 2017 2위</i>"],
          ["2016", "<i>초정탄산수 용평리조트 오픈 with SBS 2위</i>"],
          [
            "2015",
            "<i>제16회 하이트진로 챔피언십 2위</i> <br>" +
              "<i>2015 NH투자증권 레이디스 챔피언십 2위</i>",
          ],
          [
            "2014",
            "<i><b>인천아시안게임 여자골프 개인전 금메달</b></i> <br>" +
              "<i>인천아시안게임 여자골프 단체전 은메달</i>",
          ],
        ],
      ],
      [
        "818589792",
        "images/golf/player_kms.jpg",
        "김민솔",
        "Kim Minsol",
        "“아직 부족한 점이 많기 때문에 한 타 한 타 <br class='br_m'>save 하는 것처럼 <br class='br_pc'>체력, 스킬, 멘탈 등 <br class='br_m'>모든 것을 성실하게 잘 ‘관리해서(save)’ <br>발전하는 선수가 되고 싶어요.”",
        "2006년 06월 15일",
        "2024년 07월",
        " ",
        "김민솔 선수",
        [
          [
            "2024",
            "<i>두산건설 We've 챔피언십 8위</i><br>" +
              "<i>제10회 교촌 1991 레이디스 오픈 2위</i>",
          ],
          [
            "2023",
            "<i><b>아부다비 세계선수권대회 단체전 우승</b></i><br>" +
            "<i><b>제104회 전국체육대회 개인전 우승</b></i><br>" +
            "<i>제19회 항저우 아시안게임 여자골프 단체전 은메달</i><br>" +
            "<i>OK금융그룹 읏맨 오픈 5위</i><br>" +
            "<i>두산건설 We've 챔피언십 9위</i><br>" +
            "<i><b>제4회 드림파크배 아마추어골프선수권 대회 우승</b></i><br>" +
            "<i>DB그룹 제37회 한국여자오픈 골프선수권대회 4위</i><br>" +
            "<i>아시아 태평양 여자 아마추어 챔피언십(WAAP) 2위</i><br>",
          ],
          [
            "2022",
            "<i>LPGA BMW 레이디스 챔피언십 10위</i> <br>" +
            "<i><b>제29회 송암배 아마추어골프선수권대회 우승</b></i> <br>" +
            "<i><b>블루원배 제39회 한국주니어골프선수권대회 우승</b></i> <br>" +
            "<i>강민구배 제46회 한국여자아마추어골프선수권대회 3위</i> <br>",
          ],
        ],
      ],
      [
        "000000000",
        "images/golf/player_phj.jpg",
        "박혜준",
        "Park Hyejun",
        "“골프에서는 어려운 상황에서도<br>한 타를 '지켜내는(save)' 것이 중요하기에<br class='br_m'> 위기 상황에서도<br class='br_pc'>지혜롭게 스코어를 지켜가는<br class='br_m'> 선수가 되고 싶어요.”",
        "2003년 05월 02일",
        "2021년 08월",
        "2022년 롯데렌터카 여자오픈",
        "박혜준 선수",
        [
          [
            "2024",
            "<i><b>두산건설 We've 챔피언십 2위</b></i><br>" +
              "<i><b>제11회 제주삼다수 마스터스 2위</b></i><br>" +
              "<i>동부건설·한국토지신탁 챔피언십 4위</i><br>" +
              "<i>NH투자증권 레이디스 챔피언십 8위</i>",
          ],
          [
            "2023",
            "<i>엠씨스퀘어·군산CC 드림투어 2차전 2위</i><br>" +
              "<i>드림투어 5차전 3위</i><br>" +
              "<i>드림투어 13차전 3위</i><br>" +
              "<i>SBS골프·롯데 오픈 드림투어 4위</i><br>",
          ],
          [
            "2022",
            "<i>지에이코리아 드림투어 2차전 3위</i> <br>" +
              "<i>톨비스트·휘닉스CC 드림투어 11차전 4위</i> <br>" +
              "<i>톨비스트·휘닉스CC 드림투어 55차전 5위</i> <br>",
          ],
          [
            "2021",
            "<i><b>XGOLF·백제CC 점프투어 3차전 우승</b></i> <br>" +
              "<i><b>그랜드·삼대인 점프투어 8차전 우승</b></i> <br>" +
              "<i>그랜드·삼대인 점프투어 7차전 2위</i> <br>",
          ],
        ],
      ],
      [
        "818599469",
        "images/golf/player_lhj.jpg",
        "임희정",
        "Lim Heejeong",
        "“투어 중 어려운 상황에 직면해도 <br class='br_m'>항상 최선의 답을 찾아 <br class='br_pc'>‘해결하는(solve)’ <br class='br_m'>임희정이 되고 싶어요.”",
        "2000년 09월 02일",
        "2018년 10월",
        "2018년 효성 챔피언십",
        "임희정 프로",
        [
          [
            "2024",
            "<i>맥콜·모나 용평 오픈 7위</i> <br>" +
              "<i>롯데 오픈 8위</i> <br>" +
              "<i>한화 클래식 2024 7위</i> <br>" +
              "<i>SK텔레콤·SK쉴더스 챔피언십 8위</i>",
          ],
          ["2023", "<i>상상인·한국경제TV 오픈 2023 2위</i>"],
          [
            "2022",
            "<i><b>DB그룹 제36회 한국여자오픈 골프선수권대회 우승</b></i>",
          ],
          [
            "2021",
            "<i>BMW Ladies Championship 2위</i> <br>" +
              "<i>제21회 하이트진로 챔피언십 2위</i> <br>" +
              "<i><b>국민쉼터 하이원 리조트 여자오픈 2021 우승</b></i> <br>" +
              "<i>대유위니아∙MBN 여자오픈 2위</i> <br>",
          ],
          [
            "2020",
            "<i>아이에스동서 부산오픈 2위</i> <br>" +
              "<i>제42회 KLPGA 챔피언십 2위</i> <br>",
          ],
          [
            "2019",
            "<i><b>KB금융 스타챔피언십 우승</b></i> <br>" +
              "<i><b>올포유∙레노마 챔피언십 2019 우승</b></i> <br>" +
              "<i><b>하이원리조트 여자오픈 2019 우승</b></i>",
          ],
        ],
      ],
    ];

    // 각 선수 정보(개발반영시 변경 예상) - 영문
    const selectPlayersEn = [
      // 유현주 프로
      [
        "Hyunju Yoo",
        "“I have thought that I wanna ‘have’ various experiences in many other careers, like on TV, model, and influencer, as well as my regular career on the golf tours.”",
        "Feb. 28. 1994",
        "Oct. 2011",
        "2012 5th Lotte Mart Ladies Open",
        "Professional golfer, <br>Hyunju Yoo",
        [
          [
            "2024",
            "<i>5th Place in the 2024 Norang Tongdak Q Capital Partners Dream Challenge Round 1</i>",
          ],
          ["2022", "<i>6th Place in the 2022 GA Korea Dream Tour Round 2</i>"],
          [
            "2021",
            "<i>14th Place in the 2021 Muan CC · All For You Dream Tour Round 4</i>",
          ],
          ["2020", "<i>25th place in the Jeju Samdasoo Masters</i>"],
          [
            "2017",
            "<i>25th place in the 2017 MY Munyeong Queen’s Park Championship</i>",
          ],
          ["2016", "<i>27th place in the Phantom Classic with YTN</i>"],
          [
            "2012",
            "<i>14th place in the BS Financial Group Busan BankㆍSeoul Economic Daily Women's Open</i>",
          ],
        ],
      ],
      // 유효주 프로
      [
        "Hyoju Yoo",
        "“I want to 'live' joyfully with golf, my lifelong companion, and someday, I want to have my own home in We've and live happily.”",
        "Apr. 21. 1997",
        "Oct. 2015",
        "2017 Lotte Rent-a-Car Ladies Open",
        "Professional golfer, <br>Hyoju Yoo",
        [
          ["2024", "<i>9th Place in the 2024 Doosan Match Play</i>"],
          [
            "2022",
            "<i><b>Winner in the WEMIX Championship with Wow Management Group SBS Golf</b></i>",
          ],
          ["2021", "<i>7th place in the Lotte Open</i>"],
          ["2017", "<i>3rd place in the KB Financial Star Championship</i>"],
        ],
      ],
      // 이율린 프로
      [
        "Lee Yoollyn",
        "“When I play golf on the field, I feel the most 'live'. The field is a space that gives me joy.”",
        "Dec. 29. 2002",
        "Aug. 2022",
        "2023 Lette Rent a car Ladies Open",
        "Professional golfer, <br>Lee Yoollyn",
        [
          [
            "2024",
            "<i>1st Place in the KLPGA 2025 Regular Tour Seed Ranking Tournament</i><br>" +
              "<i><b>2nd Place in the Deokshin EPC · Seoul Economic Ladies Classic</b></i><br>" +
              "<i>15th Place in the Nexen Saintnine Masters 2024</i>",
          ],
          [
            "2023",
            "<i>7th Place in the Dongbu Construction · Korea Land Trust Championship</i>",
          ],
          [
            "2021",
            "<i>3rd Place in the Kang Min-goo Cup 45th Korea Women’s Amateur Golf Championship</i>",
          ],
          [
            "2020",
            "<i><b>1st Place in the National Team Selection Tournament (Women’s Division)</b></i><br>" +
              "<i><b>Winner in the 11th KLPGA President’s Cup Women’s Amateur Golf Championship</b></i><br>" +
              "<i>2nd Place in the Kang Min-goo Cup 44th Korea Women’s Amateur Golf Championship</i>",
          ],
        ],
      ],
      // 박결 프로
      [
        "Gyeol Park",
        "“Since I was young, I loved golf so much and became the golfer. Also, that’s why I have been loved by many fans. In that sense, golf is ‘love’ to me.”",
        "Jan. 9. 1996",
        "Oct. 2014",
        "2015 8th Lotte Mart Ladies Open",
        "Professional golfer, <br>Gyeol Park",
        [
          ["2024", "<i>3rd Place in the 12th E1 Charity Open</i>"],
          [
            "2023",
            "<i>4th Place in the Daebo HausD Open</i><br>" +
              "<i>3rd Place in the Evercollagen · The Siena Queen’s Crown 2923</i><br>" +
              "<i>2nd Place in the 45th Chris F&C KLPGA Championship</i>",
          ],
          ["2022", "<i>3rd place in the 2022 Nexen∙SaintNine Masters</i>"],
          [
            "2018",
            "<i><b>Winner in the SK Networks∙Seoul Economic Daily Ladies Classic</b></i> <br>" +
              "<i>2nd place in the 12th S-OIL Championship</i> <br>" +
              "<i>2nd place in the 2018 Hyosung Championship with SBS</i>",
          ],
          ["2017", "<i>2nd place in the 2017 Samchuly Together Open</i>"],
          [
            "2016",
            "<i>2nd place in the 2016 ChoJung Sparkling Water Yongpyong Resort Open with SBS</i>",
          ],
          [
            "2015",
            "<i>2nd place in the 16th Hite Jinro Championship</i> <br>" +
              "<i>2nd place in the 2015 NH Investment & Securities Ladies Championship</i>",
          ],
          [
            "2014",
            "<i><b>Gold Medal in Women's Individual Golf at the Incheon Asian Games</b></i> <br>" +
              "<i>Silver Medal in Women's Team Golf at the Incheon Asian Games</i>",
          ],
        ],
      ],
      // 김민솔 선수
      [
        "Minsol Kim",
        "“I think I still need to be improved. So, I wanna ‘save’ all aspects well, like physical strength, skills, mental management, like steadily saving strokes one by one.”",
        "Jun. 15. 2006",
        "July 2024",
        " ",
        "Amateur golfer, <br>Minsol Kim",
        [
          [
            "2024",
            "<i>8th Place in the Doosan Construction We've Championship</i><br>" +
              "<i>2nd Place in the 10th Kyochon 1991 Ladies Open</i>",
          ],
          [
            "2023",
            "<i><b>Winner in the Team Event at the Abu Dhabi World Championship</b></i><br>" +
              "<i><b>1st Place in the Individual Event at the 104th National Sports Festival</b></i><br>" +
              "<i>Silver Medal in Women's Team Golf at the 19th Hangzhou Asian Games</i><br>" +
              "<i>5th Place in the OK Financial Group Eunman Open</i><br>" +
              "<i>9th Place in the Doosan Engineering & Construction We've Championship</i><br>" +
              "<i><b>1st Place in the 4th Dream Park Amateur Golf Championship</b></i><br>" +
              "<i>4th Place in the 37th DB Group Korea Women's Open Golf Championship</i><br>" +
              "<i>2nd Place in the Asia-Pacific Women's Amateur Championship (WAAP)</i><br>",
          ],
          [
            "2022",
            "<i>10th Place in the LPGA BMW Ladies Championship</i> <br>" +
              "<i><b>1st Place in the 29th Song-Am Cup Amateur Golf Championship</b></i> <br>" +
              "<i><b>1st Place in the 39th BlueOne Korea Junior Golf Championship</b></i> <br>" +
              "<i>3rd Place in the 46th Kang Min Koo Korea Women's Amateur Golf Championship</i> <br>",
          ],
        ],
      ],
      // 박혜준 선수
      [
        "Park Hyejun",
        "“In golf, it is important to 'save' a stroke even in difficult situations. That’s why I want to be a player who wisely saves my score even in moments of crisis.”",
        "May 2. 2003",
        "Aug. 2021",
        "2022 Lette Rent a car Ladies Open",
        "Amateur golfer, <br>Park Hyejun",
        [
          [
            "2024",
            "<i><b>2nd Place in the Doosan Construction We've Championship</b></i><br>" +
              "<i><b>2nd Place in the 11th Jeju Samdasoo Masters</b></i><br>" +
              "<i>4th Place in the Dongbu Construction · Korea Land Trust Championship</i><br>" +
              "<i>8th Place in the NH Investment & Securities Ladies Championship</i>",
          ],
          [
            "2023",
            "<i>2nd Place in the MC Square · Gunsan CC Dream Tour Round 2</i><br>" +
              "<i>3rd Place in the Dream Tour Round 5</i><br>" +
              "<i>3rd Place in the Dream Tour Round 13</i><br>" +
              "<i>4th Place in the SBS Golf · Lotte Open Dream Tour</i><br>",
          ],
          [
            "2022",
            "<i>3rd Place in the GA Korea Dream Tour Round 2</i> <br>" +
              "<i>4th Place in the Tolvlist · Phoenix CC Dream Tour Round 11</i> <br>" +
              "<i>5th Place in the Tolvlist · Phoenix CC Dream Tour Round 55</i> <br>",
          ],
          [
            "2021",
            "<i><b>Winner in the XGOLF · Baekje CC Jump Tour Round 3</b></i> <br>" +
              "<i><b>Winner in the Grand · Samdain Jump Tour Round 8</b></i> <br>" +
              "<i>2nd Place in the Grand · Samdain Jump Tour Round 7</i> <br>",
          ],
        ],
      ],
      // 임희정 프로
      [
        "Heejeong Lim",
        "“Even when I face many challenges while on tour, I just wanna be myself, Heejeong Lim who always ‘solve’ them with the best solutions.”",
        "Sep. 2. 2000",
        "Oct. 2018",
        "2018 Hyosung Championship",
        "Professional golfer, <br>Heejeong Lim",
        [
          [
            "2024",
            "<i>7th Place in the McCol · Mona Yongpyong Open</i> <br>" +
              "<i>8th Place in the Lotte Open</i> <br>" +
              "<i>7th Place in the Hanwha Classic 2024</i> <br>" +
              "<i>8th Place in the SK Telecom · SK Shields Championship</i>",
          ],
          ["2023", "<i>2nd Place in the SangSangin · Korea Economic TV Open 2023</i>"],
          [
            "2022",
            "<i><b>Winner in the DB Group 36th Korea Women’s Open Golf Championships</b></i>",
          ],
          [
            "2021",
            "<i>2nd place in the BMW Ladies Championship</i> <br>" +
              "<i>2nd place in the 21st Hite Jinro Championship</i> <br>" +
              "<i><b>Winner in the 2021 High1 Resort Ladies Open</b></i> <br>" +
              "<i>2nd place in the Dayouwinia∙MBN Ladies Open</i> <br>",
          ],
          [
            "2020",
            "<i>2nd place in the 2020 IS Dongseo Busan Open</i> <br>" +
              "<i>2nd place in the 42nd KLPGA Championship</i> <br>",
          ],
          [
            "2019",
            "<i><b>Winner in the 2019 KB Financial Group Star Championship</b></i> <br>" +
              "<i><b>Winner in the 2019 All For You∙Renoma Championship</i> <br>" +
              "<i><b>Winner in the 2019 High1 Resort Ladies Open</b></i>",
          ],
        ],
      ],
    ];

    // ●● let ●● 아이프레임 정보
    let iframe = $('iframe'),
        selFrameUrl = iframe.attr('src');

    // ●● let ●● 활성화 인덱스 넘버, 플레이어 변수 초기화
    let selPnum = 0,
        player = null;


    // ●● click ●● 팝업 오픈 시
    popBtn.on('click', function(e) {
      
      if ($('.pop_players').css('display') === 'flex') {
        // selPnum값 부여
        selPnum = $(this).parent().attr('data-index');
        navNum.children('span').text(Number(selPnum) + 1);

        // function vimeoRender/imageRender/descRender ● - 활성화 인덱스 비디오 플레이어 출력
        imageRender();
        vimeoRender();
        descRender();
      }
    });


    // ●● click ●● 탭버튼 클릭 시 
    tabCont.children().on('click', function() {
      $(this).addClass('on').siblings().removeClass('on');
      if ($(this).index() !== 0) {
        $('.video').addClass('on');
      } else {
        $('.video').removeClass('on');
        vimeoRender();
      }
    });

    // ●● click ●● 페이지네이션 버튼 클릭 시
    navBtn.on('click', function() {
      selPnum = navNum.children('span').text() - 1;

      // 이전, 다음버튼 클릭 시 selPnum증감
      selPnum = $(this).hasClass('next') ? (selPnum + 1) % selectPlayers.length : (selPnum + selectPlayers.length - 1) % selectPlayers.length;
      navNum.children('span').text(Number(selPnum) + 1);

      $('.video').removeClass('on');
      tabCont.children().first().addClass('on').siblings().removeClass('on');

      popup.animate({scrollTop: 0}, 200);

      // function vimeoRender/imageRender/descRender ●
      vimeoRender();
      imageRender();
      descRender();
    });
    
    // ●● click ●● 플레이버튼 클릭 시
    playBtn.on('click', function(e) {
      e.preventDefault();

      // 플레이어 변수 감지 후 초기화
      if (player === null) {
        player = new Vimeo.Player(iframe);
      }

      // 컨트롤 바 생성
      let useCtr = selFrameUrl.replace(/(controls=0)/g, function(vl){
        if (vl === "controls=0") {
          return "controls=1";
        }
      });

      // 컨트롤바를 생성한 아이프레임 리렌더링
      let newIframe = $('<iframe/>', {
        src: useCtr,
        width: '100%',
        height: '100%',
        frameborder: '0',
        webkitallowfullscreen: '',
        mozallowfullscreen: '',
        allowfullscreen: '',
        allow: 'autoplay',
        class: 'vimeo01',
      });

      // 기존 아이프레임을 리렌더링된 아이프레임으로 교체
      iframe.replaceWith(newIframe);
      iframe = newIframe;

      // 교체된 아이프레임으로 플레이어 생성
      player = new Vimeo.Player(iframe);
      
      // 플레이어가 재생될 준비가 되면 재생버튼 사라짐/ 플레이 시작
      player.ready().then(() => {
        playBtn.fadeOut(200);
        player.play();
      });

      player.on('pause', function() {
        console.log('중지상태')
      })
    });

    // ●● function/vimeoRender ●●
    function vimeoRender() {
      // 현재 아이프레임 src값에서 ../video/ 이후 id값을 추출
      let vurl = selFrameUrl.match(/player.vimeo.com\/video\/(\d+)/i);

      // 추출한 id값을 활성화된 인덱스(선수) id값으로 교체
      selFrameUrl = selFrameUrl.replace(vurl[1], selectPlayers[selPnum][0]);

      // 교체한 src값을 아이프레임 src값에 치환
      iframe.attr('src', selFrameUrl).fadeOut(100);

      // 로딩전까지 다음/이전버튼 비활성화 및 재생버튼 감추기
      navBtn.addClass('disable');
      navBtn.parents('.desc_pagination_wrap').css('cursor', 'progress');
      playBtn.hide();

      // 위의 단계를 모두 완료한 시점(준비된 상태)이면 재생버튼 나타남
      iframe.load(function() {
        playBtn.fadeIn(100);
        iframe.fadeIn(100);
        navBtn.removeClass('disable');
        navBtn.parents('.desc_pagination_wrap').css('cursor', 'auto');
      }) 
    }

    // ●● function/imageRender ●●
    function imageRender() {
      // Preload the new image
      let newImage = new Image(),
          image = imageCont.children('img');

      newImage.src = selectPlayers[selPnum][1];

      newImage.onload = function() {
        image.attr('src', newImage.src);
      };
    }

    function descRender() {
      const isEng = $('.golfMain').hasClass('en');

      let descName = $('.desc_inner li:first-child h2'),
          descParph = $('.desc_inner li:first-child p'),
          descBirth = $('.desc_inner .info p:first-child span'),
          descEnter = $('.desc_inner .info p:nth-child(2) span'),
          descDebut = $('.desc_inner .info p:last-child span'),
          descRecord = $('.desc_inner li:last-child .history'),
          tabBtn = tabCont.find('span');

      if (isEng) {
        descName.html(selectPlayersEn[selPnum][0]);
        descParph.html(selectPlayersEn[selPnum][1]);
        descBirth.html(selectPlayersEn[selPnum][2]);
        descEnter.html(selectPlayersEn[selPnum][3]);
        descDebut.html(selectPlayersEn[selPnum][4]);

        descRecord.children().remove();
        for(const element of selectPlayersEn[selPnum][6]) {
          descRecord.append('<p><span>' + element[0] + '</span>' + element[1] + '</p>');
        }

      } else {
        descName.html(selectPlayers[selPnum][2] + '<span>' + selectPlayers[selPnum][3] + '</span>');
        descParph.html(selectPlayers[selPnum][4]);
        descBirth.html(selectPlayers[selPnum][5]);
        descEnter.html(selectPlayers[selPnum][6]);
        descDebut.html(selectPlayers[selPnum][7]);
        tabBtn.html(selectPlayers[selPnum][8]);

        descRecord.children().remove();
        for(const element of selectPlayers[selPnum][9]) {
          descRecord.append('<p><span>' + element[0] + '<i>년</i></span>' + element[1] + '</p>');
        }
      }


      descRecord.animate({scrollTop : 0})
      $('.desc').removeClass('on');

      if (!$('.desc').hasClass('on')) {
        setTimeout(()=> {
          $('.desc').addClass('on');
        }, 100);

      }
    }

    // 팝업을 닫으면 플레이어 초기화
    $(".pop_close").on('click', function() {
      tabCont.children().first().addClass('on').siblings().removeClass('on');

      vimeoRender();
      imageRender();
    });
  },

  popup02: function() {
    const popup = $('.popup'),
          popBtn = $('.openPopup'),
          popNews = $('.pop_news'),
          newsList = $('.news_list');

    let selNnum = 0,
        nTarget = null,
        popPagi =  popNews.find('.pagination div');


    let news = [
        [
            '<h1 class="editor_test_title"></h1>' +
            '<img src="images/golf/sec3_editor_sample1.jpg" alt="editor_sample" style="margin: auto; display: block;">' +
            '<span class="editor_test_span">&#60;크리스 F&C 챔피언십에서 좋은 성적을 거둔 박결 프로&#62;</span>' +
            '<br>' +
            '경기도 양주시 레이크우드 컨트리클럽 산길·숲길 코스(파72)에서 열린 KLPGA 첫 메이저 대회인 \'크리스 F&C 챔피언십(총상금 13억원)\'에서 ' +
            '박결 (27·두산건설)이 최종 9언더파 279타로 공동 2위로 대회를 마쳤다.' +
            '<br><br>' +
            '박결이 투어에서 준우승을 차지한 것은 2018년 6월 S-OIL 챔피언십 이후 4년 10개월 만이다. ' +
            '1,2라운드 선두로 개인 첫 메이저 타이틀을 노리던 박결은 최종라운드 이다연의 선전으로 아쉽게 우승 트로피는 다음으로 기약했다.' +
            '<br><br>' +
            '박결은 "항상 매년 목표가 우승이었기 때문에 하면 좋겠지만 그래도 우승을 너무 매달리지는 않으려고 해요. 욕심을 크게 내지 않고 있어요." 라고 ' +
            '말했다. 또한 "사실, 상위권에만 들어도 너무 행복한 거고, 그렇게 생각을 하면 감사한 결과예요."라고 경기를 마친 소감을 전했다.'
        ],

        [
          '<h1 class="editor_test_title">- 최정상급 두산위브더제니스 오션시티와 최정상급 선수의 닮은꼴 만남 화제</h1>' +
          '<br>' +
          '‘두산위브더제니스 오션시티’의 견본주택에서 25일~26일 2일간 ‘두산건설 We’ve 골프단’ 소속 선수 4명(유현주, 유효주, 박결, 임희정)이 참여하는 팬사인회가 진행됐다.' +
          '<br><br>' +
          '행사가 진행된 두산위브더제니스 오션시티 견본주택은 좋아하는 선수들을 가까이서 보고 싶어하는 팬들이 쉴 틈 없이 몰려들어 하루 종일 북적였다. ' +
          '<br><br>' +
          '<img src="images/golf/sec3_editor_sample3.jpg" alt="editor_sample" style="margin: auto; display: block;">' +
          '<span class="editor_test_span">&#60;유현주, 유효주 프로가 팬사인회 전에 기념촬영을 했다.&#62;</span>' +
          '<br>' +
          '행사에 참여한 A씨(45세, 부산)는 “보고 싶었던 유현주 프로를 직접 보고, 궁금했던 견본주택도 볼 수 있어서 일석이조였다.”라고 말했다. ' +
          '또한 “선수들의 실력만큼이나 뛰어난 외모에 새삼 놀랬다”라고 했다.' +
          '<br><br>' +
          '이번 행사는 국내 최정상급 선수라는 측면에서 ‘두산위브더제니스 오션시티’와 공통점을 갖는다는 평가를 받고 있다. ' +
          '최정상급 주거환경을 추구하는 두산위브더제니스 오션시티는 ‘Have, Live, Love, Save, Solve’ 등 5가지 키워드를 바탕으로' +
          '기존 아파트 생활보다 업그레이드 된 편안함, 지속 가능한 생활, 편리함 등을 제공할 계획이다. ' +
          '<br><br>' +
          '<img src="images/golf/sec3_editor_sample4.jpg" alt="editor_sample" style="margin: auto; display: block;">' +
          '<span class="editor_test_span">&#60;팬사인회에서 포즈를 취한 박결 프로와 임희정 프로&#62;</span>'
        ],

        [
          '<h1 class="editor_test_title">- 유현주, 유효주, 박결, 임희정(이상 KLPGA), 김민솔(국가대표)로 구성</h1>' +
          '<h1 class="editor_test_title">- 5인 5색, 두산건설 브랜드 We’ve의 5가지 의미 홍보</h1>' +
          '<br>' +
          '<img src="images/golf/sec3_editor_sample2.png" alt="editor_sample" style="margin: auto; display: block;">' +
          '<span class="editor_test_span">[두산건설 We’ve 골프단 창단 기념촬영. (왼쪽부터) 유현주, 박결, 유효주, 두산건설 이정환 대표이사, 임희정, 김민솔]</span>' +
          '<br>' +
          '두산건설(대표이사 이정환)은 서울 강남구 그랜드 인터컨티넨탈 서울 파르나스에서 KLPGA투어 유현주, 박결, 유효주, 임희정, 국가대표 김민솔로 ' +
          '구성된 ‘두산건설 We’ve 골프단’ 창단식을 진행했다고 13일 밝혔다.' +
          '<br><br>' +
          '창단식에는 KLPGA투어 강춘자 대표이사, 두산건설 이정환 대표이사를 비롯해 선수 및 선수 가족, 골프 관계자들이 참석한 가운데 진행됐다. ' +
          '독특한 개성과 매력을 겸비한 최정상급 선수 다섯 명처럼 선수들과 함께 We’ve의 우수성과 다섯 가지 의미를 알리는 것이 창단 목적이라 밝히며, ' +
          '‘We’ve got everything’이라는 메시지와 선수들이 선택한 We’ve의 다섯 가지 의미에 대해 소개하였다.' +
          '<br><br>' +
          'KLPGA투어에 데뷔한 뒤 방송, 광고까지 다방면으로 활동하며 많은 관심을 받는 유현주 프로는 ‘꼭 갖고 싶은 공간’을 의미하는 Have를 선택하며, ' +
          '“투어프로로서 단순한 경험을 넘어 다양한 분야의 도전을 통해 다양하게 성장했다고 생각한다.' +
          '앞으로도 다양한 장점을 가진 프로가 되고 싶다”라고 선택의 배경을 밝혔다.' +
          '<br><br>' +
          '작년 생애 최초 우승을 한 유효주 프로는 ‘기쁨이 있는 공간’을 의미하는 Live를 선택하며' +
          '“삶의 동반자인 골프와 함께 최고령 선수가 될 때까지 즐거운 인생을 살고 싶어 선택했다”고 말했다.' +
          '<br><br>' +
          '아시안게임 금메달리스트이자 실력과 미모를 겸비한 박결 프로는 ‘사랑과 행복이 있는 공간’인 Love를 선택하며 “골프를 사랑하고,' +
          '팬분들의 사랑을 많이 받아 저에게 있어 골프는 사랑과 다름이 없다”며 “앞으로 더 많은 사람께 사랑을 전달할 수 있는 선수가 되기 위해 Love를 선택했다” 고 말했다.' +
          '<br><br>' +
          '대한골프협회 랭킹 순위 1위로 2023년 국가대표로 선발된 김민솔 선수는 ‘알뜰한 생활이 있는 공간’인 Save를 선택하며' +
          '“골프의 특성상 한 타 한 타 Save 한다는 마음으로 경기에 임하고, 앞으로도 체력, 스킬, 정신력을 효율적으로 관리하고 Save 하고 싶어 선택했다”고 말했다.' +
          '<br><br>' +
          '데뷔 후 5승과 2년 연속 인기 선수상을 받은 임희정 프로는 ‘생활 속의 문제가 해결되는 공간’을 의미하는 Solve를 선택하며, ' +
          '“투어를 다니며 문제가 생길 때 최선의 답을 찾아 풀어내는 임희정이 되고 싶어 Solve가 마음에 이끌려 선택했다”고 말했다.' +
          '<br><br>' +
          '이날 참석한 KLPGA 투어 강춘자 대표이사는 “두산건설 We\'ve 골프단\'이 KLPGA투어를 빛낼 최고의 골프단이 되길 기원하며, ' +
          '선수들 또한 두산건설이라는 튼튼한 날개를 달고 더욱 높이 비상하길 진심으로 응원한다\'고 축사를 전했다.' +
          '<br><br>' +
          '두산건설 이정환 대표이사는 “선수들이 선택한 We’ve의 의미대로 국내외 골프를 대표하는 최고의 선수가 될 수 있도록 적극 지원하고, ' +
          '또 최고의 명문구단이 될 수 있도록 최선을 다하겠다. 앞으로 많은 관심과 응원을 부탁 드린다고” 말하며 ' +
          '올해 두산건설 We’ve 골프단 선수들의 정규대회에서 버디, 이글 홀인원을 할 경우 기부금을 적립해 선수와 함께 불우이웃돕기 성금으로 활용 하겠다고 약속했다.' +
          '<br><br>' +
          '한편 선수들은 3월 25~26일 양일간 부산에 위치한' +
          '‘두산위브더제니스 오션시티’의 모델하우스에서 팬 사인회를 통해 We’ve의 우수성을 알리며 두산건설 소속으로 활동을 시작할 예정이다.' +
          '그뿐만 아니라 두산건설과 함께 다양한 사회공헌 활동을 계획 중이라 밝혔다.' +
          '<br><br><br>' +
          '[ We’ve 의 5가지 의미 ]' +
          '<br>' +
          '- Have : 꼭 가지고 싶은 공간' +
          '<br>' +
          '- Live :  기쁨이 있는 공간' +
          '<br>' +
          '- Love : 사랑과 행복이 있는 공간' +
          '<br>' +
          '- Save : 알뜰한 생활이 있는 공간' +
          '<br>' +
          '- Solve : 생활 속의 문제가 해결되는 공간'
        ]
    ]



    // ●● click ●● 팝업 오픈 시
    popBtn.on('click', function(e) {
      e.preventDefault();
      popup.scrollTop(0);

      if (popNews.css('display') === 'block') {
        selNnum = $(this).parent().attr('data-index');
        nTarget = newsList.eq(selNnum).children('.openPopup');
        newsRender();
      }
    });

    popPagi.children().on('click', function() {
      selNnum = $(this).hasClass('next') ? Number(selNnum) + 1 : Number(selNnum) - 1;
      nTarget = newsList.eq(selNnum).children('.openPopup');
      newsRender();
      popup.animate({scrollTop: 0}, 0);
    })

    function newsRender() {
      let newsData = nTarget.children('.txt_box'),
          nd_title = newsData.children('p').text(),
          nd_date = newsData.children('span').text(),
          nd_next = nTarget.parent().next(),
          nd_prev = nTarget.parent().prev();

      // title set
      popNews.find('.title h2').text(nd_title);
      popNews.find('.title span').text(nd_date);
      popNews.children('.editor').html(news[selNnum]);

      // pagination set
      popPagi.removeClass('indent');
      popPagi.first().find('span').text(nd_prev.find('.txt_box p').text());
      popPagi.last().find('span').text(nd_next.find('.txt_box p').text());



      if (!nd_next.length) {
        popPagi.last().addClass('indent');
      } else if (!nd_prev.length) {
        popPagi.first().addClass('indent');
      }
    }

    $(".golf_pagination ol li").on('click', function() {
      $(this).addClass('on').siblings().removeClass('on')
    })

  },

  popup03: function() {
    const popBtn = $('.openPopup'),
          popGallery = $('.pop_gallery'),
          galFrame = $('.gallery_frame'),
          tabBtn = $('.golf_tab').children();

    let selGnum = 0,
        galActive = galFrame.children('.active'),
        gTarget = null,
        popPagi =  popGallery.children().not('.img, .bg');

    tabBtn.on('click', function() {
      let tabIdx = $(this).index(),
          tabIdxChild = galFrame.children().eq(tabIdx);

      $(this).addClass('on').siblings().removeClass('on');
      tabIdxChild.addClass('active').siblings().removeClass('active');

    })

    // ●● click ●● 팝업 오픈 시
    popBtn.on('click', function(e) {
      e.preventDefault();

      if (popGallery.css('display') === 'flex') {
        selGnum = $(this).parent().data('index');
        galActive = galFrame.children('.active');
        gTarget = galActive.find('li[data-index="' + selGnum + '"]').children('.openPopup');

        galleryRender();
      }
    });

    popPagi.children().on('click', function() {
      let current = galActive.find('li[data-index="' + selGnum + '"]'),
          galNext = current.next(),
          galPrev = current.prev();

      selGnum = $(this).hasClass('next') ? galNext.data('index') : galPrev.data('index');
      gTarget = galActive.find('li[data-index="' + selGnum + '"]').children('.openPopup');
      galleryRender();
    })
    function galleryRender() {
      const galData = gTarget.children('.img');
      const isVideo = galData.hasClass('video');
      const gd_img = galData.children('img').attr('src');
      const gd_title = gTarget.children('h3').text();
      const gd_next = gTarget.parent().next();
      const gd_prev = gTarget.parent().prev();
      const popGalleryImg = popGallery.find('.img');

      popGalleryImg.find('h2').text(gd_title);

      if (isVideo) {
        const videoURL = gTarget.parent().data('popup-vimeo');
        const requestURL = `https://vimeo.com/api/oembed.json?url=https%3A%2F%2Fvimeo.com%2F${videoURL}`;

        const updateGallery = (width, height) => {
          const newIframe = $('<iframe>', {
            src: `https://player.vimeo.com/video/${videoURL}?rel=0&title=0&showinfo=1&byline=0&controls=1&portrait=0&autopause=1&`,
            width,
            height,
            frameborder: '0',
            allowfullscreen: ''
          });

          const currentIframe = popGalleryImg.find('iframe');
          const currentTit = popGalleryImg.find('h2');
          
          if (currentIframe.length && currentIframe.data('video-id') === videoURL) {
            currentIframe.show();
            currentTit.show();
          } else {
            newIframe.data('video-id', videoURL);
            popGalleryImg.find('iframe, img').replaceWith(newIframe);
            currentTit.show();
          }
        };

        const handleVideoRequest = (data) => {
          const { width, height } = data;
          let newWidth;
          let newHeight;
          
          if (!$('#mobile').length) {
            newWidth = width * 1.5;
            newHeight = height * 1.5;
          } else {
            const deviceWidth = $(window).width();
            const resMediaWidth = Math.abs(width - deviceWidth - 20);
            const overHeight = height + resMediaWidth;
            const downHeight = height - resMediaWidth;

            newWidth = width < deviceWidth ? deviceWidth - 40 : width;
            newHeight = width < deviceWidth ? overHeight - 40 : downHeight - 40;

          }

          updateGallery(newWidth, newHeight);
          popGalleryImg.find('h2').css('width', newWidth);
        };

        const handleVideoError = (err) => {
          console.error(`Error occurred while fetching Vimeo video data: ${err}`);
        };

        $.ajax({
          url: requestURL,
          dataType: 'json',
          beforeSend: () => {
            popGalleryImg.find('iframe, img, h2').hide();
          },
          success: handleVideoRequest,
          error: handleVideoError
        });

      } else {
        const vurl = gd_img.split('/');
        const pid = gTarget.parent().data('popup-image');

        const newSrc = gd_img.replace(vurl[vurl.length - 1], `gallery/${pid}.jpg`);
        const changeImg = $('<img>', { src: newSrc });

        const imgElement = popGalleryImg.find('img');
        const iframeElement = popGalleryImg.find('iframe');

        iframeElement.length
            ? iframeElement.replaceWith(changeImg)
            : imgElement.length && imgElement.replaceWith(changeImg);
      }

      const imgElement = popGalleryImg.children()[0];
      if (imgElement.complete) {
        const naturalWidth = imgElement.clientWidth;
        popGalleryImg.find('h2').css('width', naturalWidth);
      } else {
        imgElement.addEventListener('load', () => {
          const naturalWidth = imgElement.clientWidth;
          popGalleryImg.find('h2').css('width', naturalWidth);
        });
      }


      $(".pop_close").on('click', () => {
        const iframe = popGalleryImg.find('iframe');

        if (iframe.length) {
          const player = new Vimeo.Player(iframe);
          player.unload();
        }

        popGallery.fadeOut(300);
      });

      // pagination set
      popPagi.removeClass('disabled');

      if (!gd_next.length) {
        popPagi.last().addClass('disabled');
      } else if (!gd_prev.length) {
        popPagi.first().addClass('disabled');
      }
    }
  },


};
