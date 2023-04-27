/* --------------------- DoosanENC Released 2022.08.08 --------------------- */
/* --------------------- Published by 4m Creative --------------------- */

$(function () {

});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                  **골프단 신규 - 2023.03.28**                                                      ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let golfPlayers = {
  init: function () {
    this.settingResponsive();
    this.createFullPageGolf();
    this.popupForGolf();
    this.swipersForGolf();
    this.popup01();
    this.popup02();
    this.popup03();
  },

  settingResponsive: function() {
    $(window).ready(()=> {
      $('body').addClass('golf');
    });

    let playersSection = $('.section').not('.section1, .section2, .footer');
    if ($('#mobile').length && $('.container').hasClass('golfTeaser') === true) {
      alert('a')
      playersSection.each(function(index) {
        let golfImgUrl = playersSection.eq(index).find('img');
        let mobileUrl = golfImgUrl.attr('src').replace('.png', '_mob.png');
        golfImgUrl.attr('src', mobileUrl)
      });
    }

    $(document).on("click", "#topButton", function () {
      let goTop = location.href.split('#')
      window.location = goTop[0] + '#firstPage';
    });

    $('.golf .header').mouseleave(function() {
      if ($('.golf .header').hasClass('wht')) {

      } else {

      }
      $(".header").removeClass("wht");
    })

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
      menu: "#rightnavi",
      verticalCentered: false,
      scrollOverflow: false,
      normalScrollElements: '.popup',
      css3: true,
      scrollingSpeed: 800,

      onLeave: function (index, nextIndex, direction) {
        // 앵커별 추가기능 조정
        if (nextIndex == 1) {
          // 첫번째 페이지
          $('.header').fadeIn(500);
          $(".golf #topButton").fadeOut(500);

        } else if (nextIndex == $(".section").length) {
          // 마지막(푸터) 페이지
          $('.header').fadeOut(500);
          $(".golf #topButton").fadeOut(500);

        } else {
          // 그 외 나머지
          $("#mobile").length ? $('.header').fadeOut(500) : $('.header').fadeIn(500);
          $(".golf #topButton").fadeIn(500);
        }

        // footer: 위에 앵커와 함께 작성할 경우 푸터에 도달하고 뒤늦게 꺼지는 현상 -> 따로 제어
        if (nextIndex == 1 || nextIndex == 2 || nextIndex == $(".section").length) {
          $(".golf #rightnavi").hide();
        } else {
          $(".golf #rightnavi").fadeIn(500);
        }

        // 헤더스타일 화이트/ 노말 제어(1)
        if (nextIndex !== 1) {
          unsetHeaderWhite();
        } else {
          setHeaderWhite();
        }
        // 헤더스타일 화이트/ 노말 함수(2)
        function setHeaderWhite() {
          setTimeout(() => {
            $(".header").addClass("wht");
          }, 500);
          $(".golf #sub .header .gnb > ul > li").hover(
            function () {},
            function () {
              $(".header").addClass("wht");
              $(".header").css({ background: "transparent" });
            }
          );  
        }

        function unsetHeaderWhite() {
          setTimeout(() => {
            $(".header").removeClass("wht");
          }, 500);   
          $(".golf #sub .header .gnb > ul > li").hover(
            function () {
              $(".header").css({ background: "#ffffff" });
            },
            function () {
              $(".header").removeClass("wht");
              $(".header").css({ background: "transparent" });
              
            }
          );  
        }

      }, afterLoad: function (anchorLink, index) {
        if (index == index) {
          $('.section').eq(index - 1).addClass('ani')
        }

        if (index == $(".section").length) {
          setTimeout(() => {
            $(".footer .sec_tit > span").addClass("fin");
          }, 200);
        }
      }
    });
    
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

      let $section4 = $('.pop_gallery');
      if ($section4.children().has(e.target).length !== 0) {
        //console.log('18')
      } else {
        //console.log('28')
      }
    });

    // 영영 밖 이동 시 마우스 닫기 버튼  커서 따라다니기
    popup.addEventListener("mousemove", (e) => {
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      circle.style.left = mouseX - 35 + "px";
      circle.style.top = mouseY - 35 + "px";
    });

    $(window).on("scroll", function () {
      $(".popup > ul").css("left", 0 - $(this).scrollLeft());
      $section2Cursor.css('margin-left', 0 + $(this).scrollLeft());

      if ($(".popup > ul").hasClass('pop_gallery')) {
        LayerPopup3.css("margin-left", 0 - $(this).scrollLeft());
      }
    });

    popBtn.on('click', function() {
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
          chkWord();
        },

        slideChangeTransitionStart: function() {  // 넘기기 시작할 때
          let txtPieceChild = $('.txtPiece span');

          // 텍스트 슬라이드 애니메이션 클래스 부여(시작)
          txtPieceChild.addClass('slideUp');

          // 텍스트 슬라이드 애니메이션이 끝나는 시점
          txtPieceChild.on('transitionend', function() {
            let selTit = $(".swiper-slide-active h2").html(),
                selTitSplit = selTit.split('<br>'),
                selTitParent = $('.golfMain .section1 article');

            // 이전 슬라이드 내용이 담긴 태그를 모두 삭제
            selTitParent.children('h2').remove();

            // 각 슬라이드 내부 h2태그의 띄어쓰기 기준으로 분리한 텍스트 배열들의 개수만큼 태그 생성 및 내용 삽입 
            for (let i=selTitSplit.length-1; i >= 0; i--) {
              selTitParent.prepend('<h2 class="txtPiece"><span class="slideUp">' + selTitSplit[i] + '</span></h2>');

              if ($('.txtPiece').length < selTitSplit.length) { // 기존 h2태그가 분리한 텍스트 배열 개수보다 낮을 때 = 텍스트 배열 개수만큼 생성
                i = (selTitSplit.length - 1) - $('.txtPiece').length;
                selTitParent.prepend('<h2 class="txtPiece"><span class="slideUp">' + selTitSplit[i] + '</span></h2>');
              } else if ($('.txtPiece').length === 1) { // 분리한 텍스트 배열 개수가 1개일 때 = 전체 프레임 높이값 맞추기 위해 공백의 h2태그 1개 생성
                i = 0;
                selTitParent.children('h2').after('<h2>&nbsp;</h2>');
              }

              chkWord();
            }
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
    var splide = new Splide( '.splide', {
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
      interval: 1000,
      flickPower: 50,
      breakpoints: {
        640: {
          autoWidth: false,
          perPage: 1,
        },
        1024: {
          autoWidth: true,
          perPage: 3,
        }
      }

    }).mount();

    const navBtn = $('.desc_pagination');

    let $section2Active = $('.splide__slide.is-active'),
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

    // view more 버튼 플러스 아이콘 트랜지션
    $section2Active.on('mousedown', function() {
      $section2Cursor.children('img').css('transform', 'rotate(90deg)');
    });
    $section2Active.on('mouseup mouseleave', function() {
      $section2Cursor.children('img').css('transform', 'rotate(0deg)');
    })

  },


  popup01: function() {
    // ●● const ●● 재생버튼, 페이지네이션 버튼, 각 선수들의 동영상 프레임 ID
    const playBtn = $('#btn-play'),
          navBtn = $('.desc_pagination'),
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
        "“평소 투어프로로서 경험 뿐 아니라 방송, 모델, 인플루언서 등 <br>풍부하고 다양한 경험을 ‘가져보고(have)’ 싶다고 생각했어요.”",
        "1994년 02월 28일",
        "2011년 10월",
        "2012년 제5회 롯데마트 여자오픈",
        "유현주 프로",
        [
          ['2020', '제주삼다수 마스터스 25위'],
          ['2017', 'MY 문영 퀸즈파크 챔피언십 2017 25위'],
          ['2016', '팬텀 클래식 With YTN 27위'],
          ['2012', 'BS금융그룹 부산은행ㆍ서울경제 여자오픈 14위']
        ]
      ], 
      [
        "818598210", 
        "images/golf/player_yhyoj.png",
        "유효주", 
        "Yoo Hyoju", 
        "“골프라는 동반자와 즐거운 인생을 ‘살고(live)’ 싶고, <br>언젠가는 We've에 제 집을 마련해서 살고 싶어요.”",
        "1997년 04월 21일",
        "2015년 10월",
        "2017년 롯데렌터카 여자오픈",
        "유효주 프로",
        [
          ['2022', '<b>WEMIX 챔피언십 with 와우매니지먼트그룹 SBS Golf 우승</b>'],
          ['2021', '롯데 오픈 7위'],
          ['2017', 'KB금융 스타챔피언십 3위']
        ]
      ], 
      [
        "818590506", 
        "images/golf/player_pk.png",
        "박결", 
        "Park Gyeol", 
        "“어릴 때부터 골프를 너무나 사랑해서 골프선수가 되었고, <br>또 골프선수이기에 많은 팬분들의 사랑을 받고 있다고 생각해요. <br>그런 의미에서 골프는 저에게 ‘love’나 다름없죠.”",
        "1996년 01월 09일",
        "2014년 10월",
        "2015년 제8회 롯데마트 여자오픈",
        "박결 프로",
        [
          ['2022', '넥센∙세인트나인 마스터즈 2022 3위 '],
          ['2021', '셀트리온 퀸즈 마스터즈 9위'],
          ['2020', '제14회 S-OIL 챔피언십 6위'],
          ['2019', '제8회 KG∙이데일리 레이디스 오픈 with KFC 6위'],
          [
            '2018', '<b>SK네트웍스∙서울경제 레이디스 클래식 우승</b> <br>' +
            '제12회 S-OIL 챔피언십 2위 <br>' +
            '효성 챔피언십 with SBS 2위'
          ],
          ['2017', '삼천리 Together Open 2017 2위'],
          ['2016', '초정탄산수 용평리조트 오픈 with SBS 2위'],
          [
            '2015', '제16회 하이트진로 챔피언십 2위 <br>' +
            '2015 NH투자증권 레이디스 챔피언십 2위'
          ]
        ]
      ], 
      [
        "818589792", 
        "images/golf/player_kms.png",
        "김민솔", 
        "Kim Minsol", 
        "“아직 부족한 점이 많기 때문에 한 타 한 타 착실하게 <br>save 하는 것처럼 체력, 스킬, 멘탈 등 모든 부분을 <br>잘 ‘관리해서(save)’ 발전하는 선수가 되고 싶어요”",
        "2006년 06월 15일",
        " ",
        " ",
        "김민솔 선수",
        [
          ['2023', '제5회 WAAP(위민스 아마추어 아시아 퍼시픽 선수권) 2위'],
          [
            '2022', '제103회 전국체육대회 3위 <br>' +
            '<b>제29회 송암배 아마추어골프선수권대회 우승</b> <br>' +
            '<b>블루원배 제39회 한국주니어골프선수권대회 우승</b> <br>' +
            '강민구배 제46회 한국여자아마추어골프선수권대회 3위 <br>' +
            '제20회 빛고을중흥배 아마추어골프선수권대회 4위 <br>' +
            '제1회 대한골프협회장배 아마추어골프선수권대회 5위'
          ]
        ]
      ], 
      [
        "818599469", 
        "images/golf/player_lhj.png",
        "임희정", 
        "Lim Heejeong", 
        "“투어를 다니면서 최고의 성과를 얻기 위해 <br>여러 문제에 직면했을 때도 항상 최선의 답을 찾아 <br>‘해결하는(solve)’ 임희정이 되고 싶어요.”",
        "2000년 09월 02일",
        "2018년 10월",
        "2018년 효성 챔피언십",
        "임희정 프로",
        [
          ['2022', '<b>DB그룹 제36회 한국여자오픈 골프선수권대회 우승</b>'],
          [
            '2021', 'BMW Ladies Championship 2위 <br>' +
            '제21회 하이트진로 챔피언십 2위 <br>' +
            '<b>국민쉼터 하이원 리조트 여자오픈 2021 우승</b> <br>' +
            '대유위니아∙MBN 여자오픈 2위 <br>'
          ],
          [
            '2020', '아이에스동서 부산오픈 2위 <br>' +
            '제42회 KLPGA 챔피언십 2위 <br>'
          ],
          [
            '2019', '<b>KB금융 스타챔피언십 우승</b> <br>' +
            '<b>올포유∙레노마 챔피언십 2019 우승</b> <br>' +
            '<b>하이원리조트 여자오픈 2019 우승</b>'
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
      let descName = $('.desc_inner li:first-child h2'),
          descParph = $('.desc_inner li:first-child p'),
          descBirth = $('.desc_inner .info p:first-child span'),
          descEnter = $('.desc_inner .info p:nth-child(2) span'),
          descDebut = $('.desc_inner .info p:last-child span'),
          descRecord = $('.desc_inner li:last-child .history'),
          tabBtn = tabCont.find('span');

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
      popup.animate({scrollTop: 0}, 500);
      newsRender();
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
        popPagi =  popGallery.children().not('.img');

    tabBtn.on('click', function() {
      let tabIdx = $(this).index();
      $(this).addClass('on').siblings().removeClass('on')
      galFrame.children().eq(tabIdx).addClass('active').siblings().removeClass('active');
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
      let galData = gTarget.children('.img');
      let gd_img = galData.children('img').attr('src')
      let gd_title = gTarget.children('h3').text()
      let gd_next = gTarget.parent().next();
      let gd_prev = gTarget.parent().prev();

      popGallery.find('.img h2').text(gd_title);

      if (galData.hasClass('video')) {
        let videoURL = gTarget.parent().data('popup-vimeo');
        let requestURL = 'https://vimeo.com/api/oembed.json?url=https%3A%2F%2Fvimeo.com%2F' + videoURL;
        let currentIframe = popGallery.find('.img iframe');
        let currentImg = popGallery.find('.img img');
        let currentTit = popGallery.find('.img h2');

        $.ajax({
          url: requestURL,
          dataType: 'json',
          beforeSend: function() {
            currentIframe.hide(); // hide the existing iframe
            currentImg.hide();
            currentTit.hide();
          },
          success: function(data) {
            let width = data.width;
            let height = data.height;
            $('#mobile').length ? null : (width = width * 1.5, height = height* 1.5)

            let newIframe = $('<iframe>', {
              src: 'https://player.vimeo.com/video/' + videoURL + '?rel=0&title=0&showinfo=0&byline=0&controls=1&portrait=0&autopause=1&',
              width: width,
              height: height,
              frameborder: '0',
              allowfullscreen: ''
            });

            if (currentIframe.length && currentIframe.data('video-id') === videoURL) {
              currentIframe.show();
              currentTit.show();
              return; // iframe already loaded and matches videoURL, no need to reload
            } else {
              newIframe.data('video-id', videoURL); // set data attribute on new iframe
              popGallery.find('.img iframe, .img img').replaceWith(newIframe);
              currentTit.show();

            }
          }
        });
      } else {
        let changeImg = new Image();
        let vurl = gd_img.split('/')
        const pid = gTarget.parent().data('popup-image');

        vurl = vurl[vurl.length - 1];
        changeImg.src = gd_img.replace(vurl, 'gallery/' + pid + '.jpg');

        popGallery.find('.img iframe').length ?
            popGallery.find('.img iframe').replaceWith(changeImg) : popGallery.find('.img img').replaceWith(changeImg)
      }

      $(".pop_close").on('click', function() {
        let iframe = popGallery.find('.img iframe');
        if (iframe.length) {
          let player = new Vimeo.Player(iframe);
          player.unload();
          popGallery.fadeOut(300);
        }

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
