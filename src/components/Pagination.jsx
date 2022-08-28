import React,{useState} from 'react'

const Pagination = (props) => {

  const {cardsCount,home,dispatch} = props

  let pageNumber = Math.ceil(cardsCount/home.perPage)
  let pages_array = []
  for (let index = 1; index <= pageNumber; index++) {
    pages_array.push(index)
  }

  //pages shown logic
  const [pages,setPages] = useState({
    minLimit:Math.floor(Math.abs(home.currentPage-1)/5)*5+1,
    maxLimit:Math.floor(Math.abs(home.currentPage-1)/5)*5+5
  })

  //for buttons 
  const prevPage = ()=>{
    const {perPage,currentPage} = home
    if(currentPage !== 1) dispatch({type:'UPDATE_HOME',home:{...home,currentPage:currentPage-1}}) 
    if((currentPage-1) % perPage === 0) setPages({minLimit:pages.minLimit-perPage,maxLimit:pages.maxLimit-perPage})
  }
  const nextPage = ()=>{
    const {perPage,currentPage} = home
    if(currentPage !== pageNumber) dispatch({type:'UPDATE_HOME',home:{...home,currentPage:currentPage+1}}) 
    if(currentPage+1 > pages.maxLimit) setPages({minLimit:pages.minLimit+perPage,maxLimit:pages.maxLimit+perPage})
  }
  //for three dots
  //5 is the number of steps = maxLimit - minLimit
  const prevPages = ()=>{
    let {minLimit,maxLimit} = pages
    setPages({minLimit:minLimit-5,maxLimit:maxLimit-5})
    dispatch({type:'UPDATE_HOME',home:{...home,currentPage:minLimit-1}}) 
  }
  const nextPages = ()=>{
    let {minLimit,maxLimit} = pages
    setPages({minLimit:minLimit+5,maxLimit:maxLimit+5})
    dispatch({type:'UPDATE_HOME',home:{...home,currentPage:maxLimit+1}}) 
  }

  return (
      (cardsCount > 0) &&
      <div className='pagination'>
        <button disabled={home.currentPage===1} onClick={prevPage}>Prev</button>
        <ul>
          {pages.minLimit > 1 && <li onClick={prevPages}>...</li>}
          {
            pages_array.map((element)=>{
              if(element<pages.maxLimit+1 && element>=pages.minLimit)
              {
                return <li key={element} 
                className={element===home.currentPage?'active':null}
                onClick={()=>dispatch({type:'UPDATE_HOME',home:{...home,currentPage:element}})} 
                >{element}</li>
              }
              return null
            })
          }
          {pageNumber > pages.maxLimit && <li onClick={nextPages}>...</li>}
        </ul>
        <button disabled={home.currentPage===pageNumber} onClick={nextPage}>Next</button>
      </div>
  )
}
export default Pagination