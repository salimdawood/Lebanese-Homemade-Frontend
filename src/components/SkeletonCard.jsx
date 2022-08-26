import React from 'react'

const SkeletonCard = () => {
  return (
      <div className="card-container">
        {
          [1,2,3,4,5].map((index)=>{ 
          return  <div key={index} className="skeleton-card card-box">
                    <div className="skeleton-img"></div>
                    <div className="info-card">
                      <h1></h1>
                      <h3></h3>
                      <div className="info-box">
                        <h4></h4>
                        <h4></h4>
                      </div>
                    </div>
                  </div>
            }
          )
        }
      </div>
  )
}

export default SkeletonCard