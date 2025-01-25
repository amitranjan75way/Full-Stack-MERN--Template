import React from 'react';
import style from './index.module.css';

interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ id, name, imageUrl }) => {
  return (
    <div className={style.card}>
      <div className={style.cardImage}>
        {imageUrl ? (
          <img src={imageUrl} alt={name} />
        ) : (
          <div className={style.skeletonImage}></div> // Show skeleton if no imageUrl
        )}
      </div>
      <div className={style.cardDetails}>
        <h3 className={style.restaurantName}>{name}</h3>
      </div>
    </div>
  );
};

export default RestaurantCard;
