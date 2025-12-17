/* 육사교 - 당직 관리 시스템 공통 JS */

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

// 테마 토글 구현
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme") || "light";
  const theme = currentTheme === "light" ? "dark" : "light";

  html.setAttribute("data-theme", theme);
  localStorage.setItem("dms.theme", theme);
}

// 사이드바 토글 구현
function sidebarToggle() {
  document.querySelector('#site-sidebar').classList.toggle('collapsed');
}

// 사이드바 화면 구현
function initSidebar() {
  const sidebarNav = document.querySelector("#site-sidebar .sidebar-nav ul");

  const sidebarHTML = sidebar_data.map((x) => {
    return `
      <li data-key="${x.id}">
        <button class="nav-button" onclick="location.href='${x.link}'">
          <img class="icon" src="${x.icon}" alt="${x.label} 아이콘" />
          <span class="title">${x.label}</span>
        </button
      </li>
    `;
  }).join("");

  sidebarNav.innerHTML = sidebarHTML;
}

// 프로필 드롭다운 구현
function initProfile() {
  const savedProfile = localStorage.getItem("dms.profile-list");

  if (!savedProfile) {
    const profileAvater = document.querySelector('#profile-dropdown .profile-toggle .avatar');
    const profileName = document.querySelector('#profile-dropdown .profile-toggle .name');
    const profileRank = document.querySelector('#profile-dropdown .profile-toggle .rank');
    const dropdownList = document.querySelector("#profile-dropdown .dropdown-menu .dropdown-list");

    const currentProfile = profile_data.find(x => x.selected);

    profileAvater.innerText = currentProfile.name[0];
    profileName.innerText = currentProfile.name;
    profileRank.innerText = currentProfile.rank;  

    const profileHTML = profile_data.filter(d => !d.selected).map((x) => {
      return `
        <div class="dropdown-item" data-key="${x.key}">
          <div class="avatar" style="width: 32px; height: 32px; font-size: 0.75rem;">${x.name[0]}</div>
            <div class="content">
              <div class="name">${x.name}</div>
              <div class="rank">${x.rank}</div>
            </div>
        </div>
      `;
    }).join("");
  
    dropdownList.innerHTML = profileHTML;
  } else {
    initProfileList()
  }
}

function initProfileList() {
  const profileAvater = document.querySelector('#profile-dropdown .profile-toggle .avatar');
  const profileName = document.querySelector('#profile-dropdown .profile-toggle .name');
  const profileRank = document.querySelector('#profile-dropdown .profile-toggle .rank');
  const dropdownList = document.querySelector("#profile-dropdown .dropdown-menu .dropdown-list");

  const savedProfile = localStorage.getItem("dms.profile-list");

  const currentProfile = JSON.parse(savedProfile).find(x => x.selected);
  const profileList = JSON.parse(savedProfile).filter(x => !x.selected)

  profileAvater.innerText = currentProfile.name[0];
  profileName.innerText = currentProfile.name;
  profileRank.innerText = currentProfile.rank;

  const profileHTML = profileList.map((x) => {
    return `
      <div class="dropdown-item" data-key="${x.key}">
        <div class="avatar" style="width: 32px; height: 32px; font-size: 0.75rem;">${x.name[0]}</div>
          <div class="content">
            <div class="name">${x.name}</div>
            <div class="rank">${x.rank}</div>
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
