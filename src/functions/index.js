export const stringifyData = (formData) => {
  var data = {}


  formData.append('username', localStorage.getItem('username'))
  formData.append('token', localStorage.getItem('token'));
  for (var pair of formData.entries()) {
    data[pair[0]] = pair[1]
  }
  return JSON.stringify(data)
}

export const generateObject = (formData) => {
  var data = {}
  for (var pair of formData.entries()) {
    data[pair[0]] = pair[1]
  }
  return JSON.stringify(data)
}


export const generateFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}

export const getAuth = () => {
  return {
    token: localStorage.getItem('token'),
    roles: localStorage.getItem('roles'),
  }
}

export const eraseAuth = () => {
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token')
  }
  if (localStorage.getItem('roles')) {
    localStorage.removeItem('roles')
  }
  if (localStorage.getItem('username')) {
    localStorage.removeItem('username')
  }
  if (localStorage.getItem('first_name')) {
    localStorage.removeItem('first_name')
  }
  if (localStorage.getItem('last_name')) {
    localStorage.removeItem('last_name')
  }
}


export const setCookie = (name, value, expires = 24 * 60 * 60 * 1000) => {
  // var expires = "";
  // if (days) {
  //     var date = new Date();
  //     date.setTime(date.getTime() + (days*24*60*60*1000));
  //     expires = "; expires=" + date.toUTCString();
  // }
  document.cookie = name + "=" + (value || "") + "; expires=" + expires + "; path=/";
}



export const getCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}



export const eraseCookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}



export const sortData = (data) => {
  // Call slice to create a new Array and prevent mutating it if it's stored in state
  const newData = [...data]
  return newData.reverse()
}

export const Authorization = (config) => {
  if (getCookie('token'))
    config.headers.Authorization = `Token ${getCookie('token')}`
  return config
}

export const removeItemOnce = (arr, index) => {
  return arr.filter(function (ele, idx) {
    return idx != index;
  });
}

export const generateRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const generateArray = (data) => {

  if (data.split(",")[0])
    return data.split(',').map(String)

  return new Array(data)
}