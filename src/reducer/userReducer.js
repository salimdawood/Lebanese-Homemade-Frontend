const userReducer = (state,action)=>{
  switch (action.type) {
    case 'USER_PROFILE':
      return action.userProfile
    default:
      break;
  }

}

export default userReducer