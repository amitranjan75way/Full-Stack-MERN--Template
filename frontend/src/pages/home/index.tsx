import React from 'react'
import style from './index.module.css';
import HeroSection from '../../components/herosection';
import RestaurantList from '../../components/restaurantList';

function Home() {
  return (
    <>
      <HeroSection/>
      <RestaurantList/>
    </>
  )
}

export default Home;