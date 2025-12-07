/* 육사교 - 당직 관리 시스템 공통 JS */
document.addEventListener("DOMContentLoaded", () => {

    // 사이드바 토글
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('#site-sidebar');

    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    })

  // 사이드바 메뉴
  fetch("./sidebar.json")
    .then((res) => res.json())
    .then((data) => {
    const sidebarNav = document.querySelector("#site-sidebar .sidebar-nav ul");

      if (!sidebarNav) {
        console.error("❌ #sidebar 요소를 찾을 수 없습니다.");
        return;
      }

      const menuHTML = data.menu
        .map((item) => {
          return `
          <li data-key="${item.id}">
            <button class="nav-button" onclick="location.href='${item.link}'">
              <img class="icon" src="${item.icon}" alt="${item.label} 아이콘" />
              <span>${item.label}</span>
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