let timer;
let totalSeconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isTimerRunning = false;
let savedTotalSeconds = 0; // 중지된 시간을 저장할 변수 추가
let blinkInterval;

const $checkbox = document.querySelector('.check');

const isUserColorTheme = localStorage.getItem('color-theme');
const isOsColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const getUserTheme = () => (isUserColorTheme ? isUserColorTheme : isOsColorTheme);

window.onload = function () {
  if (getUserTheme === 'dark') {
    localStorage.setItem('color-theme', 'dark');
    document.documentElement.setAttribute('color-theme', 'dark');
    $checkbox.setAttribute('checked', true);
  } else {
    localStorage.setItem('color-theme', 'light');
    document.documentElement.setAttribute('color-theme', 'light');
  }
};


$checkbox.addEventListener('click', e => {
  if (e.target.checked) {
    localStorage.setItem('color-theme', 'light');
    document.documentElement.setAttribute('color-theme', 'dark');
  } else {
    localStorage.setItem('color-theme', 'light');
    document.documentElement.setAttribute('color-theme', 'light');
  }
});

function updateTime() {
  // 현재 시간을 가져옵니다.
  var now = new Date();
  
  var year = now.getFullYear();
  var month = now.getMonth()+1;
  var date = now.getDate();
  if(now.getDay()==0){
    var day = '일요일';
  }else if(now.getDay()==1){
    var day = '월요일';
  }else if(now.getDay()==2){
    var day = '화요일';
  }else if(now.getDay()==3){
    var day = '수요일';
  }else if(now.getDay()==4){
    var day = '목요일';
  }else if(now.getDay()==5){
    var day = '금요일';
  }else if(now.getDay()==6){
    var day = '토요일';
  }
  // 시, 분, 초를 가져옵니다.
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  
  // 시간, 분, 초가 한 자리 숫자일 경우 앞에 0을 붙여 두 자리로 만듭니다.
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  
  // 현재 시간을 형식에 맞게 표시합니다.
  var currentday = year + '.' + month + '.'+ date  + ','+ day;
  var currentTime = hours + ':' + minutes + ':' + seconds;
  
  // HTML 문서의 특정 요소에 현재 시간을 표시합니다.
  document.getElementById('nowtime1').innerText = currentday;
  document.getElementById('nowtime2').innerText = currentTime;
}

// 1초마다 updateTime 함수를 호출하여 시간을 업데이트합니다.
setInterval(updateTime, 1000);

// 페이지 로드 시에도 초기 시간을 표시합니다.
updateTime();

    document.addEventListener('DOMContentLoaded', function() {
        const overlay = document.getElementById('timer');
    
        // 마우스 오버 시 애니메이션
        overlay.addEventListener('mouseover', function() {
          document.getElementById('hoursInput').style.opacity = '1';
          document.getElementById('minutesInput').style.opacity = '1';
          document.getElementById('secondsInput').style.opacity = '1';
          document.getElementById('start').style.opacity = '1';
          document.getElementById('stop').style.opacity = '1';
          document.getElementById('reset').style.opacity = '1'; // 투명도를 1로 변경
          document.getElementById('display').style.top='30px'; 
        });
    
        // 마우스 아웃 시 애니메이션
        overlay.addEventListener('mouseout', function() {
            document.getElementById('hoursInput').style.opacity = '0';
            document.getElementById('minutesInput').style.opacity = '0';
            document.getElementById('secondsInput').style.opacity = '0';
            document.getElementById('start').style.opacity = '0';
            document.getElementById('stop').style.opacity = '0';
            document.getElementById('reset').style.opacity = '0'; // 투명하게 변경
            document.getElementById('display').style.top='85px'; 
        });
      });
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
      
function fullsc(){
  if (isFullScreen()) {
    document.exitFullscreen();
  }else{
        document.documentElement.requestFullscreen()
  }
}
document.getElementById('title').ariaPlaceholder='하이'

function displayTime() {
    let display = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    let displayElement = document.getElementById('display');
  
    if (totalSeconds === 0 && isTimerRunning) {
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
fetch('quote.json')
      .then(response => response.json())
      .then(data => {
        // 명언을 랜덤으로 선택합니다.
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];

        document.getElementById('title').placeholder = randomQuote.quote + '-' + randomQuote.author;

        // HTML에 명언과 저자를 추가합니다.
      })
