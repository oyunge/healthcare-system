import React from 'react'
import Post from './Post';

function Mcratings({ pWorks, userId, isApproved }) {

  return (
    <div>
    {pWorks?.map((pwork, index) => 
     <Post 
        key={index}
        index={index}
        link={pwork.link}
        rate={pwork.rate}
        timestamp={pwork.timestamp}
        userId={userId}
        isApproved={isApproved}
        pWorks={pWorks}
     />
    )}
    </div>
  )
}

export default Mcratings