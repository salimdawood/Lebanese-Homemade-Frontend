const userReducer = (state,action)=>{
  switch (action.type) {
    case 'GET_USER_PROFILE':
      sessionStorage.setItem("userProfile",JSON.stringify(action.userProfile))
      return action.userProfile
    case 'UPDATE_USER_PROFILE':
      sessionStorage.setItem("userProfile",JSON.stringify(action.userProfile))
      return action.userProfile
    default:
      break;
  }

}

export default userReducer