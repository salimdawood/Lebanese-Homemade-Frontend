const cardReducer = (state,action)=>{
  switch (action.type) {
    case 'GET_USER_PROFILE':
      sessionStorage.setItem("userProfile",JSON.stringify(action.userProfile))
      return action.userProfile
    case 'UPDATE_CARD_PROFILE':
      //sessionStorage.setItem("userProfile",JSON.stringify(action.userProfile))
      return action.cardProfile
    case 'DELETE_CARD':
      //sessionStorage.setItem("userProfile",JSON.stringify(action.userProfile))
      const newCards = state.cardList.filter(card=>card.id != state.id)
      console.log(newCards)
      return state
      /*
      return {
        ...state,
        cardList : newCards
      }
      */
    case 'ADD_PHOTO':
      //sessionStorage.setItem("userProfile",JSON.stringify(action.userProfile))
      console.log(action.photo)
      return state
    default:
      break;
  }

}

export default cardReducer