// URL에서 파라미터 조회
function getValueFromURL(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  // const paramValue = String(urlParams.get(paramName));
  const paramValue = urlParams.get(paramName);
  if (paramValue) {
    return paramValue;
  } else {
    return false;
  }
}

// 비동기 fetch api
async function fetchDataAsync(url, method, data, form=false){
  let newUrl = url;
  const headers = {'Authorization': `Bearer ${accessToken}`}
  if(!form){ headers['Content-Type'] = `application/json`}
  let fetchOptions = { method,headers};
  if(method !== 'GET' && form) {
    const formData = new FormData();
    formData.append('json_data', JSON.stringify(data.json_data)) 
    data.form_data.forEach(({key, value})=>{
      formData.append(key, value);
    })
    fetchOptions.body = formData
  }
  if(method !== 'GET' && !form){
    fetchOptions.body = JSON.stringify(data);
  }
  if(method == 'GET' || method == 'DELETE'){
    newUrl += `?`
    for (const key in data) {
      const value = data[key];
      newUrl += `${key}=${value}&`;
    }
    console.log(newUrl);
  }
  try {
    const response = await fetch(newUrl, fetchOptions);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error('문제가 발생했습니다.');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 타겟의 부모요소 중 특정 부모가 있는지 찾아서 리턴함
const findParentTarget = (targetEl, parent) => {
  return targetEl.closest(parent);
}



// 뒤로 가기 이벤트 핸들러
const onPopStateHandler = (event) => {
  if (event.state && event.state.modalOpen) {
    removeModal();
  }
};

// 모달 기본 엘리먼트 추가
const openDefaultModal = (isBackClose=true) => {
  removeModal();
  history.replaceState({ modalOpen: true }, '', '');
  history.pushState({ modalOpen: true }, '', '');
  document.querySelector('body').insertAdjacentHTML('beforeend', defaultModalHtml());
  const _modal = document.querySelector('.modal');
  const _modal_content = document.querySelector('.modal_content');
  const _modal_top = document.querySelector('.modal_top');
  const _modal_middle = document.querySelector('.modal_middle');
  const _modal_bottom = document.querySelector('.modal_bottom');  
  _modal.addEventListener('click', event => clickHandler(event, isBackClose));
  window.addEventListener('popstate', onPopStateHandler);

  return { 
    container : _modal, 
    content: _modal_content, 
    top : _modal_top, 
    middle : _modal_middle, 
    bottom : _modal_bottom 
  }
}
const getDefaultModal = () => {
  const _modal = document.querySelector('.modal');
  const _modal_content = document.querySelector('.modal_content');
  const _modal_top = document.querySelector('.modal_top');
  const _modal_middle = document.querySelector('.modal_middle');
  const _modal_bottom = document.querySelector('.modal_bottom');  
  return { 
    container : _modal, 
    content: _modal_content, 
    top : _modal_top, 
    middle : _modal_middle, 
    bottom : _modal_bottom 
  }
}

// 모달 삭제
const removeModal = () => {
  window.removeEventListener('popstate', onPopStateHandler);
  history.replaceState({modalOpen:false}, '', '');
  const _modal = document.querySelector('.modal');
  if(_modal){
    _modal.remove();
  };
}

// 모달 배경 클릭 시 닫기(이벤트 제거)
const clickHandler = (event, isBackClose) => {
  const target = event.target; 
  const isClose = findParentTarget(target, '.close');
  const isBackground = isBackClose ? target.classList.contains('modal') : false;
  if (isBackground || isClose) {
    history.back();
    removeModal();
  };
};

// 모달 기본 틀
const defaultModalHtml = () => `
  <div class="modal">
    <div class="modal_content">
      <div class="modal_top"></div>
      <div class="modal_middle"></div>
      <div class="modal_bottom"></div>
    </div>
  </div>
`
// 모달 TOP
const modalTopHtml = (title, hasX=false) => {
  return `
    <h1>${title}</h1>
    ${hasX?`
    <i class="ph ph-x close"></i>
    `:``}
  `
}

// 모달 BOTTOM AND
const modalBottomHtml = (btns=null) => {
  return `
    ${btns != null ?`
    <div class="buttons">
      ${btns.map((btn)=>`
      <button class="${btn.class}" ${btn.fun}>${btn.text}</button>
      `).join('')}
    </div>
    `:``}
  `
}
