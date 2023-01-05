/* --------------------- DoosanENC Released 2022.08.08 --------------------- */
/* --------------------- Published by 4m Creative --------------------- */

$(function () {
  // 모바일 높이값 상하 확장 UI 제외한 실측 크기 환산
  $(function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    //resize
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  });

  // PC/모바일 구분 코드 (ID로 표기)
  const isMobile = () => {
    const user = navigator.userAgent;
    let isCheck = false;
    if (user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1) {
      isCheck = true;
    }
    return isCheck;
  };
  if (isMobile() == false) {
    console.log("*PC environment");
    $("html").attr("id", "pc");
  } else {
    console.log("*Mobile environment");
    $("html").attr("id", "mobile");
  }

  // AOS.init({
  //   // 핸들링 참고: https://github.com/michalsnik/aos
  //   disable: "mobile",
  //   once: true,
  //   throttleDelay: 99,
  //   duration: 1000,
  //   anchorPlacement: "bottom-bobttom",
  //   startEvent: "load",
  // });

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

  // 다른페이지 링크 후 해당페이지에서 이벤트 발생시키기 (href 뒤에 ?text 표기)
  $(window).ready(() => {
    const page_url = document.location.href,
      param = page_url.substring(page_url.indexOf("?") + 1).split("?");

    // 메인페이지 직무소개 이동후 팝업열기
    if ($(".isotope").length) {
      if (param == "linkvia1") {
        scrollFocus();
        setTimeout(() => {
          $(".isotope_item").eq(8).children("a").trigger("click");
        }, 700);
      } else if (param == "linkvia2") {
        scrollFocus();
        setTimeout(() => {
          $(".isotope_item").eq(0).children("a").trigger("click");
        }, 700);
      }
      history.replaceState({}, null, location.pathname);

      // 개인정보 처리방침 현재,이전 탭박스 및 슬라이드 변경
    } else if ($(".privacy").length) {
      if (param == "media") {
        $(".graybox .policy .box .box_cont").eq(0).removeClass("on");
        $(".graybox .policy > .inner > ul li").eq(0).removeClass("on");
        $(".graybox .policy > .inner .terms_site").eq(0).removeClass("active");

        $(".graybox .policy .box .box_cont").last().addClass("on");
        $(".graybox .policy > .inner > ul li").last().addClass("on");
        $(".graybox .policy > .inner .terms_site").last().addClass("active");
      }

      // 사업영역 각 탭별 이동 후 스크롤 포커싱
    } else if ($(".civil_engineer").length) {
      if (param == "linkvia3") {
        window.scrollTo({
          top: $(".top").offset().top - $(".sub_visual_menu").outerHeight(),
          behavior: "smooth",
        });
        history.replaceState({}, null, location.pathname);
      }
    }

    function scrollFocus() {
      window.scrollTo({
        top: $(".tab_small").offset().top - $(".tab_small").outerHeight() * 2,
        behavior: "smooth",
      });
    }
  });
});

// 고객문의 => 국가선택 select
document.addEventListener("DOMContentLoaded", () => {
  if ($("#sel02").length) {
    const selectDrop = document.querySelector("#sel02");

    fetch("https://restcountries.com/v2/all")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let output = "";
        data.forEach((country) => {
          output += `<option value ="${country.name}">${country.name}</option>`;
        });

        selectDrop.innerHTML = output;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **공통**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var commonEvent = {
  init: function () {
    this.headerEvent();
    this.sitemap();
    this.subVisual();
    this.submenuEvent();
    this.footerEvent();
    this.goTopEvent();
    this.iptEvent();
    this.tabEvent();
    this.popup();
    this.english();
  },

  headerEvent: () => {
    // 1400px 이하 가로스크롤 이동 시 헤더 위치 변경(fixed 속성 대안)
    $(window).on("scroll", function () {
      $(".header").css("left", 0 - $(this).scrollLeft());
    });

    // 헤더 UI 화이트모드 및 마우스오버 이벤트
    $("#sub .header .gnb > ul > li").hover(
      function () {
        if ($(".header").hasClass("wht")) {
          $(".header").removeClass("wht");
          $(".header").css({ background: "#fff" });
        }
        if ($(".header").hasClass("bg")) {
          $(".header").removeClass("wht");
          $(".header").css({ background: "#fff" });
        }
      },
      function () {
        if ($(".header").hasClass("bg")) {
          $(".header").removeClass("wht");
          $(".header").css({ background: "#fff" });
        } else {
          $(".header").addClass("wht");
          $(".header").css({ background: "transparent" });
        }
      }
    );

    // 메인페이지 fullpage 각 섹션별 화이트모드/노멀모드 적용 및 마우스오버 이벤트
    $("#main .header .gnb > ul > li").mouseenter(function () {
      if (
        !$("body").hasClass("fp-viewing-firstPage") &&
        !$("body").hasClass("fp-viewing-fifthPage")
      ) {
        $(".header").css({ background: "#fff" });
        $(".header").removeClass("wht");
      } else if ($("body").hasClass("fp-viewing-firstPage")) {
        $(".header").removeClass("wht");
        $(".header").css({ background: "#fff" });
      } else if ($("body").hasClass("fp-viewing-fifthPage")) {
        $(".header").removeClass("wht");
        $(".header").css({ background: "#fff" });
      } else {
        $(".header").removeClass("wht");
      }
    });
    $("#main .header .gnb > ul > li").mouseleave(function () {
      if (
        !$("body").hasClass("fp-viewing-firstPage") &&
        !$("body").hasClass("fp-viewing-fifthPage")
      ) {
        $(".header").css({ background: "transparent" });
      } else if ($("body").hasClass("fp-viewing-firstPage")) {
        $(".header").addClass("wht");
        $(".header").css({ background: "transparent" });
      } else if ($("body").hasClass("fp-viewing-fifthPage") && !$('.container').hasClass('en')) {
        $(".header").addClass("wht");
        $(".header").css({ background: "transparent" });
      } else if ($("body").hasClass("fp-viewing-fifthPage") && $('.container').hasClass('en')) {
        $(".header").css({ background: "transparent" });
      } else {
        // $('.header').removeClass('wht');
      }
    });

    // 사이트맵/ 랭귀지 버튼 애니메이션
    $(".top_sitemap, .header .lang_select a").on("click", function () {
      $(this).toggleClass("on");
      if ($("#mobile").length && $(".top_sitemap").hasClass("on")) {
        $(".header").addClass("mobileForm");
      } else if (!$(".top_sitemap").hasClass("on")) {
        $(".header").removeClass("mobileForm");
      } else if ($(".top_sitemap").hasClass("on")) {
        $(".header").removeClass("bg");
        $(".header").css({ background: "transparent" });
      }

      if ($(".header .lang_select a").hasClass("on")) {
        $(".header .lang_choice").addClass("on");
      } else {
        $(".header .lang_choice").removeClass("on");
      }
    });
  },

  subVisual: () => {
    // 서브페이지 로드 시 상단 이미지 줌아웃 효과
    $(window).load(() => {
      $(".sub_visual").addClass("ani");
    });
  },

  submenuEvent: () => {
    // 서브페이지 서브메뉴 온오프
    $(document).on("click", ".sub_visual_menu .depth", function () {
      $(this).toggleClass("open");
    });

    // 서브메뉴 클릭 시 해당메뉴 맨 위로 표기
    $(document).on(
      "click",
      ".sub_visual_menu .depth .drop_box li a",
      function () {
        var selected = $(this).text();
        var dep_tit = $(this).closest(".drop_box").siblings(".dep_tit");
        dep_tit.text(selected);
      }
    );

    // 스크롤다운 버튼 클릭 시 내용화면으로 스크롤
    $(document).on("click", ".scroll_down", function () {
      var titleTop = $(".title_area").offset().top;
      $("html, body") /* .removeClass('smooth') */
        .animate({ scrollTop: titleTop }, "300");
    });

    // 서브 비주얼 스크롤 패스 시 서브메뉴 상단 고정 및 헤더메뉴 숨김
    const subMenu = document.querySelector(".sub_visual_menu");
    if ($(".sub_visual_menu").length) {
      let fixMenu = subMenu.offsetTop;

      $(window).on("scroll", function () {
        let st = $(window).scrollTop();

        if (st >= fixMenu) {
          subMenu.classList.add("fixed");
        } else {
          subMenu.classList.remove("fixed");
        }

        if (st >= fixMenu - 200) {
          $(".header").addClass("indentUp");
        } else {
          $(".header").removeClass("indentUp");
        }
      });
    }
  },

  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------- 사이트맵 ----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------

  sitemap: () => {
    // 메인페이지에서 사이트맵 구현 오류 > main.js에 추가 중복코드 삽입.
    $(document).ready(() => {
      $(".sitemap").show();
    });

    // 변수선언 - 정규식 구분/ 스크롤 체크용 바디/ 사이트맵
    const check_num = /[0-9]/,
      check_eng = /[a-zA-Z]/,
      check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
      check_spc = /[~!@#\#$%<>^&*]/,
      body = $("body");

    let blocks = $(".block_br > ul > li");
    (scrollPosition = 0), (sitemap = $(".top_sitemap"));

    // *** Mobile 사이트맵 구조 변경 메인틀(pc버전 왼쪽 큰 창)에 모든 요소 재정렬
    if ($("#mobile").length) {
      const listMob = $(".sitemap_main .block_le > ul"),
        moveBrlist = $(".sitemap_sub .block_br > ul > li .block_2depth");

      $(".sitemap .lang_select").append($(".sitemap .weve_link .btn"));
      moveBrlist.find("> li > a").wrap("<h4></h4>");
      moveBrlist.children("li").addClass("empty");

      listMob.append($(".sitemap_sub .block_br > ul > li"));
      listMob.children("li").last().after($(".sitemap .family_site"));
      listMob
        .find("> li h3")
        .contents()
        .unwrap()
        .wrap("<h2 class='sitemap_btn'></h2>");

      listMob.find(".block_2depth > li").each((index) => {
        if (
          listMob.find(".block_2depth > li").eq(index).children("h4").siblings()
            .length !== 0
        ) {
          listMob
            .find(".block_2depth > li")
            .eq(index)
            .find("h4 a")
            .prop("href", "javascript:;");
          listMob
            .find(".block_2depth > li")
            .eq(index)
            .find("h4")
            .addClass("btn_3dep");
        }
      });

      // 3뎁스
      listMob
        .find(".block_2depth > li > .btn_3dep")
        .off("click")
        .on("click", function () {
          $(this).toggleClass("active");
          $(this).siblings().toggleClass("active");
          $(this).parent().siblings().children().removeClass("active");
        });

      $(".family_site").on("click", function () {
        $(".sitemap .wrap").animate(
          { scrollTop: $(".family_site").offset().top },
          "fast"
        );
      });
    } // \\ mobile

    // 폰트패밀리 혼용 구분
    blocks.each((index) => {
      let check_txt = blocks.eq(index).children("h3").text();
      if (!check_kor.test(check_txt)) {
        blocks
          .eq(index)
          .children("h3")
          .css("font-family", '"Montserrat", sans-serif');
      }
    });

    // PC 1400px이하 가로 스크롤 및 사이트맵 오픈 시 body 스크롤 방지
    $(window).on("scroll", function () {
      scrollPosition = window.pageYOffset;
      $(".sitemap").css("left", 0 - $(this).scrollLeft());
    });

    // 사이트맵 온오프
    sitemap.on("click", () => {
      if (sitemap.hasClass("on")) {
        openProcessor();
        $(".sitemap").addClass("active");
        $(
          ".header .logo, .header .gnb, .header .gnb_menu > div:not(.top_sitemap)"
        ).addClass("sitemapOn");
      } else {
        closeProcessor();
        $(
          ".sitemap, .block_le > ul > li, .block_2depth > li > h4, .block_2depth > li > ul "
        ).removeClass("active open");
        $(
          ".header .logo, .header .gnb, .header .gnb_menu > div:not(.top_sitemap)"
        ).removeClass("sitemapOn");
        $(".sitemap .wrap").stop().animate({ scrollTop: 0 }, "smooth");
      }
    });

    // 2뎁스
    $(".sitemap_btn")
      .off("click")
      .on("click", function (event) {
        $(this).parent().toggleClass("active").siblings().removeClass("active");
        if ($("#mobile").length) {
          let activeIdx = $(".block_le > ul > li.active").index();

          $(".block_le > ul > li")
            .not(":eq(" + activeIdx + ")")
            .find(".btn_3dep, .block_3depth")
            .removeClass("active");
        }

        event.stopPropagation();
      });

    // 팝업 열기 function
    function openProcessor() {
      scrollPosition = window.pageYOffset;
      $("html").addClass("blockScroll");

      if ($("#mobile").length) {
        $("body").css("top", `-${scrollPosition}px`);
      }
    }

    // 팝업 닫기 function
    function closeProcessor() {
      $("html").removeClass("blockScroll");
      $(".popup").removeClass("on");

      if ($("#mobile").length) {
        scrollPosition = body.css("top");
        scrollPosition = scrollPosition.replace("px", "");

        body.removeProp("top");
        window.scrollTo(0, -scrollPosition);
      }
    }
  },

  footerEvent: () => {
    $(document).on("click", ".family_site .site_selected", function () {
      var selElm = $(this).parent();
      if (!selElm.hasClass("open")) {
        selElm.addClass("open");
      } else {
        selElm.removeClass("open");
      }
    });

    $(document).on("click", ".family_site .site_list li a", function () {
      var selected = this.innerText,
        siteName = document.getElementsByClassName("site_selected")[0],
        familySite = this.parentNode.parentNode.parentNode;

      siteName.innerText = selected;
      familySite.classList.remove("open");
    });

    $(window).on("scroll", function () {
      let st = $(window).scrollTop(),
        footer = document.querySelector(".footer").offsetTop;

      if ($(window).width() > 768) {
        footer = footer - 300;

        if (st >= footer) {
          setTimeout(() => {
            $(".footer .sec_tit > span").addClass("fin");
          }, 200);
        }
      }
    });
  },

  goTopEvent: () => {
    $(window).scroll(function () {
      // top button control
      if ($(this).scrollTop() > 400) {
        $("#topButton").fadeIn();
      } else {
        $("#topButton").fadeOut();
      }
      var footerTop = $(".footer").offset().top - $(window).outerHeight(),
        pos = $(".footer").outerHeight() + Number(80),
        pos_intw = $(".footer").outerHeight() + Number(196),
        pos_m = $(".footer").outerHeight() + Number(25);

      if ($(this).scrollTop() > footerTop) {
        if ($(window).width() > 767) {
          if ($(".interviewBtn").length) {
            $("#topButton").addClass("on").css({ bottom: pos_intw });
          } else {
            $("#topButton").addClass("on").css({ bottom: pos });
          }
        } else {
          $("#topButton").addClass("on").css({ bottom: pos_m });
        }
      } else {
        if ($(window).width() > 767) {
          if ($(".interviewBtn").length) {
            $("#topButton").removeClass("on").css({ bottom: "19.6rem" });
          } else {
            $("#topButton").removeClass("on").css({ bottom: "8rem" });
          }
        } else {
          $("#topButton").removeClass("on").css({ bottom: "3.5rem" });
        }
      }
    });

    $(document).on("click", "#topButton", function () {
      $("html, body").animate({ scrollTop: 0 }, "300");
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
    }

    //file
    var fileTarget = $("#upload_file");
    fileTarget.on("change", function () {
      var cur = $(".file_row input[type='file']").val();
      $(".upload_name").val(cur);
    });
  },

  tabEvent: () => {
    // 유형1 (ex 사업영역, 기술역량) - 大분류
    const tabContainer = $("#mobile .tab_box > .inner"),
      tabBox = tabContainer.find("> .tab_slide"),
      tabButton = tabBox.find("> li");

    let size = tabButton.length,
      tbIndex = 0;

    if (tabBox.length) {
      $(document).ready(function () {
        let tbOn = Math.floor(tabBox.find("> li.on").position().left),
          tbWidth = tabButton.width();

        tabContainer.animate({ scrollLeft: tbOn - tbWidth }, 1000);
      });

      tabContainer.on("load resize scroll", () => {
        tabBoxPosition = Math.abs(tabBox.position().left);

        tabButton.each((index) => {
          tabButtonPosition = Math.floor(tabButton.eq(index).position().left);

          if (size !== index + 1) {
            nextIndexPosition = Math.floor(
              tabButton.eq(index).next().position().left
            );

            if (
              tabBoxPosition > tabButtonPosition &&
              tabBoxPosition <= nextIndexPosition
            ) {
              tbIndex = index;
            }
          }
        });

        if (tabBox.children().length > 3) {
          tabBox.parents(".tab_box").addClass("shadow_align");

          if (tabContainer.scrollLeft() == 0) {
            tabBox.parents(".tab_box").addClass("right");
          } else if (
            Math.round(tabBox.width() - tabContainer.scrollLeft()) ===
            tabContainer.width()
          ) {
            tabBox.parents(".tab_box").addClass("left");
          } else {
            tabBox.parents(".tab_box").removeClass("left right");
          }
        }
      });

      $(".control").on("click", function () {
        if ($(this).hasClass("prev")) {
          tsMove = Math.floor(tabButton.eq(tbIndex).position().left);

          tabContainer.animate({ scrollLeft: tsMove }, 200);
        } else {
          tsmoveTrigger = Math.abs(tabBox.position().left);

          if (
            Math.ceil(tsmoveTrigger) ==
            Math.floor(tabButton.eq(tbIndex).next().position().left)
          ) {
            tbIndex = tbIndex + 1;
          } else {
            tbIndex = tbIndex;
          }

          tsMove = Math.floor(tabButton.eq(tbIndex).next().position().left);
          tabContainer.animate({ scrollLeft: tsMove }, 200);
        }
      });
    }

    // 유형2 (ex 연혁, 직무소개) - 小분류
    const tabBtn = $(".tab_small ul li"),
      bar = $(".tab_small .bar");

    tabBtn.each((index) => {
      // initializing
      tabBtn.css({ width: "calc(100%/ " + tabBtn.length + ")" });
      bar.css({
        width: tabBtn.width(),
        left: $(".tab_small ul li.active").offset().left,
      });

      tabBtn.eq(index).on("click", () => {
        tabBtn.removeClass("active");
        tabBtn.eq(index).addClass("active");

        bar.css({
          width: tabBtn.width(),
          left: $(".tab_small ul li.active").offset().left,
        });

        $(window).on("resize load scroll", () => {
          bar.css({
            width: tabBtn.width(),
            left: $(".tab_small ul li.active").offset().left,
          });
        });

        window.scrollTo({
          top: $(".tab_small").offset().top - $(".tab_small").outerHeight() * 2,
          behavior: "smooth",
        });

        // 연혁페이지
        if ($(".HMhistory").length) {
          $(".HMhistory").removeClass("active");
          $(".HMhistory").eq(index).addClass("active");
        }
      });
    });
  },

  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------- 팝업 ------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------

  popup: () => {
    const body = $("body");

    // 스크롤 값 추적
    let scrollPosition = 0,
      popupClose = $(".pop_close");

    $(window).on("scroll", () => {
      scrollPosition = window.pageYOffset;
    });

    // 팝업 열기
    $(".openPopup").on("click", () => {
      openProcessor();
    });

    // 팝업 닫기
    popupClose.on("click", () => {
      closeProcessor();
    });

    // 팝업 열기 function
    function openProcessor() {
      scrollPosition = window.pageYOffset;
      $(".popup").fadeIn(300);
      $(".popup").addClass("on");
      $("html").addClass("blockScroll");

      if ($("#mobile").length) {
        $("body").css("top", `-${scrollPosition}px`);
        $("header").hide();
      }
    }

    // 팝업 닫기 function
    function closeProcessor() {
      $("html").removeClass("blockScroll");
      $(".popup").removeClass("on");

      if ($("#mobile").length) {
        scrollPosition = body.css("top");
        scrollPosition = scrollPosition.replace("px", "");

        body.removeProp("top");
        window.scrollTo(0, -scrollPosition);
        $("header").show();
        $(".popup").fadeOut(300);
      }
    }
  },

  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------- 영문 ------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------

  english: () => {
    // 영문사이트 폰트 굵기 값 추적 및 변경
    if ($(".header_en, .sitemap_en, .en").length) {
      $("html *").each(function (index) {
        if ($("html *").eq(index).css("font-weight") === "150") {
          $("html *").eq(index).css("font-weight", "100");
        }
      });
    }
  },
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **서브**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var businessEvent = {
  init: function () {
    this.interview();
    this.masterpieceMenu();
    this.goToInterview();
    this.headerScroll();
  },

  interview: () => {
    const contentNum = $(".interview .contents .wrap dl");

    contentNum.each((index) => {
      let n = Math.abs(index);
      n < 9
        ? contentNum
            .eq(index)
            .find("dt span")
            .text("0" + (index + 1))
        : contentNum
            .eq(index)
            .find("dt span")
            .text(index + 1);
    });
  },

  masterpieceMenu: () => {
    const subMenu = document.querySelector(".masterpiece_menu");

    if ($(".masterpiece_menu").length) {
      let fixMenu = subMenu.offsetTop;

      $(window).on("scroll", function () {
        let st = $(window).scrollTop();
        let s0 = $(".masterpiece .section0").offset().top;

        if (st >= fixMenu) {
          subMenu.classList.add("fixed");
        } else {
          subMenu.classList.remove("fixed");
        }

        if (st >= fixMenu - 200) {
          $(".header").addClass("indentUp");
        } else {
          $(".header").removeClass("indentUp");
        }

        if (st >= s0 - 600) {
          $(".masterpiece .section0").addClass("active");
        } else {
        }
      });

      if ($("#mobile").length) {
        $(".masterpiece_menu .on").on("click", () => {
          $(".masterpiece_menu ul").toggleClass("open");
        });
      }
    }
  },

  goToInterview: () => {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 400) {
        $(".interviewBtn").fadeIn();
      } else {
        $(".interviewBtn").fadeOut();
      }

      var footerTop = $(".footer").offset().top - $(window).outerHeight(),
        pos = $(".footer").outerHeight() + Number(80),
        pos_m = $(".footer").outerHeight() + Number(10);

      if ($(this).scrollTop() > footerTop) {
        if ($(window).width() > 767) {
          $(".interviewBtn").addClass("on").css({ bottom: pos });
        } else {
          $(".interviewBtn").addClass("on").css({ bottom: pos_m });
        }
      } else {
        if ($(window).width() > 767) {
          $(".interviewBtn").removeClass("on").css({ bottom: "8rem" });
        } else {
          $(".interviewBtn").removeClass("on").css({ bottom: "1rem" });
        }
      }
    });
  },

  //스크롤 down: header 사라짐, 스크롤 up: header 등장
  headerScroll: () => {
    let before = 0;

    window.addEventListener("scroll", (ev) => {
      if (before < window.scrollY) {
        $(".header").addClass("indent");
        before = window.scrollY;
      } else if (before > window.scrollY) {
        $(".header").removeClass("indent wht");
        $(".header").addClass("bg");
        $(".header").css({ background: "#fff" });

        before = window.scrollY;
      }

      if (window.scrollY == 0) {
        if ($(".container").hasClass("graybg")) {
          $(".header").removeClass("indent");
        } else {
          $(".header").removeClass("indent bg");
          $(".header").addClass("wht");
          $(".header").css({ background: "transparent" });
        }
      }
    });
  },
};

var civilEngineerEvent = {
  init: function () {
    this.civilSwiper();
    // this.popupMouse();
  },

  civilSwiper: () => {
    $(".civil_engineer .outline .swiper").each(function (index) {
      var idx = index + 1;
      // 첫번째 슬라이드 2depth 스와이퍼
      var bus03Swiper = new Swiper(".civil_engineer .outline .swiper0" + idx, {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        speed: 1000,
        loop: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: true, // 쓸어 넘기거나 버튼 클릭 시 자동 슬라이드 정지.
        },
        navigation: {
          nextEl: ".civil_engineer .outline .swiper-button-next0" + idx,
          prevEl: ".civil_engineer .outline .swiper-button-prev0" + idx,
        },
        watchOverflow: true,
      });

      // Next, Prev버튼 클릭 시 오토플레이 재개
      $(document).on(
        "click",
        ".civil_engineer .outline .swiper-button-next0" +
          idx +
          ", .civil_engineer .outline .swiper-button-prev0" +
          idx +
          "",
        () => {
          bus03Swiper.autoplay.start();
        }
      );
    });
  },

  popupMouse: () => {
    if ($(".popup").length) {
      // 영역 밖 이동 시 마우스 닫기 버튼 보이기
      const LayerPopup = $(".card_popup01 .popup_inner"),
        popupClose = $(".pop_close");

      $(document).mousemove(function (e) {
        if (LayerPopup.has(e.target).length === 0) {
          popupClose.css({ transform: "scale(1)" });
        } else {
          popupClose.css({ transform: "scale(0)" });
        }
      });

      // 영영 밖 이동 시 마우스 닫기 버튼  커서 따라다니기
      const circle = document.querySelector(".pop_close");

      document.addEventListener("mousemove", (e) => {
        // mousemove이벤트를 이용해 움
        // 마우스의 좌표는 clientX와 clientY를 이용해 알수 있다. -> 브라우저 window의 좌표값 위치를 전달한다.
        // pageX, pageY와는 다름.
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        circle.style.left = mouseX - 52.5 + "px";
        circle.style.top = mouseY - 52.5 + "px";
      });
    }
  },
};

//사업실적 팝업
function popupbusiness(popConts) {
  var popthis = $(".popup." + popConts);
  popthis.fadeIn(300);

  setTimeout(() => {
    $(".pop_cont .list img").css({
      transform: "scale(1.2)",
      transition: "all 3s",
    });
  }, 200);

  popthis.find(".pop_close").click(function () {
    popthis.fadeOut(300);
    setTimeout(() => {
      $(".pop_cont .list img").css({ transform: "scale(1)" });
    }, 200);
  });
}

var civilOutline = {
  init: function () {
    this.outlineNav();
  },

  outlineNav: () => {
    const section = $(".section"),
      fixSidemenu = $(".civil_engineer .section_nav"),
      fraction = fixSidemenu.find(".fraction"),
      fixmenuHeight = $(".sub_visual_menu").height();

    fraction.children(".total_page").text(section.length);

    $(window).on("load resize scroll", function (e) {
      let gap = $(window).height() / 4,
        currentPosition = $(window).scrollTop() + fixmenuHeight,
        fractionOut =
          section.eq(section.length - 1).innerHeight() / 4 +
          $(".footer").offset().top -
          $(".footer").outerHeight();

      if (
        currentPosition > section.eq(0).offset().top - gap &&
        currentPosition < fractionOut
      ) {
        fixSidemenu.addClass("on");

        section.each(function (index) {
          indexName = section.eq(index).find(".tit").text();

          if (index + 1 !== section.length) {
            if (
              currentPosition > section.eq(index).offset().top - gap &&
              currentPosition < section.eq(index + 1).offset().top
            ) {
              section.eq(index).addClass("active");
              section.not(":eq(" + index + ")").removeClass("active");
              fraction.children(".current_page").text(index + 1);
              fraction.children(".page_name").text(indexName);
            }
          } else {
            if (currentPosition > section.eq(index).offset().top - gap) {
              section.eq(index).addClass("active");
              section.not(":eq(" + index + ")").removeClass("active");
              fraction.children(".current_page").text(index + 1);
              fraction.children(".page_name").text(indexName);
            }
          }
        });
      } else {
        fixSidemenu.removeClass("on");
        section.removeClass("active");
      }
    });

    $(".section_nav .button").on("click", function () {
      let ctlIdx = fraction.children(".current_page").text();

      if ($(this).hasClass("prev") == true) {
        if (ctlIdx == 1) {
          ctlIdx = 0;
        } else {
          ctlIdx = ctlIdx - 2;
        }

        $("html, body").animate(
          {
            scrollTop: section.eq(ctlIdx).offset().top - fixmenuHeight,
          },
          500
        );
      } else {
        $("html, body").animate(
          {
            scrollTop: section.eq(ctlIdx).offset().top,
          },
          500
        );
      }
    });
  },
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **기술**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var techEvent = {
  init: function () {
    this.motion();
    this.sectionNav();
    this.loveMoTab();
  },

  motion: () => {
    const tl1 = gsap.timeline({
        stagger: 1,
        onComplete: function () {
          $(".box > li").hover(
            function () {
              $(this).addClass("on");
              $(this).css("background", "#005EB8");
              $(this).children("ul").eq(0).css({ opacity: "1" });
              $(this).children("ul").eq(1).css({ opacity: "0" });
            },
            function () {
              $(this).removeClass("on");
              $(this).css("background", "#fff");
              $(this).children("ul").eq(1).css({ opacity: "1" });
              $(this).children("ul").eq(0).css({ opacity: "0" });
            }
          );
        },
      }),
      tl2 = gsap.timeline({ stagger: 1 });
    tl4 = gsap.timeline({ stagger: 1 });
    tl1.pause();
    tl2.pause();
    tl4.pause();

    $(window).on("load resize scroll", () => {
      let st = $(window).scrollTop(),
        motion01 = $(".love_motion").offset().top,
        motion02 = $(".weve_motion").offset().top,
        trigger = st + $(window).height() / 2;

      // love motion trigger
      if ($("#pc").length) {
        if (trigger > motion01) {
          tl1.play();
        } else {
          // tl1.reverse()
        }
      } else {
        $(".love_motion .box > li > ul > li:nth-child(2) a").html("");
      }

      // have motion trigger
      if ($("#pc").length) {
        if (trigger > motion02) {
          tl2.play();
        } else {
        }
      } else {
        if (st > motion02 - 500) {
          tl4.play();
        } else {
        }
      }
    });

    // 기술역량 love모션 중 파란색 밑줄라인 간격 조정(영문길이 2줄로 초과됨에 따라)
    let enSpecific = 130;
    if ($(".technology").hasClass("en")) {
      enSpecific += 40;
    }

    tl1
      .to(".one", { x: -516 })
      .to(".one", { opacity: 1, duration: 0.2 })
      .to(".one .slogan p:first-child", { x: 0, opacity: 0, duration: 0.2 })
      .to(
        ".one .slogan p:last-child",
        { x: 0, opacity: 1, duration: 0.3 },
        "=-.1"
      )

      .to(".two", { x: -172 }, "=-1")
      .to(".two", { opacity: 1, duration: 0.2 })
      .to(".two .slogan p:first-child", { x: 0, opacity: 0, duration: 0.2 })
      .to(
        ".two .slogan p:last-child",
        { x: 0, opacity: 1, duration: 0.3 },
        "=-.1"
      )

      .to(".three", { x: 172 }, "=-1")
      .to(".three", { opacity: 1, duration: 0.2 })
      .to(".three .slogan p:first-child", { x: 0, opacity: 0, duration: 0.2 })
      .to(
        ".three .slogan p:last-child",
        { x: 0, opacity: 1, duration: 0.3 },
        "=-.1"
      )

      .to(".four", { x: 516 }, "=-1")
      .to(".four", { opacity: 1, duration: 0.2 })
      .to(".four .slogan p:first-child", { x: 0, opacity: 0, duration: 0.2 })
      .to(
        ".four .slogan p:nth-child(2)",
        { x: 0, opacity: 1, duration: 0.3 },
        "=-.1"
      )

      .to(".box > li", { x: 0, y: 0, duration: 0.4 })
      .to(
        ".box",
        { borderRadius: "635px", width: "635px", duration: 0.4 },
        "=-.4"
      )
      .to("svg, .box p", { opacity: 0, duration: 0.2 }, "=-.3")
      .to(
        "svg:last-child, .slogan p:nth-child(3), .sub p:last-of-type",
        { opacity: 1, duration: 0.3 },
        "=-.3"
      )

      .to(".four", {
        boxShadow: "0 0 0 90px #005EB8",
        border: "0px solid #005EB8",
        duration: 0.6,
        delay: 0.3,
      })
      .to(
        ".four li, .box > li:not(:last-child)",
        { opacity: 0, duration: 0.2, delay: 1 },
        "=-.6"
      )
      .to(
        ".four",
        {
          scale: 1.9,
          background: "#005EB8",
          boxShadow: "0 0 0 0px #005EB8",
          duration: 0.6,
        },
        "=-.6"
      )
      .to(
        ".box",
        { duration: 0.6, background: "rgba(153, 205, 255, .2)" },
        "=-.6"
      )
      .to(".love span:first-child", { opacity: 1, duration: 0.5 }, "=-.6")
      .to(".box, .box > li, .four li p:last-child", {
        opacity: 0,
        background: "transparent",
        duration: 0.6,
        delay: 0.2,
      })
      .to(
        ".love span",
        {
          bottom: "auto",
          scale: 1.2,
          duration: 0.5,
          color: "#005EB8",
          fontWeight: 450,
        },
        "=-.5"
      )
      .to(".love span:first-child", { opacity: 0, duration: 0.3 }, "=-.6")
      .to(".love span:last-child", { opacity: 1, duration: 1 }, "=-.6")
      .to(".love span:last-child em", { color: "#0b0f14", duration: 0.3 })
      .to(".line, .slogan p", { opacity: 1, duration: 0.6, delay: 0.3 }, "=-.3")
      .to(".line", { top: enSpecific, duration: 0.3 })
      .to(".love_motion > h2", { top: 150, opacity: 1, duration: 0.3 })
      .to(".line", { top: 560, duration: 0.6, delay: 0.3 })
      .to(".love", { height: 0 }, "=-.3")
      .to(".box", { width: "100%", height: "40.8rem", opacity: 1 }, "=-.3")
      .to(".one", { x: -516, duration: 0 }, "=-.3")
      .to(".two", { x: -172, duration: 0 }, "=-.3")
      .to(".three", { x: 172, duration: 0 }, "=-.3")
      .to(
        ".four",
        { x: 516, scale: 1, duration: 0, clearProps: "box-shadow" },
        "=-.3"
      )
      .to(
        ".box > li > ul:first-child, .slogan p:not(:nth-child(2)), .sub p:last-of-type",
        { opacity: 0, duration: 0 },
        "=-.5"
      )
      .to(
        ".box > li",
        {
          opacity: 1,
          background: "#fff",
          border: "1px solid rgba(0, 0, 0, .15)",
          duration: 0.5,
        },
        "=-.3"
      )
      .to(".motion_menu, .motion_menu p", { opacity: 1, duration: 0.5 }, "=-.5")
      .to(".four li", { opacity: 1 }, "=-.5");

    /* have motion */
    tl2
      .to(".transform-box", {
        width: "11rem",
        height: "11rem",
        rotation: 90,
        x: "2rem",
        y: "3.5rem",
        duration: 0.5,
        delay: 1,
      })
      .to(".we", { x: "-2rem", duration: 0.5 }, "=-.5")
      .to(".ve", { x: "2.5rem", duration: 0.5 }, "=-.5")

      .to(".transform-box .left, .transform-box .right", {
        opacity: "1",
        duration: 0,
      })
      .to(".transform-box", {
        backgroundColor: "transparent",
        duration: 0.2,
        delay: 0.5,
      })

      .to(".transform-box .left", { y: "2.4rem", duration: 0.5 })
      .to(
        ".have .transform-box .right",
        { y: "-20.5rem", duration: 0.5 },
        "=-.5"
      )
      .to(".live .transform-box .right", { y: "-10rem", duration: 0.5 }, "=-.5")
      .to(
        ".save .transform-box .right",
        { y: "-17.5rem", duration: 0.5 },
        "=-.5"
      )
      .to(
        ".solve .transform-box .right",
        { y: "-22rem", duration: 0.5 },
        "=-.5"
      )
      .to(".we", { x: "-4rem", duration: 0.5 }, "=-.5")
      .to(".ve", { x: "4rem", duration: 0.5 }, "=-.5")
      .to(".ha", { x: "-3.7rem", width: "auto" }, "=-.5")
      .to(".ha", { opacity: "1", delay: 0.5 }, "=-.3")

      .to(
        ".transform-box .left, .transform-box .right",
        { opacity: 0, duration: 0.5, delay: 0.5 },
        "=-.5"
      )
      .to(".transform-box", { width: "0" })
      .to(".we", { x: "0", duration: 0.3 }, "=-.5")
      .to(".ve", { x: "0", duration: 0.3 }, "=-.5")
      .to(".ha", { x: "1.6rem", duration: 0.4 }, "=-.5")

      .to(".we, .ve", { color: "#005eb8", duration: 0.3, delay: 0.5 }, "=-.5")
      .to(".we", { color: "#000", duration: 0.3, delay: 0.5 });

    /* have motion 모바일 */
    tl4
      .to("#mobile .transform-box", {
        width: "4rem",
        height: "4rem",
        rotation: 90,
        x: "0rem",
        y: "1.2rem",
        duration: 0.5,
        delay: 1,
      })
      .to("#mobile .we", { x: "-.7rem", duration: 0.5 }, "=-.5")
      .to("#mobile .ve", { x: ".7rem", duration: 0.5 }, "=-.5")

      .to("#mobile .transform-box .left, #mobile .transform-box .right", {
        opacity: "1",
        duration: 0,
      })
      .to("#mobile .transform-box", {
        backgroundColor: "transparent",
        duration: 0.2,
        delay: 0.5,
      })

      .to("#mobile .transform-box .left", { y: "2.2rem", duration: 0.5 })
      .to(
        "#mobile .have .transform-box .right",
        { y: "-6.5rem", duration: 0.5 },
        "=-.5"
      )
      .to(
        "#mobile .live .transform-box .right",
        { y: "-2.8rem", duration: 0.5 },
        "=-.5"
      )
      .to(
        "#mobile .save .transform-box .right",
        { y: "-5.5rem", duration: 0.5 },
        "=-.5"
      )
      .to(
        "#mobile .solve .transform-box .right",
        { y: "-7.2rem", duration: 0.5 },
        "=-.5"
      )
      .to("#mobile .we", { x: "-2rem", duration: 0.5 }, "=-.5")
      .to("#mobile .ve", { x: "1rem", duration: 0.5 }, "=-.5")
      .to("#mobile .ha", { x: "-3.2rem", width: "auto" }, "=-.5")
      .to("#mobile .ha", { opacity: "1", delay: 0.3 }, "=-.3")

      .to(
        "#mobile .transform-box .left, #mobile .transform-box .right",
        { opacity: 0, duration: 0.5, delay: 0.5 },
        "=-.5"
      )
      .to("#mobile .transform-box", { width: "0" })
      .to("#mobile .we", { x: "0", duration: 0.3 }, "=-.5")
      .to("#mobile .ve", { x: "0", duration: 0.3 }, "=-.5")
      .to("#mobile .ha", { x: "0rem", duration: 0.4 }, "=-.5")

      .to("#mobile .we, .ve", { color: "#005eb8", duration: 0.3 }, "=-.5")
      .to("#mobile .we", { color: "#000", duration: 0.3, delay: 0.5 });
  },

  sectionNav: () => {
    const section = $("section"),
      fixSidemenu = $(".competence .section_nav"),
      fraction = fixSidemenu.find(".fraction"),
      fixmenuHeight = $(".sub_visual_menu").height();

    fraction.children(".total_page").text(section.length);

    $(window).on("load resize scroll", function (e) {
      let gap = $(window).height() / 4,
        currentPosition = $(window).scrollTop() + fixmenuHeight,
        fractionOut =
          section.eq(section.length - 1).innerHeight() / 4 +
          $(".footer").offset().top -
          $(".footer").outerHeight();

      if (
        currentPosition > section.eq(0).offset().top - gap &&
        currentPosition < fractionOut
      ) {
        fixSidemenu.addClass("on");

        section.each(function (index) {
          indexName = section.eq(index).find(".indent").text();

          if (index + 1 !== section.length) {
            if (
              currentPosition > section.eq(index).offset().top - gap &&
              currentPosition < section.eq(index + 1).offset().top
            ) {
              section.eq(index).addClass("active");
              section.not(":eq(" + index + ")").removeClass("active");
              fraction.children(".current_page").text(index + 1);
              fraction.children(".page_name").text(indexName);
            }
          } else {
            if (currentPosition > section.eq(index).offset().top - gap) {
              section.eq(index).addClass("active");
              section.not(":eq(" + index + ")").removeClass("active");
              fraction.children(".current_page").text(index + 1);
              fraction.children(".page_name").text(indexName);
            }
          }
        });
      } else {
        fixSidemenu.removeClass("on");
        section.removeClass("active");
      }
    });

    $(".section_nav .button").on("click", function () {
      let ctlIdx = fraction.children(".current_page").text();

      if ($(this).hasClass("prev") == true) {
        if (ctlIdx == 1) {
          ctlIdx = 0;
        } else {
          ctlIdx = ctlIdx - 2;
        }

        $("html, body").animate(
          {
            scrollTop: section.eq(ctlIdx).offset().top - fixmenuHeight,
          },
          500
        );
      } else {
        $("html, body").animate(
          {
            scrollTop: section.eq(ctlIdx).offset().top,
          },
          500
        );
      }
    });
  },

  loveMoTab: () => {
    // 유형1 (ex 사업영역) - 大분류
    const tabContainer = $("#mobile .love_swiper_wrap > .love_swiper"),
      tabBox = tabContainer.find("> .box"),
      tabButton = tabBox.find("> li");

    let size = tabButton.length,
      tbIndex = 0;

    if (tabBox.length) {
      $(document).ready(function () {
        let tbOn = Math.floor(tabBox.find("> li").position().left),
          tbWidth = tabButton.width();

        tabContainer.animate({ scrollLeft: tbOn - tbWidth }, 1000);
      });

      tabContainer.on("load resize scroll", () => {
        tabBoxPosition = Math.abs(tabBox.position().left);

        tabButton.each((index) => {
          tabButtonPosition = Math.floor(tabButton.eq(index).position().left);

          if (size !== index + 1) {
            nextIndexPosition = Math.floor(
              tabButton.eq(index).next().position().left
            );

            if (
              tabBoxPosition > tabButtonPosition &&
              tabBoxPosition <= nextIndexPosition
            ) {
              tbIndex = index;
            }
          }
        });
      });

      $(".control").on("click", function () {
        if ($(this).hasClass("next")) {
          tsMove = Math.floor(tabButton.eq(tbIndex).position().left);

          tabContainer.animate({ scrollLeft: tsMove }, 200);
        } else {
          tsmoveTrigger = Math.abs(tabBox.position().left);

          if (
            Math.ceil(tsmoveTrigger) ==
            Math.floor(tabButton.eq(tbIndex).next().position().left)
          ) {
            tbIndex = tbIndex + 1;
          } else {
            tbIndex = tbIndex;
          }

          tsMove = Math.floor(tabButton.eq(tbIndex).next().position().left);
          tabContainer.animate({ scrollLeft: tsMove }, 200);
        }
      });
    }

    // 유형2 (ex 연혁, 직무소개) - 小분류
    const tabBtn = $(".tab_small ul li"),
      bar = $(".tab_small .bar");

    tabBtn.each((index) => {
      // initializing
      tabBtn.css({ width: "calc(100%/ " + tabBtn.length + ")" });
      bar.css({
        width: tabBtn.width(),
        left: $(".tab_small ul li.active").offset().left,
      });

      tabBtn.eq(index).on("click", () => {
        tabBtn.removeClass("active");
        tabBtn.eq(index).addClass("active");

        bar.css({
          width: tabBtn.width(),
          left: $(".tab_small ul li.active").offset().left,
        });

        $(window).on("resize load scroll", () => {
          bar.css({
            width: tabBtn.width(),
            left: $(".tab_small ul li.active").offset().left,
          });
        });

        window.scrollTo({
          top: $(".tab_small").offset().top - $(".tab_small").outerHeight() * 2,
          behavior: "smooth",
        });

        // 연혁페이지
        if ($(".HMhistory").length) {
          $(".HMhistory").removeClass("active");
          $(".HMhistory").eq(index).addClass("active");
        }
      });
    });
  },
};

var companyEvent = {
  init: function () {
    this.bod();
    this.history();
    this.chart();
  },

  bod: () => {
    $(".tab_le li").click(function () {
      let idx = $(this).index();

      $(this).addClass("on").siblings().removeClass("on");
      $(".accordion").eq(idx).addClass("on").siblings().removeClass("on");
      $(".accordion").children().removeClass("on");
      $(".accordion").children().find(".bind").slideUp(300);
    });

    $(".band").click(function () {
      $(this).children(".bind").stop().slideToggle(300);
      $(this).toggleClass("on").siblings().removeClass("on");
      $(this).siblings().children(".bind").slideUp(300); // 1개씩 펼치기
    });
  },

  history: () => {
    "use strict";

    let gap = 150;

    const wrap = $(".HMhistory"),
      subMenu = $(".sub_visual_menu").height();

    $(window).on("resize load scroll", () => {
      const trigger = $(window).scrollTop() + subMenu + gap;

      wrap.each((index) => {
        const year = wrap.eq(index).find(".year"),
          list = wrap.eq(index).find(".list"),
          line = wrap.eq(index).children(".line"),
          picker = wrap.eq(index).find(".line span");

        // *** PC
        if (!$("#mobile").length) {
          // 센터라인 길이
          line.css(
            "height",
            wrap.eq(index).height() -
              list
                .children("li")
                .last()
                .children("dl:last-child")
                .outerHeight() +
              picker.outerHeight() / 2 +
              "px"
          );

          let pickerPoint = trigger + $(".century").height() / 2,
            fixMove = Math.abs($(".history").offset().left),
            lastPoint = line.offset().top + line.outerHeight();

          // 진입(연도)
          if (trigger > wrap.eq(index).offset().top) {
            year.css({
              position: "fixed",
              top: subMenu + gap + "px",
              left: -$(window).scrollLeft() + fixMove,
            });

            // *초기화
          } else {
            year.css({ position: "absolute", top: 0, left: 0 });
          }

          // 진입(피커)
          if (
            pickerPoint > wrap.eq(index).offset().top &&
            pickerPoint < lastPoint
          ) {
            picker.css({
              position: "fixed",
              top:
                subMenu +
                gap +
                $(".century").height() / 2 -
                picker.outerHeight() / 2 +
                "px",
              left:
                -$(window).scrollLeft() +
                $(".HMhistory.active .line").offset().left +
                "px",
            });

            // 이탈(연도, 피커)
          } else if (pickerPoint >= lastPoint - picker.height() / 2) {
            year.css({
              position: "absolute",
              top: line.height() - year.height() / 2,
              left: 0,
            });
            picker.css({
              position: "absolute",
              top: line.height() - picker.height() / 2,
              left: 0,
            });

            // *초기화
          } else {
            picker.css({ position: "absolute", top: 0, left: 0 });
          }
        } // ||| PC

        // 연도 변경 및 리스트 하이라이트
        list.children("li").each((index) => {
          let yearGap = $('.year ul li:not(".active")').outerHeight(),
            listStart = list.children("li").eq(index).offset().top,
            listEnd = listStart + list.children("li").eq(index).outerHeight();

          // *** PC
          if (!$("#mobile").length) {
            if (
              picker.offset().top >= listStart &&
              picker.offset().top < listEnd
            ) {
              year
                .children("ul")
                .css("margin-top", "-" + yearGap * index + "px");
              year.find("ul li").removeClass("active");
              year.find("ul li").eq(index).addClass("active");

              list.children("li").removeClass("active");
              list.children("li").eq(index).addClass("active");
            }
          } // ||| PC
        }); // ||| 연도 변경 및 리스트 하이라이트

        // *** Mobile
        if ($("#mobile").length) {
          $(".greybox").addClass("popup");
          $(".year, .list").find("li").removeClass("active");

          const century = year.children(".century").text(),
            yearChild = year.find("ul li");

          yearChild.each((index) => {
            yearChild.eq(index).prepend(century);
            yearChild.eq(index).prependTo(list.children("li").eq(index));

            $(window).on("scroll load resize", () => {
              let mobTrigger =
                  $(window).scrollTop() +
                  $(window).height() / 2 -
                  $(".sub_visual_menu").outerHeight(),
                mobListStart = list.children("li").eq(index).offset().top,
                mobListEnd =
                  mobListStart + list.children("li").eq(index).outerHeight();

              if (mobTrigger > mobListStart && mobTrigger < mobListEnd) {
                list.find("> li > li").removeClass("active");
                list.children("li").removeClass("active");

                list.find("> li > li").eq(index).addClass("active");
                list.children("li").eq(index).addClass("active");
              }
            });
          });
        } // ||| Mobile
      });
    });
  },

  chart: () => {
    "use strict";

    const graph = $("#HMchart .graph"),
      graphBarColor = ["#dbe2e8", "#aeb8be", "#6a7b88", "purple"],
      transitionEnd =
        "transitionend webkitTransitionEnd oTransitionEnd otransitionend",
      barSpeed = 1000,
      customTooltip = 3, // 추가1) 배경색 동일하게 적용할 경우, (어두운색) 그래프바 n번째 지정 - 2022.11.29
      deviceChecker = $("#mobile");

    // 그래프 별 작동 토글
    graph.each((index) => {
      // scroll animation 동작/ graph에 작동 클래스 부여
      $(window).on("scroll load", () => {
        let st = $(window).scrollTop(),
          graphOffset = graph.eq(index).offset().top,
          graphAni = graphOffset - $(window).height() / 2;

        if (st > graphAni) {
          graph.eq(index).addClass("on");
        } else {
          graph.eq(index).removeClass("on");
        }
      });

      const line = graph.eq(index).find(".graph_bg li"),
        graphBars = graph.eq(index).find(".graph_bar"),
        bar = graph.eq(index).find(".graph_bar li");

      let maxPercent = graph
          .eq(index)
          .find(".graph_bg li")
          .eq(0)
          .attr("data-line"),
        lineData = "";

      // 라인 백그라운드 생성
      line.each((idx) => {
        lineData = line.eq(idx).attr("data-line");
        let lineNum = lineData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        line.eq(idx).children("span").text(lineNum);

        // 0수치에 기준점 클래스 부여/ 라인 숫자 최대(또는 최소)값 기준 그래프바 높이값 조정 클래스 부여
        if (lineData === "0") {
          line.eq(idx).addClass("standard");
        } else if (Math.abs(lineData) > maxPercent) {
          line.eq(-1).addClass("standardReverse");
        }
      });

      // 수치 data 기반 바 높이값 생성
      bar.each((i) => {
        let barData = bar.eq(i).attr("data-percent"),
          barNum = barData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          barPercent = (barData / maxPercent) * 100;

        // 툴팁 가림설정
        bar.eq(i).find("> span, > p").hide();

        // 바 데이터와 라인 데이터에 '-'값이 들어갈 경우 혼합 차트 변경
        if (barData < 0 && lineData < 0) {
          graph.eq(index).addClass("convert");
          bar.eq(i).addClass("minus");
        }

        // 수치상 '-'값이 있는 경우 그래프 방향 조정/ 최대 또는 최소값 기준 그래프바 퍼센트 형성
        if (graph.eq(index).hasClass("convert")) {
          let dataMinus = Math.abs(bar.eq(i).attr("data-percent")),
            standardReverse = graph
              .eq(index)
              .find(".standardReverse")
              .attr("data-line");

          maxPercent = Math.abs(standardReverse);

          if (standardReverse == null) {
            maxPercent = line.eq(0).attr("data-line");
          }
          barPercent = (dataMinus / maxPercent) * 100;
        }

        // 바 그래프 애니메이션 기능
        function chartBarStart() {
          // 그래프바가 차트 수치 밖으로 넘어갈 경우 툴팁 세팅
          const maginotLine =
            graphBars.height() -
            (graph.eq(index).find(".graph_bg li").eq(1).position().top / 3) * 2;
          if (bar.eq(i).height() >= maginotLine) {
            bar.eq(i).find("> span").css({ top: "1rem", right: "30%" });
          }
          if (bar.eq(i).height() > graphBars.height()) {
            barPercent = 104;
          }

          bar.eq(i).css({
            height: +barPercent + "%",
            background: "" + graphBarColor[i],
            transition:
              "height cubic-bezier(.42,-0.01,.21,1) " + barSpeed / 1000 + "s",
            "transition-delay": (+i / 10) * 2 + "s",
          });
          bar
            .eq(i)
            .find("> span")
            .text(barNum)
            .css({
              border: ".1rem solid" + graphBarColor[i],
              // color: "" + graphBarColor[i],
            });
          bar // 추가1) 배경색 동일하게 적용할 경우, (어두운색) 그래프바 n번째 커스텀 - 2022.11.29
            .eq(customTooltip - 1)
            .find("> span")
            .css({
              background: graphBarColor[i],
              color: "#fff",
              fontWeight: "350",
            });
        }

        // scroll animation 동작
        $(window).on("load resize scroll", () => {
          if ($(".graph").eq(index).hasClass("on")) {
            // bar로딩
            chartBarStart();
            // bar로딩 끝나면, 툴팁 나타내기
            bar.on(transitionEnd, function () {
              bar.eq(i).find("> span").fadeIn();
              setTimeout(() => {
                bar.eq(i).find("> p").fadeIn();
              }, 200);
            });
          }
        });
      });

      // '0' 수치 기준점으로 그래프바 위치 고정 및 그래프 비율 조절
      if (line.length) {
        let gH = graph.eq(index).height(),
          countH = $(".graph > span").height(),
          zeroH = graph.eq(index).find(".standard").position().top,
          stdH = graph.eq(index).find(".standard").height() / 2,
          barH = graphBars.height() - (countH + stdH),
          standardPosition = (gH - (zeroH + stdH + countH)) / 10,
          convertHeightReverse = (barH - zeroH) / 10,
          convertHeight = 0;

        // 그래프바 위치
        graphBars.css("bottom", +standardPosition + "rem");

        // 혼합형 차트 기준점 기준 위아래 높이값 비교 - 높은값을 높이값으로 선정
        if (zeroH / 10 > convertHeightReverse) {
          convertHeight = zeroH / 10;
        } else {
          convertHeight = convertHeightReverse;
        }
        // 혼합형 차트 숫자 높이값
        graphBars.css({ height: +convertHeight + "rem" });

        // 모바일버전
        if (deviceChecker.length) {
          // span태크 width값 통일(우측정렬 위해)
          const lineSpan = graph.eq(index).find(".graph_bg > li > span");
          let padding = 12,
            spanWidth = (lineSpan.width() + padding) / 10;

          lineSpan.css({ "max-width": spanWidth + "rem", width: "100%" });
          graphBars.css({ width: "calc(100% - " + (spanWidth + 1) + "rem)" });
        }
      }
    });
  },
};

var customerEvent = {
  init: function () {
    this.inqEmail();
    this.namechk();
  },

  inqEmail: function () {
    //이메일 직접입력 선택시 입력칸 추가
    var selectType = $(".select_row>select");
    selectType.addClass("selectBox");
    selectChange(selectType);
    function selectChange(type) {
      type.change(function () {
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);

        if (select_name === "직접입력" || select_name === "Direct input") {
          $(
            ".customer .customer_inquiry .row .ipt_cell.email_cell > div:nth-of-type(2)"
          ).show();
          if($('#pc').length){
            $(".customer .customer_inquiry .row .ipt_cell.email_cell > div:nth-of-type(3)").css('margin-left','1rem');
          }else {
            $(".customer .customer_inquiry .row .ipt_cell.email_cell > div:nth-of-type(n+1):nth-of-type(-n+2)").css({'width':'32%'});
            $(".customer .customer_inquiry .row .ipt_cell.email_cell > div:nth-of-type(3)").css({'width':'28%'});
          }
        } else {
          $(
            ".customer .customer_inquiry .row .ipt_cell.email_cell > div:nth-of-type(2)"
          ).hide();
          if($('#pc').length){
            $(".customer .customer_inquiry .row .ipt_cell.email_cell > div:nth-of-type(3)").css({'margin-left':'0'});
          }else {
            $(".customer .customer_inquiry .row .ipt_cell.email_cell > div").css({'width':'47%'});
          }
          
        }
      });
    }
  },

  //익명 선택시 "익명" 비선택시 초기화
  namechk: function () {
    $("#anonymous").change(function () {
      if ($("#anonymous").is(":checked")) {
        $("#name").val("익명");
      } else {
        $("#name").val("");
      }
    });
  },
};

var channelEvent = {
  init: function () {
    this.snsMobSwiper();
  },

  snsMobSwiper: function () {
    if ($("#mobile").length) {
      let snsSlider = new Swiper(".sns_wrap .swiper", {
        slidesPerView: 1,
        initialSlide: 0,
        speed: 500,
        observer: true,
        observeParents: true,

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }
  },

  // snsPopup : function() {

  // }
};

var recruitEvent = {
  init: function () {
    this.job();
  },

  job: function () {
    "use strict";

    // 탭버튼 분류 라이브러리 isotope
    $(document).ready(function () {
      $(".isotope").isotope({
        itemSelector: ".isotope_item",
      });

      // filter items on button click
      $(".btn_set").on("click", "li", function () {
        var filterValue = $(this).children().attr("data-filter");
        $(".isotope").isotope({ filter: filterValue });
        $(".btn_set li").removeClass("on");
        $(this).addClass("on");
      });
    });

    // 팝업 컨트롤
    const img = $(".popup .img img"),
      popupClose = $(".pop_close");

    // 팝업 이미지 초기화
    img.attr("src", "");

    // 더보기 버튼 클릭 시
    $(".openPopup").on("click", function () {
      const index = $(this).parent().index();

      // 팝업 맨 위로
      $(".popup").scrollTop(0);

      let moving = $(this)
          .siblings("div")
          .children("img")
          .attr("data-popup-moving"),
        idxTitle = $(this).siblings("p").html(),
        idxInfo = $(this).siblings("h3").html(),
        idxArticle = $(this).siblings("article");

      // 타이틀
      $(".pop_title dt").html(idxTitle);
      $(".pop_title dd").html(idxInfo);

      // 내용
      $(".article")
        .children("dl")
        .each((index) => {
          let containsIdx = $(".article").children("dl").eq(index),
            output = idxArticle.children("p").eq(index).html();
          containsIdx.children("dd").html(output);
        });

      // 이미지 불러오기
      img.attr("src", "images/recruit/job_popup_person" + (index + 1) + ".png");

      // 이미지 애니메이션
      if ($("#pc").length) {
        // 적응형 [PC]
        img.css({ right: moving + "px", opacity: 1 });
      } else {
        // 적응형 [MOBILE]
        setTimeout(() => {
          // 2. 정우재 사원, 8. 김형석 사원, 13. 김규태 차장, 14. 박지용 사원, 15. 나재우 대리
          img.css({ right: -moving / 100 + "rem", opacity: 1 });

          // 특정 이미지 간격 조정
          if (
            index === 0 ||
            index === 2 ||
            index === 5 ||
            index === 6 ||
            index === 11
          ) {
            // 1. 정은별 사원, 3. 김동훈 사원, 6. 양지범 과장, 7. 천소영 차장, 12 송유현 대리
            img.css({ right: 0 });
          } else if (index === 3 || index === 4) {
            // 4. 문종호 대리, 5. 김종훈 과장
            img.css({ right: -moving / 30 + "rem" });
          } else if (index === 8 || index === 9 || index === 10) {
            // 9. 백승범 차장, 10. 윤영준 사원, 11. 서호진 사원
            img.css({ right: moving / 100 + "rem" });
          }
        }, 300);
      }
    });

    // 적응형 [MOBILE]
    if ($("#mobile").length) {
      // 더보기 버튼 + 이미지 변경
      $(".openPopup")
        .children("img")
        .attr("src", "images/common/icon_plus_mob_hover_20x20.png");
    } else {
      // 적응형 [PC]

      // 영역 밖 이동 시 마우스 닫기 버튼 보이기
      const LayerPopup = $(".recruit .popup ul");

      $(document).mousemove(function (e) {
        if (LayerPopup.has(e.target).length === 0) {
          popupClose.css({ transform: "scale(1)" });
        } else {
          popupClose.css({ transform: "scale(0)" });
        }
      });

      // 영영 밖 이동 시 마우스 닫기 버튼  커서 따라다니기
      const circle = document.querySelector(".pop_close");

      document.addEventListener("mousemove", (e) => {
        // mousemove이벤트를 이용해 움
        // 마우스의 좌표는 clientX와 clientY를 이용해 알수 있다. -> 브라우저 window의 좌표값 위치를 전달한다.
        // pageX, pageY와는 다름.
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        circle.style.left = mouseX - 35 + "px";
        circle.style.top = mouseY - 35 + "px";
      });
    }

    // 팝업 닫기
    popupClose.on("click", () => {
      if ($("#mobile").length) {
        // 적응형 [MOBILE]
        // 팝업 이미지 원위치
        img.css({ right: -100, opacity: 0 });
      } else {
        // 적응형 [PC]
        img.css({ right: 0, opacity: 0 });
      }
      setTimeout(() => {
        img.attr("src", "");
      }, 300);
      closeProcessor();
    });

    // 팝업 닫기 function
    function closeProcessor() {
      $("html").removeClass("blockScroll");
      $(".popup").fadeOut(300);
    }
  },
};

var socialEvent = {
  init: function () {
    this.counting();
  },

  //숫자 카운팅 효과
  counting: () => {
    setTimeout(() => {
      $(".count").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");

        $({ countNum: $this.text() }).animate(
          {
            countNum: countTo,
          },
          {
            duration: 2000,
            easing: "linear",
            step: function () {
              // $this.text(Math.floor(this.countNum));
              $this.text(numComma(Math.ceil(this.countNum)));
            },
            complete: function () {
              // $this.text(this.countNum);
              $this.text(numComma(Math.ceil(this.countNum)));
            },
          }
        );
      });
      function numComma(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
      }
    }, 1000);
  },
};

var policyEvent = {
  init: function () {
    this.privacyTab();
    this.privacySelect();
  },

  privacyTab: function () {
    $(".privacy .inner ul li").click(function () {
      $(".privacy .inner ul li").removeClass("on");
      $(this).addClass("on");

      var Tabs_cont = $(".privacy .inner ul li").index(this) + 1;
      $(".box_cont").removeClass("on");
      $(".privacy0" + Tabs_cont).addClass("on");
      $(".privacy .select_wrap .terms_site").removeClass("active");
      $(".select_wrap .select0" + Tabs_cont).addClass("active");
      console.log(Tabs_cont);
    });
  },

  privacySelect: function () {
    $(document).on("click", ".terms_site .site_selected", function () {
      var selElm = $(this).parent();
      if (!selElm.hasClass("open")) {
        selElm.addClass("open");
      } else {
        selElm.removeClass("open");
      }
    });

    $(document).on("click", ".terms_site .site_list li a", function () {
      var selected = this.innerText,
        siteName = document.getElementsByClassName("site_selected")[0],
        termsSite = this.parentNode.parentNode.parentNode;

      siteName.innerText = selected;
      termsSite.classList.remove("open");
    });

    $(document).on("click", "#prev_info", function () {
      $(".privacy .inner ul li").removeClass("on");
      $(".privacy .inner ul li").eq(0).addClass("on");
      $(".box_cont").removeClass("active");
      $(".privacy01").addClass("active");
      $(".privacy .select_wrap .terms_site").removeClass("active");
      $(".select_wrap .select01").addClass("active");
    });
    $(document).on("click", "#prev_video", function () {
      $(".privacy .inner ul li").removeClass("on");
      $(".privacy .inner ul li").eq(1).addClass("on");
      $(".box_cont").removeClass("active");
      $(".privacy02").addClass("active");
      $(".privacy .select_wrap .terms_site").removeClass("active");
      $(".select_wrap .select02").addClass("active");
    });
  },
};
