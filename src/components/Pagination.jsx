import React,{useState,useEffect} from 'react'

const Pagination = (props) => {
  const {perPage,currentPage,cardsCount,setPaginate} = props
  let pageNumber = Math.ceil(cardsCount/perPage)
  let pages_array = []
  for (let index = 1; index <= pageNumber; index++) {
    pages_array.push(index)
  }


  //pages shown logic
  const [pages,setPages] = useState({
    minLimit:Math.floor(Math.abs(currentPage-1)/5)*5+1,
    maxLimit:Math.floor(Math.abs(currentPage-1)/5)*5+5
  })

  /*
  useEffect(() => {
    let {minLimit,maxLimit} = pages
    if(currentPage > maxLimit){
      //prev
      setPaginate({perPage,currentPage:maxLimit})
      return
    }
    //next
    setPaginate({perPage,currentPage:minLimit})
  }, [pages])
  */

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
  //5 is the number of steps = maxLimit - minLimit
  const prevPages = ()=>{
    let {minLimit,maxLimit} = pages
    setPages({minLimit:minLimit-5,maxLimit:maxLimit-5})
    setPaginate({perPage,currentPage:minLimit-1})
  }
  const nextPages = ()=>{
    let {minLimit,maxLimit} = pages
    setPages({minLimit:minLimit+5,maxLimit:maxLimit+5})
    setPaginate({perPage,currentPage:maxLimit+1})
  }

  return (
      (cardsCount > 0) &&
      <div className='pagination'>
        <button disabled={currentPage===1} onClick={prevPage}>Prev</button>
        <ul>
          {pages.minLimit > 1 && <li onClick={prevPages}>...</li>}
          {
            pages_array.map((element)=>{
              if(element<pages.maxLimit+1 && element>=pages.minLimit)
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