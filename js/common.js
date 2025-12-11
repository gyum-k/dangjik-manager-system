/* 육사교 - 당직 관리 시스템 공통 JS */
document.addEventListener("DOMContentLoaded", () => {

  // 테마 초기화
  function initTheme() {
    const savedTheme = localStorage.getItem('dms.theme');

    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = prefersDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('dms.theme', theme);
    }
  }

  initTheme()

  // 테마 토글 구현
  const themeToggle = document.querySelector('.theme-toggle');

  themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const theme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', theme);
    localStorage.setItem('dms.theme', theme);
  })

  // 프로필 드롭다운 구현
  const profileToggle = document.querySelector('.profile-toggle');

  profileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.classList.toggle('open');
  })

  fetch("../profile.json")
    .then((res) => res.json())
    .then((data) => {
    const dropdownList = document.querySelector("#profile-dropdown .dropdown-menu .dropdown-list");

      if (!dropdownList) {
        console.error("❌ #dropdown-list 요소를 찾을 수 없습니다.");
        return;
      }

      const profileHTML = data.map((item) => {
        return `
          <div class="dropdown-item" data-key="${item.key}">
            <div class="avatar" style="width: 32px; height: 32px; font-size: 0.75rem;">${item.name[0]}</div>
              <div class="content">
                <div class="text">${item.name}</div>
                <div class="rank">${item.rank}</div>
              </div>
            </div>
        `;
        })
        .join("");

      dropdownList.innerHTML = profileHTML;
    })
    .catch((error) => {
      console.error("❌ profile.json 로딩 오류:", error);
    });
  
  // 사이드바 토글
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('#site-sidebar');

  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  })

  // 사이드바 메뉴
  fetch("../sidebar.json")
    .then((res) => res.json())
    .then((data) => {
    const sidebarNav = document.querySelector("#site-sidebar .sidebar-nav ul");

      if (!sidebarNav) {
        console.error("❌ #sidebar 요소를 찾을 수 없습니다.");
        return;
      }

      const menuHTML = data.map((item) => {
        return `
          <li data-key="${item.id}">
            <button class="nav-button" onclick="location.href='${item.link}'">
              <img class="icon" src="${item.icon}" alt="${item.label} 아이콘" />
              <span class="title">${item.label}</span>
            </button
          </li>
        `;
        })
        .join("");

      sidebarNav.innerHTML = menuHTML;
    })
    .catch((error) => {
      console.error("❌ sidebar.json 로딩 오류:", error);
    });
});