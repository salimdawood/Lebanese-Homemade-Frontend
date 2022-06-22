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
    case 'UPDATE_USER_CARD':
      const cardListTmp = state.cardList
      let index = cardListTmp.findIndex(card=>card.id === action.cardInfo.id)
      cardListTmp[index].title = action.cardInfo.title
      cardListTmp[index].type = action.cardInfo.type

      state.cardList = [...cardListTmp]
      sessionStorage.setItem("userProfile",JSON.stringify(state))

      return {
        ...state,
        cardList :[...cardListTmp]
      }
    default:
      break;
  }

}

export default userReducer