const homeReducer = (state,action)=>{
  switch (action.type) {
    case 'UPDATE_HOME':
      return action.home
    default:
      break;
  }
}

export default homeReducer