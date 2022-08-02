import React,{useEffect} from 'react'

const Pagination = (props) => {
  const {perPage,currentPage,cardsCount,setPaginate} = props
  let pageNumber = Math.floor(cardsCount/perPage) + 1
  let pages_array = []
  for (let index = 0; index < pageNumber; index++) {
    pages_array.push(index+1)
  }


  const prevPage = ()=>{
    if(currentPage != 1) setPaginate({perPage,currentPage:currentPage-1})
  }

  
  const nextPage = ()=>{
    if(currentPage != pageNumber) setPaginate({perPage,currentPage:currentPage+1})
  }


  return (
    <div className='pagination'>
      <button disabled={currentPage==1?true:false} onClick={prevPage}>Prev</button>
      <ul>
        {
          pages_array.map((element)=>(
            <li className={element===currentPage?'active':''} key={element} >{element}</li>
          ))
        }
      </ul>
      <button disabled={currentPage==pageNumber?true:false} onClick={nextPage}>Next</button>
    </div>
  )
}
export default Pagination