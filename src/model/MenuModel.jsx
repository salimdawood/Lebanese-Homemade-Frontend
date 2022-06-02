import React,{useContext,useState,useEffect} from 'react'
import reactDom from 'react-dom'
import {Close} from '../components/Svg'
import { cardContext } from '../context/cardContext'
import ReadOnlyItemBox from '../components/ReadOnlyItemBox'
import UpdateItemBox from '../components/UpdateItemBox'

const MenuModel = () => {

  const {menuModel,setMenuModel,dispatch,cardProfile} = useContext(cardContext)
  const [items,setItems] = useState(cardProfile.itemList)
  const [itemInput,setItemInput] = useState({
    name:"",
    price:""
  })

  const handleChange = (e) =>{
    setItemInput({...itemInput,[e.target.name]:e.target.value})
  }

  const addItem = (e)=>{
    e.preventDefault()
    setItems([...items,itemInput])
    setItemInput({name:"",price:""})
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
                  items.map((item)=>(
                      <>
                        <UpdateItemBox />
                        <ReadOnlyItemBox item={item}/>
                      </>
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
                 value={itemInput.price} onChange={handleChange} name="price"/>
              </div>
            </div>
            <input type="submit" value="Add to menu"/>
          </form>
        </div>
      </div>
    ,document.getElementById('model')
    )
  )
}

export default MenuModel