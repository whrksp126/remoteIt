// 모바일 사이드 바 열기
const clickShowMobileSidebar = (event) => {
  document.querySelector('.sidebar_mobile').classList.add('active');
}
const clickHiddenMobileSidebar = (event) => {
  document.querySelector('.sidebar_mobile').classList.remove('active');
}