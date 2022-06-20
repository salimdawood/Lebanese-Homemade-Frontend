import React,{useContext,useState,useEffect} from 'react'
import reactDom from 'react-dom'
import {Close} from '../components/Svg'
import { cardContext } from '../context/cardContext'
import ReadOnlyItemBox from '../components/ReadOnlyItemBox'
import UpdateItemBox from '../components/UpdateItemBox'
import { nanoid } from 'nanoid'
import { notificationContext } from '../context/notificationContext'
import { useLocation } from 'react-router-dom'
import * as Axios from 'axios'
import { URL_PATH } from '../path'

const MenuModel = () => {

  const {setNotification} = useContext(notificationContext)
  const {menuModel,setMenuModel,dispatch,cardProfile} = useContext(cardContext)
  
  //detect whether we are in a update or create state 
  const location = useLocation()
  let inExistingCard = location.pathname.includes('/cards')? true :false 
  
  //local state
  const [itemInput,setItemInput] = useState({
    name:"",
    price:0
  })
  const [editItemInput,setEditItemInput] = useState({
    name:"",
    price:0
  })
  const [editTarget,setEditTarget] = useState(null)
  const [items,setItems] = useState([])

  //change the displaying items depending on our current card state
  useEffect(() => {
    if(inExistingCard){
      let tmpItems = JSON.parse(sessionStorage.getItem("card"))
      if(tmpItems.menu !== null){
        setItems(tmpItems.menu.itemList.$values)
      }
    }
    else{
      setItems(cardProfile.itemList)
    } 
  },[location])

  //handle the local state
  const handleChange = (e) =>{
    setItemInput({...itemInput,[e.target.name]:e.target.value})
  }
  const handleEditChange = (e) =>{
    setEditItemInput({...editItemInput,[e.target.name]:e.target.value})
  }

  const addItem = (e)=>{
    e.preventDefault()
    const newItem ={
      id:nanoid(),
      name:itemInput.name,
      price:itemInput.price
    }
    setItems([...items,newItem])
    setItemInput({name:"",price:0})
  }

  const removeItem = (itemId) =>{
    //remove item from local state
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
        setEditItemInput({name:"",price:0})
        setEditTarget(null)
        break;
      //save the edit
      case 1:
        if(editItemInput.price >= 0 && editItemInput.price <= 99000000 ){
          setItems([...items.filter(item=>item.id !== itemId),editItemInput])
          setEditTarget(null)  
        }
        else{
          setNotification({isShown:true,message:"Price must range between 0 - 99,000,000",color:"red"})
        }
        break;
      default:
        break;
    }
  }

  //for card update
  const deleteItems = () =>{
    //delete all menu items from database
    let tmpItems = JSON.parse(sessionStorage.getItem("card"))
    if(tmpItems.menu !== null){
      Axios.delete(URL_PATH+`menus/${tmpItems.menu.id}`)
      .then(result=>{
        switch (result.data) {
          case 1:
            setNotification({isShown:true,message:"All items were deleted successfully",color:"green"})
            //delete all the menu items from local state
            setItems([])
            //check if need to update session storage
            //update the session
            tmpItems.menu.itemList.$values = []
            console.log(tmpItems)
            sessionStorage.setItem("card",JSON.stringify(tmpItems))
            break;
          default:
            setNotification({isShown:true,message:"Something went wrong",color:"red"})
            break;
        }
        console.log(result)
      }
      ,error=>{
        console.log(error)
        setNotification({isShown:true,message:"Something went wrong",color:"red"})
      })
    }
  }
  const updateItems = () =>{
    //update the menu items from the database
    let tmpItems = JSON.parse(sessionStorage.getItem("card"))
    Axios.put(URL_PATH+`menus/${tmpItems.id}`,items)
      .then(result=>{
        console.log(result)
        switch (result.data) {
          case 1:
            setNotification({isShown:true,message:"Menu updated successfully",color:"green"})
            //update the session
            tmpItems.menu.itemList.$values = items
            sessionStorage.setItem("card",JSON.stringify(tmpItems))
            break;
          default:
            setNotification({isShown:true,message:"Something went wrong",color:"red"})
            break;
        }
      }
      ,error=>{
        setNotification({isShown:true,message:"Something went wrong",color:"red"})
        console.log(error)
      })
  }
  //for card create
  const confirmItems = () =>{
    //add items to card information context
    dispatch({type:'ADD_MENU',items})
  }

  return (
    menuModel && reactDom.createPortal(
      <div className="model">
        <div className="model-container">
          <Close onClick={()=>setMenuModel(false)}/>
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
                <label>Name *</label>
                <input type="text" placeholder="Enter item name"
                 value={itemInput.name} onChange={handleChange} name="name" required/>
              </div>
              <div className="input-container">
                <label>Price</label>
                <input type="number" placeholder="Enter item price"
                 value={itemInput.price} onChange={handleChange} name="price" min="0"
                 max="99000000"/>
              </div>
            </div>
            <input type="submit" value="Add to menu"/>
          </form>
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
        </div>
      </div>
    ,document.getElementById('model')
    )
  )
}

export default MenuModel