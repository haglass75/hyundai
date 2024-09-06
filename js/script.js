window.onload = function () {
  AOS.init();
  // ** FADE OUT FUNCTION **
  // fadeOut(element : document.querySelector(대상))
  function fadeOut(el) {
    // 대상.style.투명도 = 불투명
    el.style.opacity = 1;
    (function fade() {
      // 대상.style.투명도 -= 0.1씩 감소
      if ((el.style.opacity -= 0.1) < 0) {
        el.style.display = "none";
      } else {
        // 웹브라우저 프레임갱신
        requestAnimationFrame(fade);
      }
    })();
  }

  // ** FADE IN FUNCTION **
  // fadeIn(element : document.querySelector(대상))
  function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += 0.1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }
  // 안내창
  let body = document.querySelector("body");
  let modal = document.querySelector(".modal-wrap");
  modal.addEventListener("click", function () {
    // modal.style.display = "none";
    // fadeOut(modal)
    anime({
      targets: ".modal",
      delay: 200,
      duration: 500,
      opacity: 0,
      easing: "easeInOutQuad",
      complete: function () {
        modal.style.display = "none";
        body.classList.add("active");
      },
    });
  });

  // 스크롤 기능
  // 스크롤바의 상단위치
  let scy = 0;
  let scActive = 50;
  scy = window.document.documentElement.scrollTop;

  let header = document.querySelector(".header");
  let logoW = document.querySelector(".logo-w");
  let logoG = document.querySelector(".logo-g");

  header.addEventListener("mouseenter", function () {
    header.classList.add("header-active");
    logoW.style.display = "none";
    logoG.style.display = "block";
  });
  header.addEventListener("mouseleave", function () {
    if (scy < scActive) {
      header.classList.remove("header-active");
      logoW.style.display = "block";
      logoG.style.display = "none";
    }
  });

  // 새로고침 시
  if (scy > scActive) {
    header.classList.add("header-active");
    logoW.style.display = "none";
    logoG.style.display = "block";
  }

  window.addEventListener("scroll", function () {
    scy = window.document.documentElement.scrollTop;
    // console.log("스크롤 : " + scy);
    if (scy > scActive) {
      header.classList.add("header-active");
      logoW.style.display = "none";
      logoG.style.display = "block";
    } else {
      header.classList.remove("header-active");
      logoW.style.display = "block";
      logoG.style.display = "none";
    }
  });

  // 펼침 언어 기능
  const langWord = document.querySelector(".language-word");
  const language = document.querySelector(".language");
  const languageLi = document.querySelector(".language li");
  setTimeout(function () {
    languageLi.style.transition = "all 0.2s";
  }, 500);

  langWord.addEventListener("click", function () {
    language.classList.toggle("language-box-active");
  });

  // 메뉴기능
  const nav = document.querySelector(".nav");
  const btMenu = document.querySelector(".bt-menu");
  const navClose = document.querySelector(".nav-close");

  btMenu.addEventListener("click", function () {
    // 클래스를 nav에 추가하고 싶다.
    nav.classList.add("nav-active");
  });

  navClose.addEventListener("click", function () {
    // 클래스를 nav에 삭제하고 싶다.
    nav.classList.remove("nav-active");
  });

  // nav 영역을 벗어나는 이벤트 발생처리
  nav.addEventListener("mouseleave", function () {
    nav.classList.remove("nav-active");
  });

  //  비디오 항목 체크 (video 태그로 파악)
  // 모든비디오 태그를 변수에 저장
  let videos = document.querySelectorAll(".swVisual video");
  // console.log(videos);
  //  비디오 시간 체크
  // 비디오의 재생 시간을 보관할 배열을 생성
  let videosTimeArr = [];
  // 비디오 재생 시간을 배열에 저장하는 반복문
  videos.forEach((video, index) => {
    videosTimeArr[index] = Math.ceil(video.duration);
  });
  // for (let i = 0; i < videos.length; i++) {
  //   // console.log(videos);
  //   // console.log(videos[0]);
  //   // console.log(videos[i].duration);
  //   // 시간을 보관한다.
  //   // videos 배열의 각 비디오 요소의 재생 시간을 올림하여 배열 videosTimeArr에 저장합니다.
  //   // duration(지속적으로)
  //   videosTimeArr[i] = Math.ceil(videos[i].duration);
  // }
  // console.log(videosTimeArr);
  // 첫번째 비디오 자동 실행
  let videoIndex = 0;
  videos[videoIndex].play();

  // Visual Slide
  //Swiper 슬라이드 초기화:
  let swVisual = new Swiper(".swVisual", {
    // "swVisual"
    // 클래스를 가진 요소에 대한 Swiper 슬라이드 객체를 생성합니다.
    // loop 옵션은 슬라이드를 무한 루프로 돌릴 것인지를 설정
    loop: true,
  });
  // 슬라이드 변경 이벤트시 처리
  swVisual.on("slideChange", function () {
    // console.log("슬라이드 교체");
    // 진행중인 비디오 멈춤
    //  pause() 메서드를 호출하여 해당 비디오를 일시 정지
    videos[videoIndex].pause();

    // 다음 화면에 보이는 swiper 슬라이드 번호
    // console.log(swVisual.activeIndex);
    // console.log(swVisual.realIndex);
    videoIndex = swVisual.realIndex;
    // 다음 비디오 재생
    // 처음으로 비디오 플레이헤드 이동
    // currentTime 속성은 HTML5 <video> 요소에서 사용되는 속성으로,
    // 현재 비디오 재생 위치를 나타냅니다.
    // 이 속성을 조작하여 비디오의 재생 위치를 변경
    // 다음 슬라이드로 이동할 때마다 비디오를 처음부터 재생하기 위해 이 부분이 사용
    //  console.log(videos[videoIndex].currentTime);
    videos[videoIndex].currentTime = 0;
    // https://solbel.tistory.com/1912
    videos[videoIndex].play();
    // playPromise.then((_) => {}):
    // then() 메서드는 비디오가 성공적으로 재생되었을 때 호출됩니다.
    // (_) => {}는 성공했을 때 실행되는 콜백 함수입니다.
    // 여기서는 실제로 아무 작업도 하지 않고 있습니다.
    // 성공 시 특별히 처리할 일이 없을 때 사용됩니다.
    // playPromise.catch((error) => {}):

    // catch() 메서드는 비디오가 재생 실패했을 때 호출됩니다.
    // (error) => {}는 실패 시 실행되는 콜백 함수입니다.
    // 여기에서도 실제로 아무 작업도 하지 않고 있습니다.
    // 실패 시 에러를 처리할 필요가 있을 때 사용됩니다.
    // then()은 재생이 성공했을 때,
    // catch()는 실패했을 때 실행됩니다.
    const playPromise = videos[videoIndex].play();
    if (playPromise !== undefined) {
      playPromise.then((_) => {}).catch((error) => {});
    }

    // 방어코드: 다음주 추가 설명
    clearInterval(videoTimer);
    videoReset();
  });
  // 비디오 영상이 플레이가 끝나면 다음 슬라이드로 이동
  // 늘어나는 흰색 bar
  let bars = document.querySelectorAll(".bar");
  // console.log(bars);
  // 늘어나는 길이를 위한 값(최대 100)
  let barScaleW = 0;

  // 타이머를 생성한다.
  // 비디오 타이머 초기화 및 설정:
  let videoTimer;
  // 비디오 타이머를 설정하고 초기화하는 함수 videoReset를 정의하고 호출
  function videoReset() {
    // 처음에는 0% 로 만들려고
    barScaleW = 0;
    // 최초에 bar 를 초기화 한다.
    // for (let i = 0; i < bars.length; i++) {
    //   let tag = bars[i];
    //   tag.style.width = `${barScaleW}%`;
    // }
    bars.forEach((bar) => {
      bar.style.width = `${barScaleW}%`;
    });
    // 활성화 될 bar 클래스 선택
    let activeBar = bars[videoIndex];
    console.log(activeBar);

    // 일단 타이머를 청소한다.
    // setTimeout  : 1번 실행 clearTimeout()
    // setInterval : 시간마다 연속 실행 clearInterva()
    clearInterval(videoTimer);
    // 비디오 플레이시간
    // console.log("시간 배열 videosTimeArr : ", videosTimeArr);
    // console.log("현재 번호 videoIndex : ", videoIndex);
    let videoTime = videosTimeArr[videoIndex];
    // console.log("선택된 시간 videoTime : ", videoTime);
    // console.log(videoTime);
    videoTimer = setInterval(() => {
      barScaleW++;
      // console.log(barScaleW);
      activeBar.style.width = `${barScaleW}%`;
      // 바의 길이가 100% 이상이 되면 실행
      if (barScaleW >= 100) {
        // setInterval을 멈추고(clearInterval(videoTimer))
        // 다시 videoReset() 함수를 호출하여 바와 타이머를 초기화
        swVisual.slideNext();
        clearInterval(videoTimer);
        videoReset();
      }
      // videosTimeArr 배열에서 재생 시간을 저장할 때는 초 단위로 저장되었을 것이므로,
      // videoTime * 10은 해당 비디오를 화면에서 표시하는데 걸리는 시간을 10배로 늘리는 것
    }, videoTime * 10);
  }
  videoReset();

  // .visual-control > li 선택한다.
  // visualControlLi 요소 목록에 대해 클릭 이벤트 핸들러를 등록합니다.
  // 클릭한 인덱스를 videoIndex로 설정하고, Swiper 슬라이드를 해당 인덱스로 이동
  const visualControlLi = document.querySelectorAll(".visual-control > li");
  // 클릭 이벤트를 처리하는 이벤트핸들러(약속된 함수)를 작성한다.
  // : 이벤트(click)
  // : 이벤트핸들러(addEventLisenter)
  // visualControlLi[0].addEventListener("click", function(){})
  visualControlLi.forEach((item, index) => {
    item.addEventListener("click", function () {
      // 클릭을 했을 때 슬라이드 번호로 점프한다.
      console.log(index);
      videoIndex = index;
      // Swiper 슬라이드를 직접 점프시킨다.
      // Swiper 에 내장된 함수를 작성
      // 슬라이드명.slidTo(번호)
      swVisual.slideTo(videoIndex);
    });
  });

  // 비즈니스 슬라이드
  const swBusiness = new Swiper(".swBusiness", {
    loop: true,
    speed: 500,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
};
