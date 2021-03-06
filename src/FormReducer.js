
import React from 'react';	
 
function reducer(state = { 
  name:"",
  email:"",
  phone:"",
  address:"",
  skills:[],
  edu:[],
  exp:[],
}, action){
switch (action.type) {
    case "FORM":
      console.log(action.payLoad);
      state = {...action.payLoad}
      console.log(state);
    return {...state};
    default:
      return {...state};
  }
}
 
export default reducer;