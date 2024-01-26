
// 로그인 타입 별 fetchURL, href
const loginTypeObject = {
  MANAGER : {
    type : 'MANAGER',
    fetchUrl : '',
    href : '/html/client_management.html',
    kr_name : '관리자',
  },
  CLIENT : {
    type : 'CLIENT',
    fetchUrl : '',
    href : '/html/user_management.html',
    kr_name : '고객사',
  },
  USER : {
    type: 'USER',
    fetchUrl : '',
    href : '',
    kr_name : '사용자',
  },
}

const type = getValueFromURL('type');
let loginType = 'USER';
if(type){
  loginType = loginTypeObject[type.toUpperCase().replace(/\s+/g, '')].type ?? 'USER';
}

// 로그인 페이지 h2 변경
document.querySelector('.title_box h2 em').innerHTML = loginTypeObject[loginType].kr_name;


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