/* 육사교 - 당직 관리 시스템 메인 JS */

// 현재 시각
function currentTime() {
  const now = new Date();
  
  const hour = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const sec = String(now.getSeconds()).padStart(2, "0");
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const weekdayList = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const weekday = weekdayList[now.getDay()];

  document.querySelector(".current-time").innerText = `${hour}:${min}:${sec}`;
  document.querySelector(".current-date").innerText = `${year}-${month}-${day} ${weekday}`;
}

// 특이사항 초기화 구현
function initSignificant() {
  const savedSignificant = localStorage.getItem('dms.significant');

  if (!savedSignificant) {
    localStorage.setItem("dms.significant", '');
  }
}

// 특이사항 텍스트 포맷 구현
function formatText(cmd, value = null) {
  const significantEditor = document.querySelector('.significant-container');

  significantEditor.focus();
  document.execCommand(cmd, false, value);
}

document.addEventListener("DOMContentLoaded", () => {
  currentTime(); // 최초 실행
  setInterval(currentTime, 1000); // 1초마다 갱신

  initSignificant()
})