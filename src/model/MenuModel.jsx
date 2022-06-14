import React,{useContext,useState,useEffect} from 'react'
import reactDom from 'react-dom'
import {Close} from '../components/Svg'
import { cardContext } from '../context/cardContext'
import ReadOnlyItemBox from '../components/ReadOnlyItemBox'
import UpdateItemBox from '../components/UpdateItemBox'
import { nanoid } from 'nanoid'
import { notificationContext } from '../context/notificationContext'

const MenuModel = () => {

  const {setNotification} = useContext(notificationContext)
  const {menuModel,setMenuModel,dispatch,cardProfile} = useContext(cardContext)
  const [items,setItems] = useState(cardProfile.itemList)
  const [itemInput,setItemInput] = useState({
    name:"",
    price:0
  })
  const [editItemInput,setEditItemInput] = useState({
    name:"",
    price:0
  })
  const [editTarget,setEditTarget] = useState(null)

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

  const confirmItems = () =>{
    //add items to card information context
    dispatch({type:'ADD_MENU',items})
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
          <input type="submit" onClick={confirmItems} value="Confirm"/>
        </div>
      </div>
    ,document.getElementById('model')
    )
  )
}

export default MenuModel