
/* --------------------- DoosanENC Released 2022.08.08 --------------------- */
/* --------------------- Published by 4m Creative --------------------- */



$(function(){
    if ($('#mobile').length) {
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
            scrollOverflow: false,
            css3: true,
            scrollingSpeed: 800,

            onLeave: function(index, nextIndex, direction){

                if(nextIndex == 1 || nextIndex == 5){
                    setTimeout(() => {
                        $(".header").addClass("wht");
                    }, 500);
                } else {
                    setTimeout(() => {
                        $(".header").removeClass("wht");
                    }, 500);
                }
                
                // footer
                if(nextIndex == 7){
                    $("#rightnavi, .header").addClass("indent");
                } else {
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
            $('#rightnavi').addClass('blind');
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
                $('#rightnavi').removeClass('blind');
                
                setTimeout(() => {
                    $('.clip-wrap').addClass('indent');
                }, 0);

                if($('#mobile').length){
                    setTimeout(() => {
                        $('#main #fullpage .section01').addClass('active');
                    }, 500);
                }

                mainEvent.mainSwiper();

                if (!$('#mobile').length) {
                    mainEvent.createFullpage();
                }
            });
        });
    },

    mainSwiper: () => {
        const mainSwiper = ".section01 .mainSwiper";
        const interleaveOffset = 0.5;
        const scale = 1.2;

        let swiperOptions = {
            loop: true,
            speed: 1000,
            observer: true,
            observeParents: true,
            grabCursor: false,
            watchSlidesProgress: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: true  // 쓸어 넘기거나 버튼 클릭 시 자동 슬라이드 정지.
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            pagination: {
                el: ".swiper-pagination-sec01",
                clickable: true,
            },

            // swiper 이벤트 정리 참고 - https://velog.io/@rhtjdrhkd123/20220516-swiper-events-%EC%A0%95%EB%A6%AC
            on: {
                progress: function() {
                    let swiper = this;
                    for (let i = 0; i < swiper.slides.length; i++) {
                        let slideProgress = swiper.slides[i].progress,
                            innerOffset = swiper.width * interleaveOffset,
                            innerTranslate = slideProgress * innerOffset;

                        swiper.slides[i].querySelector(".slide-inner").style.transform = "translate3d(" + innerTranslate + "px, 0, 0)";
                    }      
                },
                touchStart: function() {
                    let swiper = this;
                    for (let i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = "";
                    }
                },
                setTransition: function(speed) {
                    let swiper = this;

                    for (let i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = speed + "ms";
                        swiper.slides[i].querySelector(".slide-inner").style.transition = speed + "ms";
                    }
                },
                slideChangeTransitionEnd: function() {
                    let swiper = this,
                        Idx = swiper.activeIndex;

                    swiper.slides.eq(Idx).find('.slide-inner').css('transition', 'background-size ease 6s')
                    swiper.slides.eq(Idx).find('.slide-inner').addClass('scaleOn');
                },
                slideChangeTransitionStart: function() {
                    let swiper = this;
                    swiper.slides.find('.slide-inner').removeClass('scaleOn')
                },
            }
        };

        // Swiper Run
        swiper = new Swiper(mainSwiper, swiperOptions);
        
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
            //sec
            $(window).on('load scroll resize', ()=> {
                
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

            //section3
            $('.bus_swiper .left .img01').addClass('swiper');
            $('.bus_swiper .left .img01').prepend('<div class="swiper-wrapper"></div>');
            $('.bus_swiper .left .img01 .swiper-wrapper').prepend('<img src="images/main/sec03_big_img01.png" alt="주택사업 이미지" class="swiper-slide">');
            $('.bus_swiper .left .img01 .swiper-wrapper').prepend('<img src="images/main/sec03_big_img01.png" alt="주택사업 이미지" class="swiper-slide">');
            $('.bus_swiper .left .img01 .swiper-wrapper').prepend('<img src="images/main/sec03_big_img01.png" alt="주택사업 이미지" class="swiper-slide">');
            $('.bus_swiper .left .img01').prepend('<div class="swiper-pagination"></div>');

            $('.bus_swiper .left .img02').addClass('swiper');
            $('.bus_swiper .left .img02').prepend('<div class="swiper-wrapper"></div>');
            $('.bus_swiper .left .img02 .swiper-wrapper').prepend('<img src="images/main/sec03_big02_img01.png" alt="건축사업 이미지" class="swiper-slide">');
            $('.bus_swiper .left .img02 .swiper-wrapper').prepend('<img src="images/main/sec03_big02_img01.png" alt="건축사업 이미지" class="swiper-slide">');
            $('.bus_swiper .left .img02 .swiper-wrapper').prepend('<img src="images/main/sec03_big02_img01.png" alt="건축사업 이미지" class="swiper-slide">');
            $('.bus_swiper .left .img02').prepend('<div class="swiper-pagination"></div>');

            $('.bus_swiper .left .img03').addClass('swiper');
            $('.bus_swiper .left .img03').prepend('<div class="swiper-wrapper"></div>');
            $('.bus_swiper .left .img03 .swiper-wrapper').prepend('<img src="images/main/sec03_big03_img01.png" alt="토목사업 이미지" class="swiper-slide">');
            $('.bus_swiper .left .img03 .swiper-wrapper').prepend('<img src="images/main/sec03_big03_img01.png" alt="토목사업 이미지" class="swiper-slide">');
            $('.bus_swiper .left .img03 .swiper-wrapper').prepend('<img src="images/main/sec03_big03_img01.png" alt="토목사업 이미지" class="swiper-slide">');
            $('.bus_swiper .left .img03').prepend('<div class="swiper-pagination"></div>');

            $('.bus_swiper .left .img').each(function(index, target){
                mobSwiper3 = new Swiper("#mobile .section03 .img0"+index, {
                    speed: 500,
                    loop: false,
                    autoplayDisableOnInteraction: false,
                    slidesPerView: 1, 
                    initialSlide: 0,
                    watchOverflow: true,
                    watchSlidesProgress: true,
                    watchSlidesVisibility: true,
        
                    pagination: {
                        el: '#mobile .section03 .img .swiper-pagination',
                        clickable: 'true',
                        type: 'bullets',
                    
                    },
                });
                
            });

            mobSwiper3;
            $('#mobile .swiper-pagination-sec03 > span').on('click', ()=> {
                console.log(mobSwiper3)
                setTimeout(() => {
                    // mobSwiper3.slideTo();
                    
                }, 200);
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
            delay: 2000,
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

                } else {
                    // Mobile
                    let bullet_mobile = $('.swiper-pagination-sec02').children('span');
                    let title_mobile = $('#mobile #main #fullpage .section02 .swiper-slide');

                    title_mobile.each((index) => {
                        let dd = title_mobile.eq(index).children('h2').height();

                        console.log(dd);

                    });

                    console.log(title_mobile)

                    bullet_mobile.each((index) => {
                        dd = bullet_mobile.eq(this.realIndex).position().left;
                    })
                    $('.moving_tab').animate({scrollLeft: dd}, 300);   

                }

            });

            function next(){
                $('.swiper-pagination-sec02').css({
                    'transform':'translateX(' + -(bulletWidth * index) + 'px)',
                    'transition':'.3s'
                });
            };

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
        
        $(".section03 .bus_swiper").each(function(elem, target){
            var swp = target.swiper;
            $(this).hover(function() {
                swp.autoplay.stop();
            }, function() {
                swp.autoplay.start();
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
