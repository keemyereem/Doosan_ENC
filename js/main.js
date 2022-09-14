
/* --------------------- DoosanENC Released 2022.08.08 --------------------- */
/* --------------------- Published by 4m Creative --------------------- */



$(function(){
    if ($('#mobile').length) {
        // // Including HTML
        // $(".header").load("include/header.html?v=1.0");
        // $(".footer").load("include/footer.html");

        // // JS importing
        // mainEvent.intro();
        // mainEvent.headerEvent();
        // mainEvent.footerEvent();
        // mainEvent.sec04Card();
        // mainEvent.sec06Tab();

        // $(window).on('scroll', ()=> {
        //     const s1Top = $('.section01').offset().top-200,
        //           s2Top = $('.section02').offset().top-200,
        //           s3Top = $('.section03').offset().top-200,
        //           s4Top = $('.section04').offset().top-200,
        //           s5Top = $('.section05').offset().top-200,
        //           s6Top = $('.section06').offset().top-200,
        //         //   s7Top = $('.section07').offset().top-200,
        //           st = $(window).scrollTop();
                  
        //     if ( s2Top > st && st > s1Top ) {
        //         $('#mobile .section01').addClass('active');
        //     } else {
        //         $('#mobile .section01').removeClass('active');
        //     }                        
        //     if ( s3Top > st && st > s2Top ) {
        //         $('#mobile .section02').addClass('active');
        //         // mainEvent.sec02Swiper().swiper2.autoplay.start();
        //         // console.log(mainEvent.init());
        //     } else {
        //         $('#mobile .section02').removeClass('active');
        //     }     
        //     if ( s4Top > st && st > s3Top ) {
        //         $('#mobile .section03').addClass('active');
        //         // mainEvent.sec03Swiper();
        //     } else {
        //         $('#mobile .section03').removeClass('active');
        //     } 
        //     if ( s5Top > st && st > s4Top ) {
        //         $('#mobile .section04').addClass('active');

        //     } else {
        //         $('#mobile .section04').removeClass('active');
        //     }        
        //     if ( s6Top > st && st > s5Top ) {
        //         $('#mobile .section05').addClass('active');
                
        //     } else {
        //         $('#mobile .section05').removeClass('active');
        //     }  


        //     for (let i=1; i<7; i++){
        //         if ( $('.section').eq(i+1) > st && st > $('.section').eq(i)) {
        //             $('.section').eq(i).addClass('active');
        //         } else {
        //             $('.section').eq(i).removeClass('active');
        //         }  
        //     }                 
        // });



        $('#mobile #main .section').each((index) => {
            const currentSection = $('.section').eq(index).offset().top;
            const nextSection = $('.section').eq(index).next().offset().top;

            // console.log(' currentSection: '+currentSection);
            // console.log(' nextSection: '+nextSection);
            
            $('.container').prepend('<div class="dd" style="width:100%; height:1px; display:block; position:absolute;"></div>');
            $('.dd:nth-child(' + index + ')').css({'background': 'red', 'top': + currentSection + 'px'});
            // console.log(index)
            
            $(window).on('scroll', ()=> {
                let st = $(window).scrollTop();
                // console.log(' currentSection: '+currentSection);
                // console.log('index : '+index);
                
                if (st >= currentSection && st < nextSection && index + 1 <= index.length) {
                    $('.section').eq(index).addClass('active');
                } else {
                    $('.section').eq(index).removeClass('active');
                }
                 
            });

        });

    }
});


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

        if($('#mobile').length){
            this.mobile();
        }
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
                    //swiper.autoplay.start();
                } else {
                    //swiper.autoplay.stop();
                    //swiper.slideTo(1);
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
            if ($('#mobile').length) {
                $('#rightnavi, .sec01_controller').addClass('blind');
            } else {
                $('body').addClass('blockScroll');
                $('#rightnavi, .sec01_controller').addClass('blind');
            }
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

                if ($('#mobile').length) {
                    // mainEvent.sec02Swiper();
                    // mainEvent.sec03Swiper();
                } else {
                    mainEvent.createFullpage();
                }
            });
        });
    },

    mainSwiper: () => {
        //---------------------------------------------------------------------------------------------------------- TEST 1 
        // const interleaveOffset = 0.5;
        // const mainSlides = $('.mainSwiper .swiper-slide');

        // swiper = new Swiper(".section01 .mainSwiper", {
        //     speed: 1000,
        //     loop: true,
        //     // freeMode: true,
        //     observer: true,
        //     observeParents: true,
        //     watchSlidesProgress: false,
        //     autoplay: {
        //         delay: 3500, 
        //         disableOnInteraction: true  // 쓸어 넘기거나 버튼 클릭 시 자동 슬라이드 정지.
        //     },
        //     navigation: {
        //         nextEl: ".swiper-button-next",
        //         prevEl: ".swiper-button-prev",
        //     },
        //     pagination: {
        //         el: ".swiper-pagination-sec01",
        //         clickable: true,
        //     },
        //     // swiper 이벤트 정리 참고 - https://velog.io/@rhtjdrhkd123/20220516-swiper-events-%EC%A0%95%EB%A6%AC
        //     on: {
        //         progress: function() {
        //             mainSlides.each((idx)=> {
        //                 slideProgress = mainSlides.eq(idx).progress;
        //                 innerTranslate = slideProgress * interleaveOffset;
        //                 // console.log('인덱스 ' + idx + ' | 위치값 ' + slideProgress)

        //                 mainSlides.eq(idx).find('.slide-inner').css('transform', 'translate3d(' + -innerTranslate + 'px, 0, 0)');
        //             });
                    
        //         },
        //         touchStart: function() {
        //             mainSlides.each((idx)=> {
        //                 mainSlides.eq(idx).find('.slide-inner').css({'transition': 'all ease 1s', 'border': '1px solid red'});
        //             });
        //         },
        //         slideNextTransitionEnd: function() {
        //             mainSlides.each((idx)=> {
        //                 // mainSlides.eq(idx).css('transition', 'all ease 1s');
        //                 mainSlides.eq(idx).find('.slide-inner').css({ 'transition': 'all ease 1s', 'border': '1px solid yellow'});
        //             });
        //         }
        //     },
        // });





        //---------------------------------------------------------------------------------------------------------- TEST 2 
        let mainSlideSelector = ".section01 .mainSwiper",
            interleaveOffset = 0.5;

        let mainSliderOptions = {
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 3000
            },
            loopAdditionalSlides: 10,
            grabSlidesProgress: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination-sec01",
                clickable: true,
            },
            on: {
                init: function() {
                    this.autoplay.stop();
                },
                imagesReady: function() {
                    this.autoplay.start();
                },
                progress: function() {
                    let swiper = this;
                    for(let i = 0; i < swiper.slides.length; i++) {
                        let slideProgress = swiper.slides[i].progress,
                        innerOffset = swiper.width * interleaveOffset,
                        innerTranslate = slideProgress * innerOffset;

                        swiper.slides[i].querySelector('.slide-inner').style.transform = "translateX(" + innerTranslate + "px) ";

                        console.log(swiper.slides[i].progress)
                    }
                    
                },
                touchStart: function() {
                    let swiper = this;
                    for(let i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = "";
                    }
                },
                setTransition: function(speed) {
                    let swiper = this;
                    for(let i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = speed + "ms";
                        swiper.slides[i].querySelector('.slide-inner').style.transition = speed + "ms";
                    }
                }
            }
        }

        let swiper = new Swiper(mainSlideSelector, mainSliderOptions);

        
        
        //---------------------------------------------------------------------------------------------------------- SUB FUNCTIONS
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

    mobile: () => {
        if($('#mobile').length){
            $(window).on('scroll', ()=> {
                
                const s1Top = $('#mobile .section01').offset().top-200,
                      s2Top = $('#mobile .section02').offset().top-200,
                      s3Top = $('#mobile .section03').offset().top-200,
                      s4Top = $('#mobile .section04').offset().top-200,
                      s5Top = $('#mobile .section05').offset().top-200,
                      s6Top = $('#mobile .section06').offset().top-200,
                      //   s7Top = $('.section07').offset().top-200,
                      st = $(window).scrollTop();
                    
                if ( s2Top > st && st > s1Top ) {
                    $('#mobile .section01').addClass('active');
                } else {
                    $('#mobile .section01').removeClass('active');
                }                        
                if ( s3Top > st && st > s2Top ) {
                    $('#mobile .section02').addClass('active');
                    swiper2.autoplay.start();
                } else {
                    $('#mobile .section02').removeClass('active');
                    swiper2.autoplay.stop();
                    swiper2.slideTo(1);
                }     
                if ( s4Top > st && st > s3Top ) {
                    $('#mobile .section03').addClass('active');
                    swiper3.autoplay.start();
                } else {
                    $('#mobile .section03').removeClass('active');
                    swiper3.autoplay.stop();
                    swiper3.slideTo(1);
                } 
                if ( s5Top > st && st > s4Top ) {
                    $('#mobile .section04').addClass('active');
    
                } else {
                    $('#mobile .section04').removeClass('active');
                }        
                if ( s6Top > st && st > s5Top ) {
                    $('#mobile .section05').addClass('active');
                    
                } else {
                    $('#mobile .section05').removeClass('active');
                }  
                
                
            });
        }


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
                this.autoplay.stop()
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
                if($('#pc').length){
                    if (this.realIndex > 2) {
                        index += 1;
                        if (index > bullet.length - 3) {
                            index = bullet.length - 3;
                        };
    
                    } else if (this.realIndex === 0) {
                        index = 0;
                    };
                    next();
                }else {
                    if (this.realIndex > 1) {
                        index += 1;
                        if (index > bullet.length - 3) {
                            index = bullet.length - 3;
                        };
    
                    } else if (this.realIndex === 0) {
                        index = 0;
                    };
                    mobnext();
                    console.log('index:'+swiper2.realIndex)
                }

            });

            function next(){
                $('.swiper-pagination-sec02').css({
                    'transform':'translateX(' + -(bulletWidth * index) + 'px)',
                    'transition':'.3s'
                });
                
            };
            function mobnext(){
                $('.swiper-pagination-sec02').css({
                    'left': + -(bulletWidth * index*2) + 'px',
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
            initialSlide: 0,
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
        if($('#pc').length){
            $(".section03 .bus_swiper").each(function(elem, target){
                var swp = target.swiper;
                $(this).hover(function() {
                    swp.autoplay.stop();
                }, function() {
                    swp.autoplay.start();
                });
            });
        }


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
            if(!selElm.hasClass("open")) {
                selElm.addClass("open");
            } else {
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
