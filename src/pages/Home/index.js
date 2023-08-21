import React from 'react'
import Profile from './Profile'
import Auth from './Auth'
import { useSelector } from 'react-redux';
import Admin from '../Admin';

function Home() {
  const authId = useSelector((state) => state.authId);


  return (
    <div>
     {authId ? (
          <>
          {authId === 'X8sv18oDj6RZelzRrctZU8jGJ2E3' ?(
            <Admin />
          ):(
            <Profile />
          )}
          </>
        ):(
          <Auth />
      )}
    </div>
  )
}

export default Home