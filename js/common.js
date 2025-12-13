/* 육사교 - 당직 관리 시스템 공통 JS */

const sidebar_data = [
  {
    id: "dms-v1",
    label: "대쉬보드",
    icon: "./img/svg/analytic-icon.svg",
    link: "./가이드라인/design-v1.html",
  },
  {
    id: "dms-v2",
    label: "전화번호부",
    icon: "./img/svg/people-icon.svg",
    link: "/",
  },
  {
    id: "dms-v3",
    label: "캘린더",
    icon: "./img/svg/calendar-icon.svg",
    link: "/",
  },
  {
    id: "dms-v4",
    label: "앱",
    icon: "./img/svg/project-icon.svg",
    link: "/",
  },
  {
    id: "dms-v5",
    label: "설정",
    icon: "./img/svg/setting-icon.svg",
    link: "/",
  },
];

const profile_data = [
  {
    id: "dms-profile-1",
    name: "김철수",
    rank: "일병",
    selected: true,
  },
  {
    id: "dms-profile-2",
    name: "이영희",
    rank: "상병",
    selected: false,
  },
  {
    id: "dms-profile-3",
    name: "박영재",
    rank: "상병",
    selected: false,
  },
  {
    id: "dms-profile-4",
    name: "한아름",
    rank: "상병",
    selected: false,
  },
];

// 테마 초기화
function initTheme() {
  const savedTheme = localStorage.getItem("dms.theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = prefersDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dms.theme", theme);
  }
}

// 사이드바 토글 구현
function sidebarToggle() {
  document.querySelector('#site-sidebar').classList.toggle('collapsed');
}

// 사이드바 화면 구현
function initSidebar() {
  const sidebarNav = document.querySelector("#site-sidebar .sidebar-nav ul");

  const sidebarHTML = sidebar_data.map((item) => {
    return `
      <li data-key="${item.id}">
        <button class="nav-button" onclick="location.href='${item.link}'">
          <img class="icon" src="${item.icon}" alt="${item.label} 아이콘" />
          <span class="title">${item.label}</span>
        </button
      </li>
    `;
  }).join("");

  sidebarNav.innerHTML = sidebarHTML;
} 

// 테마 토글 구현
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme") || "light";
  const theme = currentTheme === "light" ? "dark" : "light";

  html.setAttribute("data-theme", theme);
  localStorage.setItem("dms.theme", theme);
}

// 프로필 드롭다운 구현
function initProfile() {
  const dropdownList = document.querySelector("#profile-dropdown .dropdown-menu .dropdown-list");

  const profileHTML = profile_data.map((item) => {
    return `
      <div class="dropdown-item" data-key="${item.key}">
        <div class="avatar" style="width: 32px; height: 32px; font-size: 0.75rem;">${item.name[0]}</div>
          <div class="content">
            <div class="text">${item.name}</div>
            <div class="rank">${item.rank}</div>
          </div>
      </div>
    `;
  }).join("");

  dropdownList.innerHTML = profileHTML;
}

// 프로필 토글 구현
function toggleProfile() {
  const dropdown = document.getElementById('profile-dropdown');
  dropdown.classList.toggle('open');
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme(); // 테마 초기화
  initSidebar(); // 사이드바 화면 구현
  initProfile(); // 프로필 드롭다운 구현
});
