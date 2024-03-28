let timer;
let totalSeconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isTimerRunning = false;
let savedTotalSeconds = 0; // 중지된 시간을 저장할 변수 추가
let blinkInterval;
let player;
let slider;
let thumbnailImage;
let today = new Date();
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜

window.onload = function () {
  document.getElementById('today').placeholder =month+' / '+date;
  var colortheme = localStorage.getItem('color-theme')
  if (colortheme == 'dark'){
    document.documentElement.setAttribute('color-theme', 'dark');
    checkbox.checked = true;
  }else{
    document.documentElement.setAttribute('color-theme', 'light');
    checkbox.checked = false;
  }
  let localstorage_itemcount = localStorage.getItem('localstorage-itemcount');
  
console.log(localstorage_itemcount);

for (var i = 1; i < parseInt(localstorage_itemcount) + 1; i++) {
  addlist();
  console.log(todolistid);

  let record_input = localStorage.getItem('localstorage-todolist-record');
  console.log(record_input);
}

let record_input = localStorage.getItem('localstorage-todolist-record');
let record_input_array = JSON.parse(record_input);

for (var i = 1; i < parseInt(localstorage_itemcount) + 1; i++) {
  var todolistid = 'todolist' + i;
  document.getElementById(todolistid).value = record_input_array[i - 1];
}

var todolistleft_var=localStorage.getItem("todolistleft");
var todolisttop_var=localStorage.getItem("todolisttop");
var todolistwidth_var=localStorage.getItem("todolistwidth");
var todolistheight_var=localStorage.getItem("todolistheight");

let todolist_div = document.getElementById('todolist-div');
let keyframes_todoist = [
  { left: '50%', top: '50%', transform: 'translate(-50%, -50%)',width: '200px',height:'200px' },
  { left: `${todolistleft_var}px`, top: `${todolisttop_var}px`, width: todolistwidth_var , height: todolistheight_var}
];

todolist_div.style.left=todolistleft_var+'px';
todolist_div.style.top=todolisttop_var+'px';
todolist_div.style.width=todolistwidth_var;
todolist_div.style.height=todolistheight_var;

let options_todolist = {
  duration: 1100,
  easing:"ease",
};
todolist_div.animate(keyframes_todoist, options_todolist);


var timerleft_var=localStorage.getItem("timerleft");
var timertop_var=localStorage.getItem("timertop");

let timer_div = document.getElementById('timer');
let keyframes_timer = [
  { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' },
  { left: `${timerleft_var}px`, top: `${timertop_var}px` }
];

timer_div.style.left=timerleft_var+'px';
timer_div.style.top=timertop_var+'px';

let options_timer = {
  duration: 1100,
  easing:"ease",
};

timer_div.animate(keyframes_timer, options_timer);

var musicleft_var=localStorage.getItem("musicleft");
var musictop_var=localStorage.getItem("musictop");

let music_div = document.getElementById('musicplayer');
let keyframes_music = [
  { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' },
  { left: `${musicleft_var}px`, top: `${musictop_var}px` }
];

music_div.style.left=musicleft_var+'px';
music_div.style.top=musictop_var+'px';

let options_music = {
  duration: 1100,
  easing:"ease",
};

music_div.animate(keyframes_music, options_music);
};

function onYouTubeIframeAPIReady() {
  // API 준비 완료 시 실행될 작업
  slider = document.getElementById('slider');
  thumbnailImage = document.getElementById('thumbnailImage');
  slider.addEventListener('input', onSliderChange);
}

function loadVideo() {
  const youtubeLink = document.getElementById('youtubeLink').value;
  const videoId = getYoutubeVideoId(youtubeLink);

  if (videoId) {
    if (player) {
      player.loadVideoById(videoId);
      updateThumbnail(videoId);
    } else {
      player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
          controls: 1,
          autoplay: 1,
          loop: 1
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }
  } else {
    alert('유효한 유튜브 링크를 입력하세요.');
  }
}

function onPlayerReady(event) {
  // 플레이어가 준비되었을 때 실행되는 함수
  event.target.playVideo();
  updateVideoInfo();
  updateThumbnail(player.getVideoData().video_id);
  setInterval(updateVideoInfo, 500); // 1초마다 비디오 정보 업데이트
}

function onPlayerStateChange(event) {
  // 플레이어 상태 변화 감지 시 실행되는 함수
  if (event.data == YT.PlayerState.ENDED) {
    player.playVideo();
  }
}
function getYoutubeVideoId(url) {
  const regExp = /[?&]v=([^?&]+)/;
  const match = url.match(regExp);
  return match && match[1];
}
function toggleVideo() {
  if (player) {
    if (player.getPlayerState() === 1) { // 재생 중인 경우
      player.pauseVideo();
      document.getElementById('pause').style.display = 'none';
      document.getElementById('play').style.display = 'block';
    } else { // 정지된 경우 또는 일시정지 중인 경우
      player.playVideo();
      document.getElementById('play').style.display = 'none';
      document.getElementById('pause').style.display = 'block';
    }
  }
}

const musicplayerdiv = document.getElementById('musicplayer');
const musicplayerdragger = document.getElementById('musicdragger');

const timerdiv = document.getElementById('timer');
const timerdragger = document.getElementById('timerdragger');

const todolistdiv = document.getElementById('todolist-div');
const todolistdragger = document.getElementById('todolistdragger');

let offsetX, offsetY;
let ismusicplayerDragging = false;
let istimerDragging = false;
let istodolistDragging = false;

// 마우스 클릭 이벤트
musicplayerdragger.addEventListener('mousedown', function(e) {
  ismusicplayerDragging = true;
});

timerdragger.addEventListener('mousedown', function(e) {
  istimerDragging = true;
});
todolistdragger.addEventListener('mousedown', function(e) {
  istodolistDragging = true;
});

let zindexevent=0;
// 마우스 이동 이벤트
document.addEventListener('mousemove', function(e) {
  if (ismusicplayerDragging) {
    musicplayerdiv.style.left = `${e.clientX}px`;
    musicplayerdiv.style.top = `${e.clientY - 10}px`;
    localStorage.setItem("musicleft",e.clientX-musicplayerdiv.getBoundingClientRect().width*0.5+200);
    localStorage.setItem("musictop",e.clientY - 10);
    musicplayerdiv.style.zIndex = zindexevent;
    zindexevent++;
    }
  else if (istimerDragging) {
    timerdiv.style.left = `${e.clientX-290}px`;
    timerdiv.style.top = `${e.clientY -60}px`;
    localStorage.setItem("timerleft",e.clientX-timerdiv.getBoundingClientRect().width*0.5);
    localStorage.setItem("timertop",e.clientY-60);
    timerdiv.style.zIndex = zindexevent;
    zindexevent++;
  }
  else if (istodolistDragging) {
    todolistdiv.style.left = `${e.clientX-todolistdiv.getBoundingClientRect().width*0.5}px`;
    todolistdiv.style.top = `${e.clientY -20}px`;
    localStorage.setItem("todolistleft",e.clientX-todolistdiv.getBoundingClientRect().width*0.5);
    localStorage.setItem("todolisttop",e.clientY -20);

    todolistdiv.style.zIndex = zindexevent;
    zindexevent++;
  }
});

document.getElementById('todolist-div').addEventListener('mouseup',()=>{
    localStorage.setItem("todolistwidth",todolistdiv.style.width);
    localStorage.setItem("todolistheight",todolistdiv.style.height);
})

// 마우스 릴리스 이벤트
document.addEventListener('mouseup', function() {
  ismusicplayerDragging = false;
  istimerDragging = false;
  istodolistDragging = false;
});
function updateVideoInfo() {
  if (player) {
    const videotitle = document.getElementById('videotitle');
    const videorange1 = document.getElementById('videorange1');
    const videorange2 = document.getElementById('videorange2');
    videotitle.innerText=player.getVideoData().title;
    videorange1.innerText=formatTime(player.getCurrentTime());
    videorange2.innerText=formatTime(player.getDuration());
    slider.max = player.getDuration();
    slider.value = player.getCurrentTime();
  }
}
const addButton = document.querySelector('.add-button');
const checklist = document.querySelector('.checklist');
const todolistinput = document.getElementsByClassName('todolist');
let itemCount = 0;

function addlist() {
  if (itemCount < 25) {
    const newItem = document.createElement('div');
    newItem.classList.add('checklist-item');
    newItem.innerHTML = `
      <input type="checkbox" id="item-${itemCount}">  
      <input class='todolist' id="todolist${itemCount+1}" type="text"placeholder="할 일 ${itemCount + 1}">
      <button class='deletelist' >-</button>
    `;
    checklist.appendChild(newItem);
    itemCount++;
    localStorage.setItem('localstorage-itemcount',itemCount);
    const newlyAddedInput = newItem.querySelector('.todolist');
    newlyAddedInput.focus();
  } else {
    alert('체크리스트는 최대 25개까지 추가할 수 있습니다.');
  }
}
checklist.addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('deletelist')) {
    const itemToRemove = event.target.parentNode;
    const itemId = itemToRemove.querySelector('.todolist').id.replace('todolist', '');
    
    // 삭제된 항목 이후의 모든 항목에 대해 ID를 다시 설정
    const itemsToReorder = itemToRemove.parentNode.children;
    for (let i = parseInt(itemId); i < itemCount; i++) {
      const currentItem = itemsToReorder[i];
      const input = currentItem.querySelector('.todolist');
      input.id = 'todolist' + i;
      input.placeholder = '할 일 ' + i;
      const button = currentItem.querySelector('.deletelist');
      button.setAttribute('data-id', i);
    }

    checklist.removeChild(itemToRemove);
    itemCount--;
    localStorage.setItem('localstorage-itemcount', itemCount);
  }
});

function record_todolist() {
  let localstorage_itemcount = localStorage.getItem('localstorage-itemcount');
  let localstorage_todolist_record = [];

  for (let i = 1; i <= localstorage_itemcount; i++) {
    localstorage_todolist_record.push(document.getElementById('todolist' + i).value);
  }

  localStorage.setItem('localstorage-todolist-record', JSON.stringify(localstorage_todolist_record));
}

document.getElementById('todolist-div').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    addlist();
  }
});

// 기존 addButton에 대한 이벤트 리스너는 그대로 유지한 상태에서
// 추가로 deletelist 버튼을 제어하는 이벤트 리스너를 추가합니다.


function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function onSliderChange() {
  if (player) {
    player.seekTo(slider.value);
  }
}

function updateThumbnail(videoId) {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  thumbnailImage.src = thumbnailUrl;
}

const checkbox = document.getElementById('darkmode');

const isUserColorTheme = localStorage.getItem('color-theme');
const isOsColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const getUserTheme = () => (isUserColorTheme ? isUserColorTheme : isOsColorTheme);

checkbox.addEventListener('click', e => {
  if (e.target.checked) {
    localStorage.setItem('color-theme', 'dark');
    document.documentElement.setAttribute('color-theme', 'dark');
  } else {
    localStorage.setItem('color-theme', 'light');
    document.documentElement.setAttribute('color-theme', 'light');
  }
});

  // HTML 문서의 특정 요소에 현재 시간을 표시합니다.

// 1초마다 updateTime 함수를 호출하여 시간을 업데이트합니다.
setInterval(updateTime, 1000);

// 페이지 로드 시에도 초기 시간을 표시합니다.
updateTime();
const overlayyoutube = document.getElementById('thumbnailImage');
let isClicked = false;

overlayyoutube.addEventListener('click', function() {
  isClicked = !isClicked; // 클릭 상태를 토글합니다.

  if (isClicked) {
    document.getElementById('youtubeLink').style.top = '75px';
    document.getElementById('youtubeLink').style.opacity = '1';
    //플레이어는 지워지기
    document.getElementById('play').style.top = '20px'
    document.getElementById('play').style.opacity = '0'
    document.getElementById('pause').style.top = '20px'
    document.getElementById('pause').style.opacity = '0'
  } else {
    document.getElementById('youtubeLink').style.top = '90px';
    document.getElementById('youtubeLink').style.opacity = '0';
    //플레이어는 보이기
    document.getElementById('play').style.top = '60px'
    document.getElementById('play').style.opacity = '1'
    document.getElementById('pause').style.top = '60px'
    document.getElementById('pause').style.opacity = '1'

  }
});
function showLinkYoutube(){
  document.getElementById('youtubeLink').style.top = '75px';
  document.getElementById('youtubeLink').style.opacity = '1';
  //플레이어는 지워지기
  document.getElementById('play').style.top = '20px'
  document.getElementById('play').style.opacity = '0'
  document.getElementById('pause').style.top = '20px'
  document.getElementById('pause').style.opacity = '0'
}
function hideLinkYoutube(){
    document.getElementById('youtubeLink').style.top = '90px';
  document.getElementById('youtubeLink').style.opacity = '0';
  //플레이어는 보이기
  document.getElementById('play').style.top = '60px'
  document.getElementById('play').style.opacity = '1'
  document.getElementById('pause').style.top = '60px'
  document.getElementById('pause').style.opacity = '1'
  loadVideo()
}
        // 마우스 오버 시 애니메이션
function timermouseover() {
          document.getElementById('hoursInput').style.opacity = '1';
          document.getElementById('minutesInput').style.opacity = '1';
          document.getElementById('secondsInput').style.opacity = '1';
          document.getElementById('start').style.opacity = '1';
          document.getElementById('stop').style.opacity = '1';
          document.getElementById('reset').style.opacity = '1'; // 투명도를 1로 변경
          document.getElementById('display').style.top='30px'; 
        };
    
        // 마우스 아웃 시 애니메이션
function timermouseout() {
            document.getElementById('hoursInput').style.opacity = '0';
            document.getElementById('minutesInput').style.opacity = '0';
            document.getElementById('secondsInput').style.opacity = '0';
            document.getElementById('start').style.opacity = '0';
            document.getElementById('stop').style.opacity = '0';
            document.getElementById('reset').style.opacity = '0'; // 투명하게 변경
            document.getElementById('display').style.top='85px'; 
        };
      function isFullScreen() {
        return (
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
        );
      }
      function exitFullScreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      
  const range = document.getElementById('slider');
  
  range.addEventListener('input', function() {
    const value = (range.value - range.min) / (range.max - range.min) * 100;
    
    range.style.background = `linear-gradient(to right, #fff 0%, #3498db ${value}%, #ddd ${value}%, #ddd 100%)`;
  });
function fullsc(){
  if (isFullScreen()) {
    document.exitFullscreen();
  }else{
        document.documentElement.requestFullscreen()
  }
}
function displayTime() {
    let display = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    let displayElement = document.getElementById('display');
  
    if (totalSeconds === 0 && isTimerRunning) {
      savedTotalSeconds = 0; // 중지된 시간을 저장
      clearInterval(blinkInterval);
      blinkInterval = setInterval(() => {
        displayElement.style.visibility = (displayElement.style.visibility === 'hidden') ? 'visible' : 'hidden';
      }, 1000);
    } else {
      clearInterval(blinkInterval);
      displayElement.style.visibility = 'visible';
    }
    document.title = display;
    displayElement.innerText = display;
  }

  
function startTimer() {
  if (isTimerRunning) {
    return;
  }
  let hoursInput = parseInt(document.getElementById('hoursInput').value) || 0;
  let minutesInput = parseInt(document.getElementById('minutesInput').value) || 0;
  let secondsInput = parseInt(document.getElementById('secondsInput').value) || 0;

  // 입력된 시간을 초로 환산하여 totalSeconds에 저장
  totalSeconds = hoursInput * 3600 + minutesInput * 60 + secondsInput;

  // 저장된 시간이 있을 경우, 중지된 시간을 반영하여 다시 시작
  if (savedTotalSeconds > 0) {
    totalSeconds = savedTotalSeconds;
  }

  timer = setInterval(function () {
    if (totalSeconds >= 0) {
      hours = Math.floor(totalSeconds / 3600);
      minutes = Math.floor((totalSeconds % 3600) / 60);
      seconds = totalSeconds % 60;
      displayTime();
      totalSeconds--;
    } else {
      clearInterval(timer);
      isTimerRunning = false;
    }
  }, 1000);

  isTimerRunning = true;
}

function stopTimer() {
  clearInterval(timer);
  savedTotalSeconds = totalSeconds; // 중지된 시간을 저장
  isTimerRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  savedTotalSeconds = 0; // 중지된 시간을 저장
  totalSeconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  document.getElementById('hoursInput').value = '';
  document.getElementById('minutesInput').value = '';
  document.getElementById('secondsInput').value = '';
  clearInterval(blinkInterval);
  document.getElementById('display').style.visibility = 'visible';
  let display = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  let displayElement = document.getElementById('display');
  displayElement.innerText = display;
  isTimerRunning = false;
}

// function pickquote(){
//   fetch('quote.json')
//       .then(response => response.json())
//       .then(data => {
//         // 명언을 랜덤으로 선택합니다.
//         const randomIndex = Math.floor(Math.random() * (data.length));
//         const randomQuote = data[randomIndex];

//         document.getElementById('title').placeholder = randomQuote.quote + '-' + randomQuote.author;

//         // HTML에 명언과 저자를 추가합니다.
//       })
// }
