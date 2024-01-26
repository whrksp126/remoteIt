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