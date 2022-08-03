import React,{useEffect,useState,useContext} from 'react'
import {useParams } from 'react-router-dom'
//api
import * as Axios from 'axios'
import {URL_PATH} from '../constantVariables/path'
//components
import SkeletonCard from '../components/SkeletonCard'
import {Close} from '../components/Svg'
import Card from '../components/Card.jsx'
import CardPopUp from '../components/CardPopUp'
//context
import {notificationContext} from '../context/notificationContext'


const UserCards = () => {

  //notification for better ui
  const [isLoading,setIsLoading] = useState(false)
  const {setNotification,closeNotification} = useContext(notificationContext)
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
      //console.log(result)
      setCards(result.data)
    } catch (error) {
      //console.log(error)
      setNotification({isShown:true,message:"Something went wrong",color:"red"})
      closeNotification()
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
              cards.length>0?
              cards.map(card=>(
              <Card key={card.id} {...card} openCardPopUp={openCardPopUp} />
              ))
              :
              <p>No items found</p>
            }
          </div>
          {
            cardModel &&
            <div className="card-popup">
              <Close onClick={closeCardPopUp}/>
              <CardPopUp {...card} setCardModel={setCardModel}/>
            </div>
          }
        </>
      }
    </div>
  )
}

export default UserCards