const cardReducer = (state,action)=>{
  switch (action.type) {
    case 'GET_USER_PROFILE':
      sessionStorage.setItem("userProfile",JSON.stringify(action.userProfile))
      return action.userProfile
    case 'UPDATE_CARD_PROFILE':
      //sessionStorage.setItem("userProfile",JSON.stringify(action.userProfile))
      return action.cardProfile
    default:
      break;
  }

}

export default cardReducer