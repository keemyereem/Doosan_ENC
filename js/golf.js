/* --------------------- DoosanENC Released 2022.08.08 --------------------- */
/* --------------------- Published by 4m Creative --------------------- */

$(function () { });


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                  **골프단 신규 - 2023.03.28**                                                      ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let site = {
  init: function () {
    this.configureResponsiveLayout();
    this.createFullPageGolf();
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
        let $golfImg = $(element).find('button img');
        let mobileUrl = $golfImg.attr('src').replace(/\.(png|jpg|jpeg|gif)/i, '_mob.$1');
        $golfImg.attr('src', mobileUrl);
      });
    }

    // Add click event to top button
    $(document).on('click', '#topButton', () => {
      let goTop = location.href.split('#');
      console.log(goTop)
      window.location = goTop[0] + '#firstPage';
    });

    // Remove 'wht' class from header on mouse leave
    $('.golf .header').mouseleave(() => {
      $('.header').removeClass('wht');
    });

  },

  createFullPageGolf: function() {

    $("#fullpage").fullpage({
      // anchors: [
      //   "firstPage",
      //   "secondPage",
      //   "thirdPage",
      //   "fourthPage",
      //   "fifthPage",
      //   "sixthPage",
      //   "seventhPage",
      // ],
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
    this.swipersForGolf();
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

      // if ($(".popup > ul").hasClass('pop_gallery')) {
      //   LayerPopup3.css("margin-left", 0 - $(this).scrollLeft());
      // }
    });

    popBtn.on('click', function() {
      $("html").addClass("blockScroll");
      $(this).closest('.splide__slide').length ?
          LayerPopup1.css('display', 'flex') : $(this).closest('.news_list').length ?
              LayerPopup2.css('display', 'block') : LayerPopup3.css('display', 'flex');
    });

    popupClose.on("click", () => {
      // 팝업 닫기 function
      $("html").removeClass("blockScroll");
      $(".popup, .popup > ul").fadeOut(300);
      LayerPopup1.find('.video').length ? LayerPopup1.find('.video').removeClass('on') : null;
    });
  },

  swipersForGolf: function() {

    // 메인 배너
    new Swiper(".swiperGolf1", {
      spaceBetween: 30,
      effect: "fade",
      speed: 500,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        init: function() {  // 초기값 - 필요시 작업
          mobileImageTransfer();
        },

        slideChangeTransitionStart: function() {  // 넘기기 시작할 때
          let txtPieceChild = $('.txtPiece span');

          // 텍스트 슬라이드 애니메이션 클래스 부여(시작)
          txtPieceChild.addClass('slideUp');

          // 텍스트 슬라이드 애니메이션이 끝나는 시점
          txtPieceChild.on('transitionend', function() {
            let selTit = $(".swiper-slide-active h2").html(),
                $selTitSplit = selTit.split('<br>'),
                $selTitParent = $('.golfMain .section1 article');

            devideWord($selTitSplit, $selTitParent)
          })
        },

        slideChangeTransitionEnd: function() {  // 넘긴 슬라이드가 완전히 자리 잡았을 때
          // 텍스트별 슬라이드 시간차 주고 자연스럽게
          for (let i=0; i<= $('.txtPiece').length; i++) {
            $('.txtPiece').eq(i).children('span').css('transition-delay', i * 0.06 + 's');
          }
          // 텍스트 슬라이드 애니메이션 클래스 삭제(원위치로 내려옴)
          $('.txtPiece span').removeClass('slideUp');
        },
      }
    });

    function mobileImageTransfer() {
      chkWord();

      let slideMob = $('.swiper-slide');
      if ($('#mobile').length) {
        slideMob.each(function(index) {
          let golfImgUrl = slideMob.eq(index).find('img');
          let mobileUrl = golfImgUrl.attr('src').replace(/\.(png|jpg|jpeg|gif)/i, '_mob.$1');
          golfImgUrl.attr('src', mobileUrl)
        });
      }
    }

    function devideWord(selTitSplit, selTitParent) {
      // 이전 슬라이드 내용이 담긴 태그를 모두 삭제
      selTitParent.children('h2').remove();

      // 각 슬라이드 내부 h2태그의 띄어쓰기 기준으로 분리한 텍스트 배열들의 개수만큼 태그 생성 및 내용 삽입
      for (let i=selTitSplit.length-1; i >= 0; i--) {
        let txt = i;
        selTitParent.prepend('<h2 class="txtPiece"><span class="slideUp">' + selTitSplit[txt] + '</span></h2>');

        if ($('.txtPiece').length < selTitSplit.length) { // 기존 h2태그가 분리한 텍스트 배열 개수보다 낮을 때 = 텍스트 배열 개수만큼 생성
          txt = (selTitSplit.length - 1) - $('.txtPiece').length;
        } else if (selTitSplit.length == 1) { // 분리한 텍스트 배열 개수가 1개일 때 = 전체 프레임 높이값 맞추기 위해 공백의 h2태그 1개 생성
          selTitParent.children('h2').after('<h2>&nbsp;</h2>');
        }
        chkWord();
      }
    }
    function chkWord() {
      let txtPiece = $('.txtPiece'),
          check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

      // 폰트패밀리 혼용 구분
      txtPiece.each((index) => {
        let check_txt = txtPiece.eq(index).text();
        if (!check_kor.test(check_txt)) {
          txtPiece.eq(index).css("font-family", '"Montserrat", sans-serif');
        }
      });
    }


    // // 선수소개 슬라이드
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
      flickPower: 50,
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
        $section2Active = $('.splide__slide.is-active'),
        $section2Cursor = $('.seciton2_cursor'),
        popBtn = $('.openPopup'),
        popClose = $('.pop_close');

    const { Autoplay } = splide.Components;

    // ●● click ●● 페이지네이션 버튼 클릭 시
    navBtn.on('click', function() {
      // 이전, 다음버튼 클릭 시 splide 슬라이더 동작
      $(this).hasClass('next') ? splide.go( '+1' ) : splide.go( '-1' );
    });

    popBtn.on('click', ()=> {
      $('.popup').hasClass('on') ? Autoplay.pause() : null;
    })

    popClose.on('click', function() {
      Autoplay.play();
    })

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
          ['2020', '<i>제주삼다수 마스터스 25위</i>'],
          ['2017', '<i>MY 문영 퀸즈파크 챔피언십 2017 25위</i>'],
          ['2016', '<i>팬텀 클래식 With YTN 27위</i>'],
          ['2012', '<i>BS금융그룹 부산은행ㆍ서울경제 여자오픈 14위</i>']
        ]
      ], 
      [
        "818598210", 
        "images/golf/player_yhyoj.png",
        "유효주", 
        "Yoo Hyoju", 
        "“제 인생의 동반자인 골프와 함께 즐겁게 <br class='br_m'>‘살고(live)’ 싶고, <br class='br_pc'>언젠가는 We've에 제 집을 마련해서 행복하게 살고 싶어요.”",
        "1997년 04월 21일",
        "2015년 10월",
        "2017년 롯데렌터카 여자오픈",
        "유효주 프로",
        [
          ['2022', '<i><b>WEMIX 챔피언십 with 와우매니지먼트그룹 SBS Golf 우승</b></i>'],
          ['2021', '<i>롯데 오픈 7위</i>'],
          ['2017', '<i>KB금융 스타챔피언십 3위</i>']
        ]
      ], 
      [
        "818590506", 
        "images/golf/player_pk.png",
        "박결", 
        "Park Gyeol", 
        "“어릴 때부터 골프를 너무 사랑해서 <br class='br_m'>골프선수가 되었고, <br class='br_pc'>현재 골프선수로 많은 <br class='br_m'>팬들의 사랑을 받고 있다고 생각해요. <br>그런 의미에서 저에게 골프는 ‘love’나 다름없죠.”",
        "1996년 01월 09일",
        "2014년 10월",
        "2015년 제8회 롯데마트 여자오픈",
        "박결 프로",
        [
          ['2023', '<i>2023년 크리스 F&C 제45회 KLPGA 챔피언십 2위</i>'],
          ['2022', '<i>넥센∙세인트나인 마스터즈 2022 3위</i>'],
          ['2021', '<i>셀트리온 퀸즈 마스터즈 9위</i>'],
          ['2020', '<i>제14회 S-OIL 챔피언십 6위</i>'],
          ['2019', '<i>제8회 KG∙이데일리 레이디스 오픈 with KFC 6위</i>'],
          [
            '2018', '<i><b>SK네트웍스∙서울경제 레이디스 클래식 우승</b></i> <br>' +
            '<i>제12회 S-OIL 챔피언십 2위</i> <br>' +
            '<i>효성 챔피언십 with SBS 2위</i>'
          ],
          ['2017', '<i>삼천리 Together Open 2017 2위</i>'],
          ['2016', '<i>초정탄산수 용평리조트 오픈 with SBS 2위</i>'],
          [
            '2015', '<i>제16회 하이트진로 챔피언십 2위</i> <br>' +
            '<i>2015 NH투자증권 레이디스 챔피언십 2위</i>'
          ]
        ]
      ], 
      [
        "818589792", 
        "images/golf/player_kms.png",
        "김민솔", 
        "Kim Minsol", 
        "“아직 부족한 점이 많기 때문에 한 타 한 타 <br class='br_m'>save 하는 것처럼 <br class='br_pc'>체력, 스킬, 멘탈 등 <br class='br_m'>모든 것을 성실하게 잘 ‘관리해서(save)’ <br>발전하는 선수가 되고 싶어요.”",
        "2006년 06월 15일",
        " ",
        " ",
        "김민솔 선수",
        [
          ['2023', '<i>제5회 WAAP(위민스 아마추어 아시아 퍼시픽 선수권) 2위</i>'],
          [
            '2022', '<i>제103회 전국체육대회 3위</i> <br>' +
            '<i><b>제29회 송암배 아마추어골프선수권대회 우승</b></i> <br>' +
            '<i><b>블루원배 제39회 한국주니어골프선수권대회 우승</b></i> <br>' +
            '<i>강민구배 제46회 한국여자아마추어골프선수권대회 3위</i> <br>' +
            '<i>제20회 빛고을중흥배 아마추어골프선수권대회 4위</i> <br>' +
            '<i>제1회 대한골프협회장배 아마추어골프선수권대회 5위</i>'
          ],
          [
            '2021', '<i>제14회 KB금융그룹배 여자아마추어골프선수권대회 6위</i> <br>' +
            '<i>제25회 매경솔라고배 아마추어골프선수권대회 4위</i>'
          ],
          ['2020', '<i>제27회 송암배 아마추어골프선수권대회 3위</i>']
        ]
      ], 
      [
        "818599469", 
        "images/golf/player_lhj.png",
        "임희정", 
        "Lim Heejeong", 
        "“투어 중 어려운 상황에 직면해도 <br class='br_m'>항상 최선의 답을 찾아 <br class='br_pc'>‘해결하는(solve)’ <br class='br_m'>임희정이 되고 싶어요.”",
        "2000년 09월 02일",
        "2018년 10월",
        "2018년 효성 챔피언십",
        "임희정 프로",
        [
          ['2022', '<i><b>DB그룹 제36회 한국여자오픈 골프선수권대회 우승</b></i>'],
          [
            '2021', '<i>BMW Ladies Championship 2위</i> <br>' +
            '<i>제21회 하이트진로 챔피언십 2위</i> <br>' +
            '<i><b>국민쉼터 하이원 리조트 여자오픈 2021 우승</b></i> <br>' +
            '<i>대유위니아∙MBN 여자오픈 2위</i> <br>'
          ],
          [
            '2020', '<i>아이에스동서 부산오픈 2위</i> <br>' +
            '<i>제42회 KLPGA 챔피언십 2위</i> <br>'
          ],
          [
            '2019', '<i><b>KB금융 스타챔피언십 우승</b></i> <br>' +
            '<i><b>올포유∙레노마 챔피언십 2019 우승</i> <br>' +
            '<i><b>하이원리조트 여자오픈 2019 우승</b></i>'
          ]
        ]
      ]
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
          ['2020', '<i>25th place in the Jeju Samdasoo Masters</i>'],
          ['2017', '<i>25th place in the 2017 MY Munyeong Queen’s Park Championship</i>'],
          ['2016', '<i>27th place in the Phantom Classic with YTN</i>'],
          ['2012', '<i>14th place in the BS Financial Group Busan BankㆍSeoul Economic Daily Women\'s Open</i>']
        ]
      ],
      // 유효주 프로
      [
        "Hyoju Yoo",
        "“I wanna ‘live’ happily ever after with the golf and someday get Doosan We've to settle on.”",
        "Apr. 21. 1997",
        "Oct. 2015",
        "2017 Lotte Rent-a-Car Ladies Open",
        "Professional golfer, <br>Hyoju Yoo",
        [
          ['2022', '<i><b>Winner in the WEMIX Championship with Wow Management Group SBS Golf</b></i>'],
          ['2021', '<i>7th place in the Lotte Open</i>'],
          ['2017', '<i>3rd place in the KB Financial Star Championship</i>']
        ]
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
          ['2023', '<i>2nd place in the 45th CreaS F&C KLPGA Championship</i>'],
          ['2022', '<i>3rd place in the 2022 Nexen∙SaintNine Masters</i>'],
          ['2021', '<i>9th place in the Celltrion Queens Masters</i>'],
          ['2020', '<i>6th place in the 14th S-OIL Championship</i>'],
          ['2019', '<i>6th place in the 8th KG∙Edaily Ladies Open with KFC</i>'],
          [
            '2018', '<i><b>Winner in the SK Networks∙Seoul Economic Daily Ladies Classic</b></i> <br>' +
          '<i>2nd place in the 12th S-OIL Championship</i> <br>' +
          '<i>2nd place in the 2018 Hyosung Championship with SBS</i>'
          ],
          ['2017', '<i>2nd place in the 2017 Samchuly Together Open</i>'],
          ['2016', '<i>2nd place in the 2016 ChoJung Sparkling Water Yongpyong Resort Open with SBS</i>'],
          [
            '2015', '<i>2nd place in the 16th Hite Jinro Championship</i> <br>' +
          '<i>2nd place in the 2015 NH Investment & Securities Ladies Championship</i>'
          ]
        ]
      ],
      // 김민솔 선수
      [
        "Minsol Kim",
        "“I think I still need to be improved. So, I wanna ‘save’ all aspects well, like physical strength, skills, mental management, like steadily saving strokes one by one.”",
        "Jun. 15. 2006",
        " ",
        " ",
        "Amateur golfer, <br>Minsol Kim",
        [
          ['2023', '<i>2nd place in the 5th WAAP (Women\'s Amateur Asia Pacific Championships)</i>'],
          [
            '2022', '<i>3rd place in the 103rd National Sports Festival</i> <br>' +
          '<i><b>Winner in the 29th Song Am Cup Amateur Golf Championship</b></i> <br>' +
          '<i><b>Winner in the 39th Blueone Cup Korea Junior Golf Championship</b></i> <br>' +
          '<i>3rd place in the 46th Kangmingu Cup Korea Women\'s Amateur Golf Championship</i> <br>' +
          '<i>4th place in the 20th Bitgoeul Jungheung Cup Amateur Golf Championship</i> <br>' +
          '<i>5th place in the 1st Korea Golf Association President Cup Amateur Golf Championship</i>'
          ],
          [
            '2021', '<i>6th place in the 14th KB Financial Group Cup Women’s Amateur Golf Championship</i> <br>' +
          '<i>4th place in the 25th Maekyung Sollago Cup Amateur Golf Championship</i>'
          ],
          ['2020', '<i>3rd place in the 27th Song Am Cup Amateur Golf Championship</i>']
        ]
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
          ['2022', '<i><b>Winner in the DB Group 36th Korea Women’s Open Golf Championships</b></i>'],
          [
            '2021', '<i>2nd place in the BMW Ladies Championship</i> <br>' +
          '<i>2nd place in the 21st Hite Jinro Championship</i> <br>' +
          '<i><b>Winner in the 2021 High1 Resort Ladies Open</b></i> <br>' +
          '<i>2nd place in the Dayouwinia∙MBN Ladies Open</i> <br>'
          ],
          [
            '2020', '<i>2nd place in the 2020 IS Dongseo Busan Open</i> <br>' +
          '<i>2nd place in the 42nd KLPGA Championship</i> <br>'
          ],
          [
            '2019', '<i><b>Winner in the 2019 KB Financial Group Star Championship</b></i> <br>' +
          '<i><b>Winner in the 2019 All For You∙Renoma Championship</i> <br>' +
          '<i><b>Winner in the 2019 High1 Resort Ladies Open</b></i>'
          ]
        ]
      ]
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
      $(this).index() !== 0 ? $('.video').addClass('on') : ($('.video').removeClass('on'), vimeoRender())
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
        switch(vl){ case "controls=0": return "controls=1"; }
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
      let vurl = selFrameUrl.match(/player.vimeo.com\/video\/?([0-9]+)/i);

      // 추출한 id값을 활성화된 인덱스(선수) id값으로 교체
      selFrameUrl = selFrameUrl.replace(vurl[1], selectPlayers[selPnum][0]);
0
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
      popup.animate({scrollTop: 0}, 500);
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
    const popup = $('.popup'),
          popBtn = $('.openPopup'),
          popGallery = $('.pop_gallery'),
          galFrame = $('.gallery_frame'),
          galVideo = $('.vimeo02'),
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

          currentIframe.length && currentIframe.data('video-id') === videoURL
              ? currentIframe.show() && currentTit.show()
              : (newIframe.data('video-id', videoURL),
                  popGalleryImg.find('iframe, img').replaceWith(newIframe),
                  currentTit.show());
        };

        const handleVideoRequest = (data) => {
          const { width, height } = data;
          let newWidth;
          let newHeight;



          if (!$('#mobile').length) {
            newWidth = width * 1.5;
            newHeight = height * 1.5;
            console.log('blah')
          } else {
            const deviceWidth = $(window).width();
            const resMediaWidth = Math.abs(width - deviceWidth - 20);
            const overHeight = height + resMediaWidth;
            const downHeight = height - resMediaWidth;

            newWidth = width < deviceWidth ? deviceWidth - 40 : width;
            newHeight = width < deviceWidth ? overHeight - 40 : downHeight - 40;

            console.log(`width: ${newWidth} / height: ${height}`);
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
