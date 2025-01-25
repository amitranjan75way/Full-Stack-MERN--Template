import React from 'react';
import style from './index.module.css';
import heroImage from '../../accets/food-delivery-hero.jpg';

const HeroSection = () => {
  return (
    <div className={style.heroContainer}>
      <div className={style.heroContent}>
        <div className={style.textSection}>
          <h1 className={style.heroHeader}>Welcome to Food Delivery App</h1>
          <p className={style.heroQuote}>"Bringing your favorite meals right to your doorstep!"</p>
          <button className={style.exploreButton}>Explore Food</button>
        </div>
        <div className={style.imageSection}>
          <img src={heroImage} alt="Food" className={style.heroImage} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
