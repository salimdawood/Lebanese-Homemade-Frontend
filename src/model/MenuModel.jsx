import React,{useContext,useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import reactDom from 'react-dom'
//context
import { notificationContext } from '../context/notificationContext'
import { cardContext } from '../context/cardContext'
//components
import ReadOnlyItemBox from '../components/ReadOnlyItemBox'
import UpdateItemBox from '../components/UpdateItemBox'
import FormInput from '../components/FormInput'
import Loading from '../components/Loading'
import ModelFunctionality from '../components/ModelFunctionality'
//api
import * as Axios from 'axios'
import { URL_PATH } from '../constantVariables/path'
//unique id
import { nanoid } from 'nanoid'
//input for form
import { itemInfoInput } from '../constantVariables/itemInfoInput'

const MenuModel = () => {

  //notification for better ui
  const [isLoading,setIsLoading] = useState(false)
  const {setNotification,closeNotification} = useContext(notificationContext)

  const {menuModel,setMenuModel,dispatch,cardProfile} = useContext(cardContext)
  
  
  //local state
  const [itemInput,setItemInput] = useState({
    name:"",
    price:""
  })
  const [editItemInput,setEditItemInput] = useState({
    name:"",
    price:""
  })
  const [editTarget,setEditTarget] = useState(null)
  const [items,setItems] = useState([])


  //detect whether we are in a update or create state 
  const location = useLocation()
  let inExistingCard = location.pathname.includes('/cards')? true :false 
  //change the displaying items depending on our current card state
  useEffect(() => {
    if(menuModel){
      //console.log("menu model rendered.....")
      if(inExistingCard){
        let tmpItems = JSON.parse(sessionStorage.getItem("card"))
        try {
          if(tmpItems.menu !== null){
            setItems(tmpItems.menu.itemList)
          }
          return
        }catch(Exception){}
      }
      setItems([])  
    }
    },[menuModel])

  //handle the local state
  const handleChange = (e) =>{
    setItemInput({...itemInput,[e.target.name]:e.target.value})
  }
  const handleEditChange = (e) =>{
    setEditItemInput({...editItemInput,[e.target.name]:e.target.value})
  }

  //add to local state
  const addItem = (e)=>{
    e.preventDefault()
    const newItem ={
      id:nanoid(),
      name:itemInput.name,
      price:itemInput.price.length===0?null:itemInput.price
    }
    setItems([...items,newItem])
    setItemInput({name:"",price:""})
  }

  //remove item from local state
  const removeItem = (itemId) =>{
    setItems([...items.filter(item=>item.id !== itemId)])
  }

  const editItem = (editCode,itemId) =>{
    switch (editCode) {
      //open the edit form
      case 0:
        setEditItemInput(...items.filter(item=>item.id === itemId))
        setEditTarget(itemId)
        break;
      //cancel the edit
      case -1:
        setEditItemInput({name:"",price:""})
        setEditTarget(null)
        break;
      //save the edit
      case 1:
        if(editItemInput.name.match(/^[a-zA-Z0-9\u0621-\u064A\u0660-\u0669 ']{3,50}$/g)
         && editItemInput.price.match(/^[lL0-9\u0660-\u0669,$.]{0,20}$/g)){
          setItems([...items.filter(item=>item.id !== itemId),editItemInput])
          setEditTarget(null)  
        }
        else{
          setNotification({isShown:true,message:"Name should be between 3-50 characters and can only contain letters, numbers, ' , and spaces, price must range between 0 - 99,000,000",color:"red"})
          closeNotification()
        }
        break;
      default:
        break;
    }
  }

  //for card update
  const deleteItems = async() =>{
    //delete all menu items from database
    isLoading(true)
    let tmpItems = JSON.parse(sessionStorage.getItem("card"))
    if(tmpItems.menu !== null){
      try {
        const result = await Axios.delete(URL_PATH+`menus/${tmpItems.menu.id}`)
        switch (result.data) {
          case 1:
            setNotification({isShown:true,message:"All items were deleted successfully",color:"green"})
            closeNotification()
            //delete all the menu items from local state
            setItems([])
            //check if need to update session storage
            //update the session
            tmpItems.menu.itemList.$values = []
            sessionStorage.setItem("card",JSON.stringify(tmpItems))
            setMenuModel(false)
            break;
          default:
            setNotification({isShown:true,message:"Something went wrong",color:"red"})
            closeNotification()
            break;
        }
        //console.log(result)
      }catch (error) {
        //console.log(error)
        setNotification({isShown:true,message:"Something went wrong",color:"red"})
        closeNotification() 
      }
      setIsLoading(true)
    }
  }

  const updateItems = async() =>{
    //update the menu items from the database
    setIsLoading(true)
    let tmpItems = JSON.parse(sessionStorage.getItem("card"))
    //console.log(items)
    try {
      const result = await Axios.put(URL_PATH+`menus/${tmpItems.id}`,items)
      //console.log(result)
      switch (result.data) {
        case 1:
          setNotification({isShown:true,message:"Menu updated successfully",color:"green"})
          closeNotification()
          //update the session
          tmpItems.menu.itemList.$values = items
          sessionStorage.setItem("card",JSON.stringify(tmpItems))
          setMenuModel(false)
          break;
        default:
          setNotification({isShown:true,message:"Something went wrong",color:"red"})
          closeNotification()
          break;
      } 
    } catch (error) {
      setNotification({isShown:true,message:"Something went wrong",color:"red"})
      closeNotification()
      //console.log(error)
    }
    setIsLoading(false)
  }

  //for card create
  //add items to card information context from local state to global
  const confirmItems = () =>{
    dispatch({type:'ADD_MENU',items})
    setMenuModel(false)
  }

  //cancel all changes 
  const cancelChanges = () =>{
    if(inExistingCard){
      let tmpItems = JSON.parse(sessionStorage.getItem("card"))
      if(tmpItems.menu !== null){
        setItems(tmpItems.menu.itemList)
      }
    }
    else{
      setItems(cardProfile.itemList)
    } 
    setMenuModel(false)
  }

  let model_functionality_props = {
    inExistingCard,
    updateItems,
    deleteItems,
    cancelChanges,
    confirmItems
  }

  return (
    menuModel && reactDom.createPortal(
      <>
      {isLoading && <Loading/>}
      <div className="model">
        <div className="model-container">
          <form className="table-form">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  items
                  .sort(function(a, b){
                    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                    if (nameA < nameB)
                     return -1;
                    if (nameA > nameB)
                     return 1;
                    return 0;
                   })
                  .map((item)=>(
                        editTarget === item.id ?
                        <UpdateItemBox key={item.id} item={editItemInput} editItem={editItem} onChange={handleEditChange} /> : 
                        <ReadOnlyItemBox key={item.id} item={item} removeItem={removeItem} editItem={editItem}/>
                    )
                  )
                }
              </tbody>
            </table>
          </form>
          <form onSubmit={addItem} className="add-item-form">
            <div className="form-input">
              <div className="input-container">
                {
                  itemInfoInput.map((input)=>(
                    <FormInput
                    key={input.id}
                    {...input}
                    value={itemInput[input.name]}
                    onChange={handleChange} />
                  ))
                }
              </div>
            </div>
            <input type="submit" value="Add to menu"/>
          </form>
          <ModelFunctionality {...model_functionality_props}/>
          </div>
      </div>
    
      </>
      ,document.getElementById('model')
    )
  )
}

export default MenuModel
/*
{inExistingCard ? 
          <>
            <input type="submit" onClick={updateItems} className="confirm-btn" value="Update"/>
            <input type="submit" onClick={deleteItems} className="delete-btn" value="Delete all items"/>
          </>
          :
          <>
            <input type="submit" onClick={confirmItems} className="confirm-btn" value="Confirm"/>
          </>
          }
          <input type="submit" onClick={cancelChanges} className="safety-btn" value="Cancel"/> 
*/