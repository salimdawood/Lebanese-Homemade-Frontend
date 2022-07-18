import React,{useEffect,useState} from 'react'
import {useParams } from 'react-router-dom'
//api
import * as Axios from 'axios'
import {URL_PATH} from '../constantVariables/path'
//components
import SkeletonCard from '../components/SkeletonCard'
import {Close} from '../components/Svg'
import Card from '../components/Card.jsx'
import CardPopUp from '../components/CardPopUp' 


const UserCards = () => {

  const [isLoading,setIsLoading] = useState(false)
  const[cards,setCards] = useState([])
  //popup model
  const[cardModel, setCardModel] = useState(false)
  const[card,setCard] = useState({
    //add the information of a card
  })

  const {username} = useParams()
  useEffect(async() => {
    setIsLoading(true)
    try {
      const result = await  Axios.get(URL_PATH+`Cards/GetCards/${username}`)
      console.log(result)
      setCards(result.data.$values)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
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


  return (
    <div className="home-page">
      {
        isLoading ?
          <SkeletonCard/>
            :
          <>
            <h1>Owner : {username}</h1>
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

export default UserCards