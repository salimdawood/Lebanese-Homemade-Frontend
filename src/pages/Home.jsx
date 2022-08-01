import React,{useState,useEffect} from 'react'
//api

import * as Axios from 'axios'
//component
import SelectType from '../components/SelectType'
import {Close} from '../components/Svg'
import Card from '../components/Card.jsx'
import CardPopUp from '../components/CardPopUp'
import SkeletonCard from '../components/SkeletonCard'
//input for form
import {URL_PATH} from '../constantVariables/path'

const Home = ({types}) => {

  const [isLoading,setIsLoading] = useState(false)
  const [paginate,setPaginate] = useState({
    perPage:10,
    currentPage:1
  })
  const [cardCount,setCardsCount] = useState()
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
  
  useEffect(() => {

  }, [])
  

  const handleChange =async (e)=>{
    setTypeId(e.target.value)
    setIsLoading(true)
    try {
      const result = await Axios.get(URL_PATH+`Cards/GetCards?typeId=${e.target.value}`)
      const count = await Axios.get(URL_PATH+`Cards/GetCardsCount/${e.target.value}`)  
      console.log(result)
      console.log(count)
      setCards(result.data)
      setCardsCount(count.data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }


  return (
    <div className="home-page">
      <SelectType defaultValue={typeId} handleChange={handleChange} typesArray={types}/>
      {
        isLoading ?
          <SkeletonCard/>
            :
          <>
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