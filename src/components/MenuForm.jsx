import React,{useState,useRef} from 'react'
//components
import FormInput from '../components/FormInput'
//input for form
import { itemInfoInput } from '../constantVariables/itemInfoInput'
//unique id
import { nanoid } from 'nanoid'

const MenuForm = (props) => {

  const {setItems,items} = props
  //local state
  const [itemInput,setItemInput] = useState({
    name:"",
    price:""
  })

  const test = useRef()

  const handleChange = (e) =>{
    setItemInput({...itemInput,[e.target.name]:e.target.value})
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
    
    console.log(test.current)
    setItemInput({name:"",price:""})
  }

  

  return (
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
  )
}

export default MenuForm