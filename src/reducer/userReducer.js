const userReducer = (state,action)=>{
  switch (action.type) {
    case 'UPDATE_USER_PROFILE':
      sessionStorage.setItem("userProfile",JSON.stringify(action.userProfile))
      return action.userProfile
    case 'DELETE_CARD':
      const newCards = state.cardList.filter(card=>card.id != action.id)
      state.cardList = [...newCards]
      sessionStorage.setItem("userProfile",JSON.stringify(state))
      return {
        ...state,
        cardList : [...newCards]
      }
    default:
      break;
  }

}

export default userReducer