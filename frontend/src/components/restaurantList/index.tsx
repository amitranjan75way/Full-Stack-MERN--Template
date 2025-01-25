import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import SkeletonCard from './SkeletonCard';
import style from './index.module.css';
import { useGetRestaurantListQuery } from '../../services/api';

// Modified Restaurant interface
interface Restaurant {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  imageUrl?: string | null; // Optional field
}

const RestaurantList: React.FC = () => {
  const { data, isLoading, error } = useGetRestaurantListQuery({});
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    if (data) {
      console.log(data.data);
      setRestaurants(data.data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className={style.restaurantList}>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  // Error handling with custom styling
  if (error) {
    return <div className={style.errorMessage}>Failed to load restaurants. Please try again later.</div>;
  }

  return (
    <>
      <h2 className={style.popularTitle}>Popular Restaurants</h2>
      <div className={style.restaurantList}>
        {restaurants && restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            name={restaurant.userId.name}
            imageUrl={restaurant.imageUrl || ''} // Passing empty string if imageUrl is missing
          />
        ))}
      </div>
    </>
  );
};

export default RestaurantList;
