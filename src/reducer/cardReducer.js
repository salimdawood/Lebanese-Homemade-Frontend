const cardReducer = (state,action)=>{
  switch (action.type) {
    case 'RESET_CARD_PROFILE':
      return {
        id:null,
        title:"",
        type:"",
        faceBookLink:"",
        instagramLink:"",
        whatsAppLink:"",
        dateCreated:"",
        itemList:[],
        photoList:new Array(5).fill(null)
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