const userReducer = (state,action)=>{
  switch (action.type) {
    case 'ADD_USER_PROFILE':
      sessionStorage.setItem("userProfile",JSON.stringify(action.payload.userProfile))
      if(action.payload.checked){
        let user ={
          name:action.payload.userProfile.name,
          password:action.payload.userProfile.password
        }
        localStorage.setItem("userProfile",JSON.stringify(user))
      }else{
        localStorage.removeItem("userProfile")
      }
      return action.payload.userProfile
    case 'UPDATE_USER_PROFILE':
      sessionStorage.setItem("userProfile",JSON.stringify(action.userProfile))
      let checked = JSON.parse(localStorage.getItem("userProfile"))
        if(checked != null){
          let user ={
            name:action.userProfile.name,
            password:action.userProfile.password
          }
          localStorage.setItem("userProfile",JSON.stringify(user))
        }
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
    case 'LOG_OUT':
        sessionStorage.removeItem("userProfile")
        sessionStorage.removeItem("card")  
        localStorage.removeItem("userProfile")
        return {
          id:null,
          name:null,
          email:null,
          location:null,
          password:null,
          cardList:[]
        }
    default:
      break;
  }

}

export default userReducer