import React,{useState,useEffect,useContext} from 'react'
import { cardContext } from '../context/cardContext'
import * as Axios from 'axios'
import SelectType from '../components/SelectType'
import {URL_PATH} from '../path'
import {Close} from '../components/Svg'
import Card from '../components/Card.jsx'
import CardPopUp from '../components/CardPopUp'

const Home = () => {

  const [typesArray,setTypesArray] = useState([])
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

  useEffect(() => {
    Axios.get(URL_PATH+'Types/')
    .then((result)=>{
      console.log(result)
      setTypesArray([...result.data.$values])
    },(error)=>{
      console.log(error)
  });
  },[])


  const closeCardPopUp = ()=>{
    setCardModel(false)
  }
  const openCardPopUp = (card)=>{
    console.log(card)
    setCardModel(true)
    //fill the card state with the info passed
    setCard(card)
  }
  

  const handleChange =(e)=>{
    setIsLoading(true)
    Axios.get(URL_PATH+`Cards/GetCards?typeId=${e.target.value}`)
    .then(result=>{
      console.log(result)
      setCards(result.data.$values)
    },error=>{
      console.log(error)
    })
    setIsLoading(false)
  }


  return (
    <div className="home-page">
      {
        isLoading ?
          <>Loading......</>
            :
          <>
            <SelectType defaultValue="" handleChange={handleChange} typesArray={typesArray}/>
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