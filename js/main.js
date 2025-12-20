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

  // 딜레이 계산
  const delay = 1000 - now.getMilliseconds();
  setTimeout(currentTime, delay);
}

// 오늘의 명언
function todayMotto() {
  let today = new Date().toISOString().split("T")[0];
  let savedMotto = localStorage.getItem("dms.motto");
  let parseMotto = savedMotto && JSON.parse(savedMotto);

  if (!parseMotto || parseMotto.date !== today) {
    const random = motto_data[Math.floor(Math.random() * motto_data.length)];

    parseMotto = {
      date: today,
      quote_text: random.quote_text,
      quote_author: random.quote_author
    };

    localStorage.setItem("dms.motto", JSON.stringify(parseMotto));
  }

  document.querySelector(".quote-text").innerText = `${parseMotto.quote_text}`;
  document.querySelector(".quote-author").innerText = `${parseMotto.quote_author}`;
}

// 특이사항 텍스트 포맷 구현
function formatText(cmd, value = null) {
  const significantEditor = document.querySelector(".significant-container");

  significantEditor.focus();
  document.execCommand(cmd, false, value);
}

document.addEventListener("DOMContentLoaded", () => {
  currentTime(); // 현재 시각
  todayMotto(); // 오늘의 명언
})