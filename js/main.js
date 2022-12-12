/* --------------------- DoosanENC Released 2022.08.08 --------------------- */
/* --------------------- Published by 4m Creative --------------------- */

$(function () {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // resize
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **메인**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mainEvent = {
  init: function () {
    this.intro();
    this.sec02Swiper();
    this.sec03Swiper();
    this.sec04Card();
    this.sec06Tab();
    this.headerEvent();
    this.footerEvent();
  },

  createFullpage: () => {
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
      css3: true,
      scrollingSpeed: 800,

      onLeave: function (index, nextIndex, direction) {

        if(!$(".container").hasClass("en")){
          //국문
          if (nextIndex == 1 || nextIndex == 5) {
            setTimeout(() => {
              $(".header").addClass("wht");
            }, 500);
          } else {
            setTimeout(() => {
              $(".header").removeClass("wht");
            }, 500);
          }
        }else {
          //영문
          if (nextIndex == 1 ) {
            setTimeout(() => {
              $(".header").addClass("wht");
            }, 500);
          } else {
            setTimeout(() => {
              $(".header").removeClass("wht");
            }, 500);
          }
        }



        // footer
        if (nextIndex == 7) {
          $("#rightnavi, .header").addClass("indent");
        } else {
          $("#rightnavi, .header").removeClass("indent");
        }
      },

      afterLoad: function (anchorLink, index) {
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
        if (!$(".container").hasClass("en")) {
          //국문
          if (index == 7) {
            setTimeout(() => {
              $(".footer .sec_tit > span").addClass("fin");
            }, 200);
          } else {
          }
        } else {
          //영문
          if (index == 6) {
            setTimeout(() => {
              $(".footer_en .sec_tit > span").addClass("fin");
            }, 200);

            $("#rightnavi, .header_en").addClass("indent");
          } else {
            $("#rightnavi, .header_en").removeClass("indent");
          }
        }
      },
    });


  },

  intro: () => {
    $("body").addClass("blockScroll");
    // common.js에서 사이트맵 구현 오류 > 추가 중복코드 삽입.
    $(".sitemap").show();
    $("#rightnavi, .header").addClass("blind");

    console.log("-> intro animation start");

    img = new Image();
    img.onload = function () {
      setTimeout(() => {
        $(".clip-css").css("opacity", 1);
        $(".clip-css").on(
          "transitionend webkitTransitionEnd oTransitionEnd",
          function () {
            setTimeout(() => {
              $(".section01").addClass("ani");
            }, 500);
          }
        );
      }, 200);
    };
    img.src = "images/main/sec01_bg1.png";

    // after animation ended, initializing object
    const x = document.getElementById("intro_trigger");
    x.addEventListener("animationend", () => {
      console.log("-> intro animation end");

      $(".clip-wrap").addClass("indent");
      $("body").removeClass("blockScroll");
      $(".header").addClass("wht");
      $("#rightnavi, .header").removeClass("blind");

      if ($("#mobile").length) {
        setTimeout(() => {
          $("#main #fullpage .section01").addClass("active");
        }, 500);
      }

      mainEvent.mainSwiper();

      if (!$("#mobile").length) {
        mainEvent.createFullpage();
      } else {
        mainEvent.mobile();
      }
    });
  },

  mainSwiper: () => {
    const mainSwiper = ".section01 .mainSwiper",
      interleaveOffset = 0.5,
      scale = 1.2;

    let swiperOptions = {
      loop: true,
      speed: 1000,
      observer: true,
      observeParents: true,
      grabCursor: false,
      watchSlidesProgress: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: true, // 쓸어 넘기거나 버튼 클릭 시 자동 슬라이드 정지.
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination-sec01",
        clickable: true,
      },

      // swiper 이벤트 정리 참고 - https://velog.io/@rhtjdrhkd123/20220516-swiper-events-%EC%A0%95%EB%A6%AC
      on: {
        progress: function () {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            let slideProgress = swiper.slides[i].progress,
              innerOffset = swiper.width * interleaveOffset,
              innerTranslate = slideProgress * innerOffset;

            swiper.slides[i].querySelector(".slide-inner").style.transform =
              "translate3d(" + innerTranslate + "px, 0, 0)";
          }
        },
        touchStart: function () {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
          }
        },
        setTransition: function (speed) {
          let swiper = this;

          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + "ms";
            swiper.slides[i].querySelector(".slide-inner").style.transition =
              speed + "ms";
          }
        },
        slideChangeTransitionEnd: function () {
          let swiper = this,
            Idx = swiper.activeIndex;

          swiper.slides
            .eq(Idx)
            .find(".slide-inner")
            .css("transition", "background-size ease 6s");
          swiper.slides.eq(Idx).find(".slide-inner").addClass("scaleOn");
        },
        slideChangeTransitionStart: function () {
          let swiper = this;
          swiper.slides.find(".slide-inner").removeClass("scaleOn");
        },
      },
    };

    // Swiper Run
    swiper = new Swiper(mainSwiper, swiperOptions);

    // 페이지네이션 동그라미 슬라이드별 이동
    swiper.on("transitionStart", () => {
      let $this = $(".swiper-pagination-bullet-active").position().left;
      $(".bullet_hr").css("left", $this / 10 + "rem");
      swiper.autoplay.start();
    });

    // Next, Prev버튼 클릭 시 오토플레이 재개
    $(document).on("click", ".swiper-button", () => {
      swiper.autoplay.start();
    });
  },

  sec02Swiper: () => {
    var listArray = ["01", "02", "03", "04", "05"];

    swiper2 = new Swiper(".section02 .myswiper", {
      speed: 500,
      loop: true,
      autoplayDisableOnInteraction: false,
      slidesPerView: 1,
      initialSlide: 0,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      watchOverflow: true,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      observer: true,
      observeParents: true,

      pagination: {
        el: ".swiper-pagination-sec02",
        clickable: "true",
        type: "bullets",
        renderBullet: function (index, className) {
          return (
            '<span class="' +
            className +
            '">' +
            "<em>" +
            listArray[index] +
            "</em>" +
            "<i></i>" +
            "<b></b>" +
            "</span>"
          );
        },
      },

      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },

      on: {
        init: function () {
          this.autoplay.stop();
        },
      },
    });

    $(window).on("load resize", function (e) {
      let bullet = $(".swiper-pagination-sec02 .swiper-pagination-bullet"),
        bulletWidth = bullet.width(),
        bulletMargin = parseInt(bullet.css("margin-right")),
        index = 0;

      bulletWidth = bulletWidth + bulletMargin;

      $(document).on("click", ".swiper2-button-next", function () {
        index += 1;
        if (index > bullet.length - 3) {
          index = 0;
        }
        next();
      });

      swiper2.on("slideChange", function () {
        if ($("#pc").length) {
          if (this.realIndex > 2) {
            index += 1;
            if (index > bullet.length - 3) {
              index = bullet.length - 3;
            }
          } else if (this.realIndex === 0) {
            index = 0;
          }
          next();
        } else {
          // Mobile
          let bullet_mobile = $(".swiper-pagination-sec02").children("span");

          bullet_mobile.each(() => {
            moveIdx = bullet_mobile.eq(this.realIndex).position().left;
          });
          $(".moving_tab").animate({ scrollLeft: moveIdx }, 300);
        }
      });

      function next() {
        $(".swiper-pagination-sec02").css({
          transform: "translateX(" + -(bulletWidth * index) + "px)",
          transition: ".3s",
        });
      }

      const slides = $("#mobile #main #fullpage .section02 .swiper-slide"),
        arr = [];

      slides.each((index) => {
        let title_mobile = slides.eq(index).children("h2").height();
        arr.push(title_mobile);
      });

      let max_title = Math.max.apply(null, arr);
      slides.children("h2").css("height", max_title + "px");
    });
  },

  sec03Swiper: () => {
    var listArray = ["주택사업", "건축사업", "토목사업"];
    var listEnArray = ["Housing", "Architecture", "Infrastructure"];

    swiper3 = new Swiper(".section03 .bus_swiper", {
      speed: 500,
      loop: true,
      autoplayDisableOnInteraction: false,
      slidesPerView: 1,
      initialSlide: 0,
      allowTouchMove: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      watchOverflow: true,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,

      pagination: {
        el: ".bus_swiper .swiper-pagination-sec03",
        clickable: "true",
        type: "bullets",
        renderBullet: function (index, className) {
          
          if(!$('.container').hasClass('en')){
            //국문
            return (
              '<span class="' +
              className +
              '">' +
              "<em>" +
              listArray[index] +
              "</em>" +
              "</span>"
            );
          }else {
            //영문
            return (
              '<span class="' +
              className +
              '">' +
              "<em>" +
              listEnArray[index] +
              "</em>" +
              "</span>"
            );
          }


        },
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },

      on: {
        init: function () {
          this.autoplay.stop();
        },
      },
    });

    //마우스 오버시 자동슬라이드 멈춤
    $(".section03 .bus_swiper").each(function (elem, target) {
      var swp = target.swiper;
      $(this).hover(
        function () {
          swp.autoplay.stop();
        },
        function () {
          swp.autoplay.start();
        }
      );
    });
    //추후 주석 제거
    // innerSwiper3 = new Swiper(".section03 .inner_swiper", {
    //     speed: 500,
    //     loop: false,
    //     autoplayDisableOnInteraction: false,
    //     slidesPerView: 1,
    //     watchOverflow: true,
    //     watchSlidesProgress: true,
    //     watchSlidesVisibility: true,
    //     observer: true,
    //     observeParents: true,

    //     pagination: {
    //         el: '.section03 .inner_swiper .swiper-pagination',
    //         clickable: 'true',
    //         type: 'bullets',

    //     },
    // });

    // $(".section03 .inner_swiper").each(function(elem, target){
    //     var innerswp = target.swiper;

    //     $('.swiper-pagination-sec03 > span').on('click', function(){
    //         setTimeout(() => {
    //         innerswp.slideTo(0,0);
    //         }, 200);
    //     });
    // });
  },

  sec04Card: () => {
    if ($("body").width() > 768) {
      $(".card li").hover(
        function () {
          $(this).find(".icon").hide();
          $(this).find(".icon_white").show();
          $(this).find("h3 span").last().addClass("on");
          $(this).find("h3").css({'opacity':'1'});

          var idx = $(".card li").index(this);
          $(".counting").each(function () {
            var $this = $(".card li").eq(idx).find(".counting") /* $(this), */,
              countTo = $this.attr("data-count");

            $({ countNum: $this.text() }).animate(
              {
                countNum: countTo,
              },

              {
                duration: 800,
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
        },
        function () {
          $(this).find(".icon").show();
          $(this).find(".icon_white").hide();
          $(this).find("h3 span").last().removeClass("on");
          $(this).find("h3").css({'opacity':'0'});

          var idx = $(".card li").index(this);
          $(".counting").each(function () {
            var $this = $(".card li").eq(idx).find(".counting");
            $({ countNum: $this.text() }).animate(
              {
                countNum: 0,
              },

              {
                duration: 800,
                easing: "linear",
                step: function () {
                  $this.text(numComma(Math.ceil(this.countNum)));
                },
                complete: function () {
                  $this.text(this.countNum);
                },
              }
            );
          });
          function numComma(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
          }
        }
      );
    } else {
      // MOBILE
    }
  },

  sec06Tab: () => {
    var Tabs = $(".section06 .right .tab li");
    Tabs.on("click", function () {
      $(this).addClass("on");
      $(this).siblings().removeClass("on");

      var Tabs_idx = Tabs.index(this);
      $(".section06 .right .contents > ul").removeClass("on");
      $(".section06 .right .contents > ul").eq(Tabs_idx).addClass("on");
    });
  },

  headerEvent: () => {
    $(window).on("scroll", function () {
      $(".header").css("left", 0 - $(this).scrollLeft());
    });
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
  },

  mobile: () => {
    if ($("#mobile").length) {
      // section toggle active when swipe to arrive each offsetTop
      $(document).on("click", "#topButton", function () {
        $("html").animate({ scrollTop: 0 }, "300");
      });

      // 섹션4 social responsibility 토글변수
      var countTrigger = true;

      $(window).on("load scroll resize", () => {
        const section = $("#mobile .section");

        // top button controll
        if ($(this).scrollTop() > 400) {
          $("#topButton").fadeIn();
        } else {
          $("#topButton").fadeOut();
        }
        var footerTop = $(".footer").offset().top - $(window).outerHeight(),
          pos_m = $(".footer").outerHeight() + Number(25);

        if ($(this).scrollTop() > footerTop) {
          $("#topButton").addClass("on").css({ bottom: pos_m });
        } else {
          $("#topButton").removeClass("on").css({ bottom: "3.5rem" });
        }

        section.each(function (index) {
          let sectionTop = section.eq(index).offset().top - 200,
            sectionNextTop = section.eq(index).next().offset().top - 200,
            st = $(window).scrollTop();

          if (st > sectionTop && st < sectionNextTop) {
            section.eq(index).addClass("active");

            if (index === 0) {
              // mainEvent.mainSwiper()
              swiper.autoplay.start();
              setTimeout(() => {
                $("#mobile .section01").addClass("ani");
              }, 500);
            } else {
              swiper.autoplay.stop();
              swiper.slideTo(1);
            }

            if (index === 1) {
              swiper2.autoplay.start();
            } else {
              swiper2.autoplay.stop();
              swiper2.slideTo(1);
            }

            if (index === 2) {
              swiper3.autoplay.start();
            } else {
              swiper3.autoplay.stop();
              swiper3.slideTo(1);
            }

            if (index === 3) {
              // 섹션4 social responsibility 토글변수가 자동 true로 반환
              if (countTrigger === true) {

                // 토글변수 true일 때, 카운트 func 시작
                $(".counting").each(function () {
                  var $this = $(this),
                    countTo = $this.attr("data-count")

                  $({ countNum: $this.text() }).animate(
                    {
                      countNum: countTo
                    },
                    {
                      duration: 1000,
                      easing: "linear",
                      step: function () {
                        //$this.text(this.countNum);
                        $this.text(numComma(Math.ceil(this.countNum)));

                      },
                      complete: function () {
                        //$this.text(this.countNum);
                        $this.text(numComma(Math.ceil(this.countNum)));
                      },
                    }
                  )
                  function numComma(x) {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
                  }
                  
                });

                // 카운트 func 종료 후 토글변수 false로 전환 = 스크롤 시 카운트 재시작 방지
                countTrigger = false;
              }
              
              
            } else {
            }
          } else {
            section.eq(index).removeClass("active");
          }
        });
      });
      
    }
  },
};