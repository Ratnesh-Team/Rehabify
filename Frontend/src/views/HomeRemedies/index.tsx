import React from 'react'
import Homeremedies from './HomeRemedies'
import NewPage from './NewPage';

const index = () => {
  const searchParams = new URLSearchParams(location.search);
  const remedy_id = searchParams.get('id');
  if(remedy_id){
    return (
      <NewPage id={remedy_id}/>
    )
  }

  return (
    <Homeremedies />
  )
}

export default index