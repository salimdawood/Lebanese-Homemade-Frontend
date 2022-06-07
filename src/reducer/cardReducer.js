const cardReducer = (state,action)=>{
  switch (action.type) {
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
    case 'ADD_PHOTOS':
      return {
        ...state,
        photoList:action.photos
      }
    case 'ADD_MENU':
      return {
        ...state,
        itemList:action.items
      }
    default:
      break;
  }
}

export default cardReducer