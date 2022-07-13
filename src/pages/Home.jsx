import React,{useState,useEffect,useContext} from 'react'
import * as Axios from 'axios'
import SelectType from '../components/SelectType'
import {URL_PATH} from '../path'
import {Close} from '../components/Svg'
import Card from '../components/Card.jsx'
import CardPopUp from '../components/CardPopUp'

const Home = ({types}) => {

  const [isLoading,setIsLoading] = useState(false)
  const [paginate,setPaginate] = useState({
    perPage:10,
    currentPage:1
  })
  const[cards,setCards] = useState([])
  //popup model
  const[cardModel, setCardModel] = useState(false)
  const[card,setCard] = useState({
    //add the information of a card
  })
  const [typeId,setTypeId] = useState("")

  const closeCardPopUp = ()=>{
    setCardModel(false)
  }
  const openCardPopUp = (card)=>{
    console.log(card)
    setCardModel(true)
    //fill the card state with the info passed
    setCard(card)
  }
  

  const handleChange =async (e)=>{
    setTypeId(e.target.value)
    setIsLoading(true)
    try {
      const result = await Axios.get(URL_PATH+`Cards/GetCards?typeId=${e.target.value}`) 
      console.log(result)
      setCards(result.data.$values)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }


  return (
    <div className="home-page">
      {
        isLoading ?
          <>Loading......</>
            :
          <>
            <SelectType defaultValue={typeId} handleChange={handleChange} typesArray={types}/>
            <div className="card-container">
              {
                cards.map(card=>(
                  <Card key={card.id} {...card} openCardPopUp={openCardPopUp} />
                ))
              }
            </div>
            {
        cardModel &&
        <div className="card-popup">
          <Close onClick={closeCardPopUp}/>
          <CardPopUp {...card}/>
        </div>
      }
          </>
      }
    </div>
  )
}

export default Home