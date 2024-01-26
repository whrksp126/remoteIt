// 모바일 사이드 바 열기
const clickShowMobileSidebar = (event) => {
  document.querySelector('.sidebar_mobile').classList.add('active');
}
// 모바일 사이드 바 닫기
const clickHiddenMobileSidebar = (event) => {
  document.querySelector('.sidebar_mobile').classList.remove('active');
}

// 고객사 생성 버튼 클릭 시
const clickAddClientBtn = (event) => {
  const _tbody = document.querySelector('main .container .content table tbody');
  _tbody.insertAdjacentHTML('afterbegin', `<tr>${clientInputTdHtml('Add', {id:'',name:'',cpu:'',ram:''})}</tr>`);
}

// 고객사 생성 저장 버튼 클릭 시
const clickSaveAddData = (event) => {
  const _tr = findParentTarget(event.target,'tr');
  const data = {
    id :_tr.querySelector('input#id').value,
    name :_tr.querySelector('input#name').value,
    cpu :_tr.querySelector('input#cpu').value,
    ram :_tr.querySelector('input#ram').value,
  }
  // 임시 코드 
  _tr.innerHTML = clientInputTdCancelHtml(data);

  // api 호출 용 주석 제거 후 사용하기
  // const url = ``;
  // const method = '';
  // const fetchData = {};
  // const result = await fetchDataAsync(url, method, fetchData);
  // if(result.code == 200){
  //   _tr.innerHTML = clientInputTdCancelHtml(data);
  // }else{
  //   alert(result.msg);
  // }
}

// 고객사 생성 취소 버튼 클릭 시
const clickCancelAddBtn = (event) => {
  const _tr = findParentTarget(event.target,'tr');
  _tr.remove();
}

// 고객사 수정 버튼 클릭 시
const clickEditClientBtn = (event) => {
  const _tr = findParentTarget(event.target,'tr');
  const data = {
    id : _tr.querySelector('[data-type="id"]').dataset.value,
    name : _tr.querySelector('[data-type="name"]').dataset.value,
    cpu : _tr.querySelector('[data-type="cpu"]').dataset.value,
    ram : _tr.querySelector('[data-type="ram"]').dataset.value,
  }
  _tr.innerHTML = clientInputTdHtml('Edit', data);
}

// 고객사 수정 저장 버튼 클릭 시
const clickSaveEditData = (event) => {
  
}
// 고객사 수정 취소 버튼 클릭 시
const clickCancelEditBtn = (event) => {
  const _tr = findParentTarget(event.target, 'tr');  
  const _button = findParentTarget(event.target, 'button');  
  const data = {
    id: _button.dataset.id,
    name: _button.dataset.name,
    cpu: _button.dataset.cpu,
    ram: _button.dataset.ram,
  }
  _tr.innerHTML = clientInputTdCancelHtml(data);
}

// 고객사 삭제 버튼 클릭 시
const clickDeleteClentBtn = async (event) => {
  const _tr = findParentTarget(event.target,'tr');
  const data = {
    id : _tr.querySelector('[data-type="id"]').dataset.value,
    name : _tr.querySelector('[data-type="name"]').dataset.value,
    cpu : _tr.querySelector('[data-type="cpu"]').dataset.value,
    ram : _tr.querySelector('[data-type="ram"]').dataset.value,
  }
  if(confirm(`${data.name} 고객사를 정말 삭제하시겠습니까??`) == true){ 
    // 임시 코드
    _tr.remove();

    // api 호출 용 주석 제거 후 사용하기
    // const url = ``;
    // const method = '';
    // const fetchData = {};
    // const result = await fetchDataAsync(url, method, fetchData);
    // if(result.code == 200){
    //   _tr.remove();
    // }else{
    //   alert(result.msg);
    // }
  }else{   //취소
    return false;
  }
}

// 클라이언트 수정 취소 용 td HTML 
const clientInputTdCancelHtml = (data) => {
  return `
    <td data-type="id" data-value="${data.id}">${data.id}</td>
    <td data-type="name" data-value="${data.name}">${data.name}</td>
    <td data-type="cpu" data-value="${data.cpu}">${data.cpu}</td>
    <td data-type="ram" data-value="${data.ram}">${data.ram}</td>
    <td>
      <button onclick="clickEditClientBtn(event)">수정</button>
      <button onclick="clickDeleteClentBtn(event)">삭제</button>
    </td>
  `
}

// 클라이언트 수정 용 td HTML
const clientInputTdHtml = (type, data) => {
  return `
    <td><input id="id" type="text" value="${data.id}" size="1"></td>
    <td><input id="name" type="text" value="${data.name}" size="1"></td>
    <td><input id="cpu" type="text" value="${data.cpu}" size="1"></td>
    <td><input id="ram" type="text" value="${data.ram}" size="1"></td>
    <td>
      <button onclick="clickSave${type}Data(event)">저장</button>
      <button onclick="clickCancel${type}Btn(event)" 
        data-id="${data.id}"
        data-name="${data.name}"
        data-cpu="${data.cpu}"
        data-ram="${data.ram}"
      >취소</button>
    </td>
  `
}
