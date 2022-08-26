export const stringifyData=(formData)=>
{   var data={}


formData.append('username',localStorage.getItem('username'))
formData.append('token',localStorage.getItem('token'));
    for(var pair of formData.entries()) {
        data[pair[0]]=pair[1]
     }
       return JSON.stringify(data)
}



export const setCookie=(name,value,expires) =>{
  // var expires = "";
  // if (days) {
  //     var date = new Date();
  //     date.setTime(date.getTime() + (days*24*60*60*1000));
  //     expires = "; expires=" + date.toUTCString();
  // }
  document.cookie = name + "=" + (value || "")  + "; expires="+expires + "; path=/";
}



export const getCookie=(name)=> {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}



export const eraseCookie=(name)=> {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}



export const sortData = (data) => {
  // Call slice to create a new Array and prevent mutating it if it's stored in state
const newData= [...data]
return newData.reverse()
}

export const Authorization=(config)=>
{
  if(getCookie('token'))
  config.headers.Authorization=`Token ${getCookie('token')}`
  return config
}

export const  removeItemOnce=(arr,index) =>{  
  return arr.filter(function(ele,idx){ 
    return idx != index; 
});
}
