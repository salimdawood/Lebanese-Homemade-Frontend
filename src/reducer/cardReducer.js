const cardReducer = (state,action)=>{
  switch (action.type) {
    case 'UPDATE_CARD_PROFILE':
      //sessionStorage.setItem("userProfile",JSON.stringify(action.userProfile))
      return {
        ...state,
        id:action.cardProfile.id,
        title:action.cardProfile.title,
        type:action.cardProfile.type,
        faceBookLink:action.cardProfile.faceBookLink,
        instagramLink:action.cardProfile.instagramLink,
        whatsAppLink:action.cardProfile.whatsAppLink,
        dateCreated:action.cardProfile.dateCreated,
        photoList: action.cardProfile.photoList ? action.cardProfile.photoList : new Array(5).fill(null),
        itemList: action.cardProfile.menu ? action.cardProfile.menu : [] 
      }
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