/* 육사교 - 당직 관리 시스템 공통 JS */
document.addEventListener("DOMContentLoaded", () => {

  // 사이드바 토글 구현
    const btnToggle = document.getElementById('btn-toggle');
    const sidebar = document.getElementById('site-sidebar');
    let collapsed = true;

    btnToggle.addEventListener('click', ()=>{
      collapsed = !collapsed;
      if(collapsed) sidebar.classList.add('collapsed');
      else sidebar.classList.remove('collapsed');
    });

  // 사이드바 메뉴 구현
  fetch("../sidebar.json")
    .then((res) => res.json())
    .then((data) => {
    const sidebarNav = document.querySelector("#site-sidebar #nav");

      if (!sidebarNav) {
        console.error("❌ #sidebar 요소를 찾을 수 없습니다.");
        return;
      }

      const menuHTML = data.menu
        .map((item) => {
          return `
          <div class="nav-item" data-key="${item.id}" onclick="location.href='${item.link}'">
            <img class="icon" src="${item.icon}" alt="${item.label} 아이콘" />
            <div class="label">${item.label}</div>
          </div>
        `;
        })
        .join("");

      sidebarNav.innerHTML = menuHTML;
    })
    .catch((error) => {
      console.error("❌ sidebar.json 로딩 오류:", error);
    });
});
