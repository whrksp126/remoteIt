
// 로그인 타입 별 fetchURL, href
const loginTypeObject = {
  MANAGER : {
    type : 'MANAGER',
    fetchUrl : '',
    href : '/html/client_management.html',
  },
  CLIENT : {
    type : 'CLIENT',
    fetchUrl : '',
    href : '/html/client_management.html',
  },
  USER : {
    type: 'USER',
    fetchUrl : '',
    href : '/html/client_management.html',
  },
}

const type = getValueFromURL('type');
let loginType = 'USER';
if(type){
  loginType = loginTypeObject[type.toUpperCase().replace(/\s+/g, '')].type ?? 'USER';
}


// 매니저 로그인 시
const loginSubmit = async (event) => {
  event.preventDefault();
  const url = loginTypeObject[loginType].fetchUrl;
  const method = 'GET';
  const fetchData = {
    id: document.querySelector('#input_id').value,
    password : document.querySelector('#input_password').value,
    type : loginType,
  };
  console.log(fetchData)
  alert(`${loginType} 로그인 성공`);
  window.location.href = loginTypeObject[loginType].href;

  // URL 연결 용
  // const result = await fetchDataAsync(url, method, fetchData);
  // if(result.code == 200){
  //   window.location.href = loginTypeObject[loginType].href;
  // }else{
  //   alert(result.msg);
  // }
}