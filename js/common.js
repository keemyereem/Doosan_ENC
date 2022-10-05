
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


// 고객문의 => 국가선택 select
document.addEventListener('DOMContentLoaded', () => {
  if ($('#sel02').length) {
    const selectDrop = document.querySelector('#sel02');

    fetch('https://restcountries.com/v2/all').then(res => {
        return res.json();
    }).then(data => {
        let output = "";
        data.forEach(country => {
            output += `<option value ="${country.name}">${country.name}</option>`;
        })

        selectDrop.innerHTML = output;
    }).catch(err => {
        console.log(err);
    })
  }
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

      if ($(".sub_visual_menu").length) {
        let fixMenu = subMenu.offsetTop;


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
      }
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
      var selected = this.innerText,
          siteName = document.getElementsByClassName('site_selected')[0],
          familySite = this.parentNode.parentNode.parentNode;

      siteName.innerText = selected;
      familySite.classList.remove('open');
    });

    $(window).on('scroll', function() {
      let st = $(window).scrollTop(),
          footer = document.querySelector(".footer").offsetTop;

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
  
  goTopEvent:() => {
    $(window).scroll(function() {
        // top button controll
        if ($(this).scrollTop() > 400) {
            $('#topButton').fadeIn();
        } else {
            $('#topButton').fadeOut();
        }
        var footerTop = $('.footer').offset().top - $(window).outerHeight(),
            pos = $('.footer').outerHeight() + Number(80),
            pos_intw = $('.footer').outerHeight() + Number(196),
            pos_m = $('.footer').outerHeight() + Number(35);
        
        if($(this).scrollTop() > footerTop){
            if ($(window).width()>767) {
              if($('.interviewBtn').length){
                $('#topButton').addClass('on').css({'bottom':pos_intw});
              }else {
                $('#topButton').addClass('on').css({'bottom':pos});
              }
                
            }else {
                $('#topButton').addClass('on').css({'bottom':pos_m});
            }

        }else {
            if ($(window).width()>767) {
              if($('.interviewBtn').length){
                $('#topButton').removeClass('on').css({'bottom':'19.6rem'});
              }else {
                $('#topButton').removeClass('on').css({'bottom':'8rem'});
              }
            }else {
                $('#topButton').removeClass('on').css({'bottom':'3.5rem'});
            }
        }
    });

    $(document).on('click', '#topButton', function() {
        $('html, body').animate({scrollTop:0}, '300');
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
    const tabContainer = $('#mobile .tab_box > .inner'),
          tabBox = tabContainer.find('> .tab_slide'),
          tabButton = tabBox.find('> li');

    let size = tabButton.length,
        tbIndex = 0;

    if (tabBox.length) {
      $(document).ready(function(){
        let tbOn = Math.floor(tabBox.find('> li.on').position().left),
            tbWidth = tabButton.width();

        tabContainer.animate({scrollLeft: tbOn - tbWidth}, 1000);
      });

      tabContainer.on('load resize scroll', ()=> {
          tabBoxPosition = Math.abs(tabBox.position().left);

          tabButton.each((index)=> {
            tabButtonPosition = Math.floor(tabButton.eq(index).position().left);

            if (size !== index + 1) {
              nextIndexPosition = Math.floor(tabButton.eq(index).next().position().left);

              if (tabBoxPosition > tabButtonPosition && tabBoxPosition <= nextIndexPosition) {
                tbIndex = index;
              }
            }

          });

      });

      $('.control').on('click', function() {
        if ($(this).hasClass('prev')) {
            tsMove = Math.floor(tabButton.eq(tbIndex).position().left);

            tabContainer.animate({scrollLeft: tsMove}, 200)
        } else {
            tsmoveTrigger = Math.abs(tabBox.position().left);
            
            if (Math.ceil(tsmoveTrigger) == Math.floor(tabButton.eq(tbIndex).next().position().left)) {
                tbIndex = tbIndex + 1;
            } else {
                tbIndex = tbIndex;
            }

            tsMove = Math.floor(tabButton.eq(tbIndex).next().position().left);
            tabContainer.animate({scrollLeft: tsMove}, 200);
        }
      })
    }


  },

};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **서브**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var businessEvent = {
  init: function() {
    this.interview();
    this.masterpieceMenu();
    this.goToInterview();
  },

  interview: () => {
    const contentNum = $('.interview .contents .wrap dl');

    contentNum.each((index) => {
      let n = Math.abs(index);
      n < 9 ? contentNum.eq(index).find('dt span').text('0' + (index + 1)) : contentNum.eq(index).find('dt span').text((index + 1));
    })

  },

  masterpieceMenu: () => {

    const subMenu = document.querySelector(".masterpiece_menu");

    if ($(".masterpiece_menu").length) {
      let fixMenu = subMenu.offsetTop;

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

      if ($('#mobile').length) {
        $('.masterpiece_menu .on').on('click', ()=> {
            $('.masterpiece_menu ul').toggleClass('open');
        });
      }

    }
  },

  goToInterview:() => {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 400) {
            $('.interviewBtn').fadeIn();
        } else {
            $('.interviewBtn').fadeOut();
        }

        var footerTop = $('.footer').offset().top - $(window).outerHeight(),
            pos = $('.footer').outerHeight() + Number(80),
            pos_m = $('.footer').outerHeight() + Number(100);
        
        if($(this).scrollTop() > footerTop){
            if ($(window).width()>767) {
                $('.interviewBtn').addClass('on').css({'bottom':pos});
            }else {
                $('.interviewBtn').addClass('on').css({'bottom':pos_m});
            }

        }else {
            if ($(window).width()>767) {
                $('.interviewBtn').removeClass('on').css({'bottom':'8rem'});
            }else {
                $('.interviewBtn').removeClass('on').css({'bottom':'10rem'});
            }
        }
    });

  },


}

var civilEngineerEvent = {
  init: function(){
    this.civilSwiper();
  },

  civilSwiper: () => {
    $(".civil_engineer .outline .swiper").each(function(index){
      var idx = index +1;
      // 첫번째 슬라이드 2depth 스와이퍼 
      var bus03Swiper = new Swiper('.civil_engineer .outline .swiper0' + idx, {
          observer: true,
          observeParents: true,
          slidesPerView : 1,
          speed: 1000,
          loop: true,
          autoplay: {
            delay: 3500,
            disableOnInteraction: true  // 쓸어 넘기거나 버튼 클릭 시 자동 슬라이드 정지.
          },
          navigation: {
              nextEl: '.civil_engineer .outline .swiper-button-next0' + idx,
              prevEl: '.civil_engineer .outline .swiper-button-prev0' + idx,
          },
          watchOverflow: true,
      });

      // Next, Prev버튼 클릭 시 오토플레이 재개
      $(document).on('click', '.civil_engineer .outline .swiper-button-next0' + idx + ', .civil_engineer .outline .swiper-button-prev0' + idx + '', () => {
          bus03Swiper.autoplay.start();
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

    const section = $('.section'),
          fixSidemenu = $('.civil_engineer .section_nav'),
          fraction = fixSidemenu.find('.fraction'),
          fixmenuHeight = $('.sub_visual_menu').height();
    
    fraction.children('.total_page').text(section.length)

    $(window).on('load resize scroll', function(e) {
      let gap = $(window).height() / 4,
          currentPosition = $(window).scrollTop() + fixmenuHeight,
          fractionOut = (section.eq(section.length - 1).innerHeight() / 4) + $('.footer').offset().top - $('.footer').outerHeight();

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

var techEvent = {
  init: function(){
    this.loveMotion();
    this.haveMotion();
  },

  loveMotion : () => {
    const tl1 = gsap.timeline({ /* repeat:-1, repeatDelay: 1 */ });

    tl1.to('.one', { x: -516 })
    .to('.one', { opacity: 1, duration: .5 })
    .to('.one .slogan p:first-child', { x : 0, opacity: 0, duration: .2 })
    .to('.one .slogan p:last-child', { x : 0, opacity: 1, duration: .3 }, "=-.1");
    
    tl1.to('.two', { x: -172 })
    .to('.two', { opacity: 1, duration: .5, delay: .5 })
    .to('.two .slogan p:first-child', { x : 0, opacity: 0, duration: .2 })
    .to('.two .slogan p:last-child', { x : 0, opacity: 1, duration: .3 }, "=-.1");
    
    tl1.to('.three', { x: 172 })
    .to('.three', { opacity: 1, duration: .5, delay: .5 })
    .to('.three .slogan p:first-child', { x : 0, opacity: 0, duration: .2 })
    .to('.three .slogan p:last-child', { x : 0, opacity: 1, duration: .3 }, "=-.1");
    
    tl1.to('.four', { x: 516 })
    .to('.four', { opacity: 1, duration: .5, delay: .5 })
    .to('.four .slogan p:first-child', { x : 0, opacity: 0, duration: .2 })
    .to('.four .slogan p:nth-child(2)', { x : 0, opacity: 1, duration: .3 }, "=-.1");
    
    tl1.to('.box', { borderRadius: "50px", duration: .5, delay: .5 })
    .to('.box > li', { x: 0, y: 0, duration: 1, delay: .5 }, "=-1")
    .to('.box', { borderRadius: "350px", width: "705px", duration: 1 }, "=-1")
    .to('.four .sub p:first-child, .four .slogan p:nth-child(2)', { opacity: 0, duration: .2 }, "=-.1")
    .to('.four .sub p:last-child, .four .slogan p:nth-child(3)', { opacity: 1, duration: .3 }, "=-.1");
        
    tl1.to('.box', { background: "rgba(153, 205, 255, .2)", duration: .5, delay: .5 })
    .to('.four .sub p:last-child, .four .slogan p:nth-child(3), .four .icon img:first-child', { opacity: 0, duration: 0, delay: 0 })
    .to('.four', { background: "#005EB8", width: "610px", height: "610px", duration: .5 })
    .to('.four .box > li .icon, .four .box > li .sub', { display: "none", opacity: 0, height: "0", padding: 0, overflow: "hidden", duration: 0, delay: 0 })
    .to('.four .slogan p:last-child', { opacity: 1, duration: .5,  color: "#fff" })
    .to('.four .slogan p:last-child', { duration: .5, fontSize: "+=90" }, "=-.1")

    
    tl1.to('.box > li', { border: "1px solid #dbdbdb" })
    .to('.one', { x: -516, duration: 0, delay: 0 })
    .to('.two', { x: -172, duration: 0, delay: 0 })
    .to('.three', { x: 172, duration: 0, delay: 0 })
    .to('.four', { x: 516, duration: 0, delay: 0, background: "#fff", width: "328px", height: "328px" })
    .to('.box', { width: "100%", height: "370px", backgroundColor: "transparent", borderRadius: "0", duration: 0, delay: 0 })
    .to('.box > li .icon, .box > li .sub', { display: "none", opacity: 0, height: "0", padding: 0, overflow: "hidden", duration: 0, delay: 0 })
    .to('.box > li .slogan p:nth-child(2)', { opacity: 1, duration: 0, delay: 0 })
    .to('.four .slogan p:nth-child(3)', { opacity: 0, duration: 0, delay: 0 })
    .to('.four .slogan p:last-child', { opacity: 0 })
    .to('.box', { opacity: 0, duration: .2 }, "=-.5");
    
    tl1.to('.top', { display: "block" })
    .to('.box', { opacity: 1, duration: .5 }, "=-.1");

    tl1
    .to('.four .slogan p:nth-child(2)', { opacity: 1 })
    .to('.four .slogan p:nth-child(3)', { opacity: 0 })








  },

  haveMotion :()=> {
    const tl2 = gsap.timeline({stagger:1});

    tl2
        .to('.transform-box', { /* scale: 3.14 */width: "110px", height: "110px",  duration: .5, delay: 1})

        .to('.we', { x:"-3rem",  duration: .5}, 1)
        .to('.ve', { x:"2rem",  duration: .5}, 1)
        .to('.transform-box', { /* scale: 3.14 */width: "110px", height: "110px", rotation: 90, x: "1rem", y: "5rem",  duration: .8})
        .to('.transform-box .left::after, .transform-box .right::after', { width: "110px", height: "110px",  duration: .8})

        .to('.we', { x:"-5rem",  duration: .5}, 1.5)
        .to('.ve', { x:"4rem",  duration: .5}, 1.5)
        .to('.transform-box', { backgroundColor: "transparent",  duration: 0, delay: .5}, 2)
        .to('.transform-box .left', { y: "2.5rem",  duration: .5, delay: .5}, 2.5)
        .to('.transform-box .right', { y: "-2.5rem",  duration: .5, delay: .5}, 2.5)

        .to('.we', { x: "-11.5rem",  duration: .5}, 3)
        .to('.ve', { x: "10rem",  duration: .5}, 3)
        .to('.ha', { opacity: "1",  duration: .2, delay: 1}, 3)

        .to('.transform-box .left, .transform-box .right', { opacity: 0,  duration: .5, delay: .5}, 4.5)
        .to('.we', { x:"-6rem",  duration: .5}, 5.5)
        .to('.ve', { x:"3.5rem",  duration: .5}, 5.5)
        .to('.we', { color:"#005eb8",  duration: .5}, 6.5)
        .to('.ve', { color:"#005eb8",  duration: .5}, 6.5)
        .to('.we', { color:"#000",  duration: .5, delay: .5}, 7.5)
  },

};

var companyEvent = {
  init: function(){
    this.chart();
  },

  chart: ()=> {

    const graph = $('#HMchart .graph'),
          graphBarColor = ['#999999', '#f78600', '#e73100', 'purple'],
          transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend',
          barSpeed = 1000,
          deviceChecker = $('#mobile');
    
    // 그래프 별 작동 토글
    graph.each((index) => {

      // scroll animation 동작/ graph에 작동 클래스 부여
      $(window).on('scroll load', ()=> {
        let st = $(window).scrollTop(),
            graphOffset = graph.eq(index).offset().top,
            graphAni = graphOffset - $(window).height() / 2;

        if (st > graphAni) {
          graph.eq(index).addClass('on');
        } else {
          graph.eq(index).removeClass('on');
        }
      })

      const line = graph.eq(index).find('.graph_bg li'),
            graphBars = graph.eq(index).find('.graph_bar'),
            bar = graph.eq(index).find('.graph_bar li');

      let maxPercent = graph.eq(index).find('.graph_bg li').eq(0).attr('data-line');

      // 라인 백그라운드 생성
      line.each((idx) => {
        lineData = line.eq(idx).attr('data-line');
        let lineNum = lineData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        line.eq(idx).children('span').text(lineNum);
        
        // 0수치에 기준점 클래스 부여/ 라인 숫자 최대(또는 최소)값 기준 그래프바 높이값 조정 클래스 부여
        if (lineData === '0') {
          line.eq(idx).addClass('standard');
        } else if (Math.abs(lineData) > maxPercent) {
          line.eq(-1).addClass('standardReverse')
        }  

      });
      
      
      // 수치 data 기반 바 높이값 생성
      bar.each((i) => {
        let barData = bar.eq(i).attr('data-percent'),
            barNum = barData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            barPercent = barData / maxPercent * 100;

        // 툴팁 가림설정
        bar.eq(i).find('> span, > p').hide();

        // 바 데이터와 라인 데이터에 '-'값이 들어갈 경우 혼합 차트 변경
        if (barData < 0 && lineData < 0) {
          graph.eq(index).addClass('convert')
          bar.eq(i).addClass('minus');
        }

        // 수치상 '-'값이 있는 경우 그래프 방향 조정/ 최대 또는 최소값 기준 그래프바 퍼센트 형성
        if (graph.eq(index).hasClass('convert')) {
          let dataMinus = Math.abs(bar.eq(i).attr('data-percent')),
              standardReverse = graph.eq(index).find('.standardReverse').attr('data-line');

          maxPercent = Math.abs(standardReverse);
          
          if (standardReverse == null) {
            maxPercent = line.eq(0).attr('data-line');
          }
          barPercent = dataMinus / maxPercent * 100;
        }

        // 바 그래프 애니메이션 기능
        function chartBarStart() {
          // 그래프바가 차트 수치 밖으로 넘어갈 경우 툴팁 세팅
          const maginotLine = graphBars.height() - (graph.eq(index).find('.graph_bg li').eq(1).position().top / 3) * 2;
          if (bar.eq(i).height() >= maginotLine) {
            bar.eq(i).find('> span').css({'top': '1rem', 'right': '30%'})
          }
          if (bar.eq(i).height() > graphBars.height()) {
            barPercent = 104
          }

          bar.eq(i).css({'height': + barPercent + '%', 'background': '' + graphBarColor[i], 'transition': 'height cubic-bezier(.42,-0.01,.21,1) ' + barSpeed / 1000 + 's', 'transition-delay': + i / 10 * 2 + 's'});
          bar.eq(i).find('> span').text(barNum).css({'border': '.1rem solid' + graphBarColor[i], 'color': '' + graphBarColor[i]});
        }

        // scroll animation 동작
        $(window).on('load resize scroll', ()=> {
          if ($('.graph').eq(index).hasClass('on')) {
            // bar로딩
            chartBarStart();
            // bar로딩 끝나면, 툴팁 나타내기 
            bar.on(transitionEnd, function() {
              bar.eq(i).find('> span').fadeIn();
              setTimeout(() => {
                bar.eq(i).find('> p').fadeIn();
              }, 200);
            });
          }
        });
        
      });
    
      // '0' 수치 기준점으로 그래프바 위치 고정 및 그래프 비율 조절
      if (line.length) {
        let gH = graph.eq(index).height(),
            countH = $('.graph > span').height(),
            zeroH = graph.eq(index).find('.standard').position().top,
            stdH = graph.eq(index).find('.standard').height() / 2,
            barH = graphBars.height() - (countH + stdH),
            standardPosition = (gH - (zeroH + stdH + countH)) / 10,
            convertHeightReverse = (barH - zeroH) / 10;

        // 그래프바 위치
        graphBars.css('bottom', + standardPosition + 'rem');
        
        // 혼합형 차트 기준점 기준 위아래 높이값 비교 - 높은값을 높이값으로 선정
        if (zeroH / 10 > convertHeightReverse) {
          convertHeight = zeroH / 10;
        } else {
          convertHeight = convertHeightReverse;
        }
        // 혼합형 차트 숫자 높이값
        graphBars.css({'height': + convertHeight + 'rem'});
        
        // 모바일버전 
        if (deviceChecker.length) {
          // span태크 width값 통일(우측정렬 위해)
          const lineSpan = graph.eq(index).find('.graph_bg > li > span');
          let padding = 12,
              spanWidth = (lineSpan.width() + padding) / 10;

          lineSpan.css({'max-width': spanWidth + 'rem', 'width': '100%'});
          graphBars.css({'width': 'calc(100% - ' + (spanWidth + 1) + 'rem)'});
        }
      }
    }); 
  },
}

var customerEvent = {
  init: function(){
    this.inqEmail();
  },

  inqEmail : function() {
    //selectbox
    var selectType = $(".select_row>select");
    selectType.addClass("selectBox");
    selectChange(selectType);
    function selectChange(type) {
        type.change(function () {
            var select_name = $(this).children("option:selected").text();
            $(this).siblings("label").text(select_name);

            if(select_name === '직접입력') {
                $('.customer .cyber_report .row .ipt_cell.email_cell > div:nth-of-type(2)').show();
            }else {
                $('.customer .cyber_report .row .ipt_cell.email_cell > div:nth-of-type(2)').hide();
            }
        });
    };
  },
}
