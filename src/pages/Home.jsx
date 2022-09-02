import React,{useState,useEffect,useContext} from 'react'
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
//context
import { homeContext } from '../context/homeContext'

const Home = ({types}) => {

  const [isLoading,setIsLoading] = useState(false)

  const {home,dispatch} = useContext(homeContext)

  const [cardsCount,setCardsCount] = useState(0)
  //cards shown 
  const[cards,setCards] = useState([])
  //popup model
  const[cardModel, setCardModel] = useState(false)
  const[card,setCard] = useState()
  

  const closeCardPopUp = ()=>{
    setCardModel(false)
  }
  const openCardPopUp = (card)=>{
    //console.log(card)
    setCardModel(true)
    //fill the card state with the info passed
    setCard(card)
  }

  useEffect(async() => {
    setIsLoading(true)

    try {
      const result = home.typeId ? 
      await Axios.get(URL_PATH+`Cards/GetCardsById/${home.typeId}?PageNumber=${home.currentPage}&PageSize=${home.perPage}`)
      :
      await Axios.get(URL_PATH+`Cards/GetCardsById/-1?PageNumber=${home.currentPage}&PageSize=${home.perPage}`)
      //console.log(result)
      setCards(result.data)
    } catch (error) {
      //console.log(error)
    }
    setIsLoading(false)
  }, [home])

  useEffect(async() => {
    setIsLoading(true)
    //const count = 0
    try {
      const count = home.typeId?
      await Axios.get(URL_PATH+`Cards/GetCardsCount/${home.typeId}`)
      :
      await Axios.get(URL_PATH+'Cards/GetCardsCount/-1')
      //console.log(count)
      setCardsCount(count.data)
    } catch (error) {
      //console.log(error)
    }
    setIsLoading(false)
  }, [home.typeId])

  const handleChange = (e)=>{
    dispatch({type:'UPDATE_HOME',home:{...home,currentPage:1,typeId:e.target.value}})
  }

  const loadPerPage = () =>{
    if(home.perPage === 10){
      //if only one page no need to load  more
      let pageNumber = Math.ceil(cardsCount/home.perPage)
      if(pageNumber===1) return
      pageNumber = Math.ceil(pageNumber/2)
      dispatch({type:'UPDATE_HOME',home:{...home,perPage:20,
      currentPage:home.currentPage > pageNumber ? pageNumber:home.currentPage
      }})
      return
    }
    dispatch({type:'UPDATE_HOME',home:{...home,perPage:10}})
    return
  }

  let pagination_props = {
    cardsCount,
    home,
    dispatch
  }

  let selectType_props = {
    defaultValue:home.typeId,
    typesArray:types,
    handleChange,
    all:true
  }

  return (
    <div className="home-page">
      <SelectType {...selectType_props}/>
      {
        isLoading ?
          <SkeletonCard/>
            :
          <>
          {
            cards.length>0?
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
            <button className="load-more" onClick={loadPerPage}>{home.perPage===10?'Load more' : 'Load less'}</button>
            <Pagination {...pagination_props} />
            </>
            :
            <p>No items found</p> 
          }
          </>
      }
    </div>
  )
}

export default Home