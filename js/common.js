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
    

    // 🔵 CSV 파일 경로
const CSV_PATH = "./phonebook.csv";

// 전체 데이터 저장
let phonebookData = [];

// CSV 불러오기 (EUC-KR 깨짐 방지)
fetch(CSV_PATH)
  .then(res => res.arrayBuffer())
  .then(buffer => {
    const decoder = new TextDecoder("euc-kr"); // ← 핵심: EUC-KR로 강제 디코딩
    const csvText = decoder.decode(buffer);

    phonebookData = csvToJson(csvText);
    renderTable(phonebookData);
    renderJson(phonebookData);
  })
  .catch(err => console.error("CSV 읽기 오류:", err));


// CSV → JSON 변환
function csvToJson(csv) {
  const lines = csv
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  const headers = lines[0].split(",").map(h => h.trim());
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map(v => v.trim());
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = values[index] ?? "";
    });

    result.push(obj);
  }

  return result;
}


// 검색 이벤트
document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.trim();

  if (keyword === "") {
    renderTable(phonebookData);
    return;
  }

  const filtered = phonebookData.filter(item =>
    Object.values(item).some(val => val.includes(keyword))
  );

  renderTable(filtered);
});


// undefined 방지
function safe(v) {
  return v === undefined || v === null ? "" : v;
}


// 테이블 렌더링
function renderTable(data) {
  const tbody = document.getElementById("resultTable");
  tbody.innerHTML = "";

  data.forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${safe(row["소속"])}</td>
      <td>${safe(row["성명"])}</td>
      <td>${safe(row["전화번호"])}</td>
      <td>${safe(row["내선번호"])}</td>
    `;

    tbody.appendChild(tr);
  });
}


// JSON 화면 출력
function renderJson(data) {
  document.getElementById("jsonOutput").textContent =
    JSON.stringify(data, null, 2);
}

});
