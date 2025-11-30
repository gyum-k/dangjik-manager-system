/* 육사교 - 당직 관리 시스템 공통 JS */
document.addEventListener("DOMContentLoaded", () => {

  // 사이드바 메뉴 기능
  fetch("../sidebar.json")
    .then((res) => res.json())
    .then((data) => {
      const sidebar = document.getElementById("sidebar-nav");

      if (!sidebar) {
        console.error("❌ #sidebar 요소를 찾을 수 없습니다.");
        return;
      }

      // 메뉴 HTML 생성
      const menuHTML = data.menu
        .map((item) => {
          return `
          <div class="nav-item">
            <button class="nav-button" onclick="location.href='${item.link}'">
              <div class="nav-button-content">
                <img class="icon" src="${item.icon}" alt="${item.label} 아이콘" />
                <span class="nav-text">${item.label}</span>
              </div>
            </button>
          </div>
        `;
        })
        .join("");

      // DOM에 삽입
      sidebar.innerHTML = menuHTML;
    })
    .catch((error) => {
      console.error("❌ sidebar.json 로딩 오류:", error);
    });
});
