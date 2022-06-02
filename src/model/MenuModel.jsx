import React,{useContext} from 'react'
import reactDom from 'react-dom'
import { cardContext } from '../context/cardContext'
import {Close} from '../components/Svg'

const MenuModel = () => {

  const {menuModel,setMenuModel} = useContext(cardContext)

  return (
    menuModel && reactDom.createPortal(
      <div className="model">
        
        MenuModel
      </div>
    ,document.getElementById('model')
    )
  )
}

export default MenuModel