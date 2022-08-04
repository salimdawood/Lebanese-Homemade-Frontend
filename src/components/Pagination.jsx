import React,{useState} from 'react'

const Pagination = (props) => {
  const {perPage,currentPage,cardsCount,setPaginate} = props
  let pageNumber = Math.ceil(cardsCount/perPage)
  let pages_array = []
  for (let index = 1; index <= pageNumber; index++) {
    pages_array.push(index)
  }


  //pages shown logic
  const [pages,setPages] = useState({
    maxLimit:5,
    minLimit:0
  })

  //for buttons 
  const prevPage = ()=>{
    if(currentPage !== 1) setPaginate({perPage,currentPage:currentPage-1})
    if((currentPage-1) % perPage === 0) setPages({minLimit:pages.minLimit-perPage,maxLimit:pages.maxLimit-perPage})
  }
  const nextPage = ()=>{
    if(currentPage !== pageNumber) setPaginate({perPage,currentPage:currentPage+1})
    if(currentPage+1 > pages.maxLimit) setPages({minLimit:pages.minLimit+perPage,maxLimit:pages.maxLimit+perPage})
  }
  //for three dots
  const prevPages = ()=>{
    setPaginate({perPage,currentPage:pages.maxLimit-perPage})
    setPages({minLimit:pages.minLimit-perPage,maxLimit:pages.maxLimit-perPage})
  }
  const nextPages = ()=>{
    setPaginate({perPage,currentPage:pages.minLimit+perPage+1})
    setPages({minLimit:pages.minLimit+perPage,maxLimit:pages.maxLimit+perPage})
  }


  return (
      (cardsCount > 0) &&
      <div className='pagination'>
        <button disabled={currentPage===1} onClick={prevPage}>Prev</button>
        <ul>
          {pages.minLimit > 0 && <li onClick={prevPages}>...</li>}
          {
            pages_array.map((element)=>{
              if(element<pages.maxLimit+1 && element>pages.minLimit)
              {
                return <li key={element} 
                className={element===currentPage?'active':null}
                onClick={()=>setPaginate({perPage,currentPage:element})} 
                >{element}</li>
              }
              return null
            })
          }
          {pageNumber > pages.maxLimit && <li onClick={nextPages}>...</li>}
        </ul>
        <button disabled={currentPage===pageNumber} onClick={nextPage}>Next</button>
      </div>
  )
}
export default Pagination