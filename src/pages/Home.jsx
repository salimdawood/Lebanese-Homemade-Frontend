import React,{useState,useEffect} from 'react'
//api
import * as Axios from 'axios'
import {URL_PATH} from '../constantVariables/path'
//component
import SelectType from '../components/SelectType'
import {Close} from '../components/Svg'
import Card from '../components/Card.jsx'
import CardPopUp from '../components/CardPopUp'
import SkeletonCard from '../components/SkeletonCard'
import Pagination from '../components/Pagination'

const Home = ({types}) => {

  const [isLoading,setIsLoading] = useState(false)
  //pagination logic
  const [paginate,setPaginate] = useState({
    perPage:10,
    currentPage:1
  })
  const [cardsCount,setCardsCount] = useState(0)
  //cards shown 
  const[cards,setCards] = useState([])
  //popup model
  const[cardModel, setCardModel] = useState(false)
  const[card,setCard] = useState()
  //select type
  const [typeId,setTypeId] = useState(-1)


  const closeCardPopUp = ()=>{
    setCardModel(false)
  }
  const openCardPopUp = (card)=>{
    console.log(card)
    setCardModel(true)
    //fill the card state with the info passed
    setCard(card)
  }
  
  useEffect(async() => {
    setIsLoading(true)
    try {
      const result = await Axios.get(URL_PATH+`Cards/GetCardsById/${typeId}?PageNumber=${paginate.currentPage}&PageSize=${paginate.perPage}`)
      setCards(result.data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }, [paginate,typeId])

  useEffect(async() => {
    setIsLoading(true)
    try {
      const count = await Axios.get(URL_PATH+`Cards/GetCardsCount/${typeId}`)
      setCardsCount(count.data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }, [typeId])
  

  const handleChange = (e)=>{
    setTypeId(e.target.value)
    setPaginate({perPage:10,currentPage:1})
  }

  let pagination_props = {
    cardsCount,
    ...paginate,
    setPaginate
  }

  let selectType_props = {
    defaultValue:typeId,
    typesArray:types,
    handleChange
  }

  return (
    <div className="home-page">
      <SelectType {...selectType_props}/>
      {
        isLoading ?
          <SkeletonCard/>
            :
          <>
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
          <CardPopUp {...card}/>
        </div>
      }
          </>
      }
      <Pagination {...pagination_props} />
    </div>
  )
}

export default Home