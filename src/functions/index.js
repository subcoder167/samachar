export const stringifyData=(formData)=>
{   var data={}

formData.append('username',localStorage.getItem('username'))
formData.append('token',localStorage.getItem('access'));
    for(var pair of formData.entries()) {
        data[pair[0]]=pair[1]
     }
       return JSON.stringify(data)
}

export const sortData = (data) => {
  // Call slice to create a new Array and prevent mutating it if it's stored in state
const newData= [...data]
return newData.reverse()
}

export const Authorization=(config)=>
{
  if(localStorage.getItem('access'))
  config.headers.Authorization=`Bearer ${localStorage.getItem('access')}`
  return config
}

